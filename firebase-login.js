(async () => {
const { initializeApp } = await import("https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js");
const {
  getAdditionalUserInfo, getAuth, GithubAuthProvider, onAuthStateChanged, signInWithPopup, signOut
} = await import("https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js");
const firebaseConfig = window.FIREBASE_CONFIG;

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const githubButton = document.getElementById("githubBtn");
const message = document.getElementById("message");

function setBusy(busy) {
  githubButton.disabled = busy;
}

function showMessage(text, type = "error") {
  message.textContent = text;
  message.className = `message ${type}`;
  message.hidden = !text;
}

function friendlyError(error) {
  const messages = {
    "auth/invalid-api-key": "Der Firebase-API-Key ist ungültig. Kopiere die aktuelle Web-App-Konfiguration erneut aus den Firebase-Projekteinstellungen.",
    "auth/network-request-failed": "Firebase ist nicht erreichbar. Prüfe deine Internetverbindung.",
    "auth/too-many-requests": "Zu viele Versuche. Warte kurz und probiere es erneut.",
    "auth/operation-not-allowed": "Diese Anmeldemethode ist in Firebase noch nicht aktiviert.",
    "auth/operation-not-supported-in-this-environment": "Firebase-Anmeldung funktioniert nicht beim direkten Öffnen als Datei. Verwende die GitHub-Pages-Adresse oder einen lokalen Webserver.",
    "auth/unauthorized-domain": "Diese Domain ist in Firebase nicht als autorisierte Domain eingetragen.",
    "auth/configuration-not-found": "Für diese Anmeldemethode fehlt noch die Firebase-Konfiguration.",
    "auth/user-disabled": "Dieses Konto wurde in Firebase deaktiviert.",
    "auth/popup-closed-by-user": "Die GitHub-Anmeldung wurde abgebrochen.",
    "auth/popup-blocked": "Das Anmeldefenster wurde vom Browser blockiert.",
    "auth/account-exists-with-different-credential": "Für die bei GitHub hinterlegte E-Mail-Adresse existiert bereits ein altes Firebase-Konto mit einer anderen Anmeldemethode."
  };
  return messages[error?.code] || `Die Aktion ist fehlgeschlagen${error?.code ? ` (${error.code})` : ""}. Prüfe deine Angaben und versuche es erneut.`;
}

function usesGithub(user) {
  return Boolean(user?.providerData?.some(provider => provider.providerId === "github.com"));
}

githubButton.addEventListener("click", async () => {
  setBusy(true);
  showMessage("GitHub-Anmeldung wird geöffnet …", "info");
  try {
    const credential = await signInWithPopup(auth, new GithubAuthProvider());
    const githubUsername = getAdditionalUserInfo(credential)?.username;
    if (githubUsername) localStorage.setItem("quiz-github-username", githubUsername);
  } catch (error) {
    showMessage(friendlyError(error));
    setBusy(false);
  }
});

if (window.location.protocol === "file:") {
  showMessage("Lokale Dateiansicht: Firebase- und GitHub-Anmeldung funktionieren hier möglicherweise nicht. Teste die Anmeldung über GitHub Pages oder einen lokalen Webserver.", "info");
}

onAuthStateChanged(auth, async user => {
  if (usesGithub(user)) {
    window.location.replace("index.html");
    return;
  }
  if (user) {
    await signOut(auth);
    showMessage("Dieses Dashboard verwendet nur noch die Anmeldung mit GitHub.", "info");
  }
  setBusy(false);
});
})().catch(error => {
  console.error("Firebase konnte nicht initialisiert werden.", error);
  const message = document.getElementById("message");
  message.textContent = "Firebase konnte nicht geladen werden. Prüfe deine Internetverbindung und versuche es erneut.";
  message.className = "message error";
  message.hidden = false;
});
