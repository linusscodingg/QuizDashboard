const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const L = require(path.join(root, "lerncoach", "engine.js"));

/* ---------- Antworten prüfen ---------- */

const typeQuestion = { id: "t", type: "type", prompt: "?", accept: ["Session Initiation Protocol", "SIP"] };
assert.equal(L.checkQuestion(typeQuestion, "  sip ").correct, true, "Freitext: case-insensitive und getrimmt");
assert.equal(L.checkQuestion(typeQuestion, "session   initiation protocol.").correct, true, "Freitext: Leerraum und Satzzeichen am Ende egal");
assert.equal(L.checkQuestion(typeQuestion, "RTP").correct, false);
assert.equal(L.checkQuestion(typeQuestion, "").correct, false);
assert.equal(L.checkQuestion(typeQuestion, "RTP").expected, "Session Initiation Protocol");

const multiQuestion = { id: "m", type: "multi", prompt: "?", options: ["a", "b", "c", "d"], correct: [0, 2] };
assert.equal(L.checkQuestion(multiQuestion, [2, 0]).correct, true, "Multi: Reihenfolge der Auswahl egal");
assert.equal(L.checkQuestion(multiQuestion, [0]).correct, false, "Multi: fehlende richtige Antwort ist falsch");
assert.equal(L.checkQuestion(multiQuestion, [0, 1, 2]).correct, false, "Multi: zusätzliche falsche Antwort ist falsch");
assert.equal(L.checkQuestion(multiQuestion, undefined).correct, false);

const orderQuestion = { id: "o", type: "order", prompt: "?", items: ["INVITE", "180 Ringing", "200 OK", "ACK"] };
assert.equal(L.checkQuestion(orderQuestion, [0, 1, 2, 3]).correct, true);
assert.equal(L.checkQuestion(orderQuestion, [0, 2, 1, 3]).correct, false);
assert.equal(L.checkQuestion(orderQuestion, [0, 1, 2]).correct, false, "Order: unvollständig ist falsch");
assert.equal(L.checkQuestion(orderQuestion, []).expected, "INVITE → 180 Ringing → 200 OK → ACK");

const singleQuestion = { id: "s", type: "single", prompt: "?", options: ["x", "y"], correct: 1 };
assert.equal(L.checkQuestion(singleQuestion, 1).correct, true);
assert.equal(L.checkQuestion(singleQuestion, 0).correct, false);

assert.equal(L.isAnswered(orderQuestion, [0, 1]), false);
assert.equal(L.isAnswered(orderQuestion, [3, 2, 1, 0]), true);
assert.equal(L.isAnswered(typeQuestion, "   "), false);

const checkpoint = { type: "checkpoint", id: "cp1", questions: [typeQuestion, multiQuestion, orderQuestion] };
let grade = L.gradeCheckpoint(checkpoint, { t: "SIP", m: [0, 2], o: [0, 1, 3, 2] });
assert.equal(grade.passed, false, "Checkpoint verlangt 100 %");
assert.equal(grade.correctCount, 2);
assert.equal(grade.results.o.correct, false);
grade = L.gradeCheckpoint(checkpoint, { t: "SIP", m: [0, 2], o: [0, 1, 2, 3] });
assert.equal(grade.passed, true);

/* ---------- Nochmal versuchen: Richtiges bleibt richtig ---------- */

{
  const retryState = {
    answers: { t: "SIP", m: [0], o: [0, 1, 3, 2] },   // t richtig, m halb richtig, o halb richtig
    phase: "failed",
    grade: L.gradeCheckpoint(checkpoint, { t: "SIP", m: [0], o: [0, 1, 3, 2] }),
    layout: { m: [3, 1, 0, 2], o: [3, 2, 1, 0] },
    locked: {}
  };
  assert.equal(retryState.grade.correctCount, 1);
  assert.deepEqual(L.prepareRetry(checkpoint, retryState, question => (question.type === "multi" ? [0, 1, 2, 3] : question.type === "order" ? [1, 0, 3, 2] : undefined)),
    { kept: 1, reopened: 2 });
  assert.equal(retryState.phase, "answer", "Phase geht zurück auf answer");
  assert.equal(retryState.grade, null);
  assert.deepEqual(retryState.locked, { t: true }, "nur die richtige Frage ist gesperrt");
  assert.equal(retryState.answers.t, "SIP", "richtige Antwort bleibt stehen");
  assert.equal("m" in retryState.answers, false, "halb richtige multi-Frage wird geleert");
  assert.equal("o" in retryState.answers, false, "halb richtige order-Frage wird geleert");
  assert.deepEqual(retryState.layout, { m: [0, 1, 2, 3], o: [1, 0, 3, 2] }, "freigegebene Fragen bekommen ein neues Layout");
  assert.equal(L.isQuestionLocked(retryState, "t"), true);
  assert.equal(L.isQuestionLocked(retryState, "m"), false);
  assert.equal(L.openQuestionCount(checkpoint, retryState), 2, "nur die zwei offenen Fragen zählen");

  retryState.answers.m = [0, 2];
  assert.equal(L.openQuestionCount(checkpoint, retryState), 1);
  retryState.answers.o = [0, 1, 2, 3];
  assert.equal(L.openQuestionCount(checkpoint, retryState), 0);
  const second = L.gradeCheckpoint(checkpoint, retryState.answers);
  assert.equal(second.passed, true, "bestanden, sobald alle Fragen richtig sind, egal in welchem Versuch");

  // zweiter Fehlversuch: gesperrte Fragen bleiben gesperrt, neu Richtiges kommt dazu
  const again = {
    answers: { t: "SIP", m: [0, 2], o: [0, 1, 3, 2] }, phase: "failed",
    grade: L.gradeCheckpoint(checkpoint, { t: "SIP", m: [0, 2], o: [0, 1, 3, 2] }),
    layout: {}, locked: { t: true }
  };
  assert.deepEqual(L.prepareRetry(checkpoint, again), { kept: 2, reopened: 1 });
  assert.deepEqual(again.locked, { t: true, m: true });
  assert.equal(L.openQuestionCount(checkpoint, again), 1);

  // ohne Bewertung passiert nichts
  const untouched = { answers: { t: "x" }, phase: "answer", grade: null, layout: {}, locked: {} };
  assert.deepEqual(L.prepareRetry(checkpoint, untouched), { kept: 0, reopened: 0 });
  assert.deepEqual(untouched.answers, { t: "x" });
  assert.equal(L.openQuestionCount(checkpoint, { answers: {}, locked: {} }), 3, "ohne gesperrte Fragen zählt jede unbeantwortete");
}

/* ---------- Mischen ---------- */

let seed = 1;
const rng = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
for (let round = 0; round < 50; round += 1) {
  const order = L.shuffledIndices(4, { rng, avoidIdentity: true });
  assert.deepEqual([...order].sort(), [0, 1, 2, 3]);
  assert.notDeepEqual(order, [0, 1, 2, 3], "Reihenfolge-Fragen dürfen nicht gelöst starten");
}
assert.deepEqual(L.shuffledIndices(2, { rng: () => 0.99, avoidIdentity: true }), [1, 0]);

/* ---------- Sicherheit der Textausgabe ---------- */

assert.equal(L.formatInline("<img src=x onerror=alert(1)> **fett** `code`"),
  "&lt;img src=x onerror=alert(1)&gt; <strong>fett</strong> <code>code</code>");

/* ---------- Status, Sperren, Fortschritt ---------- */

const slide = { type: "slide", title: "Folie", body: ["Text"] };
const makeCheckpoint = id => ({ type: "checkpoint", id, questions: [typeQuestion, multiQuestion] });
const subject = {
  id: "TEST",
  name: "Testfach",
  weeks: [
    { id: "w1", title: "Eins", status: "ready", items: [slide, makeCheckpoint("a"), slide, makeCheckpoint("b")] },
    { id: "w2", title: "Zwei", status: "ready", requiredPoints: 1, items: [slide, makeCheckpoint("c")] },
    { id: "w3", title: "Drei", status: "soon" },
    { id: "w4", title: "Vier", status: "locked", items: [makeCheckpoint("d")] },
    { id: "w5", title: "Fünf", status: "ready", items: [slide] }
  ]
};
assert.deepEqual(L.validateSubject(subject), []);

let progress = L.emptyProgress();
let states = L.subjectState(subject, progress).weeks.map(state => state.status);
assert.deepEqual(states, ["ready", "locked", "soon", "locked", "ready"]);
assert.equal(L.subjectState(subject, progress).totalWeeks, 4, "Wochen ohne Inhalte zählen nicht zu Y");

assert.equal(L.maxReachableIndex(subject.weeks[0], id => L.isCheckpointPassed(progress, "TEST", "w1", id)), 1);
assert.equal(L.markCheckpointPassed(progress, "TEST", "w1", "a", new Date("2026-09-01T10:00:00Z")), true);
assert.equal(L.markCheckpointPassed(progress, "TEST", "w1", "a"), false, "Bestanden bleibt bestanden (keine Doppelzählung)");
assert.equal(L.maxReachableIndex(subject.weeks[0], id => L.isCheckpointPassed(progress, "TEST", "w1", id)), 3);

let week2 = L.weekState(subject, 1, progress);
assert.equal(week2.status, "ready", "requiredPoints: 1 von Woche 1 reicht");
assert.equal(week2.previousPassed, 1);
L.markCheckpointPassed(progress, "TEST", "w2", "c");
assert.equal(L.weekState(subject, 1, progress).status, "passed");
let week4 = L.weekState(subject, 3, progress);
assert.equal(week4.status, "ready", "locked ohne requiredPoints = alle Checkpoints der Vorwoche (w3 ist soon und wird übersprungen)");
assert.equal(week4.previousWeek.id, "w2");

L.markCheckpointPassed(progress, "TEST", "w1", "b");
assert.equal(L.weekState(subject, 0, progress).status, "passed");
assert.equal(L.weekState(subject, 4, progress).status, "ready", "Woche ohne Checkpoints gilt erst nach dem Durcharbeiten als bestanden");
L.setPosition(progress, "TEST", "w5", 1, { finished: true });
assert.equal(L.weekState(subject, 4, progress).status, "passed");
L.setPosition(progress, "TEST", "w5", 0);
assert.equal(L.weekState(subject, 4, progress).position.finished, true, "finished bleibt erhalten");

const summary = L.subjectState(subject, progress);
assert.equal(summary.passedWeeks, 3);
assert.equal(summary.passedCheckpoints, 3);
assert.equal(summary.totalCheckpoints, 4);

// Speichern und Zusammenführen (localStorage ↔ Firebase)
const restored = L.normaliseProgress(JSON.parse(JSON.stringify(progress)));
assert.deepEqual(restored, progress);
assert.deepEqual(L.normaliseProgress({ version: 2, checkpoints: { x: { passedAt: "2026-01-01T00:00:00Z" } } }), L.emptyProgress());
assert.deepEqual(Object.keys(L.normaliseProgress({ version: 1, checkpoints: { x: { passedAt: "kein Datum" } } }).checkpoints), []);

const remote = L.emptyProgress();
L.markCheckpointPassed(remote, "TEST", "w1", "a", new Date("2026-08-01T10:00:00Z"));
L.markCheckpointPassed(remote, "OTHER", "w1", "z");
L.setPosition(remote, "TEST", "w1", 2, { now: new Date("2030-01-01T00:00:00Z") });
const merged = L.mergeProgress(progress, remote);
assert.equal(merged.checkpoints["TEST:w1:a"].passedAt, "2026-08-01T10:00:00.000Z", "Frühestes Bestehen gewinnt");
assert.ok(merged.checkpoints["OTHER:w1:z"], "Checkpoints beider Seiten bleiben erhalten");
assert.ok(merged.checkpoints["TEST:w1:b"]);
assert.equal(merged.positions["TEST:w1"].index, 2, "Neuere Position gewinnt");
assert.equal(L.mergeProgress(null, undefined).version, 1);

/* ---------- Validierung ---------- */

const invalid = {
  id: "BAD",
  name: "Fehler",
  weeks: [
    { id: "w1", title: "A", status: "ready", items: [] },
    { id: "w1", title: "B", status: "later", items: [{ type: "checkpoint", id: "x", questions: [singleQuestion] }] },
    { id: "w3", title: "C", items: [
      { type: "checkpoint", id: "y", questions: [{ id: "q", type: "multi", prompt: "?", options: ["a", "b", "c"], correct: [5] }] },
      { type: "checkpoint", id: "y", questions: [{ id: "q", type: "order", prompt: "?", items: ["a", "A", "b"] }] },
      { type: "video" }
    ] }
  ]
};
const errors = L.validateSubject(invalid).join("\n");
assert.match(errors, /ohne Inhalte als status "soon"/);
assert.match(errors, /doppelte id w1/);
assert.match(errors, /status muss ready, locked oder soon/);
assert.match(errors, /nicht nur single-Fragen/);
assert.match(errors, /correct muss eine Liste gültiger Options-Indizes/);
assert.match(errors, /doppelte Checkpoint-id y/);
assert.match(errors, /items müssen eindeutig sein/);
assert.match(errors, /type muss slide oder checkpoint/);

L.resetRegistry();
assert.deepEqual(L.registerSubject(subject), []);
const originalWarn = console.warn;
console.warn = () => {};
assert.match(L.registerSubject(subject).join(), /mehrfach registriert/);
console.warn = originalWarn;
L.resetRegistry();

/* ---------- Echte Inhaltsdateien aus dem Manifest ---------- */

const manifestContext = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(root, "lerncoach", "manifest.js"), "utf8"), manifestContext);
const manifest = manifestContext.window.LERNCOACH_MANIFEST;
assert.equal(manifest.version, 1);
assert.ok(manifest.files.length > 0);
assert.equal(new Set(manifest.files).size, manifest.files.length, "Keine doppelten Manifest-Einträge");

const subjectIds = new Set();
for (const file of manifest.files) {
  const absolute = path.resolve(root, file);
  assert.ok(fs.existsSync(absolute), `Manifest verweist auf fehlende Datei: ${file}`);
  const registered = [];
  vm.runInNewContext(fs.readFileSync(absolute, "utf8"), { Lerncoach: { registerSubject: value => registered.push(value) } }, { filename: file });
  assert.equal(registered.length, 1, `${file} muss genau ein Fach registrieren`);
  const [content] = registered;
  assert.deepEqual(L.validateSubject(content), [], `${file} ist fehlerhaft`);
  assert.ok(!subjectIds.has(content.id), `Fach-id doppelt: ${content.id}`);
  subjectIds.add(content.id);
  for (const week of content.weeks) {
    for (const item of L.checkpointsOf(week)) {
      assert.ok(item.questions.length >= 3 && item.questions.length <= 5, `${file} ${week.id}/${item.id}: 3 bis 5 Fragen pro Checkpoint`);
    }
  }
}

/* ---------- Lernform-Bloecke im Folientext ---------- */

const goodBlocks = [
  "Reiner Text mit **fett** und \`code\`.",
  { list: ["Punkt A", "Punkt B"] },
  { callout: { tone: "def", title: "Unit of Observation", text: "Was eine Zeile darstellt." } },
  { callout: { tone: "exam", text: ["Erste Zeile", "Zweite Zeile"] } },
  { table: { caption: "Beispiel", head: ["Age", "Sex"], rows: [["67", "F"], ["74", "M"]], marks: { "1,1": "bad" }, note: "Fussnote" } },
  { flow: { steps: [{ title: "Look", text: "hinschauen" }, { title: "Decide" }], note: "Reihenfolge zaehlt" } },
  { compare: { left: { title: "Stratified", points: ["aus jedem Stratum"] }, right: { title: "Cluster", points: ["ganze Gruppen"] }, verdict: "Der Unterschied" } },
  { cards: [{ title: "A", text: "x" }, { title: "B", tone: "bad" }] },
  { formula: { main: "x = (a - b) / (c - b)", parts: [{ label: "a", text: "Rohwert" }], note: "Hinweis" } },
  { reveal: { question: "Was passiert?", answer: ["Das hier."], label: "Aufdecken" } },
  { checklist: { title: "Kann ich das?", items: ["Ich kann X erklaeren."] } },
  { sim: { kind: "minmax", label: "Glucose", min: 85, max: 148, start: 117, unit: "mg/dL" } },
  { chart: { kind: "histogram", panels: [{ title: "Kohorte A", counts: [1, 4, 2], start: 40, step: 10, mean: 60 }], xLabel: "Alter" } },
  { chart: { kind: "box", groups: [{ label: "Not readmitted", low: 0, q1: 2, median: 3, q3: 5, high: 9, outliers: [14] }] } },
  { chart: { kind: "scatter", panels: [{ title: "positiv", points: [[1, 1], [2, 2], [3, 3]] }] } },
  { chart: { kind: "heatmap", labels: ["Age", "Glucose"], matrix: [[1, 0.19], [0.19, 1]] } },
  { chart: { kind: "sampling", mode: "cluster", caption: "Cluster sampling" } }
];
for (const block of goodBlocks) {
  assert.equal(L.blockError(block), null, `gueltiger Block abgelehnt: ${JSON.stringify(block).slice(0, 70)}`);
}

const badBlocks = [
  [42, "Zahl ist kein Block"],
  [{}, "leeres Objekt"],
  [{ unbekannt: 1 }, "unbekannter Typ"],
  [{ list: [] }, "leere Liste"],
  [{ callout: { tone: "bunt", text: "x" } }, "ungueltiger callout-tone"],
  [{ callout: { tone: "def" } }, "callout ohne text"],
  [{ table: { head: ["a"], rows: [["1", "2"]] } }, "Zeile laenger als head"],
  [{ table: { head: ["a"], rows: [["1"]], marks: { "0,0": "pink" } } }, "ungueltiger Zellton"],
  [{ table: { head: ["a"], rows: [["1"]], marks: { oben: "bad" } } }, "ungueltiger marks-Schluessel"],
  [{ flow: { steps: [{ title: "nur einer" }] } }, "flow mit einem Schritt"],
  [{ compare: { left: { title: "L", points: ["x"] } } }, "compare ohne rechte Spalte"],
  [{ cards: [{ title: "nur eine" }] }, "cards mit einer Karte"],
  [{ formula: {} }, "formula ohne main"],
  [{ reveal: { question: "Q" } }, "reveal ohne answer"],
  [{ checklist: { items: [] } }, "leere checklist"],
  [{ sim: { kind: "minmax", label: "X", min: 10, max: 10, start: 10 } }, "sim mit min = max"],
  [{ sim: { kind: "irgendwas", label: "X", min: 1, max: 2, start: 1 } }, "unbekannte sim-Art"],
  [{ chart: { kind: "pie" } }, "unbekannte chart-Art"],
  [{ chart: { kind: "sampling", mode: "zufaellig" } }, "unbekannter sampling-mode"],
  [{ chart: { kind: "heatmap", labels: ["a", "b"], matrix: [[1, 0]] } }, "heatmap mit fehlender Zeile"],
  [{ chart: { kind: "box", groups: [{ label: "g", low: 5, q1: 4, median: 3, q3: 2, high: 1 }] } }, "box mit verdrehten Quartilen"],
  [{ chart: { kind: "scatter", panels: [{ title: "t", points: [[1, 1]] }] } }, "scatter mit zu wenig Punkten"]
];
for (const [block, why] of badBlocks) {
  assert.ok(typeof L.blockError(block) === "string", `ungueltiger Block akzeptiert: ${why}`);
}

// Bloecke muessen auch ueber validateSubject greifen
const brokenSubject = {
  id: "TEST", name: "Test", weeks: [{ id: "w1", title: "W", status: "ready", items: [
    { type: "slide", title: "S", body: ["ok", { chart: { kind: "pie" } }] }
  ] }]
};
const blockErrors = L.validateSubject(brokenSubject);
assert.ok(blockErrors.some(entry => /Block 2/.test(entry)), "validateSubject muss den fehlerhaften Block benennen");

// Rueckwaertskompatibel: reine Text- und Listen-Bodies bleiben gueltig
assert.deepEqual(L.validateSubject({
  id: "TEST2", name: "Test", weeks: [{ id: "w1", title: "W", status: "ready", items: [
    { type: "slide", title: "S", body: ["nur Text", { list: ["a"] }], remember: "merk" }
  ] }]
}), []);

/* ---------- Einbindung ins Dashboard ---------- */

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const pattern of [
  /<link rel="stylesheet" href="lerncoach\/lerncoach\.css">/,
  /<script src="lerncoach\/engine\.js"><\/script>\s*<script src="lerncoach\/manifest\.js"><\/script>\s*<script src="lerncoach\/ui\.js"><\/script>/,
  /id="modeQuizTab"/, /id="modeCoachTab"/, /id="quizView"/, /id="coachView"/,
  /window\.lerncoach\?\.exportState/, /window\.lerncoach\?\.importState/, /window\.lerncoach\?\.clearLocal/
]) assert.match(html, pattern);
assert.ok(html.indexOf("lerncoach/ui.js") < html.indexOf("firebase-sync.js"), "Lerncoach muss vor firebase-sync.js geladen werden (quiz-cloud-ready)");

const sync = fs.readFileSync(path.join(root, "firebase-sync.js"), "utf8");
assert.match(sync, /"lerncoach", "progress"/);
assert.match(sync, /loadLerncoach/);
assert.match(sync, /saveLerncoach/);
assert.match(sync, /deleteDoc\(lerncoachDocument\(user\.uid\)\)/);
const rules = fs.readFileSync(path.join(root, "firestore.rules"), "utf8");
assert.match(rules, /match \/users\/\{userId\}\/lerncoach\/\{documentId\}/);
assert.match(rules, /hasOnly\(\["version", "checkpoints", "positions", "updatedAt"\]\)/);

console.log("Lerncoach tests passed");
