/*
 * RESE HS 2026 – Matteo Spada. Offizielle Quellen bleiben im Fachordner ausserhalb des Repos.
 * Deutsche Erklärungen und Aufgaben, englische Fachbegriffe bleiben erhalten.
 * Keine bestätigte Prüfungssprache oder Open-Book-Regel aus den Folien abgeleitet.
 * SW2 ist Selbststudium: aktualisierter Plan in Road to Resilience_full, Folie 3.
 * Fragen, Transfers und numerische Lernbeispiele sind eigene Formulierungen.
 * W1: 01 (01) RESE Introduction - Organisational Matters.pdf; 01 (02) RESE Resilience term history.pdf
 * Abdeckung: Introduction: Folien 1–32; History: Folien 1–13. Schwerpunkt: Introduction 12–18, 20–29, 31; History 2–10.
 * Gewichtung: A: Begriffsentwicklung, Hollings Beitrag, soziotechnische Systeme und Fallstudienlogik. B: Anwendungsbeispiele. C: Organisation, Biografien, historische Einzeljahre. Didaktische Gewichtung, keine Prüfungszusage.
 * W2: 02 (01) RESE Road to Resilience.pdf; 02 (02) RESE Resilience curve and key components.pdf; 02 (01) RESE Road to Resilience_full.pdf (Plan, Folie 3)
 * Abdeckung: Road: Folien 1–32 (in SW3 anhand der vollständigen Fassung vertieft); Curves: Folien 1–18. SW2-Unterlagen als Selbststudium, laut korrigiertem Plan kein Unterricht in SW2.
 * Gewichtung: A: Definition, Kurvenlesen, vier Verläufe und Modellbegriffe anwenden. B: Funktionen und Systemebene vergleichen. C: Literaturhistorie. Gewichtung nach SW2-Lernzielen, keine Prüfungszusage.
 * W3: 02 (01) RESE Road to Resilience_full.pdf
 * Abdeckung: Road to Resilience_full: Folien 1–37; Schwerpunkt 6–35. Vollständige Fassung ersetzt die kürzere Road-Fassung in SW2. Korrigierter Plan: Folie 3.
 * Gewichtung: A: Safety-I/Safety-II, performance variability, vier Fähigkeiten und Fallanwendung. B: Unfallmodelle und historische Beispiele. C: Zeitachsendetails, Umfragen und Literaturhinweise. Grundlage: Lernziele Folie 6.
 * W4: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf; 03 (02) RESE Group Exercise.pdf; Resilience Curve.pdf
 * Abdeckung: Hauptfolien 1–47, einschliesslich eingeordnetem Backup; Gruppenübung Folien 1–4 und einseitige Resilience Curve. Alte SW3-Beschriftungen im Inhalt; Zuordnung nach SW4-Titelseite, Ablage und korrigiertem Plan.
 * Gewichtung: A: vier Konzepte abgrenzen und auf die Resilienzkurve beziehen; einfache Risiko- und Zuverlässigkeitsrechnungen. B: Assessments, Modelle und Herleitung. C: historische Backups und Verteilungskatalog. Grundlage: Lernziele Folie 7; keine Prüfungszusage.
 */
Lerncoach.registerSubject({
  "id": "RESE",
  "name": "Resilienz-Engineering",
  "short": "RESE",
  "description": "Von der Begriffsgeschichte über Safety-II und Resilienzkurven zu Risiko und Zuverlässigkeit.",
  "accent": "#28736b",
  "weeks": [
    {
      "id": "w1",
      "number": 1,
      "title": "Einführung und Begriffsgeschichte",
      "status": "ready",
      "items": [
        {
          "type": "slide",
          "title": "Worum es in RESE geht",
          "body": [
            "Ein Stromnetz, ein Flughafen oder ein Informationssystem erfüllt eine gesellschaftlich benötigte Funktion. Technik allein reicht dafür nicht: Menschen, Organisationen und andere Infrastrukturen wirken mit. Eine Störung kann deshalb wirtschaftliche und soziale Folgen auslösen.",
            "Diese Woche verbindet zwei Fragen: Warum müssen wir solche Systeme über einzelne Defekte hinaus betrachten, und weshalb bedeutet „Resilienz“ mehr als ein Wort aus der Ökologie?",
            {
              "callout": {
                "tone": "tip",
                "title": "Dein Lernweg",
                "text": "Begriff verstehen → Bedeutungen unterscheiden → auf einen eigenen Systemfall anwenden. Die Gewichtung folgt den Modulzielen, nicht einer garantierten Prüfungsprognose."
              }
            },
            "Quelle: 01 (01) RESE Introduction - Organisational Matters.pdf, Folien 12–14"
          ],
          "remember": "Resilienz wird im Modul auf vernetzte soziotechnische Systeme bezogen."
        },
        {
          "type": "slide",
          "title": "Ein System ist mehr als seine Geräte",
          "body": [
            "Soziotechnisch bedeutet, dass technische Komponenten und menschliches Handeln gemeinsam die Leistung ermöglichen. Bei einer Lieferkette gehören etwa Informationsflüsse, Transportmittel und die Koordination dazu. Dieses Beispiel ist eine eigene Anwendung der genannten Systemklassen.",
            {
              "table": {
                "head": [
                  "Systemklasse aus den Folien",
                  "Mögliche Störung laut Modulbeschreibung"
                ],
                "rows": [
                  [
                    "Energie und Transport",
                    "Naturereignis oder technischer Ausfall"
                  ],
                  [
                    "Versorgung und Information",
                    "Menschlicher Fehler oder absichtlicher Angriff"
                  ]
                ],
                "caption": "Systeme und Störungen: keine exklusive Zuordnung"
              }
            },
            {
              "reveal": {
                "question": "Eigener Transfer: Warum reicht beim Flughafen eine Liste intakter Geräte nicht aus?",
                "answer": "Sie beschreibt weder die Zusammenarbeit von Personal und Organisationen noch die Abhängigkeiten, die den benötigten Betrieb ermöglichen. Der Systembezug muss die Funktion und die relevanten Wechselwirkungen umfassen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 01 (01) RESE Introduction - Organisational Matters.pdf, Folien 12–13"
          ],
          "remember": "Funktion und Wechselwirkungen bestimmen den Untersuchungsgegenstand."
        },
        {
          "type": "slide",
          "title": "Was du später mit dem Stoff tun sollst",
          "body": [
            "Die Modulziele gehen vom Diskutieren des Resilienzbegriffs über die Abgrenzung verwandter Konzepte bis zum Anwenden von Metriken und zum Lösen einfacher Fallstudien. Reines Wiedererkennen von Definitionen deckt diese Ziele nicht ab.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Begriffe",
                    "text": "Resilienz erklären und abgrenzen"
                  },
                  {
                    "title": "Bewertung",
                    "text": "Metriken auswählen und diskutieren"
                  },
                  {
                    "title": "Anwendung",
                    "text": "Einen konkreten Fall bearbeiten"
                  }
                ]
              }
            },
            {
              "reveal": {
                "question": "Wie würdest du eine Lernlücke bemerken, obwohl du alle Begriffe aufsagen kannst?",
                "answer": "Wenn du für eine konkrete Störung kein System, keine passende Bewertungsmethode oder keine begründete Interpretation nennen kannst, fehlt die Anwendungsebene.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 01 (01) RESE Introduction - Organisational Matters.pdf, Folien 13–14"
          ],
          "remember": "Erklären, unterscheiden, messen und anwenden gehören zusammen."
        },
        {
          "type": "checkpoint",
          "id": "cp-system",
          "title": "Checkpoint: System und Lernziel",
          "questions": [
            {
              "id": "scope",
              "type": "multi",
              "prompt": "Welche Aspekte gehören zur RESE-Modulbeschreibung?",
              "options": [
                "Vernetzte Infrastrukturen",
                "Nur Materialelastizität",
                "Wirtschaftliche und soziale Störungsfolgen",
                "Technische Ausfälle und menschliche Fehler"
              ],
              "correct": [
                0,
                2,
                3
              ],
              "explanation": "RESE untersucht soziotechnische Systeme und verschiedene Störungen, nicht nur Materialien. Quelle: 01 (01) RESE Introduction - Organisational Matters.pdf, Folien 12–14"
            },
            {
              "id": "goal",
              "type": "single",
              "prompt": "Eine Definition auswendig kennen genügt für welches Modulziel noch nicht?",
              "options": [
                "Den Begriff wiedergeben",
                "Eine einfache Fallstudie eigenständig lösen",
                "Eine Bezeichnung wiedererkennen"
              ],
              "correct": 1,
              "explanation": "Eine Fallstudie verlangt die Anwendung und Begründung von Entscheidungen. Quelle: 01 (01) RESE Introduction - Organisational Matters.pdf, Folien 12–14"
            },
            {
              "id": "system",
              "type": "type",
              "prompt": "Wie heissen Systeme, in denen Technik, Menschen und Organisation gemeinsam wirken? (Adjektiv)",
              "accept": [
                "soziotechnisch",
                "sozio-technisch",
                "sociotechnical",
                "socio-technical",
                "soziotechnische Systeme"
              ],
              "explanation": "Die Vorlesung spricht von socio-technological beziehungsweise sozio-technischen Systemen. Quelle: 01 (01) RESE Introduction - Organisational Matters.pdf, Folien 12–14"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Der verbreitete Herkunftsirrtum",
          "body": [
            "Holling prägte 1973 die ökologische Resilienzdebatte. Daraus folgt aber nicht, dass er das Wort erfunden hat. Die Vorlesung zeigt wesentlich ältere Verwendungen in Sprache, Naturbetrachtung und Materialwissenschaft.",
            {
              "compare": {
                "left": {
                  "title": "Wortgeschichte",
                  "points": [
                    "Ältere Verwendungen und Bedeutungswandel",
                    "Nicht auf eine Disziplin beschränkt"
                  ]
                },
                "right": {
                  "title": "Ökologischer Beitrag",
                  "points": [
                    "Holling 1973: Persistenz ökologischer Systeme",
                    "Wichtige Station für spätere Übertragungen"
                  ]
                }
              }
            },
            {
              "reveal": {
                "question": "Was ist an „Resilienz wurde 1973 erfunden“ falsch?",
                "answer": "Die Aussage verwechselt einen bedeutenden fachlichen Beitrag mit der Entstehung des Wortes. Die älteren Verwendungen widerlegen diese Gleichsetzung.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 01 (02) RESE Resilience term history.pdf, Folien 2, 9–10"
          ],
          "remember": "Holling ist eine wichtige Station, nicht der Ursprung des Wortes."
        },
        {
          "type": "slide",
          "title": "Zurückspringen, zurückziehen, widerrufen",
          "body": [
            "Die lateinische Wortfamilie um resilire umfasst Zurückspringen und Zurückprallen, aber auch Zurückweichen. In den späteren französischen und englischen Verwendungen kommen Rücknahme und Widerruf hinzu. Historisch ist der Ausdruck also nicht durchgehend positiv.",
            {
              "table": {
                "head": [
                  "Bedeutungsfeld",
                  "Was du daran erkennen sollst"
                ],
                "rows": [
                  [
                    "Rebound / spring back",
                    "Zurückbewegung nach einer Einwirkung"
                  ],
                  [
                    "Retract / cancel",
                    "Rücknahme einer Position oder Entscheidung"
                  ],
                  [
                    "Avoid / recoil",
                    "Ausweichen oder Zurückweichen"
                  ]
                ],
                "caption": "Bedeutungsfelder in eigenen Worten"
              }
            },
            {
              "callout": {
                "tone": "tip",
                "title": "Lernpriorität",
                "text": "Verstehe den Bedeutungswandel. Antike Zitate, Personenbiografien und einzelne Jahreszahlen sind hier ergänzender Kontext."
              }
            },
            "Quelle: 01 (02) RESE Resilience term history.pdf, Folien 3–5"
          ],
          "remember": "Die heutige positive Bewertung darf nicht auf alle historischen Verwendungen übertragen werden."
        },
        {
          "type": "slide",
          "title": "Vom Echo zur Materialantwort",
          "body": [
            "Bei Bacon illustriert das Echo eine Rückwirkung beziehungsweise ein Zurückprallen. Spätere Materialbetrachtungen interessieren sich dafür, wie Holz oder Stahl auf Belastung reagieren. Bei Stahl nennt die Vorlesung Widerstand durch Festigkeit und Aufnahme der Belastung durch Verformung.",
            {
              "compare": {
                "left": {
                  "title": "Festigkeit / rigidity",
                  "points": [
                    "Widerstand gegen die Einwirkung"
                  ]
                },
                "right": {
                  "title": "Duktilität / ductility",
                  "points": [
                    "Verformung ermöglicht die Aufnahme der Einwirkung"
                  ]
                }
              }
            },
            {
              "reveal": {
                "question": "Eigener Lernfall: Zwei Träger überstehen dieselbe Belastung. Einer bleibt fast unverformt, der andere verformt sich. Sind das dieselben Mechanismen?",
                "answer": "Nein. Das Überstehen ist das beobachtete Ergebnis; Widerstand und Aufnahme durch Verformung beschreiben unterschiedliche Beiträge. Aus dem Ergebnis allein darf man nicht auf identisches Verhalten schliessen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 01 (02) RESE Resilience term history.pdf, Folien 6–8"
          ],
          "remember": "Gleicher Ausgang bedeutet nicht gleicher Bewältigungsmechanismus."
        },
        {
          "type": "checkpoint",
          "id": "cp-history",
          "title": "Checkpoint: Bedeutungswandel",
          "questions": [
            {
              "id": "path",
              "type": "order",
              "prompt": "Ordne diese Stationen historisch.",
              "items": [
                "Lateinische Wortfamilie",
                "Bacons Echo-Beispiel",
                "Materialbetrachtungen im 19. Jahrhundert",
                "Hollings ökologische Arbeit"
              ],
              "explanation": "Die Stationen reichen von antiken Sprachverwendungen über Naturbetrachtung und Materialien bis zur Ökologie. Quelle: 01 (02) RESE Resilience term history.pdf, Folien 2–8"
            },
            {
              "id": "history-claims",
              "type": "multi",
              "prompt": "Welche Aussagen werden durch die Begriffsgeschichte gestützt?",
              "options": [
                "Das Wort wurde ausschliesslich positiv verwendet.",
                "Es gab Verwendungen vor Holling.",
                "Materialresilienz kann Widerstand und Verformung verbinden.",
                "Alle Disziplinen benutzen dieselbe Definition."
              ],
              "correct": [
                1,
                2
              ],
              "explanation": "Die Geschichte zeigt ältere und teils negative Bedeutungen sowie disziplinabhängige Verwendungen. Quelle: 01 (02) RESE Resilience term history.pdf, Folien 2–8"
            },
            {
              "id": "deformation",
              "type": "type",
              "prompt": "Welcher englische Begriff bezeichnet im Stahlbeispiel die Aufnahme durch Verformung?",
              "accept": [
                "ductility",
                "Duktilität",
                "Duktilitaet"
              ],
              "explanation": "Ductility ergänzt strength/rigidity; es geht nicht ausschliesslich um Steifigkeit. Quelle: 01 (02) RESE Resilience term history.pdf, Folien 2–8"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Holling: Beziehungen erhalten trotz Veränderung",
          "body": [
            "Im ökologischen Verständnis zählt die Persistenz des Systems: Es kann Änderungen und Störungen aufnehmen, während die wesentlichen Beziehungen zwischen Populationen oder Zustandsgrössen bestehen bleiben. Eine veränderliche Messgrösse bedeutet deshalb nicht automatisch, dass das System seine Identität verloren hat.",
            {
              "callout": {
                "tone": "def",
                "title": "Kernidee",
                "text": "Störung aufnehmen und wesentliche Beziehungen erhalten."
              }
            },
            {
              "reveal": {
                "question": "Eigener Transfer: Nach einer Störung schwanken die Populationen. Die tragenden Beziehungen bleiben erhalten. Widerspricht das dem vorgestellten Resilienzbegriff?",
                "answer": "Nein. Entscheidend ist die Persistenz der Beziehungen trotz Veränderung, nicht die Forderung, dass jede einzelne Zustandsgrösse unverändert bleibt.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 01 (02) RESE Resilience term history.pdf, Folien 9"
          ],
          "remember": "Persistenz bedeutet nicht völlige Unveränderlichkeit."
        },
        {
          "type": "slide",
          "title": "Übertragung auf weitere Disziplinen",
          "body": [
            "Die Vorlesung beschreibt Verwendungen in Psychologie, Anthropologie und später im Engineering. Dabei werden Elemente wie Widerstand, Erholung und Anpassung unterschiedlich betont. Ein Begriff wandert zwischen Disziplinen; seine genaue Bedeutung muss jeweils mitgenannt werden.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Material",
                    "text": "Widerstand und Verformung"
                  },
                  {
                    "title": "Mensch und Gesellschaft",
                    "text": "Mit Belastung umgehen, Integrität und Anpassung"
                  },
                  {
                    "title": "Ökologie und Engineering",
                    "text": "Systembeziehungen und Funktionsfähigkeit betrachten"
                  }
                ],
                "note": "Didaktische Gruppierung der Bedeutungen, keine lückenlose historische Kausalkette."
              }
            },
            {
              "reveal": {
                "question": "Warum ist „System A ist resilient“ als Fachargument zu knapp?",
                "answer": "Es fehlen System, Störung und die gemeinte Bedeutung beziehungsweise das Bewertungskriterium. Ein Wort allein sagt noch nicht, welche Fähigkeit nachgewiesen wurde.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 01 (02) RESE Resilience term history.pdf, Folien 8–10"
          ],
          "remember": "Bei jeder Verwendung Kontext und Kriterium klären."
        },
        {
          "type": "slide",
          "title": "Eine Fallstudie sinnvoll aufbauen",
          "body": [
            "Die Folien verlangen zuerst eine Problemdefinition: Welches System, welche Störung? Danach wird eine Methode ausgewählt und ihre Eignung begründet. Erst auf dieser Grundlage wird Resilienz bewertet und das Ergebnis diskutiert.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Problem definieren",
                    "text": "System und Störung abgrenzen"
                  },
                  {
                    "title": "Methode begründen",
                    "text": "Warum passt sie zur Fragestellung?"
                  },
                  {
                    "title": "Bewerten und diskutieren",
                    "text": "Resultate, Bedeutung und Grenzen erklären"
                  }
                ]
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: „Wir nehmen die schönste Grafik und suchen danach ein Problem.“ Was fehlt?",
                "answer": "Die Problemdefinition und eine methodische Begründung. Ohne sie ist unklar, ob die Grafik die relevante Systemfunktion und Störung überhaupt abbildet.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 01 (01) RESE Introduction - Organisational Matters.pdf, Folien 18"
          ],
          "remember": "Die Methode folgt der Frage."
        },
        {
          "type": "checkpoint",
          "id": "cp-application",
          "title": "Checkpoint: Persistenz und Fallstudie",
          "questions": [
            {
              "id": "holling",
              "type": "single",
              "prompt": "Welcher Befund passt am besten zu Hollings dargestellter Idee?",
              "options": [
                "Alle Zustandsgrössen bleiben immer konstant.",
                "Das System nimmt Störungen auf und erhält seine wesentlichen Beziehungen.",
                "Jede Störung muss verhindert werden."
              ],
              "correct": 1,
              "explanation": "Die Definition betont Persistenz bei aufgenommener Veränderung. Quelle: 01 (02) RESE Resilience term history.pdf, Folien 9–10; 01 (01) RESE Introduction - Organisational Matters.pdf, Folien 18"
            },
            {
              "id": "case-order",
              "type": "order",
              "prompt": "Ordne die drei Fallstudienaufgaben.",
              "items": [
                "System und Störung definieren",
                "Geeignete Bewertungsmethode begründen",
                "Bewerten und Resultate diskutieren"
              ],
              "explanation": "Ohne Problemdefinition lässt sich die Eignung der Methode nicht begründen. Quelle: 01 (02) RESE Resilience term history.pdf, Folien 9–10; 01 (01) RESE Introduction - Organisational Matters.pdf, Folien 18"
            },
            {
              "id": "transfer",
              "type": "multi",
              "prompt": "Was sollte bei der Übertragung des Begriffs auf ein neues System angegeben werden?",
              "options": [
                "Untersuchtes System",
                "Betrachtete Störung",
                "Konkretes Bewertungskriterium",
                "Nur der Name einer bekannten Person"
              ],
              "correct": [
                0,
                1,
                2
              ],
              "explanation": "Diese Angaben verbinden Begriff und prüfbare Fallstudie; ein Autorenname ersetzt sie nicht. Quelle: 01 (02) RESE Resilience term history.pdf, Folien 9–10; 01 (01) RESE Introduction - Organisational Matters.pdf, Folien 18"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Was die Anwendungsbeispiele zeigen",
          "body": [
            "Die Bus- und Flughafenbeispiele zeigen unterschiedliche Wege: quantitative Auswertung, qualitative Diskussion und eine Resilienzmatrix. Eine nummerische Darstellung ist nicht automatisch objektiver; sie muss zur Frage und zu den verfügbaren Beobachtungen passen.",
            "Das Handgepäck-Beispiel untersucht sowohl Regelkonformität als auch die Machbarkeit zusätzlicher Kontrollen im Boardingprozess. Beobachtete Abläufe und hypothetische flächendeckende Kontrollen sind dabei zu unterscheiden. Die Folien nennen mehr Daten und weitere Tests als Ausblick.",
            {
              "callout": {
                "tone": "tip",
                "title": "Einordnen statt Zahlen auswendig lernen",
                "text": "Die konkreten Flüge und Indexwerte illustrieren eine Anwendung. Für diese Einführung zählt, dass Fragestellung, Messung und Schlussfolgerung zusammenpassen."
              }
            },
            "Quelle: 01 (01) RESE Introduction - Organisational Matters.pdf, Folien 20–29"
          ],
          "remember": "Fallbeispiele zeigen die Begründung einer Bewertung, nicht eine universelle Kennzahl."
        },
        {
          "type": "slide",
          "title": "Organisation und Quellenstand",
          "body": [
            "Laut Einführungsfolien besteht die Bewertung aus Gruppenarbeit (20 %) und schriftlicher Prüfung (80 %, 90 Minuten). Genannt werden Multiple Choice, Freitext und kleine Übungen. Daraus wird hier keine Aussage über erlaubte Hilfsmittel oder Prüfungssprache abgeleitet.",
            {
              "callout": {
                "tone": "warn",
                "title": "Die Wochenplanung wurde korrigiert",
                "text": "Der neuere Plan in Road to Resilience_full, Folie 3, nennt für SW2 Unterrichtsausfall und die Definitionen in SW3. SW2 ist in diesem Lernangebot daher ausdrücklich ein Selbststudiumsbereich."
              }
            },
            "Die Angaben zur Präsentation lauten einmal 20 Minuten Gesamtumfang und später 12–15 Minuten Vortrag plus Fragen. Das wird hier als Quellenstand wiedergegeben, nicht als neu bestätigte organisatorische Vorgabe. Biografien, Umfragen und Kontaktangaben dienen der Orientierung.",
            "Quelle: 01 (01) RESE Introduction - Organisational Matters.pdf, Folien 15–18, 31; 02 (01) RESE Road to Resilience_full.pdf, Folien 2–3"
          ],
          "remember": "Organisation ist Kontext; aktuelle verbindliche Angaben immer im Kurs prüfen."
        },
        {
          "type": "slide",
          "title": "Transfer und Lernzielcheck",
          "body": [
            {
              "reveal": {
                "question": "Eigener Transfer: Eine Stadt möchte ihre Wasserversorgung „resilienter“ machen. Welche drei Angaben brauchst du vor der Methodenwahl?",
                "answer": "Ein abgegrenztes System mit benötigter Versorgungsfunktion, eine betrachtete Störung und ein begründetes Ziel beziehungsweise Kriterium. Danach kann eine passende Methode ausgewählt werden.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "reveal": {
                "question": "Eigener Transfer: Ein Team behauptet, eine veränderte Organisationsstruktur beweise fehlende Resilienz. Wie würdest du widersprechen?",
                "answer": "Veränderung allein genügt nicht. Prüfe, welche wesentlichen Beziehungen oder Funktionen erhalten bleiben und welche Definition verwendet wird. Anpassung kann Bestandteil des Umgangs mit Belastung sein.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "checklist": {
                "title": "Kann ich das jetzt?",
                "items": [
                  "Ich unterscheide Wortgeschichte und Hollings Beitrag.",
                  "Ich erkläre Widerstand, Verformung und Persistenz im jeweiligen Kontext.",
                  "Ich grenze einen soziotechnischen Fall ab und begründe die Methodenwahl."
                ]
              }
            },
            "Quelle: 01 (01) RESE Introduction - Organisational Matters.pdf, Folien 12–18; 01 (02) RESE Resilience term history.pdf, Folien 2–10"
          ],
          "remember": "Verstehe die Begriffe und benutze sie in einem konkreten Fall."
        },
        {
          "type": "checkpoint",
          "id": "cp-final",
          "title": "Checkpoint: Begriffe anwenden",
          "questions": [
            {
              "id": "case-evidence",
              "type": "multi",
              "prompt": "Welche Schlüsse aus den Beispielen sind angemessen?",
              "options": [
                "Qualitative und quantitative Methoden können verschiedene Fragen beantworten.",
                "Ein Indexwert ist für jedes System übertragbar.",
                "Eine Schlussfolgerung muss zum untersuchten Szenario passen.",
                "Mehr Daten können die Bewertung verbessern."
              ],
              "correct": [
                0,
                2,
                3
              ],
              "explanation": "Eine Methode oder Kennzahl benötigt Kontext; die Beispiele sind keine universellen Nachweise. Quelle: 01 (01) RESE Introduction - Organisational Matters.pdf, Folien 18, 20–29; 01 (02) RESE Resilience term history.pdf, Folien 8–10"
            },
            {
              "id": "persistence",
              "type": "single",
              "prompt": "Ein System verändert Details, erhält aber seine prägenden Beziehungen. Was lässt sich daraus folgern?",
              "options": [
                "Veränderung schliesst Resilienz aus.",
                "Das ist mit dem dargestellten Persistenzgedanken vereinbar.",
                "Damit ist jede denkbare Störung beherrscht."
              ],
              "correct": 1,
              "explanation": "Persistenz erlaubt Veränderung, beweist aber keine grenzenlose Belastbarkeit. Quelle: 01 (01) RESE Introduction - Organisational Matters.pdf, Folien 18, 20–29; 01 (02) RESE Resilience term history.pdf, Folien 8–10"
            },
            {
              "id": "author",
              "type": "type",
              "prompt": "Welcher Autor steht in den Folien für die ökologische Arbeit von 1973? (Nachname)",
              "accept": [
                "Holling",
                "C. S. Holling",
                "CS Holling",
                "Crawford Stanley Holling"
              ],
              "explanation": "Holling prägte die ökologische Betrachtung, erfand aber nicht das Wort. Quelle: 01 (01) RESE Introduction - Organisational Matters.pdf, Folien 18, 20–29; 01 (02) RESE Resilience term history.pdf, Folien 8–10"
            }
          ]
        }
      ]
    },
    {
      "id": "w2",
      "number": 2,
      "title": "Resilienzkurven und Modelle · Selbststudium",
      "status": "ready",
      "items": [
        {
          "type": "slide",
          "title": "SW2-Unterlagen als Selbststudium",
          "body": [
            {
              "callout": {
                "tone": "warn",
                "title": "Einordnung der Woche",
                "text": "Laut korrigiertem Plan fiel der Unterricht in SW2 aus; Definitionen und Dimensionen wurden für SW3 vorgesehen. Dieser Bereich erschliesst die bereits unter SW2 abgelegten Unterlagen als Selbststudium."
              }
            },
            "Die vollständige „Road to Resilience“-Fassung bearbeitest du in SW3 mit Unfallbeispielen und Safety-I/Safety-II. Hier liegt der Schwerpunkt auf der Kurve: Was passiert mit der Systemleistung, und welche Fähigkeiten beschreiben unterschiedliche Autoren?",
            "Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 3; 02 (01) RESE Road to Resilience.pdf, Folien 3–4"
          ],
          "remember": "Die Ablagewoche und der tatsächliche Unterrichtstermin sind nicht dasselbe."
        },
        {
          "type": "slide",
          "title": "Von Safety zu Resilience: die Brücke",
          "body": [
            "Safety-I betrachtet unerwünschte Ergebnisse und deren Vermeidung. Safety-II ergänzt den Blick auf alltägliches Gelingen unter wechselnden Bedingungen. Menschen und Organisationen müssen ihre Arbeit an die aktuelle Situation anpassen.",
            "Die Resilienzdefinition umfasst Anpassungen vor, während und nach Störungen, damit erforderliche Operationen unter erwarteten und unerwarteten Bedingungen aufrechterhalten werden. Sie ist weder nur Katastrophenreparatur noch das Versprechen, dass nichts schiefgeht.",
            {
              "compare": {
                "left": {
                  "title": "Nur nach dem Ereignis fragen",
                  "points": [
                    "Wie stellen wir wieder her?"
                  ]
                },
                "right": {
                  "title": "Gesamten Verlauf betrachten",
                  "points": [
                    "Wie bereiten wir uns vor?",
                    "Wie bewältigen wir die Situation?",
                    "Was lernen und verändern wir danach?"
                  ]
                }
              }
            },
            "Quelle: 02 (01) RESE Road to Resilience.pdf, Folien 14–23"
          ],
          "remember": "Resilienz umfasst Vorbereitung, Bewältigung und den Umgang mit Folgen."
        },
        {
          "type": "slide",
          "title": "Warum es mehrere Definitionen gibt",
          "body": [
            "Die Übersichtsfolien zeigen, dass Definitionen unterschiedliche Schwerpunkte setzen. Manche betonen Vorbereitung, andere Wiederherstellung, wieder andere Aufnahme und Anpassung. Deshalb muss eine Bewertung offenlegen, welche Fähigkeiten sie erfasst.",
            {
              "reveal": {
                "question": "Eigener Fall: Eine Studie bewertet ausschliesslich die Reparaturdauer. Darf sie damit jede Dimension von Resilienz für abgedeckt erklären?",
                "answer": "Nein. Reparaturdauer beschreibt einen wichtigen Aspekt, sagt allein aber wenig über Vorbereitung, Leistungseinbruch oder Anpassungsfähigkeit aus. Der Bewertungsumfang muss kenntlich sein.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 02 (02) RESE Resilience curve and key components.pdf, Folien 2–3"
          ],
          "remember": "Eine Definition legt fest, was beobachtet und was möglicherweise ausgeblendet wird."
        },
        {
          "type": "checkpoint",
          "id": "cp-definition",
          "title": "Checkpoint: Definition und Umfang",
          "questions": [
            {
              "id": "when",
              "type": "multi",
              "prompt": "Welche Zeitbezüge enthält Hollnagels Definition?",
              "options": [
                "Vor einer Veränderung",
                "Während einer Störung",
                "Nach einer Störung",
                "Nur nach einem Totalausfall"
              ],
              "correct": [
                0,
                1,
                2
              ],
              "explanation": "Anpassung betrifft prior to, during und following changes and disturbances. Quelle: 02 (01) RESE Road to Resilience.pdf, Folien 23; 02 (02) RESE Resilience curve and key components.pdf, Folien 2–3"
            },
            {
              "id": "goal",
              "type": "single",
              "prompt": "Was soll die Anpassung ermöglichen?",
              "options": [
                "Benötigte Operationen unter erwarteten und unerwarteten Bedingungen",
                "Unveränderte Komponenten um jeden Preis",
                "Ausschliesslich eine kurze Reparaturzeit"
              ],
              "correct": 0,
              "explanation": "Die erforderliche Funktion steht im Mittelpunkt. Quelle: 02 (01) RESE Road to Resilience.pdf, Folien 23; 02 (02) RESE Resilience curve and key components.pdf, Folien 2–3"
            },
            {
              "id": "adapt",
              "type": "type",
              "prompt": "Wie heisst „sich anpassen“ in der englischen Definition als Verb?",
              "accept": [
                "adjust",
                "to adjust",
                "adjust its functioning"
              ],
              "explanation": "Die Definition spricht vom Anpassen der Funktionsweise; das ist mehr als reines Wiederherstellen. Quelle: 02 (01) RESE Road to Resilience.pdf, Folien 23; 02 (02) RESE Resilience curve and key components.pdf, Folien 2–3"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Eine Resilienzkurve lesen",
          "body": [
            "Auf der horizontalen Achse steht die Zeit, auf der vertikalen die Systemleistung. Vor dem Ereignis gibt es ein Bezugsniveau. Nach dem Ereignis kann die Leistung abrupt oder allmählich abfallen (draw-down); anschliessend folgt möglicherweise Wiederherstellung (draw-up).",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Vor dem Ereignis",
                    "text": "Ausgangsleistung und Vorbereitung"
                  },
                  {
                    "title": "Draw-down",
                    "text": "Tiefe und Geschwindigkeit des Einbruchs"
                  },
                  {
                    "title": "Draw-up",
                    "text": "Dauer und Niveau der Erholung"
                  }
                ]
              }
            },
            {
              "callout": {
                "tone": "warn",
                "title": "Achsen nicht verwechseln",
                "text": "Eine längere Erholungsdauer liegt auf der Zeitachse. Ein stärkerer Einbruch betrifft die Leistungsachse. Die Kurve ist keine Ausfallwahrscheinlichkeit."
              }
            },
            "Quelle: 02 (02) RESE Resilience curve and key components.pdf, Folien 4–6"
          ],
          "remember": "Tiefe, Dauer und Erholungsniveau beschreiben unterschiedliche Eigenschaften."
        },
        {
          "type": "slide",
          "title": "Eigene Messreihe: dieselbe Kurve greifbar machen",
          "body": [
            "Die folgenden Werte sind ein eigenes Lernbeispiel, keine Messdaten der Vorlesung. Das Ereignis liegt zwischen Stunde 0 und 1. Lies zuerst, wann die Leistung sinkt und wann sie das Ausgangsniveau wieder erreicht.",
            {
              "table": {
                "head": [
                  "Zeit nach Start [h]",
                  "Leistung [% des Ausgangswerts]"
                ],
                "rows": [
                  [
                    "0",
                    "100"
                  ],
                  [
                    "1",
                    "40"
                  ],
                  [
                    "2",
                    "60"
                  ],
                  [
                    "3",
                    "80"
                  ],
                  [
                    "4",
                    "100"
                  ]
                ],
                "caption": "Eigene Beispielwerte"
              }
            },
            {
              "reveal": {
                "question": "Wie gross ist der maximale Einbruch, und was ist über das Endniveau bekannt?",
                "answer": "Der Einbruch beträgt 60 Prozentpunkte gegenüber 100 %. Bei Stunde 4 ist das Ausgangsniveau wieder erreicht. Daraus folgt noch nicht, dass jede andere Störung genauso bewältigt würde.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 02 (02) RESE Resilience curve and key components.pdf, Folien 4–6"
          ],
          "remember": "Einbruch in Prozentpunkten und Zeit bis zur Erholung getrennt lesen."
        },
        {
          "type": "slide",
          "title": "Vier typische Verläufe",
          "body": [
            "Die Folien unterscheiden idealtypische Endzustände. „Robust“ bezeichnet in dieser Kurventypologie die Rückkehr zum Ausgangsniveau; das ist nicht identisch mit der engeren Eigenschaft Robustness, überhaupt keinen Funktionsverlust zu erleiden.",
            {
              "table": {
                "head": [
                  "Kurventyp laut Folie 5",
                  "Verhalten nach der Störung"
                ],
                "rows": [
                  [
                    "Robust",
                    "Rückkehr zum ursprünglichen Niveau"
                  ],
                  [
                    "Adaptive",
                    "Erholung mit Verbesserung oder Rekonfiguration"
                  ],
                  [
                    "Ductile",
                    "Nur teilweise Erholung"
                  ],
                  [
                    "Collapsing",
                    "Vollständiger Ausfall ohne Erholung"
                  ]
                ],
                "caption": "Typologie aus der Vorlesung"
              }
            },
            {
              "callout": {
                "tone": "warn",
                "title": "Begriffe im Modellkontext lesen",
                "text": "Die gleiche Wortwurzel kann in einer Kurventypologie und einer Eigenschaftsdefinition unterschiedlich verwendet werden. Nenne deshalb das Modell."
              }
            },
            "Quelle: 02 (02) RESE Resilience curve and key components.pdf, Folien 5–6"
          ],
          "remember": "Vier Muster helfen beim Einordnen, erfassen aber nicht jede mögliche Kurvenform."
        },
        {
          "type": "checkpoint",
          "id": "cp-curves",
          "title": "Checkpoint: Kurven lesen",
          "questions": [
            {
              "id": "axes",
              "type": "single",
              "prompt": "Welche Grösse steht auf der y-Achse der Resilienzkurve?",
              "options": [
                "Systemleistung",
                "Zeit",
                "Wahrscheinlichkeit eines Angriffs"
              ],
              "correct": 0,
              "explanation": "Die Kurve zeigt System Performance als Funktion der Zeit. Quelle: 02 (02) RESE Resilience curve and key components.pdf, Folien 4–6"
            },
            {
              "id": "shape",
              "type": "multi",
              "prompt": "Welche Aussagen passen zur Kurventypologie der Folien?",
              "options": [
                "Adaptive kann ein verbessertes Niveau erreichen.",
                "Ductile bedeutet vollständige Erholung.",
                "Collapsing enthält keine Erholung.",
                "Der Leistungseinbruch muss immer sofort erfolgen."
              ],
              "correct": [
                0,
                2
              ],
              "explanation": "Ductile bleibt unter dem ursprünglichen Niveau; draw-down kann abrupt oder allmählich sein. Quelle: 02 (02) RESE Resilience curve and key components.pdf, Folien 4–6"
            },
            {
              "id": "drop",
              "type": "type",
              "prompt": "Eigene Messreihe: Leistung sinkt von 100 % auf 65 %. Wie viele Prozentpunkte beträgt der Einbruch?",
              "accept": [
                "35",
                "35 Prozentpunkte",
                "35 prozentpunkte",
                "35 pp"
              ],
              "explanation": "100 − 65 = 35 Prozentpunkte. Das beschreibt die Tiefe, nicht die Dauer. Quelle: 02 (02) RESE Resilience curve and key components.pdf, Folien 4–6"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Bruneau: die vier R",
          "body": [
            "Das Modell für die seismische Resilienz von Gemeinschaften betrachtet physische und soziale Systeme. Es verbindet weniger Ausfälle, geringere Folgen und schnellere Wiederherstellung. Die vier R beschreiben unterschiedliche Ansatzpunkte.",
            {
              "table": {
                "head": [
                  "Eigenschaft",
                  "Leitfrage"
                ],
                "rows": [
                  [
                    "Robustness",
                    "Hält das System Belastung ohne Funktionsverlust aus?"
                  ],
                  [
                    "Redundancy",
                    "Gibt es ersetzende Elemente oder Systeme?"
                  ],
                  [
                    "Resourcefulness",
                    "Wer erkennt Probleme, setzt Prioritäten und mobilisiert Ressourcen?"
                  ],
                  [
                    "Rapidity",
                    "Wie schnell werden Prioritäten umgesetzt und Verluste begrenzt?"
                  ]
                ],
                "caption": "Bruneau et al. (2003)"
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Ein Ersatzgerät steht bereit, aber niemand darf dessen Einsatz freigeben. Was fehlt trotz Redundanz?",
                "answer": "Resourcefulness: Probleme erkennen, Prioritäten setzen und Ressourcen wirksam mobilisieren. Ein vorhandenes Ersatzteil allein stellt die Handlung noch nicht sicher.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 02 (02) RESE Resilience curve and key components.pdf, Folien 8–9"
          ],
          "remember": "Redundanz beschreibt Ersatzmöglichkeiten, Resourcefulness deren organisierte Mobilisierung."
        },
        {
          "type": "slide",
          "title": "Francis und Bekera: drei Kapazitäten",
          "body": [
            "Absorptive capacity begrenzt die Folgen eines Schocks mit möglichst wenig Aufwand. Recovery beziehungsweise restorative capacity betrifft die Rückkehr zu normalem oder verbessertem Betrieb. Adaptive capacity beschreibt Anpassungen an ungünstige Bedingungen.",
            {
              "compare": {
                "left": {
                  "title": "Absorptive",
                  "points": [
                    "Wirkung des Schocks aufnehmen",
                    "Folgen zunächst begrenzen"
                  ]
                },
                "right": {
                  "title": "Recovery und Adaptive",
                  "points": [
                    "Betrieb wiederherstellen",
                    "Funktionsweise an Bedingungen anpassen"
                  ]
                }
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Eine Leitstelle nutzt zunächst Puffer, stellt dann den Betrieb wieder her und verändert anschliessend ihre Organisation. Welche Kapazitäten sind erkennbar?",
                "answer": "Puffer illustrieren Aufnahme, Wiederherstellung Recovery und die geänderte Organisation Adaptive capacity. Im realen System können sich Beiträge überlagern; dies ist eine didaktische Zuordnung.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 02 (02) RESE Resilience curve and key components.pdf, Folien 10–11"
          ],
          "remember": "Kapazitäten beantworten verschiedene Fragen zum Umgang mit einer Störung."
        },
        {
          "type": "slide",
          "title": "Haimes: Withstand und Recover",
          "body": [
            "Haimes verbindet zulässige Leistungseinbussen mit akzeptabler Zeit und akzeptablen Kosten der Wiederherstellung. Withstand bedeutet Weiterarbeiten möglichst nahe an den Leistungszielen; Recover bedeutet Wiederherstellen nach der unvermeidbaren Beeinträchtigung.",
            "Redundanz und Robustheit lassen sich an Komponenten fördern. Resilienz verlangt zusätzlich den Blick auf Struktur, Architektur und Abhängigkeiten des Gesamtsystems.",
            {
              "reveal": {
                "question": "Eigener Fall: Zwei redundante Rechner hängen an derselben Stromversorgung. Warum ist ihre Anzahl allein kein Resilienznachweis?",
                "answer": "Die gemeinsame Abhängigkeit bleibt eine Eigenschaft der Systemarchitektur. Zwei Komponenten bedeuten nicht automatisch zwei unabhängig verfügbare Funktionen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 02 (02) RESE Resilience curve and key components.pdf, Folien 12–13"
          ],
          "remember": "Resilienz wird auf Systemebene beurteilt, mit akzeptablen Grenzen für Leistung, Zeit und Kosten."
        },
        {
          "type": "checkpoint",
          "id": "cp-models",
          "title": "Checkpoint: Modelle unterscheiden",
          "questions": [
            {
              "id": "four-r",
              "type": "multi",
              "prompt": "Welche Begriffe gehören zu Bruneaus vier R?",
              "options": [
                "Resourcefulness",
                "Redundancy",
                "Rapidity",
                "Randomness"
              ],
              "correct": [
                0,
                1,
                2
              ],
              "explanation": "Zusammen mit Robustness bilden diese drei die vier R; Randomness gehört nicht dazu. Quelle: 02 (02) RESE Resilience curve and key components.pdf, Folien 8–13"
            },
            {
              "id": "capacity",
              "type": "single",
              "prompt": "Ein System verändert seine Abläufe, um auf ungünstige Bedingungen zu reagieren. Welche Kapazität von Francis und Bekera passt am direktesten?",
              "options": [
                "Adaptive",
                "Nur Recovery",
                "Nur Absorptive"
              ],
              "correct": 0,
              "explanation": "Anpassung und Modifikation kennzeichnen die adaptive Kapazität. Quelle: 02 (02) RESE Resilience curve and key components.pdf, Folien 8–13"
            },
            {
              "id": "haimes",
              "type": "type",
              "prompt": "Ergänze die zweite Fähigkeit bei Haimes: Withstand und …",
              "accept": [
                "Recover",
                "Recovery",
                "recover"
              ],
              "explanation": "Withstand begrenzt den Funktionsverlust; Recover stellt innerhalb akzeptabler Zeit und Kosten wieder her. Quelle: 02 (02) RESE Resilience curve and key components.pdf, Folien 8–13"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Heinimann und Hatfield: mehr als die physische Kurve",
          "body": [
            "Das Modell unterscheidet biophysische Kernfunktionen, unterstützende Funktionen und kognitive Funktionen. Die physische Kurve allein erklärt nicht, wie Menschen relevante Veränderungen wahrnehmen oder geeignete Handlungen auswählen.",
            {
              "table": {
                "head": [
                  "Funktionsgruppe",
                  "Beitrag"
                ],
                "rows": [
                  [
                    "Biophysisch",
                    "Belastung und Leistungsentwicklung"
                  ],
                  [
                    "Enabling",
                    "Vorbereitung und Notfallreaktion unterstützen den Verlauf"
                  ],
                  [
                    "Kognitiv",
                    "Wahrnehmen, Bedeutung verstehen, Handlungen entwickeln und auswählen"
                  ]
                ],
                "caption": "Drei Funktionsgruppen"
              }
            },
            {
              "reveal": {
                "question": "Ein Alarm ist technisch vorhanden, wird aber falsch verstanden. Welche Ebene bleibt bei rein physischer Betrachtung unsichtbar?",
                "answer": "Die kognitive Ebene: Wahrnehmung und Interpretation sind Voraussetzungen für eine passende Handlung. Auch unterstützende organisatorische Funktionen können betroffen sein.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 02 (02) RESE Resilience curve and key components.pdf, Folien 14–15"
          ],
          "remember": "Messbarer Leistungsverlauf und Fähigkeiten hinter dem Verlauf gehören zusammen."
        },
        {
          "type": "slide",
          "title": "Resist, Restabilize, Rebuild, Reconfigure",
          "body": [
            "Die vier biophysischen Funktionen trennen Widerstehen, Stabilisieren, Wiederherstellen und Umgestalten. Restabilize bedeutet, wesentliche Funktionen und das Verhalten wieder unter Kontrolle zu bringen; Rebuild zielt auf die normale Leistung. Reconfigure verändert Architektur oder Topologie für bessere Fehlertoleranz.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Resist",
                    "text": "Degradation begrenzen"
                  },
                  {
                    "title": "Restabilize",
                    "text": "Kernfunktionen stabilisieren"
                  },
                  {
                    "title": "Rebuild",
                    "text": "Normales Leistungsniveau herstellen"
                  },
                  {
                    "title": "Reconfigure",
                    "text": "Architektur anpassen"
                  }
                ],
                "note": "Schematische Zuordnung zur Kurve, keine starre Projektvorschrift."
              }
            },
            {
              "reveal": {
                "question": "Warum ist ein provisorisch stabiler Betrieb nicht automatisch vollständig wiederaufgebaut?",
                "answer": "Stabilisierung kann unterhalb der normalen Leistung liegen. Wiederaufbau zielt auf die Wiederherstellung des normalen Niveaus.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 02 (02) RESE Resilience curve and key components.pdf, Folien 16"
          ],
          "remember": "Stabilisiert, wiederhergestellt und umgestaltet sind unterschiedliche Aussagen."
        },
        {
          "type": "checkpoint",
          "id": "cp-functions",
          "title": "Checkpoint: Funktionen",
          "questions": [
            {
              "id": "physical",
              "type": "order",
              "prompt": "Ordne die vier Funktionen entlang des schematischen Verlaufs.",
              "items": [
                "Resist",
                "Restabilize",
                "Rebuild",
                "Reconfigure"
              ],
              "explanation": "Die Folie stellt Widerstehen, Stabilisieren, Wiederaufbauen und Rekonfigurieren entlang der Kurve dar. Quelle: 02 (02) RESE Resilience curve and key components.pdf, Folien 14–16"
            },
            {
              "id": "cognition",
              "type": "single",
              "prompt": "Welche Aktivität ist besonders der kognitiven Funktionsgruppe zuzuordnen?",
              "options": [
                "Bedeutung einer veränderten Situation verstehen",
                "Ein gebrochenes Bauteil ersetzen",
                "Ein Ersatzgerät lagern"
              ],
              "correct": 0,
              "explanation": "Wahrnehmen und Verstehen sind kognitive Funktionen. Quelle: 02 (02) RESE Resilience curve and key components.pdf, Folien 14–16"
            },
            {
              "id": "not-same",
              "type": "multi",
              "prompt": "Welche Unterscheidungen sind korrekt?",
              "options": [
                "Restabilize muss noch nicht normale Leistung bedeuten.",
                "Rebuild und Reconfigure bedeuten immer dasselbe.",
                "Vorbereitung kann die Kernfunktionen unterstützen.",
                "Eine physische Kurve bildet alle Entscheidungsprozesse unmittelbar ab."
              ],
              "correct": [
                0,
                2
              ],
              "explanation": "Stabilisieren und Wiederherstellen unterscheiden sich; Kognition und Unterstützung werden separat betrachtet. Quelle: 02 (02) RESE Resilience curve and key components.pdf, Folien 14–16"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Modelle bewusst auswählen",
          "body": [
            "Die Modelle sind keine konkurrierenden Wortlisten mit einer einzigen richtigen Anzahl von Resilienzkomponenten. Sie operationalisieren unterschiedliche Fragen: Ersatzmöglichkeiten, Ressourcen, zulässige Verluste, Wiederherstellung oder Wahrnehmung und Anpassung.",
            {
              "table": {
                "head": [
                  "Fragestellung",
                  "Hilfreicher Modellblick"
                ],
                "rows": [
                  [
                    "Ersatz und Mobilisierung unterscheiden",
                    "Bruneaus vier R"
                  ],
                  [
                    "Aufnahme, Erholung und Anpassung",
                    "Francis und Bekera"
                  ],
                  [
                    "Grenzen für Verlust, Zeit und Kosten",
                    "Haimes"
                  ],
                  [
                    "Physische, unterstützende und kognitive Funktionen",
                    "Heinimann und Hatfield"
                  ]
                ],
                "caption": "Didaktische Auswahlhilfe, keine exklusive Zuordnung"
              }
            },
            "Quelle: 02 (02) RESE Resilience curve and key components.pdf, Folien 8–17"
          ],
          "remember": "Ein Modell ist nützlich, wenn es deine Bewertungsfrage sichtbar macht."
        },
        {
          "type": "slide",
          "title": "Transfer und Lernzielcheck",
          "body": [
            {
              "reveal": {
                "question": "Eigener Transfer: Zwei Systeme erreichen beide wieder 100 %. A braucht eine Stunde, B zehn Stunden. Sind sie damit gleich resilient?",
                "answer": "Nicht allein aufgrund desselben Endniveaus. Die Erholungsdauer unterscheidet sich; zusätzlich müssen Tiefe des Einbruchs, Systemfunktion und Bewertungsziel betrachtet werden.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "reveal": {
                "question": "Eigener Transfer: Ein Spital beschafft Ersatzgeräte, trainiert Entscheidungen und reorganisiert nach einem Ereignis seine Abläufe. Ordne die Beiträge in mindestens zwei Modellen ein.",
                "answer": "Ersatzgeräte: Redundancy; Entscheidungen und Mobilisierung: Resourcefulness beziehungsweise kognitive/enabling Funktionen; Reorganisation: Adaptive capacity beziehungsweise Reconfigure. Begründe die Zuordnung am beobachteten Beitrag.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "checklist": {
                "title": "Kann ich das jetzt?",
                "items": [
                  "Ich lese Leistung, Zeit und Erholungsniveau getrennt.",
                  "Ich unterscheide die vier Kurventypen mit Modellbezug.",
                  "Ich wende die verschiedenen Eigenschafts-, Kapazitäts- und Funktionsmodelle an."
                ]
              }
            },
            {
              "callout": {
                "tone": "tip",
                "title": "Zusatzwissen",
                "text": "Literaturjahre und Autorenhistorie dienen der Orientierung. Die Modellunterschiede sind die zentrale Lernarbeit."
              }
            },
            "Quelle: 02 (02) RESE Resilience curve and key components.pdf, Folien 4–17"
          ],
          "remember": "Begründe Zuordnungen anhand der Funktion, nicht nur anhand ähnlicher Wörter."
        },
        {
          "type": "checkpoint",
          "id": "cp-final",
          "title": "Checkpoint: Transfer",
          "questions": [
            {
              "id": "end-level",
              "type": "single",
              "prompt": "Systemleistung kehrt nur auf 70 % des ursprünglichen Niveaus zurück. Welcher Typ passt laut Folie 5?",
              "options": [
                "Adaptive",
                "Ductile",
                "Robust"
              ],
              "correct": 1,
              "explanation": "Ductile bezeichnet hier nur teilweise Erholung. Quelle: 02 (02) RESE Resilience curve and key components.pdf, Folien 4–17"
            },
            {
              "id": "assessment",
              "type": "multi",
              "prompt": "Welche Angaben braucht ein sinnvoller Kurvenvergleich?",
              "options": [
                "Gemeinsame Bedeutung der Leistungsachse",
                "Zeitbezug und Erholungsdauer",
                "Nur die Farbe der Linie",
                "Bezugsniveau und betrachtete Störung"
              ],
              "correct": [
                0,
                1,
                3
              ],
              "explanation": "Ohne gemeinsame Bezugsgrössen ist ein visueller Vergleich irreführend. Quelle: 02 (02) RESE Resilience curve and key components.pdf, Folien 4–17"
            },
            {
              "id": "resource",
              "type": "type",
              "prompt": "Wie heisst bei Bruneau die Fähigkeit, Probleme zu erkennen, Prioritäten zu setzen und Ressourcen zu mobilisieren?",
              "accept": [
                "resourcefulness",
                "Resourcefulness"
              ],
              "explanation": "Diese Fähigkeit ist von blosser Verfügbarkeit eines Ersatzes zu unterscheiden. Quelle: 02 (02) RESE Resilience curve and key components.pdf, Folien 4–17"
            }
          ]
        }
      ]
    },
    {
      "id": "w3",
      "number": 3,
      "title": "Von Safety-I zu Resilience Engineering",
      "status": "ready",
      "items": [
        {
          "type": "slide",
          "title": "Die Leitfrage: Warum geht so viel gut?",
          "body": [
            "Die neuere Fassung ordnet diese Inhalte laut korrigiertem Plan SW3 zu, obwohl ihr Deckblatt noch SW2 nennt. Gegenüber der kürzeren Datei enthält sie zusätzliche Unfallbeispiele und die Musterrechnung zum Bahnbeispiel.",
            "Die zentrale Perspektivänderung lautet: Um sichere Abläufe zu verstehen, untersuchen wir nicht nur seltenes Scheitern, sondern auch häufiges Gelingen. Daraus entstehen konkrete Anforderungen an Reagieren, Beobachten, Vorausschauen und Lernen.",
            "Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 3, 5–6, 19–28"
          ],
          "remember": "Diese Woche verbindet die Erklärung von Unfällen mit dem Verständnis alltäglichen Erfolgs."
        },
        {
          "type": "slide",
          "title": "Safety bedeutet nicht völlige Risikofreiheit",
          "body": [
            "Die Folien beschreiben Safety als Freiheit von inakzeptablem Risiko. Entscheidend ist somit die Frage, welche Risiken in welchem Kontext akzeptabel sind. In Luftfahrt, Gesundheitsversorgung und Industrie werden unterschiedliche Anwendungsbereiche betont.",
            {
              "callout": {
                "tone": "def",
                "title": "Arbeitsdefinition der Vorlesung",
                "text": "Safety = Freedom from unacceptable risk."
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: „Unser Betrieb ist sicher, weil kein Risiko existiert.“ Welche Annahme würdest du prüfen?",
                "answer": "Die Aussage setzt Sicherheit mit völliger Risikofreiheit gleich. Die Vorlesungsdefinition verlangt stattdessen, Risiken zu identifizieren, zu bewerten und auf ein akzeptables Niveau zu kontrollieren.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 8–9"
          ],
          "remember": "Akzeptabilität und Umgang mit Risiko gehören zur Safety-Frage."
        },
        {
          "type": "slide",
          "title": "Die Perspektive erweitert sich",
          "body": [
            "Die Zeitachsen zeigen keine vollständige Ablösung alter Themen. Technische Zuverlässigkeit bleibt wichtig; zusätzlich rücken menschliche Faktoren und später Organisation und Sicherheitsmanagement ins Blickfeld.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Technologie",
                    "text": "Komponenten und technische Fehler"
                  },
                  {
                    "title": "Human Factors",
                    "text": "Interaktion zwischen Menschen und Technik"
                  },
                  {
                    "title": "Safety Management",
                    "text": "Organisation, Kommunikation und Sicherheitskultur"
                  }
                ],
                "note": "Erweiterung der Betrachtung; die älteren Ebenen verschwinden nicht."
              }
            },
            "Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 10–15"
          ],
          "remember": "Technik, Mensch und Organisation gemeinsam betrachten."
        },
        {
          "type": "slide",
          "title": "Three Mile Island: Bedienfehler im Kontext",
          "body": [
            "Die Folie beschreibt zahlreiche gleichzeitige Alarme und eine Anzeige, die nicht den tatsächlichen Ventilzustand widerspiegelte. Das erschwerte es dem Bedienpersonal, den Anlagenzustand richtig zu erkennen.",
            "Der Lernpunkt ist nicht, einen Unfall auf „den Menschen“ zu reduzieren. Die Mensch-Maschine-Schnittstelle beeinflusst, was erkannt und welche Handlung gewählt werden kann.",
            {
              "reveal": {
                "question": "Eigener Transfer: Eine Leitstelle zeigt einen Steuerbefehl als bestätigten Anlagenzustand an. Welches Problem entsteht?",
                "answer": "Bedienende könnten die Anzeige als tatsächlichen Zustand interpretieren. Für eine verlässliche Situationsbeurteilung müssen Befehl, Rückmeldung und physischer Zustand unterscheidbar sein; das illustriert die Schnittstellenfrage der Folie.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 11–12"
          ],
          "remember": "Fehlhandlungen müssen im Informations- und Bedienkontext untersucht werden."
        },
        {
          "type": "slide",
          "title": "Chernobyl und Challenger: Organisation zählt",
          "body": [
            "Die Vorlesung nutzt Chernobyl und Challenger, um die Rolle von Ausbildung, Kommunikation und Sicherheitskultur zu verdeutlichen. Beim Challenger-Beispiel stehen neben den Dichtungen bei Kälte auch der Umgang mit technischen Warnungen und die Weitergabe von Informationen im Fokus.",
            {
              "compare": {
                "left": {
                  "title": "Technischer Auslöser",
                  "points": [
                    "Ein Bauteil oder eine Funktion versagt"
                  ]
                },
                "right": {
                  "title": "Organisatorischer Beitrag",
                  "points": [
                    "Warnungen werden nicht wirksam verarbeitet",
                    "Ausbildung und Kommunikation beeinflussen Entscheidungen"
                  ]
                }
              }
            },
            {
              "callout": {
                "tone": "tip",
                "title": "Fokus dieser Lektion",
                "text": "Dies ist die didaktische Einordnung der Vorlesung, keine vollständige historische Unfalluntersuchung."
              }
            },
            "Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 13–15"
          ],
          "remember": "Ein technischer Auslöser schliesst organisatorische Ursachen und Bedingungen nicht aus."
        },
        {
          "type": "checkpoint",
          "id": "cp-context",
          "title": "Checkpoint: Safety und Kontext",
          "questions": [
            {
              "id": "safety",
              "type": "single",
              "prompt": "Welche Definition entspricht dem Einstieg der Vorlesung?",
              "options": [
                "Abwesenheit jedes denkbaren Risikos",
                "Freiheit von inakzeptablem Risiko",
                "Nur geringe Reparaturkosten"
              ],
              "correct": 1,
              "explanation": "Die Akzeptabilität von Risiko ist Teil der Definition. Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 8–15"
            },
            {
              "id": "tmi",
              "type": "multi",
              "prompt": "Welche Aspekte betont das TMI-Beispiel?",
              "options": [
                "Viele gleichzeitige Alarme",
                "Missverständliche Anzeige des Ventilzustands",
                "Eine vollkommen eindeutige Benutzerschnittstelle",
                "Einfluss der Schnittstelle auf die Situationsbeurteilung"
              ],
              "correct": [
                0,
                1,
                3
              ],
              "explanation": "Die Folie verbindet Bedienhandlungen mit der verfügbaren Information und der Schnittstellengestaltung. Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 8–15"
            },
            {
              "id": "ages",
              "type": "order",
              "prompt": "Ordne die Erweiterung der Safety-Perspektive.",
              "items": [
                "Technologie",
                "Human Factors",
                "Safety Management"
              ],
              "explanation": "Die Perspektive wird um menschliche und organisatorische Ebenen erweitert; Technik bleibt relevant. Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 8–15"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Drei Unfallmodelle",
          "body": [
            "Sequenzielle Modelle betrachten einfache kausale Ketten. Epidemiologische Modelle verbinden aktive Fehler mit latenten Bedingungen und Barrieren. Systemische Modelle richten sich auf nichtlineare Wechselwirkungen, enge Kopplungen und emergente Wirkungen.",
            {
              "table": {
                "head": [
                  "Modell",
                  "Typischer Blick"
                ],
                "rows": [
                  [
                    "Sequential",
                    "Abfolge einzelner Ursachen und Fehler"
                  ],
                  [
                    "Epidemiological",
                    "Aktive Fehler plus latente Bedingungen"
                  ],
                  [
                    "Systemic",
                    "Wechselwirkungen und Emergenz in einem gekoppelten System"
                  ]
                ],
                "caption": "Modellvergleich in eigenen Worten"
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Mehrere für sich normale Anpassungen treffen ungünstig zusammen. Welcher Blick hilft besonders?",
                "answer": "Der systemische Blick untersucht die Wechselwirkungen, statt zwingend einen isolierten defekten Bestandteil vorauszusetzen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 16–17"
          ],
          "remember": "Die Modellwahl beeinflusst, welche Erklärungen sichtbar werden."
        },
        {
          "type": "slide",
          "title": "Das Kausalitäts-Credo kritisch lesen",
          "body": [
            "Die Folie stellt eine Argumentationskette dar: Unfälle haben Ursachen; alle Ursachen lassen sich finden; alle gefundenen Ursachen lassen sich neutralisieren; damit wären alle Unfälle vermeidbar. Das ist die diskutierte Annahme hinter einer Null-Unfall-Vision, kein bewiesenes Gesetz.",
            "In komplexen Systemen ist gerade die Vollständigkeit von Beschreibung und Kontrolle fraglich. Kritisches Hinterfragen bedeutet nicht, Ursachenanalyse aufzugeben, sondern ihre Reichweite nicht zu überschätzen.",
            {
              "reveal": {
                "question": "Welche Stelle der Kette macht aus einer nützlichen Ursachenanalyse eine unbelegte Garantie?",
                "answer": "Die universellen Annahmen, alle relevanten Ursachen finden und vollständig neutralisieren zu können. Einzelne erfolgreiche Gegenmassnahmen belegen diese Vollständigkeit nicht.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 17–18"
          ],
          "remember": "Ursachenanalyse ist nützlich; eine Garantie für null Unfälle folgt daraus nicht."
        },
        {
          "type": "slide",
          "title": "Safety-I: aus unerwünschten Ergebnissen lernen",
          "body": [
            "Safety-I versucht, die Zahl von Unfällen, Zwischenfällen und Beinaheereignissen möglichst niedrig zu halten. Die Folien beschreiben einen reaktiven Zugang: negative Ereignisse analysieren, Ursachen beziehungsweise Verknüpfungen bearbeiten und prüfen, ob weniger schiefgeht.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Ereignis erfassen",
                    "text": "Was ist schiefgegangen?"
                  },
                  {
                    "title": "Ursachen untersuchen",
                    "text": "Welche Zusammenhänge trugen bei?"
                  },
                  {
                    "title": "Gegenmassnahmen",
                    "text": "Wie lassen sie sich verändern?"
                  },
                  {
                    "title": "Wirkung prüfen",
                    "text": "Geht weniger schief?"
                  }
                ]
              }
            },
            {
              "callout": {
                "tone": "warn",
                "title": "Begrenzter Indikator",
                "text": "Wenige beobachtete Unfälle allein erklären nicht, warum der Alltag gelingt oder welche Anpassungen ihn ermöglichen."
              }
            },
            "Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 19–21"
          ],
          "remember": "Safety-I misst Sicherheit in dieser Darstellung indirekt über unerwünschte Ergebnisse."
        },
        {
          "type": "slide",
          "title": "Tractable und intractable",
          "body": [
            "Tractable bezeichnet gut verstandene, relativ stabile und gut beschreibbare Abläufe. Intractable bezeichnet Systeme, deren Beschreibung unvollständig und kompliziert bleibt, mit häufigen oder unregelmässigen Änderungen.",
            "Die Folie kontrastiert standardisierte Produktion mit ungeplanten Anforderungen etwa in Gesundheitsversorgung, Notfalldiensten und komplexen Lieferketten. Intractable bedeutet nicht „unmöglich zu führen“, sondern begrenzte Vorhersagbarkeit und Beschreibbarkeit.",
            {
              "compare": {
                "left": {
                  "title": "Tractable",
                  "points": [
                    "Relativ homogen und stabil",
                    "Gut verstanden und beschreibbar"
                  ]
                },
                "right": {
                  "title": "Intractable",
                  "points": [
                    "Heterogene, wechselnde Anforderungen",
                    "Nicht vollständig verstanden"
                  ]
                }
              }
            },
            "Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 21"
          ],
          "remember": "Unvollständige Beschreibbarkeit verlangt situationsgerechten Umgang, nicht Resignation."
        },
        {
          "type": "checkpoint",
          "id": "cp-models",
          "title": "Checkpoint: Modelle und Safety-I",
          "questions": [
            {
              "id": "latent",
              "type": "single",
              "prompt": "Welches Modell verbindet aktive Fehler mit latenten Bedingungen?",
              "options": [
                "Epidemiological",
                "Nur ein rein sequenzielles Modell",
                "Ein Modell ohne Ursachen"
              ],
              "correct": 0,
              "explanation": "Das epidemiologische Modell betrachtet die Kombination aktiver und latenter Beiträge. Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 16–21"
            },
            {
              "id": "credo",
              "type": "multi",
              "prompt": "Welche Aussagen sind angemessen?",
              "options": [
                "Ursachenanalyse kann Gegenmassnahmen ermöglichen.",
                "Jede gefundene Ursache beweist, dass alle Unfälle vermeidbar sind.",
                "Vollständige Beschreibbarkeit ist bei intractable systems fraglich.",
                "Safety-I richtet den Blick auf unerwünschte Ergebnisse."
              ],
              "correct": [
                0,
                2,
                3
              ],
              "explanation": "Nützliche Ursachenanalyse rechtfertigt keine unbegrenzte Präventionsgarantie. Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 16–21"
            },
            {
              "id": "term",
              "type": "type",
              "prompt": "Welcher englische Begriff bezeichnet hier nicht vollständig verstandene, wechselhafte Systeme?",
              "accept": [
                "intractable",
                "intractable systems",
                "intractable system"
              ],
              "explanation": "Die Vorlesung kontrastiert intractable mit tractable. Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 16–21"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Bahnbeispiel: seltenes Scheitern, häufiges Gelingen",
          "body": [
            "Die Folie nennt 130 SPAD-Ereignisse und 13 Millionen Stopps bei Rot. Bezogen auf die angegebenen 13 Millionen ergibt der verwendete Quotient 130 / 13 000 000 = 0,00001 = 0,001 %. Für den didaktischen Komplementvergleich setzt die Folie die Erfolgsquote als 1 minus diesen Wert an.",
            {
              "formula": {
                "main": "1 − 0,00001 = 0,99999 = 99,999 %",
                "note": "Eigene Nachrechnung mit dem Bezugswert der Folie."
              }
            },
            {
              "callout": {
                "tone": "warn",
                "title": "Rechenkorrektur zu Folie 22",
                "text": "Die Folie schreibt beim Erfolg ungefähr 9E−1. Das entspricht 0,9 und ist keine passende Rundung von 0,99999. Hier wird der korrekt nachgerechnete Wert verwendet. Stopps und Ereignisse nicht ohne klare Bezugsdefinition zu einer anderen Grundgesamtheit vermischen."
              }
            },
            {
              "reveal": {
                "question": "Was ist die didaktische Pointe, unabhängig von der letzten Nachkommastelle?",
                "answer": "Es gibt sehr viel mehr alltägliche erfolgreiche Abläufe als unerwünschte Ereignisse. Diese erfolgreichen Abläufe liefern zusätzliche Lerngelegenheiten.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 22"
          ],
          "remember": "Einheiten, Nenner und Komplementrechnung prüfen; Erfolg ist selbst eine Untersuchungsquelle."
        },
        {
          "type": "slide",
          "title": "Safety-II: Gelingen unter wechselnden Bedingungen",
          "body": [
            "Safety-II fragt, wie möglichst viel richtig geht. Dieselben alltäglichen Anpassungen können unter unterschiedlichen Bedingungen zu Erfolg oder Misserfolg beitragen. Menschen sind damit auch eine Ressource für Sicherheit, nicht ausschliesslich eine Fehlerquelle.",
            {
              "compare": {
                "left": {
                  "title": "Safety-I in den Folien",
                  "points": [
                    "Unerwünschte Ergebnisse verringern",
                    "Aus Ereignissen und Ursachen lernen"
                  ]
                },
                "right": {
                  "title": "Safety-II in den Folien",
                  "points": [
                    "Gelingen unter variablen Bedingungen ermöglichen",
                    "Alltägliche Anpassungen verstehen"
                  ]
                }
              }
            },
            {
              "reveal": {
                "question": "Eigener Transfer: Ein Team erreicht trotz Personalausfall die nötige Leistung. Welche Safety-II-Frage stellst du?",
                "answer": "Welche Anpassungen, Ressourcen und Entscheidungen haben das ermöglicht, unter welchen Bedingungen funktionieren sie und wo liegen ihre Grenzen?",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 23–24, 27"
          ],
          "remember": "Safety-II untersucht die Voraussetzungen des häufigen Erfolgs."
        },
        {
          "type": "slide",
          "title": "Performance variability gezielt begleiten",
          "body": [
            "Arbeitsbedingungen sind nicht vollständig spezifiziert; Zeit, Personal oder Material können fehlen. Menschen passen deshalb ihre Arbeitsweise an. Performance variability meint hier solche situationsgerechten Anpassungen und nicht einfach Regelverstösse.",
            "Wer jede Variabilität unterbindet, kann auch die Anpassungen verhindern, die Erfolg ermöglichen. Die Folie fordert, Variabilität zu erkennen, zu beobachten und zu steuern: schädliche Entwicklungen dämpfen, hilfreiche stärken.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Erkennen",
                    "text": "Welche Anpassung findet statt?"
                  },
                  {
                    "title": "Beobachten",
                    "text": "Wohin entwickelt sich ihre Wirkung?"
                  },
                  {
                    "title": "Steuern",
                    "text": "Schädliches dämpfen, Hilfreiches stärken"
                  }
                ]
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Ein Team erfindet eine Abkürzung. Ist sie allein deshalb gut, weil bisher kein Unfall passierte?",
                "answer": "Nein. Ressourcen, Einschränkungen und mögliche Folgen müssen untersucht werden. Safety-II ist keine pauschale Freigabe beliebiger Abweichungen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 24–25"
          ],
          "remember": "Weder jede Anpassung verbieten noch jede Anpassung unkritisch fördern."
        },
        {
          "type": "checkpoint",
          "id": "cp-safety-two",
          "title": "Checkpoint: Gelingen und Variabilität",
          "questions": [
            {
              "id": "success",
              "type": "type",
              "prompt": "Mit dem Nenner der Folie gilt p = 0,00001. Wie gross ist 1 − p als Dezimalzahl?",
              "accept": [
                "0.99999",
                "0,99999"
              ],
              "explanation": "Die korrekte Ergänzung ist 0,99999, nicht 0,9. Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 22–27"
            },
            {
              "id": "variability",
              "type": "multi",
              "prompt": "Welche Aussagen zur performance variability stimmen?",
              "options": [
                "Sie kann alltägliches Gelingen ermöglichen.",
                "Sie muss vollständig abgeschafft werden.",
                "Hilfreiche Anpassungen können gestärkt werden.",
                "Ungünstige Entwicklungen sollen gedämpft werden."
              ],
              "correct": [
                0,
                2,
                3
              ],
              "explanation": "Das Ziel ist angemessene Steuerung notwendiger Anpassungen. Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 22–27"
            },
            {
              "id": "success-learn",
              "type": "single",
              "prompt": "Welche Untersuchung ergänzt eine reine Unfallstatistik im Sinne von Safety-II?",
              "options": [
                "Wie alltägliche Arbeit unter wechselnden Bedingungen gelingt",
                "Nur welche Person zuletzt einen Fehler machte",
                "Nur ob alle Prozessschritte immer identisch aussehen"
              ],
              "correct": 0,
              "explanation": "Safety-II untersucht Bedingungen, Anpassungen und Ressourcen erfolgreichen Handelns. Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 22–27"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Proaktiv handeln hat Nutzen und Kosten",
          "body": [
            "Proaktives Management passt Handlungen an, bevor sich Folgen vollständig entwickeln. Frühes Eingreifen kann weniger Aufwand benötigen, weil ein Ereignis noch nicht weitreichend wirkt.",
            "Der Aufwand ist dennoch real: Wenn die erwartete Situation nicht eintritt, können Vorbereitungen ungenutzt bleiben. Die Folie fordert eine Abwägung gegenüber den Kosten fehlender Bereitschaft.",
            {
              "reveal": {
                "question": "Eigener Fall: Eine Leitstelle hält Personal für eine angekündigte Belastung bereit, die ausbleibt. War die Entscheidung damit automatisch falsch?",
                "answer": "Nein. Das Ergebnis allein beurteilt die Entscheidung nicht vollständig. Man muss die damals verfügbaren Informationen, Vorbereitungskosten und möglichen Folgen fehlender Bereitschaft vergleichen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 26"
          ],
          "remember": "Proaktiv bedeutet vorausschauend abwägen, nicht kostenlos oder unfehlbar handeln."
        },
        {
          "type": "slide",
          "title": "Vier Fähigkeiten: vier Leitfragen",
          "body": [
            "Die Resilienzdefinition verlangt Anpassung vor, während und nach Veränderungen, um die benötigten Operationen aufrechtzuerhalten. Die vier Fähigkeiten konkretisieren, wie das unterstützt wird. Sie wirken zusammen und sind keine einmalig abzuarbeitende Reihenfolge.",
            {
              "table": {
                "head": [
                  "Fähigkeit",
                  "Bezug",
                  "Leitfrage"
                ],
                "rows": [
                  [
                    "Respond",
                    "Actual",
                    "Was tun wir jetzt, wann und womit?"
                  ],
                  [
                    "Monitor",
                    "Critical",
                    "Welche relevanten Entwicklungen beobachten wir?"
                  ],
                  [
                    "Anticipate",
                    "Potential",
                    "Was könnte kommen, und reicht unsere Kapazität?"
                  ],
                  [
                    "Learn",
                    "Factual",
                    "Was ist geschehen, und wie ändern wir unser Verhalten?"
                  ]
                ],
                "caption": "Hollnagels Fähigkeiten laut Vorlesung"
              }
            },
            "Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 28–33"
          ],
          "remember": "Actual, critical, potential und factual helfen, die vier Fähigkeiten zu unterscheiden."
        },
        {
          "type": "slide",
          "title": "Monitor und Anticipate unterscheiden",
          "body": [
            "Monitor heisst wissen, worauf zu achten ist: aktuelle Zustände und Anzeichen einer drohenden Störung beobachten. Anticipate heisst wissen, was zu erwarten sein könnte: zukünftige Bedrohungen, Folgen und die eigene Bewältigungskapazität einschätzen.",
            {
              "compare": {
                "left": {
                  "title": "Monitor",
                  "points": [
                    "Relevante Signale beobachten",
                    "Bereitschaft bei kritischen Entwicklungen erhöhen"
                  ]
                },
                "right": {
                  "title": "Anticipate",
                  "points": [
                    "Zukünftige Situationen durchdenken",
                    "Ausreichende Anpassungskapazität hinterfragen"
                  ]
                }
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Heute den Wasserpegel verfolgen und für die nächste Saison unzureichende Pumpenkapazität erkennen – welche Fähigkeit passt jeweils?",
                "answer": "Den aktuellen Pegel verfolgen: Monitor. Zukünftige Bedrohung und ausreichende Kapazität prüfen: Anticipate.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 30–31"
          ],
          "remember": "Beobachtbare kritische Entwicklung und zukünftiges Potenzial sind verschiedene Bezüge."
        },
        {
          "type": "checkpoint",
          "id": "cp-abilities",
          "title": "Checkpoint: Fähigkeiten",
          "questions": [
            {
              "id": "respond",
              "type": "single",
              "prompt": "Welche Handlung illustriert primär Respond?",
              "options": [
                "Eine aktuelle Lage beurteilen und eine passende Massnahme auslösen",
                "Nur Jahresstatistiken archivieren",
                "Ausschliesslich zukünftige Kapazität modellieren"
              ],
              "correct": 0,
              "explanation": "Respond betrifft das tatsächliche aktuelle Geschehen. Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 28–33"
            },
            {
              "id": "monitor-anticipate",
              "type": "multi",
              "prompt": "Welche Zuordnungen stimmen?",
              "options": [
                "Monitor: kritische Entwicklungen beobachten",
                "Anticipate: auch zukünftige Bewältigungskapazität prüfen",
                "Learn: nur aus Katastrophen lernen",
                "Respond: wissen, was wann zu tun ist"
              ],
              "correct": [
                0,
                1,
                3
              ],
              "explanation": "Learn nutzt insbesondere auch häufige ähnliche Situationen. Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 28–33"
            },
            {
              "id": "factual",
              "type": "type",
              "prompt": "Welche der vier Fähigkeiten wird als „dealing with the factual“ bezeichnet?",
              "accept": [
                "learn",
                "learning",
                "lernen"
              ],
              "explanation": "Lernen nutzt das Geschehene, um Verhalten und künftige Ergebnisse zu verändern. Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 28–33"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Lernen ist mehr als Berichte sammeln",
          "body": [
            "Der Zweck von Learn ist Verhaltensänderung: bestimmte Ergebnisse wahrscheinlicher, andere unwahrscheinlicher machen. Häufige, vergleichbare Situationen bieten dafür viele Beobachtungen. Ein abgelegter Bericht ohne Veränderung ist noch kein Beleg für wirksames Lernen.",
            {
              "reveal": {
                "question": "Eigener Transfer: Jeden Monat werden erfolgreiche Schichten besprochen, aber Massnahmen fehlen. Was würdest du ergänzen?",
                "answer": "Konkrete Anpassungen und ihre Bedingungen identifizieren, daraus Veränderungen ableiten und beobachten, ob diese die gewünschten Ergebnisse unterstützen. So wird Besprechen mit Handeln verbunden.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 32–35"
          ],
          "remember": "Lernen muss Konsequenzen für künftiges Handeln haben."
        },
        {
          "type": "slide",
          "title": "Transfer: eine Leitstelle unter Druck",
          "body": [
            {
              "reveal": {
                "question": "Eigener Fall: Nach einer Störung priorisiert ein Team Aufträge neu. Gleichzeitig verfolgt es den Rückstau, prüft Kapazitätsbedarf für die nächste Schicht und ändert später die Übergabe. Ordne die vier Fähigkeiten zu.",
                "answer": "Aktuelle Priorisierung: Respond. Rückstau beobachten: Monitor. Kapazitätsbedarf vorausdenken: Anticipate. Übergabe aufgrund der Erfahrung verändern: Learn. Die Massnahmen sind eigene didaktische Beispiele.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "reveal": {
                "question": "Wie verbindest du Safety-I und Safety-II, ohne Unfälle zu ignorieren?",
                "answer": "Unerwünschte Ereignisse und Ursachen weiter untersuchen und zusätzlich verstehen, welche alltäglichen Anpassungen Gelingen ermöglichen. Beide Perspektiven liefern unterschiedliche Informationen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "checklist": {
                "title": "Kann ich das jetzt?",
                "items": [
                  "Ich erkläre den Unterschied zwischen Safety-I und Safety-II.",
                  "Ich bewerte Anpassungen anhand ihrer Bedingungen und Folgen.",
                  "Ich ordne die vier Fähigkeiten begründet zu.",
                  "Ich erkenne den Rechenfehler im Bahnbeispiel."
                ]
              }
            },
            {
              "callout": {
                "tone": "tip",
                "title": "Zusatzwissen",
                "text": "Detaildaten der Unfälle, Umfrage-Links und Literaturjahre dienen hier als Kontext. Die technischen und organisatorischen Lernpunkte bleiben wichtig."
              }
            },
            "Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 23–35"
          ],
          "remember": "Sicheres Gelingen verstehen und gezielt ermöglichen."
        },
        {
          "type": "checkpoint",
          "id": "cp-final",
          "title": "Checkpoint: begründeter Transfer",
          "questions": [
            {
              "id": "human",
              "type": "single",
              "prompt": "Welche Sicht auf Menschen passt zur Safety-II-Darstellung?",
              "options": [
                "Nur eine zu eliminierende Fehlerquelle",
                "Auch eine Ressource für erfolgreiche Anpassungen",
                "Unabhängig von den Arbeitsbedingungen"
              ],
              "correct": 1,
              "explanation": "Menschen können unter unvollständigen Beschreibungen und knappen Ressourcen Gelingen ermöglichen. Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 23–35"
            },
            {
              "id": "proactive",
              "type": "multi",
              "prompt": "Welche Aussagen über proaktives Management stimmen?",
              "options": [
                "Frühe Anpassung kann Folgeschäden begrenzen.",
                "Vorbereitung hat niemals Kosten.",
                "Nicht eingetretene Szenarien können ungenutzten Aufwand bedeuten.",
                "Fehlende Bereitschaft kann ebenfalls teuer sein."
              ],
              "correct": [
                0,
                2,
                3
              ],
              "explanation": "Die Vorlesung benennt Nutzen und Kosten vorausschauenden Handelns. Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 23–35"
            },
            {
              "id": "potential",
              "type": "type",
              "prompt": "Welche Fähigkeit fragt nach zukünftigen Bedrohungen und ausreichender Anpassungskapazität?",
              "accept": [
                "anticipate",
                "anticipation",
                "antizipieren",
                "Antizipation"
              ],
              "explanation": "Anticipate betrifft das Potenzielle und auch die zukünftige Systemkapazität. Quelle: 02 (01) RESE Road to Resilience_full.pdf, Folien 23–35"
            }
          ]
        }
      ]
    },
    {
      "id": "w4",
      "number": 4,
      "title": "Vulnerabilität, Risiko, Zuverlässigkeit und Robustheit",
      "status": "ready",
      "items": [
        {
          "type": "slide",
          "title": "Vier Begriffe, vier unterschiedliche Fragen",
          "body": [
            "Diese Woche macht Resilienz durch verwandte Konzepte genauer beschreibbar. Vulnerability fragt nach Schädigbarkeit, Risk nach Unsicherheit und Folgen, Reliability nach erfolgreicher Funktion über einen Zeitraum und Robustness nach Funktion unter Belastung.",
            "Das Deckblatt nennt SW4; einzelne Zwischenüberschriften und die Gruppenübung tragen noch SW3. Hier folgt die Zuordnung der SW4-Ablage, dem Deckblatt und dem korrigierten Plan in der vollständigen Road-Fassung.",
            {
              "table": {
                "head": [
                  "Begriff",
                  "Leitfrage"
                ],
                "rows": [
                  [
                    "Vulnerability",
                    "Wie schädigbar ist das System?"
                  ],
                  [
                    "Risk",
                    "Welche Szenarien, Wahrscheinlichkeiten und Folgen sind relevant?"
                  ],
                  [
                    "Reliability",
                    "Wie wahrscheinlich funktioniert es über die angegebene Zeit?"
                  ],
                  [
                    "Robustness",
                    "Wie gut funktioniert es unter Belastung?"
                  ]
                ],
                "caption": "Orientierung für die Lernziele"
              }
            },
            "Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 1–7, 39"
          ],
          "remember": "Verwandte Begriffe ergänzen Resilienz; sie sind keine Synonyme."
        },
        {
          "type": "slide",
          "title": "Vulnerability: Schädigbarkeit unter einer Einwirkung",
          "body": [
            "Die allgemeine Definition beschreibt den Grad, in dem ein System durch einen externen Stressor oder eine Gefährdung geschädigt werden kann. Ein Stressor allein ist deshalb noch keine vollständige Beschreibung der Vulnerabilität.",
            "Die Folien unterscheiden physische, soziale, wirtschaftliche und ökologische Vulnerabilität. Unter der physischen Kategorie betonen sie Strukturtyp und -qualität; die räumliche Betroffenheit wird im Dimensionsmodell als Exposure betrachtet.",
            {
              "table": {
                "head": [
                  "Typ",
                  "Beispielfokus laut Folie"
                ],
                "rows": [
                  [
                    "Physisch",
                    "Gebäude und Infrastruktur"
                  ],
                  [
                    "Sozial",
                    "Besonders betroffene Bevölkerungsgruppen"
                  ],
                  [
                    "Wirtschaftlich",
                    "Vermögenswerte, Betriebsunterbrüche, Arbeitsplätze"
                  ],
                  [
                    "Ökologisch",
                    "Ökosysteme und natürliche Ressourcen"
                  ]
                ],
                "caption": "Verschiedene Gegenstände der Schädigbarkeit"
              }
            },
            "Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 9–12"
          ],
          "remember": "Immer angeben, welches System gegenüber welcher Einwirkung betrachtet wird."
        },
        {
          "type": "slide",
          "title": "Exposure, Sensitivity, Capacity to cope",
          "body": [
            "Das vorgestellte Dimensionsmodell verbindet Exposition, Empfindlichkeit und Bewältigungskapazität. Wie stark ein System betroffen ist, hängt nicht allein von einem technischen Schwachpunkt ab. Die Situation kann sich mit Zeit, Bevölkerung und Ressourcen verändern.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Exposure",
                    "text": "Was ist der Einwirkung ausgesetzt?"
                  },
                  {
                    "title": "Sensitivity",
                    "text": "Wie empfindlich reagiert es?"
                  },
                  {
                    "title": "Capacity to cope",
                    "text": "Welche Bewältigungsmöglichkeiten bestehen?"
                  }
                ],
                "note": "Drei Dimensionen, keine zeitliche Abfolge."
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Zwei Quartiere sind gleich starkem Hochwasser ausgesetzt. Ihre Gebäudequalität und Unterstützungsmöglichkeiten unterscheiden sich. Warum kann die Vulnerabilität trotzdem verschieden sein?",
                "answer": "Gleiche Exposure bedeutet nicht gleiche Sensitivity und Capacity to cope. Die Strukturqualität und die Bewältigungsmöglichkeiten tragen zusätzlich bei.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 12"
          ],
          "remember": "Gleiche Gefährdung oder Exposition bedeutet nicht gleiche Schädigbarkeit."
        },
        {
          "type": "slide",
          "title": "Vulnerabilität bewerten",
          "body": [
            "Qualitative Bewertungen nutzen etwa Expertenurteile, Interviews und lokale Perspektiven. Semiquantitative Bewertungen verbinden Indikatoren und Kriterien, um Muster vergleichbar zu machen. Quantitative Bewertungen verwenden statistische Daten und beobachtete Schäden im Zusammenhang mit Gefährdungen.",
            {
              "compare": {
                "left": {
                  "title": "Qualitativ",
                  "points": [
                    "Kontext und Ursachen sichtbar machen",
                    "Bei begrenzten Daten hilfreich"
                  ]
                },
                "right": {
                  "title": "Semi-/quantitativ",
                  "points": [
                    "Indikatoren beziehungsweise Schadensdaten auswerten",
                    "Vergleichbarkeit und Datengrundlage erklären"
                  ]
                }
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Für eine Gemeinde fehlen Schadensdaten, aber Betroffene können systematische Hindernisse beschreiben. Ist eine Bewertung unmöglich?",
                "answer": "Nein. Eine qualitative partizipative Bewertung kann sinnvoll sein. Ihre Grundlage und Grenzen müssen benannt werden; fehlende Zahlen dürfen nicht durch erfundene Präzision ersetzt werden.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 13"
          ],
          "remember": "Methode nach Frage, Daten und Ressourcen wählen."
        },
        {
          "type": "checkpoint",
          "id": "cp-vulnerability",
          "title": "Checkpoint: Vulnerabilität",
          "questions": [
            {
              "id": "hazard",
              "type": "single",
              "prompt": "Welche Beschreibung betrifft primär Vulnerabilität?",
              "options": [
                "Ein Sturm erreicht eine Region.",
                "Ein System ist aufgrund seiner Eigenschaften durch den Sturm schädigbar.",
                "Eine Uhr zeigt die Sturmdauer."
              ],
              "correct": 1,
              "explanation": "Die Einwirkung allein ist die Gefährdung; Vulnerabilität beschreibt die Schädigbarkeit. Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 9–13"
            },
            {
              "id": "dimensions",
              "type": "multi",
              "prompt": "Welche drei Dimensionen zeigt das Modell der Folie 12?",
              "options": [
                "Exposure",
                "Sensitivity",
                "Capacity to cope",
                "Profit margin"
              ],
              "correct": [
                0,
                1,
                2
              ],
              "explanation": "Die drei genannten Dimensionen ergänzen einander. Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 9–13"
            },
            {
              "id": "method",
              "type": "type",
              "prompt": "Welche Bewertungsart nutzt nach Folie 13 vor allem Expertenurteile und Interviews?",
              "accept": [
                "qualitativ",
                "qualitative",
                "qualitative Bewertung",
                "qualitatives Assessment"
              ],
              "explanation": "Qualitative Methoden können lokale Ursachen bei begrenzten Daten erschliessen. Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 9–13"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Risk: Definition und Kennzahl auseinanderhalten",
          "body": [
            "Eine qualitative Risikobeschreibung kann mögliche unerwünschte Ereignisse, Unsicherheit und Folgen betreffen. Ein Szenario-Wahrscheinlichkeit-Konsequenz-Tripel macht diese Bestandteile explizit. Das Produkt p × C ist eine gebräuchliche vereinfachte Kennzahl, nicht die einzige Definition von Risiko.",
            {
              "formula": {
                "main": "Risiko-Kennzahl = p × C",
                "note": "p: Wahrscheinlichkeit im angegebenen Bezugszeitraum; C: Konsequenz im Szenario."
              }
            },
            {
              "compare": {
                "left": {
                  "title": "Negativer Folgenbezug",
                  "points": [
                    "Potenzial unerwünschter negativer Konsequenzen"
                  ]
                },
                "right": {
                  "title": "ISO-Darstellung der Folie",
                  "points": [
                    "Wirkung von Unsicherheit auf Ziele",
                    "Abweichungen können positiv oder negativ sein"
                  ]
                }
              }
            },
            "Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 16–18"
          ],
          "remember": "Definition, Szenario und gewählte Kennzahl ausdrücklich nennen."
        },
        {
          "type": "slide",
          "title": "Eine Risikorechnung mit benanntem Bezug",
          "body": [
            "Eigenes Lernbeispiel: Ein bestimmtes Ereignis hat im betrachteten Jahr Wahrscheinlichkeit 0,02. Im Ereignisfall wird ein Schaden von 50 000 CHF angenommen. Im vereinfachten binären Szenario ergibt sich 0,02 × 50 000 = 1 000 CHF erwarteter Schaden für dieses Jahr.",
            {
              "formula": {
                "main": "0,02 × 50 000 CHF = 1 000 CHF",
                "note": "Das ist ein Erwartungswert für das definierte Szenario, kein sicher eintretender Jahresverlust."
              }
            },
            {
              "reveal": {
                "question": "Warum bedeutet das Ergebnis nicht, dass jedes Jahr genau 1 000 CHF Schaden entstehen?",
                "answer": "Im Modell tritt entweder der Ereignisschaden oder kein Schaden dieses Szenarios ein. Der Erwartungswert gewichtet die Konsequenz mit ihrer Wahrscheinlichkeit.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 17"
          ],
          "remember": "Wahrscheinlichkeit ist dimensionslos; die Konsequenz legt die Einheit des Erwartungswerts fest."
        },
        {
          "type": "slide",
          "title": "Security-Risiko und Risiko-Prozess",
          "body": [
            "Die Sicherheitsdarstellung der Folie zerlegt das Risiko in Threat × Vulnerability × Consequence. Threat steht dort für das Eintreten des Ereignisses, Vulnerability für das Versagen von Schutzmassnahmen. Für eine Rechnung müssen diese Grössen konsistent definiert sein; ordinale Ratings nicht ohne Erklärung als Wahrscheinlichkeiten behandeln.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Kontext",
                    "text": "Ziele und Untersuchungsrahmen"
                  },
                  {
                    "title": "Identifikation",
                    "text": "Was kann geschehen?"
                  },
                  {
                    "title": "Analyse",
                    "text": "Wie wahrscheinlich und wie schwer?"
                  },
                  {
                    "title": "Evaluation",
                    "text": "Bewertung anhand der Kriterien"
                  },
                  {
                    "title": "Behandlung",
                    "text": "Geeignete Massnahmen wählen"
                  }
                ],
                "note": "Kommunikation/Konsultation sowie Monitoring/Review begleiten den Prozess."
              }
            },
            {
              "reveal": {
                "question": "Ist das Berechnen einer Risikozahl bereits die Entscheidung, ob sie akzeptabel ist?",
                "answer": "Nein. Analyse liefert Informationen; Evaluation beurteilt sie anhand von Kriterien. Behandlung setzt anschliessend am Risiko an.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 17–19"
          ],
          "remember": "Analyse, Evaluation und Behandlung haben unterschiedliche Aufgaben."
        },
        {
          "type": "slide",
          "title": "Risikomodelle zeigen unterschiedliche Zusammenhänge",
          "body": [
            "Die Folie kontrastiert Domino-, Swiss-Cheese-, dynamische Hot-Cheese- und Multi-Risk-Darstellungen. Der Lernpunkt ist, dass starre lineare Ketten nicht jede zeitabhängige oder gekoppelte Situation erklären.",
            "Die Techniken reichen von qualitativen bis quantitativen Ansätzen sowie von Vorhersage bis nachträglicher Analyse. Die Methodenliste ist eine Auswahlhilfe, keine Aufforderung, jedes Verfahren hier auswendig zu lernen.",
            {
              "reveal": {
                "question": "Eigener Fall: Eine Schutzbarriere verschlechtert sich erst während eines laufenden Ereignisses. Was fehlt einer rein statischen Abbildung?",
                "answer": "Die zeitliche Veränderung der Barriere und gegebenenfalls ihre Wechselwirkung mit anderen Prozessen. Ein dynamischer Blick kann diese Veränderung explizit machen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 20–21"
          ],
          "remember": "Modellannahmen müssen zum zeitlichen und systemischen Verhalten passen."
        },
        {
          "type": "checkpoint",
          "id": "cp-risk",
          "title": "Checkpoint: Risiko",
          "questions": [
            {
              "id": "expected",
              "type": "type",
              "prompt": "Eigenes Szenario: p = 0,1 und C = 2 000 CHF. Wie gross ist p × C in CHF?",
              "accept": [
                "200",
                "200 CHF",
                "CHF 200",
                "200.00",
                "200,00"
              ],
              "explanation": "0,1 × 2 000 = 200 CHF erwartete Konsequenz im festgelegten Bezugszeitraum. Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 16–21"
            },
            {
              "id": "iso",
              "type": "multi",
              "prompt": "Welche Aussagen stimmen zur Risikodarstellung der Folien?",
              "options": [
                "p × C ist eine mögliche Kennzahl.",
                "ISO beschreibt nur negative Abweichungen.",
                "Ein Tripel kann Szenario, Wahrscheinlichkeit und Konsequenz enthalten.",
                "Evaluation benötigt Bewertungskriterien."
              ],
              "correct": [
                0,
                2,
                3
              ],
              "explanation": "Die ISO-Darstellung der Folie lässt positive und negative Abweichungen von Zielen zu. Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 16–21"
            },
            {
              "id": "process",
              "type": "order",
              "prompt": "Ordne die Schritte des dargestellten Risikoprozesses.",
              "items": [
                "Kontext festlegen",
                "Risiko identifizieren",
                "Risiko analysieren",
                "Risiko evaluieren",
                "Risiko behandeln"
              ],
              "explanation": "Kommunikation und Monitoring begleiten diese Schritte; sie sind keine einmaligen Endschritte. Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 16–21"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Reliability ist Leistung über Zeit",
          "body": [
            "Zuverlässigkeit beschreibt die Wahrscheinlichkeit, dass eine Komponente oder ein System die beabsichtigte Funktion während eines festgelegten Zeitraums unter angegebenen Betriebsbedingungen erfüllt. Zeit und Bedingungen gehören zur Aussage.",
            "Die Folien kontrastieren erwarteten Normalbetrieb mit ausserordentlicher Belastung bei Robustness. Das ist eine didaktische Abgrenzung: Bei Zuverlässigkeitsangaben müssen die Bedingungen trotzdem konkret benannt werden; Folie 27 führt etwa ausdrücklich Stressbedingungen für ein Testkollektiv ein.",
            {
              "compare": {
                "left": {
                  "title": "Quality",
                  "points": [
                    "Zustand zu einem Zeitpunkt, etwa bei Lieferung",
                    "Momentaufnahme"
                  ]
                },
                "right": {
                  "title": "Reliability",
                  "points": [
                    "Funktion über einen Zeitraum",
                    "Verhalten im Betrieb"
                  ]
                }
              }
            },
            "Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 24–26, 34"
          ],
          "remember": "Eine einwandfreie Lieferung beweist keine jahrelange Zuverlässigkeit."
        },
        {
          "type": "slide",
          "title": "Überlebende und ausgefallene Komponenten zählen",
          "body": [
            "Für ein Testkollektiv mit N Komponenten bezeichnet S(t) die bis t überlebenden und F(t) die ausgefallenen Komponenten. Die Folien verwenden den Anteil S/N als Zuverlässigkeitswert und F/N als Ausfallanteil.",
            {
              "formula": {
                "main": "R(t) = S(t)/N; Pf(t) = F(t)/N; R(t) + Pf(t) = 1",
                "note": "Voraussetzung des Zählmodells: S(t) + F(t) = N."
              }
            },
            {
              "table": {
                "head": [
                  "Eigenes Beispiel bei t",
                  "Anzahl / Anteil"
                ],
                "rows": [
                  [
                    "N",
                    "200"
                  ],
                  [
                    "S(t)",
                    "190"
                  ],
                  [
                    "F(t)",
                    "10"
                  ],
                  [
                    "R(t)",
                    "0,95"
                  ],
                  [
                    "Pf(t)",
                    "0,05"
                  ]
                ],
                "caption": "Eigene Beispielwerte, keine Daten der Vorlesung"
              }
            },
            {
              "reveal": {
                "question": "Warum darfst du S(t) und F(t) nicht aus verschiedenen Zeitpunkten kombinieren?",
                "answer": "Dann bilden sie nicht mehr die vollständige Aufteilung desselben Kollektivs zum selben Zeitpunkt. Die Ergänzungsbeziehung wäre nicht begründet.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 27"
          ],
          "remember": "Gleiche Grundgesamtheit, gleicher Zeitpunkt, klare Zustände."
        },
        {
          "type": "slide",
          "title": "Ausfallrate ist nicht Ausfallwahrscheinlichkeit",
          "body": [
            "Die Hazard- beziehungsweise Ausfallrate bezieht die neu auftretenden Ausfälle pro Zeiteinheit auf die noch überlebenden Komponenten. Sie hat eine Einheit wie 1/h. Eine Ausfallwahrscheinlichkeit für ein Zeitintervall ist dagegen dimensionslos.",
            {
              "formula": {
                "main": "Z(t) = (1 / S(t)) × dF(t)/dt",
                "note": "Bezugsgrösse sind die zum betrachteten Zeitpunkt überlebenden Komponenten."
              }
            },
            {
              "reveal": {
                "question": "Eigenes Näherungsbeispiel: Zu Intervallbeginn leben 100 Komponenten. In einer Stunde fallen 2 aus. Welcher einfache Raten-Schätzwert ergibt sich?",
                "answer": "Mit dem Intervallstart als Näherung des Bestands: 2 / (100 × 1 h) = 0,02 pro Stunde. Das ist eine Intervallnäherung, nicht die exakte zeitkontinuierliche Rate.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 26–28"
          ],
          "remember": "Rate: Ausfälle pro überlebendem Bestand und Zeiteinheit."
        },
        {
          "type": "checkpoint",
          "id": "cp-reliability",
          "title": "Checkpoint: Zuverlässigkeitsgrössen",
          "questions": [
            {
              "id": "quality",
              "type": "single",
              "prompt": "Ein Produkt erfüllt bei Auslieferung alle Anforderungen. Was ist damit direkt beschrieben?",
              "options": [
                "Seine Qualität zu diesem Zeitpunkt",
                "Garantierte Zuverlässigkeit für beliebige Zeiträume",
                "Seine Erholungsfähigkeit nach jeder Störung"
              ],
              "correct": 0,
              "explanation": "Die Qualitätsprüfung ist eine Momentaufnahme; Reliability verlangt eine Zeitbetrachtung. Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 24–28"
            },
            {
              "id": "survive",
              "type": "type",
              "prompt": "Eigenes Beispiel: 90 von 100 Komponenten überleben bis t. Wie gross ist R(t) als Dezimalzahl?",
              "accept": [
                "0.9",
                "0,9",
                "0.90",
                "0,90"
              ],
              "explanation": "R(t) = 90/100 = 0,9. Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 24–28"
            },
            {
              "id": "units",
              "type": "multi",
              "prompt": "Welche Aussagen stimmen?",
              "options": [
                "R und Pf ergänzen sich im Zählmodell zu 1.",
                "Die Ausfallrate hat eine Zeiteinheit im Nenner.",
                "Die Ausfallrate ist immer gleich dem Ausfallanteil.",
                "Die Betriebsbedingungen gehören zur Zuverlässigkeitsangabe."
              ],
              "correct": [
                0,
                1,
                3
              ],
              "explanation": "Rate und Wahrscheinlichkeit sind verschiedene Grössen; Zeit und Bedingungen müssen benannt sein. Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 24–28"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Zwei Badewannen: nicht dieselbe y-Achse",
          "body": [
            "Die Zuverlässigkeits-Badewannenkurve zeigt die Ausfallrate über der Lebenszeit. Früh sinkt die Rate, in der Nutzungsphase wird sie als ungefähr konstant dargestellt, beim Verschleiss steigt sie wieder.",
            "Das ist eine andere Kurve als die Resilienzkurve aus SW2: Dort steht Systemleistung nach einer Störung auf der y-Achse. Eine ähnliche Form darf nicht über die unterschiedlichen Grössen hinwegtäuschen.",
            {
              "table": {
                "head": [
                  "Kurve",
                  "y-Achse",
                  "Interpretation eines tiefen Werts"
                ],
                "rows": [
                  [
                    "Zuverlässigkeits-Badewanne",
                    "Ausfallrate",
                    "Geringere Rate bedingter Ausfälle"
                  ],
                  [
                    "Resilienzkurve",
                    "Systemleistung",
                    "Geringere erbrachte Leistung"
                  ]
                ],
                "caption": "Form ähnlich, Bedeutung verschieden"
              }
            },
            "Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 29"
          ],
          "remember": "Zuerst Achsen lesen, danach die Form interpretieren."
        },
        {
          "type": "slide",
          "title": "Konstante Rate: das Exponentialgesetz",
          "body": [
            "Für eine konstante Ausfallrate λ und anfänglich funktionsfähige Komponenten lautet das Modell R(t) = exp(−λt). Eine konstante Rate bedeutet nicht konstante Zuverlässigkeit: Je länger der Zeitraum, desto kleiner die Wahrscheinlichkeit, bis dahin keinen Ausfall zu haben.",
            {
              "formula": {
                "main": "R(t) = exp(−λt)",
                "note": "λ × t muss dimensionslos sein. Das Modell setzt eine konstante Rate voraus."
              }
            },
            {
              "reveal": {
                "question": "Eigenes Beispiel: λ = 0,001 pro Stunde, t = 100 Stunden. Berechne R(t) und Pf(t).",
                "answer": "R = exp(−0,1) ≈ 0,9048 und Pf = 1 − R ≈ 0,0952. Also rund 90,48 % Zuverlässigkeit und 9,52 % Ausfallwahrscheinlichkeit im Modell.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "callout": {
                "tone": "warn",
                "title": "Modellgrenze",
                "text": "Die konstante Rate der Nutzungsphase nicht ungeprüft auf Frühausfälle oder Verschleiss übertragen."
              }
            },
            "Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 30"
          ],
          "remember": "Konstante Hazardrate führt zu exponentiell abnehmender Überlebenswahrscheinlichkeit."
        },
        {
          "type": "slide",
          "title": "Backup verstehen: Herleitung mit richtiger Grenze",
          "body": [
            "Aus λ = −R′(t)/R(t) folgt bei konstanter Rate und R(0)=1 nach Integration: ln R(t) − ln 1 = −λt. Daraus ergibt sich das Exponentialgesetz. Die Anfangsbedingung ist dafür wesentlich.",
            {
              "formula": {
                "main": "∫ von 1 bis R(t) (1/r) dr = −λt",
                "note": "r ist die Integrationsvariable; die untere Grenze ist R(0)=1."
              }
            },
            {
              "callout": {
                "tone": "warn",
                "title": "Korrektur zu Folie 46",
                "text": "Die Folie setzt im rechten Integral eine untere Grenze 0. Das Integral von 1/r wäre dort nicht endlich. Mit R(0)=1 ist die korrekte untere Grenze 1; das angegebene Endergebnis bleibt richtig."
              }
            },
            "Der Backup-Katalog nennt auch Weibull und Lognormal sowie weitere Verteilungen für unterschiedliche Analysezwecke. Er ist hier Zusatzwissen; daraus folgen keine neuen Rechenpflichten.",
            "Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 45–47"
          ],
          "remember": "Eine richtige Endformel kann trotz eines Fehlers im dargestellten Rechenweg entstehen."
        },
        {
          "type": "checkpoint",
          "id": "cp-exponential",
          "title": "Checkpoint: Rate und Zeit",
          "questions": [
            {
              "id": "bathtub",
              "type": "order",
              "prompt": "Ordne die Phasen der Ausfallraten-Badewanne.",
              "items": [
                "Frühausfälle mit sinkender Rate",
                "Nutzungsphase mit ungefähr konstanter Rate",
                "Verschleiss mit steigender Rate"
              ],
              "explanation": "Die y-Achse ist Ausfallrate, nicht Systemleistung. Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 29–30, 45–46"
            },
            {
              "id": "exponent",
              "type": "type",
              "prompt": "λ = 0,002 pro Stunde und t = 50 Stunden. Welcher Zahlenwert steht in exp(−λt) im Exponenten, einschliesslich Minuszeichen?",
              "accept": [
                "-0.1",
                "-0,1",
                "−0.1",
                "−0,1",
                "-0.10",
                "-0,10"
              ],
              "explanation": "−0,002 × 50 = −0,1. λt ist dimensionslos. Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 29–30, 45–46"
            },
            {
              "id": "assumptions",
              "type": "multi",
              "prompt": "Welche Aussagen passen zum Exponentialmodell?",
              "options": [
                "Die Rate λ ist konstant.",
                "R(t) ist deshalb ebenfalls konstant.",
                "Bei R(0)=1 startet die Überlebenswahrscheinlichkeit bei 1.",
                "Stunden und Jahre dürfen ohne Umrechnung gemischt werden."
              ],
              "correct": [
                0,
                2
              ],
              "explanation": "Zeit und Rate müssen dieselbe Zeiteinheit verwenden; R sinkt trotz konstanter Rate. Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 29–30, 45–46"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Robustness: Funktion unter Belastung",
          "body": [
            "Die Definitionen unterscheiden sich im Detail, teilen aber einen Kern: Das System soll bei Belastung, schwankenden Bedingungen oder aussergewöhnlichen Eingaben weiterhin angemessen funktionieren. Einige Definitionen betonen zusätzlich kontrolliertes Versagen ausserhalb des Betriebsbereichs.",
            {
              "compare": {
                "left": {
                  "title": "Reliability im Vorlesungsvergleich",
                  "points": [
                    "Funktion über Zeit unter erwarteten Bedingungen"
                  ]
                },
                "right": {
                  "title": "Robustness",
                  "points": [
                    "Funktion bei Stress und Abweichungen vom erwarteten Bereich"
                  ]
                }
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Ein Server läuft monatelang störungsfrei, bricht aber bei Lastspitzen sofort ein. Was ist damit noch nicht nachgewiesen?",
                "answer": "Robustheit gegenüber diesen Lastspitzen. Die lange störungsfreie Laufzeit betrifft andere Betriebsbedingungen und reicht dafür nicht als Nachweis.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 33–35"
          ],
          "remember": "Zuverlässigkeit unter einer Bedingung beweist keine Robustheit unter einer anderen."
        },
        {
          "type": "slide",
          "title": "Robustheit untersuchen und verbessern",
          "body": [
            "Genannt werden Lastreserven, Sicherheitsfaktoren, Toleranz gegenüber Variabilität und Widerstand im Stress-Strain-Verhalten. Eine Robustheitsanalyse untersucht, wie sich ein Entwurf unter Variation und Störungen verhält.",
            "Die Analyse kann bekannte Lastschwankungen und modellierte Unsicherheit berücksichtigen. Wichtig sind ein definiertes Funktionskriterium und ein benannter Belastungsbereich, damit „robust“ nicht bloss ein positives Etikett bleibt.",
            {
              "reveal": {
                "question": "Eigener Transfer: Ein Transformator arbeitet bei schwankender Spannung weiter. Welche Angaben machen daraus eine überprüfbare Robustheitsaussage?",
                "answer": "Den betrachteten Spannungsbereich, die verlangte Funktion beziehungsweise Leistungsgrenze und die beobachteten oder modellierten Ergebnisse nennen. Aus einem einzelnen gelungenen Versuch folgt keine unbegrenzte Robustheit.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 36–37"
          ],
          "remember": "Belastungsbereich und Funktionskriterium machen Robustheit prüfbar."
        },
        {
          "type": "checkpoint",
          "id": "cp-robustness",
          "title": "Checkpoint: Abgrenzen",
          "questions": [
            {
              "id": "load",
              "type": "single",
              "prompt": "Ein Metrosystem funktioniert trotz unerwartet hoher Last. Welcher Begriff passt unmittelbar?",
              "options": [
                "Robustness",
                "Nur Quality bei Lieferung",
                "Nur MTTF"
              ],
              "correct": 0,
              "explanation": "Die Folie nutzt hohe Fahrgastlast als Robustheitsbeispiel. Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 24–37"
            },
            {
              "id": "proof",
              "type": "multi",
              "prompt": "Welche Nachweise passen zur Robustheitsanalyse?",
              "options": [
                "Verhalten unter definierten Störungen untersuchen",
                "Funktion bei Parametervariation prüfen",
                "Nur eine jahrelange störungsfreie Normalphase nennen",
                "Benötigte Funktion und Belastungsbereich angeben"
              ],
              "correct": [
                0,
                1,
                3
              ],
              "explanation": "Normalbetrieb allein deckt die betrachtete Ausnahmelast nicht ab. Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 24–37"
            },
            {
              "id": "availability",
              "type": "type",
              "prompt": "Welcher englische Begriff bezeichnet den Anteil der Zeit, in dem ein System betriebsbereit ist?",
              "accept": [
                "availability",
                "system availability",
                "Verfügbarkeit",
                "Verfuegbarkeit"
              ],
              "explanation": "Availability ist laut Folie 26 ein Betriebszeitanteil; nicht mit der ausfallfreien Überlebenswahrscheinlichkeit gleichsetzen. Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 24–37"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Gruppenübung: Begriffe auf die Kurve beziehen",
          "body": [
            "Die Gruppenübung verlangt, Vulnerability, Risk, Reliability und Robustness auf die Resilienzkurve zu beziehen. Die Vorlage enthält keine ausgefüllte Musterlösung. Es gibt daher hier einen begründeten Lösungsvorschlag, keine behauptete offizielle Beschriftung.",
            {
              "reveal": {
                "question": "Skizziere zuerst selbst eine Zuordnung. Welche Begriffe betreffen eher das Funktionieren, den Einbruch und die Betrachtung von Szenarien?",
                "answer": "Begründeter Vorschlag: Reliability beschreibt Funktion über Zeit unter festgelegten Betriebsbedingungen, etwa vor dem Ereignis. Robustness betrifft das Aufrechterhalten von Funktion unter Belastung und damit die Begrenzung des Einbruchs. Vulnerability beschreibt Schädigbarkeit und Bewältigungsmöglichkeiten; sie kann Einbruch und Verlauf beeinflussen. Risk verbindet Ereignisszenario, Wahrscheinlichkeit und Folgen. Es ist keine direkt ablesbare Achse einer einzelnen realisierten Kurve.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "callout": {
                "tone": "warn",
                "title": "Keine starre Eins-zu-eins-Zuordnung",
                "text": "Die Begriffe wirken zusammen und hängen von Definition und Messgrösse ab. Die Fläche einer Leistungskurve ist nicht automatisch ein vollständiges Risiko; Wahrscheinlichkeiten und Konsequenzbezug fehlen sonst."
              }
            },
            "Quelle: 03 (02) RESE Group Exercise.pdf, Folien 3; 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 9–39"
          ],
          "remember": "Die Zuordnung muss begründet werden; eine einzelne Kurve enthält keine vollständige Risikoanalyse."
        },
        {
          "type": "slide",
          "title": "Transfer und Zusatzwissen",
          "body": [
            {
              "reveal": {
                "question": "Eigener Fall: Spital-IT läuft lange störungsfrei, ist einem Angriff aber stark ausgesetzt. Ein Ersatzprozess hält die Kernversorgung aufrecht und später wird der Normalbetrieb hergestellt. Beschreibe den Fall mit mehreren Begriffen.",
                "answer": "Die störungsfreie Laufzeit betrifft Reliability unter den bisherigen Bedingungen. Angriffsbezogene Exposure, Empfindlichkeit und Bewältigungsmöglichkeiten betreffen Vulnerability. Weiterlaufende Kernfunktionen unter Belastung zeigen einen Robustheitsbeitrag. Wiederherstellung gehört zum Resilienzverlauf; Risiko benötigt zusätzlich ein Szenario mit Wahrscheinlichkeit und Konsequenzen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "reveal": {
                "question": "Eigener Transfer: Zwei Pläne haben dieselbe p×C-Kennzahl, aber sehr unterschiedliche Schäden und Wahrscheinlichkeiten. Sind sie deshalb in jeder Hinsicht gleich?",
                "answer": "Nein. Gleicher Erwartungswert bedeutet nicht gleiche Verteilung oder gleiche Akzeptabilität. Die Szenarien und Bewertungskriterien müssen sichtbar bleiben.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "checklist": {
                "title": "Kann ich das jetzt?",
                "items": [
                  "Ich unterscheide die vier Konzepte an einem Systemfall.",
                  "Ich rechne p×C, S/N, 1−R und exp(−λt) mit klaren Einheiten.",
                  "Ich unterscheide Ausfallrate und Wahrscheinlichkeit.",
                  "Ich begründe eine Zuordnung zur Resilienzkurve."
                ]
              }
            },
            {
              "callout": {
                "tone": "tip",
                "title": "Zusatzwissen",
                "text": "Historische Risiko- und Reliability-Stationen (43–44) sowie der Verteilungskatalog (47) sind eingeordnet. Die Herleitung (45–46) vertieft die Modellannahmen."
              }
            },
            "Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 9–39, 43–47; 03 (02) RESE Group Exercise.pdf, Folien 3"
          ],
          "remember": "Rechnen und Begründen gehören zusammen."
        },
        {
          "type": "checkpoint",
          "id": "cp-final",
          "title": "Checkpoint: integrierter Fall",
          "questions": [
            {
              "id": "curve",
              "type": "multi",
              "prompt": "Welche Aussagen zur Gruppenübung sind begründbar?",
              "options": [
                "Robustheit kann die Begrenzung des Leistungseinbruchs betreffen.",
                "Die y-Achse zeigt automatisch das Risiko.",
                "Eine einzelne Kurve nennt noch keine Ereigniswahrscheinlichkeit.",
                "Vulnerabilität und Bewältigungsmöglichkeiten können den Verlauf beeinflussen."
              ],
              "correct": [
                0,
                2,
                3
              ],
              "explanation": "Die Kurve zeigt Leistung über Zeit; Risiko braucht einen zusätzlichen Szenario- und Wahrscheinlichkeitsbezug. Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 9–39; 03 (02) RESE Group Exercise.pdf, Folien 3"
            },
            {
              "id": "same-risk",
              "type": "single",
              "prompt": "Zwei Szenarien haben denselben p×C-Wert. Was folgt?",
              "options": [
                "Alle Konsequenzen sind identisch.",
                "Die vereinfachten Erwartungswerte stimmen überein; die Szenarien können verschieden sein.",
                "Die Ereignisse treten gleich häufig ein."
              ],
              "correct": 1,
              "explanation": "Ein identisches Produkt legt seine beiden Faktoren nicht eindeutig fest. Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 9–39; 03 (02) RESE Group Exercise.pdf, Folien 3"
            },
            {
              "id": "complement",
              "type": "type",
              "prompt": "Ein Modell ergibt R(t)=0,8. Wie gross ist Pf(t) als Dezimalzahl?",
              "accept": [
                "0.2",
                "0,2",
                "0.20",
                "0,20"
              ],
              "explanation": "Pf = 1 − 0,8 = 0,2. Quelle: 03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf, Folien 9–39; 03 (02) RESE Group Exercise.pdf, Folien 3"
            }
          ]
        }
      ]
    }
  ]
});
