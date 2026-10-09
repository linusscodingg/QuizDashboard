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
        S("Was gehört zum System?", `${W(2, "3–14")}; ${H("2.2.4, 3.4.2")}`,
          "Diese Woche verbindet zwei Aufgaben: festlegen, was gebaut wird, und herausfinden, was Menschen brauchen. Kontextmodelle decken Fragen auf; Interviews helfen, sie zu beantworten.",
          note("exam", "Priorität", "In einem Fall Systemgrenze, Kontextgrenze und Scope unterscheiden können. Formulierung von Interviewfragen und Verzerrungen (bias) sind praktische ASE1-Anwendungen von Ermittlung und gemeinsamem Verständnis.")),
        S("Zwei Grenzen, zwei Fragen", H("2.2.4, S. 24–26"),
          table(["Grenze", "Trennt", "Eigenes Auktionsbeispiel"], [
            ["Systemgrenze (system boundary)", "Das System von seinem umgebenden Kontext", "Gebotsanwendung gegenüber externem Zahlungsdienst"],
            ["Kontextgrenze (context boundary)", "Relevante von irrelevanter Umgebung", "Zahlungsregeln sind relevant; ein fremdes Büro-Buchungssystem nicht"]
          ]), "Ein Element ausserhalb des Systems kann trotzdem entscheidende Anforderungen stellen. Irrelevant heisst irrelevant für dieses System und seine Anforderungen, nicht allgemein unwichtig."),
        S("Scope bedeutet Gestaltungsfreiheit", H("2.2.4, S. 24–25"),
          "Der Scope ist der Bereich, den das Projekt gestalten oder entwerfen kann. Er deckt sich oft mit der Systemgrenze, muss es aber nicht.",
          "Eigenes Beispiel: Eine feste, wiederverwendete Bibliothek kann innerhalb des Systems liegen, aber ausserhalb der Gestaltungsfreiheit des Projekts. Ein Supportablauf ausserhalb der Software kann im Rahmen des Projekts geändert werden.",
          reveal("Kann etwas gleichzeitig im System und ausserhalb des Scopes liegen?", "Ja. Eine verbindlich unverändert zu übernehmende Komponente ist das Standard-Gegenbeispiel. Lage und Befugnis zur Änderung sind verschiedene Fragen.")),
        C("cp-boundaries", "Relevanz und Kontrolle trennen", H("2.2.4"), [
          single("payment", "Ein externer Zahlungsdienst bestimmt die Formate der Bestätigungen. Wohin gehört er?", ["In die Anwendung, weil er wichtig ist", "In den relevanten Kontext ausserhalb der Anwendung", "In die irrelevante Umgebung, weil er extern ist"], 1, "Relevanz bedeutet nicht Zugehörigkeit zum System."),
          multi("scope", "Welche ZWEI Aussagen können zutreffen?", ["Eine feste wiederverwendete Komponente liegt im System, aber ausserhalb des Scopes", "Ein neu gestalteter externer Ablauf liegt im Scope", "Jedes externe Element ist irrelevant", "Systemgrenze und Scope sind Synonyme"], [0,1], "Der Scope drückt Gestaltungsfreiheit aus; die Systemgrenze drückt die Zugehörigkeit zum System aus."),
          single("context", "Eine neu entdeckte externe Regel beeinflusst die Annahme von Geboten. Welche Einordnung muss überdacht werden?", ["Ob die Regel zum relevanten Kontext gehört", "Nur die Farbpalette der UI", "Nur die Jobtitel des Teams"], 0, "Neue Erkenntnisse können die Kontextgrenze und die Anforderungen verändern.")
        ]),
        S("Ein Kontextmodell soll nützliche Fragen beantworten", `${W(2, "13–14")}; ${H("3.4.2")}`,
          "Setze das System in die Mitte. Bestimme externe Akteure und Systeme und beschrifte, was über jede Schnittstelle fliesst. Eine beschriftete Gebotsanfrage mit Annahmeantwort sagt mehr als eine unerklärte Linie.",
          table(["Eigenes Beispielelement", "Beziehung zur Plattform", "Aufgedeckte Frage"], [
            ["Bieter", "Gibt Gebot ab / erhält Status", "Was gilt als vor der Frist eingegangen?"],
            ["Zahlungsdienst", "Autorisierungsanfrage / Ergebnis", "Was passiert, wenn er nicht verfügbar ist?"],
            ["Supportpersonal", "Untersucht strittige Gebote", "Welche Belege müssen aufbewahrt werden?"]
          ]), "Eine Kontextsicht zeigt Beziehungen und Anforderungsquellen; sie ist keine vollständige Verhaltensspezifikation und kein detailliertes Screendesign."),
        S("Kernsystem und erweitertes System", `${W(2, "14")}; Activities week 4 Tasks.pdf, Aufgaben 3–4`,
          "Die Softwaresicht zeigt vielleicht eine Kernanwendung. Ein Kunde kann dagegen die Anwendung samt Menschen und Abläufen als grösseren Service sehen. Beide Sichten können nützlich sein, wenn ihre Grenzen ausdrücklich festgelegt sind.",
          "Eigenes Beispiel: Die Software erfasst einen Streitfall, während zum erweiterten Auktionsservice eine Person gehört, die ihn entscheidet. Wird diese Entscheidung in die Software verlagert, ändern sich Verantwortung, Risiko und benötigte Informationen.",
          reveal("Warum die Grenze vereinbaren, bevor Anforderungen zugeordnet werden?", "Sonst verspricht das Team womöglich ein Ergebnis, das von einem externen Akteur abhängt, den es weder baut noch kontrolliert.")),
        S("Domänenannahmen verbinden Software und Realität", H("2.2.4, S. 25–26"),
          "Das System arbeitet mit Eingaben und Schnittstellen, während sich die Ziele der Stakeholder oft auf die reale Welt beziehen. Eine Annahme (assumption) verbindet beides.",
          "Eigenes Beispiel: Lieferbenachrichtigungen sind nur sinnvoll, wenn der externe Lieferdienst korrekte Ereignisse liefert. Eine Softwareanforderung aufzuschreiben macht diese Annahme nicht wahr.",
          note("tip", "Die Abhängigkeit sichtbar machen", "Halte die Annahme fest, bestimme ihre Quelle und Verantwortliche, validiere ihre Plausibilität und entscheide, wie mit Fehlern umgegangen wird.")),
        C("cp-contextmodel", "Einen Kontext kritisch lesen", `${H("2.2.4, 3.4.2")}; ${W(2, "13–14")}`, [
          single("model", "Welches Detail gehört am direktesten in ein Kontextmodell?", ["Private Hilfsmethoden", "Eine Schnittstelle zur Zahlungsautorisierung", "Der genaue Eckenradius eines Buttons"], 1, "Externe Interaktionen verorten das System in seiner Umgebung."),
          multi("assumptions", "Wähle ZWEI zutreffende Schlussfolgerungen zu einer Annahme über Lieferereignisse.", ["Ihr Versagen kann ein Stakeholder-Ziel untergraben", "Ihre Plausibilität sollte validiert werden", "Das Aufschreiben beweist, dass sich der externe Dienst korrekt verhält", "Sie ist irrelevant, weil sie ausserhalb der Software liegt"], [0,1], "Kontextabhängigkeiten können entscheiden, ob das Systemverhalten das beabsichtigte Ergebnis erreicht."),
          single("perspective", "Zwei Modelle platzieren ein Supportteam auf verschiedenen Seiten der Grenze. Was prüfst du zuerst?", ["Ob sie dasselbe System auf derselben Ebene modellieren", "Welches Diagramm mehr Kästchen hat", "Wer den neueren Laptop besitzt"], 0, "Eine Softwaresicht und eine breitere Servicesicht können bewusst unterschiedliche Grenzen haben.")
        ]),
        S("Ein Arbeitsprodukt trägt das Ergebnis", `${W(2, "10–12")}; ${H("3.1.1")}`,
          "Ein Arbeitsprodukt (work product) ist ein festgehaltenes Arbeitsergebnis, ob Zwischen- oder Endergebnis. Ein Interviewprotokoll, ein Kontextdiagramm und eine strukturierte Spezifikation sind Beispiele. Ein nicht festgehaltener Gedanke ist kein Arbeitsprodukt.",
          table(["Facette", "Nützliche Planungsfrage"], [["Zweck", "Wer braucht das, und für welche Entscheidung?"],["Umfang", "Eine einzelne Anforderung oder eine zusammenhängende Sammlung?"],["Darstellung", "Text, Vorlage, Modell oder Prototyp?"],["Lebensdauer", "Temporär, sich entwickelnd oder dauerhaft?"],["Ablage", "Wo finden die Beteiligten die aktuelle Version?"]])),
        S("Ein exploratives Interview vorbereiten", W(2, "3, 8"),
          "Geh von der Projektbeschreibung und dem aus, was darin fehlt. Sammle Fragen über Untergruppen hinweg, damit Annahmen aus Frontend-Sicht keine Betriebs- oder Datenbedürfnisse verdecken.",
          flow("Antrag lesen und Lücken bestimmen", "Interviewziele und neutrale Fragen vereinbaren", "Rollen für Leitung, Protokoll und Beobachtung verteilen", "Durchführen, nachfragen und zusammenfassen", "Ergebnisse bestätigen und offene Fragen festhalten"),
          "Das ist eine praktische Vorbereitungsreihenfolge. RE als Ganzes bleibt iterativ."),
        S("Offene Fragen und gezieltes Nachfragen", `${W(2, "5–8")}; ${H("4.2.2")}`,
          { compare: { left: { title: "Erkunden", points: ["Erzählen Sie mir, wie Sie das letzte Mal ein Gebot abgegeben haben.", "An welcher Stelle wurden Sie unsicher?"] }, right: { title: "Präzisieren", points: ["War die Bestätigung sichtbar, bevor Sie die Seite verlassen haben?", "Gilt diese Regel auch, wenn die Verbindung abbricht?"] } } },
          "Offene Fragen erschliessen den Kontext; geschlossene Fragen bestätigen Einzelheiten. Keine Art ist grundsätzlich besser. Fasse das Gehörte in eigenen Worten zusammen und gib der Person Zeit, es zu korrigieren oder zu ergänzen."),
        C("cp-interview", "Vorbereiten und fragen", W(2, "3–8"), [
          order("sequence", "Bringe diese Abfolge zur Vorbereitung und Nachbereitung eines Interviews in die richtige Reihenfolge.", ["Lücken im Projektantrag bestimmen", "Fragen vorbereiten und Rollen verteilen", "Interview führen und Antworten präzisieren", "Ergebnisse bestätigen und offene Fragen dokumentieren"], "Die Vorbereitung zielt auf Unsicherheit; die Nachbereitung macht aus dem Gespräch brauchbare Belege."),
          single("open", "Welche Frage erkundet die aktuelle Arbeit am besten, ohne eine Antwort vorzugeben?", ["Sie mögen unsere schnelle Oberfläche, oder?", "Ist A oder B offensichtlich besser?", "Bitte beschreiben Sie, wie Sie heute den Status eines Gebots prüfen."], 2, "Die Frage lädt zu einer Beschreibung ein, ohne eine vorgeschlagene Lösung zu loben."),
          multi("record", "Welche ZWEI Ergebnisse sind nach dem Interview nützlich?", ["Ein Protokoll der Fragen und Antworten", "Ausdrücklich offene Punkte und Folgeaufgaben", "Nur eine Liste bevorzugter Technologien", "Die Behauptung, alle Anforderungen seien jetzt vollständig"], [0,1], "Die Belege und die verbleibenden Lücken werden für die weitere RE-Arbeit gebraucht.")
        ]),
        S("Soziale Erwünschtheit (social desirability bias)", W(2, "5"),
          "Menschen schwächen Kritik aus Höflichkeit oft ab. «Wir haben so hart an dieser einfachen Oberfläche gearbeitet» macht es schwerer zu sagen, dass sie verwirrend war.",
          reveal("Formuliere um: «Unser verbessertes Design macht Bieten einfach. Wie viel besser ist es?»", "Besser: «Bitte beschreiben Sie, wie Sie dieses Gebot abgegeben haben. Was hat Ihnen geholfen, und was hat Schwierigkeiten bereitet?» Behaupte keine Verbesserung, bevor du Belege gesammelt hast.")),
        S("Erwartungseffekt (expectation bias)", W(2, "6–7"),
          "Beobachter deuten dieselbe Bemerkung womöglich so, wie sie es erwartet haben. «Das hat länger gedauert» beweist nicht, dass die UI, das Backend oder die Einstellung der Person verantwortlich war.",
          { compare: { left: { title: "Beobachtung", points: ["Die Person brauchte 50 Sekunden und öffnete den Hilfetext erneut."] }, right: { title: "Hypothese", points: ["Die Beschriftung ist vielleicht unklar. Durch Nachfragen und weitere Beobachtungen prüfen."] } } },
          "Halte Beleg und Deutung getrennt. Diskussion im Team und Rückfragen an die Person können voreilige Schlüsse aufdecken."),
        S("Eigener Transfer: ein fehlender Stakeholder", `${W(2, "8, 13–14")}; ${H("2.2.2–2.2.4")}`,
          "Ein Team hat Käufer und Verkäufer interviewt. Das Kontextmodell zeigt Zahlung und Lieferung, aber niemand hat an strittige oder fehlgeschlagene Zahlungen gedacht.",
          reveal("Was solltest du als Nächstes tun?", "Support, Betrieb und Vertreter des Zahlungsdienstes als zusätzliche Quellen untersuchen. Die relevanten Interaktionen ergänzen, Unbekanntes festhalten und nach konkreten Fehlerfällen fragen. Die Grenze erneut prüfen, wenn Verantwortlichkeiten unklar sind.")),
        C("cp-bias", "Beleg und Deutung unterscheiden", W(2, "5–8"), [
          single("polite", "Eine Person lobt ein Design, nachdem ihr gesagt wurde, wie viel Aufwand darin steckt. Welche Verzerrung ist besonders plausibel?", ["Soziale Erwünschtheit", "Nachgewiesene Abwesenheit von Verzerrung", "Beweis für technische Korrektheit"], 0, "Die Einleitung kann eine sozial gefällige Antwort begünstigen."),
          multi("evidence", "Wähle ZWEI nützliche Schutzmassnahmen gegen den Erwartungseffekt.", ["Beobachtbare Ereignisse getrennt von Erklärungen festhalten", "Die Person bitten zu klären, was passiert ist", "Nur Belege behalten, die die erste Theorie stützen", "Jedes Zögern als Widerstand gegen Veränderung deuten"], [0,1], "Beobachtungen und Deutungen trennen, dann die Erklärungen prüfen."),
          single("silence", "Der Kunde macht nach einer Antwort eine Pause. Was kann eine kurze Pause des Interviewers bewirken?", ["Zustimmung garantieren", "Zeit zum Nachdenken und für weitere Details geben", "Alle Nachfragen ersetzen"], 1, "Abwarten und Zusammenfassen können vollständigere Antworten fördern, garantieren aber keine Vollständigkeit.")
        ]),
        S("Eigener Transfer: ein unveränderliches Subsystem", H("2.2.4"),
          "Die Plattform enthält eine bestehende Identitätskomponente, die unverändert bleiben muss. Das Projekt darf den Ablauf neu gestalten, mit dem der Betreiber Konten wiederherstellt.",
          reveal("Erkläre Systemgrenze, Scope und Kontext für diesen Fall.", "Die Identitätskomponente kann im Softwaresystem liegen und trotzdem ausserhalb des Änderungsscopes. Der Ablauf des Betreibers kann ausserhalb der Softwaregrenze liegen und trotzdem im Projektscope. Beides ist wichtig, wenn die Anforderungen an die Wiederherstellung spezifiziert werden.")),
        C("cp-w2final", "Aus dem Kontext einen RE-Plan machen", `${H("2.2.4, 3.1.1")}; ${W(2, "8–14")}`, [
          single("artifact", "Was ist ein Arbeitsprodukt?", ["Eine nicht festgehaltene Annahme", "Der Vorgang des Nachdenkens", "Ein gespeichertes Kontextdiagramm"], 2, "Ein Arbeitsprodukt ist ein festgehaltenes Zwischen- oder Endergebnis."),
          multi("next", "Das Kontextmodell deckt einen unklaren Zahlungs-Timeout auf. Wähle ZWEI passende nächste Schritte.", ["Eine Quelle bestimmen, die den Timeout klären kann", "Das vereinbarte Verhalten festhalten und validieren", "Eine attraktive Zahl als offizielle Regel annehmen", "Die Schnittstelle entfernen, weil sie schwierig ist"], [0,1], "Modelle decken Lücken auf, die mit Belegen geschlossen werden müssen."),
          single("scopeagain", "Welche Frage bestimmt den Scope am direktesten?", ["Was kann dieses Projekt gestalten oder entwerfen?", "Was existiert irgendwo auf der Welt?", "Was steht in irgendeinem Kästchen eines Diagramms?"], 0, "Beim Scope geht es um Gestaltungsfreiheit, nicht nur um die Lage in einer Grafik.")
        ]),
        S("Selbstcheck Woche 2", `${W(2, "3–14")}; ${H("2.2.4, 3.1.1")}`,
          check(["Beide Grenzen zeichnen und erklären.", "Einen Fall nennen, in dem der Scope von der Systemgrenze abweicht.", "Schnittstellen und Domänenannahmen sichtbar machen.", "Neutrale Interviewfragen und sinnvolles Nachfragen vorbereiten.", "Beobachteten Beleg von einer vorgeschlagenen Erklärung unterscheiden."]),
          "Als Nächstes: die passende Dokumentation wählen und erkennen, was ein Modell zeigen kann und was nicht.")
      ] },
      { id: "w3", number: 3, title: "Arbeitsprodukte, Dokumentation und Modellverständnis", status: "ready", items: [
        S("Dokumentiere für die nächste Person, die die Anforderung braucht", `${W(3, "2–8")}; ${H("3.1")}`,
          "Die Vorlesung konzentriert sich auf Arbeitsprodukte und Kontextsichten. Das zugeordnete Kapitel 3 erweitert das um Sprache, Vorlagen und Modelle; diese gehören diese Woche zum Selbststudium.",
          "Der Zweck bestimmt Darstellung und Detaillierungsgrad. Eine Testerin braucht prüfbare Ergebnisse, ein Kunde verständliches Verhalten, und wer das System wartet, braucht nachvollziehbare Entscheidungen."),
        S("Temporär, sich entwickelnd und dauerhaft", `${W(3, "5")}; ${H("3.1.1, S. 34–36")}`,
          table(["Lebensdauer", "Beispiel", "Umgang"], [["Temporär (temporary)", "Eine Skizze, die während einer Diskussion entsteht", "Verwerfen, wenn sie nicht mehr nützlich ist"],["Sich entwickelnd (evolving)", "Eine verfeinerte Sammlung von Stories", "Verantwortliche, Status und Historie pflegen; Änderungen nach Bedarf steuern"],["Dauerhaft (durable)", "Freigegebene Spezifikation oder als Baseline festgelegtes Sprint-Backlog", "Metadaten erhalten und kontrollierte Änderungen verwenden"]]),
          "Dauerhaft heisst nicht physisch unzerstörbar oder für immer unverändert. Gemeint ist ein freigegebenes oder als Baseline festgelegtes Arbeitsprodukt, das kontrolliert verwaltet wird."),
        S("Detaillierung ist eine Risikoentscheidung", `${W(3, "6–7")}; ${H("3.1.2–3.1.3")}`,
          "Ein verteilt arbeitender Zulieferer mit wenig Domänenwissen und langsamem Feedback braucht mehr ausdrückliche Details als ein eng zusammenarbeitendes Team mit schnellem Feedback. Auch Regulierung und kritische Folgen können mehr Detail verlangen.",
          "Die Abstraktionsebene (abstraction level) fragt, welche Ebene von Anliegen du beschreibst; der Detaillierungsgrad (level of detail) fragt, wie präzise du sie beschreibst. Ein präzises Geschäftsziel kann trotzdem auf hoher Abstraktionsebene liegen.",
          reveal("Ist die längste Spezifikation immer die sicherste?", "Nein. Sie kostet Aufwand, kann Wichtiges verstecken und erzeugt Pflegeaufwand. Wähle genug Detail, um die relevanten Risiken zu beherrschen.")),
        C("cp-workproducts", "Das passende Arbeitsprodukt wählen", `${W(3, "3–7")}; ${H("3.1.1–3.1.3")}`, [
          single("baseline", "Eine freigegebene Anforderungsspezifikation wird unter Änderungskontrolle gepflegt. Welche Lebensdauer passt?", ["Temporär", "Dauerhaft", "Nicht festgehalten"], 1, "Freigegebene oder als Baseline festgelegte Arbeitsprodukte sind dauerhaft."),
          multi("detail", "Welche ZWEI Faktoren rechtfertigen tendenziell mehr ausdrückliche Details?", ["Wenig gemeinsames Domänenwissen", "Schwere Folgen von Missverständnissen", "Eine Regel, dass jedes Dokument gleich lang sein muss", "Die Anzahl Farben im Modell"], [0,1], "Der Detaillierungsgrad sollte auf Unsicherheit und Risiko antworten."),
          single("retain", "Eine Workshop-Skizze wird nun während des ganzen Projekts weiter verfeinert. Was ändert sich?", ["Sie kann zu einem sich entwickelnden Arbeitsprodukt mit Metadaten werden", "Sie ist kein Arbeitsprodukt mehr", "Sie wird automatisch zum endgültigen Vertrag"], 0, "Die Einordnung der Lebensdauer kann sich ändern, wenn sich die vorgesehene Verwendung ändert.")
        ]),
        S("Alle relevanten Aspekte abdecken", `${W(3, "8")}; ${H("3.1.4")}`,
          table(["Aspekt", "Eigene Auktionsfrage"], [["Struktur und Daten", "Welche Gebote gehören zu welchen Auktionen?"],["Funktion und Ablauf", "Wie wird ein Gebot geprüft und angenommen?"],["Zustand und Verhalten", "Was passiert mit einem neuen Gebot nach Auktionsschluss?"],["Qualität", "Wie schnell muss die Bestätigung unter einer bestimmten Last eintreffen?"],["Randbedingungen", "Welche Schnittstellen oder Plattformen sind vorgeschrieben?"],["Kontext und Grenze", "Welche externen Dienste und Annahmen sind relevant?"]]),
          "Getrennte Sichten helfen beim Denken. Halte sie konsistent: Das Zustandsmodell darf kein Gebot annehmen, das Ablauf und Text ablehnen."),
        S("Prüfbar und verständlich formulieren", H("3.2, S. 42–44"),
          "Natürliche Sprache ist ausdrucksstark und für alle zugänglich, aber Mehrdeutigkeiten und Auslassungen übersieht man leicht. Verwende kurze, strukturierte Sätze, einheitliche Begriffe und ausdrückliche Bedingungen.",
          reveal("Eigenes Beispiel: «Nach der Prüfung sollen die Daten schnell gesendet werden.» Was fehlt?", "Wer prüft was, welche Daten werden an wen gesendet, was löst das Senden aus, und was bedeutet «schnell» unter den relevanten Bedingungen? Kläre zuerst die Fakten, bevor du eine präzise Ersatzformulierung erfindest."),
          "Allaussagen wie «alle» müssen auf Ausnahmen geprüft werden. Passivformulierungen können einen Akteur verstecken; Nominalisierungen wie «Überprüfung» können einen nicht spezifizierten Prozess verbergen."),
        S("Vorlagen geben Struktur; sie beweisen keine Wahrheit", H("3.3"),
          "Eine Satzschablone (phrase template) fordert dich auf, Bedingung, System, Verbindlichkeit und Reaktion zu benennen. Eine Formularvorlage (form template) strukturiert einen Use Case. Eine Dokumentvorlage (document template) gliedert eine Spezifikation.",
          "Eigener Entwurf: «Wenn eine angenommene Auktion endet, soll die Plattform den Höchstbietenden benachrichtigen.» Offene Fragen bleiben: Was, wenn es kein gültiges Gebot gibt oder die Benachrichtigung fehlschlägt?",
          note("warn", "Den Inhalt prüfen", "Eine grammatikalisch vollständige Anforderung kann trotzdem das falsche Verhalten beschreiben. Validiere sie mit den relevanten Quellen.")),
        S("User Stories, Akzeptanzkriterien und Use Cases", H("3.3"),
          { compare: { left: { title: "User Story", points: ["Ein auf Stakeholder ausgerichteter Teil des Nutzens.", "Unterstützt das Gespräch; Akzeptanzkriterien (acceptance criteria) klären, was Erfolg bedeutet."] }, right: { title: "Use Case", points: ["Eine Systemfunktion aus Sicht eines Akteurs.", "Kann Vorbedingungen, Hauptablauf, alternative Abläufe und Ergebnisse beschreiben."] } } },
          "Eigene Story: «Als gelegentlicher Bieter möchte ich ein Gebot vor dem Absenden überprüfen, damit ich Fehler erkennen kann.» Ein prüfbares Akzeptanzbeispiel legt fest, was bei Bestätigen und Abbrechen passiert; es heisst nicht einfach «funktioniert gut»."),
        C("cp-language", "Dokumentationsmängel finden", H("3.2–3.3"), [
          single("quickly", "Was ist der Hauptmangel von «Das System antwortet schnell» für einen Performance-Abnahmetest?", ["Es benennt das System", "Das Antwortkriterium und die Bedingungen sind unklar", "Es ist keine funktionale Anforderung"], 1, "Ohne vereinbarte Kriterien und Bedingungen können verschiedene Tester unterschiedlich urteilen."),
          multi("templates", "Wähle ZWEI zutreffende Aussagen über Vorlagen.", ["Sie können auf fehlende Informationen hinweisen", "Sie können eine einheitliche Struktur unterstützen", "Sie garantieren die Zufriedenheit der Stakeholder", "Sie machen ein Glossar überflüssig"], [0,1], "Vorlagen unterstützen die Dokumentation, können aber allein keine Korrektheit herstellen."),
          single("alternative", "Ein Use Case enthält nur den Erfolgsfall. Was sollte untersucht werden?", ["Relevante Ausnahmen und alternative Abläufe", "Nur die Einheitlichkeit der Schriftart", "Wie man den Akteur entfernt"], 0, "Fehler- und Alternativfälle können wesentliche Anforderungen aufdecken.")
        ]),
        S("Modelle sind zweckgerichtete Abstraktionen", `${W(3, "9–12")}; ${H("3.4.1–3.4.2")}`,
          "Ein Modell wählt für einen bestimmten Zweck gezielt Aspekte der Realität aus. Die Syntax (syntax) sagt dir, welche Konstrukte verwendet werden dürfen; die Semantik (semantics) sagt, was sie bedeuten. Ein Diagramm kann syntaktisch korrekt und semantisch falsch sein.",
          table(["Bedarf", "Geeignetes Modell"], [["Externe Akteure und Schnittstellen", "Kontextsicht"],["Statische Entitäten und Beziehungen", "Klassen-/Domänenmodell"],["Von Akteuren genutzte Funktionen", "Use-Case-Modell"],["Reihenfolge und Nebenläufigkeit von Aktivitäten", "Aktivitätsmodell"],["Reaktionen, die vom aktuellen Zustand abhängen", "Zustandsmodell"]]),
          "Die Vorlesung lässt mehrere Notationen für den Kontext zu. Erkläre deine Notation und deinen Blickwinkel, statt zu behaupten, jedes Modell erfasse die ganze Domäne."),
        S("Assoziationen vom gegenüberliegenden Ende lesen", H("3.4.3"),
          "Eigenes textuelles Klassenmodell: `Auction 1 — 0..* Bid`. Jedes Gebot (Bid) gehört zu genau einer Auktion (Auction); eine Auktion kann null oder viele Gebote haben. Die Zahl bei Bid beantwortet, wie viele Gebote eine Auktion haben darf.",
          reveal("Erzwingt dieses Modell, dass jede Auktion ein Gebot hat?", "Nein. Die Untergrenze ist null. Mit 1..* müsste jede Auktion mindestens ein Gebot haben."),
          "Attribute beschreiben Eigenschaften; Assoziationen beschreiben Beziehungen; Generalisierung drückt eine Ist-ein-Beziehung aus. Ein Domänenmodell ist nicht automatisch ein Datenbankentwurf."),
        S("Use-Case-Diagramme zeigen Ziele, nicht Reihenfolgen", H("3.3, 3.4.4"),
          "Ein Akteur ist eine Rolle, die mit dem System interagiert; das kann eine Person oder ein anderes System sein. Use Cases benennen Systemfunktionalität, die für Akteure bedeutsam ist. Ein Diagramm verortet Akteure, Use Cases und die Systemgrenze.",
          "Eine Use-Case-Beschreibung ergänzt Ablauf und Bedingungen. Dass «Gebot abgeben» und «Ergebnisse ansehen» nebeneinander stehen, bedeutet nicht, dass sie in dieser Reihenfolge stattfinden.",
          reveal("Ein Akteur ist ausserhalb der Grenze gezeichnet. Ist er damit irrelevant?", "Nein. Akteure gehören zum relevanten Kontext. Das Diagramm stellt ihre Interaktion mit dem System dar.")),
        C("cp-models", "Die Bedeutung des Modells deuten", H("3.4.1–3.4.4"), [
          single("multiplicity", "Bei Auction 1 — 0..* Bid: Wie viele Auktionen gehören zu einem Gebot?", ["Null oder viele", "Genau eine", "Mindestens zwei"], 1, "Lies die Multiplizität am Ende von Auction aus Sicht eines einzelnen Gebots."),
          multi("usecase", "Welche ZWEI Dinge kann ein Use-Case-Diagramm direkt zeigen?", ["Akteure", "Mit Akteuren verbundene Systemfunktionalität", "Die genaue Ausführungsreihenfolge jeder internen Aktion", "Vollständige Abnahmegrenzwerte für die Performance"], [0,1], "Detaillierte Abläufe und Qualitätskriterien brauchen ergänzende Beschreibungen."),
          single("syntax", "Ein formal korrektes Diagramm verwendet für die vereinbarte Geschäftsregel die falsche Multiplizität. Welches Problem bleibt?", ["Seine Semantik passt nicht zur Domäne", "Kein Problem: korrekte Syntax beweist Korrektheit", "Es braucht nur einen grösseren Titel"], 0, "Die Einhaltung der Notation validiert die dargestellte Anforderung nicht.")
        ]),
        S("Entscheidungen, Zusammenführungen, Gabelungen und Synchronisationen", H("3.4.4"),
          table(["Konstrukt", "Bedeutung"], [["Entscheidung (decision)", "Eine Alternative anhand von Bedingungen wählen"],["Zusammenführung (merge)", "Alternative Pfade wieder vereinen, ohne nebenläufige Arbeit zu synchronisieren"],["Gabelung (fork)", "Parallele Pfade starten"],["Synchronisation (join)", "Parallele Pfade synchronisieren, bevor es weitergeht"]]),
          "Eigenes Beispiel: Nach Annahme eines Gebots parallel eine Quittung senden und eine Anzeige aktualisieren. Ein Join vor der nächsten Aktion verlangt, dass die relevanten parallelen Pfade abgeschlossen sind. Würde die Gabelung durch eine Entscheidung ersetzt, bedeutete das ein anderes Verhalten.",
          reveal("Warum ersetzt ein Merge keinen Join?", "Ein Merge nimmt einen eingehenden alternativen Pfad an; er wartet nicht, bis alle nebenläufigen Aktivitäten abgeschlossen sind.")),
        S("Der Zustand bestimmt die Bedeutung eines Ereignisses", H("3.4.5"),
          "Ein Zustandsmodell drückt ereignisabhängiges Verhalten aus. Ein Übergang (transition) kann einen Auslöser (trigger), eine Bedingung, die gelten muss (guard), und eine Aktion (action) haben. Dasselbe Ereignis kann in verschiedenen Zuständen zu unterschiedlichen Reaktionen führen.",
          "Eigenes Beispiel: `Open → Closed` bei Fristablauf. Ein Gebotsereignis wird nur in Open angenommen, wenn die Gültigkeitsbedingung erfüllt ist. Ein Gebot, das in Closed eintrifft, muss nach einer separat vereinbarten Regel behandelt werden.",
          reveal("Garantiert ein eintreffender Auslöser einen Übergang?", "Nein. Ausgangszustand und gegebenenfalls die Bedingung müssen ihn zulassen. Prüfe beides, bevor du den Folgezustand vorhersagst.")),
        S("Glossar und Dokumentstruktur", H("3.5–3.6"),
          "Ein Glossar legt vereinbarte Bedeutungen fest, behandelt Synonyme und macht Begriffe sichtbar, die gleich aussehen, aber Unterschiedliches bedeuten (Homonyme). Halte die Definitionen zugänglich und verwende sie einheitlich.",
          "Gliedere Dokumente nach Zielgruppe und Zweck. Verweise auf gemeinsame Fakten, statt sie zu duplizieren. Wiederholung schafft mehrere Stellen, die bei einer Regeländerung auseinanderlaufen können."),
        C("cp-flow", "Über Verhalten nachdenken", H("3.4.4–3.6"), [
          single("join", "Zwei parallele Prüfungen müssen vor der Freigabe abgeschlossen sein. Welches Konstrukt drückt das Warten auf beide aus?", ["Merge", "Join", "Decision"], 1, "Ein Join synchronisiert nebenläufige Pfade; ein Merge vereint Alternativen."),
          multi("transition", "Welche ZWEI Tatsachen können einen ausgelösten Zustandsübergang verhindern?", ["Das System ist nicht im Ausgangszustand", "Die Bedingung (guard) ist falsch", "Das Diagramm verwendet englische Beschriftungen", "Der Übergang hat eine Aktion"], [0,1], "Ein Auslöser genügt nicht ohne passenden Zustand und erfüllte Bedingung."),
          single("glossary", "Warum auf eine vereinbarte Definition verweisen, statt sie in viele Dokumente zu kopieren?", ["Um widersprüchliche Aktualisierungen zu vermeiden", "Damit man sie nicht verstehen muss", "Um alle künftigen Änderungen zu verhindern"], 0, "Verweise verringern redundante Inhalte und das Auseinanderlaufen bei der Pflege.")
        ]),
        S("Qualitätskriterien betreffen mehr als die Rechtschreibung", H("3.8"),
          "Prüfe, ob eine Anforderung die Bedürfnisse angemessen wiedergibt, notwendig, verständlich, eindeutig und prüfbar ist. Achte bei Sammlungen zusätzlich auf Konsistenz, angemessene Vollständigkeit, Änderbarkeit und Verfolgbarkeit (traceability).",
          "Eigenes Beispiel: Zwei für sich klare Aussagen verlangen nach einem verspäteten Gebot entgegengesetzte Aktionen. Klarheit allein macht die Sammlung nicht konsistent.",
          note("tip", "Eine nützliche Auswahl, keine allgemeingültige abschliessende Liste", "Wähle die Qualitätskriterien passend zum Arbeitsprodukt und zum Kontext. Der aktuelle Lehrplan stellt ausdrücklich klar, dass die empfohlenen Kriterien nicht abschliessend sind.")),
        S("Nachhaltigkeit: eine Kursanwendung von RE", "Activities week 3 Tasks.pdf, S. 1; Activities - Week 03 - interdisciplinary.pdf",
          "Im Workshop betrachtest du ökologische, soziale, individuelle, ökonomische und technische Nachhaltigkeit. Diese Dimensionen erweitern die Suche nach Bedürfnissen und Zielkonflikten; sie sind keine eigene CPRE-Prüfungseinheit.",
          table(["Dimension", "Eigenes mögliches Anliegen"], [["Ökologisch", "Energieverbrauch pro abgeschlossener Aufgabe"],["Sozial", "Zugang für verschiedene Nutzergruppen"],["Individuell", "Kognitive Belastung und Wohlbefinden"],["Ökonomisch", "Bezahlbarer Betrieb über die Zeit"],["Technisch", "Wartbarkeit und anhaltender Nutzen"]]),
          "Mach aus einem gewählten Anliegen eine Anforderung mit Quelle, Geltungsbereich und vereinbartem Nachweis der Erfüllung. Untersuche Zielkonflikte, statt alle Ziele automatisch für vereinbar zu erklären."),
        S("Eigener Transfer: vom vagen Anspruch zum Nachweis", H("3.1.4, 3.2, 3.8"),
          "Ein Kunde sagt: «Der Auktionsservice muss nachhaltig und benutzerfreundlich sein.» Das ist ein berechtigtes Anliegen, legt aber noch nicht fest, was geprüft werden soll.",
          reveal("Schlage einen nächsten RE-Schritt vor, ohne eine Einigung der Stakeholder zu erfinden.", "Betroffene Gruppen und konkrete Nutzungssituationen bestimmen. Klären, welche Nachhaltigkeitsdimension und welches Usability-Ergebnis wichtig sind. Eine Messgrösse und einen Schwellenwert als Entwurf vorschlagen und dann validieren; eigene Zahlen nicht stillschweigend zu genehmigten Anforderungen machen.")),
        C("cp-quality", "Die ganze Anforderungssammlung prüfen", `${H("3.1.4, 3.8")}; Activities week 3 Tasks.pdf`, [
          single("consistency", "R1 nimmt Gebote bis einschliesslich 12:00 an; R2 lehnt jedes Gebot um 12:00 ab. Was muss geklärt werden?", ["Nur die Typografie", "Ein Widerspruch zum Grenzzeitpunkt", "Ein fehlender Technologie-Markenname"], 1, "Dasselbe Ereignis soll unvereinbar behandelt werden."),
          multi("sustainable", "Wähle ZWEI passende Reaktionen auf ein Nachhaltigkeitsziel.", ["Betroffene Stakeholder und Dimensionen bestimmen", "Nachweise vereinbaren, an denen die Erfüllung beurteilt wird", "Annehmen, dass Nachhaltigkeit nur den Stromverbrauch betrifft", "Beliebige Zielwerte wählen und als vom Kunden genehmigt bezeichnen"], [0,1], "Der Workshop umfasst fünf Dimensionen und verlangt Relevanz für das Projekt."),
          single("qualitycriterion", "Sind die im Lehrplan empfohlenen Qualitätskriterien für jeden Kontext eine abschliessende Liste?", ["Ja, zusätzliche Kriterien sind verboten", "Nein, welche Kriterien relevant sind, hängt vom Kontext ab", "Sie gelten nur für Quellcode"], 1, "Nutze die Kriterien als Orientierung und passe sie an Arbeitsprodukt und Risiko an.")
        ]),
        S("Selbstcheck Woche 3", `${W(3, "2–16")}; ${H("3")}`,
          check(["Lebensdauer, Darstellung und Detaillierung passend zum Zweck wählen.", "Mehrdeutige Formulierungen verbessern, ohne Fakten zu erfinden.", "Multiplizitäten von Assoziationen und Blickwinkel von Modellen lesen.", "Merge von Join unterscheiden und Übergänge mit Bedingungen deuten.", "Einzelne Anforderungen und die Konsistenz einer Sammlung prüfen.", "Ein Nachhaltigkeitsanliegen in einen Anforderungskandidaten übersetzen."]),
          "Die Modellübungen hier verwenden eigene kleine Fälle. Für vollständige diagrammbasierte Fragen zusätzlich die offizielle Übungsprüfung nutzen, die in den Wochenquiz verlinkt ist.")
      ] },
      { id: "w4", number: 4, title: "Ermittlung, Konfliktlösung, Validierung und UCD", status: "ready", items: [
        S("Ausarbeitung ist eine Feedbackschleife", `${W(4, "3–4")}; ${H("4, S. 85–87")}`,
          "Quellen bestimmen, Bedürfnisse ermitteln, Konflikte lösen und die entstandenen Anforderungen validieren. Diese Tätigkeiten wiederholen sich und beeinflussen einander; sie sind kein Wasserfall in einem Durchgang.",
          "Die Folien betonen Quellen, Stakeholder und Kano. Das zugeordnete Kapitel 4 liefert die breiteren Themen Techniken, Konflikte und Validierung. UX/UCD ist ein zugehöriger Kursworkshop."),
        S("Quelle ist nicht Technik", `${W(4, "5–6, 12")}; ${H("4.1")}`,
          table(["Quellenkategorie", "Eigenes Beispiel", "Technik, um daraus zu lernen"], [["Stakeholder", "Vertreterin des Supports", "Interview"],["Dokument", "Betriebsanleitung", "Dokumentenanalyse"],["System", "Bestehende Auktionsplattform", "Systemarchäologie (system archaeology)"]]),
          "Prüfe Aktualität und Relevanz von Dokumenten und Systemen. Bestehendes Verhalten kann ein nützlicher Hinweis oder ein alter Fehler sein; Wiederverwendung beweist keine Eignung."),
        S("Stakeholder systematisch finden", `${W(4, "7–9")}; ${H("4.1.1")}`,
          "Das Zwiebelmodell nach Alexander (onion model) leitet die Suche durch die soziotechnischen Schichten rund um das System. Beginne bei offensichtlichen Nutzern und Auftraggebern, folge ihren Beziehungen und verfolge einen Zweig nicht weiter, sobald er in irrelevante Umgebung führt.",
          "Führe eine Stakeholderliste: Rollen, Kontakt, Verfügbarkeit, Fachwissen, Relevanz, Einfluss und Interesse. Eine lange Liste ohne geeignete Vertreter oder geplante Einbindung ist kein wirksames Stakeholdermanagement."),
        S("Ziele und Einbindung der Stakeholder", "Activities week 4 Tasks.pdf, Aufgaben 1–2; Activities - Week 04.pdf, gedruckte Folie 9",
          "Ordne Ziele den Stakeholdern zu, die sie brauchen, und mach Konflikte sichtbar. Der Kurs verwendet SMART: Specific, Measurable, Attractive bzw. Accepted, Realistic und Time-bound (spezifisch, messbar, attraktiv bzw. akzeptiert, realistisch, terminiert).",
          "Einfluss und Motivation helfen, die Einbindung zu planen. Ein einflussreicher, aber wenig engagierter Stakeholder braucht vielleicht gezielte Ansprache; ein motivierter Nutzer mit wenig formalem Einfluss kann trotzdem unverzichtbares Domänenwissen liefern.",
          reveal("Rechtfertigt geringer Einfluss, die Anforderungen eines Nutzers zu ignorieren?", "Nein. Einfluss ist eine Dimension des Managements, kein Beweis für Irrelevanz. Berücksichtige Betroffenheit, Fachwissen und die Folgen eines Ausschlusses.")),
        C("cp-sources", "Die richtigen Quellen finden und einbinden", `${W(4, "5–12")}; ${H("4.1")}`, [
          single("technique", "Was ist eine Technik und keine Anforderungsquelle?", ["Ein Altsystem", "Ein Prozesshandbuch", "Ein Interview", "Ein Systembetreiber"], 2, "Das Interview ist das Mittel, mit dem aus einer Quelle ermittelt wird."),
          multi("stakeholders", "Wähle ZWEI nützliche Attribute einer Stakeholderliste.", ["Rolle in Bezug auf das System", "Relevanz und Verfügbarkeit", "Lieblingsfilm unabhängig vom Projekt", "Eine Garantie, dass sich Meinungen nie ändern"], [0,1], "Nützliche Attribute unterstützen die Auswahl der Quellen und die Zusammenarbeit."),
          single("snowball", "Wann kann man beim Verfolgen von Stakeholder-Beziehungen einen Zweig beenden?", ["Nach genau drei Personen", "Wenn er nur noch in irrelevante Umgebung führt", "Sobald ein Entwickler gefunden ist"], 1, "Der relevante Kontext begrenzt die Suche, nicht eine willkürliche Anzahl.")
        ]),
        S("Kano: unterschiedliche Beziehungen zur Zufriedenheit", `${W(4, "16, 18")}; ${H("4.2.1")}`,
          table(["Faktor", "Wenn er fehlt", "Wenn er gut erfüllt ist", "Sinnvoller Zugang"], [["Basisfaktor (basic factor / dissatisfier)", "Starke Unzufriedenheit", "Wird als selbstverständlich hingenommen", "Routinen und Fehler beobachten"],["Leistungsfaktor (performance factor / satisfier)", "Weniger Zufriedenheit", "Mehr Zufriedenheit, je besser er erfüllt ist", "Fragen und Bedürfnisse vergleichen"],["Begeisterungsfaktor (excitement factor / delighter)", "Meist keine Beschwerde", "Unerwartete Begeisterung", "Ideen und Prototypen erkunden"]]),
          "Die Achsen beschreiben Erfüllungsgrad und Zufriedenheit. Ein Basisfaktor ist kein Merkmal, das bei Vorhandensein Unzufriedenheit auslöst; er löst Unzufriedenheit aus, wenn er fehlt."),
        S("Kano-Einordnungen können sich ändern", `${W(4, "16, 18")}; ${H("4.2.1")}`,
          "Ein Merkmal kann eine Gruppe begeistern und für eine andere selbstverständlich sein. Erwartungen entwickeln sich mit der Zeit: Die Neuheit von gestern kann die Basiserwartung von morgen sein.",
          "Frage sowohl nach dem Vorhandensein als auch nach dem Fehlen eines Merkmals. Nutze die Antworten, um seine Rolle zu untersuchen, statt es nach eigener Meinung dauerhaft einzuordnen.",
          reveal("Eigenes Beispiel: Niemand verlangt eine zuverlässige Speicherung der Gebote. Kannst du sie weglassen?", "Nein. Schweigen kann auf ein selbstverständliches Basisbedürfnis hindeuten. Beobachte Fehler und stelle konkrete Fragen, bevor du entscheidest.")),
        S("Erhebungstechniken: nach dem benötigten Beleg wählen", H("4.2.2"),
          table(["Technik", "Stärke", "Einschränkung, die zu beherrschen ist"], [["Interview", "Tiefe und Nachfragen", "Zeitaufwand und Verzerrung durch den Interviewer"],["Fragebogen (questionnaire)", "Viele Teilnehmende erreichen", "Formulierung und Stichprobe begrenzen den Nutzen"],["Workshop", "Sichtweisen zusammenbringen", "Braucht Moderation und ausgewogene Beteiligung"],["Feldbeobachtung (field observation)", "Implizite Routinen aufdecken", "Beobachtung kann das Verhalten beeinflussen"],["Apprenticing", "Lernen durch Mitarbeiten unter Anleitung einer Expertin", "Zugang und Zeitaufwand"],["Systemarchäologie / Feedbackanalyse", "Wissen aus bestehenden Artefakten zurückgewinnen", "Relevanz prüfen und keine Fehler übernehmen"]])),
        C("cp-kano", "Wählen, wie ein Bedürfnis aufgedeckt wird", `${H("4.2.1–4.2.2")}; ${W(4, "16, 18")}`, [
          single("basic", "Nutzer erwarten, dass gespeicherte Gebote nie verschwinden, und erwähnen es erst nach einem Verlust. Welche Kano-Deutung passt am besten?", ["Basisfaktor", "Begeisterungsfaktor", "Ein irrelevantes Bedürfnis"], 0, "Selbstverständliche Erwartungen zeigen sich oft erst durch Unzufriedenheit, wenn sie fehlen."),
          multi("kanochange", "Wähle ZWEI berechtigte Vorbehalte zu Kano.", ["Eine Einordnung kann von der Nutzergruppe abhängen", "Eine Einordnung kann sich mit der Zeit ändern", "Jeder Leistungsfaktor ist für immer ausdrücklich bekannt", "Ein nicht erwähntes Bedürfnis ist immer unwichtig"], [0,1], "Kano beschreibt Beziehungen zu Erwartungen in einem Kontext."),
          single("apprentice", "Eine Analystin führt eine Aufgabe aus, während ein Domänenexperte sie anleitet und korrigiert. Welche Technik ist das?", ["Fragebogen", "Apprenticing", "Nur passive Beobachtung"], 1, "Apprenticing umfasst Lernen durch angeleitete Mitarbeit.")
        ]),
        S("Ideen erzeugen, nicht nur vorhandenes Wissen sammeln", H("4.2.3"),
          "Brainstorming trennt das Erzeugen von Ideen vom Bewerten. Analogien übertragen nützliche Ideen aus anderen Domänen. Szenarien und Storyboards machen eine konkrete Nutzungssituation diskutierbar. Prototypen lassen Menschen ausgewählte Teile einer möglichen Lösung erleben.",
          "Design Thinking wechselt zwischen Öffnen und Eingrenzen bei der Erkundung von Problemen und Lösungen. Wähle keine attraktive Lösung, bevor du das Bedürfnis verstanden hast.",
          note("warn", "Die Wahl der Technik hängt von Bedingungen ab", "Die Beispielzuordnungen der Vorlesung sind Diskussionsanstösse, keine allgemeingültigen Regeln. Vertraulichkeit, Zugang, Zeit, Verfügbarkeit der Stakeholder und der gewünschte Beleg bestimmen die Wahl.")),
        S("Eigener Transfer: eine Altplattform ersetzen", H("4.2.2–4.2.3"),
          "Die alte Plattform hat undokumentierte Gebotsregeln. Nutzer können ihre Ausnahmen nicht leicht erklären. Das Team will ein neuartiges Erlebnis, ohne kritisches Verhalten zu verlieren.",
          reveal("Schlage eine Kombination von Techniken vor und erkläre jeweils den Zweck.", "Das bestehende System und seine Daten analysieren, um mögliche Regeln zurückzugewinnen; Nutzer beobachten, um implizite Umgehungslösungen aufzudecken; sie zu Ausnahmen interviewen; mit einem Prototyp neue Interaktionsideen erkunden. Validieren, was erhalten bleiben muss, statt jedes Altverhalten zu kopieren.")),
        C("cp-techniques", "Methode und Unsicherheit zusammenbringen", H("4.2.2–4.2.3"), [
          single("legacy", "Du musst Regeln aus bestehendem Code, Tests und Dokumentation zurückgewinnen. Welche Technik passt am besten?", ["Systemarchäologie", "Nur Brainstorming", "Bestehende Artefakte ignorieren"], 0, "Systemarchäologie gewinnt Wissen aus einem bestehenden System und seinen Artefakten."),
          multi("ideas", "Welche ZWEI Techniken unterstützen besonders das Erzeugen oder Erkunden neuer Lösungsideen?", ["Brainstorming", "Analogien", "Eine bestehende Spezifikation ungeprüft abschreiben", "Einen Fehler im Altsystem als genehmigte Anforderung behandeln"], [0,1], "Beide gehen über das Sammeln vorhandener Aussagen hinaus."),
          single("confidential", "Ein Team behauptet, für ein vertrauliches Projekt sei eine Umfrage immer am besten. Was ist die fundierte Einschätzung?", ["Für jedes vertrauliche Projekt richtig", "Die Wahl der Technik muss Zugang, Vertraulichkeit und die benötigten Informationen berücksichtigen", "Vertrauliche Projekte können kein RE betreiben"], 1, "Kein einfaches Projektetikett bestimmt eine allgemein beste Technik.")
        ]),
        S("Den Konflikt diagnostizieren, bevor man eine Lösung wählt", H("4.3.1–4.3.2, S. 112–116"),
          table(["Art", "Eigene Beispielursache"], [["Sachkonflikt (subject-matter)", "Tatsächlich verschiedene Bedürfnisse in verschiedenen Einsatzumgebungen"],["Datenkonflikt (data)", "Unterschiedliche Bedarfsprognosen oder Interpretationen"],["Interessenkonflikt (interest)", "Unterschiedliche rollenspezifische Ziele"],["Wertekonflikt (value)", "Unterschiedliche Grundüberzeugungen zur Fairness"],["Beziehungskonflikt (relationship)", "Ein Vorschlag wird aus Misstrauen gegenüber seinem Urheber abgelehnt"],["Strukturkonflikt (structural)", "Teams konkurrieren um eine knappe gemeinsame Ressource"]]),
          "Es können mehrere Arten beteiligt sein. Ein Streit über eine Zahl kann einen Interessenkonflikt verbergen; untersuche ihn, statt aus einem Wort eine Diagnose abzuleiten."),
        S("Lösen und festhalten", H("4.3.1, 4.3.3"),
          flow("Konflikt identifizieren", "Ursachen, Positionen und betroffene Anforderungen analysieren", "Einen Lösungsansatz vereinbaren und anwenden", "Ergebnis dokumentieren und kommunizieren"),
          "Mögliche Ansätze sind Einigung (agreement), Kompromiss (compromise), Abstimmung (voting), eine Entscheidung durch eine befugte Stelle (overrule) und Varianten (variants). Vereinbare das Entscheidungsverfahren, bevor du es anwendest; halte Alternativen, Annahmen, Begründung und Beteiligte fest.",
          reveal("Ist ein Kompromiss dasselbe wie die Einigung auf die bevorzugte Lösung aller?", "Nein. Bei einem Kompromiss akzeptieren die Parteien Zugeständnisse, obwohl es nicht die jeweils bevorzugte Lösung ist. Varianten können unterschiedliche Bedürfnisse erfüllen, erhöhen aber die Komplexität.")),
        S("Entscheidungshilfen machen Annahmen überprüfbar", H("4.3.3, S. 119–120"),
          "CAF (Consider All Facts), PMI (Plus–Minus–Interesting) und gewichtete Entscheidungsmatrizen erleichtern den Vergleich von Alternativen. Sie unterstützen die Diskussion; sie machen die gewählten Kriterien und Gewichte nicht objektiv richtig.",
          "Eigenes Beispiel: Eine Option gewinnt nur, weil die Liefergeschwindigkeit viel höher gewichtet wurde als die Barrierefreiheit. Zeige diese Abhängigkeit und validiere die Prioritäten, bevor du die Punktzahl als entscheidend darstellst."),
        C("cp-conflict", "Über Konfliktlösung nachdenken", H("4.3"), [
          single("data", "Zwei Planer sind uneinig, weil sie unterschiedliche Bedarfsprognosen verwenden. Welche Konfliktart solltest du zuerst untersuchen?", ["Datenkonflikt", "Zwingend ein Beziehungskonflikt", "Kein möglicher Konflikt"], 0, "Der genannte Unterschied liegt in den Daten oder ihrer Interpretation."),
          order("resolution", "Bringe die Tätigkeiten der Konfliktlösung in die richtige Reihenfolge.", ["Identifizieren", "Analysieren", "Lösen", "Lösung dokumentieren"], "Eine Lösung sollte auf Verständnis folgen, und ihr Ergebnis muss später nachvollziehbar bleiben."),
          multi("rationale", "Welche ZWEI Punkte gehören in das Entscheidungsprotokoll?", ["Betrachtete Alternativen und Annahmen", "Begründung und an der Entscheidung Beteiligte", "Nur der Name der Person, die sich durchgesetzt hat", "Die Behauptung, die Entscheidung könne nie überprüft werden"], [0,1], "Das Protokoll erklärt, warum die entstandenen Anforderungen so aussehen, wie sie aussehen.")
        ]),
        S("Validierung prüft, ob es die richtigen Anforderungen sind", H("2.2.6, 4.4.1"),
          "Validiere die Abdeckung der Stakeholder-Bedürfnisse, die Einigung und plausible Kontextannahmen. Prüfe ausserdem die Qualität einzelner Anforderungen und der Sammlung als Ganzes.",
          "Binde passende Perspektiven und eine dem Risiko angemessene Unabhängigkeit ein. Trenne das Finden von Mängeln vom Entscheiden über Korrekturen, und validiere erneut, wenn sich Anforderungen oder Annahmen ändern."),
        S("Drei Familien von Validierungstechniken", H("4.4.2, S. 123–128"),
          table(["Familie", "Beispiele", "Was sie aufdeckt"], [["Review (statisch)", "Walkthrough, Inspektion", "Mängel, die durch Lesen und Nachdenken gefunden werden"],["Exploration (dynamisch)", "Prototyp, Alpha-/Betatest, A/B-Test", "Feedback durch das Erleben von Verhalten"],["Beispielentwicklung (sample development, statisch)", "Tests, einen Entwurf oder ein Modell ableiten", "Lücken, die beim Versuch sichtbar werden, die Spezifikation zu verwenden"]]),
          "Beim Walkthrough führt der Autor durch die Prüfung. Eine Inspektion ist formaler und arbeitet mit vorbereiteten Gutachtern und festgelegten Rollen. Beispielentwicklung kann eine nicht testbare Anforderung aufdecken, bevor das System läuft."),
        S("Die Validierung passend zum Risiko wählen", H("4.4.1–4.4.2"),
          "Ein schneller Prototyp kann einen verwirrenden Ablauf aufdecken. Eine formale Inspektion mit unabhängiger Expertise unterstützt besser die systematische Prüfung riskanter Anforderungen. Die Methoden ergänzen sich.",
          reveal("Eigener Fall: Alle mögen einen Prototyp, aber niemand kann aus «zuverlässig genug» einen Test ableiten. Ist die Validierung abgeschlossen?", "Nein. Positive Reaktionen klären das unklare Zuverlässigkeitskriterium nicht. Bedingungen und Nachweise klären und dann die geänderte Anforderung und ihre Folgen validieren.")),
        C("cp-validation", "Überzeugende Belege wählen", H("4.4"), [
          single("sample", "Beim Ableiten eines Tests zeigt sich, bevor Software läuft, dass eine Frist nicht definiert ist. Welche Familie passt?", ["Beispielentwicklung", "Betatest", "A/B-Test"], 0, "Die Spezifikation wird geprüft, indem man versucht, ein nachgelagertes Arbeitsprodukt zu erstellen."),
          multi("validating", "Wähle ZWEI fundierte Validierungspraktiken.", ["Relevante unabhängige Perspektiven einbinden, wenn das Risiko es erfordert", "Neben einzelnen Anforderungen auch die gesamte Sammlung prüfen", "Nur einmal ganz am Ende validieren", "Unterschriften als ausreichenden Nachweis der Korrektheit behandeln"], [0,1], "Risiko, unterschiedliche Perspektiven und wiederholte Prüfungen der ganzen Sammlung helfen, übersehene Mängel zu finden."),
          single("walkthrough", "Wer führt typischerweise durch einen Walkthrough eines Anforderungs-Arbeitsprodukts?", ["Der Autor", "Nur ein anonymer Kunde", "Ein Zufallsalgorithmus"], 0, "Beim Walkthrough führt der Autor; eine Inspektion hat eine formalere Rollenstruktur.")
        ]),
        S("Usability, UX und menschzentrierte Gestaltung", "HS26_ASE_UX und UCD.pdf, Folien 7–13",
          "Usability bedeutet, dass bestimmte Nutzer in einem bestimmten Nutzungskontext bestimmte Ziele effektiv, effizient und zufriedenstellend erreichen. UX umfasst darüber hinaus die Wahrnehmungen und Erfahrungen bei der Interaktion mit einem Produkt oder Service.",
          table(["Dimension", "Eigene Beobachtung"], [["Effektivität (effectiveness)", "Haben die Nutzer das beabsichtigte Gebot korrekt abgegeben?"],["Effizienz (efficiency)", "Welcher Aufwand oder welche Zeit war für den Erfolg nötig?"],["Zufriedenheit (satisfaction)", "Wie haben die Nutzer die Interaktion erlebt?"]]),
          "UCD (User-Centred Design) bindet Nutzer während des ganzen iterativen Entwurfs ein, mit einem multidisziplinären Team und evaluationsgetriebener Verfeinerung. Ein optisch attraktiver Bildschirm allein beweist keines dieser Ergebnisse."),
        S("Planen, verstehen, spezifizieren, gestalten, evaluieren – dann iterieren", "HS26_ASE_UX und UCD.pdf, Folien 15, 18–29, 40–44",
          flow("Nutzereinbindung planen", "Nutzungskontext verstehen", "Nutzungsanforderungen spezifizieren", "Gestaltungslösungen erarbeiten", "Gegen die Anforderungen evaluieren"),
          "Die Evaluation kann dich zu jeder früheren Tätigkeit zurückführen. Beschreibe Nutzer, Aufgaben, Werkzeuge und Umgebungen. Personas fassen Nutzergruppen zusammen; Szenarien erkunden konkrete Nutzungssituationen; Card Sorting untersucht, wie Menschen Informationen gruppieren.",
          "Beim offenen Card Sorting bilden und benennen die Teilnehmenden die Kategorien selbst; beim geschlossenen Card Sorting werden sie vorgegeben. Die Wahl hängt davon ab, was du herausfinden willst."),
        S("Ein Prototyp ist ein Werkzeug für eine Frage", "HS26_ASE_UX und UCD.pdf, Folien 32–42",
          "Wähle Breite, Tiefe, visuelle Detailtreue, Interaktivität, Daten und technische Reife danach, welche Unsicherheit geklärt werden soll. Ein Low-Fidelity-Prototyp kann genügen, um die Navigation zu erkunden; die Backend-Performance kann er nicht beweisen.",
          "Bei einem Usability-Test lösen repräsentative Nutzer realistische Aufgaben. Bei einer Expertenevaluation werden Fachwissen und Prinzipien angewendet. Beides kann helfen, liefert aber unterschiedliche Belege. Beobachte das Verhalten und halte Deutungen ausdrücklich getrennt."),
        C("cp-ucd", "Den Workshop auf RE anwenden", "HS26_ASE_UX und UCD.pdf, Folien 7–15, 29, 32–44", [
          single("efficient", "Ein Nutzer ist erfolgreich, braucht aber viele unnötige Schritte. Welche Usability-Dimension ist am direktesten betroffen?", ["Effizienz", "Nur die visuelle Detailtreue", "Die Existenz von Stakeholdern"], 0, "Effizienz setzt Ressourcen oder Aufwand ins Verhältnis zum erreichten Ergebnis."),
          multi("test", "Welche ZWEI Entscheidungen unterstützen einen aussagekräftigen Usability-Test?", ["Repräsentative Nutzer lösen realistische Aufgaben", "Schwierigkeiten beobachten, statt nur um Lob zu bitten", "Nur Entwickler fragen, ob ihr eigenes Design gut aussieht", "Einen Papierprototyp als Beweis für den Datenbankdurchsatz behandeln"], [0,1], "Das Lösen realistischer Aufgaben kann Probleme aufdecken, die Präferenzfragen übersehen."),
          single("iteration", "Die Evaluation zeigt, dass der angenommene Nutzungskontext falsch war. Was sollte das Team tun?", ["Zur Kontextanalyse zurückkehren und die betroffenen Anforderungen und das Design überarbeiten", "Weitermachen, weil die Evaluation die letzte Phase sein muss", "Nur die Farben aufpolieren"], 0, "UCD ist iterativ und kann frühere Tätigkeiten erneut aufnehmen.")
        ]),
        S("Eigener Transfer: ein Streit um ein spätes Gebot", `${H("4")}; ${W(4, "9–18")}`,
          "Ein Verkäufer will Verlängerungen in letzter Sekunde; ein Käufer schätzt einen vorhersehbaren Schluss; der Support meldet verwirrende Statusmeldungen. Ein Prototyp zeigt, dass Nutzer dasselbe Gebot mehrfach absenden.",
          reveal("Beschreibe einen schlüssigen nächsten RE-Zyklus.", "Quellen und Ziele bestätigen, die Ursache der Mehrfachgebote untersuchen, Zeit- und Annahmesemantik klären, die widersprüchlichen Bedürfnisse analysieren, die Schlussregel vereinbaren, Text und Modelle aktualisieren und dann realistische Normal- und Fehlerfälle validieren. Begründung und verbleibende Annahmen festhalten.")),
        S("Eigener Transfer: eine Technik klärt nicht alles", H("4.1–4.4"),
          "Eine Umfrage meldet hohe Zufriedenheit, aber ein Betreiber warnt vor verlorenen Ereignissen bei Ausfällen. Das Team will die Ermittlung abschliessen.",
          reveal("Warum ist das verfrüht?", "Die Umfrage erfasst nur bestimmte Teilnehmende und Fragen. Der Betreiber ist eine relevante Quelle für ein anderes Anliegen. Ausfälle mit Interviews und vorhandenen Belegen untersuchen, das nötige Verhalten und die Qualitätskriterien spezifizieren und mit passenden Methoden validieren.")),
        S("Selbstcheck Woche 4 und der restliche Prüfungsstoff", `${H("4")}; Introductory slides.pdf, Folie 17`,
          check(["Quellen von Ermittlungstechniken unterscheiden.", "Kano-Faktoren und ihre Abhängigkeit von Gruppe und Zeit erklären.", "Sich ergänzende Ermittlungsmethoden wählen.", "Konflikte diagnostizieren und einen Lösungsansatz begründen.", "Validierungsbelege passend zum Risiko wählen.", "Usability-Evaluation mit der Verfeinerung von Anforderungen verbinden."]),
          note("exam", "Vor dem 28. Oktober", "Lerne auch Prozesse (Kapitel 5), Requirements Management (6) und Werkzeugunterstützung (7). Die vier Wochenmodule decken die verfügbaren Kurswochen ab, nicht das ganze Zertifikat. Plane den restlichen Stoff mit dem Prüfungsleitfaden, der in jedem deutschen ASE1-Wochenquiz verlinkt ist."))
      ] }
    ]
  });
})();
