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
    }
  ]
});
