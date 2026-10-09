const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const L = require(path.join(root, 'lerncoach/engine.js'));
let subject;
vm.runInNewContext(fs.readFileSync(path.join(root, 'lerncoach/content/SWS1.js'), 'utf8'), {
  Lerncoach: { registerSubject: value => { subject = value; } }
});
assert.deepEqual(L.validateSubject(subject), []);
assert.equal(subject.weeks.length, 5);
const progress = L.emptyProgress();
for (const week of subject.weeks.filter(week => ['w1', 'w4', 'w5'].includes(week.id))) {
  assert.equal(week.status, 'ready');
  for (const cp of week.items.filter(item => item.type === 'checkpoint')) {
    const answers = {};
    for (const q of cp.questions) {
      const right = q.type === 'type' ? q.accept[0] : q.type === 'order' ? q.items.map((_, i) => i) : q.correct;
      answers[q.id] = right;
      assert.equal(L.checkQuestion(q, right).correct, true, `${week.id}/${q.id}`);
      assert.match(q.explanation, /Quelle:/);
      if (q.type === 'type') {
        assert.ok(q.accept.length > 1);
        for (const alternative of q.accept) assert.equal(L.checkQuestion(q, `  ${alternative.toUpperCase()}  `).correct, true);
      }
      const wrong = q.type === 'type' ? 'falsche Rechtsfolge' : q.type === 'single' ? (q.correct + 1) % q.options.length
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
}
assert.equal(L.subjectState(subject, L.normaliseProgress(JSON.parse(JSON.stringify(progress)))).passedWeeks, 3);
console.log('SWS1 coaches: introduction, authentication/sessions/XSS and access control/CSRF/testing tools, model/alternative/wrong answers, cumulative retry and progress roundtrip passed');
