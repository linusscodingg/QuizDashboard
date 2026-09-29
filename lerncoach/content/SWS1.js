/*
 * Lerncoach-Inhalte für SWS1 (Software and System Security 1, ZHAW, Marc Rennhard / Gürkan Gür).
 * Woche 3 aus: WebAppSecurityTesting1.pdf (Web Application Security Testing, Part 1/3).
 * Erklärungen auf Deutsch, Checkpoints auf Englisch (Prüfungssprache).
 * Defensive Security: Ziel ist Schwachstellen erkennen, im Code sehen und richtig absichern.
 */
Lerncoach.registerSubject({
  id: "SWS1",
  name: "Software and System Security 1",
  short: "SWS1",
  description: "Software- und Systemsicherheit",
  accent: "#9a4f24",
  weeks: [
    { id: "w2", number: 2, title: "Secure Development Lifecycle & Software Security Errors", status: "soon" },
    {
      id: "w3",
      number: 3,
      title: "Web Application Security Testing 1: Injection",
      status: "ready",
      items: [
        {
          type: "slide",
          title: "Warum Web-Apps ständig angegriffen werden",
          body: [
            "Web-Anwendungen sind ein Lieblingsziel von Angreifern, und das aus mehreren Gründen gleichzeitig. Es gibt **sehr viele** davon, also lohnt es sich, das Angreifen einmal zu lernen und dann tausendfach anzuwenden. Sie hängen oft an **wertvollen Daten und kritischen Prozessen** wie E-Banking, E-Commerce oder Social Media, wo für den Angreifer echtes Geld winkt. Und die Sicherheit ist häufig **schlecht**, das Angreifen also relativ einfach.",
            "Genau deshalb ist **Security Testing** so wichtig: Es deckt Schwachstellen auf, **bevor** eine Anwendung produktiv geht. Man testet also im eigenen Auftrag die eigene App, so wie ein Prüfer die Schlösser eines Neubaus testet, bevor die Mieter einziehen.",
            "Der Fokus liegt auf Web-Apps, aber viele Probleme (Injection, Authentisierung, Zugriffskontrolle) tauchen genauso in anderen Anwendungen, REST-APIs und Mobile-Apps auf. Was du hier lernst, ist also breit übertragbar."
          ],
          remember: "Security Testing findet Schwachstellen vor dem Produktivgang. Web-Apps sind attraktiv wegen Menge, wertvollen Daten und oft schwacher Sicherheit."
        },
        {
          type: "slide",
          title: "Wie eine Web-App Daten entgegennimmt",
          body: [
            "Der Browser schickt **HTTP-Requests**, die App verarbeitet sie (oft mit Datenbankzugriff) und antwortet mit einer **HTTP-Response**. Fast alle Schwachstellen beruhen darauf, dass Nutzer **Daten an die App schicken**, die dann verarbeitet werden. Und Nutzer heisst hier immer auch: möglicher Angreifer.",
            "Bei klassischen, serverseitig gerenderten Apps kommen die Werte als **Name-Wert-Paare** in **GET**- oder **POST**-Requests: `GET /login?username=Pete&password=tz-2_Vx8` oder dieselben Parameter im Body eines POST. Bei modernen, client-seitig gerenderten Apps (viel JavaScript, REST-APIs) kommen zusätzlich **PUT**, **DELETE** und JSON-Daten dazu, etwa `POST /products` mit `{\"product-id\":3743, \"price\":1295.00}`.",
            "Sicherheitstechnisch ändert das nichts: Sobald ein Request Daten enthält, die der Nutzer frei wählen kann, kann dieser Request für einen Angriff missbraucht werden. Die Beispiele nutzen meist serverseitige Apps, weil es dafür bewusst unsichere Übungsanwendungen gibt, aber alles gilt genauso für APIs und Mobile-Apps."
          ],
          remember: "Fast jede Web-Schwachstelle beruht auf Nutzerdaten, die verarbeitet werden. Egal ob GET/POST-Parameter oder JSON über PUT/DELETE: frei wählbare Daten sind der Angriffsvektor."
        },
        {
          type: "slide",
          title: "OWASP als Orientierung",
          body: [
            "Es gibt keinen offiziellen Standard, der Web-Schwachstellen kategorisiert. Die beste Orientierung liefert **OWASP** (Open Worldwide Application Security Project), eine Community, die Best Practices und Werkzeuge bereitstellt.",
            "Wichtig sind vor allem: die **OWASP Top Ten** (strukturierte Liste der zehn kritischsten Web-Schwachstellen), der **Web Security Testing Guide** (Anleitung zum Testen), der **Application Security Verification Standard** (typische Schutzmassnahmen für Entwickler) und **WebGoat**, eine absichtlich unsichere Übungs-App zum gefahrlosen Üben.",
            "WebGoat ist wie ein Fahrsimulator: Du übst Notbremsungen, ohne dass echte Menschen auf der Strasse sind. Die Beispiele in diesem Kapitel stammen aus WebGoat (meist Version 5), das viele Schwachstellen bewusst offen lässt."
          ],
          remember: "OWASP ist die Referenz. Top Ten = kritischste Schwachstellen, WebGoat = absichtlich unsichere Übungs-App zum legalen Trainieren."
        },
        {
          type: "checkpoint",
          id: "cp-intro",
          title: "Checkpoint: Web App Security Basics",
          questions: [
            {
              id: "why-attacked",
              type: "multi",
              prompt: "Why are web applications such frequent attack targets?",
              options: [
                "There is a huge number of them, so attack skills pay off many times over",
                "They often provide access to valuable data and critical processes",
                "Their security is often poor and attacking them is relatively easy",
                "HTTP cannot be encrypted, so all traffic is always readable",
                "Attackers can reuse the same skills against many applications"
              ],
              correct: [0, 1, 2, 4],
              explanation: "HTTPS can of course encrypt traffic. The other reasons all make web apps attractive targets."
            },
            {
              id: "root-cause",
              type: "single",
              prompt: "Most web application vulnerabilities are based on which fact?",
              options: [
                "Users can submit data to the application, which is then processed",
                "Web servers are always running as root",
                "HTTP is a stateless protocol",
                "Browsers cache responses"
              ],
              correct: 0,
              explanation: "User-controlled data that is processed by the application is the root of most vulnerabilities."
            },
            {
              id: "webgoat",
              type: "type",
              prompt: "Which deliberately insecure OWASP application is used for hands-on security testing training?",
              accept: ["WebGoat", "OWASP WebGoat", "Web Goat"],
              explanation: "WebGoat is intentionally vulnerable so you can practice attacks legally and safely."
            },
            {
              id: "attack-surface",
              type: "multi",
              prompt: "Which requests can potentially be used for attacks?",
              options: [
                "GET requests with parameters in the URL",
                "POST requests with parameters in the body",
                "PUT and DELETE requests carrying JSON data",
                "Only requests that a database is involved in",
                "Any request that includes data the user can choose"
              ],
              correct: [0, 1, 2, 4],
              explanation: "The request type does not matter. As long as the user controls part of the data, the request may be abused."
            }
          ]
        },
        {
          type: "slide",
          title: "Injection: der gemeinsame Nenner",
          body: [
            "**Injection**-Schwachstellen entstehen, wenn eine App Daten annimmt, die anschliessend **interpretiert** werden. Beispiele: Daten in **SQL**-Befehlen (interpretiert vom DBMS), in **OS-Befehlen** (interpretiert vom Betriebssystem) oder in **JSON/XML**-Strukturen (interpretiert von einem Parser).",
            "Die Grundidee ist immer dieselbe: Der Angreifer schmuggelt in ein Datenfeld eigene Steuerzeichen oder Befehle ein, sodass aus **Daten** plötzlich **Code** wird. Wie wenn du in ein Formularfeld «Name» nicht nur deinen Namen schreibst, sondern eine zusätzliche Anweisung, die das System dann ausführt.",
            "Die Auswirkung ist meist **hoch**: Injection erlaubt oft, sensible Daten zu lesen oder zu verändern oder auf das darunterliegende Betriebssystem zuzugreifen. Deshalb steht Injection seit Jahren weit oben in der OWASP Top Ten."
          ],
          remember: "Injection = eingeschleuste Daten werden als Code interpretiert (SQL, OS, JSON/XML). Auswirkung meist hoch: Daten lesen/ändern oder OS-Zugriff."
        },
        {
          type: "slide",
          title: "SQL Injection: der Login-Bypass",
          body: [
            "Klassiker: Eine App prüft Logins mit einer per **String-Verkettung** zusammengebauten Query. Der Entwickler schreibt etwa `\"SELECT * FROM employee WHERE userid=\" + userid + \" AND password='\" + password + \"'\"`. Genau das ist die Wurzel des Problems: Nutzerdaten landen direkt und ungefiltert in der Query.",
            "Meldet sich Neville normal an (`userid=112&password=socks`), entsteht `... WHERE userid=112 AND password='socks'`, es kommt eine Zeile zurück, Login akzeptiert. Ein Brute-Force-Angriff mit geratenen Passwörtern scheitert an einem starken Passwort.",
            "Ein cleverer Angreifer gibt aber als Passwort `' OR ''='` ein. Die Query wird zu `... WHERE userid=112 AND password='' OR ''=''`. In SQL bindet **AND stärker als OR**: Der AND-Teil ist für alle Zeilen falsch, aber `''=''` ist immer wahr, und `FALSE OR TRUE` ist **wahr für alle Zeilen**. Die WHERE-Klausel ist also immer erfüllt, alle Zeilen kommen zurück, und da Nevilles Zeile dabei ist, ist der Login akzeptiert. Der Name «Injection» kommt daher, dass eigener SQL-Code eingeschleust wurde, der die **Bedeutung** der Query verändert hat."
          ],
          remember: "SQLi entsteht durch String-Verkettung von Nutzerdaten in Queries. Login-Bypass mit ' OR ''=' macht die WHERE-Klausel immer wahr (AND bindet stärker als OR)."
        },
        {
          type: "slide",
          title: "Auf SQL Injection testen",
          body: [
            "Wie findet man die Lücke? Der einfachste Test ist ein einzelnes **Hochkomma** (`'`) in Feldern, die vermutlich in Queries landen. Baut die App die Query per Verkettung, entsteht eine **syntaktisch ungültige** Query, die im DBMS einen Fehler auslöst.",
            "Bei `\"... WHERE last_name = '\" + input + \"'\"` und Eingabe `'` entsteht `... WHERE last_name = '''`, drei Hochkommas, das ist kaputt. Zeigt die Antwort dann eine **SQL-Fehlermeldung**, ein kaputtes Layout oder einen **HTTP 500**, ist das ein starkes Indiz für eine SQLi-Schwachstelle. Im Glücksfall zeigt die Antwort sogar die fehlerhafte Query.",
            "Wird kein Fehler durchgereicht, hilft ein zweiter Test: `' OR ''='` (oder `' OR 1=1--`) in ein Suchfeld. Eigentlich gibt es keinen Nutzer mit so einem Nachnamen, trotzdem kommen **alle** Zeilen zurück. Auch das verrät, dass die Query unsicher per Verkettung gebaut wird."
          ],
          remember: "SQLi-Test: ein Hochkomma ' einschleusen und auf DB-Fehler achten (SQL-Fehlermeldung, kaputtes Layout, HTTP 500). Alternativ ' OR 1=1-- : plötzlich kommen alle Zeilen."
        },
        {
          type: "checkpoint",
          id: "cp-sqli-basics",
          title: "Checkpoint: SQL Injection Basics",
          questions: [
            {
              id: "root-cause-sqli",
              type: "single",
              prompt: "What is the usual root cause when a web application is vulnerable to SQL injection?",
              options: [
                "It builds SQL queries with string concatenation using data received directly from the user",
                "It uses a database that is too old",
                "It stores passwords in plaintext",
                "It runs on HTTP instead of HTTPS"
              ],
              correct: 0,
              explanation: "Directly concatenating user input into the query string lets the attacker change the query's meaning."
            },
            {
              id: "why-always-true",
              type: "multi",
              prompt: "For the login the password ' OR ''=' produces WHERE userid=112 AND password='' OR ''=''. Why does this authenticate the attacker?",
              options: [
                "AND has higher precedence than OR, so the AND part is evaluated first",
                "userid=112 AND password='' is FALSE for the rows",
                "''='' is always TRUE",
                "FALSE OR TRUE evaluates to TRUE, so the WHERE clause is true for all rows",
                "The password '' matches Neville's real password"
              ],
              correct: [0, 1, 2, 3],
              explanation: "It has nothing to do with the real password. The injected OR makes the whole clause true for every row."
            },
            {
              id: "probe-char",
              type: "type",
              prompt: "Which single character is inserted into an input field as the classic first probe for an SQL injection vulnerability?",
              placeholder: "one character",
              accept: ["'", "single quote", "quote", "apostrophe", "hochkomma"],
              explanation: "A single quote typically breaks a concatenated query and triggers a DB error."
            },
            {
              id: "error-signs",
              type: "multi",
              prompt: "Which observations are strong indications that an SQL injection vulnerability exists?",
              options: [
                "The response contains an SQL error message",
                "The page layout is broken",
                "An HTTP 500 internal server error is returned",
                "The response is returned faster than usual",
                "A search for a nonexistent name suddenly returns all rows"
              ],
              correct: [0, 1, 2, 4],
              explanation: "Response speed alone says nothing. The others all indicate the input reached the SQL engine."
            }
          ]
        },
        {
          type: "slide",
          title: "Daten auslesen mit UNION",
          body: [
            "Bisher ging es um Login-Bypass. Jetzt will der Angreifer **Daten auslesen**, etwa alle Nutzer und Passwörter. Die Strategie: die vorgegebene SELECT-Query mit einer **zweiten** SELECT-Query kombinieren. Bei den meisten DBMS geht das mit dem Schlüsselwort **UNION**, das die Ergebnismengen zweier SELECTs zusammenführt.",
            "Damit UNION funktioniert, müssen zwei Bedingungen erfüllt sein: Beide SELECTs müssen **gleich viele Spalten** liefern, und die **Datentypen** der Spalten müssen passen (oder implizit konvertierbar sein). Merke: INT lässt sich implizit zu VARCHAR konvertieren, aber nicht umgekehrt.",
            "Der Angriff hat zwei Schritte. **Schritt 1:** Herausfinden, wie viele Spalten die vorgegebene Query liefert. Zeigt die HTML-Tabelle 7 Spalten, testet man `Smith' UNION SELECT 1,2,3,4,5,6,7 FROM user_data WHERE '' = '`. Passt die Spaltenzahl nicht, gibt es einen Fehler, dann probiert man andere Zahlen durch. **Schritt 2:** Den echten Angriff fahren, indem man statt `1,2,3,...` die gewünschten Spalten einsetzt, z.B. `userid,first_name,last_name,password,5,6,7 FROM employee`."
          ],
          remember: "UNION führt zwei SELECT-Ergebnisse zusammen. Bedingungen: gleiche Spaltenzahl und passende Datentypen. Schritt 1: Spaltenzahl finden, Schritt 2: echte Spalten auslesen."
        },
        {
          type: "slide",
          title: "Der Kommentar-Trick und das Schema",
          body: [
            "Das abschliessende `WHERE '' = '` sorgt nur dafür, dass das letzte Hochkomma der vorgegebenen Query aufgeht. Einfacher ist der **SQL-Kommentar** `--`: Alles danach wird vom DBMS ignoriert. Aus `Smith' UNION SELECT ...,7 FROM employee--` wird der Rest der Original-Query samt hängendem Hochkomma einfach weggeschnitten.",
            "In der Realität kennt der Angreifer die Tabellen- und Spaltennamen nicht. Er findet sie über die **System-Tabellen** des DBMS. Bei MySQL sind das `TABLES` und `COLUMNS` im Schema `INFORMATION_SCHEMA`, bei MS SQL Server `sysobjects` und `syscolumns`. Auch dieser Zugriff läuft über dieselbe SQLi-Lücke.",
            "Eine Feinheit: Beim Auslesen von `TABLE_NAME` muss man es in die **zweite** Spalte des injizierten SELECT setzen, nicht in die erste. Die erste Spalte der vorgegebenen Query ist numerisch (z.B. USERID als INT), und **VARCHAR lässt sich nicht implizit zu INT** konvertieren. Man platziert die Textspalte also dort, wo die vorgegebene Query auch Text erwartet."
          ],
          remember: "-- kommentiert den Rest der Original-Query aus. Schema-Infos stehen in System-Tabellen (MySQL: INFORMATION_SCHEMA.TABLES/COLUMNS) und werden über dieselbe Lücke ausgelesen. Datentypen der UNION-Spalten müssen passen."
        },
        {
          type: "checkpoint",
          id: "cp-union",
          title: "Checkpoint: UNION-based Extraction",
          questions: [
            {
              id: "union-conditions",
              type: "multi",
              prompt: "Which conditions must hold for a UNION-based SQL injection to work?",
              options: [
                "Both SELECT statements must return the same number of columns",
                "The data types of the columns must match or be implicitly convertible",
                "Both queries must access the same table",
                "The injected SELECT must come first",
                "The attacker must know the admin password"
              ],
              correct: [0, 1],
              explanation: "Same column count and compatible types. The tables can differ and no password knowledge is needed."
            },
            {
              id: "attack-steps",
              type: "order",
              prompt: "Order the steps of a UNION-based data extraction attack.",
              items: [
                "Probe with a single quote to confirm the vulnerability",
                "Find out how many columns the predefined SELECT returns",
                "Discover table and column names via the DBMS system tables",
                "Read the desired columns with a UNION SELECT"
              ],
              explanation: "You confirm the flaw, learn the column count, discover the schema, then extract."
            },
            {
              id: "comment",
              type: "type",
              prompt: "Which two characters start an SQL comment that makes the rest of the original query be ignored?",
              placeholder: "two characters",
              accept: ["--", "double dash", "dash dash"],
              explanation: "Everything after -- is ignored by the DBMS, which discards the trailing part of the original query."
            },
            {
              id: "type-mismatch",
              type: "single",
              prompt: "The predefined query returns USERID (INT) in its first column. Why must TABLE_NAME (VARCHAR) be placed in the second column of the injected SELECT?",
              options: [
                "VARCHAR cannot be implicitly converted to the numeric type of the first column",
                "TABLE_NAME is always the second column in the system table",
                "UNION requires text columns to be second",
                "The first column is reserved for the comment marker"
              ],
              correct: 0,
              explanation: "The column types must line up. INT converts to VARCHAR, but not the other way round, so the text goes where the query expects text."
            },
            {
              id: "schema-table",
              type: "type",
              prompt: "In MySQL, which schema holds the system tables TABLES and COLUMNS that reveal the database structure?",
              accept: ["INFORMATION_SCHEMA", "information_schema"],
              explanation: "INFORMATION_SCHEMA.TABLES and .COLUMNS expose table and column names, readable through the same injection."
            }
          ]
        },
        {
          type: "slide",
          title: "INSERT missbrauchen und mehrere Queries",
          body: [
            "SQLi betrifft nicht nur SELECT. Registriert sich ein Nutzer und die App baut `INSERT INTO User (type, username, password) VALUES ('user', '...', '...')` per Verkettung, kann ein Angreifer als Passwort `userpass'), ('admin', 'Superuser', 'adminpass')--` eingeben. Das Ergebnis ist ein gültiges INSERT, das **zwei** Zeilen einfügt, darunter ein **Admin-Konto**. Statt seiner Daten schmuggelt er eine ganze zweite Zeile ein.",
            "Manchmal geht sogar mehr: Mit `;` lässt sich die erste Query beenden und eine **zusätzliche** anhängen, etwa `Smith'; UPDATE employee SET password = 'foo'--`, was alle Passwörter überschreibt. Der Erfolg zeigt sich nicht direkt, aber ein erneutes Auslesen mit dem UNION-Trick bestätigt die Änderung.",
            "In der Praxis funktionieren mehrere Queries eher selten. In Java klappt es nur, wenn der Entwickler `executeBatch()` statt `executeQuery()` benutzt, denn `executeQuery()` und `updateQuery()` erlauben nur eine einzige Query. Beim Testen lohnt sich der Versuch trotzdem."
          ],
          remember: "SQLi auch bei INSERT (zusätzliche Zeile einschleusen, z.B. Admin-Konto) und ggf. mehrere Queries mit ; (UPDATE/DELETE). In Java brauchen mehrere Queries executeBatch()."
        },
        {
          type: "slide",
          title: "SQL Injection verhindern",
          body: [
            "Die wichtigste Massnahme sind **Prepared Statements** (parametrisierte Queries). Statt Daten in den Query-String zu kleben, schreibt man Platzhalter: `prepare(\"SELECT id FROM users WHERE name=? AND pass=?\")` und übergibt die Werte separat. Das DBMS behandelt die Werte dann **garantiert nur als Daten**, nie als Code, und escaped Steuerzeichen selbst. Damit wird SQLi praktisch unmöglich. Das ist wie ein Formular mit festen Feldern: Was du ins Feld «Name» schreibst, bleibt Name, egal was drinsteht.",
            "Ergänzend hilft **Input Validation**: alle Nutzerdaten prüfen, bevor sie weiterverarbeitet werden, etwa per Whitelist erlaubter Zeichen. Aber Vorsicht: Manchmal sind kritische Zeichen legitim (Suche nach `O'Brian`), deshalb sind Prepared Statements die **primäre** Verteidigung, nicht die Validierung allein.",
            "Zwei weitere Punkte: Gib **keine** detaillierten Datenbank-Fehlermeldungen an den Nutzer weiter (sie helfen dem Angreifer), und greife mit **minimalen Rechten** auf die DB zu (Principle of Least Privilege), damit der Schaden begrenzt bleibt, falls doch eine Lücke existiert. Wichtig: **Client-seitige** Validierung ist nur Komfort, Angreifer umgehen sie mühelos mit einem lokalen Proxy. Immer serverseitig validieren."
          ],
          remember: "Primär: Prepared Statements (Daten bleiben Daten). Ergänzend: serverseitige Input-Validation (Whitelist), keine DB-Fehler nach aussen, minimale DB-Rechte. Client-Validierung schützt nicht."
        },
        {
          type: "checkpoint",
          id: "cp-sqli-defense",
          title: "Checkpoint: INSERT Abuse & Defense",
          questions: [
            {
              id: "insert-goal",
              type: "single",
              prompt: "During registration an attacker submits a crafted password so the INSERT statement adds a second row with type 'admin'. What has the attacker achieved?",
              options: [
                "They created an admin account for themselves",
                "They deleted the user table",
                "They bypassed HTTPS",
                "They read the INFORMATION_SCHEMA"
              ],
              correct: 0,
              explanation: "The injected values form a valid multi-row INSERT that adds an admin account."
            },
            {
              id: "primary-defense",
              type: "type",
              prompt: "What is the primary defensive measure against SQL injection? (two words)",
              placeholder: "___ ___",
              accept: ["prepared statements", "prepared statement", "parameterized queries", "parameterized query", "parametrized queries", "parameterised queries"],
              explanation: "Prepared statements ensure user data can never change the meaning of the query."
            },
            {
              id: "why-prepared",
              type: "multi",
              prompt: "Why do prepared statements stop SQL injection?",
              options: [
                "The DBMS treats the bound values only as data, never as SQL code",
                "The DBMS handles the proper quoting/escaping of the values",
                "The values are bound to fixed positions in the query",
                "They encrypt the database connection",
                "They make the database run as a non-root user"
              ],
              correct: [0, 1, 2],
              explanation: "Binding separates code from data. Encryption and privilege level are separate, unrelated concerns."
            },
            {
              id: "client-validation",
              type: "single",
              prompt: "Why must you never rely on client-side validation alone to prevent injection?",
              options: [
                "Attackers can bypass it easily, e.g. with a local proxy that alters data after it leaves the browser",
                "It slows down the application",
                "Browsers do not support JavaScript validation",
                "It only works over HTTPS"
              ],
              correct: 0,
              explanation: "Client-side checks improve usability but are trivially bypassed. Always validate on the server."
            },
            {
              id: "least-privilege",
              type: "type",
              prompt: "Accessing the database with the fewest rights necessary, to limit damage, follows which security principle? (two or three words)",
              accept: ["least privilege", "principle of least privilege", "minimal privileges", "minimal privilege"],
              explanation: "Principle of least privilege limits the impact if a vulnerability is exploited."
            }
          ]
        },
        {
          type: "slide",
          title: "OS Command Injection",
          body: [
            "Ruft eine App **Betriebssystem-Befehle** auf (in Java über `Runtime.exec()`, in PHP über `system()`), kann **OS Command Injection** möglich sein. Es gibt gute Gründe, das OS aufzurufen: ein Admin-Interface mit Diagnose-Tools wie `ping`, das Auslesen einer Konfigurationsdatei oder ein Web-Frontend für ein Kommandozeilen-Tool. Das Problem: Sobald der Nutzer Teile des Befehls bestimmt, sind sicherheitsrelevante Fehler sehr leicht gemacht.",
            "Beispiel: Eine App zeigt Dateiinhalte an und baut den Befehl `command[2] = \"cat \" + filename` mit dem vom Nutzer gelieferten Dateinamen. Ausgeführt wird `/bin/sh -c cat AccessControlMatrix.help`. Würde stattdessen eine I/O-Klasse wie `FileReader` genutzt, gäbe es keine OS-Injection, aber als Tester nimmst du immer an, dass der Entwickler den unsicheren Weg gewählt hat.",
            "Testen geht auf zwei Arten. Ein `\"` anhängen: Passt die Annahme, entsteht ein syntaktisch **ungültiger** Befehl, ein Fehler ist ein starkes Indiz. Oder einen **zusätzlichen Befehl** anhängen: `; ifconfig` (Unix) bzw. `& ipconfig` (Windows). Erscheint dessen Ausgabe in der Antwort, ist die Lücke bewiesen. Bei diesem WebGoat-Beispiel muss man wegen umschliessender Anführungszeichen `\"; ifconfig\"` einsetzen, damit `cat \"...help\"; ifconfig\"\"` einen gültigen ersten und einen gültigen zweiten Befehl ergibt."
          ],
          remember: "OS Command Injection bei Runtime.exec()/system() mit Nutzerdaten im Befehl. Test: \" anhängen (Fehler) oder ; ifconfig / & ipconfig anhängen (Ausgabe erscheint = beweisbar). ; trennt Befehle in der Shell."
        },
        {
          type: "slide",
          title: "OS Command Injection absichern",
          body: [
            "Die Auswirkung kann verheerend sein: Mit `\"; cat /etc/shadow\"` liest man die Passwort-Hashes der Systemnutzer, und wenn das klappt, läuft die App als **root**. Damit hat man faktisch eine Remote-Root-Shell und kann fast alles: Dateien hoch- und runterladen, Software installieren, weitere interne Systeme angreifen.",
            "Beste Massnahme: Das OS **gar nicht** direkt aufrufen. Für Dateizugriff die I/O-Klassen der Technologie nutzen (in Java `FileReader`, `FileInputStream`), nicht die Shell.",
            "Muss es doch die Shell sein, gilt strikte **Input-Validation per Whitelist**: erlaubte Zeichen und maximale Länge festlegen und prüfen. Bei Dateinamen etwa: nur Buchstaben, vielleicht Ziffern, höchstens ein Punkt, maximal z.B. 25 Zeichen. Und wie immer: Prozess mit **minimalen Rechten** laufen lassen, damit der Schaden begrenzt bleibt."
          ],
          remember: "Wenn möglich das OS gar nicht aufrufen (I/O-Klassen statt Shell). Sonst: Whitelist-Validierung (erlaubte Zeichen + Maximallänge) und minimale Prozessrechte."
        },
        {
          type: "checkpoint",
          id: "cp-oscmd",
          title: "Checkpoint: OS Command Injection",
          questions: [
            {
              id: "oscmd-cause",
              type: "multi",
              prompt: "When can OS command injection occur?",
              options: [
                "When the application invokes OS commands, e.g. via Runtime.exec() in Java",
                "When the user can control part of the command that is executed",
                "When file access uses Runtime instead of I/O classes without checking the input",
                "Whenever the application uses a database",
                "In PHP when the system() function is used with user input"
              ],
              correct: [0, 1, 2, 4],
              explanation: "It is about executing OS commands with user-controlled parts, not about databases."
            },
            {
              id: "separator",
              type: "type",
              prompt: "In a shell command passed with -c, appending a second command needs a separator character. What is that character called? (its name)",
              placeholder: "name of the character",
              accept: ["semicolon", "semi-colon", "semi colon", "strichpunkt", "semikolon"],
              explanation: "The semicolon ( ; ) separates multiple shell commands."
            },
            {
              id: "poc",
              type: "single",
              prompt: "An attacker appends ; ifconfig to a filename and the network configuration output appears in the response. What does this prove?",
              options: [
                "The injected command was executed, proving the vulnerability can be exploited",
                "The file does not exist",
                "The database is misconfigured",
                "The server uses HTTPS"
              ],
              correct: 0,
              explanation: "Seeing the injected command's output is a proof of concept that OS command injection works."
            },
            {
              id: "best-defense-os",
              type: "single",
              prompt: "What is the best countermeasure against OS command injection for file access?",
              options: [
                "Do not invoke the OS at all; use the I/O classes of the technology (e.g. FileReader)",
                "Escape only the semicolon character",
                "Run the process as root so it can handle any input",
                "Rely on client-side validation of the file name"
              ],
              correct: 0,
              explanation: "Avoiding the shell entirely removes the attack surface. If unavoidable, whitelist-validate and use least privilege."
            },
            {
              id: "whitelist",
              type: "multi",
              prompt: "If invoking the OS is unavoidable, what does a whitelisting input validation for a file name specify?",
              options: [
                "The set of allowed characters",
                "The maximum number of characters",
                "A list of forbidden IP addresses",
                "That the received data matches this specification before use"
              ],
              correct: [0, 1, 3],
              explanation: "Whitelisting defines what IS allowed (characters, length) and rejects everything else."
            }
          ]
        },
        {
          type: "slide",
          title: "JSON- und XML-Injection",
          body: [
            "Wird JSON oder XML aus Nutzerdaten zusammengebaut, ist auch dort Injection möglich. Beispiel JSON: Eine App baut aus Username und Passwort den String `{ \"account\":\"user\", \"username\":\"...\", \"password\":\"...\" }`, wobei `account` fest auf `user` steht. Gibt der Angreifer als Passwort `Un6-rT1R\",\"account\":\"admin` ein, enthält der String am Ende ein **zweites** `account`-Feld mit Wert `admin`.",
            "Das ist noch gültiges JSON, denn der Standard erlaubt doppelte Elemente. Entscheidend ist, wie der **Parser** damit umgeht: Nimmt er die **letzte** Vorkommnis eines Elements (was die meisten tun), bekommt der Angreifer ein **Admin-Konto**. Bei XML funktioniert derselbe Trick, indem man mit `</password><admin>1</admin>...` zusätzliche Elemente einschleust.",
            "Der Schutz ist wie bei SQLi: **Input-Validation per Whitelist**, damit keine zusätzlichen Elemente eingefügt werden können. Besonders auf Steuerzeichen wie `\"`, `<` und `>` achten und erlaubte Zeichen sowie Maximallänge festlegen."
          ],
          remember: "JSON/XML-Injection schleust zusätzliche Elemente ein (z.B. doppeltes account:admin). Viele Parser nehmen die letzte Vorkommnis. Schutz: Whitelist-Validierung, Vorsicht bei \" < >."
        },
        {
          type: "slide",
          title: "XXE: XML External Entity",
          body: [
            "XML kennt **externe Entitäten**: Über eine `<!ENTITY ... SYSTEM \"URL\">`-Deklaration kann man auf lokale oder entfernte Inhalte verweisen. Beim Parsen ersetzt der Parser das entsprechende Element durch den Inhalt der URL. Eigentlich ein Feature, in falschen Händen aber gefährlich.",
            "Akzeptiert eine App XML vom Browser und spiegelt den Inhalt in der Antwort wider, ist ein **XXE**-Angriff möglich. Der Angreifer definiert eine Entität, die auf eine lokale Datei wie `/etc/passwd` zeigt, und referenziert sie im Kommentar-Text. Beim Parsen liest der Parser die Datei, kopiert den Inhalt ins Element, die App speichert den Kommentar und schickt ihn in der Antwort zurück, samt Dateiinhalt. So lässt sich jede Datei lesen, auf die die App Zugriff hat.",
            "Der wirksamste Schutz: den **XML-Parser so konfigurieren, dass er externe Entitäten nicht unterstützt**. Das verhindert XXE zuverlässig. Und generell: Wenn möglich das einfachere **JSON** statt XML nutzen, weil es solche mächtigen Features gar nicht kennt."
          ],
          remember: "XXE nutzt externe XML-Entitäten (<!ENTITY x SYSTEM \"file://...\">), um lokale Dateien zu lesen. Schutz: Parser ohne externe Entitäten konfigurieren, wenn möglich JSON statt XML."
        },
        {
          type: "checkpoint",
          id: "cp-jsonxml",
          title: "Checkpoint: JSON / XML Injection & XXE",
          questions: [
            {
              id: "json-duplicate",
              type: "single",
              prompt: "An attacker injects a second \"account\":\"admin\" element into a JSON string. Why can this give them an admin account?",
              options: [
                "The JSON standard allows duplicate elements, and most parsers use the last occurrence of an element",
                "JSON forbids duplicates, so the parser crashes and grants admin",
                "The first element is always ignored",
                "JSON automatically grants admin when an account field is present twice"
              ],
              correct: 0,
              explanation: "Duplicates are valid JSON; parsers commonly keep the last occurrence, so account becomes admin."
            },
            {
              id: "xxe-mechanism",
              type: "order",
              prompt: "Order what happens during an XXE attack that reads a local file via a comment feature.",
              items: [
                "The attacker defines an external entity pointing to a local file",
                "The XML parser accesses the file and copies its content into the referenced element",
                "The application stores the comment including that content",
                "The response returns the comment, exposing the file content to the attacker"
              ],
              explanation: "The parser resolves the external entity, and the reflected comment leaks the file."
            },
            {
              id: "xxe-defense",
              type: "single",
              prompt: "What is the most effective countermeasure against XML External Entity injection?",
              options: [
                "Configure the XML parser so that it does not support external entities",
                "Escape the semicolon in all input",
                "Use a longer XML declaration",
                "Send the XML over HTTPS"
              ],
              correct: 0,
              explanation: "Disabling external entity support prevents XXE. Preferring JSON over XML also avoids the feature entirely."
            },
            {
              id: "jsonxml-controlchars",
              type: "multi",
              prompt: "Which control characters must input validation be especially careful about to prevent JSON/XML injection?",
              options: ["The double quote \"", "The less-than sign <", "The greater-than sign >", "The digit 0", "The letter a"],
              correct: [0, 1, 2],
              explanation: "Quotes and angle brackets let an attacker create additional JSON/XML elements."
            }
          ]
        }
      ]
    }
  ]
});
