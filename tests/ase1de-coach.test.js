const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const L = require(path.join(root, 'lerncoach/engine.js'));
let subject;
vm.runInNewContext(fs.readFileSync(path.join(root, 'lerncoach/content/ASE1DE.js'), 'utf8'), {
  Lerncoach: { registerSubject: value => { subject = value; } }
});
assert.deepEqual(L.validateSubject(subject), []);
assert.equal(subject.id, 'ASE1DE');
assert.equal(subject.weeks.length, 4);
let english;
vm.runInNewContext(fs.readFileSync(path.join(root, 'lerncoach/content/ASE1.js'), 'utf8'), {
  Lerncoach: { registerSubject: value => { english = value; } }
});
assert.equal(english.id, 'ASE1', 'English subject stays separate');
for (const [wi, week] of subject.weeks.entries()) {
  const en = english.weeks[wi];
  assert.equal(week.id, en.id);
  assert.equal(week.items.length, en.items.length, `${week.id}: same structure as English`);
  week.items.forEach((item, ii) => {
    const enItem = en.items[ii];
    assert.equal(item.type, enItem.type);
    if (item.type !== 'checkpoint') return;
    assert.equal(item.id, enItem.id);
    item.questions.forEach((q, qi) => {
      const e = enItem.questions[qi];
      assert.equal(q.id, e.id); assert.equal(q.type, e.type);
      assert.equal(JSON.stringify(q.correct), JSON.stringify(e.correct), `${week.id}/${q.id}: same solution as English`);
      assert.equal((q.options || q.items).length, (e.options || e.items).length);
    });
  });
}
const progress = L.emptyProgress();
for (const week of subject.weeks) {
  assert.equal(week.status, 'ready');
  for (const cp of week.items.filter(item => item.type === 'checkpoint')) {
    const answers = {};
    for (const q of cp.questions) {
      const right = q.type === 'type' ? q.accept[0] : q.type === 'order' ? q.items.map((_, i) => i) : q.correct;
      answers[q.id] = right;
      assert.equal(L.checkQuestion(q, right).correct, true, `${week.id}/${q.id}`);
      assert.match(q.explanation, /Quelle:/);
      assert.doesNotMatch(q.explanation, /Source:/);
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
assert.equal(L.subjectState(subject, L.normaliseProgress(JSON.parse(JSON.stringify(progress)))).passedWeeks, 4);
console.log('ASE1DE: all four German coaches mirror English structure;, correct/wrong/partial answers, cumulative retry and progress roundtrip passed');
