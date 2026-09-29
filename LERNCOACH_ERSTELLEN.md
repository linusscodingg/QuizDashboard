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
