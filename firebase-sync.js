(async () => {
const { initializeApp } = await import("https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js");
const {
  createUserWithEmailAndPassword, deleteUser, EmailAuthProvider, getAuth, GithubAuthProvider,
  onAuthStateChanged, reauthenticateWithCredential, reauthenticateWithPopup,
  sendEmailVerification, signInWithEmailAndPassword, signOut
} = await import("https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js");
const {
  deleteDoc, doc, getDoc, getFirestore, serverTimestamp, setDoc
} = await import("https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js");
const firebaseConfig = window.FIREBASE_CONFIG;

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);
const authListeners = new Set();

function dashboardDocument(userId) {
  return doc(database, "users", userId, "dashboard", "state");
}

function usesGithub(user) {
  return Boolean(user?.providerData?.some(provider => provider.providerId === "github.com"));
}

function isTrustedUser(user) {
  return Boolean(user?.emailVerified || usesGithub(user));
}

const cloud = {
  currentUser: null,
  onAuthChange(listener) {
    authListeners.add(listener);
    listener(cloud.currentUser);
    return () => authListeners.delete(listener);
  },
  async register(email, password) {
    if (password.length < 10) throw Object.assign(new Error("Password too short"), { code: "auth/weak-password" });
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    try {
      await sendEmailVerification(credential.user);
    } finally {
      await signOut(auth);
    }
    throw Object.assign(new Error("Email verification required"), { code: "auth/email-verification-sent" });
  },
  async login(email, password) {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    if (!credential.user.emailVerified) {
      try {
        await sendEmailVerification(credential.user);
      } finally {
        await signOut(auth);
      }
      throw Object.assign(new Error("Email verification required"), { code: "auth/email-not-verified" });
    }
    return credential;
  },
  async logout() {
    return signOut(auth);
  },
  async load() {
    if (!cloud.currentUser) return null;
    const snapshot = await getDoc(dashboardDocument(cloud.currentUser.uid));
    return snapshot.exists() ? snapshot.data().data || null : null;
  },
  async save(store) {
    if (!cloud.currentUser) return;
    const safeStore = JSON.parse(JSON.stringify(store));
    await setDoc(dashboardDocument(cloud.currentUser.uid), {
      version: 1,
      data: safeStore,
      updatedAt: serverTimestamp()
    });
  },
  async deleteAccountAndData(password) {
    const user = cloud.currentUser;
    if (!user) throw Object.assign(new Error("No signed-in user"), { code: "auth/requires-recent-login" });
    if (usesGithub(user)) {
      await reauthenticateWithPopup(user, new GithubAuthProvider());
    } else {
      if (!user.email || !password) throw Object.assign(new Error("Password required"), { code: "auth/missing-password" });
      await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, password));
    }
    await deleteDoc(dashboardDocument(user.uid));
    await deleteUser(user);
  }
};

window.quizCloud = cloud;

onAuthStateChanged(auth, async user => {
  if (user && !isTrustedUser(user)) {
    await signOut(auth);
    return;
  }
  cloud.currentUser = user;
  if (!user) {
    const isLocalFile = window.location.protocol === "file:";
    if (!isLocalFile) {
      window.location.replace("login.html");
      return;
    }
  }
  authListeners.forEach(listener => listener(user));
});

window.dispatchEvent(new CustomEvent("quiz-cloud-ready"));
})().catch(error => {
  console.error("Firebase konnte nicht initialisiert werden.", error);
  window.dispatchEvent(new CustomEvent("quiz-cloud-unavailable"));
});
