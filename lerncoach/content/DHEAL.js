/*
 * Lerncoach-Inhalte für Digital Health.
 * Woche 3 aus: DHEAL/Lectures/03.digital-health.data-exploration_moodle.pdf
 *   (Lecture 03: Data Processing – Scaling, Visualisation, Sampling, Javier Montoya, HS 2026).
 * Erklärungen und Checkpoints auf Deutsch, englische Fachbegriffe bleiben erhalten.
 * Wochen mit status "soon" erscheinen als "Noch keine Inhalte".
 * Aufbau und Beispiele: LERNCOACH_ERSTELLEN.md und lerncoach/content/CNS1.js
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

        /* ---------- Block 1: Folien 5–7 — Warum überhaupt Data Exploration ---------- */
        {
          type: "slide",
          title: "Folien 5–6 — Der Eröffnungsfall: Würdest du darauf trainieren?",
          body: [
            "Die Vorlesung startet mit einer Entscheidung statt mit einer Definition. Ein Spitalnetzwerk hat Daten aus **10'000 Aufnahmen** an drei Standorten gesammelt. Ziel ist ein Modell, das die **30-Tage-Readmission** vorhersagt, und zwar mit Informationen, die **zum Zeitpunkt der Aufnahme** verfügbar sind.",
            "Du siehst eine kleine Tabelle mit Age, Sex, Creatinine, HeartRate, Site und Readmitted. Ein paar Zeilen sehen völlig normal aus: 67, F, 1.1, 78, A, No. Andere sind seltsam: Bei einem Patienten fehlt Creatinine komplett, bei einem anderen steht Creatinine = 120 und HeartRate = 830.",
            "Die Folie bietet drei Antworten an: a) mit der Modellentwicklung starten, b) stoppen, der Datensatz ist klar ungeeignet, c) vor der Entscheidung mehr Informationen verlangen. Der Punkt der Übung ist nicht, sofort alle Probleme zu lösen, sondern sich bewusst zu machen: **Was müsstest du wissen, bevor du diesen Daten traust?**",
            "Der Kern der ganzen Lektion steckt schon hier: Wenige plausibel aussehende Zeilen reichen nicht aus, um zu beurteilen, ob ein Datensatz bereit für AI ist."
          ],
          remember: "Eröffnungsfall: 10'000 Aufnahmen, drei Standorte, Ziel 30-Tage-Readmission bei Aufnahme. Ein paar plausible Zeilen sind kein Beleg für Datenqualität."
        },
        {
          type: "slide",
          title: "Folien 6–7 — Fünf unsichtbare Probleme und das eigentliche Ziel",
          body: [
            "Derselbe Datensatz, fünf Probleme, die man an einzelnen Zeilen nicht sieht:",
            { list: [
              "**35 % der Creatinine-Werte fehlen.** Nie gemessen, nicht dokumentiert, oder bei der Extraktion verloren gegangen?",
              "**Nur 3 % der Aufnahmen führen zu einer Readmission.** Die allermeisten Patienten gehören zur negativen Klasse.",
              "**830 bpm erscheint als Herzfrequenz.** Seltener Patient, Messfehler oder Datenfehler?",
              "**Für Creatinine werden zwei Einheiten verwendet.** Vor einer Harmonisierung sind die Werte schlicht nicht vergleichbar.",
              "**70 % der positiven Outcomes stammen von einem einzigen Standort.** Patientenunterschied, Standorteffekt oder Effekt der Datenerhebung?"
            ]},
            "Der Satz, den die Folie rot hervorhebt, ist die Leitidee der ganzen Vorlesung: **Keines dieser Probleme wird dadurch gelöst, dass man einen „besseren\" Algorithmus wählt.** Sie müssen auf der Ebene der Daten und des Prozesses verstanden werden, der sie erzeugt hat.",
            "Folie 7 macht daraus vier Arbeitsschritte, die auch die Struktur deines Vorgehens sind: **Describe** (Patienten, Variablen und Verteilungen beschreiben, bevor man transformiert), **Inspect** (Missingness, ungewöhnliche Werte und Zusammenhänge untersuchen und fragen, ob ein Muster den Patienten, den Messprozess oder die Dokumentation abbildet), **Prepare** (Einheiten, Scaling und Kategorien im Hinblick auf die geplante Analyse behandeln, ohne die Bedeutung zu verändern) und **Judge** (beurteilen, ob die Daten für die geplante AI-Aufgabe bereit sind, inklusive ungelöster Probleme wie Imbalance, Leakage und eingeschränkter Repräsentativität).",
            "Wichtig ist die Formulierung der Folie: Das Ziel ist **nicht**, einen „sauberen\" Datensatz zu produzieren. Das Ziel ist zu verstehen, was die Daten darstellen, wie sie entstanden sind und ob sie die Frage beantworten können, die wir stellen wollen."
          ],
          remember: "Fünf Probleme: 35 % Missingness, 3 % positive Klasse, 830 bpm, zwei Einheiten, 70 % Positive von einem Standort. Vier Schritte: Describe, Inspect, Prepare, Judge. Ziel ist Verstehen, nicht Putzen."
        },
        {
          type: "checkpoint",
          id: "cp-case",
          title: "Checkpoint: Eröffnungsfall und Zielsetzung",
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
              explanation: "Die Grösse des Datensatzes wird nirgends als Problem genannt. Die fünf anderen Punkte sind genau die fünf Boxen auf Folie 6."
            },
            {
              id: "algorithmus",
              type: "single",
              prompt: "Was sagt die Vorlesung über die Lösung dieser Probleme?",
              options: [
                "Keines dieser Probleme wird durch die Wahl eines besseren Algorithmus gelöst",
                "Ein Deep-Learning-Modell kann Missingness und Einheitenprobleme selbst kompensieren",
                "Mit genügend Daten verschwinden die Probleme automatisch",
                "Die Probleme sind rein statistisch und betreffen die Datenerhebung nicht"
              ],
              correct: 0,
              explanation: "Die Probleme liegen auf der Ebene der Daten und des erzeugenden Prozesses. Deshalb hilft kein Algorithmuswechsel."
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
              explanation: "Describe → Inspect → Prepare → Judge. Beschreiben kommt vor dem Transformieren, und die Beurteilung steht am Schluss."
            },
            {
              id: "ziel",
              type: "type",
              prompt: "Ergänze: Das Ziel ist nicht einfach, einen ... Datensatz zu produzieren. (ein Wort, wie auf der Folie)",
              accept: ["clean", "sauberen", "sauber", "cleanen", "reinen"],
              placeholder: "ein Wort",
              explanation: "„The goal is not simply to produce a clean dataset.\" Es geht darum zu verstehen, was die Daten darstellen und ob sie die Frage beantworten können."
            }
          ]
        },

        /* ---------- Block 2: Folien 8–11 — Beobachtung, Variable, EDA ---------- */
        {
          type: "slide",
          title: "Folie 8 — Unit of Observation: Was stellt eine Zeile dar?",
          body: [
            "Bevor du Samples zählst oder Variablen analysierst, musst du wissen, **was eine Zeile überhaupt darstellt**. Genau das ist die **Unit of Observation**: die Festlegung, wofür eine Zeile, ein Record oder ein Sample im Datensatz steht.",
            "Die Folie nennt vier typische Möglichkeiten:",
            { list: [
              "**Patient**: eine Person",
              "**Encounter**: eine Spitalaufnahme oder ein klinischer Besuch",
              "**Image**: eine bildgebende Untersuchung beziehungsweise Aufnahme",
              "**Measurement**: eine einzelne Beobachtung zu einem bestimmten Zeitpunkt"
            ]},
            "Daraus folgt der wichtigste Satz der Folie: **Die Anzahl Zeilen ist nicht notwendigerweise die Anzahl unabhängiger Patienten.** Das Zahlenbeispiel macht es greifbar: 1 Patient, 4 Spitalaufenthalte, 12 Labormessungen ergeben einen Datensatz der Grösse **12 Measurement Records** bei **1 unabhängigen Patienten**.",
            "Warum das zählt: Statistik und Machine Learning setzen oft stillschweigend unabhängige Beobachtungen voraus. Wenn zwölf Zeilen von derselben Person stammen, sind sie miteinander verwandt und dürfen nicht behandelt werden, als kämen sie von zwölf verschiedenen Menschen. Sonst wirkt der Datensatz grösser und aussagekräftiger, als er ist.",
            "Merksatz der Folie, und ein guter Reflex für jeden neuen Datensatz: Bevor du fragst „Wie viele Samples haben wir?\", frag „Was stellt ein Sample dar?\"."
          ],
          remember: "Unit of Observation = was eine Zeile darstellt (Patient, Encounter, Image, Measurement). Zeilenzahl ≠ Anzahl unabhängiger Patienten. Beispiel: 1 Patient, 4 Aufenthalte, 12 Messungen → 12 Records, 1 Patient."
        },
        {
          type: "slide",
          title: "Folie 9 — Eine Variable ist mehr als ein Spaltenname",
          body: [
            "Ein Wert in einem Healthcare-Datensatz fällt nicht vom Himmel. Er ist das Ergebnis eines **klinischen**, eines **Mess-** und eines **Dokumentationsprozesses**. Um ihn korrekt zu interpretieren, musst du wissen, was gemessen wurde, wie und wann es gemessen wurde und warum die Information überhaupt erhoben wurde.",
            "Die Folie führt das an **CREATININE = 120** vor: Was stellt das dar? Die Serum-Kreatinin-Konzentration als Indikator der Nierenfunktion. Wie wurde gemessen? Per Labor-Assay. Wann? Bei Aufnahme, nach Behandlung oder später im Aufenthalt? In welcher Einheit? mg/dL oder µmol/L? Warum wurde gemessen? Routine oder wegen eines klinischen Verdachts?",
            "Daraus werden fünf Fragen, die du dir zu **jeder wichtigen Variable** stellen sollst:",
            { list: [
              "**Meaning**: Was stellt die Variable tatsächlich dar?",
              "**Measurement**: Wie wurde sie gemessen oder erfasst?",
              "**Timing**: Wann wurde gemessen, relativ zum klinischen Ereignis und zum geplanten Vorhersagezeitpunkt?",
              "**Clinical context**: Warum wurde gemessen? War die Messung Routine oder selektiv?",
              "**Availability**: Wäre diese Information zum Zeitpunkt der Vorhersage überhaupt bekannt?"
            ]},
            "Die Einheitenfrage ist kein Detail: 120 ist als mg/dL ein kaum vorstellbarer Wert, als µmol/L dagegen ein ganz normaler. Genau das ist das Einheitenproblem aus dem Eröffnungsfall. Und **Availability** ist die Brücke zu jedem Prediction Task: Eine Variable, die erst später bekannt wird, darf nicht in ein Modell, das früher entscheiden soll."
          ],
          remember: "Fünf Fragen pro Variable: Meaning, Measurement, Timing, Clinical context, Availability. Beispiel CREATININE = 120: ohne Einheit und Zeitpunkt nicht interpretierbar."
        },
        {
          type: "slide",
          title: "Folien 10–11 — Exploratory Data Analysis als Prozess",
          body: [
            "**Exploratory data analysis (EDA)** ist die systematische Untersuchung eines Datensatzes **vor** der formalen Modellierung. Man nutzt dafür numerische Zusammenfassungen und Visualisierungen, um Verteilungen, Zusammenhänge, ungewöhnliche Beobachtungen und mögliche Datenqualitätsprobleme zu verstehen.",
            "Die Folien zeigen EDA als vierstufigen Ablauf, einmal abstrakt und einmal am Beispiel der 830 bpm:",
            { list: [
              "**Look** – Was zeigen die Daten? Verteilungen, Häufigkeiten, fehlende Werte und Zusammenhänge betrachten. Beispiel: Heart rate = 830 bpm.",
              "**Question** – Was braucht eine Erklärung? Unerwartete Muster, auffällige Werte und Gruppenunterschiede hinterfragen. Beispiel: Ist das physiologisch plausibel?",
              "**Verify** – Einheiten, Definitionen, Timestamps, Metadaten und die ursprüngliche Datenquelle prüfen, **bevor** man etwas als Fehler erklärt. Beispiel: Quellrecord, Einheit und Messprozess kontrollieren.",
              "**Decide** – Behalten, korrigieren, transformieren, ausschliessen oder weiter untersuchen, je nachdem, was die Evidenz hergibt. Beispiel: Nur korrigieren oder ausschliessen, wenn die Evidenz es stützt."
            ]},
            "Der rote Satz auf Folie 11 ist die Pointe: **EDA ist kein Schritt zum Plots-Produzieren.** Es ist ein Prozess, um zu entscheiden, was die Daten bedeuten und was als Nächstes passieren soll.",
            "Der häufigste Fehler ist, Look und Decide direkt zu verbinden: „Wert sieht komisch aus, also weg damit.\" Genau dagegen steht Verify. Ein extremer Wert kann ein Artefakt sein, aber auch eine echte, klinisch wichtige Beobachtung."
          ],
          remember: "EDA = systematische Untersuchung vor dem Modellieren. Ablauf: Look → Question → Verify → Decide. Niemals Look direkt mit Decide verbinden."
        },
        {
          type: "checkpoint",
          id: "cp-dataset",
          title: "Checkpoint: Beobachtung, Variable, EDA",
          questions: [
            {
              id: "zeilen",
              type: "single",
              prompt: "Ein Datensatz enthält 12 Labormessungen von 1 Patient mit 4 Aufenthalten, eine Zeile pro Messung. Wie viele unabhängige Patienten sind das?",
              options: ["1", "4", "12", "16"],
              correct: 0,
              explanation: "Dataset size ist 12 Measurement Records, die Zahl unabhängiger Patienten ist 1. Zeilenzahl und Patientenzahl sind nicht dasselbe."
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
              id: "eda-ablauf",
              type: "order",
              prompt: "Ordne die vier Schritte des EDA-Prozesses.",
              items: [
                "Look: Verteilungen, Häufigkeiten, fehlende Werte und Zusammenhänge betrachten",
                "Question: unerwartete Muster und auffällige Werte hinterfragen",
                "Verify: Einheiten, Definitionen, Timestamps, Metadaten und Quelldaten prüfen",
                "Decide: behalten, korrigieren, transformieren, ausschliessen oder weiter untersuchen"
              ],
              explanation: "Verify steht bewusst vor Decide: Erst prüfen, ob wirklich ein Fehler vorliegt, dann handeln."
            },
            {
              id: "variable-fragen",
              type: "multi",
              prompt: "Welche Fragen soll man gemäss Folie 9 zu jeder wichtigen Variable stellen?",
              options: ["Meaning", "Measurement", "Timing", "Clinical context", "Availability", "Dateigrösse der Quelle"],
              correct: [0, 1, 2, 3, 4],
              explanation: "Die Dateigrösse gehört nicht dazu. Die fünf anderen Dimensionen stehen genau so auf der Folie."
            }
          ]
        },

        /* ---------- Block 3: Folien 13–23 — Modell, Features, Feature Scaling ---------- */
        {
          type: "slide",
          title: "Folien 13–15 — Was ein Machine-Learning-Modell überhaupt tut",
          body: [
            "Bevor es um Scaling geht, wird kurz geklärt, wofür die Daten am Ende gebraucht werden. Ein Modell lernt ein **Mapping** `f_w( )` von einem **Input x** auf einen **Output y**, kurz: `f_w({x_i}) = y_i`. Das `w` steht für die Gewichte, also genau das, was gelernt wird.",
            "Das Beispiel auf den Folien ist absichtlich nicht-medizinisch, damit die Mechanik klar wird: Hinein geht ein Bild eines Hundes, heraus kommt eine Liste von Scores für Dog, Cat, Wolf, Horse bis Monkey. Der höchste Balken ist die Vorhersage.",
            "Folie 15 öffnet die Box: Dazwischen liegt ein Netz aus Schichten, das die Eingangswerte `x_1` bis `x_d` über gewichtete Summen und Aktivierungsfunktionen bis zu den Ausgaben `ŷ_1` bis `ŷ_k` verarbeitet. Der gestrichelte Pfeil zurück deutet an, dass die Gewichte so angepasst werden, dass die Vorhersage besser zur gewünschten Ausgabe passt.",
            "Für diese Lektion zählt vor allem eines: Das Modell sieht **Zahlen**, nicht Bedeutung. Was die Zahl 120 klinisch heisst, weiss es nicht. Deshalb entscheidet die Art, wie wir Variablen in Zahlen überführen und skalieren, mit darüber, was das Modell lernen kann."
          ],
          remember: "Ein Modell lernt ein Mapping f_w(x) = y. Es sieht nur Zahlen, keine klinische Bedeutung. Deshalb ist die numerische Repräsentation eine Modellierungsentscheidung."
        },
        {
          type: "slide",
          title: "Folien 18–19 — Features, Labels und die Datensatz-Notation",
          body: [
            "Die formale Schreibweise sieht einschüchternder aus, als sie ist. Ein Datensatz **D = {x_i ∈ ℝ^d, y_i ∈ ℝ}** für i = 1 bis n heisst einfach: Wir haben **n** Beobachtungen. Jede Beobachtung hat **d** numerische Merkmale (das ist der Vektor `x_i`) und dazu eine Zielgrösse `y_i`.",
            "Die **Features** sind die Eingangsspalten, das **Label** beziehungsweise die **Class** ist die Zielspalte. Die Folie zeigt das an einem Diabetes-Datensatz mit 1500 Zeilen und den Spalten Glucose, Blood Pressure, Skin Thickness, Insulin, BMI und Age als Features sowie Label mit den Werten Diabetes oder Healthy.",
            "Die Bedeutungen der Spalten stehen rechts auf der Folie und sind ein gutes Beispiel dafür, warum Metadaten nötig sind:",
            { list: [
              "**Glucose**: Plasma-Glukosekonzentration (2 Stunden)",
              "**BloodPres**: diastolischer Blutdruck in mm Hg",
              "**SkinThick**: Trizeps-Hautfaltendicke in mm",
              "**Insulin**: 2-Stunden-Serum-Insulin in mu U/ml",
              "**BMI**: Body Mass Index, Gewicht in kg geteilt durch (Grösse in m)²",
              "**Age**: Alter in Jahren",
              "**Outcome**: Diabetes oder Healthy Patient"
            ]},
            "Folie 19 markiert einzelne Zellen farbig und bereitet damit den nächsten Schritt vor: Für das Scaling braucht man pro Spalte die extremen Werte, also je das Minimum und das Maximum."
          ],
          remember: "D = {x_i ∈ ℝ^d, y_i ∈ ℝ}, i = 1…n: n Beobachtungen, d Features pro Beobachtung, dazu ein Label. Features = Eingangsspalten, Label/Class = Zielspalte."
        },
        {
          type: "slide",
          title: "Folien 16–17 — Feature Scaling und die Min–Max-Formel",
          body: [
            "Healthcare-Variablen unterscheiden sich stark in Zahlenbereich und Einheit. Die Folie zeigt drei Beispiele: Age 67 Jahre liegt im Zehnerbereich, Glucose 148 mg/dL im Hunderterbereich, BMI 33.6 kg/m² wieder im Zehnerbereich.",
            "Der **Note**-Kasten ist die wichtigste Zeile der Folie: **Ein grösserer Zahlenbereich bedeutet nicht, dass eine Variable klinisch wichtiger ist.** Glucose ist nicht zehnmal relevanter als BMI, nur weil die Zahlen grösser sind. Für skalensensitive Modelle kann dieser reine Grössenunterschied die Ergebnisse aber trotzdem verzerren.",
            "Genau dafür gibt es **Feature Scaling**: Es verändert die **numerische Repräsentation** der Variablen, **ohne zu verändern, was sie darstellen**. Age bleibt Age, nur die Zahlenskala wird angeglichen.",
            "**Min–Max-Scaling** transformiert jeden Wert relativ zum beobachteten Minimum und Maximum:",
            "`x_scaled = (x − x_min) / (x_max − x_min)`",
            "**Resultat**: Die Werte werden auf das Intervall 0 bis 1 abgebildet. Der Zähler misst, wie weit der Wert über dem Minimum liegt, der Nenner ist die gesamte Spannweite. Ein Wert genau am Minimum ergibt 0, einer genau am Maximum ergibt 1.",
            "Das konkrete Beispiel der Folie: Wenn Age im Entwicklungsdatensatz von 20 bis 80 Jahren reicht, wird für eine 50-jährige Person gerechnet (50 − 20) / (80 − 20) = 0.50. Aus 50 Jahren wird also 0.50.",
            "Ein Hinweis zur Foliennummerierung: Die Agenda auf Folie 2 kündigt Abschnitt 3.2 als **Feature Scaling** an, die Trennfolie 12 trägt dagegen den Titel „Healthcare Data Modalities\". Inhaltlich behandelt der Abschnitt Feature Scaling, so wie es die Agenda sagt."
          ],
          remember: "x_scaled = (x − x_min) / (x_max − x_min), Resultat im Intervall 0 bis 1. Scaling ändert die Darstellung, nicht die Bedeutung. Grösserer Zahlenbereich heisst nicht klinisch wichtiger."
        },
        {
          type: "slide",
          title: "Folien 20–23 — Min–Max Schritt für Schritt am Diabetes-Datensatz",
          body: [
            "Die Folien 20 bis 23 bauen die Rechnung langsam auf, und zwar genau in der Reihenfolge, in der man sie selbst durchführen würde.",
            "**Schritt 1 (Folie 20): Minimum pro Spalte bestimmen.** Die Min-Zeile lautet Glucose 85, Blood Pressure 60, Skin Thickness 0, Insulin 0, BMI 25.2, Age 21.",
            "**Schritt 2 (Folien 21–22): Maximum pro Spalte bestimmen.** Die Max-Zeile lautet Glucose 148, Blood Pressure 90, Skin Thickness 35, Insulin 193, BMI 33.6, Age 50.",
            "**Schritt 3 (Folie 23): Jede Zelle in den Bruch einsetzen.** Die Folie schreibt in jede Zelle den Bruch (x − min) / (max − min) hinein. Für Patient 1 mit Glucose 148 steht dort (148 − 85) / (148 − 85), also 1.0, weil 148 genau das Maximum ist. Für Patient 502 mit Glucose 117 steht (117 − 85) / (148 − 85) = 32 / 63 ≈ 0.51.",
            "Rechne es einmal selbst nach, dann sitzt es: Age von Patient 2 ist 31, Min 21, Max 50, also (31 − 21) / (50 − 21) = 10 / 29 ≈ 0.34.",
            "Ein ehrlicher Blick auf die Daten: Skin Thickness und Insulin haben beide das Minimum 0. Eine Hautfaltendicke oder ein Insulinwert von exakt 0 ist physiologisch nicht plausibel. Das ist mit hoher Wahrscheinlichkeit ein kodierter fehlender Wert und genau der Typ Befund, den der EDA-Schritt **Question** auslösen soll. Nimmt man die 0 unbesehen als Minimum, verzerrt das die gesamte Skalierung dieser Spalte.",
            "Und ein Detail, das man leicht übersieht: Min und Max sind **beobachtete** Werte, keine Naturkonstanten. Sie hängen davon ab, welche Daten gerade im Datensatz liegen. Genau deshalb kommt gleich die Regel, aus welchen Daten sie geschätzt werden dürfen."
          ],
          remember: "Glucose: Min 85, Max 148. Age: Min 21, Max 50. Beispielrechnung: (117 − 85) / (148 − 85) ≈ 0.51. Min und Max sind beobachtete Werte, kodierte Nullen können sie verzerren."
        },
        {
          type: "checkpoint",
          id: "cp-scaling",
          title: "Checkpoint: Features und Feature Scaling",
          questions: [
            {
              id: "formel",
              type: "type",
              prompt: "Glucose hat Min = 85 und Max = 148. Welchen skalierten Wert erhält Glucose = 117? (zwei Nachkommastellen)",
              accept: ["0.51", "0,51", "0.508", "ca. 0.51", "rund 0.51"],
              placeholder: "z. B. 0.42",
              explanation: "(117 − 85) / (148 − 85) = 32 / 63 ≈ 0.51. Genau diese Rechnung zeigt Folie 23 für Patient 502."
            },
            {
              id: "intervall",
              type: "single",
              prompt: "Auf welches Intervall bildet Min–Max-Scaling die Werte ab?",
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
              explanation: "Der Note-Kasten auf Folie 16 widerlegt Aussage 2, Take-Home 06 widerlegt Aussage 4. Take-Home 05 stützt Aussage 3."
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

        /* ---------- Block 4: Folien 25–33 — Visualisierung ---------- */
        {
          type: "slide",
          title: "Folien 25, 28, 30, 32 — Erst die Frage, dann der Plot",
          body: [
            "Diese vier Folien bauen schrittweise dieselbe Übersicht auf, bis alle vier Felder gefüllt sind. Die Leitidee steht jedes Mal oben: **Eine nützliche Visualisierung beginnt mit einer Frage, nicht mit einer Plot-Funktion.** Verschiedene Plots zeigen verschiedene Aspekte der Daten.",
            { list: [
              "**DISTRIBUTION** – Wie ist eine numerische Variable verteilt? → **Histogram**, um typische Werte, Streuung, Schiefe und ungewöhnliche Beobachtungen zu untersuchen. Beispiel: Wie sind die Alter der Patienten verteilt?",
              "**GROUP COMPARISON** – Wie unterscheidet sich eine numerische Variable zwischen Gruppen? → **Box plot** oder **Violin plot**, um Verteilungen über Kategorien zu vergleichen. Beispiel: Unterscheidet sich die Length of Stay zwischen readmitted und non-readmitted Patienten?",
              "**RELATIONSHIP** – Wie variieren zwei numerische Variablen zusammen? → **Scatter plot**. Beispiel: Wie hängt das Alter mit der Length of Stay zusammen?",
              "**MANY VARIABLES** – Welche Variablen bewegen sich tendenziell gemeinsam? → **Correlation heatmap** als kompakter Überblick über paarweise Assoziationen. Beispiel: Welche Labormessungen variieren gemeinsam?"
            ]},
            "Merke dir das Schema als Entscheidungsregel: **eine Variable → Histogram. Eine Variable, mehrere Gruppen → Box plot. Zwei Variablen → Scatter plot. Viele Variablen → Correlation heatmap.** Damit kannst du praktisch jede Plot-Frage der Vorlesung beantworten.",
            "Ein typischer Fehler ist, die Reihenfolge umzudrehen: zuerst einen Plot bauen, weil die Funktion gerade zur Hand ist, und danach eine Frage dazu erfinden. Dabei entstehen hübsche Bilder, die nichts entscheiden."
          ],
          remember: "Eine Variable → Histogram. Gruppenvergleich → Box plot oder Violin plot. Zwei Variablen → Scatter plot. Viele Variablen → Correlation heatmap. Die Frage bestimmt den Plot."
        },
        {
          type: "slide",
          title: "Folien 26–27 — Histogram: die Verteilung einer Variable",
          body: [
            "Eine **Distribution** zeigt, wie sich die beobachteten Werte einer Variable über den Datensatz verteilen. Die Folie formuliert eine klare Arbeitsregel: Bevor du eine numerische Variable mit Mittelwert oder Median zusammenfasst, **schau dir ihre Verteilung an und prüfe, was diese Kennzahlen verbergen könnten**.",
            "Ein **Histogram** teilt eine numerische Variable in Intervalle, die sogenannten **Bins**, und zeigt, wie viele Beobachtungen in jedes Intervall fallen. Im Beispiel der Folie zählt jeder Balken die Patienten, deren Alter in das jeweilige Intervall fällt.",
            "Worauf du achten sollst:",
            { list: [
              "**Centre**: Wo konzentrieren sich die meisten Beobachtungen?",
              "**Spread**: Wie stark streuen die Werte?",
              "**Shape**: Ist die Verteilung symmetrisch, schief, oder besteht sie aus mehreren Gruppen?",
              "**Unusual observations**: Gibt es Werte weit weg vom Rest, die eine Untersuchung verdienen?"
            ]},
            "Folie 27 zeigt, warum das keine Formsache ist. Zwei Kohorten haben **exakt denselben Mittelwert von 60 Jahren**. Kohorte A ist um 60 herum konzentriert, das ist eine gewöhnliche eingipflige Verteilung. Kohorte B besteht aus **zwei getrennten Gruppen**, eine um 40 und eine um 80, und dazwischen liegt praktisch niemand.",
            "Der Mittelwert von 60 liegt bei Kohorte B also genau dort, wo kaum ein Patient ist. Er beschreibt niemanden. Zwei Populationen mit identischer Kennzahl können klinisch völlig verschieden sein, und eine Tabelle mit Mittelwerten hätte diesen Unterschied vollständig verborgen."
          ],
          remember: "Histogram = Bins plus Häufigkeiten. Achte auf Centre, Spread, Shape und unusual observations. Gleicher Mittelwert heisst nicht gleiche Population: zwei Gruppen um 40 und 80 ergeben auch Mittelwert 60."
        },
        {
          type: "slide",
          title: "Folie 29 — Box plot: Gruppen vergleichen",
          body: [
            "Wenn Patienten zu verschiedenen Gruppen gehören, kann der alleinige Blick auf die Mittelwerte wichtige Unterschiede verbergen. Ein **Box plot** gibt eine kompakte Sicht auf Zentrum, Streuung und ungewöhnliche Beobachtungen einer numerischen Variable **innerhalb jeder Gruppe**.",
            "So liest du ihn:",
            { list: [
              "**Median**: Die Linie innerhalb der Box markiert die mittlere Beobachtung.",
              "**Interquartile range**: Die Box enthält die mittleren 50 % der Beobachtungen.",
              "**Whiskers**: Sie zeigen den Wertebereich jenseits der Box gemäss der gewählten Box-Plot-Konvention. Es gibt mehrere übliche Konventionen, deshalb ist die Länge der Whisker nicht absolut festgelegt.",
              "**Punkte jenseits der Whiskers**: Das sind Beobachtungen, die eine Untersuchung verdienen. Die Folie betont ausdrücklich: Sie sind **nicht automatisch Fehler**."
            ]},
            "Das Beispiel ist Length of Stay nach 30-Tage-Readmission-Status. Jede Box fasst die Verteilung der Aufenthaltsdauer innerhalb einer Patientengruppe zusammen. Im Plot der Folie liegt der Median der nicht wieder aufgenommenen Patienten bei rund 3 Tagen, jener der wieder aufgenommenen bei knapp 5 Tagen, und die Gruppe ohne Readmission zeigt viele einzelne Punkte oberhalb der Whisker.",
            "Der letzte Punkt ist direkt mit dem EDA-Zyklus verbunden: Punkte jenseits der Whisker sind ein **Question**-Signal, kein **Decide**-Signal. Sie sind der Anlass zum Nachprüfen, nicht die Begründung zum Löschen."
          ],
          remember: "Box plot: Median = Linie, Box = Interquartilsabstand mit den mittleren 50 %, Whisker gemäss Konvention, Punkte darüber hinaus sind beachtenswert, aber nicht automatisch Fehler."
        },
        {
          type: "slide",
          title: "Folie 31 — Scatter plot: zwei Variablen zusammen",
          body: [
            "Ein **Scatter plot** zeigt den Zusammenhang zwischen **zwei numerischen Variablen**. Auf jeder Achse liegt eine Variable, und jeder Punkt stellt **eine Beobachtung** dar. Im Beispiel der Folie ist das Patientenalter gegen die Length of Stay aufgetragen, und jeder Punkt ist eine Spitalaufnahme.",
            "Worauf du achten sollst:",
            { list: [
              "**Direction**: Treten grössere Werte der einen Variable eher zusammen mit grösseren oder mit kleineren Werten der anderen auf?",
              "**Strength**: Folgen die Beobachtungen einem klaren Muster, oder streuen sie breit?",
              "**Shape**: Wirkt der Zusammenhang annähernd linear, gekrümmt oder komplexer?",
              "**Clusters**: Gibt es Gruppierungen? Auch hier gilt: Sie sind beachtenswert, aber nicht automatisch Fehler."
            ]},
            "Der Scatter plot ist die natürliche Ergänzung zum Histogram: Das Histogram beschreibt eine Variable für sich, der Scatter plot beschreibt, wie zwei Variablen gemeinsam variieren. Und er zeigt Dinge, die eine einzelne Korrelationszahl nicht zeigt, zum Beispiel eine gekrümmte Beziehung oder zwei getrennte Punktwolken."
          ],
          remember: "Scatter plot = zwei numerische Variablen, ein Punkt pro Beobachtung. Achte auf Direction, Strength, Shape und Clusters."
        },
        {
          type: "slide",
          title: "Folie 33 — Correlation heatmap: viele Variablen auf einen Blick",
          body: [
            "Wenn ein Datensatz viele numerische Variablen enthält, wird es mühsam, jedes Paar einzeln anzuschauen. Bei 6 Variablen gibt es schon 15 Paare. Eine **Correlation heatmap** stellt die Korrelationsmatrix farbig dar und macht damit viele paarweise Beziehungen auf einmal prüfbar.",
            "Jede Zelle vergleicht zwei numerische Variablen, und der Wert gibt **Richtung und Stärke ihrer linearen Assoziation** an. So liest du die Zahlen:",
            { list: [
              "**Positive Korrelation**: Werte näher bei +1 bedeuten, dass zwei Variablen tendenziell gemeinsam steigen.",
              "**Negative Korrelation**: Werte näher bei −1 bedeuten, dass eine Variable tendenziell fällt, während die andere steigt.",
              "**Weak linear correlation**: Werte nahe 0 bedeuten **wenig lineare Assoziation**.",
              "**Diagonale**: Eine Variable ist perfekt mit sich selbst korreliert, diese Zellen sind deshalb immer 1."
            ]},
            "Im Beispiel der Folie ist die stärkste Assoziation Age mit Systolic BP bei 0.31, Age mit Glucose liegt bei 0.19, und Heart rate mit Creatinine bei −0.00.",
            "Zwei Fallen, die du dir merken solltest. Erstens: Nahe 0 heisst **wenig lineare** Assoziation, nicht „kein Zusammenhang\". Eine gekrümmte Beziehung kann eine Korrelation nahe null erzeugen, und genau deshalb lohnt sich zusätzlich ein Scatter plot. Zweitens: Die Folie spricht von **Assoziation**, nie von Ursache. Aus 0.31 zwischen Age und Systolic BP folgt kein kausaler Zusammenhang.",
            "Die Heatmap ist ein **Screening-Werkzeug**: Sie zeigt, welche Beziehungen eine genauere Untersuchung verdienen."
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
              prompt: "Kohorte A ist um 60 konzentriert, Kohorte B besteht aus zwei Gruppen um 40 und 80. Beide haben Mittelwert 60. Was folgt daraus?",
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
              id: "diagonale",
              type: "type",
              prompt: "Welchen Wert haben die Zellen auf der Diagonale einer Correlation heatmap immer?",
              accept: ["1", "1.00", "1.0", "eins", "+1", "genau 1"],
              placeholder: "Zahl",
              explanation: "Eine Variable ist perfekt mit sich selbst korreliert, deshalb steht dort immer 1."
            },
            {
              id: "nahe-null",
              type: "multi",
              prompt: "Eine Korrelation von −0.00 zwischen Heart rate und Creatinine bedeutet …",
              options: [
                "… wenig lineare Assoziation zwischen den beiden Variablen",
                "… dass ein nichtlinearer Zusammenhang trotzdem bestehen könnte",
                "… dass sicher überhaupt kein Zusammenhang besteht",
                "… dass eine der beiden Variablen fehlerhaft gemessen wurde"
              ],
              correct: [0, 1],
              explanation: "Die Folie spricht ausdrücklich von weak linear correlation. Nichtlineare Zusammenhänge bleiben möglich und werden im Scatter plot sichtbar."
            }
          ]
        },

        /* ---------- Block 5: Folien 35–40 — Sampling ---------- */
        {
          type: "slide",
          title: "Folie 35 — Target population, Sampling frame, Sample",
          body: [
            "Wir beobachten fast nie jedes Individuum der Population, die wir verstehen wollen. **Sampling entscheidet, wer in den Datensatz kommt, und damit auch, welche Population unsere Schlussfolgerungen überhaupt repräsentieren können.** Das ist der Grund, warum Sampling in eine Vorlesung über Datenqualität gehört.",
            "Drei Begriffe, die sich wie drei ineinander liegende Kreise verhalten:",
            { list: [
              "**Target population**: die Population, über die wir Aussagen machen wollen. Beispiel der Folie: Erwachsene, die mit Herzinsuffizienz in Schweizer Spitälern aufgenommen werden.",
              "**Sampling frame**: die Individuen, die tatsächlich ausgewählt werden könnten. Beispiel: die erfassten, grundsätzlich einschliessbaren Aufenthalte der teilnehmenden Spitäler.",
              "**Sample**: die Individuen, die am Ende in der Analyse landen. Beispiel: 2'000 ausgewählte Aufenthalte."
            ]},
            "Zwischen diesen Kreisen entstehen die interessanten Fragen. Wenn der Sampling frame nur Universitätsspitäler umfasst, die Target population aber alle Schweizer Spitäler sein soll, dann passt das Ergebnis nicht auf kleinere Regionalspitäler, egal wie gut das Modell ist.",
            "Schlag hier auch die Brücke zum Eröffnungsfall: Dass 70 % der positiven Outcomes von einem Standort stammen, ist genau so eine Sampling- und Repräsentativitätsfrage."
          ],
          remember: "Target population = über wen wir Aussagen wollen. Sampling frame = wer auswählbar wäre. Sample = wer am Ende drin ist. Sampling bestimmt, welche Population die Schlüsse tragen."
        },
        {
          type: "slide",
          title: "Folien 36–37 — Simple random und Systematic random sampling",
          body: [
            "Das Ziel aller Verfahren ist dasselbe: eine **repräsentative Teilmenge** einer grösseren Population oder eines grösseren Datensatzes gewinnen. Die Folien führen vier Typen an derselben Tabelle mit zwölf Personen vor, mit Firstname, Lastname, Gender, Degree, Nationality, Marital Status und Age.",
            "**Simple random sampling**: Jedes Sample kann mit **derselben Wahrscheinlichkeit** ausgewählt werden. Kein Attribut spielt eine Rolle, es entscheidet allein der Zufall. In der Grafik sind einzelne Personen scheinbar wahllos über die Reihe verteilt markiert.",
            "**Systematic random sampling**: Die Daten werden **nach einem bestimmten Attribut geordnet**, und dann wird **jedes k-te Element** ausgewählt. Auf der Folie ist die Tabelle nach Age sortiert, die Reihenfolge lautet 23, 24, 25, 25, 28, 32, 33, 35, 37, 38, 41, 45, und ausgewählt wird jede zweite Person.",
            "Der Unterschied in einem Satz: Beim Simple random sampling entscheidet nur der Zufall, beim Systematic random sampling entscheidet eine **feste Regel auf einer Ordnung**. Systematic ist in der Praxis oft einfacher umzusetzen, kann aber danebengehen, wenn die Ordnung selbst ein Muster enthält, das zufällig mit dem Abstand k zusammenfällt."
          ],
          remember: "Simple random: gleiche Auswahlwahrscheinlichkeit für jedes Sample. Systematic random: nach einem Attribut ordnen und jedes k-te Element nehmen."
        },
        {
          type: "slide",
          title: "Folien 38–40 — Stratified und Cluster random sampling",
          body: [
            "**Stratified random sampling**: Die Population wird mithilfe bestimmter Attribute in **Untergruppen, die Strata**, geteilt. Danach werden **aus jedem Stratum** zufällig Samples gezogen. Auf der Folie ist die Tabelle nach Nationality in drei farbige Gruppen geteilt, und aus jeder Gruppe werden einzelne Personen gezogen, erkennbar an den Pfeilen unter der Tabelle.",
            "**Cluster random sampling**: Die Samples werden in **Cluster** eingeteilt. Danach werden **einige Cluster zufällig ausgewählt**, und **alle Individuen innerhalb der ausgewählten Cluster** werden eingeschlossen. Auf der Folie sind zwei der drei Cluster mit einem Kreuz markiert, also ausgeschlossen, und der verbleibende Cluster kommt vollständig in die Stichprobe.",
            "Der Unterschied ist prüfungsrelevant und wird oft verwechselt, deshalb in einem Satz: **Stratified zieht aus jeder Gruppe, Cluster nimmt oder verwirft ganze Gruppen.**",
            "Eine klinische Übersetzung macht es greifbar: Du willst 300 Patienten. Teilst du nach Altersgruppen und ziehst aus jeder Altersgruppe zufällig, ist das stratified, und alle Altersgruppen sind garantiert vertreten. Wählst du drei von zehn Spitälern zufällig aus und nimmst dort alle Patienten, ist das cluster, und ob alle Altersgruppen vorkommen, hängt davon ab, welche Spitäler du erwischt hast.",
            "**Achtung, Fehler auf der Übersichtsfolie 40**: Dort wiederholt der Bullet zu Stratified random sampling versehentlich den Wortlaut von Cluster random sampling („divide the samples into clusters …\"). Die korrekte Definition ist die der eigenen Folie 38: in Strata unterteilen und **aus jedem Stratum** zufällig ziehen. Lerne die Version von Folie 38."
          ],
          remember: "Stratified: in Strata teilen und aus jedem Stratum zufällig ziehen. Cluster: Cluster bilden, einige zufällig auswählen, dort alle einschliessen. Folie 40 enthält beim Stratified-Bullet einen Textfehler, gültig ist Folie 38."
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
              options: [
                "Systematic random sampling",
                "Simple random sampling",
                "Stratified random sampling",
                "Cluster random sampling"
              ],
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
              id: "simple",
              type: "type",
              prompt: "Wie heisst das Verfahren, bei dem jedes Sample mit derselben Wahrscheinlichkeit ausgewählt werden kann? (englischer Begriff)",
              accept: ["simple random sampling", "simple random", "einfache Zufallsstichprobe", "simple random sample"],
              placeholder: "englischer Fachbegriff",
              explanation: "Simple random sampling: every sample can be selected with the same probability."
            }
          ]
        },

        /* ---------- Block 6: Folien 42–43 — Take-Home Messages ---------- */
        {
          type: "slide",
          title: "Folien 42–43 — Die sechs Take-Home Messages",
          body: [
            "Die Zusammenfassung steht unter zwei Überschriften. Folie 42: **Understand the data before changing the data.** Folie 43: **Prepare the data without losing their meaning.**",
            { list: [
              "**01 Start with what an observation represents.** Eine Zeile ist nicht automatisch ein Patient. Sie kann einen Patienten, einen Encounter, ein Image oder eine Measurement darstellen. Wiederholte Beobachtungen derselben Person sind verwandt und müssen entsprechend behandelt werden.",
              "**02 Look at distributions, not only summary statistics.** Ein Mittelwert kann die Patienten verbergen. Untersuche Shape, Spread, Untergruppen und ungewöhnliche Beobachtungen. Verschiedene Patientenpopulationen können denselben Durchschnitt haben.",
              "**03 Missing and unusual values require explanation.** Korrigiere die Daten nicht, bevor du verstanden hast, warum sie ungewöhnlich aussehen. Missingness kann klinische Entscheidungen abbilden, und ein extremer Wert kann ein Fehler, ein Einheitenproblem oder ein echter Patient sein.",
              "**04 Visualisation should answer a question.** Wähle den Plot danach, was du lernen willst: Distributions für eine Variable, Group comparisons zum Vergleich von Populationen, Scatter plots für Beziehungen, Correlation heatmaps zum Screening vieler paarweiser Assoziationen.",
              "**05 Preprocessing is a modelling decision.** Scaling, Encoding und andere Transformationen verändern, wie ein Modell die Daten sieht. Bewahre die Bedeutung der Variablen und **schätze die Preprocessing-Parameter nur mit den Trainingsdaten**.",
              "**06 Data readiness comes before model selection.** Ein besserer Algorithmus repariert keinen schlecht definierten Datensatz. Prüfe Sampling, Repräsentativität, Missingness, Klassenbalance, Messkonsistenz und Informationsverfügbarkeit, bevor du fragst, welches Modell trainiert werden soll."
            ]},
            "Take-Home 05 ist die eine Regel, bei der Studierende in der Praxis am häufigsten stolpern. Wer Min und Max über den ganzen Datensatz berechnet und erst danach in Training und Test teilt, lässt Information aus dem Testsatz in die Transformation fliessen. Die gemessene Leistung ist dann zu optimistisch. Richtig ist: zuerst splitten, dann die Parameter nur auf den Trainingsdaten bestimmen und mit genau diesen Werten auch Validierungs- und Testdaten transformieren.",
            "Und Take-Home 06 schliesst den Bogen zum Eröffnungsfall: Genau deshalb löst kein besserer Algorithmus die fünf Probleme von Folie 6."
          ],
          remember: "01 Beobachtung klären, 02 Verteilungen statt nur Kennzahlen, 03 Fehlendes und Auffälliges erklären, 04 Plot nach Frage wählen, 05 Preprocessing ist eine Modellierungsentscheidung mit Parametern nur aus Trainingsdaten, 06 Data readiness vor Modellwahl."
        },
        {
          type: "checkpoint",
          id: "cp-takehome",
          title: "Checkpoint: Take-Home Messages",
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
              explanation: "Take-Home 05: estimate preprocessing parameters using the training data only. Sonst fliesst Information aus dem Testsatz in die Transformation."
            },
            {
              id: "readiness",
              type: "single",
              prompt: "Was sagt Take-Home 06 über die Beziehung zwischen Algorithmus und Datensatz?",
              options: [
                "Ein besserer Algorithmus repariert keinen schlecht definierten Datensatz",
                "Ein ausreichend grosses Modell gleicht Datenprobleme aus",
                "Die Modellwahl soll vor der Datenprüfung erfolgen",
                "Data readiness ist nur bei kleinen Datensätzen relevant"
              ],
              correct: 0,
              explanation: "Data readiness kommt vor der Modellwahl. Erst Sampling, Repräsentativität, Missingness, Klassenbalance, Messkonsistenz und Verfügbarkeit prüfen."
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
              explanation: "Die Programmiersprache kommt auf der Folie nicht vor. Die fünf anderen Punkte stehen genau so in Take-Home 06."
            },
            {
              id: "zeile-patient",
              type: "multi",
              prompt: "Was gehört zu Take-Home 01?",
              options: [
                "Eine Zeile ist nicht automatisch ein Patient",
                "Eine Zeile kann Patient, Encounter, Image oder Measurement darstellen",
                "Wiederholte Beobachtungen derselben Person sind verwandt und müssen entsprechend behandelt werden",
                "Mehr Zeilen bedeuten immer mehr statistische Aussagekraft"
              ],
              correct: [0, 1, 2],
              explanation: "Gerade weil Zeilen abhängig sein können, bedeuten mehr Zeilen nicht automatisch mehr Information."
            }
          ]
        }
      ]
    }
  ]
});
