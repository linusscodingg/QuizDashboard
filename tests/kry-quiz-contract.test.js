const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const QUIZ_ID = "kry-w4-serie4-chinesischer-restsatz";
const STORAGE = "kry-w4-serie4-chinesischer-restsatz-review-v1";
const html = fs.readFileSync(path.resolve(__dirname, "../quizzes/KRY/W4_Serie4_Chinesischer_Restsatz.html"), "utf8");
const script = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(match => match[1]).find(value => value.trim());
assert.ok(script);
assert.doesNotMatch(html, /—/, "Keine Geviertstriche");
assert.doesNotMatch(html, /Select your answer/);

class FakeElement {
  constructor(id) { Object.assign(this, { id, innerHTML: "", textContent: "", value: "", disabled: false, style: {}, listeners: {}, classList: { add() {}, remove() {} } }); }
  addEventListener(type, handler) { this.listeners[type] = handler; }
  querySelectorAll() { return []; }
  click() { this.listeners.click?.({ target: this }); }
}
function harness(storage = new Map()) {
  const elements = new Map();
  const element = id => { if (!elements.has(id)) elements.set(id, new FakeElement(id)); return elements.get(id); };
  const messages = [], listeners = {};
  const parent = { postMessage: message => messages.push(message) };
  const context = vm.createContext({
    console, Date, Math, JSON, Number, String, Array, Object, Map, Blob,
    URL: { createObjectURL: () => "blob:test", revokeObjectURL() {} },
    crypto: { randomUUID: () => `attempt-${Math.random()}` },
    localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key) },
    document: { getElementById: element, querySelectorAll: () => [], createElement: () => new FakeElement("created") },
    confirm: () => true,
    alert: message => { throw new Error(`Unexpected alert: ${message}`); }
  });
  context.window = context;
  Object.assign(context, { parent, opener: null, scrollTo() {}, addEventListener: (type, handler) => { listeners[type] = handler; } });
  vm.runInContext(script, context);
  const run = code => vm.runInContext(code, context);
  const resume = progress => listeners.message({ source: parent, data: { source: "quiz-dashboard", version: 1, type: "quiz-resume", quizId: QUIZ_ID, progress } });
  return { run, element, storage, messages, resume };
}

const h = harness();
assert.equal(h.run("questions.length"), 13);
assert.equal(h.run("maxPoints"), 100);
assert.equal(h.run("questions.filter(q => q.type === 'text').length"), 1);
assert.equal(h.run("JSON.stringify([...new Set(questions.map(q => q.type))].sort())"), JSON.stringify(["categorize", "multi", "order", "single", "text"]));
assert.equal(h.run("new Set(questions.map(q => q.id)).size"), 13);
assert.equal(h.run("questions.every(q => q.reference && q.solution && q.concepts.length)"), true);
assert.equal(h.run("questions.filter(q => q.type === 'categorize').every(q => q.statements.length === q.correct.length && q.explanations.length === q.statements.length && q.correct.every(i => i < q.options.length))"), true);
assert.deepEqual(h.messages.map(m => m.type), ["quiz-ready"], "No empty progress before resume");
assert.equal(h.messages[0].quizId, QUIZ_ID);
assert.doesNotMatch(h.element("quizView").innerHTML, /Auswertung und Begründung/, "Keine Lösung vor der Abgabe");

const textIndex = h.run("questions.findIndex(q => q.type === 'text')");
const cloudTime = new Date(Date.now() - 60000).toISOString();
h.resume({ updatedAt: cloudTime, quizState: { current: textIndex, answers: {}, order: {}, results: {}, revealed: {}, completed: false, attemptId: "remote-attempt", startedAt: cloudTime, updatedAt: cloudTime } });
assert.equal(h.run("state.current"), textIndex);
assert.equal(h.run("state.attemptId"), "remote-attempt");
h.element("textAnswer").value = "a1 = 13, a2 = 26, u1 = 11, u2 = 23, x = 100";
h.element("saveBtn").click();
const saved = h.messages.at(-1);
assert.equal(saved.type, "quiz-progress");
assert.equal(saved.manual, true);
assert.equal(saved.progress.quizState.answers["boss-rsa-crt"], h.element("textAnswer").value);
const other = harness();
other.resume(saved.progress);
assert.equal(other.run("state.current"), textIndex);
assert.equal(other.run("JSON.stringify(questions)"), h.run("JSON.stringify(questions)"), "Stable shuffle across browsers");
h.resume({ updatedAt: new Date(Date.now() - 120000).toISOString(), quizState: { current: 0, attemptId: "older" } });
assert.equal(h.run("state.attemptId"), "remote-attempt", "Older cloud state must not replace local work");

h.element("saveTextBtn").click();
assert.match(h.element("quizView").innerHTML, /<textarea id="textAnswer" disabled/);
assert.equal(h.run("isDone(questions[state.current])"), false, "Selbsteinschätzung nötig");
assert.match(h.element("quizView").innerHTML, /x = 100/);

h.run("state.current = questions.findIndex(q => q.id === 'teilerfremd'); state.answers[questions[state.current].id] = [questions[state.current].correct[0]]; gradeAuto(questions[state.current]);");
assert.equal(h.run("state.results['teilerfremd'].status"), "partial");
assert.match(h.element("quizView").innerHTML, /Richtige Antwort – nicht gewählt/);
const before = h.run("JSON.stringify(state.results)");
h.run("state.answers['teilerfremd'] = questions[state.current].correct; gradeAuto(questions[state.current]);");
assert.equal(h.run("JSON.stringify(state.results)"), before, "Graded answers cannot be rescored");

h.run("state.current = questions.findIndex(q => q.id === 'fehlerfolgen'); state.answers['fehlerfolgen'] = questions[state.current].correct.map(v => String((v + 1) % 3)); gradeAuto(questions[state.current]);");
assert.equal(h.run("state.results['fehlerfolgen'].status"), "wrong");
assert.match(h.run("JSON.stringify(buildReviewItems())"), /Exception beim modInverse/, "Review nennt Kategorienamen");

h.run("state = defaultState(); render();");
for (let i = 0; i < 13; i++) {
  h.run(`state.current = ${i}; render();`);
  if (h.run("questions[state.current].type") === "text") {
    h.element("textAnswer").value = "Vollständiger Rechenweg";
    h.element("saveTextBtn").click();
    h.run("state.results[questions[state.current].id] = { status: 'correct', points: questions[state.current].points }; render();");
  } else {
    h.run(`{ const q = questions[state.current];
      if (q.type === 'order') state.order[q.id] = [...q.correct];
      else if (q.type === 'categorize') state.answers[q.id] = q.correct.map(String);
      else state.answers[q.id] = q.type === 'single' ? [q.correct] : [...q.correct];
      gradeAuto(q); }`);
  }
  assert.equal(h.run("state.results[questions[state.current].id].status"), "correct", `task ${i + 1}`);
}
h.element("finishBtn").click();
const completed = h.messages.at(-1);
assert.equal(completed.type, "quiz-completed");
assert.equal(completed.quizId, QUIZ_ID);
assert.equal(completed.attempt.score, 100);
assert.equal(completed.attempt.maximumScore, 100);
assert.equal(Number(completed.attempt.grade), 6);
assert.match(h.element("resultView").innerHTML, /Ergebnis als JSON herunterladen/);
assert.equal(JSON.parse(h.storage.get(STORAGE)).completed, true);
const previous = h.run("state.attemptId");
h.element("retakeBtn").click();
assert.equal(h.messages.at(-1).type, "quiz-progress-reset");
assert.notEqual(h.run("state.attemptId"), previous);
console.log("KRY Serie 4 quiz: 100 points, grade 6.0, resume, partial points, lock, categorize review, reset passed");
