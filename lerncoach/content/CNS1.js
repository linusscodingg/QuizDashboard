/*
 * Lerncoach-Inhalte für CNS1.
 * Wochen mit status "soon" erscheinen als "Noch keine Inhalte".
 * Zum Befüllen: status auf "ready" (oder "locked") setzen und items ergänzen.
 * Aufbau und Beispiele: LERNCOACH_ERSTELLEN.md und lerncoach/content/START.js
 */
Lerncoach.registerSubject({
  id: "CNS1",
  name: "CNS1",
  description: "Computer Networks and Security",
  accent: "#0b77a5",
  weeks: [
    { id: "w1", number: 1, title: "IPv6 – Exercise 01a", status: "soon" },
    { id: "w2", number: 2, title: "IPv6 – Part 2", status: "soon" }
  ]
});
