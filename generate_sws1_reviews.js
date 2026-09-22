const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const templatePath = path.join(root, "quizzes", "DHEAL", "W2_Healthcare_Data.html");
const outputDirectory = path.join(root, "quizzes", "SWS1");
const template = fs.readFileSync(templatePath, "utf8");
const englishQuestions = require("./sws1_reviews_en.js");

const reviews = [
  {
    file: "W2_Secure_Development_Lifecycle.html",
    id: "sws1-w2-secure-development-lifecycle",
    storage: "sws1-w2-secure-development-lifecycle-review-v2",
    week: 2,
    maximumScore: 112,
    title: "Secure Development Lifecycle",
    subtitle: "Active understanding check on security activities, their lifecycle position, and how they complement each other",
    source: "W2_SecureDevelopmentLifecycle.pdf",
    pages: "Folien 1–26",
    exportBase: "SWS1_W2_SecureDevelopmentLifecycle",
    colors: {
      ink: "#2f241f", muted: "#74655c", primary: "#9a4f24", dark: "#713515",
      light: "#f8e7d8", wash: "#faf2eb", line: "#ead3c2", gradient: "#713515, #9a4f24 62%, #c46d35"
    },
    questions: [
      {
        id: "sdl-core", type: "single", topic: "Grundidee des SDL", points: 6,
        prompt: "Welche Aussage beschreibt einen Secure Development Lifecycle (SDL) am treffendsten?",
        options: [
          "Ein separates Vorgehensmodell, das agile und iterative Prozesse ersetzt.",
          "Eine Sammlung von Security Activities, die in den passenden Phasen eines bestehenden Entwicklungsprozesses angewendet wird.",
          "Ein Penetrationstest, der unmittelbar vor dem Release durchgeführt wird.",
          "Eine Methode, bei der Sicherheitsprobleme erst nach dem produktiven Einsatz behoben werden."
        ], correct: 1,
        optionExplanations: [
          "Das SDL ersetzt das bestehende Vorgehensmodell nicht; die Security Activities lassen sich auf Waterfall, iterative und agile Prozesse anwenden.",
          "Genau das ist die Kernidee: Security wird während des gesamten Entwicklungsprozesses durch passende Aktivitäten berücksichtigt.",
          "Penetration Testing ist nur eine von mehreren Aktivitäten und deckt den Lifecycle allein nicht ab.",
          "Das wäre ein reaktiver Penetrate-and-Patch-Ansatz, den die Vorlesung gerade vermeiden will."
        ],
        solution: "Ein SDL ist kein neues Softwareentwicklungsmodell. Es ergänzt einen vorhandenen Prozess um Security Activities in Requirements, Design, Implementation, Testing und Operations.",
        reference: "Folien 4–7", concepts: ["SDL-Grundidee", "Prozessunabhängigkeit"]
      },
      {
        id: "process-application", type: "multi", topic: "SDL in verschiedenen Prozessen", points: 7,
        prompt: "Welche Aussagen zur Anwendung der Security Activities sind korrekt?",
        hint: "Wähle alle korrekten Aussagen.",
        options: [
          "Im Waterfall-Prozess wird jede zugehörige Security Activity typischerweise einmal durchgeführt.",
          "In iterativen oder agilen Prozessen werden Security Activities passend zum Umfang der jeweiligen Iteration wiederholt.",
          "Threat Modeling darf erst beginnen, wenn der gesamte Quellcode fertig ist.",
          "Die Aktivitäten orientieren sich an Entwicklungsphasen, nicht an einem bestimmten Gesamtprozess.",
          "Ein Team muss Microsoft SDL unverändert übernehmen, damit sein Prozess als SDL gilt."
        ], correct: [0, 1, 3],
        optionExplanations: [
          "Bei einem klassischen Waterfall wird eine Phase meist einmal durchlaufen; entsprechend fällt die zugehörige Security Activity typischerweise einmal an.",
          "In Iterationen wachsen Requirements, Design und Code schrittweise; die Security Activities wachsen passend mit.",
          "Threat Modeling gehört primär zu Requirements sowie Architecture and Design und soll früh sowie wiederholt stattfinden.",
          "Diese Phasenorientierung macht die Aktivitäten unabhängig von Waterfall, UP oder agilem Vorgehen.",
          "Die Vorlesung fokussiert gemeinsame Aktivitäten und erlaubt, Praktiken verschiedener SDL-Ansätze zu kombinieren."
        ],
        solution: "Die Security Activities werden an die Phasen des gewählten Entwicklungsprozesses gekoppelt. Bei wiederholten Phasen werden auch die zugehörigen Aktivitäten wiederholt.",
        reference: "Folien 5–7", concepts: ["Prozessunabhängigkeit", "Iterative Anwendung"]
      },
      {
        id: "activity-order", type: "order", topic: "Security Activities im Lifecycle", points: 8,
        prompt: "Ordne die Aktivitäten nach ihrer primären Position im Entwicklungsablauf. Die horizontale Security Risk Analysis ist hier nicht enthalten.",
        items: ["Security Requirements", "Threat Modeling", "Security Design / Controls", "Secure Coding", "Code Review", "Penetration Testing", "Security Operations"],
        initial: [3, 0, 5, 2, 6, 1, 4], correct: [0, 1, 2, 3, 4, 5, 6],
        solution: "Security Requirements → Threat Modeling → Security Design / Controls → Secure Coding → Code Review → Penetration Testing → Security Operations. In der Praxis gibt es Rückkopplungen; die Reihenfolge zeigt die primäre Einordnung in die Phasen.",
        reference: "Folien 5–6 und 9–19", concepts: ["Security Activities", "Lifecycle-Zuordnung"]
      },
      {
        id: "requirement-quality", type: "text", topic: "Security Requirements", points: 8,
        prompt: "Bewerte die Anforderung „Implementiert Spring Security mit RBAC in Controller X“. Warum ist sie als frühes Security Requirement problematisch, und wie würdest du sie besser formulieren?",
        hint: "Trenne das gewünschte Sicherheitsziel von der späteren technischen Lösung.",
        solution: "Die Formulierung legt bereits Framework, Mechanismus und Implementierungsort fest. Ein Security Requirement soll spezifisch und prüfbar, aber möglichst technologieagnostisch sein. Besser wäre etwa: „Für jeden Zugriff auf geschützte Funktionen und Daten muss die Berechtigung des authentisierten Benutzers geprüft werden.“ Ob Spring Security und RBAC geeignet sind, wird später bei Security Design / Controls entschieden.",
        reference: "Folien 9–10 und 12–14", concepts: ["Security Requirements", "Security Design / Controls"]
      },
      {
        id: "threat-modeling", type: "order", topic: "Threat Modeling", points: 9,
        prompt: "Bringe den vereinfachten Threat-Modeling-Ablauf in die richtige Reihenfolge.",
        items: [
          "System aus Sicht eines realistischen Angreifers betrachten",
          "Mögliche Threats und Angriffsziele identifizieren",
          "Aktuelles Design und vorhandene Controls auf Vulnerabilities prüfen",
          "Fehlende Security Requirements zur Mitigation ableiten"
        ],
        initial: [2, 0, 3, 1], correct: [0, 1, 2, 3],
        solution: "Zuerst wird die Angreiferperspektive eingenommen, dann werden Threats identifiziert. Anschliessend sucht man im aktuellen Design nach Vulnerabilities und gibt erkannte Lücken an die Requirements-Aktivität zurück, damit Gegenmassnahmen gefordert werden.",
        reference: "Folie 11", concepts: ["Threat Modeling", "Angreiferperspektive", "Design Flaws"]
      },
      {
        id: "bug-or-flaw", type: "single", topic: "Security Bug vs. Design Flaw", points: 8,
        prompt: "Eine Anwendung prüft Berechtigungen nur im Menü, aber nicht bei direkten API-Aufrufen. Welche Aktivität hätte diesen konzeptionellen Fehler primär verhindern oder früh erkennen sollen?",
        options: ["Threat Modeling", "Compiler-Warnungen", "Security Operations", "Nur ein Code-Style-Linter"], correct: 0,
        optionExplanations: [
          "Threat Modeling prüft, ob Requirements und Controls gegen realistische Angriffe ausreichen, und zielt damit auf Security Design Flaws.",
          "Compiler-Warnungen helfen bei Implementierungsproblemen, erkennen aber nicht zuverlässig eine fehlende Autorisierungsstrategie.",
          "Security Operations kann Angriffe überwachen, ist aber zu spät, um den Designfehler primär zu verhindern.",
          "Ein Style-Linter bewertet Form und einfache Muster, nicht die Vollständigkeit des Sicherheitsdesigns."
        ],
        solution: "Das Fehlen einer durchgängigen Autorisierung ist ein Security Design Flaw. Threat Modeling sollte den direkten Zugriff als Threat sichtbar machen und zu einem passenden Requirement und Control führen.",
        reference: "Folien 10–12 und 16", concepts: ["Threat Modeling", "Design Flaws", "Authorization"]
      },
      {
        id: "coding-review", type: "multi", topic: "Secure Coding und Code Review", points: 8,
        prompt: "Welche Aussagen unterscheiden Secure Coding und Code Review korrekt?",
        options: [
          "Secure Coding setzt Controls korrekt um und versucht, neue Security Bugs zu vermeiden.",
          "Code Review sucht nach Security Bugs, die während der Implementation entstanden sind.",
          "Code Review kann durch reines Lesen des Codes praktisch alle Design Flaws finden.",
          "Automatisierte Codeanalyse ist üblich; manuelle Reviews lohnen sich besonders für sehr kritische Abschnitte.",
          "Compiler-Warnungen zu unsicheren oder veralteten Funktionen sollten ignoriert werden, wenn Tests bestehen."
        ], correct: [0, 1, 3],
        optionExplanations: [
          "Secure Coding umfasst sowohl die korrekte Umsetzung der Security Controls als auch das Vermeiden allgemeiner Security Bugs.",
          "Das ist das primäre Ziel von Code Review in der Vorlesung.",
          "Viele Design Flaws sind aus dem Code allein kaum erkennbar und gehören zum Threat Modeling.",
          "Automatisierung skaliert; gezielte manuelle Reviews ergänzen sie dort, wo das Risiko besonders hoch ist.",
          "Solche Warnungen weisen oft auf reale Sicherheitsrisiken hin und sollen ernst genommen werden."
        ],
        solution: "Secure Coding ist die präventive Arbeit beim Implementieren; Code Review ist die nachgelagerte Suche nach Implementierungsfehlern. Design Flaws benötigen vor allem frühe Analyseaktivitäten.",
        reference: "Folien 15–16", concepts: ["Secure Coding", "Code Review", "Security Bugs"]
      },
      {
        id: "penetration-testing", type: "single", topic: "Penetration Testing", points: 8,
        prompt: "Welche Kombination beschreibt die zwei SDL-Ziele eines Penetrationstests?",
        options: [
          "Requirements schreiben und Programmiersprache auswählen",
          "Erfüllung der Security Requirements im laufenden System prüfen und nach eingeführten Security Bugs suchen",
          "Nur Netzwerkgeräte konfigurieren und Logs archivieren",
          "Design vollständig aus Quellcode rekonstruieren und alle Risiken eliminieren"
        ], correct: 1,
        optionExplanations: [
          "Das sind frühe Planungsentscheidungen und nicht die zwei Ziele des Penetration Testing.",
          "Der Test betrachtet das reale laufende Gesamtsystem und prüft sowohl die Umsetzung der Requirements als auch mögliche Bugs.",
          "Konfiguration und Monitoring gehören eher zu Security Operations; Penetration Testing simuliert Angriffe.",
          "Ein Penetrationstest liefert wichtige Evidenz, kann aber weder Vollständigkeit garantieren noch jedes Risiko eliminieren."
        ],
        solution: "Penetration Testing nimmt die Angreiferperspektive am laufenden System ein: Es validiert die praktische Erfüllung der Security Requirements und sucht nach Security Bugs.",
        reference: "Folie 17", concepts: ["Penetration Testing", "Systemvalidierung"]
      },
      {
        id: "operations-risk", type: "multi", topic: "Security Operations und Risk Analysis", points: 8,
        prompt: "Welche Aussagen sind gemäss Vorlesung korrekt?",
        options: [
          "Security Operations umfasst unter anderem sichere Konfiguration, Updates und Monitoring im Betrieb.",
          "Monitoring bleibt wichtig, weil präventive Massnahmen scheitern können.",
          "Security Risk Analysis bewertet die Kritikalität gefundener Probleme und unterstützt Priorisierungsentscheide.",
          "Eine Low-Risk-Vulnerability muss immer sofort mit maximalem Aufwand behoben werden.",
          "Security Risk Analysis findet ausschliesslich neue Bugs im Quellcode."
        ], correct: [0, 1, 2],
        optionExplanations: [
          "Diese laufenden Tätigkeiten gehören zum sicheren Betrieb eines Systems.",
          "Ohne Monitoring ist eine Kompromittierung oft nur schwer zu erkennen.",
          "Risk Analysis ist horizontal und bewertet Probleme aus anderen Aktivitäten, etwa Threat Modeling oder Penetration Testing.",
          "Bei niedrigem Risiko kann bewusst entschieden werden, nichts zu tun; die Entscheidung soll risikobasiert sein.",
          "Das Finden von Codefehlern ist primär Aufgabe des Code Review; Risk Analysis bewertet bereits erkannte Probleme."
        ],
        solution: "Security Operations schützt und beobachtet das produktive System. Security Risk Analysis ergänzt alle Phasen, indem sie erkannte Vulnerabilities nach Risiko bewertet und Entscheidungen über Gegenmassnahmen unterstützt.",
        reference: "Folien 18–19", concepts: ["Security Operations", "Security Risk Analysis"]
      },
      {
        id: "incremental-adoption", type: "text", topic: "SDL-Einführung", points: 9,
        prompt: "Ein kleines Team kann nicht alle Security Activities gleichzeitig einführen. Begründe eine sinnvolle schrittweise Einführung und erkläre, warum das Endziel trotzdem alle Aktivitäten umfasst.",
        solution: "Eine mögliche Reihenfolge ist: zuerst automatisierte Code Reviews, weil sie viele Implementierungsfehler finden können; danach Threat Modeling für Design Flaws; zusätzlich Penetration Testing für Feedback über die reale Gesamtsicherheit. Andere Einstiege sind möglich. Jede Aktivität erhöht die Sicherheit, aber keine deckt alles ab. Langfristig werden alle benötigt, weil sie unterschiedliche Phasen, Fehlerarten und Rückmeldungen abdecken.",
        reference: "Folie 21", concepts: ["Inkrementelle Einführung", "Komplementäre Aktivitäten"]
      },
      {
        id: "shift-left", type: "single", topic: "Fixing Earlier is Better", points: 9,
        prompt: "Kurz vor dem Release zeigt ein Penetrationstest, dass das gesamte Access-Control-Design ungeeignet ist. Welche Schlussfolgerung passt am besten zur Vorlesung?",
        options: [
          "Späte Tests sind ausreichend, weil jeder Designfehler lokal gepatcht werden kann.",
          "Frühe Activities hätten den grundlegenden Fehler verhindern können; der späte Fund verursacht wahrscheinlich teures Redesign.",
          "Das Problem beweist, dass Threat Modeling nur nach dem Release sinnvoll ist.",
          "Man sollte den Fund ignorieren, solange keine tatsächliche Attacke dokumentiert ist."
        ], correct: 1,
        optionExplanations: [
          "Grundlegende Designprobleme betreffen häufig viele Komponenten und lassen sich nicht zuverlässig mit lokalen Patches lösen.",
          "Security Requirements, Threat Modeling und Security Design / Controls können solche Fehler früh verhindern und teure Nacharbeit vermeiden.",
          "Threat Modeling soll früh und bei wachsendem Design wiederholt eingesetzt werden.",
          "Ein belegter grundlegender Designfehler ist sicherheitsrelevant, auch wenn noch kein erfolgreicher Angriff bekannt ist."
        ],
        solution: "Frühe Aktivitäten wirken präventiv. Wird ein fundamentaler Designfehler erst im Penetrationstest gefunden, drohen Quick Fixes, hohe Kosten und die Rückkehr zum Penetrate-and-Patch-Zyklus.",
        reference: "Folien 22–23", concepts: ["Frühe Fehlervermeidung", "Penetrate and Patch"]
      },
      {
        id: "boss", type: "text", topic: "Boss Question – SDL anwenden", points: 12,
        prompt: "Ein Team baut iterativ einen Webshop mit Kunden- und Adminbereich. Skizziere für die nächste Iteration einen sinnvollen Security-Plan: Nenne mindestens fünf Security Activities, ihren konkreten Beitrag und mindestens eine Rückkopplung zwischen Activities.",
        hint: "Denke an Requirements, Attacker View, Controls, Implementation, Review, Test, Betrieb und Risiko.",
        solution: "Beispiel: Security Requirements fordern Autorisierung bei jedem Zugriff und starke Admin-Authentisierung. Threat Modeling betrachtet etwa direkte API-Aufrufe, Session-Hijacking und Angriffe auf Adminfunktionen; gefundene Lücken erzeugen neue Requirements. Security Design / Controls wählt etwa frameworkgestütztes RBAC, MFA und eine isolierte Adminanwendung. Secure Coding setzt diese Controls korrekt um und vermeidet neue Bugs. Code Review prüft Implementierungsfehler. Penetration Testing testet die laufende Iteration aus Angreifersicht und validiert die Requirements. Security Risk Analysis priorisiert Funde; Security Operations plant sichere Konfiguration, Updates und Monitoring. In späteren Iterationen werden die Aktivitäten mit neuen Funktionen wiederholt.",
        reference: "Folien 5–23", concepts: ["SDL-Anwendung", "Komplementäre Aktivitäten", "Iterative Anwendung"]
      }
    ]
  },
  {
    file: "W3_Software_Security_Errors.html",
    id: "sws1-w3-software-security-errors",
    storage: "sws1-w3-software-security-errors-review-v1",
    week: 3,
    maximumScore: 100,
    title: "Software Security Errors",
    subtitle: "Active understanding check on the 7 (+1) Kingdoms and typical software security errors",
    source: "W3_SoftwareSecurityErrors.pdf",
    pages: "Folien 1–23",
    exportBase: "SWS1_W3_SoftwareSecurityErrors",
    colors: {
      ink: "#222c3a", muted: "#647083", primary: "#435a86", dark: "#293a62",
      light: "#e5ebf7", wash: "#f0f3f9", line: "#d3dbea", gradient: "#293a62, #435a86 62%, #687cab"
    },
    questions: [
      {
        id: "taxonomy", type: "single", topic: "Taxonomie", points: 6,
        prompt: "Warum verwendet die Vorlesung die 7 (+1) Kingdoms of Software Security Errors?",
        options: [
          "Weil nur acht konkrete Vulnerabilities existieren.",
          "Weil viele konkrete Fehler auf wenige grundlegende Problemklassen zurückgehen und die Taxonomie anwendungsübergreifend ist.",
          "Weil die Taxonomie ausschliesslich Webanwendungen abdeckt.",
          "Weil sie jeden Fehler automatisch mit einem Tool behebt."
        ], correct: 1,
        optionExplanations: [
          "Es existiert ein breites Spektrum konkreter Fehler; die Kingdoms gruppieren ihre grundlegenden Ursachen.",
          "Die Taxonomie bietet eine allgemeine, überschaubare Klassifikation und ist nicht auf eine einzelne Anwendungsdomäne beschränkt.",
          "Gerade die Allgemeingültigkeit wird als Vorteil gegenüber domänenspezifischeren Listen hervorgehoben.",
          "Eine Taxonomie hilft beim Verstehen und Einordnen; sie repariert keine Software automatisch."
        ],
        solution: "Die Kingdoms reduzieren viele konkrete Fehler auf grundlegende Klassen. Dadurch können Entwickler typische Ursachen und Gegenmassnahmen systematisch verstehen.",
        reference: "Folien 5–7", concepts: ["7 (+1) Kingdoms", "Taxonomie"]
      },
      {
        id: "kingdom-order", type: "order", topic: "Die sieben Kingdoms", points: 7,
        prompt: "Ordne die sieben nummerierten Kingdoms in der in der Vorlesung genannten Wichtigkeitsreihenfolge. Environment ist als +1 nicht Teil dieser Liste.",
        items: ["Input Validation and Representation", "API Abuse", "Security Features", "Time and State", "Error Handling", "Code Quality", "Encapsulation"],
        initial: [4, 0, 6, 2, 1, 5, 3], correct: [0, 1, 2, 3, 4, 5, 6],
        solution: "1 Input Validation and Representation → 2 API Abuse → 3 Security Features → 4 Time and State → 5 Error Handling → 6 Code Quality → 7 Encapsulation. Environment wird als +1 separat geführt.",
        reference: "Folie 7", concepts: ["7 (+1) Kingdoms", "Taxonomie"]
      },
      {
        id: "command-injection", type: "text", topic: "Input Validation and Representation", points: 8,
        prompt: "Die Servermethode baut den Shell-Befehl `ls ` + directory. Erkläre den Angriff mit dem Input `/etc; cat /etc/passwd` und nenne eine grundlegende Gegenmassnahme.",
        solution: "Die Shell interpretiert das Semikolon als Trennung zweier Befehle. Statt nur ein Verzeichnis aufzulisten, führt der Server zusätzlich `cat /etc/passwd` mit den Rechten seines Prozesses aus. Ursache ist unverarbeiteter, nicht validierter Input in einem Command-Kontext. Die Vorlesung nennt proper input validation als grundlegenden Fix; zusätzlich sollte man Shell-Konkatenation vermeiden und eine sichere API mit getrennten Argumenten beziehungsweise eine direkte Directory-API nutzen.",
        reference: "Folien 3–4 und 8–9", concepts: ["Input Validation", "Command Injection", "Representation"]
      },
      {
        id: "input-examples", type: "multi", topic: "Input Validation and Representation", points: 8,
        prompt: "Welche Fehler ordnet die Vorlesung diesem Kingdom als Beispiele zu?",
        options: ["Buffer Overflow", "SQL Injection", "Cross-Site Scripting", "Path Traversal", "Deadlock", "Empty Catch Block"],
        correct: [0, 1, 2, 3],
        optionExplanations: [
          "Ungeprüfte Längen können zu Schreibzugriffen ausserhalb eines Buffers führen.",
          "Unvalidierte Daten können die Struktur eines SQL-Statements verändern.",
          "Ungeeignete Behandlung von Input und Output kann fremdes JavaScript im Browser eines anderen Benutzers ausführen lassen.",
          "Manipulierte Pfadbestandteile wie `../` können den vorgesehenen Verzeichnisbereich verlassen.",
          "Deadlocks entstehen durch problematische Interaktionen und Locking und gehören zu Time and State.",
          "Ein leerer Catch-Block gehört zu Error Handling."
        ],
        solution: "Buffer Overflow, Injection-Angriffe, Cross-Site Scripting und Path Traversal sind Beispiele für fehlende oder umgehbare Validierung und problematische Repräsentation von Daten.",
        reference: "Folien 8–9", concepts: ["Input Validation", "Injection", "Path Traversal"]
      },
      {
        id: "api-abuse", type: "single", topic: "API Abuse", points: 8,
        prompt: "Ein Server erlaubt Clients anhand eines Reverse-DNS-Hostnamens. Was ist der zentrale Security Error?",
        options: [
          "Der Entwickler hat die API-Syntax falsch geschrieben.",
          "Der Entwickler nimmt fälschlich an, dass der per Reverse DNS gelieferte Hostname eine sichere Identität beweist.",
          "Jede DNS-Abfrage führt zwangsläufig zu einem Buffer Overflow.",
          "Das Problem ist ausschliesslich eine zu breite Exception."
        ], correct: 1,
        optionExplanations: [
          "Die Funktion kann technisch korrekt aufgerufen sein; problematisch ist die falsche Sicherheitsannahme über ihr Resultat.",
          "DNS-Antworten sind üblicherweise nicht als starke Authentisierung geeignet und können auf dem Kommunikationsweg gefälscht werden.",
          "Ein Buffer Overflow ist hier weder notwendig noch die erklärte Ursache.",
          "Exception Handling ist nicht der Kern des beschriebenen Zugriffskontrollfehlers."
        ],
        solution: "API Abuse umfasst auch falsche Annahmen über die angebotene Funktionalität. Reverse DNS liefert keinen verlässlichen Identitätsnachweis und ist daher keine sichere Grundlage für Access Control.",
        reference: "Folien 10–11", concepts: ["API Abuse", "Wrong Security Assumptions", "DNS"]
      },
      {
        id: "security-features", type: "multi", topic: "Security Features", points: 8,
        prompt: "Welche Situationen sind Beispiele für fehlerhafte Nutzung von Security Features?",
        options: [
          "Vorhersagbaren PRNG für kryptografische Schlüssel verwenden",
          "Access Control nicht bei jedem geschützten Zugriff durchsetzen",
          "Veraltete schwache Algorithmen in TLS aus Kompatibilitätsgründen aktiv lassen",
          "Eine etablierte Kryptobibliothek korrekt nach aktuellem Standard konfigurieren",
          "Sensible Sessiondaten ausschliesslich serverseitig halten"
        ], correct: [0, 1, 2],
        optionExplanations: [
          "Vorhersagbare Zufallswerte können schwaches oder erratbares Schlüsselmaterial erzeugen.",
          "Unvollständige Access Control öffnet Wege zu privilegierten Funktionen oder Daten.",
          "Protokolle können sichere und unsichere Optionen zugleich anbieten; eine schwache Konfiguration bleibt gefährlich.",
          "Das ist die empfohlene Richtung und kein Fehlerbeispiel.",
          "Serverseitiger Session State verhindert gerade, dass der Client wichtige Autorisierungsdaten manipuliert."
        ],
        solution: "Auch bewährte Security Features sind nur sicher, wenn sie korrekt ausgewählt, konfiguriert und konsistent eingesetzt werden. Eigene Kryptoverfahren sollen möglichst vermieden werden.",
        reference: "Folie 12", concepts: ["Security Features", "Cryptography", "Access Control"]
      },
      {
        id: "time-state", type: "single", topic: "Time and State", points: 8,
        prompt: "Ein Programm prüft eine Datei und öffnet sie erst danach. Ein Angreifer ersetzt sie zwischen Check und Use. Wie heisst das Problem und warum entsteht es?",
        options: [
          "TOCTOU Race Condition; Check und Use sind getrennte, nicht atomare Schritte mit einem ausnutzbaren Zeitfenster.",
          "SQL Injection; der Dateiname verändert ein Datenbankstatement.",
          "Memory Leak; die Datei wird nicht freigegeben.",
          "Cross-Site Request Forgery; der Browser sendet einen Request."
        ], correct: 0,
        optionExplanations: [
          "Time of Check – Time of Use beschreibt genau die Lücke zwischen Prüfung und Verwendung einer veränderbaren Ressource.",
          "Eine Datenbankabfrage ist im Szenario nicht beteiligt.",
          "Resource Cleanup ist hier nicht die Ursache der manipulierten Datei.",
          "CSRF betrifft ungewollte Requests in einer authentisierten Websession und nicht diesen Dateizugriff."
        ],
        solution: "Bei parallelen oder verteilten Abläufen kann sich der Zustand zwischen zwei Schritten ändern. Deshalb darf eine frühere Prüfung nicht blind als weiterhin gültig vorausgesetzt werden.",
        reference: "Folien 13–14", concepts: ["Time and State", "TOCTOU", "Race Condition"]
      },
      {
        id: "error-handling", type: "multi", topic: "Error Handling", points: 8,
        prompt: "Welche Aussagen zu Error Handling sind korrekt?",
        options: [
          "Detaillierte interne Fehlermeldungen an Benutzer können Angreifern nützliche Informationen liefern.",
          "Ein leerer Catch-Block kann Fehler verschlucken und zu unerwartetem Verhalten führen.",
          "Ein sehr breiter Catch-Block kann später neu auftretende Exceptions unangemessen mitbehandeln.",
          "Exceptions vereinfachen den Control Flow immer so stark, dass keine Fehlerbehandlung mehr nötig ist.",
          "Fehler sollten grundsätzlich ignoriert werden, solange der Prozess nicht sofort abstürzt."
        ], correct: [0, 1, 2],
        optionExplanations: [
          "Systemzustand, Queries oder interne Details können Folgeangriffe erleichtern.",
          "Ignorierte Exceptions verdecken Ursachen und können Availability oder Datenkonsistenz gefährden.",
          "Neu hinzugefügter Code kann andere Exceptions werfen, die in einem allgemeinen Handler zu wenig spezifisch behandelt werden.",
          "Exceptions schaffen einen zusätzlichen Control Flow und sind gerade deshalb anspruchsvoll korrekt zu behandeln.",
          "Auch scheinbar überlebte Fehler können einen unsicheren oder inkonsistenten Zustand erzeugen."
        ],
        solution: "Sicheres Error Handling begrenzt externe Informationen, behandelt Fehler bewusst und spezifisch und vermeidet leere oder unangemessen breite Handler.",
        reference: "Folie 15", concepts: ["Error Handling", "Information Leakage", "Exceptions"]
      },
      {
        id: "code-quality", type: "multi", topic: "Code Quality", points: 8,
        prompt: "Welche Zuordnungen zu Code Quality sind korrekt?",
        options: [
          "Nicht freigegebener Speicher kann zur Erschöpfung und zu Availability-Problemen führen.",
          "Nicht geschlossene File Handles oder Sockets können Systemressourcen erschöpfen.",
          "Deprecated APIs können auch wegen Security Defects veraltet sein und sollten ersetzt werden.",
          "Null Dereference ist immer harmlos, weil moderne Betriebssysteme es automatisch korrigieren.",
          "Compiler-Warnungen sind nur Stilhinweise und können grundsätzlich ignoriert werden."
        ], correct: [0, 1, 2],
        optionExplanations: [
          "Memory Leaks können den verfügbaren Speicher verbrauchen und das Programm beenden.",
          "Auch andere Ressourcen sind begrenzt; fehlendes Cleanup kann die Funktion des Systems verhindern.",
          "Deprecated kann auf unsichere Semantik oder bekannte Defekte hinweisen; meist existiert eine bessere Alternative.",
          "Eine Null Dereference beendet Programme häufig und kann dadurch Availability beeinträchtigen.",
          "Warnungen weisen oft auf reale Fehler hin, etwa uninitialisierte Werte oder unsichere Funktionen."
        ],
        solution: "Schlechte Lesbarkeit und mangelnde Sorgfalt erhöhen die Wahrscheinlichkeit sicherheitsrelevanter Fehler. Resource Leaks, Deprecated Code, Null Dereferences und uninitialisierte Variablen sind typische Beispiele.",
        reference: "Folien 16–17", concepts: ["Code Quality", "Resource Exhaustion", "Deprecated Code"]
      },
      {
        id: "encapsulation-environment", type: "multi", topic: "Encapsulation und Environment", points: 9,
        prompt: "Welche Aussagen ordnen die Beispiele korrekt zu?",
        options: [
          "Ein Hidden Form Field mit `role=admin` als vertrauenswürdigen Session State zu verwenden verletzt Encapsulation.",
          "CSRF kann Requests in der authentisierten Session eines anderen Benutzers auslösen und gehört zu Encapsulation.",
          "Ein Framework mit zu kurzen oder schwach zufälligen Session IDs ist ein Environment-Problem.",
          "Eine Compiler-Optimierung, die das Überschreiben sensibler Daten entfernt, ist ein Environment-Problem.",
          "Environment umfasst nur physische Hardware, nicht Libraries, JVM oder Netzwerkdienste."
        ], correct: [0, 1, 2, 3],
        optionExplanations: [
          "Clientseitige Hidden Fields können gelesen und verändert werden; privilegierter Session State muss serverseitig geschützt werden.",
          "CSRF durchbricht die erwartete Grenze zwischen Benutzerabsicht und authentisierter Session.",
          "Die Anwendung hängt von Framework-Eigenschaften ausserhalb des eigenen Codes ab.",
          "Der Compiler ist Teil der sicherheitskritischen Umgebung und kann beabsichtigte Schutzoperationen verändern.",
          "Environment umfasst Compiler, OS, Runtimes, Frameworks, Libraries, entfernte Software und Netzwerkdienste."
        ],
        solution: "Encapsulation schützt Grenzen zwischen Benutzern, Programmen und Daten. Environment erfasst externe Komponenten, von denen die Sicherheit des eigenen Codes trotzdem abhängt.",
        reference: "Folien 18–19", concepts: ["Encapsulation", "Environment", "Session State", "CSRF"]
      },
      {
        id: "timing-attack", type: "text", topic: "Timing Side Channel", points: 10,
        prompt: "Die Passwortprüfung bricht beim ersten falschen Zeichen ab. Erkläre, wie daraus ein Timing-Angriff entsteht, welchem Kingdom er zugeordnet wird und wie der grundlegende Fix aussieht.",
        solution: "Je länger das richtige Präfix des eingegebenen Passworts ist, desto mehr Zeichen werden geprüft und desto länger dauert die Ausführung. Ein Angreifer kann so das Passwort Zeichen für Zeichen statt nur per vollständigem Brute Force rekonstruieren. Die Vorlesung ordnet dies Time and State zu. Grundlegend soll der Vergleich unabhängig von der Position des ersten Fehlers immer alle Zeichen prüfen beziehungsweise eine dafür geeignete Constant-Time-Vergleichsfunktion nutzen.",
        reference: "Folien 21–22", concepts: ["Time and State", "Timing Attack", "Side Channel"]
      },
      {
        id: "boss", type: "text", topic: "Boss Question – Fehlerklassifikation", points: 12,
        prompt: "Analysiere dieses Mini-System: Es übernimmt einen Dateipfad direkt aus einem Request, zeigt bei Fehlern den vollständigen Stack Trace, speichert die Benutzerrolle in einem Hidden Field und verwendet nach dem Login dieselbe Session ID. Ordne jeden Fehler einem Kingdom zu und nenne je eine passende Gegenmassnahme.",
        hint: "Vier Probleme, mindestens drei verschiedene Kingdoms.",
        solution: "Ungeprüfter Dateipfad: Input Validation and Representation; erlaubte Pfade strikt validieren, normalisieren und Zugriff auf ein vorgesehenes Root-Verzeichnis begrenzen. Vollständiger Stack Trace: Error Handling; intern detailliert loggen, extern nur eine neutrale Fehlermeldung zeigen. Rolle im Hidden Field: Encapsulation; autoritativen Session State serverseitig halten und jeden Zugriff prüfen. Gleiche Session ID über die Authentisierungsgrenze: Time and State; Session ID nach erfolgreichem Login regenerieren, um Session Fixation zu verhindern. Gute Antworten erklären zusätzlich, dass Libraries und Framework-Konfigurationen als Environment mitgeprüft werden müssen.",
        reference: "Folien 8–19", concepts: ["Fehlerklassifikation", "Input Validation", "Error Handling", "Encapsulation", "Time and State"]
      }
    ]
  }
];

for (const review of reviews) {
  review.questions = englishQuestions[review.id];
  if (!review.questions) throw new Error(`Missing English questions for ${review.id}`);
}

function replaceOnce(value, search, replacement, label) {
  if (!value.includes(search)) throw new Error(`Template marker missing: ${label || search}`);
  return value.replace(search, replacement);
}

function buildReview(review) {
  let html = template;
  const questionsLiteral = JSON.stringify(review.questions, null, 2)
    .replace(/^/gm, "    ")
    .trimStart();

  html = html.replace(
    /    const questions = \[[\s\S]*?\n    \];\n\n    const STORAGE_KEY/,
    `    const questions = ${questionsLiteral};\n\n    const STORAGE_KEY`
  );
  html = replaceOnce(html, "Interaktives DHEAL-Review zu Healthcare Data: From Clinical Care to AI-Ready Data.", `Interaktives SWS1-Review zu ${review.title}.`, "meta description");
  html = replaceOnce(html, "DHEAL - Healthcare Data - Lecture Review", `SWS1 - ${review.title} - Lecture Review`, "title");
  html = replaceOnce(html, "DHEAL · Lecture 02", `SWS1 · Lecture 0${review.week}`, "eyebrow");
  html = replaceOnce(html, "Healthcare Data: From Clinical Care to AI-Ready Data", review.title, "heading");
  html = replaceOnce(html, "Aktiver Verständnischeck zu klinischen Daten, Kontext, Interoperabilität und validen Vorhersagen", review.subtitle, "subtitle");
  html = replaceOnce(html, "<strong>02.digital-health.healthcare-data_moodle.pdf</strong>, Folien 1–36", `<strong>${review.source}</strong>, ${review.pages}`, "source note");
  html = html.replaceAll("dheal-w2-healthcare-data-review-v1", review.storage);
  html = html.replaceAll("dheal-w2-healthcare-data", review.id);
  html = html.replaceAll('subject: "DHEAL", lecture: "Lecture 02 – Healthcare Data: From Clinical Care to AI-Ready Data"', `subject: "SWS1", lecture: "Lecture 0${review.week} – ${review.title}"`);
  html = html.replaceAll('source: "02.digital-health.healthcare-data_moodle.pdf"', `source: "${review.source}"`);
  html = html.replaceAll("DHEAL_Lecture02_targeted_review.json", `${review.exportBase}_targeted_review.json`);
  html = html.replaceAll("DHEAL_Lecture02_result.json", `${review.exportBase}_result.json`);
  html = html.replace('<html lang="de">', '<html lang="en">');
  html = html.replace("Interaktives SWS1-Review zu", "Interactive SWS1 review on");

  html = html.replace("--ink: #17303a;", `--ink: ${review.colors.ink};`);
  html = html.replace("--muted: #60747b;", `--muted: ${review.colors.muted};`);
  html = html.replace("--teal: #236f70;", `--teal: ${review.colors.primary};`);
  html = html.replace("--teal-dark: #164f55;", `--teal-dark: ${review.colors.dark};`);
  html = html.replace("--mint: #dff3ee;", `--mint: ${review.colors.light};`);
  html = html.replace("--wash: #edf6f4;", `--wash: ${review.colors.wash};`);
  html = html.replace("--line: #cfe0dc;", `--line: ${review.colors.line};`);
  html = html.replace("background: linear-gradient(120deg, #164f55, #237274 62%, #3b8f83);", `background: linear-gradient(120deg, ${review.colors.gradient});`);
  html = html.replace("background: linear-gradient(120deg, #164f55, #2d827c);", `background: linear-gradient(120deg, ${review.colors.dark}, ${review.colors.primary});`);
  html = html.replaceAll("0 / 12 Aufgaben", `0 / ${review.questions.length} Aufgaben`);
  html = html.replaceAll("0 / 12</strong>", `0 / ${review.questions.length}</strong>`);

  const interfaceTranslations = [
    ["noch keine Endnote", "no final grade yet"],
    ["Aufgabenübersicht", "Question overview"],
    ["Bearbeitet", "Completed"],
    ["Aktuelle Punkte", "Current score"],
    ["Lernnote", "Self-assessment grade"],
    ["am Ende", "shown at the end"],
    ["Zwischenstand speichern", "Save progress"],
    ["Review abschliessen", "Finish review"],
    ["Neues Quiz starten", "Start new quiz"],
    ["Änderungen werden auch automatisch lokal gespeichert.", "Changes are also saved locally and automatically."],
    ["Die Note ist eine Selbsteinschätzung, keine offizielle Hochschulnote.", "The grade is a self-assessment, not an official university grade."],
    ["Richtig gewählt", "Correctly selected"],
    ["Richtige Antwort – nicht gewählt", "Correct answer – not selected"],
    ["Falsch gewählt", "Incorrectly selected"],
    ["Nicht korrekt", "Not correct"],
    ["Position richtig", "Correct position"],
    ["Gehört auf Position", "Expected at position"],
    ["Formuliere deine Antwort in eigenen Worten …", "Write your answer in your own words …"],
    ["Diese Aufgabe wurde übersprungen und erhält 0 Punkte.", "This question was skipped and receives 0 points."],
    ["Teilweise richtig", "Partially correct"],
    ["Falsch / wusste ich nicht", "Incorrect / I did not know"],
    ["Übersprungen", "Skipped"],
    ["Auswertung und Begründung", "Answer review and reasoning"],
    ["Aussage ist richtig", "Statement is correct"],
    ["Aussage ist falsch", "Statement is incorrect"],
    ["Quelle:", "Source:"],
    ["Voll richtig", "Fully correct"],
    ["Antwort prüfen", "Check answer"],
    ["Überspringen", "Skip"],
    ["Zurück", "Back"],
    ["Weiter", "Next"],
    ["Wähle zuerst eine Antwort.", "Select an answer first."],
    ["Wähle zuerst mindestens eine Antwort.", "Select at least one answer first."],
    ["Schreibe zuerst eine eigene Antwort.", "Write your own answer first."],
    ["Teilpunkte: korrekte Auswahl abzüglich falscher Auswahl.", "Partial credit: correct selections minus incorrect selections."],
    ["Positionen stimmen.", "positions are correct."],
    ["Sehr gut verstanden", "Very well understood"],
    ["Grundsätzlich verstanden, aber mit Lücken", "Generally understood, but with gaps"],
    ["Noch nicht sicher verstanden", "Not yet understood with confidence"],
    ["Deutliche Wissenslücken", "Significant knowledge gaps"],
    ["Noch kein Bereich über 80 %.", "No area above 80% yet."],
    ["Keine gemischten Bereiche.", "No mixed areas."],
    ["Keine klar schwachen Bereiche.", "No clearly weak areas."],
    ["Ergebnis", "Result"],
    ["Selbsteinschätzungsnote", "Self-assessment grade"],
    ["voll richtig", "fully correct"],
    ["teilweise richtig", "partially correct"],
    ["falsch / übersprungen", "incorrect / skipped"],
    ["Stärken", "Strengths"],
    ["Unsicher", "Uncertain"],
    ["Wiederholen", "Review"],
    ["Antworten ansehen", "Review answers"],
    ["Bearbeite oder überspringe zuerst alle Aufgaben.", "Complete or skip all questions first."],
    ["Zwischenstand gespeichert", "Progress saved"],
    ["Neues Quiz beginnen? Ein noch nicht abgeschlossener Zwischenstand wird verworfen. Bereits abgeschlossene Versuche bleiben im Dashboard erhalten.", "Start a new quiz? An unfinished saved state will be discarded. Earlier completed attempts remain in the dashboard."],
    ["Richtig zugeordnet", "Correctly assigned"],
    ["Deine Antwort:", "Your answer:"],
    ["Noch nicht gewählt", "Not selected"],
    ["Ordne zuerst jeder Aussage eine Aktivität zu.", "Assign an activity to every statement first."],
    ["Zuordnungen stimmen.", "assignments are correct."],
    ["Streak:", "Streak:"],
    ["Folien", "Slides"],
    ["unbeantwortet", "unanswered"],
    ["Punkten", "points"],
    ["Punkte", "points"],
    ["Aufgaben", "questions"],
    ["Aufgabe", "Question"],
    ["Richtig", "Correct"],
    ["Falsch", "Incorrect"],
    ["von", "of"]
  ];
  for (const [german, english] of interfaceTranslations) html = html.replaceAll(german, english);

  const totalPoints = review.questions.reduce((sum, question) => sum + question.points, 0);
  html = html.replaceAll("0 / 100", `0 / ${totalPoints}`);
  if (totalPoints !== review.maximumScore) {
    throw new Error(`${review.id} totals ${totalPoints}, expected ${review.maximumScore}`);
  }
  return html;
}

fs.mkdirSync(outputDirectory, { recursive: true });
for (const review of reviews) {
  fs.writeFileSync(path.join(outputDirectory, review.file), buildReview(review), "utf8");
}

console.log(`Generated ${reviews.length} SWS1 lecture reviews.`);
