/*
 * Beispiel-Fach: erklärt den Lerncoach selbst und dient als Vorlage.
 * Kann jederzeit aus lerncoach/manifest.js entfernt werden.
 */
Lerncoach.registerSubject({
  id: "START",
  name: "Lerncoach-Start",
  description: "Einführung in den Lerncoach und Vorlage für eigene Inhalte",
  accent: "#087da8",
  weeks: [
    {
      id: "w1",
      number: 1,
      title: "So funktioniert der Lerncoach",
      status: "ready",
      items: [
        {
          type: "slide",
          title: "Willkommen im Lerncoach",
          body: [
            "Der Lerncoach ist der zweite Modus deines Dashboards. Die Quiz-Übersicht sammelt fertige Reviews. Der Lerncoach führt dich dagegen **Schritt für Schritt** durch eine Vorlesung: zuerst erklären, dann prüfen.",
            "Stell dir das wie eine Wanderung mit Etappen vor. Jede Folie ist ein Wegstück, jeder Checkpoint eine Hütte, an der du kurz zeigst, dass du den Weg bis hierhin verstanden hast. Erst dann geht es weiter."
          ],
          remember: "Aufbau: Fach → Woche → Folien und Checkpoints"
        },
        {
          type: "slide",
          title: "Checkpoints: 100 % oder nochmal",
          body: [
            "Ein Checkpoint besteht aus drei bis fünf Fragen. Du beantwortest alle und drückst dann **Checkpoint prüfen**.",
            "Bestanden ist ein Checkpoint nur, wenn **alle** Antworten im selben Durchgang stimmen. Bei einem Fehler siehst du, was richtig gewesen wäre, und startest mit **Nochmal versuchen** einen neuen Durchgang. Teilpunkte gibt es bewusst nicht: Das Ziel ist Verstehen, nicht Durchrutschen.",
            "Einmal bestanden bleibt bestanden. Der Status wird im Browser gespeichert und mit deinem GitHub-Konto synchronisiert."
          ],
          remember: ["Bestehen = 100 % in einem Durchgang", "Bestanden bleibt dauerhaft gespeichert"]
        },
        {
          type: "slide",
          title: "Vier Fragetypen",
          body: [
            "Damit man nicht einfach raten kann, mischt ein Checkpoint verschiedene Fragetypen:",
            {
              list: [
                "**Freitext:** Antwort eintippen. Gross- und Kleinschreibung sowie Leerzeichen am Rand spielen keine Rolle.",
                "**Mehrfachauswahl:** Alle richtigen Optionen ankreuzen und alle falschen leer lassen.",
                "**Reihenfolge:** Begriffe antippen, bis die Reihenfolge stimmt. Ein Tipp auf einen gewählten Begriff nimmt ihn zurück.",
                "**Einfachauswahl:** Genau eine Antwort. Kommt nur ergänzend vor."
              ]
            }
          ],
          remember: "Freitext · Mehrfachauswahl · Reihenfolge · Einfachauswahl"
        },
        {
          type: "checkpoint",
          id: "cp-grundlagen",
          title: "Checkpoint: Grundlagen",
          questions: [
            {
              id: "prozent",
              type: "type",
              prompt: "Wie viel Prozent der Fragen musst du in einem Checkpoint richtig beantworten, damit er bestanden ist? (nur die Zahl)",
              placeholder: "Zahl eingeben",
              accept: ["100", "100%", "100 %", "hundert"],
              explanation: "Nur ein vollständig richtiger Durchgang zählt als bestanden."
            },
            {
              id: "aussagen",
              type: "multi",
              prompt: "Welche Aussagen über Checkpoints stimmen?",
              options: [
                "Ein bestandener Checkpoint bleibt auch nach dem Neuladen bestanden.",
                "Mit 80 % kommt man dank Teilpunkten trotzdem weiter.",
                "Nach einem Fehler wird angezeigt, was richtig gewesen wäre.",
                "Ein Checkpoint enthält typischerweise 3 bis 5 Fragen."
              ],
              correct: [0, 2, 3],
              explanation: "Teilpunkte gibt es nicht. Alles andere stimmt."
            },
            {
              id: "ablauf",
              type: "order",
              prompt: "Bringe den Ablauf im Lerncoach in die richtige Reihenfolge.",
              items: ["Fach auswählen", "Woche auswählen", "Folien durcharbeiten", "Checkpoint bestehen"],
              explanation: "Vom Groben zum Feinen: Fach, Woche, Erklärung, Prüfung."
            },
            {
              id: "multi-falsch",
              type: "single",
              prompt: "Du kreuzt bei einer Mehrfachauswahl alle richtigen Optionen und zusätzlich eine falsche an. Was passiert?",
              options: ["Die Frage zählt als richtig.", "Die Frage zählt als falsch.", "Es gibt Teilpunkte."],
              correct: 1,
              explanation: "Alle richtigen müssen angekreuzt UND alle falschen leer sein."
            }
          ]
        },
        {
          type: "slide",
          title: "Zwei Wege durch eine Woche",
          body: [
            "**Vorlesung starten** führt dich durch alle Folien und Checkpoints der Woche. Oben siehst du die Fortschrittspunkte: Rauten sind Checkpoints, Kreise sind Folien.",
            "**Nur Quiz** überspringt die Erklärungen und fragt die Checkpoints direkt hintereinander ab. Ideal zum Wiederholen vor einem Test. Auch dort bestandene Checkpoints zählen.",
            "Gesperrte Wochen öffnen sich, sobald du genug Checkpoints der Vorwoche bestanden hast. Wie viele es braucht, steht direkt auf der Kachel."
          ],
          remember: "Vorlesung = erklären und prüfen · Nur Quiz = schnell wiederholen"
        },
        {
          type: "checkpoint",
          id: "cp-wege",
          title: "Checkpoint: Wege und Sperren",
          questions: [
            {
              id: "nur-quiz",
              type: "type",
              prompt: "Wie heisst der Einstieg, der nur die Checkpoints einer Woche ohne Folien abfragt?",
              accept: ["Nur Quiz", "Nur Quiz machen"],
              explanation: "Der Button heisst \"Nur Quiz\"."
            },
            {
              id: "freischalten",
              type: "multi",
              prompt: "Wann kannst du eine Woche öffnen?",
              options: [
                "Wenn genug Checkpoints der Vorwoche bestanden sind.",
                "Wenn die Woche keine Punkt-Anforderung hat.",
                "Wenn du die Kachel dreimal antippst.",
                "Wenn die Woche den Status \"Noch keine Inhalte\" hat."
              ],
              correct: [0, 1],
              explanation: "Wochen ohne Inhalte lassen sich nicht öffnen, und Antippen allein schaltet nichts frei."
            },
            {
              id: "nach-fehler",
              type: "order",
              prompt: "Ordne die Schritte nach einem Fehler im Checkpoint.",
              items: ["Checkpoint prüfen", "Richtige Antworten ansehen", "Nochmal versuchen", "Alle Fragen richtig beantworten"],
              explanation: "Prüfen, aus dem Fehler lernen, neuer Durchgang, bestehen."
            }
          ]
        }
      ]
    },
    {
      id: "w2",
      number: 2,
      title: "Eigene Inhalte ergänzen",
      status: "locked",
      requiredPoints: 2,
      items: [
        {
          type: "slide",
          title: "Inhalte sind Daten",
          body: [
            "Jedes Fach ist eine eigene Datei unter `lerncoach/content/`. Darin stehen Wochen, Folien und Checkpoints als einfaches JavaScript-Objekt. Die Logik musst du dafür nie anfassen.",
            "Für eine neue Woche ergänzt du einen Eintrag in `weeks`. Für ein neues Fach legst du eine neue Datei an und trägst ihren Pfad in `lerncoach/manifest.js` ein.",
            {
              list: [
                "`soon`: Woche ist angekündigt, hat aber noch keine Inhalte.",
                "`ready`: Woche ist verfügbar, optional mit `requiredPoints` gesperrt.",
                "`locked`: Woche öffnet erst, wenn alle Checkpoints der Vorwoche bestanden sind (oder die mit `requiredPoints` angegebene Anzahl)."
              ]
            }
          ],
          remember: "Neue Woche = Daten ergänzen, keine Logik ändern"
        },
        {
          type: "checkpoint",
          id: "cp-daten",
          title: "Checkpoint: Datenmodell",
          questions: [
            {
              id: "manifest",
              type: "type",
              prompt: "In welcher Datei trägst du ein neues Fach ein, damit es geladen wird? (Dateiname)",
              accept: ["manifest.js", "lerncoach/manifest.js", "manifest"],
              explanation: "lerncoach/manifest.js listet alle Inhaltsdateien."
            },
            {
              id: "item-typen",
              type: "multi",
              prompt: "Welche Item-Typen kann eine Woche enthalten?",
              options: ["slide", "checkpoint", "video", "exam"],
              correct: [0, 1],
              explanation: "Es gibt genau zwei Item-Typen: slide und checkpoint."
            },
            {
              id: "ebenen",
              type: "order",
              prompt: "Ordne die Ebenen vom Grössten zum Kleinsten.",
              items: ["Fach", "Woche", "Checkpoint", "Frage"],
              explanation: "Ein Fach hat Wochen, eine Woche hat Checkpoints, ein Checkpoint hat Fragen."
            },
            {
              id: "status-soon",
              type: "type",
              prompt: "Welcher Wochen-Status bedeutet \"Noch keine Inhalte\"?",
              accept: ["soon"],
              explanation: "status: \"soon\""
            }
          ]
        }
      ]
    },
    {
      id: "w3",
      number: 3,
      title: "Deine erste eigene Woche",
      status: "soon"
    }
  ]
});
