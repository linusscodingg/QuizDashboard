# ZHAW Quiz-Dashboard

Dieses Verzeichnis enthält das vollständige, offline nutzbare Quiz-System. Die offiziellen Vorlesungsunterlagen bleiben in den jeweiligen Fachordnern und werden nicht dupliziert.

## Starten

`index.html` in Edge oder Chrome öffnen. Das Dashboard lädt die Quiz über relative Pfade und benötigt keine Datenbank.

## Struktur

```text
QuizDashboard/
├── index.html
├── quiz-catalog.js
├── quizzes/
│   ├── CNS1/
│   ├── DHEAL/
│   └── ITRECHT/
└── tests/
```

Neue Quiz werden in `quizzes/<FACH>/` gespeichert und zusätzlich in `quiz-catalog.js` registriert. Der lokale Verlauf und unfertige Zwischenstände werden im Browser gespeichert.

## GitHub

Für eine spätere Veröffentlichung kann der gesamte Ordner `QuizDashboard` in ein Repository übernommen werden. Die relativen Quizpfade bleiben dabei funktionsfähig. Browserdaten werden nicht mit hochgeladen; eine vorhandene Sicherung kann über die Export-/Import-Funktion des Dashboards übertragen werden.
