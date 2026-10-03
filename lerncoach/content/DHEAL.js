/*
 * Lerncoach-Inhalte für Digital Health.
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
 * Alle Tabellen und Diagramme sind eigene Nachbauten mit den Zahlen der Folien.
 * Folienbilder werden bewusst nicht kopiert.
 * Erklärungen und Checkpoints auf Deutsch, englische Fachbegriffe bleiben erhalten.
 */
Lerncoach.registerSubject({
  id: "DHEAL",
  name: "Digital Health",
  description: "Healthcare data, systems and clinical AI",
  accent: "#237274",
  weeks: [
    { id: "w2", number: 2, title: "Healthcare Data: From Clinical Care to AI-Ready Data", status: "soon" },
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
    }
  ]
});
