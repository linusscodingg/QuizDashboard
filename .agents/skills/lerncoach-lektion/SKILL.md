---
name: lerncoach-lektion
description: >-
  Erstellt oder überarbeitet quellengestützte Lerncoach-Lektionen und zugehörige
  Quizmodule im QuizDashboard aus ZHAW-Vorlesungen und Übungen. Für die Erstellung
  von Lernmaterial im Repo, nicht für reine Tutorfragen oder allgemeine UI-Arbeit.
---

# Lerncoach-Lektion aus einer Vorlesung bauen

Ziel: Lernende verstehen die Zusammenhänge einer Vorlesung und können ihre belegten Lernziele anwenden. Erstelle die angefragten Materialien: Lektion, Quiz oder beides. Ein vorhandenes Modul gezielt überarbeiten, wenn es dieselbe Quelle abdeckt; keine zweite Version allein wegen dieses Skills erzeugen.

## 1. Auftrag, Repo und Quellen zuordnen

Ermittle den Repo-Root anhand von `quiz-catalog.js` und `lerncoach/manifest.js`. Die folgenden Pfade sind relativ dazu; verwende keinen fest eingetragenen Benutzer- oder Semesterpfad. Ermittle den Quellenordner aus dem Auftrag und dem vorhandenen Kurskontext. Frage nur nach, wenn Quelle oder Zuordnung nicht zuverlässig feststehen.

Lies geltende `AGENTS.md`, auch im Quellenordner, sowie die für den Auftrag relevanten Anleitungen:

- [LERNCOACH_ERSTELLEN.md](../../../LERNCOACH_ERSTELLEN.md): Inhaltsschema, Blöcke, Checkpoints, Registrierung und Speicherung.
- [QUIZ_ERSTELLEN.md](../../../QUIZ_ERSTELLEN.md): Quizschema, Bewertung, Dashboard-Kommunikation und Pflichtprüfungen.
- [SKILL.md: lecture-review](../../../SKILL.md): ergänzende Quizdidaktik bei einem Quizauftrag. Der Lerncoach erklärt den Stoff; das eigenständige Review prüft bereits Gelerntes.

| Material | Ablage und Registrierung |
|---|---|
| Neue Lerncoach-Woche | `lerncoach/content/<FACH>.js`, vorhandenes `weeks` ergänzen |
| Neues Lerncoach-Fach | Eigene Inhaltsdatei und genau ein Pfad in `lerncoach/manifest.js` |
| Eigenständiges Quiz | `quizzes/<FACH>/W<n>_<Thema>.html` und genau ein passender Eintrag in `quiz-catalog.js` |
| Offizielle Unterlagen | Ausserhalb des Dashboard-Repos im ermittelten Quellenordner belassen |

Prüfe Fach, Thema, Quelldatei, Semester und Woche gemeinsam. Gleiche Wochennummern sind kein Beleg für dieselbe Vorlesung: Im bestehenden SWS1-Bestand behandeln W3-Quiz und W3-Lerncoach unterschiedliche Quellen. Ergänze einen Katalogeintrag nur für ein tatsächlich erstelltes Quiz; der Lerncoach-Modus „Nur Quiz machen“ benötigt kein zusätzliches HTML-Quiz.

Wähle eine technisch und didaktisch passende Vorlage und prüfe ihren aktuellen Stand. DHEAL W3 zeigt vielfältige Lernformen, IT-Recht W2 eine Ausrichtung auf Open Book, CNS1 W4 Rechnungen und Abläufe. Übernimm keine Fakten oder vermuteten Prüfungsregeln ungeprüft aus diesen Beispielen. Erhalte die Zeilenenden bestehender Dateien; im Repo ist CRLF üblich.

## 2. Quellen vollständig erfassen und fachlich prüfen

Lies die vollständige angefragte Vorlesung oder Übung. Nutze zunächst `pdftotext`, falls verfügbar. Wenig extrahierter Text kann auf Bildseiten hinweisen. Rendere solche Seiten mit `pdftoppm` oder einem verfügbaren PDF-Werkzeug und lies sie visuell. Prüfe Diagramme, Tabellen, Formeln, Hervorhebungen und schrittweise Aufbauten auch bei gutem Textextrakt visuell; Text allein erhält diese Informationen nicht zuverlässig. Erzeuge temporäre Renderdateien ausserhalb des Repos.

Halte Quelle und genaue Seiten-, Folien- oder Abschnittsreferenzen für Erklärungen, Aufgaben und Lösungen fest. Unterscheide bei abweichender Zählung PDF-Seite und gedruckte Foliennummer. Kennzeichne eigene Lernbeispiele und Transferfälle; belege die zugrunde liegenden Konzepte, statt erfundene Szenarien der Vorlesung zuzuschreiben.

Bei Widersprüchen beide Stellen vergleichen und nach offiziellen Korrekturen oder aktuelleren Kursunterlagen suchen. Die längere Folie hat nicht automatisch recht. Prüfe verdächtige fachliche Aussagen bei Bedarf anhand autoritativer Primärquellen und trenne Kursdarstellung, belegte Korrektur und offene Unsicherheit. Ungeklärte Widersprüche nicht als eindeutig bewertete Fragen verwenden.

Rechne Zahlenbeispiele unabhängig nach und kontrolliere Einheiten, Bezugsgrössen und Randbedingungen. Technisch gültige Inhalte können fachlich falsch sein; ein erfolgreicher Test ersetzt diese Prüfung nicht.

Übernimm keine offiziellen PDFs oder Folienbilder ins Dashboard. Erstelle eigene Erklärungen und nötige Diagramme aus belegten Daten; kennzeichne illustrative Daten als eigene Beispiele. Leite aus „selbst nachgebaut“ keine pauschale Veröffentlichungsfreigabe ab.

## 3. Lernziele, Gewichtung und Umfang bestimmen

Erkenne die zusammenhängende Fragestellung der Vorlesung. Ordne die Themen intern nach:

- **A – aktiv können:** erklären, reproduzieren oder anwenden.
- **B – verstehen:** Zusammenhänge und Voraussetzungen erfassen.
- **C – einordnen:** ergänzender Kontext, kurz behandeln.

Priorisiere belegte Prüfungsangaben und explizite Lernziele, danach Übungen und Take-Home Messages. Wiederholungen, ausführliche Rechnungen und optische Hervorhebungen sind ergänzende Hinweise. Kennzeichne daraus abgeleitete Prüfungsrelevanz als Einschätzung. Wiederholung und Formalismus nicht pauschal zu C erklären; sie können notwendige Grundlagen sein.

Plane eine kompakte Zuordnung: Lernziel → Quelle → Gewichtung → Lernaktivität → Checkpoint/Quizaufgabe. Decke A-Ziele mit Anwendung ab; wähle zusätzliche Visualisierungen nur, wenn sie das Verständnis verbessern. Bündle C-Inhalte knapp, ohne wesentliche Voraussetzungen wegzukürzen.

Lege Erklärungssprache und Fragensprache getrennt fest. Ohne andere Vorgabe verständliche deutsche Erklärungen mit erläuterten Fachbegriffen verwenden. Belegte Prüfungssprache und bestehende Fachkonventionen erhalten, etwa englische CNS1-/SWS1-Checkpoints. Open Book verlangt vor allem Fallanwendung, begründete Einordnung und gezieltes Nachschlagen.

Als Orientierung eignen sich für eine normale Vorlesung etwa 15–22 Lernfolien, 5–7 Checkpoints und 8–15 Quizaufgaben. Kalibriere nach Lernzielen, Schwierigkeit und Bearbeitungszeit, nicht nach Folienzahl allein. Umfangreiche Übungsfälle können mit weniger Aufgaben auskommen. Erzwinge weder zusätzliche Fragen noch eine Boss Question, wenn das Format davon nicht profitiert.

## 4. Lerncoach-Inhalte erstellen

Verwende die unterstützten Datenblöcke aus `LERNCOACH_ERSTELLEN.md`; kopiere deren Schema nicht in eigene Varianten.

| Lerninhalt | Geeignete Form |
|---|---|
| Definition, Fehler, Merkhilfe | `callout` mit passendem `tone` |
| Werte oder Nachschlagewissen | `table`, gezielte `marks` |
| Prozess oder Reihenfolge | `flow` |
| Verwechselbare Konzepte | `compare` |
| Gleichrangige Gesichtspunkte | `cards` |
| Formel und Bestandteile | `formula` |
| Selbst erklären oder vorhersagen | `reveal` |
| Verteilung, Zusammenhang, Matrix, Stichprobe | `chart` mit unterstütztem `kind` |
| Min–Max-Scaling ausprobieren | `sim` mit `kind: "minmax"` |
| Abschliessender Selbstcheck | `checklist` |
| Hintergrund | Text und Listen |

`sim` unterstützt derzeit nur Min–Max-Scaling. Prüfe vor anderen Simulationen die tatsächlichen Fähigkeiten der Oberfläche; ein neuer `kind` funktioniert nicht durch einen Inhaltseintrag allein. Nutze bei fehlender Unterstützung eine vorhandene Lernform. Ändere Engine, Oberfläche oder globale Styles nur, wenn der Auftrag diese Erweiterung umfasst.

Lass Lernende vor einer Auflösung selbst nachdenken. Schliesse die Lektion mit einem Lernziel-Selbstcheck, passenden Transferfällen und einer kurzen Einordnung des Zusatzwissens ab. Zwei bis vier Transferfälle sind ein Richtwert, keine Quote.

### Checkpoints und Antworttoleranz

Jeder Checkpoint enthält 3–5 Fragen, mindestens einen Typ ausser `single` und für jede Frage eine `explanation`. Nutze `single`, `multi`, `order` und `type` passend zum Lernziel. Ein Checkpoint benötigt 100 Prozent; ein bestandener Checkpoint bleibt bestanden.

`type` prüft normalisierte Zeichenfolgen, keine Bedeutung. Verwende es für eng umrissene Antworten und nenne das erwartete Format. Berücksichtige sinnvolle Synonyme, Schreibweisen, Einheiten sowie Dezimalpunkt und Dezimalkomma. Teste neben der Musterantwort mindestens eine plausible alternative Formulierung und eine fachlich falsche Antwort. Beispiel: „Trainingsdatensatz“ und „aus dem Trainingsdatensatz“ müssen bei einer entsprechenden Frage gleich behandelt werden. Nutze für offene Begründungen `reveal` oder eine selbstbewertete Quizaufgabe statt eines engen Wortlautvergleichs. Ein echter numerischer Toleranzvergleich erfordert Unterstützung durch die Bewertungslogik.

### Wiederholen als bestehende Produkteigenschaft behandeln

Prüfe das aktuelle Verhalten von `retry()` in `lerncoach/ui.js`. Wird der gesamte Checkpoint zurückgesetzt, dokumentiere diese Einschränkung; baue die Lektion mit der vorhandenen Funktion fertig. Verändere die globale Wiederholungslogik nicht beiläufig im Rahmen der Inhaltserstellung.

Falls der Auftrag ausdrücklich auch „Richtiges bleibt richtig“ umfasst, behandle dies als eigene funktionale Änderung einschliesslich angepasster Dokumentation und Regressionstests. Kriterien:

- Richtige Antworten bleiben erhalten, gesperrt und mit einem Text wie „Bereits richtig“ markiert; Farbe allein genügt nicht.
- Falsche sowie nur teilweise richtige `multi`-/`order`-Antworten werden erneut bearbeitet; diese Typen gelten im Checkpoint nur vollständig richtig als bestanden.
- Lösungsfeedback der wieder geöffneten Fragen nicht als Antwort vorwegnehmen. Die Anzeige unterscheidet noch zu korrigierende von noch unbeantworteten Fragen.
- Prüfen verlangt nur die offenen Antworten; bestanden wird nach vollständiger kumulativer Korrektheit. Bereits bestandene Checkpoints und gespeicherter Fortschritt bleiben gültig.

## 5. Eigenständiges Quiz integrieren

Nur bei einem Quizauftrag: Verwende eine vorhandene HTML-Vorlage, die die benötigten Fragetypen und Dashboard-Kommunikation implementiert. `single`, `multi`, `order`, `categorize` und selbstbewertetes `text` sind üblich; spezialisierte Vorlagen können etwa `fill` unterstützen. Prüfe Renderer und Bewertung, bevor du einen Typ übernimmst.

Rund 25 Prozent Grundlagen, 45 Prozent Anwendung und 30 Prozent Transfer/Fehlersuche sind ein Richtwert nach Aufgaben oder Punkten, kein starres Raster. Nutze plausible Distraktoren, begründetes Feedback pro Option, Quellenreferenzen und aussagekräftige Rubriken für Freitext. Lösungen erst nach „Antwort prüfen“ zeigen, Antworten dann sperren; Freitext erhält Punkte erst durch die anschliessende Selbsteinschätzung.

100 Gesamtpunkte sind ein guter Standard. Erhalte begründete Fach- und Übungsformate mit anderen Summen. Zwingend ist: tatsächliche Punktesumme = `maximumScore` im Katalog. Volle Punktzahl ergibt die Lernnote 6.0; diese ist eine Selbsteinschätzung.

Nutze eine stabile `DASHBOARD_QUIZ_ID` nach `<fach>-w<woche>-<thema>`, einen eigenen `STORAGE_KEY` und dieselbe ID im Katalog. Erhalte bestehende Fach-, Wochen-, Checkpoint- und Aufgaben-IDs bei Überarbeitungen, soweit deren Bedeutung gleich bleibt. Überschreibe keinen anderen Lerninhalt unter einer alten ID.

Übernimm den vollständigen Integrationsvertrag aus `QUIZ_ERSTELLEN.md`: `quiz-ready`, `quiz-resume`, `quiz-progress` mit vollständigem `quizState`, `quiz-completed` und `quiz-progress-reset`. Beim Laden keinen leeren Fortschritt vor dem möglichen Cloud-Resume senden. Automatisches und manuelles Speichern müssen auch noch nicht abgegebene Texte, Anordnungen, Bewertungen und Versuchsdaten erhalten. Reset erzeugt eine neue `attemptId` und lässt abgeschlossene Versuche bestehen.

## 6. Fachlichkeit, Funktion und Integration prüfen

Prüfe getrennt und berichte nur tatsächlich ausgeführte Prüfungen:

1. **Quellenabgleich:** Lernziele und A-Themen abgedeckt, genaue Referenzen, Rechnungen nachgeprüft, eigene Beispiele erkennbar, keine unbelegten Prüfungszusagen.
2. **Daten und Bewertung:** `validateSubject` ohne Fehler; alle Checkpoint-Musterantworten durch `checkQuestion` und `gradeCheckpoint` akzeptiert; alternative und falsche Antworten geprüft. Quiz-IDs, Speicher-Schlüssel, Registrierungen und Punktesummen konsistent.
3. **Automatische Tests:** Betroffene vorhandene Tests ausführen, bei neuen Modulen auch die Dashboard-/Lerncoach-Tests. Feste Kataloganzahlen und zugehörige Erwartungen in `tests/dashboard.test.js` bei Bedarf aktualisieren. Grüne Schema- oder Textprüfungen ersetzen keinen interaktiven Durchlauf.
4. **Browser:** Alle neuen oder geänderten Schritte durchlaufen, Checkpoints richtig und falsch beantworten, Wiederholung entsprechend dem tatsächlich implementierten Verhalten testen. Aufdecken, Simulationen, Navigation, Sperren, Teilpunkte, Neuladen, Reset und JSON-Export prüfen, soweit vorhanden. Konsole sowie Darstellung bei 390 px kontrollieren. Ein bestehendes Fach auf Regression prüfen, wenn gemeinsame Darstellung oder Logik betroffen ist.
5. **Dashboard und Cloud:** Für neue Quizze die verpflichtende Zwei-Browser-/Geräteprüfung aus `QUIZ_ERSTELLEN.md` durchführen: manuell speichern, bestätigte Firebase-Synchronisierung abwarten, denselben Versuch im zweiten Browser fortsetzen und Zustand vergleichen; danach Abschluss, Fehlerdetails, Verlauf und Lernvergleich prüfen. Für Lerncoach-Inhalte Position und bestandene Checkpoints entsprechend ihrem eigenen Fortschrittsmodell prüfen.

Unter PowerShell aus dem Repo-Root beispielsweise alle vorhandenen Tests ausführen:

```powershell
Get-ChildItem -LiteralPath tests -Filter '*.test.js' | ForEach-Object {
  & node --test $_.FullName
  if ($LASTEXITCODE -ne 0) { throw "Test fehlgeschlagen: $($_.Name)" }
}
```

Kann der Test-Runner keine Unterprozesse starten, lassen sich die derzeitigen skriptbasierten Tests direkt mit `node <Testdatei>` ausführen. Stelle vorher sicher, dass damit alle Assertions laufen; melde die alternative Ausführung ausdrücklich. Passe Befehle an die verfügbare Shell an.

Fehlt für Browser- oder Cloudprüfungen ein Werkzeug oder eine Anmeldung, liefere die mögliche lokale Arbeit und benenne genau die ausstehende Prüfung. Ohne erforderliche Integrationsprüfung kein neues Quiz als vollständig integriert oder veröffentlichungsbereit bezeichnen. Eine Lektionserstellung beinhaltet keine automatische Veröffentlichung.

## 7. Abschluss

Berichte knapp: erstellte oder überarbeitete Module, Quellen und abgedeckte Seiten, wesentliche Gewichtungsentscheidungen, Anzahl Lernfolien/Checkpoints/Quizaufgaben, Punktesumme, Speicherorte und Registrierungen. Nenne ausgeführte Tests sowie offene fachliche oder technische Einschränkungen. Keine Quizlösungen im Abschlussbericht.
