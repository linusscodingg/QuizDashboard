/*
 * Lerncoach-Inhalte für Digital Health.
 * Woche 1: Lecture 01 Introduction to Digital Health.pdf, vollständig Folien 1–40 gelesen.
 *   A: Bedarf, Wirkungskette, Fehlerfolgen, Canvas und Einsatzentscheidung (4, 10–39)
 *      -> Fall-Reveals, cp-scope/workflow/care-data/evidence/system/transfer, W1-Quiz.
 *   B: Stakeholder und Wertdimensionen (13–15) -> Vergleich und cp-workflow.
 *   C: Kursorganisation (5–8), Studienzahlen -> Orientierung, keine Zahlenabfrage.
 *   Lab01_patient_data_to_decision_template.ipynb, besonders Abschnitte 8, 11–14:
 *      -> Beobachtungseinheit und Entscheidungszeit als Brücke zu Woche 2.
 * Woche 2: Lecture 02  Healthcare Data.pdf, vollständig Folien 1–36 gelesen.
 *   A: Datenentstehung, Semantik, Zeitfenster, Missingness, Proxy-Labels, Leakage (5–35)
 *      -> Tabellen/Rechnungen/Transfers, cp-care/semantics/longitudinal/quality/clock/reality.
 *   B: Modalitäten, Provenance, DICOM/PACS/FHIR (10–13, 22, 24–27)
 *      -> Strukturen und cp-semantics/labels-systems.
 *   C: Kursübersicht und einzelne Messzahlen -> Kontext, Zahlenverständnis statt Memorieren.
 *   Lab_02_Healthcare_Data_template.ipynb, Abschnitte 1–6:
 *      -> IDs, Nenner, Aggregation, 0–24-h-Features und Data Reality Check.
 * W1/W2: Folien visuell gelesen; Foliennummer = PDF-Seite. Exakte Belege je Schritt.
 * W1 Folie 21: zweiter Absatz ist als False negatives beschriftet, beschreibt aber
 * False Positives; anhand Definition und Grafik derselben Folie kenntlich berichtigt.
 * Eigene Fälle/Zahlen sind ausdrücklich markiert. Originaldateien bleiben ausserhalb des Repos.
 * Keine medizinischen Handlungsschwellen oder zusätzlichen Prüfungsregeln abgeleitet.
 *
 * Woche 3 aus: DHEAL/Lectures/03.digital-health.data-exploration_moodle.pdf
 *   (Lecture 03: Data Processing – Scaling, Visualisation, Sampling, Javier Montoya, HS 2026).
 *
 * Didaktische Gewichtung (bestimmt Tiefe, Visualisierung und Quizabdeckung):
 *   A, muss ich können   – Unit of Observation, die 5 Variablenfragen, EDA-Zyklus,
 *                          Min–Max-Scaling inkl. Rechnung, Plot-Zuordnung,
 *                          die 4 Sampling-Verfahren, Take-Home 05 und 06.
 *   B, sollte ich verstehen – die 5 Probleme der Case Study, Describe/Inspect/Prepare/Judge,
 *                          das Lesen von Histogram, Box plot, Scatter plot und Heatmap,
 *                          Target population / Sampling frame / Sample, Take-Home 01–04.
 *   C, nur einordnen     – f_w(x) = y, formale Datensatz-Notation, Spaltenbedeutungen
 *                          des Beispiel-Datensatzes, Course Overview.
 *
 * Woche 4 aus: DHEAL/Lectures/04_digital-health_regression_moodle.pdf
 *   (Lecture 04: Regression – Predicting Continuous Outcomes, Javier Montoya, HS 2026).
 *
 * Didaktische Gewichtung Woche 4:
 *   A, muss ich können   – Regression vs. Klassifikation, X / y / ŷ, Residual und sein Vorzeichen,
 *                          Gerade und Vorhersage (Steigung, Achsenabschnitt), MSE und Least squares,
 *                          Koeffizienten lesen (nicht kausal), MAE / RMSE / R², Residual plots,
 *                          Underfitting und Overfitting.
 *   B, sollte ich verstehen – Eröffnungsfall, Einheiten der Koeffizienten, die vier Muster der Residual plots,
 *                          die Wahl der Fehlermetrik spiegelt klinische Konsequenzen.
 *   C, nur einordnen     – Course Overview, konkrete Fallwerte, einzelne Streupunkte, formale Notation,
 *                          exakte Beispielzahlen, die Überschriften der Folien 43–44.
 *
 * W3/W4: Tabellen und Diagramme sind eigene Nachbauten mit den Zahlen der Folien.
 * Folienbilder werden bewusst nicht kopiert.
 * Erklärungen und Checkpoints auf Deutsch, englische Fachbegriffe bleiben erhalten.
 */
Lerncoach.registerSubject({
  id: "DHEAL",
  name: "Digital Health",
  description: "Healthcare data, systems and clinical AI",
  accent: "#237274",
  weeks: [
    {
      "id": "w1",
      "number": 1,
      "title": "Introduction: Vom Patienten zur klinischen Wirkung",
      "status": "ready",
      "items": [
        {
          "type": "slide",
          "title": "Die Leitfrage: Was verbessert sich für wen?",
          "body": [
            "Ein digitales System kann sehr genaue Vorhersagen liefern und trotzdem wenig im Versorgungsalltag verändern. Diese Woche verfolgt deshalb die ganze Wirkungskette: vom klinischen Problem über Daten und Entscheidungen bis zur Handlung und ihrem Ergebnis.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Problem",
                    "text": "Welche Versorgungslücke besteht?"
                  },
                  {
                    "title": "System im Workflow",
                    "text": "Wer erhält wann welche Information?"
                  },
                  {
                    "title": "Wirkung",
                    "text": "Welche Handlung und welches Ergebnis ändern sich?"
                  }
                ]
              }
            },
            {
              "reveal": {
                "question": "Eigener Einstieg: Ein Modell erkennt ein Risiko, aber niemand erhält die Meldung. Welches Glied der Wirkungskette fehlt?",
                "answer": "Die Information erreicht keine zuständige Person und löst keine Entscheidung oder Handlung aus. Modellleistung allein schliesst diese Lücke nicht.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 4, 10, 38–39"
          ],
          "remember": "Beginne mit dem Versorgungsproblem und dem vorgesehenen Einsatz."
        },
        {
          "type": "slide",
          "title": "Kursrahmen und Lernprioritäten",
          "body": [
            "Die Lernziele verlangen, Digital Health abzugrenzen, Beteiligte und Workflow zu benennen, Fehlerfolgen zu erklären und den Einsatz eines Systems anhand von Evidenz zu beurteilen. Deshalb übst du hier begründete Entscheidungen statt nur Begriffe.",
            {
              "table": {
                "head": [
                  "Angabe auf Folie 8",
                  "Gewicht / Format"
                ],
                "rows": [
                  [
                    "Labs / Jupyter Notebooks",
                    "30 %"
                  ],
                  [
                    "Semesterprojekt",
                    "40 %"
                  ],
                  [
                    "Individuelle mündliche Prüfung",
                    "30 %; 20 Minuten: Fallstudie und Vorlesungsthema"
                  ]
                ],
                "caption": "Stand der bereitgestellten Einführungsfolien; spätere Kursmitteilungen können Angaben ändern."
              }
            },
            "Moodle enthält Folien, Notebooks, Datensätze und Ankündigungen. Die Kursübersicht ordnet später Datenaufbereitung, Lernverfahren, Evaluation und Integration ein. Organisatorische Details sind hier Orientierung, kein Auswendiglernziel.",
            "Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 4–8"
          ],
          "remember": "Verständnis zeigt sich daran, dass du technische und klinische Aspekte verbinden kannst."
        },
        {
          "type": "slide",
          "title": "Digital Health, Health IT und Medical AI",
          "body": [
            "Digital Health ist der Oberbegriff für digitale Technologien zur Unterstützung von Gesundheit und Versorgung. Dazu gehören auch Fernversorgung, Patientenportale, Wearables und Infrastruktur wie Austausch, Sicherheit und Governance.",
            {
              "cards": [
                {
                  "title": "Health IT",
                  "text": "Information erfassen, speichern, austauschen und wiederfinden; etwa EHR, Labor- oder Bildsysteme."
                },
                {
                  "title": "Digitale Versorgung",
                  "text": "Digital unterstützen, etwa durch Kommunikation, Monitoring, Koordination oder Behandlung."
                },
                {
                  "title": "Medical AI",
                  "text": "Aus Daten etwas ableiten: vorhersagen, klassifizieren, generieren oder empfehlen."
                }
              ]
            },
            {
              "reveal": {
                "question": "Eigenes Beispiel: Ein vollständig digitales Spital verwendet kein lernendes Modell. Ist das ein Widerspruch?",
                "answer": "Nein. Digitale Infrastruktur und digitale Versorgung benötigen nicht zwingend AI. Umgekehrt garantiert ein gutes AI-Modell noch keine nützliche Versorgungslösung.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 10–11"
          ],
          "remember": "Digital Health ist breiter als Medical AI."
        },
        {
          "type": "checkpoint",
          "id": "cp-scope",
          "title": "Checkpoint: Ausgangspunkt und Begriffe",
          "questions": [
            {
              "id": "start",
              "type": "single",
              "prompt": "Ein Team möchte AI einsetzen. Welche erste Frage entspricht der Vorlesung?",
              "options": [
                "Welches Modell hat die meisten Parameter?",
                "Welches Versorgungsproblem betrifft welche Menschen?",
                "Welche GPU ist am schnellsten?"
              ],
              "correct": 1,
              "explanation": "Das klinische Problem bestimmt den sinnvollen Technologieeinsatz. Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 4, 10–11"
            },
            {
              "id": "scope",
              "type": "multi",
              "prompt": "Welche Aussagen stimmen?",
              "options": [
                "Ein Patientenportal kann zu Digital Health gehören.",
                "Health IT setzt immer AI voraus.",
                "Medical AI leitet Informationen aus Daten ab.",
                "Ein gutes Modell garantiert klinischen Nutzen."
              ],
              "correct": [
                0,
                2
              ],
              "explanation": "Digital Health umfasst mehr als AI; Nutzen muss im klinischen System entstehen. Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 4, 10–11"
            },
            {
              "id": "it",
              "type": "type",
              "prompt": "Welche zweibuchstabige Abkürzung ergänzt den Vorlesungsbegriff „Health …“ für Informationsinfrastruktur?",
              "accept": [
                "IT",
                "Information Technology",
                "Informationstechnologie"
              ],
              "explanation": "Health IT bezeichnet hier die Informationsinfrastruktur. Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 4, 10–11"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Ein System, mehrere Beteiligte",
          "body": [
            "Patientinnen und Patienten, klinisches Personal, Spitäler, Kostenträger, Aufsicht und Entwicklung betrachten dasselbe System aus unterschiedlichen Perspektiven. Ein Vorteil für eine Gruppe kann mit Aufwand oder Risiken für eine andere verbunden sein.",
            {
              "table": {
                "head": [
                  "Perspektive",
                  "Typische Frage"
                ],
                "rows": [
                  [
                    "Patient",
                    "Verbessert sich meine Versorgung oder Erfahrung?"
                  ],
                  [
                    "Klinisches Personal",
                    "Hilft die Information bei einer Entscheidung?"
                  ],
                  [
                    "Spital",
                    "Verbessern sich Qualität, Kapazität und Abläufe?"
                  ],
                  [
                    "Kostenträger",
                    "Rechtfertigt der Nutzen die eingesetzten Mittel?"
                  ],
                  [
                    "Entwicklung",
                    "Lässt sich das System zuverlässig betreiben und verbessern?"
                  ]
                ],
                "caption": "In eigenen Worten nach der Stakeholder-Darstellung"
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Die Spitalleitung spart Zeit, die Patienten müssen aber deutlich mehr Eingaben machen. Genügt „effizienter“ als Nutzenbegründung?",
                "answer": "Nein. Die Perspektive und die verteilten Belastungen müssen sichtbar sein. Eine Prozessverbesserung ist nicht automatisch ein Vorteil für alle Beteiligten.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 13"
          ],
          "remember": "Nutzen immer einer betroffenen Gruppe und einem konkreten Ziel zuordnen."
        },
        {
          "type": "slide",
          "title": "Vier Dimensionen von Wert",
          "body": [
            {
              "cards": [
                {
                  "title": "Patient Value",
                  "text": "Ergebnis, Erfahrung und Belastung aus Patientensicht."
                },
                {
                  "title": "Clinical Value",
                  "text": "Sicherere Entscheidungen, frühere Erkennung, weniger vermeidbare Fehler."
                },
                {
                  "title": "Operational Value",
                  "text": "Wartezeiten, Kapazität und reibungsarme Abläufe."
                },
                {
                  "title": "Economic Value",
                  "text": "Ressourcen wirksam einsetzen und den Betrieb tragfähig gestalten."
                }
              ]
            },
            "Das Frühwarnbeispiel der Folien verbindet frühere Erkennung mit mehr Alarmen und mehr Arbeitslast. Diese Effekte können gleichzeitig auftreten.",
            {
              "reveal": {
                "question": "Eigener Transfer: Mehr Warnungen werden als Erfolg gemeldet. Welche ergänzende Frage stellst du?",
                "answer": "Welche Warnungen führen zu sinnvollen Handlungen und besseren Ergebnissen, und welchen zusätzlichen Aufwand beziehungsweise Schaden verursachen sie? Die Zahl der Meldungen allein reicht nicht.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 14–15"
          ],
          "remember": "Ein Nutzenargument muss auch Zielkonflikte erklären."
        },
        {
          "type": "slide",
          "title": "Den Workflow als Wirkungskette lesen",
          "body": [
            {
              "flow": {
                "steps": [
                  {
                    "title": "Patient",
                    "text": "Ein klinisches Anliegen entsteht."
                  },
                  {
                    "title": "Data",
                    "text": "Information wird erhoben."
                  },
                  {
                    "title": "Interpretation",
                    "text": "Die Information bekommt Bedeutung."
                  },
                  {
                    "title": "Decision",
                    "text": "Ein Vorgehen wird gewählt."
                  },
                  {
                    "title": "Action",
                    "text": "Das Vorgehen wird umgesetzt."
                  },
                  {
                    "title": "Outcome",
                    "text": "Die Wirkung wird beobachtet."
                  }
                ]
              }
            },
            "Ein Sensor kann die Datenerhebung unterstützen, Bildanalyse die Interpretation, Entscheidungshilfe die Auswahl eines Vorgehens und Fernnachsorge die spätere Beobachtung. Der Einbauort bestimmt, wer die Ausgabe benötigt.",
            {
              "reveal": {
                "question": "Eigener Mini-Fall: „Risiko erhöht“ erscheint auf einem Bildschirm. Ist das bereits eine Handlung?",
                "answer": "Nein. Das ist eine Information beziehungsweise Systemausgabe. Erst eine zuständige Person oder ein definierter Prozess entscheidet, was daraus folgt, und setzt eine Handlung um.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 17–18"
          ],
          "remember": "Ausgabe, Entscheidung, Handlung und Ergebnis getrennt benennen."
        },
        {
          "type": "checkpoint",
          "id": "cp-workflow",
          "title": "Checkpoint: Wert und Workflow",
          "questions": [
            {
              "id": "chain",
              "type": "order",
              "prompt": "Ordne die Wirkungskette der Folien.",
              "items": [
                "Patient",
                "Data",
                "Interpretation",
                "Decision",
                "Action",
                "Outcome"
              ],
              "explanation": "Die Wirkung wird erst nach der Auswahl und Umsetzung eines Vorgehens beobachtet. Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 13–18"
            },
            {
              "id": "operational",
              "type": "single",
              "prompt": "Ein Terminportal verkürzt die Wartezeit. Welche Wertdimension wird damit unmittelbar beschrieben?",
              "options": [
                "Operational Value",
                "Ausschliesslich Modellgenauigkeit",
                "Automatisch ein besseres Krankheitsoutcome"
              ],
              "correct": 0,
              "explanation": "Wartezeit gehört zur operativen Dimension; weitere Wirkungen benötigen eigene Evidenz. Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 13–18"
            },
            {
              "id": "tradeoff",
              "type": "multi",
              "prompt": "Ein Frühwarnsystem erkennt früher, erzeugt aber viel Zusatzarbeit. Was gehört in die Bewertung?",
              "options": [
                "Der mögliche Nutzen früherer Erkennung",
                "Arbeitslast für das Personal",
                "Nur die Zahl erzeugter Alarme",
                "Mögliche Belastungen durch unnötige Folgeaktionen"
              ],
              "correct": [
                0,
                1,
                3
              ],
              "explanation": "Ein vollständiges Nutzenbild berücksichtigt unterschiedliche Perspektiven und Folgen. Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 13–18"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Warum ein Benchmark nicht das ganze System abbildet",
          "body": [
            "Die Vorlesung nennt sechs Besonderheiten: Fehlerfolgen, unsichere Ground Truth, versorgungsabhängige Datenerhebung, Unterschiede zwischen Einsatzorten, menschliches Verhalten und zusätzliche Evidenzanforderungen.",
            {
              "cards": [
                {
                  "title": "Daten und Wahrheit",
                  "text": "Welche Situation zeigen die Daten, und wie wurde das Label bestimmt?"
                },
                {
                  "title": "Menschen und Setting",
                  "text": "Wer nutzt die Ausgabe, und was ändert sich an einem anderen Standort?"
                },
                {
                  "title": "Folgen und Evidenz",
                  "text": "Welche Wirkung haben Fehler und richtige Hinweise im tatsächlichen Ablauf?"
                }
              ]
            },
            "Die folgenden Folien machen aus diesen Stichwörtern konkrete Fragen, mit denen du ein System beurteilen kannst.",
            "Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 20"
          ],
          "remember": "Hohe Testgenauigkeit beantwortet nur einen Teil der Systemfragen."
        },
        {
          "type": "slide",
          "title": "False Negative und False Positive: unterschiedliche Folgen",
          "body": [
            {
              "table": {
                "head": [
                  "Fehler",
                  "Situation",
                  "Mögliche Folge im Screening-Beispiel"
                ],
                "rows": [
                  [
                    "False Negative (FN)",
                    "Erkrankung vorhanden, vom System übersehen",
                    "Notwendige Abklärung oder Versorgung verzögert sich."
                  ],
                  [
                    "False Positive (FP)",
                    "Alarm, obwohl Erkrankung nicht vorhanden",
                    "Unnötige Abklärung, Belastung oder Eingriffe können folgen."
                  ]
                ],
                "caption": "Begriffe und mögliche Folgen aus der Vorlesung"
              }
            },
            {
              "callout": {
                "tone": "warn",
                "title": "Beschriftung der Originalfolie",
                "text": "Der zweite Absatz auf Folie 21 trägt nochmals „False negatives“. Seine Beschreibung (Alarm bei abwesender Erkrankung), der Einleitungstext und das FP-Diagramm zeigen: Dort sind False Positives gemeint."
              }
            },
            {
              "reveal": {
                "question": "Warum ist „beide sind ein Fehler“ für eine Nutzenbewertung zu wenig?",
                "answer": "Die Folgen unterscheiden sich. Eine gleiche Anzahl Fehler kann je nach Art und Einsatz sehr unterschiedliche Belastungen verursachen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 21"
          ],
          "remember": "Fehler nicht nur zählen, sondern ihre Folgen im Workflow erklären."
        },
        {
          "type": "slide",
          "title": "Ground Truth ist eine begründete Referenz",
          "body": [
            "Diagnosen können sich mit zusätzlichen Untersuchungen und dem Verlauf ändern. Fachpersonen können dieselbe Aufnahme unterschiedlich beurteilen. Ein Label ist deshalb nicht immer die unmittelbare Messung einer unstrittigen Wahrheit.",
            {
              "compare": {
                "left": {
                  "title": "Frühe Bildbeurteilung",
                  "points": [
                    "Bezieht sich auf die damals sichtbare Evidenz",
                    "Kann unsicher sein oder zwischen Personen variieren"
                  ]
                },
                "right": {
                  "title": "Spätere klinische Diagnose",
                  "points": [
                    "Nutzt gegebenenfalls Verlauf und weitere Tests",
                    "Beantwortet eine anders abgegrenzte Referenzfrage"
                  ]
                }
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Zwei Fachpersonen vergeben unterschiedliche Labels. Darfst du ohne weitere Prüfung eine davon als Datenfehler löschen?",
                "answer": "Nein. Zuerst Definition, Zeitpunkt, verfügbare Evidenz und Referenzverfahren klären. Uneinigkeit kann echte Unsicherheit der Beurteilung darstellen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 22"
          ],
          "remember": "Benennen, was das Referenzlabel bedeutet und wann es entstanden ist."
        },
        {
          "type": "slide",
          "title": "Daten spiegeln den Versorgungsprozess",
          "body": [
            "Messungen entstehen aus Symptomen, Verdacht, Abläufen und Zugang zur Versorgung. Sie erfolgen deshalb nicht zwingend regelmässig. Auch das Fehlen einer Messung kann etwas über den Prozess verraten. Missingness bezeichnet das Fehlen von Werten.",
            {
              "reveal": {
                "question": "Eigener Fall: Bei einem Patienten wurde ein Laborwert wegen eines Verdachts erhoben, bei einem anderen nicht. Bedeutet der fehlende Wert automatisch „gesund“?",
                "answer": "Nein. Die fehlende Messung zeigt zunächst nur, dass im betrachteten Datenbestand kein Wert vorliegt. Eine klinische Entscheidung kann ein Grund sein; andere Gründe müssen ebenfalls geprüft werden.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "callout": {
                "tone": "tip",
                "title": "Verbindung zu Woche 2",
                "text": "Dort trennst du genauer: nicht angeordnet, nicht durchgeführt, anderswo dokumentiert oder technisch nicht verfügbar."
              }
            },
            "Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 23"
          ],
          "remember": "Ein Datensatz beschreibt auch, wie Versorgung organisiert war."
        },
        {
          "type": "checkpoint",
          "id": "cp-care-data",
          "title": "Checkpoint: Fehler und Datenentstehung",
          "questions": [
            {
              "id": "fp",
              "type": "single",
              "prompt": "Eigener Screening-Fall: Das System meldet eine Erkrankung, die nach der festgelegten Referenz nicht vorliegt. Wie heisst dieser Fehler?",
              "options": [
                "False Negative",
                "False Positive",
                "True Positive"
              ],
              "correct": 1,
              "explanation": "Ein positiver Befund ohne Erkrankung gemäss Referenz ist falsch positiv. Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 20–23"
            },
            {
              "id": "truth",
              "type": "multi",
              "prompt": "Welche Gründe können unterschiedliche Referenzlabels erklären?",
              "options": [
                "Ein späterer Diagnosezeitpunkt",
                "Zusätzliche Untersuchungen",
                "Abweichende Falldefinitionen",
                "Nur ein sicherer Programmierfehler"
              ],
              "correct": [
                0,
                1,
                2
              ],
              "explanation": "Ground Truth hängt von Definition, Zeitpunkt und Evidenz ab; Uneinigkeit ist nicht automatisch ein technischer Fehler. Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 20–23"
            },
            {
              "id": "missing",
              "type": "type",
              "prompt": "Wie lautet der englische Begriff für das Fehlen von Werten als Dateneigenschaft?",
              "accept": [
                "missingness",
                "informative missingness",
                "missing data"
              ],
              "explanation": "Missingness kann Informationen über die Datenerhebung enthalten, ohne den Grund im Einzelfall zu beweisen. Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 20–23"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Distribution Shift: Die Umgebung verändert sich",
          "body": [
            "Ein unverändertes Modell kann in einem anderen Spital auf andere Populationen, Häufigkeiten, Geräte, Aufnahmeprotokolle oder Arbeitsweisen treffen. Gute Ergebnisse am Entwicklungsort übertragen sich daher nicht automatisch.",
            {
              "table": {
                "head": [
                  "Eigener Standortwechsel",
                  "Zu untersuchende Änderung"
                ],
                "rows": [
                  [
                    "Anderer Scanner",
                    "Bildaufnahme und Darstellung"
                  ],
                  [
                    "Andere Patientengruppe",
                    "Zusammensetzung und klinische Situationen"
                  ],
                  [
                    "Andere Arbeitsabläufe",
                    "Mess- und Dokumentationsmuster"
                  ]
                ],
                "caption": "Eigene Beispiele zu den Kategorien der Folie"
              }
            },
            {
              "reveal": {
                "question": "Ein Modell ist technisch exakt gleich geblieben. Kann sich seine Leistung trotzdem ändern?",
                "answer": "Ja. Die Datenverteilung und der Einsatzkontext können sich ändern. Genau das ist der zentrale Punkt des Standortbeispiels.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 24"
          ],
          "remember": "Unveränderte Software bedeutet nicht unveränderte Einsatzbedingungen."
        },
        {
          "type": "slide",
          "title": "Mensch und Modell bilden das eingesetzte System",
          "body": [
            "Fachpersonen können eine Ausgabe akzeptieren, prüfen, ignorieren oder ihr zu stark vertrauen. Eine richtige Empfehlung kann helfen; eine falsche kann auch eine vorher richtige Einschätzung verschlechtern.",
            {
              "callout": {
                "tone": "def",
                "title": "Automation Bias",
                "text": "Übermässiges Vertrauen in automatisierte Hinweise kann dazu führen, dass eine falsche Empfehlung die eigene richtige Einschätzung verdrängt."
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Nach Einführung einer AI ändern sich Entscheidungen, obwohl das Modell dieselben Kennzahlen wie im Test erreicht. Was fehlt einer reinen Modellbewertung?",
                "answer": "Wie die Nutzenden Hinweise verstehen und darauf reagieren. Das Zusammenspiel kann den Nutzen oder Schaden des gesamten Systems verändern.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 25"
          ],
          "remember": "Modellleistung und Leistung des Mensch-System-Verbunds getrennt untersuchen."
        },
        {
          "type": "slide",
          "title": "Evidenz: Was verbessert sich tatsächlich?",
          "body": [
            "Ein korrektes Resultat beweist noch nicht, dass sich Versorgung verbessert. Die Vorlesung unterscheidet technische Leistung, Einbindung in Abläufe und Auswirkungen auf Entscheidungen, Prozesse oder Patienten.",
            {
              "compare": {
                "left": {
                  "title": "Technischer Nachweis",
                  "points": [
                    "Vergleich der Ausgaben mit einer definierten Referenz"
                  ]
                },
                "right": {
                  "title": "Nachweis im Einsatz",
                  "points": [
                    "Nutzbarkeit im Workflow",
                    "Sinnvolle veränderte Entscheidungen und Handlungen",
                    "Nutzen, Belastungen und Schäden"
                  ]
                }
              }
            },
            {
              "reveal": {
                "question": "Eigener Transfer: In einer Untersuchung wird die Dokumentation besser, aber ein patientenbezogenes Ergebnis ist nicht verbessert. Was darfst du berichten?",
                "answer": "Die nachgewiesene Prozessverbesserung. Ein zusätzlicher Nutzen für das Patientenoutcome ist damit noch nicht gezeigt. Unterschiedliche Endpunkte nicht gleichsetzen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 26, 38–39"
          ],
          "remember": "Nur die Wirkung behaupten, für die tatsächlich Evidenz vorliegt."
        },
        {
          "type": "checkpoint",
          "id": "cp-evidence",
          "title": "Checkpoint: Übertragbarkeit und Nutzung",
          "questions": [
            {
              "id": "shift",
              "type": "multi",
              "prompt": "Was kann bei unverändertem Modell zu Distribution Shift beitragen?",
              "options": [
                "Andere Patientenzusammensetzung",
                "Anderes Aufnahmeprotokoll",
                "Andere klinische Dokumentation",
                "Nur eine Änderung der Modellgewichte"
              ],
              "correct": [
                0,
                1,
                2
              ],
              "explanation": "Änderungen der Datenentstehung reichen aus; Modellgewichte müssen sich nicht ändern. Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 24–26"
            },
            {
              "id": "bias",
              "type": "type",
              "prompt": "Wie heisst das übermässige Vertrauen in automatische Hinweise?",
              "accept": [
                "Automation Bias",
                "Automationsbias",
                "Automatisierungsbias",
                "Automatisierungs-Bias"
              ],
              "explanation": "Ein automatischer Hinweis kann dadurch selbst eine richtige Einschätzung verdrängen. Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 24–26"
            },
            {
              "id": "benefit",
              "type": "single",
              "prompt": "Ein Modell erreicht hohe Genauigkeit im Testdatensatz. Welche Aussage ist begründet?",
              "options": [
                "Damit ist jeder klinische Einsatz nützlich.",
                "Die gemessene Modellleistung ist ein Baustein; Nutzen im Workflow braucht weitere Evidenz.",
                "Menschen spielen im Einsatz keine Rolle mehr."
              ],
              "correct": 1,
              "explanation": "Genauigkeit allein belegt weder Integration noch einen positiven Versorgungseffekt. Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 24–26"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Clinical AI System Canvas: zehn Fragen",
          "body": [
            "Der Canvas strukturiert das System, bevor der Algorithmus diskutiert wird. Die Fragen verbinden Bedarf, Einbauort, verfügbare Information und Konsequenzen.",
            {
              "table": {
                "head": [
                  "Bereich",
                  "Fragen in eigenen Worten"
                ],
                "rows": [
                  [
                    "Clinical Need",
                    "Welches Problem? Für welche Population?"
                  ],
                  [
                    "Clinical Context",
                    "Wer nutzt die Ausgabe? Wo im Workflow?"
                  ],
                  [
                    "System",
                    "Welche Daten liegen dort vor? Welche Ausgabe entsteht?"
                  ],
                  [
                    "Consequence",
                    "Welche Entscheidung? Welche Handlung? Welcher erwartete Nutzen? Welcher wichtigste Fehlerfall?"
                  ]
                ],
                "caption": "Vier Bereiche, insgesamt zehn Fragen"
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: „Wir liefern einen Risikoscore.“ Welche Angaben fehlen damit noch?",
                "answer": "Mindestens Problem, Population, Nutzende, Zeitpunkt im Ablauf, verfügbare Daten, beeinflusste Entscheidung, anschliessende Handlung, erwarteter Nutzen und Fehlerfolgen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 28, 30"
          ],
          "remember": "Eine Systembeschreibung geht über den Output hinaus."
        },
        {
          "type": "slide",
          "title": "Vorlesungsfall: autonomes Retinopathie-Screening",
          "body": [
            "Im vorgestellten Fall werden bei einem regulären Primärversorgungsbesuch Netzhautbilder aufgenommen. Das System prüft ihre Qualität und beurteilt, ob mehr als milde diabetische Retinopathie erkannt wird. Das Ergebnis soll Personen für weitere Abklärung identifizieren.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Aufnahme",
                    "text": "Personal erstellt Netzhautbilder."
                  },
                  {
                    "title": "Qualitätsprüfung",
                    "text": "Reichen die Bilder für die Beurteilung?"
                  },
                  {
                    "title": "Autonome Beurteilung",
                    "text": "Systemausgabe zum Zielbefund."
                  },
                  {
                    "title": "Weiterer Versorgungsschritt",
                    "text": "Zuständigkeit und weitere Abklärung klären."
                  }
                ]
              }
            },
            {
              "callout": {
                "tone": "tip",
                "title": "Fallgrenze",
                "text": "Der letzte Schritt ist Teil der Systemanalyse. Ein positives Screeningresultat ist weder eine bereits ausgeführte Überweisung noch der Nachweis einer erfolgreichen Behandlung."
              }
            },
            "Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 29–30"
          ],
          "remember": "Auch eine autonome Beurteilung braucht einen funktionierenden nachgelagerten Prozess."
        },
        {
          "type": "slide",
          "title": "Usefulness Test: Vorher, Ausgabe, Nachher",
          "body": [
            {
              "table": {
                "head": [
                  "Frage",
                  "Anwendung auf den Vorlesungsfall"
                ],
                "rows": [
                  [
                    "Vorher",
                    "Was würde ohne den Hinweis geschehen?"
                  ],
                  [
                    "System Output",
                    "Welche neue relevante Information entsteht?"
                  ],
                  [
                    "Nachher",
                    "Welche Entscheidung und Handlung ändern sich dadurch?"
                  ]
                ],
                "caption": "Nützlichkeit anhand eines konkreten Ablaufs beurteilen"
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Ein auffälliges Screeningresultat wird korrekt erzeugt, aber keine Stelle übernimmt die Terminvermittlung. Wo ist die Evidenzkette unterbrochen?",
                "answer": "Zwischen der Information und einer tatsächlich ausgeführten Folgehandlung. Man kann nicht vom richtigen Befund direkt auf eine verbesserte Versorgung schliessen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 31–32"
          ],
          "remember": "Frage ausdrücklich nach der Handlung, die sich gegenüber dem bisherigen Ablauf verändert."
        },
        {
          "type": "slide",
          "title": "Fehlerpfad: Failure, Consequence, Recovery",
          "body": [
            "Gehe einen Fall Schritt für Schritt durch. Ein Fehler kann schon vor der Klassifikation entstehen oder erst nach einem richtigen Resultat auftreten.",
            {
              "table": {
                "head": [
                  "Eigener Fehlerfall",
                  "Mögliche Konsequenz",
                  "Zu prüfende Absicherung"
                ],
                "rows": [
                  [
                    "Unzureichende Bildqualität",
                    "Keine verlässliche Beurteilung möglich",
                    "Qualitätsfehler erkennen und definierten Ersatzweg vorsehen"
                  ],
                  [
                    "Falsches Ergebnis",
                    "Nötige Abklärung bleibt aus oder unnötige Abklärung folgt",
                    "Folgen und Umgang mit Fehlentscheidungen untersuchen"
                  ],
                  [
                    "Keine Folgehandlung",
                    "Die korrekte Meldung verändert die Versorgung nicht",
                    "Zuständigkeit und Nachverfolgung klären"
                  ]
                ],
                "caption": "Eigene begründete Vorschläge zur Analyseaufgabe, keine offizielle Musterlösung"
              }
            },
            {
              "reveal": {
                "question": "Warum hilft es nicht, nur den Fehlernamen aufzuschreiben?",
                "answer": "Eine Einsatzentscheidung braucht zusätzlich die Konsequenz für den Patienten und die Möglichkeit, den Fehler zu erkennen oder abzufangen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 33–34"
          ],
          "remember": "Fehler → Systemfolge → mögliche Versorgungsfolge → Absicherung."
        },
        {
          "type": "checkpoint",
          "id": "cp-system",
          "title": "Checkpoint: System statt Algorithmus",
          "questions": [
            {
              "id": "canvas",
              "type": "single",
              "prompt": "Welche Angabe beschreibt im Canvas primär den User?",
              "options": [
                "Die Person, die den Output sieht oder nutzt",
                "Die Modellarchitektur",
                "Nur der Patient, unabhängig vom Workflow"
              ],
              "correct": 0,
              "explanation": "Der User ist über den Umgang mit der Systemausgabe definiert. Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 28–34"
            },
            {
              "id": "screen",
              "type": "order",
              "prompt": "Ordne den vereinfachten Screeningpfad.",
              "items": [
                "Bilder aufnehmen",
                "Bildqualität prüfen",
                "Zielbefund beurteilen",
                "Geeignete Folgehandlung organisieren"
              ],
              "explanation": "Qualität, Beurteilung und anschliessende Handlung sind unterschiedliche Prozessschritte. Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 28–34"
            },
            {
              "id": "failure",
              "type": "multi",
              "prompt": "Welche Fragen gehören zur Fehlerpfadanalyse?",
              "options": [
                "Was kann schiefgehen?",
                "Was bedeutet das für die betroffene Person?",
                "Kann der Fehler erkannt oder korrigiert werden?",
                "Nur: Wie viele Modellparameter gibt es?"
              ],
              "correct": [
                0,
                1,
                2
              ],
              "explanation": "Die Analyse verbindet Failure, Consequence und Recovery. Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 28–34"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Deploy, Not yet oder Do not deploy?",
          "body": [
            {
              "cards": [
                {
                  "title": "Deploy",
                  "text": "Evidenz, Population und Einsatz sind ausreichend geklärt; Nutzen, Ablauf und Absicherungen tragen den Einsatz."
                },
                {
                  "title": "Not yet",
                  "text": "Der Anwendungsfall ist plausibel, aber wichtige Evidenz oder eine Absicherung fehlt noch."
                },
                {
                  "title": "Do not deploy",
                  "text": "Im vorgeschlagenen Einsatz überwiegen Probleme: etwa unvertretbarer Schaden, fehlende nützliche Handlung oder unpassende Population."
                }
              ]
            },
            "Eine begründete Empfehlung nennt die Entscheidung, den stärksten Grund und eine konkrete zusätzliche Erkenntnis oder Änderung, die die Entscheidung beeinflussen würde.",
            {
              "reveal": {
                "question": "Eigener Fall: Der Nutzen ist plausibel, aber lokale Leistung und Zuständigkeit bei Alarmen sind ungeklärt. Welche Empfehlung passt als begründeter Vorschlag?",
                "answer": "Not yet: Vor einem Einsatz die lokale Leistung und einen belastbaren Reaktionsprozess prüfen. Das ist eine Entscheidung unter den genannten Annahmen, kein Urteil über sämtliche möglichen Einsatzorte.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 35–36"
          ],
          "remember": "Entscheidung + stärkster Grund + Bedingung für ein Umdenken."
        },
        {
          "type": "slide",
          "title": "Lab-Brücke: Patient, Encounter und Entscheidungszeit",
          "body": [
            "Im MIMIC-IV-ED-Lab bezeichnet `subject_id` die Person und `stay_id` einen bestimmten Notfallaufenthalt. Ein Aufenthalt kann mehrere Vitalmessungen haben. Eine Messzeile ist deshalb nicht automatisch ein neuer Patient.",
            {
              "table": {
                "head": [
                  "Eigener Fall: Entscheidung zwei Stunden nach Ankunft",
                  "Als Input nutzbar?"
                ],
                "rows": [
                  [
                    "Messwert nach 30 Minuten, sofort verfügbar",
                    "Ja, sofern für die Aufgabe passend."
                  ],
                  [
                    "Messwert nach vier Stunden",
                    "Nein, liegt nach der Entscheidungszeit."
                  ],
                  [
                    "Später kodierte Abschlussdiagnose",
                    "Nicht als damals schon bekannter Input behandeln."
                  ]
                ],
                "caption": "Eigene Zeitbeispiele nach Lab-Abschnitt 8"
              }
            },
            {
              "reveal": {
                "question": "Das Lab verwendet eine einfache Regel, die Alarme erzeugt. Belegt das Zählen dieser Alarme einen klinischen Nutzen?",
                "answer": "Nein. Dafür fehlen unter anderem ein geeigneter Zielbezug, die Untersuchung von Fehlalarmen und übersehenen Fällen sowie die tatsächliche Reaktion im Workflow. Die Regel ist laut Notebook nur ein Lehrbeispiel und kein validierter klinischer Score.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lab01_patient_data_to_decision_template.ipynb, Abschnitte 1, 3–9, 12–14"
          ],
          "remember": "Was weiss das System zu diesem Zeitpunkt, und was geschieht mit seiner Ausgabe?"
        },
        {
          "type": "slide",
          "title": "Transfer: eine Einführungsempfehlung begründen",
          "body": [
            {
              "reveal": {
                "question": "Eigener Transfer: Ein digitales Nachsorgesystem meldet zuverlässig auffällige Verläufe. Es gibt aber keine Kapazität, die Meldungen zu bearbeiten. Formuliere Entscheidung, stärksten Grund und mögliche Änderung.",
                "answer": "Begründeter Vorschlag: Not yet. Die fehlende Bearbeitungskapazität unterbricht den Weg vom Hinweis zur Handlung. Neu beurteilen, wenn Zuständigkeit, Reaktionszeit und Kapazität geklärt und im passenden Setting geprüft sind.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "checklist": {
                "title": "Kann ich das erklären und anwenden?",
                "items": [
                  "Ich unterscheide Digital Health, Health IT und Medical AI.",
                  "Ich beschreibe Beteiligte, Nutzen und Zielkonflikte.",
                  "Ich trenne Ausgabe, Entscheidung, Handlung und Outcome.",
                  "Ich erkläre Fehlerfolgen, unsichere Labels, Shift und menschlichen Einfluss.",
                  "Ich nutze Canvas, Fehlerpfad und Evidenz für eine begründete Empfehlung."
                ]
              }
            },
            "Zusatzwissen: Kursorganisation und einzelne Studienbeispiele helfen bei der Orientierung. Die zentralen Lernziele liegen im Begründen und Übertragen, nicht im Auswendiglernen von Autorennamen oder Fallzahlen.",
            "Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 4, 28–39"
          ],
          "remember": "Die beste Begründung verbindet Bedarf, Daten, Workflow, Folgen und Evidenz."
        },
        {
          "type": "checkpoint",
          "id": "cp-transfer",
          "title": "Checkpoint: Einführung beurteilen",
          "questions": [
            {
              "id": "decision",
              "type": "type",
              "prompt": "Welche englische Zweiwort-Empfehlung bedeutet: plausibler Einsatz, aber wichtige Evidenz oder Absicherung fehlt noch?",
              "accept": [
                "Not yet",
                "not-yet",
                "noch nicht"
              ],
              "explanation": "Not yet beschreibt eine begründete vorläufige Zurückstellung. Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 35–39; Lab 01: Patient Data to Decision (Notebook), Abschnitte 8, 11–14"
            },
            {
              "id": "recommendation",
              "type": "multi",
              "prompt": "Welche Bestandteile verlangt die Empfehlung der Folie 36?",
              "options": [
                "Klare Entscheidung",
                "Stärkster Grund",
                "Was die Entscheidung ändern würde",
                "Garantie, dass nie ein Fehler auftritt"
              ],
              "correct": [
                0,
                1,
                2
              ],
              "explanation": "Eine begründete Empfehlung benennt Evidenz und verbleibende Unsicherheit. Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 35–39; Lab 01: Patient Data to Decision (Notebook), Abschnitte 8, 11–14"
            },
            {
              "id": "time",
              "type": "single",
              "prompt": "Eigener Lab-Fall: Das System soll zwei Stunden nach Ankunft entscheiden. Welche Information ist eindeutig zu spät?",
              "options": [
                "Ein bei Ankunft verfügbarer Wert",
                "Eine nach vier Stunden erstmals erhobene Messung",
                "Eine bei Minute 30 sofort dokumentierte Beobachtung"
              ],
              "correct": 1,
              "explanation": "Zukünftige Informationen dürfen eine frühere Entscheidung nicht nachträglich besser aussehen lassen. Quelle: Lecture 01 Introduction to Digital Health.pdf, Folien 35–39; Lab 01: Patient Data to Decision (Notebook), Abschnitte 8, 11–14"
            }
          ]
        }
      ]
    },
    {
      "id": "w2",
      "number": 2,
      "title": "Healthcare Data: From Clinical Care to AI-Ready Data",
      "status": "ready",
      "items": [
        {
          "type": "slide",
          "title": "Vom Versorgungsvorgang zum Datensatz",
          "body": [
            "Ein Patient erzeugt nicht von selbst eine fertige Tabellenzeile. Registrierung, Triage, Tests, Bildgebung, Behandlung und Entlassung erzeugen unterschiedliche Beobachtungen zu unterschiedlichen Zeitpunkten. Ein Analysedatensatz entsteht erst durch eine Auswahl für eine konkrete Frage.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Versorgung",
                    "text": "Beobachtungen und Entscheidungen im klinischen Alltag"
                  },
                  {
                    "title": "Dokumentation",
                    "text": "Verteilte Einträge mit unterschiedlichen Zeitpunkten"
                  },
                  {
                    "title": "Analysedatensatz",
                    "text": "Definierte Population, Beobachtungseinheit, Features und Zielgrösse"
                  }
                ]
              }
            },
            {
              "reveal": {
                "question": "Eigener Einstieg: „Wir exportieren einfach alles und trainieren.“ Welche Entscheidung steckt schon vor dem Training darin?",
                "answer": "Unter anderem, welche Personen und Ereignisse eingehen, was eine Zeile bedeutet, welche Zeitpunkte genutzt und welche Zielgrössen konstruiert werden.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 02  Healthcare Data.pdf, Folien 5–8"
          ],
          "remember": "Datensatzerstellung ist bereits eine Modellierungsentscheidung."
        },
        {
          "type": "slide",
          "title": "Wo die Informationen liegen",
          "body": [
            {
              "cards": [
                {
                  "title": "EHR / HIS",
                  "text": "Dokumentation und Organisation von Versorgung, etwa Kontakte, Diagnosen, Aufträge und Notizen."
                },
                {
                  "title": "LIS",
                  "text": "Laboranforderungen und Laborergebnisse im Laborinformationssystem."
                },
                {
                  "title": "RIS / PACS",
                  "text": "Radiologische Abläufe, Bilddaten und zugehörige Informationen."
                },
                {
                  "title": "Weitere Systeme",
                  "text": "Geräte, Monitoring und andere Anwendungen tragen zusätzliche Beobachtungen bei."
                }
              ]
            },
            "Die Beziehungen sind many-to-many: Ein Versorgungsvorgang kann mehrere Systeme berühren, und ein System unterstützt mehrere Vorgänge. Kein einzelner Export garantiert eine vollständige digitale Patientengeschichte.",
            {
              "reveal": {
                "question": "Eigener Fall: Im EHR-Export fehlt ein Befund, der im externen Labor vorliegt. Was darfst du daraus nicht schliessen?",
                "answer": "Dass die Untersuchung nie stattgefunden hat. Das Fehlen kann durch Systemgrenzen oder die Extraktion entstehen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 02  Healthcare Data.pdf, Folien 7–8, 24"
          ],
          "remember": "Frage nach relevanten Quellen und ihrer Verknüpfung."
        },
        {
          "type": "slide",
          "title": "Eine Zeile: Patient, Aufnahme oder Messung?",
          "body": [
            "Im Lab beschreibt `patients` Personen, `admissions` Spitalaufenthalte und `labs` einzelne Messungen. `subject_id` verbindet eine Person über Aufenthalte hinweg; `hadm_id` bezeichnet einen bestimmten Spitalaufenthalt.",
            {
              "table": {
                "head": [
                  "Person",
                  "Aufnahme",
                  "Messwert"
                ],
                "rows": [
                  [
                    "A",
                    "A1",
                    "10"
                  ],
                  [
                    "A",
                    "A1",
                    "14"
                  ],
                  [
                    "A",
                    "A2",
                    "12"
                  ],
                  [
                    "B",
                    "B1",
                    "16"
                  ]
                ],
                "caption": "Eigene illustrative Zeilen, keine Original-Patientendaten"
              }
            },
            {
              "reveal": {
                "question": "Wie viele Messzeilen, Aufnahmen und Personen zeigt die Tabelle?",
                "answer": "Vier Messzeilen, drei Aufnahmen und zwei Personen. Ein Join kann die Zeilen vervielfachen, ohne neue Personen zu erzeugen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "callout": {
                "tone": "warn",
                "title": "Beobachtungseinheit vor dem Zählen",
                "text": "Zeilenzahl ist nicht automatisch Patientenzahl. Wiederholte Aufnahmen derselben Person sind zudem für eine spätere Trennung von Trainings- und Testdaten relevant."
              }
            },
            "Quelle: Lecture 02  Healthcare Data.pdf, Folien 7, 12, 27; Lab_02_Healthcare_Data_template.ipynb, Abschnitte 1–2"
          ],
          "remember": "Erst die Bedeutung einer Zeile definieren, dann zählen und zusammenführen."
        },
        {
          "type": "checkpoint",
          "id": "cp-care",
          "title": "Checkpoint: Von Versorgung zu Daten",
          "questions": [
            {
              "id": "unit",
              "type": "single",
              "prompt": "Eigene Tabelle: Person A hat zwei Aufnahmen mit je drei Labormessungen. Wie viele Personen sind das?",
              "options": [
                "Sechs",
                "Zwei",
                "Eine"
              ],
              "correct": 2,
              "explanation": "Mehrere Ereignisse und Aufnahmen können derselben Person gehören. Quelle: Lecture 02  Healthcare Data.pdf, Folien 7–8, 27; Lab_02_Healthcare_Data_template.ipynb, Abschnitte 1–2"
            },
            {
              "id": "systems",
              "type": "multi",
              "prompt": "Welche Aussagen stimmen?",
              "options": [
                "Daten entstehen zu verschiedenen Zeitpunkten.",
                "Alle Systeme enthalten zwangsläufig dieselbe vollständige Akte.",
                "Eine Analysezeile wird für eine bestimmte Fragestellung konstruiert.",
                "Ein Join kann die Anzahl Zeilen verändern."
              ],
              "correct": [
                0,
                2,
                3
              ],
              "explanation": "Verteilte Daten und unterschiedliche Beobachtungseinheiten verlangen explizite Konstruktionsregeln. Quelle: Lecture 02  Healthcare Data.pdf, Folien 7–8, 27; Lab_02_Healthcare_Data_template.ipynb, Abschnitte 1–2"
            },
            {
              "id": "admission-id",
              "type": "type",
              "prompt": "Welcher Schlüssel bezeichnet im Lab 02 einen Spitalaufenthalt: subject_id oder hadm_id?",
              "accept": [
                "hadm_id",
                "hadm id",
                "HADM-ID"
              ],
              "explanation": "subject_id steht für die Person, hadm_id für eine bestimmte Aufnahme. Quelle: Lecture 02  Healthcare Data.pdf, Folien 7–8, 27; Lab_02_Healthcare_Data_template.ipynb, Abschnitte 1–2"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Modalitäten haben unterschiedliche Strukturen",
          "body": [
            "Tabellarische Angaben, Text, Bilder, Signale, Omics und Wearables erfassen verschiedene Aspekte derselben Person. Mehr Modalitäten liefern nicht automatisch mehr nützliche Information: Frage, Qualität, Zeitpunkt und Kombination sind entscheidend.",
            {
              "table": {
                "head": [
                  "Modalität",
                  "Struktur",
                  "Was Bedeutung trägt"
                ],
                "rows": [
                  [
                    "Klinischer Text",
                    "Wort- oder Tokenfolge",
                    "Kontext, Verneinung und Zeitbezug"
                  ],
                  [
                    "CT im Folienbeispiel",
                    "Räumliches Volumen und Metadaten",
                    "Anatomie, Intensität und Aufnahmeparameter"
                  ],
                  [
                    "ECG",
                    "Messfolge über die Zeit",
                    "Wellenform, Rhythmus und zeitliche Dynamik"
                  ],
                  [
                    "Tabellarische Messung",
                    "Wert mit definierten Feldern",
                    "Variable, Einheit, Zeitpunkt und Kontext"
                  ]
                ],
                "caption": "Strukturen in eigenen Worten; nicht jede Bildmodalität ist ein 3D-Volumen"
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Ein Text enthält „kein Fieber“. Warum genügt das Auftreten des Wortes „Fieber“ nicht für ein positives Label?",
                "answer": "Die Verneinung verändert die Bedeutung. Die natürliche Struktur des Textes darf nicht ignoriert werden.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 02  Healthcare Data.pdf, Folien 10, 13"
          ],
          "remember": "Die Repräsentation muss zur Informationsstruktur passen."
        },
        {
          "type": "slide",
          "title": "Spaltennamen sind noch keine Definitionen",
          "body": [
            {
              "table": {
                "head": [
                  "Spaltenname",
                  "Offene Bedeutungsfrage"
                ],
                "rows": [
                  [
                    "Age",
                    "Bei Aufnahme oder später bestimmt?"
                  ],
                  [
                    "Weight",
                    "Gemessen oder geschätzt, in welcher Einheit und wann?"
                  ],
                  [
                    "Medication",
                    "Angeordnet, abgegeben oder tatsächlich verabreicht?"
                  ],
                  [
                    "Diagnosis",
                    "Verdacht oder Bestätigung, bei Aufnahme oder Entlassung?"
                  ]
                ],
                "caption": "Fragen nach Semantik, nicht nur nach Datentyp"
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Zwei Systeme haben beide eine Spalte „medication“. Darfst du die Werte ohne Prüfung gleich behandeln?",
                "answer": "Nein. Das eine könnte eine Verordnung, das andere eine dokumentierte Verabreichung abbilden. Gleicher Name bedeutet nicht gleiche klinische Bedeutung.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 02  Healthcare Data.pdf, Folien 11"
          ],
          "remember": "Bedeutung entsteht aus Definition, Zeitpunkt und Entstehungsprozess."
        },
        {
          "type": "slide",
          "title": "Metadaten und Provenance ergänzen den Wert",
          "body": [
            "„Glucose = 100“ ist ohne Einheit, Zeitpunkt und Kontext unvollständig. Provenance bedeutet hier die nachvollziehbare Herkunft und Verarbeitung der Information.",
            {
              "cards": [
                {
                  "title": "Who / Why",
                  "text": "Wer oder was erzeugte den Wert, und aus welchem Anlass?"
                },
                {
                  "title": "When / How",
                  "text": "Wann und wie wurde gemessen oder dokumentiert?"
                },
                {
                  "title": "Where / What afterwards",
                  "text": "Aus welchem System stammt er, und wie wurde er danach transformiert, gefiltert oder aggregiert?"
                }
              ]
            },
            {
              "reveal": {
                "question": "Eigener Fall: Zwei identische Zahlen stammen aus unterschiedlichen Einheiten und unterschiedlichen Messsituationen. Sind es dieselben Informationen?",
                "answer": "Nein. Gleiche numerische Darstellung kann verschiedene Messgrössen oder Situationen abbilden. Erst Einheit, Messverfahren, Zeitpunkt und Kontext erlauben eine sinnvolle Interpretation.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 02  Healthcare Data.pdf, Folien 18, 22"
          ],
          "remember": "Ein Wert ohne seine Metadaten ist nicht vollständig beschrieben."
        },
        {
          "type": "checkpoint",
          "id": "cp-semantics",
          "title": "Checkpoint: Struktur und Bedeutung",
          "questions": [
            {
              "id": "modalities",
              "type": "multi",
              "prompt": "Welche Zuordnungen passen?",
              "options": [
                "ECG: zeitliche Signalfolge",
                "Text: Bedeutung unter anderem durch Verneinung",
                "Jede medizinische Aufnahme: nur eine einzelne Zahl",
                "CT-Volumen: räumliche Struktur und Metadaten"
              ],
              "correct": [
                0,
                1,
                3
              ],
              "explanation": "Modalitäten enthalten Information in unterschiedlichen Strukturen. Quelle: Lecture 02  Healthcare Data.pdf, Folien 10–13, 18, 22"
            },
            {
              "id": "medication",
              "type": "single",
              "prompt": "Ein Feld enthält eine Medikamentenverordnung. Was ist damit allein noch nicht nachgewiesen?",
              "options": [
                "Dass etwas angeordnet wurde",
                "Dass die Gabe tatsächlich erfolgte",
                "Dass der Datensatz eine Information enthält"
              ],
              "correct": 1,
              "explanation": "Verordnung und Verabreichung sind verschiedene Ereignisse. Quelle: Lecture 02  Healthcare Data.pdf, Folien 10–13, 18, 22"
            },
            {
              "id": "provenance",
              "type": "type",
              "prompt": "Wie heisst die Herkunfts- und Verarbeitungsgeschichte von Daten als englischer Fachbegriff?",
              "accept": [
                "Provenance",
                "Data Provenance",
                "Datenprovenienz",
                "Provenienz"
              ],
              "explanation": "Provenance umfasst Erzeugung, Herkunft und nachfolgende Bearbeitung. Quelle: Lecture 02  Healthcare Data.pdf, Folien 10–13, 18, 22"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Der Patient verändert sich – und der Wissensstand auch",
          "body": [
            "Eine Patientengeschichte besteht aus Kontakten, Aufnahmen, Entlassung und weiteren Beobachtungen. Erkrankung, Behandlung und vorhandenes Wissen verändern sich. Messungen sind häufig unregelmässig und unvollständig.",
            {
              "compare": {
                "left": {
                  "title": "Patientenzustand",
                  "points": [
                    "Kann sich über die Zeit verändern"
                  ]
                },
                "right": {
                  "title": "Beobachtungsprozess",
                  "points": [
                    "Entscheidet, was wann sichtbar wird",
                    "Hängt von Verdacht, Protokollen, Setting und Ressourcen ab"
                  ]
                }
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Bei Person A wird zweimal, bei Person B sechsmal gemessen. Beweist das, dass B dreimal so krank ist?",
                "answer": "Nein. Krankheitsschwere ist eine mögliche Erklärung, aber auch Protokolle, klinischer Verdacht oder Arbeitsabläufe können die Messhäufigkeit beeinflussen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 02  Healthcare Data.pdf, Folien 15–16"
          ],
          "remember": "Messhäufigkeit ist ein Prozesssignal, keine eindeutige Diagnose."
        },
        {
          "type": "slide",
          "title": "Eine Messreihe, mehrere mögliche Features",
          "body": [
            {
              "table": {
                "head": [
                  "Uhrzeit",
                  "Kreatinin [µmol/L]"
                ],
                "rows": [
                  [
                    "08:14",
                    "105"
                  ],
                  [
                    "14:32",
                    "118"
                  ],
                  [
                    "21:17",
                    "127"
                  ],
                  [
                    "22:00",
                    "Prediction time"
                  ]
                ],
                "caption": "Werte aus Folie 12, Darstellung neu erstellt"
              }
            },
            {
              "reveal": {
                "question": "Bestimme ersten Wert, letzten Wert, Maximum, Mittelwert und Veränderung bis 22:00.",
                "answer": "Erster Wert 105; letzter Wert 127; Maximum 127; Mittelwert (105+118+127)/3 = 116,67, gerundet 117; Veränderung 127−105 = +22 µmol/L. Voraussetzung: Die verwendeten Werte sind bis 22:00 auch tatsächlich verfügbar.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Der Mittelwert beschreibt das Niveau im Fenster; der letzte Wert den letzten verfügbaren Stand. Die Veränderung beschreibt den Unterschied zwischen den gewählten Endpunkten. Gleiche Rohdaten können deshalb unterschiedliche Fragen beantworten.",
            "Quelle: Lecture 02  Healthcare Data.pdf, Folien 12"
          ],
          "remember": "Fenster und Aggregation gehören zur Definition eines Features."
        },
        {
          "type": "slide",
          "title": "Eigene Rechnung: erst das Zeitfenster, dann der Mittelwert",
          "body": [
            {
              "table": {
                "head": [
                  "Zeit nach Aufnahme",
                  "Illustrativer Messwert",
                  "Sofort verfügbar"
                ],
                "rows": [
                  [
                    "8 h",
                    "10",
                    "Ja"
                  ],
                  [
                    "20 h",
                    "14",
                    "Ja"
                  ],
                  [
                    "26 h",
                    "18",
                    "Ja"
                  ]
                ],
                "caption": "Eigene Zahlen ohne klinische Interpretation; Vorhersage bei 24 h"
              }
            },
            {
              "reveal": {
                "question": "Welchen Mittelwert darfst du für das abgeschlossene 0–24-h-Fenster bilden?",
                "answer": "(10+14)/2 = 12. Der Wert 18 aus Stunde 26 gehört nicht in ein Feature für Stunde 24. Der Mittelwert aller drei Werte wäre 14 und würde Zukunftsinformation einbeziehen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "flow": {
                "steps": [
                  {
                    "title": "Zeitbezug klären",
                    "text": "Messzeit und Verfügbarkeit festlegen"
                  },
                  {
                    "title": "Fenster auswählen",
                    "text": "Nur zulässige Beobachtungen aufnehmen"
                  },
                  {
                    "title": "Aggregieren",
                    "text": "Definierte Zusammenfassung berechnen"
                  }
                ]
              }
            },
            "Quelle: Lecture 02  Healthcare Data.pdf, Folien 12, 29–31; Lab_02_Healthcare_Data_template.ipynb, Abschnitte 5–6"
          ],
          "remember": "Eine mathematisch korrekte Rechnung kann zeitlich unzulässig sein."
        },
        {
          "type": "checkpoint",
          "id": "cp-longitudinal",
          "title": "Checkpoint: Messreihe und Fenster",
          "questions": [
            {
              "id": "change",
              "type": "type",
              "prompt": "Folie 12: erster Wert 105, letzter Wert 127. Wie gross ist letzter minus erster in µmol/L?",
              "accept": [
                "22",
                "+22",
                "22 µmol/L",
                "+22 µmol/L",
                "22 umol/L"
              ],
              "explanation": "127−105 = +22. Das ist eine Veränderung, kein Mittelwert. Quelle: Lecture 02  Healthcare Data.pdf, Folien 12, 15–16, 29–31; Lab_02_Healthcare_Data_template.ipynb, Abschnitte 5–6"
            },
            {
              "id": "measurement",
              "type": "multi",
              "prompt": "Welche Faktoren können Messhäufigkeit beeinflussen?",
              "options": [
                "Klinischer Verdacht",
                "Behandlungsprotokoll",
                "Verfügbare Ressourcen",
                "Ausschliesslich ein unveränderlicher Messplan"
              ],
              "correct": [
                0,
                1,
                2
              ],
              "explanation": "Der Beobachtungsprozess ist Teil des klinischen Alltags. Quelle: Lecture 02  Healthcare Data.pdf, Folien 12, 15–16, 29–31; Lab_02_Healthcare_Data_template.ipynb, Abschnitte 5–6"
            },
            {
              "id": "window",
              "type": "single",
              "prompt": "Eigenes Beispiel: Werte 10 bei 8 h, 14 bei 20 h und 18 bei 26 h, jeweils sofort verfügbar. Welcher Mittelwert gehört zum 0–24-h-Fenster?",
              "options": [
                "12",
                "14",
                "18"
              ],
              "correct": 0,
              "explanation": "Nur 10 und 14 liegen im erlaubten Fenster: (10+14)/2 = 12. Quelle: Lecture 02  Healthcare Data.pdf, Folien 12, 15–16, 29–31; Lab_02_Healthcare_Data_template.ipynb, Abschnitte 5–6"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Missingness hat mehrere mögliche Ursachen",
          "body": [
            "Ein leeres Feld nennt seinen Entstehungsgrund nicht. Die Vorlesung unterscheidet unter anderem nicht angeordnet, nicht durchgeführt, in einem anderen System dokumentiert und technisch beziehungsweise organisatorisch nicht verfügbar.",
            {
              "cards": [
                {
                  "title": "Klinischer Anlass",
                  "text": "Ein Test war möglicherweise nicht angezeigt."
                },
                {
                  "title": "Ablauf",
                  "text": "Ein Auftrag wurde möglicherweise nicht ausgeführt."
                },
                {
                  "title": "Systemgrenze",
                  "text": "Das Ergebnis liegt möglicherweise anderswo."
                },
                {
                  "title": "Verfügbarkeit",
                  "text": "Ein technischer oder organisatorischer Ausfall verhindert den Zugriff."
                }
              ]
            },
            {
              "reveal": {
                "question": "Eigener Fall: Ein Modell nutzt „Laborwert fehlt“ erfolgreich als Merkmal. Warum kann das an einem anderen Spital scheitern?",
                "answer": "Die Missingness kann lokale Messentscheidungen oder Systeme abbilden. Andere Routinen können diesen Zusammenhang verändern, auch wenn die Patienten ähnlich sind.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 02  Healthcare Data.pdf, Folien 16–17"
          ],
          "remember": "Vor dem Imputieren nach dem möglichen Entstehungsprozess fragen."
        },
        {
          "type": "slide",
          "title": "Fehlende Tests: der Nenner entscheidet",
          "body": [
            "Das Lab fragt, in welchem Anteil der Aufnahmen ein Test fehlt. Dafür zählen Aufnahmen mit mindestens einer Messung, nicht die Gesamtzahl einzelner Laborzeilen.",
            {
              "formula": {
                "main": "Anteil ohne Test = 1 − Aufnahmen mit Test / alle betrachteten Aufnahmen",
                "note": "Die Beobachtungseinheit im Zähler und Nenner muss zusammenpassen."
              }
            },
            {
              "reveal": {
                "question": "Eigene Zahlen: 100 Aufnahmen, 60 davon mit mindestens einer Messung. Diese 60 erzeugen zusammen 250 Messzeilen. Wie gross ist der Anteil ohne Test?",
                "answer": "40/100 = 0,4 = 40 %. Die 250 Messzeilen dürfen die 60 unterschiedlichen Aufnahmen im Zähler nicht ersetzen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "callout": {
                "tone": "tip",
                "title": "Lab-Logik",
                "text": "Die Liste aller betrachteten Aufnahmen als Grundgesamtheit erhalten. Sonst verschwinden Aufnahmen ohne Messung bereits beim Zusammenführen und das Fehlen wird unterschätzt."
              }
            },
            "Quelle: Lab_02_Healthcare_Data_template.ipynb, Abschnitt 3 / Exercise 2; Lecture 02  Healthcare Data.pdf, Folien 17"
          ],
          "remember": "Eine Aufnahme mit vielen Messungen zählt für „Test vorhanden“ trotzdem nur einmal."
        },
        {
          "type": "slide",
          "title": "Ausreisser zuerst untersuchen",
          "body": [
            "Ein extremer Wert kann ein Artefakt oder eine klinisch wichtige Beobachtung sein. Mögliche Erklärungen sind etwa Messprobleme, falsche Eingabe, eine andere Einheit oder ein tatsächlicher Zustand. Die statistische Auffälligkeit allein entscheidet nicht.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Auffälligkeit entdecken",
                    "text": "Welche Beobachtung fällt auf?"
                  },
                  {
                    "title": "Kontext prüfen",
                    "text": "Einheit, Gerät, Zeit, Nachbarwerte und Dokumentation vergleichen"
                  },
                  {
                    "title": "Entscheiden",
                    "text": "Behalten, korrigieren oder mit Begründung ausschliessen"
                  }
                ]
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Ein ungewöhnlicher Wert passt zu benachbarten Messungen, aber nicht zum Durchschnitt der Stichprobe. Reicht das als Löschgrund?",
                "answer": "Nein. Ein Abstand zum Durchschnitt beweist keinen Fehler. Der Kontext kann eine seltene, reale Beobachtung stützen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 02  Healthcare Data.pdf, Folien 19"
          ],
          "remember": "Ungewöhnlich ist nicht gleich falsch."
        },
        {
          "type": "checkpoint",
          "id": "cp-quality",
          "title": "Checkpoint: Missingness und Datenqualität",
          "questions": [
            {
              "id": "causes",
              "type": "multi",
              "prompt": "Welche Ursachen können ein fehlendes Ergebnis erklären?",
              "options": [
                "Nicht angeordneter Test",
                "Ergebnis in einem anderen System",
                "Technischer Fehler",
                "Sicherer Beweis, dass der Wert normal gewesen wäre"
              ],
              "correct": [
                0,
                1,
                2
              ],
              "explanation": "Aus dem fehlenden Eintrag allein folgt kein normaler Messwert. Quelle: Lecture 02  Healthcare Data.pdf, Folien 16–19; Lab_02_Healthcare_Data_template.ipynb, Abschnitte 3–4"
            },
            {
              "id": "fraction",
              "type": "type",
              "prompt": "Eigenes Beispiel: In 80 von 100 Aufnahmen wurde der Test mindestens einmal gemessen. Wie viel Prozent der Aufnahmen haben keine Messung?",
              "accept": [
                "20",
                "20 %",
                "20%",
                "20 Prozent"
              ],
              "explanation": "20 Aufnahmen ohne Test geteilt durch 100 ergeben 20 %. Quelle: Lecture 02  Healthcare Data.pdf, Folien 16–19; Lab_02_Healthcare_Data_template.ipynb, Abschnitte 3–4"
            },
            {
              "id": "outlier",
              "type": "single",
              "prompt": "Was ist bei einem extremen Wert der angemessene erste Schritt?",
              "options": [
                "Ohne weitere Prüfung löschen",
                "Kontext, Einheit, Messung und Nachbarwerte prüfen",
                "Immer unverändert als sicher korrekt deklarieren"
              ],
              "correct": 1,
              "explanation": "Die Entscheidung benötigt Evidenz zum konkreten Wert. Quelle: Lecture 02  Healthcare Data.pdf, Folien 16–19; Lab_02_Healthcare_Data_template.ipynb, Abschnitte 3–4"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Labels werden konstruiert",
          "body": [
            "Ein klinisches Konzept wie eine Erkrankung ist nicht immer direkt beobachtbar. Labels können aus Codes, Berichten, fachlichen Beurteilungen, Verordnungen oder einem Review abgeleitet werden. Jede dieser Quellen hat eigene Grenzen.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Klinischer Zustand",
                    "text": "Was interessiert uns?"
                  },
                  {
                    "title": "Beobachtung und Dokumentation",
                    "text": "Was wurde erhoben und festgehalten?"
                  },
                  {
                    "title": "Label-Regel",
                    "text": "Wie wird daraus die Zielvariable?"
                  },
                  {
                    "title": "Lernaufgabe",
                    "text": "Was lernt das Modell tatsächlich vorherzusagen?"
                  }
                ]
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Jede Antibiotikaverordnung wird als Pneumonie-Label verwendet. Welche Annahme wäre zu prüfen?",
                "answer": "Dass die Verordnung zuverlässig das gewünschte Krankheitskonzept abbildet. Die Folie nennt sie als leicht beobachtbare, aber nicht spezifische Entscheidungsquelle.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 02  Healthcare Data.pdf, Folien 20"
          ],
          "remember": "Die Label-Regel operationalisiert ein Konzept und kann es dabei verändern."
        },
        {
          "type": "slide",
          "title": "Proxy-Label: ICU admission ist nicht nur Verschlechterung",
          "body": [
            "Eine Aufnahme auf die Intensivstation ist gut dokumentierbar. Sie hängt aber nicht allein vom Patientenzustand ab, sondern auch von Entscheidungen, Behandlungszielen, Bettverfügbarkeit und Spitalpraxis.",
            {
              "compare": {
                "left": {
                  "title": "Gewünschtes Konzept",
                  "points": [
                    "Physiologische Verschlechterung",
                    "Bedarf an höherer Versorgungsintensität"
                  ]
                },
                "right": {
                  "title": "Beobachteter Proxy",
                  "points": [
                    "Dokumentierte ICU-Aufnahme",
                    "Beeinflusst durch Person und Gesundheitssystem"
                  ]
                }
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Zwei Standorte haben unterschiedliche Aufnahmepraxis für die ICU. Was könnte ein Modell mit ICU-Aufnahme als Label zusätzlich lernen?",
                "answer": "Den lokalen Entscheidungs- und Ressourcenprozess. Eine hohe Vorhersagegüte für diesen Proxy beweist nicht automatisch eine gleich gute Erkennung physiologischer Verschlechterung.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 02  Healthcare Data.pdf, Folien 21"
          ],
          "remember": "Ein leicht verfügbares Label kann eine andere Frage beantworten als die beabsichtigte."
        },
        {
          "type": "slide",
          "title": "DICOM und PACS haben verschiedene Rollen",
          "body": [
            {
              "flow": {
                "steps": [
                  {
                    "title": "Scanner",
                    "text": "Erzeugt die Untersuchung."
                  },
                  {
                    "title": "DICOM-Darstellung",
                    "text": "Bilddaten und interpretierbare Metadaten."
                  },
                  {
                    "title": "PACS",
                    "text": "Archivierung und Wiederauffinden."
                  },
                  {
                    "title": "Viewer und Report",
                    "text": "Betrachtung, Interpretation und Bericht."
                  }
                ]
              }
            },
            "Zu den Metadaten gehören etwa Modalität, Aufnahmezeit, Protokoll, räumliche Orientierung, Pixelabstand und Schichtdicke. Ein medizinisches Bild ist deshalb mehr als ein beliebiges Pixelarray.",
            {
              "reveal": {
                "question": "Eigener Fall: Nach dem Export ist die Intensität der Pixel erhalten, aber die räumliche Orientierung fehlt. Ist die medizinische Repräsentation unverändert?",
                "answer": "Nein. Für die Interpretation relevante Metadaten fehlen. Bildinhalt und Kontext müssen gemeinsam berücksichtigt werden.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 02  Healthcare Data.pdf, Folien 25"
          ],
          "remember": "DICOM beschreibt Daten und Metadaten; PACS ist ein Archivierungs- und Kommunikationssystem."
        },
        {
          "type": "slide",
          "title": "FHIR: verknüpfte Ressourcen statt Riesentabelle",
          "body": [
            "FHIR gibt klinischer Information standardisierte, verknüpfbare Strukturen. Die Folie zeigt unter anderem Patient, Encounter, Observation, Condition, MedicationRequest und DiagnosticReport.",
            {
              "table": {
                "head": [
                  "Ressource im Folienbeispiel",
                  "Beitrag"
                ],
                "rows": [
                  [
                    "Patient",
                    "Wem gehört die Information?"
                  ],
                  [
                    "Encounter",
                    "Welcher Kontakt oder Aufenthalt?"
                  ],
                  [
                    "Observation",
                    "Was wurde gemessen?"
                  ],
                  [
                    "Condition",
                    "Welches Problem oder welche Diagnose?"
                  ],
                  [
                    "MedicationRequest",
                    "Was wurde verordnet?"
                  ],
                  [
                    "DiagnosticReport",
                    "Was wurde als Untersuchungsergebnis berichtet?"
                  ]
                ],
                "caption": "Vereinfachte Rollen nach Folie 26"
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Ein Herzfrequenzwert enthält Referenzen auf Patient und Encounter. Welchen Vorteil haben diese Beziehungen?",
                "answer": "Die Messung lässt sich der Person und dem konkreten Versorgungskontakt zuordnen. Beim Austausch bleiben diese Zusammenhänge explizit, statt nur eine isolierte Zahl zu übertragen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 02  Healthcare Data.pdf, Folien 26"
          ],
          "remember": "Gemeinsame Struktur und Beziehungen unterstützen den Austausch von Bedeutung."
        },
        {
          "type": "checkpoint",
          "id": "cp-labels-systems",
          "title": "Checkpoint: Labels und Informationssysteme",
          "questions": [
            {
              "id": "proxy",
              "type": "multi",
              "prompt": "Warum ist ICU-Aufnahme ein möglicher Proxy statt einer reinen Messung der Verschlechterung?",
              "options": [
                "Bettverfügbarkeit kann mitwirken.",
                "Klinische Entscheidungen können mitwirken.",
                "Sie ist unabhängig vom Gesundheitssystem.",
                "Lokale Praxis kann mitwirken."
              ],
              "correct": [
                0,
                1,
                3
              ],
              "explanation": "Ein Proxy kann sowohl Patientenzustand als auch Systemprozesse kodieren. Quelle: Lecture 02  Healthcare Data.pdf, Folien 20–21, 25–26"
            },
            {
              "id": "archive",
              "type": "type",
              "prompt": "Welche Abkürzung bezeichnet das Bildarchivierungs- und Kommunikationssystem der Folie?",
              "accept": [
                "PACS",
                "Picture Archiving and Communication System",
                "Picture Archiving & Communication System"
              ],
              "explanation": "DICOM ist die standardisierte Bild- und Metadatendarstellung; PACS übernimmt die Archivierungs- und Kommunikationsrolle. Quelle: Lecture 02  Healthcare Data.pdf, Folien 20–21, 25–26"
            },
            {
              "id": "fhir",
              "type": "single",
              "prompt": "Welche Aussage beschreibt FHIR in der Vorlesung?",
              "options": [
                "Eine einzige Tabelle ohne Beziehungen",
                "Standardisierte, verknüpfbare Ressourcen",
                "Ein Verfahren, das alle Messfehler automatisch entfernt"
              ],
              "correct": 1,
              "explanation": "FHIR unterstützt die Repräsentation und den Austausch zusammenhängender klinischer Informationen. Quelle: Lecture 02  Healthcare Data.pdf, Folien 20–21, 25–26"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Was das Modell tatsächlich sieht",
          "body": [
            {
              "flow": {
                "steps": [
                  {
                    "title": "Clinical Reality",
                    "text": "Patient, Zustand, Symptome und Kontext"
                  },
                  {
                    "title": "Care Systems",
                    "text": "Beobachtungen in EHR, LIS, PACS und Geräten"
                  },
                  {
                    "title": "Raw Data",
                    "text": "Extrahierte Tabellen, Texte, Bilder und Signale"
                  },
                  {
                    "title": "Analysis Dataset",
                    "text": "Ausgewählte Kohorte, Features und Labels"
                  },
                  {
                    "title": "Model Input",
                    "text": "Numerische Werte, Tokens, Pixel oder andere Repräsentationen"
                  }
                ]
              }
            },
            "Jeder Übergang enthält Entscheidungen. Wird etwa eine Aufnahme ausgeschlossen, eine Messreihe gemittelt oder ein Diagnosecode zum Label, verändert das die spätere Lernaufgabe.",
            {
              "reveal": {
                "question": "Eigener Fall: Ein Modell erkennt im Datensatz ein Muster. Was kannst du ohne Kenntnis der Transformationen nicht sicher sagen?",
                "answer": "Ob das Muster primär den Patienten, die Datenerhebung, die Selektion oder eine Verarbeitung widerspiegelt. Das Modell sieht die konstruierte Repräsentation.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 02  Healthcare Data.pdf, Folien 24, 27"
          ],
          "remember": "Transformationen sind Teil der fachlichen Begründung eines Modells."
        },
        {
          "type": "slide",
          "title": "Prediction Time und Prediction Horizon",
          "body": [
            "Die Vorlesung konkretisiert die Frage auf t₀ = 24 Stunden nach Aufnahme und Verschlechterung in den nächsten 48 Stunden. Das Beobachtungsfenster liefert verfügbare Inputs; der Vorhersagehorizont beschreibt den künftigen Zielzeitraum.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "0 h: Aufnahme",
                    "text": "Beginn des gewählten Beobachtungsfensters"
                  },
                  {
                    "title": "24 h: t₀",
                    "text": "Modell wird mit den bis dahin verfügbaren Inputs ausgeführt"
                  },
                  {
                    "title": "Bis 72 h",
                    "text": "Ende des 48-h-Vorhersagehorizonts nach t₀"
                  }
                ],
                "note": "Der Horizont beginnt am Vorhersagezeitpunkt, nicht nochmals bei Aufnahme."
              }
            },
            {
              "reveal": {
                "question": "Ist „innerhalb der ersten 24 Stunden“ dieselbe Aufgabenbeschreibung wie „genau bei Stunde 24“?",
                "answer": "Nein. Ein variabler früherer Vorhersagezeitpunkt würde andere verfügbare Daten und eine andere Zeitdefinition verlangen. Der konkrete Task muss eindeutig sein.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 02  Healthcare Data.pdf, Folien 29–30"
          ],
          "remember": "Population, t₀, verfügbare Inputs, Ziel und Horizont vor dem Modell festlegen."
        },
        {
          "type": "slide",
          "title": "Gemessen ist nicht zwingend schon verfügbar",
          "body": [
            {
              "table": {
                "head": [
                  "Eigene Zeitbeispiele; t₀ = 24 h",
                  "Als Input bei t₀?"
                ],
                "rows": [
                  [
                    "Messung bei 8 h, Ergebnis sofort verfügbar",
                    "Zeitlich zulässig"
                  ],
                  [
                    "Probe bei 23 h, Ergebnis erst bei 26 h verfügbar",
                    "Nicht zulässig"
                  ],
                  [
                    "ICU-Transfer bei 36 h",
                    "Nicht zulässig"
                  ],
                  [
                    "Alter bei Aufnahme bekannt",
                    "Zeitlich zulässig"
                  ]
                ],
                "caption": "Verfügbarkeit und Messzeit getrennt betrachten"
              }
            },
            {
              "reveal": {
                "question": "Warum kann eine Probe vor t₀ trotzdem Leakage erzeugen?",
                "answer": "Das Modell dürfte den erst später bekannten Ergebniswert zum damaligen Zeitpunkt nicht kennen. Ein frühes Proben- oder Messdatum genügt nicht als Verfügbarkeitsnachweis.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Auch Gesamtaufenthaltsdauer, Entlassungsdiagnose und später gestartete Medikamente können Zukunftsinformation verraten. Entscheidend ist die konkrete Aufgabe und wann die jeweilige Information bekannt war.",
            "Quelle: Lecture 02  Healthcare Data.pdf, Folien 30–31"
          ],
          "remember": "Nicht nur „Welche Variable?“, sondern „Wann war dieser Wert bekannt?“ fragen."
        },
        {
          "type": "slide",
          "title": "Eine überprüfbare Vorhersageaufgabe formulieren",
          "body": [
            "Ein Task benennt Population, Beobachtungseinheit, Beobachtungsfenster, Vorhersagezeit, Ziel und vorgesehenen Nutzen. Eine praktische Präzisierung ist zudem, welche Fälle zu t₀ noch für eine Zukunftsvorhersage infrage kommen.",
            {
              "table": {
                "head": [
                  "Eigener Task-Baustein",
                  "Beispielhafte Festlegung"
                ],
                "rows": [
                  [
                    "Population / Einheit",
                    "Definierte stationäre Aufnahmen; eine Zeile pro Aufnahme"
                  ],
                  [
                    "Zeit",
                    "Vorhersage genau 24 h nach Aufnahme"
                  ],
                  [
                    "Inputs",
                    "Nur bis t₀ verfügbare Informationen aus dem definierten Fenster"
                  ],
                  [
                    "Target / Horizont",
                    "Vorab definierte Verschlechterung in den folgenden 48 h"
                  ],
                  [
                    "Nutzen",
                    "Unterstützung einer benannten Entscheidung durch zuständige Nutzende"
                  ]
                ],
                "caption": "Eigenes Spezifikationsbeispiel, keine geprüfte klinische Einsatzempfehlung"
              }
            },
            {
              "reveal": {
                "question": "Eine Zielvariable ist bereits vor t₀ eingetreten. Warum muss man den Fall im Task ausdrücklich behandeln?",
                "answer": "Sonst vermischt man das Erkennen eines bereits bestehenden Zustands mit einer Zukunftsvorhersage. Auswahlregeln und Definition des Zielereignisses müssen das klären.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lecture 02  Healthcare Data.pdf, Folien 5, 29–32; Lab_02_Healthcare_Data_template.ipynb, Abschnitte 7–8"
          ],
          "remember": "Eine konkrete Zeit- und Zieldefinition verhindert scheinbar gute, aber unbrauchbare Ergebnisse."
        },
        {
          "type": "checkpoint",
          "id": "cp-clock",
          "title": "Checkpoint: Vorhersage hat eine Uhr",
          "questions": [
            {
              "id": "horizon",
              "type": "type",
              "prompt": "t₀ liegt 24 h nach Aufnahme. Der Horizont umfasst die folgenden 48 h. Bei welcher Stunde nach Aufnahme endet er?",
              "accept": [
                "72",
                "72 h",
                "72h",
                "72 Stunden"
              ],
              "explanation": "24+48 = 72 Stunden nach Aufnahme. Quelle: Lecture 02  Healthcare Data.pdf, Folien 29–31"
            },
            {
              "id": "allowed",
              "type": "multi",
              "prompt": "Eigener Task bei 24 h: Welche Inputs sind zeitlich zulässig, wenn die genannten verfügbaren Informationen zur Fragestellung passen?",
              "options": [
                "Bei Aufnahme bekanntes Alter",
                "Ergebnis aus einer Probe bei 23 h, erst bei 26 h bekannt",
                "Sofort verfügbarer Messwert bei 8 h",
                "Erst nach Entlassung bekannte Gesamtaufenthaltsdauer"
              ],
              "correct": [
                0,
                2
              ],
              "explanation": "Die tatsächliche Verfügbarkeit bei t₀ entscheidet. Quelle: Lecture 02  Healthcare Data.pdf, Folien 29–31"
            },
            {
              "id": "leakage",
              "type": "single",
              "prompt": "Ein Modell verwendet für t₀ = 24 h die erst bei 60 h zugewiesene Abschlussdiagnose. Was ist das Problem?",
              "options": [
                "Temporal Leakage",
                "Zu kurze Spaltennamen",
                "Die Einheit von Zeit spielt keine Rolle"
              ],
              "correct": 0,
              "explanation": "Später bekannt gewordene Information fliesst unzulässig in eine frühere Vorhersage ein. Quelle: Lecture 02  Healthcare Data.pdf, Folien 29–31"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Lab-Brücke: ein Feature pro Aufnahme bauen",
          "body": [
            "Im Lab werden Messungen mit Aufnahmedaten verknüpft, das 0–24-h-Fenster ausgewählt und Mittelwerte pro Aufnahme und Labortest gebildet. Die resultierende Tabelle soll eine Zeile pro `hadm_id` haben.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Verknüpfen",
                    "text": "Messungen dem richtigen Aufenthalt zuordnen"
                  },
                  {
                    "title": "Filtern",
                    "text": "Zeitfenster und verfügbare Testarten festlegen"
                  },
                  {
                    "title": "Aggregieren",
                    "text": "Definierte Zusammenfassung je Aufnahme und Test"
                  },
                  {
                    "title": "Prüfen",
                    "text": "Eindeutigkeit, fehlende Features und Zukunftsinformation kontrollieren"
                  }
                ]
              }
            },
            {
              "callout": {
                "tone": "warn",
                "title": "Vereinfachung im Notebook",
                "text": "Der gezeigte Code verwendet charttime zum Filtern. Für einen echten Einsatz muss zusätzlich geklärt werden, ob dieser Zeitstempel die tatsächliche Ergebnisverfügbarkeit abbildet. Die Vorlesung unterscheidet Messzeit und Bekanntwerden ausdrücklich."
              }
            },
            {
              "reveal": {
                "question": "Das Notebook verwendet bei fehlendem Datenzugriff einen synthetischen Fallback. Darfst du dessen Häufigkeiten als klinische Befunde interpretieren?",
                "answer": "Nein. Der Fallback übt Strukturen und Verarbeitungsschritte. Er ist keine empirische Aussage über Patienten oder Spitäler; die Datenquelle muss benannt bleiben.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Lab_02_Healthcare_Data_template.ipynb, Abschnitte 5–9; Lecture 02  Healthcare Data.pdf, Folien 12, 27, 30–31"
          ],
          "remember": "Ein strukturell korrektes Feature braucht auch einen fachlich gültigen Zeitbezug."
        },
        {
          "type": "slide",
          "title": "Data Reality Check und Transfer",
          "body": [
            {
              "checklist": {
                "title": "Kann ich das erklären und anwenden?",
                "items": [
                  "Population: Wer ist ein- und ausgeschlossen?",
                  "Time: Wann wurde die Information wirklich bekannt?",
                  "Measurement: Wie wurde sie erzeugt?",
                  "Missingness: Warum könnte sie fehlen?",
                  "Target: Welches Konzept oder welcher Proxy wird vorhergesagt?",
                  "Setting: Was könnte sich anderswo ändern?"
                ]
              }
            },
            {
              "reveal": {
                "question": "Eigener Transfer: Eine Klinik misst einen Test routinemässig, eine andere nur bei Verdacht. Ein Modell nutzt die Messhäufigkeit. Wo erwartest du eine Übertragbarkeitsfrage?",
                "answer": "Beim Beobachtungsprozess und Setting. Das Merkmal kann lokale Routinen statt nur Patientenzustand abbilden. Ein gleicher Spaltenname beseitigt diese Differenz nicht.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "reveal": {
                "question": "Eigener Transfer: Ein Modell ist auffällig gut. Sein Datensatz enthält letzte Messungen vor Entlassung, soll aber bei Aufnahme vorhersagen. Welche Prüfung hat Vorrang?",
                "answer": "Die Verfügbarkeit der Inputs am vorgesehenen Vorhersagezeitpunkt. Zukünftige Messungen können die Leistung künstlich erhöhen; eine Modelloptimierung würde dieses Grundproblem nicht beheben.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Zusatzwissen: Die konkreten Modalitätsbeispiele illustrieren Strukturen. Entscheidend sind Bedeutung, Zeitbezug und Konstruktion der Repräsentation; spätere Wochen vertiefen Aufbereitung und Modelle.",
            "Quelle: Lecture 02  Healthcare Data.pdf, Folien 32, 34–35"
          ],
          "remember": "Prüfe die Datenrealität, bevor du das Modell optimierst."
        },
        {
          "type": "checkpoint",
          "id": "cp-reality",
          "title": "Checkpoint: Gesamtbeurteilung",
          "questions": [
            {
              "id": "representation",
              "type": "order",
              "prompt": "Ordne die Repräsentationskette der Vorlesung.",
              "items": [
                "Clinical Reality",
                "Care Systems",
                "Raw Data",
                "Analysis Dataset",
                "Model Input"
              ],
              "explanation": "Das Modell erhält die am Ende erzeugte Repräsentation, nicht den Patienten unmittelbar. Quelle: Lecture 02  Healthcare Data.pdf, Folien 20–22, 27, 30–35; Lab_02_Healthcare_Data_template.ipynb, Abschnitte 6–9"
            },
            {
              "id": "check",
              "type": "multi",
              "prompt": "Welche Punkte gehören zum Data Reality Check?",
              "options": [
                "Population und Setting",
                "Zeit und Messprozess",
                "Missingness und Target",
                "Nur die Wahl des leistungsfähigsten Algorithmus"
              ],
              "correct": [
                0,
                1,
                2
              ],
              "explanation": "Die sechs Fragen prüfen Eignung und Bedeutung der Daten vor dem Modell. Quelle: Lecture 02  Healthcare Data.pdf, Folien 20–22, 27, 30–35; Lab_02_Healthcare_Data_template.ipynb, Abschnitte 6–9"
            },
            {
              "id": "synthetic",
              "type": "single",
              "prompt": "Eigener Lab-Fall: Die Auswertung basiert auf dem ausdrücklich synthetischen Fallback. Welche Aussage ist angemessen?",
              "options": [
                "Die Häufigkeiten beschreiben alle realen Spitalpatienten.",
                "Die Verarbeitung lässt sich üben; die Zahlen sind keine klinischen Befunde.",
                "Synthetische Daten beseitigen jede methodische Frage."
              ],
              "correct": 1,
              "explanation": "Die Herkunft begrenzt, welche Schlussfolgerungen zulässig sind. Quelle: Lecture 02  Healthcare Data.pdf, Folien 20–22, 27, 30–35; Lab_02_Healthcare_Data_template.ipynb, Abschnitte 6–9"
            }
          ]
        }
      ]
    },
    {
      id: "w3",
      number: 3,
      title: "Data Processing: Scaling, Visualisation, Sampling",
      status: "ready",
      items: [

        /* ================= Orientierung ================= */
        {
          type: "slide",
          title: "Die Geschichte dieser Vorlesung",
          body: [
            "Vorlesung 3 hat eine einzige These, und alles andere hängt daran: **Verstehe die Daten, bevor du sie veränderst.** Der Dozent baut das in fünf Etappen auf, und jede Etappe beantwortet eine andere Frage.",
            { flow: { steps: [
              { title: "Was stellen die Daten dar?", text: "Beobachtungseinheit, Variablen, EDA" },
              { title: "Wie bereite ich sie auf?", text: "Feature Scaling" },
              { title: "Was sehe ich in ihnen?", text: "Visualisierung" },
              { title: "Wen repräsentieren sie?", text: "Sampling" },
              { title: "Sind sie bereit für AI?", text: "Take-Home Messages" }
            ], note: "Die Vorlesung beginnt und endet mit derselben Frage: Würdest du auf diesen Daten ein Modell trainieren?" } },
            "Zwei Dinge fallen beim Durchblättern der Folien auf, und beide sind didaktische Hinweise. Erstens baut der Dozent die Min–Max-Rechnung über **sechs Folien** langsam auf, Zelle für Zelle. Zweitens baut er dieselbe Plot-Übersicht über **vier Folien** Feld für Feld auf. Wo jemand so viel Zeit investiert, liegt der Prüfungsstoff.",
            { callout: { tone: "tip", title: "So nutzt du diese Lektion", text: "Die Aufdeck-Felder sind keine Deko. Denk jeweils fünf Sekunden selbst nach, bevor du klickst. Genau dieser Moment entscheidet, ob du den Stoff später abrufen kannst." } }
          ],
          remember: "Eine These: Verstehe die Daten, bevor du sie veränderst. Fünf Etappen: Beobachtung, Scaling, Visualisierung, Sampling, Beurteilung."
        },

        /* ================= Block 1: Folien 5–7 ================= */
        {
          type: "slide",
          title: "Folien 5–6 — Der Fall: 10'000 Aufnahmen, würdest du trainieren?",
          body: [
            "Ein Spitalnetzwerk hat Daten aus **10'000 Aufnahmen** an drei Standorten gesammelt. Ziel ist ein Modell, das die **30-Tage-Readmission** vorhersagt, mit Informationen, die **zum Zeitpunkt der Aufnahme** verfügbar sind. Hier ist der Ausschnitt, den du zu sehen bekommst:",
            { table: {
              caption: "Ausschnitt aus dem Datensatz, wie ihn die Folie zeigt",
              head: ["Age", "Sex", "Creatinine", "HeartRate (bpm)", "Site", "Readmitted"],
              rows: [
                ["67", "F", "1.1", "78", "A", "No"],
                ["74", "M", "–", "92", "A", "Yes"],
                ["52", "F", "120", "830", "B", "No"],
                ["…", "…", "…", "…", "…", "…"],
                ["61", "M", "0.9", "74", "C", "No"]
              ],
              note: "Nimm dir wirklich 30 Sekunden für diese Tabelle, bevor du weiterliest."
            } },
            { reveal: {
              question: "Die Folie fragt: a) Modellentwicklung starten, b) stoppen, der Datensatz ist klar ungeeignet, oder c) vor der Entscheidung mehr Informationen verlangen. Was antwortest du, und was genau würdest du fragen?",
              label: "Meine Antwort vergleichen",
              answer: [
                "Die Vorlesung läuft auf **c)** hinaus. Nicht weil der Datensatz unrettbar wäre, sondern weil die Tabelle allein die entscheidenden Fragen gar nicht beantworten kann.",
                "Schon in diesen fünf Zeilen stecken drei Auffälligkeiten: Bei Zeile 2 fehlt **Creatinine** ganz. In Zeile 3 steht **Creatinine = 120**, während die anderen Zeilen Werte um 1.0 zeigen, das riecht nach einer anderen Einheit. Und **830 bpm** als Herzfrequenz ist physiologisch unmöglich.",
                "Entscheidend ist aber: Was du hier siehst, sind nur fünf von 10'000 Zeilen. Die wirklich gefährlichen Probleme sieht man an einzelnen Zeilen überhaupt nicht."
              ]
            } }
          ],
          remember: "10'000 Aufnahmen, drei Standorte, Ziel 30-Tage-Readmission bei Aufnahme. Ein paar plausibel aussehende Zeilen sind kein Beleg für Datenqualität."
        },
        {
          type: "slide",
          title: "Folie 6 — Fünf Probleme, die man an einzelnen Zeilen nicht sieht",
          body: [
            "Derselbe Datensatz, nun mit dem Blick auf alle 10'000 Zeilen. Die Folie zeigt fünf Befunde, und jeder davon ist ein eigener Problemtyp:",
            { cards: [
              { title: "35 % Creatinine fehlen", text: "Nie gemessen, nicht dokumentiert, oder bei der Extraktion verloren?", tone: "bad" },
              { title: "Nur 3 % Readmissions", text: "Starkes Klassenungleichgewicht, fast alle gehören zur negativen Klasse.", tone: "bad" },
              { title: "830 bpm als Herzfrequenz", text: "Seltener Patient, Messfehler oder Datenfehler?", tone: "bad" },
              { title: "Zwei Einheiten für Creatinine", text: "Vor der Harmonisierung sind die Werte nicht vergleichbar.", tone: "bad" },
              { title: "70 % der Positiven von einem Standort", text: "Patientenunterschied, Standorteffekt oder Effekt der Datenerhebung?", tone: "bad" }
            ] },
            "So sieht derselbe Tabellenausschnitt aus, wenn man weiss, worauf man achten muss:",
            { table: {
              caption: "Dieselben Zeilen, jetzt mit markierten Auffälligkeiten",
              head: ["Age", "Sex", "Creatinine", "HeartRate (bpm)", "Site", "Readmitted"],
              rows: [
                ["67", "F", "1.1", "78", "A", "No"],
                ["74", "M", "–", "92", "A", "Yes"],
                ["52", "F", "120", "830", "B", "No"],
                ["…", "…", "…", "…", "…", "…"],
                ["61", "M", "0.9", "74", "C", "No"]
              ],
              marks: { "1,2": "warn", "2,2": "warn", "2,3": "bad" },
              note: "Gelb: fehlender Wert und Einheitenverdacht. Rot: physiologisch unmöglicher Wert."
            } },
            { callout: { tone: "warn", title: "Der Kernsatz der ganzen Vorlesung", text: "Keines dieser Probleme wird durch die Wahl eines besseren Algorithmus gelöst. Sie müssen auf der Ebene der Daten und des Prozesses verstanden werden, der sie erzeugt hat." } }
          ],
          remember: "Fünf Problemtypen: Missingness, Klassenungleichgewicht, unmöglicher Wert, uneinheitliche Einheiten, Standort-Ungleichverteilung. Ein besserer Algorithmus löst keines davon."
        },
        {
          type: "slide",
          title: "Folie 7 — Vier Arbeitsschritte und das eigentliche Ziel",
          body: [
            "Aus dem Fall macht die Folie einen Arbeitsablauf. Er ist zugleich die Struktur deines Vorgehens bei jedem neuen Datensatz:",
            { flow: { steps: [
              { title: "Describe", text: "Patienten, Variablen und Verteilungen beschreiben, bevor man transformiert. Erst die Beobachtungseinheit klären, dann zusammenfassen." },
              { title: "Inspect", text: "Missingness, ungewöhnliche Werte und Zusammenhänge untersuchen. Fragen, ob ein Muster den Patienten, den Messprozess oder die Dokumentation abbildet." },
              { title: "Prepare", text: "Einheiten, Scaling und Kategorien im Hinblick auf die geplante Analyse behandeln, ohne die Bedeutung zu verändern." },
              { title: "Judge", text: "Beurteilen, ob die Daten für die geplante AI-Aufgabe bereit sind, inklusive ungelöster Probleme wie Imbalance, Leakage und eingeschränkter Repräsentativität." }
            ] } },
            { callout: { tone: "def", title: "Das Ziel in einem Satz", text: "Das Ziel ist nicht, einen „clean\" dataset zu produzieren. Das Ziel ist zu verstehen, was die Daten darstellen, wie sie entstanden sind und ob sie die Frage beantworten können, die wir stellen wollen." } },
            "Die Reihenfolge ist kein Zufall. **Describe** steht vor **Prepare**, weil man nicht sinnvoll transformieren kann, was man noch nicht verstanden hat. Und **Judge** steht am Schluss, weil die Beurteilung der Datenqualität eine eigene Leistung ist und nicht nebenbei beim Aufbereiten passiert."
          ],
          remember: "Describe → Inspect → Prepare → Judge. Beschreiben vor Transformieren, Beurteilen zum Schluss. Ziel ist Verstehen, nicht Putzen."
        },
        {
          type: "checkpoint",
          id: "cp-case",
          title: "Checkpoint: Der Fall und das Ziel",
          questions: [
            {
              id: "probleme",
              type: "multi",
              prompt: "Welche Probleme nennt die Vorlesung konkret zum Eröffnungs-Datensatz?",
              options: [
                "35 % der Creatinine-Werte fehlen",
                "Nur 3 % der Aufnahmen führen zu einer Readmission",
                "830 bpm erscheint als Herzfrequenz",
                "Für Creatinine werden zwei verschiedene Einheiten verwendet",
                "70 % der positiven Outcomes stammen von einem Standort",
                "Der Datensatz ist mit 10'000 Aufnahmen zu klein für ein Modell"
              ],
              correct: [0, 1, 2, 3, 4],
              explanation: "Die Datensatzgrösse wird nirgends als Problem genannt. Die fünf anderen Punkte sind genau die fünf Befunde auf Folie 6."
            },
            {
              id: "warum-kein-algo",
              type: "single",
              prompt: "Ein Teamkollege schlägt vor, statt Logistic Regression ein Gradient-Boosting-Modell zu nehmen, dann liesse sich die 35-prozentige Missingness „wegtrainieren\". Was stimmt daran nicht?",
              options: [
                "Die Missingness liegt in den Daten und ihrem Entstehungsprozess, nicht im Modell. Ein anderer Algorithmus ändert nicht, warum die Werte fehlen",
                "Gradient Boosting ist für klinische Daten grundsätzlich ungeeignet",
                "Der Vorschlag wäre richtig, sofern genug Trainingsdaten vorhanden sind",
                "Missingness ist nur ein Problem bei kategorialen Variablen"
              ],
              correct: 0,
              explanation: "Genau das ist der rote Satz auf Folie 6 und später Take-Home 06. Ob ein Wert fehlt, weil der Test klinisch nicht angezeigt war oder weil die Extraktion versagt hat, ist eine Frage an die Daten."
            },
            {
              id: "vier-schritte",
              type: "order",
              prompt: "Bringe die vier Arbeitsschritte der Learning Objectives in die richtige Reihenfolge.",
              items: [
                "Describe: Patienten, Variablen und Verteilungen beschreiben",
                "Inspect: Missingness, ungewöhnliche Werte und Zusammenhänge untersuchen",
                "Prepare: Variablen aufbereiten, ohne ihre Bedeutung zu verändern",
                "Judge: beurteilen, ob die Daten für die geplante AI-Aufgabe bereit sind"
              ],
              explanation: "Describe → Inspect → Prepare → Judge. Beschreiben kommt vor dem Transformieren, die Beurteilung steht am Schluss."
            },
            {
              id: "ziel",
              type: "type",
              prompt: "Ergänze den Satz der Folie: Das Ziel ist nicht einfach, einen ... Datensatz zu produzieren. (ein Wort)",
              accept: ["clean", "sauberen", "sauber", "cleanen", "reinen"],
              placeholder: "ein Wort",
              explanation: "„The goal is not simply to produce a clean dataset.\" Es geht darum zu verstehen, was die Daten darstellen und ob sie die Frage beantworten können."
            }
          ]
        },

        /* ================= Block 2: Folien 8–9 ================= */
        {
          type: "slide",
          title: "Folie 8 — Unit of Observation: Was stellt eine Zeile dar?",
          body: [
            { callout: { tone: "def", title: "Unit of Observation", text: "Die Unit of Observation legt fest, wofür eine Zeile, ein Record oder ein Sample im Datensatz steht. Sie wird bestimmt, **bevor** man Samples zählt oder Variablen analysiert." } },
            "Die Folie nennt vier typische Möglichkeiten, und sie sind nicht austauschbar:",
            { cards: [
              { title: "Patient", text: "eine Person" },
              { title: "Encounter", text: "eine Spitalaufnahme oder ein klinischer Besuch" },
              { title: "Image", text: "eine bildgebende Untersuchung oder Aufnahme" },
              { title: "Measurement", text: "eine einzelne Beobachtung zu einem bestimmten Zeitpunkt" }
            ] },
            "Jetzt das Zahlenbeispiel der Folie. Ein Patient, vier Spitalaufenthalte, zwölf Labormessungen:",
            { table: {
              caption: "Wie sich dieselbe Realität je nach Unit of Observation zählt",
              head: ["Unit of Observation", "Zeilen im Datensatz", "Unabhängige Patienten"],
              rows: [
                ["Patient", "1", "1"],
                ["Encounter", "4", "1"],
                ["Measurement", "12", "1"]
              ],
              marks: { "2,1": "focus", "2,2": "focus" },
              note: "Die Folie wählt Measurement: Dataset size 12 Measurement Records, Independent patients 1."
            } },
            { callout: { tone: "exam", title: "Warum das prüfungsrelevant ist", text: "Die Anzahl Zeilen ist nicht notwendigerweise die Anzahl unabhängiger Patienten. Statistik und Machine Learning setzen oft unabhängige Beobachtungen voraus. Zwölf Zeilen derselben Person lassen den Datensatz grösser und aussagekräftiger wirken, als er ist." } },
            { reveal: {
              question: "Ein Kollege sagt: „Wir haben 50'000 Röntgenbilder, das reicht locker für ein Deep-Learning-Modell.\" Welche eine Rückfrage stellst du zuerst?",
              label: "Rückfrage prüfen",
              answer: [
                "**Von wie vielen Patienten stammen diese 50'000 Bilder?**",
                "Wenn 50'000 Bilder von 50'000 Personen stammen, ist das etwas völlig anderes, als wenn sie von 3'000 Personen mit je mehreren Aufnahmen stammen. Im zweiten Fall sind viele Bilder miteinander verwandt, und wenn Bilder derselben Person auf Training und Test verteilt werden, misst man die Leistung massiv zu optimistisch.",
                "Genau das meint der Merksatz der Folie: Bevor du fragst „Wie viele Samples haben wir?\", frag „Was stellt ein Sample dar?\"."
              ]
            } }
          ],
          remember: "Unit of Observation = was eine Zeile darstellt (Patient, Encounter, Image, Measurement). Zeilenzahl ≠ Anzahl unabhängiger Patienten. 1 Patient, 4 Aufenthalte, 12 Messungen → 12 Records, 1 Patient."
        },
        {
          type: "slide",
          title: "Folie 9 — Eine Variable ist mehr als ein Spaltenname",
          body: [
            "Ein Wert in einem Healthcare-Datensatz fällt nicht vom Himmel. Er ist das Ergebnis eines **klinischen**, eines **Mess-** und eines **Dokumentationsprozesses**. Die Folie führt das an einem einzigen Wert vor: **CREATININE = 120**.",
            { reveal: {
              question: "Bevor du weiterliest: Ist Creatinine = 120 ein normaler Wert oder ein Ausreisser?",
              label: "Auflösung",
              answer: [
                "Die Frage lässt sich **nicht beantworten**, und genau das ist der Punkt der Folie.",
                "In **mg/dL** wäre 120 ein absurd hoher Wert, typische Werte liegen dort um 1.0. In **µmol/L** ist 120 dagegen ein ganz normaler Wert. Ohne Einheit ist die Zahl bedeutungslos.",
                "Und das war erst eine von fünf nötigen Angaben. Es fehlen auch noch Zeitpunkt, Messverfahren und der Grund der Messung."
              ]
            } },
            "Daraus werden fünf Fragen, die du dir zu **jeder wichtigen Variable** stellen sollst:",
            { cards: [
              { title: "Meaning", text: "Was stellt die Variable tatsächlich dar? Hier: Serum-Kreatinin-Konzentration als Indikator der Nierenfunktion." },
              { title: "Measurement", text: "Wie wurde sie gemessen oder erfasst? Hier: per Labor-Assay." },
              { title: "Timing", text: "Wann, relativ zum klinischen Ereignis und zum geplanten Vorhersagezeitpunkt? Bei Aufnahme, nach Behandlung oder später im Aufenthalt?" },
              { title: "Clinical context", text: "Warum wurde gemessen? War die Messung Routine oder wegen eines konkreten Verdachts angeordnet?" },
              { title: "Availability", text: "Wäre diese Information zum Zeitpunkt der Vorhersage überhaupt schon bekannt?" }
            ] },
            { callout: { tone: "exam", title: "Die zwei Dimensionen mit der grössten Tragweite", text: "**Measurement** und **Clinical context** erklären das Einheitenproblem und die informative Missingness aus dem Eröffnungsfall. **Availability** ist die Brücke zu jedem Prediction Task: Eine Variable, die erst später bekannt wird, darf nicht in ein Modell, das früher entscheiden soll." } }
          ],
          remember: "Fünf Fragen pro Variable: Meaning, Measurement, Timing, Clinical context, Availability. CREATININE = 120 ist ohne Einheit und Zeitpunkt nicht interpretierbar."
        },
        {
          type: "checkpoint",
          id: "cp-observe",
          title: "Checkpoint: Beobachtungseinheit und Variablen",
          questions: [
            {
              id: "zeilen",
              type: "single",
              prompt: "Ein Datensatz enthält 12 Labormessungen von 1 Patient mit 4 Aufenthalten, eine Zeile pro Messung. Wie viele unabhängige Patienten sind das?",
              options: ["1", "4", "12", "16"],
              correct: 0,
              explanation: "Dataset size ist 12 Measurement Records, die Zahl unabhängiger Patienten ist 1."
            },
            {
              id: "unit-begriff",
              type: "type",
              prompt: "Wie heisst der Fachbegriff dafür, was eine Zeile im Datensatz darstellt? (englischer Begriff von Folie 8)",
              accept: ["unit of observation", "the unit of observation", "unit-of-observation", "beobachtungseinheit"],
              placeholder: "englischer Fachbegriff",
              explanation: "Die Unit of Observation definiert, wofür eine Zeile, ein Record oder ein Sample steht."
            },
            {
              id: "dimension-zuordnen",
              type: "multi",
              prompt: "Welche Rückfragen gehören zur Dimension **Availability**?",
              options: [
                "Wäre der Laborwert zum Zeitpunkt der Vorhersage schon berichtet gewesen?",
                "Steht die Austrittsdiagnose bei Aufnahme bereits fest?",
                "Wurde der Wert in mg/dL oder in µmol/L erfasst?",
                "Bedeutet die Variable die Serum-Konzentration oder einen Laborindex?"
              ],
              correct: [0, 1],
              explanation: "Die Einheit gehört zu Measurement, die inhaltliche Bedeutung zu Meaning. Availability fragt ausschliesslich, ob die Information am Prediction Time Point bekannt wäre."
            },
            {
              id: "einheit",
              type: "single",
              prompt: "Warum reicht die Angabe „Creatinine = 120\" nicht aus, um den Wert als Ausreisser einzustufen?",
              options: [
                "Ohne Einheit ist unklar, ob 120 ein absurder Wert (mg/dL) oder ein normaler Wert (µmol/L) ist",
                "Weil Kreatinin grundsätzlich keine Ausreisser haben kann",
                "Weil Ausreisser erst ab dem dreifachen Mittelwert zählen",
                "Weil Laborwerte immer in SI-Einheiten vorliegen"
              ],
              correct: 0,
              explanation: "Deshalb nennt die Folie die Einheit ausdrücklich als Teil der Dimension Measurement. Und deshalb ist „zwei Einheiten für Creatinine\" im Eröffnungsfall ein echtes Problem."
            }
          ]
        },

        /* ================= Block 3: Folien 10–11 ================= */
        {
          type: "slide",
          title: "Folien 10–11 — Exploratory Data Analysis als Prozess",
          body: [
            { callout: { tone: "def", title: "Exploratory data analysis (EDA)", text: "Die systematische Untersuchung eines Datensatzes **vor** der formalen Modellierung, mit numerischen Zusammenfassungen und Visualisierungen, um Verteilungen, Zusammenhänge, ungewöhnliche Beobachtungen und mögliche Datenqualitätsprobleme zu verstehen." } },
            "Der Dozent widmet diesem Zyklus zwei Folien, einmal abstrakt und einmal am Beispiel der 830 bpm. Das ist ein deutliches Signal, dass er die **Reihenfolge** geprüft haben will:",
            { flow: { steps: [
              { title: "Look", text: "Was zeigen die Daten? Verteilungen, Häufigkeiten, fehlende Werte, Zusammenhänge. Beispiel: Heart rate = 830 bpm." },
              { title: "Question", text: "Was braucht eine Erklärung? Beispiel: Ist das physiologisch plausibel?" },
              { title: "Verify", text: "Einheiten, Definitionen, Timestamps, Metadaten und die Originalquelle prüfen, bevor man etwas als Fehler erklärt." },
              { title: "Decide", text: "Behalten, korrigieren, transformieren, ausschliessen oder weiter untersuchen, je nach Evidenz." }
            ] } },
            { callout: { tone: "warn", title: "Der Abkürzungsfehler", text: "Der häufigste Fehler ist, **Look** direkt mit **Decide** zu verbinden: „Wert sieht komisch aus, also weg damit.\" Genau dagegen steht **Verify**. Ein extremer Wert kann ein Artefakt sein, aber auch eine echte, klinisch wichtige Beobachtung." } },
            { reveal: {
              question: "Du findest in den Vitaldaten eine Herzfrequenz von 190 bpm bei einer 24-jährigen Patientin. Löschen, behalten oder korrigieren?",
              label: "Begründung aufdecken",
              answer: [
                "Keines davon, jedenfalls nicht sofort. Erst **Verify**.",
                "190 bpm ist anders als 830 bpm physiologisch durchaus möglich, etwa bei einer Tachykardie oder unter starker Belastung. Zu prüfen sind der Quellrecord, der Timestamp, das Messgerät und die Nachbarwerte: Steht der Wert isoliert da oder passt er in einen Verlauf?",
                "Erst danach kommt **Decide**. Und das Ergebnis kann durchaus „behalten\" lauten, weil der Wert eine echte klinische Episode abbildet. Ein automatischer Filter „alles über 180 löschen\" hätte genau diese Information entfernt.",
                "Der Unterschied zu 830 bpm: Dort ist der Wert physiologisch unmöglich, also ist bereits der **Question**-Schritt eindeutig. Trotzdem gilt auch dort Verify, denn die Ursache entscheidet, ob man korrigieren oder ausschliessen soll."
              ]
            } },
            "Der rote Satz auf Folie 11 fasst es zusammen: **EDA ist kein Schritt zum Plots-Produzieren.** Es ist ein Prozess, um zu entscheiden, was die Daten bedeuten und was als Nächstes passieren soll."
          ],
          remember: "EDA = systematische Untersuchung vor dem Modellieren. Look → Question → Verify → Decide. Niemals Look direkt mit Decide verbinden."
        },
        {
          type: "checkpoint",
          id: "cp-eda",
          title: "Checkpoint: EDA-Zyklus",
          questions: [
            {
              id: "eda-ablauf",
              type: "order",
              prompt: "Ordne die vier Schritte des EDA-Prozesses.",
              items: [
                "Look: Verteilungen, Häufigkeiten, fehlende Werte und Zusammenhänge betrachten",
                "Question: unerwartete Muster und auffällige Werte hinterfragen",
                "Verify: Einheiten, Definitionen, Timestamps, Metadaten und Quelldaten prüfen",
                "Decide: behalten, korrigieren, transformieren, ausschliessen oder weiter untersuchen"
              ],
              explanation: "Verify steht bewusst vor Decide: erst prüfen, ob wirklich ein Fehler vorliegt, dann handeln."
            },
            {
              id: "welcher-schritt",
              type: "single",
              prompt: "Du öffnest den Quellrecord im Spitalsystem, um nachzusehen, in welcher Einheit ein Laborwert erfasst wurde. In welchem EDA-Schritt bist du?",
              options: ["Verify", "Look", "Question", "Decide"],
              correct: 0,
              explanation: "Verify bedeutet genau das: Einheiten, Definitionen, Timestamps, Metadaten und die Originalquelle kontrollieren, bevor man etwas als Fehler erklärt."
            },
            {
              id: "eda-zweck",
              type: "multi",
              prompt: "Welche Aussagen über EDA treffen gemäss Vorlesung zu?",
              options: [
                "EDA findet vor der formalen Modellierung statt",
                "EDA nutzt numerische Zusammenfassungen und Visualisierungen",
                "EDA ist ein Prozess zum Entscheiden, nicht ein Schritt zum Plots-Produzieren",
                "EDA ersetzt die Prüfung der Einheiten und Metadaten"
              ],
              correct: [0, 1, 2],
              explanation: "Die Prüfung von Einheiten und Metadaten ist der Verify-Schritt und damit Teil von EDA, nicht etwas, das EDA überflüssig macht."
            },
            {
              id: "fehler-finden",
              type: "single",
              prompt: "Ein Skript entfernt automatisch alle Werte, die mehr als drei Standardabweichungen vom Mittelwert abweichen. Welcher EDA-Schritt wird dabei übersprungen?",
              options: [
                "Verify",
                "Look",
                "Question",
                "Es wird kein Schritt übersprungen"
              ],
              correct: 0,
              explanation: "Das Skript springt von der Auffälligkeit direkt zur Entscheidung. Niemand hat Einheit, Quelldatensatz oder Messprozess geprüft, also fehlt Verify."
            }
          ]
        },

        /* ================= Block 4: Folien 13–15 und 18–19 (Einordnung, kurz) ================= */
        {
          type: "slide",
          title: "Folien 13–15 und 18–19 — Kurz eingeordnet: Modell und Notation",
          body: [
            "Diese Folien sind Wiederholung und liefern nur den Rahmen für das, was gleich kommt. Entsprechend kurz:",
            "Ein Modell lernt ein **Mapping** von einem Input auf einen Output, geschrieben `f_w({x_i}) = y_i`. Das `w` sind die Gewichte, also das, was gelernt wird. Im Folienbeispiel geht ein Hundebild hinein und es kommen Scores für Dog, Cat, Wolf und so weiter heraus.",
            { formula: {
              main: "D = { x_i ∈ ℝ^d , y_i ∈ ℝ }   für i = 1 … n",
              parts: [
                { label: "n", text: "Anzahl Beobachtungen im Datensatz" },
                { label: "d", text: "Anzahl numerischer Merkmale pro Beobachtung, also die Dimension des Feature-Vektors" },
                { label: "x_i", text: "die Features, die Eingangsspalten" },
                { label: "y_i", text: "das Label beziehungsweise die Class, die Zielspalte" }
              ],
              note: "Im Beispiel der Folie: 1500 Zeilen eines Diabetes-Datensatzes mit Glucose, Blood Pressure, Skin Thickness, Insulin, BMI und Age als Features und Diabetes oder Healthy als Label."
            } },
            { callout: { tone: "tip", title: "Was du hier wirklich mitnehmen musst", text: "Das Modell sieht **Zahlen**, keine klinische Bedeutung. Dass 120 in µmol/L normal und in mg/dL absurd ist, weiss es nicht. Deshalb ist die Art, wie wir Variablen in Zahlen überführen und skalieren, eine Modellierungsentscheidung und keine Formalie." } }
          ],
          remember: "f_w(x) = y. In D = {x_i ∈ ℝ^d, y_i ∈ ℝ}: n Beobachtungen, d Features, Label y. Das Modell sieht nur Zahlen, nicht Bedeutung."
        },

        /* ================= Block 5: Folien 16–23 Feature Scaling ================= */
        {
          type: "slide",
          title: "Folien 16–17 — Warum skalieren, und was Scaling nicht tut",
          body: [
            "Healthcare-Variablen unterscheiden sich stark in Zahlenbereich und Einheit:",
            { table: {
              caption: "Drei Variablen, drei Grössenordnungen",
              head: ["Variable", "Beispielwert", "Typische Grössenordnung"],
              rows: [
                ["Age", "67 Jahre", "Zehner"],
                ["Glucose", "148 mg/dL", "Hunderter"],
                ["BMI", "33.6 kg/m²", "Zehner"]
              ]
            } },
            { callout: { tone: "warn", title: "Der Note-Kasten der Folie", text: "Ein grösserer Zahlenbereich bedeutet **nicht**, dass eine Variable klinisch wichtiger ist. Glucose ist nicht zehnmal relevanter als BMI, nur weil die Zahlen grösser sind. Für skalensensitive Modelle kann dieser reine Grössenunterschied die Ergebnisse trotzdem verzerren." } },
            { callout: { tone: "def", title: "Feature Scaling", text: "Feature Scaling verändert die **numerische Repräsentation** der Variablen, **ohne zu verändern, was sie darstellen**. Age bleibt Age, nur die Zahlenskala wird angeglichen." } },
            "Das Verfahren der Vorlesung ist **Min–Max-Scaling**:",
            { formula: {
              main: "x_scaled = ( x − x_min ) / ( x_max − x_min )",
              parts: [
                { label: "Zähler", text: "wie weit der Wert über dem beobachteten Minimum liegt" },
                { label: "Nenner", text: "die gesamte beobachtete Spannweite" },
                { label: "Resultat", text: "Werte im Intervall 0 bis 1. Genau am Minimum ergibt 0, genau am Maximum ergibt 1" }
              ],
              note: "Folienbeispiel: Age reicht von 20 bis 80 Jahren. Für eine 50-jährige Person ergibt (50 − 20) / (80 − 20) = 0.50."
            } },
            "Probier die Formel selbst aus. Schieb den Regler einmal ganz nach links und ganz nach rechts und schau, was mit dem Resultat passiert:",
            { sim: { kind: "minmax", label: "Age im Entwicklungsdatensatz, Min 20 und Max 80", min: 20, max: 80, start: 50, unit: "Jahre", note: "Am Minimum wird der Zähler null, also ist das Resultat 0. Am Maximum sind Zähler und Nenner gleich, also 1." } }
          ],
          remember: "x_scaled = (x − x_min) / (x_max − x_min), Resultat zwischen 0 und 1. Scaling ändert die Darstellung, nicht die Bedeutung. Grösserer Zahlenbereich heisst nicht klinisch wichtiger."
        },
        {
          type: "slide",
          title: "Folien 20–23 — Min–Max Schritt für Schritt am Diabetes-Datensatz",
          body: [
            "Die Folien 20 bis 23 bauen die Rechnung langsam auf, genau in der Reihenfolge, in der du sie selbst durchführen würdest. Schritt 1 und 2: pro Spalte das Minimum und das Maximum bestimmen.",
            { table: {
              caption: "Ausschnitt des Datensatzes mit den Min- und Max-Zeilen der Folien 20 bis 22",
              head: ["ID", "Glucose", "Blood Pressure", "Skin Thickness", "Insulin", "BMI", "Age", "Label"],
              rows: [
                ["1", "148", "72", "35", "0", "33.6", "50", "Diabetes"],
                ["2", "85", "66", "29", "0", "26.6", "31", "Healthy"],
                ["3", "89", "66", "23", "94", "28.1", "21", "Healthy"],
                ["502", "117", "90", "19", "71", "25.2", "21", "Healthy"],
                ["1499", "126", "60", "0", "0", "30.1", "47", "Diabetes"],
                ["1500", "93", "70", "31", "0", "30.4", "23", "Healthy"],
                ["Min", "85", "60", "0", "0", "25.2", "21", "–"],
                ["Max", "148", "90", "35", "193", "33.6", "50", "–"]
              ],
              marks: { "6,1": "warn", "6,2": "warn", "6,3": "warn", "6,4": "warn", "6,5": "warn", "6,6": "warn", "7,1": "focus", "7,2": "focus", "7,3": "focus", "7,4": "focus", "7,5": "focus", "7,6": "focus" },
              note: "Gelb die Min-Zeile, blau die Max-Zeile. Insulin 193 stammt aus einer hier nicht gezeigten Zeile des vollen Datensatzes."
            } },
            "Schritt 3: jede Zelle in den Bruch einsetzen. Die Folie schreibt das direkt in die Tabelle. Zwei Beispiele:",
            { table: {
              caption: "Zwei durchgerechnete Zellen",
              head: ["Zelle", "Rechnung", "Resultat"],
              rows: [
                ["Patient 1, Glucose = 148", "(148 − 85) / (148 − 85)", "1.00"],
                ["Patient 502, Glucose = 117", "(117 − 85) / (148 − 85) = 32 / 63", "≈ 0.51"]
              ],
              marks: { "0,2": "good", "1,2": "good" }
            } },
            { reveal: {
              question: "Rechne selbst: Patient 2 hat Age = 31. Die Spalte Age hat Min 21 und Max 50. Welcher skalierte Wert kommt heraus?",
              label: "Rechnung prüfen",
              answer: [
                "(31 − 21) / (50 − 21) = **10 / 29 ≈ 0.34**",
                "Kontrolle: 31 liegt näher beim Minimum 21 als beim Maximum 50, also muss das Resultat unter 0.5 liegen. Passt."
              ]
            } },
            { callout: { tone: "warn", title: "Spot the mistake in den Daten", text: "Schau dir die Min-Zeile genauer an: **Skin Thickness** und **Insulin** haben beide das Minimum **0**. Eine Hautfaltendicke oder ein 2-Stunden-Serum-Insulin von exakt 0 ist physiologisch nicht plausibel. Das ist mit hoher Wahrscheinlichkeit ein kodierter fehlender Wert, und genau der Typ Befund, den der EDA-Schritt **Question** auslösen soll. Nimmt man die 0 unbesehen als Minimum, verzerrt das die gesamte Skalierung dieser Spalte." } },
            "Und ein Detail, das man leicht übersieht: Min und Max sind **beobachtete** Werte, keine Naturkonstanten. Sie hängen davon ab, welche Daten gerade im Datensatz liegen. Genau deshalb kommt bei den Take-Home Messages noch eine Regel dazu, aus welchen Daten sie geschätzt werden dürfen."
          ],
          remember: "Glucose Min 85, Max 148. Age Min 21, Max 50. (117 − 85) / (148 − 85) ≈ 0.51. Min und Max sind beobachtete Werte, kodierte Nullen verzerren sie."
        },
        {
          type: "checkpoint",
          id: "cp-scaling",
          title: "Checkpoint: Feature Scaling",
          questions: [
            {
              id: "rechnung",
              type: "type",
              prompt: "Glucose hat Min = 85 und Max = 148. Welchen skalierten Wert erhält Glucose = 117? (zwei Nachkommastellen)",
              accept: ["0.51", "0,51", "0.508", "ca. 0.51", "rund 0.51"],
              placeholder: "z. B. 0.42",
              explanation: "(117 − 85) / (148 − 85) = 32 / 63 ≈ 0.51."
            },
            {
              id: "intervall",
              type: "single",
              prompt: "Auf welches Intervall bildet Min–Max-Scaling die Werte des Entwicklungsdatensatzes ab?",
              options: ["0 bis 1", "−1 bis +1", "0 bis 100", "Mittelwert 0 und Standardabweichung 1"],
              correct: 0,
              explanation: "Die Folie hält als Result ausdrücklich fest: values are mapped to the interval 0 to 1."
            },
            {
              id: "was-scaling-tut",
              type: "multi",
              prompt: "Welche Aussagen zum Feature Scaling stimmen?",
              options: [
                "Es verändert die numerische Repräsentation, ohne zu verändern, was die Variablen darstellen",
                "Ein grösserer Zahlenbereich bedeutet, dass eine Variable klinisch wichtiger ist",
                "Preprocessing-Parameter werden nur auf den Trainingsdaten geschätzt",
                "Nach dem Scaling muss die Datenqualität nicht mehr geprüft werden"
              ],
              correct: [0, 2],
              explanation: "Der Note-Kasten auf Folie 16 widerlegt Aussage 2, Take-Home 06 widerlegt Aussage 4."
            },
            {
              id: "nullen",
              type: "single",
              prompt: "In der Spalte Skin Thickness ist das Minimum 0. Was ist daran verdächtig, und was folgt daraus für die Skalierung?",
              options: [
                "Eine Hautfaltendicke von 0 ist physiologisch unplausibel, vermutlich ein kodierter fehlender Wert. Als Minimum verzerrt er die ganze Spalte",
                "Nichts, 0 ist ein gültiges Minimum und daher unproblematisch",
                "Die Spalte muss gelöscht werden, sobald eine 0 vorkommt",
                "Die 0 verschiebt nur den Mittelwert, nicht die Skalierung"
              ],
              correct: 0,
              explanation: "Da x_min direkt in Zähler und Nenner steht, zieht ein falsches Minimum alle skalierten Werte dieser Spalte mit. Erst Verify, dann skalieren."
            },
            {
              id: "notation",
              type: "type",
              prompt: "In D = {x_i ∈ ℝ^d, y_i ∈ ℝ} für i = 1…n: Wofür steht d?",
              accept: [
                "Anzahl Features", "die Anzahl Features", "Anzahl der Features", "Anzahl Merkmale",
                "Anzahl Features pro Beobachtung", "Dimension des Feature-Vektors", "Anzahl Feature", "features"
              ],
              placeholder: "kurze Antwort",
              explanation: "d ist die Dimension des Feature-Vektors, also die Anzahl numerischer Merkmale pro Beobachtung. n ist die Anzahl Beobachtungen."
            }
          ]
        },

        /* ================= Block 6: Folien 25–33 Visualisierung ================= */
        {
          type: "slide",
          title: "Folien 25, 28, 30, 32 — Erst die Frage, dann der Plot",
          body: [
            "Der Dozent baut dieselbe Übersicht über **vier Folien** Feld für Feld auf. Das ist das deutlichste Prüfungssignal der ganzen Vorlesung. Die Leitidee steht jedes Mal oben: **Eine nützliche Visualisierung beginnt mit einer Frage, nicht mit einer Plot-Funktion.**",
            { table: {
              caption: "Die Entscheidungsmatrix der Vorlesung",
              head: ["Frage", "Was du wissen willst", "Plot", "Beispiel der Folie"],
              rows: [
                ["DISTRIBUTION", "Wie ist **eine** numerische Variable verteilt?", "Histogram", "Wie sind die Alter der Patienten verteilt?"],
                ["GROUP COMPARISON", "Wie unterscheidet sie sich **zwischen Gruppen**?", "Box plot oder Violin plot", "Unterscheidet sich die Length of Stay zwischen readmitted und non-readmitted?"],
                ["RELATIONSHIP", "Wie variieren **zwei** Variablen zusammen?", "Scatter plot", "Wie hängt Alter mit Length of Stay zusammen?"],
                ["MANY VARIABLES", "Welche von **vielen** bewegen sich gemeinsam?", "Correlation heatmap", "Welche Labormessungen variieren gemeinsam?"]
              ],
              marks: { "0,2": "focus", "1,2": "focus", "2,2": "focus", "3,2": "focus" }
            } },
            { callout: { tone: "exam", title: "Die Merkregel in einer Zeile", text: "Eine Variable → Histogram. Eine Variable über Gruppen → Box plot. Zwei Variablen → Scatter plot. Viele Variablen → Correlation heatmap." } },
            { callout: { tone: "warn", title: "Typischer Fehler", text: "Die Reihenfolge umdrehen: zuerst einen Plot bauen, weil die Funktion gerade zur Hand ist, und danach eine Frage dazu erfinden. So entstehen hübsche Bilder, die nichts entscheiden." } }
          ],
          remember: "Eine Variable → Histogram. Gruppenvergleich → Box plot oder Violin plot. Zwei Variablen → Scatter plot. Viele Variablen → Correlation heatmap. Die Frage bestimmt den Plot."
        },
        {
          type: "slide",
          title: "Folien 26–27 — Histogram, und warum der Mittelwert lügen kann",
          body: [
            "Ein **Histogram** teilt eine numerische Variable in Intervalle, die **Bins**, und zeigt, wie viele Beobachtungen in jedes Intervall fallen.",
            { chart: {
              kind: "histogram",
              caption: "Altersverteilung der Spitalpatienten, nachgebaut mit den Werten der Folie",
              panels: [{ title: "Distribution of patient age", counts: [3, 7, 6, 16, 19, 42, 55, 74, 79, 73, 72, 64, 58, 30, 26, 16, 10], start: 15, step: 5 }],
              xLabel: "Alter in Jahren",
              note: "Jeder Balken zählt die Patienten, deren Alter in das jeweilige Intervall fällt."
            } },
            "Worauf du achten sollst, nennt die Folie in vier Stichworten:",
            { cards: [
              { title: "Centre", text: "Wo konzentrieren sich die meisten Beobachtungen?" },
              { title: "Spread", text: "Wie stark streuen die Werte?" },
              { title: "Shape", text: "Symmetrisch, schief, oder mehrere Gruppen?" },
              { title: "Unusual observations", text: "Gibt es Werte weit weg vom Rest?" }
            ] },
            "Folie 27 zeigt dann, warum das keine Formsache ist. Zwei Kohorten mit **exakt demselben Mittelwert von 60 Jahren**:",
            { chart: {
              kind: "histogram",
              caption: "Gleicher Mittelwert, völlig verschiedene Patientenpopulationen",
              panels: [
                { title: "Kohorte A: um 60 konzentriert", counts: [1, 2, 4, 5, 4, 3, 2, 1], start: 45, step: 5, mean: 60 },
                { title: "Kohorte B: zwei getrennte Gruppen", counts: [2, 3, 2, 1, 0, 0, 0, 1, 2, 3, 2], start: 35, step: 5, mean: 60 }
              ],
              xLabel: "Alter in Jahren"
            } },
            { reveal: {
              question: "Bei Kohorte B liegt die gestrichelte Mittelwertslinie mitten in einer Lücke. Was heisst das praktisch für ein Modell, das auf dieser Kohorte trainiert wird?",
              label: "Konsequenz aufdecken",
              answer: [
                "Der Mittelwert von 60 beschreibt **keinen einzigen typischen Patienten** dieser Kohorte. Die Kohorte besteht faktisch aus zwei Populationen, einer um 40 und einer um 80, die sich klinisch stark unterscheiden dürften.",
                "Für die Modellierung heisst das: Eine Kennzahl wie „mittleres Alter 60\" ist hier irreführend, und ein Modell, das für beide Gruppen dieselbe Beziehung annimmt, passt vermutlich zu keiner der beiden gut. Die Untergruppen sind ein Befund, dem man nachgehen muss, kein Rauschen.",
                "Genau deshalb sagt die Folie: Verteilung anschauen, **bevor** man mit Mittelwert oder Median zusammenfasst. Eine Tabelle mit Mittelwerten hätte diesen Unterschied vollständig verborgen."
              ]
            } }
          ],
          remember: "Histogram = Bins plus Häufigkeiten. Achte auf Centre, Spread, Shape, unusual observations. Gleicher Mittelwert heisst nicht gleiche Population."
        },
        {
          type: "slide",
          title: "Folie 29 — Box plot: Gruppen vergleichen",
          body: [
            "Wenn Patienten zu verschiedenen Gruppen gehören, kann der alleinige Blick auf die Mittelwerte wichtige Unterschiede verbergen. Ein **Box plot** zeigt Zentrum, Streuung und ungewöhnliche Beobachtungen **innerhalb jeder Gruppe**.",
            { chart: {
              kind: "box",
              caption: "Length of stay nach 30-Tage-Readmission-Status, nachgebaut nach der Folie",
              groups: [
                { label: "Not readmitted", low: 0.5, q1: 1.8, median: 3.0, q3: 4.5, high: 8.7, outliers: [9.5, 10, 10.6, 11.2, 12, 12.8, 13.5, 14.4, 15.6, 16.1] },
                { label: "Readmitted", low: 1.8, q1: 3.5, median: 4.9, q3: 6.7, high: 11.0, outliers: [12.1, 12.4, 16.0] }
              ],
              yLabel: "Aufenthaltsdauer in Tagen"
            } },
            { cards: [
              { title: "Median", text: "Die rote Linie in der Box markiert die mittlere Beobachtung." },
              { title: "Interquartile range", text: "Die Box enthält die mittleren 50 % der Beobachtungen." },
              { title: "Whiskers", text: "Sie zeigen den Bereich jenseits der Box gemäss der gewählten Box-Plot-Konvention. Es gibt mehrere übliche Konventionen." },
              { title: "Punkte darüber hinaus", text: "Beobachtungen, die eine Untersuchung verdienen. Nicht automatisch Fehler.", tone: "warn" }
            ] },
            { callout: { tone: "warn", title: "Verbindung zum EDA-Zyklus", text: "Punkte jenseits der Whisker sind ein **Question**-Signal, kein **Decide**-Signal. Sie sind der Anlass zum Nachprüfen, nicht die Begründung zum Löschen." } },
            { reveal: {
              question: "Was liest du aus diesem Plot über den Zusammenhang zwischen Aufenthaltsdauer und Readmission?",
              label: "Interpretation aufdecken",
              answer: [
                "Wieder aufgenommene Patienten hatten tendenziell einen **längeren** Aufenthalt: Der Median liegt bei rund 4.9 statt 3.0 Tagen, und die ganze Box liegt höher.",
                "Vorsicht bei der Formulierung: Das ist ein **Gruppenunterschied**, keine Ursache. Ein längerer Aufenthalt verursacht nicht die Readmission; beides dürfte Ausdruck eines schwereren Krankheitsbildes sein.",
                "Und beachte die Streuung: Die Gruppen überlappen stark. Ein einzelner Patient lässt sich allein über die Aufenthaltsdauer nicht zuverlässig einer Gruppe zuordnen."
              ]
            } }
          ],
          remember: "Box plot: Median = Linie, Box = mittlere 50 % (Interquartilsabstand), Whisker gemäss Konvention, Punkte darüber hinaus beachtenswert aber nicht automatisch Fehler."
        },
        {
          type: "slide",
          title: "Folie 31 — Scatter plot: zwei Variablen zusammen",
          body: [
            "Ein **Scatter plot** zeigt den Zusammenhang zwischen **zwei numerischen Variablen**. Auf jeder Achse liegt eine Variable, und jeder Punkt ist **eine Beobachtung**. Im Beispiel der Folie ist Patientenalter gegen Length of Stay aufgetragen, und jeder Punkt ist eine Spitalaufnahme.",
            "Die Folie nennt vier Dinge, auf die man achten soll. Am schnellsten begreift man sie im direkten Vergleich:",
            { chart: {
              kind: "scatter",
              caption: "Drei Muster im Vergleich (eigene Lernbeispiele, nicht die Zahlen der Folie)",
              panels: [
                { title: "Klare positive Richtung", points: [[1, 2], [2, 2.5], [3, 3.2], [4, 3.8], [5, 5.2], [6, 5.5], [7, 6.8], [8, 7.2], [9, 8.5], [10, 9.1], [2.5, 3], [4.5, 4.6], [6.5, 6.2], [8.5, 8], [3.5, 3.6], [7.5, 7.4]], note: "Direction positiv, Strength hoch, Shape annähernd linear" },
                { title: "Kaum ein Muster", points: [[1, 6], [2, 3], [3, 8], [4, 2], [5, 7], [6, 4], [7, 9], [8, 3], [9, 6], [10, 5], [2.5, 9], [4.5, 5], [6.5, 2], [8.5, 8], [3.5, 4], [7.5, 6]], note: "Breit gestreut, keine erkennbare Richtung" },
                { title: "Deutlich, aber gekrümmt", points: [[1, 20], [2, 12], [3, 6], [4, 2], [5, 0.5], [6, 0.5], [7, 2], [8, 6], [9, 12], [10, 20], [1.5, 16], [3.5, 4], [5.5, 0], [7.5, 4], [9.5, 16], [2.5, 9]], note: "Starker Zusammenhang, aber nicht linear" }
              ]
            } },
            { cards: [
              { title: "Direction", text: "Treten grössere Werte der einen Variable eher mit grösseren oder mit kleineren der anderen auf?" },
              { title: "Strength", text: "Folgen die Beobachtungen einem klaren Muster oder streuen sie breit?" },
              { title: "Shape", text: "Linear, gekrümmt oder komplexer?" },
              { title: "Clusters", text: "Gibt es Gruppierungen? Beachtenswert, aber nicht automatisch Fehler." }
            ] },
            { callout: { tone: "tip", title: "Merk dir das dritte Panel", text: "Es ist gleich auf der nächsten Folie wieder wichtig. Ein klarer Zusammenhang, der nicht linear ist, bleibt in einer Korrelationszahl praktisch unsichtbar." } }
          ],
          remember: "Scatter plot = zwei numerische Variablen, ein Punkt pro Beobachtung. Direction, Strength, Shape, Clusters. Gekrümmte Zusammenhänge sieht man nur hier, nicht in der Korrelationszahl."
        },
        {
          type: "slide",
          title: "Folie 33 — Correlation heatmap: viele Variablen auf einen Blick",
          body: [
            "Bei vielen numerischen Variablen wird es mühsam, jedes Paar einzeln anzusehen: Bei 6 Variablen gibt es bereits 15 Paare. Eine **Correlation heatmap** stellt die Korrelationsmatrix farbig dar und macht viele paarweise Beziehungen auf einmal prüfbar.",
            { chart: {
              kind: "heatmap",
              caption: "Pairwise correlations among numerical variables, mit den Werten der Folie",
              labels: ["Age", "Length of stay", "Heart rate", "Creatinine", "Systolic BP", "Glucose"],
              matrix: [
                [1.00, 0.07, 0.07, 0.17, 0.31, 0.19],
                [0.07, 1.00, 0.01, 0.01, -0.03, 0.12],
                [0.07, 0.01, 1.00, -0.00, 0.07, 0.04],
                [0.17, 0.01, -0.00, 1.00, 0.07, 0.06],
                [0.31, -0.03, 0.07, 0.07, 1.00, 0.03],
                [0.19, 0.12, 0.04, 0.06, 0.03, 1.00]
              ],
              note: "Jede Zelle vergleicht zwei Variablen. Der Wert gibt Richtung und Stärke ihrer linearen Assoziation an."
            } },
            { cards: [
              { title: "Nahe +1", text: "Die beiden Variablen steigen tendenziell gemeinsam." },
              { title: "Nahe −1", text: "Eine fällt tendenziell, während die andere steigt." },
              { title: "Nahe 0", text: "Wenig **lineare** Assoziation.", tone: "warn" },
              { title: "Diagonale", text: "Eine Variable ist perfekt mit sich selbst korreliert, deshalb immer 1." }
            ] },
            "Im Beispiel ist die stärkste Assoziation Age mit Systolic BP bei 0.31, Age mit Glucose liegt bei 0.19 und Heart rate mit Creatinine praktisch bei null.",
            { callout: { tone: "warn", title: "Zwei Fallen, die gern geprüft werden", text: ["**Nahe 0 heisst „wenig lineare Assoziation\", nicht „kein Zusammenhang\".** Erinnere dich an das dritte Scatter-Panel von vorhin: ein klarer U-förmiger Zusammenhang erzeugt eine Korrelation nahe null.", "**Die Folie spricht von Assoziation, nie von Ursache.** Aus 0.31 zwischen Age und Systolic BP folgt kein kausaler Zusammenhang."] } },
            { callout: { tone: "tip", title: "Wofür die Heatmap gut ist", text: "Sie ist ein **Screening-Werkzeug**. Sie zeigt, welche Beziehungen eine genauere Untersuchung mit einem Scatter plot verdienen." } }
          ],
          remember: "Heatmap zeigt Richtung und Stärke der linearen Assoziation. Diagonale immer 1. Nahe 0 heisst wenig lineare Assoziation, nicht kein Zusammenhang. Assoziation ist keine Kausalität."
        },
        {
          type: "checkpoint",
          id: "cp-visual",
          title: "Checkpoint: Visualisierung",
          questions: [
            {
              id: "plotwahl",
              type: "single",
              prompt: "Du willst wissen, ob sich die Length of Stay zwischen readmitted und non-readmitted Patienten unterscheidet. Welcher Plot ist dafür vorgesehen?",
              options: ["Box plot oder Violin plot", "Histogram", "Scatter plot", "Correlation heatmap"],
              correct: 0,
              explanation: "Das ist eine Group comparison: eine numerische Variable über Kategorien hinweg vergleichen."
            },
            {
              id: "boxplot-teile",
              type: "multi",
              prompt: "Welche Aussagen über den Box plot sind korrekt?",
              options: [
                "Die Linie in der Box ist der Median",
                "Die Box enthält die mittleren 50 % der Beobachtungen",
                "Punkte jenseits der Whisker sind automatisch Messfehler",
                "Die Whisker folgen der gewählten Box-Plot-Konvention"
              ],
              correct: [0, 1, 3],
              explanation: "Die Folie sagt ausdrücklich, dass Punkte jenseits der Whisker beachtenswert, aber nicht automatisch Fehler sind."
            },
            {
              id: "zwei-kohorten",
              type: "single",
              prompt: "Zwei Kohorten haben beide Mittelwert 60. Kohorte B besteht aus zwei Gruppen um 40 und 80. Was folgt daraus?",
              options: [
                "Der Mittelwert beschreibt Kohorte B schlecht, weil bei 60 kaum Patienten liegen",
                "Die beiden Kohorten sind gleichwertig, weil der Mittelwert identisch ist",
                "Kohorte B enthält mit Sicherheit Messfehler",
                "Für Kohorte B muss immer der Median statt des Mittelwerts verwendet werden"
              ],
              correct: 0,
              explanation: "Gleicher Mittelwert, völlig verschiedene Populationen. Deshalb Verteilung anschauen, bevor man zusammenfasst."
            },
            {
              id: "nahe-null",
              type: "multi",
              prompt: "Die Heatmap zeigt für zwei Variablen −0.00. Welche Schlüsse sind zulässig?",
              options: [
                "Es besteht wenig lineare Assoziation",
                "Ein nichtlinearer Zusammenhang könnte trotzdem bestehen",
                "Ein Scatter plot der beiden Variablen kann mehr zeigen als diese Zahl",
                "Es ist bewiesen, dass die Variablen nichts miteinander zu tun haben"
              ],
              correct: [0, 1, 2],
              explanation: "Die Folie spricht ausdrücklich von weak linear correlation. Ein U-förmiger Zusammenhang erzeugt eine Korrelation nahe null und wird erst im Scatter plot sichtbar."
            },
            {
              id: "diagonale",
              type: "type",
              prompt: "Welchen Wert haben die Zellen auf der Diagonale einer Correlation heatmap immer?",
              accept: ["1", "1.00", "1.0", "eins", "+1", "genau 1"],
              placeholder: "Zahl",
              explanation: "Eine Variable ist perfekt mit sich selbst korreliert."
            }
          ]
        },

        /* ================= Block 7: Folien 35–40 Sampling ================= */
        {
          type: "slide",
          title: "Folie 35 — Target population, Sampling frame, Sample",
          body: [
            "Wir beobachten fast nie jedes Individuum der Population, die wir verstehen wollen. **Sampling entscheidet, wer in den Datensatz kommt, und damit auch, welche Population unsere Schlussfolgerungen überhaupt repräsentieren können.** Das ist der Grund, warum Sampling in eine Vorlesung über Datenqualität gehört.",
            { flow: { steps: [
              { title: "Target population", text: "Die Population, über die wir Aussagen machen wollen. Beispiel: Erwachsene, die mit Herzinsuffizienz in Schweizer Spitälern aufgenommen werden." },
              { title: "Sampling frame", text: "Die Individuen, die tatsächlich ausgewählt werden könnten. Beispiel: die erfassten, einschliessbaren Aufenthalte der teilnehmenden Spitäler." },
              { title: "Sample", text: "Die Individuen, die am Ende in der Analyse landen. Beispiel: 2'000 ausgewählte Aufenthalte." }
            ], note: "Drei ineinander liegende Kreise: jeder Schritt ist enger als der vorige." } },
            { reveal: {
              question: "Der Sampling frame umfasst nur drei Universitätsspitäler, die Target population sollen aber alle Schweizer Spitäler sein. Welches Problem entsteht, und löst ein grösseres Sample es?",
              label: "Analyse aufdecken",
              answer: [
                "Es entsteht eine Lücke zwischen Target population und Sampling frame. Universitätsspitäler behandeln tendenziell komplexere Fälle, haben andere Ausstattung und andere Prozesse als Regionalspitäler.",
                "**Ein grösseres Sample löst das nicht.** Mehr Patienten aus denselben drei Spitälern machen die Schätzung präziser, aber nicht repräsentativer. Die Verzerrung sitzt im Rahmen, nicht in der Stichprobengrösse.",
                "Verbinde das mit dem Eröffnungsfall: Dass 70 % der positiven Outcomes von einem Standort stammen, ist genau so eine Repräsentativitätsfrage."
              ]
            } }
          ],
          remember: "Target population = über wen wir Aussagen wollen. Sampling frame = wer auswählbar wäre. Sample = wer am Ende drin ist. Ein grösseres Sample repariert keinen schiefen Frame."
        },
        {
          type: "slide",
          title: "Folien 36–37 — Simple random und Systematic random sampling",
          body: [
            "Das Ziel aller vier Verfahren ist dasselbe: eine **repräsentative Teilmenge** einer grösseren Population oder eines grösseren Datensatzes gewinnen. Die Folien führen sie an derselben Tabelle mit zwölf Personen vor.",
            { chart: { kind: "sampling", mode: "simple", caption: "Simple random sampling", note: "Jedes Sample kann mit derselben Wahrscheinlichkeit ausgewählt werden. Kein Attribut spielt eine Rolle, es entscheidet allein der Zufall." } },
            { chart: { kind: "sampling", mode: "systematic", caption: "Systematic random sampling", note: "Die Daten werden nach einem Attribut geordnet, hier nach Alter, und dann wird jedes k-te Element ausgewählt." } },
            { compare: {
              left: { title: "Simple random", points: ["Reiner Zufall", "Keine Ordnung nötig", "Jede Person hat dieselbe Auswahlwahrscheinlichkeit"] },
              right: { title: "Systematic random", points: ["Feste Regel auf einer Ordnung", "Erst nach einem Attribut sortieren", "Dann jedes k-te Element nehmen"] },
              verdict: "Beim Simple random entscheidet nur der Zufall, beim Systematic eine feste Regel auf einer Ordnung."
            } },
            { callout: { tone: "tip", title: "Praxishinweis", text: "Systematic ist oft einfacher umzusetzen, kann aber danebengehen, wenn die Ordnung selbst ein Muster enthält, das zufällig mit dem Abstand k zusammenfällt." } }
          ],
          remember: "Simple random: gleiche Auswahlwahrscheinlichkeit für jedes Sample. Systematic random: nach einem Attribut ordnen und jedes k-te Element nehmen."
        },
        {
          type: "slide",
          title: "Folien 38–40 — Stratified und Cluster random sampling",
          body: [
            "Diese beiden werden am häufigsten verwechselt. Schau dir zuerst die Bilder an, der Unterschied springt sofort ins Auge:",
            { chart: { kind: "sampling", mode: "stratified", caption: "Stratified random sampling", note: "Die Population wird mithilfe bestimmter Attribute in Untergruppen, die Strata, geteilt. Danach wird aus jedem Stratum zufällig gezogen." } },
            { chart: { kind: "sampling", mode: "cluster", caption: "Cluster random sampling", note: "Die Samples werden in Cluster eingeteilt. Danach werden einige Cluster zufällig ausgewählt, und alle Individuen innerhalb der ausgewählten Cluster werden eingeschlossen." } },
            { compare: {
              left: { title: "Stratified", points: ["Teilt in Strata, zum Beispiel nach Nationalität oder Altersgruppe", "Zieht **aus jeder** Gruppe", "Alle Gruppen sind garantiert vertreten", "Ziel: Repräsentativität über alle Untergruppen sichern"] },
              right: { title: "Cluster", points: ["Teilt in Cluster, zum Beispiel nach Spital oder Region", "Nimmt oder verwirft **ganze** Gruppen", "Nicht ausgewählte Cluster fehlen komplett", "Ziel: Erhebung praktisch machbar halten"] },
              verdict: "Merksatz: Stratified zieht aus jeder Gruppe, Cluster nimmt oder verwirft ganze Gruppen."
            } },
            { reveal: {
              question: "Du brauchst 300 Patienten aus zehn Spitälern. Variante A: nach Altersgruppen aufteilen und aus jeder Gruppe zufällig ziehen. Variante B: drei Spitäler zufällig wählen und dort alle Patienten nehmen. Welches Verfahren ist welches, und welches Risiko hat Variante B?",
              label: "Auflösung",
              answer: [
                "Variante A ist **stratified**, Variante B ist **cluster**.",
                "Bei A sind alle Altersgruppen garantiert vertreten. Bei B hängt alles davon ab, welche drei Spitäler du erwischst: Sind es zufällig drei städtische Zentrumsspitäler, fehlen ländliche Versorgungsmuster komplett im Datensatz.",
                "Das ist exakt das Problem aus dem Eröffnungsfall, in dem 70 % der positiven Outcomes von einem Standort stammten."
              ]
            } },
            { callout: { tone: "warn", title: "Achtung, Fehler auf der Übersichtsfolie 40", text: "Dort wiederholt der Bullet zu Stratified random sampling versehentlich den Wortlaut von Cluster random sampling („divide the samples into clusters …\"). Die korrekte Definition ist die der eigenen Folie 38: in Strata unterteilen und **aus jedem Stratum** zufällig ziehen. Lerne die Version von Folie 38." } }
          ],
          remember: "Stratified: in Strata teilen und aus jedem Stratum ziehen. Cluster: Cluster bilden, einige zufällig auswählen, dort alle einschliessen. Folie 40 enthält beim Stratified-Bullet einen Textfehler, gültig ist Folie 38."
        },
        {
          type: "checkpoint",
          id: "cp-sampling",
          title: "Checkpoint: Sampling",
          questions: [
            {
              id: "drei-begriffe",
              type: "order",
              prompt: "Ordne die drei Sampling-Begriffe vom weitesten zum engsten Kreis.",
              items: ["Target population", "Sampling frame", "Sample"],
              explanation: "Target population (über wen wir Aussagen wollen) → Sampling frame (wer auswählbar wäre) → Sample (wer am Ende drin ist)."
            },
            {
              id: "systematic",
              type: "single",
              prompt: "Alle Aufenthalte werden nach Alter sortiert, danach wird jeder 5. Datensatz ausgewählt. Welches Verfahren ist das?",
              options: ["Systematic random sampling", "Simple random sampling", "Stratified random sampling", "Cluster random sampling"],
              correct: 0,
              explanation: "Nach einem Attribut ordnen und jedes k-te Element ziehen ist genau die Definition von systematic random sampling."
            },
            {
              id: "stratified-cluster",
              type: "multi",
              prompt: "Welche Aussagen über Stratified und Cluster random sampling sind korrekt?",
              options: [
                "Bei Stratified wird aus jedem Stratum zufällig gezogen",
                "Bei Cluster werden einige Cluster zufällig gewählt und darin alle Individuen eingeschlossen",
                "Bei Stratified werden ganze Gruppen komplett übernommen oder komplett weggelassen",
                "Bei Cluster ist garantiert, dass jede Untergruppe im Sample vorkommt"
              ],
              correct: [0, 1],
              explanation: "Aussage 3 beschreibt Cluster, nicht Stratified. Aussage 4 gilt für Stratified: Nur dort wird aus jeder Gruppe gezogen."
            },
            {
              id: "frame-luecke",
              type: "single",
              prompt: "Der Sampling frame deckt nur Universitätsspitäler ab, die Target population wären alle Schweizer Spitäler. Was hilft?",
              options: [
                "Den Sampling frame erweitern, damit auch Regionalspitäler ausgewählt werden können",
                "Das Sample von 2'000 auf 20'000 Aufenthalte vergrössern",
                "Ein komplexeres Modell wählen, das die Verzerrung ausgleicht",
                "Die Zielpopulation nachträglich als repräsentativ deklarieren"
              ],
              correct: 0,
              explanation: "Die Verzerrung sitzt im Rahmen, nicht in der Stichprobengrösse. Mehr Daten aus denselben Spitälern machen die Schätzung präziser, aber nicht repräsentativer."
            },
            {
              id: "simple",
              type: "type",
              prompt: "Wie heisst das Verfahren, bei dem jedes Sample mit derselben Wahrscheinlichkeit ausgewählt werden kann? (englischer Begriff)",
              accept: ["simple random sampling", "simple random", "einfache Zufallsstichprobe", "simple random sample"],
              placeholder: "englischer Fachbegriff",
              explanation: "Simple random sampling: every sample can be selected with the same probability."
            }
          ]
        },

        /* ================= Block 8: Folien 42–43 und Abschluss ================= */
        {
          type: "slide",
          title: "Folien 42–43 — Die sechs Take-Home Messages",
          body: [
            "Die Zusammenfassung steht unter zwei Überschriften: **Understand the data before changing the data** (Folie 42) und **Prepare the data without losing their meaning** (Folie 43).",
            { table: {
              caption: "Die sechs Messages auf einen Blick",
              head: ["#", "Message", "Kern in einem Satz"],
              rows: [
                ["01", "Start with what an observation represents", "Eine Zeile ist nicht automatisch ein Patient, und wiederholte Beobachtungen derselben Person sind verwandt."],
                ["02", "Look at distributions, not only summary statistics", "Ein Mittelwert kann die Patienten verbergen. Shape, Spread, Untergruppen und Auffälligkeiten prüfen."],
                ["03", "Missing and unusual values require explanation", "Nicht korrigieren, bevor du verstanden hast, warum die Daten ungewöhnlich aussehen."],
                ["04", "Visualisation should answer a question", "Den Plot nach dem wählen, was du lernen willst."],
                ["05", "Preprocessing is a modelling decision", "Bedeutung erhalten und Preprocessing-Parameter **nur mit den Trainingsdaten** schätzen."],
                ["06", "Data readiness comes before model selection", "Ein besserer Algorithmus repariert keinen schlecht definierten Datensatz."]
              ],
              marks: { "4,1": "focus", "4,2": "focus", "5,1": "focus", "5,2": "focus" }
            } },
            { callout: { tone: "exam", title: "Take-Home 05 ist die häufigste Falle", text: "Wer Min und Max über den **ganzen** Datensatz berechnet und erst danach in Training und Test teilt, lässt Information aus dem Testsatz in die Transformation fliessen. Die gemessene Leistung ist dann zu optimistisch. Richtig ist: erst splitten, dann die Parameter nur auf den Trainingsdaten bestimmen und mit genau diesen Werten auch Validierungs- und Testdaten transformieren." } },
            { reveal: {
              question: "Wenn x_min und x_max nur aus den Trainingsdaten stammen: Was passiert mit einem Testwert, der grösser ist als das Trainings-Maximum?",
              label: "Konsequenz aufdecken",
              answer: [
                "Er erhält einen skalierten Wert **grösser als 1**. Das folgt direkt aus der Formel: Ist x grösser als x_max, wird der Zähler grösser als der Nenner.",
                "Das ist korrekt und erwartet, kein Fehler. Es wäre falsch, deswegen nachträglich das Maximum aus den Testdaten zu übernehmen, denn genau damit hätte man wieder Information aus dem Testsatz eingeschleust.",
                "Für die Praxis heisst das nur: Modelle sollten mit Werten leicht ausserhalb von 0 bis 1 umgehen können, und man sollte wissen, wie oft das vorkommt."
              ]
            } },
            "Take-Home 06 schliesst den Bogen zum Eröffnungsfall: Genau deshalb löst kein besserer Algorithmus die fünf Probleme von Folie 6. Zu prüfen sind laut Folie **Sampling, Repräsentativität, Missingness, Klassenbalance, Messkonsistenz und Informationsverfügbarkeit**, bevor die Modellfrage gestellt wird."
          ],
          remember: "01 Beobachtung klären, 02 Verteilungen statt nur Kennzahlen, 03 Fehlendes und Auffälliges erklären, 04 Plot nach Frage wählen, 05 Preprocessing-Parameter nur aus Trainingsdaten, 06 Data readiness vor Modellwahl."
        },
        {
          type: "slide",
          title: "Das muss ich nach Vorlesung 3 können",
          body: [
            "Hak ab, was du jetzt wirklich kannst. Was offen bleibt, weisst du, wo du es nachlesen musst.",
            { checklist: { title: "Kann ich das jetzt?", items: [
              "Ich kann erklären, was eine **Unit of Observation** ist, und warum 12 Zeilen nicht 12 unabhängige Patienten bedeuten.",
              "Ich kann die fünf Fragen zu einer Variable nennen: Meaning, Measurement, Timing, Clinical context, Availability.",
              "Ich kann den **EDA-Zyklus** in richtiger Reihenfolge erklären und sagen, warum Verify vor Decide steht.",
              "Ich kann die **Min–Max-Formel** aufschreiben und einen Wert von Hand ausrechnen.",
              "Ich kann begründen, warum ein grösserer Zahlenbereich keine höhere klinische Wichtigkeit bedeutet.",
              "Ich kann zu einer gegebenen Frage den passenden Plot wählen und meine Wahl begründen.",
              "Ich kann einen **Box plot** lesen: Median, Interquartilsabstand, Whisker, Punkte darüber hinaus.",
              "Ich kann erklären, warum eine Korrelation nahe 0 keinen fehlenden Zusammenhang beweist.",
              "Ich kann **Target population**, **Sampling frame** und **Sample** unterscheiden.",
              "Ich kann **Stratified** von **Cluster** sampling unterscheiden und je ein Beispiel geben.",
              "Ich kann erklären, warum Preprocessing-Parameter nur aus den Trainingsdaten geschätzt werden.",
              "Ich kann begründen, warum ein besserer Algorithmus einen schlecht definierten Datensatz nicht repariert."
            ] } }
          ],
          remember: "Zwölf Punkte. Was nicht abgehakt ist, kommt auf den Wiederholungsstapel."
        },
        {
          type: "slide",
          title: "Transfer: vier Szenarien zum Selberdenken",
          body: [
            "Diese Fälle stehen so nicht auf den Folien. Sie verbinden mehrere Konzepte, und genau das wird in Prüfungen gern verlangt. Denk jeweils erst selbst nach.",
            { reveal: {
              question: "**Szenario 1.** Ein Modell zur Readmission-Vorhersage erreicht im Test 94 % Accuracy. Im Datensatz sind 3 % Readmissions. Dein Teamkollege ist begeistert. Was sagst du?",
              label: "Antwort aufdecken",
              answer: [
                "Bei 3 % positiver Klasse erreicht ein Modell, das **immer „keine Readmission\" sagt**, schon 97 % Accuracy. 94 % sind also schlechter als dieses triviale Modell.",
                "Das ist die Folge des Klassenungleichgewichts aus dem Eröffnungsfall. Take-Home 06 nennt **class balance** ausdrücklich als Prüfpunkt vor der Modellwahl.",
                "Die Konsequenz liegt nicht im Algorithmus, sondern in der Fragestellung und der Metrik: Accuracy ist hier das falsche Mass."
              ]
            } },
            { reveal: {
              question: "**Szenario 2.** Ein Kollege rechnet die Korrelationsmatrix, findet überall Werte unter 0.2 und schliesst: „Die Variablen sind unabhängig, wir können jede einzeln betrachten.\" Wo liegt der Denkfehler, und was tust du stattdessen?",
              label: "Antwort aufdecken",
              answer: [
                "Die Korrelation misst nur die **lineare** Assoziation. Werte nahe 0 schliessen nichtlineare Zusammenhänge nicht aus, und „unabhängig\" ist eine deutlich stärkere Aussage als „nicht linear korreliert\".",
                "Stattdessen: Für die fachlich plausibelsten Paare je einen **Scatter plot** ansehen. Die Heatmap ist ein Screening-Werkzeug, kein Beweismittel.",
                "Denk an das dritte Scatter-Panel: Eine saubere U-Form erzeugt eine Korrelation nahe null."
              ]
            } },
            { reveal: {
              question: "**Szenario 3.** Ein Datensatz enthält 8'000 EKG-Aufnahmen von 1'200 Patienten. Das Team splittet zufällig 80 / 20 nach Aufnahmen und erzielt hervorragende Testwerte. Welche zwei Konzepte dieser Vorlesung greifen hier, und was ist passiert?",
              label: "Antwort aufdecken",
              answer: [
                "Erstens **Unit of Observation**: Eine Zeile ist hier eine Aufnahme, nicht ein Patient. 8'000 Aufnahmen sind nur 1'200 unabhängige Patienten.",
                "Zweitens die Folge daraus: Beim zufälligen Split nach Aufnahmen landen Aufnahmen **derselben Person** in Training und Test. Das Modell kann die Person wiedererkennen statt die Krankheit, und die Testwerte sind zu optimistisch.",
                "Richtig wäre ein Split **nach Patient**, sodass keine Person in beiden Teilen vorkommt. Das ist dieselbe Logik wie bei Take-Home 05: Nichts aus dem Testsatz darf in die Entwicklung einfliessen."
              ]
            } },
            { reveal: {
              question: "**Szenario 4.** Ihr wollt euer an Standort A trainiertes Modell an Standort B einsetzen. Welche drei Prüfungen aus dieser Vorlesung machst du vorher, und was prüfst du bei jeder konkret?",
              label: "Antwort aufdecken",
              answer: [
                "**Repräsentativität und Sampling:** Entspricht die Patientenpopulation von B der Target population, oder behandelt B systematisch andere Fälle? Vergleiche die Verteilungen der wichtigsten Variablen zwischen A und B, zum Beispiel mit Histogrammen nebeneinander.",
                "**Messkonsistenz:** Werden dieselben Einheiten, Assays und Definitionen verwendet? Das Einheitenproblem aus dem Eröffnungsfall tritt zwischen Standorten besonders häufig auf.",
                "**Missingness und Verfügbarkeit:** Werden an B dieselben Tests routinemässig angeordnet? Fehlt eine Variable an B systematisch, bekommt das Modell einen Input, den es so nie gesehen hat. Und dieselbe Frage wie immer: Wäre die Information bei B zum Vorhersagezeitpunkt verfügbar?",
                "Wichtig: Die Min- und Max-Werte für das Scaling bleiben die aus den **Trainingsdaten von A**. Neu zu schätzen wäre ein Fehler derselben Familie wie Take-Home 05."
              ]
            } }
          ],
          remember: "Transfer heisst: mehrere Konzepte verbinden. Imbalance und Metrik, Korrelation und Linearität, Unit of Observation und Split, Standortwechsel und Repräsentativität."
        },
        {
          type: "slide",
          title: "Was war nur Zusatzwissen?",
          body: [
            "Damit du deine Lernzeit richtig verteilst: Diese Inhalte solltest du einordnen können, sie brauchen aber nicht denselben Aufwand wie der Rest.",
            { list: [
              "**Course Overview (Folie 4).** Zeigt, wo Lecture 03 im Semester steht. Reine Orientierung.",
              "**f_w(x) = y mit dem Hundebild und dem Netz-Diagramm (Folien 13–15).** Wiederholung aus früheren Vorlesungen. Du musst nur wissen, dass ein Modell Zahlen sieht und keine Bedeutung.",
              "**Die formale Notation D = {x_i ∈ ℝ^d, y_i ∈ ℝ} (Folie 18).** Gut zu kennen, damit du die Schreibweise lesen kannst. Der Kern dieser Vorlesung ist sie nicht.",
              "**Die einzelnen Spaltenbedeutungen des Diabetes-Datensatzes (Folie 18 rechts).** Beispielkontext. Du musst nicht auswendig wissen, dass Insulin in mu U/ml gemessen wird. Du musst wissen, **warum** solche Metadaten überhaupt nötig sind."
            ] },
            { callout: { tone: "tip", title: "Faustregel für die Prüfungsvorbereitung", text: "Investiere deine Zeit dort, wo der Dozent mehrere Folien für dasselbe Thema verwendet hat: sechs Folien für Min–Max-Scaling, vier für die Plot-Matrix, fünf für die Sampling-Verfahren und zwei für den EDA-Zyklus." } }
          ],
          remember: "Nice to know: Course Overview, ML-Mapping-Wiederholung, formale Notation, Spaltenbedeutungen. Zeit investieren, wo der Dozent mehrere Folien verwendet hat."
        },
        {
          type: "checkpoint",
          id: "cp-final",
          title: "Prüfungs-Check: die ganze Vorlesung",
          questions: [
            {
              id: "trainingsdaten",
              type: "type",
              prompt: "Aus welchen Daten dürfen die Preprocessing-Parameter wie x_min und x_max geschätzt werden?",
              accept: [
                "Trainingsdaten", "nur Trainingsdaten", "nur aus den Trainingsdaten", "training data",
                "only the training data", "aus den Trainingsdaten", "Trainingsdatensatz", "nur dem Trainingsset", "Trainingsset"
              ],
              placeholder: "kurze Antwort",
              explanation: "Take-Home 05: estimate preprocessing parameters using the training data only."
            },
            {
              id: "readiness-checks",
              type: "multi",
              prompt: "Welche Punkte nennt Take-Home 06 ausdrücklich als zu prüfen, bevor man die Modellfrage stellt?",
              options: [
                "Sampling und Repräsentativität",
                "Missingness",
                "Class balance",
                "Measurement consistency",
                "Information availability",
                "Die verwendete Programmiersprache"
              ],
              correct: [0, 1, 2, 3, 4],
              explanation: "Die Programmiersprache kommt auf der Folie nicht vor, die fünf anderen Punkte stehen genau so in Take-Home 06."
            },
            {
              id: "szenario-split",
              type: "single",
              prompt: "8'000 EKG-Aufnahmen von 1'200 Patienten werden zufällig nach Aufnahmen in 80 / 20 gesplittet. Warum sind die Testwerte zu optimistisch?",
              options: [
                "Aufnahmen derselben Person landen in Training und Test, das Modell kann die Person wiedererkennen statt die Krankheit",
                "8'000 Aufnahmen sind zu wenig für ein belastbares Testergebnis",
                "Ein 80/20-Split ist bei medizinischen Daten grundsätzlich unzulässig",
                "Das Problem entsteht erst, wenn vorher skaliert wurde"
              ],
              correct: 0,
              explanation: "Die Unit of Observation ist die Aufnahme, nicht der Patient. Wiederholte Beobachtungen derselben Person sind nicht unabhängig, deshalb muss nach Patient gesplittet werden."
            },
            {
              id: "reihenfolge-gesamt",
              type: "order",
              prompt: "Du bekommst einen neuen klinischen Datensatz. Bringe die Arbeitsschritte in die Reihenfolge, die diese Vorlesung nahelegt.",
              items: [
                "Klären, was eine Zeile darstellt, und wie viele unabhängige Patienten dahinterstehen",
                "Verteilungen, Missingness und auffällige Werte untersuchen und im Quellsystem verifizieren",
                "In Training und Test aufteilen",
                "Scaling-Parameter auf den Trainingsdaten schätzen und alle Teile damit transformieren",
                "Beurteilen, ob der Datensatz für die geplante AI-Aufgabe bereit ist"
              ],
              explanation: "Unit of Observation → EDA → Split → Preprocessing nur aus Trainingsdaten → Beurteilung. Der Split muss vor dem Scaling kommen, sonst fliesst Information aus dem Testsatz ein."
            },
            {
              id: "accuracy-falle",
              type: "single",
              prompt: "Bei 3 % Readmissions erreicht ein Modell 94 % Accuracy. Wie bewertest du das?",
              options: [
                "Schlechter als die triviale Regel „nie eine Readmission\", die 97 % erreicht",
                "Sehr gut, 94 % liegen deutlich über dem Zufall von 50 %",
                "Unentscheidbar ohne Angabe der Trainingsdauer",
                "Gut, weil Accuracy bei klinischen Daten das robusteste Mass ist"
              ],
              correct: 0,
              explanation: "Bei starkem Klassenungleichgewicht ist Accuracy irreführend. Take-Home 06 nennt class balance genau deshalb als Prüfpunkt vor der Modellwahl."
            }
          ]
        }
      ]
    },
    {
      id: "w4",
      number: 4,
      title: "Regression: Predicting Continuous Outcomes",
      status: "ready",
      items: [

        /* ================= Orientierung ================= */
        {
          type: "slide",
          title: "Die Geschichte dieser Vorlesung",
          body: [
            "Vorlesung 4 ist die erste des Teils **Learning from Data** (Folie 4). Bisher ging es darum, Daten zu verstehen: Was haben wir, wie sehen sie aus, können wir ihrer Qualität trauen? Heute lautet die Frage anders: **Können wir aus diesen Daten eine Beziehung lernen, die uns hilft, etwas vorherzusagen, das wir noch nicht kennen?** (Folie 6)",
            { flow: {
              steps: [
                { title: "Frage", text: "Ist das Ziel eine Zahl? Dann Regression (4.1)" },
                { title: "Lernen aus Fehlern", text: "Gerade, Residuen, Loss (4.2)" },
                { title: "Mehrere Prädiktoren", text: "Koeffizienten bedingt lesen (4.3)" },
                { title: "Bewerten", text: "MAE, RMSE, R², Residual plots (4.4)" },
                { title: "Generalisieren", text: "Wie gut für ungesehene Patienten? (4.5)" }
              ],
              note: "Der rote Faden steht in den Take-Home Messages: Training heisst aus Vorhersagefehlern lernen, bewertet werden Grösse und Muster der Fehler, und am Ende zählt die Leistung auf neuen Patienten. Dazu kommt eine Warnung, die sich durch die ganze Vorlesung zieht: Vorhersage ist nicht Kausalität."
            } },
            { table: {
              caption: "Die sechs Lernziele (Folie 7)",
              head: ["#", "Lernziel", "Das heisst konkret"],
              rows: [
                ["1", "Recognize regression problems", "Das Target ist eine kontinuierliche Grösse. Von Klassifikation unterscheiden."],
                ["2", "Describe a prediction problem", "Features, Targets, Predictions und Errors und ihre Rollen auseinanderhalten."],
                ["3", "Explain how regression learns", "Lineare Regression lernt aus Beispielen, indem sie Parameter findet, die den Vorhersagefehler verringern."],
                ["4", "Interpret model performance", "MAE, RMSE und R² konzeptionell deuten und Fehlergrössen im klinischen Kontext einordnen."],
                ["5", "Reason about generalization", "Underfitting, Appropriate fitting und Overfitting unterscheiden. Warum Leistung auf ungesehenen Patienten zählt."],
                ["6", "Interpret predictions critically", "Prediction, Association und Causation unterscheiden und aus Vorhersagebeziehungen allein keine kausalen Schlüsse ziehen."]
              ]
            } },
            { callout: { tone: "tip", title: "So nutzt du diese Lektion", text: ["Die Aufdeck-Felder sind keine Deko. Denk jeweils fünf Sekunden selbst nach, bevor du aufdeckst.", "Die Vorlesung ist rechenlastig (MSE, MAE, RMSE, R²). Rechne die Beispiele mit, die Checkpoints verlangen genau das.", "Bei **Nochmal versuchen** löst du nur noch die Fragen, die nicht richtig waren. Richtige Antworten bleiben stehen."] } }
          ],
          remember: "Aus Daten eine Beziehung lernen, um Unbekanntes vorherzusagen. Fünf Schritte: Frage, Lernen aus Fehlern, mehrere Prädiktoren, Bewerten, Generalisieren. Vorhersage ist nicht Kausalität."
        },

        /* ================= 4.1 From a clinical question to a prediction ================= */
        {
          type: "slide",
          title: "Folien 5–6: Der Eröffnungsfall, wie lange bleibt dieser Patient?",
          body: [
            "Ein Patient kommt heute an. Seine tatsächliche Aufenthaltsdauer (**Length of stay**) kennt niemand. Die Frage der Folie: Könnten frühere Patienten helfen, sie zu schätzen? Regression kommt zum Einsatz, wenn das Outcome, das wir vorhersagen wollen, eine **numerische Grösse** ist.",
            { table: {
              caption: "Patient arriving today (Folie 5)",
              head: ["Grösse", "Wert"],
              rows: [
                ["Age", "74 years"],
                ["Heart rate", "104 bpm"],
                ["Creatinine", "142 µmol/L"],
                ["Previous admissions", "2"],
                ["Mobility", "Reduced"],
                ["Actual length of stay", "unknown"],
                ["Model prediction", "6.2 days"]
              ],
              marks: { "5,1": "warn", "6,1": "focus" },
              note: "Gelb: das tatsächliche Outcome ist unbekannt. Blau: die 6.2 Tage sind eine Schätzung des Modells."
            } },
            { flow: {
              steps: [
                { title: "Data", text: "Frühere Patienten mit bekanntem Outcome" },
                { title: "Learning", text: "Beziehung zwischen Patientenmerkmalen und Outcome lernen" },
                { title: "Prediction", text: "Outcome für einen neuen Patienten schätzen" }
              ],
              note: "Folie 6: Der Wechsel von „Was sind das für Daten?“ zu „Was kann ich daraus Unbekanntes vorhersagen?“"
            } },
            { reveal: {
              question: "Neben „Actual length of stay: unknown“ steht „Model prediction: 6.2 days“. Ist 6.2 Tage der tatsächliche Aufenthalt?",
              label: "Antwort aufdecken",
              answer: [
                "Nein. 6.2 Tage ist die **Vorhersage** des Modells, also ein Schätzwert. Der tatsächliche Aufenthalt ist zum Zeitpunkt der Vorhersage unbekannt.",
                "Das Modell hat aus früheren Patienten eine Beziehung zwischen Merkmalen und Outcome gelernt und wendet sie auf die Merkmale dieses Patienten an. Folie 12 sagt es ausdrücklich: Eine Vorhersage ist eine Schätzung, nicht das beobachtete Outcome."
              ]
            } }
          ],
          remember: "Regression: Das Outcome ist eine Zahl. Aus früheren Patienten eine Beziehung lernen und damit für einen neuen Patienten schätzen. 6.2 Tage ist eine Vorhersage, keine Beobachtung."
        },
        {
          type: "slide",
          title: "Folien 8–9: Regression oder Klassifikation? Zuerst das Target ansehen",
          body: [
            "**Regression** sagt eine Grösse auf einer numerischen Skala voraus. Das **Target** ist das Outcome, das wir vorhersagen wollen. Kann es Werte auf einer kontinuierlichen Skala annehmen, formulieren wir die Aufgabe als Regressionsproblem. **Klassifikation** sagt dagegen vorher, zu welcher Kategorie eine Beobachtung gehört, oft über eine geschätzte Wahrscheinlichkeit.",
            { cards: [
              { title: "How long?", text: "Target: Length of stay, Vorhersage zum Beispiel 4.7 Tage" },
              { title: "How much?", text: "Target: Tumour volume, Vorhersage zum Beispiel 38 cm³" },
              { title: "What value?", text: "Target: Systolic blood pressure, Vorhersage zum Beispiel 128 mmHg" }
            ] },
            { table: {
              caption: "Die sechs Ziele von Folie 9, zugeordnet nach den Definitionen der Folie",
              head: ["Predict …", "Art des Targets", "Aufgabe"],
              rows: [
                ["Length of stay", "Menge in Tagen", "Regression"],
                ["Future HbA1c", "Menge auf kontinuierlicher Skala", "Regression"],
                ["Kidney volume from CT", "Menge (Volumen)", "Regression"],
                ["30-day mortality", "Kategorie (ja oder nein)", "Klassifikation"],
                ["Benign vs malignant lesion", "Kategorie", "Klassifikation"],
                ["Risk of readmission within 30 days", "Kategorie (ja oder nein), Ausgabe oft als Wahrscheinlichkeit", "Klassifikation"]
              ],
              marks: { "0,2": "focus", "1,2": "focus", "2,2": "focus", "3,2": "warn", "4,2": "warn", "5,2": "warn" }
            } },
            { callout: { tone: "warn", title: "Typische Falle: Wahrscheinlichkeit heisst nicht Regression", text: "„Risk of readmission within 30 days“ liefert oft eine Zahl zwischen 0 und 1. Trotzdem ist das Target eine Kategorie (Wiederaufnahme ja oder nein). Massgebend ist das **Target**, nicht die Form der Ausgabe. Die Folie sagt genau das: Klassifikation sagt die Kategorie voraus, oft über eine geschätzte Wahrscheinlichkeit." } },
            { reveal: {
              question: "Eigenes Beispiel: Ein Team sagt „Wir sagen den systolischen Blutdruck voraus, aber nur, ob er über 140 mmHg liegt.“ Ist das Regression?",
              label: "Antwort aufdecken",
              answer: [
                "Nein. Dann ist das Target eine **Kategorie** (über oder unter 140 mmHg), also Klassifikation. Der Messwert ist derselbe wie auf Folie 8, aber die Frage hat sich geändert.",
                "Merksatz der Folie 9: Start with the target. Was genau soll das Modell vorhersagen?"
              ]
            } }
          ],
          remember: "Zuerst das Target ansehen: Zahl auf kontinuierlicher Skala gleich Regression. Kategorie, oft über eine Wahrscheinlichkeit, gleich Klassifikation."
        },
        {
          type: "slide",
          title: "Folien 10–11: Das Grundproblem, Features X, Target y und Prediction ŷ",
          body: [
            "Wir lernen aus Beispielen, bei denen das Outcome **bekannt** ist. Für frühere Patienten haben wir sowohl die **Features X** als auch das beobachtete **Target y**. Das Modell lernt ihre Beziehung f_w: X → y und nutzt sie, um das unbekannte Target eines **neuen Patienten** vorherzusagen.",
            { table: {
              caption: "Previous patients und ein neuer Patient (Zahlen der Folie 10)",
              head: ["Age", "Creatinine", "Length of stay (days)"],
              rows: [
                ["61", "98", "4.1"],
                ["82", "131", "7.9"],
                ["47", "85", "2.6"],
                ["70", "117", "5.8"],
                ["74 (neu)", "142 (neu)", "ŷ_new = f_w(x_new) = ?"]
              ],
              marks: { "0,2": "focus", "1,2": "focus", "2,2": "focus", "3,2": "focus", "4,2": "warn" },
              note: "Blau: bekanntes Target y der Lernbeispiele. Gelb: für den neuen Patienten mit x_new = (74, 142) gibt es nur eine Vorhersage."
            } },
            { cards: [
              { title: "Features X", text: "Information, die zum Zeitpunkt der Vorhersage verfügbar ist, zum Beispiel Alter, Laborwerte, frühere Aufnahmen." },
              { title: "Target y", text: "Das Outcome, das das Modell vorhersagen soll. Bekannt für die Beispiele, mit denen gelernt wird." },
              { title: "Prediction ŷ", text: "Die Schätzung des Modells für das Target. Für einen neuen Patienten wird das unbekannte Outcome aus seinen Features geschätzt." }
            ] },
            { callout: { tone: "exam", title: "Drei Rollen, nicht verwechseln", text: "X geht ins Modell hinein, y ist die bekannte Antwort beim Lernen, ŷ kommt aus dem Modell heraus. ŷ ist nie das beobachtete Ergebnis. Das „bei Vorhersage verfügbar“ bei X kennst du schon aus Lecture 03 als Dimension Availability." } },
            { reveal: {
              question: "Zum neuen Patienten x_new = (74, 142): Welche der drei Grössen X, y und ŷ sind bekannt, und welche nicht?",
              label: "Antwort aufdecken",
              answer: [
                "**X ist bekannt:** Alter 74 und Creatinine 142 liegen bei der Ankunft vor.",
                "**y ist unbekannt:** Das Outcome liegt in der Zukunft. Genau deshalb braucht man ein Modell.",
                "**ŷ wird berechnet:** Das gelernte Modell setzt x_new ein und liefert ŷ_new = f_w(x_new)."
              ]
            } }
          ],
          remember: "Features X (bekannt bei der Vorhersage), Target y (bekannt nur bei den Lernbeispielen), Prediction ŷ (Schätzung des Modells). f_w: X → y wird aus Beispielen gelernt."
        },
        {
          type: "checkpoint",
          id: "cp-problem",
          title: "Checkpoint: Das Regressionsproblem",
          questions: [
            {
              id: "regression-ziele",
              type: "multi",
              prompt: "Bei welchen Zielgrössen handelt es sich um ein Regressionsproblem?",
              options: [
                "Length of stay in Tagen",
                "Future HbA1c",
                "30-day mortality (ja oder nein)",
                "Kidney volume from CT",
                "Benign vs malignant lesion",
                "Risk of readmission within 30 days (ja oder nein, oft als Wahrscheinlichkeit ausgegeben)"
              ],
              correct: [0, 1, 3],
              explanation: "Length of stay, HbA1c und Nierenvolumen sind Mengen auf einer numerischen Skala. Mortalität, gutartig oder bösartig und Wiederaufnahme sind Kategorien, also Klassifikation."
            },
            {
              id: "wahrscheinlichkeit",
              type: "single",
              prompt: "Ein Modell gibt für „Wiederaufnahme innerhalb von 30 Tagen“ eine Wahrscheinlichkeit von 0.31 aus. Warum ist das trotzdem keine Regression im Sinne der Vorlesung?",
              options: [
                "Das Target ist eine Kategorie (Wiederaufnahme ja oder nein), die Wahrscheinlichkeit ist nur die Form der Ausgabe",
                "Wahrscheinlichkeiten dürfen ausschliesslich in Klassifikationsmodellen vorkommen",
                "Weil 0.31 kleiner als 1 ist",
                "Weil Regression nicht mit Patientendaten arbeitet"
              ],
              correct: 0,
              explanation: "Massgebend ist das Target. Klassifikation sagt die Kategorie vorher, oft über eine geschätzte Wahrscheinlichkeit (Folie 9)."
            },
            {
              id: "lernablauf",
              type: "order",
              prompt: "Bringe den Ablauf von Data über Learning zu Prediction in die richtige Reihenfolge.",
              items: [
                "Daten früherer Patienten mit bekanntem Outcome (Features X und Target y) sammeln",
                "Die Beziehung f_w: X → y aus diesen Beispielen lernen",
                "Die Features des neuen Patienten x_new in das gelernte Modell einsetzen",
                "Die Vorhersage ŷ_new als Schätzung des unbekannten Outcomes erhalten"
              ],
              explanation: "Data → Learning → Prediction (Folie 6). Gelernt wird nur aus Fällen, deren Outcome bekannt ist, vorhergesagt wird für einen Fall, dessen Outcome unbekannt ist."
            },
            {
              id: "residual-begriff",
              type: "type",
              prompt: "Wie heisst die Differenz y − ŷ zwischen beobachtetem Wert und Vorhersage? (englischer Fachbegriff, ein Wort)",
              accept: ["residual", "residuum", "error", "prediction error", "Residual", "Vorhersagefehler"],
              placeholder: "englischer Fachbegriff",
              explanation: "Prediction error oder residual (Folie 12). Er vergleicht, was wirklich passiert ist, mit dem, was das Modell geschätzt hat."
            }
          ]
        },

        /* ================= 4.2 Learning a relationship from examples ================= */
        {
          type: "slide",
          title: "Folien 12 und 20: Vorhersagefehler und Residual",
          body: [
            "Eine Vorhersage ist eine Schätzung, nicht das beobachtete Outcome. Bei Patienten, deren Outcome bekannt ist, können wir ŷ mit y vergleichen. Die Differenz heisst **prediction error** oder **residual**. Um aus Fehlern zu lernen, muss man sie zuerst quantifizieren.",
            { formula: {
              main: "e = y − ŷ",
              parts: [
                { label: "y", text: "beobachteter Wert, zum Beispiel 5.0 Tage" },
                { label: "ŷ", text: "Vorhersage des Modells, zum Beispiel 4.2 Tage" },
                { label: "e", text: "Fehler oder Residual, hier 5.0 − 4.2 = 0.8 Tage" }
              ],
              note: "Folie 12: „Here we define e = y − ŷ.“ Auf Folie 20 ist es der vertikale Abstand von der Regressionsgeraden zum beobachteten Wert."
            } },
            { table: {
              caption: "Was das Vorzeichen sagt (Folien 12 und 20)",
              head: ["Residual", "Bedeutung"],
              rows: [
                ["e > 0", "Underprediction: Das Modell unterschätzt den beobachteten Wert."],
                ["e < 0", "Overprediction: Das Modell überschätzt den beobachteten Wert."],
                ["e = 0", "Exakte Vorhersage: Beobachtung und Vorhersage fallen zusammen."]
              ]
            } },
            { callout: { tone: "warn", title: "Vorzeichen-Falle", text: "Die Vorlesung definiert e als **y − ŷ**, also beobachtet minus vorhergesagt. Positiv heisst deshalb: Das Modell lag zu tief. Wer ŷ − y rechnet, dreht das Vorzeichen um und liest die Bedeutung falsch herum." } },
            { table: {
              caption: "Eigene Lernpatienten (nicht aus den Folien) mit dem Modell ŷ = 1.8 + 0.05 × Age",
              head: ["Age", "y beobachtet", "ŷ", "e = y − ŷ", "Urteil"],
              rows: [
                ["30", "2.2", "3.3", "−1.1", "Overprediction"],
                ["60", "6.8", "4.8", "+2.0", "Underprediction"],
                ["70", "5.3", "5.3", "0.0", "exakt"],
                ["80", "3.2", "5.8", "−2.6", "Overprediction"]
              ],
              marks: { "0,3": "warn", "1,3": "bad", "2,3": "good", "3,3": "bad" },
              note: "Rechne zwei Zeilen selbst nach, bevor du weiterliest. Beispiel Zeile 2: ŷ = 1.8 + 0.05 × 60 = 4.8, also e = 6.8 − 4.8 = +2.0."
            } },
            { reveal: {
              question: "Das Modell sagt 6.0 Tage voraus, der Patient bleibt tatsächlich 4.5 Tage. Welches Vorzeichen und welche Grösse hat e, und was bedeutet das?",
              label: "Antwort aufdecken",
              answer: [
                "e = y − ŷ = 4.5 − 6.0 = **−1.5 Tage**.",
                "Weil e < 0 ist, **überschätzt** das Modell den beobachteten Wert (Overprediction)."
              ]
            } },
            { callout: { tone: "exam", title: "Der Kernsatz von Folie 20", text: "Ein nützliches Regressionsmodell soll die Residuen über **viele** Patienten klein machen, nicht nur bei einem einzelnen Patienten gut passen." } }
          ],
          remember: "Residual e = y − ŷ (beobachtet minus vorhergesagt). e > 0: Modell unterschätzt. e < 0: Modell überschätzt. Ziel: kleine Residuen über viele Patienten."
        },
        {
          type: "slide",
          title: "Folien 14–16: Von der Punktwolke zur Geraden",
          body: [
            "Bevor man ein Modell anpasst, schaut man die Beziehung in den Daten an. Im Scatter plot der Folie 14 ist **ein Punkt ein Patient**: Das Alter ist das Feature x, die Length of stay das beobachtete Target y. Die Frage lautet, ob sich mit dem Feature auch das Target systematisch ändert.",
            { chart: {
              kind: "scatter",
              caption: "Alter und Length of stay (eigene Lernpunkte im Stil der Folie 14, nicht die Datenpunkte der Folie)",
              panels: [
                { title: "Ein Punkt ist ein Patient", points: [[26, 2.2], [29, 4.5], [33, 3.1], [36, 4.2], [40, 2.4], [43, 5.1], [47, 4.0], [50, 5.2], [54, 3.5], [57, 5.1], [60, 6.4], [62, 3.7], [65, 5.2], [68, 4.6], [71, 6.4], [74, 4.0], [77, 6.4], [80, 5.5], [83, 7.3], [86, 5.3], [89, 6.8], [45, 3.9], [52, 6.2], [70, 3.3]], note: "x: Alter in Jahren, y: Length of stay in Tagen. Ältere Patienten bleiben tendenziell länger, aber die Punkte streuen stark." }
              ]
            } },
            { callout: { tone: "def", title: "Aussage der Folie 15", text: "Older patients tend to have longer stays in these data, but **age alone does not determine length of stay**. Ein Zusammenhang im Mittel heisst nicht, dass das Alter den Einzelfall festlegt." } },
            "Ein **lineares Regressionsmodell** fasst diese Beziehung mit einer Geraden zusammen. Für jeden Wert x liefert die Gerade eine Vorhersage ŷ.",
            { formula: {
              main: "ŷ = b₀ + b₁ · x",
              parts: [
                { label: "x", text: "Feature, hier das Alter in Jahren" },
                { label: "ŷ", text: "vorhergesagte Length of stay in Tagen" },
                { label: "b₀ (Intercept)", text: "vorhergesagter Wert bei x = 0, legt fest, wo die Gerade die y-Achse trifft" },
                { label: "b₁ (Slope)", text: "Änderung der Vorhersage bei einer Zunahme von x um eine Einheit" }
              ],
              note: "Folie 16: ŷ = 1.73 + 0.05 x. Lernen heisst, b₀ und b₁ so zu wählen, dass die Gerade die beobachteten Outcomes möglichst gut vorhersagt."
            } },
            { callout: { tone: "warn", title: "Die Folien runden nicht überall gleich", text: "Folie 16 zeigt ŷ = 1.73 + 0.05 x. Die Folien 17–19 und 28 rechnen mit ŷ = 1.8 + 0.05 × Age. Die Steigung 0.05 ist überall gleich, beim Intercept steht einmal 1.73 und sonst 1.8. Vermutlich ist es dasselbe Modell, gerundet, die Folien sagen das aber nicht ausdrücklich. In Aufgaben gilt der Wert, der in der Aufgabe steht. In dieser Lektion rechnen wir mit 1.8, wie die Folien 17–19 und 28." } }
          ],
          remember: "Lineares Modell: ŷ = b₀ + b₁x mit Intercept b₀ und Slope b₁. Lernen heisst b₀ und b₁ so wählen, dass die Vorhersagen möglichst gut zu den beobachteten Outcomes passen. Alter allein legt den Einzelfall nicht fest."
        },
        {
          type: "slide",
          title: "Folien 17–19: Die Steigung lesen und einen neuen Patienten vorhersagen",
          body: [
            "Die Steigung sagt, um wie viel sich die Vorhersage des Modells ändert, wenn das Feature um eine Einheit zunimmt. Im Modell **ŷ = 1.8 + 0.05 × Age** bedeutet b₁ = 0.05: **0.05 zusätzliche vorhergesagte Tage pro zusätzlichem Lebensjahr**.",
            { table: {
              caption: "Drei Rechnungen mit dem Modell der Folien 17–19",
              head: ["Frage", "Rechnung", "Ergebnis"],
              rows: [
                ["Alter steigt um 10 Jahre (Δx = +10)", "Δŷ = b₁ · Δx = 0.05 × 10", "+0.5 Tage"],
                ["Zwei Patienten, 40 und 80 Jahre alt (Altersunterschied 40 Jahre)", "40 × 0.05", "2.0 Tage Unterschied in der Vorhersage"],
                ["Neuer Patient, x_new = 70 Jahre", "ŷ_new = 1.8 + 0.05 × 70", "5.3 Tage"]
              ],
              marks: { "0,2": "focus", "1,2": "focus", "2,2": "focus" }
            } },
            { compare: {
              left: { title: "Was wir sagen können", points: ["Im Modell geht höheres Alter mit einer längeren vorhergesagten Aufenthaltsdauer einher.", "Die Steigung quantifiziert diese Vorhersagebeziehung: +0.05 Tage pro Jahr."] },
              right: { title: "Was wir nicht schliessen können", points: ["Dass Altern selbst einen längeren Spitalaufenthalt verursacht.", "Mit dem Alter zusammenhängende Merkmale wie Gebrechlichkeit, Komorbiditäten oder Krankheitsschwere können ebenfalls mit der Length of stay zusammenhängen."] },
              verdict: "Die Steigung beschreibt eine Beziehung im Modell. Sie sagt nicht, warum diese Beziehung besteht."
            } },
            { reveal: {
              question: "Das Modell sagt für einen 70-Jährigen 5.3 Tage voraus. Heisst das, dass er genau 5.3 Tage bleibt? Was hat der Scatter plot über Patienten ähnlichen Alters gezeigt?",
              label: "Antwort aufdecken",
              answer: [
                "Nein. 5.3 Tage ist eine **Punktvorhersage**: die beste Schätzung des Modells aus den Informationen, die es nutzt.",
                "Der Scatter plot hat gezeigt, dass Patienten mit demselben Alter sehr unterschiedlich lange bleiben können (Folie 19). Das Alter allein legt die Aufenthaltsdauer nicht fest."
              ]
            } }
          ],
          remember: "Steigung = Änderung der Vorhersage pro Einheit des Features (hier +0.05 Tage pro Jahr). ŷ_new ist eine Punktvorhersage, nicht das Outcome. Die Steigung ist eine Vorhersagebeziehung, keine Ursache."
        },
        {
          type: "checkpoint",
          id: "cp-linear",
          title: "Checkpoint: Residuum, Gerade und Vorhersage",
          questions: [
            {
              id: "vorhersage-60",
              type: "type",
              prompt: "Das Modell lautet ŷ = 1.8 + 0.05 × Age. Welche Length of stay in Tagen sagt es für einen 60-jährigen Patienten voraus? (nur die Zahl)",
              accept: ["4.8", "4,8", "4.80"],
              placeholder: "Zahl in Tagen",
              explanation: "ŷ = 1.8 + 0.05 × 60 = 1.8 + 3.0 = 4.8 Tage."
            },
            {
              id: "vorzeichen",
              type: "single",
              prompt: "Ein Patient bleibt tatsächlich 3.0 Tage (y), das Modell hatte 4.5 Tage vorhergesagt (ŷ). Was gilt mit der Definition e = y − ŷ?",
              options: [
                "e = −1.5, das Modell überschätzt (Overprediction)",
                "e = +1.5, das Modell überschätzt (Overprediction)",
                "e = −1.5, das Modell unterschätzt (Underprediction)",
                "e = +1.5, das Modell unterschätzt (Underprediction)"
              ],
              correct: 0,
              explanation: "e = 3.0 − 4.5 = −1.5. Ein negatives Residual bedeutet, dass das Modell den beobachteten Wert überschätzt hat."
            },
            {
              id: "steigung",
              type: "multi",
              prompt: "Welche Aussagen zur Steigung b₁ = 0.05 (Tage pro Lebensjahr) sind richtig?",
              options: [
                "Zwei Patienten, die sich nur im Alter um 10 Jahre unterscheiden, haben im Modell Vorhersagen, die 0.5 Tage auseinanderliegen",
                "Pro zusätzlichem Lebensjahr steigt die vorhergesagte Length of stay um 0.05 Tage",
                "Laut Modell verursacht das Altern einen längeren Spitalaufenthalt",
                "Das Modell sagt voraus, dass jeder 70-Jährige exakt 5.3 Tage bleibt"
              ],
              correct: [0, 1],
              explanation: "Die Steigung quantifiziert eine Vorhersagebeziehung (Δŷ = 0.05 × Δx). Sie belegt keine Ursache, und 5.3 Tage ist eine Punktvorhersage, kein exaktes Ergebnis."
            },
            {
              id: "intercept",
              type: "single",
              prompt: "Was bedeutet der Intercept b₀ im Modell ŷ = b₀ + b₁x?",
              options: [
                "Der vorhergesagte Wert bei x = 0",
                "Die Änderung der Vorhersage pro Einheit von x",
                "Der mittlere Vorhersagefehler",
                "Die Anzahl Patienten im Datensatz"
              ],
              correct: 0,
              explanation: "b₀ legt fest, wo die Gerade die y-Achse trifft. Die Änderung pro Einheit von x ist die Steigung b₁."
            }
          ]
        },

        /* ================= Loss: MSE und Least squares ================= */
        {
          type: "slide",
          title: "Folien 21–22: Welche Gerade? MSE und das Least-squares-Prinzip",
          body: [
            "Verschiedene Werte für b₀ und b₁ ergeben verschiedene Geraden und damit verschiedene Vorhersagen. Zum Trainieren reicht Augenmass nicht, man braucht eine **quantitative Regel**, welche Gerade die beobachteten Daten am besten beschreibt. Die Idee der Folie 22: die Residuen verwenden.",
            { flow: {
              steps: [
                { title: "Residual", text: "Für jeden Patienten e_i = y_i − ŷ_i" },
                { title: "Quadrieren", text: "e_i² = (y_i − ŷ_i)²" },
                { title: "Mitteln", text: "Über alle n Patienten, ergibt den MSE" },
                { title: "Wählen", text: "b₀ und b₁ so, dass der MSE auf den Trainingsdaten möglichst klein ist" }
              ],
              note: "So wird aus der Frage „Welche Gerade?“ eine Rechenregel."
            } },
            { formula: {
              main: "MSE = (1/n) · Σ (y_i − ŷ_i)²",
              parts: [
                { label: "y_i − ŷ_i", text: "Residual des i-ten Patienten" },
                { label: "Quadrat", text: "macht jeden Beitrag nicht negativ und gewichtet grosse Fehler stärker" },
                { label: "1/n · Σ", text: "Mittelwert über alle n Patienten" }
              ],
              note: "Mean squared error. Einheit: Tage² (die Tabelle der Folie 22 gibt MSE in days² an)."
            } },
            { table: {
              caption: "Drei Geraden für dieselben Patienten (Folie 22)",
              head: ["Model / Line", "MSE (days²)"],
              rows: [["A", "1.38"], ["B", "1.33"], ["C", "1.59"]],
              marks: { "1,0": "good", "1,1": "good" },
              note: "Welche Gerade hat den kleinsten MSE? B."
            } },
            { callout: { tone: "exam", title: "Least-squares-Prinzip (Folie 22)", text: "Wähle b₀ und b₁ so, dass die **quadrierten Residuen über die Trainingsdaten möglichst klein** sind." } },
            { reveal: {
              question: "Welche der drei Geraden würde das Training wählen, und woran erkennt man das, ohne den Plot anzusehen?",
              label: "Antwort aufdecken",
              answer: [
                "Gerade **B**. Sie hat mit 1.33 days² den kleinsten MSE (A: 1.38, C: 1.59).",
                "Entscheidend ist, dass das Kriterium **quantitativ** ist: Der MSE ersetzt den Eindruck beim Betrachten des Plots durch eine Zahl, die man vergleichen kann."
              ]
            } }
          ],
          remember: "MSE = Mittelwert der quadrierten Residuen, Einheit Tage². Least squares: b₀ und b₁ so wählen, dass der MSE auf den Trainingsdaten minimal ist. Beispiel Folie 22: B mit 1.33 schlägt A (1.38) und C (1.59)."
        },
        {
          type: "slide",
          title: "Folie 23: Warum quadrieren? Und ist das immer richtig?",
          body: [
            "Residuen können positiv oder negativ sein. Einfaches Mitteln kann deshalb grosse Fehler verstecken. Das Beispiel der Folie 23 mit vier Residuen:",
            { compare: {
              left: { title: "Residuen einfach mitteln", points: ["Residuen: −1, +1, −3, +3 Tage", "(−1 + 1 − 3 + 3) / 4 = 0", "Mean residual = 0 Tage, obwohl die Vorhersagen nicht perfekt waren. Positive und negative Residuen haben sich aufgehoben."] },
              right: { title: "Erst quadrieren", points: ["(−1)², (+1)², (−3)², (+3)² = 1, 1, 9, 9", "MSE = (1 + 1 + 9 + 9) / 4 = 5 Tage²", "Jedes Residual trägt zum Loss bei, nichts hebt sich auf."] },
              verdict: "Quadrieren verhindert das Aufheben und gibt grossen Residuen überproportional mehr Gewicht."
            } },
            { table: {
              caption: "Beitrag eines Residuals zum Squared-error-Loss (Folie 23)",
              head: ["Residual", "Beitrag zum Loss"],
              rows: [["1 Tag", "1"], ["3 Tage", "9"]],
              marks: { "1,1": "warn" },
              note: "Ein Residual, das dreimal grösser ist, trägt neunmal so viel zum Squared-error-Loss bei."
            } },
            { reveal: {
              question: "Soll ein 3-Tage-Fehler immer neunmal so schwer zählen wie ein 1-Tage-Fehler?",
              label: "Antwort aufdecken",
              answer: [
                "Eine universelle Antwort gibt es nicht. Die **Loss-Funktion legt fest, welche Arten von Fehlern wir bestrafen**.",
                "Die Folie verlangt, über die klinischen oder betrieblichen Folgen einer falschen Vorhersage nachzudenken. Quadrieren ist eine Entscheidung, kein Naturgesetz."
              ]
            } },
            { callout: { tone: "exam", title: "Zwei Gründe fürs Quadrieren, ein Vorbehalt", text: ["(1) Quadrieren macht jeden Beitrag **nicht negativ**, Über- und Unterschätzung können sich nicht aufheben.", "(2) Quadrieren gibt grösseren Residuen **überproportional mehr Einfluss** auf den Loss.", "Vorbehalt: Ob das fachlich passt, hängt davon ab, welche Fehler man bestrafen will."] } }
          ],
          remember: "Mitteln der Residuen versteckt Fehler (−1, +1, −3, +3 ergibt 0). Quadrieren: nicht negativ, grosse Fehler zählen überproportional (3 Tage gleich 9, 1 Tag gleich 1). Die Loss-Funktion spiegelt, welche Fehler wir bestrafen."
        },
        {
          type: "checkpoint",
          id: "cp-loss",
          title: "Checkpoint: Fehler, MSE und Least squares",
          questions: [
            {
              id: "mse-rechnen",
              type: "type",
              prompt: "Die Residuen von vier Patienten sind −2, +2, −1 und +1 Tage. Wie gross ist der MSE? (nur die Zahl, in Tage²)",
              accept: ["2.5", "2,5", "2.50"],
              placeholder: "Zahl",
              explanation: "Quadrate: 4, 4, 1, 1. Summe 10, geteilt durch 4 ergibt 2.5 Tage². Das einfache Mittel der Residuen wäre dagegen 0."
            },
            {
              id: "warum-quadrieren",
              type: "multi",
              prompt: "Warum werden die Residuen im MSE quadriert?",
              options: [
                "Positive und negative Residuen sollen sich nicht aufheben",
                "Grössere Residuen sollen überproportional mehr Einfluss bekommen",
                "Damit der Fehler in Tagen statt in Tage² angegeben wird",
                "Damit jeder Fehler unabhängig von seiner Grösse gleich stark zählt"
              ],
              correct: [0, 1],
              explanation: "Quadrieren macht jeden Beitrag nicht negativ und gewichtet grosse Fehler stärker (3 Tage zählen 9-fach). Der MSE hat die Einheit Tage², und gleich stark zählt jeder Fehler beim MAE, nicht beim MSE."
            },
            {
              id: "beste-gerade",
              type: "single",
              prompt: "Drei Geraden haben die MSE-Werte A = 1.38, B = 1.33 und C = 1.59 days². Welche wählt das Least-squares-Prinzip?",
              options: ["Gerade A", "Gerade B", "Gerade C", "Keine, das entscheidet man nach Augenmass"],
              correct: 1,
              explanation: "Least squares wählt die Parameter mit dem kleinsten MSE auf den Trainingsdaten. Hier ist das B mit 1.33 days²."
            },
            {
              id: "fehler-ablauf",
              type: "order",
              prompt: "Bringe die Schritte vom Residual bis zur Parameterwahl in die richtige Reihenfolge.",
              items: [
                "Das Residual je Patient berechnen: e = y − ŷ",
                "Jedes Residual quadrieren",
                "Über alle n Patienten mitteln, das ergibt den MSE",
                "b₀ und b₁ so wählen, dass der MSE auf den Trainingsdaten möglichst klein wird"
              ],
              explanation: "Residual → Quadrieren → Mitteln (MSE) → Parameter wählen. Das ist das Least-squares-Prinzip in vier Schritten."
            }
          ]
        },

        /* ================= 4.3 From one predictor to many ================= */
        {
          type: "slide",
          title: "Folien 25–26: Mehrere Prädiktoren, Multiple Regression",
          body: [
            "Die meisten klinischen Outcomes hängen von mehreren Patientenmerkmalen ab. **Multiple Regression** nutzt mehrere Features gemeinsam, um dasselbe kontinuierliche Target vorherzusagen. Jedes Feature bekommt seinen eigenen Koeffizienten, und die Beiträge werden addiert.",
            { formula: {
              main: "ŷ = b₀ + b₁x₁ + b₂x₂ + ⋯ + bₚxₚ",
              parts: [
                { label: "x₁, x₂, x₃ …", text: "die Features, im Beispiel Age, Creatinine, Previous admissions" },
                { label: "bⱼ", text: "Koeffizient des Features xⱼ" },
                { label: "b₀", text: "Intercept, die Baseline, von der aus die Beiträge kombiniert werden" }
              ],
              note: "Beispiel der Folie 26: ŷ = b₀ + b₁ Age + b₂ Creatinine + b₃ PreviousAdmissions."
            } },
            { flow: {
              steps: [
                { title: "Feature mal Koeffizient", text: "x₁ · b₁, x₂ · b₂, x₃ · b₃" },
                { title: "Beiträge addieren", text: "b₀ + b₁x₁ + b₂x₂ + b₃x₃" },
                { title: "Predicted stay ŷ", text: "eine einzige Zahl" }
              ],
              note: "Folie 26: Each predictor contributes to the prediction; the model combines those contributions into one estimate."
            } },
            { callout: { tone: "def", title: "Was ändert sich, und was nicht?", text: "Mehr Information geht ein, das **Target ändert sich nicht**. Wir sagen weiterhin eine einzige Grösse voraus: die Length of stay (Folie 25)." } },
            { callout: { tone: "warn", title: "Beschriftungsfehler in der Grafik der Folie 26", text: "In der Grafik steht beim dritten Prädiktor „Previous admissions“ die Beschriftung x₂ × b₂. Die Formeln auf derselben Folie verwenden dafür korrekt x₃ und b₃ (x₂ ist Creatinine). Es gilt die Formel, die Grafik hat einen Tippfehler." } },
            { reveal: {
              question: "Ein Modell nutzt Age, Creatinine und Previous admissions als Features. Wie viele Parameter hat es insgesamt, und was ist b₀?",
              label: "Antwort aufdecken",
              answer: [
                "Vier Parameter: **b₀ plus drei Koeffizienten b₁ bis b₃**, also einen pro Feature und den Intercept.",
                "b₀ ist die Baseline, von der aus die Beiträge der Features kombiniert werden (Folie 26)."
              ]
            } }
          ],
          remember: "Multiple Regression: ŷ = b₀ + b₁x₁ + … + bₚxₚ. Jedes Feature hat einen Koeffizienten, die Beiträge werden addiert, das Target bleibt eine einzige Zahl."
        },
        {
          type: "slide",
          title: "Folien 27–28: Koeffizienten bedingt lesen, und warum ihre Grösse von der Einheit abhängt",
          body: [
            { callout: { tone: "def", title: "Was ein Koeffizient beschreibt (Folie 27)", text: "Ein Koeffizient beschreibt, wie sich die **Vorhersage des Modells** mit einem Feature ändert, **wenn die anderen enthaltenen Features festgehalten werden**." } },
            { table: {
              caption: "Zwei Patienten, die sich nur im Alter unterscheiden (Folie 27, b_age = 0.04)",
              head: ["Merkmal", "Patient P", "Patient Q"],
              rows: [
                ["Age", "70 years", "71 years"],
                ["Creatinine", "110 µmol/L", "110 µmol/L"],
                ["Previous admissions", "1", "1"],
                ["Differenz der Vorhersage", "", "ŷ_Q − ŷ_P = 0.04 Tage"]
              ],
              marks: { "0,1": "focus", "0,2": "focus", "3,2": "good" },
              note: "Ein Jahr Altersunterschied entspricht 0.04 Tagen Unterschied in der vorhergesagten Aufenthaltsdauer, bei gleichen Werten der anderen Predictors."
            } },
            { compare: {
              left: { title: "Was die Folie sagt", points: ["Eine Aussage über die **Vorhersage des Modells**.", "„Holding the other predictors fixed“ geschieht innerhalb des mathematischen Modells."] },
              right: { title: "Was nicht automatisch folgt", points: ["Was passieren würde, wenn man das Alter eines Patienten tatsächlich ändern würde.", "Variablen ausserhalb des Modells können sich zwischen P und Q trotzdem unterscheiden."] },
              verdict: "Predictive coefficient ≠ causal effect. Koeffizienten bedingt lesen: „bei gleichen Werten der anderen enthaltenen Predictors …“"
            } },
            "Ein Koeffizient gilt **pro Einheit seines Features**. Ändert man die Einheit, ändert sich der Zahlenwert des Koeffizienten, nicht die zugrunde liegende Beziehung und nicht die Vorhersage für denselben Patienten.",
            { table: {
              caption: "Alter in Jahren oder in Dekaden (Folie 28)",
              head: ["Alter gemessen in", "Modell", "Vorhersage bei 70 Jahren"],
              rows: [
                ["Jahren", "1.8 + 0.05 × age", "1.8 + 0.05 × 70 = 5.3 Tage"],
                ["Dekaden", "1.8 + 0.5 × age", "1.8 + 0.5 × 7 = 5.3 Tage"]
              ],
              marks: { "0,2": "focus", "1,2": "focus" },
              note: "Der Koeffizient wird zehnmal grösser, die Vorhersage bleibt gleich."
            } },
            { callout: { tone: "warn", title: "Grösserer Koeffizient heisst nicht wichtigerer Prädiktor", text: "Auch das Standardisieren ändert nur die Einheit, zum Beispiel von Jahren in Standardabweichungen (Verbindung zu Feature Scaling aus Lecture 03). Der Zahlenwert des Koeffizienten ändert sich, die Information im Feature nicht. Und laut Folie 28 bedeutet selbst nach dem Standardisieren ein grösserer Koeffizient nicht automatisch einen wichtigeren Prädiktor." } },
            { reveal: {
              question: "Eigene Rechnung: Das Alter wird in Monaten statt in Jahren gemessen. Wie verändert sich der Koeffizient 0.05 Tage pro Jahr, und was passiert mit der Vorhersage für denselben Patienten?",
              label: "Antwort aufdecken",
              answer: [
                "Ein Monat ist 1/12 Jahr, also ist der Koeffizient **0.05 / 12 ≈ 0.0042 Tage pro Monat**.",
                "Die Vorhersage bleibt gleich: Ein 70-Jähriger hat 840 Monate, und 0.0042 × 840 ≈ 3.5 Tage, dazu der Intercept 1.8 ergibt wieder 5.3 Tage. Nur die Einheit hat gewechselt, nicht die Information (Folie 28)."
              ]
            } }
          ],
          remember: "Koeffizient bedingt lesen: Änderung der Vorhersage pro Einheit, bei gleichen Werten der anderen enthaltenen Features. Vorhersagebeziehung, keine Kausalität. Einheit ändern, Koeffizient ändert sich, Vorhersage nicht. Grösserer Koeffizient heisst nicht wichtiger."
        },
        {
          type: "checkpoint",
          id: "cp-coef",
          title: "Checkpoint: Koeffizienten und Einheiten",
          questions: [
            {
              id: "koeffizient-lesen",
              type: "single",
              prompt: "In einem Modell mit Age, Creatinine und Previous admissions ist b_age = 0.04. Welche Aussage ist korrekt formuliert?",
              options: [
                "Bei gleichen Werten der anderen enthaltenen Predictors entspricht ein Jahr Altersunterschied 0.04 Tagen Unterschied in der vorhergesagten Aufenthaltsdauer",
                "Wenn man das Alter eines Patienten um ein Jahr erhöht, verlängert sich sein Aufenthalt um 0.04 Tage",
                "Das Alter ist der wichtigste Prädiktor im Modell",
                "Das Alter erklärt 4 % der Streuung der Length of stay"
              ],
              correct: 0,
              explanation: "Ein Koeffizient beschreibt die Vorhersage des Modells bei festgehaltenen anderen Features. Er ist keine Aussage darüber, was bei einem Eingriff passieren würde, und sagt nichts über die Wichtigkeit des Prädiktors."
            },
            {
              id: "dekaden",
              type: "type",
              prompt: "Das Alter wird in Jahren gemessen, der Koeffizient ist 0.05 Tage pro Jahr. Welchen Koeffizienten (Tage pro Dekade) erhält man, wenn das Alter in Dekaden gemessen wird? (nur die Zahl)",
              accept: ["0.5", "0,5", ".5", "0.50"],
              placeholder: "Zahl",
              explanation: "Eine Dekade sind 10 Jahre, also 0.05 × 10 = 0.5 Tage pro Dekade. Die Vorhersage für denselben Patienten bleibt gleich (Folie 28: 5.3 Tage)."
            },
            {
              id: "einheit-wirkung",
              type: "multi",
              prompt: "Ein Feature wird in eine andere Einheit umgerechnet, zum Beispiel von Jahren in Dekaden oder in Standardabweichungen. Welche Aussagen stimmen?",
              options: [
                "Der Zahlenwert des Koeffizienten ändert sich",
                "Die Vorhersage für denselben Patienten bleibt gleich",
                "Ein grösserer Koeffizient heisst automatisch, dass der Prädiktor wichtiger ist",
                "Die Information im Feature geht durch die Umrechnung verloren"
              ],
              correct: [0, 1],
              explanation: "Die Einheit ändert die Zahl, nicht die Information und nicht die Vorhersage. Selbst nach dem Standardisieren bedeutet ein grösserer Koeffizient nicht automatisch einen wichtigeren Prädiktor (Folie 28)."
            },
            {
              id: "parameter-zahl",
              type: "single",
              prompt: "Wie viele Parameter (Intercept plus Koeffizienten) hat ein Modell mit den drei Features Age, Creatinine und Previous admissions?",
              options: ["3", "4", "6", "1"],
              correct: 1,
              explanation: "Ein Intercept b₀ und drei Koeffizienten b₁, b₂, b₃, zusammen vier Parameter."
            }
          ]
        },

        /* ================= 4.4 How good is the prediction ================= */
        {
          type: "slide",
          title: "Folien 30–31: Gleicher RMSE, gleiche Modellqualität?",
          body: [
            "Eine Kennzahl presst viele Vorhersagen in **eine einzige Zahl**, dabei geht zwangsläufig Information verloren. Zwei Modelle können denselben mittleren Fehler haben und trotzdem sehr unterschiedliche Fehler machen. Man bewertet deshalb die **Grösse** der Fehler und prüft, ob sie ein **systematisches Muster** zeigen.",
            { chart: {
              kind: "scatter",
              caption: "Residuen gegen vorhergesagten Aufenthalt, beide Modelle mit RMSE = 0.96 Tage (eigene Lernpunkte im Stil der Folien 30–31)",
              panels: [
                { title: "Modell A: RMSE = 0.96 Tage", points: [[2.0,0.4],[2.2,0.7],[2.3,0.9],[2.5,1.3],[2.7,0.7],[2.8,1.3],[3.0,-1.4],[3.1,-0.1],[3.3,1.3],[3.5,0.4],[3.6,1.2],[3.8,-1.1],[4.0,-0.1],[4.1,-0.8],[4.3,0.1],[4.4,0.2],[4.6,-1.4],[4.8,-0.8],[4.9,-0.7],[5.1,1.2],[5.3,0.8],[5.4,-1.0],[5.6,0.9],[5.7,-1.1],[5.9,0.3],[6.1,-1.1],[6.2,-1.5],[6.4,1.1],[6.6,-0.9],[6.7,-0.8],[6.9,1.4],[7.0,1.1],[7.2,-0.6],[7.4,1.4],[7.5,0.1],[7.7,0.5],[7.9,-0.9],[8.0,1.3],[8.2,0.6],[8.3,1.4],[8.5,1.2],[8.7,-0.6],[8.8,-0.4],[9.0,-1.0]], note: "Residuen streuen um null, kein erkennbares Muster." },
                { title: "Modell B: RMSE = 0.96 Tage", points: [[2.0,1.2],[2.2,0.8],[2.3,0.9],[2.5,0.4],[2.7,0.5],[2.8,0.1],[3.0,0.0],[3.1,-0.2],[3.3,-0.2],[3.5,-0.7],[3.6,-0.5],[3.8,-0.8],[4.0,-0.8],[4.1,-0.9],[4.3,-1.1],[4.4,-1.3],[4.6,-1.2],[4.8,-1.3],[4.9,-1.1],[5.1,-1.5],[5.3,-1.4],[5.4,-1.4],[5.6,-1.4],[5.7,-1.5],[5.9,-1.4],[6.1,-1.5],[6.2,-1.6],[6.4,-1.4],[6.6,-1.2],[6.7,-1.0],[6.9,-1.0],[7.0,-0.9],[7.2,-0.8],[7.4,-0.7],[7.5,-0.7],[7.7,-0.5],[7.9,-0.1],[8.0,-0.3],[8.2,-0.2],[8.3,0.3],[8.5,0.3],[8.7,0.7],[8.8,0.8],[9.0,0.7]], note: "Residuen folgen einer klaren Kurve: Das Modell verpasst systematisch einen Teil der Beziehung." }
              ],
              note: "Die Null-Linie ist in diesen Mini-Plots nicht eingezeichnet. Achte auf die Form, nicht auf die Achsenwerte."
            } },
            { cards: [
              { title: "How large are the errors?", text: "MAE und RMSE fassen die typische Grösse der Vorhersagefehler zusammen." },
              { title: "How much variation is captured?", text: "R² vergleicht das Modell mit der Variation im beobachteten Outcome." },
              { title: "Is the model missing a pattern?", text: "Residual plots zeigen systematische Struktur, die eine einzelne Kennzahl verbergen kann.", tone: "warn" }
            ] },
            { reveal: {
              question: "Beide Modelle haben RMSE = 0.96 Tage. Welchem würdest du mehr trauen, und warum?",
              label: "Antwort aufdecken",
              answer: [
                "**Modell A.** Seine Residuen streuen zufällig um null, es bleibt kein erkennbares Muster übrig.",
                "Bei Modell B bilden die Residuen eine Kurve. Das Modell verpasst systematisch einen Teil der Beziehung, obwohl die Kennzahl gleich gut aussieht. Genau das kann nur ein Residual plot zeigen."
              ]
            } }
          ],
          remember: "Eine Kennzahl komprimiert und verliert Information. Drei Werkzeuge für drei Fragen: MAE und RMSE (Grösse der Fehler), R² (Variation erfasst), Residual plots (fehlt ein Muster?)."
        },
        {
          type: "slide",
          title: "Folie 32: MAE, der typische absolute Fehler",
          body: [
            "Der **MAE** (mean absolute error) misst den durchschnittlichen Abstand zwischen Vorhersage und beobachtetem Outcome. Man nimmt den **Betrag** jedes Residuals, damit sich Unter- und Überschätzung nicht aufheben, und mittelt dann über alle Patienten.",
            { formula: {
              main: "MAE = (1/n) · Σ |y_i − ŷ_i|",
              parts: [
                { label: "|y_i − ŷ_i|", text: "Betrag des Residuals, also der Abstand zwischen Vorhersage und Beobachtung" },
                { label: "1/n · Σ", text: "Mittelwert über alle n Patienten" }
              ],
              note: "Einheit wie das Target, hier Tage."
            } },
            { table: {
              caption: "Worked example (Folie 32)",
              head: ["Patient", "Residual e_i", "|e_i|"],
              rows: [["1", "0.5", "0.5"], ["2", "−1.0", "1.0"], ["3", "2.0", "2.0"], ["4", "−1.3", "1.3"]],
              marks: { "0,2": "focus", "1,2": "focus", "2,2": "focus", "3,2": "focus" },
              note: "MAE = (0.5 + 1.0 + 2.0 + 1.3) / 4 = 4.8 / 4 = 1.2 Tage. Die Vorhersagen weichen im Mittel 1.2 Tage vom beobachteten Aufenthalt ab."
            } },
            { cards: [
              { title: "Leicht zu interpretieren", text: "Der MAE hat dieselbe Einheit wie das Target, hier Tage." },
              { title: "Jede Einheit Fehler zählt gleich", text: "Ein 2-Tage-Fehler trägt doppelt so viel bei wie ein 1-Tage-Fehler." }
            ] },
            { reveal: {
              question: "Eigene Rechnung: Die Residuen von vier Patienten sind +2, −1, +1 und −2 Tage. Wie gross ist der MAE?",
              label: "Antwort aufdecken",
              answer: [
                "Beträge: 2, 1, 1, 2. Summe 6, geteilt durch 4 ergibt **1.5 Tage**.",
                "Das einfache Mittel der Residuen wäre dagegen 0, und genau deshalb nimmt man den Betrag."
              ]
            } }
          ],
          remember: "MAE = Mittel der Beträge der Residuen, Einheit Tage. Jede zusätzliche Einheit Fehler zählt gleich viel. Beispiel Folie 32: 1.2 Tage."
        },
        {
          type: "slide",
          title: "Folien 33–35: RMSE, und warum MAE und RMSE verschieden urteilen",
          body: [
            "Der **RMSE** (root mean squared error) misst den Fehler ebenfalls in der Einheit des Targets, gibt aber grösseren Residuen mehr Einfluss. Die Residuen werden **vor dem Mitteln quadriert**, deshalb können wenige grosse Fehler den RMSE stark erhöhen. Die Wurzel am Ende bringt die Kennzahl zurück in die Einheit des Targets, hier Tage.",
            { formula: {
              main: "RMSE = √( (1/n) · Σ (y_i − ŷ_i)² )",
              parts: [
                { label: "(y_i − ŷ_i)²", text: "Quadrat vor dem Mitteln, grosse Residuen bekommen mehr Gewicht" },
                { label: "√", text: "Wurzel am Ende, zurück zur Einheit des Targets" }
              ],
              note: "Folie 33: RMSE = 2.1 Tage bei MAE = 1.2 Tage im selben Beispiel. Der RMSE kann deutlich grösser als der MAE sein, wenn ein Modell einige wenige grosse Fehler macht."
            } },
            { table: {
              caption: "RMSE gegen MAE (Folie 33)",
              head: ["Residual", "Beitrag beim MAE", "Squared-error vor dem Mitteln"],
              rows: [["1 Tag", "1", "1"], ["2 Tage", "2", "4"], ["5 Tage", "5", "25"]],
              marks: { "2,1": "warn", "2,2": "bad" },
              note: "Ein 5-Tage-Fehler zählt für den MAE 5-mal so viel wie ein 1-Tage-Fehler, für den RMSE vor dem Mitteln aber 25-mal."
            } },
            { table: {
              caption: "Same MAE, different mistakes (Folien 34–35)",
              head: ["Model", "Absolute errors", "MAE", "RMSE"],
              rows: [
                ["A", "1, 1, 1, 5 Tage", "2.0 d", "2.6 d"],
                ["B", "2, 2, 2, 2 Tage", "2.0 d", "2.0 d"]
              ],
              marks: { "0,2": "focus", "1,2": "focus", "0,3": "warn" },
              note: "Rechnung für A: RMSE = √((1 + 1 + 1 + 25) / 4) = √7 ≈ 2.6. Der MAE kann diese beiden Fehlerprofile nicht unterscheiden. Der RMSE kann es."
            } },
            { reveal: {
              question: "Folie 35 fragt: Ist ein Patient, bei dem die Vorhersage um 5 Tage danebenliegt, schlimmer als vier Patienten mit je etwa 2 Tagen Fehler?",
              label: "Antwort aufdecken",
              answer: [
                "Das ist **keine reine Rechenfrage**, sondern hängt von den klinischen und betrieblichen Folgen ab. Eine universelle Antwort gibt es nicht.",
                "Die Metrik drückt die Wertung aus: Der **MAE** behandelt jede zusätzliche Einheit Fehler gleich. Der **RMSE** bestraft einen gelegentlichen grossen Fehler stärker. Man wählt die Metrik, die zu den Folgen der Fehler passt."
              ]
            } }
          ],
          remember: "RMSE = Wurzel aus dem Mittel der quadrierten Residuen, Einheit Tage. Reagiert stärker auf einzelne grosse Fehler als der MAE. Gleicher MAE (2.0), aber RMSE 2.6 gegen 2.0: Der MAE sieht den Unterschied nicht."
        },
        {
          type: "slide",
          title: "Folie 36: R², der Vergleich mit der Baseline",
          body: [
            "**R²** vergleicht das Modell mit einer einfachen **Baseline**: für jeden Patienten den Mittelwert des Outcomes vorhersagen (ŷ_i = ȳ). Es fragt, wie stark das Modell den **quadrierten Vorhersagefehler** gegenüber dieser Baseline verringert. Anders als MAE und RMSE ist R² **einheitenlos** und beschreibt relative statt absolute Vorhersagegüte.",
            { formula: {
              main: "R² = 1 − Σ(y_i − ŷ_i)² / Σ(y_i − ȳ)²",
              parts: [
                { label: "Zähler", text: "quadrierter Fehler des Modells (Folie 36: 38)" },
                { label: "Nenner", text: "quadrierter Fehler der Baseline, die immer den Mittelwert vorhersagt (Folie 36: 73)" },
                { label: "Ergebnis", text: "einheitenlos, 1 minus das Verhältnis der beiden Fehler" }
              ],
              note: "Folie 36: R² = 1 − 38/73 ≈ 0.47."
            } },
            { table: {
              caption: "R² lesen (Folie 36)",
              head: ["R²", "Bedeutung"],
              rows: [
                ["R² = 1", "Die Vorhersagen stimmen perfekt mit den beobachteten Outcomes überein."],
                ["R² = 0", "Keine Verbesserung gegenüber der Vorhersage des Mittelwerts."],
                ["R² < 0", "Schlechter als die Vorhersage des Mittelwerts."]
              ]
            } },
            { callout: { tone: "warn", title: "Rundungsdifferenz auf der Folie", text: "Die Folie schreibt 1 − 38/73 ≈ 0.47. Mit den angezeigten Summen 38 und 73 ergibt die Rechnung 0.479, gerundet also 0.48. Die Folie arbeitet vermutlich mit ungerundeten Summen. Für die Prüfung zählt die Logik, nicht die zweite Nachkommastelle." } },
            { reveal: {
              question: "Ein Modell hat R² = −0.2. Was heisst das?",
              label: "Antwort aufdecken",
              answer: [
                "R² < 0 bedeutet: Das Modell ist **schlechter** als die Baseline, die für jeden Patienten einfach den Mittelwert vorhersagt.",
                "Das ist möglich, weil R² das Modell mit dieser Baseline vergleicht und nicht mit einem Wert von 0 bis 1 begrenzt ist."
              ]
            } }
          ],
          remember: "R² = 1 − (Fehler des Modells) / (Fehler der Baseline Mittelwert). Einheitenlos. R² = 1 perfekt, 0 nicht besser als der Mittelwert, kleiner als 0 schlechter als der Mittelwert."
        },
        {
          type: "slide",
          title: "Folie 37: Residual plots decken auf, was Kennzahlen verbergen",
          body: [
            "Ein **Residual plot** fragt, ob die Vorhersagefehler **zufällig um null gestreut** sind oder ob ein Muster übrig bleibt. Ein sichtbares Muster ist ein Hinweis, dass das Modell etwas **Systematisches in den Daten nicht erfasst** hat. Folie 37 zeigt vier Datensätze mit **derselben angepassten Geraden** ŷ = 3.0 + 0.5x und R² ≈ 0.67.",
            { table: {
              caption: "Vier Datensätze, gleiche Kennzahlen, verschiedene Probleme (Folie 37)",
              head: ["Datensatz", "Muster im Residual plot", "Bedeutung"],
              rows: [
                ["A (I)", "Residuen zufällig um null, keine erkennbare Struktur", "Das, was wir hoffen zu sehen (What we hope to see)"],
                ["B (II)", "Gekrümmtes Residualmuster", "Non-linearity: Eine Gerade verpasst die Beziehung"],
                ["C (III)", "Eine Beobachtung beeinflusst die Gerade stark", "Influential observation: den ungewöhnlichen Fall untersuchen"],
                ["D (IV)", "Fast alle Beobachtungen haben denselben x-Wert", "Limited variation in x: Ein Punkt bestimmt weitgehend die angepasste Beziehung"]
              ],
              marks: { "0,2": "good", "1,2": "warn", "2,2": "warn", "3,2": "warn" }
            } },
            { callout: { tone: "warn", title: "Gleiche Zahlen, andere Probleme", text: "Alle vier Datensätze haben dieselbe Gerade und R² ≈ 0.67. **R² kann sie nicht unterscheiden, der Residual plot schon.** Darum die Take-Home Message: Kein einzelnes Mass erzählt die ganze Geschichte." } },
            { reveal: {
              question: "Dein Residual plot zeigt eine U-Form, R² beträgt trotzdem 0.67. Würdest du das Modell einfach akzeptieren?",
              label: "Antwort aufdecken",
              answer: [
                "Nein. Ein sichtbares Muster ist Evidenz dafür, dass das Modell etwas Systematisches nicht erfasst hat. Bei einer Kurve ist es die **Nichtlinearität**: Eine gerade Linie verpasst die Beziehung (Datensatz B auf Folie 37).",
                "Die Kennzahl R² allein hätte das nicht verraten, weil sie viele Residuen in eine Zahl zusammenfasst."
              ]
            } }
          ],
          remember: "Residual plot: zufällig um null (gut) oder Muster (Modell verpasst etwas). Vier Fälle: kein Muster, Nichtlinearität, einflussreiche Beobachtung, kaum Variation in x. Gleiche Gerade und R² ≈ 0.67 bei allen vieren."
        },
        {
          type: "checkpoint",
          id: "cp-metrics",
          title: "Checkpoint: MAE, RMSE, R² und Residual plots",
          questions: [
            {
              id: "mae-rechnen",
              type: "type",
              prompt: "Die absoluten Fehler eines Modells sind 1, 1, 1 und 5 Tage. Wie gross ist der MAE? (nur die Zahl, in Tagen)",
              accept: ["2", "2.0", "2,0", "2.00"],
              placeholder: "Zahl",
              explanation: "(1 + 1 + 1 + 5) / 4 = 8 / 4 = 2.0 Tage (Modell A der Folie 34)."
            },
            {
              id: "rmse-vergleich",
              type: "single",
              prompt: "Modell A (Fehler 1, 1, 1, 5 Tage) und Modell B (Fehler 2, 2, 2, 2 Tage) haben beide einen MAE von 2.0 Tagen. Was gilt für den RMSE?",
              options: [
                "A hat den grösseren RMSE (2.6 gegen 2.0), weil der RMSE den einen grossen Fehler stärker gewichtet",
                "Beide haben den RMSE 2.0",
                "B hat den grösseren RMSE",
                "Der RMSE lässt sich bei gleichem MAE nicht berechnen"
              ],
              correct: 0,
              explanation: "RMSE für A = √((1 + 1 + 1 + 25) / 4) = √7 ≈ 2.6, für B = 2.0. Der MAE sieht keinen Unterschied, der RMSE schon."
            },
            {
              id: "r2-aussagen",
              type: "multi",
              prompt: "Welche Aussagen zu R² stimmen?",
              options: [
                "R² vergleicht das Modell mit der Baseline, die für jeden Patienten den Mittelwert vorhersagt",
                "R² ist einheitenlos",
                "R² < 0 bedeutet, dass das Modell schlechter ist als die Vorhersage des Mittelwerts",
                "R² = 0.9 heisst, dass die Vorhersagen im Mittel 0.9 Tage danebenliegen"
              ],
              correct: [0, 1, 2],
              explanation: "R² ist ein relatives, einheitenloses Mass gegenüber der Baseline. Die mittlere Abweichung in Tagen gibt der MAE an, nicht R²."
            },
            {
              id: "residual-muster",
              type: "single",
              prompt: "Ein Residual plot zeigt eine deutliche Kurve (U-Form), obwohl RMSE und R² gut aussehen. Welche Schlussfolgerung passt?",
              options: [
                "Das Modell hat etwas Systematisches nicht erfasst, zum Beispiel eine nichtlineare Beziehung",
                "Das Modell ist in Ordnung, weil RMSE und R² gut sind",
                "Das Modell generalisiert garantiert gut",
                "Die Daten enthalten keine Beziehung zwischen Feature und Target"
              ],
              correct: 0,
              explanation: "Ein sichtbares Muster im Residual plot ist Evidenz für eine systematische Lücke des Modells. Eine einzelne Kennzahl kann das verbergen (Folien 30–31 und 37)."
            }
          ]
        },

        /* ================= 4.5 Generalisation ================= */
        {
          type: "slide",
          title: "Folien 39–40: Generalisierung, Underfitting und Overfitting",
          body: [
            "Auf Folie 39 haben alle drei Modelle aus **genau denselben 15 Patienten** gelernt, aber sehr unterschiedliche Beziehungen gefunden. Ein Modell kann **zu einfach** sein, um ein echtes Muster zu erfassen, oder **so flexibel**, dass es einzelnen Beobachtungen folgt. Entscheidend ist nicht, wie beeindruckend der Fit hier aussieht, sondern wie gut das Modell Patienten vorhersagt, **aus denen es nicht gelernt hat**.",
            { table: {
              caption: "Drei Modelle, dieselben 15 Patienten (Folie 39, Severity score gegen Length of stay)",
              head: ["Modell", "Bezeichnung", "Charakter"],
              rows: [
                ["A", "Underfitting", "Zu einfach"],
                ["B", "Appropriate fit", "Erfasst das breitere Muster"],
                ["C", "Overfitting", "Folgt den Trainingsbeobachtungen zu eng"]
              ],
              marks: { "0,1": "warn", "1,1": "good", "2,1": "bad" }
            } },
            { callout: { tone: "def", title: "Generalisation (Folie 40)", text: ["Generalisation heisst, bei Patienten gut abzuschneiden, die **nicht zum Anpassen des Modells verwendet** wurden.", "Der **Trainingsfehler** zeigt, wie gut das Modell bereits gesehene Beispiele trifft. Der **Fehler auf ungesehenen Patienten** zeigt, ob die gelernte Beziehung auf neue Fälle übertragbar ist."] } },
            { table: {
              caption: "Overfitting-Modell der Folie 40",
              head: ["Daten", "RMSE"],
              rows: [["Training patients", "0.2 d"], ["New patients", "2.5 d"]],
              marks: { "0,1": "good", "1,1": "bad" },
              note: "Das Modell passt die Trainingspatienten fast perfekt an und versagt bei neuen Patienten."
            } },
            { callout: { tone: "warn", title: "Overfitting", text: "Das Modell passt die Trainingsdaten sehr gut an, **generalisiert aber nicht gut auf neue Beobachtungen**. Ein hochflexibles Modell kann Muster lernen, die für die Trainingsstichprobe spezifisch sind, statt Beziehungen, die bei neuen Patienten bestehen bleiben." } },
            { reveal: {
              question: "Ein Modell erreicht auf den Trainingspatienten einen RMSE von 0.2 Tagen. Genügt das, um es einzusetzen?",
              label: "Antwort aufdecken",
              answer: [
                "Nein. Der Trainingsfehler sagt nur, wie gut das Modell Beispiele trifft, die es schon gesehen hat.",
                "Auf neuen Patienten kann der Fehler viel grösser sein: Auf Folie 40 sind es 2.5 Tage statt 0.2 Tage. Zur Beurteilung braucht man den Fehler auf **ungesehenen Patienten**."
              ]
            } }
          ],
          remember: "Underfitting: zu einfach. Appropriate fit: erfasst das breitere Muster. Overfitting: folgt den Trainingsdaten zu eng. Entscheidend ist der Fehler auf ungesehenen Patienten, nicht der Trainingsfehler."
        },
        {
          type: "slide",
          title: "Folie 41: Die beste Anpassung ist selten das beste Vorhersagemodell",
          body: [
            "Mehr Modellflexibilität verbessert in der Regel die **Anpassung an die Trainingsdaten**. Die Vorhersage für neue Patienten verbessert sich aber nur **bis zu einem Punkt**. Ist das Modell zu einfach, verpasst es nützliche Struktur (Underfitting). Ist es zu flexibel, passt es sich an Variation an, die nur in der Stichprobe vorkommt (Overfitting).",
            { chart: {
              kind: "scatter",
              caption: "Modellflexibilität (Polynomgrad, x) gegen RMSE in Tagen (y), ungefähr aus der Grafik der Folie 41 abgelesen",
              panels: [
                { title: "Fehler auf Trainingspatienten", points: [[1, 0.95], [2, 0.74], [3, 0.70], [4, 0.68], [5, 0.66], [6, 0.64], [7, 0.61], [8, 0.59], [9, 0.56], [10, 0.53], [11, 0.50], [12, 0.47]], note: "Sinkt mit jeder zusätzlichen Flexibilität weiter." },
                { title: "Fehler auf neuen Patienten", points: [[1, 1.02], [2, 0.86], [3, 0.85], [4, 0.88], [5, 0.90], [6, 0.93], [7, 1.00], [8, 1.15], [9, 1.31], [10, 1.89], [11, 2.8]], note: "Tiefster Wert bei wenig bis mittlerer Flexibilität, danach steigt der Fehler stark. Bei Grad 12 liegt er über 4 Tagen und ist hier nicht eingezeichnet." }
              ]
            } },
            { cards: [
              { title: "Underfitting", text: "Too simple. Das Modell verpasst nützliche Struktur.", tone: "warn" },
              { title: "Best generalisation", text: "Lowest error on new patients. Hier liegt das Ziel.", tone: "good" },
              { title: "Overfitting", text: "Too flexible. Das Modell passt sich an Variation an, die nur in der Stichprobe vorkommt.", tone: "bad" }
            ] },
            { reveal: {
              question: "Du vergleichst mehrere Modelle mit steigender Flexibilität, und der Trainingsfehler sinkt bei jedem Schritt. Was sagt das über das beste Modell?",
              label: "Antwort aufdecken",
              answer: [
                "Für sich genommen **nichts**. Der Trainingsfehler sinkt mit zunehmender Flexibilität in der Regel immer weiter, auch wenn das Modell für neue Patienten schon schlechter wird.",
                "Man muss den **Fehler auf neuen Patienten** betrachten. Er sinkt nur bis zu einem Punkt und steigt danach wieder: Dort, wo er am tiefsten ist, liegt die beste Generalisierung."
              ]
            } }
          ],
          remember: "Training error sinkt mit der Flexibilität weiter. Der Fehler auf neuen Patienten hat ein Minimum (best generalisation) und steigt danach. Die beste Anpassung ist selten das beste Vorhersagemodell."
        },
        {
          type: "checkpoint",
          id: "cp-general",
          title: "Checkpoint: Generalisierung",
          questions: [
            {
              id: "diagnose",
              type: "single",
              prompt: "Ein Modell hat auf den Trainingspatienten einen RMSE von 0.2 Tagen, auf neuen Patienten aber 2.5 Tage. Welche Diagnose passt?",
              options: ["Underfitting", "Overfitting", "Appropriate fit", "Das Modell ist perfekt, weil der Trainingsfehler so klein ist"],
              correct: 1,
              explanation: "Sehr guter Fit auf den Trainingsdaten, aber schlechte Leistung bei neuen Patienten ist die Definition von Overfitting (Folie 40)."
            },
            {
              id: "flexibilitaet",
              type: "order",
              prompt: "Die Modellflexibilität steigt Schritt für Schritt. Bringe die Beobachtungen in die Reihenfolge, in der sie auf Folie 41 auftreten.",
              items: [
                "Der Trainingsfehler sinkt, und auch der Fehler auf neuen Patienten sinkt zunächst",
                "Der Fehler auf neuen Patienten erreicht seinen tiefsten Wert (Best generalisation)",
                "Der Trainingsfehler sinkt weiter, der Fehler auf neuen Patienten beginnt zu steigen",
                "Der Fehler auf neuen Patienten steigt stark (Overfitting)"
              ],
              explanation: "Zu Beginn verbessern sich beide Fehler, dann liegt das Optimum bei den neuen Patienten, danach beginnt das Overfitting. Der Trainingsfehler sinkt die ganze Zeit."
            },
            {
              id: "begriff",
              type: "type",
              prompt: "Wie heisst es, wenn ein Modell zu einfach ist, um ein echtes Muster zu erfassen? (englischer Fachbegriff)",
              accept: ["underfitting", "under-fitting", "under fitting", "Underfitting", "underfit"],
              placeholder: "englischer Fachbegriff",
              explanation: "Underfitting: Das Modell ist zu einfach und verpasst nützliche Struktur (Folie 39, Model A)."
            },
            {
              id: "generalisierung-aussagen",
              type: "multi",
              prompt: "Welche Aussagen zur Generalisierung sind richtig?",
              options: [
                "Der Fehler auf ungesehenen Patienten zeigt, ob die gelernte Beziehung auf neue Fälle übertragbar ist",
                "Mehr Modellflexibilität verbessert in der Regel die Anpassung an die Trainingsdaten",
                "Das Modell mit dem kleinsten Trainingsfehler ist immer das beste Vorhersagemodell",
                "Overfitting heisst, dass das Modell zu wenig gelernt hat"
              ],
              correct: [0, 1],
              explanation: "Der Trainingsfehler allein ist kein Gütekriterium. Overfitting heisst nicht zu wenig, sondern zu eng an die Trainingsdaten gelernt, zu wenig gelernt wäre Underfitting."
            }
          ]
        },

        /* ================= 4.6 Summary ================= */
        {
          type: "slide",
          title: "Folien 43–44: Die fünf Take-Home Messages",
          body: [
            { table: {
              caption: "Die fünf Messages auf einen Blick",
              head: ["#", "Message", "Kern in einem Satz"],
              rows: [
                ["01", "Regression predicts quantities", "Das Target ist ein kontinuierlicher Wert wie Length of stay, Blutdruck oder Tumorvolumen."],
                ["02", "Training means learning from prediction errors", "Residuen vergleichen y mit ŷ, eine Loss-Funktion fasst sie zusammen, damit das Modell passende Parameter lernen kann."],
                ["03", "No single metric tells the whole story", "Grösse und Muster der Fehler bewerten: MAE und RMSE, R² gegen die Baseline, Residual plots für systematische Fehler."],
                ["04", "Training performance is not the only goal", "Ein nützliches Modell muss auf Patienten generalisieren, aus denen es nicht gelernt hat. Zu komplexe Modelle können overfitten."],
                ["05", "Prediction is not causation", "Ein nützlicher Prädiktor muss keine Ursache sein. Koeffizienten beschreiben Vorhersagebeziehungen, Kausalität braucht zusätzliche Annahmen und geeignete Studiendesigns."]
              ],
              marks: { "2,0": "focus", "2,1": "focus", "4,0": "focus", "4,1": "focus" }
            } },
            { callout: { tone: "exam", title: "Take-Home 03 und 05 sind die häufigsten Fallen", text: ["**03:** Ein guter RMSE oder R² allein beweist nichts. Erst der Residual plot zeigt, ob ein Muster übrig bleibt.", "**05:** Ein Koeffizient beschreibt, wie sich die **Vorhersage** ändert, nicht, was bei einem Eingriff passieren würde. Dieselbe Warnung steckt schon in den Folien 17 und 27."] } },
            { callout: { tone: "warn", title: "Die Überschriften der Folien 43 und 44 passen nicht zu Lecture 04", text: "Folie 43 trägt die Überschrift „Understand the data before changing the data“ und Folie 44 „Prepare the data without losing their meaning“. Das sind dieselben Überschriften wie in den Take-Home Messages von Lecture 03 und passen inhaltlich nicht zu den Regressions-Messages darunter. Der Inhalt der fünf Messages ist eindeutig, die Überschriften sind vermutlich ein Überbleibsel." } },
            { reveal: {
              question: "Warum reicht ein guter RMSE auf den Trainingsdaten nicht als Beweis für ein gutes Modell? Nenne zwei Messages, die das begründen.",
              label: "Antwort aufdecken",
              answer: [
                "**Message 03:** Keine einzelne Kennzahl erzählt die ganze Geschichte. Der RMSE komprimiert viele Fehler in eine Zahl, und systematische Muster in den Residuen bleiben unsichtbar.",
                "**Message 04:** Trainingsleistung ist nicht das einzige Ziel. Ein Modell muss auf Patienten generalisieren, aus denen es nicht gelernt hat, und zu komplexe Modelle können overfitten (Folie 40: 0.2 d gegen 2.5 d)."
              ]
            } }
          ],
          remember: "01 Target ist eine Zahl. 02 Training heisst aus Vorhersagefehlern lernen. 03 Keine Einzelkennzahl erzählt alles. 04 Auf ungesehene Patienten generalisieren. 05 Vorhersage ist nicht Kausalität."
        },
        {
          type: "slide",
          title: "Das muss ich nach Vorlesung 4 können",
          body: [
            "Hak ab, was du jetzt wirklich kannst. Was offen bleibt, weisst du, wo du es nachlesen musst.",
            { checklist: { title: "Kann ich das jetzt?", items: [
              "Ich kann bei einem Ziel entscheiden, ob es **Regression oder Klassifikation** ist, und erkläre, warum eine Wahrscheinlichkeit als Ausgabe daran nichts ändert.",
              "Ich kann **Features X, Target y, Prediction ŷ und Residual** unterscheiden und ihre Rollen nennen.",
              "Ich kann **e = y − ŷ** berechnen und sagen, ob das Modell unter- oder überschätzt.",
              "Ich kann **ŷ = b₀ + b₁x** aufschreiben und die Steigung in Worten und mit Einheit deuten.",
              "Ich kann für einen neuen Patienten eine Vorhersage ausrechnen und erklären, warum sie nur eine **Punktvorhersage** ist.",
              "Ich kann den **MSE** von Hand berechnen und das **Least-squares-Prinzip** erklären.",
              "Ich kann begründen, warum Residuen **quadriert** werden und warum das nicht für jede klinische Frage ideal ist.",
              "Ich kann einen Koeffizienten **bedingt interpretieren** („bei gleichen Werten der anderen Predictors“) und erklären, warum er keine Kausalaussage ist.",
              "Ich kann erklären, warum sich der Koeffizient bei einer anderen **Einheit** ändert, die Vorhersage aber nicht.",
              "Ich kann **MAE und RMSE** berechnen und sagen, wann sie sich stark unterscheiden.",
              "Ich kann **R²** als Vergleich mit der Baseline Mittelwert erklären und sagen, was R² = 1, R² = 0 und R² < 0 bedeuten.",
              "Ich kann einen **Residual plot** lesen und Nichtlinearität, einflussreiche Beobachtung und kaum Variation in x erkennen.",
              "Ich kann **Underfitting, Appropriate fit und Overfitting** unterscheiden und erklären, warum der Fehler auf ungesehenen Patienten zählt."
            ] } }
          ],
          remember: "Dreizehn Punkte. Was nicht abgehakt ist, kommt auf den Wiederholungsstapel."
        },
        {
          type: "slide",
          title: "Transfer: vier Szenarien zum Selberdenken",
          body: [
            "Diese Fälle stehen so nicht auf den Folien. Sie verbinden mehrere Konzepte, und genau das wird in Prüfungen gern verlangt. Denk jeweils erst selbst nach.",
            { reveal: {
              question: "**Szenario 1.** Ein Team meldet: „Unser Length-of-stay-Modell hat R² = 0.85 auf den Trainingspatienten, wir setzen es morgen ein.“ Welche zwei Rückfragen stellst du?",
              label: "Antwort aufdecken",
              answer: [
                "**Erstens:** Wie gut ist das Modell auf Patienten, aus denen es **nicht gelernt hat**? Der Trainingsfehler sagt nichts darüber, ob das Modell overfittet (Folien 40–41, Take-Home 04).",
                "**Zweitens:** Wie gross sind die Fehler in Tagen (MAE, RMSE), und wie sieht der **Residual plot** aus? R² ist einheitenlos und zeigt keine Muster (Folien 31 und 37, Take-Home 03)."
              ]
            } },
            { reveal: {
              question: "**Szenario 2.** Ein Kollege sagt: „b_age = 0.04, also verlängert jedes Lebensjahr den Aufenthalt um 0.04 Tage. Das Alter verursacht längere Aufenthalte.“ Was stimmt daran, was nicht?",
              label: "Antwort aufdecken",
              answer: [
                "**Stimmt:** Bei gleichen Werten der anderen enthaltenen Predictors geht ein Jahr Altersunterschied mit 0.04 Tagen Unterschied in der **Vorhersage** einher.",
                "**Stimmt nicht:** Die ursächliche Aussage. Variablen ausserhalb des Modells, etwa Gebrechlichkeit oder Krankheitsschwere, können sich zwischen den Patienten unterscheiden (Folien 17 und 27, Take-Home 05)."
              ]
            } },
            { reveal: {
              question: "**Szenario 3.** Modell X hat MAE 1.2 d und RMSE 1.3 d. Modell Y hat MAE 1.2 d und RMSE 2.4 d. Was kannst du über die Fehlerprofile sagen, und was brauchst du, um zu entscheiden?",
              label: "Antwort aufdecken",
              answer: [
                "Der MAE ist gleich, aber der RMSE von Y ist viel grösser. Das spricht dafür, dass Y **einzelne grosse Fehler** macht, während X seine Fehler gleichmässiger verteilt (Folien 33–35).",
                "Zur Entscheidung braucht es die **klinischen und betrieblichen Folgen** grosser Fehler: Sind einzelne Ausreisser besonders schlimm, ist X besser. Dazu hilft ein Blick auf die Fehlerverteilung und den Residual plot."
              ]
            } },
            { reveal: {
              question: "**Szenario 4.** Kollege A misst das Alter in Jahren und erhält den Koeffizienten 0.05. Kollegin B misst es in Dekaden und erhält 0.5. Sie sagt: „Bei mir ist das Alter zehnmal wichtiger.“ Was antwortest du?",
              label: "Antwort aufdecken",
              answer: [
                "Beide Modelle sind **dasselbe Modell in verschiedenen Einheiten**: 1.8 + 0.05 × 70 und 1.8 + 0.5 × 7 ergeben beide 5.3 Tage.",
                "Die Grösse eines Koeffizienten hängt von der Einheit des Features ab und sagt für sich nichts über die Wichtigkeit. Selbst nach dem Standardisieren bedeutet ein grösserer Koeffizient nicht automatisch einen wichtigeren Prädiktor (Folie 28)."
              ]
            } }
          ],
          remember: "Transfer heisst: mehrere Konzepte verbinden. Trainingsleistung und Generalisierung, Koeffizient und Kausalität, MAE und RMSE, Einheit und Wichtigkeit."
        },
        {
          type: "slide",
          title: "Was war nur Zusatzwissen?",
          body: [
            "Damit du deine Lernzeit richtig verteilst: Diese Inhalte solltest du einordnen können, sie brauchen aber nicht denselben Aufwand wie der Rest.",
            { list: [
              "**Course Overview (Folie 4).** Zeigt, dass Lecture 04 zu Part II „Learning from Data“ gehört. Reine Orientierung.",
              "**Konkrete Patientenwerte des Eröffnungsfalls (Folie 5).** Du musst nicht wissen, dass der Patient 104 bpm und Creatinine 142 µmol/L hatte. Wichtig ist, dass 6.2 Tage eine Vorhersage und keine Beobachtung ist.",
              "**Einzelne Punkte im Scatter plot (Folien 14–15).** Es zählt die Aussage: Im Mittel längere Aufenthalte bei höherem Alter, aber das Alter allein legt den Einzelfall nicht fest.",
              "**Die formale Schreibweise f_w: X → y (Folien 10–11).** Gut zu kennen, damit du die Notation lesen kannst. Der Kern ist die Idee, aus Beispielen eine Beziehung zu lernen.",
              "**Die genauen Zahlen der Beispiele,** etwa MSE von A, B und C (Folie 22) oder R² ≈ 0.47. Du musst das Vorgehen rechnen können, nicht die Zahlen auswendig wissen.",
              "**Die Überschriften der Folien 43–44.** Sie stammen von Lecture 03, die Messages darunter sind massgebend."
            ] },
            { callout: { tone: "tip", title: "Faustregel für die Prüfungsvorbereitung", text: "Investiere deine Zeit dort, wo der Dozent mehrere Folien für dasselbe Thema verwendet hat: vier Folien für MAE und RMSE (32–35), vier für Multiple Regression und Koeffizienten (25–28), drei für MSE, Quadrieren und Least squares (21–23) und drei für Generalisierung (39–41)." } }
          ],
          remember: "Nice to know: Course Overview, konkrete Werte des Eröffnungsfalls, einzelne Scatter-Punkte, formale Notation, genaue Zahlen der Beispiele, Überschriften der Folien 43–44. Zeit investieren, wo der Dozent mehrere Folien verwendet hat."
        },
        {
          type: "checkpoint",
          id: "cp-final",
          title: "Prüfungs-Check: die ganze Vorlesung",
          questions: [
            {
              id: "least-squares-begriff",
              type: "type",
              prompt: "Wie heisst das Prinzip, bei dem b₀ und b₁ so gewählt werden, dass die quadrierten Residuen über die Trainingsdaten möglichst klein sind? (englischer Fachbegriff, zwei Wörter)",
              accept: ["least squares", "least-squares", "least squares principle", "least-squares principle", "Least squares", "ordinary least squares", "methode der kleinsten quadrate", "kleinste quadrate"],
              placeholder: "englischer Fachbegriff",
              explanation: "Least-squares-Prinzip (Folie 22): Parameter wählen, die den MSE auf den Trainingsdaten minimieren."
            },
            {
              id: "take-home",
              type: "multi",
              prompt: "Welche Aussagen gehören zu den Take-Home Messages dieser Vorlesung?",
              options: [
                "Das Target einer Regression ist ein kontinuierlicher Wert",
                "Training heisst, aus Vorhersagefehlern zu lernen",
                "Keine einzelne Kennzahl erzählt die ganze Geschichte",
                "Ein nützlicher Prädiktor muss keine Ursache des Outcomes sein",
                "Ein hohes R² auf den Trainingsdaten garantiert gute Vorhersagen für neue Patienten",
                "Ein grösserer Koeffizient zeigt immer einen kausalen Effekt"
              ],
              correct: [0, 1, 2, 3],
              explanation: "Die ersten vier Aussagen sind die Messages 01, 02, 03 und 05. Message 04 sagt gerade das Gegenteil von der fünften Option: Trainingsleistung garantiert keine gute Generalisierung. Koeffizienten beschreiben Vorhersagebeziehungen, keine Kausalität."
            },
            {
              id: "szenario-r2",
              type: "single",
              prompt: "Ein Team berichtet für sein Modell nur R² = 0.9 auf den Trainingsdaten. Was fehlt vor allem, um das Modell zu beurteilen?",
              options: [
                "Der Fehler auf Patienten, die nicht zum Training gehörten, sowie ein Residual plot",
                "Eine Erklärung, warum R² einheitenlos ist",
                "Die Anzahl der Features im Modell, mehr Features sind immer besser",
                "Nichts, ein R² von 0.9 reicht als Beweis"
              ],
              correct: 0,
              explanation: "Trainingsleistung ist nicht das einzige Ziel (Message 04), und keine einzelne Kennzahl erzählt die ganze Geschichte (Message 03). Man braucht den Fehler auf ungesehenen Patienten und einen Blick auf die Residuen."
            },
            {
              id: "entwicklungsablauf",
              type: "order",
              prompt: "Du entwickelst ein Regressionsmodell für die Length of stay. Bringe die Schritte in eine sinnvolle Reihenfolge.",
              items: [
                "Das Target festlegen: Length of stay ist eine kontinuierliche Menge, also Regression",
                "Die Parameter aus Patienten mit bekanntem Outcome lernen, indem der Loss (zum Beispiel der MSE) minimiert wird",
                "Den Fehler auf Patienten messen, aus denen nicht gelernt wurde (MAE, RMSE, R²), und die Residual plots ansehen",
                "Die Vorhersagen für neue Patienten als Schätzung verwenden, nicht als Kausalaussage"
              ],
              explanation: "Target klären → aus Beispielen lernen → auf ungesehenen Patienten bewerten → Vorhersagen mit der richtigen Lesart verwenden."
            },
            {
              id: "gleicher-rmse",
              type: "single",
              prompt: "Zwei Modelle haben beide RMSE = 0.96 Tage. Beim einen liegen die Residuen zufällig um null, beim anderen bilden sie eine Kurve. Welchem Modell traust du mehr?",
              options: [
                "Dem mit zufällig gestreuten Residuen, das andere verpasst systematisch einen Teil der Beziehung",
                "Dem mit der Kurve, weil sie zeigt, dass das Modell etwas gelernt hat",
                "Beiden gleich, weil der RMSE gleich ist",
                "Keinem, weil der RMSE nie aussagekräftig ist"
              ],
              correct: 0,
              explanation: "Ein Muster im Residual plot ist Evidenz für eine systematische Lücke. Gleicher RMSE heisst nicht gleiche Qualität (Folien 30–31)."
            }
          ]
        }
      ]
    }
  ]
});
