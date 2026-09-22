# Quiz-Dashboard

Dieses Verzeichnis enthält das vollständige Quiz-System. Auf der veröffentlichten Website ist ein bestätigtes Firebase-Konto erforderlich; der Lernfortschritt wird zwischen Geräten synchronisiert und zusätzlich lokal zwischengespeichert. Die offiziellen Vorlesungsunterlagen bleiben in den jeweiligen Fachordnern und werden nicht dupliziert.

## Starten

`index.html` in Edge oder Chrome öffnen. Das Dashboard lädt die Quiz über relative Pfade. Ohne Firebase oder Internetverbindung wird der Fortschritt weiterhin lokal im Browser gespeichert.

## Struktur

```text
QuizDashboard/
├── index.html
├── login.html
├── firebase-config.js
├── firebase-login.js
├── firebase-sync.js
├── firestore.rules
├── privacy.html
├── quiz-catalog.js
├── quizzes/
│   ├── CNS1/
│   ├── DHEAL/
│   ├── ITRECHT/
│   └── SWS1/
└── tests/
```

Neue Quiz werden in `quizzes/<FACH>/` gespeichert und zusätzlich in `quiz-catalog.js` registriert. Der lokale Verlauf und unfertige Zwischenstände werden im Browser gespeichert. Nach einer Anmeldung wird derselbe Dashboard-Datensatz zusätzlich unter `users/<uid>/dashboard/state` in Cloud Firestore gespeichert. Lokaler und entfernter Stand werden beim Login zusammengeführt.

## Firebase

Das Firebase-Projekt ist in `firebase-config.js` konfiguriert. In der Firebase Console müssen folgende Einstellungen aktiv sein:

1. `Authentication` → `Anmeldemethode` → `E-Mail/Passwort` und `GitHub` aktivieren. In der GitHub OAuth App muss die von Firebase angezeigte Callback-URL eingetragen sein.
2. Cloud Firestore erstellen und die mitgelieferte Datei `firestore.rules` veröffentlichen. Sie erlaubt nur verifizierten Benutzern den eigenen Datensatz `users/<uid>/dashboard/state`.
3. Vor der Veröffentlichung über GitHub Pages unter `Authentication` → `Einstellungen` → `Autorisierte Domains` die Domain `linusscodingg.github.io` ergänzen.
4. In der Google Cloud Console prüfen, dass der Firebase-Browser-Key nur für die notwendigen Firebase-APIs zugelassen ist. Keine anderen kostenpflichtigen Google-APIs an denselben öffentlichen Schlüssel hängen.

`login.html` stellt GitHub-Anmeldung sowie Anmeldung, Registrierung und Passwort-Reset per E-Mail bereit. Nicht angemeldete Online-Besucher werden vom Dashboard automatisch dorthin weitergeleitet.

Die Firebase-Webkonfiguration ist öffentlich und enthält keinen Admin-Schlüssel. Die Zugriffskontrolle erfolgt durch Firebase Authentication, bestätigte E-Mail-Adressen und die Firestore Security Rules. Service-Account- oder Admin-Schlüssel dürfen nicht in dieses Repository aufgenommen werden. Zusätzliche Hinweise stehen in `SECURITY.md`.

Nach Änderungen an `firestore.rules` müssen die Regeln separat über die Firebase Console oder Firebase CLI veröffentlicht werden. Ein GitHub-Push allein aktualisiert die aktiven Datenbankregeln nicht.

Die verbleibenden manuellen Schritte sind in `DEPLOYMENT_CHECKLIST.md` aufgeführt.

## Datenschutz

`privacy.html` beschreibt die aktuelle Verarbeitung durch lokales Speichern, GitHub Pages und Firebase. Vor einer breiteren öffentlichen Nutzung sollte der Betreiber dort eine direkte Kontaktadresse ergänzen. Angemeldete Nutzer können Konto und Cloud-Daten im Dashboard löschen und vorher eine JSON-Sicherung exportieren.

Das Projekt ist ein inoffizielles privates Lernprojekt. Vor dem öffentlichen Teilen muss der Betreiber selbst prüfen, ob alle Quizformulierungen und sonstigen Lehrinhalte zur Veröffentlichung freigegeben sind. Ein öffentliches Repository erteilt ohne separate Lizenz nicht automatisch ein Nutzungsrecht am Code oder an Lehrinhalten.

## GitHub

Für eine Veröffentlichung kann der gesamte Ordner `QuizDashboard` in ein separates Repository übernommen werden. Die relativen Quizpfade bleiben dabei funktionsfähig. Persönliche Browser- und Firebase-Daten werden nicht mit hochgeladen. Die JSON-Export-/Import-Funktion bleibt als zusätzliche manuelle Sicherung verfügbar.
