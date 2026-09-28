/*
 * Lerncoach-Oberfläche
 * Fach-Übersicht → Wochen-Übersicht → Vorlesungs-Player oder "Nur Quiz".
 * Routing über den URL-Hash (#lerncoach/<fach>/<woche>[/quiz]), damit der
 * Zurück-Button des Browsers und Lesezeichen funktionieren.
 * Inhalte kommen ausschliesslich aus lerncoach/content/*.js (siehe manifest.js).
 */
(() => {
  "use strict";

  const L = window.Lerncoach;
  const root = document.getElementById("coachView");
  const quizView = document.getElementById("quizView");
  const quizTab = document.getElementById("modeQuizTab");
  const coachTab = document.getElementById("modeCoachTab");
  if (!L || !root || !quizView || !quizTab || !coachTab) return;

  const PROGRESS_KEY = "lerncoach-progress-v1";
  const MODE_KEY = "quiz-dashboard-mode-v1";
  const ROUTE_PREFIX = "#lerncoach";
  const TYPE_LABELS = {
    type: "Freitext",
    multi: "Mehrfachauswahl · alle zutreffenden wählen",
    order: "Reihenfolge",
    single: "Einfachauswahl"
  };
  const STATUS_INFO = {
    ready: { label: "Bereit", color: "var(--blue)", background: "#e5f3fa" },
    locked: { label: "Gesperrt", color: "var(--orange)", background: "var(--orange-bg)" },
    passed: { label: "Bestanden ✓", color: "var(--green)", background: "var(--green-bg)" },
    soon: { label: "Noch keine Inhalte", color: "var(--grey)", background: "var(--grey-bg)" }
  };

  const state = {
    loaded: false,
    entries: [],
    fileErrors: [],
    progress: loadLocal(),
    route: { view: "subjects" },
    session: null,
    sync: { text: "Fortschritt lokal gespeichert", error: false },
    cloudUser: null,
    lastCoachHash: ROUTE_PREFIX
  };
  let cloudTimer = null;
  let cloudInitialised = false;

  const esc = L.escapeHtml;

  /* ---------- Speichern: localStorage + Firebase ---------- */

  function loadLocal() {
    try { return L.normaliseProgress(JSON.parse(localStorage.getItem(PROGRESS_KEY) || "null")); } catch (_) { return L.emptyProgress(); }
  }

  function persist() {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(state.progress)); } catch (_) {}
    queueCloud();
  }

  function setSync(text, error = false) {
    state.sync = { text, error };
    const element = root.querySelector("[data-sync]");
    if (element) {
      element.textContent = text;
      element.classList.toggle("is-error", error);
    }
  }

  function syncedText() {
    return `Mit Firebase synchronisiert · ${new Date().toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit" })}`;
  }

  function cloudErrorText(error) {
    return error?.code === "permission-denied"
      ? "Cloud-Sync abgelehnt: Firestore-Regeln für den Lerncoach veröffentlichen. Lokal bleibt alles gespeichert."
      : "Cloud-Sync fehlgeschlagen. Lokal bleibt alles gespeichert.";
  }

  async function writeCloud() {
    if (!state.cloudUser || typeof window.quizCloud?.saveLerncoach !== "function") return;
    try {
      await window.quizCloud.saveLerncoach(state.progress);
      setSync(syncedText());
    } catch (error) {
      setSync(cloudErrorText(error), true);
    }
  }

  function queueCloud() {
    if (!state.cloudUser) return;
    clearTimeout(cloudTimer);
    setSync("Synchronisierung ausstehend …");
    cloudTimer = setTimeout(writeCloud, 800);
  }

  function initCloud() {
    if (cloudInitialised || typeof window.quizCloud?.loadLerncoach !== "function") return;
    cloudInitialised = true;
    window.quizCloud.onAuthChange(async user => {
      state.cloudUser = user;
      if (!user) return setSync("Fortschritt lokal gespeichert");
      setSync("Lerncoach-Fortschritt wird geladen …");
      try {
        const remote = await window.quizCloud.loadLerncoach();
        state.progress = L.mergeProgress(state.progress, remote);
        try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(state.progress)); } catch (_) {}
        if (!root.hidden) render();
        await window.quizCloud.saveLerncoach(state.progress);
        setSync(syncedText());
      } catch (error) {
        setSync(cloudErrorText(error), true);
      }
    });
  }

  // Schnittstelle für Export/Import/Löschen im Dashboard
  window.lerncoach = {
    exportState: () => JSON.parse(JSON.stringify(state.progress)),
    importState(data) {
      state.progress = L.normaliseProgress(data);
      state.session = null;
      persist();
      if (!root.hidden) render();
    },
    clearLocal() { try { localStorage.removeItem(PROGRESS_KEY); } catch (_) {} }
  };

  /* ---------- Inhalte laden ---------- */

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async function loadContent() {
    const files = Array.isArray(window.LERNCOACH_MANIFEST?.files) ? window.LERNCOACH_MANIFEST.files : [];
    for (const file of files) {
      const before = L.registeredSubjects().length;
      try {
        await loadScript(file);
      } catch (_) {
        state.fileErrors.push({ file, message: "Datei konnte nicht geladen werden (Pfad im Manifest prüfen)." });
        continue;
      }
      const added = L.registeredSubjects().slice(before);
      if (!added.length) state.fileErrors.push({ file, message: "Datei registriert kein Fach (Syntaxfehler oder Lerncoach.registerSubject fehlt)." });
      added.forEach(entry => state.entries.push({ ...entry, file }));
    }
    state.loaded = true;
    if (!root.hidden) render();
  }

  function validEntries() { return state.entries.filter(entry => !entry.errors.length); }

  function findSubject(subjectId) {
    return validEntries().find(entry => entry.subject.id === subjectId)?.subject || null;
  }

  /* ---------- Routing ---------- */

  function parseHash() {
    let hash = "";
    try { hash = decodeURIComponent(location.hash || ""); } catch (_) { hash = location.hash || ""; }
    if (hash !== ROUTE_PREFIX && !hash.startsWith(`${ROUTE_PREFIX}/`)) return null;
    const [subjectId, weekId, mode] = hash.slice(ROUTE_PREFIX.length).split("/").filter(Boolean);
    if (!subjectId) return { view: "subjects" };
    if (!weekId) return { view: "weeks", subjectId };
    return { view: mode === "quiz" ? "quiz" : "lecture", subjectId, weekId };
  }

  function hrefFor(route) {
    if (route.view === "subjects") return ROUTE_PREFIX;
    const base = `${ROUTE_PREFIX}/${encodeURIComponent(route.subjectId)}`;
    if (route.view === "weeks") return base;
    return `${base}/${encodeURIComponent(route.weekId)}${route.view === "quiz" ? "/quiz" : ""}`;
  }

  function setMode(coach) {
    quizView.hidden = coach;
    root.hidden = !coach;
    quizTab.classList.toggle("is-active", !coach);
    coachTab.classList.toggle("is-active", coach);
    quizTab.setAttribute("aria-pressed", String(!coach));
    coachTab.setAttribute("aria-pressed", String(coach));
    try { localStorage.setItem(MODE_KEY, coach ? "coach" : "quiz"); } catch (_) {}
  }

  function applyRoute() {
    const route = parseHash();
    setMode(Boolean(route));
    if (!route) return;
    state.lastCoachHash = location.hash;
    const changedView = route.view !== state.route.view || route.subjectId !== state.route.subjectId || route.weekId !== state.route.weekId;
    state.route = route;
    render();
    if (changedView) root.scrollIntoView({ block: "start" });
  }

  /* ---------- Bausteine ---------- */

  function accentOf(subject) {
    return /^#[0-9a-f]{3,8}$/i.test(String(subject.accent || "")) ? subject.accent : "var(--blue)";
  }

  function markOf(subject) {
    return String(subject.short || subject.id).slice(0, 4);
  }

  function weekNumber(week, index) {
    return Number.isInteger(week.number) ? week.number : index + 1;
  }

  function bar(percent, label) {
    const value = Math.max(0, Math.min(100, Math.round(percent)));
    return `<span class="lc-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${value}" aria-label="${esc(label)}"><span style="width:${value}%"></span></span>`;
  }

  function badge(status) {
    const info = STATUS_INFO[status];
    return `<span class="status" style="--status-color:${info.color};--status-bg:${info.background}">${esc(info.label)}</span>`;
  }

  function header(eyebrow, title, lead, crumbs = []) {
    const trail = crumbs.length ? `<nav class="lc-crumbs" aria-label="Pfad">${crumbs.map(crumb => crumb.href
      ? `<a href="${crumb.href}">${esc(crumb.label)}</a>` : `<span aria-current="page">${esc(crumb.label)}</span>`).join('<span aria-hidden="true">›</span>')}</nav>` : "";
    return `<header class="lc-head">
      <div>${trail}<p class="lc-eyebrow">${esc(eyebrow)}</p><h2 class="lc-title">${esc(title)}</h2>${lead ? `<p class="lc-lead">${esc(lead)}</p>` : ""}</div>
      <p class="lc-sync${state.sync.error ? " is-error" : ""}" data-sync role="status">${esc(state.sync.text)}</p>
    </header>`;
  }

  function emptyCard(title, text, href, linkLabel) {
    return `<div class="empty"><strong>${esc(title)}</strong>${esc(text)}${href ? `<p><a class="button small lc-btn-ghost" href="${href}">${esc(linkLabel)}</a></p>` : ""}</div>`;
  }

  /* ---------- Ansicht 1: Fach-Übersicht ---------- */

  function renderSubjects() {
    const entries = validEntries();
    const states = entries.map(entry => ({ subject: entry.subject, state: L.subjectState(entry.subject, state.progress) }));
    const totals = states.reduce((sum, item) => ({
      weeks: sum.weeks + item.state.totalWeeks,
      passedWeeks: sum.passedWeeks + item.state.passedWeeks,
      checkpoints: sum.checkpoints + item.state.totalCheckpoints,
      passedCheckpoints: sum.passedCheckpoints + item.state.passedCheckpoints
    }), { weeks: 0, passedWeeks: 0, checkpoints: 0, passedCheckpoints: 0 });

    const tiles = states.map(({ subject, state: subjectState }) => {
      const next = subjectState.weeks.find(week => week.status === "ready");
      const soon = subjectState.soonWeeks ? `<span class="lc-muted">${subjectState.soonWeeks} ${subjectState.soonWeeks === 1 ? "Woche folgt" : "Wochen folgen"}</span>` : "";
      const progressText = subjectState.totalWeeks
        ? `${subjectState.passedWeeks} / ${subjectState.totalWeeks} Wochen bestanden`
        : "Noch keine Wochen mit Inhalten";
      return `<a class="lc-tile lc-subject" href="${hrefFor({ view: "weeks", subjectId: subject.id })}" style="--accent:${accentOf(subject)}">
        <span class="lc-subject-top">
          <span class="subject-mark">${esc(markOf(subject))}</span>
          <span><span class="lc-tile-title">${esc(subject.name)}</span><span class="lc-tile-sub">${esc(subject.description || "")}</span></span>
        </span>
        <span class="lc-tile-progress"><strong>${esc(progressText)}</strong>${soon}</span>
        ${bar(subjectState.percent, `${subject.name}: ${progressText}`)}
        <span class="lc-tile-foot">${next ? `Als Nächstes: Woche ${weekNumber(next.week, next.weekIndex)} · ${esc(next.week.title)}` : subjectState.totalWeeks && subjectState.passedWeeks === subjectState.totalWeeks ? "Alles bestanden ✓" : "Wochen ansehen"}<span aria-hidden="true">→</span></span>
      </a>`;
    }).join("");

    const broken = [
      ...state.entries.filter(entry => entry.errors.length).map(entry => ({ title: `${entry.subject?.name || entry.subject?.id || "Unbekanntes Fach"} (${entry.file})`, errors: entry.errors })),
      ...state.fileErrors.map(item => ({ title: item.file, errors: [item.message] }))
    ].map(item => `<details class="lc-broken"><summary>Inhalt fehlerhaft: ${esc(item.title)}</summary><ul>${item.errors.slice(0, 12).map(error => `<li>${esc(error)}</li>`).join("")}</ul></details>`).join("");

    return `${header("Lerncoach", "Fach wählen", "Wähle ein Fach und eine Woche. Lerne mit Erklärungen Folie für Folie oder geh direkt ins Quiz.")}
      <section class="lc-stats" aria-label="Lerncoach-Übersicht">
        <div class="summary-card"><span>Wochen bestanden</span><strong>${totals.passedWeeks} / ${totals.weeks}</strong><em>alle Checkpoints einer Woche bestanden</em></div>
        <div class="summary-card"><span>Checkpoints</span><strong>${totals.passedCheckpoints} / ${totals.checkpoints}</strong><em>mit 100 % bestanden</em></div>
        <div class="summary-card"><span>Fächer</span><strong>${entries.length}</strong><em>im Lerncoach verfügbar</em></div>
      </section>
      ${broken}
      ${tiles ? `<div class="lc-grid">${tiles}</div>` : emptyCard("Noch keine Fächer im Lerncoach.", "Ergänze eine Inhaltsdatei in lerncoach/manifest.js.")}`;
  }

  /* ---------- Ansicht 2: Wochen-Übersicht ---------- */

  function lockText(subject, weekState) {
    const previous = weekState.previousWeek;
    const label = previous ? `Woche ${weekNumber(previous, subject.weeks.indexOf(previous))}` : "der Vorwoche";
    return `Freischaltung: ${weekState.requiredPoints} ${weekState.requiredPoints === 1 ? "bestandener Checkpoint" : "bestandene Checkpoints"} aus ${label} nötig (bisher ${weekState.previousPassed})`;
  }

  function renderWeeks(subject) {
    const subjectState = L.subjectState(subject, state.progress);
    const cards = subjectState.weeks.map(weekState => {
      const { week, weekIndex, status } = weekState;
      const info = STATUS_INFO[status];
      const slides = (week.items || []).filter(item => item.type === "slide").length;
      const meta = status === "soon" ? "Inhalte werden noch ergänzt." : `${slides} ${slides === 1 ? "Folie" : "Folien"} · ${weekState.totalCheckpoints} ${weekState.totalCheckpoints === 1 ? "Checkpoint" : "Checkpoints"}`;
      const position = weekState.position;
      const lectureLabel = status === "passed" ? "Vorlesung wiederholen" : position && position.index > 0 && !position.finished ? "Vorlesung fortsetzen" : "Vorlesung starten";
      const open = L.canEnter(weekState);
      const actions = open ? `<div class="lc-week-actions">
          <a class="button lc-btn-primary" href="${hrefFor({ view: "lecture", subjectId: subject.id, weekId: week.id })}">${lectureLabel}</a>
          ${weekState.totalCheckpoints ? `<a class="button lc-btn-ghost" href="${hrefFor({ view: "quiz", subjectId: subject.id, weekId: week.id })}">Nur Quiz machen</a>` : ""}
        </div>` : "";
      return `<article class="lc-week is-${status}" style="--status-color:${info.color};--status-bg:${info.background}">
        <div class="quiz-topline"><span class="week">Woche ${esc(weekNumber(week, weekIndex))}</span>${badge(status)}</div>
        <h3>${esc(week.title)}</h3>
        <p class="source">${esc(meta)}</p>
        ${status !== "soon" ? `<div class="lc-week-progress"><span>${weekState.passedCheckpoints} / ${weekState.totalCheckpoints} Checkpoints</span>${bar(weekState.percent, `Woche ${weekNumber(week, weekIndex)}: ${weekState.percent} %`)}</div>` : ""}
        ${status === "locked" ? `<p class="lc-lock"><span aria-hidden="true">🔒</span> ${esc(lockText(subject, weekState))}</p>` : ""}
        ${actions}
      </article>`;
    }).join("");

    const progressText = subjectState.totalWeeks ? `${subjectState.passedWeeks} / ${subjectState.totalWeeks} Wochen bestanden` : "Noch keine Wochen mit Inhalten";
    return `${header(subject.id, subject.name, subject.description || "", [{ label: "Lerncoach", href: ROUTE_PREFIX }, { label: subject.name }])}
      <section class="lc-subject-bar" style="--accent:${accentOf(subject)}">
        <span class="subject-mark">${esc(markOf(subject))}</span>
        <div><strong>${esc(progressText)}</strong>${bar(subjectState.percent, progressText)}</div>
        <span class="lc-muted">${subjectState.passedCheckpoints} / ${subjectState.totalCheckpoints} Checkpoints</span>
      </section>
      ${cards ? `<div class="lc-week-grid">${cards}</div>` : emptyCard("Noch keine Wochen.", "Für dieses Fach sind noch keine Wochen eingetragen.")}`;
  }

  /* ---------- Ansicht 3 + 4: Vorlesungs-Player und Nur-Quiz ---------- */

  function isPassed(session, checkpointId) {
    return L.isCheckpointPassed(state.progress, session.subject.id, session.week.id, checkpointId);
  }

  function reachable(session) {
    return L.maxReachableIndex({ items: session.items }, id => isPassed(session, id));
  }

  function ensureSession(subject, weekIndex, mode) {
    const week = subject.weeks[weekIndex];
    const key = `${mode}:${subject.id}:${week.id}`;
    if (state.session?.key === key) return state.session;
    const items = mode === "quiz" ? L.checkpointsOf(week) : week.items;
    const session = { key, mode, subject, week, weekIndex, items, index: 0, checkpoints: {} };
    if (mode === "lecture") {
      const saved = state.progress.positions[L.weekKey(subject.id, week.id)];
      if (saved && saved.index < items.length) session.index = saved.index;
    }
    session.index = Math.min(session.index, reachable(session), items.length);
    state.session = session;
    return session;
  }

  function checkpointState(session, checkpoint) {
    if (!session.checkpoints[checkpoint.id]) {
      const layout = {};
      checkpoint.questions.forEach(question => {
        if (question.type === "multi" || question.type === "single") layout[question.id] = L.shuffledIndices(question.options.length);
        if (question.type === "order") layout[question.id] = L.shuffledIndices(question.items.length, { avoidIdentity: true });
      });
      session.checkpoints[checkpoint.id] = { answers: {}, phase: "answer", grade: null, layout };
    }
    return session.checkpoints[checkpoint.id];
  }

  function renderDots(session) {
    const max = reachable(session);
    return `<ol class="lc-dots" aria-label="Fortschritt in dieser Woche">${session.items.map((item, index) => {
      const checkpoint = item.type === "checkpoint";
      const classes = ["lc-dot", checkpoint ? "is-checkpoint" : "is-slide"];
      if (index === session.index) classes.push("is-current");
      if (index < session.index) classes.push("is-visited");
      if (checkpoint && isPassed(session, item.id)) classes.push("is-passed");
      const label = `${index + 1}: ${checkpoint ? "Checkpoint" : "Folie"} ${item.title || ""}`.trim();
      return `<li><button type="button" class="${classes.join(" ")}" data-action="goto" data-index="${index}" ${index > max ? "disabled" : ""} ${index === session.index ? 'aria-current="step"' : ""} aria-label="${esc(label)}" title="${esc(label)}"></button></li>`;
    }).join("")}</ol>`;
  }

  function renderBlock(block) {
    if (typeof block === "string") return `<p>${L.formatInline(block)}</p>`;
    return `<ul>${block.list.map(entry => `<li>${L.formatInline(entry)}</li>`).join("")}</ul>`;
  }

  function renderSlide(session, slide) {
    const remember = slide.remember === undefined ? [] : Array.isArray(slide.remember) ? slide.remember : [slide.remember];
    return `<article class="lc-card lc-slide">
      <p class="lc-card-eyebrow">Folie · Schritt ${session.index + 1} von ${session.items.length}</p>
      <h2>${esc(slide.title)}</h2>
      <div class="lc-prose">${slide.body.map(renderBlock).join("")}</div>
      ${remember.length ? `<aside class="lc-remember"><strong>Kurz gemerkt</strong>${remember.length === 1 ? `<p>${L.formatInline(remember[0])}</p>` : `<ul>${remember.map(entry => `<li>${L.formatInline(entry)}</li>`).join("")}</ul>`}</aside>` : ""}
    </article>`;
  }

  function renderOrder(checkpoint, question, cpState, locked) {
    const built = Array.isArray(cpState.answers[question.id]) ? cpState.answers[question.id] : [];
    const pool = cpState.layout[question.id].filter(index => !built.includes(index));
    const data = `data-cp="${esc(checkpoint.id)}" data-q="${esc(question.id)}"`;
    return `<ol class="lc-order-built" aria-label="Deine Reihenfolge">${built.length ? built.map((itemIndex, position) => `<li><button type="button" class="lc-chip is-built" data-action="order-remove" ${data} data-pos="${position}" ${locked ? "disabled" : ""}><span class="lc-chip-num">${position + 1}</span>${esc(question.items[itemIndex])}${locked ? "" : '<span class="lc-chip-x" aria-hidden="true">✕</span>'}</button></li>`).join("")
      : '<li class="lc-order-empty">Tippe die Begriffe unten in der richtigen Reihenfolge an.</li>'}</ol>
      ${pool.length && !locked ? `<div class="lc-order-pool" aria-label="Verfügbare Begriffe">${pool.map(itemIndex => `<button type="button" class="lc-chip" data-action="order-add" ${data} data-item="${itemIndex}">${esc(question.items[itemIndex])}</button>`).join("")}</div>` : ""}`;
  }

  function renderChoices(checkpoint, question, cpState, locked, result) {
    const multi = question.type === "multi";
    const answer = cpState.answers[question.id];
    const chosen = new Set(multi ? (Array.isArray(answer) ? answer : []) : Number.isInteger(answer) ? [answer] : []);
    const correct = new Set(multi ? question.correct : [question.correct]);
    const name = `lc-${checkpoint.id}-${question.id}`;
    return `<div class="lc-options">${cpState.layout[question.id].map(optionIndex => {
      let mark = "";
      if (result) {
        if (correct.has(optionIndex) && chosen.has(optionIndex)) mark = '<span class="lc-mark ok">✓ richtig gewählt</span>';
        else if (correct.has(optionIndex)) mark = '<span class="lc-mark miss">fehlte</span>';
        else if (chosen.has(optionIndex)) mark = '<span class="lc-mark bad">falsch gewählt</span>';
      }
      return `<label class="lc-option${chosen.has(optionIndex) ? " is-chosen" : ""}">
        <input type="${multi ? "checkbox" : "radio"}" name="${esc(name)}" value="${optionIndex}" data-cp="${esc(checkpoint.id)}" data-q="${esc(question.id)}" ${chosen.has(optionIndex) ? "checked" : ""} ${locked ? "disabled" : ""}>
        <span>${esc(question.options[optionIndex])}</span>${mark}
      </label>`;
    }).join("")}</div>`;
  }

  function renderQuestionBody(checkpoint, question, cpState) {
    const locked = cpState.phase !== "answer";
    const result = cpState.grade?.results[question.id] || null;
    if (question.type === "type") {
      return `<input class="lc-text" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" data-cp="${esc(checkpoint.id)}" data-q="${esc(question.id)}" value="${esc(cpState.answers[question.id] || "")}" placeholder="${esc(question.placeholder || "Antwort eintippen")}" aria-label="Antwort" ${locked ? "disabled" : ""}>`;
    }
    if (question.type === "order") return renderOrder(checkpoint, question, cpState, locked);
    return renderChoices(checkpoint, question, cpState, locked, result);
  }

  function renderQuestion(checkpoint, question, index, cpState) {
    const result = cpState.grade?.results[question.id] || null;
    const feedback = !result ? "" : result.correct
      ? `<div class="lc-q-result is-ok"><strong>✓ Richtig</strong>${question.explanation ? `<p>${L.formatInline(question.explanation)}</p>` : ""}</div>`
      : `<div class="lc-q-result is-bad"><strong>Richtig wäre:</strong> ${esc(result.expected)}${question.type === "type" && question.accept.length > 1 ? `<p class="lc-muted">Ebenfalls akzeptiert: ${esc(question.accept.slice(1).join(", "))}</p>` : ""}${question.explanation ? `<p>${L.formatInline(question.explanation)}</p>` : ""}</div>`;
    return `<li class="lc-q${result ? (result.correct ? " is-ok" : " is-bad") : ""}">
      <div class="lc-q-head"><span class="lc-q-num">${index + 1}</span><span class="lc-q-type">${esc(TYPE_LABELS[question.type])}</span></div>
      <p class="lc-q-prompt">${L.formatInline(question.prompt)}</p>
      <div class="lc-q-body" data-qbody="${esc(checkpoint.id)}:${esc(question.id)}">${renderQuestionBody(checkpoint, question, cpState)}</div>
      ${feedback}
    </li>`;
  }

  function openCount(checkpoint, cpState) {
    return checkpoint.questions.filter(question => !L.isAnswered(question, cpState.answers[question.id])).length;
  }

  function checkControls(checkpoint, cpState) {
    const open = openCount(checkpoint, cpState);
    return `<button class="button lc-btn-primary" type="button" data-action="check" data-cp="${esc(checkpoint.id)}" ${open ? "disabled" : ""}>Checkpoint prüfen</button>
      <span class="lc-muted" data-open-count>${open ? `Noch ${open} ${open === 1 ? "Frage" : "Fragen"} offen` : "Alle Fragen beantwortet"}</span>`;
  }

  function renderCheckpoint(session, checkpoint) {
    const cpState = checkpointState(session, checkpoint);
    const already = isPassed(session, checkpoint.id);
    const total = checkpoint.questions.length;
    let footer = `<div class="lc-check-row" data-check-row="${esc(checkpoint.id)}">${checkControls(checkpoint, cpState)}</div>`;
    if (cpState.phase === "passed") {
      footer = `<div class="lc-feedback is-pass" tabindex="-1" data-feedback>
        <strong>Bestanden ✓, weiter geht's!</strong><span>Alle ${total} Fragen richtig.</span>
        <button class="button lc-btn-primary" type="button" data-action="next">Weiter →</button>
      </div>`;
    } else if (cpState.phase === "failed") {
      footer = `<div class="lc-feedback is-fail" tabindex="-1" data-feedback>
        <strong>${cpState.grade.correctCount} von ${total} richtig.</strong><span>Für den Checkpoint braucht es alle ${total}. Schau dir die richtigen Antworten an und versuch es nochmal.</span>
        <button class="button lc-btn-primary" type="button" data-action="retry" data-cp="${esc(checkpoint.id)}">Nochmal versuchen</button>
      </div>`;
    }
    const step = session.mode === "quiz" ? `Checkpoint ${session.index + 1} von ${session.items.length}` : `Checkpoint · Schritt ${session.index + 1} von ${session.items.length}`;
    return `<article class="lc-card lc-checkpoint">
      <div class="lc-card-top"><p class="lc-card-eyebrow">${step}</p>${already ? badge("passed") : ""}</div>
      <h2>${esc(checkpoint.title || "Checkpoint")}</h2>
      <p class="lc-card-lead">${already ? "Du hast diesen Checkpoint bereits bestanden. Du kannst ihn zur Übung nochmals lösen oder direkt weitergehen." : `Beantworte alle ${total} Fragen richtig, um weiterzukommen.`}</p>
      <ol class="lc-questions">${checkpoint.questions.map((question, index) => renderQuestion(checkpoint, question, index, cpState)).join("")}</ol>
      ${footer}
    </article>`;
  }

  function nextWeekInfo(subject, weekIndex) {
    for (let index = weekIndex + 1; index < subject.weeks.length; index += 1) {
      const weekState = L.weekState(subject, index, state.progress);
      if (weekState.status === "soon") continue;
      return weekState;
    }
    return null;
  }

  function renderFinish(session) {
    const weekState = L.weekState(session.subject, session.weekIndex, state.progress);
    const next = nextWeekInfo(session.subject, session.weekIndex);
    const weeksHref = hrefFor({ view: "weeks", subjectId: session.subject.id });
    let nextAction = "";
    if (next && L.canEnter(next)) {
      nextAction = `<a class="button lc-btn-primary" href="${hrefFor({ view: "lecture", subjectId: session.subject.id, weekId: next.week.id })}">Weiter mit Woche ${esc(weekNumber(next.week, next.weekIndex))} →</a>`;
    } else if (next) {
      nextAction = `<p class="lc-lock"><span aria-hidden="true">🔒</span> Woche ${esc(weekNumber(next.week, next.weekIndex))} ist noch gesperrt. ${esc(lockText(session.subject, next))}</p>`;
    }
    const passed = weekState.status === "passed";
    return `<article class="lc-card lc-finish">
      <div class="lc-finish-icon" aria-hidden="true">${passed ? "✓" : "…"}</div>
      <h2>${passed ? `Woche ${esc(weekNumber(session.week, session.weekIndex))} bestanden ✓` : "Durchgang beendet"}</h2>
      <p class="lc-card-lead">${weekState.totalCheckpoints ? `${weekState.passedCheckpoints} von ${weekState.totalCheckpoints} Checkpoints bestanden.` : "Alle Folien durchgearbeitet."} ${session.mode === "quiz" ? "Nur-Quiz-Durchgang abgeschlossen." : ""}</p>
      <div class="lc-week-actions">${nextAction}<a class="button lc-btn-ghost" href="${weeksHref}">Zur Wochenübersicht</a>
        <button class="button lc-btn-ghost" type="button" data-action="restart">${session.mode === "quiz" ? "Quiz nochmals machen" : "Vorlesung von vorne"}</button></div>
    </article>`;
  }

  function renderPlayer(subject, weekIndex, mode) {
    const week = subject.weeks[weekIndex];
    const weekState = L.weekState(subject, weekIndex, state.progress);
    const crumbs = [
      { label: "Lerncoach", href: ROUTE_PREFIX },
      { label: subject.name, href: hrefFor({ view: "weeks", subjectId: subject.id }) },
      { label: `Woche ${weekNumber(week, weekIndex)}` }
    ];
    const title = `Woche ${weekNumber(week, weekIndex)} · ${week.title}`;
    if (!L.canEnter(weekState)) {
      state.session = null;
      const text = weekState.status === "soon" ? "Für diese Woche gibt es noch keine Inhalte." : lockText(subject, weekState);
      return `${header(subject.name, title, "", crumbs)}${emptyCard(STATUS_INFO[weekState.status].label, text, hrefFor({ view: "weeks", subjectId: subject.id }), "Zur Wochenübersicht")}`;
    }
    const session = ensureSession(subject, weekIndex, mode);
    if (!session.items.length) return `${header(subject.name, title, "", crumbs)}${emptyCard("Keine Checkpoints.", "Diese Woche enthält nur Folien.", hrefFor({ view: "lecture", subjectId: subject.id, weekId: week.id }), "Vorlesung öffnen")}`;

    const finished = session.index >= session.items.length;
    const item = session.items[session.index];
    const card = finished ? renderFinish(session) : item.type === "slide" ? renderSlide(session, item) : renderCheckpoint(session, item);
    const blocked = !finished && item.type === "checkpoint" && !isPassed(session, item.id);
    const lastStep = session.index === session.items.length - 1;
    const modeLabel = mode === "quiz" ? "Nur Quiz" : "Vorlesung";
    const switchLink = mode === "quiz"
      ? `<a class="button small lc-btn-ghost" href="${hrefFor({ view: "lecture", subjectId: subject.id, weekId: week.id })}">Zur Vorlesung</a>`
      : (L.checkpointsOf(week).length ? `<a class="button small lc-btn-ghost" href="${hrefFor({ view: "quiz", subjectId: subject.id, weekId: week.id })}">Nur Quiz machen</a>` : "");

    return `${header(`${subject.name} · ${modeLabel}`, title, "", crumbs)}
      <section class="lc-player" style="--accent:${accentOf(subject)}" aria-label="${esc(modeLabel)}">
        <div class="lc-player-top">${renderDots(session)}<div class="lc-player-meta"><span>${finished ? "Abgeschlossen" : `${session.index + 1} / ${session.items.length}`}</span>${switchLink}</div></div>
        <div class="lc-stage" data-stage>${card}</div>
        ${finished ? "" : `<nav class="lc-nav" aria-label="Navigation">
          <button class="button lc-btn-ghost" type="button" data-action="prev" ${session.index === 0 ? "disabled" : ""}>← Zurück</button>
          <span class="lc-nav-hint">${blocked ? "Erst alle Fragen richtig beantworten" : ""}</span>
          <button class="button lc-btn-primary" type="button" data-action="next" ${blocked ? 'disabled aria-disabled="true"' : ""}>${lastStep ? "Abschliessen ✓" : "Weiter →"}</button>
        </nav>`}
      </section>`;
  }

  /* ---------- Rendern ---------- */

  function render() {
    if (root.hidden) return;
    if (!state.loaded) {
      root.innerHTML = `${header("Lerncoach", "Inhalte werden geladen …", "")}<div class="empty"><strong>Einen Moment.</strong>Die Fächer werden vorbereitet.</div>`;
      return;
    }
    const route = state.route;
    if (route.view === "subjects") {
      state.session = null;
      root.innerHTML = renderSubjects();
      return;
    }
    const subject = findSubject(route.subjectId);
    if (!subject) {
      state.session = null;
      root.innerHTML = `${header("Lerncoach", "Fach nicht gefunden", "")}${emptyCard("Dieses Fach gibt es im Lerncoach nicht.", `Kennung: ${route.subjectId}`, ROUTE_PREFIX, "Zur Fach-Übersicht")}`;
      return;
    }
    if (route.view === "weeks") {
      state.session = null;
      root.innerHTML = renderWeeks(subject);
      return;
    }
    const weekIndex = subject.weeks.findIndex(week => week.id === route.weekId);
    if (weekIndex < 0) {
      state.session = null;
      root.innerHTML = `${header(subject.name, "Woche nicht gefunden", "")}${emptyCard("Diese Woche gibt es nicht.", `Kennung: ${route.weekId}`, hrefFor({ view: "weeks", subjectId: subject.id }), "Zur Wochenübersicht")}`;
      return;
    }
    root.innerHTML = renderPlayer(subject, weekIndex, route.view);
  }

  function scrollToStage() {
    const stage = root.querySelector(".lc-player");
    if (stage && stage.getBoundingClientRect().top < 0) stage.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  function goTo(index) {
    const session = state.session;
    if (!session) return;
    const target = Math.max(0, Math.min(index, reachable(session), session.items.length));
    if (target === session.index) return;
    session.index = target;
    if (session.mode === "lecture") {
      L.setPosition(state.progress, session.subject.id, session.week.id, target, { finished: target >= session.items.length });
      persist();
    }
    render();
    scrollToStage();
    root.querySelector(".lc-card h2")?.setAttribute("tabindex", "-1");
    root.querySelector(".lc-card h2")?.focus({ preventScroll: true });
  }

  function currentCheckpoint(checkpointId) {
    const session = state.session;
    const checkpoint = session?.items.find(item => item.type === "checkpoint" && item.id === checkpointId);
    return checkpoint ? { session, checkpoint, cpState: checkpointState(session, checkpoint) } : null;
  }

  function refreshControls(checkpoint, cpState) {
    const row = root.querySelector(`[data-check-row="${CSS.escape(checkpoint.id)}"]`);
    if (row) row.innerHTML = checkControls(checkpoint, cpState);
  }

  function refreshQuestion(checkpoint, question, cpState, focusSelector) {
    const body = root.querySelector(`[data-qbody="${CSS.escape(`${checkpoint.id}:${question.id}`)}"]`);
    if (!body) return;
    body.innerHTML = renderQuestionBody(checkpoint, question, cpState);
    const focusTarget = (focusSelector && body.querySelector(focusSelector)) || body.querySelector("button:not([disabled]), input:not([disabled])");
    focusTarget?.focus();
  }

  function check(checkpointId) {
    const found = currentCheckpoint(checkpointId);
    if (!found) return;
    const { session, checkpoint, cpState } = found;
    if (cpState.phase !== "answer" || openCount(checkpoint, cpState)) return;
    cpState.grade = L.gradeCheckpoint(checkpoint, cpState.answers);
    cpState.phase = cpState.grade.passed ? "passed" : "failed";
    if (cpState.grade.passed && L.markCheckpointPassed(state.progress, session.subject.id, session.week.id, checkpoint.id)) persist();
    render();
    root.querySelector("[data-feedback]")?.focus({ preventScroll: true });
    root.querySelector("[data-feedback]")?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  function retry(checkpointId) {
    const session = state.session;
    if (!session) return;
    delete session.checkpoints[checkpointId];
    render();
    scrollToStage();
    root.querySelector(".lc-q input:not([disabled]), .lc-q button:not([disabled])")?.focus({ preventScroll: true });
  }

  /* ---------- Ereignisse ---------- */

  root.addEventListener("click", event => {
    const target = event.target.closest("[data-action]");
    if (!target || !root.contains(target) || target.disabled) return;
    const action = target.dataset.action;
    if (action === "prev") return goTo(state.session.index - 1);
    if (action === "next") return goTo(state.session.index + 1);
    if (action === "goto") return goTo(Number(target.dataset.index));
    if (action === "check") return check(target.dataset.cp);
    if (action === "retry") return retry(target.dataset.cp);
    if (action === "restart") {
      if (state.session) {
        state.session.checkpoints = {};
        state.session.index = -1;
        goTo(0);
      }
      return;
    }
    if (action === "order-add" || action === "order-remove") {
      const found = currentCheckpoint(target.dataset.cp);
      const question = found?.checkpoint.questions.find(item => item.id === target.dataset.q);
      if (!found || !question || found.cpState.phase !== "answer") return;
      const built = Array.isArray(found.cpState.answers[question.id]) ? found.cpState.answers[question.id].slice() : [];
      let focus = null;
      if (action === "order-add") {
        const itemIndex = Number(target.dataset.item);
        if (!built.includes(itemIndex)) built.push(itemIndex);
        focus = ".lc-order-pool .lc-chip";
      } else {
        const [removed] = built.splice(Number(target.dataset.pos), 1);
        focus = `.lc-order-pool [data-item="${removed}"]`;
      }
      found.cpState.answers[question.id] = built;
      refreshQuestion(found.checkpoint, question, found.cpState, focus);
      refreshControls(found.checkpoint, found.cpState);
    }
  });

  root.addEventListener("change", event => {
    const input = event.target;
    if (!input.matches?.(".lc-option input")) return;
    const found = currentCheckpoint(input.dataset.cp);
    const question = found?.checkpoint.questions.find(item => item.id === input.dataset.q);
    if (!found || !question || found.cpState.phase !== "answer") return;
    if (question.type === "single") {
      found.cpState.answers[question.id] = Number(input.value);
    } else {
      const body = input.closest(".lc-q-body");
      found.cpState.answers[question.id] = [...body.querySelectorAll("input:checked")].map(item => Number(item.value)).sort((a, b) => a - b);
    }
    input.closest(".lc-q-body").querySelectorAll(".lc-option").forEach(label => label.classList.toggle("is-chosen", label.querySelector("input").checked));
    refreshControls(found.checkpoint, found.cpState);
  });

  root.addEventListener("input", event => {
    const input = event.target;
    if (!input.matches?.(".lc-text")) return;
    const found = currentCheckpoint(input.dataset.cp);
    if (!found || found.cpState.phase !== "answer") return;
    found.cpState.answers[input.dataset.q] = input.value;
    refreshControls(found.checkpoint, found.cpState);
  });

  root.addEventListener("keydown", event => {
    if (event.key !== "Enter" || !event.target.matches?.(".lc-text")) return;
    event.preventDefault();
    const inputs = [...root.querySelectorAll(".lc-text:not([disabled])")];
    const next = inputs[inputs.indexOf(event.target) + 1];
    if (next) next.focus();
    else check(event.target.dataset.cp);
  });

  document.addEventListener("keydown", event => {
    if (root.hidden || !state.session || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
    if (event.target.closest?.("input, textarea, select, [contenteditable]") || event.altKey || event.ctrlKey || event.metaKey) return;
    if (!document.getElementById("player")?.hidden || !document.getElementById("leaderboardOverlay")?.hidden) return;
    const session = state.session;
    const item = session.items[session.index];
    if (event.key === "ArrowLeft") goTo(session.index - 1);
    else if (!(item?.type === "checkpoint" && !isPassed(session, item.id))) goTo(session.index + 1);
  });

  coachTab.addEventListener("click", () => {
    if (!parseHash()) location.hash = state.lastCoachHash || ROUTE_PREFIX;
    else if (location.hash !== ROUTE_PREFIX) location.hash = ROUTE_PREFIX;
  });

  quizTab.addEventListener("click", () => {
    if (!parseHash()) return;
    history.pushState(null, "", location.pathname + location.search);
    applyRoute();
  });

  window.addEventListener("hashchange", applyRoute);
  window.addEventListener("popstate", applyRoute);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden" && cloudTimer) {
      clearTimeout(cloudTimer);
      cloudTimer = null;
      void writeCloud();
    }
  });
  window.addEventListener("quiz-cloud-ready", initCloud);

  /* ---------- Start ---------- */

  let storedMode = "quiz";
  try { storedMode = localStorage.getItem(MODE_KEY) || "quiz"; } catch (_) {}
  if (!location.hash && storedMode === "coach") history.replaceState(null, "", `${location.pathname}${location.search}${ROUTE_PREFIX}`);
  applyRoute();
  initCloud();
  void loadContent();
})();
