/*
 * Lerncoach-Inhalte für IT-Recht.
 * Wochen mit status "soon" erscheinen als "Noch keine Inhalte".
 * Zum Befüllen: status auf "ready" (oder "locked") setzen und items ergänzen.
 * Aufbau und Beispiele: LERNCOACH_ERSTELLEN.md und lerncoach/content/START.js
 */
Lerncoach.registerSubject({
  id: "ITRECHT",
  name: "IT-Recht",
  description: "Rechtliche Grundlagen der Informatik",
  accent: "#6d4bc3",
  weeks: [
    { id: "w1", number: 1, title: "Einführung ins Informatikrecht", status: "soon" },
    { id: "w2", number: 2, title: "IT-Verträge und Projektfallen", status: "soon" }
  ]
});
