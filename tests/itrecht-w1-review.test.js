const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const html = fs.readFileSync(
  path.resolve(__dirname, "../quizzes/ITRECHT/W1_Einfuehrung_Open_Book.html"),
  "utf8"
);
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
  .map(match => match[1])
  .filter(script => script.trim());
assert.equal(scripts.length, 1);
assert.match(html, /OPEN BOOK – Nachschlagen ist Teil der Aufgabe/);

class FakeElement {
  constructor(id) {
    this.id = id;
    this.textContent = "";
    this.innerHTML = "";
    this.value = "";
    this.disabled = false;
    this.style = {};
    this.listeners = {};
    this.classList = { add: () => {}, remove: () => {} };
  }
  addEventListener(type, handler) { this.listeners[type] = handler; }
  querySelectorAll() { return []; }
  click() { this.listeners.click?.({ target: this }); }
}

function createHarness() {
  const elements = new Map();
  const element = id => {
    if (!elements.has(id)) elements.set(id, new FakeElement(id));
    return elements.get(id);
  };
  const storage = new Map();
  const dashboardMessages = [];
  const parent = { postMessage: message => dashboardMessages.push(message) };
  const windowListeners = {};
  const context = vm.createContext({
    console, Date, Math, JSON, Number, String, Array, Object, Map, Blob,
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
  context.window.addEventListener = (type, handler) => { windowListeners[type] = handler; };
  vm.runInContext(scripts[0], context, { filename: "W1_Einfuehrung_Open_Book.html" });
  return { context, element, storage, dashboardMessages, parent, windowListeners };
}

const first = createHarness();
const { context, element, storage, dashboardMessages, parent, windowListeners } = first;

assert.equal(vm.runInContext("questions.length", context), 12);
assert.equal(vm.runInContext("maxPoints", context), 100);
assert.equal(element("scoreText").textContent, "0 / 100 Punkte");
assert.equal(element("progressText").textContent, "0 / 12 Aufgaben");
assert.match(element("quizView").innerHTML, /Aufgabe 1 von 12/);
assert.doesNotMatch(element("quizView").innerHTML, /Auswertung und Begründung/);
assert.equal(dashboardMessages[0].type, "quiz-ready");
assert.equal(dashboardMessages[0].quizId, "itrecht-w1-einfuehrung");

windowListeners.message({
  source: parent,
  data: {
    source: "quiz-dashboard", version: 1, type: "quiz-resume", quizId: "itrecht-w1-einfuehrung",
    progress: {
      updatedAt: "2099-01-01T12:00:00.000Z",
      quizState: {
        current: 1, answers: { "argumentation-beweis": "Entwurf mit Rechtsgrundlage und Beweis" },
        order: { "anspruch-vierfragen": [1, 3, 2, 0] }, results: {}, revealed: {}, completed: false,
        attemptId: "cloud-attempt", startedAt: "2099-01-01T10:00:00.000Z", completedAt: null,
        updatedAt: "2099-01-01T12:00:00.000Z"
      }
    }
  }
});
assert.equal(vm.runInContext("state.current", context), 1);
assert.equal(vm.runInContext("state.attemptId", context), "cloud-attempt");
assert.equal(vm.runInContext("state.answers['argumentation-beweis']", context), "Entwurf mit Rechtsgrundlage und Beweis");

element("textAnswer").value = "Noch nicht abgesendete Open-Book-Antwort";
element("saveBtn").click();
let saved = JSON.parse(storage.get("itrecht-w1-einfuehrung-open-book-review-v1"));
assert.equal(saved.answers["argumentation-beweis"], "Noch nicht abgesendete Open-Book-Antwort");
assert.equal(dashboardMessages.at(-1).type, "quiz-progress");
assert.equal(dashboardMessages.at(-1).manual, true);
assert.equal(dashboardMessages.at(-1).progress.quizState.attemptId, "cloud-attempt");

element("textAnswer").value = "Rechtsfolge X plus Gesetzesartikel und Beweis Y";
element("saveTextBtn").click();
assert.match(element("quizView").innerHTML, /<textarea id="textAnswer" disabled/);
assert.match(element("quizView").innerHTML, /data-rate="correct"/);
assert.match(element("quizView").innerHTML, /Folie 12/);
assert.doesNotMatch(element("quizView").innerHTML, /id="saveTextBtn"/);

vm.runInContext("state.current = 2; state.answers['privat-oeffentlich'] = [0, 3]; gradeAuto(questions[2]);", context);
assert.equal(vm.runInContext("state.revealed['privat-oeffentlich']", context), true);
assert.match(element("quizView").innerHTML, /Richtig gewählt/);
assert.match(element("quizView").innerHTML, /Richtige Antwort – nicht gewählt/);
assert.match(element("quizView").innerHTML, /Falsch gewählt/);

vm.runInContext("questions.forEach(q => state.results[q.id] = { status: q.id === 'privat-oeffentlich' ? 'partial' : 'correct', points: q.id === 'privat-oeffentlich' ? 4 : q.points }); renderResult();", context);
const completed = dashboardMessages.at(-1);
assert.equal(completed.type, "quiz-completed");
assert.equal(completed.quizId, "itrecht-w1-einfuehrung");
assert.equal(completed.attempt.maximumScore, 100);
assert.equal(completed.attempt.score, 96);
assert.equal(completed.attempt.percentage, 96);
assert.match(element("resultView").innerHTML, /Sehr gut verstanden/);
assert.match(element("resultView").innerHTML, /Nächster freiwilliger Schritt/);
assert.match(element("resultView").innerHTML, /Ergebnis als JSON herunterladen/);
assert.match(element("resultView").innerHTML, /Gezieltes Review vorbereiten \(optional\)/);

saved = JSON.parse(storage.get("itrecht-w1-einfuehrung-open-book-review-v1"));
assert.equal(saved.completed, true);
const oldAttempt = vm.runInContext("state.attemptId", context);
element("retakeBtn").click();
assert.notEqual(vm.runInContext("state.attemptId", context), oldAttempt);
assert.equal(storage.has("itrecht-w1-einfuehrung-open-book-review-v1"), false);
assert.equal(dashboardMessages.at(-1).type, "quiz-progress-reset");

console.log("IT-Recht W1 Open-Book review tests passed");
