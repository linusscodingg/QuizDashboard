(() => {
  "use strict";
  // Public GitHub user ID for linusscodingg, verified via GitHub's API.
  // Match the authenticated provider identity, never the editable display name.
  const GITHUB_ID = "192517056";
  const SEEN_KEY = `quiz-easter-egg:linus:v1:${GITHUB_ID}`;
  const trigger = document.getElementById("linusEggBtn");
  const dialog = document.getElementById("linusEggDialog");
  const title = document.getElementById("linusEggTitle");
  const message = document.getElementById("linusEggMessage");
  const scan = document.getElementById("linusEggScan");
  const lawyer = document.getElementById("linusEggLawyer");
  let eligible = false;
  let shownThisSession = false;
  let timer;
  let subscribed = false;

  function close() {
    clearTimeout(timer);
    if (dialog.open) dialog.close();
  }

  function show() {
    if (!eligible || dialog.open) return;
    title.textContent = "Linus-Account wird überprüft …";
    message.textContent = "Einen Moment, Linus. Der Scam-Detektor schaut genauer hin.";
    scan.hidden = false;
    lawyer.hidden = true;
    dialog.showModal();
    shownThisSession = true;
    // Separate local preference: never write to quiz or learning-coach progress.
    try { localStorage.setItem(SEEN_KEY, "seen"); } catch (_) {}
    timer = setTimeout(() => {
      if (!eligible || !dialog.open) return;
      title.textContent = "Verdächtige Linus-Aktivität erkannt";
      message.textContent = "Dein Fall wurde an den GOAT weitergeleitet. Interdisziplinäre Konsequenzen werden geprüft.";
      scan.hidden = true;
      lawyer.hidden = false;
    }, 1400);
  }

  function onUser(user) {
    eligible = Boolean(user?.providerData?.some(provider =>
      provider.providerId === "github.com" && String(provider.uid) === GITHUB_ID
    ));
    trigger.hidden = !eligible;
    if (!eligible) { close(); return; }
    let seen = shownThisSession;
    try { seen ||= localStorage.getItem(SEEN_KEY) === "seen"; } catch (_) {}
    if (!seen) show();
  }

  function subscribe() {
    if (subscribed || !window.quizCloud) return;
    subscribed = true;
    window.quizCloud.onAuthChange(onUser);
  }

  trigger.addEventListener("click", show);
  document.getElementById("linusEggClose").addEventListener("click", close);
  dialog.addEventListener("close", () => clearTimeout(timer));
  // Keep Escape from also closing an underlying quiz or leaderboard.
  dialog.addEventListener("keydown", event => {
    if (event.key === "Escape") event.stopPropagation();
  });
  lawyer.addEventListener("click", () => {
    title.textContent = "Anwalt erreicht";
    message.textContent = "Dein Anwalt hat ebenfalls den GOAT empfohlen. 😄";
    lawyer.hidden = true;
    document.getElementById("linusEggClose").focus();
  });
  window.addEventListener("quiz-cloud-ready", subscribe);
  subscribe();
})();
