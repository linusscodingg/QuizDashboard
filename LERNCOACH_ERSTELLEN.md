# Lerncoach-Inhalte erstellen

Der Lerncoach ist der zweite Modus im Dashboard (Tab **Lerncoach**). Ablauf für Lernende: Fach wählen → Woche wählen → **Vorlesung starten** (Folien mit Erklärungen und Checkpoints) oder **Nur Quiz machen** (nur die Checkpoints hintereinander).

Inhalte sind reine Daten. Für neue Fächer oder Wochen wird keine Logik angepasst.

## Dateien

```text
lerncoach/
├── manifest.js        Liste der Inhaltsdateien (Reihenfolge = Reihenfolge der Fächer)
├── engine.js          Logik (Prüfung, Status, Fortschritt), nicht anfassen
├── ui.js              Oberfläche, nicht anfassen
├── lerncoach.css      Stil, nutzt die Farben aus index.html
└── content/
    ├── CNS1.js        vollständiges Beispiel (3 Wochen)
    ├── CNS1.js
    └── ...
```

- **Neue Woche:** in der Fach-Datei einen Eintrag in `weeks` ergänzen.
- **Neues Fach:** neue Datei `lerncoach/content/<FACH>.js` anlegen und den Pfad in `lerncoach/manifest.js` eintragen.
- **Fach entfernen:** Zeile aus `lerncoach/manifest.js` löschen.

## Aufbau einer Fach-Datei

```js
Lerncoach.registerSubject({
  id: "CNS1",                       // stabil, nie ändern (Fortschritt hängt daran)
  name: "Communication Networks and Services 1",
  short: "CNS1",                    // optional, max. 4 Zeichen für das Fach-Symbol
  description: "Kurzbeschreibung",
  accent: "#0b77a5",                // Hex-Farbe
  weeks: [
    {
      id: "w3",                     // stabil, nie ändern
      number: 3,                    // optional, Anzeige "Woche 3"
      title: "VoIP und Signaling",
      status: "ready",              // "ready" | "locked" | "soon"
      requiredPoints: 2,            // optional, siehe Sperren
      items: [ /* slide und checkpoint, beliebig gemischt */ ]
    },
    { id: "w4", title: "QoS", status: "soon" }
  ]
});
```

## Status und Sperren

| Status | Bedeutung |
|---|---|
| `soon` | Angekündigt, noch keine Inhalte. Nicht klickbar, zählt nicht zu "X / Y Wochen". |
| `ready` | Verfügbar. Mit `requiredPoints` trotzdem gesperrt, bis genug Checkpoints der Vorwoche bestanden sind. |
| `locked` | Gesperrt, bis **alle** Checkpoints der Vorwoche bestanden sind. Mit `requiredPoints` gilt stattdessen diese Anzahl. |

- Vorwoche = die nächste frühere Woche, die Inhalte hat (`soon`-Wochen werden übersprungen).
- `requiredPoints` wird auf die Anzahl Checkpoints der Vorwoche begrenzt.
- **Bestanden** ist ein Checkpoint, sobald einmal alle Fragen in einem Durchgang richtig waren. Das bleibt dauerhaft gespeichert.
- **Woche bestanden** = alle Checkpoints bestanden. Eine Woche ohne Checkpoints gilt als bestanden, sobald sie bis zum Ende durchgeklickt wurde.

## Folie (`slide`)

```js
{
  type: "slide",
  title: "Was macht SIP?",
  body: [
    "Erklärung in einfacher Sprache, wie ein Dozent. **Fett** und `Code` sind möglich.",
    "Beispiel oder Analogie: SIP ist wie die Telefonzentrale, die Verbindungen vermittelt ...",
    { list: ["Punkt 1", "Punkt 2"] }
  ],
  remember: "Der harte Fakt für die Box \"Kurz gemerkt\""   // oder ["Fakt 1", "Fakt 2"]
}
```

## Lernform-Blöcke im Folientext

Neben Text und `{ list: [...] }` kennt `body` weitere Blöcke. Jeder Block ist ein Objekt mit genau einem der folgenden Schlüssel. Die Validierung meldet Fehler mit Blocknummer, zum Beispiel `Woche 3 Item 5 Block 2: callout.tone muss def, exam, warn oder tip sein`.

Setze einen Block nur, wenn er das Verständnis besser macht als ein Absatz. Für reines Hintergrundwissen bleibt normaler Text die richtige Wahl.

| Block | Wofür | Pflichtfelder |
|---|---|---|
| `callout` | Definition, Prüfungsrelevanz, typischer Fehler, Merkhilfe | `tone` (`def`, `exam`, `warn`, `tip`), `text` (Text oder Liste) |
| `table` | echte Daten aus der Vorlesung zeigen | `head`, `rows` (jede Zeile so lang wie `head`) |
| `flow` | Prozess oder Schrittfolge mit Pfeilen | `steps` (mindestens 2, je mit `title`) |
| `compare` | zwei Konzepte gegenüberstellen | `left` und `right`, je mit `title` und `points` |
| `cards` | mehrere gleichrangige Punkte nebeneinander | mindestens 2 Karten mit `title` |
| `formula` | Formel mit erklärten Bestandteilen | `main` |
| `reveal` | aktive Frage, Antwort erst nach Klick, optional mit `code` (mehrzeiliger Code unter der Antwort) | `question`, `answer` |
| `code` | mehrzeiliger Programmcode, zum Beispiel Java-Lösungen | `text` |
| `checklist` | Selbstcheck „Kann ich das jetzt?" mit Zähler | `items` |
| `sim` | Mini-Simulation, aktuell `kind: "minmax"` | `kind`, `label`, `min`, `max`, `start` |
| `chart` | Diagramm als SVG | `kind` (`histogram`, `box`, `scatter`, `heatmap`, `sampling`) |

Beispiele:

```js
{ callout: { tone: "warn", title: "Typischer Fehler", text: "Look nicht direkt mit Decide verbinden." } }

{ table: {
  caption: "Min- und Max-Zeile",
  head: ["ID", "Glucose", "Age"],
  rows: [["1", "148", "50"], ["Min", "85", "21"]],
  marks: { "1,1": "warn" },          // "zeile,spalte" → good | bad | warn | focus
  note: "Gelb die Min-Zeile."
} }

{ flow: { steps: [{ title: "Look", text: "hinschauen" }, { title: "Decide" }], note: "Reihenfolge zählt" } }

{ compare: {
  left:  { title: "Stratified", points: ["zieht aus jeder Gruppe"] },
  right: { title: "Cluster",    points: ["nimmt ganze Gruppen"] },
  verdict: "Der Merksatz."
} }

{ cards: [{ title: "Centre", text: "Wo liegt die Masse?" }, { title: "Spread", text: "Wie breit?", tone: "warn" }] }

{ formula: { main: "x_scaled = (x − x_min) / (x_max − x_min)",
             parts: [{ label: "Zähler", text: "Abstand zum Minimum" }], note: "Resultat 0 bis 1" } }

{ reveal: { question: "Was passiert als Nächstes?", answer: ["Erster Absatz.", "Zweiter Absatz."], label: "Auflösung" } }

{ reveal: { question: "Wie sieht Schritt 1 in Java aus?", answer: "So:", code: "BigInteger a1 = this.myModPow(exponent, p);" } }

{ code: { caption: "Lösung", text: "public int f() {\n  return 1;\n}", note: "Optionaler Hinweis" } }

{ checklist: { title: "Kann ich das jetzt?", items: ["Ich kann X erklären."] } }

{ sim: { kind: "minmax", label: "Age, Min 20 und Max 80", min: 20, max: 80, start: 50, unit: "Jahre" } }

{ chart: { kind: "histogram", caption: "Altersverteilung",
           panels: [{ title: "Kohorte A", counts: [1, 4, 2], start: 40, step: 10, mean: 60 }], xLabel: "Alter" } }
{ chart: { kind: "box", groups: [{ label: "Not readmitted", low: 0.5, q1: 1.8, median: 3, q3: 4.5, high: 8.7, outliers: [12] }] } }
{ chart: { kind: "scatter", panels: [{ title: "positiv", points: [[1, 2], [2, 3], [3, 5]], note: "Direction positiv" }] } }
{ chart: { kind: "heatmap", labels: ["Age", "Glucose"], matrix: [[1, 0.19], [0.19, 1]] } }
{ chart: { kind: "sampling", mode: "stratified" } }   // simple | systematic | stratified | cluster
```

Regeln:

- `box`-Gruppen müssen `low <= q1 <= median <= q3 <= high` erfüllen.
- `heatmap.matrix` braucht genau eine quadratische Zeile pro `label`.
- `sampling` zeichnet zwölf Personen und die Auswahl selbst. Der Modus genügt, eigene `note` ersetzt den eingebauten Hinweis.
- Diagramme und Tabellen sind **eigene Nachbauten mit den Zahlen der Folien**. Folienbilder werden nicht kopiert, siehe `QUIZ_ERSTELLEN.md`.
- Die Blöcke bleiben rückwärtskompatibel: bestehende Fächer mit reinem Text und Listen rendern unverändert.

## Checkpoint (`checkpoint`)

3 bis 5 Fragen. Nur mit 100 % geht es weiter, sonst **Nochmal versuchen**. Nicht nur `single` verwenden (wird von der Validierung abgelehnt).

```js
{
  type: "checkpoint",
  id: "cp-sip",                      // stabil, eindeutig innerhalb der Woche
  title: "Checkpoint: SIP",
  questions: [
    {
      id: "port", type: "type",
      prompt: "Welchen Standard-Port nutzt SIP ohne TLS?",
      accept: ["5060", "Port 5060"],   // erste Antwort wird als Lösung angezeigt
      placeholder: "Zahl",             // optional
      explanation: "SIP nutzt standardmässig 5060, mit TLS 5061."
    },
    {
      id: "aufgaben", type: "multi",
      prompt: "Welche Aufgaben übernimmt SIP?",
      options: ["Sitzungsaufbau", "Medientransport", "Sitzungsabbau", "Codec-Aushandlung via SDP"],
      correct: [0, 2, 3],              // Indizes aller richtigen Optionen
      explanation: "Die Medien selbst transportiert RTP."
    },
    {
      id: "ablauf", type: "order",
      prompt: "Ordne den Verbindungsaufbau.",
      items: ["INVITE", "180 Ringing", "200 OK", "ACK"],   // in KORREKTER Reihenfolge eintragen
      explanation: "Klassischer Three-Way-Handshake mit Klingelphase."
    },
    {
      id: "transport", type: "single",
      prompt: "Welches Protokoll transportiert die Sprachdaten?",
      options: ["SIP", "RTP", "DNS"],
      correct: 1
    }
  ]
}
```

Prüfregeln:

- `type` (Freitext): Gross-/Kleinschreibung, Leerzeichen am Rand, doppelte Leerzeichen und Satzzeichen am Ende werden ignoriert. Alle sinnvollen Schreibweisen in `accept` aufnehmen.
- `multi`: alle richtigen angekreuzt **und** alle falschen leer.
- `order`: exakt die Reihenfolge aus `items`. Die Begriffe werden automatisch gemischt.
- `single`: genau die Option `correct`. Optionen werden gemischt.

## Inhaltliche Regeln

- Quelle sind die offiziellen Unterlagen (wie in `QUIZ_ERSTELLEN.md`). Keine Fakten erfinden.
- Erklärungen in eigenen Worten, einfache Sprache, mit Beispielen und Analogien.
- `id` von Fach, Woche und Checkpoint nie nachträglich ändern, sonst geht der gespeicherte Fortschritt verloren.

## Speicherung

- Lokal im Browser unter `lerncoach-progress-v1`.
- Mit GitHub-Anmeldung zusätzlich in Firestore unter `users/<uid>/lerncoach/progress`. Lokaler und Cloud-Stand werden zusammengeführt (bestanden bleibt bestanden, neuere Position gewinnt).
- **Sicherung exportieren/importieren** im Dashboard enthält den Lerncoach-Fortschritt.
- Die Regeln in `firestore.rules` müssen nach dieser Erweiterung **einmal neu veröffentlicht** werden (`firebase deploy --only firestore:rules` oder Firebase Console). Bis dahin speichert der Lerncoach nur lokal und zeigt einen Hinweis an.

## Prüfen

```powershell
node --test tests/lerncoach.test.js
```

Der Test validiert jede Datei aus dem Manifest (IDs, Fragetypen, 3 bis 5 Fragen pro Checkpoint, gültige Lösungen). Fehlerhafte Inhalte erscheinen im Dashboard zusätzlich als roter Hinweis "Inhalt fehlerhaft" mit der konkreten Fehlermeldung.
