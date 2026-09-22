(async () => {
const { initializeApp } = await import("https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js");
const {
  createUserWithEmailAndPassword, getAuth, GithubAuthProvider, onAuthStateChanged,
  sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword,
  signInWithPopup, signOut
} = await import("https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js");
const firebaseConfig = window.FIREBASE_CONFIG;

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginButton = document.getElementById("loginBtn");
const registerButton = document.getElementById("registerBtn");
const resetButton = document.getElementById("resetBtn");
const githubButton = document.getElementById("githubBtn");
const message = document.getElementById("message");
const form = document.getElementById("loginForm");

function setBusy(busy) {
  loginButton.disabled = busy;
  registerButton.disabled = busy;
  resetButton.disabled = busy;
  githubButton.disabled = busy;
}

function showMessage(text, type = "error") {
  message.textContent = text;
  message.className = `message ${type}`;
  message.hidden = !text;
}

function friendlyError(error) {
  const messages = {
    "auth/email-already-in-use": "Für diese E-Mail-Adresse existiert bereits ein Konto.",
    "auth/invalid-credential": "E-Mail-Adresse oder Passwort ist nicht korrekt.",
    "auth/invalid-email": "Die E-Mail-Adresse ist ungültig.",
    "auth/weak-password": "Das Passwort ist zu schwach. Verwende für ein neues Konto mindestens 10 Zeichen.",
    "auth/missing-password": "Gib ein Passwort ein.",
    "auth/network-request-failed": "Firebase ist nicht erreichbar. Prüfe deine Internetverbindung.",
    "auth/too-many-requests": "Zu viele Versuche. Warte kurz und probiere es erneut.",
    "auth/popup-closed-by-user": "Die GitHub-Anmeldung wurde abgebrochen.",
    "auth/popup-blocked": "Das Anmeldefenster wurde vom Browser blockiert.",
    "auth/account-exists-with-different-credential": "Für diese E-Mail-Adresse existiert bereits eine andere Anmeldemethode. Melde dich zuerst damit an."
  };
  return messages[error?.code] || "Die Aktion ist fehlgeschlagen. Prüfe deine Angaben und versuche es erneut.";
}

function isTrustedUser(user) {
  return Boolean(user?.emailVerified || user?.providerData?.some(provider => provider.providerId === "github.com"));
}

async function authenticate(action, pendingText, isRegistration = false) {
  const emailValue = email.value.trim();
  const passwordValue = password.value;
  if (!emailValue || !passwordValue) return showMessage("Gib deine E-Mail-Adresse und dein Passwort ein.");
  if (passwordValue.length < 6) return showMessage("Das Passwort muss mindestens 6 Zeichen lang sein.");
  if (isRegistration && passwordValue.length < 10) return showMessage("Verwende für ein neues Konto mindestens 10 Zeichen.");
  setBusy(true);
  showMessage(pendingText, "info");
  try {
    const credential = await action(auth, emailValue, passwordValue);
    if (!credential.user.emailVerified) {
      try {
        await sendEmailVerification(credential.user);
      } finally {
        await signOut(auth);
      }
      showMessage(isRegistration
        ? "Konto erstellt. Öffne den Bestätigungslink in deiner E-Mail und melde dich danach an."
        : "Deine E-Mail-Adresse ist noch nicht bestätigt. Ein neuer Bestätigungslink wurde versendet.", "info");
      password.value = "";
      setBusy(false);
    }
  } catch (error) {
    showMessage(friendlyError(error));
    setBusy(false);
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();
  authenticate(signInWithEmailAndPassword, "Anmeldung läuft …");
});

registerButton.addEventListener("click", () => {
  authenticate(createUserWithEmailAndPassword, "Konto wird erstellt …", true);
});

githubButton.addEventListener("click", async () => {
  setBusy(true);
  showMessage("GitHub-Anmeldung wird geöffnet …", "info");
  try {
    await signInWithPopup(auth, new GithubAuthProvider());
  } catch (error) {
    showMessage(friendlyError(error));
    setBusy(false);
  }
});

resetButton.addEventListener("click", async () => {
  const emailValue = email.value.trim();
  if (!emailValue) return showMessage("Gib zuerst deine E-Mail-Adresse ein.");
  setBusy(true);
  try {
    await sendPasswordResetEmail(auth, emailValue);
    showMessage("Die E-Mail zum Zurücksetzen des Passworts wurde versendet.", "success");
  } catch (error) {
    showMessage(friendlyError(error));
  } finally {
    setBusy(false);
  }
});

onAuthStateChanged(auth, user => {
  if (isTrustedUser(user)) window.location.replace("index.html");
  else setBusy(false);
});
})().catch(error => {
  console.error("Firebase konnte nicht initialisiert werden.", error);
  const message = document.getElementById("message");
  message.textContent = "Firebase konnte nicht geladen werden. Prüfe deine Internetverbindung und versuche es erneut.";
  message.className = "message error";
  message.hidden = false;
});
