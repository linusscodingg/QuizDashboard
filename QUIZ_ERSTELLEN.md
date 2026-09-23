# Neue Quiz erstellen

Diese Anleitung richtet sich an Personen, die ein neues interaktives Quiz zum ZHAW-Quiz-Dashboard hinzufügen. Ein Quiz gilt erst als vollständig integriert, wenn es im Dashboard erscheint, Fortschritt speichern kann und abgeschlossene Versuche in Auswertung und Lernvergleich einfliessen.

## Kurzablauf

1. Offizielle Quelle vollständig prüfen.
2. Ein bestehendes Quiz als technische Vorlage verwenden.
3. Neue HTML-Datei unter `quizzes/<FACH>/` speichern.
4. Fragen, Lösungen, Quellenangaben und Punkte eintragen.
5. Eindeutige Quiz-ID und eigenen `localStorage`-Schlüssel vergeben.
6. Genau einen Eintrag in `quiz-catalog.js` ergänzen.
7. Dashboard-Kommunikation und Ranglistenintegration prüfen.
8. Automatische Tests und einen vollständigen Versuch im Browser durchführen.

## 1. Quellen und Inhalt

Die offizielle Vorlesung, Übung oder Laboranleitung ist die wichtigste Quelle. Lösungen müssen vor der Veröffentlichung fachlich geprüft werden.

- Offizielle Unterlagen nicht in `QuizDashboard` kopieren. Sie bleiben im jeweiligen Fachordner.
- Im Katalog steht unter `source` nur der verständliche Dateiname der Quelle.
- Jede Aufgabe erhält möglichst eine genaue Folien-, Seiten- oder Abschnittsreferenz.
- Widersprechen sich Aufgabenblatt und Folien, muss die Abweichung in der Lösung transparent erklärt werden.
- Keine Termine, Prüfungsregeln oder fachlichen Aussagen erfinden.
- Originalfragen dürfen unverändert übernommen werden, wenn genau diese Übung trainiert werden soll.

## 2. Datei und Benennung

Neue Quiz liegen hier:

```text
QuizDashboard/quizzes/<FACH>/<DATEINAME>.html
```

Beispiel:

```text
QuizDashboard/quizzes/CNS1/W1_IPv6_Exercise_01a.html
```

Jedes Quiz braucht eine stabile, eindeutige ID nach diesem Muster:

```text
<fach>-w<woche>-<kurzes-thema>
```

Beispiel:

```js
const DASHBOARD_QUIZ_ID = "cns1-w1-ipv6-exercise-01a";
```

Die ID darf später nicht ohne Migration geändert werden, weil gespeicherte Versuche darüber zugeordnet werden.

Jedes Quiz braucht ausserdem einen eigenen Speicher-Schlüssel:

```js
const STORAGE_KEY = "cns1-ipv6-exercise-01a-review-v1";
```

Nie den Schlüssel eines anderen Quiz wiederverwenden.

## 3. Aufbau der Aufgaben

Das Dashboard unterstützt vor allem diese Aufgabentypen:

- `single`: genau eine richtige Auswahl
- `multi`: mehrere richtige Auswahlen
- `order`: Elemente in die richtige Reihenfolge bringen
- `text`: freie Antwort mit anschliessender Selbsteinschätzung

Jede Aufgabe braucht mindestens:

```js
{
  id: "eindeutige-aufgaben-id",
  type: "text",
  topic: "Neighbor Discovery",
  points: 10,
  prompt: "Die eigentliche Frage",
  hint: "Optionaler Hinweis",
  solution: "Erwartete Lösung mit Begründung",
  reference: "Folie 44 oder Exercise S. 2",
  concepts: ["Neighbor Discovery", "ICMPv6"]
}
```

Bei `single` und `multi` müssen zusätzlich alle Antwortmöglichkeiten, die korrekte Auswahl und eine Erklärung pro Option vorhanden sein:

```js
options: ["Antwort A", "Antwort B", "Antwort C"],
correct: 1,
optionExplanations: [
  "Warum A falsch ist.",
  "Warum B richtig ist.",
  "Warum C falsch ist."
]
```

Bei `multi` ist `correct` ein Array, zum Beispiel `correct: [0, 2]`.

Die Summe aller Aufgabenpunkte muss exakt dem `maximumScore` im Katalog entsprechen. Rund 100 Punkte sind praktisch, aber nicht zwingend.

## 4. Lösungen und Bewertung

Lösungen dürfen vor der Abgabe nicht sichtbar sein.

- Jede Aufgabe hat genau einen Button **Antwort prüfen**.
- Nach der Abgabe wird die Antwort gesperrt.
- Automatisch bewertbare Aufgaben zeigen sofort richtig, falsch und verpasst an.
- Freitextaufgaben zeigen danach die Musterlösung und verlangen eine ehrliche Selbsteinschätzung: vollständig richtig, teilweise richtig oder falsch.
- Eine einzelne Aufgabe darf im gleichen Versuch nicht erneut beantwortet werden.
- Nur ein vollständiger Reset startet mit einer neuen `attemptId` einen neuen Versuch.

Bei Freitextlösungen sollen nicht nur Stichwörter stehen. Die Musterlösung muss erklären, warum die Antwort stimmt und welche Punkte für eine vollständige Antwort nötig sind.

## 5. Fortschritt und Abschluss

Das Quiz muss Antworten, Punkte, aktuelle Aufgabe, geöffnete Lösungen und Selbsteinschätzungen in `localStorage` sichern. Ein Neuladen darf den Zwischenstand nicht verlieren.

Erforderliche Funktionen:

- automatische Speicherung bei Änderungen
- Button **Zwischenstand speichern**
- Wiederaufnahme bei der zuletzt geöffneten Aufgabe
- bestätigter Reset des aktuellen Versuchs
- neue `attemptId` nach dem Reset
- abgeschlossene ältere Versuche im Dashboard nicht löschen
- Ergebnisexport als JSON, wenn möglich

## 6. Eintrag im Quiz-Katalog

In `quiz-catalog.js` genau einen passenden Eintrag ergänzen:

```js
{
  id: "cns1-w1-ipv6-exercise-01a",
  subject: "CNS1",
  week: 1,
  title: "IPv6 – Exercise 01a",
  source: "CNS1-exr-01a-ipv6.pdf",
  path: "quizzes/CNS1/W1_IPv6_Exercise_01a.html",
  maximumScore: 100
}
```

Wichtig:

- `id` muss exakt der `DASHBOARD_QUIZ_ID` im HTML entsprechen.
- `subject` muss einer Fach-ID aus `subjects` entsprechen.
- `path` ist relativ zum Ordner `QuizDashboard`.
- `maximumScore` entspricht exakt der Summe der Aufgabenpunkte.
- Kein zweiter Katalogeintrag mit derselben ID.

## 7. Dashboard- und Ranglistenintegration

Ein Katalogeintrag allein genügt nicht. Das Quiz muss nach Abschluss eine Nachricht an das Dashboard senden:

```js
{
  source: "quiz-dashboard",
  version: 1,
  type: "quiz-completed",
  quizId: DASHBOARD_QUIZ_ID,
  attempt: {
    attemptId,
    completedAt,
    score,
    maximumScore,
    percentage,
    grade,
    understanding,
    strongConcepts,
    uncertainConcepts,
    weakConcepts,
    reviewItems
  }
}
```

Für unfertige Versuche werden entsprechend `quiz-progress` und beim Reset `quiz-progress-reset` gesendet.

Damit ein neues Quiz im Lernvergleich beziehungsweise in der Rangliste erscheint, müssen alle folgenden Bedingungen erfüllt sein:

1. Das Quiz steht in `quiz-catalog.js`.
2. Katalog-ID und `DASHBOARD_QUIZ_ID` sind identisch.
3. Der Versuch wurde vollständig abgeschlossen.
4. Das Quiz hat eine gültige `quiz-completed`-Nachricht gesendet.
5. Für die Cloud-Rangliste ist die Person mit GitHub angemeldet.

Der Lernvergleich liest die Quiz automatisch aus dem Katalog. Es ist kein separater Ranglisten-Eintrag nötig. Veröffentlicht werden nur aggregierte Ergebnisse; Antworten und Fehlerdetails bleiben im persönlichen Dashboard.

## 8. Qualitätsprüfung

Vor dem Abschluss mindestens Folgendes prüfen:

- Alle Fragen und Lösungen stimmen mit den offiziellen Quellen überein.
- Lösungen sind vor **Antwort prüfen** unsichtbar.
- Nach der Abgabe sind Eingaben gesperrt.
- Zurück, Weiter und Aufgabenübersicht funktionieren.
- Neuladen erhält den Zwischenstand.
- Reset erzeugt einen neuen Versuch.
- Punktesumme und `maximumScore` stimmen überein.
- Abschluss zeigt Prozent, Lernnote und Verständnisstatus korrekt.
- Das Quiz erscheint im Dashboard.
- Ein abgeschlossener Versuch erscheint in Verlauf und Lernvergleich.
- Darstellung funktioniert auch auf einem schmalen Bildschirm.

Dashboard-Test aus dem Ordner `QuizDashboard`:

```powershell
node --test tests/dashboard.test.js
```

Zusätzlich immer einen vollständigen Versuch im Browser durchführen. Dabei mindestens eine Aufgabe falsch oder teilweise richtig bewerten, damit auch Fehleransicht und Teilpunkte geprüft werden.

## 9. Häufige Fehler

- Quizdatei erstellt, aber nicht im Katalog registriert
- unterschiedliche Quiz-IDs in HTML und Katalog
- derselbe `STORAGE_KEY` in mehreren Quiz
- falsche Punktesumme im Katalog
- Lösung bereits im Fragetext, Hinweis oder Bild sichtbar
- bei Multiple Choice keine Erklärung für einzelne Optionen
- Freitext erhält automatisch Punkte, bevor die Lösung betrachtet und bewertet wurde
- `quiz-completed` fehlt; dadurch erscheinen Versuche nicht im Dashboard oder Lernvergleich
- offizielle PDFs oder Folien unnötig in den Dashboard-Ordner kopiert
- nur die erste Seite oder ein Ausschnitt der Quelle geprüft

## 10. Definition of Done

Ein neues Quiz ist fertig, wenn:

- die Inhalte fachlich belegt sind,
- die HTML-Datei lokal vollständig funktioniert,
- genau ein korrekter Katalogeintrag existiert,
- Fortschritt und Abschluss im Dashboard ankommen,
- der Versuch im persönlichen Verlauf und Lernvergleich erscheint,
- die relevanten Tests bestanden sind und
- keine persönlichen Notizen verändert wurden, sofern beim Lernen keine echte Wissenslücke entstanden ist.

