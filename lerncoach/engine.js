/*
 * Lerncoach-Engine
 * Reine Logik ohne DOM: Validierung der Inhalte, Prüfung der Antworten,
 * Status von Wochen und Fächern sowie Fortschritt (Speichern/Zusammenführen).
 * Läuft im Browser (window.Lerncoach) und in Node (require) für Tests.
 */
(function (root, factory) {
  "use strict";
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.Lerncoach = Object.assign(root.Lerncoach || {}, api);
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  const ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/;
  const WEEK_STATUSES = new Set(["ready", "soon", "locked"]);
  const QUESTION_TYPES = new Set(["type", "multi", "order", "single"]);
  const CALLOUT_TONES = new Set(["def", "exam", "warn", "tip"]);
  const CELL_TONES = new Set(["good", "bad", "warn", "focus"]);
  const CHART_KINDS = new Set(["histogram", "box", "scatter", "heatmap", "sampling"]);
  const SAMPLING_MODES = new Set(["simple", "systematic", "stratified", "cluster"]);
  const SIM_KINDS = new Set(["minmax"]);
  const MAX_QUESTIONS = 8;

  /* ---------- Hilfsfunktionen ---------- */

  function isObject(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  }

  function isText(value) {
    return typeof value === "string" && value.trim().length > 0;
  }

  function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
    }[char]));
  }

  // Minimale Auszeichnung für Folientexte: **fett**, `code`. Es wird zuerst escaped.
  function formatInline(value) {
    return escapeHtml(value)
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  // Für Freitext: Gross-/Kleinschreibung, Leerraum und abschliessende Satzzeichen ignorieren.
  function normaliseText(value) {
    return String(value ?? "")
      .normalize("NFKC")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/[.,;:!?]+$/, "")
      .trim();
  }

  // Fisher-Yates. avoidIdentity verhindert, dass eine Reihenfolge-Frage schon gelöst startet.
  function shuffledIndices(length, { rng = Math.random, avoidIdentity = false } = {}) {
    const indices = Array.from({ length }, (_, index) => index);
    for (let round = 0; round < 8; round += 1) {
      for (let index = indices.length - 1; index > 0; index -= 1) {
        const swap = Math.floor(rng() * (index + 1));
        [indices[index], indices[swap]] = [indices[swap], indices[index]];
      }
      if (!avoidIdentity || length < 2 || indices.some((value, index) => value !== index)) return indices;
    }
    if (avoidIdentity && length > 1) [indices[0], indices[1]] = [indices[1], indices[0]];
    return indices;
  }

  /* ---------- Validierung der Inhalte ---------- */

  function validateQuestion(question, where, errors) {
    if (!isObject(question)) return errors.push(`${where}: Frage ist kein Objekt`);
    if (!ID_PATTERN.test(String(question.id || ""))) errors.push(`${where}: ungültige oder fehlende id`);
    if (!QUESTION_TYPES.has(question.type)) errors.push(`${where}: type muss type, multi, order oder single sein`);
    if (!isText(question.prompt)) errors.push(`${where}: prompt fehlt`);
    if (question.explanation !== undefined && typeof question.explanation !== "string") errors.push(`${where}: explanation muss Text sein`);

    if (question.type === "type") {
      if (!Array.isArray(question.accept) || !question.accept.length || !question.accept.every(isText)) {
        errors.push(`${where}: accept braucht mindestens eine akzeptierte Antwort`);
      }
    }
    if (question.type === "multi" || question.type === "single") {
      const minimum = question.type === "multi" ? 3 : 2;
      if (!Array.isArray(question.options) || question.options.length < minimum || !question.options.every(isText)) {
        errors.push(`${where}: options braucht mindestens ${minimum} Antworten`);
      } else if (question.type === "multi") {
        const correct = question.correct;
        const valid = Array.isArray(correct) && correct.length > 0
          && new Set(correct).size === correct.length
          && correct.every(index => Number.isInteger(index) && index >= 0 && index < question.options.length);
        if (!valid) errors.push(`${where}: correct muss eine Liste gültiger Options-Indizes sein`);
      } else if (!Number.isInteger(question.correct) || question.correct < 0 || question.correct >= question.options.length) {
        errors.push(`${where}: correct muss ein gültiger Options-Index sein`);
      }
    }
    if (question.type === "order") {
      const items = question.items;
      if (!Array.isArray(items) || items.length < 3 || !items.every(isText)) {
        errors.push(`${where}: items braucht mindestens 3 Elemente in korrekter Reihenfolge`);
      } else if (new Set(items.map(normaliseText)).size !== items.length) {
        errors.push(`${where}: items müssen eindeutig sein`);
      }
    }
  }

  // Lernform-Bloecke im Folientext. Ein Block ist entweder Text oder genau ein Objekt
  // mit einem der unten gepruefte Schluessel. Gibt null zurueck oder eine Fehlermeldung.
  function textList(value) {
    return Array.isArray(value) && value.length > 0 && value.every(isText);
  }
  function numberList(value) {
    return Array.isArray(value) && value.length > 0 && value.every(entry => typeof entry === "number" && Number.isFinite(entry));
  }
  function textOrList(value) {
    return isText(value) || textList(value);
  }

  function blockError(block) {
    if (isText(block)) return null;
    if (!isObject(block)) return "Block muss Text oder ein Objekt sein";

    if (block.list !== undefined) {
      return textList(block.list) ? null : "list braucht mindestens einen Text";
    }
    if (block.callout !== undefined) {
      const callout = block.callout;
      if (!isObject(callout)) return "callout muss ein Objekt sein";
      if (!CALLOUT_TONES.has(callout.tone)) return "callout.tone muss def, exam, warn oder tip sein";
      if (callout.title !== undefined && !isText(callout.title)) return "callout.title muss Text sein";
      return textOrList(callout.text) ? null : "callout.text braucht Text oder eine Liste von Texten";
    }
    if (block.table !== undefined) {
      const table = block.table;
      if (!isObject(table)) return "table muss ein Objekt sein";
      if (!textList(table.head)) return "table.head braucht mindestens eine Spalte";
      if (!Array.isArray(table.rows) || !table.rows.length) return "table.rows braucht mindestens eine Zeile";
      for (const row of table.rows) {
        if (!Array.isArray(row) || row.length !== table.head.length) return "jede table-Zeile braucht so viele Zellen wie head";
      }
      if (table.marks !== undefined) {
        if (!isObject(table.marks)) return "table.marks muss ein Objekt sein";
        for (const [key, tone] of Object.entries(table.marks)) {
          if (!/^-?\d+,\d+$/.test(key)) return `table.marks "${key}" muss die Form "zeile,spalte" haben`;
          if (!CELL_TONES.has(tone)) return `table.marks "${key}" braucht good, bad, warn oder focus`;
        }
      }
      if (table.caption !== undefined && !isText(table.caption)) return "table.caption muss Text sein";
      if (table.note !== undefined && !isText(table.note)) return "table.note muss Text sein";
      return null;
    }
    if (block.flow !== undefined) {
      const flow = block.flow;
      if (!isObject(flow) || !Array.isArray(flow.steps) || flow.steps.length < 2) return "flow.steps braucht mindestens 2 Schritte";
      for (const step of flow.steps) {
        if (!isObject(step) || !isText(step.title)) return "jeder flow-Schritt braucht einen title";
        if (step.text !== undefined && !isText(step.text)) return "flow-Schritt text muss Text sein";
      }
      if (flow.note !== undefined && !isText(flow.note)) return "flow.note muss Text sein";
      return null;
    }
    if (block.compare !== undefined) {
      const compare = block.compare;
      if (!isObject(compare)) return "compare muss ein Objekt sein";
      for (const side of ["left", "right"]) {
        const column = compare[side];
        if (!isObject(column) || !isText(column.title)) return `compare.${side} braucht einen title`;
        if (!textList(column.points)) return `compare.${side}.points braucht mindestens einen Text`;
      }
      if (compare.verdict !== undefined && !isText(compare.verdict)) return "compare.verdict muss Text sein";
      return null;
    }
    if (block.cards !== undefined) {
      if (!Array.isArray(block.cards) || block.cards.length < 2) return "cards braucht mindestens 2 Karten";
      for (const card of block.cards) {
        if (!isObject(card) || !isText(card.title)) return "jede Karte braucht einen title";
        if (card.text !== undefined && !isText(card.text)) return "Karten-text muss Text sein";
      }
      return null;
    }
    if (block.formula !== undefined) {
      const formula = block.formula;
      if (!isObject(formula) || !isText(formula.main)) return "formula.main fehlt";
      if (formula.parts !== undefined) {
        if (!Array.isArray(formula.parts) || !formula.parts.length) return "formula.parts braucht mindestens einen Eintrag";
        for (const part of formula.parts) {
          if (!isObject(part) || !isText(part.label) || !isText(part.text)) return "jeder formula.parts-Eintrag braucht label und text";
        }
      }
      if (formula.note !== undefined && !isText(formula.note)) return "formula.note muss Text sein";
      return null;
    }
    if (block.reveal !== undefined) {
      const reveal = block.reveal;
      if (!isObject(reveal) || !isText(reveal.question)) return "reveal.question fehlt";
      if (reveal.label !== undefined && !isText(reveal.label)) return "reveal.label muss Text sein";
      return textOrList(reveal.answer) ? null : "reveal.answer braucht Text oder eine Liste von Texten";
    }
    if (block.checklist !== undefined) {
      const checklist = block.checklist;
      if (!isObject(checklist)) return "checklist muss ein Objekt sein";
      if (checklist.title !== undefined && !isText(checklist.title)) return "checklist.title muss Text sein";
      return textList(checklist.items) ? null : "checklist.items braucht mindestens einen Text";
    }
    if (block.sim !== undefined) {
      const sim = block.sim;
      if (!isObject(sim) || !SIM_KINDS.has(sim.kind)) return "sim.kind muss minmax sein";
      if (![sim.min, sim.max, sim.start].every(value => typeof value === "number" && Number.isFinite(value))) {
        return "sim braucht min, max und start als Zahlen";
      }
      if (sim.min >= sim.max) return "sim.min muss kleiner als sim.max sein";
      if (!isText(sim.label)) return "sim.label fehlt";
      if (sim.note !== undefined && !isText(sim.note)) return "sim.note muss Text sein";
      return null;
    }
    if (block.chart !== undefined) {
      const chart = block.chart;
      if (!isObject(chart) || !CHART_KINDS.has(chart.kind)) return "chart.kind muss histogram, box, scatter, heatmap oder sampling sein";
      if (chart.caption !== undefined && !isText(chart.caption)) return "chart.caption muss Text sein";
      if (chart.note !== undefined && !isText(chart.note)) return "chart.note muss Text sein";
      if (chart.kind === "histogram") {
        if (!Array.isArray(chart.panels) || !chart.panels.length) return "histogram braucht panels";
        for (const panel of chart.panels) {
          if (!isObject(panel) || !isText(panel.title)) return "jedes histogram-panel braucht einen title";
          if (!numberList(panel.counts)) return "jedes histogram-panel braucht counts als Zahlenliste";
          if (typeof panel.start !== "number" || typeof panel.step !== "number" || panel.step <= 0) return "histogram-panel braucht start und step als Zahlen";
          if (panel.mean !== undefined && typeof panel.mean !== "number") return "histogram-panel mean muss eine Zahl sein";
        }
        return null;
      }
      if (chart.kind === "box") {
        if (!Array.isArray(chart.groups) || !chart.groups.length) return "box braucht groups";
        for (const group of chart.groups) {
          if (!isObject(group) || !isText(group.label)) return "jede box-group braucht ein label";
          for (const key of ["low", "q1", "median", "q3", "high"]) {
            if (typeof group[key] !== "number") return `box-group braucht ${key} als Zahl`;
          }
          if (!(group.low <= group.q1 && group.q1 <= group.median && group.median <= group.q3 && group.q3 <= group.high)) {
            return "box-group: low <= q1 <= median <= q3 <= high verletzt";
          }
          if (group.outliers !== undefined && !Array.isArray(group.outliers)) return "box-group outliers muss eine Liste sein";
        }
        return null;
      }
      if (chart.kind === "scatter") {
        if (!Array.isArray(chart.panels) || !chart.panels.length) return "scatter braucht panels";
        for (const panel of chart.panels) {
          if (!isObject(panel) || !isText(panel.title)) return "jedes scatter-panel braucht einen title";
          if (!Array.isArray(panel.points) || panel.points.length < 3) return "jedes scatter-panel braucht mindestens 3 Punkte";
          for (const point of panel.points) {
            if (!Array.isArray(point) || point.length !== 2 || !point.every(Number.isFinite)) return "scatter-Punkte muessen [x, y] mit Zahlen sein";
          }
        }
        return null;
      }
      if (chart.kind === "heatmap") {
        if (!textList(chart.labels)) return "heatmap braucht labels";
        if (!Array.isArray(chart.matrix) || chart.matrix.length !== chart.labels.length) return "heatmap.matrix braucht eine Zeile pro label";
        for (const row of chart.matrix) {
          if (!Array.isArray(row) || row.length !== chart.labels.length || !row.every(Number.isFinite)) return "jede heatmap-Zeile braucht eine Zahl pro label";
        }
        return null;
      }
      if (!SAMPLING_MODES.has(chart.mode)) return "sampling braucht mode simple, systematic, stratified oder cluster";
      return null;
    }
    return "unbekannter Block-Typ";
  }

  function validateSlide(item, where, errors) {
    if (!isText(item.title)) errors.push(`${where}: title fehlt`);
    const body = item.body;
    if (!Array.isArray(body) || !body.length) {
      errors.push(`${where}: body braucht mindestens einen Absatz`);
    } else {
      body.forEach((block, index) => {
        const problem = blockError(block);
        if (problem) errors.push(`${where} Block ${index + 1}: ${problem}`);
      });
    }
    const remember = item.remember;
    if (remember !== undefined && !isText(remember) && !(Array.isArray(remember) && remember.length && remember.every(isText))) {
      errors.push(`${where}: remember muss Text oder Liste von Texten sein`);
    }
  }

  function validateCheckpoint(item, where, errors) {
    if (item.title !== undefined && !isText(item.title)) errors.push(`${where}: title muss Text sein`);
    const questions = item.questions;
    if (!Array.isArray(questions) || questions.length < 1 || questions.length > MAX_QUESTIONS) {
      errors.push(`${where}: questions braucht 1 bis ${MAX_QUESTIONS} Fragen (empfohlen 3 bis 5)`);
      return;
    }
    const ids = new Set();
    questions.forEach((question, index) => {
      const questionWhere = `${where} Frage ${index + 1}`;
      validateQuestion(question, questionWhere, errors);
      if (question && ids.has(question.id)) errors.push(`${questionWhere}: doppelte id ${question.id}`);
      if (question) ids.add(question.id);
    });
    if (questions.every(question => question && question.type === "single")) {
      errors.push(`${where}: nicht nur single-Fragen verwenden (mindestens eine type-, multi- oder order-Frage)`);
    }
  }

  function validateSubject(subject) {
    const errors = [];
    if (!isObject(subject)) return ["Fach ist kein Objekt"];
    const label = `Fach ${subject.id || "?"}`;
    if (!ID_PATTERN.test(String(subject.id || ""))) errors.push(`${label}: ungültige oder fehlende id`);
    if (!isText(subject.name)) errors.push(`${label}: name fehlt`);
    if (!Array.isArray(subject.weeks)) return [...errors, `${label}: weeks muss eine Liste sein`];

    const weekIds = new Set();
    subject.weeks.forEach((week, weekIndex) => {
      const where = `${label} Woche ${weekIndex + 1}`;
      if (!isObject(week)) return errors.push(`${where}: Woche ist kein Objekt`);
      if (!ID_PATTERN.test(String(week.id || ""))) errors.push(`${where}: ungültige oder fehlende id`);
      if (weekIds.has(week.id)) errors.push(`${where}: doppelte id ${week.id}`);
      weekIds.add(week.id);
      if (!isText(week.title)) errors.push(`${where}: title fehlt`);
      if (week.status !== undefined && !WEEK_STATUSES.has(week.status)) errors.push(`${where}: status muss ready, locked oder soon sein`);
      if (week.requiredPoints !== undefined && !(Number.isInteger(week.requiredPoints) && week.requiredPoints >= 0)) {
        errors.push(`${where}: requiredPoints muss eine ganze Zahl ab 0 sein`);
      }
      const items = week.items === undefined ? [] : week.items;
      if (!Array.isArray(items)) return errors.push(`${where}: items muss eine Liste sein`);
      if (week.status !== "soon" && !items.length) errors.push(`${where}: Woche ohne Inhalte als status "soon" markieren`);

      const checkpointIds = new Set();
      items.forEach((item, itemIndex) => {
        const itemWhere = `${where} Item ${itemIndex + 1}`;
        if (!isObject(item)) return errors.push(`${itemWhere}: Item ist kein Objekt`);
        if (item.type === "slide") validateSlide(item, itemWhere, errors);
        else if (item.type === "checkpoint") {
          if (!ID_PATTERN.test(String(item.id || ""))) errors.push(`${itemWhere}: Checkpoint braucht eine stabile id`);
          if (checkpointIds.has(item.id)) errors.push(`${itemWhere}: doppelte Checkpoint-id ${item.id}`);
          checkpointIds.add(item.id);
          validateCheckpoint(item, itemWhere, errors);
        } else errors.push(`${itemWhere}: type muss slide oder checkpoint sein`);
      });
    });
    return errors;
  }

  /* ---------- Antworten prüfen ---------- */

  function expectedAnswer(question) {
    if (question.type === "type") return question.accept[0];
    if (question.type === "single") return question.options[question.correct];
    if (question.type === "multi") return question.correct.map(index => question.options[index]).join(" · ");
    if (question.type === "order") return question.items.join(" → ");
    return "";
  }

  function isAnswered(question, answer) {
    if (question.type === "type") return normaliseText(answer).length > 0;
    if (question.type === "single") return Number.isInteger(answer);
    if (question.type === "multi") return Array.isArray(answer) && answer.length > 0;
    if (question.type === "order") return Array.isArray(answer) && answer.length === question.items.length;
    return false;
  }

  function checkQuestion(question, answer) {
    let correct = false;
    if (question.type === "type") {
      const given = normaliseText(answer);
      correct = given.length > 0 && question.accept.some(option => normaliseText(option) === given);
    } else if (question.type === "single") {
      correct = answer === question.correct;
    } else if (question.type === "multi") {
      const chosen = new Set(Array.isArray(answer) ? answer : []);
      const expected = new Set(question.correct);
      correct = chosen.size === expected.size && [...expected].every(index => chosen.has(index));
    } else if (question.type === "order") {
      correct = Array.isArray(answer) && answer.length === question.items.length
        && answer.every((itemIndex, position) => itemIndex === position);
    }
    return { correct, expected: expectedAnswer(question) };
  }

  function gradeCheckpoint(checkpoint, answers = {}) {
    const results = {};
    let correctCount = 0;
    checkpoint.questions.forEach(question => {
      const result = checkQuestion(question, answers[question.id]);
      results[question.id] = result;
      if (result.correct) correctCount += 1;
    });
    const total = checkpoint.questions.length;
    return { passed: total > 0 && correctCount === total, correctCount, total, results };
  }

  /* ---------- Fortschritt ---------- */

  function emptyProgress() {
    return { version: 1, checkpoints: {}, positions: {} };
  }

  function weekKey(subjectId, weekId) { return `${subjectId}:${weekId}`; }
  function checkpointKey(subjectId, weekId, checkpointId) { return `${subjectId}:${weekId}:${checkpointId}`; }

  function validIso(value) {
    return typeof value === "string" && !Number.isNaN(new Date(value).getTime());
  }

  function normaliseProgress(value) {
    const progress = emptyProgress();
    if (!isObject(value) || value.version !== 1) return progress;
    if (isObject(value.checkpoints)) {
      Object.entries(value.checkpoints).forEach(([key, entry]) => {
        if (key.length > 200 || !isObject(entry) || !validIso(entry.passedAt)) return;
        progress.checkpoints[key] = { passedAt: new Date(entry.passedAt).toISOString() };
      });
    }
    if (isObject(value.positions)) {
      Object.entries(value.positions).forEach(([key, entry]) => {
        if (key.length > 200 || !isObject(entry)) return;
        const index = Math.floor(Number(entry.index));
        progress.positions[key] = {
          index: Number.isFinite(index) ? clamp(index, 0, 500) : 0,
          finished: entry.finished === true,
          updatedAt: validIso(entry.updatedAt) ? new Date(entry.updatedAt).toISOString() : new Date(0).toISOString()
        };
      });
    }
    return progress;
  }

  function isCheckpointPassed(progress, subjectId, weekId, checkpointId) {
    return Boolean(progress.checkpoints[checkpointKey(subjectId, weekId, checkpointId)]);
  }

  // Gibt true zurück, wenn der Checkpoint neu bestanden wurde. Bestanden bleibt bestanden.
  function markCheckpointPassed(progress, subjectId, weekId, checkpointId, now = new Date()) {
    const key = checkpointKey(subjectId, weekId, checkpointId);
    if (progress.checkpoints[key]) return false;
    progress.checkpoints[key] = { passedAt: new Date(now).toISOString() };
    return true;
  }

  function setPosition(progress, subjectId, weekId, index, { finished = false, now = new Date() } = {}) {
    const key = weekKey(subjectId, weekId);
    const previous = progress.positions[key];
    progress.positions[key] = {
      index: clamp(Math.floor(Number(index)) || 0, 0, 500),
      finished: finished || previous?.finished === true,
      updatedAt: new Date(now).toISOString()
    };
  }

  function mergeProgress(localValue, remoteValue) {
    const local = normaliseProgress(localValue);
    const remote = normaliseProgress(remoteValue);
    const merged = emptyProgress();
    new Set([...Object.keys(local.checkpoints), ...Object.keys(remote.checkpoints)]).forEach(key => {
      const a = local.checkpoints[key];
      const b = remote.checkpoints[key];
      merged.checkpoints[key] = !a ? b : !b ? a : (a.passedAt <= b.passedAt ? a : b);
    });
    new Set([...Object.keys(local.positions), ...Object.keys(remote.positions)]).forEach(key => {
      const a = local.positions[key];
      const b = remote.positions[key];
      const newer = !a ? b : !b ? a : (a.updatedAt >= b.updatedAt ? a : b);
      merged.positions[key] = { ...newer, finished: Boolean(a?.finished || b?.finished) };
    });
    return merged;
  }

  /* ---------- Status von Wochen und Fächern ---------- */

  function checkpointsOf(week) {
    return (week.items || []).filter(item => item.type === "checkpoint");
  }

  function hasContent(week) {
    return week.status !== "soon" && Array.isArray(week.items) && week.items.length > 0;
  }

  function weekState(subject, weekIndex, progress) {
    const week = subject.weeks[weekIndex];
    const checkpoints = checkpointsOf(week);
    const passedCheckpoints = checkpoints.filter(item => isCheckpointPassed(progress, subject.id, week.id, item.id)).length;
    const position = progress.positions[weekKey(subject.id, week.id)] || null;
    const base = {
      week, weekIndex, position,
      totalCheckpoints: checkpoints.length,
      passedCheckpoints,
      percent: checkpoints.length ? Math.round(passedCheckpoints / checkpoints.length * 100) : (position?.finished ? 100 : 0),
      requiredPoints: 0,
      previousWeek: null,
      previousPassed: 0
    };
    if (!hasContent(week)) return { ...base, status: "soon", percent: 0 };

    // Vorwoche = nächstliegende frühere Woche mit Inhalten
    let previousIndex = weekIndex - 1;
    while (previousIndex >= 0 && !hasContent(subject.weeks[previousIndex])) previousIndex -= 1;
    if (previousIndex >= 0) {
      const previousWeek = subject.weeks[previousIndex];
      const previousCheckpoints = checkpointsOf(previousWeek);
      const wanted = week.requiredPoints !== undefined ? week.requiredPoints
        : week.status === "locked" ? previousCheckpoints.length : 0;
      base.previousWeek = previousWeek;
      base.requiredPoints = clamp(wanted, 0, previousCheckpoints.length);
      base.previousPassed = previousCheckpoints.filter(item => isCheckpointPassed(progress, subject.id, previousWeek.id, item.id)).length;
    }

    const passed = checkpoints.length ? passedCheckpoints === checkpoints.length : position?.finished === true;
    if (passed) return { ...base, status: "passed", percent: 100 };
    if (base.previousPassed < base.requiredPoints) return { ...base, status: "locked" };
    return { ...base, status: "ready" };
  }

  function subjectState(subject, progress) {
    const weeks = subject.weeks.map((_, index) => weekState(subject, index, progress));
    const withContent = weeks.filter(state => state.status !== "soon");
    const totalCheckpoints = withContent.reduce((sum, state) => sum + state.totalCheckpoints, 0);
    const passedCheckpoints = withContent.reduce((sum, state) => sum + state.passedCheckpoints, 0);
    const passedWeeks = withContent.filter(state => state.status === "passed").length;
    return {
      weeks,
      totalWeeks: withContent.length,
      passedWeeks,
      soonWeeks: weeks.length - withContent.length,
      totalCheckpoints,
      passedCheckpoints,
      percent: withContent.length ? Math.round(passedWeeks / withContent.length * 100) : 0
    };
  }

  function canEnter(state) {
    return state.status === "ready" || state.status === "passed";
  }

  // Höchster Item-Index, der im Vorlesungs-Player erreichbar ist:
  // Man kommt nicht an einem noch nicht bestandenen Checkpoint vorbei.
  function maxReachableIndex(week, isPassed) {
    const items = week.items || [];
    for (let index = 0; index < items.length; index += 1) {
      if (items[index].type === "checkpoint" && !isPassed(items[index].id)) return index;
    }
    return items.length; // items.length = Abschlussseite
  }

  /* ---------- Registrierung der Inhalte ---------- */

  const registry = new Map();

  function registerSubject(subject) {
    const errors = validateSubject(subject);
    let id = isObject(subject) && subject.id ? String(subject.id) : `invalid-${registry.size + 1}`;
    if (registry.has(id)) {
      errors.push(`Fach-id ${id} ist mehrfach registriert`);
      id = `${id}#${registry.size + 1}`;
    }
    registry.set(id, { subject, errors });
    if (errors.length && typeof console !== "undefined") console.warn(`[Lerncoach] Inhalt ${id} ist fehlerhaft:`, errors);
    return errors;
  }

  function registeredSubjects() { return [...registry.values()]; }
  function resetRegistry() { registry.clear(); }

  return {
    ID_PATTERN,
    escapeHtml, formatInline, normaliseText, shuffledIndices,
    validateSubject, blockError,
    expectedAnswer, isAnswered, checkQuestion, gradeCheckpoint,
    emptyProgress, normaliseProgress, weekKey, checkpointKey,
    isCheckpointPassed, markCheckpointPassed, setPosition, mergeProgress,
    checkpointsOf, hasContent, weekState, subjectState, canEnter, maxReachableIndex,
    registerSubject, registeredSubjects, resetRegistry
  };
});
