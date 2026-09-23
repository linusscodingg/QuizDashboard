const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const cases = [
  {
    file: "W2_Secure_Development_Lifecycle.html",
    quizId: "sws1-w2-secure-development-lifecycle",
    source: "W2_SecureDevelopmentLifecycle.pdf",
    title: "Secure Development Lifecycle",
    questionCount: 13,
    maximumScore: 112
  },
  {
    file: "W3_Software_Security_Errors.html",
    quizId: "sws1-w3-software-security-errors",
    source: "W3_SoftwareSecurityErrors.pdf",
    title: "Software Security Errors",
    questionCount: 14,
    maximumScore: 124
  }
];

for (const review of cases) {
  const html = fs.readFileSync(path.resolve(__dirname, "../quizzes/SWS1", review.file), "utf8");
  assert.match(html, new RegExp(`<h1>${review.title}</h1>`));
  assert.match(html, /<html lang="en">/);
  assert.match(html, new RegExp(review.source.replaceAll(".", "\\.")));
  assert.match(html, new RegExp(`const DASHBOARD_QUIZ_ID = "${review.quizId}"`));
  assert.doesNotMatch(html, /Healthcare Data|DHEAL/);
  assert.doesNotMatch(html, /Aufgabe|Antwort prüfen|Punkte|Zurück|Weiter|Zwischenstand|Fortschritt/);

  const questionsLiteral = html.match(/const questions = (\[[\s\S]*?\r?\n\s*\]);\r?\n\r?\n\s*const STORAGE_KEY/);
  assert.ok(questionsLiteral, `Questions missing in ${review.file}`);
  const questions = vm.runInNewContext(questionsLiteral[1]);
  assert.equal(questions.length, review.questionCount);
  assert.equal(questions.reduce((sum, question) => sum + question.points, 0), review.maximumScore);
  assert.equal(new Set(questions.map(question => question.id)).size, questions.length);
  assert.ok(questions.some(question => question.type === "text"));
  assert.ok(questions.some(question => question.type === "multi"));
  assert.ok(questions.some(question => question.type === "order"));
  if (review.quizId === "sws1-w2-secure-development-lifecycle") {
    const classification = questions.find(question => question.id === "classify-security-activities");
    assert.ok(classification, "W2 activity-classification question is missing");
    assert.deepEqual(Array.from(classification.correct), [1, 6, 4, 3, 2, 5, 2, 1, 0, 6, 7, 2]);
    assert.equal(classification.points, 12);
  }
  for (const question of questions) {
    assert.ok(question.reference, `Missing reference: ${review.file}/${question.id}`);
    assert.ok(question.solution, `Missing solution: ${review.file}/${question.id}`);
    assert.ok(question.concepts?.length, `Missing concepts: ${review.file}/${question.id}`);
    if (question.options && ["single", "multi"].includes(question.type)) assert.equal(question.optionExplanations.length, question.options.length);
    if (question.type === "categorize") {
      assert.equal(question.statements.length, question.correct.length);
      assert.equal(question.explanations.length, question.statements.length);
    }
  }
}

console.log("SWS1 review tests passed");
