# Security Policy

## Sicherheitslücken melden

Bitte keine Zugangsdaten oder Details zu einer ausnutzbaren Sicherheitslücke in einem öffentlichen Issue veröffentlichen. Nutze stattdessen GitHubs **Private vulnerability reporting** unter `Security` → `Advisories` → `Report a vulnerability`. Der Repository-Betreiber muss diese Funktion in den Repository-Einstellungen aktivieren.

## Geheimnisse

Die Firebase-Webkonfiguration in `firebase-config.js` ist eine öffentliche Client-Konfiguration und kein Admin-Zugang. Zugriff auf Firestore wird über Firebase Authentication und `firestore.rules` kontrolliert.

Folgende Dateien dürfen nie veröffentlicht werden:

- Firebase-/Google-Service-Account-JSON-Dateien
- private Schlüssel oder Zertifikate
- Passwörter, Zugriffstokens oder Admin-SDK-Schlüssel
- `.env`-Dateien mit Geheimnissen

Solche Dateitypen werden zusätzlich durch `.gitignore` ausgeschlossen. Ein bereits veröffentlichtes Geheimnis muss beim jeweiligen Anbieter widerrufen beziehungsweise rotiert werden; blosses Löschen aus dem aktuellen Commit genügt nicht.
