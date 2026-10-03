/*
 * Lerncoach-Inhalte für IT-Recht.
 * Woche 2 aus: ITRECHT/Lectures/W2_ITR-HS26-IT-Verträge, Mf.pdf
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
 * Diese Vorlesung enthält keine Zahlen und keine Verfahren, deshalb bewusst keine
 * Diagramme. Stattdessen Nachschlagetabellen, Gegenüberstellungen und Fälle.
 * Tabellen sind eigene Nachbauten der Folieninhalte, keine Folienbilder.
 */
Lerncoach.registerSubject({
  id: "ITRECHT",
  name: "IT-Recht",
  description: "Rechtliche Grundlagen der Informatik",
  accent: "#6d4bc3",
  weeks: [
    { id: "w1", number: 1, title: "Einführung ins Informatikrecht", status: "soon" },
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
            "Lernziel 1 ist dabei das Rückgrat: Fast jede Prüfungsfrage in diesem Stoff läuft darauf hinaus, einen Sachverhalt einem Vertragstyp zuzuordnen und daraus die Rechtsfolgen abzuleiten.",
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
            { callout: { tone: "warn", title: "Die Prüfungsfalle: Offerte oder blosse Einladung?", text: "Handelt es sich im konkreten Fall um eine **verbindliche Offerte** oder bloss um eine **Einladung zur Offertstellung** (Art. 7 OR)? Der Bestellvorgang beim Online-Handel ist regelmässig nur eine Einladung zur Offertstellung. Was sagen die AGB? Die Folie verweist als Beispiel auf die AGB von brack.ch." } },
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
              note: "Blau hervorgehoben die drei, die in Projektfällen am häufigsten geprüft werden."
            } },
            { callout: { tone: "warn", title: "Aufpassen bei Auftrag und SLA", text: "Die Folie nennt **SLA** sowohl beim Nominatvertrag Auftrag als Anwendungsbeispiel als auch eigenständig bei den Innominatverträgen. Das ist kein Widerspruch: Ein SLA ist als eigener Vertragstyp nicht im Gesetz geregelt, inhaltlich wird es aber typischerweise nach Auftragsrecht beurteilt. Im Fall also immer fragen, welche gesetzlichen Regeln auf die konkrete Leistung passen." } },
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
              explanation: "Art. 1 OR. Die Willensäusserung kann ausdrücklich oder stillschweigend erfolgen."
            },
            {
              id: "webshop",
              type: "single",
              prompt: "Der Bestellvorgang in einem Online-Shop ist gemäss Folie 10 regelmässig …",
              options: [
                "… nur eine Einladung zur Offertstellung (Art. 7 OR)",
                "… eine verbindliche Offerte des Händlers",
                "… bereits der Vertragsschluss",
                "… rechtlich unverbindlich, weil online geschlossene Verträge Schriftform brauchen"
              ],
              correct: 0,
              explanation: "Deshalb muss man in die AGB schauen, um zu wissen, wann der Vertrag tatsächlich zustande kommt."
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
              explanation: "Werkvertrag und Miete sind Nominatverträge, also im OR geregelt. Die übrigen vier stehen auf der Folie unter Innominatverträge."
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
              explanation: "Hosting, Entwicklung, Projektverträge und Lizenzierung sind die Beispiele der Folie."
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
                ["Gewährleistungspflichten", "Abnahmeverfahren des Werkes in vereinbarter Qualität am Schluss", "Garantie in der Regel analog Kaufvertrag"],
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
              "Der Auftrag kann grundsätzlich **jederzeit beendet** werden (Art. 404 OR). Achtung: Nach der Praxis des Bundesgerichts gilt das jedoch **nicht bei „atypischen\" Aufträgen**, wenn eine Kündigungsfrist vereinbart ist, zum Beispiel bei einem Support-Vertrag.",
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
                "Jederzeit beendbar nach Art. 404 OR, ausser bei atypischen Aufträgen mit Kündigungsfrist",
                "Typisch: Consulting, Installation, Projektmanagement, SLA"
              ] },
              verdict: "Die eine Frage, die entscheidet: Ist ein abgrenzbares Resultat geschuldet, oder sorgfältiges Tätigwerden?"
            } },
            { reveal: {
              question: "Ein Support-Vertrag läuft seit drei Jahren, mit einer vereinbarten Kündigungsfrist von sechs Monaten. Der Kunde beruft sich auf Art. 404 OR und will sofort aussteigen. Geht das?",
              label: "Auflösung",
              answer: [
                "Nach der auf der Folie genannten Praxis des Bundesgerichts **nein**.",
                "Art. 404 OR erlaubt zwar grundsätzlich die jederzeitige Beendigung eines Auftrags. Die Folie nennt aber ausdrücklich die Ausnahme: Bei **„atypischen\" Aufträgen mit vereinbarter Kündigungsfrist** gilt das nicht, und sie nennt als Beispiel genau den **Support-Vertrag**.",
                "Merke für die Prüfung: Art. 404 OR ist nie eine automatische Antwort. Erst prüfen, ob ein typischer oder ein atypischer Dauerauftrag vorliegt."
              ]
            } }
          ],
          remember: "Auftrag Art. 394 ff OR: kein Resultat geschuldet. Art. 404 OR jederzeit beendbar, aber nicht bei atypischen Aufträgen mit Kündigungsfrist (z. B. Support). Rechenschaftspflicht, Haftung fürs Handeln statt für den Erfolg."
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
            { callout: { tone: "exam", title: "Die Klausel, die den Vertragstyp verschiebt", text: "Ziffer 4.4 des Entwurfs verzichtet ausdrücklich auf ein **formelles Abnahmeverfahren** und lässt den Review oder die produktive Nutzung an dessen Stelle treten. Die Abnahme ist aber genau das Merkmal des Werkvertrags. Wer sie wegverhandelt, bewegt den Vertrag inhaltlich Richtung Auftrag." } }
          ],
          remember: "Klassisch = Werkvertrag plus Lizenz-/Kaufvertrag. Agil passt in keinen Typ, deshalb individuell zusammensetzen. Das 10-Punkte-Modell hat drei Zonen: Kunde, Lieferant, Partnerschaft. Verzicht auf formelle Abnahme verschiebt den Vertrag Richtung Auftrag."
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
              explanation: "Beim Werkvertrag ist das Werk geschuldet, beim Auftrag ausdrücklich kein Resultat. Die Abrechnungsart ist ein Indiz, aber nicht das Kriterium."
            },
            {
              id: "art377",
              type: "type",
              prompt: "Welcher OR-Artikel regelt das Rücktrittsrecht des Bestellers im Werkvertrag, vor dem die Folie ausdrücklich warnt? (nur die Zahl)",
              accept: ["377", "Art. 377", "Art 377", "OR 377", "Art. 377 OR"],
              placeholder: "Zahl",
              explanation: "Art. 377 OR. Die Folie warnt: Das könnte sehr teuer werden."
            },
            {
              id: "art404",
              type: "multi",
              prompt: "Was gilt zur jederzeitigen Beendigung des Auftrags nach Art. 404 OR?",
              options: [
                "Grundsätzlich kann ein Auftrag jederzeit beendet werden",
                "Nach der Praxis des Bundesgerichts gilt das nicht bei atypischen Aufträgen mit vereinbarter Kündigungsfrist",
                "Ein Support-Vertrag ist das Beispiel der Folie für einen solchen atypischen Auftrag",
                "Art. 404 OR gilt ausnahmslos und geht jeder Vereinbarung vor"
              ],
              correct: [0, 1, 2],
              explanation: "Die letzte Aussage widerspricht direkt der auf der Folie genannten Bundesgerichtspraxis."
            },
            {
              id: "agil-zonen",
              type: "order",
              prompt: "Ordne die drei Zonen des agilen Vertragsmodells so, wie sie auf Folie 6 von der Kundenseite über die Lieferantenseite in die Mitte führen.",
              items: ["Kunden-Aspekte: Problem & Scope, Budget & Road map", "Lieferanten-Aspekte: Fähigkeiten, Lösung & Angebot", "Partnerschaft: codex, agile.framework, scope.governance, Risiko, Belohnung, Exits"],
              explanation: "Kunde und Lieferant bringen je ihre Aspekte ein, die eigentliche Regelungsarbeit liegt dann in der Zone Partnerschaft mit sechs der zehn Punkte."
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
              explanation: "Der Satz steht wörtlich auf Folie 17, direkt im Zusammenhang mit dem Rücktrittsrecht nach Art. 377 OR."
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
          remember: "Typische Streitfälle: Verzögerung, mehrere Beteiligte, Lieferung, Mängel, unklare Abnahme, Zahlung, Bindung. Verzug: Gläubiger- und Schuldnerverzug (Art. 91/102 OR), Mahnung nötig, Mitwirkungspflichten des Kunden, Folgen Art. 103 ff OR."
        },
        {
          type: "slide",
          title: "Folie 16 — Schlecht- oder Nichterfüllung?",
          body: [
            { callout: { tone: "def", title: "Voraussetzung zuerst", text: "Bevor überhaupt etwas geltend gemacht werden kann, braucht es eine **Mängelrüge** (Art. 197, 367 OR)." } },
            { compare: {
              left: { title: "Nichterfüllung", points: [
                "Es wird **gar keine** Leistung erbracht",
                "Kommt laut Folie **selten** vor"
              ] },
              right: { title: "Schlechterfüllung", points: [
                "Eine Leistung wird erbracht, aber mangelhaft",
                "Kleinere Mängel und Anpassungen sind **keine** Schlechterfüllung",
                "Bei Software stellen kleinere Mängel in der Regel keine Schlechterfüllung dar"
              ] },
              verdict: "Nichterfüllung ist nicht dasselbe wie Schlechterfüllung, und nicht jeder Mangel ist eine Schlechterfüllung."
            } },
            { callout: { tone: "warn", title: "Die Produktivnutzungs-Falle", text: "Die **Produktivnutzung der Software impliziert regelmässig, dass das System tauglich ist und über keine grösseren Mängel verfügt.** Wer die Software also produktiv einsetzt und erst danach grosse Mängel geltend macht, hat ein Beweisproblem." } },
            { callout: { tone: "exam", title: "Die besondere Stellung des IT-Anbieters", text: "Dem IT- und Technologieanbieter kommt als **Spezialist** grundsätzlich eine besondere **Aufklärungspflicht** und Haftung zu. Er haftet auch für seine **Vorabklärungen**. Das verschiebt die Verantwortung im Fall spürbar Richtung Lieferant." } },
            { reveal: {
              question: "Ein Kunde nimmt eine Software in den Produktivbetrieb, meldet nach vier Monaten aber grosse Mängel und will vom Vertrag zurücktreten. Wie prüfst du den Fall?",
              label: "Prüfschema aufdecken",
              answer: [
                "**Erstens Mängelrüge:** Wurde überhaupt rechtzeitig gerügt (Art. 197, 367 OR)? Ohne Rüge geht nichts.",
                "**Zweitens Abgrenzung:** Handelt es sich um Nichterfüllung (gar keine Leistung, selten) oder um Schlechterfüllung? Und sind es wirklich grössere Mängel, oder kleinere Mängel und Anpassungen, die bei Software gerade keine Schlechterfüllung darstellen?",
                "**Drittens Produktivnutzung:** Die produktive Nutzung spricht regelmässig dafür, dass das System tauglich war und keine grösseren Mängel aufwies. Das ist ein starkes Gegenargument gegen den Kunden.",
                "**Viertens Gegenseite:** Dem Anbieter kommt als Spezialist eine besondere Aufklärungspflicht zu, auch für seine Vorabklärungen. Hat er auf erkennbare Risiken hingewiesen?"
              ]
            } }
          ],
          remember: "Mängelrüge zuerst (Art. 197, 367 OR). Nichterfüllung = gar keine Leistung, selten. Kleinere Mängel bei Software sind keine Schlechterfüllung. Produktivnutzung impliziert Tauglichkeit. Der Anbieter hat als Spezialist eine besondere Aufklärungspflicht."
        },
        {
          type: "checkpoint",
          id: "cp-stoerungen",
          title: "Checkpoint: Verzug, Mängel, Störungen",
          questions: [
            {
              id: "maengelruege",
              type: "single",
              prompt: "Was ist die Voraussetzung, bevor Schlecht- oder Nichterfüllung überhaupt geltend gemacht werden kann?",
              options: [
                "Eine Mängelrüge (Art. 197, 367 OR)",
                "Eine gerichtliche Klage",
                "Der Ablauf der Garantiefrist",
                "Die schriftliche Abnahme des Werkes"
              ],
              correct: 0,
              explanation: "Ohne Mängelrüge keine Geltendmachung. Die Folie nennt dazu Art. 197 und 367 OR."
            },
            {
              id: "produktiv",
              type: "single",
              prompt: "Was impliziert die Produktivnutzung einer Software gemäss Folie 16 regelmässig?",
              options: [
                "Dass das System tauglich ist und über keine grösseren Mängel verfügt",
                "Dass die Abnahme ausdrücklich verweigert wurde",
                "Dass der Vertrag in einen Auftrag umgewandelt wurde",
                "Dass die Gewährleistungsfrist neu zu laufen beginnt"
              ],
              correct: 0,
              explanation: "Deshalb ist die Produktivnutzung ein starkes Argument gegen spätere Mängelbehauptungen."
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
              explanation: "Die Folie verlangt ausdrücklich den Hinweis auf die Fälligkeit, also die Mahnung. Ein automatischer Verzug steht dort nicht."
            },
            {
              id: "aufklaerung",
              type: "type",
              prompt: "Welche besondere Pflicht trifft den IT-Anbieter laut Folie 16, weil er Spezialist ist? (ein Wort)",
              accept: ["Aufklärungspflicht", "Aufklaerungspflicht", "Aufklärung", "Aufklaerung", "besondere Aufklärungspflicht"],
              placeholder: "ein Wort",
              explanation: "Eine besondere Aufklärungspflicht und Haftung, auch für seine Vorabklärungen."
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
            { callout: { tone: "exam", title: "Warum das so oft geprüft wird", text: "Die Indizien beschreiben genau die Situation vieler IT-Freelancer: fest im Scrum-Team, kein eigenes Risiko, keine eigene Akquisition. Je mehr Indizien zutreffen, desto eher liegt trotz Freelancer-Vertrag ein **Arbeitsverhältnis** vor, mit allen Folgen für Sozialversicherungen und Kündigungsschutz." } },
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
            { callout: { tone: "tip", title: "Zusammenhang zur vorherigen Folie", text: "Personalverleih ist die saubere, bewilligte Variante dessen, was bei Scheinselbständigkeit schiefgeht. Wer dauerhaft Personal in fremde Projektorganisationen stellt, betreibt unter Umständen bewilligungspflichtigen Personalverleih." } }
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
              explanation: "Selbständiges Inkasso spricht gerade **für** Selbständigkeit. Die Folie nennt als Indiz für ein Anstellungsverhältnis, dass er das Inkasso **nicht** selbständig durchführen muss."
            },
            {
              id: "art319",
              type: "type",
              prompt: "Ab welchem OR-Artikel ist der Einzelarbeitsvertrag geregelt? (nur die Zahl)",
              accept: ["319", "Art. 319", "Art 319", "OR 319", "319 ff", "Art. 319 ff"],
              placeholder: "Zahl",
              explanation: "Art. 319 ff OR."
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
              explanation: "Verboten ist er nicht, aber bewilligungspflichtig und mit Kautionspflicht verbunden."
            },
            {
              id: "zeugnis",
              type: "single",
              prompt: "Welcher Artikel regelt das Arbeitszeugnis?",
              options: ["Art. 330a OR", "Art. 321e OR", "Art. 340 OR", "Art. 377 OR"],
              correct: 0,
              explanation: "Art. 321e OR ist die Haftung der Mitarbeitenden, Art. 340 ff das Konkurrenzverbot, Art. 377 der Rücktritt im Werkvertrag."
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
                ["Art. 197 / 367 OR", "Mängelrüge", "Voraussetzung für Schlecht- und Nichterfüllung"],
                ["Art. 319 ff OR", "Einzelarbeitsvertrag", "Abgrenzung Arbeitnehmer, selbständig, scheinselbständig"],
                ["Art. 321e OR", "Haftung der Mitarbeitenden", ""],
                ["Art. 330a OR", "Arbeitszeugnis", ""],
                ["Art. 340 ff OR", "Nachvertragliches Konkurrenzverbot", ""],
                ["Art. 363 ff OR", "Werkvertrag", "Resultat geschuldet, Abnahme, Gewährleistung"],
                ["Art. 377 OR", "Rücktritt im Werkvertrag", "Besteller kann zurücktreten, kann sehr teuer werden"],
                ["Art. 394 ff OR", "Auftrag", "Kein Resultat geschuldet, Rechenschaftspflicht"],
                ["Art. 404 OR", "Beendigung des Auftrags", "Jederzeit, ausser bei atypischen Aufträgen mit Kündigungsfrist"],
                ["Art. 530 ff OR", "Einfache Gesellschaft", "Entsteht leicht ungewollt, erhebliche Haftungsfolgen"],
                ["AVG", "Personalverleih", "Bewilligungspflichtig, Kaution zu hinterlegen"],
                ["ArG", "Arbeitsgesetz", "Gesundheitsschutz, Arbeits- und Ruhezeiten, Familienpflichten"]
              ],
              marks: { "10,0": "bad", "12,0": "bad", "13,0": "bad" },
              note: "Rot markiert die drei Artikel, bei denen die Folien ausdrücklich warnen."
            } }
          ],
          remember: "Die drei Warn-Artikel: Art. 377 (teurer Rücktritt im Werkvertrag), Art. 404 (Auftrag jederzeit kündbar, ausser atypisch), Art. 530 ff (ungewollte einfache Gesellschaft)."
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
              "Ich kann die Ausnahme zu **Art. 404 OR** bei atypischen Aufträgen erklären.",
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
            "Diese Fälle stehen so nicht auf den Folien. Sie verbinden mehrere Konzepte, und genau das wird in einer Open-Book-Prüfung verlangt, weil blosses Nachschlagen dort nicht reicht.",
            { reveal: {
              question: "**Fall 1.** Ein Startup beauftragt eine Agentur mündlich mit der Entwicklung einer App. Man einigt sich per Chat auf „ungefähr 80'000 Franken\" und arbeitet in zweiwöchigen Sprints. Nach fünf Monaten steigt das Startup aus und will nichts mehr zahlen. Wie gehst du an den Fall heran?",
              label: "Lösungsweg aufdecken",
              answer: [
                "**Schritt 1, ist überhaupt ein Vertrag zustande gekommen?** Ja. Nach Art. 1 OR genügt die gegenseitige übereinstimmende Willensäusserung, und sie kann mündlich oder konkludent erfolgen. Die Vertragsfreiheit gilt für Form und Inhalt. Dass kein Papier existiert, ändert nichts an der Gültigkeit, wohl aber an der **Beweisbarkeit**, die Folie 3 als zentrale Funktion nennt.",
                "**Schritt 2, welcher Typ?** Sprints und gemeinsame Zielfindung sprechen gegen den klassischen Werkvertrag und eher für einen Auftrag. Folie 5 sagt allerdings ausdrücklich, dass bei agiler Entwicklung nichts wirklich passt. Für die Beurteilung zählt, was gelebt wurde: Gab es Abnahmen, oder liefen Reviews und produktive Nutzung?",
                "**Schritt 3, der Ausstieg.** Als Auftrag beurteilt, greift Art. 404 OR mit jederzeitiger Beendigung. Als Werkvertrag beurteilt, greift Art. 377 OR, und dann wird es für das Startup teuer. Die Qualifikation entscheidet also über das Geld.",
                "**Schritt 4, die „ungefähr 80'000\".** Das ist das Problem von Folie 17: Fixpreis, Aufwand oder Kostendach? „Ungefähr\" ist keine dieser drei Varianten, und genau deshalb steht auf der Folie, wer bei iterativen Projekten eine Gesamtsumme vereinbart, sei selber schuld."
              ]
            } },
            { reveal: {
              question: "**Fall 2.** Ein SaaS-Anbieter kündigt den Vertrag fristgerecht. Der Kunde stellt fest, dass er seine Daten nicht in einem brauchbaren Format exportieren kann, und der Vertrag sagt dazu nichts. Welche Punkte der Vorlesung greifen?",
              label: "Lösungsweg aufdecken",
              answer: [
                "**Folie 4** hat genau das vorausgesagt: Bei Dauerverträgen in der Cloud stellt sich die Frage, was passiert, wenn kein Zugang und kein Support mehr besteht und wichtige Daten unerreichbar sind.",
                "**Folie 9** nennt die Gegenmassnahme, die hier gefehlt hat: nicht nur an den Beginn, sondern auch an das **Ende** der Zusammenarbeit denken, mit **Exit-Klauseln** und **Mitwirkungspflichten bei Hosting und SaaS**.",
                "Juristisch ist das kein Mangel der Leistung, sondern eine **Vertragslücke**. Und weil das SaaS-Verhältnis ein Innominatvertrag ist, gibt es keine gesetzliche Auffangregel, die man einfach anwenden könnte. Das ist der praktische Grund, warum Folie 4 mit „individuelle Vereinbarungen\" endet.",
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
              "**Der Vertragsentwurf auf Folie 7.** Ein Auszug aus einem echten Entwicklungsvertrag. Du musst die Ziffern nicht auswendig kennen. Wichtig ist nur die eine Erkenntnis: Der Verzicht auf ein formelles Abnahmeverfahren verschiebt den Vertrag Richtung Auftrag.",
              "**Die Aufzählung der Innominatverträge auf Folie 12.** Du musst wissen, dass Leasing, Factoring, Escrow, SLA und NDA nicht im Gesetz geregelt sind. Die Einzelheiten jedes dieser Verträge sind nicht Thema dieser Vorlesung.",
              "**Die technischen Beispiele auf Folie 4** wie Kubernetes, Docker oder GitHub. Sie illustrieren, warum alte Vertragsmuster nicht mehr passen. Die Technik selbst wird nicht geprüft.",
              "**Die Schlussfolie 24** ist ein Platzhalter für die eigenen Notizen aus dem Unterricht."
            ] },
            { callout: { tone: "tip", title: "Faustregel für diese Vorlesung", text: "Alles, wozu der Dozent einen Artikel nennt oder ein „ACHTUNG\" setzt, ist Lernstoff. Alles, was nur als Beispiel oder Aufzählung erscheint, musst du nur einordnen können." } }
          ],
          remember: "Nice to know: der Vertragsentwurf im Detail, die einzelnen Innominatverträge, die Technikbeispiele, die Schlussfolie. Lernstoff ist, wo ein Artikel oder ein ACHTUNG steht."
        },
        {
          type: "checkpoint",
          id: "cp-final",
          title: "Prüfungs-Check: die ganze Vorlesung",
          questions: [
            {
              id: "fall-qualifikation",
              type: "single",
              prompt: "Eine Agentur entwickelt in Sprints, es gibt kein formelles Abnahmeverfahren, und das Team arbeitet eng mit dem Kunden zusammen. Welche Qualifikation liegt am nächsten, und warum?",
              options: [
                "Eher Auftrag, weil kein abgrenzbares Resultat abgenommen wird, sondern sorgfältiges Zusammenarbeiten im Vordergrund steht",
                "Eindeutig Werkvertrag, weil am Ende Software entsteht",
                "Kaufvertrag, weil Software ein Produkt ist",
                "Miete, weil die Leistung über Zeit erbracht wird"
              ],
              correct: 0,
              explanation: "Die Abnahme ist das Merkmal des Werkvertrags. Fällt sie weg und zählt die Zusammenarbeit, spricht das für den Auftrag. Folie 5 hält allerdings fest, dass bei agilen Projekten nichts wirklich passt."
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
              explanation: "Das Arbeitszeugnis wird nur als Fundstelle genannt, ohne Warnung. Die drei anderen tragen auf den Folien ein ausdrückliches ACHTUNG oder eine entsprechende Warnung."
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
              explanation: "Mit jeder Zone wird der Werkzeugkasten kleiner. Deshalb betont die Folie, Konflikte früh zu erkennen."
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
              explanation: "Folie 19 nennt als Indiz für ein Anstellungsverhältnis, dass er das Inkasso **nicht** selbständig durchführen muss. Tut er es doch, spricht das für Selbständigkeit."
            },
            {
              id: "prozess",
              type: "type",
              prompt: "Vervollständige den Kernsatz von Folie 3: Der Verhandlungsprozess ist wichtiger als das daraus entstandene …",
              accept: ["Papier", "das Papier", "Papier!", "Vertragspapier"],
              placeholder: "ein Wort",
              explanation: "Alles, was am Anfang nicht verhandelt wird, wird später wieder verhandelt, dann aber unter anderen Rahmenbedingungen."
            }
          ]
        }
      ]
    }
  ]
});
