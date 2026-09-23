const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const html = fs.readFileSync(path.resolve(__dirname, "../quizzes/ITRECHT/W2_IT_Vertraege_Open_Book.html"), "utf8");
const script = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
  .map(match => match[1]).find(value => value.trim());
assert.ok(script);

class FakeElement {
  constructor(id) {
    this.id = id;
    this.innerHTML = "";
    this.textContent = "";
    this.value = "";
    this.disabled = false;
    this.style = {};
    this.listeners = {};
    this.classList = { add() {}, remove() {} };
  }
  addEventListener(type, handler) { this.listeners[type] = handler; }
  querySelectorAll() { return []; }
  click() { this.listeners.click?.({ target: this }); }
}

function harness() {
  const elements = new Map();
  const element = id => {
    if (!elements.has(id)) elements.set(id, new FakeElement(id));
    return elements.get(id);
  };
  const storage = new Map();
  const messages = [];
  const parent = { postMessage: message => messages.push(message) };
  const listeners = {};
  const context = vm.createContext({
    console, Date, Math, JSON, Number, String, Array, Object, Map, Blob,
    URL: { createObjectURL: () => "blob:test", revokeObjectURL() {} },
    crypto: { randomUUID: () => `attempt-${Math.random()}` },
    localStorage: {
      getItem: key => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
      removeItem: key => storage.delete(key)
    },
    document: { getElementById: element, querySelectorAll: () => [], createElement: () => new FakeElement("created") },
    confirm: () => true,
    alert: message => { throw new Error(`Unexpected alert: ${message}`); }
  });
  context.window = context;
  context.window.parent = parent;
  context.window.opener = null;
  context.window.scrollTo = () => {};
  context.window.addEventListener = (type, handler) => { listeners[type] = handler; };
  vm.runInContext(script, context, { filename: "W2_IT_Vertraege_Open_Book.html" });
  return { context, element, storage, messages, parent, listeners };
}

const { context, element, storage, messages, parent, listeners } = harness();
assert.equal(vm.runInContext("questions.length", context), 13);
assert.equal(vm.runInContext("questions.filter(q => q.type === 'text').length", context), 1);
assert.equal(vm.runInContext("maxPoints", context), 100);
assert.equal(vm.runInContext("new Set(questions.map(q => q.id)).size", context), 13);
assert.equal(vm.runInContext("questions.every(q => q.reference && q.solution && q.concepts.length)", context), true);
assert.equal(messages.length, 1, "The quiz must announce readiness before sending progress");
assert.equal(messages[0].type, "quiz-ready");
assert.equal(messages[0].quizId, "itrecht-w2-it-vertraege");
assert.doesNotMatch(element("quizView").innerHTML, /Auswertung und Begründung/);

const cloudTime = new Date(Date.now() - 60_000).toISOString();
listeners.message({ source: parent, data: {
  source: "quiz-dashboard", version: 1, type: "quiz-resume", quizId: "itrecht-w2-it-vertraege",
  progress: { updatedAt: cloudTime, quizState: {
    current: 12, answers: { "boss-projekttriage": "Unfertiger Fallentwurf" }, order: {}, results: {}, revealed: {},
    completed: false, attemptId: "remote-attempt", startedAt: cloudTime, completedAt: null, updatedAt: cloudTime
  } }
} });
assert.equal(vm.runInContext("state.current", context), 12);
assert.equal(vm.runInContext("state.attemptId", context), "remote-attempt");
element("textAnswer").value = "Eigener neuer Entwurf mit Vertrag, Verzug und Exit";
element("saveBtn").click();
const progress = messages.at(-1);
assert.equal(progress.type, "quiz-progress");
assert.equal(progress.manual, true);
assert.equal(progress.progress.quizState.current, 12);
assert.equal(progress.progress.quizState.answers["boss-projekttriage"], element("textAnswer").value);
assert.equal(progress.progress.quizState.attemptId, "remote-attempt");
assert.equal(JSON.parse(storage.get("itrecht-w2-it-vertraege-open-book-review-v1")).answers["boss-projekttriage"], element("textAnswer").value);

const secondBrowser = harness();
assert.equal(secondBrowser.messages.length, 1);
secondBrowser.listeners.message({ source: secondBrowser.parent, data: {
  source: "quiz-dashboard", version: 1, type: "quiz-resume", quizId: "itrecht-w2-it-vertraege", progress: progress.progress
} });
assert.equal(vm.runInContext("state.current", secondBrowser.context), 12);
assert.equal(vm.runInContext("state.attemptId", secondBrowser.context), "remote-attempt");
assert.equal(vm.runInContext("state.answers['boss-projekttriage']", secondBrowser.context), element("textAnswer").value);
assert.equal(vm.runInContext("JSON.stringify(questions[1].options)", secondBrowser.context), vm.runInContext("JSON.stringify(questions[1].options)", context));

listeners.message({ source: parent, data: {
  source: "quiz-dashboard", version: 1, type: "quiz-resume", quizId: "itrecht-w2-it-vertraege",
  progress: { updatedAt: new Date(Date.now() - 120_000).toISOString(), quizState: { current: 1, attemptId: "older-attempt" } }
} });
assert.equal(vm.runInContext("state.attemptId", context), "remote-attempt", "Older cloud state must not replace current local work");

element("textAnswer").value = "Qualifikation, Protokolle, Mitwirkung, Rüge, Arbeitsstatus, Exit und Belege";
element("saveTextBtn").click();
assert.match(element("quizView").innerHTML, /<textarea id="textAnswer" disabled/);
assert.match(element("quizView").innerHTML, /data-rate="partial"/);
assert.match(element("quizView").innerHTML, /Folien 3–7/);

vm.runInContext("state.current = 0; state.answers[questions[0].id] = [questions[0].correct]; gradeAuto(questions[0]);", context);
assert.equal(vm.runInContext("state.results[questions[0].id].status", context), "correct");
assert.match(element("quizView").innerHTML, /Richtig gewählt/);
assert.equal(messages.at(-1).type, "quiz-progress", "Grading should also save resumable progress automatically");
assert.equal(messages.at(-1).progress.quizState.results["online-vertragsschluss"].status, "correct");

vm.runInContext("state.current = 1; state.answers[questions[1].id] = [questions[1].correct[0]]; gradeAuto(questions[1]);", context);
assert.equal(vm.runInContext("state.results[questions[1].id].status", context), "partial");
assert.match(element("quizView").innerHTML, /Richtige Antwort – nicht gewählt/);

vm.runInContext(`questions.forEach(q => {
  if (state.results[q.id]) return;
  state.results[q.id] = q.type === "text" ? { status: "partial", points: q.points / 2 } : { status: "correct", points: q.points };
}); renderResult();`, context);
assert.equal(messages.at(-1).type, "quiz-completed");
assert.equal(messages.at(-1).quizId, "itrecht-w2-it-vertraege");
assert.equal(messages.at(-1).attempt.maximumScore, 100);
assert.equal(messages.at(-1).attempt.score, 87);
assert.equal(messages.at(-1).attempt.percentage, 87);
assert.match(element("resultView").innerHTML, /Sehr gut verstanden/);
assert.match(element("resultView").innerHTML, /Ergebnis als JSON herunterladen/);
assert.equal(JSON.parse(storage.get("itrecht-w2-it-vertraege-open-book-review-v1")).completed, true);

const previousId = vm.runInContext("state.attemptId", context);
element("retakeBtn").click();
assert.notEqual(vm.runInContext("state.attemptId", context), previousId);
assert.equal(messages.at(-1).type, "quiz-progress-reset");
console.log("IT-Recht W2 Open-Book review tests passed");
