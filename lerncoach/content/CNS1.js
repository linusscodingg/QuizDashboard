/*
 * Lerncoach-Inhalte für CNS1 (Communication Networks and Services 1, AS 2025, Andreas Marx).
 * Quellen: W1_IPV6_Part1.pdf, W2_CNS1-sld-02-ipv6-2.pdf, W3_CNS1-sld-03-voip-signaling.pdf,
 *          W4_CNS1-sld-04-routing-1.pdf, W5_CNS1-sld-05-routing-2.pdf
 * Erklärungen auf Deutsch, Checkpoints auf Englisch (Prüfungssprache).
 * Ab Woche 5 sind die Begründungen in den Checkpoints auf Deutsch, die Fragen auf Englisch.
 *
 * Gewichtung Woche 5 (Routing Part 2):
 *   A, muss ich können   – OSPF-Steckbrief, LSA → LSDB → SPF-Baum → Routing-Tabelle, Kosten 10^8 / Bitrate,
 *                          Dijkstra von Hand (Folien 14–21), Update-Verhalten, die fünf Nachrichtentypen,
 *                          Routing-Zeile und AD-Werte, Areas / Backbone / ABR / ASBR / Flooding Scopes,
 *                          OSPFv2 gegen OSPFv3, IS-IS-Steckbrief und Levels, Vergleichstabelle Folie 67.
 *   B, sollte ich verstehen – LSA-Typen und Designated Router, ECMP, Virtual Links, OSPFv3-Header und Empfang,
 *                          IS-IS-PDU-Arten, Shortest Path Bridging.
 *   C, nur einordnen     – RFC-Nummern, Header-Felder im Detail, LS-Type-Codes, IS-IS-Typnummern, Literatur.
 */
Lerncoach.registerSubject({
  id: "CNS1",
  name: "Communication Networks and Services 1",
  short: "CNS1",
  description: "Kommunikationsnetze und Netzwerkdienste",
  accent: "#0b77a5",
  weeks: [
    /* ================================================================
     * Woche 1: IPv6 Part 1
     * ================================================================ */
    {
      id: "w1",
      number: 1,
      title: "IPv6 Part 1: Header, Adressen, Neighbor Discovery",
      status: "ready",
      items: [
        {
          type: "slide",
          title: "Warum überhaupt IPv6?",
          body: [
            "Stell dir das Internet als riesige Stadt vor, in der jedes Gerät eine Hausnummer braucht. IPv4 hat dafür 32 Bit, also rund 4,3 Milliarden Nummern. Das klang früher nach unendlich viel. Heute wollen aber nicht nur Computer und Handys ins Netz, sondern auch Autos, Fernseher, Smart-Home-Geräte und unzählige IoT-Sensoren. Die Nummern sind schlicht ausgegangen: Die europäische Vergabestelle **RIPE NCC** hatte im **November 2019** keine freien IPv4-Adressen mehr.",
            "Lange hat man sich mit **NAT** (Network Address Translation) beholfen. Das ist wie ein Mehrfamilienhaus mit nur einer Hausnummer: Alle Bewohner teilen sich eine öffentliche Adresse, und der Hauswart (der Router) verteilt die Post intern. Das verschiebt das Problem um ein paar Jahre, löst es aber nicht.",
            "Die IETF hat deshalb schon Anfang der 90er am Nachfolger gearbeitet. 1993 entstand die Arbeitsgruppe **IPng** (IP next generation), 1994 wurde IPv6 «Proposed Standard», 1998 «Draft Standard». Die aktuelle Spezifikation ist **RFC 8200**, sie ersetzt RFC 2460. Moderne Betriebssysteme können heute **Dual Stack**, also IPv4 und IPv6 parallel, und die Provider stellen Schritt für Schritt um."
          ],
          remember: "IPv6 löst die IPv4-Adressknappheit (RIPE NCC leer seit November 2019). Aktuelle Spezifikation: RFC 8200. Dual Stack = IPv4 und IPv6 parallel."
        },
        {
          type: "slide",
          title: "Was IPv6 neu macht",
          body: [
            "IPv6 ist mehr als nur «längere Adressen». Die Entwickler haben die Gelegenheit genutzt, das Protokoll gleich aufzuräumen. Das ist wie ein Hausumbau: Wenn man schon die Wände aufreisst, verlegt man gleich auch neue Leitungen.",
            "Laut Vorlesung gibt es sechs grosse Neuerungen: einen **extrem grossen Adressraum**, einen **vereinfachten Header** mit fester Struktur und ohne Optionen, **Quality of Service** über das Flow Label, **verbessertes Routing** über den Routing Header, **Sicherheitsfunktionen** (Authentisierung und Verschlüsselung von Paketen) und **keine Fragmentierung in Routern**, damit die Router unterwegs möglichst wenig Arbeit haben.",
            "Dazu kommen praktische Details: Ein Interface darf **mehrere Adressen** gleichzeitig haben, ICMPv6 kann deutlich mehr als sein Vorgänger, es gibt Autokonfiguration, und Geräte verstecken sich nicht mehr zwingend hinter NAT."
          ],
          remember: "Neu in IPv6: riesiger Adressraum, einfacher Header, Flow Label (QoS), Routing Header, Security, keine Fragmentierung in Routern. Ein Interface kann mehrere Adressen haben."
        },
        {
          type: "slide",
          title: "Die wichtigsten Begriffe",
          body: [
            "Ein **Node** ist jedes Gerät, das IPv6 spricht. Leitet es Pakete für andere weiter, ist es ein **Router**, alle anderen Nodes heissen **Host**. Das Medium, über das Nodes auf Schicht 2 direkt miteinander reden, ist der **Link**, zum Beispiel ein Ethernet-Segment. Nodes am selben Link sind **Neighbors**, also Nachbarn, und das **Interface** ist der Anschluss eines Nodes an einen Link.",
            "Zwei Begriffe werden oft verwechselt. Die **Link MTU** ist die maximale Paketgrösse auf einem einzelnen, direkt angeschlossenen Link. Die **Path MTU** ist die kleinste Link MTU aller Links auf dem ganzen Weg von der Quelle zum Ziel.",
            "Stell dir einen Lastwagen vor, der durch mehrere Unterführungen muss. Wie hoch er beladen werden darf, bestimmt nicht die höchste, sondern die **niedrigste** Unterführung auf der Route. Genau das ist die Path MTU."
          ],
          remember: "Path MTU = kleinste Link MTU entlang des Pfades. Neighbors = Nodes am selben Link. Host = jeder Node, der kein Router ist."
        },
        {
          type: "checkpoint",
          id: "cp-basics",
          title: "Checkpoint: Motivation & Basics",
          questions: [
            {
              id: "improvements",
              type: "multi",
              prompt: "Which of the following are improvements that IPv6 introduces compared to IPv4?",
              options: [
                "Routers no longer fragment packets",
                "A base header with a fixed structure and no options",
                "A header checksum that every router verifies and recalculates",
                "Packet flow identification via the Flow Label",
                "Broadcast addresses for faster neighbor discovery"
              ],
              correct: [0, 1, 3],
              explanation: "IPv6 removed the header checksum and has no broadcast at all. Fragmentation in routers is gone, the base header is fixed, and the Flow Label supports QoS."
            },
            {
              id: "rfc",
              type: "type",
              prompt: "Which RFC contains the current IPv6 specification and obsoletes RFC 2460? (number only)",
              placeholder: "e.g. 1234",
              accept: ["8200", "RFC 8200", "rfc8200"],
              explanation: "RFC 8200 is the current IPv6 specification."
            },
            {
              id: "path-mtu",
              type: "type",
              prompt: "A packet travels over four links with MTUs of 1500, 1492, 1400 and 1500 bytes. What is the Path MTU in bytes?",
              placeholder: "Bytes",
              accept: ["1400", "1400 bytes", "1400 byte"],
              explanation: "The Path MTU is the smallest link MTU on the path: 1400 bytes."
            },
            {
              id: "terminology",
              type: "multi",
              prompt: "Two PCs are connected to the same Ethernet segment. Neither forwards packets for others. Which statements are correct?",
              options: [
                "They are neighbors",
                "Each of them is a node",
                "Each of them is a router",
                "They are attached to the same link",
                "They are hosts"
              ],
              correct: [0, 1, 3, 4],
              explanation: "Both implement IPv6 (nodes), do not forward (hosts, not routers) and share one link, which makes them neighbors."
            }
          ]
        },
        {
          type: "slide",
          title: "Vom IPv4- zum IPv6-Header",
          body: [
            "Der IPv4-Header ist wie ein Formular mit vielen optionalen Feldern: Jeder Router muss zuerst schauen, wie lang es überhaupt ist, und dann alles durchlesen. IPv6 hat dieses Formular in fünf Schritten entschlackt.",
            "Erstens wurde die Header-Länge **fix**: Das Feld «IP Header Length» und die «Options» sind weg. Zweitens flogen die **Fragmentierungsfelder** raus, sie leben jetzt in einem Extension Header. Drittens wurde die **Header-Checksumme gestrichen**, so muss nicht mehr jeder Router bei jedem Hop neu rechnen. Viertens wurden Felder umbenannt und neu definiert: Es gibt jetzt **Traffic Class**, **Next Header** und **Hop Limit**. Fünftens wurde **Version** auf 4 Bit reduziert, das **Flow Label** auf 20 Bit vergrössert, **TTL durch Hop Limit** ersetzt, und die Adressen wuchsen auf **128 Bit** (16 Byte).",
            "Das Ergebnis ist ein Basis-Header mit fester Länge von **40 Byte**. Router können ihn wie einen Barcode scannen, statt ihn wie einen Brief lesen zu müssen, und genau das macht das Weiterleiten schneller."
          ],
          remember: "IPv6-Basis-Header: fix 40 Byte, keine Optionen, keine Checksumme, keine Fragmentierungsfelder. TTL wurde zu Hop Limit."
        },
        {
          type: "slide",
          title: "Die Felder im Detail",
          body: [
            "**Version** (4 Bit) hat den Wert 6, binär 0110. **Traffic Class** (8 Bit) ordnet das Paket einer Verkehrsklasse oder Priorität zu, ähnlich wie A-Post und B-Post. Sie wird vom Sender oder von einem klassifizierenden Router gesetzt und darf unterwegs umgeschrieben werden. Standardwert ist 00000000, also keine Sonderbehandlung. Danach folgt das **Flow Label** (20 Bit), dazu gleich mehr.",
            "**Payload Length** (16 Bit) gibt die Länge der Nutzdaten an, **ohne** Header. Maximal sind so 65'535 Byte möglich. Wer mehr braucht, nutzt ein **Jumbogram**: Mit der Jumbo Payload Option im Hop-by-Hop Extension Header sind Pakete bis 4 GByte möglich. **Next Header** (8 Bit) sagt, was als Nächstes kommt, entweder ein Extension Header oder direkt der Header der Nutzlast wie TCP oder UDP.",
            "**Hop Limit** (8 Bit) ist der Nachfolger von TTL: Jeder Router zieht 1 ab, bei 0 wird das Paket verworfen und der Sender per ICMPv6 informiert. Das ist wie ein Busticket mit einer festen Anzahl Stempelfelder. Startwert ist oft **64**. Pakete mit Hop Limit **255** werden nicht geroutet, das nutzt zum Beispiel Neighbor Discovery. Zum Schluss folgen **Source** und **Destination Address** mit je 128 Bit."
          ],
          remember: "Version 4 Bit (=6), Traffic Class 8, Flow Label 20, Payload Length 16, Next Header 8, Hop Limit 8, Adressen je 128 Bit. Summe: 40 Byte."
        },
        {
          type: "slide",
          title: "Das Flow Label",
          body: [
            "Ein **Flow** ist ein **einseitiger** Paketstrom zwischen zwei Anwendungsprozessen, zum Beispiel die Sprachpakete eines Telefonats in eine Richtung. Alle Pakete eines Flows teilen fünf Merkmale, das **Quintupel**: Quell- und Zieladresse, Quell- und Zielport und die Protokollkennung.",
            "Ein Router könnte den Flow über dieses Quintupel erkennen, müsste dafür aber tief ins Paket schauen, bis in den TCP- oder UDP-Header. Einfacher geht es mit einem Etikett: Der **Sender** gibt allen Paketen des Flows dieselbe Nummer im Flow Label mit. Das ist wie ein farbiges Gepäckband am Flughafen, das allen Koffern einer Reisegruppe dieselbe Sonderbehandlung verschafft.",
            "Das Label ist eine **zufällig** gewählte Zahl im Bereich **1 bis 0xFFFFF**. Der Wert **0** bedeutet: Dieses Paket gehört zu keinem gekennzeichneten Flow."
          ],
          remember: "Flow = unidirektional, erkennbar am Quintupel (Src/Dst-Adresse, Src/Dst-Port, Protokoll). Flow Label 20 Bit, vom Sender zufällig 1..0xFFFFF, 0 = kein Flow."
        },
        {
          type: "checkpoint",
          id: "cp-header",
          title: "Checkpoint: The IPv6 Base Header",
          questions: [
            {
              id: "header-size",
              type: "type",
              prompt: "What is the fixed size of the IPv6 base header in bytes?",
              placeholder: "Bytes",
              accept: ["40", "40 bytes", "40 byte"],
              explanation: "4+8+20+16+8+8 bits = 8 bytes of fields plus 2 × 16 bytes of addresses = 40 bytes."
            },
            {
              id: "field-order",
              type: "order",
              prompt: "Order the first six fields of the IPv6 base header as they appear in the packet.",
              items: ["Version", "Traffic Class", "Flow Label", "Payload Length", "Next Header", "Hop Limit"],
              explanation: "Version, Traffic Class, Flow Label, Payload Length, Next Header, Hop Limit, then Source and Destination Address."
            },
            {
              id: "removed-fields",
              type: "multi",
              prompt: "Which IPv4 header functions no longer have a field in the IPv6 base header?",
              options: [
                "Header checksum",
                "Options",
                "Fragment offset",
                "Header length (IHL)",
                "Identifying the upper-layer protocol",
                "A per-hop counter decremented by routers"
              ],
              correct: [0, 1, 2, 3],
              explanation: "The upper-layer protocol is now given by Next Header, and the per-hop counter still exists as Hop Limit. Checksum, options, fragmentation fields and header length are gone."
            },
            {
              id: "flow-label",
              type: "multi",
              prompt: "Which statements about the IPv6 Flow Label are correct?",
              options: [
                "It is 20 bits long",
                "The value 0 means the packet is not part of a labeled flow",
                "It is assigned by the first router on the path",
                "A flow is bidirectional, so request and response share one label",
                "The sender chooses a random value between 1 and 0xFFFFF"
              ],
              correct: [0, 1, 4],
              explanation: "The sender (not a router) assigns a random label. A flow is unidirectional."
            },
            {
              id: "payload-max",
              type: "type",
              prompt: "What is the maximum payload length in bytes without using a jumbogram?",
              placeholder: "Bytes",
              accept: ["65535", "65'535", "65,535", "65 535", "65535 bytes"],
              explanation: "Payload Length has 16 bits, so the maximum is 2^16 − 1 = 65'535 bytes. Jumbograms (Hop-by-Hop option) allow up to 4 GB."
            }
          ]
        },
        {
          type: "slide",
          title: "Extension Headers: Anhänger statt Sonderfelder",
          body: [
            "Wo sind Fragmentierung, Optionen und Co. geblieben? IPv6 lagert alles Optionale in **Extension Headers** aus. Stell dir einen Lastwagen vor: Der Basis-Header ist die Zugmaschine, und nur wenn wirklich etwas Spezielles transportiert werden muss, wird ein Anhänger angekoppelt. Ohne Anhänger ist man schneller unterwegs.",
            "Verkettet werden die Anhänger über das Feld **Next Header**: Der Basis-Header sagt, welcher Header als Nächstes kommt, dieser wiederum, welcher danach kommt, und so weiter bis zur eigentlichen Nutzlast, etwa TCP (6). Jeder Extension Header enthält den Typ des nächsten Headers und seine eigene Länge.",
            "Die Reihenfolge ist fest vorgegeben, und zwar nach der Frage «Wer muss das lesen?». Was Router unterwegs verarbeiten müssen, steht vorne, was nur das Ziel interessiert, hinten. Die Reihenfolge laut RFC 8200: **Hop-by-Hop Options**, **Destination Options** (für die im Routing Header aufgelisteten Router), **Routing**, **Fragment**, **Authentication** (AH), **Encapsulating Security Payload** (ESP), **Destination Options** (für das Ziel) und dann die Nutzlast."
          ],
          remember: "Extension Headers nur bei Bedarf, verkettet über Next Header. Reihenfolge: Hop-by-Hop → Destination → Routing → Fragment → AH → ESP → Destination → Payload."
        },
        {
          type: "slide",
          title: "Die wichtigsten Next-Header-Werte",
          body: [
            "**Hop-by-Hop Options (0)** muss jeder Router auf dem Weg lesen, zum Beispiel für die Jumbogram-Option. Wenn dieser Header vorhanden ist, muss er **als erster** direkt nach dem Basis-Header stehen. Der **Routing Header (43)** erlaubt Source Routing: Der Sender gibt vor, über welche Router das Paket laufen soll, wie bei einer Wanderung mit festgelegten Hütten. Source Routing gilt als Sicherheitslücke, eine eingeschränkte Variante nutzt Mobile IPv6.",
            "Der **Fragment Header (44)** enthält alles, um ein Paket wieder zusammenzusetzen (Identifier, Offset, More-Flag), und wird nur vom Empfänger verarbeitet. **AH (51)** und **ESP (50)** gehören zu IPsec und sorgen für Integrität und Authentizität, ESP zusätzlich für Vertraulichkeit. **Destination Options (60)** sind nur für den Empfänger. Für Mobile IPv6 gibt es noch **Mobility (135)**.",
            "Dieselbe Nummerierung gilt für die Nutzlast: **TCP = 6**, **UDP = 17**, **ICMPv6 = 58**, **No Next Header = 59** (oft mit ESP) und IPv6-in-IPv6 = 41. Ein Paket mit Routing- und Fragment Header sieht so aus: Basis-Header mit Next Header 43, Routing Header mit Next Header 44, Fragment Header mit Next Header 6, dann das TCP-Segment."
          ],
          remember: "Hop-by-Hop 0 (immer zuerst), Routing 43, Fragment 44, ESP 50, AH 51, Destination 60. TCP 6, UDP 17, ICMPv6 58, No Next Header 59."
        },
        {
          type: "slide",
          title: "Fragmentierung und Path MTU Discovery",
          body: [
            "Bei IPv4 dürfen Router zu grosse Pakete unterwegs zerlegen. Bei IPv6 **nicht**: Nur der **Sender** fragmentiert, und nur das **Ziel** setzt wieder zusammen. So bleiben die Router schlank und schnell.",
            "Dafür muss der Sender die Path MTU kennen. Die findet er per **Path MTU Discovery** heraus: Er schickt zuerst Pakete in der MTU seines lokalen Links. Trifft ein Paket auf einen Link mit kleinerer MTU, verwirft der zuständige Router es und schickt die ICMPv6-Meldung **«Packet Too Big»** mit der MTU des engen Links zurück. Der Sender merkt sich diesen Wert für dieses Ziel (im Routing-Cache) und passt sich an. Kommt weiter hinten eine noch engere Stelle, wiederholt sich das. Wie der Lastwagenfahrer, der sich an jeder zu niedrigen Unterführung die neue Maximalhöhe merkt.",
            "Jeder Link muss für IPv6 mindestens **1280 Byte** MTU bieten. Muss ein Sender trotzdem ein grösseres Paket loswerden (etwa ein grosses UDP-Datagramm), zerlegt er es selbst. Jedes Fragment bekommt einen Fragment Header mit **Identification** (gleich für alle Fragmente eines Pakets), **Fragment Offset** (Position in Einheiten von **8 Byte**) und dem **M-Flag** (1 = es folgen weitere Fragmente, 0 = letztes Fragment)."
          ],
          remember: "Nur der Sender fragmentiert, nur das Ziel reassembliert. PMTUD über ICMPv6 «Packet Too Big». Minimale IPv6-MTU: 1280 Byte. Offset in 8-Byte-Einheiten."
        },
        {
          type: "checkpoint",
          id: "cp-extensions",
          title: "Checkpoint: Extension Headers & Fragmentation",
          questions: [
            {
              id: "ext-order",
              type: "order",
              prompt: "All of these extension headers appear in one packet. Put them into the order required by RFC 8200.",
              items: ["Hop-by-Hop Options", "Routing", "Fragment", "Authentication Header (AH)", "Encapsulating Security Payload (ESP)"],
              explanation: "Headers processed by routers come first, those processed only by the destination come later."
            },
            {
              id: "next-header-udp",
              type: "type",
              prompt: "The IPv6 base header is directly followed by a UDP datagram. Which value does the base header's Next Header field contain?",
              accept: ["17"],
              explanation: "UDP = 17 (TCP = 6, ICMPv6 = 58)."
            },
            {
              id: "fragmentation",
              type: "multi",
              prompt: "Which statements about fragmentation in IPv6 are correct?",
              options: [
                "Only the source node fragments packets",
                "Routers split packets that exceed the MTU of the next link",
                "Only the destination reassembles the fragments",
                "The Fragment Offset is counted in units of 8 bytes",
                "The M flag is 0 on every fragment except the last one"
              ],
              correct: [0, 2, 3],
              explanation: "Routers never fragment in IPv6. The M flag is 1 when more fragments follow and 0 on the last one."
            },
            {
              id: "pmtud-order",
              type: "order",
              prompt: "Order the steps of Path MTU Discovery.",
              items: [
                "The host sends packets with the MTU of its local link",
                "A router in front of a smaller link discards the packet",
                "The router returns ICMPv6 Packet Too Big with the MTU of that link",
                "The host caches the learned MTU for this destination and sends smaller packets"
              ],
              explanation: "The process can repeat if a later link has an even smaller MTU."
            },
            {
              id: "hbh-position",
              type: "single",
              prompt: "Where must the Hop-by-Hop Options header be placed if it is present?",
              options: [
                "Immediately after the IPv6 base header",
                "Directly in front of the upper-layer header",
                "Right after the Routing header",
                "Anywhere, because routers scan all extension headers"
              ],
              correct: 0,
              explanation: "Every router on the path processes it, so it must come first."
            }
          ]
        },
        {
          type: "slide",
          title: "IPv6-Adressen lesen und kürzen",
          body: [
            "Eine IPv6-Adresse hat **128 Bit** (16 Byte). Geschrieben wird sie hexadezimal in **8 Blöcken zu je 16 Bit**, also mit 4 Hex-Ziffern pro Block, getrennt durch Doppelpunkte, zum Beispiel `2001:0620:0000:0004:0A00:20FF:FE9C:7E4A`. Das ist lang, deshalb gibt es zwei Kürzungsregeln.",
            "Regel 1: **Führende Nullen** in einem Block darfst du weglassen. Aus `0620` wird `620`, aus `0000` wird `0`. Obige Adresse wird so zu `2001:620:0:4:a00:20ff:fe9c:7e4a`. Regel 2: Eine **zusammenhängende Folge von Null-Blöcken** darf durch `::` ersetzt werden. Aus `1023:0000:0000:0000:1736:A673:88A0:A620` wird `1023::1736:a673:88a0:a620`.",
            "Aber Achtung: `::` darf nur **ein einziges Mal** pro Adresse vorkommen. Sonst wüsste niemand, wie viele Null-Blöcke an welcher Stelle fehlen. Das ist wie ein Satz mit zwei Lücken «Ich habe ... Äpfel und ... Birnen gekauft, zusammen 5 Stück»: Du kennst die Summe, aber nicht, wie sie sich aufteilt. Mit nur einer Lücke kannst du immer eindeutig auf 8 Blöcke auffüllen."
          ],
          remember: "128 Bit = 8 Blöcke à 16 Bit (4 Hex-Ziffern). Führende Nullen weglassen ist erlaubt, :: für Null-Blöcke nur einmal pro Adresse."
        },
        {
          type: "slide",
          title: "Adresstypen: wer darf wohin?",
          body: [
            "IPv6 kennt **Unicast** (ein Empfänger), **Multicast** (eine Gruppe) und **Anycast** (einer aus einer Gruppe). Was es nicht mehr gibt, ist **Broadcast**. Statt «alle im Raum anschreien» spricht IPv6 gezielt Gruppen an.",
            "**Global Unicast** `2000::/3` ist das öffentliche, routbare Internet, wie eine Postadresse, die weltweit funktioniert. **Link Local** `FE80::/10` gilt nur im eigenen Layer-2-Segment, Router leiten Pakete an solche Ziele **nie** weiter. Jedes Interface konfiguriert sich automatisch eine Link-Local-Adresse, vergleichbar mit APIPA `169.254.x.x` bei IPv4. Die Link-Local-Adresse ist wie dein Vorname in der Familie: zuhause eindeutig, draussen nutzlos.",
            "**Unique Local Addresses** (ULA) `FC00::/7` sind die privaten Adressen von IPv6, gedacht wie `10.x.x.x` bei IPv4, aber möglichst eindeutig und innerhalb der Organisation **routbar**. Es gibt zwei Hälften: `FC00::/8` (L=0, die Global ID sollte eine Vergabestelle zuteilen, die es bis heute nicht gibt) und `FD00::/8` (L=1, die Global ID ist zufällig und damit sehr wahrscheinlich eindeutig). Dazu kommen **Loopback** `::1`, die **unspezifizierte Adresse** `::` (entspricht 0.0.0.0), **Multicast** `FF00::/8` und das **Dokumentationspräfix** `2001:DB8::/32` für Beispiele."
          ],
          remember: "GUA 2000::/3, LLA FE80::/10 (nie geroutet), ULA FC00::/7 (FD = zufällige Global ID), Multicast FF00::/8, Loopback ::1, unspezifiziert ::. Kein Broadcast."
        },
        {
          type: "checkpoint",
          id: "cp-notation",
          title: "Checkpoint: Notation & Address Types",
          questions: [
            {
              id: "shorten",
              type: "type",
              prompt: "Write 2001:0DB8:0000:0000:0008:0800:200C:417A in the shortest valid notation.",
              placeholder: "shortest notation",
              accept: ["2001:db8::8:800:200c:417a"],
              explanation: "Drop leading zeros in every block (0DB8 → db8, 0008 → 8, 0800 → 800) and replace the two zero blocks with ::."
            },
            {
              id: "valid-notation",
              type: "multi",
              prompt: "Which of these are valid IPv6 address notations?",
              options: [
                "2001:db8::1",
                "fe80::1::5",
                "2001:db8:0:0:1::1",
                "::1",
                "2001:db8:12345::1",
                "ff02::1:ff6d:a350"
              ],
              correct: [0, 2, 3, 5],
              explanation: ":: may only appear once (fe80::1::5 is invalid) and a block has at most 4 hex digits (12345 is invalid)."
            },
            {
              id: "link-local",
              type: "multi",
              prompt: "A packet has the destination fe80::a00:9ff:fea1:7226. Which statements are correct?",
              options: [
                "It is a link-local address",
                "Routers will not forward the packet to another link",
                "It is reachable from anywhere on the Internet",
                "It lies in the range FE80::/10",
                "It is a Unique Local Address"
              ],
              correct: [0, 1, 3],
              explanation: "FE80::/10 is link-local: non-routable and only valid on the local layer 2 segment."
            },
            {
              id: "ula",
              type: "multi",
              prompt: "Which statements about Unique Local Addresses are correct?",
              options: [
                "They are in the range FC00::/7",
                "In the FD00::/8 half, the Global ID is chosen randomly",
                "Like link-local addresses, they are never routed",
                "They are meant for internal use, similar to 10.0.0.0/8 in IPv4",
                "They must be registered with RIPE before use"
              ],
              correct: [0, 1, 3],
              explanation: "ULAs are routable inside an organization. The FC half would need an allocation authority that does not exist, the FD half uses a random Global ID."
            }
          ]
        },
        {
          type: "slide",
          title: "Aufbau einer globalen Adresse",
          body: [
            "Eine Global Unicast Address besteht in der Praxis aus drei Teilen: **48 Bit Global Routing Prefix**, **16 Bit Subnet-ID** und **64 Bit Interface-ID**. Die ersten drei Bit sind `001`, daher der Bereich `2000::/3`. Das ist wie eine Postadresse: Das Präfix ist Stadt und Strasse, die Subnet-ID das Stockwerk, die Interface-ID die Wohnungstür.",
            "Beispiel ZHAW: Der Bereich `2001:620::/32` gehört **Switch**, dem Provider der Schweizer Hochschulen. Switch hat der ZHAW daraus `2001:620:190::/48` zugeteilt. Mit den 16 Bit Subnet-ID kann die ZHAW **65'536 Subnetze** bilden, und in jedem Subnetz bieten 64 Bit Interface-ID mehr als genug Platz für alle Computer der Welt.",
            "Es gibt zwei Arten globaler Adressen. **Provider Aggregatable (PA)** bekommt der ISP von der regionalen Registry (für Europa RIPE). Weil viele Kunden unter einem Präfix des ISP liegen, kann dieser alles als **eine einzige Route** ankündigen, das hält die Routing-Tabellen klein. **Provider Independent (PI)** vergibt die Registry direkt an eine Organisation. Vorteil: Provider wechseln ohne Neunummerierung und mehrere Provider gleichzeitig nutzen (**Multi-Homing**). Nachteil: Die Blöcke lassen sich nicht zusammenfassen, die Routing-Tabellen werden grösser. Übrigens hat ein Interface meistens **mehrere** Adressen, mindestens eine Link-Local und eine globale."
          ],
          remember: "GUA: 48 Bit Global Routing Prefix + 16 Bit Subnet-ID + 64 Bit Interface-ID. PA = vom ISP, aggregierbar. PI = direkt von der Registry, Multi-Homing, grössere Routing-Tabellen."
        },
        {
          type: "slide",
          title: "Multicast-Adressen entschlüsseln",
          body: [
            "Multicast-Adressen beginnen immer mit `FF` (8 Bit, Präfix `FF00::/8`). Danach kommen 4 Bit **Lifetime**: **0 = permanent** (fest vergebene Gruppe), **1 = temporär**. Dann 4 Bit **Scope**, also wie weit die Nachricht reisen darf, und zum Schluss 112 Bit **Group-ID**.",
            "Der Scope ist wie der Verteiler einer E-Mail: nur an dich selbst, ans Team, ans Gebäude, an die Firma oder an die ganze Welt. Die Werte: **1 = Node**, **2 = Link**, **5 = Site**, **8 = Organization**, **E = Global**.",
            "Zwei Adressen solltest du auswendig kennen: `FF02::1` erreicht **alle Nodes** im lokalen Segment und `FF02::2` **alle Router** im lokalen Segment. Die `02` verrät dir sofort: Lifetime 0 (permanent) und Scope 2 (Link)."
          ],
          remember: "Multicast = FF + Lifetime (0 permanent, 1 temporär) + Scope (1 Node, 2 Link, 5 Site, 8 Org, E Global) + Group-ID. FF02::1 = alle Nodes, FF02::2 = alle Router."
        },
        {
          type: "checkpoint",
          id: "cp-structure",
          title: "Checkpoint: Global & Multicast Addresses",
          questions: [
            {
              id: "subnets",
              type: "type",
              prompt: "ZHAW received the prefix 2001:620:190::/48. How many /64 subnets can it create?",
              placeholder: "number",
              accept: ["65536", "65'536", "65,536", "65 536", "2^16"],
              explanation: "64 − 48 = 16 bits for the Subnet-ID, so 2^16 = 65'536 subnets."
            },
            {
              id: "gua-order",
              type: "order",
              prompt: "Order the parts of a global unicast address from the most significant to the least significant bits.",
              items: ["Global Routing Prefix", "Subnet ID", "Interface ID"],
              explanation: "48 bits prefix, 16 bits subnet, 64 bits interface ID (in real-world practice)."
            },
            {
              id: "scope",
              type: "type",
              prompt: "Decode the multicast address FF05::2. Which scope does it have? (one word)",
              accept: ["site", "site-local", "site local"],
              explanation: "FF, then lifetime 0 (permanent), then scope 5 = Site."
            },
            {
              id: "all-routers",
              type: "type",
              prompt: "Which IPv6 multicast address reaches all routers on the local link?",
              accept: ["ff02::2"],
              explanation: "FF02::2 = all routers, FF02::1 = all nodes (link scope)."
            },
            {
              id: "pi-pa",
              type: "single",
              prompt: "An organization wants to change its ISP without renumbering and connect to two ISPs at the same time. Which address type fits best?",
              options: [
                "Provider Independent (PI) global addresses",
                "Provider Aggregatable (PA) global addresses",
                "Unique Local Addresses from FD00::/8",
                "Link-local addresses"
              ],
              correct: 0,
              explanation: "PI space is assigned directly by the registry and enables multi-homing, at the cost of larger routing tables."
            }
          ]
        },
        {
          type: "slide",
          title: "Neighbor Discovery: das Quartier-Netzwerk",
          body: [
            "Wie finden sich Geräte im selben Netz? Bei IPv4 gab es dafür einen Mix aus **ARP**, **ICMP Router Discovery**, **DHCP Default Route** und **ICMP Redirect**. IPv6 ersetzt das alles durch ein einziges Protokoll: das **Neighbor Discovery Protocol (NDP)**, RFC 4861. Es ist wie der Quartier-Chat: Man erfährt, wer neu eingezogen ist, wer die Hauswartung macht und ob jemand nicht mehr erreichbar ist.",
            "NDP benutzt fünf **ICMPv6**-Nachrichten. **133 Router Solicitation**: Ein Host fragt aktiv nach Routern, statt auf die nächste periodische Ankündigung zu warten. **134 Router Advertisement**: Router kündigen sich periodisch per Multicast an und liefern Präfix und Parameter. **135 Neighbor Solicitation**: Frage nach der Link-Layer-Adresse eines Nachbarn. **136 Neighbor Advertisement**: die Antwort darauf. **137 Redirect**: Ein Router weist auf einen besseren nächsten Hop hin.",
            "Die Ergebnisse speichert jeder Node in vier Tabellen: **Neighbor Cache**, **Destination Cache**, **Prefix List** und **Default Router List**, jeweils bis die Lebensdauer eines Eintrags abläuft. Damit erledigt NDP unter anderem Router- und Präfix-Erkennung, Parameter wie Link MTU und Hop Limit, Adressauflösung, das Erkennen unerreichbarer Nachbarn und die **Duplicate Address Detection**."
          ],
          remember: "NDP (RFC 4861) ersetzt ARP, ICMP Router Discovery, DHCP Default Route und ICMP Redirect. ICMPv6-Typen: 133 RS, 134 RA, 135 NS, 136 NA, 137 Redirect."
        },
        {
          type: "slide",
          title: "Multicast statt Broadcast",
          body: [
            "ARP hat bei IPv4 die Frage «Wer hat diese IP?» per **Broadcast** an `FF-FF-FF-FF-FF-FF` geschickt, also an wirklich jedes Gerät im Segment. Das ist, als würdest du im Bahnhof per Lautsprecher nach einer Person suchen. NDP fragt stattdessen gezielt per **Multicast**, und nur die angesprochene Gruppe muss zuhören.",
            "Auf Schicht 3 sind das `FF02::1` (alle Nodes) und `FF02::2` (alle Router). Für Neighbor Solicitations gibt es zusätzlich die **Solicited-Node-Multicast-Adresse** aus dem Bereich `FF02:0:0:0:0:1:FF00::/104`: vorne `FF02::1:FF`, hinten die **letzten 24 Bit** der gesuchten Adresse. Im Wireshark-Beispiel der Vorlesung wird `fe80::def5:1bff:fe6d:a350` über `ff02::1:ff6d:a350` gesucht, und das Neighbor Advertisement antwortet mit der MAC-Adresse.",
            "Auf Schicht 2 werden daraus Ethernet-Multicast-Adressen der Form `33-33-XX-XX-XX-XX`, wobei die letzten 4 Byte von der IPv6-Multicast-Adresse übernommen werden. `FF02::2` wird also zu `33-33-00-00-00-02`, `FF02::1` zu `33-33-00-00-00-01`. Das reduziert die Netzlast, weil nicht mehr jedes Gerät jede Anfrage verarbeiten muss."
          ],
          remember: "NDP nutzt Multicast statt Broadcast: FF02::1 alle Nodes, FF02::2 alle Router, Solicited-Node FF02::1:FF + letzte 24 Bit. Layer 2: 33-33 + letzte 4 Byte (z.B. 33-33-00-00-00-02)."
        },
        {
          type: "checkpoint",
          id: "cp-ndp",
          title: "Checkpoint: Neighbor Discovery",
          questions: [
            {
              id: "resolution-order",
              type: "order",
              prompt: "Host A wants to send a packet to neighbor B but does not know B's MAC address. Order the steps.",
              items: [
                "A sends a Neighbor Solicitation to B's solicited-node multicast address",
                "B replies with a Neighbor Advertisement containing its link-layer address",
                "A stores B's link-layer address in its Neighbor Cache",
                "A sends the packet directly to B's MAC address"
              ],
              explanation: "Neighbor Solicitation (135) and Neighbor Advertisement (136) replace ARP request and reply."
            },
            {
              id: "ra-type",
              type: "type",
              prompt: "Which ICMPv6 type number does a Router Advertisement have?",
              accept: ["134"],
              explanation: "133 Router Solicitation, 134 Router Advertisement, 135 NS, 136 NA, 137 Redirect."
            },
            {
              id: "replaced",
              type: "multi",
              prompt: "Which IPv4 mechanisms does the Neighbor Discovery Protocol replace?",
              options: ["ARP", "ICMP Router Discovery", "ICMP Redirect", "DNS", "DHCP Default Route", "NAT"],
              correct: [0, 1, 2, 4],
              explanation: "DNS and NAT are not replaced by NDP."
            },
            {
              id: "l2-mcast",
              type: "type",
              prompt: "To which Ethernet destination MAC address is a packet for FF02::1 sent? (format xx-xx-xx-xx-xx-xx)",
              placeholder: "xx-xx-xx-xx-xx-xx",
              accept: ["33-33-00-00-00-01", "33:33:00:00:00:01", "3333.0000.0001"],
              explanation: "33-33 followed by the last 4 bytes of the IPv6 multicast address."
            },
            {
              id: "solicited-node",
              type: "type",
              prompt: "What is the solicited-node multicast address for fe80::a00:9ff:fea1:7226? (shortest notation)",
              accept: ["ff02::1:ffa1:7226"],
              explanation: "FF02::1:FF plus the last 24 bits of the address (a1:7226) gives ff02::1:ffa1:7226."
            }
          ]
        }
      ]
    },

    /* ================================================================
     * Woche 2: IPv6 Part 2
     * ================================================================ */
    {
      id: "w2",
      number: 2,
      title: "IPv6 Part 2: ICMPv6, Autokonfiguration, Übergang",
      status: "ready",
      items: [
        {
          type: "slide",
          title: "ICMPv6: ohne geht nichts",
          body: [
            "**ICMPv6** ist ein fester und **verpflichtender** Bestandteil von IPv6, ohne ICMPv6 läuft IPv6 schlicht nicht. Stell es dir wie Briefkasten und Klingel eines Hauses vor: Ohne sie kommt vielleicht noch Post an, aber niemand kann Bescheid geben, wenn etwas schiefgeht, und die Nachbarn finden dich nicht.",
            "Die klassischen Aufgaben kennst du von IPv4: Ein Router auf dem Weg oder das Ziel meldet dem Sender ein Problem, und Nodes schicken Informationsnachrichten wie Ping. Neu übernimmt ICMPv6 zusätzlich die Autokonfiguration von Interfaces, das Ermitteln des Netzpräfixes, das Erkennen doppelter Adressen, das Erkennen von Nachbarn, die Auflösung von MAC-Adressen (wie ARP), die Verwaltung von Multicast-Gruppen (wie IGMP bei IPv4) und das Finden von Routern im Layer-2-Segment.",
            "Erkennbar ist ICMPv6 am **Next Header = 58**. Jede Nachricht beginnt mit **Type** (1 Byte, Art der Nachricht), **Code** (1 Byte, Detail zum Typ) und **Checksum** (2 Byte, gerechnet über die Nachricht und den IPv6-Pseudo-Header), danach folgt der Nachrichtenkörper."
          ],
          remember: "ICMPv6 ist Pflicht für IPv6. Next Header 58. Aufbau: Type 1 Byte, Code 1 Byte, Checksum 2 Byte, dann Body."
        },
        {
          type: "slide",
          title: "Fehler- und Informationsmeldungen",
          body: [
            "Die Typnummer verrät sofort die Kategorie: **Typen bis 127 sind Fehlermeldungen**, **ab 128 Informationsmeldungen**. Wie bei einer Hotline, bei der Beschwerden und Auskünfte an verschiedenen Schaltern landen.",
            "Die vier Fehlertypen sind **1 Destination Unreachable**, **2 Packet Too Big**, **3 Time Exceeded** und **4 Parameter Problem**. Bei Destination Unreachable präzisiert der Code, was los ist: **0** = keine Route zum Ziel, **1** = Kommunikation administrativ verboten (z.B. Paketfilter), **2** = ausserhalb des Scopes der Quelladresse (z.B. Link-Local-Quelle an ein globales Ziel), **3** = Adresse unerreichbar (MAC lässt sich nicht auflösen), **4** = Port unerreichbar (kein Prozess auf dem Port), **5** = Ingress/Egress-Policy verletzt, **6** = Route zum Ziel abgelehnt.",
            "**Packet Too Big** trägt die **MTU** des nächsten Hops, darauf baut Path MTU Discovery auf. **Time Exceeded** hat Code **0** für «Hop Limit überschritten» (z.B. Routing-Schleife, genau das nutzt traceroute absichtlich aus) und Code **1** für «Fragment Reassembly Time Exceeded», wenn nicht alle Fragmente rechtzeitig ankommen (typisch 60 Sekunden). **Parameter Problem** enthält einen **Pointer** auf die fehlerhafte Stelle im Originalpaket. Jede Fehlermeldung transportiert im Datenteil so viel vom auslösenden Paket, wie hineinpasst."
          ],
          remember: "Fehler: Typ ≤ 127 (1 Unreachable, 2 Packet Too Big, 3 Time Exceeded, 4 Parameter Problem). Info: ab 128. Time Exceeded Code 0 = Hop Limit (traceroute)."
        },
        {
          type: "slide",
          title: "Ping unter der Lupe",
          body: [
            "Ping nutzt **Echo Request (128)** und **Echo Reply (129)**. Neben Type, Code und Checksum haben beide zwei Felder: **Identifier** und **Sequence Number**. Damit ordnet der Sender Antworten seinen Anfragen zu, wie die Nummern auf Garderobenmarken.",
            "Die Antwort muss **dieselben Werte** in Identifier und Sequence Number tragen und **exakt denselben Datenteil** zurückschicken wie die Anfrage. So weiss der Sender, welche Anfrage beantwortet wurde.",
            "Die Typen **133 bis 137** kennst du schon aus Woche 1, das ist Neighbor Discovery. Dazu kommen **144 bis 147** für Mobile IPv6: Home Agent Address Discovery Request und Reply sowie Mobile Prefix Solicitation und Advertisement."
          ],
          remember: "Echo Request 128, Echo Reply 129. Die Antwort übernimmt Identifier, Sequence Number und Daten unverändert."
        },
        {
          type: "checkpoint",
          id: "cp-icmpv6",
          title: "Checkpoint: ICMPv6",
          questions: [
            {
              id: "error-types",
              type: "multi",
              prompt: "Which ICMPv6 message types are error messages?",
              options: ["Type 1", "Type 2", "Type 3", "Type 128", "Type 135", "Type 4"],
              correct: [0, 1, 2, 5],
              explanation: "Error messages have types up to 127 (1 to 4). 128 is Echo Request, 135 is Neighbor Solicitation."
            },
            {
              id: "traceroute",
              type: "type",
              prompt: "A traceroute probe expires at a router. Which ICMPv6 type and code does the router return? Answer as type/code, e.g. 1/4.",
              placeholder: "type/code",
              accept: ["3/0", "3 / 0", "3,0", "type 3 code 0"],
              explanation: "Time Exceeded (3), code 0: hop limit exceeded in transit."
            },
            {
              id: "port-unreachable",
              type: "type",
              prompt: "A host sends a UDP datagram to a port on which no process is listening. Which Destination Unreachable code will it get back?",
              accept: ["4"],
              explanation: "Code 4 = port unreachable. Code 3 would mean the address (MAC) could not be resolved."
            },
            {
              id: "echo-reply",
              type: "multi",
              prompt: "Which statements about an ICMPv6 Echo Reply are correct?",
              options: [
                "It has type 129",
                "It carries the same Identifier and Sequence Number as the request",
                "It may shorten the data field to save bandwidth",
                "It contains exactly the same data as the request",
                "It is sent to FF02::1 so that all nodes learn the result"
              ],
              correct: [0, 1, 3],
              explanation: "The reply echoes Identifier, Sequence Number and data unchanged, back to the sender."
            },
            {
              id: "packet-too-big",
              type: "single",
              prompt: "What makes the Packet Too Big message different from the other ICMPv6 error messages?",
              options: [
                "It carries the MTU of the next hop in place of the unused field",
                "It carries a pointer to the faulty header field",
                "It has no checksum",
                "It contains an Identifier and a Sequence Number"
              ],
              correct: 0,
              explanation: "The MTU field lets the sender adapt its Path MTU. The pointer belongs to Parameter Problem."
            }
          ]
        },
        {
          type: "slide",
          title: "SLAAC: die Adresse aus dem Baukasten",
          body: [
            "Mit **Stateless Address Autoconfiguration (SLAAC)** baut sich ein Gerät seine IPv6-Adresse selbst zusammen, ganz ohne DHCPv6-Server. Die oberen 64 Bit (Präfix) liefert der Router, die unteren 64 Bit (Node-ID bzw. Interface-ID) erzeugt das Gerät selbst. Klassisch geschieht das im **EUI-64-Format** aus der MAC-Adresse.",
            "Das Rezept hat zwei Schritte. Die 48-Bit-MAC wird in der Mitte geteilt, und zwischen dem **3. und 4. Byte** wird `FF-FE` eingefügt, damit es 64 Bit werden. Dann wird das **7. Bit** des ersten Bytes **invertiert**, es zeigt an, ob die Adresse global (1) oder lokal (0) eindeutig ist. Beispiel aus der Vorlesung: MAC `08-00-09-A1-72-26`. Nach dem Einfügen: `08-00-09-FF-FE-A1-72-26`. Das erste Byte `08` ist binär `0000 1000`, das 7. Bit von links umgedreht ergibt `0000 1010` = `0A`. Ergebnis: `0A00:09FF:FEA1:7226`.",
            "Ein Trick zum Kopfrechnen: Das 7. Bit hat den Wert 2. Ist es 0, addierst du 2 zum ersten Byte (08 → 0A, 00 → 02), ist es 1, ziehst du 2 ab (0A → 08, 02 → 00)."
          ],
          remember: "EUI-64: MAC in der Mitte teilen, FF-FE einfügen, 7. Bit im ersten Byte invertieren (±2). 08-00-09-A1-72-26 → 0A00:09FF:FEA1:7226."
        },
        {
          type: "slide",
          title: "SLAAC Schritt für Schritt und die Privatsphäre",
          body: [
            "Zuerst nimmt der Node das Link-Local-Präfix `FE80::` und hängt seine Interface-ID an: `FE80::0A00:09FF:FEA1:7226`. Mit dieser Adresse kann er bereits im lokalen Netz eine **Router Solicitation** schicken. Der Router antwortet mit einem **Router Advertisement**, das ein Netzpräfix enthält, zum Beispiel `2001:8:17::/64`. Der Node kombiniert beides zu `2001:8:17::0A00:09FF:FEA1:7226`. Zum Schluss prüft er per **Duplicate Address Detection**, dass die Adresse wirklich eindeutig ist.",
            "Vorteile: sehr effizient, dank eindeutiger MAC weltweit eindeutig, und ein Node erzeugt immer dieselbe Adresse. Genau das ist aber auch der Haken: Weil die Interface-ID immer gleich bleibt, egal in welchem Netz du bist, kann man dein Gerät **identifizieren und verfolgen**. Das ist wie ein Auto, das in jeder Stadt dasselbe Nummernschild trägt: Man erkennt dich überall wieder.",
            "Die Lösung sind die **Privacy Extensions** (RFC 3041 und RFC 4941): mehrere Adressen pro Interface, die EUI-64-Adresse nur für **eingehende** Verbindungen (Serverfunktion), **zufällige** Adressen für **ausgehende** Verbindungen und eine **begrenzte Lebensdauer** dieser Adressen, typischerweise einige Stunden."
          ],
          remember: "SLAAC: Link-Local bilden → RS → RA mit Präfix → Präfix + Interface-ID → DAD. Privacy Extensions (RFC 3041/4941): zufällige, kurzlebige Adressen für ausgehende Verbindungen."
        },
        {
          type: "checkpoint",
          id: "cp-slaac",
          title: "Checkpoint: SLAAC",
          questions: [
            {
              id: "eui64",
              type: "type",
              prompt: "Derive the EUI-64 interface ID for the MAC address 00-1A-2B-3C-4D-5E. Use the notation xxxx:xxxx:xxxx:xxxx.",
              placeholder: "xxxx:xxxx:xxxx:xxxx",
              accept: ["021a:2bff:fe3c:4d5e", "21a:2bff:fe3c:4d5e"],
              explanation: "Insert FF-FE in the middle (00-1A-2B-FF-FE-3C-4D-5E) and invert the 7th bit of 00 → 02."
            },
            {
              id: "first-byte",
              type: "type",
              prompt: "A MAC address starts with the byte 0A. What is the first byte of the resulting EUI-64 interface ID? (two hex digits)",
              accept: ["08", "0x08"],
              explanation: "0A = 0000 1010. Inverting the 7th bit gives 0000 1000 = 08."
            },
            {
              id: "slaac-order",
              type: "order",
              prompt: "Order the steps of Stateless Address Autoconfiguration.",
              items: [
                "Build a link-local address from FE80:: and the interface ID",
                "Send a Router Solicitation",
                "Receive a Router Advertisement with the network prefix",
                "Combine the prefix with the interface ID",
                "Run Duplicate Address Detection"
              ],
              explanation: "The link-local address is needed first so that the node can talk to the router at all."
            },
            {
              id: "privacy",
              type: "multi",
              prompt: "Which measures belong to the IPv6 privacy extensions?",
              options: [
                "Random addresses for outgoing connections",
                "Limiting the lifetime of these addresses, typically to a few hours",
                "Using the EUI-64 address for incoming connections only",
                "Encrypting the MAC address with IPsec ESP",
                "Disabling link-local addresses"
              ],
              correct: [0, 1, 2],
              explanation: "The fixed EUI-64 ID makes hosts trackable, so outgoing traffic uses random, short-lived addresses."
            }
          ]
        },
        {
          type: "slide",
          title: "Router-Flags M und O: selbst machen oder fragen?",
          body: [
            "Woher weiss ein Host, ob er SLAAC nutzen oder einen DHCPv6-Server fragen soll? Das sagt ihm der Router. Der Host schickt eine Router Solicitation an `ff02::2` (alle Router), und im Router Advertisement stecken zwei Flags: das **M-Bit** (Managed Address Configuration) und das **O-Bit** (Other Stateful Configuration). Das ist wie ein Schild am Hoteleingang: «Zimmer selbst aussuchen», «Zimmer selbst aussuchen, Frühstücksinfo an der Rezeption» oder «Bitte alles an der Rezeption».",
            "**M=0, O=0**: nur SLAAC, das Router Advertisement liefert Präfix und MTU. **M=0, O=1**: Adresse per SLAAC, zusätzliche Parameter (z.B. DNS-Server) per DHCPv6, das nennt man **stateless DHCPv6**. **M=1, O=1**: Adresse und alle weiteren Parameter per DHCPv6, das ist **stateful DHCPv6**. **M=1, O=0** ist eine unbenutzte Kombination."
          ],
          remember: "M/O = 0/0 SLAAC only, 0/1 stateless DHCPv6 (Adresse per SLAAC, Rest per DHCPv6), 1/1 stateful DHCPv6, 1/0 unbenutzt."
        },
        {
          type: "slide",
          title: "DHCPv6: wozu noch ein Server?",
          body: [
            "Ursprünglich wollte man bei IPv6 DHCP ganz loswerden und alles mit ICMPv6 erledigen. Das Problem: ICMPv6 kann keine Adressen von **DNS-Servern**, **SIP-Proxies** und Ähnlichem liefern. Darum wurde **DHCPv6** nachträglich spezifiziert. Die Konfiguration per DHCPv6 nennt man **Stateful Address Autoconfiguration**, weil der Server den Zustand speichert, also weiss, wer welche Adresse hat.",
            "Es gibt drei Betriebsarten: **Stateful** (der Server liefert die komplette Konfiguration: Adresse, Default Router usw.), **Stateless** (Adresse per SLAAC, Zusatzinfos per DHCPv6) und **DHCPv6-PD** (Prefix Delegation). Bei PD holt sich zum Beispiel dein Heimrouter beim ISP ein ganzes Präfix ab, wie ein Hauswart, der von der Gemeinde einen ganzen Strassenabschnitt zum Nummerieren bekommt. Wichtig: SLAAC und **stateful** DHCPv6 lassen sich im selben Netz **nicht mischen**.",
            "DHCPv4 und DHCPv6 sind **nicht kompatibel**: Wer beides braucht, betreibt zwei unabhängige Server. DHCPv6 kann mehrere Adressen pro Interface verwalten, und **Relay Agents** in Routern leiten DHCPv6-Nachrichten weiter, sodass ein Server in einem anderen Netz mehrere Netze bedienen kann. Gründe für DHCPv6 sind bessere **Kontrolle und Nachverfolgung** der Adressvergabe und ein zentraler Mechanismus für **Dynamic-DNS**-Updates. Manche Geräte (einige Embedded Systems oder Netzwerk-Peripherie) können DHCPv6 allerdings gar nicht."
          ],
          remember: "DHCPv6 nötig für DNS-Server, SIP-Proxies usw. Modi: stateful, stateless, PD. Nicht kompatibel mit DHCPv4. Relay Agents bedienen mehrere Netze."
        },
        {
          type: "checkpoint",
          id: "cp-dhcpv6",
          title: "Checkpoint: M/O Flags & DHCPv6",
          questions: [
            {
              id: "mo-01",
              type: "multi",
              prompt: "A Router Advertisement has M=0 and O=1. Which statements are correct?",
              options: [
                "The host builds its address with SLAAC",
                "The host asks a DHCPv6 server for additional parameters such as DNS servers",
                "This mode is called stateful DHCPv6",
                "The DHCPv6 server keeps track of which address the host uses",
                "This mode is called stateless DHCPv6"
              ],
              correct: [0, 1, 4],
              explanation: "0/1 = stateless DHCPv6: address via SLAAC, only other parameters via DHCPv6, so the server stores no address state."
            },
            {
              id: "mo-stateful",
              type: "type",
              prompt: "Which M/O combination means that the address and all other parameters come from DHCPv6? Answer as M,O (e.g. 1,0).",
              placeholder: "M,O",
              accept: ["1,1", "1, 1", "11", "1/1", "m=1,o=1", "m=1, o=1"],
              explanation: "M=1, O=1 is stateful DHCPv6. M=1, O=0 is unused."
            },
            {
              id: "why-dhcpv6",
              type: "multi",
              prompt: "Why was DHCPv6 specified even though ICMPv6 already supports autoconfiguration?",
              options: [
                "ICMPv6 cannot provide DNS server addresses",
                "ICMPv6 cannot provide SIP proxy addresses",
                "It allows better control and tracking of address usage",
                "DHCPv4 servers can answer DHCPv6 requests",
                "It offers a central mechanism for Dynamic DNS updates"
              ],
              correct: [0, 1, 2, 4],
              explanation: "DHCPv4 and DHCPv6 are not compatible, two separate servers are needed."
            },
            {
              id: "pd",
              type: "type",
              prompt: "Which DHCPv6 mode lets a home router obtain a network prefix from the ISP? (abbreviation)",
              accept: ["PD", "DHCPv6-PD", "DHCPv6 PD", "Prefix Delegation"],
              explanation: "DHCPv6-PD = Prefix Delegation."
            }
          ]
        },
        {
          type: "slide",
          title: "DNS für IPv6",
          body: [
            "DNS erfüllt bei IPv6 denselben Zweck wie bei IPv4 und nutzt dieselbe Infrastruktur. Neu ist der Record-Typ: Statt **A** (IPv4) gibt es den **AAAA-Record** («Quad-A»). Merkhilfe: Eine IPv6-Adresse ist viermal so lang wie eine IPv4-Adresse, also vier A. Beispiel: `lab-computer.zhaw.ch IN AAAA 2001:620:190:fff1::1`.",
            "Für die **Rückwärtssuche** (Adresse → Name) gibt es die Domain **ip6.arpa** (bei IPv4 in-addr.arpa, beide mit PTR-Records). Die Adresse wird dafür vollständig ausgeschrieben, in einzelne Hex-Ziffern (**Nibbles**) zerlegt und **rückwärts** notiert, mit Punkten dazwischen. Aus `2001:620:190:fff1::1` wird `1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.1.f.f.f.0.9.1.0.0.2.6.0.1.0.0.2.ip6.arpa`. Das ist wie eine Postadresse, die man von «Schweiz» über «Zürich» bis zur Hausnummer liest: DNS sucht immer vom Allgemeinen (rechts) zum Speziellen (links).",
            "Ein **Dual-Stack**-Host schickt zwei Anfragen: eine nach dem A-Record und eine nach dem AAAA-Record. Die Kommunikation mit dem DNS-Server kann dabei über IPv4 oder IPv6 laufen. Kommen beide Adressen zurück, entscheidet die **Anwendung**, welche sie nimmt, empfohlen ist **IPv6**. Ein Name kann mehrere A- und AAAA-Records haben, und die Root-Server sind auch über IPv6 erreichbar."
          ],
          remember: "AAAA = IPv6-Adresse im DNS. Reverse Lookup in ip6.arpa, Nibbles rückwärts. Dual Stack fragt A und AAAA, die Anwendung wählt (IPv6 empfohlen)."
        },
        {
          type: "slide",
          title: "Koexistenz: zwei Sprachen gleichzeitig",
          body: [
            "IPv4 wird nicht von heute auf morgen abgeschaltet, deshalb laufen beide Welten parallel, meist im **Dual Stack**: Ein Host, Server oder Router spricht beide Protokolle, wie ein zweisprachiger Kellner. Beispiel Swisscom Internet-Box: Beide Stacks laufen parallel, ausser der Kunde deaktiviert IPv6 in der Oberfläche (standardmässig aktiviert).",
            "Dabei entscheidet der **Client**, was er anfragt. Fragt er nach IPv6 und IPv6 ist auf dem Gateway aktiv, bekommt er IPv6 (z.B. Windows 10 oder macOS). Ist IPv6 auf dem Gateway deaktiviert, bekommt er eine Absage und muss erneut nach IPv4 fragen. Kann der Client gar kein IPv6 (wahrscheinlich die Swisscom-TV-Box), fragt er direkt nach IPv4.",
            "Das Problem gibt es in beide Richtungen: Ein alter Drucker kann oft kein IPv6, ein IoT-Gerät dagegen vielleicht **nur** IPv6. Solange es IPv4 im Internet gibt, braucht es deshalb Router mit beiden Stacks, und IPv6-only-Clients brauchen IPv6-fähige Server. Ein Android-Smartphone im WLAN kann so bis zu **vier Adressen** haben: eine IPv4-Adresse vom Router, eine autokonfigurierte IPv6-Adresse, eine SLAAC-Adresse und eine IPv6-Adresse vom Router."
          ],
          remember: "Dual Stack = IPv4 und IPv6 parallel. Der Client entscheidet, was er anfragt. IoT-Geräte können IPv6-only sein, alte Peripherie IPv4-only."
        },
        {
          type: "slide",
          title: "Übergangsmechanismen: Mapping, Tunnel, 464XLAT",
          body: [
            "Moderne Betriebssysteme bieten **hybride Dual-Stack-Sockets**, die IPv4- und IPv6-Pakete annehmen. Solche Sockets arbeiten immer mit IPv6-Adressen. Eine IPv4-Gegenstelle wird deshalb als **IPv4-mapped IPv6 Address** dargestellt: Präfix `::FFFF:0:0/96`, und in die letzten 32 Bit kommt die IPv4-Adresse. Aus `138.12.16.10` (hex `8A0C:100A`) wird `::FFFF:8A0C:100A`, in Mischschreibweise `::FFFF:138.12.16.10`. Das ist wie eine ausländische Telefonnummer, die man mit Ländervorwahl ins eigene Format einpasst.",
            "Beim **Tunneling** wird ein komplettes IPv6-Paket in ein IPv4-Paket gepackt, wie ein Brief in einem zweiten Umschlag. Der IPv4-Header (20 Byte ohne Optionen) trägt dann im Feld **Protocol den Wert 41**, dahinter folgen IPv6-Header (40 Byte) und IPv6-Nutzlast. In den Anfängen von IPv6 war das wichtig, heute hat Tunneling fast keine Bedeutung mehr, weil Provider Dual Stack anbieten und Windows, macOS und Linux IPv6 nativ unterstützen.",
            "Mobilfunknetze gehen den umgekehrten Weg. Swisscom plant ein reines **IPv6-only-APN** für neue Geräte mit **464XLAT** (RFC 6877): Eine IPv4-only-App wird auf dem Handy von IPv4 nach IPv6 übersetzt (**NAT 4→6**), durchquert das Mobilnetz als IPv6 und wird beim **CG-NAT** des Providers wieder nach IPv4 übersetzt (**NAT 6→4**). IPv6-Apps sprechen durchgehend IPv6."
          ],
          remember: "IPv4-mapped: ::FFFF:0:0/96 (z.B. ::FFFF:138.12.16.10). IPv6-in-IPv4-Tunnel: Protocol 41. 464XLAT (RFC 6877): NAT 4→6 im Handy, NAT 6→4 im CG-NAT."
        },
        {
          type: "checkpoint",
          id: "cp-coexistence",
          title: "Checkpoint: DNS & Coexistence",
          questions: [
            {
              id: "aaaa",
              type: "type",
              prompt: "Which DNS record type maps a host name to an IPv6 address?",
              accept: ["AAAA", "AAAA record", "quad-a", "quad a"],
              explanation: "AAAA (quad-A) for IPv6, A for IPv4. Reverse lookups use PTR records in ip6.arpa."
            },
            {
              id: "mapped",
              type: "type",
              prompt: "Write the IPv4-mapped IPv6 address of 10.0.0.1 in hexadecimal shorthand (format ::ffff:xxxx:xxxx).",
              placeholder: "::ffff:xxxx:xxxx",
              accept: ["::ffff:a00:1", "::ffff:0a00:0001", "::ffff:0a00:1", "::ffff:a00:0001"],
              explanation: "10.0.0.1 = 0A 00 00 01 in hex, so ::ffff:0a00:0001, shortened ::ffff:a00:1."
            },
            {
              id: "dual-stack-dns",
              type: "multi",
              prompt: "A dual-stack host resolves a name. Which statements are correct?",
              options: [
                "It sends one query for the A record and one for the AAAA record",
                "The DNS queries must be transported over IPv6",
                "If both addresses are returned, the application decides which one to use",
                "It is recommended to use the IPv6 address if available",
                "The DNS server translates the IPv4 address into an IPv6 address"
              ],
              correct: [0, 2, 3],
              explanation: "The resolver may talk to the DNS server over IPv4 or IPv6. DNS does not translate addresses."
            },
            {
              id: "xlat-order",
              type: "order",
              prompt: "Order the path of a packet from an IPv4-only app with 464XLAT in an IPv6-only mobile network.",
              items: [
                "IPv4-only app on the handset",
                "NAT 4→6 on the handset",
                "IPv6-only mobile network",
                "NAT 6→4 at the provider's CG-NAT",
                "IPv4 service on the Internet"
              ],
              explanation: "The IPv4 packet is translated twice so that the mobile network itself only carries IPv6."
            },
            {
              id: "tunnel-41",
              type: "type",
              prompt: "An IPv6 packet is tunneled inside an IPv4 packet. Which value does the IPv4 Protocol field contain?",
              accept: ["41"],
              explanation: "41 = IPv6 encapsulation. The IPv4 header (20 bytes) is followed by the complete IPv6 header (40 bytes)."
            }
          ]
        },
        {
          type: "slide",
          title: "Pseudo-Header und IPsec",
          body: [
            "Eigentlich sollten die oberen Schichten nichts von der Vermittlungsschicht wissen. In der Praxis rechnen **ICMPv6**, **UDP** und **TCP** ihre Checksumme aber über einen **Pseudo-Header** mit, einen Auszug aus dem IP-Header. So wird erkannt, wenn ein Paket falsch zugestellt wurde oder IP-Headerfelder verfälscht sind, von denen die obere Schicht abhängt. Wie eine Paketquittung, auf der auch die Empfängeradresse steht: Stimmt sie nicht, fällt es auf.",
            "Der IPv6-Pseudo-Header enthält **Source Address, Destination Address, Payload Length und Next Header**. Bei IPv6 ist die **UDP-Checksumme Pflicht**, anders als bei IPv4, wo sie optional ist. Und weil der Pseudo-Header vom IP-Protokoll abhängt, unterscheidet sich die Berechnung zwischen IPv4 und IPv6.",
            "**IPsec** wurde ursprünglich für IPv6 entwickelt, zuerst breit eingesetzt aber bei IPv4. Anfangs war IPsec Pflichtbestandteil von IPv6 und wurde später zur **Option** herabgestuft (die IPv4/IPv6-Vergleichstabelle in den Folien nennt noch den ursprünglichen Stand «required»). IPsec besteht aus zwei Protokollen: **AH** (Extension Header 51) sichert Integrität und Herkunft inklusive Schutz vor **Replay-Angriffen**, verschlüsselt aber **nicht**. **ESP** (Extension Header 50) bietet Authentizität, Integrität **und Vertraulichkeit**. AH ist wie ein Siegel auf einer Postkarte, ESP wie ein versiegelter, blickdichter Umschlag."
          ],
          remember: "Pseudo-Header: Src, Dst, Payload Length, Next Header. UDP-Checksumme bei IPv6 Pflicht. AH (51) = Integrität + Herkunft + Replay-Schutz, ESP (50) = zusätzlich Vertraulichkeit."
        },
        {
          type: "slide",
          title: "Neue Angriffsflächen",
          body: [
            "IPv6 ist **nicht automatisch sicherer** als IPv4. Ein neues Protokoll ermöglicht neue Angriffe: Es gibt weniger Erfahrung damit, und viele Betriebssysteme haben IPv6 **standardmässig aktiviert**, oft ohne dass der Nutzer davon weiss. Automatisches Tunneling kann einen Host in ein IPv6-Netz bringen, ohne dass er es merkt, und Tunnel können **Firewalls umgehen**. Das ist wie eine Hintertür im Haus, von der der Besitzer nichts weiss.",
            "Firewall-Regeln für IPv4 lassen sich **nicht einfach** auf IPv6 übertragen. Autokonfiguration kann missbraucht werden, weil Hosts ohne Zutun eines Admins online gehen. Und der riesige Adressraum hat zwei Seiten: Angreifer können sich leichter darin verstecken, gleichzeitig ist klassisches Scannen mit **NMAP** praktisch unmöglich, weil schon ein einziges Subnetz abzusuchen **Jahre** dauern würde."
          ],
          remember: "IPv6 ist nicht inhärent sicherer: oft unbemerkt aktiv, Tunnel umgehen Firewalls, IPv4-Regeln nicht 1:1 übertragbar. Ein Subnetz mit NMAP zu scannen dauert Jahre."
        },
        {
          type: "slide",
          title: "Werkzeuge und der grosse Vergleich",
          body: [
            "Unter Linux zeigt `cat /proc/net/if_inet6`, ob das System IPv6 unterstützt. Mit `ping6 ::1` pingst du dich selbst über Loopback, mit `ping6 -I eth0 ff02::1` alle Nodes am Link und findest so deine Nachbarn. `ip -6 addr`, `ip -6 route` und `ip -6 neigh` zeigen und ändern Adressen, Routen und Nachbarn, `traceroute6` und `tracepath6` zeigen den Weg. `ifconfig` ist veraltet. Unter macOS listet `ndp -an` die Nachbarn mit Layer-2-Adresse und Ablaufzeit.",
            "Unter Windows funktionieren `ipconfig`, `route`, `ping`, `tracert`, `pathping`, `netstat` und `netsh` für beide Protokolle. Liefert DNS beide Adressen, erzwingt der Schalter `-6` IPv6 und `-4` IPv4, zum Beispiel `ping -6`. Die Nachbarn zeigt `netsh interface ipv6 show neighbors`.",
            "Zum Abschluss der Vergleich: IPv4 hat 32-Bit-Adressen, IPv6 128 Bit. IPv4 fragmentiert in Routern und beim Sender, IPv6 nur beim Sender. IPv4 hat Header-Checksumme und Optionen, IPv6 nicht (dafür Extension Headers). IPv4 kennt Broadcast, IPv6 nutzt die All-Nodes-Multicast-Adresse. DNS: A-Records und in-addr.arpa gegenüber AAAA-Records und ip6.arpa. IPv4 muss Pakete von **576 Byte** (evtl. fragmentiert) unterstützen, IPv6 **1280 Byte** ohne Fragmentierung, und IPv6 braucht weder manuelle Konfiguration noch DHCP."
          ],
          remember: "Linux: ip -6 addr/route/neigh, ping6, traceroute6. Windows: ping -6, tracert -6, netsh interface ipv6. Mindestgrösse: IPv4 576 Byte, IPv6 1280 Byte."
        },
        {
          type: "checkpoint",
          id: "cp-security",
          title: "Checkpoint: Security, Tools & Comparison",
          questions: [
            {
              id: "pseudo-header",
              type: "multi",
              prompt: "Which fields are part of the IPv6 pseudo-header used for upper-layer checksums?",
              options: ["Source Address", "Destination Address", "Payload Length", "Next Header", "Hop Limit", "Flow Label"],
              correct: [0, 1, 2, 3],
              explanation: "Hop Limit and Flow Label may change or are irrelevant for delivery, so they are not included."
            },
            {
              id: "ipsec",
              type: "multi",
              prompt: "Which statements about IPsec in IPv6 are correct?",
              options: [
                "ESP provides confidentiality",
                "AH encrypts the payload",
                "AH protects against replay attacks",
                "IPsec was later downgraded from a mandatory part to an option",
                "ESP uses the Next Header value 51"
              ],
              correct: [0, 2, 3],
              explanation: "AH (51) authenticates but does not encrypt. ESP is 50."
            },
            {
              id: "ping-all-nodes",
              type: "type",
              prompt: "Which Linux command pings all nodes on the link of interface eth0 via IPv6?",
              placeholder: "command",
              accept: ["ping6 -I eth0 ff02::1", "ping -6 -I eth0 ff02::1", "ping6 ff02::1 -I eth0", "ping6 -I eth0 ff02::1%eth0"],
              explanation: "ff02::1 is the all-nodes multicast address. -I selects the interface."
            },
            {
              id: "threats",
              type: "multi",
              prompt: "Why is IPv6 not automatically more secure than IPv4?",
              options: [
                "IPv6 is often enabled by default without the user being aware of it",
                "Tunneling mechanisms can bypass firewalls",
                "IPv4 firewall rules cannot simply be translated to IPv6",
                "IPv6 offers no way to encrypt packets",
                "Scanning a subnet with NMAP only takes minutes"
              ],
              correct: [0, 1, 2],
              explanation: "IPsec exists for IPv6, and sweeping a single IPv6 subnet would take years."
            },
            {
              id: "min-ipv4",
              type: "type",
              prompt: "What packet size in bytes must IPv4 support at minimum (possibly fragmented)?",
              accept: ["576", "576 bytes", "576 byte"],
              explanation: "IPv4: 576 bytes (possibly fragmented). IPv6: 1280 bytes without fragmentation."
            }
          ]
        }
      ]
    },

    /* ================================================================
     * Woche 3: VoIP und Signaling
     * ================================================================ */
    {
      id: "w3",
      number: 3,
      title: "VoIP und Signaling: SIP und SDP",
      status: "ready",
      items: [
        {
          type: "slide",
          title: "Vom Kupferdraht zum Datenpaket",
          body: [
            "Die klassische Telefonie ist **leitungsvermittelt** (circuit switched) und basiert auf **Zeitmultiplex** (TDM). Übrigens ist sie längst digital, analog ist höchstens noch die letzte Meile zu dir nach Hause. Wenn du anrufst, wird für die ganze Dauer des Gesprächs ein Kanal **exklusiv** für dich reserviert. Stell dir eine private Bahnstrecke vor, auf der nur dein Zug fährt: Die Bitrate ist **konstant**, der Kanal **garantiert**, die Verzögerung **konstant und minimal**.",
            "**Voice over IP** (VoIP) ist dagegen **paketvermittelt** und läuft über private IP-Netze oder das Internet. IP-Netze arbeiten nach dem **Best-Effort**-Prinzip, können Pakete verlieren und haben **unvorhersehbare, schwankende Verzögerungen**. Das ist wie Autofahren auf der Autobahn: Meistens kommst du gut durch, aber einen Stau kann dir niemand ausschliessen.",
            "Der entscheidende Unterschied: In einem **privaten** IP-Netz kannst du die Quality of Service steuern, weil du es selbst konfigurieren und dimensionieren kannst (es bleibt trotzdem best effort). Auf das **Internet** hast du keinen Einfluss."
          ],
          remember: "Leitungsvermittelt: TDM, konstante Bitrate, exklusiver garantierter Kanal, konstante minimale Latenz. VoIP: paketvermittelt, best effort, verlustbehaftet, schwankende Verzögerung. QoS nur im privaten Netz steuerbar."
        },
        {
          type: "slide",
          title: "Warum VoIP und was es schwierig macht",
          body: [
            "Der grosse Vorteil: **ein Netz für alle Dienste und Daten**. Funktionen sind «software defined», laufen meist auf Standard-Hardware und lassen sich einfach integrieren, etwa in Callcenter, Helpdesk, Unified Messaging, sprachgesteuerte Dienste oder allgemein Computer Telephony Integration (CTI). Dazu kommen verschiedene Codecs (Bitrate gegen Qualität), reichhaltige Signalisierung, komfortable Endgeräte und neue Geschäftsmodelle wie Telefonie-Service-Provider.",
            "Die Herausforderungen sind aber nicht klein. Das Zusammenspiel mit klassischer Telefonie (POTS, ISDN, GSM/UMTS) und mit Daten im Sprachband (DTMF-Töne, Fax, Modem) muss funktionieren. Die Zielverfügbarkeit für Telefonie liegt bei **«five nines»**, also **99,999 %**, das sind rund **5 Minuten Ausfall pro Jahr**. Klassische Telefone werden über die Teilnehmerleitung mit Strom versorgt, VoIP braucht eine **lokale Stromversorgung**: Fällt der Strom aus, bleibt das Telefon stumm.",
            "Dazu kommen Sicherheit (Betrug, Angriffe, Privatsphäre), Ökologie (Standby-Verluste aller beteiligten Geräte), Abrechnung (VoIP wurde ursprünglich erfunden, um Gebühren zu umgehen) und rechtliche Pflichten wie die **Lokalisierung bei Notrufen** und die **gesetzliche Überwachung** (Legal Interception)."
          ],
          remember: "Ziel-Verfügbarkeit Telefonie: five nines = 99,999 % ≈ 5 Min. Ausfall pro Jahr. VoIP braucht lokale Stromversorgung. Rechtlich: Notruf-Lokalisierung, Legal Interception."
        },
        {
          type: "slide",
          title: "Drei Protokolle, drei Ebenen",
          body: [
            "Für VoIP braucht es grob drei Protokolle: eines, das die **Sitzung aufbaut** (in diesem Kapitel **SIP**), eines, das die **Sitzungseigenschaften beschreibt und aushandelt** (**SDP**), und eines für den eigentlichen **Datenaustausch** (zum Beispiel **RTP**). Vergleich mit einem Restaurantbesuch: SIP ist die Reservation, SDP die Absprache über Menü und Tisch, RTP das Essen selbst.",
            "Funktional unterscheidet man drei **Planes**. Die **Control Plane** signalisiert Verbindungen und Sitzungen: mit **SIP** (IETF), **H.323** (ITU-T) oder proprietären Protokollen wie Ciscos Skinny Call Control Protocol (SCCP) oder dem nicht offengelegten Protokoll von Skype. Die **Data Plane** (User Plane) verarbeitet und überträgt die Medienströme: paketierte Sprache per **RTP**, falls vorhanden ein separater RTP-Strom für Video, mit geringer Latenz und Synchronisation. Die **Service Plane** steuert Anwendungen und Dienste wie Voicemail, Halten, Parken und Übernehmen, Weiterleiten, Umleiten und Konferenzen.",
            "In der Firma trifft man oft beide Welten: Intern telefonieren IP-Telefone und Softphones paketvermittelt, und ein **VoIP-PSTN-Gateway** verbindet das Firmennetz mit dem öffentlichen, leitungsvermittelten Telefonnetz (PSTN). Ist auch die Gegenseite VoIP, zum Beispiel ein Anschluss mit **ATA** (Analog Telephone Adapter), läuft alles paketvermittelt über das Internet und die Firmen-Firewall."
          ],
          remember: "SIP = Sitzung aufbauen, SDP = Sitzung beschreiben, RTP = Medien übertragen. Control Plane (SIP, H.323, SCCP), Data/User Plane (RTP), Service Plane (Voicemail, Transfer, Konferenz)."
        },
        {
          type: "checkpoint",
          id: "cp-telephony",
          title: "Checkpoint: Telephony Basics",
          questions: [
            {
              id: "circuit",
              type: "multi",
              prompt: "Which characteristics apply to conventional circuit-switched telephony?",
              options: [
                "Constant media bitrate",
                "The channel is exclusively reserved for the whole session",
                "Constant and minimal latency",
                "Best-effort delivery with varying delay",
                "Analog transmission end-to-end"
              ],
              correct: [0, 1, 2],
              explanation: "Conventional telephony is digital (TDM) except possibly on the last mile. Best effort describes IP networks."
            },
            {
              id: "five-nines",
              type: "type",
              prompt: "The target availability for telephone service is called «five nines». Write it as a percentage (number only).",
              placeholder: "e.g. 99.5",
              accept: ["99.999", "99,999", "99.999%", "99.999 %", "99,999%", "99,999 %"],
              explanation: "99.999 % availability ≈ 5 minutes of downtime per year."
            },
            {
              id: "service-plane",
              type: "multi",
              prompt: "Which of these belong to the Service Plane of a VoIP system?",
              options: ["Voice mail", "Call transfer", "Conference", "RTP media stream", "SIP session setup", "Call hold"],
              correct: [0, 1, 2, 5],
              explanation: "RTP belongs to the data plane, SIP signaling to the control plane."
            },
            {
              id: "rtp",
              type: "type",
              prompt: "Which protocol transports the packetized voice on the data plane? (abbreviation)",
              accept: ["RTP", "Real-Time Transport Protocol", "Real Time Transport Protocol"],
              explanation: "RTP carries the media. SIP and SDP only set up and describe the session."
            },
            {
              id: "qos-private",
              type: "single",
              prompt: "Why can QoS for VoIP be controlled in a private IP network but not on the Internet?",
              options: [
                "The operator can configure and dimension the private network, but has no influence on the Internet",
                "Private IP networks are circuit switched",
                "The Internet cannot transport UDP",
                "Private IP networks guarantee zero packet loss"
              ],
              correct: 0,
              explanation: "Private IP networks are still best effort, but they can be configured and dimensioned according to the needs."
            }
          ]
        },
        {
          type: "slide",
          title: "Was Signalisierung eigentlich macht",
          body: [
            "**Signalisierung** steuert Kommunikationskanäle: Sie baut einen optimierten Kanal zwischen Sender und Empfänger auf, kontrolliert ihn und baut ihn wieder ab, und zwar mit geringer Verzögerung und wenig Datenaufwand. In der Telefonie wurden damit Steuerinformationen für den Auf- und Abbau eines Anrufs ausgetauscht, zum Beispiel die gewählten Ziffern oder die Rechnungsnummer des Anrufers. Früher erledigte das die Telefonistin von Hand (um 1930), dann mechanische Wähler (um 1950), später digitale Vermittlungssysteme wie EWSD (um 1980).",
            "Signalisierung ist ein wichtiger Teil von **Quality of Service**. Ein Host fordert per **Signalisierungsprotokoll** bei den Routern entlang des Wegs eine **Ressourcenreservierung** an. Mit **QoS Routing** kann die Anfrage über einen Weg laufen, auf dem die Router die Ressourcen eher bieten können, im Gegensatz zum normalen Routing, das die Auslastung ignoriert. Jeder Router macht auf der Control Plane **Admission Control**: Er nimmt die Anfrage an oder lehnt sie ab, wie ein Türsteher, der nur so viele Gäste hineinlässt, wie der Club fassen kann.",
            "SIP hat diese Konzepte aus der leitungsvermittelten Welt geerbt: Die Session Initiation baut gewissermassen eine «Leitung» zwischen Anrufer und Angerufenem auf. Und keine Sorge: «signalling» (britisch) und «signaling» (amerikanisch) meinen dasselbe."
          ],
          remember: "Signalisierung baut Kanäle auf, kontrolliert und schliesst sie. Control Plane eines QoS-Netzes: Signaling Protocol, QoS Routing, Admission Control."
        },
        {
          type: "slide",
          title: "Data Plane und bekannte Signalisierungsprotokolle",
          body: [
            "Haben alle Router auf dem Weg zugestimmt, werden die Ressourcen reserviert, und der Datenfluss läuft auf der **Data Plane** (User Plane). Dort braucht es drei Mechanismen. **Classification** sortiert alle Pakete in Warteschlangen pro Klasse oder pro Flow. **Policing** prüft, ob eine Warteschlange mehr Ressourcen verbraucht als angefordert. **Scheduling** sorgt dafür, dass jede Warteschlange ihre zugesagte Bandbreite bekommt.",
            "Am Flughafen sähe das so aus: Classification teilt die Reisenden in Business- und Economy-Schlange ein, Policing kontrolliert, ob sich jemand mit Economy-Ticket in die Business-Schlange drängelt, und Scheduling legt fest, wie oft welcher Schalter die nächste Person aufruft.",
            "Ein Signalisierungsprotokoll ist die gemeinsame Sprache, um mit Routern über Ressourcen zu verhandeln. Das bekannteste ist **RSVP** (Resource Reservation Protocol) zur Ressourcenreservierung. **COPS** (Common Open Policy Service) ist ein einfaches Query-Response-Protokoll für das Policy-Management in QoS-Architekturen. Die IETF-Arbeitsgruppe **NSIS** (Next Steps in Signaling, RFC 4080) untersucht flexiblere Architekturen. Weitere Beispiele sind SIP, H.323, SS7, DTMF, Q.931 und Skinny."
          ],
          remember: "Data Plane: Classification (einsortieren), Policing (Verbrauch prüfen), Scheduling (Bandbreite zuteilen). RSVP reserviert Ressourcen, COPS dient dem Policy-Management."
        },
        {
          type: "checkpoint",
          id: "cp-signaling",
          title: "Checkpoint: Signaling & QoS",
          questions: [
            {
              id: "qos-order",
              type: "order",
              prompt: "Order the steps of setting up a QoS-enabled data flow.",
              items: [
                "The host sends a resource reservation request via a signaling protocol",
                "The request is routed along a path likely to offer the resources (QoS routing)",
                "Each router on the path performs admission control",
                "The resources are reserved and the data flows on the data plane"
              ],
              explanation: "Only after all routers have accepted the request are the resources reserved and used."
            },
            {
              id: "control-plane",
              type: "multi",
              prompt: "Which mechanisms belong to the control plane of a QoS network?",
              options: ["Signaling protocol", "QoS routing", "Admission control", "Classification", "Policing", "Scheduling"],
              correct: [0, 1, 2],
              explanation: "Classification, policing and scheduling are enforced on the data plane."
            },
            {
              id: "policing",
              type: "type",
              prompt: "Which data-plane mechanism checks whether a queue consumes more than the resources it requested?",
              accept: ["Policing"],
              explanation: "Classification sorts packets into queues, policing checks consumption, scheduling assigns bandwidth."
            },
            {
              id: "rsvp",
              type: "type",
              prompt: "Which is the best-known signaling protocol for reserving resources in the network? (abbreviation)",
              accept: ["RSVP", "Resource Reservation Protocol"],
              explanation: "RSVP = Resource Reservation Protocol. COPS handles policy management."
            }
          ]
        },
        {
          type: "slide",
          title: "SIP im Überblick",
          body: [
            "Das **Session Initiation Protocol (SIP)** wurde **1999** hauptsächlich von der **IETF** standardisiert, die zentrale Spezifikation ist **RFC 3261** (RFC 5411 ist ein guter Überblick). Der ältere Konkurrent **H.323** stammt von der **ITU-T**, nutzt **TCP-Port 1720**, war der erste Standard, hat aber an Bedeutung verloren.",
            "SIP ist **textbasiert** und funktioniert ähnlich wie HTTP oder SMTP: Es gibt **Requests und Responses**, und Ressourcen werden über **URIs** adressiert, etwa `sip:felix.muster@zhaw.ch`. Wer eine HTTP-Anfrage lesen kann, kann auch SIP lesen. SIP läuft über **UDP, TCP oder SCTP**. Standardports sind **5060** für unverschlüsselte und **5061** für TLS-verschlüsselte Signalisierung.",
            "SIP ist für Sitzungen aller Art gedacht: Telefonie, Video, Konferenzen, Instant Messaging, Multiplayer-Spiele und mehr. Es unterstützt User Location, User Availability (Präsenz), User Capabilities sowie Session Setup und Management. Wichtig: SIP transportiert **keine Medien**. Es ist die Telefonzentrale, die die Verbindung vermittelt, die Sprache selbst fliesst per **RTP über UDP**. Welche Medien, Codecs und Ports verwendet werden, steht im **SDP**, das als Body in der SIP-Nachricht mitreist. SIP und H.323 nutzen übrigens dieselben Audio- und Video-Codecs und beide RTP."
          ],
          remember: "SIP: IETF, 1999, RFC 3261, textbasiert, Request/Response, URIs, über UDP/TCP/SCTP. Port 5060 (unverschlüsselt), 5061 (TLS). H.323: ITU-T, TCP 1720."
        },
        {
          type: "slide",
          title: "User Agents und SIP-Server",
          body: [
            "Jedes SIP-Endgerät ist ein **User Agent (UA)** und besteht logisch aus zwei Teilen: Der **User Agent Client (UAC)** sendet Requests und empfängt die Antworten, der **User Agent Server (UAS)** beantwortet Requests. Beide stecken in jedem User Agent, denn jedes Telefon muss anrufen und angerufen werden können, wie jemand, der Briefe schreibt und auch welche beantwortet.",
            "Dazu kommen drei Kategorien von **SIP-Servern**. Der **Registrar** nimmt REGISTER-Requests an und speichert, unter welcher Adresse ein Nutzer erreichbar ist, er bietet also einen Location Service für seine Domain, ähnlich einem Einwohneramt. Registriert sich jemand mit mehreren Geräten unter derselben SIP-Adresse, klingeln alle, und eines nimmt ab. Der **Proxy Server** leitet Requests weiter, entscheidet, an welchen Server sie gehen, und passt dabei bei Bedarf Felder an, ähnlich einem HTTP-Proxy oder einem Postverteilzentrum. Er agiert **gleichzeitig als Client und als Server**. Der **Redirect Server** leitet nicht selbst weiter, sondern antwortet mit einer Umleitung, sodass der UA den Zielserver direkt ansprechen kann, wie ein Schild «Wir sind umgezogen».",
            "Diese Kategorien sind rein **konzeptionell**. Registrar, Proxy und Redirect sind Prozesse, die auf derselben Maschine laufen oder für Skalierbarkeit und Leistung auf mehrere verteilt werden können."
          ],
          remember: "UA = UAC (sendet Requests) + UAS (beantwortet Requests). Registrar = Standort speichern, Proxy = weiterleiten (Client und Server zugleich), Redirect = mit Umleitung antworten."
        },
        {
          type: "checkpoint",
          id: "cp-sip-basics",
          title: "Checkpoint: SIP Basics",
          questions: [
            {
              id: "port-tls",
              type: "type",
              prompt: "Which port is typically used for TLS-encrypted SIP signaling?",
              accept: ["5061"],
              explanation: "5060 for unencrypted, 5061 for TLS-encrypted signaling."
            },
            {
              id: "sip-facts",
              type: "multi",
              prompt: "Which statements about SIP are correct?",
              options: [
                "It is text-based and uses a request/response model similar to HTTP",
                "It can run over UDP, TCP or SCTP",
                "It carries the voice samples of the call",
                "It was standardized by the ITU-T",
                "Resources are identified by URIs"
              ],
              correct: [0, 1, 4],
              explanation: "SIP comes from the IETF and only signals. The voice is carried by RTP."
            },
            {
              id: "servers",
              type: "multi",
              prompt: "Which statements about SIP servers are correct?",
              options: [
                "A proxy server acts as client and server at the same time",
                "A registrar stores where users can currently be reached",
                "A redirect server forwards the INVITE to the destination itself",
                "Registrar, proxy and redirect server can run on the same machine",
                "Every call must pass through a redirect server"
              ],
              correct: [0, 1, 3],
              explanation: "A redirect server only answers with a redirection. The server roles are conceptual processes."
            },
            {
              id: "uac",
              type: "type",
              prompt: "Which logical part of a User Agent sends SIP requests? (abbreviation)",
              accept: ["UAC", "User Agent Client"],
              explanation: "The UAC sends requests, the UAS answers them. Every UA contains both."
            },
            {
              id: "h323-port",
              type: "type",
              prompt: "Which TCP port does H.323 use?",
              accept: ["1720"],
              explanation: "H.323 (ITU-T) uses TCP port 1720."
            }
          ]
        },
        {
          type: "slide",
          title: "Direkter Anruf ohne Server",
          body: [
            "Kennt der Anrufer die IP-Adresse des Angerufenen, geht es ganz ohne Server. Alice wählt, ihr UA schickt ein **INVITE** direkt an Bob. Bobs Telefon klingelt und meldet **180 Ringing**. Bob nimmt ab, sein UA schickt **200 OK**. Alice bestätigt mit **ACK**, und ab jetzt fliesst die Sprache über den **RTP Media Path**. Legt Bob auf, schickt er **BYE**, und Alice antwortet mit **200 OK**.",
            "Das ist wie ein Anruf bei jemandem, dessen Nummer du auswendig kennst: kein Telefonbuch, keine Vermittlung nötig. Die UAs im selben Netz kennen sich per statischer Konfiguration oder per DHCP.",
            "Oft klappt das aber nicht: wenn der Angerufene nur über seine URI, aber nicht über seine IP-Adresse bekannt ist, wenn er nicht immer dasselbe Endgerät benutzt, wenn sein Gerät keine feste IP-Adresse hat oder wenn es gar kein SIP spricht (klassisches Festnetz- oder Mobiltelefon). Dann braucht es Server."
          ],
          remember: "Direkter Anruf: INVITE → 180 Ringing → 200 OK → ACK → RTP → BYE → 200 OK."
        },
        {
          type: "slide",
          title: "Anruf über Proxies",
          body: [
            "Normalerweise ist ein **SIP Proxy** für eine Gruppe von UAs zuständig, etwa für die Mitarbeitenden einer Firma oder die Kunden eines Telefonie-Providers. Der UA kennt die Adresse seines Proxys per statischer Konfiguration oder per DHCP. Er meldet sich mit **REGISTER** bei seinem **Registrar** an, der in seiner Datenbank (Location Service) speichert, unter welcher IP-Adresse der UA gerade erreichbar ist. Das ist **Mobilität auf der Anwendungsschicht**: Du kannst dein Telefon in einem beliebigen IP-Netz einstecken und bist unter deiner Adresse erreichbar, auch wenn Firewalls und NAT dabei stören können.",
            "Ruft Alice (`alice@faraway.com`) Bob (`bob@zhaw.ch`) an, schickt ihr UA das INVITE an ihren Proxy faraway.com. Dieser findet per **DNS** heraus, welcher SIP-Server für zhaw.ch zuständig ist, und leitet das INVITE dorthin. Der Proxy von zhaw.ch fragt seinen Registrar bzw. Location Service nach Bobs aktueller Adresse und leitet an Bob weiter. Jeder Proxy bestätigt dem Vorgänger sofort mit **100 Trying**, dass die Anfrage angekommen ist, wie eine Eingangsbestätigung.",
            "**180 Ringing** und **200 OK** laufen denselben Weg über die Proxies zurück zu Alice. Laut dem Beispiel aus RFC 3261 schickt Alice das **ACK** dann aber **direkt** an Bob, und auch der **Medienstrom** und das spätere **BYE** laufen direkt zwischen den beiden UAs. Die Proxies sind also Vermittler beim Verbindungsaufbau, das Gespräch selbst führen die Endgeräte direkt miteinander."
          ],
          remember: "REGISTER beim Registrar. Proxy findet den Ziel-Proxy per DNS. 100 Trying hop-by-hop. ACK, Medienstrom und BYE laufen direkt zwischen den UAs."
        },
        {
          type: "slide",
          title: "Redirect: «Bitte dort nachfragen»",
          body: [
            "Ein Proxy kann einen Anruf weiterleiten oder ihn an den Anrufer zurückgeben. Beim **Redirect** antwortet der Redirect Server auf das INVITE mit **302 Moved Temporarily** und nennt die neue Adresse. Der Empfänger dieser Antwort bestätigt sie mit **ACK** und schickt ein **neues INVITE** an die genannte Stelle. Von dort läuft alles wie gewohnt: 180 Ringing, 200 OK, ACK, RTP und am Schluss BYE mit 200 OK.",
            "Das ist wie die Ansage bei einer alten Nummer: «Diese Nummer hat geändert, bitte wählen Sie ...». Der Redirect Server vermittelt nicht selbst, er zeigt nur die richtige Richtung und muss sich danach um den Anruf nicht mehr kümmern."
          ],
          remember: "Redirect Server antwortet mit 302 Moved Temporarily. Der Empfänger schickt ACK und dann ein neues INVITE an die neue Adresse."
        },
        {
          type: "checkpoint",
          id: "cp-call-flows",
          title: "Checkpoint: SIP Call Flows",
          questions: [
            {
              id: "direct-order",
              type: "order",
              prompt: "Order the messages of a direct SIP call from dialing to hanging up.",
              items: ["INVITE", "180 Ringing", "200 OK", "ACK", "RTP media", "BYE"],
              explanation: "The final 200 OK confirms the BYE."
            },
            {
              id: "through-proxies",
              type: "multi",
              prompt: "Alice calls Bob via two proxies as in the RFC 3261 example. Which messages are sent, received or forwarded by a proxy?",
              options: ["INVITE", "100 Trying", "180 Ringing", "200 OK to the INVITE", "ACK", "BYE"],
              correct: [0, 1, 2, 3],
              explanation: "Once both user agents know each other's contact address, ACK, media and BYE go directly between them."
            },
            {
              id: "direct-not-feasible",
              type: "multi",
              prompt: "In which situations is a direct call without a SIP server NOT feasible?",
              options: [
                "The callee is only known by URI, not by IP address",
                "The callee does not always use the same terminal device",
                "The callee's device has no permanent IP address",
                "The callee uses a conventional phone that does not speak SIP",
                "Both user agents are configured with each other's IP address"
              ],
              correct: [0, 1, 2, 3],
              explanation: "Only if the caller knows the callee's IP address can the call be set up directly."
            },
            {
              id: "redirect-code",
              type: "type",
              prompt: "Which response code does a redirect server send in the lecture example to point the caller to another address? (number)",
              accept: ["302"],
              explanation: "302 Moved Temporarily. The receiver answers with ACK and sends a new INVITE."
            },
            {
              id: "register",
              type: "type",
              prompt: "Which SIP request does a User Agent send to tell its registrar where it can be reached?",
              accept: ["REGISTER"],
              explanation: "The registrar stores the location (IP address) of the user agent."
            }
          ]
        },
        {
          type: "slide",
          title: "SIP-Nachrichten: Aufbau und Methoden",
          body: [
            "Eine SIP-Nachricht ist entweder ein **Request** (Client an Server) oder eine **Response** (Server an Client). Beide bestehen aus einer **Start-Line** (Request-Line bzw. Status-Line), einem oder mehreren **Header-Feldern**, einer **Leerzeile** und optional einem **Message-Body**. Jede Zeile endet mit **CRLF**, und die Leerzeile muss **auch dann** stehen, wenn kein Body folgt, wie der Leerraum zwischen Briefkopf und Brieftext.",
            "Die wichtigsten **Methoden**: **REGISTER** (beim Registrar anmelden), **INVITE** (zu einer Sitzung einladen), **ACK** (bestätigt den erfolgreichen Abschluss des Dialogaufbaus) und **PRACK** (bestätigt eine vorläufige Antwort), **BYE** (beendet eine **laufende** Sitzung), **CANCEL** (bricht eine **noch offene** Anfrage ab, etwa wenn du auflegst, bevor der andere abgenommen hat), **OPTIONS** (Informationen abfragen, ohne eine Sitzung aufzubauen), **INFO** (Informationen während einer Sitzung) sowie **SUBSCRIBE/NOTIFY** (abonnieren und benachrichtigt werden).",
            "Im INVITE-Beispiel siehst du typische Header: **Via**, **To**, **From**, **Call-ID** (eindeutige Kennung des Anrufs), **CSeq** (Sequenznummer plus Methode, z.B. `1 INVITE`), **Contact** (direkte Adresse des Absenders) und **Max-Forwards: 70**. Max-Forwards begrenzt die Anzahl Weiterleitungen, denn TTL hilft hier nicht: TTL arbeitet auf Schicht 3, SIP auf Schicht 7. **Content-Type: application/sdp** und **Content-Length** kündigen an, was im Body folgt."
          ],
          remember: "Aufbau: Start-Line, Header, Leerzeile (CRLF, immer Pflicht), optional Body. BYE beendet eine laufende Sitzung, CANCEL eine offene Anfrage. Max-Forwards (70) ersetzt TTL auf Schicht 7."
        },
        {
          type: "slide",
          title: "Response Codes und SIP-URIs",
          body: [
            "Die Antworten sind wie bei HTTP in Klassen eingeteilt, die erste Ziffer verrät alles. **1xx Provisional**: Anfrage erhalten, wird bearbeitet (100 Trying, 180 Ringing, 181 Call Is Being Forwarded, 183 Session in Progress). **2xx Successful**: 200 OK. **3xx Redirection**: Es braucht einen weiteren Schritt, meist vom Sender (301 Moved Permanently, 302 Moved Temporarily, 305 Use Proxy).",
            "**4xx Client Failure**: Die Anfrage ist fehlerhaft oder kann bei diesem Server nicht erfüllt werden, zum Beispiel 401 Unauthorized, 403 Forbidden, 404 Not Found, 407 Proxy Authentication Required, 408 Request Timeout, 480 Temporarily Unavailable, 482 Loop Detected, 483 Too Many Hops oder **486 Busy Here**. **5xx Server Failure**: Der Server hat versagt, ein anderer könnte es schaffen (502 Bad Gateway, 503 Service Unavailable, 504 Gateway Time-out). **6xx Global Failure**: Die Anfrage ist **nirgends** erfüllbar und soll nicht weitergeleitet werden (**600 Busy Everywhere**, 603 Decline, 604 Does Not Exist Anywhere).",
            "Den Unterschied zwischen **486 Busy Here** und **600 Busy Everywhere** merkst du dir wie im Alltag: «An diesem Apparat bin ich besetzt, versuch's auf dem Handy» gegenüber «Ich bin überall besetzt, versuch es gar nicht weiter». Bei **SIP-URIs** gelten Standardwerte, wenn nichts angegeben ist: Port **5060**, **transport=udp**, **user=ip** und **method=INVITE**. Beispiele: `sip:muf@160.85.200.27:3456` mit eigenem Port oder `sip:+41-76-456-9786@sipgate.sunrise.ch;user=phone` für eine Telefonnummer."
          ],
          remember: "1xx vorläufig, 2xx Erfolg, 3xx Umleitung, 4xx Client-Fehler (486 Busy Here), 5xx Server-Fehler, 6xx global (600 Busy Everywhere). URI-Defaults: 5060, transport=udp, user=ip, method=INVITE."
        },
        {
          type: "checkpoint",
          id: "cp-sip-messages",
          title: "Checkpoint: SIP Messages",
          questions: [
            {
              id: "cancel-bye",
              type: "multi",
              prompt: "Alice hangs up while Bob's phone is still ringing. Which statements are correct?",
              options: [
                "Alice's UA sends CANCEL",
                "Alice's UA sends BYE",
                "CANCEL terminates a pending request",
                "BYE terminates an established session",
                "The session is terminated with ACK"
              ],
              correct: [0, 2, 3],
              explanation: "The INVITE is still pending (no 200 OK yet), so CANCEL is used. BYE is for sessions that are already established."
            },
            {
              id: "busy-here",
              type: "type",
              prompt: "Bob is busy on this device, but might be reachable elsewhere. Which response code fits? (number)",
              accept: ["486"],
              explanation: "486 Busy Here (4xx). 600 Busy Everywhere means the request should not be tried anywhere else."
            },
            {
              id: "message-order",
              type: "order",
              prompt: "Order the parts of a SIP message.",
              items: ["Start-line", "Header fields", "Empty line (CRLF)", "Message body"],
              explanation: "The empty line is mandatory even if there is no body."
            },
            {
              id: "default-transport",
              type: "type",
              prompt: "Which transport protocol is used by default if a SIP URI has no transport parameter?",
              accept: ["UDP", "transport=udp"],
              explanation: "URI defaults: port 5060, transport=udp, user=ip, method=INVITE."
            },
            {
              id: "max-forwards",
              type: "type",
              prompt: "Which SIP header limits the number of times a request may be forwarded (70 in the lecture example)?",
              accept: ["Max-Forwards", "Max Forwards", "MaxForwards"],
              explanation: "The IP TTL/Hop Limit works on layer 3, so SIP needs its own counter on layer 7."
            }
          ]
        },
        {
          type: "slide",
          title: "SIP-Sicherheit und NAT",
          body: [
            "SIP selbst bietet nur **begrenzte Sicherheit**. Mit **TLS** verschlüsselt heisst es **SIPS**. Das ist aber **nicht Ende-zu-Ende**: Alle SIP-Knoten dazwischen müssen TLS unterstützen, jeder Abschnitt ist einzeln gesichert. Wie ein eingeschriebener Brief, der an jeder Poststelle neu quittiert wird: Auf jeder Strecke sicher, aber jede Poststelle hat ihn in der Hand. Ausserdem nutzt SIP die Vorteile von TCP kaum. Alternativ gibt es **DTLS** (Datagram Transport Layer Security, RFC 6347) und für den Medienstrom **SRTP** (Secure Real-Time Transport Protocol).",
            "Hinter **NAT** wird es knifflig, denn in SIP und SDP stehen IP-Adressen, und hinter NAT sind das private Adressen, die von aussen nicht erreichbar sind. Helfen können **STUN** (Session Traversal Utilities for NAT, RFC 5389), mit dem ein Gerät seine öffentliche Adresse herausfindet, **TURN** (Traversal Using Relays around NAT, RFC 5766 und RFC 6156 für IPv6), das die Daten über einen Relay-Server leitet, und **ICE** (Interactive Connectivity Establishment, RFC 5245), das die Möglichkeiten kombiniert und den besten Weg auswählt."
          ],
          remember: "SIPS = SIP über TLS, aber nur abschnittsweise, nicht Ende-zu-Ende. DTLS, SRTP für Medien. NAT-Traversal: STUN, TURN, ICE."
        },
        {
          type: "slide",
          title: "SDP: der Beipackzettel der Sitzung",
          body: [
            "Das **Session Description Protocol (SDP)** ist ein Format, um Multimedia-Sitzungen für Ankündigung und Einladung zu beschreiben. Beim Anrufaufbau steckt es als Body im SIP-INVITE (Content-Type `application/sdp`) und legt Medienformat, Codec und Transportprotokoll fest. Wie ein Beipackzettel: Er sagt, was drin ist und wie man es verwendet.",
            "SDP ist textbasiert, **ein Feld pro Zeile**, im Format `<Zeichen>=<Wert>` mit CRLF am Ende. Das Zeichen ist ein **einzelner Buchstabe**, der zwischen Gross- und Kleinschreibung unterscheidet. Es gibt drei Abschnitte, deren Parameter in **fester Reihenfolge** stehen müssen: **Session**, **Timing** und **Media**. `v=` ist die Protokollversion (derzeit nur **0**), `o=` nennt Originator und Session-ID, `s=` den Session-Namen (Pflicht, mindestens ein Zeichen), `c=` die Verbindungsinformation und `t=` die aktive Zeit (der Timing-Abschnitt ist Pflicht). Jede Medienbeschreibung beginnt mit einer `m=`-Zeile, und `a=`-Zeilen auf Medienebene **überschreiben** die Session-Attribute.",
            "Im Beispiel der Vorlesung steht `m=audio 16384 RTP/AVP 8 3 97 98 0 101`: Audio auf **Port 16384** über **RTP/AVP**, angeboten werden die Payload-Typen 8, 3, 97, 98, 0 und 101. Die `a=rtpmap`-Zeilen übersetzen die Nummern: **8 = PCMA/8000** (G.711 A-law), **3 = GSM/8000**, **97 und 98 = iLBC/8000**, **0 = PCMU/8000** (G.711 µ-law) und **101 = telephone-event/8000**, damit werden **DTMF-Töne** übertragen."
          ],
          remember: "SDP: <Zeichen>=<Wert>, drei Abschnitte Session → Timing → Media in fester Reihenfolge. v=0, s= und t= Pflicht. m=audio <Port> RTP/AVP <Payload-Typen>, a=rtpmap ordnet die Codecs zu."
        },
        {
          type: "slide",
          title: "VoIP-Endgeräte",
          body: [
            "**IP-Telefone** (SIP Hardphones) sind einem **Gerät bzw. einer Wandsteckdose** zugeordnet, nicht einer Person. Sie sind reine Telefone und haben dadurch weniger Schwachstellen, booten schnell, haben eine einfache Bedienung und wenige Funktionen und werden oft per **Power over Ethernet** (PoE) versorgt. Ideal dort, wo kein PC steht.",
            "Ein **Analog Telephone Adapter** (ATA) macht aus einem analogen Telefon ein VoIP-Telefon, indem er als Gateway arbeitet, wie ein Reisestecker-Adapter. Nützlich, wenn bestehende Geräte wie ein G3-Fax, eine DECT-Basisstation oder eine kleine Telefonanlage an VoIP angepasst werden müssen, vor allem in der Übergangszeit. Oft ist er im Router eingebaut, etwa in der FRITZ!Box oder im Swisscom-Router.",
            "**Softphones** (Soft User Agents) sind einer **Person** zugeordnet, nicht einem Gerät. Sie laufen als eigene Anwendung oder sind in bestehende Software integriert (zum Beispiel Outlook) und erleichtern die Integration der Telefonie. Im VoIP-Lab werden zum Beispiel MicroSIP (Windows), Linphone (macOS, iOS, Linux), Sipdroid (Android) oder Zoiper verwendet."
          ],
          remember: "Hardphone = geräte- bzw. steckdosengebunden, oft PoE. ATA = Gateway für analoge Telefone. Softphone = personengebunden, Software auf PC oder Handy."
        },
        {
          type: "checkpoint",
          id: "cp-sdp",
          title: "Checkpoint: Security, SDP & User Agents",
          questions: [
            {
              id: "sips",
              type: "multi",
              prompt: "Which statements about SIPS are correct?",
              options: [
                "It is SIP secured with TLS",
                "It provides end-to-end encryption between the two user agents",
                "All intermediate SIP nodes must support TLS",
                "It typically uses port 5061",
                "It replaces RTP for the media stream"
              ],
              correct: [0, 2, 3],
              explanation: "TLS protects each hop separately, so SIPS is not end-to-end. The media is protected with SRTP, not SIPS."
            },
            {
              id: "sdp-sections",
              type: "order",
              prompt: "Order the three sections of an SDP session description.",
              items: ["Session description", "Time description", "Media description"],
              explanation: "Parameters must appear in this order. The time description (t=) is mandatory."
            },
            {
              id: "sdp-port",
              type: "type",
              prompt: "In the SDP line m=audio 16384 RTP/AVP 8 3 0, on which port should the audio stream be sent?",
              accept: ["16384"],
              explanation: "m=<media> <port> <protocol> <payload types>."
            },
            {
              id: "turn",
              type: "type",
              prompt: "Which NAT traversal protocol relays the traffic through a server when a direct path is not possible? (abbreviation)",
              accept: ["TURN", "Traversal Using Relays around NAT"],
              explanation: "STUN discovers the public address, TURN relays, ICE combines the options."
            },
            {
              id: "user-agents",
              type: "multi",
              prompt: "Which statements about VoIP user agents are correct?",
              options: [
                "A hard phone is assigned to a device or wall outlet rather than to a person",
                "A softphone is assigned to a person rather than to a device",
                "An ATA lets an analog phone set work with VoIP",
                "Hard phones are often powered over Ethernet",
                "An ATA is only available as a standalone box and never built into routers"
              ],
              correct: [0, 1, 2, 3],
              explanation: "ATAs are often integrated into home routers such as a FRITZ!Box or the Swisscom router."
            }
          ]
        }
      ]
    },
    {
      id: "w4",
      number: 4,
      title: "Routing Part 1: Bellman Ford, RIP, RIPng, EIGRP",
      status: "ready",
      items: [

        /* ================= Orientierung ================= */
        {
          type: "slide",
          title: "Folie 5 — Was du nach dieser Vorlesung können musst",
          body: [
            { callout: { tone: "exam", title: "Learning Objectives im Wortlaut", text: [
              "… can understand and describe **dynamical routing protocols** like **RIP**, **RIPng** for IPv6",
              "… understood the **Bellman Ford Algorithm**",
              "… learned how **EIGRP** and its metrics works",
              "… are prepared for the **Lab** working with RIP"
            ] } },
            "Vier Ziele, und drei davon sind Protokolle. Das Vierte, Bellman Ford, ist der Algorithmus, der unter RIP und RIPng steckt. Der rote Faden der Vorlesung ist deshalb: **ein Algorithmus, drei Protokolle, die ihn unterschiedlich gut ausnutzen.**",
            { flow: { steps: [
              { title: "Warum dynamisch?", text: "Routen von Hand pflegen geht ab wenigen Routern nicht mehr" },
              { title: "Der Algorithmus", text: "Bellman Ford berechnet kürzeste Wege" },
              { title: "RIP und RIPng", text: "einfachste Umsetzung, nur Hop Count, max. 15" },
              { title: "EIGRP", text: "mehrere Metriken, DUAL, nur inkrementelle Updates" }
            ] } },
            { callout: { tone: "tip", title: "Zur Sprache", text: "Die Erklärungen sind auf Deutsch, die Checkpoints auf Englisch, weil die Prüfung auf Englisch ist. Englische Fachbegriffe bleiben überall stehen." } }
          ],
          remember: "Vier Lernziele: RIP und RIPng beschreiben, Bellman Ford verstehen, EIGRP samt Metrik kennen, aufs RIP-Lab vorbereitet sein."
        },
        {
          type: "slide",
          title: "Folien 2–4 und 8–10 — Warum dynamisches Routing, und was ein Routing-Protokoll ist",
          body: [
            "Die Vorlesung startet mit einer praktischen Frage: Woher kennen eigentlich **alle Router** zwischen deinem Heimrouter und einem beliebigen Ziel im Internet den Weg? Die Folien zeigen das mit Traceroutes, einmal zu Googles DNS-Server und einmal zu einem DNS-Root-Server. Das Paket läuft über **mehrere Hops**, und keiner davon wurde von Hand konfiguriert.",
            "Folie 8 ordnet die Router zuerst nach ihrer Rolle im Netz ein:",
            { cards: [
              { title: "Core Router", text: "Kern des Netzes, hohe Bandbreite, möglichst wenig Zusatzaufgaben" },
              { title: "Distribution Router", text: "Verteilebene zwischen Kern und Zugang" },
              { title: "Access Router", text: "Zugangsebene, hier hängen die Endnetze dran" }
            ] },
            { callout: { tone: "def", title: "Was ist ein Routing-Protokoll? (Folie 9)", text: [
              "Ein Routing-Protokoll ist ein **Satz von Regeln, der den Routing-Prozess definiert**.",
              "Routing-Protokolle unterscheiden sich in der **Komplexität**: Das einfachste stützt sich auf einen einzigen Parameter, zum Beispiel die Anzahl der **Layer-3-Hops**, so wie RIP. Anspruchsvollere Protokolle treffen die Routing-Entscheidung anhand von **mehr als einem Parameter**."
            ] } },
            "Folie 10 ordnet die Protokolle den Netzprotokollen zu. Für dich sind die ersten beiden Zeilen relevant:",
            { table: {
              caption: "Netzprotokoll und zugehörige Routing-Protokolle, Auszug aus Folie 10",
              head: ["Network Protocol", "Routing Protocols"],
              rows: [
                ["IPv4", "RIP, OSPF, BGP, EGP, IS-IS, IGRP, EIGRP"],
                ["IPv6", "RIPng, OSPF for IPv6, BGP-4 for IPv6, IS-IS for IPv6, EIGRP for IPv6"],
                ["Novell IPX", "RIP, (SAP), EIGRP"],
                ["Apple Talk", "RMTP, EIGRP"],
                ["DECnet Phase V", "IS-IS"],
                ["ISO-CLNS", "IS-IS, OSI-IGRP"]
              ],
              marks: { "0,0": "focus", "1,0": "focus" },
              note: "Die unteren vier Zeilen sind historische Einordnung. Blau markiert, was in dieser Vorlesung zählt."
            } },
            { reveal: {
              question: "Warum taucht EIGRP in fast jeder Zeile der Tabelle auf, RIP aber nicht?",
              label: "Antwort aufdecken",
              answer: [
                "Weil EIGRP von Anfang an als **Multi-Protocol-Routing-Protokoll** gebaut wurde und mehrere Netzprotokolle gleichzeitig bedienen kann. In der Tabelle steht es bei IPv4, IPv6, Novell IPX und Apple Talk.",
                "RIP dagegen ist eng an das jeweilige Netzprotokoll gekoppelt. Für IPv6 brauchte es deshalb eine eigene Variante, **RIPng**, mit eigenem RFC und eigenem UDP-Port. Genau das ist Abschnitt 3 dieser Vorlesung."
              ]
            } }
          ],
          remember: "Routing-Protokoll = Regelsatz für den Routing-Prozess. RIP nutzt einen Parameter (L3-Hops), anspruchsvollere Protokolle mehrere. Router-Rollen: Core, Distribution, Access."
        },
        {
          type: "checkpoint",
          id: "cp-overview",
          title: "Checkpoint: Routing protocols overview",
          questions: [
            {
              id: "what-is",
              type: "single",
              prompt: "According to slide 9, what is a routing protocol?",
              options: [
                "A set of rules that defines the routing process",
                "A table that lists all reachable networks",
                "The hardware interface that forwards packets",
                "A tunnelling mechanism between two networks"
              ],
              correct: 0,
              explanation: "The slide also notes that routing protocols differ in complexity: the simplest ones use a single parameter such as the L3 hop count."
            },
            {
              id: "ipv6-protocols",
              type: "multi",
              prompt: "Which routing protocols does slide 10 list for **IPv6**?",
              options: [
                "RIPng",
                "OSPF for IPv6",
                "BGP-4 for IPv6",
                "EIGRP for IPv6",
                "IGRP for IPv6"
              ],
              correct: [0, 1, 2, 3],
              explanation: "IGRP is listed only as a historical predecessor of EIGRP and is not available for IPv6."
            },
            {
              id: "router-roles",
              type: "order",
              prompt: "Order the router roles of slide 8 from the centre of the network towards the end networks.",
              items: ["Core Router", "Distribution Router", "Access Router"],
              explanation: "Core is the backbone, distribution is the middle layer, access is where the end networks attach."
            },
            {
              id: "single-param",
              type: "type",
              prompt: "Which single parameter does the simplest routing protocol, RIP, base its decision on? (two words, as on slide 9)",
              accept: ["hop count", "hop-count", "L3 hops", "layer 3 hops", "number of hops", "layer-3 hops", "hops"],
              placeholder: "two words",
              explanation: "The number of layer 3 hops. RIP uses nothing else as a metric."
            }
          ]
        },

        /* ================= Bellman Ford ================= */
        {
          type: "slide",
          title: "Folie 12 — Bellman Ford: die Idee hinter RIP",
          body: [
            { callout: { tone: "def", title: "Was der Algorithmus tut (Folie 12)", text: [
              "RIP benutzt den **Bellman-Ford-Algorithmus**, um die optimalen Routen zu berechnen.",
              "Der Algorithmus löst das **Single Source Shortest Path**-Problem in einem **gewichteten gerichteten Graphen** (weighted digraph). Also: kürzeste Wege von **einem** Startknoten zu allen anderen."
            ] } },
            { compare: {
              left: { title: "Bellman Ford", points: [
                "Langsamer",
                "Kann mit **negativen** Kantengewichten umgehen",
                "Wird von RIP verwendet"
              ] },
              right: { title: "Dijkstra", points: [
                "Schneller",
                "Kommt mit negativen Gewichten **nicht** zurecht",
                "Wird von Link-State-Protokollen wie OSPF verwendet"
              ] },
              verdict: "Die Folie nennt genau diesen Trade-off: Dijkstra ist schneller, Bellman Ford ist der Allgemeinere."
            } },
            "Die Rechenvorschrift, die auf Folie 22 für RIP konkret wird, ist immer dieselbe:",
            { formula: {
              main: "d(i, j) = min [ d(i, k) + d(k, j) ]",
              parts: [
                { label: "d(i, j)", text: "gesuchte Distanz von Router i zum Ziel j" },
                { label: "d(i, k)", text: "Distanz von Router i zum Nachbarn k" },
                { label: "d(k, j)", text: "Distanz, die Nachbar k für das Ziel j gemeldet hat" }
              ],
              note: "Router i rechnet also nicht selbst den ganzen Weg aus. Er nimmt das, was seine Nachbarn melden, und addiert die eigene Distanz zum Nachbarn. Genau das ist **Distance Vector**."
            } },
            { callout: { tone: "tip", title: "Merkbild", text: "Bellman Ford arbeitet wie Flüsterpost mit Zahlen: Jede Runde erzählt jeder Knoten seinen Nachbarn, wie weit er vom Start entfernt ist. Nach genügend Runden hat sich die beste Zahl überall durchgesetzt." } }
          ],
          remember: "Bellman Ford: Single Source Shortest Path im gewichteten gerichteten Graphen. Langsamer als Dijkstra, kommt dafür mit negativen Gewichten klar. d(i,j) = min[d(i,k) + d(k,j)]."
        },
        {
          type: "slide",
          title: "Folien 13–19 — Bellman Ford Schritt für Schritt",
          body: [
            "Die Vorlesung rechnet das Beispiel über **sieben Folien** durch. Wo der Dozent so viel Platz investiert, lohnt sich das Nachvollziehen. Startknoten ist **A**, die Kanten des Graphen sind:",
            { table: {
              caption: "Die Kanten des Beispielgraphen mit ihren Gewichten",
              head: ["Von", "Nach", "Gewicht"],
              rows: [
                ["A", "B", "−1"],
                ["A", "C", "4"],
                ["B", "C", "3"],
                ["B", "D", "2"],
                ["B", "E", "2"],
                ["C", "D", "5"],
                ["D", "B", "1"],
                ["D", "E", "−3"]
              ],
              marks: { "0,2": "focus", "7,2": "focus" },
              note: "Blau die beiden negativen Gewichte. Genau sie sind der Grund, warum hier Bellman Ford und nicht Dijkstra gerechnet wird."
            } },
            "So entwickeln sich die Distanzen von A aus. Jede Zeile ist eine Runde, die Spalte **# hops** zählt die benutzten Kanten:",
            { table: {
              caption: "Der Ablauf der Folien 13 bis 19",
              head: ["Runde", "# hops", "A", "B", "C", "D", "E"],
              rows: [
                ["Start", "0", "0", "∞", "∞", "∞", "∞"],
                ["1", "1", "0", "−1", "∞", "∞", "∞"],
                ["2", "2", "0", "−1", "2", "∞", "∞"],
                ["3", "2", "0", "−1", "2", "1", "∞"],
                ["4", "3", "0", "−1", "2", "1", "−2"]
              ],
              marks: { "4,3": "good", "4,4": "good", "4,5": "good", "4,6": "good" },
              note: "Grün das Endergebnis: A = 0, B = −1, C = 2, D = 1, E = −2."
            } },
            { reveal: {
              question: "Rechne nach: Warum ist C am Ende 2 und nicht 4, obwohl es eine direkte Kante A → C mit Gewicht 4 gibt?",
              label: "Rechnung prüfen",
              answer: [
                "Weil der Umweg über B billiger ist: **A → B → C = (−1) + 3 = 2**. Die direkte Kante A → C kostet 4.",
                "Genau das macht der Algorithmus in jeder Runde: Er prüft für jeden Knoten, ob ein Weg über einen Nachbarn kürzer ist als der bisher bekannte."
              ]
            } },
            { reveal: {
              question: "Und warum ist E am Ende −2 und nicht 1?",
              label: "Rechnung prüfen",
              answer: [
                "Es gibt zwei Wege zu E. Der direkte über B: **A → B → E = (−1) + 2 = 1**. Und der über D: **A → B → D → E = (−1) + 2 + (−3) = −2**.",
                "Der zweite ist kürzer, obwohl er einen Hop mehr braucht. Deshalb steht in der letzten Zeile der Tabelle # hops = 3.",
                "Merke: **Mehr Hops heisst nicht automatisch teurer**, sobald die Kanten unterschiedliche Gewichte haben. Bei RIP ist das anders, dort kostet jeder Hop genau 1."
              ]
            } },
            { callout: { tone: "warn", title: "Wichtiger Hinweis auf Folie 19", text: "Der Dozent schreibt ausdrücklich dazu: Das ist nur ein Beispiel zur Erklärung des Algorithmus. **In RIP-gerouteten Netzen hat normalerweise jede Teilstrecke die Metrik 1.** Negative Gewichte kommen im echten RIP also nicht vor." } }
          ],
          remember: "Beispiel: Start A, Ergebnis A = 0, B = −1, C = 2, D = 1, E = −2. C über B (−1+3 = 2) statt direkt (4), E über D (−1+2−3 = −2) statt über B (1). In echtem RIP hat jede Teilstrecke Metrik 1."
        },
        {
          type: "checkpoint",
          id: "cp-bellman",
          title: "Checkpoint: Bellman Ford",
          questions: [
            {
              id: "bf-problem",
              type: "single",
              prompt: "Which problem does the Bellman Ford algorithm solve?",
              options: [
                "Single source shortest path in a weighted digraph",
                "All pairs shortest path in an undirected graph",
                "Minimum spanning tree",
                "Maximum flow between two nodes"
              ],
              correct: 0,
              explanation: "Slide 12 states it exactly like this: single source shortest path in a weighted digraph."
            },
            {
              id: "bf-vs-dijkstra",
              type: "multi",
              prompt: "What does slide 12 say about Bellman Ford compared to Dijkstra?",
              options: [
                "Dijkstra is faster",
                "Bellman Ford can handle negative weights",
                "Bellman Ford is used by RIP",
                "Dijkstra cannot be used for routing at all"
              ],
              correct: [0, 1, 2],
              explanation: "Dijkstra is widely used for routing as well, for example in link state protocols. The slide only says it cannot handle negative weights."
            },
            {
              id: "bf-formula",
              type: "type",
              prompt: "Complete the distance vector formula from slide 22: d(i,j) = min [ d(i,k) + ... ]",
              accept: ["d(k,j)", "d(k, j)", "dkj", "d k j"],
              placeholder: "the missing term",
              explanation: "d(i,j) = min [ d(i,k) + d(k,j) ]. Router i adds its own distance to neighbour k to whatever k reports for destination j."
            },
            {
              id: "bf-result",
              type: "single",
              prompt: "In the lecture example the final distance from A to E is −2, reached via A → B → D → E. Why is this better than A → B → E?",
              options: [
                "Because (−1) + 2 + (−3) = −2 is smaller than (−1) + 2 = 1, even though it uses one more hop",
                "Because a path with more hops is always preferred in Bellman Ford",
                "Because the direct edge B → E does not exist",
                "Because negative weights are always skipped"
              ],
              correct: 0,
              explanation: "With different edge weights, more hops can still mean a lower total cost. In real RIP every leg costs 1, so this cannot happen."
            }
          ]
        },

        /* ================= RIP ================= */
        {
          type: "slide",
          title: "Folie 21 — RIP: der Steckbrief",
          body: [
            "Jetzt vom Algorithmus zum Protokoll. Diese Tabelle ist der Kern von Lernziel 1 und sollte sitzen:",
            { table: {
              caption: "RIP und RIPng nach Folie 21",
              head: ["Eigenschaft", "Wert"],
              rows: [
                ["Typ", "Distance vector routing protocol"],
                ["Algorithmus", "Bellman Ford"],
                ["Metrik", "ausschliesslich der Layer-3-Hop-Count"],
                ["Maximaler Hop-Count", "15, in RIPv2 und RIPng gleichermassen"],
                ["Transportprotokoll", "UDP"],
                ["Portnummer", "520 (RIP für IPv4)"],
                ["Administrative Distance", "120"]
              ],
              marks: { "3,1": "focus", "5,1": "focus", "6,1": "focus" }
            } },
            "Die RFC-Geschichte zeigt, wie oft nachgebessert wurde:",
            { table: {
              caption: "Die RFCs von Folie 21",
              head: ["RFC", "Inhalt"],
              rows: [
                ["RFC 1058", "RIPv1 für IPv4"],
                ["RFC 1388", "RIPv2 für IPv4, aktualisiert RFC 1058"],
                ["RFC 1723", "löst RFC 1388 ab, IPv4"],
                ["RFC 2453", "löst RFC 1723 und RFC 1388 ab, IPv4"],
                ["RFC 2080", "spezifiziert RIPng, also RIP für IPv6"]
              ],
              marks: { "4,0": "focus" }
            } },
            { callout: { tone: "exam", title: "Die Zahl, an der alles hängt", text: "**15 Hops Maximum.** Damit ist RIP für grosse Netze unbrauchbar, und genau daraus erklären sich fast alle Nachteile, die später kommen. Der Wert **16 bedeutet unendlich**, also unerreichbar." } },
            { reveal: {
              question: "Warum reicht RIP ein einziger Zähler als Metrik nicht aus, um gute Wege zu finden?",
              label: "Überlegung aufdecken",
              answer: [
                "Weil der Hop-Count nichts über die **Qualität** einer Strecke sagt. Ein Weg über zwei 64-kbit/s-Leitungen hat zwei Hops, ein Weg über drei Gigabit-Links hat drei. RIP würde den langsamen Weg wählen.",
                "Genau das ist die Lücke, die EIGRP später mit **Bandwidth und Delay** als Metriken schliesst. Folie 9 hat es schon angekündigt: Anspruchsvollere Protokolle entscheiden anhand von mehr als einem Parameter."
              ]
            } }
          ],
          remember: "RIP: Distance Vector, Bellman Ford, nur Hop-Count, max. 15 Hops (16 = unendlich), UDP Port 520, Administrative Distance 120. RIPng in RFC 2080."
        },
        {
          type: "slide",
          title: "Folien 23, 26–27 — Topology Database, Timer und Konvergenz",
          body: [
            "Jeder Router kennt nur seine **Nachbarn** und das, was diese melden. Dieses Wissen steht in der Topology Database, die alle 30 Sekunden per RIP Update Report aufgefrischt wird:",
            { table: {
              caption: "Struktur der RIP Topology Database für IPv4, Folie 23",
              head: ["Feld", "Bedeutung"],
              rows: [
                ["Destination", "IPv4-Adresse des Hosts oder Netzes"],
                ["Metric", "Administrative Distance bzw. Anzahl Layer-3-Hops zum Ziel"],
                ["Gateway", "IPv4-Adresse des Nachbarknotens auf dem Weg"],
                ["Timer", "vergangene Zeit seit dem letzten Update"],
                ["Link Interface", "Schnittstelle des Geräts, zum Beispiel ein Ethernet-Port"]
              ],
              note: "In der Cisco-Routing-Tabelle beginnen RIP-Einträge mit dem Buchstaben R."
            } },
            "Die vier Timer von Folie 26 entscheiden, wie schnell RIP auf Ausfälle reagiert:",
            { table: {
              caption: "RIP-Timer nach Folie 26",
              head: ["Timer", "Standardwert", "Wirkung"],
              rows: [
                ["Update", "30 s", "im stabilen Betrieb wird alle 30 Sekunden die Tabelle verschickt"],
                ["Invalid", "180 s", "kommt 180 s kein Update für einen Eintrag, wird er ungültig und bekommt Metrik 16 (∞)"],
                ["Hold Down", "180 s", "während dieser Zeit akzeptiert der Router keine positiven Meldungen für eine als ungültig erklärte Route, das dient der Netzstabilität"],
                ["Flush", "240 s", "ungültige Routen werden nach Ablauf gelöscht"]
              ],
              marks: { "1,2": "bad", "2,2": "warn" }
            } },
            "Folie 27 zeigt, was das praktisch bedeutet. Eine Kette von Routern ohne **triggered updates** lernt pro Update-Intervall genau **einen Hop dazu**:",
            { table: {
              caption: "Aufbau der Einträge d(Ni, N1) in einer Router-Kette, Folie 27",
              head: ["Zeitpunkt", "R2", "R3", "R4", "R5"],
              rows: [
                ["Start", "∞", "∞", "∞", "∞"],
                ["nach 30 s", "1", "∞", "∞", "∞"],
                ["nach 60 s", "1", "2", "∞", "∞"],
                ["nach 90 s", "1", "2", "3", "∞"],
                ["nach 120 s", "1", "2", "3", "4"],
                ["nach 150 s", "1", "2", "3", "4"]
              ],
              note: "∞ bedeutet «unreachable». Moderne Routing-Protokolle haben triggered updates und warten nicht auf das nächste Intervall."
            } },
            { callout: { tone: "warn", title: "Zwei Ungenauigkeiten in den Folien", text: [
              "Auf Folie 27 ist der zweite Router in der Zeichnung **zweimal als R2** beschriftet. Gemeint ist eine Kette R1 bis R6, bei der sich die Distanz pro 30-Sekunden-Intervall um einen Hop weiterschiebt. Die fünfte Spalte erreicht auf der Folie nach 150 Sekunden den Wert 5.",
              "Auf Folie 28 stehen in der 30-Sekunden-Zeile die Netze **10.0.4.0** und **10.0.5.0** sowie das Gateway **10.0.3.2**. In der 60-Sekunden-Zeile heissen dieselben Einträge korrekt 10.1.4.0, 10.1.5.0 und 10.1.3.2. Die 10.0.x.x-Angaben sind Tippfehler."
            ] } }
          ],
          remember: "Topology Database: Destination, Metric, Gateway, Timer, Link Interface. Timer: Update 30 s, Invalid 180 s (dann Metrik 16), Hold Down 180 s, Flush 240 s. Ohne triggered updates ein Hop pro Intervall."
        },
        {
          type: "slide",
          title: "Folie 28 — RIP Convergence Sample: vier Router, 90 Sekunden",
          body: [
            "Das ist die Folie, die du für das Lab brauchst. Vier Router in einer Kette, fünf Netze. Zu Beginn kennt jeder Router nur seine **direkt angeschlossenen** Netze mit 0 Hops.",
            { table: {
              caption: "Wie sich die Routing-Tabelle von R1 füllt, nach Folie 28",
              head: ["Zeitpunkt", "Netz", "via", "Hops"],
              rows: [
                ["0 s", "10.1.1.0", "– –", "0"],
                ["0 s", "10.1.2.0", "– –", "0"],
                ["30 s", "10.1.3.0", "10.1.2.2", "1"],
                ["60 s", "10.1.4.0", "10.1.2.2", "2"],
                ["90 s", "10.1.5.0", "10.1.2.2", "3"]
              ],
              marks: { "4,0": "good", "4,3": "good" },
              note: "Nach 90 Sekunden ist das Netz konvergiert. R1 erreicht das entfernteste Netz 10.1.5.0 mit 3 Hops."
            } },
            "Zwei Dinge, die man an dieser Tabelle sehen soll:",
            { cards: [
              { title: "Das Gateway bleibt gleich", text: "Alle gelernten Routen von R1 zeigen auf 10.1.2.2, also den direkten Nachbarn. Ein Distance-Vector-Router kennt nur den nächsten Schritt, nicht den ganzen Pfad." },
              { title: "Die Hop-Zahl wächst pro Intervall", text: "30 s → 1 Hop, 60 s → 2 Hops, 90 s → 3 Hops. Dieselbe Mechanik wie in der Kette auf Folie 27." }
            ] },
            { reveal: {
              question: "Wie lange würde die Konvergenz dauern, wenn die Kette nicht 4, sondern 10 Router hätte? Und wo liegt das harte Limit?",
              label: "Überlegung aufdecken",
              answer: [
                "Pro Update-Intervall von 30 Sekunden wandert die Information einen Hop weiter. Bei 10 Routern sind es 9 Teilstrecken, also rund **9 × 30 s = 270 Sekunden**, also viereinhalb Minuten, bis alle Bescheid wissen.",
                "Das harte Limit ist aber nicht die Zeit, sondern die **15 Hops**. Ein Netz, das tiefer als 15 Hops ist, lässt sich mit RIP überhaupt nicht vollständig abbilden. Alles ab 16 gilt als unerreichbar.",
                "Zusammen mit der Tatsache, dass alle 30 Sekunden die **komplette** Tabelle verschickt wird (Folie 37), ist das der Grund, warum RIP für grosse Netze ungeeignet ist."
              ]
            } }
          ],
          remember: "Convergence Sample: vier Router, konvergiert nach 90 Sekunden, R1 erreicht 10.1.5.0 mit 3 Hops über 10.1.2.2. Pro 30-Sekunden-Intervall ein Hop weiter."
        },
        {
          type: "checkpoint",
          id: "cp-rip",
          title: "Checkpoint: RIP basics, timers and convergence",
          questions: [
            {
              id: "rip-port",
              type: "type",
              prompt: "Which UDP port number is reserved for RIP (the IPv4 version)?",
              accept: ["520", "UDP 520", "port 520"],
              placeholder: "number",
              explanation: "RIP for IPv4 uses UDP port 520. RIPng uses 521."
            },
            {
              id: "rip-max",
              type: "single",
              prompt: "A RIP route shows a metric of 16. What does that mean?",
              options: [
                "The destination is unreachable, 16 stands for infinity",
                "The destination is 16 hops away and still usable",
                "The route was learned from another routing protocol",
                "The hold down timer has expired"
              ],
              correct: 0,
              explanation: "The maximum usable RIP hop count is 15. A metric of 16 marks the route as invalid and unreachable."
            },
            {
              id: "rip-timers",
              type: "multi",
              prompt: "Which statements about the RIP timers on slide 26 are correct?",
              options: [
                "In a stable RIP process updates are sent every 30 seconds",
                "After 180 seconds without an update an entry becomes invalid and gets metric 16",
                "The hold down timer has a default value of 180 seconds",
                "The flush timer has a default value of 240 seconds",
                "Invalid routes are deleted immediately when they become invalid"
              ],
              correct: [0, 1, 2, 3],
              explanation: "Invalid routes are only flushed after the flush timer of 240 seconds has elapsed, not immediately."
            },
            {
              id: "rip-db",
              type: "order",
              prompt: "Put the fields of the RIP topology database (slide 23) in the order shown on the slide.",
              items: ["Destination", "Metric", "Gateway", "Timer", "Link Interface"],
              explanation: "Destination, Metric, Gateway, Timer, Link Interface. In a Cisco routing table RIP entries start with the letter R."
            },
            {
              id: "rip-converge",
              type: "single",
              prompt: "In the convergence sample on slide 28, after how many seconds does R1 know the most distant network 10.1.5.0, and with which metric?",
              options: [
                "After 90 seconds with 3 hops",
                "After 30 seconds with 1 hop",
                "After 60 seconds with 2 hops",
                "After 120 seconds with 4 hops"
              ],
              correct: 0,
              explanation: "One hop per 30 second update interval, so the third hop is learned after 90 seconds. The slide marks that moment as «Convergence!»."
            }
          ]
        },

        /* ================= RIPv2 Format und Konfiguration ================= */
        {
          type: "slide",
          title: "Folien 24–25 und 29–31 — Konfiguration und RIPv2-Nachrichtenformat",
          body: [
            "Die Konfiguration auf Folie 24 ist erstaunlich kurz. Unter Cisco IOS genügt pro Router der Aufruf von `router rip` und danach je ein `network`-Eintrag für jedes direkt angeschlossene Netz:",
            { table: {
              caption: "Konfiguration von Router 1 im Beispiel der Folie 24",
              head: ["Befehl", "Bedeutung"],
              rows: [
                ["`router rip`", "wechselt in die RIP-Konfiguration"],
                ["`network 192.168.1.0`", "das LAN von Router 1, /24"],
                ["`network 192.168.4.0`", "Inter-Router-Netz, /30"],
                ["`network 192.168.5.0`", "zweites Inter-Router-Netz, /30"]
              ],
              note: "Netzmasken im Beispiel: LAN /24 = 255.255.255.0, Inter-Router-Netze /30 = 255.255.255.252."
            } },
            "Die Folien 29 bis 31 zerlegen die RIPv2-Nachricht. Eine Nachricht besteht aus einem **Header** und **einem oder mehreren Entries**:",
            { table: {
              caption: "RIPv2-Nachricht nach den Folien 29 bis 31",
              head: ["Teil", "Feld", "Wert und Bedeutung"],
              rows: [
                ["Header", "Command", "0x01 = RIP-Request, 0x02 = RIP-Response"],
                ["Header", "Version", "0x02"],
                ["Entry", "Address Family Indicator (AFI)", "0x0002 = IP, 0xFFFF = Authentisierung vorhanden"],
                ["Entry", "Route Tag", "kennzeichnet Ziele, die ausserhalb der Routing-Domain gelernt wurden, also Nicht-RIP-Routen"],
                ["Entry", "IPv4 Address", "das Zielnetz"],
                ["Entry", "Subnet Mask", "die zugehörige Maske"],
                ["Entry", "Next Hop", "IP-Adresse des anderen Routers, unter dessen Adresse die Routen angekündigt werden"],
                ["Entry", "Metric", "der Hop-Count"]
              ],
              marks: { "2,2": "focus", "3,2": "focus" },
              note: "Maximal 25 Entries pro Nachricht, jeder Entry ist 20 Bytes gross."
            } },
            { callout: { tone: "tip", title: "Woran du den Route Tag erkennst", text: "Der Route Tag ist das Feld, mit dem RIP unterscheidet, ob eine Route **innerhalb** der eigenen Routing-Domain gelernt wurde oder von **aussen** hereingereicht wurde, etwa aus BGP. Bei RIPng heisst das Feld gleich und hat dieselbe Aufgabe." } }
          ],
          remember: "Konfiguration: router rip plus je ein network-Eintrag. RIPv2-Nachricht: Header (Command 0x01/0x02, Version 0x02) plus max. 25 Entries à 20 Bytes mit AFI, Route Tag, IPv4-Adresse, Subnetzmaske, Next Hop und Metrik."
        },

        /* ================= RIPng ================= */
        {
          type: "slide",
          title: "Folien 33 und 37–39 — RIPng: was gleich bleibt und was sich ändert",
          body: [
            "RIPng ist nicht einfach RIP mit längeren Adressen. Aber die Unterschiede sind überschaubar, und genau deshalb lohnt sich eine saubere Gegenüberstellung:",
            { compare: {
              left: { title: "RIP für IPv4", points: [
                "RFC 2453 als aktuelle Fassung",
                "UDP Port **520**",
                "max. 15 Hops, Kosten pro Hop fest **1**",
                "max. **25** Entries pro Nachricht",
                "Administrative Distance 120"
              ] },
              right: { title: "RIPng für IPv6", points: [
                "RFC **2080**",
                "UDP Port **521**",
                "max. 15 Hops, Kosten pro Hop **manuell konfigurierbar**",
                "**26** RTE pro Nachricht (524 Bytes)",
                "Administrative Distance 120"
              ] },
              verdict: "Gleich bleiben: Bellman Ford, die Grenze von 15, das 30-Sekunden-Intervall und die Administrative Distance 120."
            } },
            { callout: { tone: "exam", title: "Die konfigurierbaren Hop-Kosten", text: "RIPng erlaubt, die **Kosten für einen Layer-3-Hop manuell** festzulegen. Das Beispiel der Folie: Setzt man sie auf **2**, ergibt sich eine neue Grenze von **7 «doppelten» Hops**, weil 7 × 2 = 14 noch unter 15 liegt. Die 15 bleibt also stehen, nur ihre Bedeutung ändert sich." } },
            "Die Rechnung auf Folie 38 wird gern gefragt, weil sie in einer Zeile geht:",
            { formula: {
              main: "524 Bytes verfügbar  ÷  20 Bytes pro RTE  =  26 RTE",
              parts: [
                { label: "524 Bytes", text: "Grösse der eingekapselten RIPng-Nachricht" },
                { label: "20 Bytes", text: "Grösse eines Routing Table Entry (RTE)" },
                { label: "26", text: "so viele RTE passen in eine RIPng-Nachricht" }
              ],
              note: "Der RIPng-Header selbst ist 4 Bytes gross, mit Command und Version."
            } },
            { table: {
              caption: "RIPng-Felder nach den Folien 35 bis 38",
              head: ["Feld", "Bedeutung"],
              rows: [
                ["Command", "1 = request an das Zielsystem, 2 = reply vom Zielsystem zurück"],
                ["Version", "0000 0001"],
                ["Route Tag", "weitere Information zur Route, etwa dass sie aus BGP-4 gelernt wurde"],
                ["Metric", "Wert 0xFF (255) bedeutet: Der IPv6-Prefix dieses RTE ist eine Next-Hop-Adresse"]
              ],
              marks: { "3,1": "focus" },
              note: "Neben den angeforderten Antworten gibt es «untasked responses», nämlich die periodisch gesendeten Routing-Updates."
            } },
            { callout: { tone: "warn", title: "Der eigentliche Schwachpunkt (Folie 37)", text: "RIPng sendet **alle 30 Sekunden die komplette Routing-Tabelle** an alle Nachbarn. Die Folie nennt das ausdrücklich als einen Grund, warum RIP für grosse Router-Netze nicht gut geeignet ist: Es erzeugt schlicht zu viel Verkehr. Genau hier setzt EIGRP an." } }
          ],
          remember: "RIPng: RFC 2080, UDP 521, gleicher Bellman Ford, max. 15, Hop-Kosten konfigurierbar (2 → 7 doppelte Hops), 26 RTE in 524 Bytes, AD 120, Metrik 0xFF = Next-Hop-Adresse, alle 30 s die ganze Tabelle."
        },
        {
          type: "checkpoint",
          id: "cp-ripng",
          title: "Checkpoint: RIPv2 message format and RIPng",
          questions: [
            {
              id: "ripng-port",
              type: "type",
              prompt: "Which UDP port does RIPng use?",
              accept: ["521", "UDP 521", "port 521"],
              placeholder: "number",
              explanation: "RIPng uses UDP port 521, RIP for IPv4 uses 520."
            },
            {
              id: "rte-count",
              type: "single",
              prompt: "A RIPng message offers 524 bytes and one RTE needs 20 bytes. How many RTEs fit into one message?",
              options: ["26", "25", "20", "32"],
              correct: 0,
              explanation: "524 / 20 = 26. For RIPv2 the limit is 25 entries of 20 bytes each, so do not mix up the two numbers."
            },
            {
              id: "ripng-same",
              type: "multi",
              prompt: "What stays the same between RIP for IPv4 and RIPng?",
              options: [
                "The Bellman Ford algorithm",
                "The maximum metric of 15",
                "The administrative distance of 120",
                "The update interval of 30 seconds",
                "The UDP port number"
              ],
              correct: [0, 1, 2, 3],
              explanation: "Only the port differs: 520 for RIP, 521 for RIPng."
            },
            {
              id: "ripv2-afi",
              type: "single",
              prompt: "In a RIPv2 entry the Address Family Indicator is set to 0xFFFF. What does that indicate?",
              options: [
                "Authentication is present",
                "The entry carries an IP address",
                "The route is unreachable",
                "The entry is the last one in the message"
              ],
              correct: 0,
              explanation: "0x0002 indicates IP, 0xFFFF indicates that authentication is present."
            },
            {
              id: "ripng-cost",
              type: "single",
              prompt: "RIPng lets you set the cost per layer 3 hop manually. If you set it to 2, what is the practical limit?",
              options: [
                "7 «double» hops, because the maximum metric of 15 still applies",
                "30 hops, because the limit doubles as well",
                "15 hops, the setting has no effect on the limit",
                "There is no limit any more"
              ],
              correct: 0,
              explanation: "The ceiling of 15 stays. With a cost of 2 per hop only 7 hops fit below it, which is exactly the example on slide 33."
            }
          ]
        },

        /* ================= EIGRP ================= */
        {
          type: "slide",
          title: "Folien 42–43 — Von IGRP zu EIGRP",
          body: [
            "EIGRP hat einen Vorgänger, und der Vergleich erklärt, warum EIGRP so aussieht, wie es aussieht:",
            { compare: {
              left: { title: "IGRP (Folie 42)", points: [
                "Cisco-proprietär, entwickelt in den 1980er-Jahren",
                "**classful** routing, kein CIDR",
                "**keine** variable length subnet masks (VLSM)",
                "Routing-Updates alle **90 Sekunden**",
                "eher Distance Vector als Link State",
                "Support endete mit IOS 12.3 im Jahr 2005"
              ] },
              right: { title: "EIGRP (Folie 43)", points: [
                "Cisco-proprietär ab 1992, **Open Standard 2013**, RFC 7868",
                "**classless**, CIDR wird unterstützt",
                "VLSM wird unterstützt",
                "nur **inkrementelle** Updates statt periodischer",
                "partielle Erneuerung der Routing-Tabellen, schnelle Konvergenz",
                "zusätzlicher Faktor in der Metrik-Formel"
              ] },
              verdict: "Die Folie nennt drei Hauptunterschiede: classful gegen classless, ein zusätzlicher Faktor im Metrik-Kalkül, und inkrementelle statt vollständiger Updates."
            } },
            { callout: { tone: "tip", title: "Kleine Stolperfalle aus der Folie", text: "Cisco IOS ist das **Internetwork Operating System** der Router. Die Folie weist ausdrücklich darauf hin, es nicht mit Apples iOS auf dem iPhone zu verwechseln." } }
          ],
          remember: "IGRP: classful, kein VLSM, Updates alle 90 s, Support bis IOS 12.3 (2005). EIGRP: classless, VLSM, CIDR, inkrementelle Updates, seit 2013 Open Standard in RFC 7868."
        },
        {
          type: "slide",
          title: "Folien 44–46 — Nachbarschaft, drei Tabellen und DUAL",
          body: [
            "EIGRP arbeitet grundlegend anders als RIP: Es schickt nicht blind die ganze Tabelle in die Gegend, sondern baut zuerst eine **Nachbarschaft** auf und meldet danach nur noch Änderungen.",
            { flow: { steps: [
              { title: "Hello", text: "alle 5 Sekunden, per Multicast oder Unicast, braucht keine Bestätigung" },
              { title: "Nachbar werden", text: "wer ein Hello hört, versucht Nachbar des anderen Routers zu werden" },
              { title: "Update", text: "als Init Set, Routes Sent und End of Table, in TLVs verpackt" },
              { title: "ACK", text: "jedes Update-Paket wird einzeln bestätigt" }
            ], note: "Erst nach dieser Nachbarschaft werden Routen überhaupt verarbeitet und in die Routing Information Base (RIB) aufgenommen." } },
            { cards: [
              { title: "Neighbor table", text: "wer sind meine direkten EIGRP-Nachbarn?" },
              { title: "Topology table", text: "welche Wege kenne ich insgesamt?" },
              { title: "Routing table", text: "welcher Weg wird tatsächlich benutzt?" }
            ] },
            { callout: { tone: "def", title: "DUAL, Diffusing Update Algorithm (Folie 46)", text: [
              "EIGRP benutzt **DUAL**, um die günstigsten Wege zu allen erreichbaren Zielen zu konstruieren.",
              "DUAL garantiert, dass jeder konstruierte Pfad **schleifenfrei** ist. Erreicht wird das dadurch, dass Update-Nachrichten nur an die Router gehen, die von einer Topologieänderung **betroffen** sind. Nicht betroffene Router werden in die Neuberechnung gar nicht einbezogen.",
              "Dadurch ist die Konvergenzzeit sehr kurz, weil wenig Overhead entsteht."
            ] } },
            { callout: { tone: "exam", title: "Die Zahlen, die man sich merken muss", text: "**Hello alle 5 Sekunden.** Nach **16 fehlenden ACK-Nachrichten** wird ein Nachbar aus der Neighbor table entfernt. Multicast **224.0.0.10** für IPv4 und **FF02::A** für IPv6, transportiert über Ciscos **RTP** (Reliable Transport Protocol)." } },
            { reveal: {
              question: "RIP schickt alle 30 Sekunden die ganze Tabelle, EIGRP alle 5 Sekunden ein Hello. Erzeugt EIGRP damit nicht viel mehr Verkehr?",
              label: "Überlegung aufdecken",
              answer: [
                "Nein, im Gegenteil. Ein **Hello** ist eine winzige Nachricht, die nur sagt «ich bin noch da». Sie enthält keine Routing-Information und braucht nicht einmal eine Bestätigung.",
                "Die teuren Nachrichten sind die **Updates**, und genau die verschickt EIGRP nur bei neuen Netzen oder Topologieänderungen. Es gibt **keine periodischen Updates und keine vollständigen Tabellen-Updates**.",
                "Bei RIP ist es umgekehrt: Die teure Nachricht, die komplette Tabelle, geht alle 30 Sekunden raus, auch wenn sich nichts geändert hat. Das ist der Punkt, den Folie 37 als Grund gegen RIP in grossen Netzen nennt."
              ]
            } }
          ],
          remember: "EIGRP: Hello alle 5 s ohne ACK, 16 fehlende ACKs → Nachbar weg, mcast 224.0.0.10 bzw. FF02::A über RTP. Drei Tabellen: Neighbor, Topology, Routing. DUAL baut schleifenfreie Pfade und bezieht nur betroffene Router ein."
        },
        {
          type: "slide",
          title: "Folien 47–49 — Die EIGRP-Metrik rechnen",
          body: [
            "Das ist der Rechenteil der Vorlesung und zugleich Lernziel 3. EIGRP benutzt **Bandwidth** und **Delay** statt eines blossen Hop-Zählers.",
            { formula: {
              main: "Metric = 256 × ( BW_EIGRP + Σ DLY_EIGRP )",
              parts: [
                { label: "BW_EIGRP", text: "10^7 geteilt durch die **kleinste** Bandbreite auf dem Pfad, in kbit/s" },
                { label: "Σ DLY_EIGRP", text: "Summe aller Delays der ausgehenden Interfaces, in µs geteilt durch 10" },
                { label: "256 ×", text: "fester Skalierungsfaktor" }
              ],
              note: "Entscheidend: Bei der Bandbreite zählt nur der langsamste Link des ganzen Pfads, bei den Delays wird aufsummiert."
            } },
            { table: {
              caption: "Die Werte-Tabelle von Folie 47",
              head: ["Interface", "BW in bps", "BW in kbps", "BW_EIGRP", "Delay in µs", "DLY_EIGRP"],
              rows: [
                ["Serial", "64'000", "64", "156'250", "20'000", "2'000"],
                ["Serial", "1'544'000", "1'544", "6'477", "20'000", "2'000"],
                ["10 Mbps", "10'000'000", "10'000", "1'000", "1'000", "100"],
                ["100 Mbps", "100'000'000", "100'000", "100", "100", "10"],
                ["1 Gbps", "1'000'000'000", "1'000'000", "10", "10", "1"],
                ["10 Gbps", "10'000'000'000", "10'000'000", "1", "10", "1"]
              ],
              marks: { "2,3": "focus", "3,3": "focus", "2,5": "focus", "3,5": "focus" },
              note: "Blau die vier Werte, die im Rechenbeispiel der Folie 49 gebraucht werden."
            } },
            "Und so rechnet die Folie 49 das Beispiel durch. Drei ausgehende Interfaces in Flussrichtung, Links mit 100, 100 und 10 Mbit/s:",
            { table: {
              caption: "Rechenbeispiel von Folie 49",
              head: ["Schritt", "Rechnung", "Ergebnis"],
              rows: [
                ["Langsamster Link bestimmen", "10 Mbit/s auf dem Pfad", "entscheidet die Bandbreite"],
                ["BW_EIGRP", "10^7 / 10'000 kbit/s", "1'000"],
                ["Delays summieren", "10 + 100 + 10", "120"],
                ["Metrik", "( 1'000 + 120 ) × 256", "286'720"]
              ],
              marks: { "3,2": "good" }
            } },
            { reveal: {
              question: "Rechne selbst: Ein Pfad besteht aus drei 100-Mbit/s-Links. Wie gross ist die EIGRP-Metrik?",
              label: "Rechnung prüfen",
              answer: [
                "**BW_EIGRP:** Der langsamste Link ist 100 Mbit/s, also 100'000 kbit/s. 10^7 / 10^5 = **100**.",
                "**Σ DLY_EIGRP:** Ein 100-Mbit/s-Interface hat laut Tabelle DLY_EIGRP = 10. Drei ausgehende Interfaces ergeben 10 + 10 + 10 = **30**.",
                "**Metrik:** ( 100 + 30 ) × 256 = 130 × 256 = **33'280**.",
                "Zum Vergleich: Das Beispiel der Folie kommt auf 286'720, weil dort ein einziger 10-Mbit/s-Link den Wert BW_EIGRP von 100 auf 1'000 hochtreibt. Ein einziger langsamer Link verschlechtert also den ganzen Pfad."
              ]
            } },
            { callout: { tone: "warn", title: "Widerspruch auf Folie 48", text: "Die Folie zeigt die vollständige Composite-Metric-Formel mit den Konstanten K1 bis K5 und schreibt zweierlei: einmal «Often, K2 and K4 are = 0 and K5 = 1», was zur vereinfachten Formel von Folie 47 führt, und einmal «By default, K1 and K3 have a value of 1, and K2, K4, and K5 are set to 0». Beide Sätze stehen auf derselben Folie. Für die Rechnung gilt die **vereinfachte Form** von Folie 47, die Composite-Formel musst du nur einordnen können." } }
          ],
          remember: "Metric = 256 × (BW_EIGRP + Σ DLY_EIGRP). BW_EIGRP = 10^7 / kleinste Bandbreite in kbit/s. DLY_EIGRP = Delay in µs / 10, über alle ausgehenden Interfaces summiert. Beispiel der Folie: (1'000 + 120) × 256 = 286'720."
        },
        {
          type: "slide",
          title: "Folien 50–52 und 56 — Pakete, Transport und der EIGRP-Steckbrief",
          body: [
            "Folie 50 ergänzt, dass jede Update-Nachricht die Metriken **pro Subnetz** mitführt und diese bei jedem Hop aktualisiert werden. So kann jeder Router mit DUAL unabhängig den kürzesten Weg bestimmen.",
            { table: {
              caption: "EIGRP-Pakettypen nach Folie 51",
              head: ["Typ", "Opcode", "Name", "Funktion", "Transport"],
              rows: [
                ["1", "5", "Hello", "Entdeckung von EIGRP-Nachbarn und Erkennen, wenn ein Nachbar nicht mehr verfügbar ist", "multicast"],
                ["2", "5", "Request / ACK", "bestimmte Information von Nachbarn holen, Empfang eines EIGRP-Pakets bestätigen", "unicast"],
                ["3", "1", "Update", "Routing- und Erreichbarkeitsinformation übertragen", "multicast oder unicast"],
                ["4", "3", "Query", "Nachfrage bei Nachbarn", "–"],
                ["5", "–", "Reply", "Antwort auf eine Query", "–"]
              ],
              note: "Die Folie listet fünf Pakettypen. Zu Query und Reply nennt sie keine weiteren Details."
            } },
            "Folie 52 zeigt, wie EIGRP transportiert wird, und hier wird es interessant:",
            { table: {
              caption: "EIGRP-Kapselung nach Folie 52",
              head: ["Bestandteil", "IPv4", "IPv6"],
              rows: [
                ["Vorangehender Header", "IPv4 Header, 20 Bytes", "IPv6 Header, 40 Bytes"],
                ["EIGRP Header", "20 Bytes", "20 Bytes"],
                ["Danach", "ein oder mehrere TLVs", "ein oder mehrere TLVs"],
                ["Multicast-Adresse", "224.0.0.10", "FF02::A"]
              ]
            } },
            { callout: { tone: "warn", title: "Achtung, 88 ist kein Port", text: "Folie 51 spricht von «port number 88», Folie 52 hält aber ausdrücklich fest, dass EIGRP **nicht in TCP oder UDP eingekapselt** wird, sondern Ciscos RTP direkt über Layer 3 nutzt, und zeigt im IPv6-Bild «Next Header EIGRP (88)». Die 88 ist also die **Protokollnummer** auf Layer 3, nicht eine Portnummer auf Layer 4. Merke dir die Zahl, aber ordne sie richtig ein." } },
            { table: {
              caption: "EIGRP-Steckbrief nach Folie 56",
              head: ["Eigenschaft", "Wert"],
              rows: [
                ["Metriken", "Bandwidth und Delay"],
                ["Updates", "partielle Erneuerung der Routing-Tabellen, inkrementell"],
                ["Hello-Intervall", "5 Sekunden (Standard)"],
                ["VLSM und CIDR", "werden unterstützt"],
                ["Administrative Distance", "90 als IGP, 170 als EGP"],
                ["IP-Versionen", "IPv4 und IPv6"],
                ["Standardisierung", "Open Standard 21 Jahre nach der ersten Veröffentlichung, RFC 7868"],
                ["Schicht", "läuft über dem Network Layer (Layer 3)"],
                ["Maximaler Hop-Count", "bis zu 256 möglich"]
              ],
              marks: { "4,1": "focus", "8,1": "focus" }
            } },
            { reveal: {
              question: "Ein Netz hat 40 Router in einer Kette. Welches der drei Protokolle dieser Vorlesung kommt überhaupt infrage?",
              label: "Antwort aufdecken",
              answer: [
                "Nur **EIGRP**. RIP und RIPng sind bei **15 Hops** am Ende, ein 40 Hops tiefes Netz lässt sich damit nicht abbilden.",
                "EIGRP erlaubt laut Folie 56 Hop-Counts **bis zu 256**. Dazu kommt, dass EIGRP keine periodischen Volltabellen verschickt, was bei 40 Routern den entscheidenden Unterschied im Verkehrsaufkommen macht.",
                "Und die Konvergenz: RIP bräuchte ohne triggered updates rund 39 × 30 s, also über 19 Minuten. EIGRP konvergiert mit DUAL deutlich schneller, weil nur betroffene Router rechnen."
              ]
            } }
          ],
          remember: "Fünf Pakettypen: Hello, Request/ACK, Update, Query, Reply. EIGRP-Header 20 Bytes, nicht in TCP/UDP, Protokollnummer 88, RTP über Layer 3. AD 90 als IGP und 170 als EGP, Hop-Counts bis 256."
        },
        {
          type: "checkpoint",
          id: "cp-eigrp",
          title: "Checkpoint: EIGRP",
          questions: [
            {
              id: "eigrp-metrics",
              type: "multi",
              prompt: "Which statements about EIGRP are correct according to slides 43, 44 and 56?",
              options: [
                "EIGRP uses bandwidth and delay as metrics",
                "EIGRP sends Hello messages every 5 seconds",
                "EIGRP sends only incremental updates, no periodic full table updates",
                "EIGRP supports VLSM and CIDR",
                "EIGRP sends its complete routing table every 30 seconds"
              ],
              correct: [0, 1, 2, 3],
              explanation: "Sending the complete table every 30 seconds is RIP behaviour, and slide 37 names it as a reason why RIP does not scale."
            },
            {
              id: "eigrp-calc",
              type: "type",
              prompt: "A path has a slowest link of 10 Mbit/s and outgoing interface delays summing to DLY_EIGRP = 120. What is the EIGRP metric? (number only)",
              accept: ["286720", "286'720", "286.720", "286 720"],
              placeholder: "number",
              explanation: "BW_EIGRP = 10^7 / 10'000 = 1'000. Metric = (1'000 + 120) × 256 = 286'720. This is exactly the example on slide 49."
            },
            {
              id: "eigrp-bw",
              type: "single",
              prompt: "Which bandwidth on the path determines BW_EIGRP?",
              options: [
                "The lowest bandwidth on the whole path",
                "The highest bandwidth on the whole path",
                "The average of all link bandwidths",
                "The bandwidth of the first outgoing interface"
              ],
              correct: 0,
              explanation: "Only the slowest link counts for the bandwidth part. The delays, in contrast, are summed over all outgoing interfaces."
            },
            {
              id: "eigrp-dual",
              type: "single",
              prompt: "What does DUAL guarantee, and how?",
              options: [
                "Loop free paths, by involving only the routers affected by a topology change",
                "The shortest path in hops, by flooding the whole network",
                "Encrypted updates, by using RTP",
                "Backwards compatibility with IGRP"
              ],
              correct: 0,
              explanation: "Routers that are not affected are not involved in the recalculation, which keeps the overhead and the convergence time low."
            },
            {
              id: "eigrp-ad",
              type: "type",
              prompt: "What is the administrative distance of EIGRP as an IGP? (number only)",
              accept: ["90", "AD 90"],
              placeholder: "number",
              explanation: "90 as an IGP and 170 as an EGP. RIP and RIPng both have 120."
            }
          ]
        },

        /* ================= Abschluss ================= */
        {
          type: "slide",
          title: "Die drei Protokolle im direkten Vergleich",
          body: [
            "Diese Tabelle ist dein Nachschlagewerk für die Prüfung. Alle Werte stammen aus den Folien 21, 33, 39 und 56.",
            { table: {
              caption: "RIP, RIPng und EIGRP nebeneinander",
              head: ["Eigenschaft", "RIP (IPv4)", "RIPng (IPv6)", "EIGRP"],
              rows: [
                ["Typ", "Distance Vector", "Distance Vector", "Distance Vector mit DUAL"],
                ["Algorithmus", "Bellman Ford", "Bellman Ford", "DUAL"],
                ["Metrik", "Hop-Count", "Hop-Count", "Bandwidth und Delay"],
                ["Max. Hops", "15", "15", "bis zu 256"],
                ["Transport", "UDP", "UDP", "RTP direkt über Layer 3"],
                ["Port bzw. Nummer", "UDP 520", "UDP 521", "Protokollnummer 88"],
                ["Administrative Distance", "120", "120", "90 (IGP), 170 (EGP)"],
                ["Updates", "ganze Tabelle alle 30 s", "ganze Tabelle alle 30 s", "nur inkrementell bei Änderung"],
                ["Hello", "–", "–", "alle 5 s"],
                ["Multicast", "–", "–", "224.0.0.10 bzw. FF02::A"],
                ["RFC", "2453", "2080", "7868"]
              ],
              marks: { "3,1": "warn", "3,2": "warn", "3,3": "good", "7,1": "warn", "7,2": "warn", "7,3": "good" },
              note: "Rot markiert die beiden Schwächen von RIP, grün die entsprechenden Stärken von EIGRP."
            } }
          ],
          remember: "Die Merkzahlen: RIP 520 / 15 / 120, RIPng 521 / 15 / 120, EIGRP 88 / 256 / 90 bzw. 170. RFCs: 2453, 2080, 7868."
        },
        {
          type: "slide",
          title: "Das muss ich nach dieser Vorlesung können",
          body: [
            "Hak ab, was sitzt. Was offen bleibt, weisst du, wo du es nachlesen musst.",
            { checklist: { title: "Kann ich das jetzt?", items: [
              "Ich kann erklären, was ein **Routing-Protokoll** ist und wodurch sich einfache von anspruchsvollen unterscheiden.",
              "Ich kann sagen, welches Problem **Bellman Ford** löst und warum RIP ihn statt Dijkstra verwendet.",
              "Ich kann die Formel **d(i,j) = min[d(i,k) + d(k,j)]** erklären und auf ein kleines Netz anwenden.",
              "Ich kann das Bellman-Ford-Beispiel der Vorlesung nachrechnen und begründen, warum C = 2 und E = −2 herauskommt.",
              "Ich kenne den **RIP-Steckbrief**: Hop-Count, max. 15, 16 = unendlich, UDP 520, AD 120.",
              "Ich kann die vier **RIP-Timer** nennen: 30, 180, 180 und 240 Sekunden, und sagen, was jeder bewirkt.",
              "Ich kann erklären, warum ein RIP-Netz pro 30 Sekunden nur **einen Hop** weiterlernt.",
              "Ich kann **RIP und RIPng** gegenüberstellen und nenne mindestens drei Unterschiede.",
              "Ich kann ausrechnen, dass **26 RTE** in eine RIPng-Nachricht passen, und erklären warum.",
              "Ich kann **IGRP von EIGRP** unterscheiden, vor allem classful gegen classless.",
              "Ich kann erklären, was **DUAL** tut und warum EIGRP dadurch schnell konvergiert.",
              "Ich kann die **EIGRP-Metrik** von Hand rechnen, inklusive der Regel, dass nur der langsamste Link zählt.",
              "Ich kenne die **Administrative Distances**: RIP und RIPng 120, EIGRP 90 bzw. 170."
            ] } }
          ],
          remember: "Dreizehn Punkte. Was nicht abgehakt ist, kommt auf den Wiederholungsstapel."
        },
        {
          type: "slide",
          title: "Transfer: drei Szenarien zum Selberdenken",
          body: [
            "Diese Fälle stehen so nicht auf den Folien. Sie verbinden mehrere Konzepte, und genau das wird in Prüfungen gern verlangt.",
            { reveal: {
              question: "**Szenario 1.** In einem RIP-Netz fällt eine Leitung aus. Ein Techniker beschwert sich, dass die Router nach zwei Minuten immer noch die alte Route anzeigen. Ist das ein Defekt?",
              label: "Analyse aufdecken",
              answer: [
                "Nein, das ist normales RIP-Verhalten. Ein Eintrag wird erst **ungültig**, wenn **180 Sekunden** lang kein Update dafür eingetroffen ist. Nach zwei Minuten, also 120 Sekunden, ist dieser Timer noch nicht abgelaufen.",
                "Danach bekommt der Eintrag die Metrik **16**, gilt also als unerreichbar. Gelöscht wird er aber erst nach dem **Flush-Timer von 240 Sekunden**.",
                "Dazu kommt der **Hold-Down-Timer von 180 Sekunden**, während dessen der Router bewusst keine positiven Meldungen für diese Route annimmt. Das ist kein Fehler, sondern Absicht: Es verhindert, dass veraltete Information im Netz wieder auflebt.",
                "Genau diese Trägheit ist der Grund, warum modernere Protokolle **triggered updates** nutzen und EIGRP mit DUAL arbeitet."
              ]
            } },
            { reveal: {
              question: "**Szenario 2.** Zwei Pfade führen zum selben Ziel. Pfad A besteht aus zwei Links mit 10 Mbit/s, Pfad B aus vier Links mit 1 Gbit/s. Welchen Pfad wählt RIP, welchen EIGRP, und welcher ist der bessere?",
              label: "Analyse aufdecken",
              answer: [
                "**RIP** zählt nur Hops und nimmt **Pfad A** mit 2 Hops statt Pfad B mit 4 Hops. Das ist die schlechtere Wahl, denn der Pfad ist auf 10 Mbit/s begrenzt.",
                "**EIGRP** rechnet mit Bandwidth und Delay. Für Pfad A ist der langsamste Link 10 Mbit/s, also BW_EIGRP = 10^7 / 10'000 = **1'000**. Für Pfad B ist der langsamste Link 1 Gbit/s, also 10^7 / 1'000'000 = **10**. Schon vor den Delays liegt Pfad B um Faktor 100 besser.",
                "Mit den Delays aus der Tabelle: Pfad A ergibt (1'000 + 100 + 100) × 256 = **307'200**. Pfad B ergibt (10 + 1 + 1 + 1 + 1) × 256 = **3'584**. EIGRP wählt also klar Pfad B.",
                "Das ist genau der Unterschied, den Folie 9 ankündigt: Ein Parameter gegen mehrere Parameter."
              ]
            } },
            { reveal: {
              question: "**Szenario 3.** Ein Kollege will RIPng einsetzen und die Kosten pro Hop auf 3 setzen, weil das Netz 20 Router tief ist. Funktioniert das?",
              label: "Analyse aufdecken",
              answer: [
                "Nein, es macht die Lage sogar schlimmer. Die manuell konfigurierbaren Hop-Kosten **erhöhen die Obergrenze nicht**, sie bleibt bei **15**.",
                "Bei Kosten von 3 pro Hop sind nur noch **5 Hops** möglich, weil 5 × 3 = 15. Das Beispiel der Folie zeigt dasselbe mit dem Wert 2 und 7 Hops.",
                "Für ein 20 Router tiefes Netz ist RIPng grundsätzlich ungeeignet, schon mit den Standardkosten von 1 pro Hop. Hier braucht es ein Protokoll ohne diese enge Grenze, zum Beispiel **EIGRP** mit Hop-Counts bis 256.",
                "Die konfigurierbaren Kosten sind dafür gedacht, **langsame Strecken teurer zu machen**, nicht dafür, grössere Netze zu ermöglichen."
              ]
            } }
          ],
          remember: "Transfer: RIP-Timer erklären scheinbare Defekte. Hop-Count gegen Bandwidth/Delay entscheidet die Pfadwahl. Konfigurierbare RIPng-Kosten senken die erreichbare Hop-Zahl, sie erhöhen sie nicht."
        },
        {
          type: "slide",
          title: "Was war nur Zusatzwissen?",
          body: [
            "Damit du deine Lernzeit richtig verteilst. Diese Punkte solltest du einordnen können, sie brauchen aber nicht denselben Aufwand:",
            { list: [
              "**Die Literaturhinweise auf den Folien 11, 40 und 57.** Buchempfehlungen zum Weiterlesen, kein Prüfungsstoff.",
              "**Die unteren Zeilen der Übersichtstabelle auf Folie 10**, also Novell IPX, Apple Talk, DECnet Phase V und ISO-CLNS. Historische Einordnung. Relevant sind die Zeilen IPv4 und IPv6.",
              "**Die Detailfelder des EIGRP-Headers auf den Folien 53 bis 55**, etwa Sequence und Acknowledgement. Du musst wissen, dass der EIGRP-Header 20 Bytes hat und dass danach TLVs folgen.",
              "**Die vollständige Composite-Metric-Formel mit K1 bis K5 auf Folie 48.** Du musst wissen, dass sie existiert und dass die vereinfachte Form von Folie 47 daraus entsteht. Rechnen musst du mit der vereinfachten Form.",
              "**Die kaskadierte Metrikberechnung auf Folie 50.** Die Idee genügt: Jede Update-Nachricht führt Metriken pro Subnetz mit, und sie werden bei jedem Hop aktualisiert."
            ] },
            { callout: { tone: "tip", title: "Faustregel für diese Vorlesung", text: "Investiere die Zeit dort, wo der Dozent mehrere Folien für dasselbe Thema verwendet hat: **sieben Folien** für das Bellman-Ford-Beispiel, **vier** für die EIGRP-Metrik, **drei** für das RIPv2-Format und **drei** für das RIPng-Format." } }
          ],
          remember: "Nice to know: Literaturhinweise, historische Protokollzeilen, EIGRP-Headerfelder im Detail, die K1-bis-K5-Formel, die kaskadierte Metrikberechnung."
        },
        {
          type: "checkpoint",
          id: "cp-final",
          title: "Exam check: the whole lecture",
          questions: [
            {
              id: "final-compare",
              type: "multi",
              prompt: "Which values are correct?",
              options: [
                "RIP uses UDP port 520, RIPng uses UDP port 521",
                "RIP and RIPng both have an administrative distance of 120",
                "EIGRP has an administrative distance of 90 as an IGP",
                "EIGRP allows hop counts up to 256",
                "RIPng allows hop counts up to 256"
              ],
              correct: [0, 1, 2, 3],
              explanation: "RIPng keeps the maximum metric of 15, exactly like RIP for IPv4. Only EIGRP goes up to 256."
            },
            {
              id: "final-path",
              type: "single",
              prompt: "Path A has two 10 Mbit/s links, path B has four 1 Gbit/s links. Which path does plain RIP choose, and is it the better one?",
              options: [
                "Path A, because it has fewer hops, and it is the worse choice in terms of throughput",
                "Path B, because RIP prefers faster links",
                "Path A, and it is also the better choice",
                "RIP cannot decide between the two"
              ],
              correct: 0,
              explanation: "RIP counts hops only. That is precisely the weakness EIGRP addresses by using bandwidth and delay."
            },
            {
              id: "final-order",
              type: "order",
              prompt: "Put the EIGRP neighbour setup in the right order (slides 44 and 45).",
              items: [
                "Hello packets are sent every 5 seconds",
                "A router that hears a Hello tries to become a neighbour",
                "Once neighboured, routers send Update packets",
                "Each Update packet is acknowledged by an ACK packet"
              ],
              explanation: "Only after the neighbour relationship exists are routes processed and added to the RIB."
            },
            {
              id: "final-timer",
              type: "type",
              prompt: "After how many seconds without an update does a RIP entry become invalid? (number only)",
              accept: ["180", "180 s", "180 seconds", "180s"],
              placeholder: "number",
              explanation: "180 seconds. The entry then gets metric 16, and it is flushed after the flush timer of 240 seconds."
            },
            {
              id: "final-why-rip-fails",
              type: "multi",
              prompt: "Why is RIP not well suited for large router networks? Pick the reasons the slides actually give.",
              options: [
                "The maximum metric of 15 limits the depth of the network",
                "The complete routing table is sent every 30 seconds, which generates too much traffic",
                "Without triggered updates the information advances only one hop per update interval",
                "RIP cannot be configured on Cisco routers"
              ],
              correct: [0, 1, 2],
              explanation: "Slide 24 shows the Cisco IOS configuration for RIP, so the last option is wrong."
            }
          ]
        }
      ]
    },
    {
      id: "w5",
      number: 5,
      title: "Routing Part 2: OSPF, OSPFv3, IS-IS",
      status: "ready",
      items: [

        /* ================= Orientierung ================= */
        {
          type: "slide",
          title: "Folien 2–4: Die Geschichte von Routing Part 2",
          body: [
            "In Teil 1 hast du RIP, RIPng und EIGRP kennengelernt. RIP und EIGRP sind **Distance-Vector**-Protokolle: Jeder Router kennt nur, was ihm die Nachbarn über Distanzen erzählen. Teil 2 schaut sich laut Folie 2 Protokolle an, die **flexibler sind und besser skalieren**. Beide sind **Link-State**-Protokolle: Jeder Router kennt die ganze Topologie und rechnet die Wege selbst aus.",
            { flow: {
              steps: [
                { title: "Link State statt Distanz", text: "Jeder Router sammelt den Zustand aller Links in seiner LSDB" },
                { title: "Dijkstra", text: "Jeder Router rechnet sich als Wurzel den SPF-Baum" },
                { title: "Kosten aus Bitrate", text: "OSPF-Metrik = Referenzbandbreite / Bitrate" },
                { title: "Areas", text: "Grosse Netze in Bereiche teilen, Backbone 0.0.0.0" },
                { title: "OSPFv3 und IS-IS", text: "dasselbe Prinzip für IPv6 und direkt auf Layer 2" }
              ],
              note: "Der rote Faden: Ein Algorithmus (Dijkstra), zwei Protokolle (OSPF und IS-IS), die ihn in grossen Netzen nutzen."
            } },
            { callout: { tone: "exam", title: "Learning Objectives (Folie 3)", text: [
              "… describe and **apply** the dynamical routing protocol **OSPF**",
              "… know the **characteristics** of the **IS-IS** protocol",
              "Dazu kommen eine Übung und ein Lab zu OSPF. Für IS-IS gibt es laut Folie 64 **kein Lab**, die CLI-Befehle musst du dort nicht können."
            ] } },
            { callout: { tone: "tip", title: "Zur Sprache", text: "Die Erklärungen sind auf Deutsch, die Fragen in den Checkpoints auf Englisch, wie in der Prüfung. Die Begründungen nach dem Prüfen sind wieder auf Deutsch." } }
          ],
          remember: "Teil 2: Link-State-Protokolle OSPF und IS-IS. OSPF anwenden können (inkl. Dijkstra und Kosten), IS-IS charakterisieren können."
        },

        /* ================= 5. OSPF Grundlagen ================= */
        {
          type: "slide",
          title: "Folien 6–7 und 10: Der OSPF-Steckbrief",
          body: [
            "**OSPF** steht für **Open Shortest Path First**. Es wird innerhalb eines Autonomous Systems eingesetzt, ist also ein **Interior Gateway Protocol (IGP)**. Anders als RIP ist es kein distanz-, sondern ein **zustandsorientiertes** Protokoll: ein **Link-State Routing Protocol**.",
            { table: {
              caption: "Die Fakten, die man zu OSPF kennen muss (Folien 6, 7 und 10)",
              head: ["Eigenschaft", "OSPF"],
              rows: [
                ["Einsatz", "innerhalb eines AS (IGP)"],
                ["Typ", "Link State"],
                ["Transport", "direkt in IP, **kein UDP oder TCP**, IP-Protokollnummer **89**"],
                ["Versionen", "OSPFv2 für IPv4, OSPFv3 (OSPFng) für IPv6"],
                ["Algorithmus", "Dijkstra, Pfadkosten aus der Bandbreite der Links"],
                ["Hop Count", "mehr als 15 Hops möglich"],
                ["Router-ID", "32 Bit"],
                ["Updates", "sofort nach einer Änderung, sonst alle 30 Minuten (1'800 s)"],
                ["VLSM und CIDR", "unterstützt"],
                ["Administrative Distance", "**110** (Cisco)"],
                ["Eignung", "kürzere Konvergenzzeit und grössere Routing-Tabellen als RIP, für grosse und sehr grosse Netze"]
              ],
              marks: { "2,1": "focus", "9,1": "focus" }
            } },
            { compare: {
              left: { title: "RIP (Teil 1)", points: ["Distance Vector", "Metrik: Hop Count, max. 15", "Transport über UDP", "AD 120"] },
              right: { title: "OSPF", points: ["Link State", "Metrik: Kosten aus der Bitrate, mehr als 15 Hops möglich", "direkt in IP, Protokollnummer 89", "AD 110"] },
              verdict: "OSPF ist das Protokoll für grosse Netze: schneller konvergent, grössere Tabellen, kein Hop-Limit von 15."
            } },
            { callout: { tone: "warn", title: "Widerspruch auf Folie 6", text: "Folie 6 schreibt, OSPF-Pakete gehörten zu «layer 4 / Network Layer». Die Network Layer ist aber Schicht 3. Die Vergleichstabelle auf Folie 67 ordnet OSPF bei der Encapsulation korrekt **Layer 3** zu (OSPF > IP > Ethernet). Gemeint ist: OSPF hat keinen eigenen Transport-Layer, es sitzt direkt auf IP." } },
            { reveal: {
              question: "Ein Kollege sucht in Wireshark nach OSPF mit dem Filter «UDP-Port 89». Warum findet er nichts?",
              label: "Antwort aufdecken",
              answer: [
                "OSPF nutzt **gar kein UDP**. Die OSPF-Daten stecken direkt im IP-Paket, und die **89** steht im Feld **Protocol** des IPv4-Headers (bei IPv6 im Feld Next Header). Es ist eine Protokollnummer, kein Port.",
                "Zum Vergleich aus Teil 1: RIP läuft über UDP-Port 520."
              ]
            } }
          ],
          remember: "OSPF: IGP, Link State, direkt in IP mit Protokollnummer 89 (kein UDP/TCP), Dijkstra, AD 110, mehr als 15 Hops, Updates sofort bei Änderung und sonst alle 30 Minuten."
        },
        {
          type: "slide",
          title: "Folien 8–9 und 27: Vom LSA zur Routing-Tabelle",
          body: [
            "Jeder OSPF-Router führt eine **Link State Database (LSDB)**. Sie enthält die Routing-Information **aller Router** im AS. Diese Information beschreibt den **Zustand der Verbindungen** und wird mit **Link State Advertisements (LSA)** verteilt. Zu Beginn **flutet** jeder Router das Netz mit seinen LSAs.",
            { flow: {
              steps: [
                { title: "1. Flooding", text: "«Hello, ich bin RX und erreiche RY und RZ über Fast Ethernet»" },
                { title: "2. Topology DBs", text: "Alle Topologie-Datenbanken entstehen" },
                { title: "3. Dijkstra", text: "Jeder Router rechnet mit sich selbst als Wurzel die kürzesten Wege" },
                { title: "4. SPF-Baum", text: "Pro Router entsteht ein Baum mit ihm als Root" },
                { title: "5. Routing-Tabelle", text: "Aus dem Baum wird die Routing-Tabelle gebaut" }
              ],
              note: "Folie 27. Der Baum heisst Shortest-Path-First tree (SPF tree)."
            } },
            { table: {
              caption: "Kosten der ausgehenden Links im Beispielnetz (Folie 8)",
              head: ["Router", "Kosten der angeschlossenen Links"],
              rows: [
                ["R1", "Link1 = 2, Link3 = 6, Link4 = 2"],
                ["R2", "Link1 = 1, Link2 = 4, Link6 = 2"],
                ["R3", "Link2 = 4, Link3 = 2, Link5 = 3, Link7 = 2"],
                ["R4", "Link4 = 3, Link5 = 2"],
                ["R5", "Link6 = 2, Link7 = 3"]
              ],
              note: "Wichtig: Die Kosten gelten pro **ausgehendem** Interface. Derselbe Link kann in beide Richtungen verschieden teuer sein (Link1: von R1 aus 2, von R2 aus 1)."
            } },
            { table: {
              caption: "Daraus berechnete LSDB von Router 2 (Folie 9)",
              head: ["Subnetz", "Forwarding via", "Port", "Metrik"],
              rows: [
                ["Subnet 1", "direct", "e1", "1"],
                ["Subnet 2", "direct", "e2", "4"],
                ["Subnet 6", "direct", "e3", "2"],
                ["Subnet 3", "R3", "e2", "6"],
                ["Subnet 4", "R1", "e1", "3"],
                ["Subnet 7", "R5", "e3", "6"],
                ["Subnet 5", "R1", "e1", "5"]
              ],
              marks: { "3,1": "focus", "3,3": "focus" }
            } },
            { reveal: {
              question: "Warum erreicht R2 das Subnet 3 über R3 mit Metrik 6 und nicht über R1?",
              label: "Rechnung aufdecken",
              answer: [
                "Über **R3**: R2 sendet über Link2 (Kosten 4), R3 über Link3 (Kosten 2). Summe **6**.",
                "Über **R1**: R2 sendet über Link1 (Kosten 1), R1 über Link3 (Kosten 6). Summe **7**.",
                "Der Weg über R3 ist billiger, obwohl der erste Schritt teurer ist. Genau so denkt Dijkstra: Es zählt die Summe, nicht der erste Hop."
              ]
            } },
            { callout: { tone: "warn", title: "Widerspruch zwischen Tabelle und Grafik (Folien 8–9)", text: "Die Tabelle auf Folie 8 gibt für R5 **Link7 = 3** an, die Grafik zeigt am R5 bei Link7 eine **4**. Die LSDB von R2 auf Folie 9 nennt für Subnet 7 die Metrik **6 über R5**, also 2 + 4, passend zur Grafik. Mit dem Tabellenwert 3 wäre es 5. In Aufgaben gilt der Wert, der in der Aufgabe steht." } }
          ],
          remember: "LSDB = Zustand aller Links im AS, verteilt per LSA (Flooding). Jeder Router rechnet mit Dijkstra und sich als Wurzel den SPF-Baum und baut daraus seine Routing-Tabelle. Kosten gelten pro ausgehendem Interface und werden entlang des Pfads addiert."
        },
        {
          type: "checkpoint",
          id: "cp-ospf-basics",
          title: "Checkpoint: OSPF basics",
          questions: [
            {
              id: "transport",
              type: "single",
              prompt: "How are OSPFv2 packets transported?",
              options: [
                "Directly inside IP packets, with protocol number 89",
                "Inside UDP datagrams on port 520",
                "Inside TCP segments on port 89",
                "Directly inside Ethernet frames, without IP"
              ],
              correct: 0,
              explanation: "OSPF verwendet kein Transportprotokoll. Die 89 ist die Protokollnummer im IP-Header (Folie 6). UDP 520 ist RIP, direkt auf Layer 2 läuft IS-IS."
            },
            {
              id: "characteristics",
              type: "multi",
              prompt: "Which statements about OSPF are correct?",
              options: [
                "OSPF is an Interior Gateway Protocol",
                "OSPF is a link-state routing protocol",
                "Hop counts above 15 are possible",
                "Each router only knows the distance vectors of its neighbours",
                "OSPF supports neither VLSM nor CIDR"
              ],
              correct: [0, 1, 2],
              explanation: "OSPF ist ein IGP und ein Link-State-Protokoll, und mehr als 15 Hops sind möglich (Folien 6–7). Nur die Distanzen der Nachbarn zu kennen ist Distance Vector, also RIP. VLSM und CIDR werden unterstützt (Folie 10)."
            },
            {
              id: "lsdb-steps",
              type: "order",
              prompt: "Put the five steps from slide 27 in the correct order.",
              items: [
                "Flood the link-state information to the neighbours",
                "Build all topology databases",
                "Each router computes the shortest paths with itself as root (Dijkstra)",
                "A tree is established for each router as root",
                "Build the routing table from this tree"
              ],
              explanation: "Erst wird geflutet, dann entstehen die Topologie-Datenbanken, dann rechnet jeder Router mit Dijkstra, daraus entsteht der SPF-Baum, und aus dem Baum die Routing-Tabelle."
            },
            {
              id: "ad",
              type: "type",
              prompt: "What is the administrative distance of OSPF on Cisco routers? (number only)",
              accept: ["110"],
              placeholder: "number",
              explanation: "OSPF hat die Administrative Distance 110 (Folien 6, 10 und 26). Zum Vergleich: EIGRP 90, IS-IS 115, RIP 120."
            }
          ]
        },

        /* ================= Kosten und Dijkstra ================= */
        {
          type: "slide",
          title: "Folie 11: Die OSPF-Kosten berechnen",
          body: [
            "Kriterium für die Pfadwahl ist die **Bitrate** des Links. Die Kosten berechnen sich aus einer **Referenzbandbreite** geteilt durch die Bitrate. Standard ist 10⁸, also eine 1 mit acht Nullen.",
            { formula: {
              main: "cost = 10⁸ / Bitrate des Links (in bit/s)",
              parts: [
                { label: "10⁸", text: "Referenzbandbreite, entspricht 100 Mbit/s" },
                { label: "Bitrate", text: "Bitrate des ausgehenden Links" },
                { label: "Pfadkosten", text: "Summe der Kosten aller Links entlang des Pfads" }
              ],
              note: "Laut Folie geht das so nur bis Fast Ethernet (100 Mbit/s) sinnvoll."
            } },
            { table: {
              caption: "Kosten mit Referenz 10⁸ und mit Referenz 10¹⁰ (Folie 11)",
              head: ["Link", "Bitrate", "cost bei 10⁸", "cost bei 10¹⁰"],
              rows: [
                ["Leased line", "512 kbit/s", "196", "–"],
                ["Ethernet", "10 Mbit/s", "10", "1'000"],
                ["Fast Ethernet", "100 Mbit/s", "1", "100"],
                ["Gigabit Ethernet", "1 Gbit/s", "1", "10"],
                ["10 Gigabit Ethernet", "10 Gbit/s", "1", "1"]
              ],
              marks: { "2,2": "bad", "3,2": "bad", "4,2": "bad", "2,3": "good", "3,3": "good", "4,3": "good" },
              note: "Rot: Mit 10⁸ bekommen Fast Ethernet, Gigabit und 10 Gigabit alle die Kosten 1. Grün: Mit 10¹⁰ unterscheiden sie sich."
            } },
            { callout: { tone: "exam", title: "auto-cost reference-bandwidth", text: [
              "Mit dem Standard kann OSPF **Fast Ethernet und schnellere Links nicht unterscheiden**. Abhilfe schafft auf Cisco-Routern der Befehl **auto-cost reference-bandwidth**.",
              "Diese Einstellung muss **auf allen Routern der OSPF-Domain gleich** sein. Sonst rechnen die Router mit verschiedenen Massstäben."
            ] } },
            { callout: { tone: "warn", title: "Rundung bei 512 kbit/s", text: "Rechnerisch ergibt 10⁸ / 512'000 = 195.3. Die Folie schreibt 196. Für die Prüfung zählt die Formel, nicht die Rundungsregel. Der Text nennt ausserdem «Fast Ethernet (1'000), Gigabit Ethernet (10'000), 10 Gigabit Ethernet (100'000)». Diese Zahlen steigen mit der Geschwindigkeit, es sind also angepasste Bandbreitenwerte und keine Kosten. Die Kosten mit Referenz 10¹⁰ stehen in der Tabelle: 100, 10 und 1. Rechne mit dem Wert, den die Aufgabe vorgibt." } },
            { reveal: {
              question: "Eigene Rechnung: Ein Pfad besteht aus einem Ethernet-Link (10 Mbit/s) und zwei Fast-Ethernet-Links. Wie hoch sind die Pfadkosten bei Referenz 10⁸?",
              label: "Rechnung aufdecken",
              answer: [
                "Ethernet: 10⁸ / 10⁷ = **10**. Fast Ethernet: 10⁸ / 10⁸ = **1**, zweimal.",
                "Pfadkosten = 10 + 1 + 1 = **12**."
              ]
            } }
          ],
          remember: "cost = 10⁸ / Bitrate. 10 Mbit/s = 10, 100 Mbit/s und schneller = 1. Für schnellere Links auto-cost reference-bandwidth erhöhen, und zwar auf allen Routern gleich."
        },
        {
          type: "slide",
          title: "Folien 12–13: Der Shortest-Path-Algorithmus von Dijkstra",
          body: [
            "Die Wegberechnung beruht auf der **Gesamtinformation aller Verbindungskosten** im Netz. Der Algorithmus stammt von **Edsger W. Dijkstra** (1957 und 1959). Gegeben ist die Topologie mit den Kosten, gesucht sind die optimalen Wege.",
            { flow: {
              steps: [
                { title: "Wurzel wählen", text: "Ein Knoten C ist die Wurzel" },
                { title: "Menge Q", text: "Q enthält die Knoten, deren kürzester Weg schon feststeht" },
                { title: "Nachbarn prüfen", text: "Alle Knoten ausserhalb Q, die einen Hop von Q entfernt sind" },
                { title: "Kürzesten wählen", text: "Den kürzesten Weg von C aus festlegen, längere Wege streichen" },
                { title: "Wiederholen", text: "bis zu allen Knoten der kürzeste Weg bekannt ist" }
              ],
              note: "Folie 13 in eigenen Worten."
            } },
            { compare: {
              left: { title: "Bellman Ford (Teil 1, RIP)", points: ["Distance Vector", "Router kennt nur, was die Nachbarn melden", "Information wandert Hop für Hop"] },
              right: { title: "Dijkstra (OSPF, IS-IS)", points: ["Link State", "Router kennt die ganze Topologie aus der LSDB", "Jeder Router rechnet selbst den ganzen Baum"] },
              verdict: "Beide suchen kürzeste Wege. Der Unterschied ist, wo das Wissen liegt: verteilt bei den Nachbarn oder vollständig in jedem Router."
            } },
            { callout: { tone: "tip", title: "Merkbild", text: "Dijkstra ist wie ein Wasserfleck, der sich vom Wurzelknoten aus ausbreitet: Er erreicht immer zuerst den Knoten, der insgesamt am nächsten liegt, und dieser Abstand steht dann fest." } }
          ],
          remember: "Dijkstra: Von der Wurzel aus immer den insgesamt nächsten noch offenen Knoten festlegen, dann dessen Nachbarn neu bewerten. Wiederholen, bis alle Knoten drin sind."
        },
        {
          type: "slide",
          title: "Folien 14–21: Dijkstra Schritt für Schritt, Wurzel C",
          body: [
            "Das Beispielnetz der Folie 14 hat sieben Router. Die Zahlen an den Leitungen sind die OSPF-Kosten.",
            { table: {
              caption: "Connection database (Folie 14)",
              head: ["Link", "Kosten"],
              rows: [
                ["A–B", "6"], ["A–D", "2"], ["B–C", "2"], ["B–E", "4"], ["C–F", "2"],
                ["C–G", "5"], ["D–E", "2"], ["E–F", "1"], ["F–G", "1"]
              ]
            } },
            { table: {
              caption: "Was sich in der LSDB von Router C pro Schritt ändert (Folien 15–21)",
              head: ["Schritt", "Neu im Pfad", "Änderung in der LSDB"],
              rows: [
                ["1", "C (Wurzel)", "B direct 2, F direct 2, G direct 5"],
                ["2", "B", "neu: E via B 6, A via B 8"],
                ["3", "F", "G via F 3 (statt 5), E via F 3 (statt 6)"],
                ["4", "G", "keine Änderung"],
                ["5", "E", "neu: D via F 5"],
                ["6", "A", "A via F 7 (statt 8)"],
                ["7", "D", "keine Änderung, alle Knoten im Pfad"]
              ],
              marks: { "2,2": "focus", "5,2": "focus" }
            } },
            { table: {
              caption: "Endergebnis: LSDB von Router C (Folie 21)",
              head: ["Destination", "Forwarding", "Metric", "Pfad"],
              rows: [
                ["B", "direct", "2", "C–B"],
                ["F", "direct", "2", "C–F"],
                ["G", "F", "3", "C–F–G"],
                ["E", "F", "3", "C–F–E"],
                ["A", "F", "7", "C–F–E–D–A"],
                ["D", "F", "5", "C–F–E–D"]
              ],
              marks: { "2,1": "good", "4,1": "good" },
              note: "«Forwarding» ist der nächste Router, nicht das Ziel. Zu A geht es zuerst zu F, obwohl A am anderen Ende liegt."
            } },
            { callout: { tone: "warn", title: "Reihenfolge auf den Folien 20–21", text: "Nach Dijkstra wird immer der nächste offene Knoten aufgenommen. Nach Schritt 5 sind das D mit 5 und A mit 8, also müsste **D vor A** kommen. Erst über D (5 + 2) entsteht die 7 für A. Die Folien nehmen A in Schritt 6 auf und schreiben dort schon 7, D erst in Schritt 7. Das **Endergebnis ist trotzdem richtig**. Lerne die Regel, nicht die Reihenfolge der Folien." } },
            { reveal: {
              question: "Warum geht der Weg von C zu G über F (Kosten 3), obwohl C eine direkte Leitung zu G hat?",
              label: "Antwort aufdecken",
              answer: [
                "Die direkte Leitung kostet **5**. Über F kostet es C–F (2) plus F–G (1) = **3**.",
                "OSPF wählt nach den **Gesamtkosten**, nicht nach der Anzahl Hops. Zwei billige Links schlagen einen teuren."
              ]
            } },
            { reveal: {
              question: "Und warum geht der Weg von C zu A nicht über B, obwohl B ein direkter Nachbar von A ist?",
              label: "Antwort aufdecken",
              answer: [
                "Über B: C–B (2) plus B–A (6) = **8**.",
                "Über F, E und D: 2 + 1 + 2 + 2 = **7**. Der längere Weg mit vier Hops ist billiger und gewinnt."
              ]
            } }
          ],
          remember: "Dijkstra von C aus: B 2, F 2, G 3 (via F), E 3 (via F), D 5 (via F), A 7 (via F). Forwarding = nächster Hop. Endergebnis zählt, die Reihenfolge auf den Folien 20–21 weicht von Dijkstra ab."
        },
        {
          type: "slide",
          title: "Folien 22–23 und 32: Wer rechnet, wann wird aktualisiert, und ECMP",
          body: [
            "Das Beispiel hat nur Router C als Wurzel betrachtet. **Jeder Router** muss sich selbst als Wurzel nehmen, um alle optimalen Wege im Netz zu kennen. Das ist relativ **zeitaufwendig**. Die Berechnung übernehmen die **Route Processors** auf den Routern (Folie 22).",
            { cards: [
              { title: "Ohne Änderung", text: "Routing Updates alle 30 Minuten (1'800 s), auch wenn sich nichts geändert hat" },
              { title: "Einstellbar", text: "Der Administrator kann das Intervall bis auf 120 Minuten (7'200 s) erhöhen" },
              { title: "Bei Änderung", text: "Jede Änderung löst sofort Routing Updates per LSA aus, danach startet der Timer wieder bei 0", tone: "good" }
            ] },
            { callout: { tone: "def", title: "Equal Cost Multipath (ECMP), Folie 32", text: [
              "Haben zwei Wege **dieselben Kosten**, können beide in die Routing-Tabelle. Bei zwei Links mit gleicher Bitrate trägt jeder **50 %** der Last.",
              "Die Entscheidung fällt **pro Hop** in einem einzelnen Router, indem flussbezogene Daten im Paket-Header gehasht werden. So landen verschiedene Flows auf verschiedenen Wegen. Spezifiziert in **RFC 2992**.",
              "Bei **verschiedener Bitrate** ist keine Lastteilung möglich, dann gilt die normale OSPF-Berechnung."
            ] } },
            { reveal: {
              question: "Im Netz ändert sich um 10:00 die Bandbreite eines Links. Wann wird das nächste periodische Update ohne weitere Änderung fällig, wenn das Standardintervall gilt?",
              label: "Antwort aufdecken",
              answer: [
                "Die Änderung löst **sofort** ein Update per LSA aus. Danach startet der Timer **wieder bei 0**.",
                "Ohne weitere Änderung kommt das nächste periodische Update also 30 Minuten später, um **10:30**."
              ]
            } }
          ],
          remember: "Jeder Router rechnet seinen eigenen SPF-Baum. Updates sofort bei Änderung (Timer neu ab 0), sonst alle 30 Minuten, einstellbar bis 120 Minuten. ECMP: gleiche Kosten, Last 50/50, Entscheidung pro Hop per Hash."
        },
        {
          type: "checkpoint",
          id: "cp-cost-dijkstra",
          title: "Checkpoint: Cost and Dijkstra",
          questions: [
            {
              id: "cost-10m",
              type: "type",
              prompt: "With the default reference bandwidth of 10^8, what is the OSPF cost of a 10 Mbit/s Ethernet link? (number only)",
              accept: ["10"],
              placeholder: "number",
              explanation: "10⁸ / 10⁷ = 10 (Folie 11)."
            },
            {
              id: "fast-links",
              type: "single",
              prompt: "Why can default OSPF costs not distinguish Fast Ethernet, Gigabit Ethernet and 10 Gigabit Ethernet, and what is the fix?",
              options: [
                "All three get cost 1. Raise the reference bandwidth with auto-cost reference-bandwidth, consistently on all routers.",
                "All three get cost 1. Raise the reference bandwidth only on the router with the fastest links.",
                "OSPF uses the hop count, so the bitrate never matters.",
                "OSPFv2 distinguishes them automatically, the problem only exists in RIP."
              ],
              correct: 0,
              explanation: "Mit 10⁸ ergibt jede Bitrate ab 100 Mbit/s die Kosten 1. Die Referenz muss in der ganzen OSPF-Domain gleich gesetzt werden, sonst rechnen die Router mit unterschiedlichen Massstäben (Folie 11)."
            },
            {
              id: "a-to-c",
              type: "type",
              prompt: "Use the example network of slides 14–21 with router A as root. What is the total cost of the shortest path from A to C? (number only)",
              accept: ["7"],
              placeholder: "number",
              explanation: "A–D–E–F–C = 2 + 2 + 1 + 2 = 7. Über B wären es 6 + 2 = 8. Das Ergebnis ist symmetrisch zu C → A, weil die Kosten hier in beide Richtungen gleich sind."
            },
            {
              id: "forwarding-d",
              type: "single",
              prompt: "In the final LSDB of router C (slide 21), which entry is in the column «Forwarding» for destination D?",
              options: ["F", "E", "B", "direct"],
              correct: 0,
              explanation: "Der Pfad ist C–F–E–D mit Kosten 5. «Forwarding» nennt den nächsten Router, also F."
            },
            {
              id: "updates",
              type: "multi",
              prompt: "Which statements about OSPF routing updates are correct?",
              options: [
                "Without any change, updates are sent every 30 minutes",
                "A change, for example of a link's bandwidth, triggers updates immediately",
                "The update interval can be raised to up to 120 minutes",
                "Like RIP, OSPF sends its whole table every 30 seconds"
              ],
              correct: [0, 1, 2],
              explanation: "Folien 10 und 23: alle 30 Minuten ohne Änderung, sofort bei einer Änderung, einstellbar bis 120 Minuten. 30 Sekunden ist das Intervall von RIP aus Teil 1."
            }
          ]
        },

        /* ================= Nachrichten und LSA ================= */
        {
          type: "slide",
          title: "Folien 24 und 41: Die fünf OSPF-Nachrichtentypen",
          body: [
            "LSAs sind nur **eine** von fünf Nachrichtenarten. Alle OSPF-Nachrichten gehen an die Multicast-Adresse **224.0.0.5** (Folie 24).",
            { table: {
              caption: "OSPF Message Types (Folien 24 und 41)",
              head: ["Typ", "Name", "Zweck"],
              rows: [
                ["1", "Hello", "Nachbarschaften (Adjacencies) aufbauen und erhalten. Damit werden auch Designated Router und Backup Designated Router gewählt."],
                ["2", "Database Description (DBD)", "Beschreibt den Inhalt der LSDB, wird beim Aufbau der Adjacency ausgetauscht."],
                ["3", "Link State Request (LSR)", "Fordert bestimmte Teile der LSDB an, also geänderte oder fehlende LSAs."],
                ["4", "Link State Update (LSU)", "Transportiert die LSAs, als Antwort auf einen Request oder beim Flooding."],
                ["5", "Link State Acknowledgement", "Bestätigt den Empfang eines LSA. Die Bestätigung ist Pflicht."]
              ],
              marks: { "3,1": "focus" }
            } },
            { flow: {
              steps: [
                { title: "Hello", text: "Wer ist mein Nachbar?" },
                { title: "DBD", text: "Was steht in deiner Datenbank?" },
                { title: "LSR", text: "Schick mir, was mir fehlt" },
                { title: "LSU", text: "Hier sind die LSAs" },
                { title: "LSAck", text: "Erhalten" }
              ],
              note: "Merkhilfe in der Reihenfolge der Typnummern. Adjacencies sind laut Folie 41 physisch direkt verbundene Router."
            } },
            { callout: { tone: "exam", title: "Prüfungsfalle", text: "Ein **LSA** ist kein eigener Pakettyp. LSAs werden in **Typ 4, Link State Update**, transportiert. Der OSPF-Header auf Folie 28 zeigt genau das: Packet Type 4 = Link State Update." } }
          ],
          remember: "Typ 1 Hello, 2 Database Description, 3 Link State Request, 4 Link State Update (trägt die LSAs), 5 Link State Acknowledgement. Ziel: Multicast 224.0.0.5."
        },
        {
          type: "slide",
          title: "Folien 25–26: Was ein Link State ist, und wie man eine Route liest",
          body: [
            "Ein **Link** ist hier das Netzwerk-Interface eines Routers, zum Beispiel Ethernet, Gigabit Ethernet oder seriell. Der **Link State** umfasst den Interface-Typ, die **IPv4-Adresse mit Maske**, die **an diesem Interface angeschlossenen Router** und die **Kosten** des Interfaces. Alle Link States zusammen sind die **LSDB**.",
            { table: {
              caption: "Eine Zeile aus «show ip route», zerlegt (Folie 26)",
              head: ["Teil", "Bedeutung"],
              rows: [
                ["172.33.3.0", "Zielsubnetz, auch Prefix genannt"],
                ["[110/84]", "110 = Administrative Distance, 84 = Kosten"],
                ["via 172.33.1.2", "über diese IP-Adresse ist das Ziel erreichbar (Next Hop)"],
                ["00:12:23", "Alter des Eintrags (h:min:s)"],
                ["Ethernet 2", "Port, über den das Ziel erreicht wird"]
              ],
              marks: { "1,0": "focus", "1,1": "focus" }
            } },
            { table: {
              caption: "Administrative Distance je Quelle (Folien 26 und 54)",
              head: ["Quelle", "AD"],
              rows: [["static", "1"], ["EIGRP", "90"], ["OSPF", "110"], ["IS-IS", "115"], ["RIP", "120"]],
              note: "Kleinere AD gewinnt, wenn zwei Protokolle dasselbe Ziel kennen. Die AD hängt nur vom Protokoll ab, nicht von Hop Count oder Bandbreite."
            } },
            { callout: { tone: "warn", title: "Tippfehler auf Folie 26", text: "Die Folie nennt für «unknown» den Wert 155. Auf Cisco-Routern hat eine unbekannte Quelle die AD **255**, das heisst: Diese Route wird nie benutzt. 155 ist vermutlich ein Tippfehler. Der Verweis «see slide 22» passt ebenfalls nicht zu dieser Folie." } },
            { reveal: {
              question: "Ein Router kennt dasselbe Ziel von RIP und von OSPF. Welche Route kommt in die Routing-Tabelle?",
              label: "Antwort aufdecken",
              answer: [
                "Die **OSPF-Route**, weil OSPF mit 110 die kleinere Administrative Distance hat als RIP mit 120.",
                "Die Kosten der beiden Protokolle werden dabei nicht verglichen. Sie sind in verschiedenen Einheiten gerechnet (Hops gegen Bitrate)."
              ]
            } }
          ],
          remember: "Link State = Interface-Typ, IP und Maske, angeschlossene Router, Kosten. [110/84] = AD 110, Kosten 84. AD: static 1, EIGRP 90, OSPF 110, IS-IS 115, RIP 120. Kleinere AD gewinnt."
        },
        {
          type: "slide",
          title: "Folien 30–31: LSA-Typen und der Designated Router",
          body: [
            "Innerhalb der LSAs gibt es wieder mehrere Typen. Die Folie fokussiert auf einige davon. Wichtig ist vor allem, **wer** welches LSA erzeugt.",
            { table: {
              caption: "LSA-Typen in OSPFv2 (Folie 31)",
              head: ["LS Type", "Name", "Erzeugt von"],
              rows: [
                ["1", "Router LSA", "jedem internen Router der Area"],
                ["2", "Network LSA", "dem Designated Router (DR)"],
                ["3", "Summary LSA (Routen zu Netzen)", "dem Area Border Router (ABR)"],
                ["4", "Summary LSA (Routen zu AS Boundary Routern)", "dem Area Border Router (ABR)"],
                ["5", "AS-external LSA", "dem AS Boundary Router (ASBR)"],
                ["7", "NSSA External LSA", "dem ASBR in einer Not-so-stubby Area"]
              ]
            } },
            { callout: { tone: "def", title: "Designated Router (DR)", text: [
              "In einem **Multiaccess-Netz**, also wenn mehr als ein Router am selben LAN hängt, informiert nur der **Designated Router** über Änderungen. Er erzeugt die LSAs vom Typ 2.",
              "Beispiel der Folie 30: Der DR RC informiert RX über die Existenz von RB und dessen IP-Adresse. Typ-2-LSAs werden nur in der Area geflutet, die dieses Netz enthält."
            ] } },
            { callout: { tone: "tip", title: "Not-so-stubby Area (NSSA)", text: "Eine NSSA ist eine Art Stub Area, die externe Routen eines AS **importieren** und an andere Areas weitergeben kann, aber selbst keine AS-externen Routen aus anderen Areas **empfängt** (Folie 31)." } }
          ],
          remember: "LSA 1 jeder Router, LSA 2 der DR, LSA 3 und 4 der ABR, LSA 5 der ASBR, LSA 7 der ASBR in einer NSSA. Der DR meldet Änderungen im Multiaccess-LAN."
        },
        {
          type: "checkpoint",
          id: "cp-messages",
          title: "Checkpoint: Messages, LSAs and route entries",
          questions: [
            {
              id: "msg-order",
              type: "order",
              prompt: "Order the five OSPF message types by their type number (1 to 5).",
              items: ["Hello", "Database Description", "Link State Request", "Link State Update", "Link State Acknowledgement"],
              explanation: "1 Hello, 2 Database Description, 3 Link State Request, 4 Link State Update, 5 Link State Acknowledgement (Folien 24 und 41)."
            },
            {
              id: "multicast",
              type: "single",
              prompt: "To which address are OSPF messages sent?",
              options: ["224.0.0.5", "224.0.0.10", "255.255.255.255", "The unicast IP address of each neighbour only"],
              correct: 0,
              explanation: "Folie 24: OSPF-Nachrichten gehen an die Multicast-Adresse 224.0.0.5. 224.0.0.10 ist aus Teil 1 die EIGRP-Adresse."
            },
            {
              id: "route-cost",
              type: "type",
              prompt: "In the route entry «172.33.3.0 [110/84] via 172.33.1.2», what is the cost? (number only)",
              accept: ["84"],
              placeholder: "number",
              explanation: "In [110/84] ist 110 die Administrative Distance und 84 die Kosten (Folie 26)."
            },
            {
              id: "lsa-origin",
              type: "multi",
              prompt: "Which statements about the origin of LSAs are correct?",
              options: [
                "Type 1 router LSAs are generated by each internal router of the area",
                "Type 2 network LSAs are generated by the designated router",
                "Type 3 summary LSAs are generated by the area border router",
                "Type 5 AS-external LSAs are generated by the area border router"
              ],
              correct: [0, 1, 2],
              explanation: "Typ 5 erzeugt der AS Boundary Router (ASBR), nicht der ABR (Folie 31)."
            }
          ]
        },

        /* ================= Areas ================= */
        {
          type: "slide",
          title: "Folien 33–36: Areas, Backbone und Flooding Scopes",
          body: [
            "Weil jeder Router seine LSAs in den ganzen **Flooding Scope** verteilt, werden die LSDBs in grossen Netzen sehr gross, und es müssen viele LSAs übertragen werden. Deshalb kann OSPF ein AS in **Areas** aufteilen, jede mit eigenem Flooding Scope. So entsteht eine **Hierarchie**.",
            { cards: [
              { title: "Area-ID", text: "32 Bit, als vier Dezimalzahlen geschrieben, z. B. 1.1.1.1. Hat **nichts mit einer IPv4-Adresse** zu tun." },
              { title: "Backbone Area", text: "ID **0.0.0.0**. Jedes AS hat sie, auch wenn es gar nicht in Areas unterteilt ist. Sie enthält **alle ABR** des AS." },
              { title: "ABR", text: "Area Border Router: verbindet Areas" },
              { title: "ASBR", text: "AS Boundary Router: verbindet Autonomous Systems" }
            ] },
            { table: {
              caption: "Die drei Flooding Scopes am Beispiel der Folie 34",
              head: ["Scope", "LSAs gehen an …", "Beispiel aus Sicht von Router R"],
              rows: [
                ["Link", "nur die direkten Nachbarn", "R1 schickt etwas an R"],
                ["Area", "alle Router der OSPF-Area", "R4 (in derselben Area, aber nicht direkt verbunden) schickt etwas an R"],
                ["AS", "alle Router des Autonomous Systems", "RX (ausserhalb der Area) schickt etwas an R"]
              ]
            } },
            { callout: { tone: "exam", title: "Warum Areas? (Folie 35)", text: [
              "Weniger Rechenaufwand für den SPF-Baum, weil die Topologie einer Area kleiner ist als die des ganzen AS.",
              "Ändert sich die Topologie in einer Area, sind nur die Router dieser Area für die Neuberechnung zuständig.",
              "Die LSDB einer Area enthält nur die Routing-Information dieser Area (Folie 33).",
              "Zwischen zwei Areas nicht zu viele Verbindungen: zwei sind für Redundanz sinnvoll, viele erzeugen viel mehr Konfigurationsverkehr."
            ] } },
            { reveal: {
              question: "Ein kleines Netz wird ohne Areas konfiguriert. Gibt es dann keine Area?",
              label: "Antwort aufdecken",
              answer: [
                "Doch. Laut Folie 36 muss es **mindestens die Backbone Area** geben. Ist ein AS nicht in Areas unterteilt, liegt alles in der Backbone Area **0.0.0.0**."
              ]
            } }
          ],
          remember: "Areas verkleinern LSDB und SPF-Rechnung. Area-ID 32 Bit, keine IPv4-Adresse. Backbone 0.0.0.0 muss existieren und enthält alle ABR. ABR verbindet Areas, ASBR verbindet ASs. Flooding Scopes: Link, Area, AS."
        },
        {
          type: "slide",
          title: "Folie 37: Virtual Links",
          body: [
            "Alle Areas eines OSPF-AS müssen **physisch mit der Backbone Area (Area 0) verbunden** sein. Geht das nicht, verbindet man die Area über einen **Virtual Link** durch eine andere Area mit dem Backbone. Diese Durchgangs-Area heisst **Transit Area** und muss die vollständige Routing-Information haben.",
            { formula: {
              main: "area <area-id> virtual-link <router-id>",
              parts: [
                { label: "<area-id>", text: "ID der Transit Area" },
                { label: "<router-id>", text: "Router-ID des Nachbarn am anderen Ende des Virtual Links" }
              ],
              note: "Cisco-Befehl laut Folie 37."
            } },
            { flow: {
              steps: [
                { title: "Area 7", text: "kein direkter Kontakt zum Backbone" },
                { title: "R2 (1.1.1.1)", text: "zwischen Area 7 und Area 5" },
                { title: "Transit Area 5", text: "Virtual Link führt hier durch" },
                { title: "RW (2.2.2.2)", text: "zwischen Area 5 und Backbone" },
                { title: "Backbone Area 0", text: "Ziel des Virtual Links" }
              ],
              note: "Beispiel der Folie 37: Der Virtual Link verbindet Area 7 durch Area 5 mit dem Backbone."
            } },
            { reveal: {
              question: "Wie lautet der Befehl auf R2 und auf RW für das Beispiel der Folie 37?",
              label: "Antwort aufdecken",
              answer: [
                "Auf **R2**: `area 5 virtual-link 2.2.2.2`, Transit Area 5, Nachbar RW.",
                "Auf **RW**: `area 5 virtual-link 1.1.1.1`, Transit Area 5, Nachbar R2.",
                "Abgeleitet aus der Befehlsbeschreibung der Folie. Die Folie selbst zeigt nur die allgemeine Form."
              ]
            } }
          ],
          remember: "Jede Area muss am Backbone hängen. Sonst Virtual Link durch eine Transit Area: area <Transit-Area-ID> virtual-link <Router-ID des Gegenübers>."
        },
        {
          type: "checkpoint",
          id: "cp-areas",
          title: "Checkpoint: Areas",
          questions: [
            {
              id: "backbone-id",
              type: "type",
              prompt: "What is the area ID of the OSPF backbone area? (dotted decimal)",
              accept: ["0.0.0.0", "area 0", "0", "area 0.0.0.0"],
              placeholder: "x.x.x.x",
              explanation: "Die Backbone Area hat die ID 0.0.0.0, also 32 Nullbits (Folien 33 und 36)."
            },
            {
              id: "asbr",
              type: "single",
              prompt: "Which router connects an OSPF network to another autonomous system?",
              options: ["AS Boundary Router (ASBR)", "Area Border Router (ABR)", "Designated Router (DR)", "Backup Designated Router (BDR)"],
              correct: 0,
              explanation: "Der ASBR verbindet Autonomous Systems, der ABR verbindet Areas innerhalb eines AS (Folie 33). DR und BDR sind Rollen im Multiaccess-LAN."
            },
            {
              id: "scope-order",
              type: "order",
              prompt: "Order the three flooding scopes from the narrowest to the widest.",
              items: ["Link flooding scope", "Area flooding scope", "AS flooding scope"],
              explanation: "Link: nur direkte Nachbarn. Area: alle Router der Area. AS: alle Router des Autonomous Systems (Folie 34)."
            },
            {
              id: "area-reasons",
              type: "multi",
              prompt: "Which are reasons for dividing an OSPF network into areas, according to the lecture?",
              options: [
                "Fewer operations are needed to calculate the SPF tree",
                "A topology change inside an area only concerns the routers of that area",
                "Many links between two areas reduce configuration traffic",
                "The area ID must match the IPv4 subnet of the area"
              ],
              correct: [0, 1],
              explanation: "Kleinere Topologie heisst weniger SPF-Rechnung, und Änderungen bleiben in der Area (Folie 35). Viele Links zwischen Areas erzeugen mehr Konfigurationsverkehr, und die Area-ID hat nichts mit einer IPv4-Adresse zu tun."
            },
            {
              id: "virtual-link",
              type: "single",
              prompt: "Area 7 has no physical connection to area 0. It is only connected to area 5, which is attached to the backbone. What do you configure?",
              options: [
                "A virtual link through transit area 5",
                "Rename area 7 to area 0",
                "An ASBR between area 7 and area 5",
                "Nothing, areas do not need a connection to the backbone"
              ],
              correct: 0,
              explanation: "Jede Area muss mit dem Backbone verbunden sein. Fehlt die physische Verbindung, hilft ein Virtual Link durch eine Transit Area mit vollständiger Routing-Information (Folie 37)."
            }
          ]
        },

        /* ================= OSPFv3 ================= */
        {
          type: "slide",
          title: "Folien 38–39 und 51: OSPFv3 für IPv6, was sich ändert",
          body: [
            "**OSPFv3** ist OSPF für IPv6, spezifiziert in **RFC 5340**. Das Grundprinzip bleibt: LSAs, LSDB, Dijkstra. Geändert hat sich vor allem, **woran** OSPF anknüpft.",
            { compare: {
              left: { title: "OSPFv2 (IPv4)", points: [
                "läuft pro **IP-Subnetz**",
                "ein Link ist durch eine eindeutige **IPv4-Adresse** identifiziert",
                "eigene Authentisierung im OSPF-Header",
                "Header 24 Bytes, Version 2"
              ] },
              right: { title: "OSPFv3 (IPv6)", points: [
                "läuft pro **Link**: Zwei direkt verbundene Router können sich auch ohne gemeinsames Prefix unterhalten",
                "ein Link kann **mehrere IPv6-Prefixe** haben und ist durch eine **32-Bit-Nummer** identifiziert (keine IPv4-Adresse)",
                "Authentisierung über IPv6 **Authentication Header** und **ESP**",
                "Header 16 Bytes, Version 3"
              ] },
              verdict: "OSPFv3 verbindet Interfaces, nicht Subnetze."
            } },
            { cards: [
              { title: "Neue LSAs", text: "Es gibt neue LSAs, die IPv6-Adressen und IPv6-Prefixe transportieren." },
              { title: "Flooding Scope im LSA-Typ", text: "Der Scope ist jetzt als Code im LSA-Type-Feld enthalten. Es gibt weiterhin drei: Link local, Area und AS." },
              { title: "Router-ID und Area-ID", text: "Beide bleiben 32 Bit. Die 128-Bit-IPv6-Adresse steht **nicht** im Header, sondern in der Payload." }
            ] },
            { callout: { tone: "tip", title: "Muster in der LSA-Tabelle (Folie 45)", text: "Ergänzung, auf der Folie nicht ausdrücklich erklärt: Bei den LS-Type-Codes passt die vorderste Ziffer zum Scope. Link-LSA 0x0008 hat Link-Scope, AS-External-LSA 0x4005 hat AS-Scope, die übrigen (0x2001, 0x2002, …) gelten in der Area." } }
          ],
          remember: "OSPFv3: RFC 5340, pro Link statt pro Subnetz, mehrere IPv6-Prefixe pro Link, Link-ID 32 Bit, Authentisierung über IPv6 AH/ESP, Flooding Scope als Code im LSA-Typ, IPv6-Adresse in der Payload statt im Header."
        },
        {
          type: "slide",
          title: "Folien 40–43, 46–47 und 49–50: OSPFv3-Header und was beim Empfang passiert",
          body: [
            { table: {
              caption: "OSPFv3 Message Header, 16 Bytes (Folie 40)",
              head: ["Feld", "Grösse", "Inhalt"],
              rows: [
                ["Version", "1 Byte", "3"],
                ["Packet Type", "1 Byte", "1 Hello, 2 DBD, 3 LSR, 4 LSU, 5 LSAck"],
                ["Packet Length", "2 Bytes", "Länge inklusive Header"],
                ["Router ID", "4 Bytes", "Absender-Router, dotted decimal (z. B. 7.2.3.9), keine IPv4-Adresse"],
                ["Area ID", "4 Bytes", "Area des sendenden Interfaces, Backbone 0.0.0.0"],
                ["Checksum", "2 Bytes", "wie bei IPv6 über das ganze Paket, auf n × 16 Bit aufgefüllt"],
                ["Instance ID", "1 Byte", "Standard 0. Paket wird nur angenommen, wenn es zur Instance ID des Interfaces passt"]
              ],
              marks: { "0,2": "focus", "6,0": "focus" }
            } },
            "OSPFv3 nutzt IPv6 **ohne UDP oder TCP**. Das IPv6-Paket (Header 40 Bytes) trägt im Feld **Next Header den Wert 89**, danach folgt der OSPFv3-Header mit 16 Bytes (Folie 47). Als Absenderadresse verwenden OSPF-Pakete die **Link-Local-Adresse** (FE80::x) des Interfaces. Diese Adresse ist für die Nachbarn zugleich die **Next-Hop-Adresse** (Folie 46).",
            { flow: {
              steps: [
                { title: "IPv6-Header", text: "Adresse, Protocol-Feld, ggf. Authentisierung" },
                { title: "Version", text: "Ist es 3?" },
                { title: "Checksum", text: "stimmt sie?" },
                { title: "Area ID und Instance ID", text: "passen sie zum eigenen Interface?" },
                { title: "Zieladresse", text: "AllDRouters? Dann nur DR und Backup DR" }
              ],
              note: "Folien 49–50: Ankunft eines OSPFv3-Pakets am Interface e0/5 von Router RX."
            } },
            { callout: { tone: "def", title: "Zwei Sonderfälle beim Empfang (Folie 50)", text: [
              "Passt die Area ID nicht zum Interface, ist aber **0.0.0.0**, kann das Paket von einem **Virtual Link** stammen.",
              "Ist das Ziel die Multicast-Adresse **AllDRouters**, nimmt der Router das Paket nur an, wenn er **DR oder Backup DR** ist. Bei anderen Zieladressen muss er das nicht sein."
            ] } }
          ],
          remember: "OSPFv3-Header 16 Bytes, Version 3, mit Router ID, Area ID und Instance ID. In IPv6 mit Next Header 89, kein UDP/TCP. Absender ist die Link-Local-Adresse, sie dient als Next Hop. Empfang: IPv6-Header, Version, Checksum, Area und Instance ID, Zieladresse."
        },
        {
          type: "checkpoint",
          id: "cp-ospfv3",
          title: "Checkpoint: OSPFv3",
          questions: [
            {
              id: "v3-differences",
              type: "multi",
              prompt: "Which statements describe OSPFv3 compared with OSPFv2?",
              options: [
                "OSPFv3 runs on a per-link basis instead of a per-subnet basis",
                "A link can carry more than one IPv6 prefix",
                "Authentication relies on the IPv6 authentication header and ESP",
                "The OSPFv3 header contains the 128-bit IPv6 address of the sending router",
                "A link is identified by its IPv4 address"
              ],
              correct: [0, 1, 2],
              explanation: "Die IPv6-Adresse steht in der Payload, nicht im Header. Ein Link ist in OSPFv3 durch eine 32-Bit-Nummer identifiziert, die keine IPv4-Adresse ist (Folien 38–39 und 51)."
            },
            {
              id: "source-address",
              type: "single",
              prompt: "Which address do OSPFv3 packets use as their source address?",
              options: [
                "The link-local address (FE80::x) of the interface",
                "The global unicast address of the router",
                "The multicast address 224.0.0.5",
                "The 32-bit router ID"
              ],
              correct: 0,
              explanation: "Folie 46: OSPF-Pakete nutzen die Link-Local-Adresse als Absender. Für die Nachbarn ist sie gleichzeitig die Next-Hop-Adresse."
            },
            {
              id: "arrival-order",
              type: "order",
              prompt: "An OSPFv3 packet arrives at interface e0/5. Order the checks as described on slides 49–50.",
              items: [
                "Check the IPv6 header (address, protocol field, authentication)",
                "Check the version number (is it 3?)",
                "Compare the checksums",
                "Check the area ID and the instance ID",
                "Check the destination address (AllDRouters: only DR or backup DR accept)"
              ],
              explanation: "Zuerst prüft der Router den IPv6-Header, dann übergibt er an den OSPF-Prozess. Dieser prüft Version, Checksum, Area und Instance ID und zuletzt die Zieladresse."
            },
            {
              id: "header-length",
              type: "type",
              prompt: "How long is the OSPFv3 message header in bytes? (number only)",
              accept: ["16"],
              placeholder: "number",
              explanation: "Der OSPFv3-Header hat 16 Bytes (Folie 40). Der OSPFv2-Header hat 24 Bytes (Folie 28)."
            }
          ]
        },

        /* ================= 6. IS-IS ================= */
        {
          type: "slide",
          title: "Folien 54–56 und 62: Der IS-IS-Steckbrief",
          body: [
            "**IS-IS** steht für **Intermediate System to Intermediate System**. Es ist wie OSPF ein **Link-State**-Protokoll und ein IGP, kommt aber aus der ISO-Welt. IS-IS wird oft in **Carrier-Netzen** eingesetzt, laut Folie 64 von den meisten Service Providern.",
            { table: {
              caption: "Die Fakten zu IS-IS (Folien 54, 55 und 62)",
              head: ["Eigenschaft", "IS-IS"],
              rows: [
                ["Standards", "ISO 10589 (CLNS), RFC 1195 (IP, Integrated IS-IS), RFC 5308 (IPv6), RFC 5120 (Multi-Topology)"],
                ["Transport", "**direkt in Layer-2-PDUs**, meist Ethernet-Frames, **nicht in IP**"],
                ["Metrik", "Kosten pro **Interface**, manuell konfiguriert, Standard **10**"],
                ["Pfadkosten", "Summe aller ausgehenden Interfaces entlang des Pfads, kleinere gewinnt"],
                ["Narrow Metric", "6 Bit, Werte 0 bis 63"],
                ["Wide Metric", "24 Bit, Werte 0 bis 16'777'215"],
                ["Administrative Distance", "**115**"],
                ["Weiteres", "Areas, VLSM, CIDR, Authentisierung, Multipath (ECMP, Shortest Path Bridging)"]
              ],
              marks: { "1,1": "focus", "2,1": "focus", "6,1": "focus" }
            } },
            { table: {
              caption: "Encapsulation im Vergleich (Folie 56)",
              head: ["Protokoll", "Aufbau des Frames"],
              rows: [
                ["OSPFv2", "Data Link Header (14 B) → IPv4 Header (20 B) → OSPFv2 Header (24 B) → LSA Header + Data → FCS"],
                ["OSPFv3", "Data Link Header (14 B) → IPv6 Header (40 B, Next Header 89) → OSPFv3 Header (16 B) → LSA Header + Data → FCS"],
                ["IS-IS", "Data Link Header (14 B) → IS-IS Common Header (8 B) → Type-Specific Header → IS-IS Data → FCS"]
              ],
              marks: { "2,1": "good" },
              note: "IS-IS braucht kein IP für die eigenen Nachrichten."
            } },
            { callout: { tone: "tip", title: "Konfiguration nur zum Lesen", text: "Folie 62 zeigt `router isis`, `metric-style wide` und `isis metric 50`. Laut Folie 64 gibt es kein IS-IS-Lab, die CLI-Befehle musst du nicht können." } }
          ],
          remember: "IS-IS: Link State, IGP, direkt auf Layer 2 (kein IP), Kosten pro Interface manuell, Standard 10, narrow 6 Bit (0–63), wide 24 Bit, AD 115, typisch bei Carriern."
        },
        {
          type: "slide",
          title: "Folien 57–61: Levels statt Backbone Area",
          body: [
            "IS-IS kennt wie OSPF **Areas**, organisiert sie aber in einer **zweistufigen Hierarchie**.",
            { cards: [
              { title: "Level-1 (L1)", text: "definiert die Areas. Intra-Area-Kommunikation erledigen die L1-Router." },
              { title: "Level-2 (L2)", text: "definiert die Verbindung der Areas. Inter-Area-Kommunikation erledigen die L2-Router." },
              { title: "Level-1-2 (L1L2)", text: "kann beides. Nur L1L2-Router können verschiedene IS-IS-Areas miteinander verbinden.", tone: "good" }
            ] },
            { compare: {
              left: { title: "OSPF", points: ["eigene Backbone Area mit ID 0.0.0.0", "ABR verbinden Areas mit dem Backbone"] },
              right: { title: "IS-IS", points: ["**keine** Area 0.0.0.0", "das zusammenhängende Netz der L2-fähigen Router wirkt als Backbone, heisst aber nicht so"] },
              verdict: "Gleiche Idee, anders gebaut: OSPF hat eine Backbone-Area, IS-IS ein Level-2-Netz."
            } },
            { table: {
              caption: "Das Beispiel der Folien 59–61",
              head: ["Area", "Router und Level"],
              rows: [
                ["Area 1", "R1, R2, R6: L1. R3, R4, R5: L1L2"],
                ["Area 2", "R8, R9: L1. R7, R10: L1L2"],
                ["Area 3", "R11: L2"],
                ["Area 4", "R12, R14: L1. R13: L1L2"],
                ["L2-Netz", "R11 – R5 – R4 – R3 – R7 – R10 – R13"]
              ],
              marks: { "4,1": "focus" }
            } },
            { callout: { tone: "warn", title: "Widerspruch auf Folie 60", text: "Der Text sagt, ein Router könne nur L2-fähig sein, «wie R13 in diesem Beispiel». In der Grafik ist R13 aber als **L1L2** beschriftet, der einzige reine **L2**-Router ist **R11**. Gemeint ist vermutlich R11." } },
            { table: {
              caption: "Die vier IS-IS-Nachrichtenarten (Folie 58)",
              head: ["PDU", "Zweck", "Typnummern L1 / L2"],
              rows: [
                ["Hello (IIH)", "Adjacency aufbauen", "LAN 15 / 16, Point-to-Point 17"],
                ["Link State PDU (LSP)", "den aktuellen Link State melden", "18 / 20"],
                ["Complete Sequence Numbers PDU (CSNP)", "enthält die ganze LSDB eines Routers", "24 / 25"],
                ["Partial Sequence Numbers PDU (PSNP)", "fragt bei abweichenden Einträgen nach", "26 / 27"]
              ],
              note: "Die Typnummern sind Zusatzwissen. Wichtig sind die vier Arten und ihr Zweck."
            } }
          ],
          remember: "IS-IS: L1 = innerhalb der Area, L2 = Verbindung der Areas, nur L1L2 verbindet Areas. Keine Backbone Area 0.0.0.0, das L2-Netz wirkt als Backbone. PDUs: Hello, LSP, CSNP, PSNP."
        },
        {
          type: "slide",
          title: "Folie 63: Shortest Path Bridging (SPB)",
          body: [
            "**Shortest Path Bridging** arbeitet auf **Layer 2** und ist in **IEEE 802.1aq** spezifiziert. Ein SPB-Netz besteht aus einem **Core Network** und mehreren **Edge Switches**.",
            { list: [
              "Das Multipath-Core-Netz wird mit **IS-IS** geroutet.",
              "IS-IS **unterdrückt intern das Spanning Tree Protocol**, damit keine Links blockiert werden.",
              "Die kürzesten Wege auf Layer 2 bestimmt der **Dijkstra**-Algorithmus dynamisch.",
              "Das SPB-Netz verbindet zwei Segmente desselben Netzes und wirkt wie ein **verteilter Layer-2-Switch**."
            ] },
            { callout: { tone: "tip", title: "Einordnung", text: "SPB zeigt, warum IS-IS auf Layer 2 läuft: Es kann auch dort Wege berechnen, wo es gar kein IP-Routing gibt. ECMP aus Folie 32 wurde laut Folie in IEEE 802.1Q-2014 für Shortest Path Bridging übernommen." } }
          ],
          remember: "SPB: IEEE 802.1aq, Layer 2, Core mit IS-IS, kein blockierendes Spanning Tree, Dijkstra, wirkt wie ein verteilter Switch."
        },
        {
          type: "checkpoint",
          id: "cp-isis",
          title: "Checkpoint: IS-IS",
          questions: [
            {
              id: "isis-transport",
              type: "single",
              prompt: "How are IS-IS messages transported?",
              options: [
                "Directly in layer 2 PDUs, usually Ethernet frames, without IP",
                "In IP packets with protocol number 89",
                "In UDP datagrams",
                "In TCP segments"
              ],
              correct: 0,
              explanation: "IS-IS braucht kein IP für seine Nachrichten (Folien 55–56). Protokollnummer 89 ist OSPF."
            },
            {
              id: "isis-default",
              type: "type",
              prompt: "What is the default IS-IS link cost on an interface? (number only)",
              accept: ["10"],
              placeholder: "number",
              explanation: "Standard ist 10 auf allen Interfaces, angepasst wird manuell pro Interface (Folien 54 und 62)."
            },
            {
              id: "isis-levels",
              type: "multi",
              prompt: "Which statements about IS-IS levels are correct?",
              options: [
                "Level-1 defines the areas, intra-area communication is done by L1 routers",
                "Only L1L2 routers can interconnect different IS-IS areas",
                "IS-IS needs a backbone area with the ID 0.0.0.0",
                "Every Level-2 router must also be a Level-1 router"
              ],
              correct: [0, 1],
              explanation: "In IS-IS gibt es keine Area 0.0.0.0, das L2-Netz wirkt als Backbone. Ein Router kann nur L2-fähig sein, wie R11 im Beispiel (Folien 59–61)."
            },
            {
              id: "wide-metric",
              type: "single",
              prompt: "How many bits does an IS-IS wide metric have?",
              options: ["24", "6", "16", "32"],
              correct: 0,
              explanation: "Wide Metric: 24 Bit, Werte bis 16'777'215. Narrow Metric: 6 Bit, Werte 0 bis 63 (Folie 62)."
            },
            {
              id: "isis-ad",
              type: "type",
              prompt: "What is the administrative distance of IS-IS? (number only)",
              accept: ["115"],
              placeholder: "number",
              explanation: "IS-IS hat die AD 115 (Folie 54), liegt also zwischen OSPF (110) und RIP (120)."
            }
          ]
        },

        /* ================= Summary ================= */
        {
          type: "slide",
          title: "Folie 67: Alle vier Protokolle im Vergleich",
          body: [
            "Diese Tabelle verbindet Teil 1 und Teil 2. Sie ist dein Nachschlagewerk für die Prüfung.",
            { table: {
              caption: "Routing Protocols compared (Folie 67)",
              head: ["Eigenschaft", "RIP", "EIGRP", "OSPF", "IS-IS"],
              rows: [
                ["Methode", "Distance Vector", "Distance Vector", "Link State", "Link State"],
                ["Metrik", "Hop Count", "Bandwidth, Delay", "Bitrate des Links", "manuell konfiguriert"],
                ["Algorithmus", "Bellman Ford", "DUAL", "Dijkstra", "Dijkstra"],
                ["Konvergenz", "langsam", "schnell", "schnell", "schnell"],
                ["CIDR/VLSM", "classless (RIPv2)", "classless", "classless", "classless"],
                ["Encapsulation", "Layer 4: RIP > UDP > IP > Ethernet", "Layer 3: EIGRP > IP > Ethernet", "Layer 3: OSPF > IP > Ethernet", "Layer 2: IS-IS > Ethernet"],
                ["Besonderes", "einfach", "schnelle Konvergenz", "Areas, Backbone", "Areas, Level-2-Netz"],
                ["Administrative Distance", "120", "90", "110", "115"],
                ["Zieladresse der Nachrichten", "IP des Nachbarn", "IP des Nachbarn", "224.0.0.5 (Multicast)", "kein IP, Layer 2"]
              ],
              marks: { "0,3": "focus", "0,4": "focus", "2,3": "focus", "2,4": "focus" }
            } },
            { callout: { tone: "warn", title: "Drei Ungenauigkeiten in der Tabelle", text: [
              "Die Zeile «Protocol Type» nennt für alle vier **IGRP**. Gemeint ist **IGP** (Interior Gateway Protocol), wie auf den Folien 6 und 55. IGRP ist das alte Cisco-Protokoll aus Teil 1.",
              "Für IS-IS steht «areas / backbone». Laut Folie 59 heisst das verbindende Netz in IS-IS gerade **nicht** Backbone. Darum steht oben «Level-2-Netz».",
              "Für EIGRP nennt die Tabelle die IP-Adresse des Nachbarn. In Teil 1 wurden EIGRP-Hellos per Multicast (224.0.0.10) oder Unicast verschickt."
            ] } }
          ],
          remember: "Distance Vector: RIP (Bellman Ford, Hops, UDP, AD 120), EIGRP (DUAL, Bandwidth und Delay, AD 90). Link State: OSPF (Dijkstra, Bitrate, IP 89, AD 110), IS-IS (Dijkstra, manuelle Kosten, Layer 2, AD 115)."
        },
        {
          type: "slide",
          title: "Das muss ich nach dieser Vorlesung können",
          body: [
            "Die Folie «Key Learnings» (68) ist in den Unterlagen leer. Diese Liste fasst zusammen, was die Learning Objectives und die Vorlesung verlangen. Hak ab, was sitzt.",
            { checklist: { title: "Kann ich das jetzt?", items: [
              "Ich kann **Link State und Distance Vector** unterscheiden und OSPF und IS-IS richtig zuordnen.",
              "Ich kenne den **OSPF-Steckbrief**: IGP, IP-Protokollnummer 89, kein UDP/TCP, AD 110, 32-Bit-Router-ID.",
              "Ich kann erklären, wie aus **LSAs** die **LSDB**, daraus mit Dijkstra der **SPF-Baum** und daraus die Routing-Tabelle wird.",
              "Ich kann OSPF-Kosten mit **10⁸ / Bitrate** berechnen und erklären, wozu **auto-cost reference-bandwidth** dient.",
              "Ich kann **Dijkstra** auf einem kleinen Netz von Hand rechnen und die LSDB mit Forwarding und Metrik ausfüllen.",
              "Ich weiss, wann OSPF **Updates** sendet: sofort bei Änderung, sonst alle 30 Minuten, einstellbar bis 120.",
              "Ich kann die **fünf Nachrichtentypen** in der richtigen Reihenfolge nennen und weiss, dass LSAs in Typ 4 reisen.",
              "Ich kann eine Zeile wie **[110/84]** lesen und kenne die AD-Werte 1, 90, 110, 115, 120.",
              "Ich weiss, wer welche **LSA-Typen** erzeugt und was ein **Designated Router** ist.",
              "Ich kann **Areas, Backbone 0.0.0.0, ABR und ASBR** erklären und begründen, warum man Areas einführt.",
              "Ich kann die drei **Flooding Scopes** unterscheiden und weiss, wann ein **Virtual Link** nötig ist.",
              "Ich kann mindestens vier Unterschiede zwischen **OSPFv2 und OSPFv3** nennen.",
              "Ich kenne den **IS-IS-Steckbrief**: Layer 2, Kosten manuell, Standard 10, AD 115, narrow und wide metric.",
              "Ich kann die IS-IS-**Levels L1, L2 und L1L2** erklären und sagen, warum IS-IS keine Backbone Area braucht."
            ] } }
          ],
          remember: "Vierzehn Punkte. Was nicht abgehakt ist, kommt auf den Wiederholungsstapel."
        },
        {
          type: "slide",
          title: "Transfer: drei Szenarien zum Selberdenken",
          body: [
            "Diese Fälle stehen so nicht auf den Folien. Sie verbinden mehrere Konzepte, und genau das wird in Prüfungen gern verlangt.",
            { reveal: {
              question: "**Szenario 1.** Ein Netz hat zwei Wege zum Ziel: Weg 1 über einen Link mit 10 Mbit/s, Weg 2 über drei Links mit je 100 Mbit/s. Welchen Weg wählt RIP, welchen OSPF mit Referenz 10⁸?",
              label: "Analyse aufdecken",
              answer: [
                "**RIP** zählt Hops: Weg 1 hat 1 Hop, Weg 2 hat 3. RIP nimmt **Weg 1**.",
                "**OSPF** rechnet Kosten: Weg 1 kostet 10⁸ / 10⁷ = **10**, Weg 2 kostet 3 × 1 = **3**. OSPF nimmt **Weg 2**, also den schnelleren.",
                "Das ist der Kern von Folie 67: Hop Count gegen Bitrate des Links."
              ]
            } },
            { reveal: {
              question: "**Szenario 2.** Ein Administrator setzt auto-cost reference-bandwidth auf zwei von fünf Routern auf einen höheren Wert. Was ist das Problem?",
              label: "Analyse aufdecken",
              answer: [
                "Die Router rechnen dann **mit verschiedenen Massstäben**. Ein Gigabit-Link kostet auf den angepassten Routern mehr als 1, auf den anderen 1. Die Kosten auf einem Pfad werden über alle ausgehenden Interfaces addiert, also mischen sich die Massstäbe.",
                "Folie 11 verlangt deshalb ausdrücklich, dass die Einstellung **auf allen Router-Interfaces der OSPF-Domain gleich** ist."
              ]
            } },
            { reveal: {
              question: "**Szenario 3.** Ein Provider will ein Link-State-Protokoll, dessen eigene Nachrichten nicht von IP abhängen, und das er im Core auch für Shortest Path Bridging nutzen kann. OSPF oder IS-IS?",
              label: "Analyse aufdecken",
              answer: [
                "**IS-IS.** Es wird direkt in Layer-2-PDUs transportiert, braucht also kein IP für die eigenen Nachrichten (Folie 56).",
                "Im SPB-Core routet IS-IS laut Folie 63, und IS-IS wird laut Folie 64 von den meisten Service Providern eingesetzt. OSPF läuft dagegen immer über IP (Protokollnummer 89)."
              ]
            } }
          ],
          remember: "Transfer: Hops gegen Kosten entscheiden die Wegwahl. Die Referenzbandbreite muss überall gleich sein. Layer-2-Unabhängigkeit spricht für IS-IS."
        },
        {
          type: "slide",
          title: "Was war nur Zusatzwissen?",
          body: [
            "Damit du deine Lernzeit richtig verteilst. Diese Punkte solltest du einordnen können, sie brauchen aber nicht denselben Aufwand:",
            { list: [
              "**RFC-Nummern** (2328, 1584, 2740, 5340, 2992, ISO 10589, RFC 1195, 5308, 5120). Gut zu kennen, aber kein Rechenstoff.",
              "**Die Feldgrössen des OSPFv2-Headers und des LSA-Headers (Folien 28–29, 44).** Wichtig ist nur: OSPFv2-Header 24 Bytes, OSPFv3-Header 16 Bytes, LSA-Header 20 Bytes.",
              "**Die LS-Type-Codes von OSPFv3 (Folie 45)** wie 0x2001 oder 0x4005.",
              "**Die IS-IS-PDU-Typnummern und der Common Header (Folie 57)**, etwa Discriminator 0x83.",
              "**Die Jahreszahlen zu Dijkstra (1957, 1959)** und die Literaturhinweise (Folien 52 und 65).",
              "**Die IS-IS-CLI-Befehle (Folie 62).** Laut Folie 64 gibt es dazu kein Lab."
            ] },
            { callout: { tone: "tip", title: "Faustregel für diese Vorlesung", text: "Investiere die Zeit dort, wo der Dozent mehrere Folien verwendet hat: **acht Folien** für das Dijkstra-Beispiel (14–21), **fünf** für Areas, Scopes und Virtual Links (33–37), **mehrere** für OSPFv3 (38–51) und **neun** für IS-IS (54–62)." } }
          ],
          remember: "Nice to know: RFC-Nummern, Header-Felder im Detail, LS-Type-Codes, IS-IS-Typnummern, Jahreszahlen, IS-IS-CLI."
        },
        {
          type: "checkpoint",
          id: "cp-final",
          title: "Exam check: the whole lecture",
          questions: [
            {
              id: "compare-table",
              type: "multi",
              prompt: "Which statements match the comparison table on slide 67?",
              options: [
                "OSPF and IS-IS both use the Dijkstra algorithm",
                "RIP and EIGRP are distance vector protocols",
                "IS-IS is encapsulated directly in layer 2",
                "RIP converges fast",
                "The OSPF metric is the hop count"
              ],
              correct: [0, 1, 2],
              explanation: "RIP konvergiert langsam, und die OSPF-Metrik ist die Bitrate des Links, nicht der Hop Count."
            },
            {
              id: "ad-order",
              type: "order",
              prompt: "Order these route sources from the lowest to the highest administrative distance.",
              items: ["Static route", "EIGRP", "OSPF", "IS-IS", "RIP"],
              explanation: "static 1, EIGRP 90, OSPF 110, IS-IS 115, RIP 120 (Folien 26, 54 und 67)."
            },
            {
              id: "cost-ge-1010",
              type: "type",
              prompt: "With a reference bandwidth of 10^10, what is the OSPF cost of a Gigabit Ethernet link? (number only)",
              accept: ["10"],
              placeholder: "number",
              explanation: "10¹⁰ / 10⁹ = 10. Mit der Standardreferenz 10⁸ wäre es 1 (Folie 11)."
            },
            {
              id: "carrier",
              type: "single",
              prompt: "A carrier wants a link-state protocol whose own messages do not depend on IP. Which protocol fits?",
              options: ["IS-IS", "OSPFv2", "OSPFv3", "RIPng"],
              correct: 0,
              explanation: "IS-IS läuft direkt auf Layer 2 und ist typisch bei Carriern. OSPFv2 und OSPFv3 laufen über IP mit Protokollnummer 89, RIPng ist Distance Vector über UDP."
            },
            {
              id: "c-to-g",
              type: "single",
              prompt: "In the example of slides 14–21, router C reaches G via F with cost 3, although there is a direct link C–G. Why?",
              options: [
                "The path C–F–G costs 2 + 1 = 3, which is cheaper than the direct link with cost 5",
                "OSPF prefers paths with more hops",
                "Direct links are never used by OSPF",
                "F is the designated router"
              ],
              correct: 0,
              explanation: "OSPF wählt nach den Gesamtkosten, nicht nach der Hop-Zahl. Der direkte Link kostet 5, der Umweg 3."
            }
          ]
        }
      ]
    }
  ]
});
