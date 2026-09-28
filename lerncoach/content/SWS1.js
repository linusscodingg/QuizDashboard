/*
 * Lerncoach-Inhalte für SWS1.
 * Wochen mit status "soon" erscheinen als "Noch keine Inhalte".
 * Zum Befüllen: status auf "ready" (oder "locked") setzen und items ergänzen.
 * Aufbau und Beispiele: LERNCOACH_ERSTELLEN.md und lerncoach/content/START.js
 */
Lerncoach.registerSubject({
  id: "SWS1",
  name: "SWS1",
  description: "Software and System Security 1",
  accent: "#9a4f24",
  weeks: [
    { id: "w2", number: 2, title: "Secure Development Lifecycle", status: "soon" },
    { id: "w3", number: 3, title: "Software Security Errors", status: "soon" }
  ]
});
