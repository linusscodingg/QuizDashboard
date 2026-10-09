/*
 * W5 ergänzt 09.10.2026: lokaler Schedule and Videos.html, SW5 = Kapitel 4 Part 3/3.
 * WebAppSecurityTesting3.pdf: alle 46 PDF-Seiten inkl. Notizen gelesen und visuell geprüft.
 * PDF-Seite = gedruckte Foliennummer. Originale bleiben ausserhalb des Repos.
 * A: Autorisierung (3–15) -> cp-access-control; CSRF (17–29) -> cp-csrf-mechanism/defenses;
 * Testwahl/Befundbewertung (31–46) -> cp-dynamic-testing/static-llm/transfer.
 * B: Datenfluss, Browserkontext und Frameworkgrenzen. C: alte Demo-URLs, Toolzahlen.
 * Eigene Transferfälle und Abläufe gekennzeichnet. Keine Videos/LCQs transkribiert.
 * Präzisierungen geprüft 09.10.2026: Cookie-Kontext, Lax-Top-Level-Bedingung,
 * Request senden vs. Response lesen, keine Token in URLs, keine vollständige Codeabdeckungsgarantie.
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
 * https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
 * https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
 * https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html
 * Strittige Demo-Secret-Bewertung nur eingeordnet, nicht als eindeutige Quizfrage benutzt.
 */
/*
 * Ergänzung 06.10.2026 nach Moodle Schedule and Videos (SW 1–4):
 * https://moodle.zhaw.ch/mod/page/view.php?id=1989373
 * Neue Wochen: W1 IntroSoftwareSecurity.pdf, 29/29 Seiten inkl. Notizen;
 * OverviewSWS1.pdf, 5/5 Seiten. W4 WebAppSecurityTesting2.pdf, 47/47 Seiten inkl. Notizen.
 * Text und sämtliche Seiten visuell geprüft. PDF-Seite = gedruckte Foliennummer.
 * W1 A: CIA (4–5) -> cp-cia; Ansätze (19–22) -> cp-approaches;
 * Begriffe/Risiko (24–29) -> cp-defects/risk; B: Angriffsketten (9–17) -> cp-incidents;
 * C: Historie/CVE-Zahlen/Organisation. Eigene Fall-Reveals und Risikorechnung markiert.
 * W4 A: Login/Recovery (3–10) -> cp-login; Sessions (11–19) -> cp-sessions;
 * XSS (21–35) -> cp-xss-types/chain; Abwehr (35–38) -> cp-defenses;
 * DOM (39–47) -> cp-dom. B: Testauswertung/Datenfluss; C: alte Tool-/Browserdetails.
 * Gewichtung ist didaktisch. Videos/LCQ nicht transkribiert; vorhandene W2/W3 unverändert.
 * Präzisierungen, Primärquellen geprüft 06.10.2026:
 * https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
 * https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html
 * https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
 * https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-XSS-Protection
 * Originalunterlagen verbleiben ausserhalb des Repos. Keine neuen eigenständigen Quizze.
 */
/*
 * Lerncoach-Inhalte für SWS1 (Software and System Security 1, ZHAW, Marc Rennhard / Gürkan Gür).
 * Woche 2 aus: W2_SecureDevelopmentLifecycle.pdf (Folien 1–26) und W2_1_SoftwareSecurityErrors.pdf (Folien 1–23).
 *   Gewichtung: A: Phasen/Aktivitäten-Zuordnung, Kette Threat Modeling → Requirements → Controls, 50/50 Bugs vs. Design Flaws,
 *   Fixing Earlier is Better, 7 (+1) Kingdoms mit Beispielen und beide Übungen. B: Architektur-Einfluss der Controls, Einführung.
 *   C: konkrete SDL-Prozesse, Kapitelplan, andere Taxonomien. Didaktische Gewichtung, keine Prüfungszusage.
 *   Transfers, Merkhilfe und die Versuchsrechnung zum Timing-Angriff sind eigene Ergänzungen und als solche markiert.
 * Woche 3 aus: WebAppSecurityTesting1.pdf (Web Application Security Testing, Part 1/3).
 * Erklärungen auf Deutsch, Checkpoints auf Englisch (Prüfungssprache).
 * Defensive Security: Ziel ist Schwachstellen erkennen, im Code sehen und richtig absichern.
 */
Lerncoach.registerSubject({
  id: "SWS1",
  name: "Software and System Security 1",
  short: "SWS1",
  description: "Software- und Systemsicherheit",
  accent: "#9a4f24",
  weeks: [
    {
      "id": "w1",
      "number": 1,
      "title": "Introduction to Software Security",
      "status": "ready",
      "items": [
        {
          "type": "slide",
          "title": "Was sichere Software leisten muss",
          "body": [
            "SWS1 verbindet sicheres Entwerfen, Implementieren und Prüfen. Kryptografie und sichere Protokolle sind Bausteine; erst die richtige Anwendung in einer konkreten Software schützt deren Daten und Funktionen.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Schutzziel",
                    "text": "Was muss geschützt werden?"
                  },
                  {
                    "title": "Angriff verstehen",
                    "text": "Was könnte dieses Ziel verletzen?"
                  },
                  {
                    "title": "Massnahme begründen",
                    "text": "Wie verhindern oder begrenzen wir das?"
                  }
                ]
              }
            },
            {
              "callout": {
                "tone": "tip",
                "title": "So lernst du diese Woche",
                "text": "Erkläre CIA, vergleiche die drei Sicherheitsansätze und ordne konkrete Fälle den Fachbegriffen zu. Diese Gewichtung folgt den Lernzielen auf Folie 2; sie ist keine Zusage bestimmter Prüfungsfragen."
              }
            },
            "Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 2, 7 (inkl. Notizen); OverviewSWS1.pdf, Folie 3"
          ],
          "remember": "Funktionierende Software ist nicht automatisch sichere Software."
        },
        {
          "type": "slide",
          "title": "CIA: drei unterschiedliche Schutzziele",
          "body": [
            {
              "cards": [
                {
                  "title": "Confidentiality – Vertraulichkeit",
                  "text": "Nur berechtigte Personen dürfen sensible Informationen lesen."
                },
                {
                  "title": "Integrity – Integrität",
                  "text": "Daten und Systeme dürfen nicht unberechtigt verändert werden."
                },
                {
                  "title": "Availability – Verfügbarkeit",
                  "text": "Informationen und Funktionen müssen bei Bedarf nutzbar sein."
                }
              ]
            },
            {
              "reveal": {
                "question": "Eigener Fall: Jemand ändert eine Note, ohne Daten zu stehlen. Welches Ziel ist unmittelbar verletzt?",
                "answer": "Integrität. Ein Angriff muss nicht alle drei Ziele gleichzeitig verletzen. Dass die Plattform weiterhin erreichbar ist, macht die Manipulation nicht harmlos.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 4 (inkl. Notizen)"
          ],
          "remember": "Lesen: C. Verändern: I. Bei Bedarf nutzen: A."
        },
        {
          "type": "slide",
          "title": "Schutzbedarf hängt vom Kontext ab",
          "body": [
            {
              "table": {
                "head": [
                  "System der Folie",
                  "Besonders anschaulicher Schutzbedarf"
                ],
                "rows": [
                  [
                    "E-Shop",
                    "Zahlungsdaten geheim halten, Preise unverändert halten, Einkauf ermöglichen"
                  ],
                  [
                    "Öffentlicher Fahrplan",
                    "Korrekte Abfahrtszeiten und Erreichbarkeit; öffentliche Daten benötigen weniger Vertraulichkeit"
                  ],
                  [
                    "Notenverwaltung",
                    "Noten und Personendaten schützen; Ausfallfolgen hängen vom Zeitpunkt ab"
                  ]
                ]
              }
            },
            {
              "callout": {
                "tone": "warn",
                "title": "Priorität begründen",
                "text": "Die Beispiele illustrieren Annahmen, keine dauerhafte Einstufung realer Dienste. Eine nächtliche Wartung und ein Ausfall unmittelbar vor einer Frist haben unterschiedliche Folgen."
              }
            },
            "Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 5 (inkl. Notizen)"
          ],
          "remember": "Sicherheitsziele gelten im Nutzungskontext und mit begründetem Schutzbedarf."
        },
        {
          "type": "checkpoint",
          "id": "cp-cia",
          "title": "Checkpoint: Security Goals",
          "questions": [
            {
              "id": "grade",
              "type": "single",
              "prompt": "An attacker changes a grade without permission. Which goal is directly violated?",
              "options": [
                "Availability",
                "Integrity",
                "Confidentiality"
              ],
              "correct": 1,
              "explanation": "Unberechtigtes Verändern verletzt Integrität. Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 4–7 (inkl. Notizen)"
            },
            {
              "id": "public",
              "type": "multi",
              "prompt": "A timetable contains only public data. Which statements follow?",
              "options": [
                "Integrity still matters.",
                "Availability can still matter.",
                "Public data makes all security unnecessary.",
                "Confidentiality may have lower priority."
              ],
              "correct": [
                0,
                1,
                3
              ],
              "explanation": "Öffentlichkeit beseitigt nicht den Bedarf an korrekten und verfügbaren Daten. Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 4–7 (inkl. Notizen)"
            },
            {
              "id": "cia-a",
              "type": "type",
              "prompt": "Expand the A in CIA (one English term).",
              "accept": [
                "availability",
                "Availability goal"
              ],
              "explanation": "Availability bedeutet Verfügbarkeit bei Bedarf. Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 4–7 (inkl. Notizen)"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Malware: Ausbreitungsart und Wirkung trennen",
          "body": [
            {
              "compare": {
                "left": {
                  "title": "Virus und Worm",
                  "points": [
                    "Virus: kopiert sich in ein Wirtsprogramm oder Dokument.",
                    "Worm: eigenständige Software; kann sich automatisiert weiterverbreiten."
                  ]
                },
                "right": {
                  "title": "Trojan und Ransomware",
                  "points": [
                    "Trojan: tarnt eine schädliche Funktion als erwünschte Software.",
                    "Ransomware: erpresst durch blockierte oder verschlüsselte Daten; die Bezeichnung beschreibt die Wirkung."
                  ]
                }
              }
            },
            {
              "callout": {
                "tone": "def",
                "title": "Mehrere Begriffe können passen",
                "text": "WannaCry ist das Beispiel für Ransomware, die sich als Wurm verbreitet. Die Kategorien sind keine vier sich ausschliessenden Schubladen."
              }
            },
            "Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 9–10, 16 (inkl. Notizen)"
          ],
          "remember": "Worm beschreibt Ausbreitung; Ransomware beschreibt eine schädliche Wirkung."
        },
        {
          "type": "slide",
          "title": "Morris und Code Red: warum Würmer so schnell wachsen",
          "body": [
            {
              "flow": {
                "steps": [
                  {
                    "title": "Erreichbares Ziel",
                    "text": "Ein verwundbarer Dienst ist erreichbar."
                  },
                  {
                    "title": "Ausnutzung",
                    "text": "Die Schwachstelle ermöglicht eine Infektion."
                  },
                  {
                    "title": "Weitere Quellen",
                    "text": "Auch das neu infizierte System sucht weitere Ziele."
                  }
                ]
              }
            },
            "Die Code-Red-Grafik auf Folie 12 zeigt zuerst langsames Wachstum, dann starke Beschleunigung und schliesslich Sättigung. Immer mehr infizierte Systeme suchen parallel; später bleiben weniger erreichbare verwundbare Ziele übrig.",
            {
              "reveal": {
                "question": "Warum endet die steile Wachstumsphase, obwohl die infizierten Systeme weiter suchen?",
                "answer": "Der Vorrat an erreichbaren verwundbaren Systemen ist begrenzt. Bereits infizierte oder geschützte Systeme erzeugen nicht ständig neue zusätzliche Opfer.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 9–12 (inkl. Notizen)"
          ],
          "remember": "Rückkopplung beschleunigt die Ausbreitung; begrenzte Ziele führen zur Sättigung."
        },
        {
          "type": "slide",
          "title": "Was die historischen Vorfälle gemeinsam zeigen",
          "body": [
            {
              "table": {
                "head": [
                  "Vorfall",
                  "Mechanismus aus der Vorlesung",
                  "Lehre"
                ],
                "rows": [
                  [
                    "Code Red",
                    "Verwundbarer IIS-Dienst, trotz verfügbarem Patch",
                    "Ein vorhandener Patch muss auch wirksam ausgerollt sein."
                  ],
                  [
                    "Heartland",
                    "SQL-Injection als Einstieg; anschliessend Datendiebstahl",
                    "Eine Anwendungslücke kann eine längere Angriffskette eröffnen."
                  ],
                  [
                    "WannaCry",
                    "SMB-Schwachstelle und Wurmverbreitung; Verschlüsselung",
                    "Erreichbarkeit, Patchstand und Wiederherstellbarkeit beeinflussen den Schaden."
                  ]
                ]
              }
            },
            "Die Beispiele können ohne einen anfänglichen Fehlklick auskommen. Andere Angriffe kombinieren Softwarefehler mit Social Engineering, manipulierten Downloads oder kompromittierten Lieferanten. Die Jahreszahlen und damaligen Schadensschätzungen sind Kontext, kein Massstab für das heutige Risiko.",
            {
              "callout": {
                "tone": "warn",
                "title": "Keine Zahlungsgarantie",
                "text": "Die Folien beschreiben auch Erpressung mit gestohlenen Daten. Daraus folgt keine Zusage, dass eine Zahlung Daten zurückbringt oder eine Veröffentlichung verhindert."
              }
            },
            "Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 11, 13–17 (inkl. Notizen)"
          ],
          "remember": "Die Ursache und die unterbrechbare Angriffskette sind wichtiger als Opferzahlen."
        },
        {
          "type": "checkpoint",
          "id": "cp-incidents",
          "title": "Checkpoint: Incidents and Attack Chains",
          "questions": [
            {
              "id": "worm",
              "type": "multi",
              "prompt": "Which statements fit a worm?",
              "options": [
                "It can spread without a host document.",
                "Each newly infected system may become another source.",
                "It must always encrypt files.",
                "It necessarily requires the user to open an attachment."
              ],
              "correct": [
                0,
                1
              ],
              "explanation": "Eigenständige Ausbreitung definiert den Wurm; Verschlüsselung oder Anhänge sind nicht zwingend. Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 9–17 (inkl. Notizen)"
            },
            {
              "id": "spread",
              "type": "order",
              "prompt": "Order the simplified propagation chain from the lecture.",
              "items": [
                "Reach a vulnerable service",
                "Exploit the vulnerability",
                "Infect the target",
                "The new instance searches for further targets"
              ],
              "explanation": "Ein erfolgreicher Durchlauf erzeugt weitere Ausgangspunkte. Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 9–17 (inkl. Notizen)"
            },
            {
              "id": "patch",
              "type": "single",
              "prompt": "A patch existed before an incident. What does this prove?",
              "options": [
                "Every installation was safe.",
                "Software design no longer matters.",
                "Availability of a patch does not prove deployment."
              ],
              "correct": 2,
              "explanation": "Code Red und WannaCry zeigen die Lücke zwischen verfügbarer und installierter Korrektur. Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 9–17 (inkl. Notizen)"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Penetrate and Patch: die reaktive Falle",
          "body": [
            "Gemeint ist hier: Software ohne ausreichende vorbeugende Sicherheitsarbeit veröffentlichen und erst auf entdeckte Lücken reagieren. Das ist nicht gleichbedeutend mit jedem sinnvollen Penetrationstest.",
            {
              "cards": [
                {
                  "title": "Zeitfenster",
                  "text": "Ein Angreifer kann eine Lücke vor dem Hersteller kennen."
                },
                {
                  "title": "Verteilung",
                  "text": "Ein Patch schützt nur Systeme, auf denen er tatsächlich wirksam wird."
                },
                {
                  "title": "Qualität",
                  "text": "Unter Zeitdruck geschriebene Korrekturen können neue Fehler einführen."
                }
              ]
            },
            {
              "reveal": {
                "question": "Eigener Fall: Ein Team plant nur einen Sicherheitstest nach dem Release. Warum ist das unzureichend?",
                "answer": "Fehler werden spät entdeckt, eventuell erst nach einem Angriff. Die Sicherheitsarbeit muss schon Anforderungen, Entwurf und Implementierung begleiten; Tests und Patches bleiben zusätzlich notwendig.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 19 (inkl. Notizen)"
          ],
          "remember": "Späte Reparatur allein lässt vermeidbare Risiken im Entwicklungsprozess bestehen."
        },
        {
          "type": "slide",
          "title": "WAF und IPS: Schutzschicht mit Grenzen",
          "body": [
            "Ein vorgeschaltetes Web Application Firewall- oder Intrusion Prevention System kann schädlichen Verkehr erkennen und blockieren. Es korrigiert aber nicht automatisch die Ursache im Anwendungscode.",
            {
              "compare": {
                "left": {
                  "title": "Hilfreiche Ergänzung",
                  "points": [
                    "Zusätzliche Erkennung und Filterung",
                    "Teil einer mehrschichtigen Abwehr",
                    "Konfiguration und Betrieb bleiben Arbeit"
                  ]
                },
                "right": {
                  "title": "Unzureichender Ersatz",
                  "points": [
                    "Nicht alle Varianten werden erkannt",
                    "Ein Entwurfsfehler bleibt bestehen",
                    "Ein einzelnes Gerät garantiert keine Sicherheit"
                  ]
                }
              }
            },
            "Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 20, 22 (inkl. Notizen)"
          ],
          "remember": "Eine WAF kann Risiko senken; sie ersetzt keinen sicheren Entwurf."
        },
        {
          "type": "slide",
          "title": "SDL und Defense in Depth zusammendenken",
          "body": [
            "Ein Secure Development Lifecycle integriert Sicherheitsaktivitäten in den gesamten Entwicklungsprozess. Man prüft nicht nur, ob die Software die erwünschten Funktionen erfüllt, sondern auch, wie sie missbraucht werden könnte.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Vorbeugen",
                    "text": "Sicherheitsziele, Entwurf und Implementierung"
                  },
                  {
                    "title": "Prüfen",
                    "text": "Fehler gezielt suchen und korrigieren"
                  },
                  {
                    "title": "Betreiben",
                    "text": "Überwachen, aktualisieren und auf Vorfälle reagieren"
                  }
                ]
              }
            },
            {
              "callout": {
                "tone": "warn",
                "title": "Restrisiko bleibt",
                "text": "Auch ein SDL kann neue Angriffsmöglichkeiten oder übersehene Fehler nicht ausschliessen. Patching, geeignete zusätzliche Schutzschichten und Monitoring bleiben wichtig."
              }
            },
            "Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 21–22 (inkl. Notizen)"
          ],
          "remember": "SDL ist die Grundlage; ergänzende Abwehr und Betrieb behandeln das Restrisiko."
        },
        {
          "type": "checkpoint",
          "id": "cp-approaches",
          "title": "Checkpoint: Secure Development Approaches",
          "questions": [
            {
              "id": "pentest",
              "type": "single",
              "prompt": "Which describes the problematic penetrate-and-patch strategy here?",
              "options": [
                "Release without adequate preventive security work, then repair discovered defects.",
                "Integrate security into each phase.",
                "Use security testing as one activity within an SDL."
              ],
              "correct": 0,
              "explanation": "Kritisiert wird das allein reaktive Vorgehen, nicht jeder Sicherheitstest. Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 19–22 (inkl. Notizen)"
            },
            {
              "id": "layers",
              "type": "multi",
              "prompt": "Which statements are justified?",
              "options": [
                "A WAF can complement secure development.",
                "An SDL guarantees zero vulnerabilities.",
                "Monitoring remains useful after release.",
                "Patches still matter with an SDL."
              ],
              "correct": [
                0,
                2,
                3
              ],
              "explanation": "SDL senkt Risiken, beseitigt sie aber nicht vollständig. Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 19–22 (inkl. Notizen)"
            },
            {
              "id": "lifecycle",
              "type": "type",
              "prompt": "What is the three-letter abbreviation for Secure Development Lifecycle?",
              "accept": [
                "SDL",
                "Secure Development Lifecycle",
                "Secure Development Life Cycle"
              ],
              "explanation": "SDL integriert Sicherheitsaktivitäten während der Entwicklung. Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 19–22 (inkl. Notizen)"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Bug, Design Flaw, Defect: nach der Ursache fragen",
          "body": [
            {
              "compare": {
                "left": {
                  "title": "Security Bug",
                  "points": [
                    "Fehler bei der Implementierung",
                    "Ein korrekt geplanter Längencheck wurde nicht programmiert.",
                    "Code Review kann solche Fehler entdecken."
                  ]
                },
                "right": {
                  "title": "Security Design Flaw",
                  "points": [
                    "Fehler bereits im Entwurf",
                    "Das Konzept sieht für bestimmte Zugriffe keine Berechtigungsprüfung vor.",
                    "Threat Modeling hilft, solche Lücken aufzudecken."
                  ]
                }
              }
            },
            {
              "callout": {
                "tone": "def",
                "title": "Security Defect",
                "text": "Oberbegriff für Bugs und Design Flaws. Dass ein Problem im Code sichtbar ist, beweist noch nicht, dass seine Ursache in der Implementierung liegt."
              }
            },
            "Die Folie nennt ungefähr 50/50 als Verteilung. Lerne daraus, dass Entwurf und Code beide relevant sind; behandle die Zahl nicht als Naturgesetz für jedes Projekt.",
            "Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 24–25 (inkl. Notizen)"
          ],
          "remember": "Entstehungsphase und Ursache bestimmen die Einordnung, nicht der Fundort."
        },
        {
          "type": "slide",
          "title": "Planet Poker: korrekter Algorithmus, unsicherer Entwurf",
          "body": [
            "Im Folienbeispiel wird ein Pseudozufallszahlengenerator mit der Zeit seit Mitternacht initialisiert. Ein solcher Generator arbeitet deterministisch: Kennt man den Startwert, lässt sich seine Folge reproduzieren. Eine leicht eingrenzbare Zeit ist daher ein schlechter geheimer Startwert.",
            {
              "reveal": {
                "question": "Die Implementierung des Generators ist korrekt. Warum kann das Kartenspiel trotzdem unsicher sein?",
                "answer": "Die Entscheidung für einen vorhersagbaren Startwert ist der Entwurfsfehler. Ein korrekt arbeitender Algorithmus kann eine falsche Sicherheitsannahme nicht reparieren.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "callout": {
                "tone": "tip",
                "title": "Eigener Transfer",
                "text": "Dasselbe Denkmuster gilt für Reset-Tokens: Eine lange Darstellung eines Zeitstempels ist nicht automatisch unvorhersagbar."
              }
            },
            "Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 26 (inkl. Notizen)"
          ],
          "remember": "Korrekte Umsetzung eines unsicheren Konzepts bleibt unsicher."
        },
        {
          "type": "checkpoint",
          "id": "cp-defects",
          "title": "Checkpoint: Bugs and Design Flaws",
          "questions": [
            {
              "id": "bounds",
              "type": "single",
              "prompt": "The design requires a bounds check, but the programmer omits it. Classify the root cause.",
              "options": [
                "Security bug",
                "Security design flaw",
                "No security defect"
              ],
              "correct": 0,
              "explanation": "Die Sicherheitsanforderung war vorhanden; ihre Umsetzung ist fehlerhaft. Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 24–26 (inkl. Notizen)"
            },
            {
              "id": "seed",
              "type": "single",
              "prompt": "A correctly implemented PRNG uses a predictable timestamp seed by design. What is the problem?",
              "options": [
                "Only a documentation typo",
                "Security design flaw",
                "Guaranteed unpredictable output"
              ],
              "correct": 1,
              "explanation": "Die unsichere Wahl des Seeds ist Teil des Entwurfs. Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 24–26 (inkl. Notizen)"
            },
            {
              "id": "defects",
              "type": "multi",
              "prompt": "Which claims are correct?",
              "options": [
                "Bugs and design flaws are security defects.",
                "Finding a problem in code proves it is a bug.",
                "Threat modeling can reveal conceptual flaws.",
                "Code review can reveal implementation errors."
              ],
              "correct": [
                0,
                2,
                3
              ],
              "explanation": "Ort der Entdeckung und Ursache des Fehlers sind zu unterscheiden. Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 24–26 (inkl. Notizen)"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Vulnerability, Threat und Exploit sauber trennen",
          "body": [
            {
              "table": {
                "head": [
                  "Begriff",
                  "Bedeutung",
                  "Eigenes Beispiel"
                ],
                "rows": [
                  [
                    "Vulnerability",
                    "Ausnutzbare Schwachstelle",
                    "Eine Reset-Funktion akzeptiert erratbare Tokens."
                  ],
                  [
                    "Threat",
                    "Mögliche Gefahr",
                    "Jemand könnte ein fremdes Konto übernehmen."
                  ],
                  [
                    "Threat agent",
                    "Handelnder Akteur",
                    "Die Person, die das Konto angreifen will."
                  ],
                  [
                    "Exploit",
                    "Konkrete Ausnutzung",
                    "Eine tatsächlich verwendete Folge von Anfragen nutzt das schwache Token aus."
                  ]
                ]
              }
            },
            "Bedrohungen können auch unbeabsichtigt entstehen, etwa durch Feuer. In der Terminologie dieser Vorlesung ist nicht jeder Defect unter allen Randbedingungen ausnutzbar: zusätzliche Schutzmassnahmen und Aufwand beeinflussen die Ausnutzbarkeit.",
            "Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 27 (inkl. Notizen)"
          ],
          "remember": "Schwachstelle, mögliche Gefahr, Akteur und konkrete Ausnutzung sind verschiedene Dinge."
        },
        {
          "type": "slide",
          "title": "Asset, Risiko und Gegenmassnahme",
          "body": [
            "Assets sind Werte: Daten, Systeme, Hardware oder auch die Verfügbarkeit eines Dienstes. Risiko verbindet die Wahrscheinlichkeit eines erfolgreichen Angriffs mit seinen Folgen.",
            {
              "formula": {
                "main": "Risiko ≈ Wahrscheinlichkeit × Auswirkung",
                "note": "Modell der Folie: Für eine Rechnung müssen Zeitraum und Grössen zusammenpassen."
              }
            },
            {
              "reveal": {
                "question": "Eigene vereinfachte Rechnung: 10 % jährliche Wahrscheinlichkeit und CHF 20 000 Schaden. Wie gross ist der erwartete jährliche Verlust? Was ändert eine Massnahme auf 2 %?",
                "answer": "0,10 × 20 000 = CHF 2 000 pro Jahr; danach 0,02 × 20 000 = CHF 400 pro Jahr. Die Differenz ist CHF 1 600 im Modell. Das ist keine Vorhersage, dass in einem einzelnen Jahr genau dieser Verlust eintritt.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "callout": {
                "tone": "def",
                "title": "Countermeasure",
                "text": "Eine technische oder organisatorische Massnahme senkt Wahrscheinlichkeit oder Schaden. Sie muss nicht jedes Risiko auf null setzen."
              }
            },
            "Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 28 (inkl. Notizen)"
          ],
          "remember": "Risiko braucht Wahrscheinlichkeit und Auswirkung; eine Gegenmassnahme kann an beiden ansetzen."
        },
        {
          "type": "slide",
          "title": "Vom Einzelfehler zum begründeten Schutz",
          "body": [
            {
              "flow": {
                "steps": [
                  {
                    "title": "Asset",
                    "text": "Welcher Wert ist betroffen?"
                  },
                  {
                    "title": "Defect / Vulnerability",
                    "text": "Welche Ursache ist unter welchen Bedingungen ausnutzbar?"
                  },
                  {
                    "title": "Threat / Impact",
                    "text": "Was könnte passieren und wie schwer wäre das?"
                  },
                  {
                    "title": "Countermeasure",
                    "text": "Welche Massnahme unterbricht die Kette oder begrenzt den Schaden?"
                  }
                ]
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Ein Notenportal prüft laut Entwurf nur auf der Startseite die Berechtigung, nicht beim Abruf einer einzelnen Note. Begründe zwei sinnvolle Massnahmen.",
                "answer": "Entwurfsfehler: Nicht jeder Zugriff wird autorisiert. Serverseitige Berechtigungsprüfung bei jedem Notenabruf adressiert die Ursache; Protokollierung auffälliger Zugriffe hilft ergänzend bei Erkennung und Untersuchung. Eine WAF allein behebt die fehlende Objektberechtigung nicht.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 24–29 (inkl. Notizen)"
          ],
          "remember": "Eine Massnahme ist überzeugend, wenn ihre Wirkung auf die konkrete Ursache erklärt wird."
        },
        {
          "type": "checkpoint",
          "id": "cp-risk",
          "title": "Checkpoint: Terminology and Risk",
          "questions": [
            {
              "id": "asset",
              "type": "single",
              "prompt": "In the grade-portal case, what is an asset?",
              "options": [
                "The attack script",
                "The valuable grade records",
                "The coding error"
              ],
              "correct": 1,
              "explanation": "Die schützenswerten Notendaten sind der Wert. Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 27–29 (inkl. Notizen)"
            },
            {
              "id": "expected",
              "type": "type",
              "prompt": "Own model: annual probability 0.02, loss CHF 20,000. Expected annual loss in CHF (number only)?",
              "accept": [
                "400",
                "400 CHF",
                "CHF 400",
                "400.00",
                "400,00"
              ],
              "explanation": "0,02 × 20 000 = 400. Zeitraum und Einheiten sind vorgegeben. Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 27–29 (inkl. Notizen)"
            },
            {
              "id": "mitigation",
              "type": "multi",
              "prompt": "Which effects can a countermeasure have?",
              "options": [
                "Reduce probability",
                "Reduce impact",
                "Always eliminate every risk",
                "Remove a vulnerability"
              ],
              "correct": [
                0,
                1,
                3
              ],
              "explanation": "Gegenmassnahmen können Ursachen beseitigen oder Wahrscheinlichkeit beziehungsweise Folgen reduzieren. Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 27–29 (inkl. Notizen)"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Zusatzwissen richtig einordnen",
          "body": [
            "Die Kursübersicht stellt Lehrteam, Forschungsgruppe und Projektbeispiele vor. Für diese Lektion dienen sie der Orientierung. Der Schwerpunkt liegt auf den expliziten fachlichen Lernzielen.",
            "Die CVE-Grafik auf Folie 6 zeigt gemeldete Schwachstellen mit CVE-Kennung bis zum dort genannten Stand Dezember 2025. Sie zählt Meldungen, nicht sämtliche Fehler oder Angriffe. Eine steigende Zahl allein misst nicht die Sicherheit deiner Anwendung.",
            "Die Notizen ergänzen CIA um weitere Ziele wie Privacy, Accountability und Auditability. Die historischen Fallzahlen motivieren das Thema; übe vor allem Mechanismen und passende Gegenmassnahmen.",
            "Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 1–3, 4, 6, 8–17, 18, 23 (inkl. Notizen); OverviewSWS1.pdf, Folien 1–5"
          ],
          "remember": "Historische Zahlen und organisatorische Details sind Kontext; Begriffe und Anwendung tragen die Lektion."
        },
        {
          "type": "slide",
          "title": "Zwei Transferfälle und dein Lernzielcheck",
          "body": [
            {
              "reveal": {
                "question": "Eigener Fall: Ein öffentlicher Fahrplan ist durch einen Angriff eine Stunde nicht erreichbar; alle gespeicherten Zeiten bleiben korrekt. Welche CIA-Aussage kannst du sicher machen?",
                "answer": "Die Verfügbarkeit ist betroffen. Integrität oder Vertraulichkeit sind aus diesen Angaben nicht als verletzt belegt.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Ein Shop kauft eine WAF und streicht alle Security-Aktivitäten aus der Entwicklung. Wie begründest du deinen Widerspruch?",
                "answer": "Die WAF filtert nur einen Teil der Angriffe und braucht passende Konfiguration. Sicherheitsarbeit in Entwurf und Implementierung muss Ursachen verhindern; Tests, Patches und Monitoring ergänzen sie.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "checklist": {
                "title": "Kann ich das erklären und anwenden?",
                "items": [
                  "Ich kann CIA mit einem neuen Beispiel begründen.",
                  "Ich kann Malware-Ausbreitung und Wirkung trennen.",
                  "Ich kann SDL, Patching und WAF in ein gemeinsames Schutzkonzept einordnen.",
                  "Ich kann Bug, Flaw, Defect, Vulnerability, Threat und Exploit unterscheiden.",
                  "Ich kann ein Asset, ein Risiko und eine passende Gegenmassnahme nennen."
                ]
              }
            },
            "Quelle: IntroSoftwareSecurity.pdf, PDF-Seite/Folie 4–5, 19–29 (inkl. Notizen)"
          ],
          "remember": "Begründen können ist wichtiger als die Begriffe nur wiederzuerkennen."
        }
      ]
    },
    {
      id: "w2",
      number: 2,
      title: "Secure Development Lifecycle & Software Security Errors",
      status: "ready",
      items: [
        {
          type: "slide",
          title: "Die Geschichte dieser Woche",
          body: [
            "Woche 2 besteht aus zwei Vorlesungen, die zusammen eine Geschichte erzählen. Die erste beantwortet die Frage **«Wie entsteht sichere Software?»**: nicht durch Flicken am Schluss, sondern durch Security-Aktivitäten in **jeder Phase** der Entwicklung. Die zweite zoomt in zwei dieser Aktivitäten hinein, **Security Design / Controls** und **Secure Coding**, und zeigt, welche Fehler dort typischerweise passieren.",
            { flow: { steps: [
              { title: "Problem", text: "Reaktive Ansätze wie «penetrate and patch» oder Netzwerk-Security-Geräte machen Software nicht sicher" },
              { title: "Antwort: SDL", text: "Security-Aktivitäten in allen Phasen der Entwicklung" },
              { title: "Fehler kennen", text: "Die 7 (+1) Kingdoms ordnen typische Security-Fehler im Code" }
            ], note: "Teil 1: Secure Development Lifecycle. Teil 2: Software Security Errors." } },
            { callout: { tone: "def", title: "Secure Development Lifecycle (SDL)", text: "Ein SDL (auch «Secure Software Development Process») bedeutet: **Security-Aktivitäten werden in den verschiedenen Phasen des Software-Entwicklungsprozesses angewendet.** Beide Begriffe meinen dasselbe: Security wird während der gesamten Entwicklung berücksichtigt." } },
            "Quelle: W2_SecureDevelopmentLifecycle.pdf, Folien 2–4; W2_1_SoftwareSecurityErrors.pdf, Folie 2"
          ],
          remember: "Der einzige Weg zu wirklich sicherer Software: Security während der gesamten Entwicklung, also ein SDL. Die 7 (+1) Kingdoms zeigen, welche Fehler beim Design und Coding passieren."
        },
        {
          type: "slide",
          title: "Die Landkarte: Phasen und Security-Aktivitäten",
          body: [
            "Das zentrale Bild der Vorlesung: Unten stehen die Phasen, die es in **jedem** Entwicklungsprozess gibt. Darüber zeigen Pfeile, welche Security-Aktivität in welche Phase gehört. Diese Zuordnung musst du auswendig können.",
            { table: {
              caption: "Phasen und zugehörige Security-Aktivitäten (eigener Nachbau von Folie 5)",
              head: ["Phase", "Security-Aktivität(en)"],
              rows: [
                ["Requirements and Specification", "Security Requirements, Threat Modeling"],
                ["Architecture and Design", "Threat Modeling, Security Design / Controls"],
                ["Implementation", "Secure Coding, Code Review"],
                ["Testing", "Penetration Testing"],
                ["Operations", "Security Operations"],
                ["über alle Phasen", "Security Risk Analysis"]
              ],
              marks: { "5,1": "focus", "0,1": "focus", "1,1": "focus" },
              note: "Threat Modeling hat zwei Pfeile: in Requirements und in Architecture and Design. Security Risk Analysis ist die einzige horizontale Aktivität."
            } },
            { callout: { tone: "warn", title: "Typischer Fehler", text: "Code Review gehört zur **Implementation**, nicht zum Testing. Im Testing steht nur Penetration Testing." } },
            "Quelle: W2_SecureDevelopmentLifecycle.pdf, Folie 5"
          ],
          remember: "Req: Security Requirements + Threat Modeling. Design: Threat Modeling + Security Design/Controls. Impl: Secure Coding + Code Review. Test: Pentest. Ops: Security Operations. Über alles: Security Risk Analysis."
        },
        {
          type: "slide",
          title: "Kein neuer Prozess: Wasserfall, iterativ, agil",
          body: [
            "Das Bild mit den fünf Kästen sieht aus wie ein Wasserfall. Das ist **irreführend**. Die Security-Aktivitäten hängen an den **einzelnen Phasen**, nicht am Gesamtprozess. Security Requirements «interessiert» nur die Requirements-Phase, egal wie oft und in welcher Reihenfolge die anderen Phasen laufen.",
            { compare: {
              left: { title: "Wasserfall", points: ["Jede Phase einmal", "Jede Security-Aktivität einmal", "Mit den funktionalen Requirements werden gleich die vollständigen Security Requirements formuliert"] },
              right: { title: "Iterativ / agil", points: ["Phasen wiederholt", "Security-Aktivitäten wiederholt, jeweils nur «so weit sinnvoll» in der Iteration", "Neue funktionale Requirements in einer späteren Iteration ergeben neue Security Requirements"] },
              verdict: "Du nimmst deinen Lieblingsprozess und machst ihn zum SDL, indem du die Security-Aktivitäten passend anwendest."
            } },
            { callout: { tone: "exam", title: "Kernsatz der Vorlesung", text: "Der SDL-Ansatz ist **kein neuer Entwicklungsprozess**. Er ist eine Menge von Security-Aktivitäten, die sich auf praktisch jeden bestehenden Prozess anwenden lässt, weil die Phasen überall vorkommen (eventuell unter anderen Namen)." } },
            "Beispiel Unified Process: Security Requirements entstehen in den Iterationen, in denen auch normale Requirements definiert werden (v. a. Inception und Elaboration). Threat Modeling läuft mit, solange das Design wächst, und konzentriert sich jeweils auf die neuen Komponenten. Code Reviews begleiten die Code-Entwicklung.",
            "Quelle: W2_SecureDevelopmentLifecycle.pdf, Folien 6–7"
          ],
          remember: "SDL = Security-Aktivitäten pro Phase, unabhängig vom Prozessmodell. Wasserfall: je einmal. Iterativ/agil: wiederholt, so weit in der Iteration sinnvoll."
        },
        {
          type: "checkpoint",
          id: "cp-sdl-basics",
          title: "Checkpoint: SDL Basics",
          questions: [
            {
              id: "phase-order",
              type: "order",
              prompt: "Put the typical development phases in the order shown in the SDL overview.",
              items: ["Requirements and Specification", "Architecture and Design", "Implementation", "Testing", "Operations"],
              explanation: "Diese fünf Phasen kommen laut Vorlesung in jedem Entwicklungsprozess vor, auch wenn sie anders heissen. Die Reihenfolge ist die von Folie 5."
            },
            {
              id: "review-phase",
              type: "single",
              prompt: "In which phase is the security activity Code Review applied?",
              options: ["Implementation", "Testing", "Architecture and Design", "Operations"],
              correct: 0,
              explanation: "Code Review gehört zusammen mit Secure Coding zur Implementation. Im Testing steht Penetration Testing, das das laufende System angreift."
            },
            {
              id: "sdl-statements",
              type: "multi",
              prompt: "Which statements about the SDL approach used in this module are correct?",
              options: [
                "It is a set of security activities applied to the individual phases of a development process",
                "It can be applied to waterfall, iterative and agile processes alike",
                "It replaces the existing development process with a new, security-specific process",
                "In iterative or agile processes, the security activities are carried out repeatedly, to the degree that is reasonable in each iteration",
                "In a waterfall process, the security requirements are only defined after the implementation is complete"
              ],
              correct: [0, 1, 3],
              explanation: "Das SDL ersetzt keinen Prozess, es ergänzt jede Phase um Security-Aktivitäten. Im Wasserfall werden die Security Requirements zusammen mit den funktionalen Requirements am Anfang formuliert, nicht nach der Implementation."
            },
            {
              id: "horizontal",
              type: "type",
              prompt: "Which security activity is the horizontal one that spans all phases and complements the other activities?",
              accept: ["Security Risk Analysis", "Risk Analysis", "Security Risk Assessment", "Risikoanalyse", "Sicherheitsrisikoanalyse"],
              placeholder: "Name der Aktivität",
              explanation: "Security Risk Analysis ist der waagrechte Pfeil unter allen Phasen. Sie bewertet die Probleme, die andere Aktivitäten finden."
            }
          ]
        },
        {
          type: "slide",
          title: "Security Requirements: das Fundament",
          body: [
            "Security Requirements sind die **erste** Security-Aktivität. Sie sind so wichtig wie funktionale Requirements: Was hier vergessen geht, wird höchstwahrscheinlich nie als Schutzmassnahme eingebaut.",
            "Zu Beginn leitet man sie aus den **funktionalen Requirements** und mit **Checklisten** ab, um «offensichtliche Basis-Requirements» zu bekommen:",
            { cards: [
              { title: "Kreditkartendaten vom Client zum Server", text: "→ Kommunikation über einen kryptografisch geschützten Kanal" },
              { title: "Unterschiedliche Bereiche für unterschiedliche Benutzer", text: "→ Access-Control-Mechanismus, Autorisierung bei **jedem einzelnen** Zugriff prüfen" }
            ] },
            "Diese ersten Requirements **reichen nicht**. Wichtige Requirements lassen sich kaum aus Funktionen ableiten und stehen auf keiner generischen Checkliste. Deshalb liefert **Threat Modeling** zusätzliche Security Requirements.",
            { callout: { tone: "exam", title: "Spezifisch, aber technologieneutral", text: ["Ein Security Requirement soll klar verständlich sein, aber **nicht festlegen, wie** es technisch umgesetzt wird. Das Wie hängt von späteren Technologieentscheiden ab (Architektur, Frameworks, Sprachen).", "In der Praxis sind Requirements manchmal etwas zu spezifisch, wenn die Technologie schon feststeht. Das schadet meist wenig, die Empfehlung bleibt aber: technologieneutral formulieren."] } },
            { callout: { tone: "warn", title: "Früh definieren", text: "Fehlt das Access-Control-Requirement vor dem Design, baut jeder Entwickler seine eigene Lösung, und das endet fast garantiert in Sicherheitsproblemen. Fehlt das Requirement «Admin-Bereich isolieren», entsteht eine einzige Web-App, und das spätere Aufteilen kostet ein teures Reengineering." } },
            "Quelle: W2_SecureDevelopmentLifecycle.pdf, Folien 9–10 und 14 (Notizen)"
          ],
          remember: "Security Requirements: erste Aktivität, anfangs aus funktionalen Requirements und Checklisten, dann ergänzt durch Threat Modeling. Spezifisch, aber ohne technische Umsetzungsdetails, und früh definieren."
        },
        {
          type: "slide",
          title: "Threat Modeling: denken wie der Angreifer",
          body: [
            "Threat Modeling prüft, ob die bisher definierten Security Requirements und Security Controls **gut genug** sind, um das nötige Sicherheitsniveau zu erreichen. Gesucht werden **Security Design Flaws**, also konzeptionelle Lücken, nicht Implementierungsfehler.",
            { flow: { steps: [
              { title: "Angreifer-Sicht", text: "Was wären meine Ziele, wie erreiche ich sie?" },
              { title: "Threats", text: "Mögliche Bedrohungen gegen das System identifizieren" },
              { title: "Vulnerabilities", text: "Schwachstellen im aktuellen Design finden" },
              { title: "Neue Requirements", text: "Ergebnis an Security Requirements zurückgeben" }
            ] } },
            { reveal: {
              question: "Beispiel aus den Folien: Als Threat wird «unberechtigter Zugriff auf den Admin-Bereich» identifiziert. Weder Requirements noch Controls verlangen eine Zugriffskontrolle bei jedem Zugriff. Was folgt daraus?",
              answer: ["Das ist eine Vulnerability, genauer ein **Security Design Flaw**.", "Um sie zu beheben, wird ein entsprechendes Security Requirement definiert. Streng genommen ist das wieder die Aktivität Security Requirements. Deshalb laufen die beiden Aktivitäten in der Praxis Hand in Hand."]
            } },
            { callout: { tone: "tip", title: "Nicht nur Angriffe, auch Angreifer", text: "Welche Angriffe zu erwarten sind, hängt von den Fähigkeiten realistischer Angreifer ab. Wo viel Geld zu holen ist (z. B. Finanztransaktionen), muss man mit starken Angreifern und raffinierten Angriffen rechnen." } },
            "Threat Modeling ist **mächtig und kritisch** zugleich: Nur Threats, die erkannt werden, werden wahrscheinlich auch durch passende Requirements und Controls verhindert. Wird es schlecht gemacht, fehlen ganze Angriffsklassen, und niemand merkt es.",
            "Quelle: W2_SecureDevelopmentLifecycle.pdf, Folie 11 mit Notizen"
          ],
          remember: "Threat Modeling: Angreifer-Sicht, Threats, Vulnerabilities im Design, daraus neue Security Requirements. Ziel sind Design Flaws, nicht Implementierungsbugs."
        },
        {
          type: "slide",
          title: "Security Design / Controls: vom Was zum Wie",
          body: [
            "Security Design / Controls umfasst alle **konkreten Sicherheitsmassnahmen**. Das Ziel: für jedes Security Requirement passende Mechanismen festlegen. Beispiel: Aus «Strong user authentication must be used» wird «Zwei-Faktor-Authentisierung mit Passwort und Fingerabdruck».",
            { flow: { steps: [
              { title: "Threat Modeling", text: "wichtige Basis für" },
              { title: "Security Requirements", text: "wichtige Basis für" },
              { title: "Security Design / Controls" }
            ], note: "Die drei Aktivitäten sind eng verknüpft. Erste Requirements entstehen auch «allein», alle relevanten aber nur mit Threat Modeling." } },
            "Je nach Requirement hat die Entscheidung einen ganz unterschiedlichen Einfluss auf die Architektur. Die drei Beispiele der Vorlesung zeigen die Spannweite:",
            { table: {
              caption: "Drei Requirements, drei Grössenordnungen von Architektur-Einfluss",
              head: ["Requirement", "Control-Entscheid (Kurzform)", "Einfluss"],
              rows: [
                ["Buffer Overflows verhindern (C)", "Längen prüfen, `strncpy`, Canaries, ASLR", "keiner"],
                ["Access Control bei jedem Zugriff", "Spring Security, rollenbasiert", "klein"],
                ["Admin-Bereich isolieren", "Eigene Admin-App, nur Admin-Netz/VPN", "gross"]
              ],
              marks: { "0,2": "good", "1,2": "warn", "2,2": "bad" },
              note: "Buffer Overflows: nur Richtlinien zum Coden, Kompilieren und Ausführen (Pufferlänge vor dem Schreiben prüfen, `strncpy` statt `strcpy`, Stack Canaries und ASLR einschalten). Access Control: Control der gewählten Technologie nutzen. Admin-Bereich: separate Web-App, die nur die Datenbank teilt, erreichbar nur aus dem internen Admin-Netz oder per VPN, also auch Firewalls und VPN betroffen."
            } },
            "Das zweite Beispiel zeigt, warum Requirements technologieneutral sein sollen: Ob Spring Security passt, entscheidet erst diese Aktivität, wenn die Technologie bekannt ist.",
            "Quelle: W2_SecureDevelopmentLifecycle.pdf, Folien 12–14 mit Notizen"
          ],
          remember: "Threat Modeling → Security Requirements → Security Design/Controls. Controls setzen Requirements um, mit Einfluss von «keiner» (Coding-Richtlinien) bis «gross» (eigene Admin-App, VPN)."
        },
        {
          type: "checkpoint",
          id: "cp-early-activities",
          title: "Checkpoint: Requirements, Threat Modeling, Design",
          questions: [
            {
              id: "basis-chain",
              type: "order",
              prompt: "Order the activities so that each one is an important basis for the next one.",
              items: ["Threat Modeling", "Security Requirements", "Security Design / Controls"],
              explanation: "Die Notiz zu Folie 12 fasst zusammen: Threat Modeling ist eine wichtige Basis für die Security Requirements, und diese sind die Basis für Security Design / Controls. Erste Requirements entstehen zwar schon vorher aus funktionalen Requirements, vollständig werden sie aber erst durch Threat Modeling."
            },
            {
              id: "tech-agnostic",
              type: "single",
              prompt: "A team writes the security requirement: «All controllers must use Spring Security's role-based access control.» What is the main issue according to the lecture?",
              options: [
                "It predetermines the technical solution, which should be left to the security design / controls activity",
                "It is too vague, because it does not say which roles exist and which users get them",
                "Access control does not belong into security requirements at all",
                "Access control requirements can only be verified by penetration testing, so they should be defined there"
              ],
              correct: 0,
              explanation: "Requirements sollen spezifisch, aber technologieneutral sein. Wie Access Control umgesetzt wird, entscheidet Security Design / Controls, wenn die Technologie bekannt ist. Das richtige Requirement wäre: Access-Control-Mechanismus, Autorisierung bei jedem Zugriff prüfen."
            },
            {
              id: "tm-statements",
              type: "multi",
              prompt: "Which statements describe threat modeling correctly?",
              options: [
                "You look at the system from the attacker's point of view",
                "Its focus is on security design flaws, not on implementation bugs",
                "Identified vulnerabilities lead to additional security requirements",
                "It is mainly done by running automated scanners against the running system",
                "Realistic attackers and their capabilities should be considered as well"
              ],
              correct: [0, 1, 2, 4],
              explanation: "Scanner gegen das laufende System gehören zu Penetration Testing. Threat Modeling arbeitet auf dem Design, aus Angreifer-Sicht, und berücksichtigt auch, wie stark realistische Angreifer sind."
            },
            {
              id: "admin-impact",
              type: "single",
              prompt: "Requirement: «Administrative areas must be isolated from public and customer areas as much as possible.» The chosen control is a separate admin web application reachable only via the internal admin network or VPN. How large is its impact on the architecture?",
              options: [
                "Major impact on architecture and design, including networking",
                "No impact, it only consists of coding guidelines",
                "Small impact, because a framework control is simply switched on",
                "No impact, because it is only verified during penetration testing"
              ],
              correct: 0,
              explanation: "Das ist das dritte Beispiel der Vorlesung mit dem grössten Einfluss: eigene Applikation plus Firewalls und VPN. Deshalb muss so ein Requirement früh feststehen, sonst droht teures Reengineering."
            },
            {
              id: "first-activity",
              type: "type",
              prompt: "Which security activity is described as the first security-related activity that is carried out?",
              accept: ["Security Requirements", "Security Requirement", "Security Requirements Engineering", "Sicherheitsanforderungen"],
              placeholder: "Name der Aktivität",
              explanation: "Security Requirements sind die erste Aktivität (Folie 9). Sie werden später durch Ergebnisse aus dem Threat Modeling ergänzt."
            }
          ]
        },
        {
          type: "slide",
          title: "Secure Coding und Code Review",
          body: [
            "**Secure Coding** hat zwei Aspekte: die festgelegten Security Controls **korrekt implementieren**, sodass sie zur Laufzeit wirklich greifen, und **keine Security Bugs** einbauen, weder in den Controls noch sonst (z. B. Buffer Overflows). Ein super Authentisierungskonzept nützt wenig, wenn die Implementierung Lücken hat.",
            "Secure Coding ist vor allem «vorsichtig sein» (sich fragen, was schiefgehen könnte) und die eigene Technologie verstehen. Dazu kommen Hilfsmittel: Secure-Coding-Checklisten, Compiler-Sicherheitsfeatures und **nie Compiler-Warnungen ignorieren**.",
            "**Code Review** heisst, den Code nach Security-Problemen zu durchsuchen. Ziel sind Security Bugs aus der Implementierung. Das führt zur wichtigsten Zahl dieser Vorlesung:",
            { compare: {
              left: { title: "Security Bugs (ca. 50 %)", points: ["Entstehen bei der Implementierung", "Im Code sichtbar", "Gute Code Reviews finden bis ca. 50 % aller Security-Probleme"] },
              right: { title: "Security Design Flaws (ca. 50 %)", points: ["Konzeptionelle Fehler im Design", "Durch Code-Lesen praktisch nicht zu finden", "Sollen im Threat Modeling aufgedeckt werden"] },
              verdict: "Code Review deckt höchstens die Hälfte ab. Für die andere Hälfte braucht es Threat Modeling."
            } },
            "Code Reviews laufen meist mit **automatisierten Analyse-Tools**. Manuelles Review lohnt sich für sehr sicherheitskritische Teile, ist für grosse Codemengen aber zu teuer.",
            "Quelle: W2_SecureDevelopmentLifecycle.pdf, Folien 15–16"
          ],
          remember: "Secure Coding: Controls korrekt umsetzen und keine Bugs einbauen. Code Review findet Implementierungsbugs, ca. 50 % der Probleme. Die anderen ca. 50 % sind Design Flaws, die man nur mit Threat Modeling findet."
        },
        {
          type: "slide",
          title: "Pentest, Security Operations, Risk Analysis",
          body: [
            { cards: [
              { title: "Penetration Testing", text: "Angreifer-Sicht auf das **laufende** System: Schwachstellen finden und ausnutzen. Zwei Zwecke im SDL: prüfen, ob die Security Requirements erfüllt sind, und prüfen, dass beim Programmieren keine Security Bugs entstanden sind. Tools helfen, sind aber schwächer als ein guter menschlicher Pentester." },
              { title: "Security Operations", text: "Alles Sicherheitsrelevante im Betrieb: Patching, Backups, System- und Netzwerk-Monitoring. Monitoring, um Angriffsversuche und verwundbare Bereiche zu erkennen (zurück an die Entwicklung) und um eine Kompromittierung zu entdecken, falls präventive Massnahmen versagen." },
              { title: "Security Risk Analysis", text: "Horizontale Aktivität: bewertet das Risiko der Probleme, die andere Aktivitäten finden (z. B. im Threat Modeling oder Pentest). Tiefes Risiko: man kann bewusst nichts tun. Hohes Risiko: wirksame Gegenmassnahmen umsetzen.", tone: "warn" }
            ] },
            { callout: { tone: "tip", title: "Merkhilfe", text: "Ist ein wertvolles System erst einmal in Betrieb, kommen Angriffsversuche fast garantiert. Ohne Monitoring merkst du eine Kompromittierung kaum." } },
            "Quelle: W2_SecureDevelopmentLifecycle.pdf, Folien 17–19"
          ],
          remember: "Pentest: Requirements erfüllt? Keine Bugs? Security Operations: Patching, Backups, Monitoring. Risk Analysis: Risiko bewerten, dann entscheiden, ob und was getan wird."
        },
        {
          type: "checkpoint",
          id: "cp-late-activities",
          title: "Checkpoint: Coding, Testing, Operations",
          questions: [
            {
              id: "fifty-percent",
              type: "type",
              prompt: "Approximately what share of all software security problems are security bugs introduced during implementation, i.e. what good code review can uncover at most? Answer in percent.",
              accept: ["50", "50%", "50 %", "50 percent", "ca. 50%", "about 50%", "approx. 50%", "~50%", "half", "die Hälfte"],
              placeholder: "Zahl in Prozent",
              explanation: "Etwa 50 % sind Implementierungsbugs. Die anderen etwa 50 % sind Security Design Flaws, die man im Code praktisch nicht sieht und die ins Threat Modeling gehören."
            },
            {
              id: "pentest-purposes",
              type: "multi",
              prompt: "In the context of an SDL, which two purposes does a penetration test serve?",
              options: [
                "Verify whether the security requirements are fulfilled in the implemented system",
                "Check that no security bugs were introduced during programming",
                "Uncover all security design flaws before the architecture is defined",
                "Replace threat modeling, because it attacks the real system"
              ],
              correct: [0, 1],
              explanation: "Pentests laufen gegen das fertige, laufende System. Zu diesem Zeitpunkt ist die Architektur längst festgelegt. Threat Modeling ersetzen sie nicht, die Aktivitäten ergänzen sich."
            },
            {
              id: "design-flaw-activity",
              type: "single",
              prompt: "A web application has no consistent access control concept at all, so every developer implements checks differently. Which activity was designed to prevent such a problem before any code is written?",
              options: ["Threat modeling together with security requirements", "Code review", "Penetration testing", "Security operations"],
              correct: 0,
              explanation: "Ein fehlendes Konzept ist ein Security Design Flaw. Den findet man im Threat Modeling und behebt ihn mit einem Security Requirement. Code Review und Pentest kommen erst nach der Implementierung."
            },
            {
              id: "monitoring-reasons",
              type: "multi",
              prompt: "Why should a fielded system be monitored according to the lecture?",
              options: [
                "To learn about attack attempts and possibly vulnerable areas",
                "To feed this information back into the development process",
                "To detect a system compromise if preventive measures fail",
                "To make patching unnecessary",
                "To replace the security risk analysis"
              ],
              correct: [0, 1, 2],
              explanation: "Monitoring liefert Wissen über Angriffe (zurück an die Entwicklung) und erkennt Kompromittierungen. Patching gehört selbst zu Security Operations und wird dadurch nicht überflüssig."
            },
            {
              id: "low-risk",
              type: "single",
              prompt: "Risk analysis rates a vulnerability found in a penetration test as low risk. Which option does the lecture explicitly allow?",
              options: ["Deciding to do nothing about it", "Stopping the release until it is fixed", "Repeating the whole threat model from scratch", "Moving it to the next code review"],
              correct: 0,
              explanation: "Genau dafür bewertet man Risiken: Tiefes Risiko darf man bewusst akzeptieren, bei hohem Risiko braucht es wirksame Gegenmassnahmen."
            }
          ]
        },
        {
          type: "slide",
          title: "Ein SDL schrittweise einführen",
          body: [
            "Man muss nicht alle Aktivitäten auf einmal einführen. Die Vorlesung schlägt Einstiegspunkte vor:",
            { flow: { steps: [
              { title: "Code Reviews", text: "Guter Start, findet bis ca. 50 % der Probleme" },
              { title: "Threat Modeling", text: "Sinnvoller nächster Schritt, deckt auch Design Flaws ab" },
              { title: "… weitere Aktivitäten", text: "Pentests gehen auch für sich allein und geben sofort Feedback zur «realen» Sicherheit" }
            ] } },
            { callout: { tone: "exam", title: "Langfristiges Ziel", text: "Jede zusätzliche Aktivität erhöht die Sicherheit. Langfristig sollen aber **alle** Aktivitäten eingesetzt werden, weil sie sich **ergänzen**. Ohne Threat Modeling fehlt wahrscheinlich Schutz gegen realistische Angriffe, ohne Pentest fehlt echtes Feedback über das System im Betrieb." } },
            "Quelle: W2_SecureDevelopmentLifecycle.pdf, Folie 21 mit Notiz"
          ],
          remember: "Schrittweise einführen ist okay (z. B. erst Code Review, dann Threat Modeling). Ziel bleibt: alle Aktivitäten, weil sie sich ergänzen."
        },
        {
          type: "slide",
          title: "Fixing Earlier is Better",
          body: [
            "Wie bei funktionalen Fehlern gilt: Je früher ein Security-Defekt gefunden und behoben wird, desto **billiger**. Die Grafik in der Vorlesung (aus McGraw, *Software Security*) zeigt die Kosten pro Defekt nach Phase: Requirements und Design fast nichts, Coding wenig, Testing und vor allem Maintenance mit Abstand am teuersten.",
            { callout: { tone: "warn", title: "Gilt vor allem für Design-Probleme", text: "Ein einfacher Programmierfehler ist meist auch spät billig zu beheben. Teuer wird es bei **grundlegenden Design-Fehlern**: Stellt sich spät heraus, dass die Access Control ungeeignet ist, betrifft der Umbau viele Komponenten und grosse Teile des Codes." } },
            { compare: {
              left: { title: "Frühe Aktivitäten", points: ["Security Requirements, Threat Modeling, Security Design / Controls", "**Verhindern** Probleme", "Weniger böse Überraschungen und teure Redesigns"] },
              right: { title: "Späte Aktivitäten", points: ["Vor allem Code Review und Penetration Testing", "**Entdecken** Probleme", "Testing-orientiert"] }
            } },
            "Die Realität sieht oft anders aus: Security kommt erst am Schluss, z. B. ein Pentest kurz vor dem Release, manchmal nur, um bei einem Vorfall die externen Tester beschuldigen zu können («Cover your Ass Security»). Findet der Pentest ernste Design-Probleme, gibt es meist **Quick Fixes** ohne echte Lösung. Das Problem taucht anderswo oder als Variante wieder auf, und man ist zurück im **Penetrate-and-Patch**-Zyklus.",
            { reveal: { question: "Ist ein Pentest kurz vor dem Release also wertlos?", answer: "Nein. Laut Vorlesung ist nur ein Pentest besser als gar nichts. Für wirklich sichere Software müssen aber auch die frühen Aktivitäten eingesetzt werden." } },
            "Quelle: W2_SecureDevelopmentLifecycle.pdf, Folien 22–23 mit Notizen"
          ],
          remember: "Früh beheben ist billiger, vor allem bei Design-Fehlern. Frühe Aktivitäten verhindern, späte entdecken. Nur ein Pentest am Schluss führt zu Quick Fixes und Penetrate and Patch."
        },
        {
          type: "checkpoint",
          id: "cp-adoption",
          title: "Checkpoint: Adoption and Cost",
          questions: [
            {
              id: "cost-order",
              type: "order",
              prompt: "According to the cost chart, order the phases from cheapest to most expensive for fixing a defect.",
              items: ["Requirements", "Design", "Coding", "Testing", "Maintenance"],
              explanation: "Die Kosten pro Defekt steigen von Phase zu Phase. Testing und Maintenance sind mit Abstand am teuersten (Folie 22)."
            },
            {
              id: "prevent-detect",
              type: "type",
              prompt: "Late activities such as code review and penetration testing detect security problems. What do the early activities do with them instead? (one verb)",
              accept: ["prevent", "prevent them", "they prevent them", "prevention", "verhindern", "vorbeugen"],
              placeholder: "Verb",
              explanation: "Frühe Aktivitäten (Security Requirements, Threat Modeling, Security Design / Controls) verhindern Probleme. Späte Aktivitäten entdecken sie."
            },
            {
              id: "adoption-statements",
              type: "multi",
              prompt: "Which statements about adopting an SDL are correct?",
              options: [
                "There is no need to start applying all security activities at once",
                "Code reviews are a reasonable starting point",
                "Threat modeling is a reasonable next step because it also covers security design flaws",
                "Once code reviews are in place, the other activities add hardly any security",
                "The long-term goal should be to adopt all security activities because they complement each other"
              ],
              correct: [0, 1, 2, 4],
              explanation: "Code Reviews decken nur ca. 50 % ab. Jede weitere Aktivität bringt etwas, und weil sich die Aktivitäten ergänzen, sollen langfristig alle eingesetzt werden."
            },
            {
              id: "late-pentest",
              type: "single",
              prompt: "A company does security only as a penetration test right before release. Serious design problems are found. What typically happens according to the lecture?",
              options: [
                "Quick fixes without solving the underlying problem, which leads back into the penetrate-and-patch cycle",
                "The design is reworked properly, because the pentest report makes the need for a redesign obvious to management",
                "Nothing changes, because design problems found by a penetration test are usually rated as low risk",
                "The release is postponed until threat modeling has been done"
              ],
              correct: 0,
              explanation: "Wenn eine richtige Lösung viel Zeit und Geld kostet, gibt es meist Quick Fixes. Das Problem kommt anderswo oder als Variante zurück: Penetrate and Patch."
            },
            {
              id: "why-design",
              type: "single",
              prompt: "Why does «fixing earlier is better» mainly apply to design problems?",
              options: [
                "Simple programming bugs are usually cheap to fix even late, but changing e.g. an access control design affects many components",
                "Design problems can only be fixed during the requirements phase, so later fixes are impossible",
                "Programming bugs are usually found by compilers, so they hardly ever reach the testing phase",
                "Late fixes are always forbidden after the testing phase"
              ],
              correct: 0,
              explanation: "Ein einzelner Bug ist auch spät meist günstig. Ein ungeeignetes Access-Control-Konzept spät zu ersetzen, betrifft dagegen viele Komponenten und viel Code."
            }
          ]
        },
        {
          type: "slide",
          title: "Teil 2: Finde den Fehler (Übung 1)",
          body: [
            "Jetzt wechseln wir zur zweiten Vorlesung und damit zu **Security Design / Controls** und **Secure Coding**. Sie beginnt mit einer Übung: Eine Server-Methode `list(String directory)` soll den Inhalt eines Verzeichnisses zurückgeben, das der Client über das Netz schickt. Sie darf jedes Verzeichnis auflisten, sonst aber nichts tun.",
            "Kern der Methode: Sie füllt ein Array mit `cmd[0] = \"/bin/sh\"`, `cmd[1] = \"-c\"` und `cmd[2] = \"ls \" + directory` und führt es mit `Runtime.getRuntime().exec(cmd)` aus. Aus `list(\"/etc\")` wird also `/bin/sh -c ls /etc`.",
            { reveal: {
              question: "Wo ist der grosse Security-Fehler, und wie behebt man ihn grundsätzlich?",
              answer: [
                "`directory` wird **gar nicht validiert** und direkt ins ausgeführte Kommando eingebaut. Das ermöglicht **Command Injection**, beschränkt auf die Rechte des laufenden Prozesses.",
                "In `/bin/sh` trennt `;` mehrere Kommandos. Mit `/etc; cat /etc/passwd` wird daraus `/bin/sh -c ls /etc; cat /etc/passwd`, mit `/etc; rm -rf *` werden Dateien gelöscht.",
                "Fix: **saubere Input Validation**."
              ],
              label: "Lösung zeigen"
            } },
            "Quelle: W2_1_SoftwareSecurityErrors.pdf, Folien 2–4"
          ],
          remember: "Nicht validierter Input in einem Shell-Kommando = Command Injection. Mit ; hängt der Angreifer eigene Kommandos an. Fix: Input Validation."
        },
        {
          type: "slide",
          title: "Die 7 (+1) Kingdoms",
          body: [
            "Es gibt sehr viele Arten von Security-Fehlern, aber sie beruhen auf wenigen Grundproblemen. Deshalb lohnt sich eine Klassifikation. Die Vorlesung nutzt **Gary McGraws Taxonomie**: sehr allgemein (nicht nur für eine Domäne wie OWASP), laufend gepflegt, mit überschaubar vielen Hauptklassen.",
            { table: {
              caption: "Die 7 (+1) Kingdoms in der Reihenfolge ihrer Wichtigkeit (Folie 7)",
              head: ["#", "Kingdom", "Kernproblem in einem Satz"],
              rows: [
                ["1", "Input Validation and Representation", "Daten werden vor der Verarbeitung nicht oder falsch geprüft"],
                ["2", "API Abuse", "API falsch benutzt oder falsche Annahmen über sie"],
                ["3", "Security Features", "Security-Funktionen (Krypto, Auth, Access Control) falsch eingesetzt"],
                ["4", "Time and State", "Unvorhergesehene Interaktion paralleler Tasks"],
                ["5", "Error Handling", "Fehler nicht oder falsch behandelt"],
                ["6", "Code Quality", "Schlechter Code macht Schwachstellen wahrscheinlicher"],
                ["7", "Encapsulation", "Grenzen zwischen Benutzern, Programmen und Daten fehlen"],
                ["*", "Environment", "Alles ausserhalb des eigenen Codes, das trotzdem sicherheitskritisch ist"]
              ],
              marks: { "0,1": "focus" }
            } },
            { callout: { tone: "tip", title: "Eigene Merkhilfe (nicht aus den Folien)", text: "**I**n **A**llen **S**ystemen **T**auchen **E**chte **C**ode-**E**rrors **E**rneut auf: Input, API, Security Features, Time and State, Error Handling, Code Quality, Encapsulation, Environment." } },
            "Quelle: W2_1_SoftwareSecurityErrors.pdf, Folien 5–7"
          ],
          remember: "Reihenfolge: Input Validation and Representation, API Abuse, Security Features, Time and State, Error Handling, Code Quality, Encapsulation, dazu * Environment."
        },
        {
          type: "slide",
          title: "Kingdom 1: Input Validation and Representation",
          body: [
            "Das wichtigste Kingdom. **Problem:** Daten, die eine Anwendung erhält, werden vor der Verarbeitung nicht oder nicht korrekt geprüft. Die Daten können von Benutzern, aber auch von anderen Systemen stammen.",
            "**Lösung, im Prinzip einfach:** Alle empfangenen Daten vor der Verarbeitung validieren, also Regeln festlegen und durchsetzen. Beispiel: Ein Benutzername bei der Registrierung muss 8 bis 16 Zeichen lang sein und nur Buchstaben und Ziffern enthalten, sonst wird die Anfrage nicht verarbeitet.",
            { callout: { tone: "warn", title: "Warum «and Representation»?", text: "Dieselben Daten lassen sich unterschiedlich **kodieren (darstellen)**. Ein Angreifer kann seine Angriffsdaten so kodieren, dass nur erlaubte Zeichen vorkommen, und so die Validierung umgehen." } },
            { cards: [
              { title: "Buffer Overflow", text: "Schreiben über einen Puffer hinaus: Programmfluss ändern, Absturz, eigenen Code einschleusen" },
              { title: "Injection", text: "Command, SQL, XML Injection: Systemkommandos oder beliebiges SQL ausführen" },
              { title: "Cross-Site Scripting", text: "JavaScript im Browser eines anderen Benutzers ausführen, z. B. Credentials stehlen, Session übernehmen" },
              { title: "Path Traversal", text: "Beliebige Dateien lesen, z. B. `http://www.host.com/../../../../../../etc/shadow`" }
            ] },
            "Quelle: W2_1_SoftwareSecurityErrors.pdf, Folien 8–9"
          ],
          remember: "Kingdom 1: Input wird nicht (korrekt) geprüft. Lösung: alles validieren. Schwierigkeit: verschiedene Kodierungen. Beispiele: Buffer Overflow, Injection, XSS, Path Traversal."
        },
        {
          type: "slide",
          title: "Kingdom 2: API Abuse",
          body: [
            "API Abuse heisst: Der Programmierer benutzt eine API (Funktion, Methode) **nicht korrekt** oder trifft **falsche Annahmen** über die angebotene Funktionalität.",
            { cards: [
              { title: "Dangerous Functions", text: "Manche Funktionen lassen sich gar nicht sicher verwenden, z. B. `gets` in C. Gar nicht benutzen." },
              { title: "Unchecked Return Values", text: "Rückgabewert ignoriert: Statt eines Objekts kommt `null`, der spätere Zugriff lässt das Programm abstürzen, also ein Verfügbarkeitsproblem." },
              { title: "Wrong Security Assumptions", text: "Falsche Annahme über die Sicherheit einer Funktion, mit potenziell schweren Folgen.", tone: "warn" }
            ] },
            { reveal: {
              question: "Ein Server soll nur ausgewählten Clients dienen. Er macht beim Verbindungsaufbau einen Reverse DNS Lookup (Java `getHostName`, C `gethostbyaddr`) auf die Client-IP und lässt den Client zu, wenn der Hostname (z. B. alice.zhaw.ch) auf der Liste steht. Was ist das Problem?",
              answer: ["DNS ist (meist) **nicht sicher**. Ein Angreifer auf dem Kommunikationskanal kann DNS-Antworten relativ leicht fälschen.", "Der Entwickler hat also eine **falsche Annahme** über die Sicherheit der Reverse-Lookup-Funktion getroffen: API Abuse."]
            } },
            "Quelle: W2_1_SoftwareSecurityErrors.pdf, Folien 10–11"
          ],
          remember: "Kingdom 2: API falsch benutzt oder falsche Annahmen. Dangerous Functions (gets), Unchecked Return Values (null, Absturz), Wrong Security Assumptions (Reverse DNS als Zugriffskontrolle)."
        },
        {
          type: "slide",
          title: "Kingdom 3: Security Features",
          body: [
            "Dieses Kingdom betrifft die **falsche Verwendung von Security-Funktionen**: Kryptografie, sichere Kommunikation, Authentisierung, Access Control.",
            { callout: { tone: "exam", title: "Zwei Kernaussagen", text: ["Keine eigenen Security-Funktionen erfinden (ausser es ist nötig), sondern Bewährtes verwenden. Bei Kryptografie scheitert man sehr wahrscheinlich.", "Auch etablierte Algorithmen, Protokolle und Libraries lassen sich leicht **falsch konfigurieren und falsch benutzen**."] } },
            { list: [
              "**Insecure Randomness:** unsichere Pseudozufallsgeneratoren oder sichere mit vorhersagbarem Seed, z. B. schwaches Schlüsselmaterial",
              "**Incomplete Access Control:** nicht konsequent geprüfte Zugriffe lassen Unberechtigte an geschützte Funktionen oder Daten",
              "**Weak Encryption:** auch als sicher geltende Protokolle unterstützen aus Kompatibilitätsgründen alte Algorithmen, z. B. DES, RC4, MD5 in TLS"
            ] },
            { callout: { tone: "warn", title: "Nicht verwechseln", text: "«Security Features» heisst nicht «es fehlt ein Feature». Gemeint sind Fehler bei der **Nutzung** von Security-Funktionen. Ein schwacher Zufallsgenerator gehört hierher, ungeprüfter Input in Kingdom 1." } },
            "Quelle: W2_1_SoftwareSecurityErrors.pdf, Folie 12"
          ],
          remember: "Kingdom 3: Security-Funktionen falsch eingesetzt. Nichts selbst erfinden, Bewährtes richtig konfigurieren. Beispiele: Insecure Randomness, Incomplete Access Control, Weak Encryption."
        },
        {
          type: "checkpoint",
          id: "cp-kingdoms-1-3",
          title: "Checkpoint: Kingdoms 1 to 3",
          questions: [
            {
              id: "exercise1-kingdom",
              type: "single",
              prompt: "Exercise 1 builds the command «ls » + directory and executes it via /bin/sh. An attacker sends «/etc; cat /etc/passwd». To which kingdom does this error belong?",
              options: ["Input Validation and Representation", "API Abuse", "Encapsulation", "Environment"],
              correct: 0,
              explanation: "Der Parameter wird nicht validiert und direkt ins Kommando eingebaut: Command Injection, ein Beispiel für Kingdom 1. Fix laut Folie 4: saubere Input Validation."
            },
            {
              id: "k1-examples",
              type: "multi",
              prompt: "Which of the following are examples of the kingdom Input Validation and Representation?",
              options: ["Buffer overflow", "SQL injection", "Cross-site scripting", "Path traversal", "Empty catch block", "Deadlock"],
              correct: [0, 1, 2, 3],
              explanation: "Alle vier Beispiele von Folie 9 beruhen auf ungeprüftem Input. Ein leerer Catch-Block gehört zu Error Handling, ein Deadlock zu Time and State."
            },
            {
              id: "reverse-dns",
              type: "single",
              prompt: "A server grants access if the host name obtained by a reverse DNS lookup of the client's IP address is on an allow list. Why is this classified as API abuse?",
              options: [
                "The developer wrongly assumes that the lookup result is trustworthy, but DNS responses can be spoofed",
                "getHostName is a dangerous function like gets and can never be used in a secure fashion",
                "The return value of the lookup is not checked for null",
                "Host names can be encoded in different ways, so the allow list check can be bypassed by encoding"
              ],
              correct: 0,
              explanation: "Das ist das Beispiel «Wrong Security Assumptions» von Folie 11: DNS ist meist nicht sicher, ein Angreifer auf dem Kanal kann Antworten fälschen."
            },
            {
              id: "k3-examples",
              type: "multi",
              prompt: "Which problems belong to the kingdom Security Features?",
              options: [
                "Seeding a secure random number generator with a predictable value",
                "Access control that is not performed consistently",
                "A TLS configuration that still supports DES, RC4 or MD5",
                "Ignoring the return value of a function",
                "Storing the user's authorization level in a hidden form field"
              ],
              correct: [0, 1, 2],
              explanation: "Die ersten drei sind die Beispiele von Folie 12. Ein ignorierter Rückgabewert ist API Abuse, das Hidden Field ist Encapsulation."
            },
            {
              id: "representation",
              type: "type",
              prompt: "Input validation can sometimes be bypassed even if only legitimate characters are allowed, because the same data can be ___ in different ways. (one word)",
              accept: ["encoded", "represented", "kodiert", "codiert", "dargestellt", "encoded (represented)"],
              placeholder: "ein Wort",
              explanation: "Dieselben Daten lassen sich verschieden kodieren. Darum heisst das Kingdom «Input Validation **and Representation**»."
            }
          ]
        },
        {
          type: "slide",
          title: "Kingdom 4: Time and State",
          body: [
            "Time-and-State-Probleme entstehen, wenn mehrere Systeme, Prozesse oder Threads **interagieren und Daten teilen**, etwa in verteilten Systemen oder bei Multithreading.",
            { compare: {
              left: { title: "So denkt der Mensch", points: ["Client schickt Daten, Server liest alles, verarbeitet", "Dann kommt der nächste Client", "Alles sequenziell und wohldefiniert"] },
              right: { title: "So arbeitet der Computer", points: ["Tasks laufen (quasi) parallel", "Unvorhergesehene Interaktionen zwischen Tasks", "Genau dort entstehen die Probleme"] }
            } },
            { cards: [
              { title: "Deadlock", text: "Schlechte Nutzung von Locks blockiert alles: Verfügbarkeitsproblem" },
              { title: "TOCTOU", text: "Time of Check – Time of Use: Das Zeitfenster zwischen Prüfen einer Dateieigenschaft und Benutzen der Datei wird ausgenutzt, um mehr Dateirechte zu bekommen" },
              { title: "Session-ID-Wiederverwendung", text: "Dieselbe Session-ID vor und nach dem Login erlaubt es, authentisierte Sessions zu übernehmen" }
            ] },
            "Illustration aus der Vorlesung: Ein altes Gesetz in Kansas verlangte, dass zwei Züge an einer Kreuzung anhalten und keiner losfährt, bis der andere weg ist. Ein perfekter Deadlock.",
            "Quelle: W2_1_SoftwareSecurityErrors.pdf, Folien 13–14"
          ],
          remember: "Kingdom 4: Probleme durch parallele Tasks mit geteilten Daten. Beispiele: Deadlock, TOCTOU-Race-Condition, Session-ID über die Authentisierungsgrenze wiederverwenden."
        },
        {
          type: "slide",
          title: "Kingdom 5: Error Handling",
          body: [
            "Exceptions sind mächtig, aber schwer richtig umzusetzen: Sie führen einen **zweiten Kontrollfluss** ein, mit Sprüngen zwischen Exception Handlern. Deshalb werden Fehler oft falsch oder gar nicht behandelt.",
            { cards: [
              { title: "Leakage of Internal Information", text: "Fehlermeldungen mit internen Details (Systemzustand, fehlgeschlagene DB-Queries) helfen dem Angreifer bei Folgeangriffen" },
              { title: "Empty Catch Block", text: "Ignorierte Exceptions führen zu unerwartetem Verhalten, ähnlich wie ignorierte Rückgabewerte: Absturz, Verfügbarkeitsprobleme" },
              { title: "Overly Broad Catch Block", text: "Z. B. `catch (Exception e)` in Java: Wird der Code später erweitert, «fängt» der alte Block neue Exceptions mit, obwohl sie vielleicht ganz anders behandelt werden müssten", tone: "warn" }
            ] },
            { reveal: { question: "Ein Login zeigt nach falscher Eingabe die komplette fehlgeschlagene SQL-Query an. Welches Kingdom ist direkt betroffen, und warum ist das gefährlich?", answer: "Error Handling (Leakage of Internal Information). Die Query verrät Tabellen- und Spaltennamen und hilft so bei Folgeangriffen, etwa einer SQL Injection (Kingdom 1)." } },
            "Quelle: W2_1_SoftwareSecurityErrors.pdf, Folie 15 mit Notiz"
          ],
          remember: "Kingdom 5: zweiter Kontrollfluss durch Exceptions wird falsch behandelt. Beispiele: Informationsleck in Fehlermeldungen, leerer Catch-Block, zu breiter Catch-Block."
        },
        {
          type: "slide",
          title: "Kingdom 6: Code Quality",
          body: [
            "Schlechte Codequalität erhöht die Wahrscheinlichkeit für Fehler und damit für Schwachstellen. Zwei Ursachen: **unlesbarer Code** (schlechte Namen, zu lange Klassen und Methoden, hohe Kopplung, verletztes Information Hiding, alter Code nicht entfernt) und **fehlende Sorgfalt** (Ressourcen nicht freigegeben, Variablen nicht initialisiert).",
            { cards: [
              { title: "Memory Leak / Exhaustion", text: "Speicher nie freigegeben, explizit (`malloc`/`free` in C) oder implizit (StringBuffer in Java füllen, bis die JVM voll ist): Programmabbruch" },
              { title: "Unreleased Resource", text: "File Handles, Sockets usw. nicht freigegeben: Systemressourcen erschöpft" },
              { title: "Deprecated Code", text: "Veraltete Klassen/Funktionen, teils wegen Security-Defekten, z. B. `gets()` (besser `fgets()`/`getline()`) oder Methoden der Java-Klasse Thread" },
              { title: "Null Dereference", text: "Meist Folgefehler, z. B. weil ein Rückgabewert nicht geprüft wurde: Programmabbruch" },
              { title: "Uninitialized Variable", text: "Unvorhersehbares Verhalten mit möglichen Security-Folgen" }
            ] },
            { callout: { tone: "tip", title: "Warnungen ernst nehmen", text: "Compiler warnen vor Deprecated-Komponenten und nicht initialisierten Variablen. Warnungen nie ignorieren, sie ergeben fast immer Sinn." } },
            { callout: { tone: "warn", title: "gets() taucht zweimal auf", text: "In den Folien steht `gets` als Dangerous Function bei **API Abuse** (Folie 10) und als Deprecated Code bei **Code Quality** (Notiz Folie 17). Beides stimmt: Kommt in einer Frage «deprecated» oder «Compiler-Warnung» vor, ist Code Quality gemeint, bei «kann nie sicher benutzt werden» API Abuse." } },
            "Quelle: W2_1_SoftwareSecurityErrors.pdf, Folien 16–17 mit Notizen"
          ],
          remember: "Kingdom 6: unlesbarer Code und fehlende Sorgfalt. Beispiele: Memory Leak, Unreleased Resource, Deprecated Code, Null Dereference, Uninitialized Variable."
        },
        {
          type: "checkpoint",
          id: "cp-kingdoms-4-6",
          title: "Checkpoint: Kingdoms 4 to 6",
          questions: [
            {
              id: "k4-examples",
              type: "multi",
              prompt: "Which of the following are Time and State issues?",
              options: [
                "Deadlock caused by poor usage of locking mechanisms",
                "A file access race condition between checking and using a file",
                "Re-using the same session ID before and after authentication",
                "Memory that is allocated but never freed",
                "An error message that reveals a failed database query"
              ],
              correct: [0, 1, 2],
              explanation: "Die ersten drei sind die Beispiele von Folie 14. Memory Leak gehört zu Code Quality, die verräterische Fehlermeldung zu Error Handling."
            },
            {
              id: "toctou",
              type: "type",
              prompt: "What is the common abbreviation for the race condition in which an attacker exploits the time window between checking a file property and using the file?",
              accept: ["TOCTOU", "TOCTTOU", "time of check time of use", "time of check - time of use", "time of check – time of use", "time-of-check to time-of-use", "time-of-check-time-of-use"],
              placeholder: "Abkürzung",
              explanation: "TOCTOU steht für Time of Check – Time of Use. Zwischen Prüfung und Verwendung tauscht der Angreifer z. B. die Datei aus und erhält so mehr Rechte."
            },
            {
              id: "broad-catch",
              type: "single",
              prompt: "Why is catching Java's base class Exception in a single catch block considered problematic?",
              options: [
                "If the code is extended later, newly thrown exceptions are silently handled by the existing block, although they may need a very different treatment",
                "Catching the base class Exception is not allowed by the Java compiler and causes a build error",
                "A broad catch block automatically prints the stack trace and thus always leaks internal information",
                "It turns every exception into a deadlock"
              ],
              correct: 0,
              explanation: "Das ist der «Overly Broad Catch Block» aus der Notiz zu Folie 15. Neue Exceptions bekommen nicht die Aufmerksamkeit, die sie bräuchten."
            },
            {
              id: "k6-examples",
              type: "multi",
              prompt: "Which problems are listed under the kingdom Code Quality?",
              options: [
                "Unreleased resources such as file handles or sockets",
                "Using a deprecated function such as gets()",
                "Null dereference",
                "Uninitialized variable",
                "Cross-site request forgery"
              ],
              correct: [0, 1, 2, 3],
              explanation: "CSRF gehört zu Encapsulation. Die anderen vier stehen bei Code Quality (Folie 17 und Notizen)."
            }
          ]
        },
        {
          type: "slide",
          title: "Kingdom 7: Encapsulation und *: Environment",
          body: [
            { compare: {
              left: { title: "7: Encapsulation", points: [
                "Strikte Grenzen zwischen Benutzern, Programmen und Daten, z. B. ein Benutzer einer Web-App sieht nicht die Daten eines anderen",
                "**Hidden Form Fields** falsch genutzt: Wichtige Session-Infos wie die Berechtigungsstufe im Hidden Field kann der Angreifer lesen und z. B. auf «administrator» setzen",
                "**Cross-Site Request Forgery:** beliebige HTTP-Requests in der authentisierten Session eines anderen Benutzers, falls nicht explizit verhindert (z. B. mit benutzerspezifischem Secret / Token)"
              ] },
              right: { title: "*: Environment", points: [
                "Alles **ausserhalb des eigenen Codes**, das trotzdem sicherheitskritisch ist: Compiler, OS, JVM/.NET, Frameworks, Libraries, Netzwerkdienste wie DNS",
                "**Insecure Compiler Optimization:** Der Entwickler überschreibt sensible Daten im Speicher, der Compiler entfernt diese Schreiboperation zur Optimierung",
                "**Web-Frameworks:** zu kurze oder zu wenig zufällige Session-IDs ermöglichen Session-ID-Guessing"
              ] },
              verdict: "Encapsulation: Grenzen in deiner Anwendung. Environment: Probleme in dem, worauf deine Anwendung läuft oder aufbaut."
            } },
            { callout: { tone: "tip", title: "Faustregel zu Hidden Fields", text: "Session-Zustand gehört **nur auf den Server**. Das verhindert die Rechteausweitung über manipulierte Hidden Fields wirksam." } },
            "Quelle: W2_1_SoftwareSecurityErrors.pdf, Folien 18–19 mit Notizen"
          ],
          remember: "Encapsulation: Hidden Fields mit Session-Infos, CSRF. Environment: alles ausserhalb des eigenen Codes, z. B. Insecure Compiler Optimization, schwache Session-IDs im Framework."
        },
        {
          type: "slide",
          title: "Übung 2: Der Timing-Angriff",
          body: [
            "Die Methode `checkPassword` vergleicht ein eingegebenes Passwort mit dem korrekten (`\"zhaw\"`). Ist die Länge falsch, gibt sie sofort `false` zurück. Sonst vergleicht sie Zeichen für Zeichen und gibt beim **ersten falschen Zeichen** `false` zurück. Schwaches Passwort und Klartext im Code zählen hier ausdrücklich nicht als Schwachstelle.",
            { reveal: {
              question: "Wo liegt der sicherheitskritische Fehler, zu welchem Kingdom gehört er, und wie behebt man ihn?",
              answer: [
                "Die **Dauer** der Prüfung hängt davon ab, wie viele Zeichen am Anfang stimmen: Sind die ersten n Zeichen richtig, werden n+1 Zeichen geprüft.",
                "So findet der Angreifer das Passwort **schrittweise von links nach rechts**, viel schneller als mit Brute Force. In der Praxis ist das über das Internet schwierig, lokal oder im LAN aber oft machbar.",
                "Kingdom: **Time and State** (Timing-Problem).",
                "Fix: **immer alle Zeichen** prüfen, dann verschwinden die wesentlichen Zeitunterschiede."
              ],
              label: "Lösung zeigen"
            } },
            { flow: { steps: [
              { title: "a--- … z---", text: "z dauert länger: 1. Zeichen = z" },
              { title: "za-- … zz--", text: "zh dauert länger" },
              { title: "zha- … zhz-", text: "zha dauert länger" },
              { title: "zhaa … zhaz", text: "zhaw wird akzeptiert" }
            ], note: "Ablauf aus Folie 22. Eigene Rechnung bei 26 Kleinbuchstaben: höchstens 4 × 26 = 104 Versuche statt 26⁴ = 456'976 bei Brute Force." } },
            "Quelle: W2_1_SoftwareSecurityErrors.pdf, Folien 21–22"
          ],
          remember: "Abbruch beim ersten falschen Zeichen verrät über die Laufzeit, wie viel stimmt. Kingdom: Time and State. Fix: immer alle Zeichen vergleichen."
        },
        {
          type: "checkpoint",
          id: "cp-kingdoms-7-env",
          title: "Checkpoint: Encapsulation, Environment and the Big Picture",
          questions: [
            {
              id: "kingdom-order",
              type: "order",
              prompt: "Order the seven kingdoms by importance, most important first (without Environment).",
              items: ["Input Validation and Representation", "API Abuse", "Security Features", "Time and State", "Error Handling", "Code Quality", "Encapsulation"],
              explanation: "Das ist die Reihenfolge von Folie 7. Environment ist das «+1» und steht ausserhalb dieser Rangfolge mit einem Stern."
            },
            {
              id: "exercise2-kingdom",
              type: "single",
              prompt: "checkPassword returns false at the first character that does not match. To which kingdom does this security error belong?",
              options: ["Time and State", "Security Features", "Input Validation and Representation", "Code Quality"],
              correct: 0,
              explanation: "Die Laufzeit verrät, wie viele Zeichen stimmen: ein Timing-Problem, laut Folie 22 Kingdom Time and State."
            },
            {
              id: "exercise2-facts",
              type: "multi",
              prompt: "Which statements about exercise 2 (checkPassword) are correct?",
              options: [
                "The fix is to always check all characters of the submitted password",
                "The attack finds the password incrementally from left to right",
                "Exploiting it is often possible locally or within a LAN, but may be difficult over the Internet",
                "The fix is to make the stored password longer",
                "The vulnerability is that the password is stored in plaintext in the code"
              ],
              correct: [0, 1, 2],
              explanation: "Ein längeres Passwort verlangsamt den Angriff nur linear, die Lücke bleibt. Klartext im Code wird in der Übung ausdrücklich nicht als Schwachstelle betrachtet."
            },
            {
              id: "hidden-field",
              type: "single",
              prompt: "A web application stores the user's authorization level (guest, registered, administrator) in a hidden form field and checks it on every request. Which kingdom does this belong to?",
              options: ["Encapsulation", "Security Features", "Environment", "Error Handling"],
              correct: 0,
              explanation: "Hidden Fields stehen bei Encapsulation (Folie 18). Der Angreifer setzt den Wert in jedem Request auf «administrator». Session-Zustand gehört nur auf den Server."
            },
            {
              id: "environment-examples",
              type: "multi",
              prompt: "Which problems belong to the kingdom Environment?",
              options: [
                "The compiler removes the code that overwrites sensitive data in memory",
                "The web application framework generates session IDs that are too short or not random enough",
                "An attacker makes requests in another user's authenticated session (CSRF)",
                "An exception is caught and silently ignored"
              ],
              correct: [0, 1],
              explanation: "Environment betrifft alles ausserhalb des eigenen Codes: Compiler und Frameworks. CSRF ist Encapsulation, der ignorierte Catch-Block Error Handling."
            }
          ]
        },
        {
          type: "slide",
          title: "Nur einordnen: Zusatzwissen",
          body: [
            "Diese Inhalte kommen in den Folien vor, brauchen aber keinen Lernaufwand. Es reicht, sie wiederzuerkennen.",
            { list: [
              "**Konkrete SDL-Prozesse:** Microsoft SDL (bei Microsoft intern seit 2004 Pflicht), BSIMM (Konsortium, Analyse von über 30 Firmen), CLASP und SAMM (beide OWASP, SAMM mit Reifegraden). Sie ähneln sich und unterscheiden sich vor allem in Details wie Checklisten. Das Modul folgt keinem davon, sondern den Aktivitäten.",
              "**Kapitelplan:** Security Requirements und Threat Modeling erst in Kapitel 10, weil sie viel Wissen über Angriffe und Controls voraussetzen. Security Operations ist nicht Teil des Moduls (sondern von SWS2).",
              "**Abgrenzung:** Fokus auf Java, etwas C, Web- und Mobile-Apps, ohne Anspruch auf Vollständigkeit.",
              "**Andere Taxonomien:** OWASP Top Ten, SANS Top-25, The 19 Deadly Sins of Software Security. Online-Version der Kingdoms: vulncat.fortify.com, nach Kingdoms und Kategorien geordnet, mit Beispielen in vielen Sprachen.",
              "**Security Testing vs. Unit Testing:** Security Testing steht heute dort, wo funktionales Testen vor Jahren stand: oft erst spät, meist als Pentest."
            ] },
            "Quelle: W2_SecureDevelopmentLifecycle.pdf, Folien 4 (Notiz), 23 (Notiz), 24–25; W2_1_SoftwareSecurityErrors.pdf, Folien 5, 7 (Notiz), 20"
          ],
          remember: "Prozessnamen, Kapitelplan und weitere Taxonomien nur wiedererkennen."
        },
        {
          type: "slide",
          title: "Transfer und Lernzielcheck",
          body: [
            { reveal: {
              question: "Eigener Transfer: Ein Startup entwickelt agil einen Webshop. Security ist nur als Pentest kurz vor dem Go-live geplant. Was rätst du ihm?",
              answer: ["Aus dem Prozess ein SDL machen: in jeder Iteration passende Security Requirements zu den neuen Features, Threat Modeling für neue Design-Komponenten, Security Controls festlegen, Code Reviews (z. B. automatisiert).", "Begründung: Nur ein Pentest am Schluss findet Design-Probleme zu spät. Dann folgen Quick Fixes und Penetrate and Patch. Schrittweise Einführung ist okay, z. B. zuerst Code Reviews, dann Threat Modeling."],
              label: "Eigene Antwort vergleichen"
            } },
            { reveal: {
              question: "Eigener Transfer: Ein Code-Ausschnitt öffnet eine Datei, schreibt Daten und umschliesst alles mit `try { … } catch (Exception e) { }`. Welche Kingdoms erkennst du?",
              answer: "Error Handling gleich zweimal: Der Catch-Block ist leer (Fehler werden ignoriert) und zu breit (fängt die Basisklasse Exception). Wird die Datei im Fehlerfall nicht geschlossen, kommt Code Quality dazu (Unreleased Resource).",
              label: "Eigene Antwort vergleichen"
            } },
            { reveal: {
              question: "Eigener Transfer: Ein Team findet im Code Review keine Bugs mehr und erklärt die Anwendung für sicher. Was entgegnest du?",
              answer: "Code Review findet höchstens die etwa 50 % Implementierungsbugs. Die anderen etwa 50 % sind Security Design Flaws, die man im Code praktisch nicht sieht. Dafür braucht es Threat Modeling. Und ohne Pentest gibt es kein Feedback zur realen Sicherheit des laufenden Systems.",
              label: "Eigene Antwort vergleichen"
            } },
            { checklist: {
              title: "Kann ich das jetzt?",
              items: [
                "Ich erkläre, was ein SDL ist und warum es kein neuer Entwicklungsprozess ist.",
                "Ich ordne jede Security-Aktivität ihrer Phase zu und erkläre ihren Zweck in einem Satz.",
                "Ich erkläre die Kette Threat Modeling → Security Requirements → Security Design / Controls.",
                "Ich begründe, warum Security Requirements technologieneutral und früh definiert werden.",
                "Ich unterscheide Security Bugs und Security Design Flaws und kenne die 50/50-Aufteilung.",
                "Ich erkläre «Fixing Earlier is Better» und den Penetrate-and-Patch-Zyklus.",
                "Ich nenne die 7 (+1) Kingdoms in der richtigen Reihenfolge.",
                "Ich ordne ein Fehlerbeispiel dem richtigen Kingdom zu und nenne pro Kingdom zwei Beispiele.",
                "Ich erkläre beide Übungen (Command Injection, Timing-Angriff) samt Kingdom und Fix."
              ]
            } },
            "Quelle: W2_SecureDevelopmentLifecycle.pdf, Folien 2 und 26; W2_1_SoftwareSecurityErrors.pdf, Folien 2 und 23"
          ],
          remember: "SDL = Security-Aktivitäten pro Phase, alle ergänzen sich. 7 (+1) Kingdoms = Landkarte der typischen Fehler, die Design und Coding vermeiden müssen."
        }
      ]
    },
    {
      id: "w3",
      number: 3,
      title: "Web Application Security Testing 1: Injection",
      status: "ready",
      items: [
        {
          type: "slide",
          title: "Warum Web-Apps ständig angegriffen werden",
          body: [
            "Web-Anwendungen sind ein Lieblingsziel von Angreifern, und das aus mehreren Gründen gleichzeitig. Es gibt **sehr viele** davon, also lohnt es sich, das Angreifen einmal zu lernen und dann tausendfach anzuwenden. Sie hängen oft an **wertvollen Daten und kritischen Prozessen** wie E-Banking, E-Commerce oder Social Media, wo für den Angreifer echtes Geld winkt. Und die Sicherheit ist häufig **schlecht**, das Angreifen also relativ einfach.",
            "Genau deshalb ist **Security Testing** so wichtig: Es deckt Schwachstellen auf, **bevor** eine Anwendung produktiv geht. Man testet also im eigenen Auftrag die eigene App, so wie ein Prüfer die Schlösser eines Neubaus testet, bevor die Mieter einziehen.",
            "Der Fokus liegt auf Web-Apps, aber viele Probleme (Injection, Authentisierung, Zugriffskontrolle) tauchen genauso in anderen Anwendungen, REST-APIs und Mobile-Apps auf. Was du hier lernst, ist also breit übertragbar."
          ],
          remember: "Security Testing findet Schwachstellen vor dem Produktivgang. Web-Apps sind attraktiv wegen Menge, wertvollen Daten und oft schwacher Sicherheit."
        },
        {
          type: "slide",
          title: "Wie eine Web-App Daten entgegennimmt",
          body: [
            "Der Browser schickt **HTTP-Requests**, die App verarbeitet sie (oft mit Datenbankzugriff) und antwortet mit einer **HTTP-Response**. Fast alle Schwachstellen beruhen darauf, dass Nutzer **Daten an die App schicken**, die dann verarbeitet werden. Und Nutzer heisst hier immer auch: möglicher Angreifer.",
            "Bei klassischen, serverseitig gerenderten Apps kommen die Werte als **Name-Wert-Paare** in **GET**- oder **POST**-Requests: `GET /login?username=Pete&password=tz-2_Vx8` oder dieselben Parameter im Body eines POST. Bei modernen, client-seitig gerenderten Apps (viel JavaScript, REST-APIs) kommen zusätzlich **PUT**, **DELETE** und JSON-Daten dazu, etwa `POST /products` mit `{\"product-id\":3743, \"price\":1295.00}`.",
            "Sicherheitstechnisch ändert das nichts: Sobald ein Request Daten enthält, die der Nutzer frei wählen kann, kann dieser Request für einen Angriff missbraucht werden. Die Beispiele nutzen meist serverseitige Apps, weil es dafür bewusst unsichere Übungsanwendungen gibt, aber alles gilt genauso für APIs und Mobile-Apps."
          ],
          remember: "Fast jede Web-Schwachstelle beruht auf Nutzerdaten, die verarbeitet werden. Egal ob GET/POST-Parameter oder JSON über PUT/DELETE: frei wählbare Daten sind der Angriffsvektor."
        },
        {
          type: "slide",
          title: "OWASP als Orientierung",
          body: [
            "Es gibt keinen offiziellen Standard, der Web-Schwachstellen kategorisiert. Die beste Orientierung liefert **OWASP** (Open Worldwide Application Security Project), eine Community, die Best Practices und Werkzeuge bereitstellt.",
            "Wichtig sind vor allem: die **OWASP Top Ten** (strukturierte Liste der zehn kritischsten Web-Schwachstellen), der **Web Security Testing Guide** (Anleitung zum Testen), der **Application Security Verification Standard** (typische Schutzmassnahmen für Entwickler) und **WebGoat**, eine absichtlich unsichere Übungs-App zum gefahrlosen Üben.",
            "WebGoat ist wie ein Fahrsimulator: Du übst Notbremsungen, ohne dass echte Menschen auf der Strasse sind. Die Beispiele in diesem Kapitel stammen aus WebGoat (meist Version 5), das viele Schwachstellen bewusst offen lässt."
          ],
          remember: "OWASP ist die Referenz. Top Ten = kritischste Schwachstellen, WebGoat = absichtlich unsichere Übungs-App zum legalen Trainieren."
        },
        {
          type: "checkpoint",
          id: "cp-intro",
          title: "Checkpoint: Web App Security Basics",
          questions: [
            {
              id: "why-attacked",
              type: "multi",
              prompt: "Why are web applications such frequent attack targets?",
              options: [
                "There is a huge number of them, so attack skills pay off many times over",
                "They often provide access to valuable data and critical processes",
                "Their security is often poor and attacking them is relatively easy",
                "HTTP cannot be encrypted, so all traffic is always readable",
                "Attackers can reuse the same skills against many applications"
              ],
              correct: [0, 1, 2, 4],
              explanation: "HTTPS can of course encrypt traffic. The other reasons all make web apps attractive targets."
            },
            {
              id: "root-cause",
              type: "single",
              prompt: "Most web application vulnerabilities are based on which fact?",
              options: [
                "Users can submit data to the application, which is then processed",
                "Web servers are always running as root",
                "HTTP is a stateless protocol",
                "Browsers cache responses"
              ],
              correct: 0,
              explanation: "User-controlled data that is processed by the application is the root of most vulnerabilities."
            },
            {
              id: "webgoat",
              type: "type",
              prompt: "Which deliberately insecure OWASP application is used for hands-on security testing training?",
              accept: ["WebGoat", "OWASP WebGoat", "Web Goat"],
              explanation: "WebGoat is intentionally vulnerable so you can practice attacks legally and safely."
            },
            {
              id: "attack-surface",
              type: "multi",
              prompt: "Which requests can potentially be used for attacks?",
              options: [
                "GET requests with parameters in the URL",
                "POST requests with parameters in the body",
                "PUT and DELETE requests carrying JSON data",
                "Only requests that a database is involved in",
                "Any request that includes data the user can choose"
              ],
              correct: [0, 1, 2, 4],
              explanation: "The request type does not matter. As long as the user controls part of the data, the request may be abused."
            }
          ]
        },
        {
          type: "slide",
          title: "Injection: der gemeinsame Nenner",
          body: [
            "**Injection**-Schwachstellen entstehen, wenn eine App Daten annimmt, die anschliessend **interpretiert** werden. Beispiele: Daten in **SQL**-Befehlen (interpretiert vom DBMS), in **OS-Befehlen** (interpretiert vom Betriebssystem) oder in **JSON/XML**-Strukturen (interpretiert von einem Parser).",
            "Die Grundidee ist immer dieselbe: Der Angreifer schmuggelt in ein Datenfeld eigene Steuerzeichen oder Befehle ein, sodass aus **Daten** plötzlich **Code** wird. Wie wenn du in ein Formularfeld «Name» nicht nur deinen Namen schreibst, sondern eine zusätzliche Anweisung, die das System dann ausführt.",
            "Die Auswirkung ist meist **hoch**: Injection erlaubt oft, sensible Daten zu lesen oder zu verändern oder auf das darunterliegende Betriebssystem zuzugreifen. Deshalb steht Injection seit Jahren weit oben in der OWASP Top Ten."
          ],
          remember: "Injection = eingeschleuste Daten werden als Code interpretiert (SQL, OS, JSON/XML). Auswirkung meist hoch: Daten lesen/ändern oder OS-Zugriff."
        },
        {
          type: "slide",
          title: "SQL Injection: der Login-Bypass",
          body: [
            "Klassiker: Eine App prüft Logins mit einer per **String-Verkettung** zusammengebauten Query. Der Entwickler schreibt etwa `\"SELECT * FROM employee WHERE userid=\" + userid + \" AND password='\" + password + \"'\"`. Genau das ist die Wurzel des Problems: Nutzerdaten landen direkt und ungefiltert in der Query.",
            "Meldet sich Neville normal an (`userid=112&password=socks`), entsteht `... WHERE userid=112 AND password='socks'`, es kommt eine Zeile zurück, Login akzeptiert. Ein Brute-Force-Angriff mit geratenen Passwörtern scheitert an einem starken Passwort.",
            "Ein cleverer Angreifer gibt aber als Passwort `' OR ''='` ein. Die Query wird zu `... WHERE userid=112 AND password='' OR ''=''`. In SQL bindet **AND stärker als OR**: Der AND-Teil ist für alle Zeilen falsch, aber `''=''` ist immer wahr, und `FALSE OR TRUE` ist **wahr für alle Zeilen**. Die WHERE-Klausel ist also immer erfüllt, alle Zeilen kommen zurück, und da Nevilles Zeile dabei ist, ist der Login akzeptiert. Der Name «Injection» kommt daher, dass eigener SQL-Code eingeschleust wurde, der die **Bedeutung** der Query verändert hat."
          ],
          remember: "SQLi entsteht durch String-Verkettung von Nutzerdaten in Queries. Login-Bypass mit ' OR ''=' macht die WHERE-Klausel immer wahr (AND bindet stärker als OR)."
        },
        {
          type: "slide",
          title: "Auf SQL Injection testen",
          body: [
            "Wie findet man die Lücke? Der einfachste Test ist ein einzelnes **Hochkomma** (`'`) in Feldern, die vermutlich in Queries landen. Baut die App die Query per Verkettung, entsteht eine **syntaktisch ungültige** Query, die im DBMS einen Fehler auslöst.",
            "Bei `\"... WHERE last_name = '\" + input + \"'\"` und Eingabe `'` entsteht `... WHERE last_name = '''`, drei Hochkommas, das ist kaputt. Zeigt die Antwort dann eine **SQL-Fehlermeldung**, ein kaputtes Layout oder einen **HTTP 500**, ist das ein starkes Indiz für eine SQLi-Schwachstelle. Im Glücksfall zeigt die Antwort sogar die fehlerhafte Query.",
            "Wird kein Fehler durchgereicht, hilft ein zweiter Test: `' OR ''='` (oder `' OR 1=1--`) in ein Suchfeld. Eigentlich gibt es keinen Nutzer mit so einem Nachnamen, trotzdem kommen **alle** Zeilen zurück. Auch das verrät, dass die Query unsicher per Verkettung gebaut wird."
          ],
          remember: "SQLi-Test: ein Hochkomma ' einschleusen und auf DB-Fehler achten (SQL-Fehlermeldung, kaputtes Layout, HTTP 500). Alternativ ' OR 1=1-- : plötzlich kommen alle Zeilen."
        },
        {
          type: "checkpoint",
          id: "cp-sqli-basics",
          title: "Checkpoint: SQL Injection Basics",
          questions: [
            {
              id: "root-cause-sqli",
              type: "single",
              prompt: "What is the usual root cause when a web application is vulnerable to SQL injection?",
              options: [
                "It builds SQL queries with string concatenation using data received directly from the user",
                "It uses a database that is too old",
                "It stores passwords in plaintext",
                "It runs on HTTP instead of HTTPS"
              ],
              correct: 0,
              explanation: "Directly concatenating user input into the query string lets the attacker change the query's meaning."
            },
            {
              id: "why-always-true",
              type: "multi",
              prompt: "For the login the password ' OR ''=' produces WHERE userid=112 AND password='' OR ''=''. Why does this authenticate the attacker?",
              options: [
                "AND has higher precedence than OR, so the AND part is evaluated first",
                "userid=112 AND password='' is FALSE for the rows",
                "''='' is always TRUE",
                "FALSE OR TRUE evaluates to TRUE, so the WHERE clause is true for all rows",
                "The password '' matches Neville's real password"
              ],
              correct: [0, 1, 2, 3],
              explanation: "It has nothing to do with the real password. The injected OR makes the whole clause true for every row."
            },
            {
              id: "probe-char",
              type: "type",
              prompt: "Which single character is inserted into an input field as the classic first probe for an SQL injection vulnerability?",
              placeholder: "one character",
              accept: ["'", "single quote", "quote", "apostrophe", "hochkomma"],
              explanation: "A single quote typically breaks a concatenated query and triggers a DB error."
            },
            {
              id: "error-signs",
              type: "multi",
              prompt: "Which observations are strong indications that an SQL injection vulnerability exists?",
              options: [
                "The response contains an SQL error message",
                "The page layout is broken",
                "An HTTP 500 internal server error is returned",
                "The response is returned faster than usual",
                "A search for a nonexistent name suddenly returns all rows"
              ],
              correct: [0, 1, 2, 4],
              explanation: "Response speed alone says nothing. The others all indicate the input reached the SQL engine."
            }
          ]
        },
        {
          type: "slide",
          title: "Daten auslesen mit UNION",
          body: [
            "Bisher ging es um Login-Bypass. Jetzt will der Angreifer **Daten auslesen**, etwa alle Nutzer und Passwörter. Die Strategie: die vorgegebene SELECT-Query mit einer **zweiten** SELECT-Query kombinieren. Bei den meisten DBMS geht das mit dem Schlüsselwort **UNION**, das die Ergebnismengen zweier SELECTs zusammenführt.",
            "Damit UNION funktioniert, müssen zwei Bedingungen erfüllt sein: Beide SELECTs müssen **gleich viele Spalten** liefern, und die **Datentypen** der Spalten müssen passen (oder implizit konvertierbar sein). Merke: INT lässt sich implizit zu VARCHAR konvertieren, aber nicht umgekehrt.",
            "Der Angriff hat zwei Schritte. **Schritt 1:** Herausfinden, wie viele Spalten die vorgegebene Query liefert. Zeigt die HTML-Tabelle 7 Spalten, testet man `Smith' UNION SELECT 1,2,3,4,5,6,7 FROM user_data WHERE '' = '`. Passt die Spaltenzahl nicht, gibt es einen Fehler, dann probiert man andere Zahlen durch. **Schritt 2:** Den echten Angriff fahren, indem man statt `1,2,3,...` die gewünschten Spalten einsetzt, z.B. `userid,first_name,last_name,password,5,6,7 FROM employee`."
          ],
          remember: "UNION führt zwei SELECT-Ergebnisse zusammen. Bedingungen: gleiche Spaltenzahl und passende Datentypen. Schritt 1: Spaltenzahl finden, Schritt 2: echte Spalten auslesen."
        },
        {
          type: "slide",
          title: "Der Kommentar-Trick und das Schema",
          body: [
            "Das abschliessende `WHERE '' = '` sorgt nur dafür, dass das letzte Hochkomma der vorgegebenen Query aufgeht. Einfacher ist der **SQL-Kommentar** `--`: Alles danach wird vom DBMS ignoriert. Aus `Smith' UNION SELECT ...,7 FROM employee--` wird der Rest der Original-Query samt hängendem Hochkomma einfach weggeschnitten.",
            "In der Realität kennt der Angreifer die Tabellen- und Spaltennamen nicht. Er findet sie über die **System-Tabellen** des DBMS. Bei MySQL sind das `TABLES` und `COLUMNS` im Schema `INFORMATION_SCHEMA`, bei MS SQL Server `sysobjects` und `syscolumns`. Auch dieser Zugriff läuft über dieselbe SQLi-Lücke.",
            "Eine Feinheit: Beim Auslesen von `TABLE_NAME` muss man es in die **zweite** Spalte des injizierten SELECT setzen, nicht in die erste. Die erste Spalte der vorgegebenen Query ist numerisch (z.B. USERID als INT), und **VARCHAR lässt sich nicht implizit zu INT** konvertieren. Man platziert die Textspalte also dort, wo die vorgegebene Query auch Text erwartet."
          ],
          remember: "-- kommentiert den Rest der Original-Query aus. Schema-Infos stehen in System-Tabellen (MySQL: INFORMATION_SCHEMA.TABLES/COLUMNS) und werden über dieselbe Lücke ausgelesen. Datentypen der UNION-Spalten müssen passen."
        },
        {
          type: "checkpoint",
          id: "cp-union",
          title: "Checkpoint: UNION-based Extraction",
          questions: [
            {
              id: "union-conditions",
              type: "multi",
              prompt: "Which conditions must hold for a UNION-based SQL injection to work?",
              options: [
                "Both SELECT statements must return the same number of columns",
                "The data types of the columns must match or be implicitly convertible",
                "Both queries must access the same table",
                "The injected SELECT must come first",
                "The attacker must know the admin password"
              ],
              correct: [0, 1],
              explanation: "Same column count and compatible types. The tables can differ and no password knowledge is needed."
            },
            {
              id: "attack-steps",
              type: "order",
              prompt: "Order the steps of a UNION-based data extraction attack.",
              items: [
                "Probe with a single quote to confirm the vulnerability",
                "Find out how many columns the predefined SELECT returns",
                "Discover table and column names via the DBMS system tables",
                "Read the desired columns with a UNION SELECT"
              ],
              explanation: "You confirm the flaw, learn the column count, discover the schema, then extract."
            },
            {
              id: "comment",
              type: "type",
              prompt: "Which two characters start an SQL comment that makes the rest of the original query be ignored?",
              placeholder: "two characters",
              accept: ["--", "double dash", "dash dash"],
              explanation: "Everything after -- is ignored by the DBMS, which discards the trailing part of the original query."
            },
            {
              id: "type-mismatch",
              type: "single",
              prompt: "The predefined query returns USERID (INT) in its first column. Why must TABLE_NAME (VARCHAR) be placed in the second column of the injected SELECT?",
              options: [
                "VARCHAR cannot be implicitly converted to the numeric type of the first column",
                "TABLE_NAME is always the second column in the system table",
                "UNION requires text columns to be second",
                "The first column is reserved for the comment marker"
              ],
              correct: 0,
              explanation: "The column types must line up. INT converts to VARCHAR, but not the other way round, so the text goes where the query expects text."
            },
            {
              id: "schema-table",
              type: "type",
              prompt: "In MySQL, which schema holds the system tables TABLES and COLUMNS that reveal the database structure?",
              accept: ["INFORMATION_SCHEMA", "information_schema"],
              explanation: "INFORMATION_SCHEMA.TABLES and .COLUMNS expose table and column names, readable through the same injection."
            }
          ]
        },
        {
          type: "slide",
          title: "INSERT missbrauchen und mehrere Queries",
          body: [
            "SQLi betrifft nicht nur SELECT. Registriert sich ein Nutzer und die App baut `INSERT INTO User (type, username, password) VALUES ('user', '...', '...')` per Verkettung, kann ein Angreifer als Passwort `userpass'), ('admin', 'Superuser', 'adminpass')--` eingeben. Das Ergebnis ist ein gültiges INSERT, das **zwei** Zeilen einfügt, darunter ein **Admin-Konto**. Statt seiner Daten schmuggelt er eine ganze zweite Zeile ein.",
            "Manchmal geht sogar mehr: Mit `;` lässt sich die erste Query beenden und eine **zusätzliche** anhängen, etwa `Smith'; UPDATE employee SET password = 'foo'--`, was alle Passwörter überschreibt. Der Erfolg zeigt sich nicht direkt, aber ein erneutes Auslesen mit dem UNION-Trick bestätigt die Änderung.",
            "In der Praxis funktionieren mehrere Queries eher selten. In Java klappt es nur, wenn der Entwickler `executeBatch()` statt `executeQuery()` benutzt, denn `executeQuery()` und `updateQuery()` erlauben nur eine einzige Query. Beim Testen lohnt sich der Versuch trotzdem."
          ],
          remember: "SQLi auch bei INSERT (zusätzliche Zeile einschleusen, z.B. Admin-Konto) und ggf. mehrere Queries mit ; (UPDATE/DELETE). In Java brauchen mehrere Queries executeBatch()."
        },
        {
          type: "slide",
          title: "SQL Injection verhindern",
          body: [
            "Die wichtigste Massnahme sind **Prepared Statements** (parametrisierte Queries). Statt Daten in den Query-String zu kleben, schreibt man Platzhalter: `prepare(\"SELECT id FROM users WHERE name=? AND pass=?\")` und übergibt die Werte separat. Das DBMS behandelt die Werte dann **garantiert nur als Daten**, nie als Code, und escaped Steuerzeichen selbst. Damit wird SQLi praktisch unmöglich. Das ist wie ein Formular mit festen Feldern: Was du ins Feld «Name» schreibst, bleibt Name, egal was drinsteht.",
            "Ergänzend hilft **Input Validation**: alle Nutzerdaten prüfen, bevor sie weiterverarbeitet werden, etwa per Whitelist erlaubter Zeichen. Aber Vorsicht: Manchmal sind kritische Zeichen legitim (Suche nach `O'Brian`), deshalb sind Prepared Statements die **primäre** Verteidigung, nicht die Validierung allein.",
            "Zwei weitere Punkte: Gib **keine** detaillierten Datenbank-Fehlermeldungen an den Nutzer weiter (sie helfen dem Angreifer), und greife mit **minimalen Rechten** auf die DB zu (Principle of Least Privilege), damit der Schaden begrenzt bleibt, falls doch eine Lücke existiert. Wichtig: **Client-seitige** Validierung ist nur Komfort, Angreifer umgehen sie mühelos mit einem lokalen Proxy. Immer serverseitig validieren."
          ],
          remember: "Primär: Prepared Statements (Daten bleiben Daten). Ergänzend: serverseitige Input-Validation (Whitelist), keine DB-Fehler nach aussen, minimale DB-Rechte. Client-Validierung schützt nicht."
        },
        {
          type: "checkpoint",
          id: "cp-sqli-defense",
          title: "Checkpoint: INSERT Abuse & Defense",
          questions: [
            {
              id: "insert-goal",
              type: "single",
              prompt: "During registration an attacker submits a crafted password so the INSERT statement adds a second row with type 'admin'. What has the attacker achieved?",
              options: [
                "They created an admin account for themselves",
                "They deleted the user table",
                "They bypassed HTTPS",
                "They read the INFORMATION_SCHEMA"
              ],
              correct: 0,
              explanation: "The injected values form a valid multi-row INSERT that adds an admin account."
            },
            {
              id: "primary-defense",
              type: "type",
              prompt: "What is the primary defensive measure against SQL injection? (two words)",
              placeholder: "___ ___",
              accept: ["prepared statements", "prepared statement", "parameterized queries", "parameterized query", "parametrized queries", "parameterised queries"],
              explanation: "Prepared statements ensure user data can never change the meaning of the query."
            },
            {
              id: "why-prepared",
              type: "multi",
              prompt: "Why do prepared statements stop SQL injection?",
              options: [
                "The DBMS treats the bound values only as data, never as SQL code",
                "The DBMS handles the proper quoting/escaping of the values",
                "The values are bound to fixed positions in the query",
                "They encrypt the database connection",
                "They make the database run as a non-root user"
              ],
              correct: [0, 1, 2],
              explanation: "Binding separates code from data. Encryption and privilege level are separate, unrelated concerns."
            },
            {
              id: "client-validation",
              type: "single",
              prompt: "Why must you never rely on client-side validation alone to prevent injection?",
              options: [
                "Attackers can bypass it easily, e.g. with a local proxy that alters data after it leaves the browser",
                "It slows down the application",
                "Browsers do not support JavaScript validation",
                "It only works over HTTPS"
              ],
              correct: 0,
              explanation: "Client-side checks improve usability but are trivially bypassed. Always validate on the server."
            },
            {
              id: "least-privilege",
              type: "type",
              prompt: "Accessing the database with the fewest rights necessary, to limit damage, follows which security principle? (two or three words)",
              accept: ["least privilege", "principle of least privilege", "minimal privileges", "minimal privilege"],
              explanation: "Principle of least privilege limits the impact if a vulnerability is exploited."
            }
          ]
        },
        {
          type: "slide",
          title: "OS Command Injection",
          body: [
            "Ruft eine App **Betriebssystem-Befehle** auf (in Java über `Runtime.exec()`, in PHP über `system()`), kann **OS Command Injection** möglich sein. Es gibt gute Gründe, das OS aufzurufen: ein Admin-Interface mit Diagnose-Tools wie `ping`, das Auslesen einer Konfigurationsdatei oder ein Web-Frontend für ein Kommandozeilen-Tool. Das Problem: Sobald der Nutzer Teile des Befehls bestimmt, sind sicherheitsrelevante Fehler sehr leicht gemacht.",
            "Beispiel: Eine App zeigt Dateiinhalte an und baut den Befehl `command[2] = \"cat \" + filename` mit dem vom Nutzer gelieferten Dateinamen. Ausgeführt wird `/bin/sh -c cat AccessControlMatrix.help`. Würde stattdessen eine I/O-Klasse wie `FileReader` genutzt, gäbe es keine OS-Injection, aber als Tester nimmst du immer an, dass der Entwickler den unsicheren Weg gewählt hat.",
            "Testen geht auf zwei Arten. Ein `\"` anhängen: Passt die Annahme, entsteht ein syntaktisch **ungültiger** Befehl, ein Fehler ist ein starkes Indiz. Oder einen **zusätzlichen Befehl** anhängen: `; ifconfig` (Unix) bzw. `& ipconfig` (Windows). Erscheint dessen Ausgabe in der Antwort, ist die Lücke bewiesen. Bei diesem WebGoat-Beispiel muss man wegen umschliessender Anführungszeichen `\"; ifconfig\"` einsetzen, damit `cat \"...help\"; ifconfig\"\"` einen gültigen ersten und einen gültigen zweiten Befehl ergibt."
          ],
          remember: "OS Command Injection bei Runtime.exec()/system() mit Nutzerdaten im Befehl. Test: \" anhängen (Fehler) oder ; ifconfig / & ipconfig anhängen (Ausgabe erscheint = beweisbar). ; trennt Befehle in der Shell."
        },
        {
          type: "slide",
          title: "OS Command Injection absichern",
          body: [
            "Die Auswirkung kann verheerend sein: Mit `\"; cat /etc/shadow\"` liest man die Passwort-Hashes der Systemnutzer, und wenn das klappt, läuft die App als **root**. Damit hat man faktisch eine Remote-Root-Shell und kann fast alles: Dateien hoch- und runterladen, Software installieren, weitere interne Systeme angreifen.",
            "Beste Massnahme: Das OS **gar nicht** direkt aufrufen. Für Dateizugriff die I/O-Klassen der Technologie nutzen (in Java `FileReader`, `FileInputStream`), nicht die Shell.",
            "Muss es doch die Shell sein, gilt strikte **Input-Validation per Whitelist**: erlaubte Zeichen und maximale Länge festlegen und prüfen. Bei Dateinamen etwa: nur Buchstaben, vielleicht Ziffern, höchstens ein Punkt, maximal z.B. 25 Zeichen. Und wie immer: Prozess mit **minimalen Rechten** laufen lassen, damit der Schaden begrenzt bleibt."
          ],
          remember: "Wenn möglich das OS gar nicht aufrufen (I/O-Klassen statt Shell). Sonst: Whitelist-Validierung (erlaubte Zeichen + Maximallänge) und minimale Prozessrechte."
        },
        {
          type: "checkpoint",
          id: "cp-oscmd",
          title: "Checkpoint: OS Command Injection",
          questions: [
            {
              id: "oscmd-cause",
              type: "multi",
              prompt: "When can OS command injection occur?",
              options: [
                "When the application invokes OS commands, e.g. via Runtime.exec() in Java",
                "When the user can control part of the command that is executed",
                "When file access uses Runtime instead of I/O classes without checking the input",
                "Whenever the application uses a database",
                "In PHP when the system() function is used with user input"
              ],
              correct: [0, 1, 2, 4],
              explanation: "It is about executing OS commands with user-controlled parts, not about databases."
            },
            {
              id: "separator",
              type: "type",
              prompt: "In a shell command passed with -c, appending a second command needs a separator character. What is that character called? (its name)",
              placeholder: "name of the character",
              accept: ["semicolon", "semi-colon", "semi colon", "strichpunkt", "semikolon"],
              explanation: "The semicolon ( ; ) separates multiple shell commands."
            },
            {
              id: "poc",
              type: "single",
              prompt: "An attacker appends ; ifconfig to a filename and the network configuration output appears in the response. What does this prove?",
              options: [
                "The injected command was executed, proving the vulnerability can be exploited",
                "The file does not exist",
                "The database is misconfigured",
                "The server uses HTTPS"
              ],
              correct: 0,
              explanation: "Seeing the injected command's output is a proof of concept that OS command injection works."
            },
            {
              id: "best-defense-os",
              type: "single",
              prompt: "What is the best countermeasure against OS command injection for file access?",
              options: [
                "Do not invoke the OS at all; use the I/O classes of the technology (e.g. FileReader)",
                "Escape only the semicolon character",
                "Run the process as root so it can handle any input",
                "Rely on client-side validation of the file name"
              ],
              correct: 0,
              explanation: "Avoiding the shell entirely removes the attack surface. If unavoidable, whitelist-validate and use least privilege."
            },
            {
              id: "whitelist",
              type: "multi",
              prompt: "If invoking the OS is unavoidable, what does a whitelisting input validation for a file name specify?",
              options: [
                "The set of allowed characters",
                "The maximum number of characters",
                "A list of forbidden IP addresses",
                "That the received data matches this specification before use"
              ],
              correct: [0, 1, 3],
              explanation: "Whitelisting defines what IS allowed (characters, length) and rejects everything else."
            }
          ]
        },
        {
          type: "slide",
          title: "JSON- und XML-Injection",
          body: [
            "Wird JSON oder XML aus Nutzerdaten zusammengebaut, ist auch dort Injection möglich. Beispiel JSON: Eine App baut aus Username und Passwort den String `{ \"account\":\"user\", \"username\":\"...\", \"password\":\"...\" }`, wobei `account` fest auf `user` steht. Gibt der Angreifer als Passwort `Un6-rT1R\",\"account\":\"admin` ein, enthält der String am Ende ein **zweites** `account`-Feld mit Wert `admin`.",
            "Das ist noch gültiges JSON, denn der Standard erlaubt doppelte Elemente. Entscheidend ist, wie der **Parser** damit umgeht: Nimmt er die **letzte** Vorkommnis eines Elements (was die meisten tun), bekommt der Angreifer ein **Admin-Konto**. Bei XML funktioniert derselbe Trick, indem man mit `</password><admin>1</admin>...` zusätzliche Elemente einschleust.",
            "Der Schutz ist wie bei SQLi: **Input-Validation per Whitelist**, damit keine zusätzlichen Elemente eingefügt werden können. Besonders auf Steuerzeichen wie `\"`, `<` und `>` achten und erlaubte Zeichen sowie Maximallänge festlegen."
          ],
          remember: "JSON/XML-Injection schleust zusätzliche Elemente ein (z.B. doppeltes account:admin). Viele Parser nehmen die letzte Vorkommnis. Schutz: Whitelist-Validierung, Vorsicht bei \" < >."
        },
        {
          type: "slide",
          title: "XXE: XML External Entity",
          body: [
            "XML kennt **externe Entitäten**: Über eine `<!ENTITY ... SYSTEM \"URL\">`-Deklaration kann man auf lokale oder entfernte Inhalte verweisen. Beim Parsen ersetzt der Parser das entsprechende Element durch den Inhalt der URL. Eigentlich ein Feature, in falschen Händen aber gefährlich.",
            "Akzeptiert eine App XML vom Browser und spiegelt den Inhalt in der Antwort wider, ist ein **XXE**-Angriff möglich. Der Angreifer definiert eine Entität, die auf eine lokale Datei wie `/etc/passwd` zeigt, und referenziert sie im Kommentar-Text. Beim Parsen liest der Parser die Datei, kopiert den Inhalt ins Element, die App speichert den Kommentar und schickt ihn in der Antwort zurück, samt Dateiinhalt. So lässt sich jede Datei lesen, auf die die App Zugriff hat.",
            "Der wirksamste Schutz: den **XML-Parser so konfigurieren, dass er externe Entitäten nicht unterstützt**. Das verhindert XXE zuverlässig. Und generell: Wenn möglich das einfachere **JSON** statt XML nutzen, weil es solche mächtigen Features gar nicht kennt."
          ],
          remember: "XXE nutzt externe XML-Entitäten (<!ENTITY x SYSTEM \"file://...\">), um lokale Dateien zu lesen. Schutz: Parser ohne externe Entitäten konfigurieren, wenn möglich JSON statt XML."
        },
        {
          type: "checkpoint",
          id: "cp-jsonxml",
          title: "Checkpoint: JSON / XML Injection & XXE",
          questions: [
            {
              id: "json-duplicate",
              type: "single",
              prompt: "An attacker injects a second \"account\":\"admin\" element into a JSON string. Why can this give them an admin account?",
              options: [
                "The JSON standard allows duplicate elements, and most parsers use the last occurrence of an element",
                "JSON forbids duplicates, so the parser crashes and grants admin",
                "The first element is always ignored",
                "JSON automatically grants admin when an account field is present twice"
              ],
              correct: 0,
              explanation: "Duplicates are valid JSON; parsers commonly keep the last occurrence, so account becomes admin."
            },
            {
              id: "xxe-mechanism",
              type: "order",
              prompt: "Order what happens during an XXE attack that reads a local file via a comment feature.",
              items: [
                "The attacker defines an external entity pointing to a local file",
                "The XML parser accesses the file and copies its content into the referenced element",
                "The application stores the comment including that content",
                "The response returns the comment, exposing the file content to the attacker"
              ],
              explanation: "The parser resolves the external entity, and the reflected comment leaks the file."
            },
            {
              id: "xxe-defense",
              type: "single",
              prompt: "What is the most effective countermeasure against XML External Entity injection?",
              options: [
                "Configure the XML parser so that it does not support external entities",
                "Escape the semicolon in all input",
                "Use a longer XML declaration",
                "Send the XML over HTTPS"
              ],
              correct: 0,
              explanation: "Disabling external entity support prevents XXE. Preferring JSON over XML also avoids the feature entirely."
            },
            {
              id: "jsonxml-controlchars",
              type: "multi",
              prompt: "Which control characters must input validation be especially careful about to prevent JSON/XML injection?",
              options: ["The double quote \"", "The less-than sign <", "The greater-than sign >", "The digit 0", "The letter a"],
              correct: [0, 1, 2],
              explanation: "Quotes and angle brackets let an attacker create additional JSON/XML elements."
            }
          ]
        }
      ]
    },
    {
      "id": "w4",
      "number": 4,
      "title": "Web Application Security Testing 2: Authentication, Sessions & XSS",
      "status": "ready",
      "items": [
        {
          "type": "slide",
          "title": "Woche 4: vom Login bis zum Browser",
          "body": [
            "Diese Woche verbindet drei Fragen: Wer darf sich anmelden? Wie erkennt die Anwendung die angemeldete Sitzung? Und was passiert, wenn fremde Daten im Browser zu ausführbarem Code werden?",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Authentifizierung",
                    "text": "Identität nachweisen"
                  },
                  {
                    "title": "Session",
                    "text": "Anfragen einer Sitzung zuordnen"
                  },
                  {
                    "title": "Browser",
                    "text": "Daten anzeigen, ohne fremden Code auszuführen"
                  }
                ]
              }
            },
            {
              "callout": {
                "tone": "tip",
                "title": "Ziel der Lektion",
                "text": "Erkenne die Ursache einer Schwachstelle und wähle die passende Abwehr. Die Testszenarien sind eigene Lernbeispiele beziehungsweise Erläuterungen der isolierten WebGoat-Demos aus den Folien; hier werden keine Angriffe gegen reale Dienste ausgeführt."
              }
            },
            "Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 1–3, 21, 39–40 (inkl. Notizen)"
          ],
          "remember": "Sicheres Login, sichere Sessions und sichere Ausgabe lösen unterschiedliche Probleme."
        },
        {
          "type": "slide",
          "title": "Online-Passwortraten und Username Enumeration",
          "body": [
            "Bei einem Online-Angriff wird jede Passwortvermutung an die laufende Anwendung geschickt. Die Anwendung kann Versuche begrenzen. Unterschiedliche Fehlermeldungen oder Antwortzeiten können zuvor verraten, welche Benutzernamen überhaupt existieren.",
            {
              "compare": {
                "left": {
                  "title": "Enumeration",
                  "points": [
                    "Frage: Existiert dieses Konto?",
                    "Signale: Meldung, Zeit, Registrierungsantwort"
                  ]
                },
                "right": {
                  "title": "Passwortraten",
                  "points": [
                    "Frage: Passt dieses Passwort zum Konto?",
                    "Wirksamkeit hängt auch von Versuchsrate und Passwortqualität ab"
                  ]
                }
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Beide Fehlermeldungen lauten gleich, aber ein unbekanntes Konto antwortet deutlich schneller. Ist Enumeration ausgeschlossen?",
                "answer": "Nein. Gleicher Text beseitigt nur einen möglichen Unterschied. Auch Zeit, Status, Antwortlänge und andere Abläufe können Konten verraten.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 3–4, 8 (inkl. Notizen)"
          ],
          "remember": "Nicht nur Fehlermeldungen, sondern das beobachtbare Verhalten kann Informationen preisgeben."
        },
        {
          "type": "slide",
          "title": "Burp-Ergebnisse lesen statt blind vertrauen",
          "body": [
            "Die Vorlesungsdemo kombiniert sechs bekannte Benutzernamen mit hundert Passwortkandidaten. Der Cluster-bomb-Modus bildet alle Kombinationen. Ein frischer Sitzungszustand verhindert, dass ein bereits erfolgreicher Login die weiteren Messungen verfälscht.",
            {
              "formula": {
                "main": "6 × 100 = 600 Versuche",
                "note": "Kartesisches Produkt: Jeder Name wird mit jedem Kandidaten kombiniert."
              }
            },
            "In der gezeigten Tabelle liefern auch erfolgreiche und erfolglose Anmeldungen denselben Status 302. Der Unterschied liegt im Redirect-Ziel und dadurch in der Antwortlänge. Ein Ausreisser ist ein Prüfhinweis; erst sein Inhalt erklärt die Ursache.",
            {
              "reveal": {
                "question": "Eigene Variante: Vier Namen und fünf Kandidaten. Wie viele Kombinationen? Beweist eine längere Antwort einen erfolgreichen Login?",
                "answer": "20 Kombinationen. Nein: Auch Fehlermeldungen oder andere Zustände können die Länge ändern. Die Antwort und den resultierenden Zustand prüfen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 5–7 (inkl. Notizen)"
          ],
          "remember": "Kombinationen rechnen; Auffälligkeiten anhand der tatsächlichen Antwort verifizieren."
        },
        {
          "type": "slide",
          "title": "Login und Passwort-Reset absichern",
          "body": [
            {
              "table": {
                "head": [
                  "Risiko",
                  "Passende Massnahme"
                ],
                "rows": [
                  [
                    "Viele Loginversuche",
                    "Rate Limiting und abgestufte Verzögerungen; Missbrauch von Sperren als DoS berücksichtigen"
                  ],
                  [
                    "Leicht erratbare Passwörter",
                    "Ausreichende Länge und Prüfung gegen verbreitete/kompromittierte Passwörter"
                  ],
                  [
                    "Konten verratende Antworten",
                    "Einheitliche Meldungen und möglichst einheitliche Abläufe"
                  ],
                  [
                    "Erratbare Reset-Antworten",
                    "Nicht allein auf Sicherheitsfragen vertrauen; abgesicherter zweiter Kanal mit kurzlebigem Einmal-Token"
                  ]
                ]
              }
            },
            {
              "callout": {
                "tone": "warn",
                "title": "Präzisierung zu Folie 8",
                "text": "Die dort genannten starren Grossbuchstaben-/Ziffern-/Sonderzeichenregeln sind keine heutige OWASP-Empfehlung. Länge und Blocklisten sind tragfähigere Kriterien. Rate Limiting und gegebenenfalls MFA ergänzen den Schutz."
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Ein Reset-Link bleibt unbegrenzt gültig und kann mehrfach verwendet werden. Was ist daran falsch?",
                "answer": "Ein bekannt gewordener Link eröffnet wiederholt Zugriff. Er sollte ausreichend zufällig, kurzlebig, an das Konto gebunden und nach Gebrauch ungültig sein. Sicherheitsfragen allein schützen einen Reset nicht zuverlässig.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 8–10 (inkl. Notizen); OWASP Authentication Cheat Sheet; OWASP Forgot Password Cheat Sheet"
          ],
          "remember": "Recovery ist ein zweiter Zugang zum Konto und braucht entsprechend starken Schutz."
        },
        {
          "type": "checkpoint",
          "id": "cp-login",
          "title": "Checkpoint: Authentication and Recovery",
          "questions": [
            {
              "id": "combinations",
              "type": "type",
              "prompt": "A test combines 6 usernames with 100 password candidates each. How many attempts (number only)?",
              "accept": [
                "600",
                "600 attempts",
                "600 Versuche"
              ],
              "explanation": "Das kartesische Produkt enthält 6 × 100 Kombinationen. Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 3–10 (inkl. Notizen); OWASP Authentication Cheat Sheet; OWASP Forgot Password Cheat Sheet"
            },
            {
              "id": "enumeration",
              "type": "multi",
              "prompt": "Which observations can reveal whether an account exists?",
              "options": [
                "Different error text",
                "Different timing",
                "Different registration responses",
                "The same generic message necessarily proves no leakage"
              ],
              "correct": [
                0,
                1,
                2
              ],
              "explanation": "Mehrere beobachtbare Kanäle können Konten verraten. Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 3–10 (inkl. Notizen); OWASP Authentication Cheat Sheet; OWASP Forgot Password Cheat Sheet"
            },
            {
              "id": "recovery",
              "type": "single",
              "prompt": "Which password-reset design is strongest among these options?",
              "options": [
                "A favourite-colour question alone",
                "A permanent reusable link",
                "A random, expiring, single-use token delivered through the registered channel"
              ],
              "correct": 2,
              "explanation": "Nicht erratbare Einmal-Tokens mit Ablauf begrenzen das Missbrauchsfenster; der Kanal muss abgesichert sein. Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 3–10 (inkl. Notizen); OWASP Authentication Cheat Sheet; OWASP Forgot Password Cheat Sheet"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Session-ID: ein zeitlich begrenzter Zugangsschlüssel",
          "body": [
            "Nach dem Login enthält nicht jede Anfrage erneut das Passwort. Stattdessen ordnet der Server die Session-ID einer Sitzung zu. Wer eine gültige ID besitzt, kann häufig als deren Benutzer auftreten: Ein starkes Passwort repariert eine gestohlene Session-ID nicht.",
            "Die Folien vergleichen viele frisch erzeugte IDs im Burp Sequencer. Wiederkehrende Muster und kaum wechselnde Stellen sind Warnzeichen. Eine einzelne lange ID beweist keine Unvorhersagbarkeit; statistische Tests allein beweisen umgekehrt noch keinen sicheren Generator.",
            {
              "callout": {
                "tone": "def",
                "title": "Entropie statt Aussehen",
                "text": "Entropie beschreibt hier den unvorhersagbaren Anteil. Eine lange Zeichenfolge mit Zeitstempel und Zähler kann wesentlich weniger Zufälligkeit enthalten, als ihre Länge vermuten lässt."
              }
            },
            "Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 3, 11–15 (inkl. Notizen)"
          ],
          "remember": "Eine Session-ID muss geheim und unvorhersagbar sein, nicht nur lang aussehen."
        },
        {
          "type": "slide",
          "title": "Session Fixation: zwei Varianten verstehen",
          "body": [
            {
              "compare": {
                "left": {
                  "title": "Angreifer-Sitzung ist schon angemeldet",
                  "points": [
                    "Opfer nutzt die Sitzung des Angreifers.",
                    "Es könnte dort eigene Daten ablegen.",
                    "Der Angreifer liest diese im eigenen Konto."
                  ]
                },
                "right": {
                  "title": "Bekannte anonyme Sitzung vor dem Login",
                  "points": [
                    "Opfer übernimmt eine dem Angreifer bekannte ID.",
                    "Opfer meldet sich an.",
                    "Bleibt die ID gleich, kennt der Angreifer nun den Zugang zur Opfer-Sitzung."
                  ]
                }
              }
            },
            {
              "flow": {
                "steps": [
                  {
                    "title": "Bekannte ID",
                    "text": "Angreifer kennt die anonyme ID S."
                  },
                  {
                    "title": "Übernahme",
                    "text": "Opfer nutzt S und meldet sich an."
                  },
                  {
                    "title": "Fehlende Rotation",
                    "text": "Server verbindet S mit dem Opferkonto."
                  },
                  {
                    "title": "Folge",
                    "text": "Auch der Angreifer kann S weiterverwenden."
                  }
                ]
              }
            },
            {
              "reveal": {
                "question": "Würde ein schwer zu erratender Wert für S allein diese zweite Variante verhindern?",
                "answer": "Nein. Der Angreifer muss S nicht erraten, weil er die ID bereits kennt. Der Server muss beim Login eine neue ID erzeugen und die alte Bindung ungültig machen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 16–18 (inkl. Notizen)"
          ],
          "remember": "Bei Fixation ist die ID schon bekannt; Rotation beim Login unterbricht die Kette."
        },
        {
          "type": "slide",
          "title": "Session-Schutz als mehrere unabhängige Aufgaben",
          "body": [
            {
              "table": {
                "head": [
                  "Massnahme",
                  "Wogegen sie hilft"
                ],
                "rows": [
                  [
                    "Lange kryptografisch zufällige IDs",
                    "Erraten; die Vorlesung nennt mindestens 128 Bit Entropie als Ziel"
                  ],
                  [
                    "Rotation beim Login, alte ID ungültig",
                    "Bekannte anonyme ID nicht in die authentifizierte Sitzung übernehmen"
                  ],
                  [
                    "IDs nur in Cookies akzeptieren",
                    "Lecks und Fixation über URL-Parameter reduzieren"
                  ],
                  [
                    "Serverseitige Timeouts und Invalidierung",
                    "Nutzbarkeit alter Sitzungen begrenzen"
                  ],
                  [
                    "HTTPS und geeignete Cookie-Attribute",
                    "Transport und Browserzugriff absichern"
                  ]
                ]
              }
            },
            {
              "callout": {
                "tone": "warn",
                "title": "Präzisierung zu Folie 19",
                "text": "Nur Cookies zu verwenden ist kein vollständiger Beweis gegen jede Fixation. Rotation und sichere Annahme von Session-IDs bleiben nötig. Auch die Rotation schützt nicht vor einem späteren Diebstahl der neuen ID."
              }
            },
            "Die zehn Minuten auf der Folie sind ein Beispiel für Inaktivität, keine für alle Anwendungen richtige Frist. Die Invalidierung muss serverseitig wirken; nur einen Timer im Browser anzuzeigen reicht nicht.",
            "Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 19 (inkl. Notizen); OWASP Session Management Cheat Sheet"
          ],
          "remember": "Zufall, Transport, Rotation und Lebensdauer adressieren verschiedene Risiken."
        },
        {
          "type": "checkpoint",
          "id": "cp-sessions",
          "title": "Checkpoint: Session Management",
          "questions": [
            {
              "id": "fixation",
              "type": "order",
              "prompt": "Order the classic fixation failure.",
              "items": [
                "Attacker knows an anonymous session ID",
                "Victim adopts that ID",
                "Victim authenticates without ID rotation",
                "Attacker reuses the ID for the authenticated session"
              ],
              "explanation": "Die bekannte ID wird fälschlich über den Privilegwechsel hinweg behalten. Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 11–19 (inkl. Notizen); OWASP Session Management Cheat Sheet"
            },
            {
              "id": "rotate",
              "type": "single",
              "prompt": "Which change directly interrupts this fixation chain?",
              "options": [
                "Use a longer but unchanged ID",
                "Issue a new ID at login and invalidate the old one",
                "Hide the login button"
              ],
              "correct": 1,
              "explanation": "Der Angreifer darf mit der alten ID nicht zur neuen authentifizierten Sitzung gelangen. Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 11–19 (inkl. Notizen); OWASP Session Management Cheat Sheet"
            },
            {
              "id": "token",
              "type": "multi",
              "prompt": "Which statements are correct?",
              "options": [
                "A long timestamp is not necessarily unpredictable.",
                "One token proves cryptographic randomness.",
                "A stolen session can bypass the need to know the password.",
                "Timeouts must be enforced on the server."
              ],
              "correct": [
                0,
                2,
                3
              ],
              "explanation": "Darstellung, Geheimhaltung und serverseitige Lebensdauer sind eigenständige Eigenschaften. Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 11–19 (inkl. Notizen); OWASP Session Management Cheat Sheet"
            }
          ]
        },
        {
          "type": "slide",
          "title": "XSS: fremder Code im Kontext deiner Anwendung",
          "body": [
            "Bei Cross-Site Scripting gelangen kontrollierbare Daten in einen Kontext, in dem der Browser sie als Code interpretiert. Der fremde Code läuft dabei im Kontext der betroffenen Webseite und kann deren Oberfläche verändern oder Anfragen mit der Sitzung des Benutzers auslösen.",
            {
              "cards": [
                {
                  "title": "Cookie-Diebstahl",
                  "text": "Möglich, wenn das relevante Cookie für JavaScript lesbar ist."
                },
                {
                  "title": "Täuschende Oberfläche",
                  "text": "Zum Beispiel ein eingeschobenes Formular."
                },
                {
                  "title": "Aktionen als Benutzer",
                  "text": "Anfragen aus dem Kontext der bereits geöffneten Sitzung."
                }
              ]
            },
            {
              "callout": {
                "tone": "warn",
                "title": "Keine Serverübernahme nötig",
                "text": "Für XSS muss der Angreifer nicht vorher administrativen Zugriff auf den Server haben. Die unsichere Datenverarbeitung der Anwendung kann genügen."
              }
            },
            "Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 21–23 (inkl. Notizen)"
          ],
          "remember": "Entscheidend ist, dass fremde Daten zu Code im Browserkontext der Anwendung werden."
        },
        {
          "type": "slide",
          "title": "Reflected, Stored, Server und Client sind verschiedene Fragen",
          "body": [
            {
              "table": {
                "head": [
                  "Begriff",
                  "Welche Frage beantwortet er?"
                ],
                "rows": [
                  [
                    "Reflected",
                    "Kommt die Eingabe unmittelbar in derselben Antwort zurück?"
                  ],
                  [
                    "Stored",
                    "Wird die Eingabe gespeichert und später anderen Besuchern präsentiert?"
                  ],
                  [
                    "Server XSS",
                    "Liegt der unsichere Einbau in den serverseitig erzeugten Seiten?"
                  ],
                  [
                    "Client XSS",
                    "Verarbeitet Browser-JavaScript die Daten unsicher?"
                  ]
                ]
              }
            },
            "Eine gespeicherte Bewertung aus einer JSON-Antwort kann durch eine unsichere DOM-Ausgabe zu Stored Client XSS führen. Dass die Daten als JSON übertragen werden, macht ihre spätere Verwendung nicht automatisch sicher.",
            {
              "reveal": {
                "question": "Eigener Fall: Eine Suche gibt einen Parameter unsicher im HTML zurück; ein Forum speichert ihn und zeigt ihn morgen anderen Nutzern. Welche Haupttypen sind das?",
                "answer": "Die Suche illustriert Reflected Server XSS, das serverseitig gerenderte Forum Stored Server XSS. Bei Browser-seitigem unsicherem Einbau wäre die jeweilige Client-Variante zu prüfen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 21–23, 40 (inkl. Notizen)"
          ],
          "remember": "Persistenz und Ort der verwundbaren Verarbeitung getrennt bestimmen."
        },
        {
          "type": "slide",
          "title": "XSS-Tests: Ausführung belegen, Kontext prüfen",
          "body": [
            "In einer autorisierten Testumgebung kann eine harmlose sichtbare Markierung belegen, dass Eingabe als Script ausgeführt wird. Danach wird die konkrete Einfügestelle untersucht: HTML-Text, Attribut oder JavaScript sind unterschiedliche Kontexte.",
            {
              "callout": {
                "tone": "warn",
                "title": "Präzisierung zu Folie 34",
                "text": "Dass ein Scanner die Eingabe irgendwo in der Antwort wiederfindet, ist allein noch kein XSS-Beweis. Als korrekt kodierter Text darf dieselbe Zeichenfolge sichtbar sein. Entscheidend sind Kontext und mögliche Ausführung."
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Eine Seite zeigt die Zeichenfolge eines Script-Tags als Text. Ist damit XSS bewiesen?",
                "answer": "Nein. Wenn sie korrekt als Text ausgegeben wird, ist das gerade das gewünschte Verhalten. Prüfe den tatsächlichen Datenfluss und Kontext, nicht nur die Anwesenheit einer Zeichenfolge.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 24, 34 (inkl. Notizen); OWASP Cross Site Scripting Prevention Cheat Sheet"
          ],
          "remember": "Reflexion ist ein Hinweis; unsichere Interpretation ist das Problem."
        },
        {
          "type": "checkpoint",
          "id": "cp-xss-types",
          "title": "Checkpoint: XSS Types and Evidence",
          "questions": [
            {
              "id": "stored",
              "type": "single",
              "prompt": "A server stores a review and later inserts it unsafely into HTML shown to other users. Which type fits?",
              "options": [
                "Stored Server XSS",
                "Only session fixation",
                "Reflected Server XSS"
              ],
              "correct": 0,
              "explanation": "Persistenz plus unsicherer Einbau auf dem Server ergibt Stored Server XSS. Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 21–24, 34, 40 (inkl. Notizen); OWASP Cross Site Scripting Prevention Cheat Sheet"
            },
            {
              "id": "effects",
              "type": "multi",
              "prompt": "What can XSS potentially do?",
              "options": [
                "Change the displayed page",
                "Issue requests in the victim session",
                "Always read HttpOnly cookies",
                "Read cookies that are accessible to JavaScript"
              ],
              "correct": [
                0,
                1,
                3
              ],
              "explanation": "HttpOnly beschränkt den Cookie-Zugriff, nicht alle Möglichkeiten fremden Codes. Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 21–24, 34, 40 (inkl. Notizen); OWASP Cross Site Scripting Prevention Cheat Sheet"
            },
            {
              "id": "reflection",
              "type": "single",
              "prompt": "A scanner sees the submitted text in a response. What next?",
              "options": [
                "Declare XSS without further inspection",
                "Check the output context and whether it can execute",
                "Assume every reflected value is safe"
              ],
              "correct": 1,
              "explanation": "Sicher kodierter Text darf reflektiert werden; die Interpretation entscheidet. Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 21–24, 34, 40 (inkl. Notizen); OWASP Cross Site Scripting Prevention Cheat Sheet"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Die Session-Hijacking-Demo als Datenfluss",
          "body": [
            {
              "flow": {
                "steps": [
                  {
                    "title": "Eingabe",
                    "text": "Ein Opfer veranlasst eine Anfrage mit fremder Eingabe."
                  },
                  {
                    "title": "Verwundbare Ausgabe",
                    "text": "Die Anwendung baut daraus eine ausführbare Seite."
                  },
                  {
                    "title": "Browser",
                    "text": "Der Code läuft mit den Rechten dieser Seite."
                  },
                  {
                    "title": "Schaden",
                    "text": "Lesbare Sitzungsdaten können abfliessen oder Aktionen ausgelöst werden."
                  }
                ]
              }
            },
            "In den Folien speichert eine Empfangsseite die übermittelten Werte. Das ist ein Demonstrationsdetail. Für die Abwehr musst du erkennen, an welcher Grenze Daten zu Code werden und welche vertraulichen Werte der Code erreichen kann.",
            {
              "callout": {
                "tone": "tip",
                "title": "Notizen der Folien mitdenken",
                "text": "Ein Login ist für XSS allgemein nicht zwingend. Für die Übernahme einer wertvollen authentifizierten Sitzung muss eine entsprechende Sitzung vorhanden sein; andere XSS-Wirkungen können auch im öffentlichen Bereich auftreten."
              }
            },
            "Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 25–31 (inkl. Notizen)"
          ],
          "remember": "Die Ursache liegt im unsicheren Einbau; der nachfolgende Cookie-Diebstahl ist eine mögliche Wirkung."
        },
        {
          "type": "slide",
          "title": "Warum POST allein XSS nicht verhindert",
          "body": [
            "Ein normaler Link löst eine Navigation aus und kann nicht direkt einen beliebigen POST-Formularrumpf enthalten. Die Folien zeigen deshalb eine Zwischen-Seite mit Formular: Der Browser lädt sie und sendet anschliessend den POST an die verwundbare Anwendung.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Navigation",
                    "text": "Link öffnet ein HTML-Dokument."
                  },
                  {
                    "title": "Formular",
                    "text": "Das Dokument veranlasst einen POST."
                  },
                  {
                    "title": "Ausgabe",
                    "text": "Die Zielanwendung verarbeitet die Daten unsicher."
                  }
                ]
              }
            },
            {
              "reveal": {
                "question": "Eigener Review-Kommentar: «Wir haben die Suche von GET auf POST umgestellt; damit ist XSS behoben.» Wie antwortest du?",
                "answer": "Die Übertragungsmethode beseitigt den unsicheren Ausgabekontext nicht. Auch POST-Daten können in ausführbares HTML gelangen. Ein Transferweg kann durch Browser- und Cookie-Regeln eingeschränkt sein, ohne die XSS-Ursache zu reparieren.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 28–33 (inkl. Notizen)"
          ],
          "remember": "GET versus POST ist keine XSS-Abwehr; der sichere Umgang mit den Daten zählt."
        },
        {
          "type": "slide",
          "title": "HttpOnly und sichere Ausgabe nicht verwechseln",
          "body": [
            {
              "compare": {
                "left": {
                  "title": "HttpOnly",
                  "points": [
                    "Verhindert, dass JavaScript das so markierte Cookie ausliest.",
                    "Andere nicht so markierte Cookies können weiterhin lesbar sein.",
                    "Verringert bestimmte Folgen eines XSS-Angriffs."
                  ]
                },
                "right": {
                  "title": "XSS-Ursache beheben",
                  "points": [
                    "Unvertrauenswürdige Daten nicht als Code interpretieren.",
                    "Ausgabe passend zum Kontext kodieren.",
                    "Bei erlaubtem HTML einen geeigneten Sanitizer einsetzen."
                  ]
                }
              }
            },
            {
              "reveal": {
                "question": "Ein Session-Cookie ist HttpOnly. Warum kann XSS trotzdem gefährlich sein?",
                "answer": "Fremder Code kann die Seite verändern und im Browser des Opfers Aktionen auslösen. Der Browser kann dabei das Cookie mitsenden, ohne dass der Code dessen Wert auslesen kann.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 25, 35 (inkl. Notizen); OWASP Session Management Cheat Sheet; OWASP Cross Site Scripting Prevention Cheat Sheet"
          ],
          "remember": "HttpOnly schützt den Cookie-Wert; es macht eine verwundbare Seite nicht XSS-sicher."
        },
        {
          "type": "checkpoint",
          "id": "cp-xss-chain",
          "title": "Checkpoint: XSS Impact and Transport",
          "questions": [
            {
              "id": "httponly",
              "type": "single",
              "prompt": "What does HttpOnly directly prevent?",
              "options": [
                "All XSS execution",
                "JavaScript reading that cookie",
                "Every authenticated browser request"
              ],
              "correct": 1,
              "explanation": "Das Attribut verhindert den direkten JavaScript-Lesezugriff auf das betreffende Cookie. Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 25–35 (inkl. Notizen); OWASP Session Management Cheat Sheet"
            },
            {
              "id": "post",
              "type": "multi",
              "prompt": "Which statements about POST-based XSS are justified?",
              "options": [
                "POST is not an output-encoding mechanism.",
                "An intermediate HTML form can generate a POST.",
                "Switching GET to POST fixes unsafe rendering.",
                "The output context still needs protection."
              ],
              "correct": [
                0,
                1,
                3
              ],
              "explanation": "POST ändert den Transport, nicht die unsichere Interpretation. Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 25–35 (inkl. Notizen); OWASP Session Management Cheat Sheet"
            },
            {
              "id": "anonymous",
              "type": "single",
              "prompt": "Does XSS always require the victim to be logged in?",
              "options": [
                "Yes, for every possible XSS effect",
                "No; public pages can be affected too",
                "No, because sessions never matter"
              ],
              "correct": 1,
              "explanation": "Die Voraussetzungen hängen vom Ziel und der Wirkung ab; authentifizierte Aktionen benötigen entsprechende Berechtigungen. Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 25–35 (inkl. Notizen); OWASP Session Management Cheat Sheet"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Ausgabekontext: Encoding oder Sanitizing?",
          "body": [
            {
              "table": {
                "head": [
                  "Gewünschte Ausgabe",
                  "Passende Strategie"
                ],
                "rows": [
                  [
                    "Normaler Text",
                    "Als Text ausgeben, zum Beispiel über textContent"
                  ],
                  [
                    "Text im serverseitigen HTML",
                    "Kontextgerechtes Output Encoding mit Bibliothek/Template-System"
                  ],
                  [
                    "Bewusst erlaubtes formatiertes HTML",
                    "Geeigneten HTML-Sanitizer mit erlaubten Elementen verwenden"
                  ],
                  [
                    "Zahl in einer Rechnung",
                    "Als Zahl parsen und validieren; keinen JavaScript-Ausdruck bauen"
                  ]
                ]
              }
            },
            {
              "callout": {
                "tone": "warn",
                "title": "Präzisierung zu Folie 35",
                "text": "Das Ersetzen einiger HTML-Zeichen ist keine universelle Lösung für JavaScript-, URL- und Attributkontexte. «Sanitize» auf der Folie umfasst unterschiedliche Mechanismen; Encoding zeigt Daten als Text, HTML-Sanitizing erlaubt nur ausgewählte Struktur."
              }
            },
            "Input Validation prüft fachliche Regeln. Sie ist sinnvoll, ersetzt aber nicht die sichere Ausgabe: Ein Forum über JavaScript darf Code als Text akzeptieren und anzeigen.",
            "Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 35, 47 (inkl. Notizen); OWASP Cross Site Scripting Prevention Cheat Sheet"
          ],
          "remember": "Zuerst den Zielkontext bestimmen, dann die passende sichere Ausgabe wählen."
        },
        {
          "type": "slide",
          "title": "Browserfilter: die Folie ist historisch",
          "body": [
            "Die aufgeführten Schutzfunktionen alter Browser und der XSS Auditor sind keine verlässliche heutige Abwehrstrategie. MDN kennzeichnet X-XSS-Protection als veraltet und nicht standardisiert.",
            {
              "callout": {
                "tone": "warn",
                "title": "Nicht als aktuelle Browser-Matrix lernen",
                "text": "Lerne nicht «Browser X verhindert diesen Angriff immer». Prüfe die Anwendung selbst und verwende sichere Ausgabe sowie eine passende CSP. Die historischen Kommandozeilen- und Browserdetails sind Einordnung, keine empfohlene Konfiguration."
              }
            },
            "Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 36, 44 (inkl. Notizen); MDN: X-XSS-Protection"
          ],
          "remember": "Veraltete Browserfilter ersetzen keine sichere Anwendung."
        },
        {
          "type": "slide",
          "title": "CSP lesen und ihre Grenzen verstehen",
          "body": [
            "Eine Content Security Policy gibt dem Browser Regeln für Ressourcen und Codeausführung. Beispiel aus dem Thema: `default-src 'self'; img-src *; script-src 'self'` erlaubt Skriptdateien derselben Origin, während Bilder breiter erlaubt sind.",
            {
              "callout": {
                "tone": "warn",
                "title": "Präzisierung zu den Folien",
                "text": "Nicht schon irgendein CSP-Header verbietet sämtlichen Inline-Code. Die konkreten Direktiven und Ausnahmen entscheiden. Nonces oder Hashes können ausgewählten Inline-Code zulassen; unsafe-inline und unsafe-eval schwächen die entsprechenden Grenzen."
              }
            },
            "Anders als die Notiz zu Folie 44 behauptet, bekommt ein erlaubtes externes Skript keinen Freibrief für jede spätere Codeausführung. Eine passende CSP kann auch eval und eingespritzte Inline-Skripte blockieren. Das ergänzt sichere Programmierung, ersetzt sie aber nicht.",
            {
              "reveal": {
                "question": "Eigener Fall: Eine CSP enthält nur img-src. Ist daraus ein allgemeines Script-Verbot ableitbar?",
                "answer": "Nein. Die Bildregel legt keine allgemeine Script-Policy fest. Dafür die tatsächlich wirksamen Script-Direktiven und deren Fallbacks prüfen.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 37–38, 44 (inkl. Notizen); MDN: Content Security Policy (CSP)"
          ],
          "remember": "CSP wirkt nach ihren Regeln; weder der Headername noch eine erlaubte Datei garantiert Sicherheit."
        },
        {
          "type": "checkpoint",
          "id": "cp-defenses",
          "title": "Checkpoint: XSS Defenses",
          "questions": [
            {
              "id": "text",
              "type": "single",
              "prompt": "A UI must display an untrusted nickname as plain text. Which DOM sink fits?",
              "options": [
                "eval",
                "textContent",
                "Unvalidated innerHTML"
              ],
              "correct": 1,
              "explanation": "textContent behandelt den Namen als Text. Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 35–38, 44, 47 (inkl. Notizen); OWASP Cross Site Scripting Prevention Cheat Sheet; MDN: Content Security Policy (CSP); MDN: X-XSS-Protection"
            },
            {
              "id": "csp",
              "type": "multi",
              "prompt": "Which CSP statements are correct?",
              "options": [
                "Its directives determine the restrictions.",
                "A nonce or hash can authorize selected inline scripts.",
                "Any CSP header makes all XSS harmless.",
                "An allowed external script is automatically exempt from all execution restrictions."
              ],
              "correct": [
                0,
                1
              ],
              "explanation": "CSP wirkt nach konkreten Regeln und ergänzt sichere Ausgabe. Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 35–38, 44, 47 (inkl. Notizen); OWASP Cross Site Scripting Prevention Cheat Sheet; MDN: Content Security Policy (CSP); MDN: X-XSS-Protection"
            },
            {
              "id": "filter",
              "type": "single",
              "prompt": "How should the old browser XSS-filter table be treated?",
              "options": [
                "As a universal current guarantee",
                "As historical context, not a replacement for application defenses",
                "As proof stored XSS is impossible"
              ],
              "correct": 1,
              "explanation": "Die dort beschriebenen Filter sind keine verlässliche aktuelle Absicherung. Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 35–38, 44, 47 (inkl. Notizen); OWASP Cross Site Scripting Prevention Cheat Sheet; MDN: Content Security Policy (CSP); MDN: X-XSS-Protection"
            }
          ]
        },
        {
          "type": "slide",
          "title": "DOM-XSS: Source und Sink verfolgen",
          "body": [
            "Der DOM ist das vom Browser bereitgestellte Modell der Seite. Browser-JavaScript kann beispielsweise die aktuelle URL lesen und Inhalte verändern. Problematisch wird ein Datenfluss von einer beeinflussbaren Quelle (Source) in eine gefährliche Verwendung (Sink).",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Source",
                    "text": "Zum Beispiel ein URL-Parameter oder Fragment"
                  },
                  {
                    "title": "Verarbeitung",
                    "text": "Dekodieren, Ausschneiden oder Zusammensetzen"
                  },
                  {
                    "title": "Sink",
                    "text": "Zum Beispiel document.write oder eval"
                  },
                  {
                    "title": "Wirkung",
                    "text": "Die Eingabe wird als Markup oder Code interpretiert."
                  }
                ]
              }
            },
            "Das Fragment nach # wird beim normalen HTTP-Abruf nicht zum Server übertragen. Browser-JavaScript kann es trotzdem lesen. Ein serverseitiger Filter sieht diese Quelle daher nicht automatisch. DOM-XSS ist aber nicht auf Fragmente beschränkt.",
            {
              "reveal": {
                "question": "Eigener Fall: Der Server liefert unverändertes HTML. JavaScript kopiert einen URL-Wert unsicher in die Seite. Kann trotzdem XSS entstehen?",
                "answer": "Ja. Der gefährliche Einbau kann vollständig im Browser stattfinden. Serverseitige Reflexion ist keine Voraussetzung.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            "Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 39–44 (inkl. Notizen)"
          ],
          "remember": "Source, Transformation und Sink erklären die Schwachstelle besser als «steht irgendwo JavaScript?»."
        },
        {
          "type": "slide",
          "title": "Die eval-Rechnung aus der Vorlesung nachvollziehen",
          "body": [
            "Die Demo baut zunächst einen String aus `13 * ` und einem aus der URL gelesenen Wert. Bei 19 ergibt die beabsichtigte Rechnung 247. eval behandelt den zusammengesetzten String jedoch als JavaScript-Programm, nicht bloss als Zahl.",
            "Die Folie liest ab dem letzten Vorkommen von data= in der vollständigen URL. Dadurch kann ein Wert im Fragment die sichtbare Query übersteuern. Zusätzliche Anweisungen wären dann Teil des ausgewerteten Programms.",
            {
              "reveal": {
                "question": "Wie lässt sich dieselbe Multiplikation sicherer formulieren?",
                "answer": "Den vorgesehenen Parameter strukturiert auslesen, in eine Zahl umwandeln und auf einen erlaubten, endlichen Wert prüfen. Dann direkt mit 13 multiplizieren und das Ergebnis als Text ausgeben. eval und HTML-Interpretation werden dafür nicht benötigt.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "callout": {
                "tone": "tip",
                "title": "Eigene Kontrollrechnung",
                "text": "13 × 19 = 247. Ein korrektes Ergebnis bei normaler Eingabe beweist nicht, dass unerwartete Eingaben sicher verarbeitet werden."
              }
            },
            "Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 45–47 (inkl. Notizen)"
          ],
          "remember": "Daten als Daten verarbeiten; für einfache Rechnungen keinen Programmtext erzeugen."
        },
        {
          "type": "checkpoint",
          "id": "cp-dom",
          "title": "Checkpoint: DOM-based XSS",
          "questions": [
            {
              "id": "fragment",
              "type": "single",
              "prompt": "Which URL component is normally not sent in the HTTP request?",
              "options": [
                "The path",
                "The fragment after #",
                "The query before #"
              ],
              "correct": 1,
              "explanation": "Das Fragment bleibt beim normalen Abruf im Browser und ist dort dennoch lesbar. Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 39–47 (inkl. Notizen); OWASP Cross Site Scripting Prevention Cheat Sheet"
            },
            {
              "id": "repair",
              "type": "multi",
              "prompt": "Which changes address the multiplication demo at its root?",
              "options": [
                "Read the intended parameter with a structured parser.",
                "Validate a finite numeric value.",
                "Evaluate a concatenated expression with eval.",
                "Calculate directly and render the result as text."
              ],
              "correct": [
                0,
                1,
                3
              ],
              "explanation": "Strukturiertes Lesen, Typprüfung und direkte Rechnung vermeiden die Codeinterpretation. Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 39–47 (inkl. Notizen); OWASP Cross Site Scripting Prevention Cheat Sheet"
            },
            {
              "id": "product",
              "type": "type",
              "prompt": "In the benign lecture example, calculate 13 × 19 (number only).",
              "accept": [
                "247",
                "247.0",
                "247,0"
              ],
              "explanation": "13 × 19 = 247. Die korrekte Normalrechnung allein ist kein Sicherheitsbeweis. Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 39–47 (inkl. Notizen); OWASP Cross Site Scripting Prevention Cheat Sheet"
            }
          ]
        },
        {
          "type": "slide",
          "title": "Transfer: den fehlenden Schutz finden",
          "body": [
            {
              "reveal": {
                "question": "Eigener Fall: Ein Portal rotiert die Session-ID beim Login, rendert danach aber Bewertungen über unsicheres innerHTML. Ist die Sitzung damit vollständig geschützt?",
                "answer": "Nein. Rotation verhindert die beschriebene Fixation über die alte ID. Späteres XSS bleibt möglich und kann Aktionen in der neuen Sitzung auslösen. Die Ausgabe muss zusätzlich sicher werden.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Eine App prüft Eingaben serverseitig, liest im Browser aber ein Fragment und übergibt es an eval. Welche Grenze wurde übersehen?",
                "answer": "Das Fragment wurde beim Abruf nicht an den Server gesendet. Die verwundbare Verarbeitung liegt im Browser. Die Lösung adressiert den clientseitigen Datenfluss und vermeidet eval.",
                "label": "Eigene Antwort vergleichen"
              }
            },
            {
              "checklist": {
                "title": "Kann ich das erklären und anwenden?",
                "items": [
                  "Ich kann Enumeration von Passwortversuchen unterscheiden.",
                  "Ich kann erklären, weshalb ein Reset ebenfalls Authentifizierung absichern muss.",
                  "Ich kann Fixation und Session-Diebstahl samt Gegenmassnahmen unterscheiden.",
                  "Ich kann Reflected/Stored und Server/Client getrennt einordnen.",
                  "Ich kann HttpOnly, Encoding, Sanitizing und CSP mit ihren Grenzen erklären.",
                  "Ich kann einen DOM-Datenfluss vom Eingang bis zur gefährlichen Verwendung verfolgen."
                ]
              }
            },
            "Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 3–47 (inkl. Notizen)"
          ],
          "remember": "Eine richtige Massnahme ersetzt nicht die anderen erforderlichen Schutzgrenzen."
        },
        {
          "type": "slide",
          "title": "Was du nachschlägst statt auswendig lernst",
          "body": [
            "Die alten WebGoat- und Burp-Screenshots erklären einen Ablauf; heutige Versionsnummern, Menüpunkte und historische Browserfilter sind kein unveränderlicher Prüfstein. Im Vordergrund stehen Datenfluss, Ursache und begründete Abwehr.",
            "Die Empfangsskripte und Formular-Demos illustrieren Transport und Folgen. Du sollst verstehen, warum die Kette möglich wird; ein bestimmter Demo-Hostname oder die genaue Länge einer Beispielantwort ist Zusatzwissen.",
            {
              "callout": {
                "tone": "tip",
                "title": "Quellenkorrekturen sichtbar halten",
                "text": "Die Präzisierungen dieser Lektion betreffen Passwortregeln, Session-Schutz, kontextgerechte Ausgabe, alte Browserfilter und CSP. Bei abweichendem Folienwortlaut unterscheide die historische Demo von der heutigen technischen Aussage."
              }
            },
            "Quelle: WebAppSecurityTesting2.pdf, PDF-Seite/Folie 5–7, 12–15, 25–38, 44 (inkl. Notizen)"
          ],
          "remember": "Lerne die Mechanismen; schlage versionsabhängige Werkzeugdetails gezielt nach."
        }
      ]
    },
    {
      "id": "w5",
      "number": 5,
      "title": "Web Application Security Testing 3: Access Control, CSRF und Testing Tools",
      "status": "ready",
      "items": [
        {
          "type": "slide",
          "title": "Woche 5: Wer darf was – und wer hat es ausgelöst?",
          "body": [
            "Ein gültiger Login beantwortet nur, wer eine Anfrage stellt. Diese Woche ergänzt zwei andere Fragen: Darf diese Person die Funktion und das konkrete Objekt benutzen? Und stammt eine zustandsändernde Anfrage tatsächlich aus einer beabsichtigten Benutzeraktion?",
            {
              "cards": [
                {
                  "title": "Zugriffskontrolle",
                  "text": "Funktionsrechte und Objektrechte unterscheiden, testen und serverseitig durchsetzen."
                },
                {
                  "title": "CSRF",
                  "text": "Die fremd ausgelöste Anfrage verstehen und Token, SameSite sowie Browserregeln korrekt einordnen."
                },
                {
                  "title": "Testwerkzeuge",
                  "text": "Dynamische, statische und LLM-gestützte Befunde prüfen statt Trefferzahlen mit Sicherheit gleichzusetzen."
                }
              ]
            },
            {
              "callout": {
                "tone": "tip",
                "text": "Erklärungen sind auf Deutsch, Checkpoints auf Englisch. Eigene Fälle dienen dem Transfer. Schwerpunkt sind Mechanismen und begründete Testentscheidungen; die Gewichtung ist keine Prüfungszusage."
              }
            },
            "Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 3, 8, 17–18, 31, 45–46 (inkl. Notizen)."
          ],
          "remember": "Authentifiziert, autorisiert und absichtlich ausgelöst sind drei verschiedene Eigenschaften."
        },
        {
          "type": "slide",
          "title": "Zwei Ebenen der Zugriffskontrolle",
          "body": [
            {
              "compare": {
                "left": {
                  "title": "Function level",
                  "points": [
                    "Darf die Person diese Funktion überhaupt benutzen?",
                    "Beispiel der Vorlesung: Ein Kunde ruft eine Admin-Funktion auf."
                  ]
                },
                "right": {
                  "title": "Object level",
                  "points": [
                    "Darf die Person diese Funktion für genau dieses Objekt benutzen?",
                    "Beispiel der Vorlesung: Ein Verkäufer verändert das Produkt eines anderen Verkäufers."
                  ]
                },
                "verdict": "Eine erlaubte Funktion kann für ein fremdes Objekt trotzdem verboten sein."
              }
            },
            "Authentifizierung ist keine vollständige Autorisierung. Auch hinter einer Login-Schranke können fremde Profile oder Rechnungen erreichbar bleiben. Versteckte Menüpunkte und schwer erratbare URLs ersetzen keine Berechtigungsprüfung.",
            {
              "reveal": {
                "question": "Eigener Kurzfall: Kundin A darf Rechnungen herunterladen. Sie ändert die Rechnungs-ID und erhält die Rechnung von B. Welche Ebene fehlt?",
                "answer": "Die Objektberechtigung: Der Download als Funktion ist erlaubt, der Zugriff auf die Rechnung von B nicht.",
                "label": "Überlegen, dann aufdecken"
              }
            },
            "Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 3–8, 14–15 (inkl. Notizen)."
          ],
          "remember": "Prüfe Funktion UND Objekt."
        },
        {
          "type": "slide",
          "title": "Zugriffsrechte mit kontrollierten Vergleichen testen",
          "body": [
            "Im autorisierten Test helfen Konten mit unterschiedlichen Rollen und zwei bekannte, getrennt zugeordnete Testobjekte. So weisst du, welche Anfragen erlaubt sein sollen. Nur zufällige IDs zu probieren liefert bei einem Fehlschlag wenig Aussagekraft.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Referenz erfassen",
                    "text": "Mit dem berechtigten Testkonto Funktion und Objekt aufrufen."
                  },
                  {
                    "title": "Eine Grenze ändern",
                    "text": "Mit einer anderen Rolle dieselbe Funktion oder als zweiter Eigentümer dasselbe Objekt anfragen."
                  },
                  {
                    "title": "Wirkung prüfen",
                    "text": "Antwortinhalt und tatsächliche Datenänderung mit den erwarteten Rechten vergleichen."
                  }
                ]
              }
            },
            {
              "table": {
                "head": [
                  "Beobachtung",
                  "Was sie belegt"
                ],
                "rows": [
                  [
                    "Fremde Daten werden geliefert",
                    "Unberechtigter Zugriff für diesen geprüften Fall."
                  ],
                  [
                    "Zugriff abgelehnt, keine Wirkung",
                    "Die konkrete Grenze wurde eingehalten; kein Beweis für alle Endpunkte."
                  ],
                  [
                    "Object not found bei unbekannter ID",
                    "Unklar: Objekt könnte fehlen oder absichtlich verborgen werden."
                  ]
                ]
              }
            },
            "IDs können im Pfad, in Query-Parametern oder im Request-Body/JSON stehen. Prüfe auch schreibende Methoden; ein erfolgreicher GET-Test deckt POST, PUT oder DELETE nicht automatisch ab.",
            "Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 5–10, 12–14 (inkl. Notizen)."
          ],
          "remember": "Ein aussagekräftiger Negativtest braucht ein bekanntes Objekt und eine bekannte Berechtigungsgrenze."
        },
        {
          "type": "slide",
          "title": "Die Abwehr gehört auf den Server",
          "body": [
            "Das Profilbeispiel der Vorlesung ist auf Funktionsebene geschützt, vertraut aber einer vom Browser gelieferten pid. Für das eigene Profil kann der Server das Konto aus der authentifizierten Session bestimmen. Für frei wählbare Objekte bleibt eine explizite Prüfung gegen die geltenden Zugriffsregeln nötig.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Identität bestimmen",
                    "text": "Vertrauenswürdige Session auswerten."
                  },
                  {
                    "title": "Funktion prüfen",
                    "text": "Ist diese Aktion für die Rolle erlaubt?"
                  },
                  {
                    "title": "Objekt prüfen",
                    "text": "Darf diese Identität auf das ausgewählte Objekt zugreifen?"
                  },
                  {
                    "title": "Erst dann ausführen",
                    "text": "Daten liefern oder ändern."
                  }
                ]
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Der Server ersetzt fortlaufende Rechnungsnummern durch zufällige IDs. Ist die fehlende Objektprüfung damit behoben?",
                "answer": "Nein. Schwer erratbare IDs erschweren das Finden fremder Objekte, erlauben aber keinen Zugriff darauf. Auch eine anderweitig bekannt gewordene ID muss die Objektprüfung durchlaufen.",
                "label": "Überlegen, dann aufdecken"
              }
            },
            "Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 11–15 (inkl. Notizen)."
          ],
          "remember": "Clientseitige Sichtbarkeit ist keine serverseitige Erlaubnis."
        },
        {
          "type": "checkpoint",
          "id": "cp-access-control",
          "title": "Checkpoint: Function and object permissions",
          "questions": [
            {
              "id": "function-case",
              "type": "single",
              "prompt": "A customer can directly call an administrator-only export endpoint. Which check is primarily missing?",
              "options": [
                "Function-level authorization",
                "CSRF token validation",
                "Object ownership within an otherwise permitted customer function",
                "HTML output encoding"
              ],
              "correct": 0,
              "explanation": "The customer must not use this function at all. Hiding the menu does not enforce that rule. Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 3–7 (inkl. Notizen)."
            },
            {
              "id": "object-fix",
              "type": "multi",
              "prompt": "A logged-in user changes invoiceId and reads another customer’s invoice. Which measures address authorization?",
              "options": [
                "Check the user’s permission for the selected invoice on the server",
                "Hide invoiceId in a hidden form field",
                "Derive the account from the session when only the user’s own account is needed",
                "Replace the ID with an unpredictable value and remove permission checks"
              ],
              "correct": [
                0,
                2
              ],
              "explanation": "The server needs a trusted identity and a permission decision. Hidden or random identifiers do not replace authorization. Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 8, 14–15 (inkl. Notizen)."
            },
            {
              "id": "not-found",
              "type": "single",
              "prompt": "An unknown invoice ID returns “not found”. What is the best next test within an authorized test environment?",
              "options": [
                "Conclude that object authorization is correct",
                "Use a known existing invoice owned by a second test account and verify the result",
                "Switch to HTTPS to bypass the authorization check",
                "Remove the session so ownership is irrelevant"
              ],
              "correct": 1,
              "explanation": "The unknown ID may simply not exist. A known foreign test object isolates the permission question. Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 10 (inkl. Notizen)."
            },
            {
              "id": "access-sequence",
              "type": "order",
              "prompt": "Order this server-side handling of a protected object operation.",
              "items": [
                "Resolve the authenticated identity",
                "Verify permission to use the function",
                "Verify permission for the selected object",
                "Perform the requested operation"
              ],
              "explanation": "Both authorization decisions precede the protected operation; the identity is their input. Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 15 (inkl. Notizen)."
            }
          ]
        },
        {
          "type": "slide",
          "title": "CSRF: Eine echte Session, aber ein fremder Auftrag",
          "body": [
            "Bei Cross-Site Request Forgery bringt eine fremde Seite den Browser dazu, eine unerwünschte Aktion an einer Zielanwendung anzufragen. Wird dabei die vorhandene Session mitgesendet, handelt der Server unter der Identität des Opfers. Das Passwort oder den Cookie-Wert muss der Angreifer dafür nicht kennen.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Angemeldet",
                    "text": "Das Opfer hat eine aktive Session bei der Zielanwendung."
                  },
                  {
                    "title": "Fremder Auslöser",
                    "text": "Eine andere Seite löst einen passend aufgebauten Request aus."
                  },
                  {
                    "title": "Browser sendet",
                    "text": "Passende Cookies werden gesendet, soweit Cookie- und Browserregeln das erlauben."
                  },
                  {
                    "title": "Server verwechselt Absicht",
                    "text": "Ohne wirksamen CSRF-Schutz wird die Aktion als legitimer Benutzerauftrag behandelt."
                  }
                ]
              }
            },
            {
              "callout": {
                "tone": "warn",
                "text": "Die Folie sagt vereinfacht, Cookies würden immer mitgeschickt. Tatsächlich gelten unter anderem SameSite, Secure, Domain/Path und Browserrichtlinien. Die folgenden Beispiele setzen voraus, dass die benötigte Session mitgesendet wird."
              }
            },
            "Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 17–18, 29 (inkl. Notizen)."
          ],
          "remember": "CSRF missbraucht die Session des Opfers, ohne sie zwingend zu stehlen."
        },
        {
          "type": "slide",
          "title": "GET, POST und versteckte Anfragen",
          "body": [
            {
              "table": {
                "head": [
                  "Mechanismus aus den Folien",
                  "Ausgelöste Anfrage",
                  "Lernpunkt"
                ],
                "rows": [
                  [
                    "Eingebettetes Bild",
                    "GET an die Bildadresse",
                    "Auch ein scheinbares Bild kann einen Endpunkt ansprechen."
                  ],
                  [
                    "Automatisch abgesendetes Formular",
                    "POST mit Formularfeldern",
                    "POST allein beweist keine bewusste Benutzeraktion."
                  ],
                  [
                    "Formular in einem unsichtbaren Frame",
                    "Formularanfrage im Hintergrund",
                    "Die fehlende sichtbare Wirkung bedeutet nicht, dass nichts passiert."
                  ],
                  [
                    "fetch / XMLHttpRequest",
                    "Programmatisch erzeugte Anfrage",
                    "Sende- und Leserechte sowie Cookies getrennt prüfen."
                  ]
                ]
              }
            },
            "Im Message-Board-Beispiel kennt die fremde Seite den Aufbau des Beitrags-Requests. Den Absender bestimmt die Zielanwendung anhand der Session des Opfers. Mehrstufige Abläufe können ebenfalls betroffen sein, wenn sich alle benötigten Schritte ohne unbekannte Schutzwerte erzeugen lassen.",
            {
              "callout": {
                "tone": "tip",
                "text": "GET soll keine fachlichen Zustandsänderungen auslösen. Der Wechsel auf POST ist sinnvoll, ersetzt jedoch keinen CSRF-Schutz."
              }
            },
            "Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 19–27 (inkl. Notizen)."
          ],
          "remember": "Die HTTP-Methode allein belegt keine Absicht."
        },
        {
          "type": "slide",
          "title": "CORS: Request senden ist nicht Response lesen",
          "body": [
            "Die Same-Origin-Policy verhindert nicht pauschal jede Anfrage an einen anderen Ursprung. Gewöhnliche Formulare und bestimmte einfache Cross-Origin-Requests können gesendet werden, ohne dass die Zielseite vorher CORS freigibt. Der Zugriff des fremden Scripts auf die Antwort ist eine andere Frage.",
            {
              "compare": {
                "left": {
                  "title": "Einfache Anfrage",
                  "points": [
                    "Zum Beispiel ein Formular-POST mit application/x-www-form-urlencoded.",
                    "Kann die Zielanwendung erreichen, auch wenn das Script die Antwort nicht lesen darf."
                  ]
                },
                "right": {
                  "title": "Anfrage mit Preflight",
                  "points": [
                    "Zum Beispiel ein Cross-Origin-PUT oder ein Request mit nicht freigegebenen eigenen Headern.",
                    "Der Browser fragt zuerst mit OPTIONS nach der CORS-Erlaubnis."
                  ]
                }
              }
            },
            "Bei fetch fordert credentials: include das Mitsenden passender Credentials an; es hebt SameSite und Browserbeschränkungen nicht auf. Ein CORS-Fehler im Script beweist daher weder allgemein, dass nichts gesendet wurde, noch dass eine Zustandsänderung stattgefunden hat. Prüfe die tatsächliche Serverwirkung.",
            "Präzisierung der Foliennotizen: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
            "Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 26–27 (inkl. Notizen)."
          ],
          "remember": "Antwort nicht lesbar bedeutet nicht automatisch Aktion verhindert."
        },
        {
          "type": "slide",
          "title": "CSRF erkennen statt Schutz erraten",
          "body": [
            "Beginne bei einer sensiblen Aktion und ihrem normalen Request: Welche Session wird gebraucht? Sind alle handlungsrelevanten Werte vorhersehbar? Prüft der Server einen unbekannten, an die Session gebundenen Token oder eine andere wirksame Herkunftsabsicherung?",
            {
              "reveal": {
                "question": "Eigener Fall: Ein Testformular löst bei einer angemeldeten Testperson eine Adressänderung aus. Das Script meldet anschliessend einen CORS-Fehler. Was ist der entscheidende Befund?",
                "answer": "Prüfe das gespeicherte Profil. Wurde es ohne beabsichtigte Freigabe geändert, ist die Aktion erfolgt – auch ohne lesbare Antwort. Dokumentiere zugleich Cookie-Einstellungen und Request-Typ.",
                "label": "Überlegen, dann aufdecken"
              }
            },
            {
              "compare": {
                "left": {
                  "title": "Broken access control",
                  "points": [
                    "Der Anfragende überschreitet seine eigenen Rechte.",
                    "Abwehr: Funktion und Objekt autorisieren."
                  ]
                },
                "right": {
                  "title": "CSRF",
                  "points": [
                    "Die Rechte einer anderen, angemeldeten Person werden für einen fremd ausgelösten Auftrag benutzt.",
                    "Abwehr: Die Anfrage gegen CSRF absichern."
                  ]
                }
              }
            },
            "Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 3, 8, 17–19, 27–29 (inkl. Notizen)."
          ],
          "remember": "Autorisierung und CSRF-Schutz lösen unterschiedliche Probleme."
        },
        {
          "type": "checkpoint",
          "id": "cp-csrf-mechanism",
          "title": "Checkpoint: CSRF and browser behaviour",
          "questions": [
            {
              "id": "csrf-prerequisites",
              "type": "multi",
              "prompt": "In the cookie-based CSRF scenario from the lecture, which conditions enable the unwanted action?",
              "options": [
                "The victim’s authenticated session accompanies the request",
                "The attacker must know the victim’s password",
                "The attacker can construct the action request without an unknown validated protection value",
                "The server accepts that request without effective CSRF protection"
              ],
              "correct": [
                0,
                2,
                3
              ],
              "explanation": "The browser supplies the victim’s session subject to cookie policy. The attacker need not know the password or read the cookie. Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 17–19, 28–29 (inkl. Notizen)."
            },
            {
              "id": "cors-result",
              "type": "single",
              "prompt": "A simple cross-origin form POST changes a test account’s address, but the response is unavailable to the attacking page. What follows?",
              "options": [
                "The unavailable response proves CSRF was prevented",
                "The action succeeded; response access and request effects are separate",
                "The request must have used a stolen password",
                "All cross-origin POST requests require a successful preflight"
              ],
              "correct": 1,
              "explanation": "A simple request can cause a state change without granting the other origin access to its response. Präzisierung: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 27 (inkl. Notizen)."
            },
            {
              "id": "csrf-name",
              "type": "type",
              "prompt": "Name the attack that causes a logged-in victim’s browser to submit an unwanted authenticated request. Use its English name or abbreviation.",
              "accept": [
                "CSRF",
                "Cross-Site Request Forgery",
                "Cross Site Request Forgery"
              ],
              "placeholder": "English term or abbreviation",
              "explanation": "CSRF abuses the victim’s authenticated context. Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 17–18 (inkl. Notizen)."
            },
            {
              "id": "post-only",
              "type": "single",
              "prompt": "A developer replaces a state-changing GET with POST and adds no further protection. Which assessment is correct?",
              "options": [
                "POST alone prevents forged requests",
                "The method is improved, but cross-site forms can still submit POST requests under suitable cookie conditions",
                "The change fixes object-level access control",
                "Only a readable response can make this exploitable"
              ],
              "correct": 1,
              "explanation": "POST is not a proof of user intent. The lecture demonstrates automatically submitted forms. Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 20–27 (inkl. Notizen)."
            }
          ]
        },
        {
          "type": "slide",
          "title": "CSRF-Token: Ein Wert, den die fremde Seite nicht kennt",
          "body": [
            "Beim Synchronizer-Token-Verfahren erzeugt der Server einen ausreichend zufälligen Token, verknüpft ihn mit der Session und gibt ihn an seine eigenen Seiten weiter. Geschützte Anfragen müssen ihn zusätzlich zur Session übermitteln. Der Server prüft ihn vor der Aktion; fehlende oder falsche Werte führen zur Ablehnung.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Erzeugen und binden",
                    "text": "Unvorhersehbaren Token für die Session bereitstellen."
                  },
                  {
                    "title": "In Anfrage aufnehmen",
                    "text": "Zum Beispiel als Formularfeld im POST-Body."
                  },
                  {
                    "title": "Serverseitig vergleichen",
                    "text": "Token gegen den erwarteten Session-Wert prüfen."
                  },
                  {
                    "title": "Bei Fehler abbrechen",
                    "text": "Keine geschützte Aktion ausführen."
                  }
                ]
              }
            },
            {
              "callout": {
                "tone": "warn",
                "text": "Ein Feld namens csrf reicht nicht: Ein konstanter Wert oder eine fehlende Serverprüfung schützt nicht. Den Token nicht in URLs transportieren, wo er in Verlauf oder Logs geraten kann. Die Folie nennt noch GET-Parameter; diese Variante übernehmen wir nicht."
              }
            },
            "Präzisierung: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html",
            "Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 28 (inkl. Notizen)."
          ],
          "remember": "Session-Cookie identifiziert; ein korrekt geprüftes CSRF-Token erschwert fremd erzeugte Aufträge."
        },
        {
          "type": "slide",
          "title": "SameSite genau genug verstehen",
          "body": [
            "Die folgenden expliziten Einstellungen gelten zusätzlich zu den übrigen Cookie- und Browserregeln:",
            {
              "cards": [
                {
                  "title": "Strict",
                  "text": "Cookie nur im Same-Site-Kontext."
                },
                {
                  "title": "Lax",
                  "text": "Zusätzlich bei Navigation der obersten Seite mit sicherer Methode, etwa GET. Nicht bei eingebetteten Bildern, Frames oder fetch allein wegen GET."
                },
                {
                  "title": "None; Secure",
                  "text": "SameSite erlaubt Cross-Site-Verwendung; Secure und weitere Browserregeln gelten weiterhin."
                }
              ]
            },
            "Die Aussage „Lax erlaubt cross-site GET“ auf Folie 29 ist zu weit: Auch der Navigationskontext zählt. Für unsere Aufgaben gilt ein explizites SameSite=Lax, damit browserspezifische Sonderregeln für einen fehlenden Wert keine Mehrdeutigkeit erzeugen.",
            {
              "reveal": {
                "question": "Eigener Fall: Eine Anwendung löscht per GET. Eine fremde Seite lässt die Testperson einen normalen Link dorthin öffnen. Reicht Lax?",
                "answer": "Nein. Bei einer Top-Level-GET-Navigation kann das Cookie mitgehen. Zustandsändernde GET-Endpunkte und fehlenden CSRF-Schutz beheben.",
                "label": "Überlegen, dann aufdecken"
              }
            },
            "Präzisierung: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie",
            "Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 29 (inkl. Notizen)."
          ],
          "remember": "Bei Lax zählen Methode UND Navigationskontext."
        },
        {
          "type": "slide",
          "title": "Schutzmassnahmen nicht verwechseln",
          "body": [
            {
              "table": {
                "head": [
                  "Kontrolle",
                  "Was du damit begründest"
                ],
                "rows": [
                  [
                    "Autorisierung",
                    "Diese Identität darf diese Aktion an diesem Objekt ausführen."
                  ],
                  [
                    "CSRF-Schutz",
                    "Eine fremde Seite kann keinen akzeptierten Auftrag allein aus vorhersehbaren Werten erzeugen."
                  ],
                  [
                    "HttpOnly",
                    "JavaScript kann den Cookie-Wert nicht direkt lesen; der Browser kann ihn dennoch mitsenden."
                  ],
                  [
                    "XSS-Abwehr",
                    "Nicht vertrauenswürdige Daten werden im passenden Ausgabekontext nicht als aktiver Code interpretiert."
                  ]
                ]
              }
            },
            "SameSite ist eine zusätzliche Schutzschicht, kein pauschaler Ersatz für die Prüfung sensibler Requests. Same-site ist zudem nicht gleich same-origin: Zwei HTTPS-Subdomains derselben registrierbaren Domain können same-site sein. CSRF-Token ersetzen ihrerseits keine XSS-Abwehr.",
            {
              "reveal": {
                "question": "Eigener Fall: Ein Shop prüft CSRF-Token, erlaubt eingeloggten Verkäufern aber jede Produkt-ID. Was bleibt offen?",
                "answer": "Objektautorisierung: Ein Verkäufer kann mit seinem eigenen gültigen Token ein fremdes Produkt ändern, falls die Berechtigungsprüfung fehlt.",
                "label": "Überlegen, dann aufdecken"
              }
            },
            "Ergänzende Präzisierung zu SameSite und XSS: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html",
            "Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 15, 28–29 (sowie W4: WebAppSecurityTesting2.pdf, 25, 35–38) (inkl. Notizen)."
          ],
          "remember": "Eine korrekte Schutzmassnahme deckt nicht automatisch andere Fehlerklassen ab."
        },
        {
          "type": "checkpoint",
          "id": "cp-csrf-defenses",
          "title": "Checkpoint: Tokens and SameSite",
          "questions": [
            {
              "id": "token-sequence",
              "type": "order",
              "prompt": "Order the synchronizer-token flow.",
              "items": [
                "Generate an unpredictable token and associate it with the session",
                "Include the token in a legitimate protected request",
                "Validate the received token against the session’s expected value",
                "Execute the action only after successful validation"
              ],
              "explanation": "A token is effective only if checked before the protected operation. Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 28 (inkl. Notizen)."
            },
            {
              "id": "lax-context",
              "type": "multi",
              "prompt": "Assume an explicit SameSite=Lax session cookie and otherwise matching cookie attributes. In which cross-site cases does Lax permit the cookie?",
              "options": [
                "A top-level navigation through an ordinary GET link",
                "A GET issued by an embedded image",
                "A cross-site fetch GET",
                "A top-level GET navigation to a badly designed state-changing endpoint"
              ],
              "correct": [
                0,
                3
              ],
              "explanation": "Lax allows safe-method top-level navigation, even if a server wrongly assigns a state change to GET. Image and fetch requests do not satisfy that context. Präzisierung: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 29 (inkl. Notizen)."
            },
            {
              "id": "token-validation",
              "type": "single",
              "prompt": "Every form contains csrf=12345 and the server only checks whether the field exists. What is the problem?",
              "options": [
                "The value is predictable and is not validated as a session-bound secret",
                "CSRF tokens must be placed in URLs",
                "The use of POST prevents any remaining attack",
                "A longer parameter name would provide sufficient entropy"
              ],
              "correct": 0,
              "explanation": "An attacker can reproduce a constant field. The server must reject missing or invalid protection values. Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 28 (inkl. Notizen)."
            },
            {
              "id": "httponly",
              "type": "single",
              "prompt": "A valid session cookie is HttpOnly. Does this alone prevent cookie-based CSRF?",
              "options": [
                "Yes, because no script can send a request with it",
                "No, because HttpOnly prevents script access to the cookie value, not its automatic inclusion in matching requests",
                "Yes, provided the target uses POST",
                "No, because HttpOnly makes the cookie public"
              ],
              "correct": 1,
              "explanation": "CSRF does not require the attacker to read the session cookie. Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 17–18 (sowie W4: WebAppSecurityTesting2.pdf, 25) (inkl. Notizen)."
            }
          ]
        },
        {
          "type": "slide",
          "title": "Dynamisch und statisch: zwei Blickrichtungen",
          "body": [
            {
              "compare": {
                "left": {
                  "title": "Dynamisch: laufende Anwendung",
                  "points": [
                    "Ein Scanner wie ZAP beobachtet HTTP-Verhalten.",
                    "Er braucht erreichbare Funktionen und gegebenenfalls eine gültige Session.",
                    "Er kann reale Header, Antworten und Auswirkungen sehen."
                  ]
                },
                "right": {
                  "title": "Statisch: Code oder Bytecode",
                  "points": [
                    "Die Anwendung muss für diese Analyse nicht laufen.",
                    "Fortify untersucht im Kurs Quellcode, SpotBugs Java-Bytecode.",
                    "Frameworkwissen und Datenflussmodelle bestimmen mit, welche Fehler sichtbar werden."
                  ]
                }
              }
            },
            "Auch die hier gezeigte LLM-Codeprüfung ist eine statische Betrachtung, solange die Anwendung nicht ausgeführt wird. Tools ergänzen sich: Ein Codebefund kann eine problematische Stelle zeigen, ein dynamischer Test deren Wirkung in der Testumgebung.",
            {
              "callout": {
                "tone": "tip",
                "text": "Die folgenden Tool-Ergebnisse stammen aus der konkreten Marketplace-Demo. Sie sind kein aktueller Produktvergleich und keine Rangliste."
              }
            },
            "Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 31–33, 38, 41, 43–45 (inkl. Notizen)."
          ],
          "remember": "Wähle das Werkzeug nach der Beweisfrage."
        },
        {
          "type": "slide",
          "title": "ZAP: Abdeckung kommt vor Aussagekraft",
          "body": [
            {
              "flow": {
                "steps": [
                  {
                    "title": "Anwendung erkunden",
                    "text": "Crawling findet Seiten, Formulare und weitere Requests."
                  },
                  {
                    "title": "Testfälle erzeugen",
                    "text": "Gefundene Requests werden mit passenden Testeingaben variiert."
                  },
                  {
                    "title": "Beobachtungen auswerten",
                    "text": "Antwort, Laufzeit oder Header liefern Hinweise auf Schwachstellen."
                  }
                ]
              }
            },
            "Der Scanner kann nur erkundete Bereiche prüfen. Ungültige Formulardaten können ihn vor einem mehrstufigen Ablauf stoppen. Eine abgelaufene Session oder ein versehentlich ausgelöstes Logout versteckt geschützte Funktionen. Im Test helfen passende Eingabedaten und ergänzendes manuelles Browsen durch den Proxy.",
            {
              "reveal": {
                "question": "Eigener Fall: Ein Shop-Scan meldet keine Checkout-Probleme. Im Verlauf steht bei jedem Formular „ungültige Postleitzahl“. Wie belastbar ist das Ergebnis?",
                "answer": "Für den Checkout ist es nicht belastbar: Der Scanner hat den Ablauf vermutlich nicht erreicht. Gültige Testdaten einrichten und den erreichten Bereich nachweisen.",
                "label": "Überlegen, dann aufdecken"
              }
            },
            {
              "callout": {
                "tone": "warn",
                "text": "Crawling und aktive Tests können Daten verändern. Eine geeignete Testumgebung und wiederherstellbare Testdaten verhindern, dass gelöschte Objekte späteren Tests die Grundlage entziehen."
              }
            },
            "Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 33, 37 (inkl. Notizen)."
          ],
          "remember": "Nicht erreicht ist nicht geprüft."
        },
        {
          "type": "slide",
          "title": "Ein Alert ist zunächst ein Befund",
          "body": [
            {
              "table": {
                "head": [
                  "Begriff",
                  "Bedeutung"
                ],
                "rows": [
                  [
                    "True positive",
                    "Gemeldete Schwachstelle bestätigt sich."
                  ],
                  [
                    "False positive",
                    "Gemeldete Schwachstelle liegt in diesem Kontext nicht vor."
                  ],
                  [
                    "False negative",
                    "Eine vorhandene Schwachstelle wird übersehen."
                  ]
                ]
              }
            },
            "In der ZAP-Demo werden acht unterschiedliche Befunde gezählt: sechs als echt eingeordnet, zwei als falsch. Eine SQL-Injection wird von zwei Plugins gemeldet. Mehr Meldungen können also denselben Fehler betreffen; eine Trefferzahl ist kein Vollständigkeitsbeweis.",
            "Aktive Tests ändern Eingaben, etwa um einen reproduzierbaren Laufzeiteffekt zu prüfen. Passive Checks lesen vorhandene Antworten, zum Beispiel Set-Cookie. Ein fehlendes Token-Feld ist zunächst ein Hinweis: Ob eine ausnutzbare CSRF-Lücke besteht, hängt auch von anderen wirksamen Schutzmassnahmen ab.",
            {
              "reveal": {
                "question": "Eigene Beweisfrage: Eine einzelne Antwort dauert ungewöhnlich lange. Reicht das als SQL-Injection-Nachweis?",
                "answer": "Nein. Kontrollanfragen und wiederholbare Unterschiede sind nötig, um normale Last oder Netzwerkverzögerungen als Erklärung zu prüfen. Die Kursdemo zeigt einen gezielt ausgelösten Effekt.",
                "label": "Überlegen, dann aufdecken"
              }
            },
            "Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 34–37, 42 (inkl. Notizen)."
          ],
          "remember": "Befund, Reproduktion und Reichweite getrennt dokumentieren."
        },
        {
          "type": "checkpoint",
          "id": "cp-dynamic-testing",
          "title": "Checkpoint: Dynamic testing and evidence",
          "questions": [
            {
              "id": "coverage",
              "type": "single",
              "prompt": "A scanner never passes a form because its generated data is invalid. A clean scan then means:",
              "options": [
                "The workflow after that form was not adequately tested",
                "The workflow is free of injection vulnerabilities",
                "Static analysis would need the same valid HTTP form data",
                "Authentication no longer matters"
              ],
              "correct": 0,
              "explanation": "Coverage is limited by discovery. Reach the workflow using valid data or manual proxy-assisted exploration. Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 37 (inkl. Notizen)."
            },
            {
              "id": "scan-quality",
              "type": "multi",
              "prompt": "Which actions improve the quality of an authorized dynamic test?",
              "options": [
                "Verify that the scanner remains authenticated",
                "Check that required multi-step workflows were reached",
                "Treat every missing token field as conclusive proof of CSRF",
                "Preserve or restore test data needed by later requests"
              ],
              "correct": [
                0,
                1,
                3
              ],
              "explanation": "Authentication, reachability and stable test state affect coverage. A passive warning needs contextual validation. Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 36–37 (inkl. Notizen)."
            },
            {
              "id": "false-positive",
              "type": "type",
              "prompt": "A tool reports a vulnerability, but investigation shows it is not present. Give the English classification or abbreviation.",
              "accept": [
                "false positive",
                "false-positive",
                "FP"
              ],
              "placeholder": "English term or abbreviation",
              "explanation": "A false positive is an incorrect positive finding; a false negative is a missed real flaw. Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 34, 39–42 (inkl. Notizen)."
            },
            {
              "id": "passive-check",
              "type": "single",
              "prompt": "Which activity is passive analysis of existing traffic?",
              "options": [
                "Submitting a modified parameter to trigger a time delay",
                "Reading the received Set-Cookie header for attributes",
                "Sending requests with many alternative object IDs",
                "Submitting an unexpected value to a purchase endpoint"
              ],
              "correct": 1,
              "explanation": "Reading observed traffic is passive; generating changed test requests is active. Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 35–36 (inkl. Notizen)."
            }
          ]
        },
        {
          "type": "slide",
          "title": "Statische Analyse braucht mehr als Syntax",
          "body": [
            "Fortify sucht im Kurs unter anderem nach unsicheren Funktionen, auffälligen Konfigurationen und Datenflüssen von Benutzereingaben zu SQL oder HTML. SpotBugs mit Find Security Bugs arbeitet auf Java-Bytecode. Beide können Fundstellen im Programm zeigen.",
            {
              "flow": {
                "steps": [
                  {
                    "title": "Quelle einer Eingabe",
                    "text": "Woher kommt ein nicht vertrauenswürdiger Wert?"
                  },
                  {
                    "title": "Verarbeitung",
                    "text": "Welche Prüfungen oder Umwandlungen erfolgen?"
                  },
                  {
                    "title": "Sensible Verwendung",
                    "text": "Geht der Wert in eine SQL-Abfrage, HTML-Ausgabe oder andere kritische Operation?"
                  }
                ]
              }
            },
            "Sprache zu unterstützen heisst noch nicht, Framework und Template-System ausreichend zu verstehen. In der Marketplace-Demo übersehen beide Tools das reflektierte XSS; Fortify übersieht auch SQL-Injection. Die Folien nennen fehlendes Frameworkverständnis als vermutete Erklärung, nicht als bewiesene Ursache.",
            {
              "reveal": {
                "question": "Eigene Verständnisfrage: Alle Dateien wurden eingelesen. Sind damit alle Schwachstellen geprüft?",
                "answer": "Nein. Dateiabdeckung ist keine vollständige semantische Analyse. Datenflüsse, Frameworkverhalten und Geschäftsregeln können unzureichend modelliert sein.",
                "label": "Überlegen, dann aufdecken"
              }
            },
            "Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 38, 40–42, 45 (inkl. Notizen)."
          ],
          "remember": "Code gesehen bedeutet nicht Verhalten vollständig verstanden."
        },
        {
          "type": "slide",
          "title": "Die Marketplace-Ergebnisse richtig einordnen",
          "body": [
            {
              "table": {
                "head": [
                  "Analyse in der Kursdemo",
                  "Beobachtung",
                  "Was du daraus lernst"
                ],
                "rows": [
                  [
                    "ZAP",
                    "Bestätigte und falsche Befunde; doppelte SQLi-Meldung",
                    "Alerts nachprüfen und zusammengehörige Befunde zusammenführen."
                  ],
                  [
                    "Fortify SCA",
                    "Echte Befunde, Fehlalarm und kontextabhängige Geheimnis-Funde",
                    "Deployment und Datenzugriff gehören zur Bewertung."
                  ],
                  [
                    "SpotBugs + Find Security Bugs",
                    "Vier echte Befunde; XSS trotzdem übersehen",
                    "Keine Fehlalarme bedeutet nicht vollständige Erkennung."
                  ],
                  [
                    "LLM-Codeanalyse",
                    "Mehrere echte Befunde plus strittiger Konfigurationsbefund",
                    "Ergebnisse belegen und nicht auf andere Projekte verallgemeinern."
                  ]
                ]
              }
            },
            {
              "callout": {
                "tone": "warn",
                "text": "Die Demo ordnet das Datenbankpasswort in der Konfiguration als Fehlalarm ein. Daraus folgt keine allgemeine Freigabe, produktive Passwörter oder private Schlüssel in auslieferbare Artefakte einzubauen. Entscheidend sind Verteilung, Zugriffsschutz und Einsatzkontext; diesen Grenzfall verwenden wir nicht als eindeutige Bewertungsfrage."
              }
            },
            "Ergänzende Einordnung: https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
          "Eine einzelne Demo kann weder aktuelle Erkennungsraten noch einen allgemeinen Sieger bestimmen. Die Befunde überschneiden sich zudem: Man darf die Treffer verschiedener Tools nicht einfach zu einer Anzahl unterschiedlicher Sicherheitslücken addieren.",
            "Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 34, 39–44 (inkl. Notizen)."
          ],
          "remember": "Kontext prüfen, Doppelmeldungen erkennen, fehlende Befunde suchen."
        },
        {
          "type": "slide",
          "title": "LLMs als zusätzliche Codeprüfung",
          "body": [
            "Ein LLM kann bei einer Codeprüfung auf fehlende Geschäftsregeln hinweisen. In den Notizen steht etwa ein Rechnungs-Endpunkt mit parametrisierter SQL-Abfrage, aber ohne Prüfung, ob die Rechnung zur angemeldeten Person gehört. Schutz vor SQL-Injection löst diese Objektberechtigung nicht.",
            {
              "compare": {
                "left": {
                  "title": "Potenzial",
                  "points": [
                    "Zusammenhänge und vermutete Geschäftsregeln erläutern.",
                    "Verdächtige Codepfade und mögliche Korrekturen vorschlagen."
                  ]
                },
                "right": {
                  "title": "Grenzen",
                  "points": [
                    "Ausgaben können zwischen Durchläufen variieren.",
                    "Kontext kann bei grossen Projekten fehlen.",
                    "Plausible Begründungen können falsch sein und müssen geprüft werden."
                  ]
                }
              }
            },
            {
              "reveal": {
                "question": "Eigener Fall: Ein LLM behauptet „fehlende Autorisierung“ in einem Handler. Eine zentrale Middleware prüft aber die Rechte. Wie gehst du vor?",
                "answer": "Die Middleware und ihren tatsächlichen Geltungsbereich lesen und den Zugriff mit passenden Testkonten prüfen. Weder den isolierten Handler noch die LLM-Aussage als vollständigen Nachweis behandeln.",
                "label": "Überlegen, dann aufdecken"
              }
            },
            "Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 43–45 (inkl. Notizen)."
          ],
          "remember": "Ein LLM liefert prüfbare Hypothesen, keine Sicherheitsgarantie."
        },
        {
          "type": "checkpoint",
          "id": "cp-static-llm",
          "title": "Checkpoint: Static analysis and LLM review",
          "questions": [
            {
              "id": "static-limits",
              "type": "multi",
              "prompt": "Which statements match the lecture’s static-analysis discussion?",
              "options": [
                "SpotBugs analyses Java bytecode",
                "Supporting Java guarantees understanding every Spring/Thymeleaf data flow",
                "A tool can inspect every file and still miss a vulnerability",
                "Source analysis can help locate the responsible code"
              ],
              "correct": [
                0,
                2,
                3
              ],
              "explanation": "Language support and semantic/framework coverage differ. The demo contains missed SQLi or XSS despite analysed code. Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 38–42, 45 (inkl. Notizen)."
            },
            {
              "id": "parameterized-owner",
              "type": "single",
              "prompt": "An invoice endpoint uses parameterized SQL but never checks access to the requested invoice. Which issue remains?",
              "options": [
                "The query necessarily contains SQL injection",
                "Object-level authorization may be missing",
                "A CSRF token would grant access to every invoice",
                "Parameterized queries authenticate users"
              ],
              "correct": 1,
              "explanation": "Parameterization protects query structure, not permission to read an object. Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 44 (Notizen), 8, 15 (inkl. Notizen)."
            },
            {
              "id": "llm-proof",
              "type": "single",
              "prompt": "An LLM claims that a handler lacks authorization. What is the best next step?",
              "options": [
                "Accept the claim because the response explains it confidently",
                "Check surrounding controls and reproduce access with appropriate test identities",
                "Dismiss it because static tools did not flag it",
                "Count it as a confirmed flaw after a second identical LLM response"
              ],
              "correct": 1,
              "explanation": "The apparent gap may be enforced elsewhere, or may be real. Evidence and the effective code path decide. Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 43–45 (inkl. Notizen)."
            },
            {
              "id": "tool-ranking",
              "type": "single",
              "prompt": "SpotBugs reports four true positives in the demo. Which conclusion is justified?",
              "options": [
                "The reported four findings were valid in that demo, but other flaws may still be missed",
                "SpotBugs has perfect recall on all Java applications",
                "A tool with more alerts is always more accurate",
                "Manual testing can now be omitted"
              ],
              "correct": 0,
              "explanation": "The same demo records missed XSS. True positives do not establish completeness or general product rankings. Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 41–45 (inkl. Notizen)."
            }
          ]
        },
        {
          "type": "slide",
          "title": "Transfer 1: Sicheres SQL, fremde Rechnung",
          "body": [
            "Eigener Fall: Ein Kundenportal prüft den Login und lädt per parametrisierter Abfrage die Rechnung aus der URL. Im Menü erscheinen nur eigene Rechnungen. Kundin A erhält durch Ändern der URL trotzdem die Rechnung von B.",
            {
              "reveal": {
                "question": "Bevor du aufdeckst: Nenne die Fehlerklasse, die fehlende Entscheidung und einen aussagekräftigen Regressionstest.",
                "answer": "Broken object level access control. Der Server muss prüfen, ob A die konkrete Rechnung lesen darf. Im Test zwei Konten mit bekannten getrennten Rechnungen verwenden: eigener Zugriff erlaubt, fremder Zugriff abgelehnt und keine fremden Inhalte geliefert. Das versteckte Menü und SQL-Parameterisierung ersetzen diese Prüfung nicht.",
                "label": "Überlegen, dann aufdecken"
              }
            },
            {
              "callout": {
                "tone": "tip",
                "text": "Antwortgerüst: „Die Funktion ist erlaubt, aber … . Der Server muss … . Ich prüfe das mit … .“"
              }
            },
            "Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 8–15, 44 (Notizen) (inkl. Notizen)."
          ],
          "remember": "Die Schutzmassnahme muss zum verletzten Recht passen."
        },
        {
          "type": "slide",
          "title": "Transfer 2: Kein sichtbarer Erfolg – trotzdem geändert?",
          "body": [
            "Eigener Fall: Ein Testportal nutzt eine gültige Cookie-Session mit SameSite=None; Secure. Die übrigen Browserregeln erlauben in diesem Test das Cookie. Ein fremdes Formular sendet einen POST, der die Kontaktadresse ändert. Der Server kontrolliert keinen CSRF-Token und keine Herkunft. Die fremde Seite kann die Antwort nicht lesen.",
            {
              "reveal": {
                "question": "Welche Voraussetzungen sind erfüllt? Welche Korrektur und welchen Negativtest würdest du wählen?",
                "answer": "Das Opfer ist authentifiziert, der Browser sendet die Session, und die fremde Seite kann den Request erzeugen. Die unlesbare Antwort verhindert die Änderung nicht. Ein bewährter CSRF-Schutz muss vor der Aktion validiert werden. Danach testen: gültiger legitimer Request funktioniert; Request ohne oder mit falschem Token verändert nichts. SameSite zusätzlich passend konfigurieren.",
                "label": "Überlegen, dann aufdecken"
              }
            },
            "Vergleiche dies mit dem eigenen Rechnungs-Fall: Dort überschreitet A die eigenen Rechte. Hier führt der Browser von A unter deren erlaubten Rechten einen unerwünschten Auftrag aus.",
            "Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 17–29 (inkl. Notizen)."
          ],
          "remember": "Prüfe die tatsächliche Wirkung und die passende Grenze."
        },
        {
          "type": "slide",
          "title": "Transfer 3: Ein Scan ohne Befunde",
          "body": [
            "Eigener Fall: ZAP bleibt vor dem Checkout hängen, die Codeanalyse versteht das Template-System nicht, und ein LLM sieht nur den Controller. Alle drei melden für die Bestellung keinen Fehler.",
            {
              "reveal": {
                "question": "Ist das ein guter Freigabenachweis? Formuliere einen besseren Prüfplan.",
                "answer": "Nein. Zuerst die Lücken benennen: Checkout erreichen und die Session nachweisen, relevante Templates und Datenflüsse analysieren, vollständige Autorisierungsregeln einbeziehen. Dann gezielt Rollen, fremde Objekte und zustandsändernde Requests manuell prüfen. Findings reproduzieren, beheben und erneut testen; die verbleibende Reichweite dokumentieren.",
                "label": "Überlegen, dann aufdecken"
              }
            },
            {
              "flow": {
                "steps": [
                  {
                    "title": "Abdeckung erklären",
                    "text": "Welche Funktionen, Rollen und Daten wurden geprüft?"
                  },
                  {
                    "title": "Befunde bestätigen",
                    "text": "Wirkung und verantwortliche Stelle belegen."
                  },
                  {
                    "title": "Korrektur verifizieren",
                    "text": "Den ursprünglichen Fehler und erlaubte Nutzung erneut prüfen."
                  }
                ]
              }
            },
            "Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 37–46 (inkl. Notizen)."
          ],
          "remember": "Mehr Werkzeuge helfen nur, wenn ihre Lücken verstanden werden."
        },
        {
          "type": "checkpoint",
          "id": "cp-transfer",
          "title": "Checkpoint: Choose and justify the control",
          "questions": [
            {
              "id": "combined-case",
              "type": "multi",
              "prompt": "A seller sends their own valid CSRF token while changing another seller’s product. Which conclusions are correct?",
              "options": [
                "A valid CSRF token does not grant permission for the other product",
                "The server must check object-level authorization",
                "Replacing POST with GET fixes the problem",
                "The seller must have stolen the other seller’s session"
              ],
              "correct": [
                0,
                1
              ],
              "explanation": "The seller uses their own session. The missing boundary is access to the foreign product. Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 8, 15, 28 (inkl. Notizen)."
            },
            {
              "id": "lax-delete",
              "type": "single",
              "prompt": "A GET endpoint deletes an item. Its session cookie explicitly uses SameSite=Lax. A victim follows a cross-site link in the top-level window. What matters?",
              "options": [
                "Lax excludes all cross-site GET requests",
                "The cookie may be sent; the state-changing GET and missing request protection remain a problem",
                "Only image requests are allowed to send Lax cookies",
                "HttpOnly converts the deletion into a read-only request"
              ],
              "correct": 1,
              "explanation": "Explicit Lax permits safe-method top-level navigation. A server must not implement destructive semantics on GET. Präzisierung: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 20, 29 (inkl. Notizen)."
            },
            {
              "id": "release-evidence",
              "type": "multi",
              "prompt": "Which statements belong in an honest test report?",
              "options": [
                "The checkout was not reached because form validation failed",
                "All source files were read, therefore all vulnerabilities were excluded",
                "A foreign-object test reproduced access using two known test accounts",
                "The reported code finding was checked against middleware and runtime behaviour"
              ],
              "correct": [
                0,
                2,
                3
              ],
              "explanation": "Report both verified evidence and limits. Reading files alone cannot exclude all vulnerabilities. Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 10, 37, 42–46 (inkl. Notizen)."
            },
            {
              "id": "regression",
              "type": "order",
              "prompt": "Order this workflow after finding a suspected permission flaw.",
              "items": [
                "Establish expected permissions and a reproducible test case",
                "Confirm the missing effective server-side check",
                "Implement the appropriate permission check",
                "Repeat forbidden and legitimate access tests"
              ],
              "explanation": "A reproducible expectation guides the fix, and regression tests check denial without breaking allowed access. Eigene Synthese. Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 10, 15, 45–46 (inkl. Notizen)."
            }
          ]
        },
        {
          "type": "slide",
          "title": "Dein Selbstcheck für Woche 5",
          "body": [
            {
              "checklist": {
                "title": "Kann ich das ohne die Lösung erklären?",
                "items": [
                  "Ich unterscheide Funktions- und Objektberechtigungen an einem Fall.",
                  "Ich plane einen Zugriffstest mit bekannten Rollen und Objekten.",
                  "Ich erkläre CSRF, ohne Cookie-Diebstahl vorauszusetzen.",
                  "Ich trenne das Senden einer Anfrage vom Lesen ihrer Antwort.",
                  "Ich begründe Token-Prüfung und das Verhalten von explizitem SameSite=Lax.",
                  "Ich unterscheide dynamische Tests, statische Analyse und LLM-Codeprüfung.",
                  "Ich erkenne False Positives, übersehene Fehler und fehlende Testabdeckung.",
                  "Ich schlage zu einem Befund eine passende Korrektur und einen Nachtest vor."
                ]
              }
            },
            "Wenn eine Erklärung stockt, gehe zum betreffenden Abschnitt zurück und formuliere zunächst drei Stichpunkte: verletzte Grenze, Mechanismus, passende Prüfung. Die Transferfälle helfen dir, daraus eine kurze Begründung zu machen.",
            "Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 3–46 (inkl. Notizen)."
          ],
          "remember": "Erst erklären, dann Lösung vergleichen."
        },
        {
          "type": "slide",
          "title": "Was du einordnen und nachschlagen kannst",
          "body": [
            "Die konkreten alten Demo-URLs, Bildschirmbilder und Tool-Trefferzahlen illustrieren Mechanismen. Du musst daraus keine allgemeine Rangliste oder feste Erkennungsquote lernen. Video- und LCQ-Inhalte wurden für diese Lektion nicht transkribiert.",
            "Wichtige Präzisierungen: Nicht jeder abgelehnte Request beweist vollständige Autorisierung. Cookies gehen nicht bedingungslos mit. SameSite=Lax gilt nicht für beliebige GETs. CSRF-Token gehören nicht in URLs. Ein Code-Scan erfasst nicht automatisch jede Geschäftsregel.",
            {
              "table": {
                "head": [
                  "Zum Wiederholen",
                  "Folien"
                ],
                "rows": [
                  [
                    "Function / object access control",
                    "3–15"
                  ],
                  [
                    "CSRF-Ablauf und Request-Mechanismen",
                    "17–27"
                  ],
                  [
                    "Token und SameSite",
                    "28–29, ergänzend OWASP/MDN"
                  ],
                  [
                    "Dynamische Tests und Abdeckung",
                    "31–37"
                  ],
                  [
                    "Statische Analyse und LLMs",
                    "38–45"
                  ],
                  [
                    "Gemeinsame Schlussfolgerung",
                    "45–46"
                  ]
                ]
              }
            },
            "Die Folienbehauptung „all code is tested“ ist als Vorteil gegenüber Crawling-Lücken zu lesen, nicht als Garantie semantischer Vollständigkeit. Die Grenzen auf Folien 42 und 44 bleiben bestehen.",
            "Quelle: WebAppSecurityTesting3.pdf, PDF-Seite/Folie 29, 34–46 (inkl. Notizen)."
          ],
          "remember": "Kursbeispiel, technische Regel und überprüften Befund auseinanderhalten."
        }
      ]
    }
  ]
});
