const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const html = fs.readFileSync(
  path.resolve(__dirname, "../quizzes/DHEAL/W2_Healthcare_Data.html"),
  "utf8"
);
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
  .map(match => match[1])
  .filter(script => script.trim());
assert.equal(scripts.length, 1);

class FakeElement {
  constructor(id) {
    this.id = id;
    this.textContent = "";
    this.innerHTML = "";
    this.disabled = false;
    this.style = {};
    this.listeners = {};
    this.classList = { add: () => {}, remove: () => {} };
  }
  addEventListener(type, handler) { this.listeners[type] = handler; }
  querySelectorAll() { return []; }
  focus() {}
  click() { this.listeners.click?.({ target: this }); }
}

const elements = new Map();
const element = id => {
  if (!elements.has(id)) elements.set(id, new FakeElement(id));
  return elements.get(id);
};
const storage = new Map();
const dashboardMessages = [];
const parent = { postMessage: message => dashboardMessages.push(message) };

const context = vm.createContext({
  console,
  Date,
  Math,
  JSON,
  Number,
  String,
  Array,
  Object,
  Map,
  Blob,
  URL: { createObjectURL: () => "blob:test", revokeObjectURL: () => {} },
  crypto: { randomUUID: () => `test-${Math.random()}` },
  localStorage: {
    getItem: key => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: key => storage.delete(key)
  },
  document: {
    getElementById: element,
    querySelectorAll: () => [],
    createElement: () => new FakeElement("created")
  },
  confirm: () => true,
  alert: message => { throw new Error(`Unexpected alert: ${message}`); }
});
context.window = context;
context.window.parent = parent;
context.window.opener = null;
context.window.scrollTo = () => {};

vm.runInContext(scripts[0], context, { filename: "W2_Healthcare_Data.html" });

assert.equal(element("scoreText").textContent, "0 / 100 Punkte");
assert.equal(element("progressText").textContent, "0 / 12 Aufgaben");
assert.match(element("quizView").innerHTML, /Aufgabe 1 von 12/);
assert.equal(dashboardMessages[0].type, "quiz-ready");
assert.equal(dashboardMessages[0].quizId, "dheal-w2-healthcare-data");

vm.runInContext("state.current = 3; render();", context);
element("textAnswer").value = "Mein unfertiger Entwurf";
element("saveBtn").click();
let saved = JSON.parse(storage.get("dheal-w2-healthcare-data-review-v1"));
assert.equal(saved.answers["glucose-context"], "Mein unfertiger Entwurf");
assert.equal(dashboardMessages.at(-1).type, "quiz-progress");
assert.equal(dashboardMessages.at(-1).manual, true);

vm.runInContext("questions.forEach(q => state.results[q.id] = { status: 'correct', points: q.points }); renderResult();", context);
const completed = dashboardMessages.at(-1);
assert.equal(completed.type, "quiz-completed");
assert.equal(completed.attempt.score, 100);
assert.equal(completed.attempt.maximumScore, 100);
assert.equal(completed.attempt.percentage, 100);
assert.equal(completed.attempt.grade, 6);
assert.match(element("resultView").innerHTML, /Sehr gut verstanden/);
assert.match(element("resultView").innerHTML, /Selbsteinschätzungsnote 6\.0/);

saved = JSON.parse(storage.get("dheal-w2-healthcare-data-review-v1"));
assert.equal(saved.completed, true);
assert.ok(saved.attemptId);
assert.ok(saved.completedAt);

const previousAttemptId = vm.runInContext("state.attemptId", context);
element("resetBtn").click();
const resetAttemptId = vm.runInContext("state.attemptId", context);
assert.notEqual(resetAttemptId, previousAttemptId);
assert.equal(storage.has("dheal-w2-healthcare-data-review-v1"), false);

console.log("DHEAL review tests passed");
