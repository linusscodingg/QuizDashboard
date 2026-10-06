const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const cases = [
  {"file":"W1_Introduction_Software_Security.html","quizId":"sws1-w1-introduction-software-security","source":"IntroSoftwareSecurity.pdf","title":"Introduction to Software Security","questionCount":12,"maximumScore":100},
  {"file":"W3_Web_Application_Security_Testing_1.html","quizId":"sws1-w3-web-application-security-testing-1","source":"WebAppSecurityTesting1.pdf","title":"Web Application Security Testing 1: Injection","questionCount":12,"maximumScore":100},
  {"file":"W4_Web_Application_Security_Testing_2.html","quizId":"sws1-w4-web-application-security-testing-2","source":"WebAppSecurityTesting2.pdf","title":"Web Application Security Testing 2: Authentication, Sessions and XSS","questionCount":12,"maximumScore":100},
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
    source: "SoftwareSecurityErrors.pdf",
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
