(async () => {
const { initializeApp } = await import("https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js");
const {
  deleteUser, getAuth, GithubAuthProvider, onAuthStateChanged,
  reauthenticateWithPopup, signOut
} = await import("https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js");
const {
  collection, deleteDoc, doc, getDoc, getDocs, getFirestore, serverTimestamp, setDoc
} = await import("https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js");
const firebaseConfig = window.FIREBASE_CONFIG;

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);
const authListeners = new Set();

function dashboardDocument(userId) {
  return doc(database, "users", userId, "dashboard", "state");
}

function leaderboardDocument(userId) {
  return doc(database, "leaderboard", userId);
}

function usesGithub(user) {
  return Boolean(user?.providerData?.some(provider => provider.providerId === "github.com"));
}

const cloud = {
  currentUser: null,
  onAuthChange(listener) {
    authListeners.add(listener);
    listener(cloud.currentUser);
    return () => authListeners.delete(listener);
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
  async loadLeaderboard() {
    if (!cloud.currentUser) return [];
    const snapshot = await getDocs(collection(database, "leaderboard"));
    return snapshot.docs.map(entry => ({ userId: entry.id, ...entry.data() }));
  },
  async publishLeaderboard(displayName, subjects) {
    if (!cloud.currentUser) return;
    await setDoc(leaderboardDocument(cloud.currentUser.uid), {
      version: 1,
      displayName,
      subjects: JSON.parse(JSON.stringify(subjects)),
      updatedAt: serverTimestamp()
    });
  },
  async removeLeaderboard() {
    if (!cloud.currentUser) return;
    await deleteDoc(leaderboardDocument(cloud.currentUser.uid));
  },
  async deleteAccountAndData() {
    const user = cloud.currentUser;
    if (!user) throw Object.assign(new Error("No signed-in user"), { code: "auth/requires-recent-login" });
    if (!usesGithub(user)) throw Object.assign(new Error("GitHub account required"), { code: "auth/operation-not-allowed" });
    await reauthenticateWithPopup(user, new GithubAuthProvider());
    await deleteDoc(dashboardDocument(user.uid));
    await deleteDoc(leaderboardDocument(user.uid));
    await deleteUser(user);
  }
};

window.quizCloud = cloud;

onAuthStateChanged(auth, async user => {
  if (user && !usesGithub(user)) {
    await signOut(auth);
    return;
  }
  cloud.currentUser = user;
  if (!user) {
    window.location.replace("login.html");
    return;
  }
  authListeners.forEach(listener => listener(user));
});

window.dispatchEvent(new CustomEvent("quiz-cloud-ready"));
})().catch(error => {
  console.error("Firebase konnte nicht initialisiert werden.", error);
  window.dispatchEvent(new CustomEvent("quiz-cloud-unavailable"));
});
