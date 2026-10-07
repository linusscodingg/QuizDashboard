/*
 * Lerncoach-Inhalte für KRY (Wahlfach Kryptologie).
 *
 * Serie 4: Chinesischer Restsatz (CRT). Ziel: Serie 4 selbständig lösen können.
 * Aufbau pro Thema: kurz erklären -> einfache Rechnung mit kleinen Zahlen -> Serie-Aufgabe 1:1 mit Lösung.
 *
 * Quellen (alle gelesen):
 *   Serie_04_KRY.pdf (Aufgaben 1 und 2)
 *   W4_TippsSerie4.pdf (Recap-Folien 1/4 bis 4/4)
 *   W2_ChinesischerRestsatz_Handout.pdf (Folien 1 bis 15)
 *   SkriptKryptologie.pdf, Kapitel 1.3 (S. 9 bis 12), Aufgaben 7 und 8
 *   KryptoTrainer: FrameSerie2.java (Prakt. 4.1), FrameSerie3.java (Prakt. 4.2, Programmierschnittstelle)
 *   SEP_MKR_2020_final.pdf, Aufgabe 1 (b) und (c) als Prüfungsbeleg
 *
 * Gewichtung:
 *   A, muss ich können: CRT mit 2 Gleichungen rechnen (u1, u2, x), RSA-Entschlüsselung mit CRT,
 *      CRT mit n Gleichungen (M_i, u_i, x), Datenbank-Verschlüsselung (p_i > F_i, verschieden, C, F_i = C mod p_i),
 *      beide Java-Methoden der Serie.
 *   B, sollte ich verstehen: warum die Formel funktioniert, warum CRT schneller ist, Bedingung teilerfremd.
 *   C, nur einordnen: Tassen-Rätsel als Geschichte, isomorphe Ringe, Eindeutigkeitsbeweis,
 *      Fermattest (W4-Handout, gehört nicht zu Serie 4).
 *
 * Eigene Lernbeispiele sind als "eigenes Beispiel" markiert. Alle Zahlen wurden nachgerechnet,
 * der Java-Code wurde mit dem mybiginteger-Paket des KryptoTrainers kompiliert und getestet.
 */
Lerncoach.registerSubject({
  id: "KRY",
  name: "Kryptologie",
  short: "KRY",
  description: "Wahlfach Kryptologie: Serien mit PARI/GP und KryptoTrainer",
  accent: "#8a3b8f",
  weeks: [
    {
      id: "serie4",
      number: 4,
      title: "Serie 4: Chinesischer Restsatz",
      status: "ready",
      items: [
        {
          type: "slide",
          title: "Serie 4 auf einen Blick",
          body: [
            "Beide Aufgaben der Serie 4 brauchen dasselbe Werkzeug: den **Chinesischen Restsatz** (englisch Chinese Remainder Theorem, kurz CRT). In beiden Aufgaben programmierst du in Java im KryptoTrainer.",
            {
              cards: [
                { title: "Aufgabe 1", text: "RSA schneller entschlüsseln: `myModPow(exponent, p, q)` rechnet getrennt mit p und q und setzt das Resultat mit dem CRT zusammen. Test: Prakt. 4.1." },
                { title: "Aufgabe 2", text: "Datenbank verschlüsseln: 5 Datensätze werden zu einer einzigen Zahl E. Jeder Benutzer liest mit seiner Primzahl nur seinen Datensatz. Test: Prakt. 4.2." }
              ]
            },
            {
              flow: {
                steps: [
                  { title: "Grundlagen", text: "Rest, teilerfremd, Inverses" },
                  { title: "CRT mit 2 Gleichungen", text: "Basis für Aufgabe 1" },
                  { title: "Aufgabe 1", text: "einfach, dann 1:1" },
                  { title: "CRT mit vielen Gleichungen", text: "Basis für Aufgabe 2" },
                  { title: "Aufgabe 2", text: "einfach, dann 1:1" }
                ],
                note: "Nach jeder Erklärung kommt zuerst eine einfache Rechnung, danach die Serie-Aufgabe mit Lösung."
              }
            },
            {
              callout: {
                tone: "tip",
                title: "So rechnest du",
                text: "Wo Rechnen Sinn macht, steht der fertige PARI/GP-Befehl dabei. Du tippst ihn in gp ein und trägst das Resultat ein. Die Java-Teile machst du im KryptoTrainer."
              }
            },
            "Quelle: Serie_04_KRY.pdf; W4_TippsSerie4.pdf, Folien 1/4 bis 4/4"
          ],
          remember: "Serie 4 = zweimal Chinesischer Restsatz: einmal mit 2 Gleichungen (RSA), einmal mit 5 Gleichungen (Datenbank)."
        },
        {
          type: "slide",
          title: "Was heisst x = a (mod m)?",
          body: [
            "`x = a (mod m)` heisst: Wenn du x durch m teilst, bleibt der **Rest a**. Mehr ist es nicht.",
            "Die Vorlesung startet mit einem Rätsel: Eine Kiste mit Tassen geht kaputt. Beim Packen in Dreierkartons blieben 2 Tassen übrig, in Fünferkartons 1 Tasse, in Siebnerkartons 5 Tassen. Wie viele Tassen waren es?",
            {
              table: {
                caption: "Das Tassen-Rätsel als Gleichungen",
                head: ["Karton", "übrig", "als Gleichung", "Probe mit x = 26", "PARI/GP"],
                rows: [
                  ["3er", "2", "x = 2 (mod 3)", "26 = 8 · 3 + 2", "`26 % 3` gibt 2"],
                  ["5er", "1", "x = 1 (mod 5)", "26 = 5 · 5 + 1", "`26 % 5` gibt 1"],
                  ["7er", "5", "x = 5 (mod 7)", "26 = 3 · 7 + 5", "`26 % 7` gibt 5"]
                ],
                marks: { "0,3": "good", "1,3": "good", "2,3": "good" },
                note: "26 passt zu allen drei Resten. Das ist die Lösung des Rätsels."
              }
            },
            {
              reveal: {
                question: "Gibt es noch andere Tassen-Zahlen, die passen?",
                answer: [
                  "Ja: 26 + 105 = 131, dann 236 usw. Denn 105 = 3 · 5 · 7 lässt bei allen drei Kartons Rest 0.",
                  "Deshalb sagt man: Die Lösung ist eindeutig **modulo 105**. Zwischen 0 und 104 gibt es genau eine Lösung, nämlich 26."
                ],
                label: "Auflösung"
              }
            },
            "Quelle: W2_ChinesischerRestsatz_Handout.pdf, Folien 2 bis 5"
          ],
          remember: "x = a (mod m) bedeutet: x geteilt durch m gibt Rest a. In PARI/GP: `x % m`."
        },
        {
          type: "slide",
          title: "Der Satz: Wann gibt es genau eine Lösung?",
          body: [
            "Du hast mehrere Gleichungen `x = a1 (mod m1)`, `x = a2 (mod m2)` usw. Der Chinesische Restsatz sagt:",
            {
              callout: {
                tone: "def",
                title: "Chinesischer Restsatz",
                text: "Sind die Moduln m1, m2, ..., mn **paarweise teilerfremd**, dann hat das Gleichungssystem **genau eine Lösung modulo m = m1 · m2 · ... · mn**."
              }
            },
            "**Teilerfremd** heisst: Die beiden Zahlen haben keinen gemeinsamen Teiler ausser 1, also ggT = 1. **Paarweise** heisst: Das muss für jedes Paar gelten, nicht nur für Nachbarn.",
            {
              compare: {
                left: { title: "CRT darf man brauchen", points: ["Moduln 3, 5, 7", "`gcd(3,5)` = 1, `gcd(3,7)` = 1, `gcd(5,7)` = 1", "genau eine Lösung modulo 105"] },
                right: { title: "CRT darf man nicht direkt brauchen", points: ["Moduln 8, 11, 14", "`gcd(8,14)` = 2", "8 und 14 sind nicht teilerfremd"] },
                verdict: "Vor jeder CRT-Rechnung zuerst mit `gcd(a,b)` alle Paare prüfen."
              }
            },
            {
              callout: {
                tone: "exam",
                title: "Kam so an der Prüfung",
                text: "SEP 2020, Aufgabe 1 (b): Bei welchen Gleichungssystemen kann man den CRT verwenden? Stichwortartig begründen, also genau diese ggT-Prüfung."
              }
            },
            "Quelle: W2_ChinesischerRestsatz_Handout.pdf, Folie 5; Skript Kap. 1.3.2, S. 10; SEP_MKR_2020_final.pdf, Aufgabe 1 (b)"
          ],
          remember: "CRT nur bei paarweise teilerfremden Moduln. Dann genau eine Lösung modulo m1 · m2 · ... · mn."
        },
        {
          type: "slide",
          title: "Werkzeug: das modulare Inverse",
          body: [
            "Für die CRT-Formel brauchst du das **modulare Inverse**. `u^-1 (mod m)` ist die Zahl, die mit u multipliziert **Rest 1** gibt.",
            {
              table: {
                caption: "Beispiel: 3^-1 (mod 7) durch Ausprobieren",
                head: ["Versuch x", "3 · x", "Rest bei / 7"],
                rows: [["1", "3", "3"], ["2", "6", "6"], ["3", "9", "2"], ["4", "12", "5"], ["5", "15", "1"]],
                marks: { "4,2": "good" },
                note: "3 · 5 = 15 = 2 · 7 + 1. Also ist 3^-1 (mod 7) = 5."
              }
            },
            "Ausprobieren geht nur bei kleinen Zahlen. Bei grossen Zahlen rechnet der Computer das mit dem erweiterten Euklid-Algorithmus aus. Du musst nur den Befehl kennen:",
            {
              table: {
                head: ["Werkzeug", "Befehl", "Resultat für 3^-1 (mod 7)"],
                rows: [
                  ["PARI/GP", "`Mod(3,7)^(-1)`", "`Mod(5, 7)`"],
                  ["PARI/GP, nur die Zahl", "`lift(Mod(3,7)^(-1))`", "`5`"],
                  ["Java (BigInteger)", "`u.modInverse(m)`", "5"]
                ]
              }
            },
            {
              callout: {
                tone: "warn",
                title: "Typischer Fehler",
                text: "Das Inverse gibt es nur, wenn u und m teilerfremd sind. Sonst meldet PARI/GP einen Fehler und Java wirft eine ArithmeticException."
              }
            },
            "Quelle: W2_ChinesischerRestsatz_Handout.pdf, Folie 7; W4_TippsSerie4.pdf, Folie 2/4"
          ],
          remember: "Inverses: u · u^-1 = 1 (mod m). PARI/GP `lift(Mod(u,m)^(-1))`, Java `u.modInverse(m)`."
        },
        {
          type: "checkpoint",
          id: "cp-grundlagen",
          title: "Checkpoint 1: Grundlagen",
          questions: [
            {
              id: "rest",
              type: "type",
              prompt: "Welchen Rest hat 17 modulo 5? Rechne in PARI/GP mit `17 % 5`.",
              accept: ["2", "Rest 2", "Mod(2,5)", "Mod(2, 5)"],
              placeholder: "Zahl",
              explanation: "17 = 3 · 5 + 2, also Rest 2. Quelle: W2_ChinesischerRestsatz_Handout.pdf, Folie 4"
            },
            {
              id: "teilerfremd",
              type: "multi",
              prompt: "Bei welchen Moduln darfst du den CRT direkt verwenden? Prüfe mit `gcd(a,b)` jedes Paar.",
              options: ["3, 5, 7", "8, 11, 15", "8, 11, 14", "4, 6, 7"],
              correct: [0, 1],
              explanation: "3, 5, 7 und 8, 11, 15 sind paarweise teilerfremd. Bei 8 und 14 ist `gcd(8,14)` = 2, bei 4 und 6 ist `gcd(4,6)` = 2. Quelle: W2_ChinesischerRestsatz_Handout.pdf, Folie 5; SEP 2020, Aufgabe 1 (b)"
            },
            {
              id: "inverses",
              type: "type",
              prompt: "Berechne 4^-1 (mod 7). PARI/GP: `lift(Mod(4,7)^(-1))`",
              accept: ["2", "Mod(2,7)", "Mod(2, 7)"],
              placeholder: "Zahl",
              explanation: "4 · 2 = 8 = 1 · 7 + 1, also Rest 1. Darum ist 4^-1 (mod 7) = 2. Quelle: W2_ChinesischerRestsatz_Handout.pdf, Folie 7"
            },
            {
              id: "eindeutig",
              type: "single",
              prompt: "x = 2 (mod 3) und x = 3 (mod 4). Modulo welcher Zahl ist die Lösung eindeutig?",
              options: ["12", "7", "4", "3"],
              correct: 0,
              explanation: "3 und 4 sind teilerfremd, also ist die Lösung eindeutig modulo 3 · 4 = 12. Nicht die Summe 3 + 4. Quelle: W2_ChinesischerRestsatz_Handout.pdf, Folie 5"
            }
          ]
        },
        {
          type: "slide",
          title: "Rezept: CRT mit 2 Gleichungen",
          body: [
            "Das ist genau das Rezept aus den Tipps zur Serie 4. Du hast `x = a1 (mod m1)` und `x = a2 (mod m2)`.",
            {
              formula: {
                main: "x = a1 · u1 · m2 + a2 · u2 · m1   (mod m1 · m2)",
                parts: [
                  { label: "u1", text: "u1 = m2^-1 (mod m1), Inverses von m2, gerechnet modulo m1" },
                  { label: "u2", text: "u2 = m1^-1 (mod m2), Inverses von m1, gerechnet modulo m2" },
                  { label: "am Schluss", text: "das Resultat modulo m1 · m2 nehmen" }
                ],
                note: "Achtung: Bei u1 steht oben m2 und unten m1. Die Indizes kreuzen sich."
              }
            },
            {
              table: {
                caption: "Durchgerechnet: x = 2 (mod 3), x = 5 (mod 7), Skript Aufgabe 7",
                head: ["Schritt", "Rechnung", "PARI/GP", "Resultat"],
                rows: [
                  ["m", "3 · 7", "`3*7`", "21"],
                  ["u1 = 7^-1 (mod 3)", "7 · 1 = 7 = 2 · 3 + 1", "`lift(Mod(7,3)^(-1))`", "1"],
                  ["u2 = 3^-1 (mod 7)", "3 · 5 = 15 = 2 · 7 + 1", "`lift(Mod(3,7)^(-1))`", "5"],
                  ["x roh", "2 · 1 · 7 + 5 · 5 · 3 = 14 + 75", "`2*1*7 + 5*5*3`", "89"],
                  ["x mod 21", "89 = 4 · 21 + 5", "`89 % 21`", "5"]
                ],
                marks: { "4,3": "good" },
                note: "Probe: 5 % 3 = 2 und 5 % 7 = 5. Stimmt."
              }
            },
            {
              callout: {
                tone: "tip",
                title: "Warum das funktioniert",
                text: "Rechne x modulo m1: Der Teil u1 · m2 ist dort genau 1 (so wurde u1 gewählt), der Teil u2 · m1 ist dort 0 (enthält m1). Also bleibt a1 · 1 + a2 · 0 = a1. Modulo m2 ist es umgekehrt, es bleibt a2."
              }
            },
            {
              callout: {
                tone: "def",
                title: "Kontrolle mit einem Befehl",
                text: "`chinese(Mod(2,3), Mod(5,7))` gibt `Mod(5, 21)`. Gut zum Kontrollieren. An der Prüfung musst du aber den Rechenweg zeigen (siehe letzte Folie)."
              }
            },
            "Quelle: W4_TippsSerie4.pdf, Folie 2/4; W2_ChinesischerRestsatz_Handout.pdf, Folien 8 und 11; Skript Aufgabe 7, S. 10"
          ],
          remember: ["u1 = m2^-1 (mod m1), u2 = m1^-1 (mod m2)", "x = a1 · u1 · m2 + a2 · u2 · m1, danach mod m1 · m2"]
        },
        {
          type: "checkpoint",
          id: "cp-crt2",
          title: "Checkpoint 2: Rechne selbst (2 Gleichungen)",
          questions: [
            {
              id: "u1",
              type: "type",
              prompt: "System: x = 1 (mod 5) und x = 3 (mod 7). Also m1 = 5, m2 = 7. Berechne u1 = 7^-1 (mod 5). PARI/GP: `lift(Mod(7,5)^(-1))`",
              accept: ["3", "Mod(3,5)", "Mod(3, 5)"],
              placeholder: "Zahl",
              explanation: "7 · 3 = 21 = 4 · 5 + 1. Also u1 = 3. Quelle: W4_TippsSerie4.pdf, Folie 2/4 (eigenes Zahlenbeispiel)"
            },
            {
              id: "u2",
              type: "type",
              prompt: "Gleiches System. Berechne u2 = 5^-1 (mod 7). PARI/GP: `lift(Mod(5,7)^(-1))`",
              accept: ["3", "Mod(3,7)", "Mod(3, 7)"],
              placeholder: "Zahl",
              explanation: "5 · 3 = 15 = 2 · 7 + 1. Also u2 = 3. Quelle: W4_TippsSerie4.pdf, Folie 2/4 (eigenes Zahlenbeispiel)"
            },
            {
              id: "x",
              type: "type",
              prompt: "Setze ein: x = 1 · u1 · 7 + 3 · u2 · 5, danach modulo 35. PARI/GP: `(1*3*7 + 3*3*5) % 35`",
              accept: ["31", "Mod(31,35)", "Mod(31, 35)", "x = 31"],
              placeholder: "Zahl zwischen 0 und 34",
              explanation: "1 · 3 · 7 + 3 · 3 · 5 = 21 + 45 = 66. 66 = 1 · 35 + 31, also x = 31. Probe: 31 % 5 = 1 und 31 % 7 = 3. Kontrolle: `chinese(Mod(1,5), Mod(3,7))` gibt `Mod(31, 35)`. Quelle: W4_TippsSerie4.pdf, Folie 2/4"
            },
            {
              id: "ablauf",
              type: "order",
              prompt: "Bringe die Schritte des Rezepts in die richtige Reihenfolge.",
              items: [
                "Prüfen, dass m1 und m2 teilerfremd sind",
                "u1 = m2^-1 (mod m1) und u2 = m1^-1 (mod m2) berechnen",
                "x = a1 · u1 · m2 + a2 · u2 · m1 ausrechnen",
                "Resultat modulo m1 · m2 nehmen",
                "Probe: x % m1 = a1 und x % m2 = a2"
              ],
              explanation: "Erst prüfen, dann Inverse, dann zusammensetzen, reduzieren und Probe. Quelle: W4_TippsSerie4.pdf, Folie 2/4; W2_ChinesischerRestsatz_Handout.pdf, Folie 8"
            }
          ]
        },
        {
          type: "slide",
          title: "Idee von Aufgabe 1: RSA schneller entschlüsseln",
          body: [
            "Bei RSA entschlüsselt man mit `n = c^d (mod m)`. Dabei ist c das Chiffrat, d der private Schlüssel und m = p · q. Wer p und q kennt, kann schneller rechnen:",
            {
              flow: {
                steps: [
                  { title: "a1 = c^d (mod p)", text: "kleine Rechnung modulo p" },
                  { title: "a2 = c^d (mod q)", text: "kleine Rechnung modulo q" },
                  { title: "CRT", text: "x = a1 (mod p), x = a2 (mod q) lösen" },
                  { title: "Klartext", text: "x ist der Klartext n" }
                ],
                note: "Das ist das 2-Gleichungen-Rezept mit m1 = p und m2 = q."
              }
            },
            "**Warum schneller?** p und q sind nur halb so lang wie m. Das Skript schätzt, dass die Entschlüsselung mit CRT etwa **viermal schneller** ist als direkt modulo m. Wichtig zum Beispiel auf Chipkarten.",
            {
              table: {
                caption: "Eigenes Beispiel: p = 5, q = 11, m = 55, d = 27, Chiffrat c = 17",
                head: ["Schritt", "PARI/GP", "Resultat"],
                rows: [
                  ["a1 = 17^27 (mod 5)", "`lift(Mod(17,5)^27)`", "3"],
                  ["a2 = 17^27 (mod 11)", "`lift(Mod(17,11)^27)`", "8"],
                  ["u1 = 11^-1 (mod 5)", "`lift(Mod(11,5)^(-1))`", "1"],
                  ["u2 = 5^-1 (mod 11)", "`lift(Mod(5,11)^(-1))`", "9"],
                  ["x = 3 · 1 · 11 + 8 · 9 · 5 = 393", "`(3*1*11 + 8*9*5) % 55`", "8"]
                ],
                marks: { "4,2": "good" },
                note: "Kontrolle direkt: `lift(Mod(17,55)^27)` gibt auch 8. Der Klartext ist 8 (verschlüsselt mit e = 3: 8^3 = 512, 512 % 55 = 17)."
              }
            },
            {
              callout: {
                tone: "warn",
                title: "Zwei Versionen in den Unterlagen",
                text: [
                  "Tipps Serie 4 und Skript rechnen a1 = c^d (mod p) direkt.",
                  "Folie 13 im W2-Handout verkleinert zusätzlich den Exponenten: d1 = d mod (p − 1), dann a1 = c1^d1 (mod p). Das gibt dasselbe Resultat und ist noch schneller.",
                  "Für die Serie reicht die Version aus den Tipps. Die schnellere Version kommt als Bonus bei der Lösung."
                ]
              }
            },
            "Quelle: W4_TippsSerie4.pdf, Folie 1/4; W2_ChinesischerRestsatz_Handout.pdf, Folie 13; Skript Kap. 1.3.1, S. 10"
          ],
          remember: "RSA mit CRT: a1 = c^d mod p, a2 = c^d mod q, dann CRT mit m1 = p, m2 = q."
        },
        {
          type: "checkpoint",
          id: "cp-rsa-einfach",
          title: "Checkpoint 3: Einfache Aufgabe zu Aufgabe 1",
          questions: [
            {
              id: "a1",
              type: "type",
              prompt: "Folie 14 im W2-Handout: p = 23, q = 31, m = 713, d = 139, Chiffrat c = 100. Berechne a1 = 100^139 (mod 23). PARI/GP: `lift(Mod(100,23)^139)`",
              accept: ["12", "Mod(12,23)", "Mod(12, 23)", "a1 = 12"],
              placeholder: "Zahl",
              explanation: "a1 = 12. Mit der schnelleren Version aus Folie 13: 100 % 23 = 8 und 139 % 22 = 7, dann `lift(Mod(8,23)^7)` gibt auch 12. Quelle: W2_ChinesischerRestsatz_Handout.pdf, Folien 13 und 14"
            },
            {
              id: "a2",
              type: "type",
              prompt: "Gleiche Zahlen. Berechne a2 = 100^139 (mod 31). PARI/GP: `lift(Mod(100,31)^139)`",
              accept: ["14", "Mod(14,31)", "Mod(14, 31)", "a2 = 14"],
              placeholder: "Zahl",
              explanation: "a2 = 14. Quelle: W2_ChinesischerRestsatz_Handout.pdf, Folien 13 und 14"
            },
            {
              id: "klartext",
              type: "type",
              prompt: "Setze mit dem CRT zusammen: u1 = 31^-1 (mod 23) = 3 und u2 = 23^-1 (mod 31) = 27. Rechne x = 12 · 3 · 31 + 14 · 27 · 23, danach modulo 713. PARI/GP: `(12*3*31 + 14*27*23) % 713`",
              accept: ["541", "Mod(541,713)", "Mod(541, 713)", "n = 541", "x = 541"],
              placeholder: "Klartext",
              explanation: "12 · 3 · 31 + 14 · 27 · 23 = 1116 + 8694 = 9810. 9810 = 13 · 713 + 541, also Klartext 541. Kontrolle: `chinese(Mod(12,23), Mod(14,31))` gibt `Mod(541, 713)`. Quelle: W2_ChinesischerRestsatz_Handout.pdf, Folie 14"
            },
            {
              id: "probe",
              type: "multi",
              prompt: "Welche Kontrollen zeigen, dass 541 richtig ist?",
              options: [
                "541 % 23 = 12",
                "541 % 31 = 14",
                "`lift(Mod(100,713)^139)` gibt 541",
                "541 % 713 = 100"
              ],
              correct: [0, 1, 2],
              explanation: "Die Reste stimmen mit a1 und a2 überein, und die direkte Rechnung modulo m gibt dasselbe. 541 % 713 ist einfach 541, nicht 100. Quelle: W2_ChinesischerRestsatz_Handout.pdf, Folien 13 und 14"
            }
          ]
        },
        {
          type: "slide",
          title: "Serie 4, Aufgabe 1 lösen (1:1)",
          body: [
            {
              callout: {
                tone: "def",
                title: "Aufgabe 1 aus der Serie",
                text: [
                  "Erstellen Sie für die Klasse BigInteger der Package mybiginteger eine Spezialversion der Methode myModPow() zur Dechiffrierung von RSA-Chiffraten. Dabei sollen der Methode anstelle des RSA-Moduls m dessen beiden Primfaktoren p und q mitgegeben werden, so dass der Algorithmus mit Hilfe des Chinesischen Restsatzes beschleunigt werden kann.",
                  "`public BigInteger myModPow(BigInteger exponent, BigInteger p, BigInteger q)`",
                  "Testen Sie Ihren Algorithmus mit Hilfe des Programms KryptoTrainer „Prakt. 4.1“ in Bezug auf Resultate und zeitliche Effizienz."
                ]
              }
            },
            "**Wo?** In `mybiginteger/BigInteger.java` steht schon der leere Rumpf mit `return BigInteger.ZERO;`. Den ersetzt du. In der Methode ist `this` das Chiffrat c und `exponent` ist d. Deine eigene `myModPow(exponent, m)` aus der früheren Serie darfst du wiederverwenden.",
            {
              reveal: {
                question: "Schritt 1: Wie berechnest du a1 = c^d (mod p) und a2 = c^d (mod q) in Java?",
                answer: "Mit deiner bestehenden Methode, einmal mit p und einmal mit q als Modul:",
                code: "BigInteger a1 = this.myModPow(exponent, p);   // a1 = c^d mod p\nBigInteger a2 = this.myModPow(exponent, q);   // a2 = c^d mod q",
                label: "Schritt 1 aufdecken"
              }
            },
            {
              reveal: {
                question: "Schritt 2: Wie berechnest du u1 = q^-1 (mod p) und u2 = p^-1 (mod q)?",
                answer: "Mit `modInverse`, wie im Tipp auf Folie 2/4. Achtung auf das Kreuzen der Buchstaben:",
                code: "BigInteger u1 = q.modInverse(p);   // u1 = q^-1 mod p\nBigInteger u2 = p.modInverse(q);   // u2 = p^-1 mod q",
                label: "Schritt 2 aufdecken"
              }
            },
            {
              reveal: {
                question: "Schritt 3: Wie setzt du x = a1 · u1 · q + a2 · u2 · p (mod p · q) zusammen?",
                answer: "BigInteger hat keine Operatoren wie + und *, also mit `multiply`, `add` und `mod`:",
                code: "BigInteger m = p.multiply(q);\nBigInteger teil1 = a1.multiply(u1).multiply(q);\nBigInteger teil2 = a2.multiply(u2).multiply(p);\nreturn teil1.add(teil2).mod(m);",
                label: "Schritt 3 aufdecken"
              }
            },
            {
              reveal: {
                question: "Ganze Lösung zum Einfügen in BigInteger.java",
                answer: "Getestet mit dem mybiginteger-Paket: gleiche Resultate wie `modPow(exponent, p·q)` bei 64, 512 und 1024 Bit, und für die Zahlen von Checkpoint 3 kommt 541 heraus.",
                code: "public BigInteger myModPow(BigInteger exponent, BigInteger p, BigInteger q) {\n  // Schritt 1: getrennt modulo p und modulo q rechnen (kleine Zahlen)\n  BigInteger a1 = this.myModPow(exponent, p);   // a1 = c^d mod p\n  BigInteger a2 = this.myModPow(exponent, q);   // a2 = c^d mod q\n\n  // Schritt 2: Inverse für den Chinesischen Restsatz\n  BigInteger u1 = q.modInverse(p);              // u1 = q^-1 mod p\n  BigInteger u2 = p.modInverse(q);              // u2 = p^-1 mod q\n\n  // Schritt 3: zusammensetzen  x = a1*u1*q + a2*u2*p  (mod m)\n  BigInteger m = p.multiply(q);\n  BigInteger teil1 = a1.multiply(u1).multiply(q);\n  BigInteger teil2 = a2.multiply(u2).multiply(p);\n  return teil1.add(teil2).mod(m);\n}",
                label: "Lösung anzeigen"
              }
            },
            {
              flow: {
                steps: [
                  { title: "KryptoTrainer starten", text: "Button Prakt. 4.1 (Klasse FrameSerie2)" },
                  { title: "Resultat prüfen", text: "Ergebnis Alg. 1 (myModPow) muss gleich sein wie Alg. 2 (modPow)" },
                  { title: "Zeit messen", text: "Rechenzeit Alg. 1 und Alg. 2 vergleichen, auch mit grösseren Stellenzahlen" }
                ]
              }
            },
            {
              reveal: {
                question: "Bonus: Wie wird es noch schneller (Folie 13)?",
                answer: [
                  "Den Exponenten vorher verkleinern: d1 = d mod (p − 1) und d2 = d mod (q − 1). Das Resultat bleibt gleich (Satz von Fermat), die Exponenten sind aber nur noch halb so lang.",
                  "In einem eigenen Test mit 1024 Bit war diese Version etwa doppelt so schnell wie die Version ohne Verkleinerung. Messwerte schwanken von PC zu PC."
                ],
                code: "BigInteger a1 = this.myModPow(exponent.mod(p.subtract(BigInteger.ONE)), p);\nBigInteger a2 = this.myModPow(exponent.mod(q.subtract(BigInteger.ONE)), q);",
                label: "Bonus anzeigen"
              }
            },
            "Quelle: Serie_04_KRY.pdf, Aufgabe 1; W4_TippsSerie4.pdf, Folien 1/4 und 2/4; W2_ChinesischerRestsatz_Handout.pdf, Folie 13; KryptoTrainer FrameSerie2.java"
          ],
          remember: "Aufgabe 1 = 2-Gleichungen-CRT in Java: zwei myModPow, zwei modInverse, zusammensetzen, mod m."
        },
        {
          type: "checkpoint",
          id: "cp-aufgabe1",
          title: "Checkpoint 4: Kontrolle Aufgabe 1",
          questions: [
            {
              id: "u1java",
              type: "type",
              prompt: "Welcher Java-Ausdruck berechnet u1 = q^-1 (mod p)?",
              accept: ["q.modInverse(p)", "q.modInverse(p);", "BigInteger u1 = q.modInverse(p);", "u1 = q.modInverse(p);", "u1 = q.modInverse(p)"],
              placeholder: "z.B. x.methode(y)",
              explanation: "`q.modInverse(p)` gibt das Inverse von q modulo p. Das ist u1 = m2^-1 (mod m1) mit m1 = p, m2 = q. Quelle: W4_TippsSerie4.pdf, Folie 2/4"
            },
            {
              id: "reihenfolge",
              type: "order",
              prompt: "Ordne den Weg vom Chiffrat zum geprüften Klartext.",
              items: [
                "Chiffrat c (this), Exponent d sowie p und q bekommen",
                "a1 = c^d mod p und a2 = c^d mod q berechnen",
                "Mit u1 und u2 den Wert a1 · u1 · q + a2 · u2 · p bilden",
                "Diesen Wert modulo p · q nehmen und zurückgeben",
                "Im Prakt. 4.1 mit dem Resultat von modPow vergleichen"
              ],
              explanation: "Jeder Schritt braucht das Resultat des vorherigen. Quelle: W4_TippsSerie4.pdf, Folien 1/4 und 2/4; Serie_04_KRY.pdf, Aufgabe 1"
            },
            {
              id: "fehler",
              type: "multi",
              prompt: "Welche Änderungen machen die Methode **falsch**?",
              options: [
                "Am Schluss `.mod(m)` weglassen",
                "`u1 = p.modInverse(q)` statt `q.modInverse(p)`",
                "a1 und a2 vor u1 und u2 berechnen oder umgekehrt",
                "`m = p.multiply(q)` vor Schritt 1 berechnen statt erst in Schritt 3"
              ],
              correct: [0, 1],
              explanation: "Ohne `.mod(m)` ist die Zahl zu gross und nicht gleich wie modPow. Mit vertauschtem Inversen stimmt der Teil u1 · q modulo p nicht mehr 1. Die Reihenfolge der unabhängigen Zeilen ist dagegen egal. Quelle: W4_TippsSerie4.pdf, Folie 2/4; W2_ChinesischerRestsatz_Handout.pdf, Folie 8"
            },
            {
              id: "test41",
              type: "single",
              prompt: "Was vergleicht Prakt. 4.1 im KryptoTrainer?",
              options: [
                "Deine `myModPow(exponent, p, q)` mit der Bibliotheksmethode `modPow(exponent, p·q)`, Resultat und Rechenzeit",
                "Nur, ob p und q Primzahlen sind",
                "Die Datenbank-Verschlüsselung aus Aufgabe 2",
                "Ob das Chiffrat kleiner als m ist"
              ],
              correct: 0,
              explanation: "In FrameSerie2.java wird zuerst `myModPow(exponent, modulusP, modulusQ)` und dann `modPow(exponent, modulusP.multiply(modulusQ))` gerechnet, mit Zeitmessung. Quelle: Serie_04_KRY.pdf, Aufgabe 1; KryptoTrainer FrameSerie2.java"
            }
          ]
        },
        {
          type: "slide",
          title: "Rezept: CRT mit vielen Gleichungen",
          body: [
            "Für Aufgabe 2 brauchst du 5 Gleichungen. Das Rezept ist dasselbe Prinzip, nur mit einem Teil pro Gleichung. Hier ausgeschrieben für 3 Gleichungen `x = a1 (mod m1)`, `x = a2 (mod m2)`, `x = a3 (mod m3)`:",
            {
              table: {
                caption: "Das Rezept, Schritt für Schritt",
                head: ["Schritt", "Gleichung 1", "Gleichung 2", "Gleichung 3"],
                rows: [
                  ["Gesamtmodul", "m = m1 · m2 · m3", "", ""],
                  ["M = m geteilt durch eigenes m", "M1 = m2 · m3", "M2 = m1 · m3", "M3 = m1 · m2"],
                  ["Inverses", "u1 = M1^-1 (mod m1)", "u2 = M2^-1 (mod m2)", "u3 = M3^-1 (mod m3)"],
                  ["Teil", "a1 · u1 · M1", "a2 · u2 · M2", "a3 · u3 · M3"]
                ],
                note: "Am Schluss: x = a1 · u1 · M1 + a2 · u2 · M2 + a3 · u3 · M3, danach modulo m. Bei 5 Gleichungen einfach 5 Teile zusammenzählen."
              }
            },
            {
              callout: {
                tone: "tip",
                title: "Das Summenzeichen in den Folien",
                text: "Auf Folie 4/4 steht x als Summe mit einem grossen Zeichen. Das heisst nur: alle Teile a_i · u_i · M_i zusammenzählen, also Teil 1 + Teil 2 + Teil 3 + ..."
              }
            },
            {
              table: {
                caption: "Durchgerechnet: das Tassen-Rätsel x = 2 (mod 3), x = 1 (mod 5), x = 5 (mod 7)",
                head: ["i", "a", "m", "M", "u = M^-1 (mod m)", "Teil a · u · M"],
                rows: [
                  ["1", "2", "3", "35", "`lift(Mod(35,3)^(-1))` = 2", "2 · 2 · 35 = 140"],
                  ["2", "1", "5", "21", "`lift(Mod(21,5)^(-1))` = 1", "1 · 1 · 21 = 21"],
                  ["3", "5", "7", "15", "`lift(Mod(15,7)^(-1))` = 1", "5 · 1 · 15 = 75"]
                ],
                note: "x = 140 + 21 + 75 = 236. m = 105, 236 = 2 · 105 + 26, also x = 26. Kontrolle: `chinese([Mod(2,3), Mod(1,5), Mod(5,7)])` gibt `Mod(26, 105)`."
              }
            },
            "Quelle: W4_TippsSerie4.pdf, Folie 4/4; W2_ChinesischerRestsatz_Handout.pdf, Folien 4, 5 und 9; Skript Kap. 1.3.2, S. 11"
          ],
          remember: ["M_i = m geteilt durch m_i, u_i = M_i^-1 (mod m_i)", "x = a1 · u1 · M1 + a2 · u2 · M2 + ... , danach mod m"]
        },
        {
          type: "checkpoint",
          id: "cp-crtn",
          title: "Checkpoint 5: Rechne selbst (3 Gleichungen)",
          questions: [
            {
              id: "m1gross",
              type: "type",
              prompt: "Skript Aufgabe 8: x = 4 (mod 7), x = 2 (mod 11), x = 8 (mod 13). Also m = 1001. Wie gross ist M1 = 11 · 13?",
              accept: ["143", "M1 = 143"],
              placeholder: "Zahl",
              explanation: "M1 = m / m1 = 1001 / 7 = 11 · 13 = 143. Quelle: Skript Aufgabe 8, S. 11; W4_TippsSerie4.pdf, Folie 4/4"
            },
            {
              id: "u1gross",
              type: "type",
              prompt: "Berechne u1 = 143^-1 (mod 7). PARI/GP: `lift(Mod(143,7)^(-1))`",
              accept: ["5", "Mod(5,7)", "Mod(5, 7)", "u1 = 5"],
              placeholder: "Zahl",
              explanation: "143 % 7 = 3 und 3 · 5 = 15 = 2 · 7 + 1. Also u1 = 5. Quelle: Skript Aufgabe 8, S. 11"
            },
            {
              id: "x3",
              type: "type",
              prompt: "Die anderen Werte: M2 = 91, u2 = 4, M3 = 77, u3 = 12. Rechne x = 4 · 5 · 143 + 2 · 4 · 91 + 8 · 12 · 77, danach modulo 1001. PARI/GP: `(4*5*143 + 2*4*91 + 8*12*77) % 1001`",
              accept: ["970", "Mod(970,1001)", "Mod(970, 1001)", "x = 970"],
              placeholder: "Zahl",
              explanation: "2860 + 728 + 7392 = 10980. 10980 = 10 · 1001 + 970, also x = 970. Probe: 970 % 7 = 4, 970 % 11 = 2, 970 % 13 = 8. Quelle: Skript Aufgabe 8, S. 11; W2_ChinesischerRestsatz_Handout.pdf, Folie 12"
            },
            {
              id: "mfalsch",
              type: "single",
              prompt: "Was ist M2 in diesem System?",
              options: ["7 · 13 = 91", "1001 · 11", "7 · 11 = 77", "11"],
              correct: 0,
              explanation: "M2 ist m ohne den eigenen Modul 11: 1001 / 11 = 7 · 13 = 91. Quelle: W4_TippsSerie4.pdf, Folie 4/4"
            }
          ]
        },
        {
          type: "slide",
          title: "Idee von Aufgabe 2: Datenbank verschlüsseln",
          body: [
            "Eine Datenbank hat Datensätze F1, F2, ..., jeder als ganze Zahl. Jeder Benutzer soll nur seinen eigenen Datensatz lesen können. Eine vertrauenswürdige Stelle („trusted authority“) macht Folgendes:",
            {
              flow: {
                steps: [
                  { title: "Read-Keys wählen", text: "Primzahlen p_i, alle verschieden, mit p_i > F_i" },
                  { title: "Verschlüsseln", text: "E mit dem CRT so, dass E = F_i (mod p_i) für alle i" },
                  { title: "Verteilen", text: "Benutzer B_i bekommt nur seinen Read-Key p_i" },
                  { title: "Lesen", text: "F_i = E mod p_i" }
                ]
              }
            },
            {
              callout: {
                tone: "warn",
                title: "Warum p_i > F_i?",
                text: "E mod p_i gibt immer eine Zahl zwischen 0 und p_i − 1. Ist F_i = 9 und p_i = 7, liest der Benutzer 9 mod 7 = 2 statt 9. Nur wenn p_i grösser als F_i ist, kommt F_i selbst heraus."
              }
            },
            {
              callout: {
                tone: "warn",
                title: "Warum alle verschieden?",
                text: "Zweimal dieselbe Primzahl ist nicht teilerfremd, dann gilt der CRT nicht. Besonders wichtig, wenn zwei Datensätze gleich gross sind."
              }
            },
            {
              table: {
                caption: "Eigenes Beispiel: F = [3, 5, 2] mit Read-Keys p = [5, 7, 3], m = 105",
                head: ["i", "F_i", "p_i", "M_i", "u_i", "Teil F_i · u_i · M_i", "Lesen: E % p_i"],
                rows: [
                  ["1", "3", "5", "21", "1", "63", "68 % 5 = 3"],
                  ["2", "5", "7", "15", "1", "75", "68 % 7 = 5"],
                  ["3", "2", "3", "35", "2", "140", "68 % 3 = 2"]
                ],
                marks: { "0,6": "good", "1,6": "good", "2,6": "good" },
                note: "E = 63 + 75 + 140 = 278, 278 % 105 = 68. Jeder Benutzer bekommt mit seinem Key genau seinen Datensatz zurück."
              }
            },
            "Das Skript nennt die Teile x_i = u_i · M_i **Write-Keys**. Man berechnet sie einmal und danach ist E = F1 · x1 + F2 · x2 + ... (mod m).",
            "Quelle: W4_TippsSerie4.pdf, Folie 3/4; W2_ChinesischerRestsatz_Handout.pdf, Folie 15; Skript Kap. 1.3.2, S. 11 und 12"
          ],
          remember: "Read-Key p_i: Primzahl, grösser als F_i, alle verschieden. Lesen: F_i = E mod p_i."
        },
        {
          type: "checkpoint",
          id: "cp-db-einfach",
          title: "Checkpoint 6: Einfache Aufgabe zu Aufgabe 2",
          questions: [
            {
              id: "keys",
              type: "multi",
              prompt: "Datenbank F = [4, 10, 6]. Welche Read-Key-Listen [p1, p2, p3] sind erlaubt?",
              options: ["[5, 11, 7]", "[7, 11, 13]", "[5, 11, 5]", "[3, 11, 7]", "[5, 13, 11]"],
              correct: [0, 1, 4],
              explanation: "Erlaubt: Primzahlen, jede grösser als ihr F_i, alle verschieden. [5, 11, 5] hat zweimal 5. Bei [3, 11, 7] ist 3 nicht grösser als 4. Quelle: W4_TippsSerie4.pdf, Folie 3/4; Serie_04_KRY.pdf, Aufgabe 2a"
            },
            {
              id: "E",
              type: "type",
              prompt: "Verschlüssle F = [4, 10, 6] mit p = [5, 11, 7]. PARI/GP: `chinese([Mod(4,5), Mod(10,11), Mod(6,7)])`. Wie gross ist E (Zahl zwischen 0 und 384)?",
              accept: ["384", "Mod(384,385)", "Mod(384, 385)", "E = 384"],
              placeholder: "Zahl",
              explanation: "Von Hand: M = [77, 35, 55], u = [3, 6, 6], Teile 4 · 3 · 77 = 924, 10 · 6 · 35 = 2100, 6 · 6 · 55 = 1980. Summe 5004, 5004 % 385 = 384. Quelle: W4_TippsSerie4.pdf, Folien 3/4 und 4/4"
            },
            {
              id: "lesen",
              type: "type",
              prompt: "Benutzer B2 hat den Read-Key 11. Was liest er aus E = 384? PARI/GP: `384 % 11`",
              accept: ["10", "F2 = 10", "Mod(10,11)", "Mod(10, 11)"],
              placeholder: "Zahl",
              explanation: "384 = 34 · 11 + 10. B2 liest also F2 = 10. Quelle: Skript S. 12; Serie_04_KRY.pdf, Aufgabe 2b"
            },
            {
              id: "zuklein",
              type: "single",
              prompt: "Jemand nimmt für F1 = 4 den Key p1 = 3. Was liest B1 später aus E?",
              options: ["4 mod 3 = 1, also den falschen Wert 1", "Trotzdem 4", "Eine Fehlermeldung", "0"],
              correct: 0,
              explanation: "E mod 3 kann nur 0, 1 oder 2 sein. Gespeichert wird nur der Rest 4 mod 3 = 1. Deshalb verlangt die Serie p_i > F_i. Quelle: Serie_04_KRY.pdf, Aufgabe 2a; Skript S. 12"
            }
          ]
        },
        {
          type: "slide",
          title: "Serie 4, Aufgabe 2 lösen (1:1)",
          body: [
            {
              callout: {
                tone: "def",
                title: "Aufgabe 2 aus der Serie",
                text: [
                  "Hinweis: Benutzen Sie für diese Aufgabe die Testumgebung „Prakt. 4.2“ des Programms KryptoTrainer. Die Programmierschnittstelle ist als Kommentar in der Datei FrameSerie3.java zu finden.",
                  "Gegeben sei eine Datenbank D = [F1, F2, F3, F4, F5] mit Datensätzen F_i aus N von verschiedenen Benutzern B_i (mit 1 ≤ i ≤ 5).",
                  "a) (Verschlüsseln der Datenbank D): Erzeugen Sie paarweise verschiedene Primzahlen p_i > F_i (für 1 ≤ i ≤ 5). Berechnen Sie sodann mit Hilfe des Chinesischen Restsatzes die verschlüsselte Datenbank E so, dass E = F_i mod p_i (für alle 1 ≤ i ≤ 5).",
                  "b) (Entschlüsseln der chiffrierten Datenbank E): Prüfen Sie nach, dass jeder Benutzer B_i mit seinem read-key p_i seinen Datensatz F_i aus dem Chiffrat E rekonstruieren kann (für alle 1 ≤ i ≤ 5)."
                ]
              }
            },
            {
              table: {
                caption: "Programmierschnittstelle aus FrameSerie3.java (Array-Index 0 bis 4)",
                head: ["Variable", "Inhalt", "Im Rezept"],
                rows: [
                  ["`datenSatzUnverschl[i]`", "eingegebene Datensätze", "F_i"],
                  ["`schluessel[i]`", "Read-Keys, füllst du", "p_i"],
                  ["`datenbankVerschl`", "verschlüsselte Datenbank, füllst du", "E"],
                  ["`datenSatzEntschl[i]`", "entschlüsselte Datensätze, füllst du", "E mod p_i"]
                ],
                note: "Auszufüllen sind die Stubs `doDatenbankVerschl()` und `doDatenbankEntschl()`. Die Anzeige-Methoden am Ende sind schon da."
              }
            },
            {
              reveal: {
                question: "Schritt a1: Wie findest du für jedes F_i eine Primzahl p_i > F_i, die noch nicht vergeben ist?",
                answer: [
                  "Bei F_i + 1 starten und hochzählen, bis die Zahl prim ist **und** noch nicht als Key vorkommt. `isProbablePrime(50)` gibt es im mybiginteger-Paket schon. `nextProbablePrime()` gibt es dort nicht.",
                  "In PARI/GP wäre das `nextprime(F+1)`."
                ],
                code: "for (int i = 0; i < 5; i++) {\n  BigInteger kandidat = datenSatzUnverschl[i].add(BigInteger.ONE);\n  while (!kandidat.isProbablePrime(50) || schonVergeben(kandidat, i)) {\n    kandidat = kandidat.add(BigInteger.ONE);\n  }\n  schluessel[i] = kandidat;\n}",
                label: "Schritt a1 aufdecken"
              }
            },
            {
              reveal: {
                question: "Schritt a2: Wie rechnest du E = F1 · u1 · M1 + ... + F5 · u5 · M5 (mod m) in Java?",
                answer: "Zuerst m als Produkt aller Keys, dann pro Datensatz M_i, u_i und den Teil dazuzählen:",
                code: "BigInteger m = BigInteger.ONE;\nfor (int i = 0; i < 5; i++) {\n  m = m.multiply(schluessel[i]);\n}\nBigInteger summe = BigInteger.ZERO;\nfor (int i = 0; i < 5; i++) {\n  BigInteger Mi = m.divide(schluessel[i]);        // M_i = m / p_i\n  BigInteger ui = Mi.modInverse(schluessel[i]);   // u_i = M_i^-1 mod p_i\n  summe = summe.add(datenSatzUnverschl[i].multiply(ui).multiply(Mi));\n}\ndatenbankVerschl = summe.mod(m);",
                label: "Schritt a2 aufdecken"
              }
            },
            {
              reveal: {
                question: "Schritt b: Wie liest jeder Benutzer seinen Datensatz?",
                answer: "Einfach E modulo seinem Read-Key:",
                code: "for (int i = 0; i < 5; i++) {\n  datenSatzEntschl[i] = datenbankVerschl.mod(schluessel[i]);\n}",
                label: "Schritt b aufdecken"
              }
            },
            {
              reveal: {
                question: "Ganze Lösung zum Einfügen in FrameSerie3.java",
                answer: "Getestet mit dem mybiginteger-Paket, auch mit gleichen Datensätzen und mit lauter Nullen. Die Aufrufe der Anzeige-Methoden aus den Stubs bleiben am Ende stehen.",
                code: "private void doDatenbankVerschl() {\n  // Schluessel erzeugen: Primzahl p_i > F_i, alle verschieden\n  for (int i = 0; i < 5; i++) {\n    BigInteger kandidat = datenSatzUnverschl[i].add(BigInteger.ONE);\n    while (!kandidat.isProbablePrime(50) || schonVergeben(kandidat, i)) {\n      kandidat = kandidat.add(BigInteger.ONE);\n    }\n    schluessel[i] = kandidat;\n  }\n\n  // Datenbank verschluesseln: E = F1*u1*M1 + ... + F5*u5*M5 (mod m)\n  BigInteger m = BigInteger.ONE;\n  for (int i = 0; i < 5; i++) {\n    m = m.multiply(schluessel[i]);\n  }\n  BigInteger summe = BigInteger.ZERO;\n  for (int i = 0; i < 5; i++) {\n    BigInteger Mi = m.divide(schluessel[i]);\n    BigInteger ui = Mi.modInverse(schluessel[i]);\n    summe = summe.add(datenSatzUnverschl[i].multiply(ui).multiply(Mi));\n  }\n  datenbankVerschl = summe.mod(m);\n\n  // Ergebnisse anzeigen\n  schluesselAnzeigen();\n  datenbankVerschlAnzeigen();\n}\n\nprivate boolean schonVergeben(BigInteger kandidat, int bisIndex) {\n  for (int j = 0; j < bisIndex; j++) {\n    if (schluessel[j].equals(kandidat)) {\n      return true;\n    }\n  }\n  return false;\n}\n\nprivate void doDatenbankEntschl() {\n  for (int i = 0; i < 5; i++) {\n    datenSatzEntschl[i] = datenbankVerschl.mod(schluessel[i]);\n  }\n  // Ergebnisse anzeigen\n  datenSatzEntschlAnzeigen();\n}",
                label: "Lösung anzeigen"
              }
            },
            {
              table: {
                caption: "Testlauf in Prakt. 4.2 mit eigenen Beispielwerten",
                head: ["i", "Datensatz F_i", "Read-Key p_i", "E % p_i"],
                rows: [
                  ["1", "12", "13", "12"],
                  ["2", "7", "11", "7"],
                  ["3", "30", "31", "30"],
                  ["4", "7", "17", "7"],
                  ["5", "100", "101", "100"]
                ],
                marks: { "3,2": "warn" },
                note: "E = 7123024. Bei F4 = 7 sind 11 und 13 schon vergeben, darum 17. Wählst du die Primzahlen anders, ist E anders und trotzdem richtig. Entscheidend für b) ist nur: entschlüsselt = eingegeben."
              }
            },
            "Quelle: Serie_04_KRY.pdf, Aufgabe 2; W4_TippsSerie4.pdf, Folien 3/4 und 4/4; KryptoTrainer FrameSerie3.java (Programmierschnittstelle); Skript S. 11 und 12"
          ],
          remember: "Aufgabe 2 = 5-Gleichungen-CRT in Java: Keys suchen, m, pro i M_i und u_i, Summe mod m. Lesen mit E.mod(p_i)."
        },
        {
          type: "checkpoint",
          id: "cp-aufgabe2",
          title: "Checkpoint 7: Kontrolle Aufgabe 2",
          questions: [
            {
              id: "entschl",
              type: "type",
              prompt: "Welcher Java-Ausdruck kommt rechts in `datenSatzEntschl[i] = ...;`?",
              accept: ["datenbankVerschl.mod(schluessel[i])", "datenbankVerschl.mod(schluessel[i]);", "datenSatzEntschl[i] = datenbankVerschl.mod(schluessel[i]);", "datenSatzEntschl[i] = datenbankVerschl.mod(schluessel[i])"],
              placeholder: "Java-Ausdruck",
              explanation: "Benutzer B_i liest F_i = E mod p_i. Quelle: Skript S. 12; KryptoTrainer FrameSerie3.java"
            },
            {
              id: "Mi",
              type: "type",
              prompt: "Welcher Java-Ausdruck berechnet M_i = m / p_i?",
              accept: ["m.divide(schluessel[i])", "m.divide(schluessel[i]);", "BigInteger Mi = m.divide(schluessel[i]);", "Mi = m.divide(schluessel[i]);", "Mi = m.divide(schluessel[i])"],
              placeholder: "Java-Ausdruck",
              explanation: "M_i ist das Produkt aller anderen Keys, also m geteilt durch den eigenen Key. Quelle: W4_TippsSerie4.pdf, Folie 4/4"
            },
            {
              id: "warumvergeben",
              type: "multi",
              prompt: "Warum braucht der Code die Prüfung `schonVergeben`?",
              options: [
                "Zwei gleiche Datensätze (z.B. F2 = F4 = 7) würden sonst denselben Key bekommen",
                "Gleiche Keys sind nicht teilerfremd, dann funktioniert `modInverse` nicht",
                "Die Serie verlangt paarweise verschiedene Primzahlen",
                "Damit E kleiner wird"
              ],
              correct: [0, 1, 2],
              explanation: "Ohne Prüfung bekommt jede 7 den Key 11. Dann ist M_i durch 11 teilbar und `modInverse` wirft eine Exception. Mit E-Grösse hat das nichts zu tun. Quelle: Serie_04_KRY.pdf, Aufgabe 2a; W2_ChinesischerRestsatz_Handout.pdf, Folie 5"
            },
            {
              id: "ablauf2",
              type: "order",
              prompt: "Ordne die Arbeitsschritte von Aufgabe 2.",
              items: [
                "Für jedes F_i eine freie Primzahl p_i > F_i suchen",
                "m = p1 · p2 · p3 · p4 · p5 berechnen",
                "Für jedes i: M_i und u_i berechnen und F_i · u_i · M_i dazuzählen",
                "Summe modulo m nehmen und als E speichern",
                "Für jedes i: E mod p_i berechnen und mit F_i vergleichen"
              ],
              explanation: "a) Keys, m, Teile, mod m. b) Lesen und vergleichen. Quelle: Serie_04_KRY.pdf, Aufgabe 2; W4_TippsSerie4.pdf, Folie 3/4"
            },
            {
              id: "rechnen",
              type: "type",
              prompt: "Aus dem Testlauf: E = 7123024. Was liest Benutzer B3 mit Read-Key 31? PARI/GP: `7123024 % 31`",
              accept: ["30", "Mod(30,31)", "Mod(30, 31)", "F3 = 30"],
              placeholder: "Zahl",
              explanation: "7123024 % 31 = 30, also genau der eingegebene Datensatz F3 = 30. Quelle: Serie_04_KRY.pdf, Aufgabe 2b"
            }
          ]
        },
        {
          type: "slide",
          title: "Prüfung, Transfer und Abschluss",
          body: [
            {
              callout: {
                tone: "exam",
                title: "Was an der Prüfung zählt",
                text: [
                  "In der SEP 2020 stehen in den Hinweisen die Rechnungen, die man direkt mit PARI/GP machen darf: unter anderem modulare Arithmetik und modulare Inverse. `chinese()` steht nicht in dieser Liste.",
                  "Sicherer Weg also: u1, u2 (oder M_i, u_i) mit PARI/GP berechnen und hinschreiben, den Rest der Formel selbst aufschreiben. `chinese()` nur zur Kontrolle."
                ]
              }
            },
            {
              reveal: {
                question: "SEP 2020, Aufgabe 1 (c): Gesucht x (mod 323) mit x = 15 (mod 17) und x = 6 (mod 19).",
                answer: [
                  "323 = 17 · 19, teilerfremd. u1 = 19^-1 (mod 17): `lift(Mod(19,17)^(-1))` gibt 9. u2 = 17^-1 (mod 19): `lift(Mod(17,19)^(-1))` gibt 9.",
                  "x = 15 · 9 · 19 + 6 · 9 · 17 = 2565 + 918 = 3483. 3483 = 10 · 323 + 253, also **x = 253**.",
                  "Probe: 253 % 17 = 15 und 253 % 19 = 6."
                ],
                label: "Lösung vergleichen"
              }
            },
            {
              reveal: {
                question: "SEP 2020, Aufgabe 1 (b): System (i) hat die Moduln 8, 11, 15, System (ii) die Moduln 8, 11, 14. Wo hilft der CRT?",
                answer: [
                  "(i) Ja: 8, 11, 15 sind paarweise teilerfremd und 8 · 11 · 15 = 1320, genau der Modul aus der Aufgabe.",
                  "(ii) Nein: `gcd(8,14)` = 2. Die Moduln sind nicht paarweise teilerfremd, der CRT ist nicht direkt anwendbar."
                ],
                label: "Lösung vergleichen"
              }
            },
            {
              reveal: {
                question: "Transfer: Du kennst p und q nicht, nur m. Kannst du die Methode aus Aufgabe 1 trotzdem brauchen?",
                answer: "Nein. Der ganze Vorteil kommt davon, getrennt modulo p und modulo q zu rechnen. Nur wer die Faktorisierung kennt, also der Besitzer des privaten Schlüssels, kann so beschleunigen.",
                label: "Auflösung"
              }
            },
            {
              checklist: {
                title: "Kann ich Serie 4 jetzt?",
                items: [
                  "Ich prüfe mit `gcd` ob Moduln paarweise teilerfremd sind.",
                  "Ich berechne ein Inverses mit `lift(Mod(u,m)^(-1))` und in Java mit `modInverse`.",
                  "Ich löse 2 Gleichungen mit u1 = m2^-1 (mod m1), u2 = m1^-1 (mod m2) und x = a1 · u1 · m2 + a2 · u2 · m1.",
                  "Ich habe `myModPow(exponent, p, q)` geschrieben und in Prakt. 4.1 getestet.",
                  "Ich löse 3 oder mehr Gleichungen mit M_i und u_i.",
                  "Ich habe `doDatenbankVerschl()` und `doDatenbankEntschl()` geschrieben und in Prakt. 4.2 getestet."
                ]
              }
            },
            {
              callout: {
                tone: "tip",
                title: "Nur Zusatzwissen für Serie 4",
                text: [
                  "Isomorphe Ringe und der Eindeutigkeitsbeweis (Skript S. 9 und 10, Handout Folie 10).",
                  "Low-Exponent-Attacke mit CRT (Skript Kap. 2.1) gehört zu Serie 3.",
                  "Fermattest und Carmichael-Zahlen (W4_Fermattest_Handout) sind ein neues Thema und werden in Serie 4 nicht gebraucht."
                ]
              }
            },
            "Quelle: SEP_MKR_2020_final.pdf, Hinweise und Aufgabe 1 (b), (c); Skript Kap. 1.3 und 2.1; W2_ChinesischerRestsatz_Handout.pdf, Folie 10"
          ],
          remember: "Prüfung: Rechenweg zeigen, Inverse mit PARI/GP, `chinese()` nur als Kontrolle."
        }
      ]
    }
  ]
});
