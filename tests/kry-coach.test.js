const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const L = require(path.join(root, 'lerncoach/engine.js'));
let subject;
vm.runInNewContext(fs.readFileSync(path.join(root, 'lerncoach/content/KRY.js'), 'utf8'), {
  Lerncoach: { registerSubject: value => { subject = value; } }
});
assert.deepEqual(L.validateSubject(subject), []);
assert.equal(subject.id, 'KRY');
const week = subject.weeks.find(entry => entry.id === 'serie4');
assert.ok(week, 'Serie 4 vorhanden');
assert.equal(week.status, 'ready');
const checkpoints = week.items.filter(item => item.type === 'checkpoint');
assert.equal(checkpoints.length, 7);
assert.ok(week.items.some(item => item.type === 'slide' && item.body.some(block => block.reveal?.code?.includes('myModPow(BigInteger exponent, BigInteger p, BigInteger q)'))), 'Lösung Aufgabe 1 als Code');
assert.ok(week.items.some(item => item.type === 'slide' && item.body.some(block => block.reveal?.code?.includes('doDatenbankEntschl'))), 'Lösung Aufgabe 2 als Code');
const allText = JSON.stringify(subject);
assert.doesNotMatch(allText, /—/, 'Keine Geviertstriche');
assert.doesNotMatch(allText, /Σ|∑/, 'Keine Summenzeichen');
const progress = L.emptyProgress();
for (const cp of checkpoints) {
  assert.ok(cp.questions.length >= 3 && cp.questions.length <= 5, cp.id);
  assert.ok(new Set(cp.questions.map(q => q.type)).size >= 2, `${cp.id}: gemischte Fragetypen`);
  const answers = {};
  for (const q of cp.questions) {
    const right = q.type === 'type' ? q.accept[0] : q.type === 'order' ? q.items.map((_, i) => i) : q.correct;
    answers[q.id] = right;
    assert.equal(L.checkQuestion(q, right).correct, true, `${cp.id}/${q.id}`);
    assert.match(q.explanation, /Quelle:/);
    if (q.type === 'type') {
      assert.ok(q.accept.length > 1);
      for (const alternative of q.accept) assert.equal(L.checkQuestion(q, `  ${alternative.toUpperCase()}  `).correct, true, `${q.id}: ${alternative}`);
    }
    const wrong = q.type === 'type' ? '999999' : q.type === 'single' ? (q.correct + 1) % q.options.length
      : q.type === 'multi' ? q.correct.slice(1) : [...right].reverse();
    assert.equal(L.checkQuestion(q, wrong).correct, false, `${q.id}: wrong/partial`);
  }
  const first = cp.questions[0];
  const wrong = first.type === 'single' ? (first.correct + 1) % first.options.length
    : first.type === 'multi' ? first.correct.slice(1) : first.type === 'order' ? [...answers[first.id]].reverse() : 'falsch';
  const state = { answers: { ...answers, [first.id]: wrong }, locked: {}, layout: {}, phase: 'review' };
  state.grade = L.gradeCheckpoint(cp, state.answers);
  assert.equal(state.grade.passed, false);
  assert.deepEqual(L.prepareRetry(cp, state), { kept: cp.questions.length - 1, reopened: 1 });
  assert.equal(L.openQuestionCount(cp, state), 1);
  for (const q of cp.questions.slice(1)) assert.equal(L.isQuestionLocked(state, q.id), true);
  state.answers[first.id] = answers[first.id];
  assert.equal(L.gradeCheckpoint(cp, state.answers).passed, true);
  L.markCheckpointPassed(progress, subject.id, week.id, cp.id);
}
assert.equal(L.weekState(subject, subject.weeks.indexOf(week), progress).status, 'passed');
assert.equal(L.subjectState(subject, L.normaliseProgress(JSON.parse(JSON.stringify(progress)))).passedWeeks, 1);
console.log('KRY Serie 4 coach: 7 checkpoints, model/alternative/wrong answers, cumulative retry and progress passed');
