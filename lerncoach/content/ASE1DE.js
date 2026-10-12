/* ASE1 HS26, deutsche CPRE-Vorbereitung. Inhaltlich identisch mit lerncoach/content/ASE1.js (Englisch).
 * Die englische Variante bleibt unverändert und ist die Fassung in Prüfungssprache.
 * Diese Datei übersetzt Folien, Checkpoints und Erklärungen ins Deutsche; zentrale englische
 * Fachbegriffe stehen in Klammern, damit die Prüfungsbegriffe präsent bleiben.
 * Quellen wie in ASE1.js: Activities - Week 01–04.pdf, Workshop-Aufgabenblätter, UX/UCD-Folien.
 * H = lokales CPRE Foundation Level Handbuch v1.2.0, Glinz et al., © IREB.
 * Eigene Erklärungen und Trainingsfälle; keine kopierten offiziellen Prüfungsfragen oder Abbildungen.
 * Prioritäten und offener Stoff: quizzes/ASE1DE/CPRE_Pruefungsleitfaden.html.
 */
(() => {
  const H = section => `CPRE FL Handbuch v1.2.0, Abschnitt ${section}`;
  const W = (n, slides) => `Activities - Week 0${n}.pdf, gedruckte Folien ${slides}`;
  const S = (title, ref, ...body) => ({ type: "slide", title, body: [...body, `Quelle: ${ref}`] });
  const single = (id, prompt, options, correct, explanation) => ({ id, type: "single", prompt, options, correct, explanation });
  const multi = (id, prompt, options, correct, explanation) => ({ id, type: "multi", prompt, options, correct, explanation });
  const order = (id, prompt, items, explanation) => ({ id, type: "order", prompt, items, explanation });
  const C = (id, title, ref, questions) => ({ type: "checkpoint", id, title, questions: questions.map(q => ({ ...q, explanation: `${q.explanation} Quelle: ${ref}.` })) });
  const table = (head, rows) => ({ table: { head, rows } });
  const reveal = (question, ...answer) => ({ reveal: { question, answer, label: "Erklärung anzeigen" } });
  const note = (tone, title, text) => ({ callout: { tone, title, text } });
  const check = items => ({ checklist: { title: "Kann ich das ohne Notizen erklären?", items } });
  const flow = (...steps) => ({ flow: { steps: steps.map(title => ({ title })) } });
  const tnote = (head, rows, note) => ({ table: note ? { head, rows, note } : { head, rows } });
  const cards = (...items) => ({ cards: items.map(([title, text]) => ({ title, text })) });
  const compare = (leftTitle, leftPoints, rightTitle, rightPoints, verdict) => ({ compare: verdict
    ? { left: { title: leftTitle, points: leftPoints }, right: { title: rightTitle, points: rightPoints }, verdict }
    : { left: { title: leftTitle, points: leftPoints }, right: { title: rightTitle, points: rightPoints } } });
  const formula = (main, parts, note) => ({ formula: { main, parts: parts.map(([label, text]) => ({ label, text })), note } });
  const typed = (id, prompt, accept, explanation, placeholder) => (placeholder
    ? { id, type: "type", prompt, accept, explanation, placeholder }
    : { id, type: "type", prompt, accept, explanation });
  const LE = name => `ASE1-Fallstudie Online-Auktionsplattform, Lernaufgabe «${name}» (Musterlösung)`;

  Lerncoach.registerSubject({
    id: "ASE1DE", name: "Advanced Software Engineering 1 (Deutsch)", short: "A1DE", accent: "#3f7a5a",
    description: "Deutsche Fassung der CPRE-Foundation-Vorbereitung: Prinzipien, Kontext, Dokumentation und Anforderungsausarbeitung. Wochen 1–4, mit eigenen Übungsfällen. Englische Fachbegriffe in Klammern.",
    weeks: [
      { id: "w1", number: 1, title: "RE-Grundlagen und die neun Prinzipien", status: "ready", items: [
        S("Dein Weg zur CPRE-Prüfung", `${W(1, "4–8")}; Introductory slides.pdf, Folien 17–20`,
          "Die Prüfung findet am 28. Oktober 2026 statt (dein bestätigtes Datum). Dieser Kurs bringt dir bei, Konzepte zu erkennen, Abwägungen zu erklären und sie auf kurze Fälle anzuwenden. Dies ist die deutsche Fassung; die englische Variante bleibt als eigenes Fach bestehen.",
          note("exam", "Lernkontrolle", "Diese Checkpoints vermitteln den Stoff; sie sind keine offizielle Probeprüfung. Die separaten Wochenquiz verlinken den CPRE-Prüfungsleitfaden und offizielle Übungsressourcen."),
          note("tip", "Prüfungssprache beachten", "Wenn du die Prüfung auf Englisch schreibst, präge dir die englischen Begriffe in Klammern mit ein. Zur Kontrolle eignet sich die englische ASE1-Variante."),
          "Die Wochen 1–4 decken nicht das ganze Zertifikat ab: Prozesse, Requirements Management und Werkzeuge musst du vor der Prüfung noch gezielt lernen."),
        S("Anforderungen gibt es, bevor sie aufgeschrieben werden", H("1.1, S. 10–12"),
          "Eine Anforderung (requirement) kann ein Bedürfnis eines Stakeholders sein, eine Fähigkeit oder Eigenschaft, die von einem System erwartet wird, oder eine dokumentierte Darstellung dieses Bedürfnisses. Das Aufschreiben macht eine Anforderung sichtbar; es erzeugt nicht das zugrunde liegende Bedürfnis.",
          "Eigenes Beispiel: Ein Bieter braucht die Gewissheit, dass sein Gebot eingegangen ist. Eine Systemfähigkeit könnte ihm erlauben, den Status des Gebots einzusehen. Eine Anforderungsformulierung hält das vereinbarte Verhalten fest.",
          reveal("Ein Team hat keine Spezifikation. Heisst das, es hat keine Anforderungen?", "Nein. Bedürfnisse und Erwartungen sind trotzdem vorhanden, aber sie können implizit, widersprüchlich oder unbekannt sein.")),
        S("Drei Arten von Anforderungen", `${W(1, "15")}; ${H("1.1")}`,
          table(["Art", "Leitfrage", "Eigenes Beispiel"], [
            ["Funktional (functional)", "Welches Ergebnis, welche Daten oder welches Verhalten wird verlangt?", "Die Plattform soll dem Bieter anzeigen, ob ein Gebot angenommen wurde."],
            ["Qualität (quality)", "Welches Qualitätsmerkmal wird verlangt?", "Unter der vereinbarten Testlast erscheinen 95 % der Bestätigungen innerhalb von 2 Sekunden."],
            ["Randbedingung (constraint)", "Welche Lösungsentscheidungen werden eingeschränkt?", "Die Plattform muss das von der Organisation vorgeschriebene Datenbankprodukt verwenden."]
          ]), "Klassifiziere das Anliegen, nicht ein Stichwort. Ein detailliertes Schnittstellenverhalten kann trotzdem funktional sein. Ein Sicherheitsziel kann in funktionale Kontrollen verfeinert werden."),
        C("cp-requirements", "Das Anliegen erkennen", H("1.1"), [
          single("receipt", "Eigenes Beispiel: Das System soll nach Annahme eines Gebots eine Quittung senden. Welche Art ist das?", ["Qualitätsanforderung", "Funktionale Anforderung", "Randbedingung"], 1, "Sie legt eine beobachtbare Reaktion des Systems fest."),
          multi("qualities", "Wähle die ZWEI Qualitätsanforderungen.", ["Eine Gebotshistorie anzeigen", "Die Verfügbarkeit soll während der vereinbarten Servicezeiten 99,9 % erreichen", "Das vorgeschriebene Datenbankprodukt verwenden", "95 % der Suchanfragen sollen unter der festgelegten Last innerhalb einer Sekunde abgeschlossen sein"], [1,3], "Verfügbarkeit und Antwortzeit legen Qualität fest; die anderen Aussagen beschreiben Verhalten bzw. eine Einschränkung der Lösung."),
          single("implicit", "Ein Bedürfnis wurde nicht aufgeschrieben. Was folgt daraus?", ["Es kann keine Anforderung sein", "Es kann trotzdem eine Anforderung sein", "Es liegt automatisch ausserhalb des Scopes"], 1, "Anforderung bezeichnet auch das zugrunde liegende Bedürfnis, nicht nur dessen Dokumentation.")
        ]),
        S("Warum sich Aufwand für RE lohnt", `${W(1, "10, 13–14")}; ${H("1.2")}`,
          "Stell dir eine technisch perfekte Auktions-Engine vor, die gelegentliche Mobile-Nutzer ausschliesst. Die Implementierung kann ihre Spezifikation erfüllen und die Stakeholder trotzdem enttäuschen. RE senkt das Risiko, das falsche System zu bauen.",
          { list: ["Das Problem verstehen, bevor teure Verpflichtungen eingegangen werden.", "Eine Grundlage für Schätzungen und Tests schaffen.", "Fehlende, unklare und falsche Anforderungen finden, solange eine Korrektur noch vergleichsweise günstig ist."] },
          "Mehr Dokumentation ist nicht automatisch besser. Der sinnvolle Umfang hängt vom Risiko und vom Wert ab, den die Klärung einer Anforderung bringt."),
        S("Eine Rolle, kein Jobtitel", `${W(1, "16–17")}; ${H("1.4–1.6")}`,
          "Ein Product Owner, Business Analyst oder Entwickler kann die Rolle des Requirements Engineers übernehmen. Ihre Kernaufgaben sind Ermitteln (elicitation), Dokumentieren (documentation), Validieren (validation) und Verwalten (management); diese Aufgaben beeinflussen sich gegenseitig.",
          "Analytisches Denken ist nur ein Teil der Rolle. Zuhören, Moderieren, Empathie und Verhandeln helfen, unterschiedliche Bedürfnisse sichtbar zu machen und Einigung zu erzielen. Kein einzelner Prozess passt auf jedes Projekt."),
        S("Ein System und seine Stakeholder", `${W(1, "11")}; ${H("1.1–1.3, 2.2.2")}`,
          "Ein System kann Software, Hardware, Menschen und organisatorische Abläufe umfassen. Ein Stakeholder ist eine Person oder Organisation, die die Anforderungen beeinflusst oder vom System betroffen ist.",
          "Eigenes Beispiel: Bieter, Verkäufer, Supportpersonal, Betreiber und eine Aufsichtsstelle können für eine Auktionsplattform relevant sein. Ein zahlender Auftraggeber ersetzt die anderen Perspektiven nicht.",
          reveal("Kann dieselbe Person zwei Stakeholder-Rollen einnehmen?", "Ja. Ein Verkäufer kann auch selbst Artikel kaufen. Halte die Rollen und ihre Bedürfnisse fest, statt jeder Person nur eine Perspektive zuzuschreiben.")),
        C("cp-purpose", "Zweck, Aufgaben und Menschen", `${H("1.2–1.6, 2.2.2")}`, [
          single("risk", "Warum sollte man Bedürfnisse validieren, bevor man eine teure Funktion umsetzt?", ["Um zu garantieren, dass sich Anforderungen nie ändern", "Um Tests überflüssig zu machen", "Um das Risiko zu senken, die falsche Fähigkeit umzusetzen"], 2, "Validierung verringert die Unsicherheit über Stakeholder-Bedürfnisse; künftige Änderungen kann sie nicht ausschliessen."),
          multi("tasks", "Welche ZWEI Tätigkeiten gehören zur RE-Rolle?", ["Ein Bedürfnis mit betroffenen Nutzern klären", "CPU-Instruktionen für einen Compiler auswählen", "Prüfen, ob dokumentierte Anforderungen die vereinbarten Bedürfnisse wiedergeben", "Eine Marketingkampagne als RE-Hauptaufgabe erstellen"], [0,2], "Ermittlung und Validierung sind Kernaufgaben im RE."),
          single("role", "Ein Betreiber beeinflusst die Anforderungen an die Wiederherstellung, bietet aber nie selbst. Ist der Betreiber ein Stakeholder?", ["Ja", "Nur wenn der Betreiber zahlt", "Nein, nur Endnutzer zählen"], 0, "Es genügt, die Anforderungen zu beeinflussen; direkte Nutzung als Endanwender ist nicht nötig.")
        ]),
        S("Prinzipien 1–3: Wert, Menschen und Verständnis", `${W(1, "19")}; ${H("2.2.1–2.2.3")}`,
          { cards: [
            { title: "Wertorientierung (value orientation)", text: "Aufwand dort einsetzen, wo Klärung und Risikoreduktion die Kosten rechtfertigen." },
            { title: "Stakeholder", text: "Die relevanten Perspektiven finden und ihre Bedürfnisse und Konflikte behandeln." },
            { title: "Gemeinsames Verständnis (shared understanding)", text: "Prüfen, ob alle den verwendeten Begriffen und Beispielen dieselbe Bedeutung geben." }
          ] }, "Das sind Arbeitsprinzipien, keine Abfolge von Phasen."),
        S("Auch ausdrückliche Einigung kann Missverständnisse verbergen", H("2.2.3, S. 21–23"),
          "Explizites gemeinsames Verständnis beruht auf vereinbarter Dokumentation. Implizites Verständnis beruht auf gemeinsamem Wissen, Erfahrung und Annahmen. Beides kann falsch sein.",
          "Eigenes Beispiel: Alle unterschreiben eine Anforderung zu «aktiven Bietern», aber der Support meint eingeloggte Nutzer, die Entwicklung meint Nutzer mit einem angenommenen Gebot. Eine Unterschrift hat die Mehrdeutigkeit nicht aufgelöst.",
          reveal("Wie könntest du diesen Unterschied aufdecken?", "Lass beide Gruppen konkrete Beispiele einordnen, vereinbare einen Glossareintrag und validiere die daraus entstehende Regel. Ein Prototyp oder ein kurzer Feedbackzyklus kann weitere Lücken aufdecken.")),
        S("Prinzipien 4–6: Kontext, Problem und Validierung", `${W(1, "19")}; ${H("2.2.4–2.2.6")}`,
          { cards: [
            { title: "Kontext (context)", text: "Die Umgebung, Schnittstellen und Annahmen verstehen, die Anforderungen erst sinnvoll machen." },
            { title: "Problem – Anforderung – Lösung", text: "Das Bedürfnis von einer vorgeschlagenen Umsetzung unterscheiden und dabei ihre Abhängigkeiten untersuchen." },
            { title: "Validierung (validation)", text: "Bedürfnisse, Einigung und Kontextannahmen früh und wiederholt prüfen." }
          ] }, "Ein Prototyp ist bereits eine Teillösung, kann aber helfen herauszufinden, wie die Anforderung lauten sollte. Die drei Anliegen sind miteinander verflochten."),
        C("cp-understanding", "Prinzipien anwenden, nicht Schlagworte", H("2.2.1–2.2.6"), [
          single("signed", "Alle haben denselben Text unterschrieben. Was kannst du daraus schliessen?", ["Ihre Interpretationen müssen übereinstimmen", "Weitere Validierung ist unnötig", "Die Einigung sollte trotzdem anhand von Beispielen geprüft werden"], 2, "Auch explizites gemeinsames Verständnis kann falsch sein."),
          multi("context", "Wähle ZWEI Punkte, die sich bei der Validierung von Anforderungen zu prüfen lohnen.", ["Ob die relevanten Bedürfnisse abgedeckt sind", "Ob Annahmen über externe Systeme plausibel sind", "Ob das Dokument so lang wie möglich ist", "Ob jede Anforderung künftige Änderungen verbietet"], [0,1], "Abdeckung und realistische Kontextannahmen sind zentrale Anliegen der Validierung."),
          single("solution", "Ein Kunde verlangt einen roten Button. Was ist die beste erste Reaktion?", ["Herausfinden, welches Ergebnis der Button erreichen soll", "Jede vorgeschlagene Lösung ohne Diskussion ablehnen", "Sofort umsetzen, weil es aufgeschrieben ist"], 0, "Lösungsideen können nützlich sein, aber das zugrunde liegende Problem und Bedürfnis muss verstanden werden.")
        ]),
        S("Prinzipien 7–9: Evolution, Innovation und Disziplin", `${W(1, "19")}; ${H("2.2.7–2.2.9")}`,
          { cards: [
            { title: "Evolution", text: "Änderungen sind normal. Sie werden gesteuert, und zugleich bleibt genug Stabilität für eine verlässliche Entwicklung." },
            { title: "Innovation", text: "Bessere Wege suchen, Bedürfnisse zu erfüllen; blosses Abschreiben von Wünschen kann Chancen verpassen." },
            { title: "Systematische und disziplinierte Arbeit", text: "Passende Praktiken und Arbeitsprodukte auf die Situation zuschneiden." }
          ] }, "Auch agile Arbeit braucht Disziplin. Disziplin heisst nicht, dass jedes Projekt dieselbe umfangreiche Spezifikation braucht."),
        S("Eigener Transferfall: eine feste Auktionsfrist", H("2.2.5–2.2.9"),
          "Verkäufer verlangen nach späten Geboten eine Verlängerung. Käufer wollen einen vorhersehbaren Schlusszeitpunkt. Das Team schlägt vor, die Regel nächste Woche stillschweigend zu ändern.",
          reveal("Welche Prinzipien führen zu einer besseren Reaktion?", "Stakeholder: beide Bedürfnisse untersuchen. Gemeinsames Verständnis: eine präzise Schlussregel festlegen. Validierung: Beispiele mit beiden Gruppen durchgehen. Evolution: Folgen abschätzen und eine vereinbarte Änderung kommunizieren. Innovation: Alternativen prüfen, ohne die erste Idee als verbindlich zu behandeln.")),
        S("Eigener Transferfall: das perfekte Dokument", H("2.2.1, 2.2.3, 2.2.9"),
          "Ein Team spezifiziert drei Wochen lang eine Wegwerf-Skizze bis ins letzte Detail, während eine riskante Annahme zur Zahlung ungetestet bleibt.",
          reveal("Was sollte sich am RE-Aufwand ändern?", "Den Aufwand auf die riskante Annahme verlagern und sie mit den relevanten Stakeholdern klären. Genug Dokumentation behalten, um Entscheidungen zu kommunizieren und zu pflegen. Den Aufwand nach erwartetem Wert beurteilen, nicht nach Seitenzahl.")),
        C("cp-evolution", "Auf Änderungen reagieren", H("2.2.7–2.2.9"), [
          single("change", "Ein neuer Kunden-Workflow ändert eine Anforderung. Welche Reaktion passt zum Evolutionsprinzip?", ["Ablehnen, weil vereinbarte Anforderungen unveränderlich sind", "Jede Änderung ohne Analyse annehmen", "Auswirkungen abschätzen und die Änderung über einen geeigneten Prozess behandeln"], 2, "RE balanciert Anpassung und kontrollierte Stabilität."),
          multi("discipline", "Wähle ZWEI passende Praktiken.", ["RE auf die Risiken des Projekts zuschneiden", "Annahmen in kurzen Feedbackzyklen validieren", "Unabhängig vom Kontext immer dieselben Dokumente verwenden", "Agiles Arbeiten als Freipass zum Weglassen von RE verstehen"], [0,1], "Zuschneiden und Feedback unterstützen diszipliniertes Arbeiten."),
          single("innovation", "Was ist das Hauptproblem, wenn man Stakeholder-Wünsche nur protokolliert?", ["Es entsteht immer zu wenig Text", "Verborgene Bedürfnisse und bessere Lösungen können übersehen werden", "Stakeholder werden dadurch irrelevant"], 1, "Innovation verlangt, über die erste geäusserte Lösung hinauszudenken, ohne die Stakeholder auszuschliessen.")
        ]),
        S("Erst die Frage lesen, dann die Alternativen beurteilen", W(1, "4–5"),
          "Übe die Unterscheidung zwischen einer wahren Aussage und der Antwort auf die gestellte Frage. Achte auf NICHT (NOT), am wenigsten geeignet (least suitable), am besten (best) und die verlangte Anzahl Antworten.",
          note("warn", "Nicht nach Wörtern raten", "Wörter wie immer oder nie beweisen nicht automatisch, dass eine Option falsch ist. Beurteile das zugrunde liegende Konzept und die Bedingungen im Fall."),
          "Die Überschrift «CTFL» in der Vorlesung ist in diesem CPRE-Kontext ein Tippfehler. Für Format und Bewertung gilt die CPRE-eigene Prüfungsordnung."),
        C("cp-transfer", "Abschlusscheck Grundlagen", `${H("1–2")}; ${W(1, "5")}`, [
          single("not", "Welche Aussage ist KEIN tragfähiges RE-Prinzip?", ["Systeme müssen in ihrem Kontext verstanden werden", "Anforderungen können sich weiterentwickeln", "Mehr Dokumentation schafft immer mehr Wert", "Stakeholder-Bedürfnisse validieren"], 2, "Dokumentation verursacht Kosten und muss ihren Wert rechtfertigen."),
          multi("falsecommon", "Ein Team verwendet denselben Begriff unterschiedlich. Wähle ZWEI hilfreiche Massnahmen.", ["Einen Glossareintrag mit Beispielen vereinbaren", "Jede Partei einen konkreten Fall erklären lassen", "Annehmen, dass Unterschriften Verständnis beweisen", "Die Entwickler stillschweigend eine Bedeutung wählen lassen"], [0,1], "Beide Massnahmen prüfen die Bedeutung, statt sie vorauszusetzen."),
          single("allnine", "Die Fallbeschreibung erwähnt Validierung nicht. Was folgt daraus?", ["Das Validierungsprinzip gilt nicht", "Die Validierung ist bereits abgeschlossen", "Es fehlen Belege; eine passende Validierung ist zu planen"], 2, "Dass etwas nicht beschrieben ist, beweist nicht, dass ein allgemeines Prinzip nicht gilt.")
        ]),
        S("Selbstcheck Woche 1", `${W(1, "8–21")}; ${H("1–2")}`,
          check(["Eine Anforderung nach ihrem Anliegen klassifizieren.", "Erklären, wie RE Risiken senkt und Wert schafft.", "Alle neun Prinzipien nennen und anwenden.", "Scheinbares gemeinsames Verständnis erkennen.", "Erklären, warum fehlende Belege ein Prinzip nicht irrelevant machen."]),
          "Als Nächstes: Kontextannahmen als sichtbare Grenzen darstellen und Interviews vorbereiten, die brauchbare Belege liefern.")
      ] },
      { id: "w2", number: 2, title: "Systemkontext, Scope und explorative Interviews", status: "ready", items: [
        S("Worum es diese Woche wirklich geht", `${W(2, "2–14")}; ${H("2.2.4, 3.1.1, 3.4.2")}`,
          "Diese Woche beantwortest du zwei Fragen, die am Anfang jedes Projekts stehen: **Was gehört zu meinem System, und was nicht?** Und: **Wie bekomme ich aus Menschen heraus, was sie wirklich brauchen?**",
          "Die Reihenfolge ist kein Zufall. Zuerst steckst du das Spielfeld ab (Kontext und Grenzen). Dabei fallen dir automatisch Lücken auf: Wer entscheidet eigentlich über verspätete Gebote? Was passiert, wenn der Zahlungsdienst ausfällt? Genau diese Lücken sind die Fragen, die du im Interview stellst.",
          note("exam", "Ehrliche Einordnung der Vorlesung", [
            "Die Folien von Woche 2 sind absichtlich dünn: Der Vormittag war Projekt-Kick-off und Interview-Workshop, nicht Frontalunterricht. Die Folien selbst enthalten nur Arbeitsprodukt, Kontextmodell und die Interview-Tipps.",
            "Der prüfungsrelevante Stoff steht im CPRE-Handbuch Kapitel 2 und 3. Die Vorlesung sagt das auch so: «Check the chapter 3 of the book/handbook to study for the exam.»",
            "Darum erklärt diese Woche mehr, als auf den Folien steht. Das ist kein Zusatzstoff, sondern der Stoff, den die Folien voraussetzen."
          ])),

        S("Vier Begriffe, die in der Prüfung gern vertauscht werden", H("2.2.4"),
          "Bevor du irgendetwas zeichnest, musst du vier Wörter trennen können. Sie klingen ähnlich und bedeuten etwas völlig Verschiedenes.",
          cards(
            ["System", "Das, was du baust oder veränderst. Beim Auktionsprojekt: die Auktionsplattform selbst."],
            ["Systemkontext", "Alles ausserhalb des Systems, das für die Anforderungen eine Rolle spielt: Menschen, Nachbarsysteme, Dokumente, Gesetze."],
            ["Umgebung (irrelevant)", "Alles andere auf der Welt. Es existiert, aber es beeinflusst dieses System nicht."],
            ["Scope", "Der Bereich, den dein Projekt gestalten darf. Eine Befugnis, keine Position auf einer Zeichnung."]
          ),
          note("def", "Merksatz in einem Satz", "System = was ich baue. Kontext = was mich beeinflusst. Umgebung = was mich nicht interessiert. Scope = was ich ändern darf."),
          "Beachte: Drei dieser Begriffe beschreiben **Lage** (wo ist etwas?), einer beschreibt **Befugnis** (was darf ich ändern?). Das ist die Quelle fast aller Verwechslungen."),

        S("Die Systemgrenze: innen oder aussen?", H("2.2.4"),
          "Die Systemgrenze (system boundary) trennt das System von allem anderen. Sie beantwortet exakt eine Frage pro Element: Ist das Teil meiner Lösung, oder rede ich damit nur?",
          "Praktischer Test in drei Schritten:",
          { list: [
            "**Baue ich es oder verändere ich es?** Ja, dann innen. Nein, dann aussen.",
            "**Wenn es aussen ist: kommunizieren wir?** Ja, dann ist es eine Schnittstelle, und das Element gehört in den Kontext.",
            "**Wenn wir nicht kommunizieren und es keine Regeln vorgibt:** dann ist es irrelevante Umgebung und kommt in kein Modell."
          ] },
          tnote(["Element im Auktionsprojekt", "Innen oder aussen?", "Begründung"], [
            ["Gebotsverwaltung, Auktionslogik", "Innen (Kernsystem)", "Wird von euch entwickelt"],
            ["Einfache Benutzerverwaltung im Kernsystem", "Innen", "Laut Musterlösung Lösungsbestandteil, also keine externe Schnittstelle"],
            ["Zahlungsorganisation (Visa, PayPal)", "Aussen, im Kontext", "Liefert Autorisierung und bestimmt Formate"],
            ["Administrator (Mensch)", "Aussen, im Kontext", "Sperrt Benutzer über eine Schnittstelle"],
            ["Buchhaltungssystem des Grosshändlers", "Aussen, nur beim erweiterten System", "Für das Kernsystem laut Musterlösung weglassbar"],
            ["Büro-Raumbuchung des Grosshändlers", "Irrelevante Umgebung", "Existiert, beeinflusst aber keine Auktionsanforderung"]
          ], "Eigene Zusammenstellung auf Basis der Musterlösung zur Fallstudie Online-Auktionsplattform."),
          note("warn", "Typischer Prüfungsfehler", "«Wichtig» heisst nicht «innen». Die Zahlungsorganisation ist überlebenswichtig für das Geschäftsmodell und liegt trotzdem ausserhalb der Systemgrenze.")),

        S("Die Kontextgrenze: relevant oder irrelevant?", H("2.2.4"),
          "Die Kontextgrenze (context boundary) liegt weiter aussen. Sie trennt nicht System von Nicht-System, sondern **relevant von irrelevant**.",
          compare(
            "Im relevanten Kontext", [
              "Ein Element, mit dem das System Daten austauscht.",
              "Eine Person, deren Ziel das System erfüllen muss.",
              "Eine Regel oder ein Gesetz, das Verhalten einschränkt.",
              "Eine Annahme, von der die Wirkung des Systems abhängt."
            ],
            "In der irrelevanten Umgebung", [
              "Existiert, aber liefert keine Anforderung.",
              "Keine Schnittstelle, kein Ziel, keine Einschränkung.",
              "Kommt bewusst in kein Modell."
            ],
            "«Irrelevant» ist immer relativ zu diesem System und seinen Anforderungen. Es heisst nicht «unwichtig für die Firma»."),
          reveal("Warum zieht man die Kontextgrenze überhaupt und nimmt nicht einfach alles mit?",
            "Weil sonst jedes Modell ins Unendliche wächst und niemand mehr erkennt, was Anforderungen erzeugt.",
            "Die Kontextgrenze ist eine Aufwandsentscheidung: Sie sagt, wo du aufhörst zu suchen. Sie ist deshalb auch revidierbar. Wenn im Interview eine neue externe Regel auftaucht, verschiebt sich die Grenze."),
          tnote(["Grenze", "Trennt", "Beispiel Auktionsplattform"], [
            ["Systemgrenze", "System von Kontext", "Gebotsanwendung gegenüber externem Zahlungsdienst"],
            ["Kontextgrenze", "relevante Umgebung von irrelevanter", "Zahlungsregeln relevant, Raumbuchungssystem nicht"]
          ])),

        S("Scope: Lage und Befugnis sind zwei verschiedene Dinge", H("2.2.4"),
          "Der Scope ist der Bereich, den das Projekt **gestalten oder entwerfen darf**. Oft deckt er sich mit der Systemgrenze, aber eben nicht immer. Genau diese Abweichung wird geprüft.",
          "Stell dir eine Zweiermatrix vor: Jedes Element ist entweder im System oder nicht, und gleichzeitig entweder im Scope oder nicht. Alle vier Felder kommen in der Praxis vor.",
          { table: { head: ["Lage des Elements", "Im Scope (darf ich ändern)", "Nicht im Scope (muss ich hinnehmen)"], rows: [
            ["Im System", "Normalfall: die neue Auktionslogik", "Vorgegebene Identitätskomponente, die unverändert bleiben muss"],
            ["Ausserhalb des Systems", "Der Supportablauf rund um Streitfälle, den das Projekt neu gestalten darf", "Die Preisgestaltung der Zahlungsorganisation"]
          ], marks: { "0,2": "warn", "1,1": "warn" }, note: "Die zwei gelben Felder sind die Prüfungsfälle. Eigenes Beispiel, abgeleitet aus der Fallstudie." } },
          reveal("Kann etwas gleichzeitig im System und ausserhalb des Scopes liegen?",
            "Ja, und das ist das Standardbeispiel. Eine Komponente, die laut Vorgabe unverändert wiederverwendet werden muss, liegt innerhalb der Systemgrenze und ausserhalb der Gestaltungsfreiheit.",
            "Folge für die Anforderungen: Du kannst ihr Verhalten nicht fordern, du musst es als Randbedingung dokumentieren und deine Anforderungen daran anpassen.")),

        C("cp-boundaries", "Relevanz, Zugehörigkeit und Befugnis trennen", H("2.2.4"), [
          single("payment", "Ein externer Zahlungsdienst bestimmt die Formate der Zahlungsbestätigungen. Wohin gehört er?", ["In die Anwendung, weil er wichtig ist", "In den relevanten Kontext ausserhalb der Anwendung", "In die irrelevante Umgebung, weil er extern ist", "In keine der drei Zonen, weil er von Dritten betrieben wird"], 1, "Er beeinflusst Anforderungen (relevant), wird aber nicht von euch gebaut (aussen). Relevanz und Zugehörigkeit sind zwei Fragen."),
          multi("scope", "Welche ZWEI Aussagen können zutreffen?", ["Eine fest vorgegebene, wiederverwendete Komponente liegt im System, aber ausserhalb des Scopes", "Ein neu gestalteter externer Arbeitsablauf liegt ausserhalb des Systems, aber im Scope", "Jedes externe Element ist irrelevant", "Systemgrenze und Scope sind definitionsgemäss identisch"], [0,1], "Die Systemgrenze beschreibt Zugehörigkeit, der Scope die Gestaltungsfreiheit. Beide Abweichungen sind möglich."),
          typed("boundaryname", "Wie heisst die Grenze, die relevante von irrelevanter Umgebung trennt?", ["Kontextgrenze", "Context boundary", "Kontextgrenze (context boundary)"], "Die Systemgrenze trennt System von Kontext, die Kontextgrenze trennt relevant von irrelevant.", "ein Begriff"),
          single("context", "Im Interview tauchte eine bisher unbekannte externe Regel zur Annahme von Geboten auf. Was muss jetzt überprüft werden?", ["Ob die Regel und ihre Quelle in den relevanten Kontext gehören", "Nur die Farbpalette der Oberfläche", "Nur die Rollenbezeichnungen im Team", "Gar nichts, der Kontext wird einmal festgelegt"], 0, "Die Kontextgrenze ist revidierbar. Neue Erkenntnisse können sie verschieben und neue Anforderungen erzeugen.")
        ]),

        S("Was ein Kontextmodell ist und was es nicht ist", `${W(2, "13")}; ${W(3, "9–10")}; ${H("3.4.2")}`,
          "Ein Kontextmodell stellt das System in die Mitte und zeigt rundherum, mit wem und was es interagiert. Die Folien formulieren das sehr präzise, und genau diese Formulierung ist prüfungstauglich.",
          note("def", "Wörtlich aus der Vorlesung", [
            "«A context model is not a graphical representation of the requirements, but it is used to reveal sources of the requirements.»",
            "«There is no standard notation, but UML can be used.»",
            "«The functional and design aspects of user interfaces are specified at a later step during the RE.»"
          ]),
          "Auf Deutsch: Das Kontextmodell ist ein **Suchwerkzeug**, kein Anforderungsdokument. Es zeigt dir, wo Anforderungen herkommen können. Es behauptet nicht, die Anforderungen schon zu enthalten.",
          note("warn", "Daraus folgen drei typische Fehlschlüsse", [
            "Falsch: «Das Kontextdiagramm ist fertig, also sind die Anforderungen vollständig.» Es ist eine Landkarte der Quellen, keine Liste der Anforderungen.",
            "Falsch: «Die Oberfläche muss schon im Kontextmodell entworfen sein.» Oberflächendetails kommen später.",
            "Falsch: «Es gibt eine vorgeschriebene Notation.» Es gibt keine; die Vorlesung lässt mehrere zu."
          ])),

        S("Drei Notationen, ein System, verschiedene Blickwinkel", `${W(3, "11–12")}; Activities week 4 Tasks.pdf, S. 2`,
          "Im Kurs modellieren verschiedene Untergruppen denselben Kontext in verschiedenen Notationen. Das ist Absicht, nicht Doppelarbeit.",
          tnote(["Notation", "Zeigt besonders gut", "Blickwinkel"], [
            ["Datenflussdiagramm, Ebene 0", "Welche Informationen über welche Schnittstelle fliessen", "Information und Schnittstellen"],
            ["UML-Use-Case-Diagramm", "Welche Akteure welche Systemfunktionen nutzen", "Ziele und Funktionen"],
            ["Angepasstes Kasten-Linien-Diagramm", "Struktur und Nachbarsysteme, frei beschriftbar", "Übersicht für Stakeholder"],
            ["Klassendiagramm auf Systemebene", "Fachliche Begriffe und ihre Beziehungen", "Begriffe und Daten"]
          ], "Die Aufgabenblätter der Wochen 3 und 4 nennen ausdrücklich Datenflussdiagramm, UML-Use-Case und Klassendiagramm auf Ebene 0 als zulässige Darstellungen."),
          "Wichtig ist der Satz aus den Folien: «All these models describe the context from different view-points, they do not intend to represent the complete domain.» Kein einzelnes Modell ist «der Kontext». Jedes ist eine Sicht mit einem Zweck.",
          note("tip", "Prüfungsreflex", "Wenn zwei Diagramme sich zu widersprechen scheinen, prüfe zuerst: Modellieren sie dasselbe System auf derselben Ebene und mit demselben Blickwinkel? Oft ist der Widerspruch nur ein Perspektivwechsel.")),

        S("Ein echtes Kontextmodell lesen: Kernsystem Auktionsplattform", LE("System und Systemkontext abgrenzen"),
          "Die Musterlösung zur Fallstudie zeichnet das Kernsystem mit genau fünf externen Partnern. Lerne diese Liste, sie ist die Referenz für dein eigenes Projekt.",
          tnote(["Externes Element", "Fliesst zum System", "Fliesst zurück", "Aufgedeckte Frage"], [
            ["Verkäufer (Seller)", "auction data", "dashboard, notification", "Wann gilt eine Auktion als eröffnet?"],
            ["Käufer (Buyer)", "bid", "dashboard, notification", "Was gilt als rechtzeitig eingegangenes Gebot?"],
            ["Administrator", "lock, unlock user", "user data", "Welche Belege braucht eine Sperrung?"],
            ["Zahlungsorganisation", "validation info", "payment info", "Was passiert bei Ausfall oder Ablehnung?"],
            ["Externes System (API Caller)", "service call", "Antwort auf den Aufruf", "Wer darf maschinell Auktionen hochladen?"]
          ], "Flussbeschriftungen aus der Musterlösung, Fragen selbst ergänzt."),
          "Beachte, was hier **nicht** steht: keine Buchhaltung, keine Lagerverwaltung, kein Versand, kein separates Authentifizierungssystem. Die Musterlösung begründet das ausdrücklich: Für das Kernsystem lässt man diese Umsysteme weg und sieht in der Architektur nur Variationspunkte vor.",
          note("tip", "Woran du einen guten Fluss erkennst", "Eine beschriftete Linie wie «bid» oder «validation info» sagt etwas. Eine unbeschriftete Linie zwischen zwei Kästchen sagt nichts und deckt keine Anforderung auf.")),

        S("Kernsystem und erweitertes System: dieselbe Software, zwei Grenzen", `${LE("System und Systemkontext abgrenzen")}; Activities week 4 Tasks.pdf, Aufgaben 3–4`,
          "Für dasselbe Produkt zeichnet die Musterlösung zwei Kontextdiagramme. Nicht weil eines falsch ist, sondern weil zwei Fragen beantwortet werden.",
          compare(
            "Kernsystem (Produktsicht)", [
              "Was muss die Plattform als verkaufbares Produkt können?",
              "Externe Partner: Verkäufer, Käufer, Administrator, Zahlungsorganisation, externes System.",
              "Benutzerverwaltung und Authentifizierung sind Lösungsbestandteil, also innen.",
              "Umsysteme des Kunden sind nur Variationspunkte in der Architektur."
            ],
            "Erweitertes System (Kundensicht)", [
              "Was muss beim Grosshändler konkret funktionieren?",
              "Zusätzlich: Authentifizierungs- und Autorisationssystem, Lagerverwaltung, Buchhaltung, Versand bzw. Disposition.",
              "Diese Systeme sind jetzt echte externe Schnittstellen mit eigenen Formaten.",
              "Die Anforderungen werden kundenspezifisch."
            ],
            "Die Grenze muss vereinbart werden, bevor Anforderungen zugeordnet werden. Sonst verspricht das Team ein Ergebnis, das von Systemen abhängt, die es weder baut noch kontrolliert."),
          reveal("Was ändert sich konkret, wenn du vom Kern- zum erweiterten System wechselst?",
            "Erstens die Zahl der Schnittstellen und damit der Integrationsaufwand. Zweitens die Zuordnung im Anforderungsdokument: In der Musterlösung zur Feature-Dokumentation steht in der Spalte «Scope» entweder «Kern-System» oder «Kundenspezifisch».",
            "Drittens die Verantwortung: Wenn der Versand über ein Fremdsystem läuft, kann das Projekt Lieferzeiten nicht garantieren, sondern nur Annahmen über das Fremdsystem festhalten.")),

        C("cp-contextmodel", "Ein Kontextmodell kritisch lesen", `${H("2.2.4, 3.4.2")}; ${W(2, "13")}; ${LE("System und Systemkontext abgrenzen")}`, [
          single("model", "Welches Detail gehört am direktesten in ein Kontextmodell?", ["Private Hilfsmethoden einer Klasse", "Die Schnittstelle zur Zahlungsautorisierung und die Daten, die darüber fliessen", "Der genaue Eckenradius eines Buttons", "Die Sprintplanung des Teams"], 1, "Externe Interaktionen und ihre Inhalte verorten das System in seiner Umgebung."),
          multi("purpose", "Wofür ist ein Kontextmodell laut Vorlesung gedacht? Wähle ZWEI.", ["Um Quellen von Anforderungen aufzudecken", "Um die strukturelle Einbettung des Systems in seine Umgebung zu zeigen", "Um die Anforderungen selbst grafisch darzustellen", "Um das Bedienkonzept der Oberfläche festzulegen"], [0,1], "Die Folien sagen ausdrücklich, dass das Kontextmodell keine grafische Darstellung der Anforderungen ist, sondern deren Quellen aufdeckt. Oberflächenentwurf kommt später."),
          multi("coreonly", "Das Kernsystem der Auktionsplattform wird modelliert. Welche ZWEI Elemente lässt die Musterlösung bewusst weg?", ["Buchhaltungssystem", "Lagerverwaltungssystem", "Käufer", "Zahlungsorganisation"], [0,1], "Buchhaltung, Lagerverwaltung, Versand und ein separates Authentifizierungssystem braucht erst das erweiterte System beim Kunden."),
          single("perspective", "Zwei Diagramme platzieren das Supportteam auf verschiedenen Seiten der Grenze. Was prüfst du zuerst?", ["Ob beide dasselbe System auf derselben Ebene und mit demselben Blickwinkel modellieren", "Welches Diagramm mehr Kästchen hat", "Welches Diagramm neuer ist", "Welche Notation moderner aussieht"], 0, "Eine Produktsicht und eine Kundensicht dürfen bewusst unterschiedliche Grenzen haben. Erst wenn die Ebene gleich ist, ist es ein echter Widerspruch.")
        ]),

        S("Domänenannahmen: die unsichtbare Brücke zur Realität", H("2.2.4"),
          "Das System kennt nur Eingaben, Ausgaben und Schnittstellen. Die Ziele der Stakeholder beziehen sich aber auf die echte Welt. Eine **Domänenannahme** ist die Brücke dazwischen.",
          "Beispiel aus dem Auktionsprojekt: Das Ziel des Käufers ist «Ich weiss, wo meine Ware ist». Das System kann nur Lieferereignisse anzeigen, die es vom Versandsystem bekommt. Die Annahme lautet: Das Versandsystem liefert korrekte und zeitnahe Ereignisse.",
          formula("Stakeholder-Ziel  =  Systemverhalten  +  Domänenannahme",
            [["Systemverhalten", "Das, was du spezifizieren und testen kannst"],
             ["Domänenannahme", "Das, was ausserhalb liegen und trotzdem gelten muss"],
             ["Ziel", "Die Wirkung in der Realität, die beide zusammen erzeugen"]],
            "Eigene Darstellung des Zusammenhangs. Wenn die Annahme falsch ist, ist das Ziel verfehlt, obwohl die Software korrekt arbeitet."),
          note("tip", "Vier Schritte im Umgang mit einer Annahme", [
            "Festhalten: die Annahme ausdrücklich aufschreiben, nicht nur mitdenken.",
            "Quelle und Verantwortliche bestimmen: wer kann sie bestätigen?",
            "Plausibilität validieren: stimmt sie überhaupt?",
            "Fehlerfall entscheiden: was macht das System, wenn sie nicht gilt?"
          ]),
          reveal("Warum ist «Wir haben es dokumentiert» keine Lösung?",
            "Weil Aufschreiben eine Annahme nicht wahr macht. Eine dokumentierte, aber falsche Annahme erzeugt ein System, das korrekt tut, was niemand brauchen kann.",
            "Deshalb gehört zu jeder Annahme ein geplanter Umgang mit ihrem Versagen, zum Beispiel ein Fallback oder eine Warnung an den Benutzer.")),

        S("Arbeitsprodukt: das Wort für «festgehaltenes Ergebnis»", `${W(2, "10–12")}; ${W(3, "3–4")}; ${H("3.1.1")}`,
          "Ein Arbeitsprodukt (work product) ist ein **festgehaltenes** Zwischen- oder Endergebnis eines Arbeitsprozesses. «Artifact» ist laut Vorlesung ein Synonym.",
          note("def", "Drei Aussagen der Folien, die du wissen musst", [
            "Ein RE-Arbeitsprodukt kann alles sein, was Anforderungen ausdrückt: von einem einzigen Satz oder Diagramm bis zu einer Spezifikation von hunderten Seiten.",
            "Ein Arbeitsprodukt kann andere Arbeitsprodukte enthalten.",
            "Nicht festgehalten heisst: kein Arbeitsprodukt. Ein Gedanke im Kopf zählt nicht."
          ]),
          tnote(["Facette", "Planungsfrage", "Beispiel aus Woche 2"], [
            ["Zweck (purpose)", "Wer braucht das, für welche Entscheidung?", "Interviewprotokoll, damit offene Punkte nicht verloren gehen"],
            ["Umfang (size)", "Eine Anforderung oder eine ganze Sammlung?", "Ein Kontextdiagramm je Blickwinkel"],
            ["Darstellung (representation)", "Text, Vorlage, Modell oder Prototyp?", "Datenflussdiagramm statt Prosatext"],
            ["Lebensdauer (lifespan)", "Temporär, sich entwickelnd oder dauerhaft?", "Miro-Skizze temporär, Projektbericht dauerhaft"],
            ["Ablage (storage)", "Wo finden die Beteiligten die aktuelle Version?", "Teams-Kanal und Anhang des RE-Berichts"]
          ], "Facetten aus der Vorlesung, Beispiele aus dem Wochenauftrag."),
          "Die fünf Facetten sind auswendig zu wissen. Sie kommen in Woche 3 vertieft wieder und sind in der Prüfung eine klassische Aufzählungsfrage."),

        S("Ein exploratives Interview vorbereiten: der Ablauf aus dem Wochenauftrag", W(2, "8"),
          "Das Aufgabenblatt von Woche 2 gibt eine konkrete Reihenfolge vor. Sie ist nicht beliebig, jeder Schritt reduziert eine bestimmte Unsicherheit.",
          flow("Team und Leitung festlegen", "Projektantrag lesen und analysieren", "Untergruppen bilden (z. B. Backend, Frontend, funktionale und nichtfunktionale Anforderungen)", "Wissenslücken bestimmen", "Fragen aus allen Untergruppen sammeln und gemeinsam abstimmen", "Rollen verteilen: Leitung, Protokoll je Untergruppe, Beobachtung", "Interview führen und nachfragen", "Ergebnisse bestätigen und in den Anhang des Berichts übernehmen"),
          "Zwei Details, die oft übersehen werden:",
          { list: [
            "**Untergruppen zuerst, Fragen danach.** Sonst stellt nur die Frontend-Fraktion Fragen und Betriebs- oder Datenthemen fallen durch.",
            "**Eine Person beobachtet** und zählt, wie viele offene und geschlossene Fragen gestellt wurden und welche Techniken verwendet wurden. Sie gibt dem Team danach Rückmeldung."
          ] },
          "Das ist eine Vorbereitungsreihenfolge für ein einzelnes Interview. RE als Ganzes bleibt iterativ: Das Ergebnis verändert den Kontext, und der neue Kontext erzeugt neue Fragen."),

        S("Offene und geschlossene Fragen richtig mischen", `${W(2, "5–8")}; ${H("4.2.2")}`,
          "Keine Fragenart ist besser. Sie haben verschiedene Jobs.",
          compare(
            "Offen: erkunden", [
              "«Erzählen Sie mir, wie Sie das letzte Mal ein Gebot abgegeben haben.»",
              "«An welcher Stelle wurden Sie unsicher?»",
              "Liefert Kontext, Routinen, unerwartete Themen.",
              "Richtig am Anfang und bei unbekanntem Gebiet."
            ],
            "Geschlossen: präzisieren", [
              "«War die Bestätigung sichtbar, bevor Sie die Seite verlassen haben?»",
              "«Gilt diese Regel auch, wenn die Verbindung abbricht?»",
              "Liefert Bestätigung, Grenzwerte, Entscheidungen.",
              "Richtig, wenn du eine Hypothese prüfen willst."
            ],
            "Erst öffnen, dann zuspitzen. Wer mit geschlossenen Fragen beginnt, bestätigt nur die eigenen Annahmen."),
          note("tip", "Die drei Praxistipps aus der Vorlesung", [
            "**Auswahlfragen führen zu unerwartetem Verhalten:** «Bevorzugen Sie A oder B?» wird gern mit «Ja» beantwortet. Frage einzeln.",
            "**Aussagen wiederholen funktioniert gut:** Es zeigt, dass du verstanden hast, deckt Missverständnisse auf und ermuntert zum Weiterreden.",
            "**Drei Sekunden warten:** Blickkontakt halten und nach dem gefühlten Ende drei Sekunden schweigen. Das gibt allen Zeit, zu verarbeiten, zu ergänzen oder nachzufragen."
          ])),

        C("cp-interview", "Vorbereiten, fragen, nachbereiten", W(2, "3–8"), [
          order("sequence", "Bringe den Ablauf aus dem Wochenauftrag in die richtige Reihenfolge.", ["Projektantrag lesen und Untergruppen bilden", "Wissenslücken bestimmen", "Fragen aller Untergruppen sammeln und abstimmen", "Rollen für Leitung, Protokoll und Beobachtung verteilen", "Interview führen und präzisieren", "Ergebnisse bestätigen und dokumentieren"], "Die Vorbereitung zielt auf die Unsicherheit, die Nachbereitung macht aus dem Gespräch brauchbare Belege."),
          single("open", "Welche Frage erkundet die heutige Arbeit, ohne eine Antwort vorzugeben?", ["«Sie mögen unsere schnelle Oberfläche, oder?»", "«Ist Variante A oder Variante B offensichtlich besser?»", "«Bitte beschreiben Sie, wie Sie heute den Status eines Gebots prüfen.»", "«Finden Sie nicht auch, dass der alte Prozess zu langsam war?»"], 2, "Die Frage lädt zur Beschreibung ein und bewertet nichts im Voraus. Die Auswahlfrage in Option 2 provoziert laut Vorlesung ein unbrauchbares «Ja»."),
          multi("record", "Welche ZWEI Ergebnisse braucht ihr nach dem Interview?", ["Ein Protokoll der Fragen und Antworten für den Anhang des Berichts", "Eine ausdrückliche Liste offener Punkte und Folgeaufgaben", "Nur eine Liste bevorzugter Technologien", "Die Feststellung, dass die Anforderungen jetzt vollständig sind"], [0,1], "Belege und verbleibende Lücken sind beide Arbeitsergebnisse. Vollständigkeit kann ein einzelnes Interview nicht herstellen."),
          typed("waittime", "Wie viele Sekunden empfiehlt die Vorlesung zu warten, wenn die andere Person scheinbar fertig geredet hat?", ["3", "drei", "3 Sekunden", "drei Sekunden"], "Drei Sekunden Blickkontakt und Schweigen geben Zeit zum Verarbeiten und Ergänzen.", "Zahl")
        ]),

        S("Soziale Erwünschtheit: wenn Höflichkeit die Daten verdirbt", W(2, "5"),
          "Menschen schwächen Kritik ab, um ihr Gegenüber nicht zu enttäuschen. Die Vorlesung zeigt das an zwei Formulierungen derselben Frage.",
          compare(
            "Fall 1: verzerrend", [
              "«Wir haben viel Aufwand in eine Oberfläche gesteckt, mit der man schnell und einfach übersetzen kann. Wie gut sind Sie damit zurechtgekommen?»",
              "Gedanke der Testperson: «Wenn ich sage, dass ich langsamer war, bist du enttäuscht.»",
              "Antwort: «Noch nicht ganz perfekt, aber nächstes Mal sicher besser.»"
            ],
            "Fall 2: neutral", [
              "«Das Produkt soll eine Oberfläche zum Übersetzen von Umfragen bieten. Wie gut sind Sie damit zurechtgekommen?»",
              "Kein Lob, kein Aufwand, keine Erwartung im Frageteil.",
              "Antwort: «Nicht ideal. Ich glaube, ich war sogar langsamer.»"
            ],
            "Dieselbe Person, dieselbe Software, brauchbare Antwort nur im zweiten Fall. Die Verzerrung steckt in der Einleitung, nicht in der Frage."),
          reveal("Formuliere um: «Unser verbessertes Design macht das Bieten einfach. Wie viel besser ist es?»",
            "Besser: «Bitte beschreiben Sie, wie Sie dieses Gebot abgegeben haben. Was hat geholfen, und wo gab es Schwierigkeiten?»",
            "Drei Regeln dahinter: keine Verbesserung behaupten, bevor du Belege hast; nicht nach dem Grad einer Wertung fragen, sondern nach dem Verlauf; Schwierigkeiten ausdrücklich erlauben.")),

        S("Erwartungseffekt: dieselbe Aussage, drei Deutungen", W(2, "6–7"),
          "Nach der Antwort «Ich war sogar langsamer» notieren drei Beobachtende laut Vorlesung Folgendes:",
          tnote(["Beobachtende Person", "Notiz", "Was die Notiz verrät"], [
            ["Person 1", "«Interface ist ablenkend»", "Deutet die Aussage im eigenen Fachgebiet Oberfläche"],
            ["Person 2", "«Backend-Prozesse sind ineffizient»", "Deutet dieselbe Aussage im eigenen Fachgebiet Backend"],
            ["Person 3", "keine Notiz", "Hielt es für ein Problem der Testperson, nicht des Produkts"]
          ], "Fallbeispiel der Vorlesung, Spalte 3 selbst ergänzt."),
          "Keine der drei Notizen ist ein Beleg. Die Aussage war «Ich war langsamer». Alles andere ist Hypothese, geprägt von der Rolle der beobachtenden Person.",
          compare(
            "Beleg (so protokollieren)", [
              "Die Person brauchte 50 Sekunden.",
              "Sie öffnete den Hilfetext zweimal.",
              "Sie sagte: «Ich war sogar langsamer.»"
            ],
            "Deutung (getrennt markieren)", [
              "Die Beschriftung ist vielleicht unklar.",
              "Durch Nachfragen und weitere Beobachtungen prüfen.",
              "Mehrere Deutungen nebeneinander stehen lassen."
            ],
            "Protokolliere beobachtbare Ereignisse und Zitate getrennt von Erklärungen. Genau deshalb hat der Wochenauftrag eine eigene Beobachterrolle."),
          note("warn", "Besonders tückisch", "Person 3 notiert gar nichts. Eine fehlende Notiz sieht neutral aus, ist aber auch eine Deutung: «nicht relevant».")),

        C("cp-bias", "Beleg und Deutung unterscheiden", W(2, "5–8"), [
          single("polite", "Eine Person lobt ein Design, nachdem ihr erzählt wurde, wie viel Arbeit darin steckt. Welche Verzerrung ist am plausibelsten?", ["Soziale Erwünschtheit", "Erwartungseffekt bei der Testperson", "Nachgewiesene Abwesenheit von Verzerrung", "Beweis für technische Korrektheit"], 0, "Die Einleitung erzeugt Rücksicht und begünstigt eine sozial gefällige Antwort."),
          multi("evidence", "Welche ZWEI Massnahmen schützen gegen den Erwartungseffekt?", ["Beobachtbare Ereignisse und Zitate getrennt von Erklärungen festhalten", "Die Person bitten, selbst zu klären, was passiert ist", "Nur Belege behalten, die die erste Theorie stützen", "Jedes Zögern als Widerstand gegen Veränderung deuten"], [0,1], "Trennen und nachfragen. Die beiden falschen Optionen sind genau die Mechanik der Verzerrung."),
          single("nonote", "Eine beobachtende Person notiert zu einer kritischen Aussage gar nichts. Wie bewertest du das?", ["Das ist eine neutrale, saubere Dokumentation", "Das ist auch eine Deutung, nämlich «nicht relevant»", "Das beweist, dass die Aussage falsch war", "Das ist bedeutungslos, weil nur Zahlen zählen"], 1, "Auslassen ist eine Entscheidung über Relevanz, also eine Interpretation. Im Fallbeispiel hielt Person 3 das Problem für eines der Testperson."),
          single("silence", "Welche Wirkung hat eine kurze Pause des Interviewers?", ["Sie garantiert Zustimmung", "Sie gibt Zeit zum Nachdenken und für zusätzliche Details", "Sie ersetzt alle Nachfragen", "Sie beweist, dass die Antwort vollständig war"], 1, "Warten und Zusammenfassen fördern vollständigere Antworten, garantieren aber keine Vollständigkeit.")
        ]),

        S("Transfer 1: der Stakeholder, an den niemand gedacht hat", `${W(2, "8, 13")}; ${H("2.2.2–2.2.4")}`,
          "Ein Team hat Käufer und Verkäufer interviewt. Das Kontextmodell zeigt Zahlung und Lieferung. Niemand hat über strittige oder fehlgeschlagene Zahlungen gesprochen.",
          reveal("Was tust du als Nächstes, und in welcher Reihenfolge?",
            "1. Quellen ergänzen: Support, Betrieb und einen Vertreter der Zahlungsorganisation als Anforderungsquellen aufnehmen.",
            "2. Kontext nachführen: die fehlenden Interaktionen eintragen, Unbekanntes ausdrücklich als offen markieren.",
            "3. Gezielt fragen: nach konkreten Fehlerfällen fragen, nicht nach Wünschen. «Erzählen Sie vom letzten Fall, in dem eine Zahlung scheiterte.»",
            "4. Grenze prüfen: wenn unklar ist, wer einen Streitfall entscheidet, ist die Systemgrenze noch nicht vereinbart.",
            "Wichtig ist, was du nicht tust: keine Regel für verspätete Zahlungen erfinden und als genehmigt darstellen.")),

        S("Transfer 2: das Subsystem, das du nicht anfassen darfst", `${H("2.2.4")}; ${LE("System und Systemkontext abgrenzen")}`,
          "Die Plattform enthält eine bestehende Identitätskomponente, die unverändert bleiben muss. Gleichzeitig darf das Projekt den Ablauf neu gestalten, mit dem der Betreiber Konten wiederherstellt.",
          reveal("Ordne beide Elemente in Systemgrenze, Scope und Kontext ein.",
            "Identitätskomponente: **innerhalb** der Systemgrenze (sie ist Teil der Software), **ausserhalb** des Scopes (sie darf nicht verändert werden). Ihre Eigenschaften werden deshalb als Randbedingung dokumentiert, nicht als Anforderung gefordert.",
            "Wiederherstellungsablauf des Betreibers: **ausserhalb** der Systemgrenze (ein organisatorischer Ablauf, keine Software), **innerhalb** des Scopes (das Projekt darf ihn gestalten).",
            "Beide Einordnungen sind für die Spezifikation entscheidend: Die eine begrenzt, was du fordern darfst, die andere erweitert, was du gestalten musst.")),

        C("cp-w2final", "Vom Kontext zum RE-Plan", `${H("2.2.4, 3.1.1")}; ${W(2, "8–14")}`, [
          single("artifact", "Was ist ein Arbeitsprodukt?", ["Eine nicht festgehaltene Annahme im Kopf", "Der Vorgang des Nachdenkens über Anforderungen", "Ein gespeichertes Kontextdiagramm", "Ausschliesslich eine freigegebene Spezifikation"], 2, "Ein Arbeitsprodukt ist ein festgehaltenes Zwischen- oder Endergebnis, von einem Satz bis zur Spezifikation."),
          multi("next", "Das Kontextmodell deckt einen unklaren Zahlungs-Timeout auf. Wähle ZWEI passende nächste Schritte.", ["Eine Quelle bestimmen, die den Timeout verbindlich klären kann", "Das vereinbarte Verhalten festhalten und validieren", "Einen plausibel klingenden Wert annehmen und als offizielle Regel dokumentieren", "Die Schnittstelle aus dem Modell entfernen, weil sie Probleme macht"], [0,1], "Modelle decken Lücken auf. Geschlossen werden sie mit Belegen aus Quellen, nicht mit eigenen Zahlen."),
          typed("scopeword", "Welches eine Wort beschreibt, was der Scope im Unterschied zur Systemgrenze ausdrückt?", ["Gestaltungsfreiheit", "Gestaltungsspielraum", "Befugnis", "Entscheidungsbefugnis"], "Der Scope sagt, was das Projekt gestalten darf. Die Systemgrenze sagt, was zum System gehört.", "ein Wort"),
          single("scopeagain", "Welche Frage bestimmt den Scope am direktesten?", ["Was darf dieses Projekt gestalten oder entwerfen?", "Was existiert irgendwo auf der Welt?", "Was steht in irgendeinem Kästchen eines Diagramms?", "Welche Technologie ist am modernsten?"], 0, "Beim Scope geht es um Befugnis, nicht um die Lage in einer Zeichnung.")
        ]),

        S("Selbstcheck Woche 2", `${W(2, "3–14")}; ${H("2.2.4, 3.1.1")}`,
          check([
            "Ich kann System, Systemkontext, irrelevante Umgebung und Scope in eigenen Worten unterscheiden.",
            "Ich kann für ein Element entscheiden, ob es innen, im relevanten Kontext oder irrelevant ist, und das begründen.",
            "Ich kann einen Fall nennen, in dem der Scope von der Systemgrenze abweicht, und die Folge für die Dokumentation erklären.",
            "Ich kann sagen, wozu ein Kontextmodell dient und wozu nicht.",
            "Ich kann Kernsystem und erweitertes System der Auktionsplattform gegenüberstellen.",
            "Ich kann eine Domänenannahme formulieren und sagen, was bei ihrem Versagen passiert.",
            "Ich kann die fünf Facetten eines Arbeitsprodukts aufzählen.",
            "Ich kann ein Interview vorbereiten und offene von geschlossenen Fragen unterscheiden.",
            "Ich erkenne soziale Erwünschtheit und Erwartungseffekt an einem Beispiel und weiss, was dagegen hilft."
          ]),
          "Als Nächstes in Woche 3: Wie du das Ergebnis so dokumentierst, dass es auch in sechs Monaten noch brauchbar ist, und was ein Modell zeigen kann und was nicht.")
      ] },
      { id: "w3", number: 3, title: "Arbeitsprodukte, Dokumentation und Modellverständnis", status: "ready", items: [
        S("Dokumentieren heisst: für die nächste Person schreiben", `${W(3, "2–8")}; ${H("3.1")}`,
          "In Woche 2 hast du herausgefunden, was gebraucht wird. Diese Woche geht es darum, es so festzuhalten, dass eine andere Person damit arbeiten kann, ohne dich zu fragen.",
          "Das klingt banal, ist aber die am häufigsten geprüfte Lerneinheit des ganzen Zertifikats. LE3 «Arbeitsprodukte und Dokumentation» hat mit sieben Stunden die höchste empfohlene Unterrichtszeit von allen sieben Lerneinheiten.",
          note("exam", "Was die Vorlesung zeigt und was die Prüfung verlangt", [
            "Die Folien von Woche 3 behandeln: Arbeitsprodukt und seine Facetten, Lebensdauer, Faktoren für den Detaillierungsgrad, Kontextmodellierung und Stakeholder-Identifikation.",
            "Das zugeordnete Kapitel 3 enthält zusätzlich: natürliche Sprache, Satzschablonen, User Stories, Use Cases, Modelle (Klassen, Use Case, Aktivität, Zustand), Glossar, Dokumentstruktur und Qualitätskriterien.",
            "Diese Woche deckt beides ab. Der Modellteil ist bewusst ausführlich, weil die Prüfung Diagramme lesen lässt."
          ]),
          "Leitfrage für alles, was folgt: **Wer liest das, und welche Entscheidung trifft diese Person damit?** Eine Testerin braucht prüfbare Kriterien, ein Kunde verständliches Verhalten, wer wartet, braucht nachvollziehbare Begründungen."),

        S("Die drei Lebensdauern, mit dem Detail, das geprüft wird", `${W(3, "5")}; ${H("3.1.1")}`,
          "Die Vorlesung nennt drei Kategorien. Entscheidend ist nicht nur der Name, sondern was jeweils mit **Metadaten** und **Änderungskontrolle** passiert.",
          tnote(["Lebensdauer", "Beispiel", "Metadaten", "Änderungskontrolle"], [
            ["Temporär (temporary)", "Skizze, die während einer Diskussion entsteht", "Keine werden geführt", "Keine; nach Gebrauch verworfen"],
            ["Sich entwickelnd (evolving)", "Sammlung von User Stories über mehrere Iterationen", "Metadaten nötig", "Für wichtige Arbeitsprodukte nötig"],
            ["Dauerhaft (durable)", "Freigegebene RE-Spezifikation oder Sprint-Backlog", "Vollständiger Satz an Metadaten", "Zwingend"]
          ], "Angaben direkt aus den Folien von Woche 3."),
          note("warn", "Zwei Fallen", [
            "«Dauerhaft» heisst nicht «unveränderlich für immer». Es heisst freigegeben beziehungsweise als Baseline festgelegt und kontrolliert verwaltet.",
            "Die Kategorie kann wechseln: Die Folien sagen ausdrücklich, dass ein temporäres Arbeitsprodukt zu einem sich entwickelnden werden kann, wenn das Team entscheidet, es weiterzuentwickeln. Die Lebensdauer ist eine Entscheidung, keine Eigenschaft des Papiers."
          ]),
          reveal("Eine Workshop-Skizze auf dem Miro-Board wird ab jetzt jede Woche verfeinert. Was ändert sich?",
            "Sie wird vom temporären zum sich entwickelnden Arbeitsprodukt. Praktische Folge: Ab jetzt braucht sie Metadaten (wer ist verantwortlich, welcher Stand, welche Änderung wann) und eine Art Änderungssteuerung.",
            "Sie wird dadurch nicht automatisch zur freigegebenen Spezifikation und auch nicht zum Vertrag.")),

        S("Detaillierungsgrad: die sechs Faktoren der Vorlesung", `${W(3, "6–7")}; ${H("3.1.2–3.1.3")}`,
          "«Wie genau muss ich das aufschreiben?» ist laut Folien eine der schwierigsten Aufgaben im RE. Die Vorlesung gibt dafür sechs Faktoren. Lerne sie als Liste, das ist eine typische Aufzählungsfrage.",
          { list: [
            "**Problem- und Projektkontext:** Wie kritisch und wie neu ist das Ganze?",
            "**Grad des gemeinsamen Verständnisses des Problems:** Verstehen alle dasselbe, oder reden sie nur gleich?",
            "**Freiheitsgrad für Entwurf und Programmierung:** Wie viel darf das Entwicklungsteam selbst entscheiden?",
            "**Verfügbarkeit von schnellem Stakeholder-Feedback** während Entwurf und Umsetzung.",
            "**Kosten gegen Nutzen einer detaillierten Spezifikation:** Je höher der Nutzen einer Anforderung, desto mehr Detail kann man sich leisten.",
            "**Normen und Vorschriften.**"
          ] },
          compare(
            "Wenig Detail genügt, wenn ...", [
              "Team und Stakeholder sitzen zusammen und reden täglich.",
              "Feedback kommt innerhalb von Stunden.",
              "Die Domäne ist allen vertraut.",
              "Fehler sind billig korrigierbar."
            ],
            "Mehr Detail ist nötig, wenn ...", [
              "Ein verteilter Zulieferer ohne Domänenwissen umsetzt.",
              "Feedback dauert Wochen.",
              "Missverständnisse haben schwere Folgen.",
              "Normen oder Vorschriften verlangen Nachweise."
            ],
            "Der Detaillierungsgrad ist eine Antwort auf Unsicherheit und Risiko, nicht eine Stilfrage."),
          reveal("Ist die längste Spezifikation die sicherste?",
            "Nein. Sie kostet Erstellungs- und Pflegeaufwand, und sie versteckt Wichtiges in Nebensächlichem. Wer 200 Seiten liest, überliest den einen kritischen Satz.",
            "Der Faktor «Kosten gegen Nutzen» aus den Folien sagt genau das: Detail wird da investiert, wo der Nutzen der Anforderung hoch ist.")),

        S("Abstraktionsebene ist nicht Detaillierungsgrad", H("3.1.2"),
          "Zwei Begriffe, die in Prüfungsfragen gern gegeneinander ausgetauscht werden.",
          compare(
            "Abstraktionsebene (abstraction level)", [
              "Frage: **Welche Ebene von Anliegen** beschreibe ich?",
              "Ziel, Feature, funktionale Anforderung, Detail.",
              "Beispiel: «50 Prozent mehr Umsatz mit Lagerrestbeständen» ist ein Ziel."
            ],
            "Detaillierungsgrad (level of detail)", [
              "Frage: **Wie präzise** beschreibe ich es?",
              "Vage bis vollständig messbar.",
              "Beispiel: «50 Prozent mehr Umsatz» ist präzise und trotzdem auf Zielebene."
            ],
            "Ein präzises Ziel bleibt ein Ziel. Hohe Abstraktion und hohe Präzision sind gleichzeitig möglich."),
          note("tip", "Die vier Ebenen am Fallbeispiel", "Die Musterlösungen zur Auktionsplattform verwenden das Requirements Abstraction Model mit den Ebenen **Goal**, **Feature**, **Functional** und **Detail**. Beispiel: Z2 «50 Prozent mehr Umsatz» ist Goal, R01 «Waren versteigern oder zum Fixpreis anbieten» ist Feature, R02 «Kunde bei ausstehenden Zahlungen sperren» ist Functional, R15 «aktuellen Preis ohne Browser-Refresh anzeigen» ist Detail.")),

        C("cp-workproducts", "Das passende Arbeitsprodukt wählen", `${W(3, "3–7")}; ${H("3.1.1–3.1.3")}`, [
          single("baseline", "Eine freigegebene Anforderungsspezifikation wird unter Änderungskontrolle gepflegt. Welche Lebensdauer ist das?", ["Temporär", "Sich entwickelnd", "Dauerhaft", "Keine, weil sie noch geändert werden kann"], 2, "Freigegebene oder als Baseline festgelegte Arbeitsprodukte sind dauerhaft. Dauerhaft bedeutet kontrolliert verwaltet, nicht unveränderlich."),
          multi("detail", "Welche ZWEI Faktoren rechtfertigen laut Vorlesung mehr Detail?", ["Geringer Grad des gemeinsamen Problemverständnisses", "Fehlendes schnelles Stakeholder-Feedback während der Umsetzung", "Eine Regel, dass jedes Dokument gleich lang sein muss", "Die Anzahl Farben im Diagramm"], [0,1], "Beide stehen wörtlich in der Faktorenliste der Folien. Detail antwortet auf Unsicherheit."),
          typed("metadata", "Welche Lebensdauer führt laut Folien gar keine Metadaten?", ["temporär", "temporary", "temporäre Arbeitsprodukte", "Temporär (temporary)"], "Temporäre Arbeitsprodukte unterstützen die Verständigung und werden danach verworfen; Metadaten werden nicht geführt.", "Lebensdauer"),
          single("abstraction", "«Mit der Plattform sollen 80 Prozent der Lagerrestbestände innerhalb von zwei Wochen verkauft werden.» Wie ordnest du das ein?", ["Hohe Abstraktionsebene, hoher Detaillierungsgrad", "Niedrige Abstraktionsebene, niedriger Detaillierungsgrad", "Es ist eine Randbedingung", "Es ist ein Detail der Benutzeroberfläche"], 0, "Es ist ein Ziel (hohe Abstraktion) und gleichzeitig messbar formuliert (hoher Detaillierungsgrad). Beide Achsen sind unabhängig.")
        ]),

        S("Alle relevanten Aspekte abdecken", `${W(3, "8")}; ${H("3.1.4")}`,
          "Beim Dokumentieren vergisst man nicht einzelne Sätze, sondern ganze Arten von Anforderungen. Die folgende Liste ist eine Checkliste gegen blinde Flecken.",
          tnote(["Aspekt", "Frage an die Auktionsplattform", "Typisches Arbeitsprodukt"], [
            ["Struktur und Daten", "Welche Gebote gehören zu welcher Auktion?", "Domänenmodell"],
            ["Funktion und Ablauf", "Wie wird ein Gebot geprüft und angenommen?", "Use Case, Aktivitätsmodell"],
            ["Zustand und Verhalten", "Was passiert mit einem Gebot nach Auktionsschluss?", "Zustandsmodell"],
            ["Qualität", "Wie schnell muss die Bestätigung bei welcher Last kommen?", "Qualitätsanforderung mit Messgrösse"],
            ["Randbedingungen", "Welche Schnittstellen und Plattformen sind vorgeschrieben?", "Liste der Randbedingungen"],
            ["Kontext und Grenze", "Welche externen Dienste und Annahmen sind relevant?", "Kontextmodell"]
          ], "Aspekte aus den Folien, Fragen und Zuordnung selbst ergänzt."),
          note("warn", "Konsistenz über die Sichten hinweg", "Getrennte Sichten helfen beim Denken, erzeugen aber Widerspruchsrisiko. Wenn das Zustandsmodell ein Gebot im Zustand «closed» annimmt, der Text es aber ablehnt, ist die Sammlung inkonsistent, auch wenn jede Einzelaussage klar ist.")),

        S("Natürliche Sprache: der Standard und seine Tücken", H("3.2"),
          "Die meisten Anforderungen werden in natürlicher Sprache geschrieben. Die Folien sagen: Arbeitsprodukte im RE basieren meist auf natürlicher Sprache, Vorlagen und Modellen.",
          compare(
            "Stärken", [
              "Jeder kann es lesen, ohne Notation zu lernen.",
              "Sehr ausdrucksstark, auch für Ausnahmen und Begründungen.",
              "Schnell zu erstellen und zu ändern."
            ],
            "Schwächen", [
              "Mehrdeutigkeit fällt beim Lesen nicht auf.",
              "Auslassungen sind unsichtbar: was fehlt, fehlt eben.",
              "Verschiedene Leser verstehen verschiedene Dinge und merken es nicht."
            ],
            "Die Gegenmassnahme ist nicht, auf Modelle umzusteigen, sondern Sprache diszipliniert zu verwenden: kurze Sätze, einheitliche Begriffe, ausdrückliche Bedingungen."),
          tnote(["Sprachliche Falle", "Beispielsatz", "Welche Frage sie verdeckt"], [
            ["Passiv ohne Akteur", "«Die Daten werden geprüft.»", "Wer prüft? Das System, ein Mensch, ein Fremdsystem?"],
            ["Nominalisierung", "«Nach der Überprüfung ...»", "Was genau passiert bei dieser Überprüfung?"],
            ["Allaussage", "«Alle Gebote werden angenommen.»", "Welche Ausnahmen gibt es wirklich?"],
            ["Unvollständiger Vergleich", "«Die Suche soll schneller sein.»", "Schneller als was, unter welcher Last?"],
            ["Unbestimmtes Adjektiv", "«Die Bestätigung erscheint schnell.»", "Welcher Wert gilt als erfüllt?"],
            ["Unklarer Bezug", "«Er wird gesperrt, wenn er zahlt.»", "Wer ist «er» im zweiten Teil?"]
          ], "Eigene Zusammenstellung typischer Formulierungsfehler mit selbst gebildeten Beispielsätzen."),
          reveal("«Nach der Prüfung sollen die Daten schnell gesendet werden.» Was fehlt?",
            "Fünf offene Punkte: Wer prüft? Was wird geprüft? Welche Daten? An wen gesendet? Was löst das Senden aus? Dazu: was heisst «schnell» unter welchen Bedingungen?",
            "Wichtig für die Prüfung: Du **ergänzt diese Punkte nicht selbst**. Du klärst sie mit der Quelle. Eine erfundene Zahl ist schlimmer als eine offene Frage, weil sie das Problem unsichtbar macht.")),

        S("Satzschablone: das Werkzeug, das Lücken sichtbar macht", `${H("3.3")}; ${LE("Anforderungen natürlichsprachlich dokumentieren")}`,
          "Eine Satzschablone (phrase template) ist ein Satzbaukasten. Sie zwingt dich, vier Dinge zu benennen: **Bedingung**, **System**, **Verbindlichkeit** und **Reaktion**.",
          formula("<Bedingung>  +  das System  +  muss / soll / wird  +  <Reaktion>",
            [["Bedingung", "Wann gilt das? «Wenn ...», «Sobald ...», oder «immer»"],
             ["System", "Immer ausdrücklich nennen, damit kein Akteur verschwindet"],
             ["Verbindlichkeit", "muss = Pflicht, soll = erwünscht, wird = Absicht für später"],
             ["Reaktion", "Was genau tut das System? Mit messbarem Ergebnis"]],
            "Aufbau nach der CPRE-Satzschablone, Darstellung selbst erstellt."),
          "Die Musterlösung zum Fall Auktionsplattform unterscheidet drei Typen von Reaktionen. Dieses Raster ist sehr nützlich, weil es dir sagt, welche Formulierung du brauchst.",
          tnote(["Typ", "Bedeutung", "Beispiel aus der Musterlösung"], [
            ["Selbständige Systemaktivität", "Das System handelt von selbst", "«Wenn ein Verkäufer ausstehende Zahlungen hat, die den für ihn festgelegten Schwellwert überschreiten, muss das System ihn für das Versteigern von Waren sperren, solange bis bezahlt wurde.»"],
            ["Benutzerinteraktion", "Das System bietet dem Benutzer eine Möglichkeit", "«Das System muss dem Service-Mitarbeiter die Möglichkeit bieten, für einen Verkäufer einen Schwellwert für ausstehende Zahlungen festzulegen.»"],
            ["Schnittstellenanforderung", "Das System muss fähig sein, mit einem Fremdsystem zu interagieren", "«Das System muss fähig sein, Auktionsverkäufe von einem authentifizierten und autorisierten System zu empfangen und zur Versteigerung freizugeben.»"]
          ], "Wörtliche Beispiele aus der Musterlösung LE06, Kapitel 5."),
          note("tip", "Die Formulierung verrät den Typ", "«Das System muss ...» ist selbständige Aktivität. «Das System muss dem <Rolle> die Möglichkeit bieten, ...» ist Benutzerinteraktion. «Das System muss fähig sein, ...» ist Schnittstellenanforderung."),
          note("warn", "Vorlagen prüfen keine Wahrheit", "Eine grammatikalisch perfekte Schablonen-Anforderung kann das falsche Verhalten beschreiben. Die Musterlösung ergänzt bei R09 ausdrücklich: Die Technologie des API muss zusätzlich als Randbedingung vermerkt werden. Die Schablone hat das nicht erzwungen.")),

        S("Vom vagen Satz zur Schablone: ein echtes Beispiel", LE("Anforderungen natürlichsprachlich dokumentieren"),
          "So sieht derselbe Inhalt vor und nach der Präzisierung aus. Die linke Spalte ist die Feature-Formulierung, die rechte die detaillierte Fassung.",
          tnote(["ID", "Feature-Ebene (grob)", "Schablone (präzise)"], [
            ["R02", "«Ein Kunde soll für die Teilnahme an Auktionen gesperrt werden können, wenn er eine bestimmte Höhe von ausstehenden Zahlungen hat.»", "Bedingung, Rolle, Schwellwert und Dauer sind jetzt benannt: «... solange bis bezahlt wurde.»"],
            ["R03", "«Der Schwellwert für eine Sperrung muss individuell pro Kunde festgelegt werden können.»", "Jetzt steht da, **wer** es festlegt: der Service-Mitarbeiter."]
          ], "Gegenüberstellung aus den Musterlösungen LE04 und LE06."),
          reveal("Was genau hat die Schablone bei R02 verbessert?",
            "Drei Dinge. Erstens ist klar, dass das System selbst sperrt und nicht ein Mensch. Zweitens ist der Schwellwert als «für ihn festgelegter» Wert an R03 angebunden, also nicht global. Drittens steht jetzt eine Endbedingung da: die Sperre endet mit der Bezahlung.",
            "Die Grobfassung liess alle drei Punkte offen, klang aber vollständig. Genau das ist die Gefahr.")),

        S("User Story und Use Case: zwei verschiedene Jobs", `${H("3.3")}; HS26_ASE_UX und UCD.pdf, Folie 25`,
          compare(
            "User Story", [
              "Format: «Als <Rolle> möchte ich <Ziel>, damit <Nutzen>.»",
              "Zweck: ein Gespräch anstossen, Nutzen sichtbar machen.",
              "Wird präzise durch **Akzeptanzkriterien**, nicht durch mehr Prosa.",
              "Klein genug für eine Iteration."
            ],
            "Use Case", [
              "Beschreibt eine Systemfunktion aus Sicht eines Akteurs.",
              "Enthält Vorbedingungen, Hauptablauf, Alternativabläufe, Nachbedingungen.",
              "Zweck: funktionales Verhalten für die Entwicklung spezifizieren.",
              "Kann mehrere Stories abdecken."
            ],
            "Die UCD-Folien ordnen das genauso ein: Szenarien beschreiben die Anwendung im realen Kontext, Use Cases spezifizieren das funktionale Verhalten für die Entwicklung."),
          "Eigene Story: «Als gelegentlicher Bieter möchte ich mein Gebot vor dem Absenden überprüfen, damit ich Tippfehler bemerke.»",
          tnote(["Akzeptanzkriterium", "Prüfbar?"], [
            ["«Funktioniert gut.»", "Nein. Kein Kriterium, keine Bedingung"],
            ["«Vor dem Absenden wird eine Übersicht mit Betrag und Auktion gezeigt.»", "Ja"],
            ["«Bei Abbrechen wird kein Gebot gespeichert und der Benutzer bleibt auf der Auktionsseite.»", "Ja, inklusive Negativfall"]
          ], "Eigene Beispiele zur Illustration."),
          note("tip", "Prüfungsreflex", "Ein gutes Akzeptanzkriterium nennt eine beobachtbare Reaktion, einschliesslich dessen, was **nicht** passieren darf.")),

        C("cp-language", "Dokumentationsmängel finden", `${H("3.2–3.3")}; ${LE("Anforderungen natürlichsprachlich dokumentieren")}`, [
          single("quickly", "Was ist der entscheidende Mangel von «Das System antwortet schnell» für einen Abnahmetest?", ["Es nennt das System", "Antwortkriterium und Bedingungen fehlen, also kann niemand objektiv prüfen", "Es ist keine funktionale Anforderung", "Es verwendet das Wort «System»"], 1, "Ohne vereinbarten Wert und ohne Lastbedingung urteilen zwei Tester unterschiedlich. Dass es eine Qualitätsanforderung ist, ist kein Mangel."),
          multi("templates", "Welche ZWEI Aussagen über Vorlagen sind richtig?", ["Sie weisen auf fehlende Informationen hin, weil Platzhalter leer bleiben", "Sie unterstützen eine einheitliche Struktur über viele Anforderungen", "Sie garantieren, dass die Stakeholder zufrieden sind", "Sie machen ein Glossar überflüssig"], [0,1], "Vorlagen strukturieren und decken Lücken auf. Korrektheit und Einigung müssen trotzdem validiert werden."),
          single("templatetype", "«Das System muss dem Administrator die Möglichkeit bieten, ein Benutzerkonto zu sperren.» Welcher Schablonentyp ist das?", ["Selbständige Systemaktivität", "Benutzerinteraktion", "Schnittstellenanforderung", "Qualitätsanforderung"], 1, "«Dem <Rolle> die Möglichkeit bieten» ist das Kennzeichen der Benutzerinteraktion. Bei selbständiger Aktivität handelt das System ohne Benutzer."),
          order("writing", "Bringe die Schritte von der vagen Aussage zur prüfbaren Anforderung in die richtige Reihenfolge.", ["Vage Formulierung und ihre offenen Fragen benennen", "Fehlende Fakten bei der zuständigen Quelle klären", "Anforderung mit Satzschablone und Verbindlichkeit formulieren", "Prüfbares Akzeptanzkriterium ergänzen", "Ergebnis mit der Quelle validieren"], "Erst klären, dann formulieren. Wer zuerst formuliert, zementiert eigene Annahmen."),
          multi("alternative", "Ein Use Case enthält nur den Erfolgsfall. Welche ZWEI Dinge fehlen am wahrscheinlichsten?", ["Alternativabläufe und Ausnahmen", "Vor- und Nachbedingungen des Ablaufs", "Die Schriftart der Überschrift", "Die Anzahl Zeilen im Dokument"], [0,1], "Fehler- und Alternativfälle decken regelmässig wesentliche Anforderungen auf, zum Beispiel «keine Gebote vorhanden».")
        ]),

        S("Was ein Modell ist und warum Syntax nicht Semantik ist", `${W(3, "9–12")}; ${H("3.4.1")}`,
          "Ein Modell ist eine **zweckgerichtete Abstraktion**: Es wählt bewusst einige Aspekte der Realität aus und lässt den Rest weg. Das Weglassen ist der Nutzen, nicht der Mangel.",
          cards(
            ["Syntax", "Welche Konstrukte darf ich verwenden, und wie dürfen sie verbunden sein? Ein Werkzeug kann das prüfen."],
            ["Semantik", "Was bedeuten diese Konstrukte in der Domäne? Das kann nur ein Mensch mit Fachwissen prüfen."],
            ["Zweck", "Welche Frage soll das Modell beantworten? Ohne Zweck ist jedes Modell beliebig."]
          ),
          note("exam", "Der Satz, der dazu geprüft wird", "Ein Diagramm kann syntaktisch vollkommen korrekt und semantisch falsch sein. Beispiel: Die Multiplizität ist gültige UML, widerspricht aber der vereinbarten Geschäftsregel. Die Notation einzuhalten validiert keine Anforderung."),
          tnote(["Deine Frage", "Passendes Modell"], [
            ["Wer ist aussen, und welche Schnittstellen gibt es?", "Kontextsicht"],
            ["Welche Begriffe gibt es, und wie hängen sie zusammen?", "Klassen- bzw. Domänenmodell"],
            ["Welche Funktionen nutzen welche Akteure?", "Use-Case-Modell"],
            ["In welcher Reihenfolge, und was läuft parallel?", "Aktivitäts- bzw. Prozessmodell"],
            ["Wie reagiert das System je nach aktuellem Zustand?", "Zustandsmodell (Statechart)"]
          ], "Zuordnung nach Kapitel 3.4, Fragen selbst formuliert.")),

        S("Domänenmodell lesen: echte Multiplizitäten der Auktionsplattform", LE("Domänenmodell erstellen"),
          "Das Domänenmodell erfasst laut Musterlösung «the most important abstractions (concepts) in our application». Es ist **kein** Datenbankentwurf, auch wenn es ähnlich aussieht.",
          tnote(["Beziehung", "Multiplizität", "Auf Deutsch gelesen"], [
            ["Auction – Bid", "1 zu 0..*", "Eine Auktion hat null oder viele Gebote. Jedes Gebot gehört zu genau einer Auktion."],
            ["Auction – Auction Item", "1 zu 1", "Eine Auktion betrifft genau einen Artikel."],
            ["Category – Auction", "1 zu 0..*", "Jede Auktion gehört zu genau einer Kategorie."],
            ["Operating Company – User Account", "1 zu 1..*", "Die Betreiberfirma hat mindestens einen registrierten Benutzer."],
            ["User Account – Pending Payment", "1 zu 0..*", "Ein Konto kann mehrere offene Zahlungen haben."],
            ["Auction – Pending Payment", "1 zu 0..1", "Zu einer Auktion gibt es höchstens eine offene Zahlung."]
          ], "Multiplizitäten aus dem Domänenmodell der Musterlösung LE05."),
          reveal("Erzwingt «Auction 1 – 0..* Bid», dass jede Auktion mindestens ein Gebot hat?",
            "Nein. Die Untergrenze ist null, also ist eine Auktion ohne Gebot erlaubt. Genau deshalb hat der Use Case «Close Auction» in der Musterlösung einen eigenen Alternativablauf für «no bids», der nur den Verkäufer benachrichtigt.",
            "Mit `1..*` wäre eine Auktion ohne Gebot ein Modellverstoss, und der Alternativablauf wäre widersprüchlich. So hängen Modell und Verhalten zusammen."),
          note("tip", "Multiplizität richtig lesen", "Lies immer **vom gegenüberliegenden Ende**. Die Zahl neben Bid beantwortet: wie viele Gebote hat eine Auktion. Die Zahl neben Auction beantwortet: zu wie vielen Auktionen gehört ein Gebot."),
          "Weitere Begriffe: Attribute beschreiben Eigenschaften (zum Beispiel `Locked` und `ThresholdOpenPayments` am User Account), Assoziationen beschreiben Beziehungen, Generalisierung drückt eine Ist-ein-Beziehung aus (Credit Card und PayPal sind Payment Instruments)."),

        S("Use-Case-Modell lesen: Akteure, Rollen und Beziehungen", LE("Use-Case-Modellierung"),
          "Ein Akteur ist eine **Rolle**, die mit dem System interagiert, nicht eine Person. Dieselbe Person kann heute Käufer und morgen Verkäufer sein.",
          tnote(["Akteur im Fallbeispiel", "Art", "Besonderheit"], [
            ["User", "Mensch, allgemeinste Rolle", "Basisfunktionen, die alle abgeleiteten Rollen nutzen"],
            ["Registered User", "Mensch, spezialisiert", "Hat ein Konto und darf es pflegen"],
            ["Buyer, Seller", "Mensch, weiter spezialisiert", "Erben die Funktionen der allgemeineren Rolle"],
            ["Administrator", "Mensch", "Vertreter der Betreiberfirma, sperrt Konten"],
            ["Payment Organization", "Externes System («actor»)", "Validiert Zahlungen"],
            ["Time", "Nicht-menschlicher Akteur («actor»)", "Löst das Schliessen einer abgelaufenen Auktion aus"]
          ], "Akteurliste der Musterlösung LE05."),
          note("exam", "Zwei Dinge, die hier geprüft werden", [
            "**Ein Akteur muss kein Mensch sein.** Time und Payment Organization sind Akteure. Wer «Akteur = Benutzer» denkt, verliert hier Punkte.",
            "**Akteure können generalisiert werden.** User ist die Oberrolle; Buyer und Seller erben deren Use Cases. Das spart im Diagramm viele Linien."
          ]),
          compare(
            "«include»", [
              "Der eingeschlossene Use Case läuft **immer** als Teil des anderen.",
              "Beispiel: «Create Account» schliesst «Sign In» ein.",
              "Zweck: gemeinsames Verhalten herausziehen."
            ],
            "«extend»", [
              "Der erweiternde Use Case läuft nur **unter Bedingung**.",
              "Beispiel: «Place Bid» erweitert «Sign In» nicht, sondern setzt es voraus; die Erweiterung ist der optionale Zusatz.",
              "Zweck: optionales oder Ausnahmeverhalten anhängen."
            ],
            "Merke: include = immer, extend = manchmal. Beide Pfeile zeigen keine zeitliche Reihenfolge der Benutzung."),
          reveal("Was zeigt ein Use-Case-Diagramm nicht?",
            "Es zeigt keine Ausführungsreihenfolge, keine Abläufe, keine Bedingungen und keine Qualitätsgrenzwerte. Dass «Place Bid» neben «Browse Auction Catalog» steht, heisst nicht, dass das eine vor dem anderen passiert.",
            "Für Ablauf und Bedingungen brauchst du die Use-Case-Beschreibung oder ein Aktivitätsmodell.")),

        C("cp-models", "Die Bedeutung eines Modells deuten", `${H("3.4.1–3.4.4")}; ${LE("Domänenmodell und Use-Case-Modell")}`, [
          single("multiplicity", "Im Domänenmodell gilt «Auction 1 – 0..* Bid». Zu wie vielen Auktionen gehört ein einzelnes Gebot?", ["Null oder viele", "Genau eine", "Mindestens eine, höchstens viele", "Das sagt das Modell nicht"], 1, "Lies vom gegenüberliegenden Ende: die 1 steht bei Auction, also gehört ein Gebot zu genau einer Auktion."),
          multi("usecase", "Welche ZWEI Dinge zeigt ein Use-Case-Diagramm direkt?", ["Die Akteure, auch nicht-menschliche", "Die für Akteure bedeutsame Systemfunktionalität und die Systemgrenze", "Die exakte Ausführungsreihenfolge aller internen Aktionen", "Die vollständigen Abnahmegrenzwerte für Performance"], [0,1], "Abläufe und Qualitätskriterien brauchen ergänzende Beschreibungen."),
          single("timeactor", "In der Musterlösung ist «Time» als Akteur eingezeichnet. Was folgt daraus?", ["Das Diagramm ist fehlerhaft, Akteure sind immer Menschen", "Ein Akteur kann jede Rolle sein, die mit dem System interagiert, auch ein Zeitgeber", "Time ist nur eine Beschriftung ohne Bedeutung", "Time muss Teil des Systems sein"], 1, "Time löst das Schliessen abgelaufener Auktionen aus und ist damit ein legitimer nicht-menschlicher Akteur im Kontext."),
          typed("includeword", "Welche UML-Beziehung drückt aus, dass ein Use Case IMMER Teil eines anderen ist?", ["include", "«include»", "Include-Beziehung", "includes"], "include bedeutet immer eingeschlossen, extend bedeutet nur unter Bedingung.", "Beziehungsname"),
          single("syntax", "Ein Diagramm ist formal korrektes UML, verwendet aber eine Multiplizität, die der vereinbarten Geschäftsregel widerspricht. Was ist das Problem?", ["Kein Problem, korrekte Syntax beweist Korrektheit", "Die Semantik passt nicht zur Domäne, das Modell behauptet etwas Falsches", "Nur die Darstellung ist unschön", "Es fehlt eine Legende"], 1, "Syntaktische Korrektheit sagt nichts über fachliche Richtigkeit. Nur Validierung mit den Quellen deckt das auf.")
        ]),

        S("Aktivitätsmodell: Entscheidung, Zusammenführung, Gabelung, Synchronisation", `${H("3.4.4")}; ${LE("Anforderungen modellbasiert dokumentieren")}`,
          "Vier Konstrukte, zwei Paare. Die Verwechslung von Merge und Join ist ein Prüfungsklassiker.",
          tnote(["Konstrukt", "Bedeutung", "Wartet es?"], [
            ["Entscheidung (decision)", "Wählt anhand einer Bedingung einen von mehreren Pfaden", "Nein, es geht nur einer weiter"],
            ["Zusammenführung (merge)", "Führt alternative Pfade wieder zusammen", "Nein, der erste eintreffende Pfad genügt"],
            ["Gabelung (fork)", "Startet mehrere Pfade gleichzeitig", "Nein, alle starten"],
            ["Synchronisation (join)", "Führt parallele Pfade zusammen", "Ja, wartet auf alle"]
          ], "Konstrukte nach Kapitel 3.4.4, Spalte «Wartet es?» selbst ergänzt."),
          note("tip", "Merkhilfe", "Decision und Merge gehören zu **Alternativen** (oder). Fork und Join gehören zu **Parallelität** (und). Ein Merge wartet nie, ein Join immer."),
          "Echtes Beispiel aus der Musterlösung zum Use Case «Close Auction»: Nach dem Schliessen laufen parallel eine Zahlungsanfrage an die Zahlungsorganisation, eine Gutschrift auf das Verkäuferkonto und die Benachrichtigung von Verkäufer und Käufer. Danach wird die Antwort der Zahlungsorganisation verarbeitet. Enthält der Ablauf ein `[no bids]`, wird nur der Verkäufer benachrichtigt.",
          reveal("Warum ersetzt ein Merge keinen Join?",
            "Ein Merge nimmt den **einen** alternativen Pfad an, der tatsächlich durchlaufen wurde. Er wartet nicht, weil die anderen Pfade gar nicht laufen.",
            "Ein Join wartet auf **alle** nebenläufigen Pfade. Wer bei paralleler Arbeit einen Merge einsetzt, erlaubt dem Ablauf, weiterzulaufen, bevor die Zahlung bestätigt ist. Das ist ein fachlicher Fehler, kein Schönheitsfehler.")),

        S("Zustandsmodell: der Zustand entscheidet, was ein Ereignis bedeutet", `${H("3.4.5")}; ${LE("Anforderungen modellbasiert dokumentieren")}`,
          "Ein Übergang (transition) hat bis zu drei Bestandteile: einen **Auslöser** (trigger), eine **Bedingung** (guard, in eckigen Klammern) und eine **Aktion** (action).",
          "Echter Lebenszyklus der Domänenklasse Auction aus der Musterlösung:",
          flow("created", "open (nachdem der Verkäufer freigibt)", "closed (bei Zeitablauf oder gewähltem Fixpreis)", "archived (after(1 year))"),
          tnote(["Übergang", "Auslöser", "Bedingung"], [
            ["created nach open", "seller gives okay", "keine"],
            ["open nach closed", "end of time oder fixed price chosen", "keine"],
            ["open nach canceled", "seller cancels auction", "[auction time < 30 min.]"],
            ["closed nach archived", "after(1 year)", "keine"],
            ["canceled nach archived", "after(1 year)", "keine"]
          ], "Zustandsmodell der Musterlösung LE06, Kapitel 6."),
          note("exam", "Der entscheidende Punkt", "Ein Verkäufer darf eine Auktion nur abbrechen, wenn sie weniger als 30 Minuten läuft. Derselbe Auslöser «seller cancels auction» führt also nach 40 Minuten zu **keinem** Übergang. Der Auslöser allein genügt nie."),
          reveal("Was folgt aus diesem Zustandsmodell für die bestehenden Anforderungen?",
            "Die Musterlösung nennt drei Folgen: Erstens braucht die Domänenklasse ein Attribut `status` als Enum mit den Werten created, open, closed, canceled, archived. Zweitens entstehen zwei neue Use Cases: «Cancel Auction» und «Archive Auctions». Drittens müssen «Create Auction», «Place Bid» und «Close Auction» den Status als Vor- oder Nachbedingung berücksichtigen.",
            "Das ist der eigentliche Nutzen von Modellen: Sie erzeugen Anforderungen, die im Text niemand vermisst hätte.")),

        S("Glossar und Dokumentstruktur", H("3.5–3.6"),
          "Ein Glossar legt vereinbarte Bedeutungen fest. Es behandelt vor allem zwei Probleme, die in jedem Projekt auftreten.",
          compare(
            "Synonym", [
              "Verschiedene Wörter, dieselbe Sache.",
              "Beispiel: «Bieter», «Käufer», «Buyer».",
              "Gefahr: Man glaubt, über drei Dinge zu reden."
            ],
            "Homonym", [
              "Dasselbe Wort, verschiedene Sachen.",
              "Beispiel: «Konto» als Benutzerkonto oder als Buchhaltungskonto.",
              "Gefahr: Man glaubt, über dieselbe Sache zu reden."
            ],
            "Das Homonym ist das gefährlichere Problem, weil der Widerspruch erst sehr spät auffällt, oft erst im Test."),
          "Für die Struktur gilt: nach Zielgruppe und Zweck gliedern und auf gemeinsame Fakten **verweisen** statt sie zu kopieren. Jede Kopie ist eine Stelle, die bei der nächsten Regeländerung vergessen wird.",
          note("warn", "Redundanz ist kein Sicherheitsnetz", "Dieselbe Regel in drei Dokumenten bedeutet nicht dreifache Sicherheit, sondern drei mögliche Versionen der Wahrheit.")),

        C("cp-flow", "Über Verhalten nachdenken", `${H("3.4.4–3.6")}; ${LE("Anforderungen modellbasiert dokumentieren")}`, [
          single("join", "Zwei parallele Prüfungen müssen beide abgeschlossen sein, bevor es weitergeht. Welches Konstrukt brauchst du?", ["Merge", "Join", "Decision", "Fork"], 1, "Ein Join synchronisiert nebenläufige Pfade und wartet auf alle. Ein Merge vereint Alternativen und wartet nicht."),
          multi("transition", "Welche ZWEI Tatsachen können einen ausgelösten Zustandsübergang verhindern?", ["Das System ist nicht im passenden Ausgangszustand", "Die Bedingung (guard) ist nicht erfüllt", "Der Übergang hat eine Aktion", "Das Diagramm verwendet englische Beschriftungen"], [0,1], "Beispiel aus dem Fallbeispiel: «seller cancels auction» greift nur, wenn die Auktion weniger als 30 Minuten läuft."),
          typed("guardvalue", "Nach wie vielen Minuten Laufzeit darf der Verkäufer laut Zustandsmodell eine Auktion nicht mehr abbrechen?", ["30", "30 Minuten", "nach 30 Minuten", "ab 30 Minuten"], "Die Bedingung lautet [auction time < 30 min.]. Ab 30 Minuten findet kein Übergang nach canceled statt.", "Zahl"),
          single("glossary", "Warum ist ein Homonym gefährlicher als ein Synonym?", ["Weil es länger ist", "Weil alle glauben, über dieselbe Sache zu reden, und der Widerspruch erst spät auffällt", "Weil Synonyme nie Probleme machen", "Weil Homonyme in Glossaren verboten sind"], 1, "Beim Synonym merkt man die Vielfalt der Wörter. Beim Homonym fehlt genau dieses Warnsignal.")
        ]),

        S("Qualitätskriterien: einzelne Anforderung und ganze Sammlung", H("3.8"),
          "Die Prüfung unterscheidet sauber zwischen Kriterien für **eine** Anforderung und Kriterien für die **Sammlung**. Verwechseln ist ein häufiger Fehler.",
          compare(
            "Einzelne Anforderung", [
              "Gibt die Bedürfnisse angemessen wieder.",
              "Notwendig: wird wirklich gebraucht.",
              "Verständlich für die Zielgruppe.",
              "Eindeutig: nur eine Lesart.",
              "Prüfbar: es gibt ein Kriterium für erfüllt."
            ],
            "Sammlung von Anforderungen", [
              "Konsistent: keine Widersprüche.",
              "Angemessen vollständig für den Zweck.",
              "Änderbar: lässt sich pflegen.",
              "Verfolgbar (traceability): Herkunft und Verwendung sind nachvollziehbar."
            ],
            "Eine Sammlung aus ausschliesslich perfekten Einzelanforderungen kann trotzdem inkonsistent und unvollständig sein."),
          "Beispiel: R1 nimmt Gebote bis einschliesslich 12:00 an, R2 lehnt jedes Gebot um 12:00 ab. Jeder Satz ist eindeutig, verständlich und prüfbar. Die Sammlung ist trotzdem kaputt.",
          note("tip", "Keine abschliessende Liste", "Der aktuelle Lehrplan stellt ausdrücklich klar, dass die empfohlenen Qualitätskriterien nicht abschliessend sind. Welche Kriterien relevant sind, hängt von Arbeitsprodukt, Kontext und Risiko ab.")),

        S("Verfolgbarkeit am Fallbeispiel", `${H("3.8")}; ${LE("Verfolgbarkeit von Anforderungen")}`,
          "Verfolgbarkeit (traceability) heisst: Zu jeder Anforderung ist nachvollziehbar, woher sie kommt und wo sie verwendet wird. Die Musterlösung zeigt das mit zwei Matrizen.",
          flow("Ziel (Goal), z. B. Z2 «50 Prozent mehr Umsatz»", "Feature, z. B. R01 «versteigern oder Fixpreis»", "Use Case, z. B. UC01 «Browse Auction Catalog»", "Detailanforderung, z. B. R15 «Preis ohne Browser-Refresh»"),
          "Im Use-Case-Modell der Musterlösung steht bei UC01 ausdrücklich «Traceability: Feature R01». Genau so wird die Verbindung festgehalten.",
          note("tip", "Wozu das in der Praxis gut ist", "Wenn ein Stakeholder ein Ziel streicht, findest du über die Matrix alle Features und Use Cases, die dann überflüssig oder begründungslos werden. Ohne Verfolgbarkeit bleibt Code stehen, den niemand mehr erklären kann.")),

        S("Nachhaltigkeit: der Workshop und seine Regeln", "Activities week 3 Tasks.pdf; Activities - Week 03 - interdisciplinary.pdf, Folien 3–8",
          "Der Workshop verwendet fünf Dimensionen der Nachhaltigkeit nach Duboc et al. Sie erweitern die Suche nach Bedürfnissen; sie sind **keine** eigene CPRE-Prüfungseinheit.",
          tnote(["Dimension", "Leitfrage", "Mögliche Anforderung für die Plattform"], [
            ["Ökologisch", "Welcher Ressourcenverbrauch entsteht?", "Energieverbrauch je abgeschlossene Auktion messen und begrenzen"],
            ["Sozial", "Wer wird ein- oder ausgeschlossen?", "Bedienbar auch ohne Maus und mit Screenreader"],
            ["Individuell", "Was macht das mit der einzelnen Person?", "Keine künstliche Zeitdruck-Mechanik beim Bieten"],
            ["Ökonomisch", "Trägt sich das über die Zeit?", "Betriebskosten je Transaktion bleiben unter einem vereinbarten Wert"],
            ["Technisch", "Bleibt es wartbar und nutzbar?", "Komponenten unabhängig deploybar, damit Teile ersetzt werden können"]
          ], "Dimensionen aus den Workshop-Folien, Beispielanforderungen selbst formuliert."),
          note("exam", "Die konkreten Vorgaben des Aufgabenblatts", [
            "Vorbereitung: das Paper von Seyff et al. «Transforming our World through Software» lesen und criteria.greensoftware.ch durchsehen.",
            "Im Unterricht: eine Präsentation von fünf Minuten, ohne Folien erlaubt, nicht länger als fünf Minuten.",
            "Nach dem Unterricht: **fünf** Kriterien auswählen, die **alle fünf** Dimensionen abdecken.",
            "Ergebnis: rund eine A4-Seite Zusammenfassung in die Projektdokumentation."
          ]),
          "Aus einem Anliegen wird erst eine Anforderung, wenn Quelle, Geltungsbereich und ein vereinbarter Nachweis der Erfüllung dabeistehen. Untersuche Zielkonflikte, statt alle Ziele für vereinbar zu erklären."),

        S("Transfer: vom vagen Anspruch zum Nachweis", H("3.1.4, 3.2, 3.8"),
          "Der Kunde sagt: «Der Auktionsservice muss nachhaltig und benutzerfreundlich sein.» Das ist ein berechtigtes Anliegen und noch keine Anforderung.",
          reveal("Beschreibe den nächsten RE-Schritt, ohne eine Einigung zu erfinden.",
            "1. Konkretisieren, wen es betrifft: welche Nutzergruppen, welche Nutzungssituationen, welcher Teil des Systems.",
            "2. Dimension bestimmen: Geht es um Energie, um Zugänglichkeit, um Betriebskosten? «Nachhaltig» allein ist nicht prüfbar.",
            "3. Messgrösse und Schwellenwert als **Entwurf** vorschlagen, ausdrücklich als Vorschlag markiert.",
            "4. Validieren: mit der Quelle abstimmen, dann als Anforderung mit Nachweis dokumentieren.",
            "Was du nicht tust: deine eigene Zahl in die Spezifikation schreiben und sie als genehmigt darstellen.")),

        C("cp-quality", "Die ganze Anforderungssammlung prüfen", `${H("3.1.4, 3.8")}; Activities week 3 Tasks.pdf`, [
          single("consistency", "R1 nimmt Gebote bis einschliesslich 12:00 an, R2 lehnt jedes Gebot um 12:00 ab. Welches Qualitätskriterium ist verletzt?", ["Eindeutigkeit der einzelnen Anforderung", "Konsistenz der Sammlung", "Prüfbarkeit der einzelnen Anforderung", "Verständlichkeit"], 1, "Jede Anforderung einzeln ist eindeutig und prüfbar. Verletzt ist die Konsistenz, also ein Kriterium der Sammlung."),
          multi("collection", "Welche ZWEI Kriterien gelten für die Sammlung und nicht für die einzelne Anforderung?", ["Konsistenz", "Verfolgbarkeit", "Eindeutigkeit", "Prüfbarkeit"], [0,1], "Eindeutigkeit und Prüfbarkeit beurteilt man an einem einzelnen Satz. Konsistenz und Verfolgbarkeit erst an der Menge."),
          multi("sustainable", "Wähle ZWEI passende Reaktionen auf ein Nachhaltigkeitsziel.", ["Betroffene Stakeholder und die relevante Dimension bestimmen", "Einen Nachweis vereinbaren, an dem die Erfüllung beurteilt wird", "Annehmen, dass Nachhaltigkeit nur den Stromverbrauch betrifft", "Einen eigenen Zielwert wählen und als vom Kunden genehmigt dokumentieren"], [0,1], "Der Workshop verlangt alle fünf Dimensionen und Relevanz für das Projekt. Eigene Zahlen als genehmigt darzustellen ist ein RE-Fehler."),
          typed("dimensions", "Wie viele Dimensionen der Nachhaltigkeit müssen deine fünf ausgewählten Kriterien abdecken?", ["5", "fünf", "alle fünf", "alle 5"], "Das Aufgabenblatt verlangt fünf Kriterien, die alle fünf Dimensionen abdecken.", "Zahl"),
          single("qualitycriterion", "Sind die im Lehrplan empfohlenen Qualitätskriterien eine abschliessende Liste?", ["Ja, weitere Kriterien sind nicht erlaubt", "Nein, welche Kriterien relevant sind, hängt von Arbeitsprodukt und Kontext ab", "Sie gelten nur für Quellcode", "Sie gelten nur für agile Projekte"], 1, "Der aktuelle Lehrplan stellt das ausdrücklich klar. Nutze die Kriterien als Orientierung und passe sie an Risiko und Arbeitsprodukt an.")
        ]),

        S("Selbstcheck Woche 3", `${W(3, "2–17")}; ${H("3")}`,
          check([
            "Ich kann die fünf Facetten eines Arbeitsprodukts nennen.",
            "Ich kann temporär, sich entwickelnd und dauerhaft unterscheiden, inklusive Metadaten und Änderungskontrolle.",
            "Ich kann mindestens vier der sechs Faktoren für den Detaillierungsgrad nennen.",
            "Ich kann Abstraktionsebene und Detaillierungsgrad an einem Beispiel trennen.",
            "Ich erkenne Passiv, Nominalisierung, Allaussagen und unvollständige Vergleiche in einer Anforderung.",
            "Ich kann eine Anforderung mit Satzschablone formulieren und den Typ benennen.",
            "Ich kann User Story mit Akzeptanzkriterium von einem Use Case unterscheiden.",
            "Ich kann Multiplizitäten im Domänenmodell korrekt vom gegenüberliegenden Ende lesen.",
            "Ich kann Akteure, Generalisierung, include und extend im Use-Case-Diagramm erklären.",
            "Ich kann Merge und Join unterscheiden und sagen, welches wartet.",
            "Ich kann einen Zustandsübergang mit Auslöser und Bedingung deuten.",
            "Ich kann Qualitätskriterien der einzelnen Anforderung von denen der Sammlung trennen.",
            "Ich kann ein Nachhaltigkeitsanliegen in einen Anforderungskandidaten mit Nachweis übersetzen."
          ]),
          "Die Modellübungen hier verwenden die echten Diagramme der Fallstudie Auktionsplattform. Für vollständige diagrammbasierte Prüfungsfragen zusätzlich die offizielle Übungsprüfung nutzen, die im Prüfungsleitfaden verlinkt ist.")
      ] },
      { id: "w4", number: 4, title: "Ermittlung, Konfliktlösung, Validierung und UCD", status: "ready", items: [
        S("Ausarbeitung ist eine Schleife, kein Wasserfall", `${W(4, "3–4")}; ${H("4")}`,
          "Diese Woche besteht aus vier Tätigkeiten, die sich gegenseitig anstossen: **Quellen bestimmen**, **Anforderungen ermitteln**, **Konflikte lösen** und **validieren**.",
          flow("Quellen bestimmen", "Ermitteln", "Konflikte lösen", "Validieren", "zurück zu einer früheren Tätigkeit"),
          note("def", "Wörtlich aus der Vorlesung", "«Requirements engineering is not a linear process. Software projects usually start with a limited product backlog of high-level requirements that are refined and detailed only when they are candidates for the next iteration.»"),
          "Auf Deutsch: Am Anfang steht ein kleines Backlog grober Anforderungen. Detailliert wird erst, was als Nächstes umgesetzt werden soll. Wer alles vorab detailliert, arbeitet gegen das Verfahren.",
          note("exam", "Gewichtung", "LE4 «Erarbeitung von Anforderungen» ist mit 4 Stunden 30 Minuten die zweitgrösste Lerneinheit nach LE3. Rechne mit mehreren Fragen zu Techniken, Konflikten und Validierung.")),

        S("Quellen: die drei Kategorien mit ihren Beispielen", W(4, "5–6, 12"),
          "Die Vorlesung zeigt dieselbe Folie dreimal. Das ist ein deutliches Signal: Diese Einteilung soll sitzen.",
          tnote(["Kategorie", "Beispiele aus den Folien"], [
            ["Stakeholder", "Benutzer und Endbenutzer, Sponsoren, Manager, Entwickler, Behörden, Kunden"],
            ["Dokumente", "Prozessdokumente, gesetzliche oder regulatorische Dokumente, firmenspezifische Vorschriften, Marketinginformationen über potenzielle künftige Benutzer"],
            ["Systeme", "Bestehende Systeme und Altsysteme"]
          ], "Vollständige Beispiellisten aus den Folien von Woche 4."),
          note("warn", "Die Diskussionsfrage der Vorlesung", "Die Folien fragen ausdrücklich: Welche Herausforderungen entstehen, wenn man Dokumente und Systeme als Quellen nutzt? Antworten: Dokumente können veraltet, widersprüchlich oder nie gelebt worden sein. Altsysteme zeigen dir das Verhalten, aber nicht, ob es gewollt war. Ein jahrelanger Fehler sieht in der Datenbank wie eine Regel aus."),
          "Marketinginformationen sind eine interessante Quelle: Sie beschreiben Benutzer, die es noch nicht gibt. Das ist nützlich für ein neues Produkt und riskant, weil niemand widersprechen kann."),

        S("Quelle ist nicht Technik", H("4.1"),
          "Ein Klassiker in Prüfungsfragen: Eine Quelle ist, **wo** das Wissen steckt. Eine Technik ist, **wie** du es herausholst.",
          tnote(["Quelle", "Passende Technik", "Was dabei schiefgehen kann"], [
            ["Vertreterin des Supports", "Interview", "Zeitaufwand, Verzerrung durch den Interviewer"],
            ["Betriebsanleitung", "Dokumentenanalyse", "Dokument ist veraltet oder wurde nie befolgt"],
            ["Bestehende Auktionsplattform", "Systemarchäologie (system archaeology)", "Du übernimmst einen alten Fehler als Anforderung"]
          ], "Zuordnung nach Kapitel 4.1, dritte Spalte selbst ergänzt."),
          note("exam", "Die Standardfrage", "«Was ist eine Technik und keine Quelle?» Antwort: das Interview. Ein Altsystem, ein Handbuch und ein Systembetreiber sind Quellen."),
          "Merke ausserdem: Wiederverwendung beweist keine Eignung. Dass ein Verhalten seit zehn Jahren existiert, heisst nicht, dass es jemand will."),

        S("Zwiebelmodell und Schneeballprinzip", W(4, "7"),
          "Das Zwiebelmodell nach Alexander zeigt, dass ein Softwaresystem von mehreren Schichten soziotechnischer und sozialer Systeme umgeben ist, und jede Schicht hat eigene Stakeholder.",
          note("def", "Das Schneeballprinzip, wie die Folien es beschreiben", [
            "Zuerst die offensichtlich relevanten Stakeholder bestimmen: Endbenutzer und Kunden.",
            "Dann ihre Beziehungen zu inneren und äusseren umgebenden Systemen analysieren.",
            "Je mehr Stakeholder du findest, desto leichter findest du weitere.",
            "**Stop at the irrelevant environment.**"
          ]),
          "Der letzte Punkt ist die Prüfungsfalle. Das Abbruchkriterium ist nicht «nach fünf Personen» oder «wenn die Zeit um ist», sondern: wenn der Zweig in die irrelevante Umgebung führt. Hier schliesst sich der Kreis zu Woche 2: Die Kontextgrenze begrenzt die Stakeholdersuche.",
          reveal("Ein Zweig führt vom Käufer über dessen Bank zur Bankenaufsicht. Wann hörst du auf?",
            "Sobald ein Glied der Kette keine Anforderung an **dieses** System mehr erzeugt. Die Zahlungsorganisation ist relevant, weil sie Formate und Fehlerfälle bestimmt. Die interne Organisation der Bank ist es in der Regel nicht.",
            "Es gibt aber eine Ausnahme, die du prüfen musst: Wenn eine Aufsichtsregel direkt eine Anforderung vorschreibt (Aufbewahrungsfristen zum Beispiel), ist die Behörde eine relevante Quelle. Die Vorlesung nennt «Authorities» ausdrücklich als Stakeholderkategorie.")),

        S("Der besondere Stakeholder: der Benutzer", W(3, "14"),
          "Die Vorlesung behandelt Benutzer eigens, weil sie sich stark unterscheiden.",
          compare(
            "Interne Benutzer", [
              "Direkt mit der Organisation verbunden, für die gebaut wird.",
              "Zum Beispiel Mitarbeitende, Management, Subunternehmer.",
              "Erreichbar über formale Projektkanäle.",
              "Zahl und Namen sind bekannt."
            ],
            "Externe Benutzer", [
              "Ausserhalb der Firma: Kunden, Geschäftspartner, Bürger.",
              "Zahl schwankt, Einzelne sind oft nicht bekannt.",
              "Können das Projekt gar nicht kennen oder gleichgültig sein.",
              "Nicht über formale Kanäle erreichbar; es braucht Werbung oder andere Strategien."
            ],
            "Für externe Benutzer kannst du keine Einladung verschicken. Du brauchst Stellvertreter, Beobachtung, Umfragen oder Marketinginformationen."),
          note("tip", "Misuser", "Die Folien stellen ausdrücklich die Frage: «What about considering misusers?» Gemeint sind Personen, die das System absichtlich missbrauchen. Beim Auktionsfall zum Beispiel jemand, der Gebote abgibt und nie bezahlt. Genau dafür existiert in der Fallstudie die Sperrung bei ausstehenden Zahlungen.")),

        S("Die Stakeholderliste: welche Attribute wirklich nützen", `${W(4, "9")}; ${LE("Stakeholder und ihre Ziele")}`,
          "Die Musterlösung zur Fallstudie führt eine Stakeholderliste mit genau diesen Spalten. Das ist ein brauchbares Muster für euren eigenen Bericht.",
          tnote(["Spalte", "Wozu", "Beispiel aus der Musterlösung"], [
            ["Rolle", "Welche Funktion hat die Person im Bezug auf das System?", "Sponsor, Product Owner, Benutzer, Administrator"],
            ["Name, Vertreter", "Wer ist konkret ansprechbar?", "Geschäftsleitung Start-up, Leiter Lagerverwaltung"],
            ["Kontaktdaten", "Damit die Einbindung praktisch möglich ist", "offen zu ergänzen"],
            ["Verfügbarkeit", "Wann und wie oft ist die Person erreichbar?", "offen zu ergänzen"],
            ["Relevanz", "Welche Rolle spielt sie für die Anforderungen?", "Geldgeber, fachlicher Entscheider, Informationslieferant, technischer Entscheider"],
            ["Wissen", "Was weiss diese Person, das niemand sonst weiss?", "kennt den alten Verkaufsprozess, kennt die Schnittstelle zur Buchhaltung"],
            ["Ziele, Interesse", "Was will sie erreichen?", "mehr Gewinn, Vereinfachung des Verkaufs, rasch ein Schnäppchen kaufen"]
          ], "Spalten und Beispiele aus der Musterlösung LE03, Kapitel 1."),
          note("warn", "Eine Liste ist noch kein Management", "Eine lange Stakeholderliste ohne benannte Vertreter und ohne geplante Einbindung ist kein Stakeholdermanagement. Die Liste ist das Werkzeug, nicht das Ergebnis.")),

        S("Einfluss und Motivation: vier Felder, vier Strategien", `${W(4, "9")}; Activities week 4 Tasks.pdf, Aufgabe 1; ${LE("Stakeholder und ihre Ziele")}`,
          "Der Kurs verwendet ein Quadrantenmodell nach Rupp. Es dient dazu, Aufwand gezielt einzusetzen statt nach dem Giesskannenprinzip gleichmässig zu verteilen.",
          { table: { head: ["Einfluss", "Hohe Motivation", "Geringe Motivation"], rows: [
            ["Hoher Einfluss", "So stark wie möglich einbinden. Sie wollen und können entscheiden. Stakeholderverträge halten die Motivation hoch.", "Zufriedenstellen und gute Kontakte pflegen, aber nicht mit Details langweilen. Ein Stakeholdervertrag kann sinnvoll sein."],
            ["Geringer Einfluss", "Laufend informieren und gut kommunizieren. Sie warnen früh vor Problemen, liefern Detailwissen und sind oft Multiplikatoren.", "Nicht vergessen, aber wenig Aufwand investieren. Informationen zum Beispiel im Intranet zugänglich machen."]
          ], marks: { "0,1": "good", "1,1": "focus" }, note: "Strategien nach der Musterlösung LE03, die sich auf Rupp et al., Requirements Engineering und Management, 6. Auflage, beruft." } },
          note("exam", "Zwei Punkte, die gern falsch beantwortet werden", [
            "**Geringer Einfluss heisst nicht irrelevant.** Die Musterlösung betont, dass genau diese Gruppe früh auf Probleme hinweist, Detailwissen liefert und als Multiplikator wirkt.",
            "**Die Klassifizierung ist intern.** Die Musterlösung warnt ausdrücklich davor, sie den Stakeholdern zugänglich zu machen, weil sich jemand wegen seiner Einteilung übergangen fühlen könnte."
          ]),
          reveal("Ein motivierter Endbenutzer ohne formale Macht fordert eine Änderung. Darfst du sie ignorieren?",
            "Nein. Einfluss ist eine Dimension für die **Pflege des Verhältnisses**, kein Beweis für fachliche Irrelevanz.",
            "Zu prüfen sind drei andere Dinge: Betroffenheit (wie stark trifft es diese Person?), Fachwissen (weiss sie etwas, das sonst niemand weiss?) und die Folgen eines Ausschlusses (was passiert, wenn das Thema erst im Betrieb auffällt?).")),

        S("Ziele formulieren: SMART und der Zielkonflikt", `${W(4, "9")}; Activities week 4 Tasks.pdf, Aufgabe 2; ${LE("Stakeholder und ihre Ziele")}`,
          "Der Wochenauftrag verlangt 5 bis 10 Ziele, verknüpft mit den Stakeholdern (Verfolgbarkeit), positiv und motivierend formuliert, nach SMART.",
          tnote(["Buchstabe", "Bedeutung", "Prüffrage"], [
            ["S", "Specific (spezifisch)", "Steht da genau, was erreicht sein soll?"],
            ["M", "Measurable (messbar)", "Woran erkennt man die Erfüllung?"],
            ["A", "Attractive oder Accepted (attraktiv bzw. akzeptiert)", "Will das jemand, und ist es abgestimmt?"],
            ["R", "Realistic (realistisch)", "Ist es mit den Mitteln erreichbar?"],
            ["T", "Time-bound (terminiert)", "Bis wann?"]
          ], "SMART-Auflösung wie im Aufgabenblatt und auf Folie 9."),
          "Echtes Beispiel aus der Musterlösung: Z3 lautet «Mit der Online-Auktionsplattform sollen 80 Prozent der Lagerrestbestände innerhalb von 2 Wochen nach der Ausschreibung verkauft werden können.» Spezifisch, messbar, terminiert, mit Quelle «Fallstudie S. 2 f.» und Stakeholder «Kunde».",
          note("def", "Der dokumentierte Zielkonflikt der Musterlösung", "Z5 verlangt, dass die Plattform einfach in die IT-Landschaft des Grosshändlers eingebettet werden kann. Z6 verlangt, dass sie auch anderen Kunden als Produkt angeboten werden kann. Je stärker man an einen Kunden anpasst, desto schlechter wird das Produkt. Die vorgeschlagene Lösung: **Variationspunkte** im Produkt ausdrücklich vorsehen, Abweichungen davon mit dem Kunden besprechen und separat entwickeln beziehungsweise verrechnen."),
          "Das ist ein Musterbeispiel für Konfliktdokumentation: Konflikt benennen, Ursache erklären (Produkt- gegen Kundenentwicklung), Lösungsansatz festhalten."),

        C("cp-sources", "Quellen finden und Stakeholder einbinden", `${W(4, "5–12")}; ${H("4.1")}; ${LE("Stakeholder und ihre Ziele")}`, [
          single("technique", "Was ist eine Technik und keine Anforderungsquelle?", ["Ein Altsystem", "Ein Prozesshandbuch", "Ein Interview", "Ein Systembetreiber"], 2, "Das Interview ist das Mittel, mit dem aus einer Quelle ermittelt wird. Die anderen drei sind Quellen."),
          multi("stakeholders", "Welche ZWEI Spalten der Stakeholderliste helfen direkt bei der Auswahl der Quellen?", ["Relevanz in Bezug auf das System", "Wissen, das nur diese Person hat", "Lieblingsfilm der Person", "Die Zusicherung, dass sich Meinungen nie ändern"], [0,1], "Relevanz und Fachwissen entscheiden, wen du befragen musst. Verfügbarkeit entscheidet, wann."),
          typed("stopcriterion", "Wo endet die Stakeholdersuche nach dem Schneeballprinzip?", ["irrelevante Umgebung", "bei der irrelevanten Umgebung", "irrelevant environment", "in der irrelevanten Umgebung"], "Die Folien sagen: «Stop at the irrelevant environment.» Kein fester Zähler, sondern die Kontextgrenze.", "Begriff"),
          multi("external", "Ein Grossteil der Benutzer sind externe Käufer, die das Projekt nicht kennen. Welche ZWEI Folgen hat das?", ["Sie sind nicht über formale Projektkanäle erreichbar", "Ihre Anzahl und Identität sind oft nicht im Vorhinein bekannt", "Ihre Anforderungen sind deshalb irrelevant", "Sie können durch Entwickler vollständig ersetzt werden"], [0,1], "Externe Benutzer brauchen andere Zugänge: Stellvertreter, Beobachtung, Umfragen. Irrelevant werden sie dadurch nicht."),
          single("lowinfluence", "Ein Stakeholder hat geringen Einfluss, aber hohe Motivation. Was empfiehlt die Musterlösung?", ["Ignorieren, weil er nichts entscheiden kann", "Laufend informieren, gut kommunizieren und sein Detailwissen nutzen", "Nur über das Intranet informieren", "Einen Stakeholdervertrag erzwingen"], 1, "Diese Gruppe warnt früh vor Problemen, liefert Details und wirkt als Multiplikator. Nur Intranet gilt für geringen Einfluss und geringe Motivation.")
        ]),

        S("Was Ermittlung (elicitation) eigentlich bedeutet", W(4, "13–14"),
          note("def", "Definition der Vorlesung", "«Elicitation: the effort expended by the Requirements Engineer to turn implicit desires, demands, wishes, needs, expectations, which until now were hidden in their sources, into explicit, understandable, recognizable, and verifiable requirements.»"),
          "Vier Wörter in dieser Definition lohnen sich zu merken, weil sie das Ziel beschreiben: **explizit**, **verständlich**, **erkennbar**, **überprüfbar**.",
          "Der Rest der Definition erklärt, warum Ermittlung Arbeit ist: Die Bedürfnisse sind **implizit** und in den Quellen **verborgen**. Niemand liefert dir fertige Anforderungen. Wer nur aufschreibt, was gesagt wurde, hat nicht ermittelt, sondern protokolliert.",
          note("warn", "Daraus folgt direkt", "«Der Kunde hat nichts dazu gesagt» ist kein Beleg dafür, dass es kein Bedürfnis gibt. Genau diese Lücke behandelt das Kano-Modell auf der nächsten Folie.")),

        S("Kano: drei Arten, wie Merkmale auf Zufriedenheit wirken", `${W(4, "16")}; ${H("4.2.1")}`,
          "Die Vorlesung nennt für jeden Faktor drei Bezeichnungen. Alle drei können in Fragen auftauchen, darum hier zusammen.",
          tnote(["Faktor", "Weitere Namen", "Wenn er fehlt", "Wenn er gut erfüllt ist", "Wie du ihn findest"], [
            ["Dissatisfier", "Basisfaktor, Must-have, unterbewusstes Bedürfnis", "Das Produkt wird abgelehnt", "Wird als selbstverständlich hingenommen", "Fehler und Routinen beobachten"],
            ["Satisfier", "Leistungsfaktor, bewusstes Bedürfnis", "Weniger Zufriedenheit", "Mehr Zufriedenheit, je besser erfüllt", "Direkt fragen, Bedürfnisse vergleichen"],
            ["Delighter", "Begeisterungsfaktor, unbewusstes Bedürfnis", "Keine Beschwerde, weil niemand es erwartet", "Unerwartete Begeisterung, Unterscheidungsmerkmal", "Ideen erzeugen, Prototypen zeigen"]
          ], "Begriffe und Beschreibungen aus Folie 16 von Woche 4, zusammengeführt mit Kapitel 4.2.1."),
          note("exam", "Die klassische Umkehrfalle", "Ein Basisfaktor löst Unzufriedenheit aus, **wenn er fehlt**. Er löst keine Unzufriedenheit aus, wenn er vorhanden ist. Lies solche Aussagen zweimal; in Negativfragen wird genau das gedreht."),
          note("tip", "Warum «subconscious» und «unconscious» verschieden sind", "Basisfaktoren sind unterbewusst: Die Person könnte es sagen, denkt aber nicht daran, weil es selbstverständlich ist. Begeisterungsfaktoren sind unbewusst: Die Person kann es nicht sagen, weil sie die Möglichkeit nicht kennt.")),

        S("Kano in der Praxis: die Doppelfrage und die Wanderung", `${W(4, "16, 18")}; ${H("4.2.1")}`,
          "Die Vorlesung gibt die konkrete Fragetechnik vor. Du fragst jedes Merkmal **zweimal**:",
          { list: [
            "«Was würden Sie empfinden, wenn dieses Merkmal im System **fehlt**?»",
            "«Was würden Sie empfinden, wenn dieses Merkmal im System **vorhanden** ist?»"
          ] },
          "Erst das Antwortpaar verrät den Faktor. «Fehlt: unbrauchbar» und «vorhanden: normal» ist ein Basisfaktor. «Fehlt: egal» und «vorhanden: begeistert» ist ein Begeisterungsfaktor.",
          note("warn", "Einordnungen sind nicht stabil", [
            "**Nach Gruppe:** Ein Merkmal kann eine Gruppe begeistern und für eine andere selbstverständlich sein.",
            "**Über die Zeit:** Die Neuheit von gestern ist die Basiserwartung von morgen. Push-Benachrichtigungen waren einmal ein Delighter."
          ]),
          reveal("Niemand verlangt eine zuverlässige Speicherung der Gebote. Kannst du sie weglassen?",
            "Nein. Schweigen ist hier das typische Zeichen eines Basisfaktors: Es wird nicht genannt, weil es als selbstverständlich gilt. Fehlt es, wird das Produkt abgelehnt.",
            "Richtiges Vorgehen: Fehler und Beschwerden im Altsystem auswerten, die Doppelfrage stellen, und erst dann entscheiden.")),

        C("cp-kano", "Erkennen, wie ein Bedürfnis aufzudecken ist", `${H("4.2.1")}; ${W(4, "13–18")}`, [
          single("basic", "Benutzer erwarten, dass gespeicherte Gebote nie verschwinden, und erwähnen es erst nach einem Verlust. Welcher Kano-Faktor ist das?", ["Dissatisfier beziehungsweise Basisfaktor", "Satisfier beziehungsweise Leistungsfaktor", "Delighter beziehungsweise Begeisterungsfaktor", "Kein Bedürfnis, weil nicht genannt"], 0, "Selbstverständliche Erwartungen zeigen sich erst durch Unzufriedenheit bei ihrem Fehlen. Das ist die Definition des Basisfaktors."),
          multi("kanochange", "Welche ZWEI Einschränkungen des Kano-Modells sind berechtigt?", ["Eine Einordnung kann von der Nutzergruppe abhängen", "Eine Einordnung kann sich über die Zeit verschieben", "Jeder Leistungsfaktor ist dauerhaft ausdrücklich bekannt", "Ein nicht erwähntes Bedürfnis ist immer unwichtig"], [0,1], "Kano beschreibt eine Beziehung zu Erwartungen in einem Kontext, keine feste Eigenschaft eines Merkmals."),
          single("inverse", "Welche Aussage über einen Basisfaktor ist FALSCH?", ["Wenn er fehlt, wird das Produkt abgelehnt", "Wenn er gut erfüllt ist, erzeugt er starke Begeisterung", "Er wird bei Vorhandensein als selbstverständlich hingenommen", "Er ist oft ein unterbewusstes Bedürfnis"], 1, "Starke Begeisterung bei guter Erfüllung ist das Kennzeichen des Begeisterungsfaktors. Ein Basisfaktor wird bei Erfüllung nur nicht bemerkt."),
          typed("kanoquestions", "Wie viele Fragen stellst du je Merkmal, um den Kano-Faktor zu bestimmen?", ["2", "zwei", "zwei Fragen", "2 Fragen"], "Je Merkmal wird nach dem Fehlen und nach dem Vorhandensein gefragt. Erst das Antwortpaar ordnet ein.", "Zahl")
        ]),

        S("Erhebungstechniken im Überblick", H("4.2.2"),
          "Erhebungstechniken (gathering techniques) holen vorhandenes Wissen heraus. Jede hat eine Stärke und eine Einschränkung, die du beherrschen musst.",
          tnote(["Technik", "Stärke", "Einschränkung"], [
            ["Interview", "Tiefe, Nachfragen möglich", "Zeitaufwand, Verzerrung durch Interviewer"],
            ["Fragebogen (questionnaire)", "Erreicht viele Teilnehmende", "Formulierung und Stichprobe begrenzen die Aussage, kein Nachfragen"],
            ["Workshop", "Bringt Sichtweisen zusammen, Konflikte werden sichtbar", "Braucht Moderation, Gefahr dominanter Stimmen"],
            ["Feldbeobachtung (field observation)", "Deckt implizite Routinen und Umgehungslösungen auf", "Beobachtung verändert das Verhalten"],
            ["Apprenticing", "Lernen durch angeleitetes Mitarbeiten, sehr tiefes Verständnis", "Zugang und hoher Zeitaufwand"],
            ["Systemarchäologie", "Gewinnt Wissen aus Code, Daten, Tests und Dokumentation zurück", "Alter Fehler kann als Regel übernommen werden"],
            ["Feedbackanalyse", "Nutzt vorhandene Tickets und Bewertungen", "Nur wer sich meldet, ist vertreten"]
          ], "Techniken nach Kapitel 4.2.2, Stärken und Einschränkungen zusammengefasst."),
          note("tip", "Entscheidungsregel in einem Satz", "Wähle die Technik nach dem **Beleg, den du brauchst**: Willst du wissen, was Menschen tun, beobachte. Willst du wissen, warum, frage. Willst du wissen, was das System heute tut, lies das System.")),

        S("Die Technikwahl der Vorlesung, und wie du sie in der Prüfung behandelst", W(4, "15"),
          "Die Folien stellen vier Gegensatzpaare als Entscheidungshilfe auf. Lerne sie, weil die ZHAW-Prüfung die Vorlesung abfragen kann.",
          tnote(["Situation", "Vorschlag der Vorlesung"], [
            ["Neues System", "Entwurfs- und Ideenfindungstechniken"],
            ["Bestehendes System", "Befragungstechniken und Systemarchäologie"],
            ["Wasserfallprojekt", "Aufwändige Techniken wie Apprenticing oder Analogien"],
            ["Agiles Projekt", "Brainstorming, Storyboarding, Prototyping"],
            ["Stark vertrauliches Geschäft", "Umfassende Befragung (comprehensive survey)"],
            ["Nicht stark vertrauliches Geschäft", "Feldbeobachtung und Einzelinterviews"]
          ], "Paare wörtlich von Folie 15 der Woche 4."),
          note("warn", "Wichtige Einordnung", [
            "Die Folie selbst endet mit der Diskussionsfrage «how to achieve the best results?». Die Paare sind also als Diskussionsanstoss gedacht, nicht als Gesetz.",
            "Im CPRE-Teil gilt die allgemeine Regel: Die Wahl hängt von Zugang, Vertraulichkeit, Zeit, Verfügbarkeit der Stakeholder und dem benötigten Beleg ab. Eine Antwort «Technik X ist für Projekttyp Y immer die beste» ist dort falsch.",
            "Im ZHAW-Teil kann dieselbe Zuordnung als Vorlesungsinhalt gefragt sein. Kenne beides und unterscheide die Fragestellung: «Was sagt die Vorlesung?» gegen «Was ist fachlich fundiert?»"
          ])),

        S("Entwurfs- und Ideenfindungstechniken", H("4.2.3"),
          "Diese Techniken holen nichts heraus, sondern erzeugen etwas Neues. Das ist der Unterschied zu den Erhebungstechniken, und die Vorlesung nennt ihn ausdrücklich als Lernziel.",
          cards(
            ["Brainstorming", "Trennt das Erzeugen von Ideen strikt vom Bewerten. Erst sammeln, dann beurteilen."],
            ["Analogien", "Überträgt Lösungen aus einer anderen Domäne. «Wie löst ein Flughafen das Warteproblem?»"],
            ["Szenarien und Storyboards", "Machen eine konkrete Nutzungssituation erzählbar und damit kritisierbar."],
            ["Prototypen", "Lassen Menschen einen ausgewählten Teil der Lösung erleben, bevor sie existiert."],
            ["Design Thinking", "Wechselt bewusst zwischen Öffnen und Eingrenzen, bei Problem und Lösung."]
          ),
          note("warn", "Die Reihenfolge entscheidet", "Wähle keine attraktive Lösung, bevor du das Bedürfnis verstanden hast. Ein Prototyp, der eine ungeprüfte Annahme hübsch macht, stabilisiert den Fehler."),
          reveal("Ein Team hat Brainstorming gemacht und 40 Ideen. Ist das ein Ermittlungsergebnis?",
            "Noch nicht. Brainstorming erzeugt Kandidaten, keine Anforderungen. Es fehlen drei Schritte: bewerten, mit Quellen und Zielen abgleichen, und validieren.",
            "Ohne diesen Abgleich ist die Ideensammlung eine Wunschliste des Teams, nicht ein Bedürfnis der Stakeholder.")),

        S("Transfer: eine Altplattform ersetzen", H("4.2.2–4.2.3"),
          "Die alte Plattform hat undokumentierte Gebotsregeln. Die Nutzer können ihre Ausnahmen nicht erklären, sie machen es einfach. Das Team will etwas Neues bauen, ohne kritisches Verhalten zu verlieren.",
          reveal("Welche Techniken kombinierst du, und wofür jede?",
            "**Systemarchäologie** auf Code, Daten und Tests: um die tatsächlich implementierten Regeln zurückzugewinnen. Zum Beispiel, wie ein Gebot in der letzten Sekunde heute wirklich behandelt wird.",
            "**Feldbeobachtung**: um Umgehungslösungen zu sehen, die niemand erzählt, weil sie zur Routine geworden sind.",
            "**Interviews** zu den beobachteten Ausnahmen: um das Warum zu erfahren. Beobachtung zeigt das Verhalten, nicht den Grund.",
            "**Prototyp**: um neue Interaktionsideen zu erkunden, ohne das Altverhalten zu kopieren.",
            "Der entscheidende Schritt kommt danach: validieren, welches Altverhalten erhalten bleiben **muss**. Ein jahrelanger Fehler ist keine Anforderung, nur weil er alt ist.")),

        C("cp-techniques", "Methode und Unsicherheit zusammenbringen", `${H("4.2.2–4.2.3")}; ${W(4, "15")}`, [
          single("legacy", "Du musst Regeln aus bestehendem Code, Tests und Dokumentation zurückgewinnen. Welche Technik passt?", ["Systemarchäologie", "Brainstorming", "Fragebogen", "Analogien"], 0, "Systemarchäologie gewinnt Wissen aus einem bestehenden System und seinen Artefakten zurück."),
          multi("ideas", "Welche ZWEI Techniken dienen dem Erzeugen neuer Lösungsideen und nicht dem Erheben vorhandenen Wissens?", ["Brainstorming", "Analogien", "Dokumentenanalyse", "Feldbeobachtung"], [0,1], "Dokumentenanalyse und Feldbeobachtung erheben, was es schon gibt. Brainstorming und Analogien erzeugen Neues."),
          single("observewhy", "Eine Beobachtung zeigt, dass Nutzer dasselbe Gebot zweimal absenden. Was ist der nächste sinnvolle Schritt?", ["Die doppelte Absendung als Anforderung dokumentieren", "Nachfragen, warum sie das tun, weil Beobachtung das Verhalten zeigt und nicht den Grund", "Einen Fragebogen an alle Kunden senden", "Das Verhalten im neuen System nachbauen"], 1, "Beobachtung liefert das Was, Befragung das Warum. Ohne den Grund kannst du nicht entscheiden, ob es ein Fehler oder ein Bedürfnis ist."),
          single("confidential", "Ein Team behauptet, für ein vertrauliches Projekt sei eine Umfrage grundsätzlich die beste Technik. Wie beurteilst du das fachlich?", ["Richtig, so steht es als allgemeines Gesetz im Lehrplan", "Die Vorlesung nennt das als Beispiel, fachlich entscheiden aber Zugang, Vertraulichkeit, Zeit und der benötigte Beleg", "Vertrauliche Projekte können kein RE betreiben", "Umfragen sind immer die schlechteste Technik"], 1, "Die Folie stellt Paare als Diskussionsanstoss auf und fragt selbst nach dem besten Ergebnis. Eine allgemeingültige Zuordnung gibt es nicht.")
        ]),

        S("Konfliktarten: erst diagnostizieren, dann lösen", H("4.3.1"),
          "Sechs Arten, und sie können gleichzeitig auftreten. Die Diagnose entscheidet, welche Lösung überhaupt funktionieren kann.",
          tnote(["Art", "Ursache", "Beispiel im Auktionsprojekt"], [
            ["Sachkonflikt (subject-matter)", "Tatsächlich verschiedene Bedürfnisse", "Verkäufer will Verlängerung in letzter Sekunde, Käufer will vorhersehbaren Schluss"],
            ["Datenkonflikt (data)", "Unterschiedliche Zahlen oder Interpretationen", "Zwei Planer rechnen mit verschiedenen Umsatzprognosen"],
            ["Interessenkonflikt (interest)", "Unterschiedliche rollenspezifische Ziele", "Sponsor will Termin, Architekt will Qualität"],
            ["Wertekonflikt (value)", "Unterschiedliche Grundüberzeugungen", "Ist eine automatische Sperre bei Zahlungsverzug fair?"],
            ["Beziehungskonflikt (relationship)", "Misstrauen gegenüber der Person", "Vorschlag wird abgelehnt, weil er von einer bestimmten Person kommt"],
            ["Strukturkonflikt (structural)", "Knappe gemeinsame Ressource, Machtgefälle", "Zwei Teams streiten um dieselbe Datenbank"]
          ], "Konfliktarten nach Kapitel 4.3.1, Beispiele selbst gebildet."),
          note("warn", "Nicht am Wortlaut diagnostizieren", "Ein Streit über eine Zahl sieht wie ein Datenkonflikt aus und kann ein Interessenkonflikt sein: Beide wählen die Prognose, die ihr Ziel stützt. Löst du es als Datenkonflikt (gemeinsame Datenquelle), bleibt der eigentliche Konflikt bestehen."),
          reveal("Wie prüfst du, ob hinter einem Datenkonflikt ein Interessenkonflikt steckt?",
            "Frage, was passiert, wenn die andere Zahl stimmt. Beim reinen Datenkonflikt sind beide bereit, eine gemeinsame, bessere Datenquelle zu akzeptieren.",
            "Beim Interessenkonflikt lehnt eine Seite auch die bessere Datenquelle ab, weil nicht die Zahl, sondern ihre Folge das Problem ist.")),

        S("Konflikte lösen und das Ergebnis festhalten", H("4.3.1, 4.3.3"),
          flow("Identifizieren", "Analysieren: Ursachen, Positionen, betroffene Anforderungen", "Lösen: vereinbarten Ansatz anwenden", "Dokumentieren und kommunizieren"),
          tnote(["Ansatz", "Was passiert", "Wann sinnvoll", "Risiko"], [
            ["Einigung (agreement)", "Alle finden eine gemeinsame Lösung", "Sachkonflikt mit genug Zeit", "Dauert, braucht Moderation"],
            ["Kompromiss (compromise)", "Alle machen Zugeständnisse, niemand erhält die Wunschlösung", "Interessenkonflikt", "Ergebnis kann für alle schlecht sein"],
            ["Abstimmung (voting)", "Mehrheit entscheidet", "Viele Beteiligte, gleichwertige Optionen", "Überstimmte Minderheit kann Fachwissen haben"],
            ["Entscheid durch Befugte (overrule)", "Eine autorisierte Stelle entscheidet", "Zeitdruck, Patt", "Akzeptanz kann fehlen"],
            ["Varianten (variants)", "Mehrere Lösungen parallel anbieten", "Echt verschiedene Bedürfnisse", "Erhöht Komplexität und Kosten"]
          ], "Ansätze nach Kapitel 4.3.3, Spalten «Wann sinnvoll» und «Risiko» selbst ergänzt."),
          note("exam", "Die Regel, die oft gefragt wird", "Vereinbare das Entscheidungsverfahren, **bevor** du es anwendest. Eine Abstimmung, deren Regeln erst nach dem Ergebnis diskutiert werden, erzeugt einen neuen Konflikt."),
          "Dokumentiert werden: betrachtete Alternativen, Annahmen, Begründung (rationale) und die Beteiligten. Nicht dokumentiert wird, wer sich durchgesetzt hat.",
          reveal("Ist ein Kompromiss dasselbe wie eine Einigung?",
            "Nein. Bei der Einigung finden alle eine Lösung, die sie tragen. Beim Kompromiss akzeptieren die Parteien Zugeständnisse, obwohl es nicht ihre bevorzugte Lösung ist.",
            "Varianten sind die dritte Möglichkeit: Statt einen Mittelweg zu suchen, erfüllt man unterschiedliche Bedürfnisse unterschiedlich. Genau das schlägt die Musterlösung beim Zielkonflikt Z5 gegen Z6 mit Variationspunkten vor.")),

        S("Entscheidungshilfen und ihre Grenzen", H("4.3.3"),
          cards(
            ["CAF (Consider All Facts)", "Zwingt dazu, alle relevanten Fakten aufzulisten, bevor entschieden wird."],
            ["PMI (Plus, Minus, Interesting)", "Sortiert je Option in Vorteile, Nachteile und Auffälliges."],
            ["Gewichtete Entscheidungsmatrix", "Kriterien gewichten, Optionen bewerten, Punkte summieren."]
          ),
          "Eigenes Beispiel: Eine Option gewinnt die Matrix mit 82 zu 71 Punkten. Grund ist, dass «Liefergeschwindigkeit» mit Gewicht 5 und «Barrierefreiheit» mit Gewicht 1 bewertet wurde. Mit umgekehrter Gewichtung gewinnt die andere Option.",
          note("warn", "Was Entscheidungshilfen leisten und was nicht", "Sie machen Annahmen sichtbar und vergleichbar. Sie machen die gewählten Kriterien und Gewichte nicht objektiv richtig. Zeige die Gewichtung immer mit und validiere sie, bevor du die Punktzahl als Entscheidung darstellst.")),

        C("cp-conflict", "Konflikte diagnostizieren und lösen", H("4.3"), [
          single("data", "Zwei Planer sind uneinig, weil sie mit unterschiedlichen Bedarfsprognosen rechnen. Welche Konfliktart untersuchst du zuerst?", ["Datenkonflikt", "Zwingend ein Beziehungskonflikt", "Wertekonflikt", "Strukturkonflikt"], 0, "Der genannte Unterschied liegt in den Daten oder ihrer Interpretation. Ob dahinter ein Interessenkonflikt steckt, prüfst du danach."),
          order("resolution", "Bringe die Tätigkeiten der Konfliktlösung in die richtige Reihenfolge.", ["Konflikt identifizieren", "Ursachen, Positionen und betroffene Anforderungen analysieren", "Vereinbarten Lösungsansatz anwenden", "Ergebnis mit Begründung dokumentieren und kommunizieren"], "Lösen folgt auf Verstehen, und das Ergebnis muss später nachvollziehbar bleiben."),
          multi("rationale", "Welche ZWEI Angaben gehören in die Konfliktdokumentation?", ["Die betrachteten Alternativen und die zugrunde liegenden Annahmen", "Die Begründung und die an der Entscheidung Beteiligten", "Nur der Name der Person, die sich durchgesetzt hat", "Die Zusicherung, dass die Entscheidung nie überprüft wird"], [0,1], "Die Dokumentation erklärt, warum die Anforderungen so aussehen, wie sie aussehen."),
          single("variants", "Zwei Kundengruppen brauchen tatsächlich unterschiedliches Verhalten beim Auktionsschluss. Welcher Ansatz passt am besten?", ["Abstimmung, die Mehrheit gewinnt", "Varianten, mit bewusst akzeptierter höherer Komplexität", "Entscheid durch eine befugte Stelle", "Kompromiss in der Mitte beider Wünsche"], 1, "Bei echt verschiedenen Bedürfnissen trifft ein Mittelweg keine Gruppe. Varianten erfüllen beide, kosten aber Komplexität."),
          typed("beforeapply", "Was muss vereinbart sein, BEVOR ein Lösungsansatz angewendet wird?", ["das Entscheidungsverfahren", "Entscheidungsverfahren", "das Verfahren", "die Entscheidungsregeln"], "Wer die Regeln erst nach dem Ergebnis diskutiert, erzeugt einen neuen Konflikt.", "Begriff")
        ]),

        S("Validierung: sind es die richtigen Anforderungen?", H("4.4.1"),
          "Verifikation fragt: Haben wir richtig gearbeitet? Validierung fragt: Arbeiten wir am Richtigen? Im RE geht es um das Zweite.",
          "Validiert werden vier Dinge:",
          { list: [
            "**Abdeckung:** Sind die Bedürfnisse der relevanten Stakeholder erfasst?",
            "**Einigung:** Sind die Beteiligten mit dem Ergebnis einverstanden?",
            "**Kontextannahmen:** Sind die Annahmen über die Umgebung plausibel?",
            "**Qualität:** Erfüllen die einzelnen Anforderungen und die Sammlung die Qualitätskriterien?"
          ] },
          note("def", "Drei Prinzipien für die Durchführung", [
            "**Passende Beteiligte einbinden** und die dem Risiko angemessene Unabhängigkeit sicherstellen. Wer das Dokument geschrieben hat, sieht seine eigenen Lücken am schlechtesten.",
            "**Finden und Korrigieren trennen.** Im Review werden Mängel gesammelt, nicht Lösungen diskutiert. Sonst verliert sich die Gruppe im ersten Problem.",
            "**Erneut validieren**, wenn sich Anforderungen oder Annahmen ändern. Validierung ist kein Meilenstein am Ende."
          ]),
          note("warn", "Unterschriften sind kein Nachweis", "Eine Freigabe dokumentiert, dass jemand zugestimmt hat. Sie belegt nicht, dass die Anforderungen korrekt oder vollständig sind.")),

        S("Drei Familien von Validierungstechniken", H("4.4.2"),
          tnote(["Familie", "Beispiele", "Was sie aufdeckt", "Braucht laufendes System?"], [
            ["Review (statisch)", "Stellungnahme, Walkthrough, Inspektion", "Mängel, die durch Lesen und Nachdenken gefunden werden", "Nein"],
            ["Exploration (dynamisch)", "Prototyp, Alpha- und Betatest, A/B-Test", "Feedback aus dem Erleben von Verhalten", "Ja, mindestens einen Prototyp"],
            ["Beispielentwicklung (statisch)", "Testfälle, einen Entwurf oder ein Modell ableiten", "Lücken, die sichtbar werden, wenn man die Spezifikation benutzen will", "Nein"]
          ], "Familien nach Kapitel 4.4.2, letzte Spalte selbst ergänzt."),
          note("exam", "Beispielentwicklung ist die unterschätzte Technik", "Sie deckt nicht testbare Anforderungen auf, **bevor** Software existiert. Wenn du aus «muss zuverlässig genug sein» keinen Testfall ableiten kannst, ist die Anforderung nicht prüfbar. Das merkst du beim Schreiben des Tests, nicht beim Lesen des Satzes."),
          compare(
            "Walkthrough", [
              "Der Autor führt durch das Arbeitsprodukt.",
              "Wenig Vorbereitung, informeller.",
              "Gut für gemeinsames Verständnis und frühe Rückmeldung."
            ],
            "Inspektion", [
              "Formaler, mit festgelegten Rollen.",
              "Gutachter bereiten sich vorher einzeln vor.",
              "Gut für systematische Prüfung riskanter Anforderungen."
            ],
            "Je höher das Risiko, desto formaler und unabhängiger. Ein Walkthrough kostet weniger und findet weniger.")),

        S("Die Validierung passend zum Risiko wählen", H("4.4.1–4.4.2"),
          "Die Techniken konkurrieren nicht, sie finden Verschiedenes.",
          tnote(["Unsicherheit", "Passende Technik", "Warum"], [
            ["Ist der Ablauf verständlich?", "Prototyp mit Usability-Test", "Verwirrung zeigt sich nur im Tun"],
            ["Ist die Zahlungsregel widerspruchsfrei?", "Inspektion mit unabhängigen Gutachtern", "Widersprüche findet man beim systematischen Lesen"],
            ["Ist «zuverlässig genug» prüfbar?", "Beispielentwicklung: Testfall ableiten", "Der Versuch scheitert sofort und deckt die Lücke auf"],
            ["Bevorzugen Nutzer Variante A oder B?", "A/B-Test", "Vergleich echten Verhaltens"]
          ], "Eigene Zuordnung auf Basis von Kapitel 4.4."),
          reveal("Alle mögen den Prototyp, aber niemand kann aus «zuverlässig genug» einen Test ableiten. Ist die Validierung abgeschlossen?",
            "Nein. Positive Reaktionen auf einen Prototyp sagen nichts über ein unklares Zuverlässigkeitskriterium. Hier wurden zwei verschiedene Unsicherheiten verwechselt.",
            "Nächste Schritte: Bedingungen und Messgrösse mit der Quelle klären, die Anforderung prüfbar neu formulieren, und dann die geänderte Anforderung und ihre Folgen erneut validieren.")),

        C("cp-validation", "Überzeugende Belege wählen", H("4.4"), [
          single("sample", "Beim Ableiten eines Testfalls zeigt sich, dass eine Frist nicht definiert ist. Noch läuft keine Software. Welche Technikfamilie war das?", ["Beispielentwicklung", "Exploration durch Betatest", "Exploration durch A/B-Test", "Review durch Inspektion"], 0, "Die Spezifikation wird geprüft, indem man versucht, ein nachgelagertes Arbeitsprodukt daraus zu erstellen."),
          multi("validating", "Wähle ZWEI fundierte Validierungspraktiken.", ["Dem Risiko angemessene unabhängige Perspektiven einbinden", "Mängel finden und das Entscheiden über Korrekturen davon trennen", "Nur einmal ganz am Ende validieren", "Unterschriften als Nachweis der Korrektheit behandeln"], [0,1], "Unabhängigkeit nach Risiko und die Trennung von Finden und Korrigieren sind Kernprinzipien. Validierung ist iterativ."),
          single("walkthrough", "Wer führt typischerweise durch einen Walkthrough?", ["Der Autor des Arbeitsprodukts", "Ein unabhängiger, vorbereiteter Gutachter", "Ein anonymer Kunde", "Der Projektsponsor"], 0, "Beim Walkthrough führt der Autor. Vorbereitete Gutachter mit festen Rollen kennzeichnen die Inspektion."),
          typed("validationquestion", "Welche Frage stellt die Validierung im Unterschied zur Verifikation? Antworte mit einem Wort: Bauen wir das ... Ding?", ["richtige", "das richtige", "richtige Ding"], "Validierung fragt, ob es die richtigen Anforderungen sind. Verifikation fragt, ob richtig gearbeitet wurde.", "ein Wort"),
          single("resign", "Nach einer Änderung der Kontextannahmen hält das Team die frühere Freigabe für ausreichend. Wie beurteilst du das?", ["Richtig, eine Freigabe gilt bis zum Projektende", "Falsch, bei geänderten Anforderungen oder Annahmen muss erneut validiert werden", "Richtig, wenn die Unterschrift vorliegt", "Egal, Validierung betrifft nur den Code"], 1, "Validierung ist keine einmalige Station. Geänderte Annahmen können vorher korrekte Anforderungen falsch machen.")
        ]),

        S("Usability, UX und UCD: die Definitionen aus dem Workshop", "HS26_ASE_UX und UCD.pdf, Folien 6–11",
          "Der Workshop arbeitet mit Normen. Diese Zuordnung ist klein, aber prüfbar.",
          tnote(["Norm", "Inhalt"], [
            ["ISO 9241 Teil 11", "Begriffsdefinitionen, unter anderem Gebrauchstauglichkeit"],
            ["ISO 9241 Teil 210", "Der UCD-Prozess, menschzentrierte Gestaltung interaktiver Systeme"],
            ["ISO 9241 Teil 110", "Leitlinien für Gestaltung und Evaluation"]
          ], "Normenübersicht aus Folie 6."),
          note("def", "Gebrauchstauglichkeit nach DIN EN ISO 9241-11", "«Das Ausmass, in dem ein Produkt durch bestimmte Benutzer in einem bestimmten Nutzungskontext genutzt werden kann, um bestimmte Ziele effektiv, effizient und zufriedenstellend zu erreichen.»"),
          "Der Workshop zerlegt diesen Satz Teil für Teil. Jedes Stück ist eine Aufgabe für dich als Requirements Engineer:",
          tnote(["Satzteil", "Was er von dir verlangt"], [
            ["«Das Ausmass»", "Es ist eine messbare Grösse, keine Eigenschaft ja oder nein"],
            ["«ein Produkt»", "Kann auch ein Service sein"],
            ["«bestimmte Benutzer»", "Zielgruppen definieren"],
            ["«bestimmter Nutzungskontext»", "Umgebung, Gerät, Einschränkungen festhalten"],
            ["«bestimmte Ziele»", "Was will die Zielgruppe? Lässt sich das Ziel überhaupt erreichen?"],
            ["«effektiv, effizient, zufriedenstellend»", "Drei getrennte Dimensionen, getrennt messen"]
          ], "Zerlegung wie auf Folie 8."),
          note("warn", "Usability ist nicht UX", "Usability ist das messbare Ausmass der Zielerreichung. UX umfasst darüber hinaus **alle Eindrücke und das Erlebnis** bei der Interaktion, auch nicht-digital, und hängt vom psychischen und physischen Zustand, von Erfahrungen, Einstellungen, Fertigkeiten und Persönlichkeit ab. Eine perfekt bedienbare Anwendung kann ein schlechtes Erlebnis sein.")),

        S("Die drei Usability-Dimensionen, exakt definiert", "HS26_ASE_UX und UCD.pdf, Folie 9",
          "Hier lohnt es sich, die genauen Formulierungen zu kennen, weil Effektivität und Effizienz oft verwechselt werden.",
          cards(
            ["Effektivität", "Die Genauigkeit und Vollständigkeit, mit der Benutzer ein bestimmtes Ziel erreichen. Frage: Ist das Ziel überhaupt und korrekt erreicht?"],
            ["Effizienz", "Der im Verhältnis zur Genauigkeit und Vollständigkeit eingesetzte Aufwand. Frage: Was hat es gekostet?"],
            ["Zufriedenheit", "Freiheit von Beeinträchtigungen und positive Einstellung gegenüber der Benutzung. Frage: Wie war es?"]
          ),
          note("exam", "Die Unterscheidungsfrage", "Ein Benutzer gibt das Gebot korrekt ab, braucht aber 14 unnötige Klicks. **Effektivität erfüllt, Effizienz schlecht.** Umgekehrt: Er klickt sehr schnell, gibt aber den falschen Betrag ein. Effizienz hoch, **Effektivität verfehlt**."),
          reveal("Warum ist Effizienz im Verhältnis zur Genauigkeit definiert und nicht absolut?",
            "Weil schneller Unsinn keine Effizienz ist. Die Definition verknüpft den Aufwand mit dem erreichten Ergebnis.",
            "Praktisch heisst das: Du kannst Effizienz nicht messen, ohne gleichzeitig Effektivität zu messen. Eine Zeitmessung ohne Erfolgsquote ist wertlos.")),

        S("Der UCD-Prozess und seine Grundsätze", "HS26_ASE_UX und UCD.pdf, Folien 11–15",
          note("def", "UCD nach dem Workshop", "«User Centered Design (UCD) ist ein multidisziplinärer Ansatz zur Entwicklung von interaktiven Systemen, der die Nutzer:innen ins Zentrum stellt. Das Ziel ist, die Systeme durch iterative Entwicklung und Einbezug der Nutzer:innen so benutzungsfreundlich wie möglich zu gestalten.»"),
          flow("Planung", "Nutzungskontext verstehen", "Nutzungsanforderungen spezifizieren", "Gestaltungslösungen erarbeiten", "Gegen die Anforderungen evaluieren"),
          "Die Evaluation kann zu **jeder** früheren Tätigkeit zurückführen, nicht nur zum vorherigen Schritt. Das ist der Kern der Iteration.",
          "Die sechs Grundsätze des UCD-Prozesses, die du nennen können solltest:",
          { list: [
            "Die Gestaltung beruht auf einem umfassenden Verständnis der Benutzer, Arbeitsaufgaben und Arbeitsumgebungen.",
            "Die Benutzer sind während Gestaltung und Entwicklung einbezogen.",
            "Verfeinern und Anpassen geschieht fortlaufend auf Basis menschzentrierter Evaluierung.",
            "Der Prozess ist iterativ.",
            "Die gesamte User Experience wird berücksichtigt.",
            "Im Gestaltungsteam sind fachübergreifende Kenntnisse und Perspektiven vertreten."
          ] },
          note("tip", "Die Planungsphase stellt drei Fragen", "An welchen Stellen im Entwicklungsprozess brauche ich Informationen von den Benutzern? Welche Art von Information (demografisch, mentales Modell, Wünsche, Feedback zu Prototypen)? Mit welchen Methoden komme ich daran?")),

        S("Nutzungskontext und Nutzungsanforderungen", "HS26_ASE_UX und UCD.pdf, Folien 20–27",
          "Der Nutzungskontext wird im Workshop als Dreieck mit einer Umgebung dargestellt. Alle vier Elemente musst du beschreiben.",
          cards(
            ["Benutzer:in", "Wer ist es? Erfahrung, Fertigkeiten, Einschränkungen."],
            ["Aufgabe / Ziel", "Was will diese Person erreichen?"],
            ["Werkzeug / System", "Womit arbeitet sie, auch neben deinem System?"],
            ["Umfeld / Umwelt", "Wo und unter welchen Bedingungen? Lärm, Zeitdruck, Gerät."]
          ),
          tnote(["Methode zur Erhebung des Nutzungskontextes", "Besonderheit"], [
            ["Interview", "Tiefe, gut für Gründe"],
            ["Workshop", "Mehrere Sichten gleichzeitig"],
            ["(Online-)Fragebogen", "Breite, viele Teilnehmende"],
            ["Contextual Inquiry", "Befragung am Arbeitsplatz während der echten Arbeit"]
          ], "Methodenliste aus Folie 21."),
          "Im Beispielprojekt StudiPortal wurden alle vier eingesetzt: etwa 20 Interviews mit Studierenden, Workshops mit Sekretariaten, ein Online-Fragebogen an alle Studierenden und Contextual Inquiry bei drei Mitarbeiterinnen.",
          tnote(["Methode für Nutzungsanforderungen", "Format", "Ziel"], [
            ["Personas", "Prototypische Benutzer", "Unterschiedliche Benutzungsgruppen charakterisieren"],
            ["Szenarien", "Konkretes Beispiel der Systemnutzung", "Die Anwendung im realen Kontext beschreiben"],
            ["Use Cases", "Beschreibung des Systemverhaltens", "Funktionales Verhalten für die Entwicklung spezifizieren"]
          ], "Tabelle wörtlich nach Folie 25."),
          note("warn", "Konflikte zwischen Nutzungsanforderungen", "Der Workshop nennt zwei typische Paare: **Genauigkeit gegen Geschwindigkeit** und **Übersichtlichkeit gegen Informationsfülle**. Verlangt wird, dass diese Konflikte gelöst und dass Grundprinzipien, Faktoren und Gewichtungen der Kriterien dokumentiert werden, die im Konfliktfall gelten. Das ist dieselbe Logik wie bei der Konfliktdokumentation in Kapitel 4.3.")),

        S("Gestaltungslösungen: Card Sorting und Prototypen", "HS26_ASE_UX und UCD.pdf, Folien 28–34",
          "Der Workshop trennt zwei Gestaltungsebenen, und jede hat ihre Methode.",
          compare(
            "Struktur und Navigation", [
              "Wie sind Inhalte angeordnet, wie bewegt man sich dazwischen?",
              "Beispielmethode: **Card Sorting**.",
              "Ziel: Einblick in das mentale Modell der Benutzer, Vorschläge für die Menüstruktur."
            ],
            "Darstellung", [
              "Wie sieht die Seite aus, wie ist das Layout gegliedert?",
              "Beispielmethode: **Prototyping**.",
              "Ziel: Aspekte der Benutzerschnittstelle entwerfen, evaluieren, verbessern, bevor ein lauffähiges System existiert."
            ],
            "Beide Methoden sind Entwurf und Validierung gleichzeitig: Du erzeugst etwas und lernst daraus."),
          tnote(["Card Sorting", "Kategorien", "Eignet sich für"], [
            ["Geschlossen", "Werden vorgegeben", "Prüfen, ob eine geplante Struktur zum Denken der Benutzer passt"],
            ["Offen", "Teilnehmende erstellen und benennen sie selbst", "Herausfinden, wie Benutzer überhaupt gruppieren würden"]
          ], "Unterscheidung nach Folie 29. Optional dürfen Teilnehmende neue Karten erstellen oder bestehende aussortieren."),
          "Die sechs Dimensionen eines UI-Prototyps. Du wählst sie nach der Frage, die du klären willst:",
          tnote(["Dimension", "Entscheidungsfrage"], [
            ["Funktionsumfang", "Ausgewählte Ausschnitte oder der gesamte Umfang?"],
            ["Funktionstiefe", "Nur angedeutet oder mit Zwischenschritten und Resultaten?"],
            ["Darstellungstreue", "Wie ähnlich dem Look and Feel des Endprodukts?"],
            ["Interaktivität", "Lauffähige Beispiele oder statische Darstellungen?"],
            ["Datengehalt", "Echte Daten, realistische Beispiele oder Platzhalter?"],
            ["Technische Reife", "Zielplattform-Technologie oder einfaches Zeichenwerkzeug?"]
          ], "Dimensionen wörtlich nach Folien 33 und 34."),
          note("exam", "Die Standardfalle", "Ein Papierprototyp mit niedriger technischer Reife und Platzhalterdaten kann die Navigation klären. Er beweist **nichts** über Datenbankdurchsatz, Antwortzeiten oder Sicherheit. Prüfungsfragen bauen gern eine Behauptung dieser Art ein.")),

        S("Evaluation: Experten oder Benutzer?", "HS26_ASE_UX und UCD.pdf, Folien 40–42",
          compare(
            "Expertenevaluation", [
              "Usability-Experten beurteilen aufgrund von Erfahrung, Wissen und etablierten Prinzipien oder Heuristiken.",
              "Schnell und ohne Testpersonen möglich.",
              "Findet Verstösse gegen Prinzipien."
            ],
            "Benutzerevaluation (Usability-Test)", [
              "Ausgewählte Benutzer lösen Aufgaben mit einem Prototyp oder dem Produkt.",
              "Braucht Rekrutierung, Aufgaben und Auswertung.",
              "Findet echte Stolpersteine, auch unerwartete."
            ],
            "Beide finden Verschiedenes. Ein Experte sieht, was gegen Regeln verstösst. Ein Test zeigt, woran Menschen tatsächlich scheitern."),
          "Die fünf Merkmale eines Usability-Tests laut Workshop:",
          { list: [
            "Getestet wird von Personen, die **keine** Usability-Experten sind, sondern in der Regel der Zielgruppe entsprechen.",
            "Diese Versuchspersonen lösen typische Aufgaben in einem realitätsnahen Szenario.",
            "Das Testteam beobachtet beim Lösen und kann gegebenenfalls Hilfestellung geben.",
            "Der Test findet in der Regel unter kontrollierten Bedingungen statt und wird aufgezeichnet.",
            "Ziel: Schwierigkeiten in der Benutzung erkennen, die «Stolpersteine»."
          ] },
          tnote(["Vorteile", "Nachteile"], [
            ["Beobachten ist aufschlussreich und eindrücklich", "Laborsituation statt echter Umgebung"],
            ["Befragung und Beobachtung zugleich möglich", "Künstliches Verhalten, zum Beispiel sozial erwünschtes"],
            ["Objektive Datenerhebung, überzeugender für Stakeholder", "Teils teure Ausstattung, etwa Eye-Tracking"],
            ["Feedback echter Benutzer, hohe Aussagekraft", "Auswertung aufwändig, Subjektivität der Beobachtung"]
          ], "Vor- und Nachteile wörtlich nach Folie 42."),
          note("tip", "Der Bogen zurück zu Woche 2", "«Sozial erwünschtes Verhalten» taucht hier als Nachteil wieder auf. Dasselbe Phänomen, das Interviews verzerrt, verzerrt auch Usability-Tests. Und dieselbe Gegenmassnahme hilft: beobachten statt nach Lob fragen, Beleg und Deutung trennen.")),

        C("cp-ucd", "Den Workshop auf RE anwenden", "HS26_ASE_UX und UCD.pdf, Folien 6–42", [
          single("efficient", "Ein Benutzer gibt das richtige Gebot ab, braucht aber 14 unnötige Klicks. Welche Dimension ist betroffen?", ["Effektivität", "Effizienz", "Zufriedenheit", "Darstellungstreue"], 1, "Das Ziel ist korrekt und vollständig erreicht, also ist die Effektivität erfüllt. Der Aufwand im Verhältnis dazu ist schlecht, das ist Effizienz."),
          multi("test", "Welche ZWEI Merkmale kennzeichnen laut Workshop einen Usability-Test?", ["Die Versuchspersonen entsprechen der Zielgruppe und sind keine Usability-Experten", "Sie lösen typische Aufgaben in einem realitätsnahen Szenario", "Die Entwickler bewerten ihr eigenes Design", "Der Prototyp belegt damit auch den Datenbankdurchsatz"], [0,1], "Zielgruppe und realistische Aufgaben sind die Kernmerkmale. Entwickler, die ihr eigenes Design beurteilen, sind keine Benutzerevaluation."),
          single("cardsorting", "Du willst herausfinden, wie Studierende Inhalte überhaupt gruppieren würden, ohne ihnen eine Struktur vorzugeben. Welche Variante?", ["Geschlossenes Card Sorting", "Offenes Card Sorting", "Expertenevaluation", "A/B-Test"], 1, "Beim offenen Card Sorting erstellen und benennen die Teilnehmenden die Kategorien selbst. Geschlossen prüft eine vorgegebene Struktur."),
          typed("prototypedim", "Welche Prototyp-Dimension beschreibt, wie ähnlich der Prototyp dem Look and Feel des Endprodukts ist?", ["Darstellungstreue", "Die Darstellungstreue"], "Die sechs Dimensionen sind Funktionsumfang, Funktionstiefe, Darstellungstreue, Interaktivität, Datengehalt und technische Reife.", "Begriff"),
          single("iteration", "Die Evaluation zeigt, dass der angenommene Nutzungskontext falsch war. Was folgt?", ["Weitermachen, weil die Evaluation die letzte Phase ist", "Zur Kontextanalyse zurückkehren und die betroffenen Anforderungen und Entwürfe überarbeiten", "Nur die Farben überarbeiten", "Den Prototyp mit höherer Darstellungstreue neu bauen"], 1, "Der UCD-Prozess ist iterativ, und die Evaluation kann zu jeder früheren Tätigkeit zurückführen.")
        ]),

        S("Transfer: der Streit um das späte Gebot", `${H("4")}; ${W(4, "7–18")}; HS26_ASE_UX und UCD.pdf`,
          "Die Lage: Ein Verkäufer will Verlängerungen in letzter Sekunde. Ein Käufer schätzt einen vorhersehbaren Schluss. Der Support meldet verwirrende Statusmeldungen. Ein Prototyp zeigt, dass Nutzer dasselbe Gebot mehrfach absenden.",
          reveal("Beschreibe einen schlüssigen nächsten RE-Zyklus mit allen vier Tätigkeiten.",
            "**Quellen:** Verkäufer, Käufer und Support sind drei Stakeholder mit unterschiedlicher Relevanz. Prüfe über das Zwiebelmodell, ob jemand fehlt, zum Beispiel der Betrieb oder die Zahlungsorganisation.",
            "**Ermitteln:** Die Mehrfachgebote sind eine Beobachtung, kein Bedürfnis. Frage nach dem Grund. Vermutung: fehlende Rückmeldung nach dem Absenden, also möglicherweise ein Basisfaktor, der fehlt.",
            "**Konflikt:** Verlängerung gegen vorhersehbaren Schluss ist ein Sachkonflikt, weil beide Seiten tatsächlich verschiedene Bedürfnisse haben. Varianten oder eine klare, vereinbarte Regel sind plausibler als ein Kompromiss in der Mitte. Entscheidungsverfahren vorher vereinbaren und die Begründung dokumentieren.",
            "**Validieren:** Die geänderte Schlussregel als Text und Zustandsmodell aktualisieren, Testfälle für Normal- und Fehlerfall ableiten (Beispielentwicklung), und den neuen Ablauf mit einem Prototyp und realistischen Aufgaben prüfen.",
            "Zum Schluss: verbleibende Annahmen festhalten, zum Beispiel die Annahme über die Serverzeit als verbindliche Zeitquelle.")),

        S("Transfer: eine Technik klärt nicht alles", H("4.1–4.4"),
          "Eine Umfrage meldet 88 Prozent Zufriedenheit. Ein Betreiber warnt gleichzeitig, dass bei Ausfällen Ereignisse verloren gehen. Das Team will die Ermittlung abschliessen.",
          reveal("Warum ist das verfrüht? Nenne drei unabhängige Gründe.",
            "**Stichprobe und Formulierung:** Eine Umfrage erfasst nur, wer teilgenommen hat, und nur, was gefragt wurde. Niemand kann über einen Ausfall berichten, der nicht erfragt wurde.",
            "**Andere Quellenkategorie:** Der Betreiber ist eine relevante Quelle für ein ganz anderes Anliegen. Zufriedenheit der Käufer und Datenverlust bei Ausfällen sind nicht dieselbe Frage.",
            "**Art des Bedürfnisses:** Verlustfreiheit ist ein klassischer Basisfaktor. Er erzeugt keine Zufriedenheit, wenn er erfüllt ist, und Ablehnung, wenn er fehlt. Eine Zufriedenheitsumfrage kann ihn gar nicht messen.",
            "Nächste Schritte: Ausfälle mit Interviews und vorhandenen Belegen (Tickets, Logs) untersuchen, das nötige Verhalten und die Qualitätskriterien spezifizieren, und mit passenden Methoden validieren.")),

        S("Selbstcheck Woche 4 und der restliche Prüfungsstoff", `${H("4")}; ASE_Oktober_2026_Lernziele.md`,
          check([
            "Ich kann die drei Quellenkategorien mit je zwei Beispielen nennen.",
            "Ich kann Quelle und Technik sauber unterscheiden.",
            "Ich kann das Zwiebelmodell und das Schneeballprinzip erklären, inklusive Abbruchkriterium.",
            "Ich kann interne und externe Benutzer unterscheiden und sagen, warum externe anders erreicht werden.",
            "Ich kann die Attribute einer Stakeholderliste nennen und die vier Quadranten von Einfluss und Motivation mit Strategie.",
            "Ich kann Ziele nach SMART prüfen und einen Zielkonflikt dokumentieren.",
            "Ich kann die drei Kano-Faktoren mit allen Bezeichnungen und der Doppelfrage erklären.",
            "Ich kann für eine Situation eine Ermittlungstechnik auswählen und die Wahl begründen.",
            "Ich kann Erhebungs- von Entwurfs- und Ideenfindungstechniken unterscheiden.",
            "Ich kann sechs Konfliktarten erkennen und fünf Lösungsansätze mit Risiko nennen.",
            "Ich weiss, dass das Entscheidungsverfahren vorher vereinbart wird.",
            "Ich kann die drei Validierungsfamilien unterscheiden und Walkthrough von Inspektion abgrenzen.",
            "Ich kann Effektivität, Effizienz und Zufriedenheit mit den genauen Definitionen trennen.",
            "Ich kann den UCD-Prozess mit fünf Schritten und die sechs Grundsätze nennen.",
            "Ich kann offenes von geschlossenem Card Sorting unterscheiden und die sechs Prototyp-Dimensionen nennen."
          ]),
          note("exam", "Was nach diesen vier Wochen noch fehlt", [
            "Die Prüfung am 28. Oktober deckt SW1 bis SW6 ab, also auch Stoff, den es als Lerncoach-Woche noch nicht gibt.",
            "Selbst dazulernen: **Kapitel 5** Prozess und Arbeitsstruktur (RE-Prozesskonfiguration, Einflussfaktoren), **Kapitel 6** Requirements Management (Status- und Lebenszyklusmodelle, Version, Konfiguration, Baseline, Attribute und Sichten, Verfolgbarkeit, Änderungen, Priorisierung) und **Kapitel 7** Werkzeugunterstützung (Werkzeugkategorien, Erfolgsfaktoren und Risiken bei der Einführung).",
            "Dazu mindestens zwei offizielle Self-Assessments unter Zeitdruck. Die Links stehen im Prüfungsleitfaden, der in jedem deutschen ASE1-Wochenquiz verlinkt ist.",
            "Formatregeln nicht vergessen: bei P-Fragen nie mehr Antworten markieren als verlangt, sonst gibt es null Punkte für die ganze Frage."
          ]))
      ] }
    ]
  });
})();
