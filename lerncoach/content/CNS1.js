/*
 * Lerncoach-Inhalte für CNS1 (Communication Networks and Services 1, AS 2025, Andreas Marx).
 * Quellen: W1_IPV6_Part1.pdf, W2_CNS1-sld-02-ipv6-2.pdf, W3_CNS1-sld-03-voip-signaling.pdf
 * Erklärungen auf Deutsch, Checkpoints auf Englisch (Prüfungssprache).
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
      status: "locked",
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
      status: "locked",
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
    }
  ]
});
