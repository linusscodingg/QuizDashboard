const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const cases = [
  {
    file: "W2_Secure_Development_Lifecycle.html",
    quizId: "sws1-w2-secure-development-lifecycle",
    source: "W2_SecureDevelopmentLifecycle.pdf",
    title: "Secure Development Lifecycle"
  },
  {
    file: "W3_Software_Security_Errors.html",
    quizId: "sws1-w3-software-security-errors",
    source: "W3_SoftwareSecurityErrors.pdf",
    title: "Software Security Errors"
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

  const questionsLiteral = html.match(/const questions = (\[[\s\S]*?\n\s*\]);\n\n\s*const STORAGE_KEY/);
  assert.ok(questionsLiteral, `Questions missing in ${review.file}`);
  const questions = vm.runInNewContext(questionsLiteral[1]);
  assert.equal(questions.length, 12);
  assert.equal(questions.reduce((sum, question) => sum + question.points, 0), 100);
  assert.equal(new Set(questions.map(question => question.id)).size, questions.length);
  assert.ok(questions.some(question => question.type === "text"));
  assert.ok(questions.some(question => question.type === "multi"));
  assert.ok(questions.some(question => question.type === "order"));
  for (const question of questions) {
    assert.ok(question.reference, `Missing reference: ${review.file}/${question.id}`);
    assert.ok(question.solution, `Missing solution: ${review.file}/${question.id}`);
    assert.ok(question.concepts?.length, `Missing concepts: ${review.file}/${question.id}`);
    if (question.options) assert.equal(question.optionExplanations.length, question.options.length);
  }
}

console.log("SWS1 review tests passed");
