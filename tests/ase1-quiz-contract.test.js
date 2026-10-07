const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
class Element {
  constructor(id, dataset = {}) {
    Object.assign(this, { id, dataset, innerHTML: "", textContent: "", value: "", style: {}, listeners: {}, classList: { add() {}, remove() {} } });
  }
  addEventListener(type, handler) { this.listeners[type] = handler; }
  querySelectorAll() { return []; }
  click() { this.listeners.click?.({ target: this }); }
}

function harness(script, storage = new Map()) {
  const elements = new Map(), messages = [], listeners = {};
  const element = id => {
    if (!elements.has(id)) elements.set(id, new Element(id));
    return elements.get(id);
  };
  const rates = ["correct", "partial", "wrong"].map(rate => new Element(rate, { rate }));
  const parent = { postMessage: message => messages.push(message) };
  const context = vm.createContext({
    console, Date, Math, JSON, Number, String, Array, Object, Map, Blob, setTimeout,
    URL: { createObjectURL: () => "blob:test", revokeObjectURL() {} },
    crypto: { randomUUID: () => `attempt-${Math.random()}` },
    localStorage: { getItem: k => storage.get(k) ?? null, setItem: (k, v) => storage.set(k, v), removeItem: k => storage.delete(k) },
    document: { getElementById: element, querySelectorAll: selector => selector === "[data-rate]" ? rates : [], createElement: () => new Element("created") },
    confirm: () => true,
    alert: message => { throw new Error(`Unexpected alert: ${message}`); }
  });
  context.window = context;
  Object.assign(context, { parent, opener: null, scrollTo() {}, addEventListener: (type, handler) => { listeners[type] = handler; } });
  vm.runInContext(script, context);
  const run = code => vm.runInContext(code, context);
  const resume = progress => listeners.message({ source: parent, data: { source: "quiz-dashboard", version: 1, type: "quiz-resume", quizId: run("DASHBOARD_QUIZ_ID"), progress } });
  return { run, element, rates, messages, storage, resume };
}

for (const filename of ["W1_Foundations_Principles.html","W2_Context_Interviews.html","W3_Documentation_Models.html","W4_Elaboration_Validation.html"]) {
  const html = fs.readFileSync(path.join(root, "quizzes/ASE1", filename), "utf8");
  assert.doesNotMatch(html, /IntroSoftwareSecurity|SWS1|Nach oben|Nach unten/, "No stale template content");
  const script = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(match => match[1]).find(value => value.trim());
  const h = harness(script);
  assert.equal(h.run("maxPoints"), 100, filename);
  assert.equal(h.run("questions.length"), 12);
  assert.equal(h.run("questions.every(q => q.reference && q.solution && q.concepts.length)"), true);
  assert.deepEqual(h.messages.map(m => m.type), ["quiz-ready"], "No empty progress before resume");
  const textIndex = h.run("questions.findIndex(q => q.type === 'text')");
  const remoteTime = new Date(Date.now() - 60000).toISOString();
  h.resume({ updatedAt: remoteTime, quizState: { current: textIndex, answers: {}, order: {}, results: {}, revealed: {}, completed: false, attemptId: "resumed-attempt", startedAt: remoteTime, updatedAt: remoteTime } });
  assert.equal(h.run("state.attemptId"), "resumed-attempt");
  h.run(`{
    const choice = questions.find(q => q.type === 'single');
    const ordering = questions.find(q => q.type === 'order');
    state.answers[choice.id] = [choice.correct];
    state.results[choice.id] = { status: 'correct', points: choice.points };
    state.revealed[choice.id] = true;
    state.order[ordering.id] = [...ordering.initial];
  }`);
  h.element("textAnswer").value = "Mein noch nicht abgegebener Entwurf";
  h.element("textAnswer").listeners.input({ target: h.element("textAnswer") });
  assert.equal(h.messages.at(-1).type, "quiz-progress");
  h.element("saveBtn").click();
  const saved = h.messages.at(-1);
  assert.equal(saved.manual, true);
  assert.equal(saved.progress.quizState.answers[h.run("questions[state.current].id")], h.element("textAnswer").value);
  const other = harness(script);
  other.resume(saved.progress);
  assert.equal(other.run("state.current"), textIndex);
  assert.equal(other.run("state.attemptId"), "resumed-attempt");
  assert.equal(other.run("JSON.stringify(state.answers)"), h.run("JSON.stringify(state.answers)"));
  for (const field of ["order", "results", "revealed", "startedAt", "updatedAt"]) {
    assert.equal(other.run(`JSON.stringify(state.${field})`), h.run(`JSON.stringify(state.${field})`), `Restore ${field}`);
  }
  assert.equal(other.run("JSON.stringify(questions)"), h.run("JSON.stringify(questions)"), "Shuffle must be stable across browsers");
  h.resume({ updatedAt: remoteTime, quizState: { current: 0, attemptId: "stale" } });
  assert.equal(h.run("state.attemptId"), "resumed-attempt", "Do not overwrite newer local work");

  h.run("state.current = questions.findIndex(q => q.type === 'multi'); state.answers[questions[state.current].id] = [questions[state.current].correct[0]]; gradeAuto(questions[state.current]);");
  assert.equal(h.run("state.results[questions[state.current].id].status"), "partial");
  h.run("delete state.results[questions[state.current].id]; state.answers[questions[state.current].id] = questions[state.current].options.map((_, i) => i); gradeAuto(questions[state.current]);");
  assert.equal(h.run("state.results[questions[state.current].id].points"), 0, "P question: too many selections earn zero");
  const before = h.run("JSON.stringify(state.results)");
  h.run("state.answers[questions[state.current].id] = questions[state.current].correct; gradeAuto(questions[state.current]);");
  assert.equal(h.run("JSON.stringify(state.results)"), before, "Graded answers cannot be rescored");
  h.run("state.current = questions.findIndex(q => q.type === 'categorize'); render();");
  h.element("skipBtn").click();
  assert.match(h.run("buildReviewItems().find(item => item.prompt === questions[state.current].prompt).yourAnswer"), /No answer/);
  h.run("delete state.results[questions[state.current].id]; state.answers[questions[state.current].id] = questions[state.current].correct.map(value => (value + 1) % questions[state.current].options.length); gradeAuto(questions[state.current]);");
  assert.equal(h.run("state.results[questions[state.current].id].status"), "wrong");
  assert.ok(h.run("buildReviewItems().find(item => item.prompt === questions[state.current].prompt).correctAnswer").length);
  h.run("state = defaultState(); render();");
  for (let i = 0; i < h.run("questions.length"); i++) {
    h.run(`state.current = ${i}; render();`);
    if (h.run("questions[state.current].type") === "text") {
      h.element("textAnswer").value = "Eigene begründete Antwort";
      h.element("saveTextBtn").click();
      assert.match(h.element("quizView").innerHTML, /<textarea id="textAnswer" disabled/);
      assert.equal(h.run("isDone(questions[state.current])"), false, "Self-rating is required for points");
      h.rates[0].click();
    } else {
      h.run(`{
        const q = questions[state.current];
        if (q.type === 'order') state.order[q.id] = [...q.correct];
        else state.answers[q.id] = q.type === 'single' ? [q.correct] : [...q.correct];
        gradeAuto(q);
      }`);
    }
    assert.equal(h.run("state.results[questions[state.current].id].status"), "correct", `${filename}: task ${i + 1}`);
  }
  h.element("finishBtn").click();
  h.element("exportResultBtn").click();
  const completed = h.messages.at(-1);
  assert.equal(completed.type, "quiz-completed");
  assert.equal(completed.attempt.score, 100);
  assert.equal(completed.attempt.maximumScore, 100);
  assert.equal(Number(completed.attempt.grade), 6);
  assert.ok(Array.isArray(completed.attempt.reviewItems));
  const progressCount = h.messages.filter(message => message.type === "quiz-progress").length;
  h.element("backToQuiz").click();
  assert.equal(h.messages.filter(message => message.type === "quiz-progress").length, progressCount, "Reviewing a completed attempt must not recreate unfinished cloud progress");
  h.element("finishBtn").click();
  const key = h.run("STORAGE_KEY");
  assert.equal(JSON.parse(h.storage.get(key)).completed, true);
  const previous = h.run("state.attemptId");
  h.element("retakeBtn").click();
  assert.ok(h.messages.some(m => m.type === "quiz-progress-reset"));
  assert.notEqual(h.run("state.attemptId"), previous);
  assert.equal(harness(script, h.storage).run("state.attemptId"), h.run("state.attemptId"), "Reset attempt survives reload");
}
console.log("ASE1: four new quiz grading and resume contracts passed (cloud messages simulated)");
