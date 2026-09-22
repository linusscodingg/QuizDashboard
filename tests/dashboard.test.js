const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const dashboardDirectory = path.resolve(__dirname, "..");
const dashboardHtml = fs.readFileSync(path.join(dashboardDirectory, "index.html"), "utf8");
const catalogCode = fs.readFileSync(path.join(dashboardDirectory, "quiz-catalog.js"), "utf8");
const inlineScripts = [...dashboardHtml.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
  .map(match => match[1])
  .filter(script => script.trim());

assert.equal(inlineScripts.length, 1, "Dashboard should contain one inline application script");
assert.match(dashboardHtml, /\[hidden\]\s*\{\s*display:\s*none\s*!important;/, "Hidden account controls must stay hidden despite button display styles");
assert.doesNotMatch(dashboardHtml, /cloudEmail|cloudPassword|cloudLoginBtn|cloudRegisterBtn/, "Dashboard must not expose the removed email/password login");
assert.doesNotMatch(dashboardHtml, /leaderboardName|leaderboardToggle|leaderboardRemove|Mich anzeigen/, "Leaderboard must publish automatically under the GitHub username");
assert.match(dashboardHtml, /!Array\.isArray\(attempt\.reviewItems\)/, "Legacy attempts without review details must remain renderable");

class FakeElement {
  constructor(id) {
    this.id = id;
    this.textContent = "";
    this.innerHTML = "";
    this.hidden = false;
    this.src = "";
    this.value = "";
    this.files = [];
    this.style = {};
    this.dataset = {};
    this.listeners = {};
    this.contentWindow = {};
  }
  addEventListener(type, handler) { this.listeners[type] = handler; }
  querySelectorAll(selector) {
    if (this.id === "subjects" && selector === "[data-open-quiz]") return [openQuizButton];
    return [];
  }
  click() { this.listeners.click?.({ target: this }); }
  focus() {}
}

const ids = [
  "completedTotal", "averagePercent", "averageGrade", "attemptTotal", "subjects",
  "player", "quizFrame", "playerTitle", "closePlayer", "exportBtn", "importBtn",
  "importInput", "toast", "playerStatus"
  , "cloudTitle", "cloudStatus", "cloudLogoutBtn", "cloudDeleteToggle",
  "cloudDeletePanel", "cloudDeleteConfirm", "cloudDeleteCancel", "cloudDeleteError"
  , "leaderboardStatus", "leaderboardSubjects", "leaderboardOverlay", "compareBtn", "closeLeaderboard"
];
const elements = Object.fromEntries(ids.map(id => [id, new FakeElement(id)]));
const openQuizButton = new FakeElement("openQuiz");
openQuizButton.dataset.openQuiz = "cns1-w2-ipv6-part2";
const storage = new Map();
const windowListeners = {};

const context = vm.createContext({
  console,
  Intl,
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
  setTimeout: () => 1,
  clearTimeout: () => {},
  confirm: () => true,
  alert: message => { throw new Error(`Unexpected alert: ${message}`); },
  localStorage: {
    getItem: key => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value)
  },
  document: {
    body: { style: {} },
    getElementById: id => elements[id],
    addEventListener: () => {},
    createElement: () => new FakeElement("created")
  }
});
context.window = context;
context.window.addEventListener = (type, handler) => { windowListeners[type] = handler; };

vm.runInContext(catalogCode, context, { filename: "quiz-catalog.js" });
const catalog = context.window.QUIZ_CATALOG;
assert.equal(catalog.quizzes.length, 4);
for (const quiz of catalog.quizzes) {
  assert.ok(fs.existsSync(path.resolve(dashboardDirectory, quiz.path)), `Missing quiz file: ${quiz.path}`);
}

vm.runInContext(inlineScripts[0], context, { filename: "dashboard-inline.js" });
assert.equal(elements.completedTotal.textContent, "0 / 4");
assert.equal(elements.averageGrade.textContent, "–");

openQuizButton.click();
assert.equal(elements.player.hidden, false);
assert.match(elements.quizFrame.src, /quizzes\/CNS1\/W2_IPv6_Part2\.html$/);

function report(attemptId, score, reviewItems) {
  windowListeners.message({
    source: elements.quizFrame.contentWindow,
    data: {
      source: "quiz-dashboard",
      version: 1,
      type: "quiz-completed",
      quizId: "cns1-w2-ipv6-part2",
      attempt: { attemptId, completedAt: "2026-09-21T12:00:00.000Z", score, maximumScore: 100, ...(reviewItems === undefined ? {} : { reviewItems }) }
    }
  });
}

windowListeners.message({
  source: elements.quizFrame.contentWindow,
  data: {
    source: "quiz-dashboard", version: 1, type: "quiz-progress", quizId: "cns1-w2-ipv6-part2", manual: true,
    progress: { attemptId: "attempt-1", currentTask: 4, completedCount: 3, totalQuestions: 13, score: 18, maximumScore: 100, updatedAt: "2026-09-21T11:00:00.000Z" }
  }
});
let storedDashboard = JSON.parse(storage.get("quiz-dashboard-v1"));
assert.equal(storedDashboard.progress["cns1-w2-ipv6-part2"].completedCount, 3);
assert.match(elements.subjects.innerHTML, /In Bearbeitung/);
assert.match(elements.subjects.innerHTML, /Quiz fortsetzen/);

report("attempt-1", 70);
assert.equal(elements.completedTotal.textContent, "1 / 4");
assert.equal(elements.averagePercent.textContent, "70 %");
assert.equal(elements.averageGrade.textContent, "4.5");
assert.equal(String(elements.attemptTotal.textContent), "1");
storedDashboard = JSON.parse(storage.get("quiz-dashboard-v1"));
assert.equal(storedDashboard.progress["cns1-w2-ipv6-part2"], undefined);

report("attempt-1", 85);
assert.equal(String(elements.attemptTotal.textContent), "1", "Same attempt must be updated, not duplicated");
assert.equal(elements.averagePercent.textContent, "85 %");
assert.equal(elements.averageGrade.textContent, "5.3");
assert.match(elements.subjects.innerHTML, /Sehr gut verstanden/);

report("attempt-2", 40, [{
  status: "wrong", prompt: "Welche Antwort stimmt?", yourAnswer: "Falsch", correctAnswer: "Richtig",
  explanation: "Die richtige Antwort folgt aus der Definition.", points: 0, maximum: 5
}]);
assert.equal(String(elements.attemptTotal.textContent), "2");
assert.equal(elements.averagePercent.textContent, "85 %", "Best attempt must remain decisive");
assert.match(elements.subjects.innerHTML, /Ø Lernnote<\/span><strong>4\.2/);
assert.match(elements.subjects.innerHTML, /Beste Lernnote<\/span><strong>5\.3/);
assert.match(elements.subjects.innerHTML, /Fehler ansehen \(1\)/);
assert.match(elements.subjects.innerHTML, /Deine Antwort<\/span>Falsch/);
assert.match(elements.subjects.innerHTML, /Richtige Antwort<\/span>Richtig/);

for (const quiz of catalog.quizzes) {
  const quizHtml = fs.readFileSync(path.resolve(dashboardDirectory, quiz.path), "utf8");
  assert.match(quizHtml, /source:\s*"quiz-dashboard"/);
  assert.match(quizHtml, /quizId:\s*DASHBOARD_QUIZ_ID/);
  assert.match(quizHtml, /type:\s*"quiz-progress"/);
  assert.match(quizHtml, /Zwischenstand speichern|Save progress/);
  const questionsLiteral = quizHtml.match(/const questions = (\[[\s\S]*?\n\s*\]);\n\n\s*const STORAGE_KEY/);
  assert.ok(questionsLiteral, `Questions array should remain readable for ${quiz.id}`);
  const questions = vm.runInNewContext(questionsLiteral[1]);
  assert.equal(questions.reduce((sum, question) => sum + question.points, 0), quiz.maximumScore);
  for (const question of questions.filter(question => question.options && ["single", "multi"].includes(question.type))) {
    assert.equal(question.optionExplanations?.length, question.options.length, `Every option needs an explanation: ${quiz.id}/${question.id}`);
  }
  assert.match(quizHtml, /state\.revealed\[[^\]]+\.id\] = true/);
  assert.match(quizHtml, /Richtige Antwort – nicht gewählt|Correct answer – not selected/);
  assert.match(quizHtml, /Falsch gewählt|Incorrectly selected/);
  assert.match(quizHtml, /if \(isDone\([^)]*\)\) return;/);
  assert.match(quizHtml, /function buildReviewItems\(\)/);
  assert.match(quizHtml, /reviewItems:\s*buildReviewItems\(\)/);
  assert.match(quizHtml, /Neues Quiz starten|Start new quiz/);
  assert.match(quizHtml, /Bereits abgeschlossene Versuche bleiben im Dashboard erhalten|Earlier completed attempts remain in the dashboard/);
  assert.doesNotMatch(quizHtml, /id="solutionBtn"/);
  assert.doesNotMatch(quizHtml, />Lösung anzeigen</);
}

console.log("Quiz-Dashboard tests passed");
