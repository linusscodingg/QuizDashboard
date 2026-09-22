# Sicherheits-Checkliste vor der Veröffentlichung

Die Dateien im Repository allein ändern keine Einstellungen in Firebase oder GitHub. Vor dem öffentlichen Einsatz sind diese Punkte manuell zu prüfen.

## Firebase

- [ ] In **Firestore Database → Regeln** den Inhalt von `firestore.rules` einfügen und veröffentlichen.
- [ ] Im Firestore-Regel-Simulator prüfen: nicht angemeldet = abgelehnt; angemeldeter fremder Benutzer = abgelehnt; verifizierter Eigentümer = erlaubt.
- [ ] In **Authentication → Einstellungen → Autorisierte Domains** nur benötigte Domains zulassen, insbesondere `linusscodingg.github.io` und gegebenenfalls `localhost` für Entwicklung.
- [ ] In der GitHub OAuth App exakt die in Firebase angezeigte **Authorization callback URL** eintragen und keine zusätzlichen OAuth-Berechtigungen anfordern.
- [ ] In **Authentication → Einstellungen → Passwortrichtlinie** mindestens 10 Zeichen verlangen.
- [ ] In der Google Cloud Console unter **APIs & Services → Credentials** kontrollieren, dass der Firebase-Browser-Key nur für die benötigten Firebase-APIs eingeschränkt ist. Keine Gemini-, Maps- oder andere kostenpflichtige API an diesen öffentlichen Schlüssel hängen.
- [ ] **Firebase App Check** für die Web-App einrichten und danach die Durchsetzung für Cloud Firestore aktivieren. Vor der Durchsetzung zuerst die Metriken prüfen, damit echte Nutzer nicht ausgesperrt werden.
- [ ] Quoten und Nutzung regelmässig kontrollieren. Ein Gratisangebot ist keine dauerhafte Preisgarantie des Anbieters.

## GitHub

- [ ] GitHub Pages auf den gewünschten Branch und den Ordner `/ (root)` stellen und **Enforce HTTPS** aktiv lassen.
- [ ] Unter **Settings → Security** Private vulnerability reporting und verfügbare Secret-Scanning-Funktionen aktivieren.
- [ ] Vor jedem Push `git diff` und `git status` prüfen. Niemals Service-Account-JSON, `.env`, private Schlüssel oder Tokens committen.
- [ ] Prüfen, ob alle veröffentlichten Quizfragen und Inhalte selbst erstellt oder zur Veröffentlichung freigegeben sind. Keine Vorlesungs-PDFs, internen Lösungen oder echten Prüfungsfragen ohne Erlaubnis hochladen.

## Datenschutz

- [ ] In `privacy.html` eine direkte Kontaktadresse des Betreibers ergänzen.
- [ ] Nach Änderungen an Hosting, Tracking, Datenfeldern oder externen Diensten die Datenschutzerklärung aktualisieren.
- [ ] Wenn später Analytics, Werbung oder nicht notwendige Cookies hinzukommen, die Einwilligungs- und Informationspflichten neu beurteilen.
