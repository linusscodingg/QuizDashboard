/*
 * Lerncoach-Inhalte für IT-Recht.
 * Kursstand Moodle 31700, 06.10.2026: Einführung und IT-Verträge als zwei Handouts;
 * Aufzeichnungen IT-Verträge (1)/(2), kein separates drittes Handout. Videos nicht transkribiert.
 * W1: Handout Einführung Informatikrecht.pdf, alle 25 PDF-Seiten textlich und visuell gelesen.
 * A: Anspruch/Beweis (11–12,19), Normen/Einordnung (13–20), Verfahren (21–24)
 *    -> Fall-Reveals, cp-anspruch/staat/regeln/zivil/verfahren.
 * B: Rechtsfunktion, Standards und Risiken (5–10) -> cp-rahmen und Cloud-Transfer.
 * C: Organisation/Illustrationen (1–4,25); Prüfungsformat nur gemäss Seite 3.
 * W2: 260923, ZHAW, ITR-HS26-IT-Verträge, Mf.pdf, alle 24 PDF-Seiten gelesen;
 * bestehende Wochen-, Checkpoint- und Frage-IDs bleiben erhalten.
 * Präzisierungen: ZGB 3 statt 2; BV-Kompetenz versus Normvorrang; keine automatische
 * Nichtigkeit; Art. 404 OR; Werkvertrag nicht nur an Abnahme erkennen; differenzierte Mängelrechte.
 * Primärbelege (geprüft 06.10.2026; Artikel/Erwägungen jeweils im Inhalt):
 * ZGB: https://www.fedlex.admin.ch/eli/cc/24/233_245_233/de
 * BV: https://www.fedlex.admin.ch/eli/cc/1999/404/de
 * OR: https://www.fedlex.admin.ch/eli/cc/27/317_321_377/de
 * BGE 115 II 464 E.2: https://www.bger.ch/ext/eurospider/live/fr/php/clir/http/index.php?highlight_docid=atf%3A%2F%2F115-II-464%3Afr&type=show_document
 * BGer 2C_373/2022 E.2.4/3.1: https://search.bger.ch/ext/eurospider/live/fr/php/aza/http/index.php?highlight_docid=aza%3A%2F%2F24-05-2022-2C_373-2022&type=show_document
 * Eigene Fälle sind Lernbeispiele; Original-PDFs bleiben ausserhalb des Repos.
 *
 * Woche 2 aus: 260923, ZHAW, ITR-HS26-IT-Verträge, Mf.pdf
 *   (Informatikrecht HS 2026, "Verschiedene Arten von (IT-)Verträgen", 24 Folien).
 *
 * Didaktische Ausrichtung: IT-Recht ist eine Open-Book-Prüfung. Die Lektion ist deshalb
 * auf schnelles Nachschlagen und Fallanwendung optimiert, nicht auf Auswendiglernen.
 * Artikelnummern stehen überall dabei, am Schluss ein OR-Spickzettel.
 *
 * Gewichtung (steuert Tiefe und Quizabdeckung):
 *   A, muss ich können   – Vertragstyp im IT-Projekt erkennen (Werkvertrag, Auftrag, Kauf,
 *                          Miete, Arbeitsvertrag, Kombination), die juristischen Fallstricke
 *                          in Projekten, wesentliche Regelungen des Arbeitsvertrages.
 *                          Das sind exakt die drei Lernziele auf Folie 2.
 *   B, sollte ich verstehen – Vertragsgestaltung, Musterverträge, Konfliktmanagement,
 *                          Zusammenarbeitsverträge, Rahmenbedingungen im 21. Jahrhundert.
 *   C, nur einordnen     – Titelfolie, Vertragsentwurf-Auszug, Schlussfolie.
 *
 * Nachschlagetabellen, Prozessdarstellungen, Gegenüberstellungen und Fälle unterstützen die Lernziele.
 * Tabellen sind eigene Nachbauten der Folieninhalte, keine Folienbilder.
 */
Lerncoach.registerSubject({
  id: "ITRECHT",
  name: "IT-Recht",
  description: "Rechtliche Grundlagen der Informatik",
  accent: "#6d4bc3",
  weeks: [
    {
      "id": "w1",
      "number": 1,
      "title": "Einführung ins Informatikrecht",
      "status": "ready",
      "items": [
        {
          "type": "slide",
          "title": "Rechtliche Fragen im IT-Projekt erkennen",
          "body": [
            "Du sollst technische Sachverhalte rechtlich einordnen und begründet beurteilen können. Die Einführung schafft dafür das Werkzeug: Beteiligte, Anspruch, Rechtsgrundlage, Beweis und passendes Verfahren.",
            {
              "callout": {
                "tone": "exam",
                "title": "Belegter Prüfungsrahmen",
                "text": "Seite 3 nennt eine schriftliche Open-Book-Modulendprüfung von 90 Minuten und 2 ECTS. Der Lerncoach übt deshalb das Anwenden und Nachschlagen. Weitere Hilfsmittelregeln werden daraus nicht abgeleitet."
              }
            },
            {
              "flow": {
                "steps": [
                  {
                    "title": "Sachverhalt",
                    "text": "Was ist technisch und tatsächlich passiert?"
                  },
                  {
                    "title": "Rechtliche Frage",
                    "text": "Wer verlangt was von wem?"
                  },
                  {
                    "title": "Begründung",
                    "text": "Welche Regel und welche belegten Tatsachen tragen das Ergebnis?"
                  }
                ]
              }
            },
            "Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 2–4"
          ],
          "remember": "Open Book hilft beim Finden der Regel; anwenden musst du sie selbst."
        },
        {
          "type": "slide",
          "title": "Weshalb Recht in einem technischen Umfeld?",
          "body": [
            "Recht macht Zusammenarbeit berechenbarer: Es ordnet Pflichten, begrenzt Macht und bietet Verfahren zur Konfliktlösung. Die Folien betrachten auch vertragliche Vereinbarungen als Teil dieses Rahmens.",
            {
              "compare": {
                "left": {
                  "title": "Gesetzlicher Rahmen",
                  "points": [
                    "Zulässiges Verhalten und Mindestanforderungen",
                    "Freiräume für private Gestaltung"
                  ]
                },
                "right": {
                  "title": "Vereinbarungen und Standards",
                  "points": [
                    "Verträge konkretisieren Leistungen und Verantwortung",
                    "Standards und Best Practices ergänzen das Recht"
                  ]
                }
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Ein Anbieter erfüllt einen Sicherheitsstandard. Beweist das bereits, dass jeder Datenfluss rechtmässig ist?",
                "answer": "Nein. Technische Standards ersetzen weder die Prüfung gesetzlicher Anforderungen noch die konkreten vertraglichen Pflichten. Sie können bei der Beurteilung helfen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 5–7"
          ],
          "remember": "Technisch sinnvoll, normkonform und rechtlich zulässig sind verschiedene Prüffragen."
        },
        {
          "type": "slide",
          "title": "Risiken gemeinsam behandeln",
          "body": [
            "Informatikrecht ist ein Querschnittsgebiet. Ein Cloud-Projekt kann Vertrags-, Datenschutz- und Haftungsfragen verbinden; Open Source wirft etwa Lizenz- und Urheberrechtsfragen auf. Dafür musst du die Technik und die rechtliche Einordnung verstehen.",
            {
              "cards": [
                {
                  "title": "Technisch",
                  "text": "Abhängigkeiten, Zugriffe und Ausfälle untersuchen."
                },
                {
                  "title": "Organisatorisch",
                  "text": "Zuständigkeiten, Kontrollen und Dokumentation festlegen."
                },
                {
                  "title": "Rechtlich",
                  "text": "Pflichten, Rechtsgrundlagen und Konfliktwege früh klären."
                }
              ]
            },
            {
              "reveal": {
                "question": "Eigener Fall: Eine API wird kurz vor dem Launch abgeschaltet. Welche Risiken ausser dem technischen Ausfall prüfst du?",
                "answer": "Vertragliche Zusagen, Support und Exit, Verantwortliche, Nachweise sowie mögliche Schäden. Je nach Datenfluss kommen Datenschutz und internationale Bezüge hinzu. Nicht jedes Projekt hat dieselbe Rechtslage.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 8–10"
          ],
          "remember": "Compliance verlangt Organisation und Kontrolle; Dokumentation allein genügt nicht."
        },
        {
          "type": "checkpoint",
          "id": "cp-rahmen",
          "title": "Checkpoint: Recht und IT",
          "questions": [
            {
              "id": "standard",
              "type": "single",
              "prompt": "Ein Projekt erfüllt einen ISO-Standard. Welche Folgerung ist zulässig?",
              "options": [
                "Damit ist jede Rechtsfrage erledigt.",
                "Der Standard hilft, ersetzt aber die Rechtsprüfung nicht.",
                "Verträge gelten dadurch nicht mehr."
              ],
              "correct": 1,
              "explanation": "Standards ergänzen den rechtlichen Rahmen. Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 5–10"
            },
            {
              "id": "massnahmen",
              "type": "multi",
              "prompt": "Welche Ebenen verbindet die Vorlesung beim Risikomanagement?",
              "options": [
                "Technische Massnahmen",
                "Organisatorische Massnahmen",
                "Rechtliche Massnahmen",
                "Ausschliesslich eine Prüfung am letzten Projekttag"
              ],
              "correct": [
                0,
                1,
                2
              ],
              "explanation": "Frühe gemeinsame Prüfung kann spätere Projektrisiken vermeiden. Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 5–10"
            },
            {
              "id": "quer",
              "type": "type",
              "prompt": "Wie nennt die Vorlesung ein Rechtsgebiet, das mehrere klassische Rechtsgebiete mit IT-Sachverhalten verbindet?",
              "accept": [
                "Querschnittsgebiet",
                "ein Querschnittsgebiet",
                "Querschnittsrechtsgebiet"
              ],
              "explanation": "Informatikrecht bündelt verschiedene Rechtsfragen im technischen Kontext. Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 5–10"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Wer will von wem was woraus?",
          "body": [
            {
              "table": {
                "head": [
                  "Frage",
                  "Bedeutung",
                  "Eigener Fall: unbezahlte IT-Leistung"
                ],
                "rows": [
                  [
                    "Wer?",
                    "Anspruchsteller",
                    "IT-Anbieter A"
                  ],
                  [
                    "Von wem?",
                    "Anspruchsgegner",
                    "Kunde B"
                  ],
                  [
                    "Was?",
                    "Verlangte Leistung",
                    "Zahlung eines vereinbarten Entgelts"
                  ],
                  [
                    "Woraus?",
                    "Rechtliche Grundlage",
                    "Vertrag und einschlägige gesetzliche Regeln"
                  ]
                ],
                "caption": "Die Tabelle strukturiert einen Anspruch; sie beweist ihn noch nicht."
              }
            },
            {
              "reveal": {
                "question": "Warum genügt „Die Software funktioniert nicht“ als juristische Fragestellung nicht?",
                "answer": "Es fehlen insbesondere die Beteiligten, die konkret verlangte Rechtsfolge und die Grundlage. Ein technisches Problem kann verschiedene Ansprüche gegen verschiedene Personen auslösen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 11"
          ],
          "remember": "Jeden möglichen Anspruch getrennt formulieren."
        },
        {
          "type": "slide",
          "title": "Eine Behauptung ist noch keine Begründung",
          "body": [
            "Das Schema auf Seite 12 verbindet Rechtsgrundlage und Beweis mit der Schlussfolgerung. Die Formel ist eine Denkstütze, keine mathematische Garantie für eine eindeutige Lösung.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Regel finden",
                    "text": "Welche Voraussetzungen nennt die passende Grundlage?"
                  },
                  {
                    "title": "Tatsachen zuordnen",
                    "text": "Was ist belegt, was bestritten oder unbekannt?"
                  },
                  {
                    "title": "Anwenden",
                    "text": "Welche Voraussetzung ist erfüllt oder offen?"
                  },
                  {
                    "title": "Ergebnis begründen",
                    "text": "Folgerung und verbleibende Unsicherheit nennen."
                  }
                ]
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: „Der Anbieter muss zahlen, weil der Ausfall ärgerlich war.“ Was fehlt?",
                "answer": "Eine passende Anspruchsgrundlage mit ihren Voraussetzungen sowie Tatsachen und Nachweise, die diese Voraussetzungen erfüllen. Ärger allein ersetzt diese Prüfung nicht.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 12"
          ],
          "remember": "Regel + belegter Sachverhalt + Anwendung ergeben eine nachvollziehbare Antwort."
        },
        {
          "type": "slide",
          "title": "Beweislast und brauchbare Unterlagen",
          "body": [
            "Grundregel nach Art. 8 ZGB: Wer aus einer behaupteten Tatsache ein Recht ableitet, muss diese grundsätzlich beweisen; abweichende gesetzliche Regeln bleiben vorbehalten. Das ist nicht identisch mit „immer nur der Kläger muss alles beweisen“.",
            {
              "table": {
                "head": [
                  "Eigene Behauptung",
                  "Möglicher Nachweis"
                ],
                "rows": [
                  [
                    "Eine bestimmte Funktion wurde zugesagt.",
                    "Vereinbarung, Spezifikation oder dokumentierte Kommunikation"
                  ],
                  [
                    "Eine Frist wurde vereinbart.",
                    "Bestätigung und nachvollziehbare Versionshistorie"
                  ],
                  [
                    "Eine Zahlung erfolgte.",
                    "Zahlungsbeleg"
                  ]
                ],
                "caption": "Beweiskraft und Vollständigkeit sind im konkreten Fall zu beurteilen."
              }
            },
            {
              "reveal": {
                "question": "Ein Kunde beruft sich auf bereits erfolgte Zahlung. Warum ist die Frage nach dem Zahlungsbeleg sinnvoll?",
                "answer": "Auch die Gegenseite kann Tatsachen behaupten, aus denen sie Rechte ableitet. Die Beweisfrage folgt der jeweiligen Behauptung; Art. 8 ZGB enthält den Ausgangspunkt.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 12, 19, 22; Art. 8 ZGB"
          ],
          "remember": "Behauptung, Nachweis und rechtliche Wirkung auseinanderhalten."
        },
        {
          "type": "checkpoint",
          "id": "cp-anspruch",
          "title": "Checkpoint: Einen Fall begründen",
          "questions": [
            {
              "id": "vierfragen",
              "type": "order",
              "prompt": "Ordne das Frageschema der Vorlesung.",
              "items": [
                "Wer?",
                "Von wem?",
                "Was?",
                "Woraus?"
              ],
              "explanation": "Es verbindet Parteien, Forderung und Anspruchsgrundlage. Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 11–12, 19; Art. 8 ZGB"
            },
            {
              "id": "begruendung",
              "type": "multi",
              "prompt": "Welche Bausteine tragen eine juristische Antwort?",
              "options": [
                "Passende Rechtsgrundlage",
                "Relevante Tatsachen und Beweise",
                "Anwendung der Regel auf den Fall",
                "Nur das gewünschte Ergebnis"
              ],
              "correct": [
                0,
                1,
                2
              ],
              "explanation": "Die Schlussfolgerung muss nachvollziehbar hergeleitet sein. Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 11–12, 19; Art. 8 ZGB"
            },
            {
              "id": "beweis",
              "type": "single",
              "prompt": "Welche Aussage trifft die Grundregel von Art. 8 ZGB?",
              "options": [
                "Das Gericht muss jede private Behauptung ungefragt beweisen.",
                "Grundsätzlich beweist eine Partei die Tatsachen, aus denen sie Rechte ableitet.",
                "Eine laut vorgetragene Behauptung genügt."
              ],
              "correct": 1,
              "explanation": "Gesetzliche Ausnahmen sind zu prüfen; eine Parteibezeichnung allein entscheidet nicht jede Beweisfrage. Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 11–12, 19; Art. 8 ZGB"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Gewaltenteilung: Wer macht was?",
          "body": [
            {
              "cards": [
                {
                  "title": "Legislative",
                  "text": "Setzt gesetzliche Regeln; Parlamente und direktdemokratische Mitwirkung."
                },
                {
                  "title": "Exekutive",
                  "text": "Führt Gesetze aus und verwaltet."
                },
                {
                  "title": "Judikative",
                  "text": "Beurteilt rechtliche Streitigkeiten."
                }
              ]
            },
            "Die Folie beschreibt die Kontrolle und Begrenzung staatlicher Macht. Diese Funktionen sind von der Frage zu trennen, ob Bund, Kanton oder Gemeinde zuständig ist.",
            {
              "reveal": {
                "question": "Eigener Fall: Ein Gericht entscheidet einen Streit über ein kantonales Gesetz. Welche zwei Einordnungen sind zu unterscheiden?",
                "answer": "Judikative bezeichnet die staatliche Funktion. Kantonal bezeichnet die Ebene. Funktion und Gemeinwesen beantworten verschiedene Fragen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 13–14"
          ],
          "remember": "Gewaltenteilung ist eine Funktionsordnung, Föderalismus eine Kompetenzordnung."
        },
        {
          "type": "slide",
          "title": "Bund, Kantone und Gemeinden: Kompetenz zuerst",
          "body": [
            "Kantone behalten die Aufgaben, die nicht dem Bund übertragen sind. Der Bund benötigt eine verfassungsrechtliche Zuständigkeit. Gemeindeautonomie besteht im Rahmen des kantonalen Rechts.",
            {
              "callout": {
                "tone": "warn",
                "title": "Präzisierung der Folie",
                "text": "„Kantone stehen über dem Bund“ darf nicht als Vorrang kantonaler Regeln gelernt werden. Art. 3 BV betrifft die Kompetenzverteilung; nach Art. 49 BV geht Bundesrecht entgegenstehendem kantonalem Recht vor."
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Eine kantonale Regel widerspricht anwendbarem Bundesrecht. Reicht der Hinweis auf kantonale Eigenständigkeit?",
                "answer": "Nein. Zuständigkeit und Normenkollision sind getrennt zu prüfen. Die Kompetenzverteilung hebt den Vorrang des Bundesrechts nicht auf.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 15; Art. 3, 42, 49–50 BV"
          ],
          "remember": "Wer eine Regel erlassen darf und welche Regel im Konflikt vorgeht, sind zwei Fragen."
        },
        {
          "type": "slide",
          "title": "Normenrang, Rechtsquelle und Einzelfall",
          "body": [
            {
              "flow": {
                "steps": [
                  {
                    "title": "Verfassung",
                    "text": "Grundlegender Rahmen"
                  },
                  {
                    "title": "Gesetz",
                    "text": "Gesetzliche Regelung"
                  },
                  {
                    "title": "Verordnung",
                    "text": "Nähere generell-abstrakte Regeln im gesetzlichen Rahmen"
                  }
                ]
              }
            },
            {
              "compare": {
                "left": {
                  "title": "Verordnung",
                  "points": [
                    "Regelt allgemein einen Bereich"
                  ]
                },
                "right": {
                  "title": "Verfügung",
                  "points": [
                    "Hoheitliche Entscheidung in einem konkreten Einzelfall"
                  ]
                }
              }
            },
            "Beim Nachschlagen prüfst du zusätzlich die Rechtsquelle. Art. 1 ZGB beginnt beim Gesetz; für Lücken nennt er Gewohnheitsrecht und richterliche Rechtsfindung unter Beachtung bewährter Lehre und Überlieferung.",
            {
              "reveal": {
                "question": "Eigener Fall: Eine Behörde lehnt ein bestimmtes Gesuch ab. Ist diese Ablehnung deshalb eine Verordnung?",
                "answer": "Nein. Die individuelle Entscheidung ist als Verfügung zu prüfen. Die allgemeine Regel, auf die sie sich stützt, kann in Gesetz oder Verordnung stehen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 14, 16; Art. 1 ZGB"
          ],
          "remember": "Normenrang, Herkunft und konkrete Rechtsanwendung nicht vermischen."
        },
        {
          "type": "checkpoint",
          "id": "cp-staat",
          "title": "Checkpoint: Staat und Rechtsordnung",
          "questions": [
            {
              "id": "judikative",
              "type": "single",
              "prompt": "Welche Funktion beurteilt einen Rechtsstreit?",
              "options": [
                "Legislative",
                "Exekutive",
                "Judikative"
              ],
              "correct": 2,
              "explanation": "Die Judikative ist die rechtsprechende Gewalt. Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 13–16; Art. 3 und 49 BV"
            },
            {
              "id": "rang",
              "type": "order",
              "prompt": "Ordne das vereinfachte Rangschema von oben nach unten.",
              "items": [
                "Verfassung",
                "Gesetz",
                "Verordnung"
              ],
              "explanation": "Das Schema zeigt den Normenrang, nicht den Instanzenzug. Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 13–16; Art. 3 und 49 BV"
            },
            {
              "id": "kompetenz",
              "type": "multi",
              "prompt": "Welche Aussagen sind richtig?",
              "options": [
                "Die Bundeszuständigkeit braucht eine verfassungsrechtliche Grundlage.",
                "Kantonale Eigenständigkeit hebt Art. 49 BV auf.",
                "Eine Verfügung betrifft einen konkreten Einzelfall.",
                "Gewaltenteilung und Föderalismus sind unterschiedliche Einordnungen."
              ],
              "correct": [
                0,
                2,
                3
              ],
              "explanation": "Kompetenzen, Normenrang und Funktionen sind getrennte Prüfachsen. Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 13–16; Art. 3 und 49 BV"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Privatrecht und öffentliches Recht",
          "body": [
            {
              "compare": {
                "left": {
                  "title": "Privatrecht",
                  "points": [
                    "Ordnet private Rechtsbeziehungen",
                    "Vertragsfreiheit innerhalb gesetzlicher Grenzen",
                    "Etwa ein Streit über eine IT-Rechnung"
                  ]
                },
                "right": {
                  "title": "Öffentliches Recht",
                  "points": [
                    "Ordnet insbesondere staatliches Handeln und öffentliche Aufgaben",
                    "Gesetzliche Grundlage und Zuständigkeit sind zentral",
                    "Etwa eine hoheitliche Bewilligungsentscheidung"
                  ]
                }
              }
            },
            {
              "callout": {
                "tone": "tip",
                "title": "Nicht nur Personen oder Gesetzestitel zählen",
                "text": "Ein Gemeinwesen kann auch privatrechtlich handeln. Manche Gesetze enthalten verschiedene Regelungsbereiche. Die Folienliste ist eine Orientierung; die konkrete Rechtsbeziehung entscheidet."
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Eine Behörde verfügt eine Auflage; ein Lieferant fordert vertraglich eine Zahlung. Warum können verschiedene Verfahren nötig sein?",
                "answer": "Die erste Frage betrifft eine hoheitliche Entscheidung, die zweite einen privatrechtlichen Anspruch. Zuständigkeit und Rechtsmittel richten sich nach der jeweiligen Materie.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 17–18"
          ],
          "remember": "Vom konkreten Rechtsverhältnis zum passenden Rechtsweg."
        },
        {
          "type": "slide",
          "title": "Zwingend, vereinbart oder dispositiv?",
          "body": [
            {
              "table": {
                "head": [
                  "Begriff",
                  "Funktion"
                ],
                "rows": [
                  [
                    "Zwingendes Recht",
                    "Kann nicht im unzulässigen Umfang durch Parteivereinbarung verdrängt werden."
                  ],
                  [
                    "Vereinbartes Recht",
                    "Die Parteien gestalten ihre Beziehung innerhalb der gesetzlichen Grenzen."
                  ],
                  [
                    "Dispositives Recht",
                    "Füllt Regelungslücken, soweit keine wirksame andere Vereinbarung besteht."
                  ]
                ],
                "caption": "Vereinfachtes Prüfschema"
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Eine wirksame Vertragsklausel weicht von einer dispositiven Regel ab. Was prüfst du zuerst?",
                "answer": "Ob tatsächlich eine wirksame Vereinbarung vorliegt und ob die gesetzliche Regel abänderbar ist. Erst dann lässt sich sagen, welche Regel gilt.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 19"
          ],
          "remember": "Vertragsfreiheit wirkt innerhalb des zwingenden Rechts."
        },
        {
          "type": "slide",
          "title": "Treu und Glauben ist nicht die Gutglaubensvermutung",
          "body": [
            {
              "table": {
                "head": [
                  "Fundstelle",
                  "Worum es geht"
                ],
                "rows": [
                  [
                    "Art. 2 ZGB",
                    "Verhalten nach Treu und Glauben; kein Schutz offensichtlichen Rechtsmissbrauchs."
                  ],
                  [
                    "Art. 3 ZGB",
                    "Vermutung guten Glaubens, wo das Gesetz daran eine Rechtswirkung knüpft; erforderliche Aufmerksamkeit beachten."
                  ],
                  [
                    "Art. 4 ZGB",
                    "Gesetzlich eröffnetes richterliches Ermessen nach Recht und Billigkeit."
                  ],
                  [
                    "Art. 8 ZGB",
                    "Grundregel der Beweislast."
                  ]
                ],
                "caption": "Nachschlagehilfe statt Artikelnummern auswendig lernen"
              }
            },
            {
              "callout": {
                "tone": "warn",
                "title": "Korrigierter Verweis",
                "text": "Seite 19 verweist für die Vermutung guten Glaubens auf ZGB 2. Die passende Bestimmung ist Art. 3 ZGB. Art. 2 behandelt Treu und Glauben."
              }
            },
            "Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 19; Art. 2–4 und 8 ZGB"
          ],
          "remember": "Ähnliche Begriffe können verschiedene Regeln bezeichnen."
        },
        {
          "type": "slide",
          "title": "Internationale Projekte: Recht und Gericht trennen",
          "body": [
            "Ausländische Anbieter und internationale Datenflüsse werfen zusätzliche Fragen auf. Das IPRG ist eine zentrale Schnittstelle für internationale privatrechtliche Fälle; einschlägige Staatsverträge müssen ebenfalls beachtet werden.",
            {
              "table": {
                "head": [
                  "Prüffrage",
                  "Was sie klärt"
                ],
                "rows": [
                  [
                    "Welches Gericht ist zuständig?",
                    "Wo kann die Sache beurteilt werden?"
                  ],
                  [
                    "Welches Recht ist anwendbar?",
                    "Nach welchen materiellen Regeln wird sie beurteilt?"
                  ],
                  [
                    "Welche weiteren Anforderungen gelten?",
                    "Etwa besondere Regeln für Datenflüsse oder Leistungen."
                  ]
                ],
                "caption": "Eigene Strukturierung der Vorlesung"
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Ein Schweizer Unternehmen nutzt einen ausländischen Cloud-Dienst. Beweist der Sitz des Kunden allein, dass ausschliesslich Schweizer Regeln gelten?",
                "answer": "Nein. Zuständigkeit, anwendbares Recht und weitere Anforderungen müssen anhand der konkreten Beziehung, Vereinbarungen und einschlägigen Regeln geprüft werden.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 20"
          ],
          "remember": "Gerichtsstand und anwendbares Recht sind nicht dasselbe."
        },
        {
          "type": "checkpoint",
          "id": "cp-regeln",
          "title": "Checkpoint: Die passende Regel finden",
          "questions": [
            {
              "id": "dispositiv",
              "type": "type",
              "prompt": "Wie heisst Recht, das grundsätzlich durch eine wirksame Parteivereinbarung ersetzt werden kann?",
              "accept": [
                "dispositiv",
                "dispositives Recht",
                "nachgiebiges Recht"
              ],
              "explanation": "Dispositives Recht füllt Lücken; zwingende Grenzen bleiben bestehen. Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 17–20; Art. 2–4 ZGB"
            },
            {
              "id": "guter-glaube",
              "type": "single",
              "prompt": "Welche Nachschlagestelle gehört zur Vermutung guten Glaubens?",
              "options": [
                "Art. 2 ZGB",
                "Art. 3 ZGB",
                "Art. 8 ZGB"
              ],
              "correct": 1,
              "explanation": "Der Verweis auf Seite 19 wird ausdrücklich berichtigt: Art. 3 ZGB. Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 17–20; Art. 2–4 ZGB"
            },
            {
              "id": "international",
              "type": "multi",
              "prompt": "Welche Fragen musst du bei einem internationalen Vertragsfall auseinanderhalten?",
              "options": [
                "Zuständiges Gericht",
                "Anwendbares Recht",
                "Einschlägige Staatsverträge",
                "Nur die Sprache der Website"
              ],
              "correct": [
                0,
                1,
                2
              ],
              "explanation": "Die Sprache einer Website beantwortet diese Rechtsfragen nicht. Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 17–20; Art. 2–4 ZGB"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Drei Verfahrensarten, verschiedene Aufgaben",
          "body": [
            {
              "table": {
                "head": [
                  "Verfahren",
                  "Eigener Ausgangsfall",
                  "Kernfrage"
                ],
                "rows": [
                  [
                    "Zivilverfahren",
                    "Streit um eine vertragliche Zahlung",
                    "Besteht der geltend gemachte Anspruch?"
                  ],
                  [
                    "Strafverfahren",
                    "Verdacht auf eine strafbare Handlung",
                    "Sind Straftat und Verantwortlichkeit nachgewiesen?"
                  ],
                  [
                    "Verwaltungsverfahren",
                    "Anfechtung einer hoheitlichen Verfügung",
                    "Ist die Entscheidung rechtmässig?"
                  ]
                ],
                "caption": "Dasselbe technische Ereignis kann mehrere Verfahren auslösen."
              }
            },
            {
              "callout": {
                "tone": "warn",
                "title": "Instanzenzug ist kein Universalrezept",
                "text": "Seite 21 zeigt vereinfacht drei Instanzen. Nicht jeder Fall durchläuft genau Bezirks-, Kantons- und Bundesgericht. Zuständigkeit, zulässiges Rechtsmittel und Zugangsvoraussetzungen müssen konkret geprüft werden."
              }
            },
            "Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 18, 21–24"
          ],
          "remember": "Ein Recht kennen und es durchsetzen können sind verschiedene Fähigkeiten."
        },
        {
          "type": "slide",
          "title": "Zivilprozess: Anspruch, Beweis und Kosten",
          "body": [
            "Typischer Ausgangspunkt ist das sachlich und örtlich zuständige Gericht; häufig geht eine Schlichtung voraus. Parteien müssen im Regelfall ihre Tatsachen vortragen und Beweismittel anbieten. Gesetzliche Ausnahmen bleiben vorbehalten.",
            {
              "cards": [
                {
                  "title": "Prozessvorbereitung",
                  "text": "Anspruch, Unterlagen und Zuständigkeit ordnen."
                },
                {
                  "title": "Kosten",
                  "text": "Vorschuss, Kostenrisiko und mögliche unentgeltliche Rechtspflege prüfen."
                },
                {
                  "title": "Durchsetzung",
                  "text": "Ein Forderungsurteil ist noch kein Zahlungseingang."
                }
              ]
            },
            {
              "callout": {
                "tone": "tip",
                "title": "Folienaussagen mit Grenzen lesen",
                "text": "„Ohne Zahlung kein Prozess“ und „das Gericht sucht keine Beweise“ beschreiben keine ausnahmslosen Regeln. Unentgeltliche Rechtspflege und besondere Verfahrensregeln sind gesondert zu prüfen."
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Du gewinnst einen Forderungsprozess, die Gegenpartei bezahlt aber nicht. Was fehlt noch?",
                "answer": "Gegebenenfalls die Vollstreckung. Das Urteil klärt den Anspruch, bewirkt aber nicht automatisch den Geldtransfer.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 22; Art. 8 ZGB; Art. 55, 98, 106 und 117 ZPO"
          ],
          "remember": "Vor dem Prozess Zuständigkeit, Beweise, Kosten und Vollstreckung mitdenken."
        },
        {
          "type": "slide",
          "title": "Eigener Mini-Fall: fehlende zugesagte Funktion",
          "body": [
            {
              "reveal": {
                "question": "Ein Kunde behauptet, eine Exportfunktion sei zugesagt worden. Der Anbieter bestreitet das. Formuliere einen sinnvollen nächsten Prüfschritt.",
                "answer": "Zunächst den konkreten Anspruch und seine Grundlage bestimmen. Dann Vereinbarungen, Spezifikationen und Kommunikation zur zugesagten Funktion prüfen. Technische Tests belegen, was die Software kann; sie beweisen allein noch nicht, was vertraglich versprochen wurde.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "compare": {
                "left": {
                  "title": "Technischer Nachweis",
                  "points": [
                    "Welche Funktion ist implementiert?",
                    "Welcher Fehler lässt sich reproduzieren?"
                  ]
                },
                "right": {
                  "title": "Vertraglicher Nachweis",
                  "points": [
                    "Welche Funktion war geschuldet?",
                    "Welche Qualität und Termine wurden vereinbart?"
                  ]
                }
              }
            },
            "Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 11–12, 19, 22"
          ],
          "remember": "Ist-Zustand und geschuldeter Soll-Zustand benötigen unterschiedliche Belege."
        },
        {
          "type": "checkpoint",
          "id": "cp-zivil",
          "title": "Checkpoint: Einen Anspruch durchsetzen",
          "questions": [
            {
              "id": "urteil",
              "type": "single",
              "prompt": "Ein rechtskräftiges Forderungsurteil liegt vor. Was folgt daraus nicht automatisch?",
              "options": [
                "Der Streit wurde rechtlich beurteilt.",
                "Das Geld ist bereits bezahlt.",
                "Die Vollstreckung kann noch nötig sein."
              ],
              "correct": 1,
              "explanation": "Recht bekommen und Geld erhalten sind verschiedene Schritte. Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 11–12, 21–22; Art. 8 ZGB"
            },
            {
              "id": "vorbereitung",
              "type": "multi",
              "prompt": "Was gehört zur Vorbereitung eines zivilrechtlichen IT-Streits?",
              "options": [
                "Zuständigkeit klären",
                "Anspruch und Beweise ordnen",
                "Kosten und Vollstreckbarkeit mitdenken",
                "Jeden Verfahrensweg als identisch behandeln"
              ],
              "correct": [
                0,
                1,
                2
              ],
              "explanation": "Die Prozessart und der konkrete Anspruch bestimmen die weiteren Schritte. Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 11–12, 21–22; Art. 8 ZGB"
            },
            {
              "id": "soll",
              "type": "single",
              "prompt": "Was zeigt ein erfolgreicher technischer Test allein noch nicht?",
              "options": [
                "Dass die getestete Funktion in diesem Test funktioniert hat.",
                "Dass genau diese Funktion vertraglich geschuldet war.",
                "Dass ein Test durchgeführt wurde."
              ],
              "correct": 1,
              "explanation": "Der technische Ist-Zustand ersetzt nicht die Ermittlung des vereinbarten Soll-Zustands. Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 11–12, 21–22; Art. 8 ZGB"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Strafverfahren: Untersuchung und Beteiligung",
          "body": [
            "Die Staatsanwaltschaft untersucht belastende und entlastende Umstände. Je nach Ergebnis folgen etwa Einstellung, ein Strafbefehl unter gesetzlichen Voraussetzungen oder eine Anklage vor Gericht.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Verdacht und Untersuchung",
                    "text": "Sachverhalt und Beweise klären"
                  },
                  {
                    "title": "Verfahrensentscheidung",
                    "text": "Einstellung, Strafbefehl oder Anklage prüfen"
                  },
                  {
                    "title": "Rechtsschutz",
                    "text": "Beteiligungsrechte und mögliche Rechtsmittel beachten"
                  }
                ]
              }
            },
            "Die Folie nennt für Antragsdelikte drei Monate. Prüfe zusätzlich den gesetzlichen Fristbeginn und wer antragsberechtigt ist. Strafanzeige, Strafantrag und die Erklärung als Privatklägerschaft sind unterschiedliche Dinge.",
            {
              "callout": {
                "tone": "tip",
                "title": "Grenzen der Übersicht",
                "text": "Die Folie verkürzt Beteiligungsrechte und Strafbefehlsgrenzen. Für einen konkreten Fall sind die aktuellen Voraussetzungen in der StPO massgebend; die Zahlen sind hier kein Auswendiglernziel."
              }
            },
            "Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 23; Art. 31 StGB; Art. 6, 118 und 352 StPO"
          ],
          "remember": "Strafrechtliche Untersuchung ist nicht dasselbe wie die Durchsetzung einer Vertragsrechnung."
        },
        {
          "type": "slide",
          "title": "Verwaltungsverfahren: Verfügung sorgfältig prüfen",
          "body": [
            "Prüfe die zuständige Behörde, das Verfahren, die Begründung, das Rechtsmittel und seine Frist. Die auf der Folie genannten 10/20/30 Tage sind keine frei wählbaren Alternativen.",
            {
              "callout": {
                "tone": "warn",
                "title": "Wichtige Präzisierung",
                "text": "Nicht jeder Fehler macht eine Verfügung nichtig. Fehlerhafte Verfügungen sind grundsätzlich anfechtbar; Nichtigkeit ist eine Ausnahme für besonders schwere, erkennbare Mängel unter weiteren Voraussetzungen. Eine fehlende Rechtsmittelbelehrung rechtfertigt nicht einfach Untätigkeit."
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Eine Verfügung enthält keine Rechtsmittelbelehrung. Darfst du sie deshalb ignorieren?",
                "answer": "Nein. Der Mangel ist zu prüfen; man muss sich rechtzeitig um den passenden Rechtsweg kümmern. Die pauschale Nichtigkeitsformulierung auf Seite 24 ist zu weit.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Auch neue Tatsachen eröffnen nicht pauschal jederzeit jede Einsprache. Wiedererwägung, Revision und ordentliche Rechtsmittel haben unterschiedliche Voraussetzungen.",
            "Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 24; BGer 2C_373/2022, E. 2.4 und 3.1"
          ],
          "remember": "Rechtsmittel und Frist anhand der konkreten Grundlage prüfen."
        },
        {
          "type": "slide",
          "title": "Transfer: Ein Ausfall, mehrere Rechtsfragen",
          "body": [
            {
              "reveal": {
                "question": "Eigener Fall: Ein Cloud-Ausfall verhindert eine vertraglich zugesagte Leistung. Zugleich bestehen Hinweise auf einen Angriff und eine behördliche Auflage. Welche Spuren trennst du?",
                "answer": "Vertragliche Ansprüche zwischen den Parteien, einen möglichen strafrechtlichen Verdacht und die verwaltungsrechtliche Auflage. Für jede Spur klärst du Beteiligte, Grundlage, Beweise und Verfahren. Der technische Ausfall allein beantwortet keine dieser Rechtsfragen abschliessend.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "reveal": {
                "question": "Ein Team schreibt: „Sicherheitsstandard erfüllt, daher keine Haftung.“ Wie verbesserst du die Begründung?",
                "answer": "Den Schluss nicht pauschal ziehen. Zuerst klären, welche Verpflichtung und welcher Anspruch gemeint sind, welche Tatsachen nachweisbar sind und welche rechtlichen Voraussetzungen gelten. Der Standard ist ein möglicher Baustein.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 7–12, 17–24"
          ],
          "remember": "Aus einem technischen Vorfall können verschiedene, getrennt zu prüfende Rechtsfolgen entstehen."
        },
        {
          "type": "slide",
          "title": "Open-Book-Navigation und Selbstcheck",
          "body": [
            {
              "table": {
                "head": [
                  "Gesuchte Frage",
                  "Schneller Einstieg"
                ],
                "rows": [
                  [
                    "Anspruch und Begründung",
                    "Handout 11–12"
                  ],
                  [
                    "Kompetenz und Normenrang",
                    "Handout 13–16; BV 3 und 49"
                  ],
                  [
                    "Rechtsbegriffe und Beweislast",
                    "Handout 19; ZGB 2–4 und 8"
                  ],
                  [
                    "Internationaler Bezug",
                    "Handout 20; IPRG und Staatsverträge"
                  ],
                  [
                    "Verfahrensart und Durchsetzung",
                    "Handout 21–24; konkrete Prozessordnung"
                  ]
                ],
                "caption": "Prüfstrategie: Fundstelle suchen, Voraussetzungen lesen, Fall anwenden."
              }
            },
            {
              "checklist": {
                "title": "Kann ich das erklären und anwenden?",
                "items": [
                  "Ich formuliere Wer – von wem – was – woraus.",
                  "Ich trenne Behauptung, Beweis und Rechtsgrundlage.",
                  "Ich unterscheide Funktion, Staatsebene und Normenrang.",
                  "Ich erkenne die passende Verfahrensart.",
                  "Ich erkenne die markierten Vereinfachungen und weiss, wo ich nachprüfe."
                ]
              }
            },
            "Zusatzwissen: Die organisatorischen Angaben und technischen Beispiele ordnen den Kurs ein. Die Gewichtung ist eine didaktische Einschätzung aus den Lernzielen, keine Zusage konkreter Prüfungsfragen.",
            "Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 3, 11–25"
          ],
          "remember": "Erst einordnen, dann gezielt nachschlagen und begründen."
        },
        {
          "type": "checkpoint",
          "id": "cp-verfahren",
          "title": "Checkpoint: Verfahren und Transfer",
          "questions": [
            {
              "id": "untersuchung",
              "type": "multi",
              "prompt": "Welche Umstände muss eine Strafuntersuchung berücksichtigen?",
              "options": [
                "Belastende Umstände",
                "Entlastende Umstände",
                "Nur die Behauptung der anzeigenden Person"
              ],
              "correct": [
                0,
                1
              ],
              "explanation": "Die Untersuchung ist nicht einseitig auf Belastung ausgerichtet. Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 21–24; BGer 2C_373/2022"
            },
            {
              "id": "verfuegung",
              "type": "single",
              "prompt": "Eine Verfügung hat einen formellen Mangel. Welche Aussage ist am besten begründet?",
              "options": [
                "Jeder Mangel bedeutet automatisch Nichtigkeit.",
                "Mangel und Rechtsmittel konkret prüfen; Nichtigkeit ist eine Ausnahme.",
                "Formelle Fehler sind immer bedeutungslos."
              ],
              "correct": 1,
              "explanation": "Die pauschale Folienformulierung wird anhand der Bundesgerichtspraxis präzisiert. Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 21–24; BGer 2C_373/2022"
            },
            {
              "id": "fristen",
              "type": "single",
              "prompt": "Was bedeuten die auf Seite 24 genannten Fristen 10/20/30 Tage?",
              "options": [
                "Man darf die längste auswählen.",
                "Die konkrete Frist hängt von der einschlägigen Regelung ab.",
                "Jede Beschwerde hat genau dieselbe Frist."
              ],
              "correct": 1,
              "explanation": "Fristen sind anhand der Rechtsgrundlage und des konkreten Entscheids zu bestimmen. Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 21–24; BGer 2C_373/2022"
            },
            {
              "id": "einzelfall",
              "type": "type",
              "prompt": "Wie heisst die hoheitliche Entscheidung in einem konkreten Einzelfall: Verordnung oder Verfügung?",
              "accept": [
                "Verfügung",
                "eine Verfügung",
                "Verfuegung"
              ],
              "explanation": "Die Verfügung ist von generell-abstrakten Verordnungen zu unterscheiden. Quelle: Handout Einführung Informatikrecht.pdf, PDF-Seiten 21–24; BGer 2C_373/2022"
            }
          ]
        }
      ]
    },
    {
      id: "w2",
      number: 2,
      title: "IT-Verträge und Projektfallen",
      status: "ready",
      items: [

        /* ================= Orientierung ================= */
        {
          type: "slide",
          title: "Folie 2 — Was du nach dieser Vorlesung können musst",
          body: [
            "Der Dozent nennt auf Folie 2 drei Lernziele. Sie sind der Massstab für alles, was folgt:",
            { callout: { tone: "exam", title: "Die drei Lernziele im Wortlaut", text: [
              "**1.** In IT-Projekten erkennen, ob es sich im Wesentlichen um einen **Werkvertrag**, ein **Auftragsverhältnis**, einen **Kauf**, **Miete**, **Arbeitsvertrag** oder um eine **Kombination** davon handelt.",
              "**2.** Die wichtigsten juristischen **Fallstricke** in Projekten kennen.",
              "**3.** Wesentliche Regelungen des **Arbeitsvertrages** kennen."
            ] } },
            "Lernziel 1 ist das Rückgrat dieser Lektion: Vertragstyp einordnen und daraus passende Rechtsfolgen ableiten. Das ist eine didaktische Gewichtung, keine Zusage konkreter Prüfungsfragen. Das Handout gehört zu den Moodle-Sitzungen IT-Verträge (1) und (2); beide werden hier gemeinsam behandelt.",
            { flow: { steps: [
              { title: "Wie entsteht ein Vertrag?", text: "Offerte, Akzept, Vertragsfreiheit" },
              { title: "Welcher Typ ist es?", text: "Nominat, gemischt, Innominat" },
              { title: "Was gilt dann?", text: "Werkvertrag, Auftrag, Arbeitsvertrag" },
              { title: "Was, wenn es schiefgeht?", text: "Verzug, Schlechterfüllung, Konflikt" }
            ] } },
            { callout: { tone: "tip", title: "Open Book heisst nicht ohne Vorbereitung", text: "Die Prüfung ist Open Book. Entscheidend ist nicht, ob du Artikelnummern auswendig kannst, sondern ob du den Sachverhalt schnell einordnest und weisst, wo du nachschlägst. Am Ende dieser Lektion findest du dafür einen OR-Spickzettel." } }
          ],
          remember: "Drei Lernziele: Vertragstyp erkennen, Fallstricke kennen, Arbeitsvertrag kennen. Alles hängt am Erkennen des Vertragstyps."
        },

        /* ================= Folien 3–4 ================= */
        {
          type: "slide",
          title: "Folien 3–4 — Worum es bei Verträgen wirklich geht",
          body: [
            "Die erste inhaltliche Folie ist eine Haltungsfrage, keine Paragrafenfrage. Beim Vertrag geht es um die **Klärung, was die Parteien wirklich wollen und wie die Leistung erbracht werden soll**. Und dann folgt der Satz, den du dir merken solltest:",
            { callout: { tone: "def", title: "Der Kernsatz von Folie 3", text: "Dieser Prozess ist wichtiger als das daraus entstandene Papier. Denn alles, was am Anfang nicht verhandelt wird, wird zu einem späteren Zeitpunkt wieder verhandelt, dann aber unter anderen Rahmenbedingungen." } },
            "Die weiteren Funktionen eines Vertrags gemäss Folie 3: **Beweisbarkeit** von Abschluss und Inhalt, **voraussehbare einheitliche Regeln** zur Lückenfüllung und Durchsetzung (Compliance), **Schutz vor Übervorteilung** und **Schutz des fairen Wettbewerbs**. Über allem steht der Grundsatz der **Vertragsfreiheit** in Form und Inhalt.",
            { callout: { tone: "warn", title: "Zwei Punkte, die man leicht überliest", text: [
              "Für die **Auslegung** gilt auch, was die Parteien tatsächlich gelebt haben, unter Umständen sogar das, was vor der Vertragsunterzeichnung besprochen oder zugesichert wurde. Der unterschriebene Text ist also nicht die ganze Wahrheit.",
              "Vertragsfreiheit heisst, dass auch ein mündlicher Vertrag gilt. Die Folie schiebt aber sofort nach: In der Praxis ist nur ein schriftlicher Vertrag ein guter Vertrag, auch wenn in der IT viele Aufträge mündlich vereinbart werden."
            ] } },
            "Folie 4 erklärt, warum das heute schwieriger ist als früher. Rechtsgeschäfte zwischen weltweit verteilten, sich nicht kennenden Parteien schaffen neue Probleme:",
            { cards: [
              { title: "Dauerverträge statt Einmalkauf", text: "Cloud-Services. Was, wenn kein Zugang mehr, kein Support, wichtige Daten unerreichbar? (SaaS)", tone: "warn" },
              { title: "Lange Abhängigkeit", text: "Bei IT-Verträgen macht sich der Kunde für sehr lange Zeit vom Lieferanten abhängig (Support, Maintenance)." },
              { title: "Erfüllung und Durchsetzung", text: "Herausfordernde Fragen zu Haftung, Erfüllungsort und Gerichtsstand." },
              { title: "Datenschutzrecht", text: "Welches Recht ist bei verteilten Parteien überhaupt anwendbar?" },
              { title: "Iterative Entwicklung", text: "Braucht einen klaren, auch rechtlichen Rahmen." },
              { title: "Automatisierte Systeme", text: "Just-in-time, Börsenhandel, über API angebundene Systeme: hohes Schadenspotential bei Ausfällen." }
            ] },
            { reveal: {
              question: "Die Folie endet mit einer rhetorischen Frage: Sollen auf alle rechtlichen und technischen Fragen weltweit gültige Gesetze eine klare Antwort geben? Was antwortet der Dozent, und was folgt daraus?",
              label: "Antwort aufdecken",
              answer: [
                "Die Folie antwortet mit einem klaren **„NOPE!\"**.",
                "Die Lösung sind **individuelle Vereinbarungen**. Genau das ist die Brücke zum Rest der Vorlesung: Weil das Gesetz die modernen IT-Konstellationen nicht abdeckt, müssen Verträge selbst zusammengesetzt werden, und deshalb musst du wissen, aus welchen Bausteinen."
              ]
            } }
          ],
          remember: "Der Verhandlungsprozess ist wichtiger als das Papier. Gelebte Praxis zählt bei der Auslegung mit. Für moderne IT-Konstellationen gibt es keine passenden Gesetze, Lösung sind individuelle Vereinbarungen."
        },

        /* ================= Folie 10 ================= */
        {
          type: "slide",
          title: "Folie 10 — Offerte und Vertragsschluss",
          body: [
            { callout: { tone: "def", title: "Art. 1 OR", text: "Ein Vertrag kommt **nur** durch gegenseitige, übereinstimmende Willensäusserung zustande. Diese kann ausdrücklich oder stillschweigend erfolgen." } },
            { table: {
              caption: "Die drei Begriffe von Folie 10",
              head: ["Begriff", "Bedeutung"],
              rows: [
                ["Offerte", "Verbindlicher Antrag, den Vertrag unter bestimmten Bedingungen (Preis, Menge usw.) abschliessen zu wollen"],
                ["Akzept", "Annahme der Offerte"],
                ["Willensäusserung", "Schriftlich, mündlich oder konkludentes Verhalten"]
              ]
            } },
            { callout: { tone: "warn", title: "Offerte oder Einladung?", text: "Folie 10 fordert die Abgrenzung zwischen verbindlicher Offerte und Einladung zur Offertstellung (Art. 1 und 7 OR). Präzisierung: Bei einem Webshop kann die Produktdarstellung eine Einladung sein; die Bestellung des Kunden kann dann die Offerte darstellen. Massgebend sind konkrete Erklärungen und einbezogene AGB." } },
            { reveal: {
              question: "Du klickst im Webshop auf „Kostenpflichtig bestellen\" und bekommst eine Bestätigungsmail. Ist der Vertrag damit geschlossen?",
              label: "Analyse aufdecken",
              answer: [
                "Nicht automatisch. Nach der Folie ist der Bestellvorgang beim Online-Handel **regelmässig nur eine Einladung zur Offertstellung**. Deine Bestellung ist dann die Offerte, und der Händler nimmt sie erst mit seiner Annahme an.",
                "Ob eine automatische Bestätigungsmail schon die Annahme ist oder nur eine Eingangsbestätigung, steht in den **AGB**. Genau deshalb verweist die Folie auf ein konkretes AGB-Beispiel.",
                "Prüfungstechnisch: Erst Art. 1 OR anwenden (übereinstimmende Willensäusserung?), dann Art. 7 OR prüfen (war die Darstellung überhaupt eine verbindliche Offerte?), dann in die AGB schauen."
              ]
            } }
          ],
          remember: "Art. 1 OR: Vertrag nur durch gegenseitige übereinstimmende Willensäusserung. Offerte = verbindlicher Antrag, Akzept = Annahme. Art. 7 OR: Online-Bestellvorgang ist regelmässig nur eine Einladung zur Offertstellung."
        },

        /* ================= Folien 11–12 ================= */
        {
          type: "slide",
          title: "Folien 11–12 — Die Einteilung der Verträge, dein wichtigstes Nachschlagewerk",
          body: [
            "Jetzt kommt das Gerüst für Lernziel 1. Folie 11 teilt alle Verträge in drei Klassen ein:",
            { cards: [
              { title: "Nominatverträge", text: "Gesetzlich geregelte Vertragsformen mit zwingenden oder dispositiven Bestimmungen. Klare Regelung." },
              { title: "Gemischte Verträge", text: "Zusammengesetzt aus Nominatverträgen. Aus dem Gesetz wird das passende genommen, oder später angewendet." },
              { title: "Innominatverträge", text: "Gesetzlich NICHT geregelte Vertragsformen. Die Vertragsfreiheit ermöglicht neue, innovative Inhalte und Formen der Zusammenarbeit." }
            ] },
            "Folie 12 ordnet die IT-Welt in dieses Raster ein. Diese Tabelle ist für die Open-Book-Prüfung dein wichtigstes Werkzeug:",
            { table: {
              caption: "Verträge im Informatikkontext, nach Folie 12",
              head: ["Klasse", "Vertrag", "Typisches IT-Beispiel"],
              rows: [
                ["Nominat", "Kaufvertrag", "Standardsoftware, Infrastruktur"],
                ["Nominat", "Auftrag", "Consulting, Installation, Entwicklung, Projektmanagement, SLA"],
                ["Nominat", "Werkvertrag", "Kundenspezifische Software, Softwareerweiterung, Infrastruktur"],
                ["Nominat", "Miete", "Hardware"],
                ["Nominat", "Arbeitsvertrag", "Anstellung von Entwicklern"],
                ["Gemischt", "Zusammengesetzte Verträge", "Hosting, Entwicklung, Projektvertrag, Lizenzierung"],
                ["Innominat", "Leasing", "–"],
                ["Innominat", "Lizenzvertrag", "–"],
                ["Innominat", "Factoring-Vertrag", "–"],
                ["Innominat", "Escrow-Agreement", "Hinterlegung des Source-Codes"],
                ["Innominat", "Software-Entwicklungsvertrag", "–"],
                ["Innominat", "Service Level Agreement (SLA)", "–"],
                ["Innominat", "NDA / NSA", "Non Disclosure, Non Solicitation"]
              ],
              marks: { "1,1": "focus", "2,1": "focus", "5,1": "focus" },
              note: "Blau hervorgehoben die für unsere Fallübungen zentralen Vertragstypen."
            } },
            { callout: { tone: "warn", title: "Aufpassen bei Auftrag und SLA", text: "Die Folie nennt **SLA** sowohl beim Auftrag als auch bei den Innominatverträgen. Ein SLA ist kein eigener gesetzlich geregelter Vertragstyp. Welche Regeln passen, hängt von den konkret versprochenen Leistungen ab; ein SLA ist nicht automatisch ein Auftrag." } },
            { reveal: {
              question: "Ein Kunde kauft 50 Lizenzen einer Standardsoftware, lässt sie von einem externen Berater installieren und schliesst dazu ein SLA für den Betrieb ab. Wie viele und welche Vertragstypen liegen vor?",
              label: "Zuordnung aufdecken",
              answer: [
                "Drei verschiedene Leistungen, drei verschiedene Einordnungen nach Folie 12:",
                "**Lizenzen für Standardsoftware** → Kaufvertrag (Nominat), je nach Ausgestaltung kombiniert mit einem Lizenzvertrag (Innominat).",
                "**Installation durch den Berater** → Auftrag (Nominat), weil eine Dienstleistung und kein abgegrenztes Werk geschuldet ist.",
                "**SLA für den Betrieb** → Innominatvertrag, inhaltlich nach Auftragsrecht.",
                "Zusammen ergibt das in der Praxis einen **gemischten Vertrag**. Genau deshalb steht auf Folie 11 die mittlere Kategorie: Aus dem Gesetz wird für jeden Teil das Passende genommen."
              ]
            } }
          ],
          remember: "Drei Klassen: Nominat (im Gesetz geregelt), gemischt (zusammengesetzt), Innominat (nicht geregelt). Kauf, Auftrag, Werkvertrag, Miete und Arbeitsvertrag sind Nominat. SLA, NDA, Lizenz, Escrow und Leasing sind Innominat."
        },
        {
          type: "checkpoint",
          id: "cp-arten",
          title: "Checkpoint: Vertragsschluss und Vertragsarten",
          questions: [
            {
              id: "art1",
              type: "type",
              prompt: "Welcher OR-Artikel sagt, dass ein Vertrag nur durch gegenseitige, übereinstimmende Willensäusserung zustande kommt? (nur die Zahl)",
              accept: ["1", "Art. 1", "Art 1", "OR 1", "Art. 1 OR"],
              placeholder: "Zahl",
              explanation: "Art. 1 OR. Die Willensäusserung kann ausdrücklich oder stillschweigend erfolgen. Quelle: IT-Verträge, PDF-Seite 10."
            },
            {
              id: "webshop",
              type: "single",
              prompt: "Die Produktdarstellung eines Webshops ist laut wirksam einbezogenen AGB unverbindlich. Welche Einordnung passt dazu?",
              options: [
                "… nur eine Einladung zur Offertstellung (Art. 7 OR)",
                "… eine verbindliche Offerte des Händlers",
                "… bereits der Vertragsschluss",
                "… rechtlich unverbindlich, weil online geschlossene Verträge Schriftform brauchen"
              ],
              correct: 0,
              explanation: "Deshalb muss man in die AGB schauen, um zu wissen, wann der Vertrag tatsächlich zustande kommt. Quelle: IT-Verträge, PDF-Seite 10."
            },
            {
              id: "klassen",
              type: "multi",
              prompt: "Welche dieser Verträge sind gemäss Folie 12 **Innominatverträge**, also gesetzlich nicht geregelt?",
              options: [
                "Service Level Agreement (SLA)",
                "Escrow-Agreement",
                "Non Disclosure Agreement (NDA)",
                "Werkvertrag",
                "Miete",
                "Lizenzvertrag"
              ],
              correct: [0, 1, 2, 5],
              explanation: "Werkvertrag und Miete sind Nominatverträge, also im OR geregelt. Die übrigen vier stehen auf der Folie unter Innominatverträge. Quelle: IT-Verträge, PDF-Seite 12."
            },
            {
              id: "gemischt",
              type: "single",
              prompt: "Was kennzeichnet einen gemischten Vertrag?",
              options: [
                "Er ist aus Nominatverträgen zusammengesetzt, und aus dem Gesetz wird für jeden Teil das Passende genommen",
                "Er mischt Schweizer und ausländisches Recht",
                "Er ist mündlich und schriftlich zugleich geschlossen",
                "Er gilt nur, wenn alle Teile im Gesetz geregelt sind"
              ],
              correct: 0,
              explanation: "Hosting, Entwicklung, Projektverträge und Lizenzierung sind die Beispiele der Folie. Quelle: IT-Verträge, PDF-Seite 12."
            }
          ]
        },

        /* ================= Folien 17–18 ================= */
        {
          type: "slide",
          title: "Folie 17 — Werkvertrag (Art. 363 ff OR)",
          body: [
            { callout: { tone: "def", title: "Werkvertrag, Art. 363 ff OR", text: "Der Unternehmer verpflichtet sich zur **Erstellung eines Werkes** gegen Entgelt. Geschuldet ist also ein **Resultat**." } },
            { table: {
              caption: "Die drei Punkte, die Folie 17 hervorhebt",
              head: ["Thema", "Was gilt", "Worauf achten"],
              rows: [
                ["Bestimmung des Preises", "Fixpreis, nach Aufwand oder Kostendach", "Was passiert bei Überschreitung des vereinbarten Preises?"],
                ["Gewährleistungspflichten", "Abnahmeverfahren des Werkes in vereinbarter Qualität am Schluss", "Werkvertragliche Mängelrechte nach Art. 367–371 OR gesondert prüfen"],
                ["Rücktritt und Schadenersatz", "Der Besteller hat ein Rücktrittsrecht während der Realisierungsphase (Art. 377 OR)", "Das könnte sehr teuer werden"]
              ],
              marks: { "2,1": "bad", "2,2": "bad" }
            } },
            { callout: { tone: "warn", title: "Art. 377 OR, die teuerste Falle der Vorlesung", text: "Die Folie markiert diesen Punkt ausdrücklich mit „ACHTUNG\" und doppeltem Ausrufezeichen. Und sie hängt einen Satz an, der direkt auf agile Projekte zielt: **Wer bei iterativen Projekten eine Gesamtsumme vereinbart, ist selber schuld.**" } },
            { reveal: {
              question: "Warum ist eine vereinbarte Gesamtsumme bei einem iterativen Projekt aus Sicht dieser Folie ein Problem?",
              label: "Begründung aufdecken",
              answer: [
                "Weil ein iteratives Projekt seinen Umfang unterwegs festlegt, eine Gesamtsumme aber so tut, als stünde das Werk von Anfang an fest. Damit trägt eine Seite das volle Risiko für etwas, das noch gar nicht definiert ist.",
                "Dazu kommt Art. 377 OR: Der Besteller kann während der Realisierungsphase zurücktreten. Die Folie warnt, dass das sehr teuer werden kann. Wer also eine Gesamtsumme zusagt, kombiniert ein offenes Leistungsziel mit einem festen Preis und einem Rücktrittsrisiko.",
                "Die Konsequenz zieht die Vorlesung auf den Folien 5 und 6: Für agile Projekte braucht es einen individuell zusammengesetzten Vertrag statt eines klassischen Werkvertrags mit Gesamtpreis."
              ]
            } }
          ],
          remember: "Werkvertrag Art. 363 ff OR: Resultat geschuldet. Preis als Fixpreis, nach Aufwand oder Kostendach. Abnahme am Schluss. Art. 377 OR Rücktritt des Bestellers kann teuer werden."
        },
        {
          type: "slide",
          title: "Folie 18 — Auftrag (Art. 394 ff OR) und der Vergleich zum Werkvertrag",
          body: [
            { callout: { tone: "def", title: "Auftragsverhältnis, Art. 394 ff OR", text: "Tätig werden im Interesse des Auftraggebers. **Es ist kein Resultat geschuldet.**" } },
            "Die vier Punkte von Folie 18:",
            { list: [
              "**Präzisierung zu Folie 18:** Soweit Art. 404 OR anwendbar ist, ist das jederzeitige Beendigungsrecht nach der Bundesgerichtspraxis zwingend. Auch die Bezeichnung als atypischer Auftrag oder eine Kündigungsfrist beseitigt es nicht automatisch. Bei gemischten Verträgen ist die passende Beendigungsordnung zu prüfen (BGE 115 II 464, E. 2).",
              "**Rechenschaftspflicht** des Auftragnehmers: Er muss dem Auftraggeber detailliert aufzeigen, was er wann im Rahmen des Auftrags unternommen hat.",
              "**Haftung** für das Handeln im Interesse des Auftraggebers, aber keine Haftung für den Eintritt eines bestimmten Erfolges.",
              "Bei **enger Einbindung externer Entwickler** in das Entwicklungsteam ist die Qualifikation als Auftrag sinnvoll."
            ] },
            "Dieser Vergleich ist der Kern von Lernziel 1. Wenn du ihn sitzen hast, löst du die meisten Fälle:",
            { compare: {
              left: { title: "Werkvertrag (Art. 363 ff)", points: [
                "**Resultat** geschuldet: das Werk",
                "Abnahmeverfahren am Schluss, Gewährleistung",
                "Preis: Fixpreis, Aufwand oder Kostendach",
                "Rücktritt des Bestellers nach Art. 377 OR, potenziell teuer",
                "Typisch: kundenspezifische Software, Softwareerweiterung"
              ] },
              right: { title: "Auftrag (Art. 394 ff)", points: [
                "**Kein Resultat** geschuldet, nur sorgfältiges Tätigwerden",
                "Rechenschaftspflicht über das, was wann getan wurde",
                "Haftung fürs Handeln, nicht für den Erfolg",
                "Art. 404 OR: zwingende jederzeitige Beendigung, soweit anwendbar; Schadenersatz bei Unzeit prüfen",
                "Typisch: Consulting, Installation, Projektmanagement, SLA"
              ] },
              verdict: "Die eine Frage, die entscheidet: Ist ein abgrenzbares Resultat geschuldet, oder sorgfältiges Tätigwerden?"
            } },
            { reveal: {
              question: "Ein Support-Vertrag läuft seit drei Jahren, mit einer vereinbarten Kündigungsfrist von sechs Monaten. Der Kunde beruft sich auf Art. 404 OR und will sofort aussteigen. Geht das?",
              label: "Auflösung",
              answer: [
                "Eine pauschale Antwort allein anhand der sechsmonatigen Frist ist nicht tragfähig. Zuerst Inhalt und rechtliche Einordnung des Vertrags prüfen.",
                "Ist Art. 404 OR auf die Beendigung anwendbar, lässt sich das zwingende Recht nicht bloss durch eine Kündigungsfrist ausschliessen. Die Folienaussage zu atypischen Aufträgen ist insoweit zu pauschal; vgl. BGE 115 II 464, E. 2.",
                "Bei einer Beendigung zur Unzeit kommt zudem Schadenersatz nach Art. 404 Abs. 2 OR in Betracht. Sofort beenden zu können bedeutet nicht, dass dies folgenlos bleibt."
              ]
            } }
          ],
          remember: "Auftrag Art. 394 ff OR: sorgfältiges Tätigwerden statt eines garantierten Erfolgs. Beendigungsordnung nach dem Inhalt bestimmen; Art. 404 OR ist, soweit anwendbar, zwingend. Rechenschaft und Folgen einer Beendigung zur Unzeit prüfen."
        },
        {
          type: "slide",
          title: "Folien 5–7 — Klassische und agile Entwicklung, und warum nichts richtig passt",
          body: [
            "Folie 5 stellt die beiden Vorgehensmodelle gegenüber und zeigt, dass die Vertragsfrage daran hängt:",
            { compare: {
              left: { title: "Klassisch", points: [
                "Pflichtenheft, Milestones und Abnahme",
                "= Werkvertrag + viel Zeit + Lizenz- beziehungsweise Kaufvertrag",
                "Der Vertragstyp ist klar"
              ] },
              right: { title: "Agil, iteratives Vorgehen", points: [
                "Werkvertrag? Das Resultat zählt",
                "Auftrag? Die Dienstleistung und Zusammenarbeit zählt",
                "Einfache Gesellschaft? Zusammenarbeit für einen bestimmten Zweck",
                "Nichts passt wirklich"
              ] },
              verdict: "Weil nichts wirklich passt, müssen die Verträge für agile Projekte individuell zusammengesetzt werden."
            } },
            "Folie 6 zeigt, aus welchen Bausteinen. Das Modell teilt die Regelungspunkte in drei Zonen auf:",
            { table: {
              caption: "Vorgehen Vertragsgestaltung für agile Projekte, nach dem Schema auf Folie 6",
              head: ["Zone", "Nr.", "Element", "Inhalt"],
              rows: [
                ["Kunden-Aspekte", "1", "Problem & Scope", "Vision (Warum), Bedürfnis (Was, Wozu)"],
                ["Kunden-Aspekte", "2", "Budget & Road map", "Business case, Road map, Kommerzielles"],
                ["Lieferanten-Aspekte", "3", "Fähigkeiten", "Menschen, Skills, Factory"],
                ["Lieferanten-Aspekte", "4", "Lösung & Angebot", "Kosten, Lösungsansatz (Wie)"],
                ["Partnerschaft", "5", "codex", "Form der Kollaboration, gestützt durch Werte, Prinzipien und Praktiken"],
                ["Partnerschaft", "6", "agile.framework", "Rollen, Phasen, Prozesse, Inspektionen und Abnahmen"],
                ["Partnerschaft", "7", "scope.governance", "Change management, Eskalationsprozess"],
                ["Partnerschaft", "8", "safety.charge & risk.share", "Form der Risikoadressierung"],
                ["Partnerschaft", "9", "value.bonus", "Form der Belohnung"],
                ["Partnerschaft", "10", "check.points", "Exits"]
              ],
              note: "Sechs der zehn Punkte liegen in der Zone Partnerschaft. Genau dort liegt bei agilen Projekten die eigentliche Regelungsarbeit."
            } },
            "Folie 7 zeigt dazu einen konkreten Vertragsentwurf. Die Abschnitte verraten, wie die Theorie in Klauseln aussieht: **Ziffer 3 Frühere Vereinbarungen** (die Vereinbarung stützt sich auf die Offerte, frühere Zusicherungen sind unbeachtlich, Anforderungen werden iterativ gemeinsam festgelegt und protokolliert), **Ziffer 4 Entwicklungsprozess** (gemeinsames Projektteam, Planungs- und Realisierungsphase, iterative Teilschritte Zielsetzung, Umsetzung und Review, **Verzicht auf ein formelles Abnahmeverfahren**, mindestens monatliche Projektsitzungen) und **Ziffer 5 Änderungen** (beschlossene Änderungen werden protokolliert und sind verbindlich, Änderungswünsche spätestens drei Tage vor der Sitzung).",
            { callout: { tone: "exam", title: "Die Klausel allein entscheidet den Vertragstyp nicht", text: "Ziffer 4.4 ersetzt das formelle Abnahmeverfahren durch Review oder produktive Nutzung. Das ist für Abläufe und Beweise wichtig. **Präzisierung:** Ob ein Werkvertrag vorliegt, hängt am versprochenen Werk beziehungsweise Erfolg (Art. 363 OR), nicht allein an einer formellen Abnahme. Auch ein agiles Projekt kann werkvertragliche Elemente enthalten." } }
          ],
          remember: "Klassische und agile Projekte verlangen eine Prüfung der konkreten Leistungspflichten. Das 10-Punkte-Modell hat die Zonen Kunde, Lieferant und Partnerschaft. Eine fehlende formelle Abnahme macht aus einem Werkvertrag nicht automatisch einen Auftrag."
        },
        {
          type: "checkpoint",
          id: "cp-vertragstypen",
          title: "Checkpoint: Werkvertrag, Auftrag, agile Projekte",
          questions: [
            {
              id: "resultat",
              type: "single",
              prompt: "Welche eine Frage unterscheidet Werkvertrag und Auftrag am schnellsten?",
              options: [
                "Ist ein abgrenzbares Resultat geschuldet, oder nur sorgfältiges Tätigwerden?",
                "Ist der Vertrag schriftlich oder mündlich geschlossen?",
                "Wird nach Aufwand oder zum Fixpreis abgerechnet?",
                "Dauert die Leistung länger als sechs Monate?"
              ],
              correct: 0,
              explanation: "Beim Werkvertrag ist das Werk geschuldet, beim Auftrag ausdrücklich kein Resultat. Die Abrechnungsart ist ein Indiz, aber nicht das Kriterium. Quelle: IT-Verträge, PDF-Seiten 17–18."
            },
            {
              id: "art377",
              type: "type",
              prompt: "Welcher OR-Artikel regelt das Rücktrittsrecht des Bestellers im Werkvertrag, vor dem die Folie ausdrücklich warnt? (nur die Zahl)",
              accept: ["377", "Art. 377", "Art 377", "OR 377", "Art. 377 OR"],
              placeholder: "Zahl",
              explanation: "Art. 377 OR. Die Folie warnt: Das könnte sehr teuer werden. Quelle: IT-Verträge, PDF-Seite 17."
            },
            {
              id: "art404",
              type: "multi",
              prompt: "Was gilt zur jederzeitigen Beendigung des Auftrags nach Art. 404 OR?",
              options: [
                "Grundsätzlich kann ein Auftrag jederzeit beendet werden",
                "Ob Art. 404 OR die Beendigung regelt, muss anhand des Vertragsinhalts geprüft werden",
                "Eine Beendigung zur Unzeit kann Schadenersatz auslösen",
                "Eine vereinbarte Kündigungsfrist schliesst Art. 404 OR immer aus"
              ],
              correct: [0, 1, 2],
              explanation: "Die pauschale Ausnahme auf Folie 18 wird präzisiert: Soweit Art. 404 OR anwendbar ist, ist das jederzeitige Beendigungsrecht zwingend; bei Unzeit ist Abs. 2 zu prüfen. Quelle: BGE 115 II 464, E. 2; Art. 404 OR."
            },
            {
              id: "agil-zonen",
              type: "order",
              prompt: "Ordne die drei Zonen des agilen Vertragsmodells so, wie sie auf Folie 6 von der Kundenseite über die Lieferantenseite in die Mitte führen.",
              items: ["Kunden-Aspekte: Problem & Scope, Budget & Road map", "Lieferanten-Aspekte: Fähigkeiten, Lösung & Angebot", "Partnerschaft: codex, agile.framework, scope.governance, Risiko, Belohnung, Exits"],
              explanation: "Kunde und Lieferant bringen je ihre Aspekte ein, die eigentliche Regelungsarbeit liegt dann in der Zone Partnerschaft mit sechs der zehn Punkte. Quelle: IT-Verträge, PDF-Seite 6."
            },
            {
              id: "gesamtsumme",
              type: "single",
              prompt: "Wie kommentiert die Folie eine vereinbarte Gesamtsumme bei iterativen Projekten?",
              options: [
                "Wer bei iterativen Projekten eine Gesamtsumme vereinbart, ist selber schuld",
                "Eine Gesamtsumme ist bei iterativen Projekten der empfohlene Standard",
                "Gesamtsummen sind bei Werkverträgen gesetzlich vorgeschrieben",
                "Die Folie äussert sich dazu nicht"
              ],
              correct: 0,
              explanation: "Der Satz steht wörtlich auf Folie 17, direkt im Zusammenhang mit dem Rücktrittsrecht nach Art. 377 OR. Quelle: IT-Verträge, PDF-Seite 17."
            }
          ]
        },

        /* ================= Folien 13, 15, 16 ================= */
        {
          type: "slide",
          title: "Folien 13 und 15 — Wenn es schwierig wird, und was Verzug bedeutet",
          body: [
            "Folie 13 listet die typischen Fälle, in denen es in IT-Projekten juristisch wird. Lies sie als Checkliste für Lernziel 2:",
            { cards: [
              { title: "Verzögerungen", text: "in der Leistungserstellung", tone: "warn" },
              { title: "Mehrere Beteiligte", text: "an der Leistungserfüllung", tone: "warn" },
              { title: "Keine oder zu späte Lieferung", text: "angeblich oder tatsächlich", tone: "warn" },
              { title: "Fehlerhaftes Produkt", text: "Garantieleistungen", tone: "warn" },
              { title: "Unklares Abnahmeverfahren", text: "wer nimmt wann was ab?", tone: "warn" },
              { title: "Fehlende Zahlung", text: "offene Rechnungen im laufenden Projekt", tone: "warn" },
              { title: "Übermässige Bindung", text: "Lock-in beim Lieferanten", tone: "warn" },
              { title: "Andere Mängel", text: "Nichtigkeit, Unmöglichkeit, Übervorteilung", tone: "warn" }
            ] },
            { callout: { tone: "tip", title: "Der praktische Rat der Folie", text: "Wenn es schwierig wird: **„Papier\" (Beweismittel) produzieren!** Das knüpft direkt an Folie 3 an, wo die Beweisbarkeit als eine der Hauptfunktionen des Vertrags genannt wird." } },
            "Folie 15 behandelt den wichtigsten dieser Fälle im Detail:",
            { table: {
              caption: "Verzug nach Folie 15",
              head: ["Punkt", "Was gilt"],
              rows: [
                ["Zwei Arten", "Gläubigerverzug und Schuldnerverzug (Art. 91 / 102 OR)"],
                ["Mahnung", "Schuldnerverzug tritt normalerweise erst mit ausdrücklichem Hinweis ein, dass die geschuldete Leistung nun fällig ist"],
                ["Mitwirkungspflichten", "Der Kunde hat Mitwirkungspflichten. Sonst verliert er gewisse Verzugsrechte"],
                ["Folgen", "Verzugsfolgen allgemein nach Art. 103 ff OR"]
              ],
              marks: { "2,1": "bad" }
            } },
            { callout: { tone: "exam", title: "Der Punkt, der in Fällen gern übersehen wird", text: "Die **Mitwirkungspflicht des Kunden**. Wer als Kunde die nötigen Informationen, Testdaten oder Ansprechpersonen nicht rechtzeitig bereitstellt, kann sich später nicht uneingeschränkt auf den Verzug des Lieferanten berufen." } }
          ],
          remember: "Typische Streitfälle: Verzögerung, Lieferung, Mängel, Zahlung und Bindung. Schuldnerverzug: Fälligkeit und grundsätzlich Mahnung prüfen; Ausnahmen nach Art. 102 Abs. 2 OR beachten. Auch Mitwirkung des Kunden klären."
        },
        {
          type: "slide",
          title: "Folie 16 — Schlecht- oder Nichterfüllung?",
          body: [
            { callout: { tone: "def", title: "Voraussetzung zuerst", text: "**Präzisierung zu Folie 16:** Beim Werkvertrag sind Prüfung und rechtzeitige Mängelanzeige nach Art. 367 und 370 OR wichtig; beim Kauf insbesondere Art. 201 OR. Eine Mängelrüge ist aber keine pauschale Voraussetzung für jeden Anspruch wegen vollständig ausgebliebener Leistung. Zuerst Vertrags- und Störungsart klären." } },
            { compare: {
              left: { title: "Nichterfüllung", points: [
                "Es wird **gar keine** Leistung erbracht",
                "Kommt laut Folie **selten** vor"
              ] },
              right: { title: "Schlechterfüllung", points: [
                "Eine Leistung wird erbracht, aber mangelhaft",
                "Auch ein kleiner Fehler kann von der geschuldeten Leistung abweichen",
                "Neue Änderungswünsche von Fehlern gegenüber dem vereinbarten Soll unterscheiden"
              ] },
              verdict: "Keine Leistung, mangelhafte Leistung und zusätzlicher Änderungswunsch sind verschiedene Fragen. Die Schwere beeinflusst mögliche Rechtsfolgen."
            } },
            { callout: { tone: "warn", title: "Die Produktivnutzungs-Falle", text: "Produktivnutzung kann bei Abnahme, Genehmigung und Beweiswürdigung relevant sein. Sie beweist aber nicht automatisch Mangelfreiheit. Vereinbarung, Vorbehalte, erkennbare und versteckte Mängel sowie Rügezeitpunkt prüfen (Art. 367–370 OR). Die Warnung auf Folie 16 ist kein ausnahmsloser Rechtssatz." } },
            { callout: { tone: "exam", title: "Die besondere Stellung des IT-Anbieters", text: "Dem IT- und Technologieanbieter kommt als **Spezialist** grundsätzlich eine besondere **Aufklärungspflicht** und Haftung zu. Er haftet auch für seine **Vorabklärungen**. Das verschiebt die Verantwortung im Fall spürbar Richtung Lieferant." } },
            { reveal: {
              question: "Ein Kunde nimmt eine Software in den Produktivbetrieb, meldet nach vier Monaten aber grosse Mängel und will vom Vertrag zurücktreten. Wie prüfst du den Fall?",
              label: "Prüfschema aufdecken",
              answer: [
                "**Erstens Vertrags- und Störungsart:** Welche Leistung war geschuldet und was fehlt? Beim Werkvertrag Prüfung und Mängelanzeige nach Art. 367/370 OR klären, beim Kauf Art. 201 OR.",
                "**Zweitens Soll und Ist:** Auch kleinere Abweichungen können Mängel sein; zusätzliche Wünsche sind nicht automatisch geschuldet. Die Schwere des Mangels beeinflusst, welche Rechtsbehelfe passen.",
                "**Drittens Produktivnutzung:** Abnahme- und Genehmigungsregeln, dokumentierte Vorbehalte und versteckte Mängel prüfen. Nutzung allein widerlegt einen Mangel nicht.",
                "**Viertens Gegenseite:** Dem Anbieter kommt als Spezialist eine besondere Aufklärungspflicht zu, auch für seine Vorabklärungen. Hat er auf erkennbare Risiken hingewiesen?"
              ]
            } }
          ],
          remember: "Zuerst Vertrags- und Störungsart prüfen. Mängelanzeige, Genehmigung, Vorbehalte und Beweise sind wichtig; kleine Fehler und produktive Nutzung erlauben keine pauschalen Schlüsse."
        },
        {
          type: "checkpoint",
          id: "cp-stoerungen",
          title: "Checkpoint: Verzug, Mängel, Störungen",
          questions: [
            {
              id: "maengelruege",
              type: "single",
              prompt: "Welche Handlung ist bei entdeckten Mängeln eines abgelieferten Werkes grundsätzlich wichtig, um Mängelrechte zu wahren?",
              options: [
                "Eine rechtzeitige Mängelanzeige nach Art. 367/370 OR",
                "Eine gerichtliche Klage",
                "Der Ablauf der Garantiefrist",
                "Die schriftliche Abnahme des Werkes"
              ],
              correct: 0,
              explanation: "Prüfung und rechtzeitige Mängelanzeige sind im Werkvertragsrecht zu beachten. Daraus folgt kein allgemeines Rügeerfordernis für jede Art von Nichterfüllung. Quelle: Art. 367 und 370 OR; Präzisierung zu Folie 16."
            },
            {
              id: "produktiv",
              type: "single",
              prompt: "Welche Aussage zur Produktivnutzung und zu Mängeln ist differenziert?",
              options: [
                "Die Nutzung kann rechtlich relevant sein; Vorbehalte, Erkennbarkeit und Rügezeitpunkt sind trotzdem zu prüfen",
                "Dass die Abnahme ausdrücklich verweigert wurde",
                "Dass der Vertrag in einen Auftrag umgewandelt wurde",
                "Dass die Gewährleistungsfrist neu zu laufen beginnt"
              ],
              correct: 0,
              explanation: "Produktivnutzung ist kein zwingender Nachweis der Mangelfreiheit. Quelle: Folie 16, präzisiert anhand Art. 367–370 OR."
            },
            {
              id: "verzug-multi",
              type: "multi",
              prompt: "Was gilt beim Verzug gemäss Folie 15?",
              options: [
                "Man unterscheidet Gläubiger- und Schuldnerverzug (Art. 91 / 102 OR)",
                "Schuldnerverzug tritt normalerweise erst mit ausdrücklichem Hinweis auf die Fälligkeit ein",
                "Der Kunde hat Mitwirkungspflichten und verliert sonst gewisse Verzugsrechte",
                "Verzug tritt bei IT-Projekten automatisch mit Ablauf des Liefertermins ein"
              ],
              correct: [0, 1, 2],
              explanation: "Die Mahnung ist der Regelfall bei fälliger Leistung. Art. 102 Abs. 2 OR kennt Ausnahmen, etwa einen verabredeten bestimmten Verfalltag. Ein Lieferdatum allein ist ohne Prüfung der Vereinbarung keine sichere Antwort. Quelle: IT-Verträge, PDF-Seiten 13, 15–16."
            },
            {
              id: "aufklaerung",
              type: "type",
              prompt: "Welche besondere Pflicht trifft den IT-Anbieter laut Folie 16, weil er Spezialist ist? (ein Wort)",
              accept: ["Aufklärungspflicht", "Aufklaerungspflicht", "Aufklärung", "Aufklaerung", "besondere Aufklärungspflicht"],
              placeholder: "ein Wort",
              explanation: "Eine besondere Aufklärungspflicht und Haftung, auch für seine Vorabklärungen. Quelle: IT-Verträge, PDF-Seiten 13, 15–16."
            }
          ]
        },

        /* ================= Folien 19–22 ================= */
        {
          type: "slide",
          title: "Folie 19 — Arbeitsvertrag und die Scheinselbständigkeit",
          body: [
            "Das ist Lernziel 3, und Folie 19 ist die mit Abstand prüfungsträchtigste Folie dazu. Die Frage lautet: **Arbeitnehmer, selbständig (Auftrag oder Werkvertrag) oder scheinselbständig?**",
            { callout: { tone: "def", title: "Einzelarbeitsvertrag, Art. 319 ff OR", text: "Die Einordnung erfolgt nicht danach, wie die Parteien den Vertrag nennen, sondern nach Indizien aus den Richtlinien der Ausgleichskassen und der Gerichtspraxis." } },
            { table: {
              caption: "Die sechs Indizien für ein Anstellungsverhältnis, nach Folie 19",
              head: ["Nr.", "Indiz für Arbeitsvertrag"],
              rows: [
                ["1", "Regelmässige und dauernde Tätigkeiten für denselben „Auftraggeber\""],
                ["2", "Regelmässige Einordnung oder Unterordnung in eine Projektorganisation des „Auftraggebers\""],
                ["3", "Der „Freelancer\" muss keine unternehmerischen Risiken tragen"],
                ["4", "Er muss sich weder mit Kundenakquisition noch mit Projektmanagement befassen, weil das in der Organisation des Kunden jemand anders macht"],
                ["5", "Er ist dem Kunden gegenüber nicht für Projektausführung und allfällige Mängel verantwortlich"],
                ["6", "Er muss das Inkasso nicht selbständig durchführen"]
              ],
              note: "Beispiel der Folie: ein „Freelancer\", der regelmässig in erheblichem Umfang für längere Zeit im Unternehmen aushilft. Arbeit auf Abruf?"
            } },
            { callout: { tone: "exam", title: "Indizien im IT-Projekt anwenden", text: "Die Indizien beschreiben genau die Situation vieler IT-Freelancer: fest im Scrum-Team, kein eigenes Risiko, keine eigene Akquisition. Je mehr Indizien zutreffen, desto eher liegt trotz Freelancer-Vertrag ein **Arbeitsverhältnis** vor, mit allen Folgen für Sozialversicherungen und Kündigungsschutz." } },
            { reveal: {
              question: "Eine Entwicklerin arbeitet seit 14 Monaten zu 80 Prozent für dieselbe Firma, sitzt im Scrum-Team, hat keine anderen Kunden, bekommt die Aufgaben vom Product Owner und stellt monatlich Rechnung. Sie hat einen Freelancer-Vertrag. Welche Indizien treffen zu?",
              label: "Prüfung aufdecken",
              answer: [
                "Praktisch alle. **Indiz 1**: regelmässig und dauernd für denselben Auftraggeber, 14 Monate zu 80 Prozent. **Indiz 2**: Einordnung in die Projektorganisation, sie sitzt im Scrum-Team und bekommt die Aufgaben vom Product Owner. **Indiz 3**: kein unternehmerisches Risiko erkennbar. **Indiz 4**: keine eigene Akquisition, keine anderen Kunden.",
                "Damit spricht sehr viel für ein **Arbeitsverhältnis** trotz Freelancer-Vertrag, also für Scheinselbständigkeit. Dass monatlich Rechnung gestellt wird, ändert daran wenig: Entscheidend ist die gelebte Wirklichkeit, nicht die Bezeichnung des Vertrags.",
                "Das passt zu Folie 3: Für die Auslegung gilt auch, was die Parteien tatsächlich gelebt haben."
              ]
            } }
          ],
          remember: "Sechs Indizien für Arbeitsvertrag: dauernd für denselben Auftraggeber, Einordnung in die Projektorganisation, kein unternehmerisches Risiko, keine Akquisition und kein Projektmanagement, keine Verantwortung für Mängel, kein eigenes Inkasso."
        },
        {
          type: "slide",
          title: "Folien 20–22 — Arbeitsrecht und Personalverleih zum Nachschlagen",
          body: [
            "Die Folien 20 und 21 sind bewusst Themenlisten, keine ausformulierten Regeln. Für eine Open-Book-Prüfung ist das die richtige Form: Du musst wissen, **dass** es die Frage gibt und **wo** sie steht.",
            { table: {
              caption: "Typische arbeitsrechtliche Fragen, nach den Folien 20 und 21",
              head: ["Thema", "Fundstelle", "Stichworte"],
              rows: [
                ["Zustandekommen des Vertrags", "Art. 319 ff OR", "Kettenverträge, befristet oder unbefristet"],
                ["Lohn", "–", "Leistungslohn, Bonus, Gratifikation"],
                ["Arbeitszeit", "–", "Überstunden, Überzeit, Kompensation"],
                ["Beendigung", "–", "Probezeit, Kündigung, Kündigungsschutz"],
                ["Lohnfortzahlung", "–", "Krankheit, Militär und weitere"],
                ["Nachvertragliches Konkurrenzverbot", "Art. 340 ff OR", "Reichweite und Grenzen"],
                ["Haftung der Mitarbeitenden", "Art. 321e OR", ""],
                ["Arbeitszeugnis", "Art. 330a OR", ""],
                ["Arbeitsgesetz", "ArG", "Anwendbarkeit, Gesundheitsschutz, Arbeits- und Ruhezeiten, Familienpflichten"]
              ],
              marks: { "5,1": "focus", "6,1": "focus", "7,1": "focus" },
              note: "Die Folien nennen nur bei diesen Punkten konkrete Artikel. Die übrigen Stichworte stehen ohne Fundstelle auf der Folie."
            } },
            "Folie 22 ergänzt den **Personalverleih**, umgangssprachlich Bodyshopping oder Body-Leasing. Rechtsgrundlage ist das **AVG**, das Bundesgesetz über die Arbeitsvermittlung und den Personalverleih. Es handelt sich um ein **bewilligungspflichtiges Gewerbe mit Pflicht zur Hinterlegung einer Kaution**. Regelmässig stellen sich dabei Fragen zu **Weisungsrecht, Kündigung und Konkurrenzverbot**.",
            { callout: { tone: "tip", title: "Zusammenhang zur vorherigen Folie", text: "Personalverleih und Scheinselbständigkeit sind verschiedene Einordnungsfragen. Beim Verleih stellt ein Arbeitgeber Personal einem Einsatzbetrieb zur Verfügung; Bewilligung und weitere Pflichten sind nach dem AVG zu prüfen. Eine Bewilligung allein löst nicht jede arbeits- oder sozialversicherungsrechtliche Frage." } }
          ],
          remember: "Arbeitsrecht-Fundstellen: Art. 319 ff Einzelarbeitsvertrag, Art. 321e Haftung Mitarbeitende, Art. 330a Arbeitszeugnis, Art. 340 ff Konkurrenzverbot, dazu das ArG. Personalverleih nach AVG ist bewilligungspflichtig mit Kaution."
        },
        {
          type: "checkpoint",
          id: "cp-arbeit",
          title: "Checkpoint: Arbeitsvertrag und Freelancer",
          questions: [
            {
              id: "indizien",
              type: "multi",
              prompt: "Welche Umstände sprechen gemäss Folie 19 für ein Anstellungsverhältnis statt für Selbständigkeit?",
              options: [
                "Regelmässige und dauernde Tätigkeit für denselben Auftraggeber",
                "Einordnung in die Projektorganisation des Auftraggebers",
                "Der Freelancer trägt keine unternehmerischen Risiken",
                "Der Freelancer macht das Inkasso selbständig",
                "Der Freelancer muss sich nicht um Kundenakquisition kümmern"
              ],
              correct: [0, 1, 2, 4],
              explanation: "Selbständiges Inkasso spricht gerade **für** Selbständigkeit. Die Folie nennt als Indiz für ein Anstellungsverhältnis, dass er das Inkasso **nicht** selbständig durchführen muss. Quelle: IT-Verträge, PDF-Seiten 19–22."
            },
            {
              id: "art319",
              type: "type",
              prompt: "Ab welchem OR-Artikel ist der Einzelarbeitsvertrag geregelt? (nur die Zahl)",
              accept: ["319", "Art. 319", "Art 319", "OR 319", "319 ff", "Art. 319 ff"],
              placeholder: "Zahl",
              explanation: "Art. 319 ff OR. Quelle: IT-Verträge, PDF-Seiten 19–22."
            },
            {
              id: "avg",
              type: "multi",
              prompt: "Was gilt für den Personalverleih gemäss Folie 22?",
              options: [
                "Rechtsgrundlage ist das AVG, das Bundesgesetz über die Arbeitsvermittlung und den Personalverleih",
                "Es ist ein bewilligungspflichtiges Gewerbe",
                "Es besteht eine Pflicht zur Hinterlegung einer Kaution",
                "Personalverleih ist in der Schweiz verboten"
              ],
              correct: [0, 1, 2],
              explanation: "Verboten ist er nicht, aber bewilligungspflichtig und mit Kautionspflicht verbunden. Quelle: IT-Verträge, PDF-Seiten 19–22."
            },
            {
              id: "zeugnis",
              type: "single",
              prompt: "Welcher Artikel regelt das Arbeitszeugnis?",
              options: ["Art. 330a OR", "Art. 321e OR", "Art. 340 OR", "Art. 377 OR"],
              correct: 0,
              explanation: "Art. 321e OR ist die Haftung der Mitarbeitenden, Art. 340 ff das Konkurrenzverbot, Art. 377 der Rücktritt im Werkvertrag. Quelle: IT-Verträge, PDF-Seiten 19–22."
            }
          ]
        },

        /* ================= Folien 8, 9, 14, 23 ================= */
        {
          type: "slide",
          title: "Folien 8–9 — Vertragsgestaltung und die Mustervertrags-Falle",
          body: [
            "Folie 9 fasst zusammen, worauf es beim Gestalten ankommt:",
            { cards: [
              { title: "Dauerverträge denken", text: "IT-Verträge sind immer mehr Dauerverträge, daher eine WIN-WIN-Situation schaffen." },
              { title: "KISS", text: "Keep it simple and stupid, aber nicht zu sehr. Einfach, klar, verständlich, zum Beispiel Begriffe definieren." },
              { title: "Motiv und Verpflichtung trennen", text: "Die Umschreibung des Ziels ist nicht dasselbe wie eine Verpflichtung." },
              { title: "Prozessbezogen denken", text: "Wie läuft die gegenseitige Leistungserfüllung Schritt für Schritt ab, und welche Rechte haben die Parteien, wenn nicht erfüllt wird?" },
              { title: "An das Ende denken", text: "Exit-Klauseln und Mitwirkungspflichten bei Hosting und SaaS, nicht nur an den Beginn.", tone: "warn" },
              { title: "Konfliktmanagement", text: "Regeln, wie Konflikte behandelt werden, bevor es sie gibt." }
            ] },
            "Dazu zwei Spannungsfelder, die die Folie ausdrücklich nennt: **„Pacta sunt servanda\" gegen Flexibilität und Abänderbarkeit** des Vertragsverhältnisses, und **Tailor-made-Vertrag gegen Mustervertrag**. In der IT ist oft eine Kombination von **Rahmenvertrag und Side-Letter** die Antwort.",
            { callout: { tone: "warn", title: "Folie 8: kein unreflektiertes Verwenden von generierten Mustern", text: [
              "Vor dem Einsatz eines Musters prüfen: Ist es die **richtige Rechtsordnung**? Sind die **Sachverhalte vergleichbar**? Enthält das Muster **alle relevanten Regelungen**? Sind **Änderungen der Rechtslage** berücksichtigt?",
              "Und ganz praktisch: Peinlich, wenn Namen früherer Parteien oder Rückschlüsse auf frühere Situationen im Dokument auftauchen."
            ] } },
            { callout: { tone: "exam", title: "Der Satz, den man leicht überliest", text: "Auch **eigene** Verträge können mit der Zeit wieder zu Musterverträgen werden, nämlich zu **auszumusternden**. Die Prozesse und Abläufe sind immer wieder neu zu hinterfragen, weil sich Technologie und Zusammenarbeitsformen ändern." } }
          ],
          remember: "Gestaltung: WIN-WIN bei Dauerverträgen, KISS, Motiv von Verpflichtung trennen, prozessbezogen denken, Exit-Klauseln, Konfliktmanagement. Musterverträge nie unreflektiert verwenden, auch eigene veralten."
        },
        {
          type: "slide",
          title: "Folien 14 und 23 — Konflikte und Zusammenarbeit",
          body: [
            "Folie 14 zeigt die **Eskalationsstufen nach Prof. Glasl**. Die neun Stufen fallen in drei Zonen, und entscheidend ist, welche Lösungsform in welcher Zone überhaupt noch greift:",
            { table: {
              caption: "Eskalationsstufen nach Glasl, nach dem Schema auf Folie 14",
              head: ["Zone", "Stufen", "Was noch hilft"],
              rows: [
                ["WIN-WIN", "1 Verhärtung, 2 Debatte und Polemik, 3 Taten statt Worte", "Eigene Lösungen noch möglich, Moderation"],
                ["WIN-LOSE", "4 Koalitionen, 5 Gesichtsverlust, 6 Drohungen", "Externe Mediation, Begleitung notwendig"],
                ["LOSE-LOSE", "7 Begrenzte Vernichtung, 8 Zersplitterung, 9 Gemeinsam in den Abgrund", "Nur noch durch Machteinwirkung von aussen"]
              ],
              marks: { "0,2": "good", "1,2": "warn", "2,2": "bad" }
            } },
            "Die Botschaft der Folie: **Konflikte sind normal**, deshalb lohnt es sich, alternative Lösungstechniken wie **Mediation** zu kennen. Wichtig ist, Konflikte **früh zu erkennen**, denn mit jeder Zone wird der Werkzeugkasten kleiner.",
            { callout: { tone: "exam", title: "Die Haltung, die der Dozent vertritt", text: "In Projekten darf die juristische Konfliktlösung nur **ultima ratio** sein, weil in den meisten Fällen die Interessen der klagenden Partei kaum erfüllt werden. Das Resultat ist lose-lose. Oft, aber nicht immer, ist es in IT-Projekten sinnvoller, **ein Ende mit Schrecken zu suchen als ein Schrecken ohne Ende**." } },
            "Folie 23 schliesst mit den **Zusammenarbeitsverträgen**: dem **Händlervertrag** (Vertriebs- oder Lizenzvertrag) und dem **Agenturvertrag**, bei dem zu klären ist, ob ein Vermittlungsagent oder ein Abschlussagent vorliegt.",
            { callout: { tone: "warn", title: "Die versteckte Haftungsfalle", text: "Leicht liegt eine **einfache Gesellschaft** vor (Art. 530 ff OR). Das kann erhebliche Haftungsfolgen haben. Zwei Firmen, die ohne klaren Vertrag gemeinsam auf ein Ziel hinarbeiten, bilden unter Umständen eine einfache Gesellschaft, ohne es zu wollen." } },
            { reveal: {
              question: "Warum taucht die einfache Gesellschaft in dieser Vorlesung zweimal auf, einmal bei agiler Entwicklung und einmal bei Zusammenarbeitsverträgen?",
              label: "Zusammenhang aufdecken",
              answer: [
                "Weil es in beiden Fällen dieselbe Konstellation ist: **Zusammenarbeit für das Erreichen eines bestimmten Zwecks**, ohne dass ein passender anderer Vertragstyp gewählt wurde.",
                "Auf Folie 5 wird sie als eine mögliche Qualifikation für agile Entwicklung genannt, neben Werkvertrag und Auftrag. Auf Folie 23 als Falle bei Händler- und Agenturverhältnissen.",
                "Das Gefährliche daran ist, dass sie **unbeabsichtigt** entsteht. Und dann greifen die Haftungsregeln der Art. 530 ff OR, auf die sich niemand eingestellt hat."
              ]
            } }
          ],
          remember: "Glasl: WIN-WIN (Stufen 1–3, eigene Lösungen und Moderation), WIN-LOSE (4–6, externe Mediation), LOSE-LOSE (7–9, nur noch Machteinwirkung). Juristische Lösung nur als ultima ratio. Einfache Gesellschaft (Art. 530 ff OR) entsteht leicht ungewollt."
        },

        /* ================= Abschluss ================= */
        {
          type: "slide",
          title: "OR-Spickzettel für die Open-Book-Prüfung",
          body: [
            "Alle Fundstellen, die in dieser Vorlesung genannt werden, auf einen Blick. Das ist dein Nachschlagewerk für die Prüfung.",
            { table: {
              caption: "Fundstellen aus der Vorlesung IT-Verträge",
              head: ["Fundstelle", "Thema", "Kernaussage"],
              rows: [
                ["Art. 1 OR", "Vertragsschluss", "Vertrag nur durch gegenseitige, übereinstimmende Willensäusserung"],
                ["Art. 7 OR", "Einladung zur Offertstellung", "Online-Bestellvorgang ist regelmässig keine verbindliche Offerte"],
                ["Art. 91 / 102 OR", "Verzug", "Gläubigerverzug und Schuldnerverzug"],
                ["Art. 103 ff OR", "Verzugsfolgen", "Allgemeine Folgen des Verzugs"],
                ["Art. 201 / 367 / 370 OR", "Mängelrüge", "Prüfung und Mängelanzeige bei Kauf beziehungsweise Werkvertrag"],
                ["Art. 319 ff OR", "Einzelarbeitsvertrag", "Abgrenzung Arbeitnehmer, selbständig, scheinselbständig"],
                ["Art. 321e OR", "Haftung der Mitarbeitenden", ""],
                ["Art. 330a OR", "Arbeitszeugnis", ""],
                ["Art. 340 ff OR", "Nachvertragliches Konkurrenzverbot", ""],
                ["Art. 363 ff OR", "Werkvertrag", "Resultat geschuldet, Abnahme, Gewährleistung"],
                ["Art. 377 OR", "Rücktritt im Werkvertrag", "Besteller kann zurücktreten, kann sehr teuer werden"],
                ["Art. 394 ff OR", "Auftrag", "Kein Resultat geschuldet, Rechenschaftspflicht"],
                ["Art. 404 OR", "Beendigung des Auftrags", "Anwendbarkeit klären; zwingendes Beendigungsrecht und Unzeitfolgen"],
                ["Art. 530 ff OR", "Einfache Gesellschaft", "Entsteht leicht ungewollt, erhebliche Haftungsfolgen"],
                ["AVG", "Personalverleih", "Bewilligungspflichtig, Kaution zu hinterlegen"],
                ["ArG", "Arbeitsgesetz", "Gesundheitsschutz, Arbeits- und Ruhezeiten, Familienpflichten"]
              ],
              marks: { "10,0": "bad", "12,0": "bad", "13,0": "bad" },
              note: "Rot markiert die drei Artikel, bei denen die Folien ausdrücklich warnen."
            } }
          ],
          remember: "Warnpunkte: Art. 377 OR (Vergütung und Schadloshaltung beim Rücktritt), Art. 404 OR (Anwendbarkeit, zwingende Beendigung und Unzeit), Art. 530 ff OR (einfache Gesellschaft)."
        },
        {
          type: "slide",
          title: "Das muss ich nach dieser Vorlesung können",
          body: [
            "Hak ab, was sitzt. Was offen bleibt, weisst du, wo du nachschlagen musst.",
            { checklist: { title: "Kann ich das jetzt?", items: [
              "Ich kann erklären, wann ein Vertrag zustande kommt und wann eine Darstellung bloss eine **Einladung zur Offertstellung** ist.",
              "Ich kann **Nominat-, gemischte und Innominatverträge** unterscheiden und je zwei IT-Beispiele nennen.",
              "Ich kann in einem Projektfall begründen, ob ein **Werkvertrag** oder ein **Auftrag** vorliegt.",
              "Ich kann sagen, warum **Art. 377 OR** bei iterativen Projekten mit Gesamtsumme gefährlich ist.",
              "Ich kann die Präzisierung zu **Art. 404 OR** und die Folgen einer Beendigung zur Unzeit erklären.",
              "Ich kann **Nichterfüllung** von **Schlechterfüllung** unterscheiden und die Rolle der Produktivnutzung erklären.",
              "Ich kann erklären, warum die **Mitwirkungspflicht des Kunden** beim Verzug zählt.",
              "Ich kann mindestens vier **Indizien für Scheinselbständigkeit** nennen und auf einen Fall anwenden.",
              "Ich kann die drei **Glasl-Zonen** nennen und sagen, welche Lösungsform in welcher Zone noch greift.",
              "Ich kann erklären, wie eine **einfache Gesellschaft** ungewollt entsteht und warum das gefährlich ist.",
              "Ich weiss, warum **Musterverträge** nicht unreflektiert verwendet werden dürfen.",
              "Ich finde die wichtigsten **OR-Artikel** dieser Vorlesung in unter einer Minute."
            ] } }
          ],
          remember: "Zwölf Punkte. Was nicht abgehakt ist, kommt auf den Wiederholungsstapel."
        },
        {
          type: "slide",
          title: "Transfer: drei Fälle zum Selberdenken",
          body: [
            "Die folgenden eigenen Transferfälle verbinden mehrere Konzepte und üben eine begründete Open-Book-Fallbearbeitung. Sie sind keine Vorhersage konkreter Prüfungsfragen.",
            { reveal: {
              question: "**Fall 1.** Ein Startup beauftragt eine Agentur mündlich mit der Entwicklung einer App. Man einigt sich per Chat auf „ungefähr 80'000 Franken\" und arbeitet in zweiwöchigen Sprints. Nach fünf Monaten steigt das Startup aus und will nichts mehr zahlen. Wie gehst du an den Fall heran?",
              label: "Lösungsweg aufdecken",
              answer: [
                "**Schritt 1, ist überhaupt ein Vertrag zustande gekommen?** Ja. Nach Art. 1 OR genügt die gegenseitige übereinstimmende Willensäusserung, und sie kann mündlich oder konkludent erfolgen. Die Vertragsfreiheit gilt für Form und Inhalt. Dass kein Papier existiert, ändert nichts an der Gültigkeit, wohl aber an der **Beweisbarkeit**, die Folie 3 als zentrale Funktion nennt.",
                "**Schritt 2, welcher Typ?** Entscheidend ist, ob ein bestimmtes Ergebnis oder sorgfältige Tätigkeit geschuldet war. Sprints, gemeinsame Zielfindung und fehlende formelle Abnahme allein entscheiden die Qualifikation nicht. Vereinbarungen und gelebte Zusammenarbeit gemeinsam auswerten.",
                "**Schritt 3, der Ausstieg.** Bei anwendbarem Auftragsrecht Art. 404 OR einschliesslich Unzeitfolgen prüfen; beim Werkvertrag Art. 377 OR mit Vergütung geleisteter Arbeit und voller Schadloshaltung. Sofortiger Ausstieg bedeutet nicht automatisch, dass nichts zu zahlen ist.",
                "**Schritt 4, die Preisangabe.** „Ungefähr 80'000“ muss ausgelegt werden: Schätzung, Kostendach oder andere Abrede? Leistungsumfang, Änderungen und Preisregeln klären, statt eine eindeutige Pauschalpreisvereinbarung zu unterstellen."
              ]
            } },
            { reveal: {
              question: "**Fall 2.** Ein SaaS-Anbieter kündigt den Vertrag fristgerecht. Der Kunde stellt fest, dass er seine Daten nicht in einem brauchbaren Format exportieren kann, und der Vertrag sagt dazu nichts. Welche Punkte der Vorlesung greifen?",
              label: "Lösungsweg aufdecken",
              answer: [
                "**Folie 4** hat genau das vorausgesagt: Bei Dauerverträgen in der Cloud stellt sich die Frage, was passiert, wenn kein Zugang und kein Support mehr besteht und wichtige Daten unerreichbar sind.",
                "**Folie 9** nennt die Gegenmassnahme, die hier gefehlt hat: nicht nur an den Beginn, sondern auch an das **Ende** der Zusammenarbeit denken, mit **Exit-Klauseln** und **Mitwirkungspflichten bei Hosting und SaaS**.",
                "Ob eine Vertragslücke, eine Pflichtverletzung oder ein Problem der Auslegung vorliegt, hängt vom Vertrag und den Umständen ab. Auch Innominatverträge stehen nicht ausserhalb des Gesetzes: Allgemeines Vertragsrecht und passende gesetzliche Regeln können ergänzend eingreifen. Die fehlende Exit-Klausel verlangt eine konkrete Prüfung.",
                "Lehre für die Gestaltung: Exit und Datenherausgabe gehören in den Vertrag, bevor man ihn unterschreibt, nicht in die Verhandlung danach, wie Folie 3 es formuliert."
              ]
            } },
            { reveal: {
              question: "**Fall 3.** Zwei Firmen entwickeln gemeinsam ein Produkt, teilen sich Kosten und Erlöse und treten gegenüber Kunden zusammen auf. Einen Vertrag gibt es nicht. Ein Kunde erleidet durch einen Fehler einen Schaden. Was ist das Problem?",
              label: "Lösungsweg aufdecken",
              answer: [
                "Hier liegt mit hoher Wahrscheinlichkeit eine **einfache Gesellschaft** nach Art. 530 ff OR vor: Zusammenarbeit für das Erreichen eines bestimmten Zwecks, gemeinsames Auftreten, geteilte Kosten und Erlöse.",
                "Folie 23 warnt genau davor: Das kann **erhebliche Haftungsfolgen** haben. Die Gesellschafter haften für Verbindlichkeiten der Gesellschaft, und keine der beiden Firmen hat sich darauf eingestellt.",
                "Dazu kommt Folie 13 mit dem Fall „mehrere an der Leistungserfüllung Beteiligte\". Für den geschädigten Kunden ist unklar, wen er belangen kann, und für die beiden Firmen ist unklar, wer intern wofür einsteht.",
                "Die Prävention wäre ein ausdrücklicher Zusammenarbeitsvertrag gewesen, der Rollen, Haftung und Aussenauftritt regelt. Fehlt er, entscheidet das Gesetz, und zwar in einer Form, die niemand gewählt hat."
              ]
            } }
          ],
          remember: "Transfer heisst: Vertragstyp bestimmen, dann die Rechtsfolge ableiten. Die Qualifikation entscheidet in Fall 1 über Art. 404 oder Art. 377, also über das Geld."
        },
        {
          type: "slide",
          title: "Was war nur Zusatzwissen?",
          body: [
            "Damit du deine Lernzeit richtig verteilst. Diese Punkte solltest du einordnen können, sie brauchen aber nicht denselben Aufwand wie der Rest:",
            { list: [
              "**Der Vertragsentwurf auf Folie 7.** Verstehe die Prozessregeln. Der Verzicht auf formelle Abnahme entscheidet den Vertragstyp nicht allein; zentral ist die versprochene Leistung.",
              "**Die Aufzählung der Innominatverträge auf Folie 12.** Du musst wissen, dass Leasing, Factoring, Escrow, SLA und NDA nicht im Gesetz geregelt sind. Die Einzelheiten jedes dieser Verträge sind nicht Thema dieser Vorlesung.",
              "**Die technischen Beispiele auf Folie 4** illustrieren, warum alte Vertragsmuster nicht immer passen. Hier liegt der Fokus auf den rechtlichen Folgen; daraus folgt keine bestätigte Prüfungsausnahme.",
              "**Die Schlussfolie 24** ist ein Platzhalter für die eigenen Notizen aus dem Unterricht."
            ] },
            { callout: { tone: "tip", title: "Faustregel für diese Vorlesung", text: "Didaktische Einschätzung: Explizite Lernziele geben die Priorität vor; Artikelverweise und Warnungen helfen bei der Vertiefung. Beispiele können ebenfalls prüfbare Anwendungen enthalten." } }
          ],
          remember: "Zusatzwissen nach didaktischer Gewichtung: Details einzelner Vertragsmuster und Technikbeispiele. Die Lernziele und Fallanwendung bleiben zentral."
        },
        {
          type: "checkpoint",
          id: "cp-final",
          title: "Prüfungs-Check: die ganze Vorlesung",
          questions: [
            {
              id: "fall-qualifikation",
              type: "single",
              prompt: "Eine Agentur verpflichtet sich ausdrücklich nur zu sorgfältiger Beratung und Begleitung, ohne einen bestimmten Entwicklungserfolg zu versprechen. Welche Einordnung passt am besten?",
              options: [
                "Auftrag, weil sorgfältige Tätigkeit und kein bestimmter Erfolg versprochen ist",
                "Eindeutig Werkvertrag, weil am Ende Software entsteht",
                "Kaufvertrag, weil Software ein Produkt ist",
                "Miete, weil die Leistung über Zeit erbracht wird"
              ],
              correct: 0,
              explanation: "Entscheidend ist die geschuldete Leistung, nicht allein die Projektmethode oder die formelle Abnahme. Quelle: Folien 5 und 17–18; Art. 363 und 394 OR."
            },
            {
              id: "warn-artikel",
              type: "multi",
              prompt: "Bei welchen Punkten warnt die Vorlesung ausdrücklich vor teuren Überraschungen?",
              options: [
                "Art. 377 OR, Rücktritt des Bestellers im Werkvertrag",
                "Art. 530 ff OR, ungewollte einfache Gesellschaft",
                "Produktivnutzung der Software, die Tauglichkeit impliziert",
                "Art. 330a OR, Arbeitszeugnis"
              ],
              correct: [0, 1, 2],
              explanation: "Das Arbeitszeugnis wird nur als Fundstelle genannt, ohne Warnung. Die drei anderen tragen auf den Folien ein ausdrückliches ACHTUNG oder eine entsprechende Warnung. Quelle: IT-Verträge, PDF-Seiten 3, 5–7, 14, 16–19, 23."
            },
            {
              id: "glasl",
              type: "order",
              prompt: "Ordne die drei Glasl-Zonen von der am wenigsten eskalierten zur am stärksten eskalierten.",
              items: [
                "WIN-WIN: eigene Lösungen noch möglich, Moderation",
                "WIN-LOSE: externe Mediation und Begleitung notwendig",
                "LOSE-LOSE: nur noch durch Machteinwirkung von aussen"
              ],
              explanation: "Mit jeder Zone wird der Werkzeugkasten kleiner. Deshalb betont die Folie, Konflikte früh zu erkennen. Quelle: IT-Verträge, PDF-Seiten 3, 5–7, 14, 16–19, 23."
            },
            {
              id: "scheinselbst",
              type: "single",
              prompt: "Welcher Umstand spricht als einziger der folgenden **für** echte Selbständigkeit?",
              options: [
                "Der Freelancer führt das Inkasso selbständig durch",
                "Der Freelancer ist in die Projektorganisation des Kunden eingeordnet",
                "Der Freelancer arbeitet regelmässig und dauernd für denselben Auftraggeber",
                "Der Freelancer trägt keine unternehmerischen Risiken"
              ],
              correct: 0,
              explanation: "Folie 19 nennt als Indiz für ein Anstellungsverhältnis, dass er das Inkasso **nicht** selbständig durchführen muss. Tut er es doch, spricht das für Selbständigkeit. Quelle: IT-Verträge, PDF-Seiten 3, 5–7, 14, 16–19, 23."
            },
            {
              id: "prozess",
              type: "type",
              prompt: "Vervollständige den Kernsatz von Folie 3: Der Verhandlungsprozess ist wichtiger als das daraus entstandene …",
              accept: ["Papier", "das Papier", "Papier!", "Vertragspapier"],
              placeholder: "ein Wort",
              explanation: "Alles, was am Anfang nicht verhandelt wird, wird später wieder verhandelt, dann aber unter anderen Rahmenbedingungen. Quelle: IT-Verträge, PDF-Seiten 3, 5–7, 14, 16–19, 23."
            }
          ]
        }
      ]
    }
  ]
});
