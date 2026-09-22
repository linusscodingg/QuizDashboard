const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const login = fs.readFileSync(path.join(root, "login.html"), "utf8");
const loginScript = fs.readFileSync(path.join(root, "firebase-login.js"), "utf8");
const syncScript = fs.readFileSync(path.join(root, "firebase-sync.js"), "utf8");
const config = fs.readFileSync(path.join(root, "firebase-config.js"), "utf8");

assert.match(login, /id="loginForm"/);
assert.match(login, /id="registerBtn"/);
assert.match(login, /id="githubBtn"/);
assert.match(login, /id="resetBtn"/);
assert.doesNotMatch(login, /id="guestBtn"/);
assert.match(login, /firebase-login\.js/);
assert.match(login, /firebase-config\.js/);
assert.match(login, /https:\/\/apis\.google\.com/);
assert.match(loginScript, /signInWithEmailAndPassword/);
assert.match(loginScript, /createUserWithEmailAndPassword/);
assert.match(loginScript, /sendPasswordResetEmail/);
assert.match(loginScript, /GithubAuthProvider/);
assert.match(loginScript, /signInWithPopup/);
assert.match(loginScript, /operation-not-supported-in-this-environment/);
assert.match(loginScript, /auth\/invalid-api-key/);
assert.match(loginScript, /window\.location\.protocol === "file:"/);
assert.match(loginScript, /sendEmailVerification/);
assert.match(loginScript, /emailVerified/);
assert.doesNotMatch(loginScript, /quiz-dashboard-local-mode/);
assert.match(syncScript, /window\.location\.replace\("login\.html"\)/);
assert.match(syncScript, /deleteAccountAndData/);
assert.match(syncScript, /reauthenticateWithCredential/);
assert.match(syncScript, /reauthenticateWithPopup/);
assert.match(config, /projectId:\s*"[^\"]+"/);
assert.match(config, /window\.FIREBASE_CONFIG/);
assert.doesNotMatch(config, /serviceAccount|private_key|client_email/);

console.log("Firebase login tests passed");
