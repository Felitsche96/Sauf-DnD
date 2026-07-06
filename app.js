(function () {
  const STORAGE_KEY = "letzter-kasten-state-v2";
  const APP_TITLE = "Die Abenteuer der Gegelle Boys";
  const app = document.querySelector("#app");

  const intensityLabels = {
    1: "Sehr entspannt",
    2: "Locker",
    3: "Feierabendmodus",
    4: "Eskalationsgefahr",
    5: "Katerlegende"
  };

  const intensityDetails = {
    1: "Mehr Sprueche, Raetsel und leichte Aufgaben.",
    2: "Einige Getraenke-Optionen, viele Ersatzaufgaben.",
    3: "Mischung aus Getraenke-Optionen, Minispielen und Aufgaben.",
    4: "Mehr Partyaufgaben, mehr Chaos, hoehere Punkte.",
    5: "Sehr chaotisch, viele riskante Karten, alles bleibt ersetzbar."
  };

  const classes = [
    { name: "Schwachtrinker", avatar: "🥴", tag: "Ausreden-Magier", accent: "#f3b65d", description: "Hat angeblich nach zwei Bier schon gut einen sitzen, ist aber strategisch wertvoll.", effect: "Einmal pro Kapitel darf er eine Trinkaufgabe ablehnen und bekommt 1 Ruhmpunkt, wenn die Ausrede gut ist." },
    { name: "Schnapsbaron", avatar: "🥃", tag: "Theken-Adel", accent: "#c8844a", description: "Tritt auf, als gehoere ihm die ganze Theke.", effect: "Einmal pro Kapitel macht er aus einer riskanten Aufgabe eine normale Aufgabe. Feiert die Gruppe die Ansage, gibt es 2 Bonuspunkte." },
    { name: "Tanzbeinschwinger", avatar: "🕺", tag: "Move-Monster", accent: "#ff69b5", description: "Niemand weiss, ob es Tanzen ist, aber es bewegt sich.", effect: "Bei Tanzaufgaben, Pantomime oder peinlichen Bewegungen gibt es 2 Bonuspunkte." },
    { name: "Der angebliche Fahrer", avatar: "🚗", tag: "Wasserjoker", accent: "#71d8f1", description: "Sagt den ganzen Abend, dass er vielleicht faehrt, obwohl niemand ihm glaubt.", effect: "Einmal pro Kapitel nutzt er den Wasserjoker und heilt die Gruppe um 3 Lebenspunkte." },
    { name: "Tresenphilosoph", avatar: "🧠", tag: "Satzbau-Boss", accent: "#b59cff", description: "Wird mit jeder Runde tiefgruendiger und unverstaendlicher.", effect: "Bei Spruechen, Ausreden, Reimen und Verhandlungen gibt es 2 Bonuspunkte, wenn die Gruppe lacht oder applaudiert." },
    { name: "Katerprophet", avatar: "🔮", tag: "Unheil-Orakel", accent: "#7ad6a2", description: "Weiss schon heute, wie schlecht es morgen allen gehen wird.", effect: "Einmal pro Kapitel darf er eine Karte neu ziehen, weil er das Unheil vorausgesehen hat." },
    { name: "Billardlegende", avatar: "🎱", tag: "Tisch-Titan", accent: "#65e0c4", description: "Hat frueher angeblich jeden Tisch dominiert, Beweise fehlen.", effect: "Bei Duellen, Zielwurf, Billard Ersatzduellen oder Schaetzfragen gibt es 1 Bonuspunkt." },
    { name: "Gruppenclown", avatar: "🤡", tag: "Fail-Artist", accent: "#ff8b5f", description: "Verliert zwar oft, aber meistens mit Stil.", effect: "Wenn er besonders lustig scheitert, kann der Spielleiter trotzdem 1 bis 2 Ruhmpunkte vergeben." },
    { name: "Hopfenheiliger", avatar: "🍺", tag: "LP-Prediger", accent: "#ffe08a", description: "Predigt Wasser, trinkt Bier und nennt es Balance.", effect: "Einmal pro Kapitel gibt er einem anderen Spieler 2 Lebenspunkte zurueck, wenn er einen wuerdigen Spruch aufsagt." },
    { name: "Eskalationsberater", avatar: "📣", tag: "Chaos-Coach", accent: "#ff6b6b", description: "Hat selten gute Ideen, aber viele davon.", effect: "Einmal pro Kapitel erzwingt er eine Gruppenentscheidung. Stimmt die Mehrheit zu, erhalten alle Beteiligten 1 Ruhmpunkt." }
  ];

  const funnyComments = {
    success: [
      "Du erhaeltst Ruhm und einen bleibenden Imageschaden.",
      "Legendaerer Erfolg. Niemand weiss warum, aber es hat funktioniert.",
      "Die Gruppe ist nicht ueberzeugt, aber immerhin unterhalten."
    ],
    fail: [
      "Das war kein Scheitern. Das war Charakterentwicklung.",
      "Kritisches Scheitern. Der Kater hat kurz applaudiert.",
      "Der Spielleiter darf entscheiden. Machtmissbrauch ist Teil der Atmosphaere."
    ],
    alternative: [
      "Taktischer Rueckzug. Sehr erwachsen, fast verdaechtig.",
      "Alternative gewaehlt. Die Legende lebt trotzdem weiter.",
      "Solide geloest. Nicht heldenhaft, aber effizient."
    ]
  };

  const nameParts = [
    "der Weizenfriedhof",
    "von der Torkelklippe",
    "der Hopfenlose",
    "Leberbart",
    "Fassvernichter",
    "der Becherbeschwoerer",
    "vom Nipphuegel",
    "der Kronkorkenkoenig",
    "Malzhammer",
    "Katerfluch",
    "Schluckschatten",
    "Dosenfaust",
    "der Masslose",
    "vom Promillepass",
    "Aluhutbier",
    "der Zapfhahnritter",
    "Rumfass",
    "Durstborn",
    "Pilsgrim",
    "Schaumkrone",
    "Bierbizeps",
    "Magenmut",
    "der Flaschenweise",
    "der Tresen Troll",
    "Hopfenherz"
  ];

  const titles = [
    "Koenig der Korken",
    "Meister der schlechten Entscheidungen",
    "Lord der Liegestuetze",
    "Heiliger der Wasserpause",
    "Bezwinger des Katers",
    "Der letzte Hopfenheld",
    "Bester Spruch des Abends",
    "Offizieller Huettenbard",
    "Katerresistenter Wanderfuerst"
  ];

  const minigames = [
    mini("rps", "Schnick Schnack Schnuck Best of 3", "Zwei Spieler treten gegeneinander an. Best of 3 entscheidet.", "2 Spieler", "Wer zuerst 2 Siege hat.", "3 Ruhmpunkte fuer den Gewinner.", "Muenze werfen oder Gruppenabstimmung."),
    mini("thumb", "Daumenwrestling", "Ein kurzes, sicheres Daumenduell.", "2 Spieler", "Wer den Daumen des anderen 3 Sekunden haelt.", "3 Ruhmpunkte.", "Plank Duell oder Reimduell."),
    mini("arm", "Armdruecken", "Kurz, sicher und ohne Uebertreibung.", "2 Spieler", "Sicherer Sieg ohne Risiko.", "4 Ruhmpunkte.", "Daumenwrestling oder 20 Sekunden Plank."),
    mini("plank", "Plank Duell", "Zwei Spieler gehen in die Plank.", "2 Spieler", "Wer laenger haelt oder beide schaffen 30 Sekunden.", "3 Ruhmpunkte.", "10 Kniebeugen."),
    mini("rhyme", "Reimduell", "Sagt abwechselnd Reime auf ein Wort.", "2 Spieler oder Gruppe", "Wer nicht stockt.", "3 Ruhmpunkte.", "Drei harmlose Begriffe nennen."),
    mini("riddle", "Raetsel in 30 Sekunden", "Der Spielleiter stellt ein kurzes Raetsel oder eine Schaetzfrage.", "1 Spieler oder Team", "Richtige Antwort oder nah dran.", "4 Ruhmpunkte.", "Wasser trinken und eine falsche Antwort dramatisch verteidigen."),
    mini("laugh", "Wer lacht verliert", "Ein Spieler versucht ernst zu bleiben.", "1 bis 3 Spieler", "15 Sekunden nicht lachen.", "3 Ruhmpunkte.", "Eine harmlose peinliche Story erzaehlen."),
    mini("guess", "Schaetzfrage", "Schaetzt Zahl, Entfernung, Uhrzeit oder Restbestand.", "Alle", "Naechste Schaetzung gewinnt.", "2 Ruhmpunkte.", "Gruppenabstimmung."),
    mini("throw", "Kronkorken oder Papierkugel Zielwurf", "Trefft ein sicheres Ziel auf kurzer Distanz.", "1 bis 4 Spieler", "Treffer oder bester Versuch.", "3 Ruhmpunkte.", "Pantomime statt Wurf."),
    mini("mime", "Pantomime", "Stellt einen Begriff ohne Worte dar.", "1 Spieler, Gruppe raet", "Gruppe raet in 30 Sekunden.", "3 Ruhmpunkte.", "Begriff beschreiben ohne das Hauptwort."),
    mini("song", "Song erraten", "Eine Person summt oder klatscht einen Song.", "Gruppe", "Song wird erraten.", "3 Ruhmpunkte.", "Songtitel pantomimisch darstellen."),
    mini("legend", "Wahrheit oder Legende", "Erzaehle eine kurze Story. Die Gruppe raet: wahr oder erfunden.", "1 Spieler, Gruppe", "Mehrheit liegt richtig oder falsch.", "3 Ruhmpunkte.", "Harmlosen Fakt ueber dich nennen."),
    mini("vote", "Gruppenabstimmung", "Die Gruppe entscheidet per Applaus oder Fingerzeig.", "Alle", "Mehrheit entscheidet.", "1 bis 3 Ruhmpunkte.", "Spielleiter entscheidet."),
    mini("time", "Zeit Challenge", "Eine Aufgabe muss im Zeitlimit geschafft werden.", "1 Spieler oder Team", "Zeitlimit eingehalten.", "2 bis 4 Ruhmpunkte.", "Zeit verdoppeln oder Aufgabe vereinfachen."),
    mini("billiard", "Billard Ersatzduell", "Wenn kein Billardtisch da ist, entscheidet ein schnelles Ersatzduell.", "2 Spieler", "Schnick Schnack Schnuck, Zielwurf oder Reimduell.", "4 Ruhmpunkte.", "Schaetzfrage oder Gruppenabstimmung.")
  ];

  const stories = [
    {
      id: "huette",
      title: "Die Legende vom letzten Kasten",
      theme: "Berghuette, Fantasy RPG und Lagerfeuer",
      description: "Die Gruppe erreicht nach einer Wanderung eine Berghuette. Dort wartet der sagenumwobene letzte kalte Kasten. Doch Korkenkobolde, Wandergeister und Lord Hangover stellen sich in den Weg.",
      difficulty: "Normal",
      intensity: 3,
      duration: "45 bis 90 Minuten",
      recommendedPlayers: "2 bis 12",
      mood: "Warm, heldenhaft und huettentauglich.",
      finalText: "Lord Hangover wurde besiegt. Der letzte Kasten ist gerettet. Die Huette wird euch nie vergessen.",
      boss: {
        name: "Lord Hangover",
        maxHp: (players) => 50 + players * 10,
        victoryText: "Lord Hangover wurde besiegt. Der letzte Kasten ist gerettet. Die Huette wird euch nie vergessen.",
        actions: [
          bossAction("Trinkspruch", 3, 0, "Sage einen epischen Spruch. Mit Wasser, Tee oder leerem Becher moeglich."),
          bossAction("Koerperliche Aufgabe", 4, 0, "Liegestuetze, Kniebeugen oder Plank."),
          bossAction("Schluck", 2, 0, "Option: Wasser oder Ersatzaufgabe."),
          bossAction("Wasser trinken", 0, 5, "Heilt die Gruppe um 5 Lebenspunkte."),
          bossAction("Snack essen", 0, 0, "Blockt den naechsten Angriff."),
          bossAction("Spezialangriff", 8, 0, "Max. einmal pro Spieler. Option: 20 Kniebeugen fuer 8 Schaden.", true)
        ],
        attacks: [
          card("boss", "Kopfschmerz Keule", "Lord Hangover schwingt dumpf und dramatisch.", "Alle verlieren 1 Lebenspunkt.", "Blockbar mit Snack essen", "Statt Strafe kann die Gruppe 20 Sekunden ruhig atmen."),
          card("boss", "Durst der Verdammnis", "Ein trockener Wind zieht durch die Huette.", "Alle nehmen eine kurze Wasserpause.", "Die Gruppe heilt 2 LP", "Starker Konter gegen Lord Hangover."),
          card("boss", "Peinliche Erinnerung", "Lord Hangover zeigt ein geistiges Fotoalbum.", "Ein Spieler erzaehlt eine harmlose peinliche Story.", "3 Schaden am Boss", "Aussetzen erlaubt, dann macht die Gruppe eine Team-Pose."),
          card("boss", "Muedigkeitsnebel", "Die Augenlider werden schwer wie Wanderrucksaecke.", "Alle schliessen 30 Sekunden die Augen.", "Danach +1 Ruhmpunkt fuer alle", "Sitzend oder liegend ausfuehren."),
          card("boss", "Gruppenkater", "Der Endgegner prueft den Zusammenhalt.", "Die Gruppe muss eine Teamaufgabe bestehen.", "6 Schaden am Boss", "Wasserpause zaehlt als Vorbereitung."),
          card("boss", "Lord Hangover stolpert", "Er rutscht auf einer schlechten Entscheidung aus.", "Alle jubeln theatralisch.", "Alle erhalten 2 Ruhmpunkte", "Einfach mitnehmen.")
        ]
      },
      chapters: [
        chapter("Der Aufstieg zur Huette", "Nach einem langen Marsch erreicht ihr endlich die Huette. Doch bevor ihr eintreten duerft, prueft euch der Geist des Berges.", "Jeder Spieler zieht eine Ereigniskarte. Danach gibt es eine Teamaufgabe.", ["event", "team"], [
          card("event", "Der Rucksack des Grauens", "Dein Rucksack fuehlt sich an, als haettest du heimlich einen Amboss eingepackt.", "Mache 10 Kniebeugen oder erzaehle, was du garantiert zu viel eingepackt hast.", "2 Ruhmpunkte", "Wasser trinken und den Amboss pantomimisch auspacken."),
          card("event", "Der warme Fund", "Hinter der Huette findest du ein einzelnes warmes Bier. Niemand weiss, wie lange es dort lag.", "Nimm einen Schluck oder verschenke es ehrenvoll an einen anderen Spieler.", "1 bis 2 Ruhmpunkte", "Erfinde eine Herkunftsgeschichte fuer das Bier."),
          card("event", "Der Wandergeist", "Ein alter Wandergeist versperrt euch den Weg und verlangt einen wuerdigen Spruch.", "Sage einen epischen Trinkspruch.", "2 Ruhmpunkte, bei Applaus 3", "Spruch mit Wasserbecher oder dramatischer Wanderstab-Geste."),
          card("team", "Kettenproviant", "Die Gruppe sortiert ihr Ueberleben.", "Nennt reihum je einen Huettensnack. Wer stockt, macht 5 Kniebeugen.", "5 Ruhmpunkte fuer alle Beteiligten", "Wasserpause fuer alle ist erlaubt.")
        ]),
        chapter("Die Pruefung des ersten Kastens", "Im Kuehlschrank wartet der erste Kasten. Doch er wird vom Korkenkobold bewacht.", "Jeder Spieler zieht eine Aufgabenkarte. Danach muss die Gruppe gemeinsam eine Aufgabe bestehen.", ["task", "toast", "team", "minigame"], [
          card("task", "Der Huettenritter", "Ein Held braucht Rang und Unsinn.", "Schlage einen Mitspieler feierlich zum Ritter der Hopfentafel.", "2 Ruhmpunkte", "Der Ritterschlag kann mit Wasserflasche, Kochloeffel oder leerer Hand passieren."),
          card("task", "Der Plank der Ehre", "Der Boden ruft. Deine Bauchmuskeln antworten vielleicht.", "Halte 30 Sekunden Plank.", "3 Ruhmpunkte", "Alternativ 10 Kniebeugen oder eine heldenhafte Pose."),
          card("task", "Die Ballade vom letzten Kasten", "Der Saal verlangt Kunst.", "Singe spontan einen kurzen Song ueber den letzten Kasten.", "3 Ruhmpunkte", "Sprechgesang, Summen oder dramatisches Vorlesen ist erlaubt."),
          card("task", "Der schlechteste Witz des Abends", "Qualitaet ist optional, Mut ist Pflicht.", "Erzaehle den schlechtesten Witz, der dir einfaellt.", "2 Ruhmpunkte, bei echtem Gelaechter 4", "Wasserpause und dann direkt zur Pointe."),
          card("toast", "Der Hopfenheilige", "Ein kurzer Segen fuer alle stabilen Entscheidungen.", "Erfinde einen Spruch mit den Worten Huette, Kasten und Morgen.", "2 Ruhmpunkte", "Spruch statt Schluck ist vollwertig."),
          card("team", "Die Rettung des Kastens", "Der Kasten haengt imaginativ am Abgrund.", "Alle bilden eine Rettungskette und rufen einen Schlachtruf.", "5 Ruhmpunkte fuer die Gruppe", "Wasser trinken danach empfohlen."),
          minigameCard("plank", "Minispiel: Plank der Ehre")
        ]),
        chapter("Der Katerfluch", "Nebel zieht auf. Der Geist des morgigen Katers erscheint und verflucht die Runde.", "Jeder Spieler zieht eine Fluchkarte. Flueche wirken kurz oder bis zum naechsten Zug.", ["curse", "event", "minigame"], [
          card("curse", "Sprachfluch", "Der Geist verbietet das naheliegendste Wort.", "Du darfst 5 Minuten lang das Wort Bier nicht sagen.", "Bei Verstoss -1 LP oder 5 Liegestuetze", "Immer alkoholfrei: Strafe darf durch Kniebeugen ersetzt werden."),
          card("curse", "Adelsfluch", "Die Runde wird ploetzlich sehr vornehm.", "Sprich alle Spieler mit ihrem Saufnamen an.", "Bis du wieder an der Reihe bist", "Wer Namen vergisst, trinkt Wasser oder verbeugt sich."),
          card("curse", "Wanderopa", "Der Pfad war frueher steiler, die Stiefel haerter.", "Sprich bis zu deinem naechsten Zug wie ein 80-jaehriger Wanderfuehrer.", "2 Ruhmpunkte bei guter Rolle", "Ruecken gerade, Stimme knarzig."),
          card("curse", "Prostpflicht", "Vor Pathos schuetzt kein Schild.", "Vor jeder Getraenke-Option musst du einen neuen Spruch sagen.", "1 Bonuspunkt fuer den besten Spruch", "Gilt genauso fuer Wasser oder Snack."),
          card("curse", "Wassersegen", "Ein heller Strahl Vernunft trifft die Runde.", "Trinke ein Glas Wasser.", "2 Ruhmpunkte", "Die beste Alternative ist hier bereits eingebaut."),
          minigameCard("laugh", "Minispiel: Wer lacht verliert")
        ]),
        chapter("Lord Hangover", "Aus leeren Flaschen, schlechten Entscheidungen und zu wenig Wasser erhebt sich Lord Hangover.", "Die Gruppe kaempft gemeinsam gegen Lord Hangover.", ["boss"], [])
      ]
    },
    {
      id: "balingen",
      title: "Balingen bei Nacht",
      theme: "Vortrinken, Bar, Weiterziehen und Club",
      description: "Ihr spielt keine klassischen Fantasy Helden, sondern uebertriebene Versionen eurer Ausgeh-Persoenlichkeiten. Eure Waffen sind schlechte Ausreden, Reime, Tanzmoves, Billard-Selbstbewusstsein und fragwuerdige Entscheidungen.",
      difficulty: "Schwer",
      intensity: 5,
      duration: "60 bis 120 Minuten",
      recommendedPlayers: "3 bis 12",
      mood: "Chaotisch, nostalgisch und clubtauglich. Reale Orte sind nur humorvolle Kulisse.",
      finalText: "Die Security nickt respektvoll. Ihr habt nicht durch Eskalation gewonnen, sondern durch Charme, Unsinn und zweifelhafte Reimkunst. Die Nacht gehoert euch.",
      boss: {
        name: "Security Pruefung",
        maxHp: (players) => 40 + players * 8,
        victoryText: "Die Security nickt respektvoll. Ihr habt nicht durch Eskalation gewonnen, sondern durch Charme, Unsinn und zweifelhafte Reimkunst. Die Nacht gehoert euch.",
        actions: [
          bossAction("Verhandlungsgeschick", 5, 0, "Erfinde in 30 Sekunden eine ueberzeugende, aber harmlose Ausrede."),
          bossAction("Reimduell", 4, 0, "Sage drei Reime auf ein vorgegebenes Wort."),
          bossAction("Ernst bleiben", 4, 0, "Halte 15 Sekunden Augenkontakt mit einem Mitspieler, ohne zu lachen."),
          bossAction("Ausweiskontrolle", 3, 0, "Sage deinen Saufnamen mit maximaler Wuerde auf."),
          bossAction("Tanzmove der Reue", 4, 0, "Zeige 10 Sekunden einen Tanzmove, der beweist, dass du noch gesellschaftsfaehig bist."),
          bossAction("Wasserjoker", 0, 5, "Rette die Gruppe vor dem naechsten Boss Angriff oder heile 5 LP.", true)
        ],
        attacks: [
          card("boss", "Strenger Blick", "Die fiktive Security schaut so ernst, dass selbst die Musik kurz leiser wirkt.", "Ein Spieler muss 15 Sekunden ernst bleiben. Wer lacht, verliert 1 LP.", "Bei Erfolg 2 Ruhmpunkte", "Wasser trinken und den Blick als Statue nachstellen."),
          card("boss", "Ausweiskontrolle des Schicksals", "Keine echte Kontrolle, nur ein dramatischer Rollenspielmoment.", "Ein Spieler sagt seinen Saufnamen mit voller Wuerde auf.", "3 Schaden am Boss", "Wer aussetzen will, macht eine Verbeugung."),
          card("boss", "Du kommst hier so nicht rein", "Die Pruefung verlangt Poesie statt Eskalation.", "Die Gruppe bildet gemeinsam einen kurzen Reim.", "4 Schaden am Boss", "Ein Satz reicht, solange niemand Fremde stoert."),
          card("boss", "Letzte Warnung", "Die Nacht fragt nach Charakter.", "Ein Spieler erzaehlt eine harmlose peinliche Story.", "3 Ruhmpunkte", "Aussetzen erlaubt, dann gibt es eine Gruppenabstimmung."),
          card("boss", "Tanzverbot", "Eine absurde Regel erscheint fuer 10 Sekunden.", "Ein Spieler tanzt 10 Sekunden ohne Musik.", "4 Schaden am Boss", "Alternativ eine Pose halten."),
          card("boss", "Security ist verwirrt", "So viel Charme war nicht vorgesehen.", "Die Security verliert 5 LP und die Gruppe jubelt diskret.", "Alle erhalten 2 Ruhmpunkte", "Einfach mitnehmen.")
        ]
      },
      chapters: [
        chapter("Das Vortrinken", "Alles beginnt harmlos. Jemand hat zu Hause eingeladen, die Musik laeuft, der Kuehlschrank ist voll und alle sind noch davon ueberzeugt, die Nacht komplett im Griff zu haben.", "Leichte Aufgaben, erste Sprueche, Kennenlernfragen, Abstimmungen und kleine Challenges.", ["toast", "task", "team", "minigame"], [
          card("toast", "Der erste Toast", "Die Nacht ist jung und alle tun noch so, als haetten sie Kontrolle.", "Halte einen uebertrieben feierlichen Spruch auf den Abend.", "2 Ruhmpunkte, bei Applaus 3", "Trinke Wasser und ernenne dich selbst zum Hueter der Vernunft."),
          card("task", "Der Playlist Streit", "Zwei Spieler sind ueberzeugt, dass ihr Song den Abend retten wird.", "Zwei Spieler nennen in 10 Sekunden je einen Song. Die Gruppe stimmt ab.", "Gewinner erhaelt 2 Ruhmpunkte", "Beide machen zusammen 10 Kniebeugen und erhalten je 1 Ruhmpunkt."),
          card("task", "Der Kuehlschrank Check", "Jemand behauptet, es sei noch genug da. Eine gefaehrliche Aussage.", "Schaetze, wie viele Getraenke noch uebrig sind. Der Spielleiter entscheidet, ob es realistisch war.", "1 bis 3 Ruhmpunkte", "Schaetze stattdessen Wasser- oder Snackbestand."),
          card("team", "Die Gruppenprognose", "Alle glauben, sie kennen den Verlauf des Abends.", "Jeder sagt eine harmlose Vorhersage fuer die Nacht.", "1 Ruhmpunkt pro guter Vorhersage", "Nur witzige und freundliche Prognosen."),
          minigameCard("vote", "Minispiel: Gruppenabstimmung")
        ]),
        chapter("Die Wunderbar Herausforderung", "Die Gruppe erreicht die Wunderbar. Alles wirkt entspannt, bis eine mysterioese Billard Truppe auftaucht und euch herausfordert. Es geht nicht um Geld, sondern um Ehre, Ruhm und bessere Legenden.", "Billard Duell als echtes oder simuliertes Minispiel. Wenn kein Tisch da ist, entscheidet ein Ersatzduell.", ["task", "minigame", "team"], [
          card("task", "Die Billard Rivalen", "Zwei fremde Tresenlegenden fordern euch heraus. Ihre Technik sieht fragwuerdig aus, aber ihr Selbstbewusstsein ist enorm.", "Waehlt einen Champion. Er spielt Best of 3 oder macht einen echten Billard Stoss.", "Sieg: 4 Ruhmpunkte fuer Champion, 2 fuer die Gruppe", "Wasser trinken und eine dramatische Niederlagenrede halten."),
          card("task", "Der falsche Profi", "Jemand erklaert die Regeln, obwohl er selbst keine Ahnung hat.", "Erklaere 30 Sekunden lang frei erfundene Billard Regeln.", "2 Ruhmpunkte, bei echtem Gelaechter 4", "Erklaere stattdessen eine harmlose Fantasieregel."),
          card("team", "Kreide der Ehre", "Das imaginierte Queue braucht Segen.", "Die Gruppe erfindet einen Billard Schlachtruf.", "3 Ruhmpunkte fuer alle Beteiligten", "Fluestern reicht, wenn ihr unterwegs seid."),
          minigameCard("billiard", "Minispiel: Billard Ersatzduell"),
          minigameCard("throw", "Minispiel: Zielwurf")
        ]),
        chapter("Der Weg Richtung Top 10", "Die Gruppe zieht weiter. Die Stimmung steigt, die Orientierung sinkt und ploetzlich ist jeder ueberzeugt, den besten Weg zu kennen.", "Chaoskarten, Orientierungsaufgaben, Gruppenentscheidungen und Flueche.", ["event", "curse", "minigame"], [
          card("event", "Der Wegkundige", "Ein Spieler behauptet, er kenne eine Abkuerzung. Niemand glaubt ihm.", "Gib eine voellig uebertriebene Wegbeschreibung.", "2 Ruhmpunkte, wenn die Gruppe ihm glaubt +1", "Wasser trinken und die Route als Wetterbericht erklaeren."),
          card("event", "Der verlorene Held", "Fuer 20 Sekunden tut die Gruppe so, als sei ein Spieler verschwunden, obwohl er direkt daneben steht.", "Der Spieler schliesst sich mit epischer Rueckkehrrede wieder an.", "3 Ruhmpunkte", "Aussetzen erlaubt, dann macht die Gruppe eine Suchpose."),
          card("curse", "Navigationsfluch", "Deine innere Karte besteht nur noch aus Pfeilen und Selbstvertrauen.", "Bis zu deinem naechsten Zug musst du Richtungen besonders dramatisch ansagen.", "2 Ruhmpunkte", "Keine echten Wege blockieren oder Fremde ansprechen."),
          card("event", "Der Gruppenkompass", "Alle zeigen gleichzeitig, wo es langgeht.", "Auf drei zeigt jeder in eine Richtung. Mehrheit gewinnt.", "1 Ruhmpunkt fuer die Mehrheit", "Diskret spielen, wenn ihr draussen unterwegs seid."),
          minigameCard("guess", "Minispiel: Schaetzfrage")
        ]),
        chapter("Top 10, die Tanzflaechenpruefung", "Ihr erreicht den Club. Die Musik ist laut, die Entscheidungen werden schlechter und die Nacht nimmt endgueltig Fahrt auf.", "Intensivere Aufgaben, Tanz, Reime, schnelle Minispiele und Gruppenabstimmungen.", ["task", "toast", "minigame", "team"], [
          card("task", "Der Tanzflaechen Champion", "Die Tanzflaeche fordert ein Opfer.", "Tanze 15 Sekunden dramatisch schlecht oder erstaunlich gut.", "4 Ruhmpunkte", "Wasser trinken und einen neuen Tanzstil erfinden."),
          card("task", "Der Bass Fluch", "Der Bass ist so stark, dass deine Gedanken nur noch in Reimen funktionieren.", "Sage drei Reime auf Bier, Nacht oder Kater in 20 Sekunden.", "3 Ruhmpunkte", "Drei Reime auf Wasser, Snack oder Heimweg."),
          card("task", "Der verschwundene Jacken Bon", "Panik. Jemand hat angeblich den Jacken Bon verloren.", "Erfinde eine plausible Ausrede, warum das nicht deine Schuld war.", "2 Ruhmpunkte, bei Gelaechter 4", "Erzaehle eine harmlose Ausrede ohne echte Personen zu nennen."),
          card("team", "Der diskrete Clubchor", "Die Gruppe will auffallen, aber bitte niemanden stoeren.", "Alle machen 10 Sekunden denselben Mini-Move am Platz.", "3 Ruhmpunkte fuer alle", "Nur klein und respektvoll ausfuehren."),
          minigameCard("rhyme", "Minispiel: Reimduell"),
          minigameCard("song", "Minispiel: Song erraten")
        ]),
        chapter("Endboss, die Security Pruefung", "Kurz vor dem Hoehepunkt der Nacht stellt sich euch die fiktive Security in den Weg. Sie ist kein echter Gegner, sondern eine absurde Pruefung.", "Der Boss hat Lebenspunkte. Erfolgreiche Aktionen machen Schaden. Bei Scheitern kommt ein Boss Angriff. Ihr gewinnt durch Charme, Reime, Ausreden, Wasserjoker und Minispiele.", ["boss"], [])
      ]
    }
  ];

  const state = migrateState(loadState()) || freshState();
  let toastTimer = 0;
  let lastRenderedView = "";

  function mini(id, title, text, participants, win, reward, alternative) {
    return { id, title, text, participants, win, reward, alternative };
  }

  function card(type, title, text, task, reward, alternative, minigameId = "") {
    return { type, title, text, task, reward, alternative, minigameId };
  }

  function minigameCard(minigameId, title) {
    const game = minigames.find((entry) => entry.id === minigameId);
    return card("minigame", title || game.title, game.text, `${game.participants}: ${game.win}`, game.reward, game.alternative, minigameId);
  }

  function chapter(title, story, mechanic, drawTypes, cards) {
    return { title, story, mechanic, drawTypes, cards };
  }

  function bossAction(label, damage, heal, note, once = false) {
    return { label, damage, heal, note, once };
  }

  function freshState() {
    return {
      view: "home",
      selectedStoryId: stories[0].id,
      players: [],
      chapter: 0,
      activePlayer: 0,
      drawnCard: null,
      dieResult: null,
      helpOpen: false,
      boss: { maxHp: 0, hp: 0, snackBlock: false },
      ended: false,
      toast: ""
    };
  }

  function migrateState(saved) {
    if (!saved) return null;
    const migrated = {
      ...freshState(),
      ...saved,
      selectedStoryId: saved.selectedStoryId || stories[0].id,
      boss: saved.boss || { maxHp: 0, hp: 0, snackBlock: false },
      helpOpen: false,
      toast: ""
    };
    migrated.players = (migrated.players || []).map((player) => ({
      ...player,
      className: classInfo(player.className).name
    }));
    return migrated;
  }

  function story() {
    return stories.find((entry) => entry.id === state.selectedStoryId) || stories[0];
  }

  function currentChapter() {
    return story().chapters[state.chapter] || story().chapters[0];
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, toast: "" }));
  }

  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
      return null;
    }
  }

  function setView(view) {
    state.view = view;
    saveState();
    render();
  }

  function notify(message) {
    state.toast = message;
    clearTimeout(toastTimer);
    render();
    toastTimer = setTimeout(() => {
      state.toast = "";
      render();
    }, 1500);
  }

  function randomOf(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function generateSaufname(name) {
    const base = name.trim() || "Held";
    return `${base} ${randomOf(nameParts)}`;
  }

  function addPlayer() {
    if (state.players.length >= 12) return;
    const number = state.players.length + 1;
    const name = `Held ${number}`;
    state.players.push({
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
      name,
      alias: generateSaufname(name),
      className: randomOf(classes).name,
      hp: 10,
      glory: 0,
      abilityReady: true,
      bossSpecialUsed: false
    });
    saveState();
    render();
  }

  function removePlayer(id) {
    state.players = state.players.filter((player) => player.id !== id);
    state.activePlayer = Math.min(state.activePlayer, Math.max(0, state.players.length - 1));
    saveState();
    render();
  }

  function updatePlayer(id, patch) {
    const player = state.players.find((entry) => entry.id === id);
    if (!player) return;
    Object.assign(player, patch);
    saveState();
    render();
  }

  function classInfo(className) {
    return classes.find((entry) => entry.name === className) || classes[0];
  }

  function adjustPlayer(id, key, amount) {
    const player = state.players.find((entry) => entry.id === id);
    if (!player) return;
    player[key] = Math.max(0, player[key] + amount);
    saveState();
    notify(`${player.alias}: ${amount > 0 ? "+" : ""}${amount} ${key === "glory" ? "Ruhm" : "LP"}`);
  }

  function chooseStory(id) {
    state.selectedStoryId = id;
    state.chapter = 0;
    state.drawnCard = null;
    state.ended = false;
    setView("class-preview");
  }

  function randomizeAllClasses() {
    state.players.forEach((player) => {
      player.className = randomOf(classes).name;
    });
    saveState();
    render();
  }

  function startGame() {
    if (state.players.length < 2) {
      notify("Mindestens 2 Wanderhelden benoetigt.");
      return;
    }
    state.chapter = 0;
    state.activePlayer = 0;
    state.drawnCard = null;
    state.dieResult = null;
    state.ended = false;
    state.players.forEach((player) => {
      player.hp = 10;
      player.glory = 0;
      player.abilityReady = true;
      player.bossSpecialUsed = false;
    });
    setupBoss();
    setView("game");
  }

  function setupBoss() {
    const maxHp = story().boss.maxHp(state.players.length);
    state.boss = { maxHp, hp: maxHp, snackBlock: false };
  }

  function drawCard(type) {
    const chapterData = currentChapter();
    const pool = type === "boss" ? story().boss.attacks : chapterData.cards.filter((entry) => entry.type === type);
    if (!pool.length) {
      notify("Fuer diesen Stapel gibt es gerade keine Karten.");
      return;
    }
    state.drawnCard = randomOf(pool);
    state.dieResult = null;
    saveState();
    render();
  }

  function drawChapterCard() {
    const types = currentChapter().drawTypes;
    drawCard(randomOf(types));
  }

  function nextPlayer() {
    state.activePlayer = (state.activePlayer + 1) % state.players.length;
    if (state.activePlayer === 0) {
      state.players.forEach((player) => (player.abilityReady = true));
    }
    state.drawnCard = null;
    state.dieResult = null;
    saveState();
    render();
  }

  function setChapter(index) {
    state.chapter = index;
    state.drawnCard = null;
    state.dieResult = null;
    state.players.forEach((player) => (player.abilityReady = true));
    if (index === story().chapters.length - 1 && (!state.boss.maxHp || state.boss.hp <= 0)) setupBoss();
    saveState();
    render();
  }

  function applyBossAction(action, playerId) {
    const player = state.players.find((entry) => entry.id === playerId);
    if (!player) return;
    if (action.once && player.bossSpecialUsed) {
      notify("Spezialaktion schon genutzt.");
      return;
    }
    if (action.once) player.bossSpecialUsed = true;
    state.boss.hp = Math.max(0, state.boss.hp - action.damage);
    if (action.heal) state.players.forEach((entry) => (entry.hp = Math.min(10, entry.hp + action.heal)));
    if (action.label === "Snack essen" || action.label === "Wasserjoker") state.boss.snackBlock = true;
    player.glory += action.damage > 0 ? Math.max(1, Math.floor(action.damage / 2)) : 1;
    if (state.boss.hp <= 0) finishGame();
    saveState();
    notify(`${action.label}: ${action.damage} Schaden`);
  }

  function bossAttack() {
    const attack = randomOf(story().boss.attacks);
    state.drawnCard = attack;
    if (state.boss.snackBlock) {
      state.boss.snackBlock = false;
      notify("Block! Angriff abgewehrt.");
    } else if (attack.title === "Kopfschmerz Keule" || attack.title === "Strenger Blick") {
      const target = state.players[state.activePlayer];
      if (attack.title === "Kopfschmerz Keule") state.players.forEach((player) => (player.hp = Math.max(0, player.hp - 1)));
      if (target && attack.title === "Strenger Blick") target.hp = Math.max(0, target.hp - 1);
    } else if (attack.title === "Lord Hangover stolpert" || attack.title === "Security ist verwirrt") {
      state.boss.hp = Math.max(0, state.boss.hp - 5);
      state.players.forEach((player) => (player.glory += 2));
    }
    if (state.boss.hp <= 0) finishGame();
    saveState();
    render();
  }

  function finishGame() {
    state.ended = true;
    state.view = "end";
  }

  function rollDie() {
    const value = Math.floor(Math.random() * 6) + 1;
    state.dieResult = value;
    saveState();
    notify(dieText(value));
  }

  function dieText(value) {
    if (value === 1) return "1: Kritisches Scheitern. Der Kater applaudiert.";
    if (value <= 3) return `${value}: Knapp daneben. Kleine Ersatzaufgabe.`;
    if (value <= 5) return `${value}: Erfolg. Normale Belohnung.`;
    return "6: Legendaerer Erfolg. Bonuspunkt oder Mitspieler mitbelohnen.";
  }

  function resolveCard(result) {
    if (!state.drawnCard) return;
    const player = state.players[state.activePlayer];
    if (!player) return;
    if (result === "success") {
      player.glory += 2;
      notify(randomOf(funnyComments.success));
    } else if (result === "fail") {
      player.hp = Math.max(0, player.hp - 1);
      notify(randomOf(funnyComments.fail));
    } else {
      player.glory += 1;
      notify(randomOf(funnyComments.alternative));
    }
    saveState();
    render();
  }

  function resetGame() {
    if (!confirm("Spielstand wirklich loeschen?")) return;
    Object.assign(state, freshState());
    localStorage.removeItem(STORAGE_KEY);
    render();
  }

  function continueGame() {
    if (!state.players.length) {
      notify("Kein gespeicherter Spielstand gefunden.");
      return;
    }
    setView(state.ended ? "end" : "game");
  }

  function h(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function layout(content, top = true) {
    const viewChanged = state.view !== lastRenderedView;
    lastRenderedView = state.view;
    app.innerHTML = `
      <main class="app-shell view-${h(state.view)}">
        <div class="stage-fx" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        ${top ? topbar() : ""}
        ${content}
        ${state.toast ? `<div class="toast">${h(state.toast)}</div>` : ""}
      </main>
    `;
    if (viewChanged) requestAnimationFrame(() => window.scrollTo(0, 0));
  }

  function topbar() {
    return `
      <nav class="topbar">
        <div class="brand">${h(story().title)}<br><span>${state.view === "game" ? `Kapitel ${state.chapter + 1}` : "Story Pack"}</span></div>
        <button class="ghost small" data-action="home">Start</button>
        <button class="ghost small" data-action="rules">Regeln</button>
      </nav>
    `;
  }

  function renderHome() {
    layout(
      `<section class="hero">
        <div class="hero-art" aria-hidden="true"></div>
        <div>
          <h1 class="title">${APP_TITLE}</h1>
          <p class="subtitle">Jung, brutal und versoffen und mit kleinem Pimmel erleben die Freunde gemeinsam die Welt</p>
        </div>
        <div class="stack">
          <button data-action="stories">Neues Spiel</button>
          <button class="secondary" data-action="continue">Spiel fortsetzen</button>
          <button class="ghost" data-action="rules">Regeln anzeigen</button>
        </div>
      </section>`,
      false
    );
  }

  function renderStories() {
    layout(`
      <section class="stack story-screen">
        <article class="card hot">
          <p class="eyebrow">⚔️ Story Pack</p>
          <h1 class="section-title">Modus waehlen</h1>
          <div class="pill-row">
            <span class="pill">🃏 Quests</span>
            <span class="pill">🎲 Minispiele</span>
            <span class="pill">🏆 Ruhm</span>
          </div>
        </article>
        <div class="grid story-grid">
          ${stories.map(storyCard).join("")}
        </div>
      </section>
    `);
  }

  function storyCard(item) {
    return `
      <article class="card story-card">
        <div>
          <p class="eyebrow">${item.id === "balingen" ? "🌃" : "⛰️"} ${h(item.theme)}</p>
          <h2>${h(item.title)}</h2>
        </div>
        <div class="story-meta">
          <span class="pill">🔥 ${item.intensity}/5</span>
          <span class="pill">👥 ${h(item.recommendedPlayers)}</span>
          <span class="pill">⏱️ ${h(item.duration)}</span>
          <span class="pill">📖 ${item.chapters.length} Kapitel</span>
          <span class="pill">🎯 ${h(item.difficulty)}</span>
        </div>
        <button data-action="choose-story" data-id="${item.id}">Starten</button>
      </article>
    `;
  }

  function classAvatar(item) {
    return `
      <div class="class-avatar" style="--avatar-accent: ${h(item.accent)};" aria-hidden="true">
        <span>${h(item.avatar)}</span>
      </div>
    `;
  }

  function classPreviewCard(item, index) {
    return `
      <article class="card class-preview-card" style="--avatar-accent: ${h(item.accent)}; --stagger: ${index * 45}ms;">
        <div class="class-preview-top">
          ${classAvatar(item)}
          <div>
            <p class="class-tag">${h(item.tag)}</p>
            <h2>${h(item.name)}</h2>
          </div>
        </div>
        <p>${h(item.description)}</p>
        <div class="class-skill">
          <strong>Skill</strong>
          <span>${h(item.effect)}</span>
        </div>
      </article>
    `;
  }

  function renderClassPreview() {
    layout(`
      <section class="stack class-preview-screen">
        <article class="card hot">
          <p class="eyebrow">🎭 Klassenrunde</p>
          <h1 class="section-title">Klassen kurz vorstellen</h1>
          <div class="pill-row">
            <span class="pill">👀 gemeinsam lesen</span>
            <span class="pill">🎲 danach waehlen</span>
            <span class="pill">✨ 1 Skill pro Kapitel</span>
          </div>
        </article>
        <div class="grid class-preview-grid">
          ${classes.map(classPreviewCard).join("")}
        </div>
        <div class="grid two">
          <button data-action="setup">Klassen waehlen</button>
          <button class="ghost" data-action="stories">Modus wechseln</button>
        </div>
      </section>
    `);
  }

  function renderSetup() {
    if (!state.players.length) {
      addPlayer();
      addPlayer();
      return;
    }
    layout(`
      <section class="stack setup-screen">
        <div class="card hot">
          <p class="eyebrow">👥 ${h(story().title)}</p>
          <h1 class="section-title">Spieler Setup</h1>
          <div class="pill-row">
            <span class="pill">👥 ${state.players.length}/12</span>
            <span class="pill">❤️ 10 LP</span>
            <span class="pill">🔥 ${story().intensity}/5</span>
          </div>
        </div>
        <div class="grid players-grid">
          ${state.players.map(playerSetupCard).join("")}
        </div>
        <div class="grid two">
          <button class="secondary" data-action="add-player" ${state.players.length >= 12 ? "disabled" : ""}>+ Spieler</button>
          <button data-action="start-game" ${state.players.length < 2 ? "disabled" : ""}>Start</button>
        </div>
        <button class="secondary" data-action="random-all-classes">🎲 Klassen mischen</button>
        <button class="ghost" data-action="stories">Modus wechseln</button>
      </section>
    `);
  }

  function playerSetupCard(player) {
    return `
      <article class="card player-card" data-player="${player.id}">
        <div class="player-head">
          <strong>Spieler</strong>
          <button class="ghost small" data-action="remove-player" data-id="${player.id}" ${state.players.length <= 2 ? "disabled" : ""}>Entfernen</button>
        </div>
        <label>Name<input value="${h(player.name)}" data-field="name" data-id="${player.id}" /></label>
        <label>Saufname<input value="${h(player.alias)}" data-field="alias" data-id="${player.id}" /></label>
        <div class="grid two">
          <button class="secondary small" data-action="random-alias" data-id="${player.id}">🎲 Name</button>
          <button class="secondary small" data-action="random-class" data-id="${player.id}">🎲 Klasse</button>
        </div>
        ${classPicker(player)}
      </article>
    `;
  }

  function classPicker(player) {
    const selected = classInfo(player.className);
    return `
      <div class="class-summary">
        <div class="class-summary-head">
          ${classAvatar(selected)}
          <div>
            <strong>${h(selected.name)}</strong>
            <span>${h(selected.tag)}</span>
          </div>
        </div>
        <label>Klasse
          <select data-field="className" data-id="${player.id}">
            ${classes.map((item) => `<option value="${h(item.name)}" ${item.name === selected.name ? "selected" : ""}>${h(item.name)}</option>`).join("")}
          </select>
        </label>
        <p>${h(selected.description)}</p>
        <p class="muted">✨ ${h(selected.effect)}</p>
      </div>
    `;
  }

  function renderGame() {
    const chapterData = currentChapter();
    const active = state.players[state.activePlayer];
    const isBoss = state.chapter === story().chapters.length - 1;
    layout(`
      <section class="stack game-screen">
        ${state.helpOpen ? helpPanel() : ""}
        <article class="active-banner">
          <span>Jetzt dran</span>
          <strong>${h(active?.alias || "Niemand")}</strong>
          <em>🃏 Ziehen · 🎲 Spielen · 🏆 Werten</em>
        </article>
        <div class="tabs" style="grid-template-columns: repeat(${story().chapters.length}, minmax(0, 1fr));">
          ${story().chapters.map((entry, index) => `<button class="${index === state.chapter ? "active" : "secondary"}" data-action="chapter" data-index="${index}">${index + 1}</button>`).join("")}
        </div>
        ${state.drawnCard ? renderDrawnCard(state.drawnCard) : ""}
        <div class="grid desktop-grid">
          <article class="card hot chapter-card">
            <p class="eyebrow">${h(story().title)} / Kapitel ${state.chapter + 1}</p>
            <h2>${h(chapterData.title)}</h2>
            <div class="pill-row">
              <span class="pill">👤 ${h(active?.alias || "Niemand")}</span>
              <span class="pill">🔁 ${state.activePlayer + 1}/${state.players.length}</span>
              <span class="pill">🔥 ${story().intensity}/5</span>
            </div>
          </article>
          ${isBoss ? bossPanel() : drawPanel()}
        </div>
        <div class="grid two turn-actions">
          <button class="secondary" data-action="next-player">Naechster Spieler</button>
          <button class="ghost" data-action="scoreboard">Punkteuebersicht</button>
        </div>
        <h2 class="section-title">Scoreboard</h2>
        <div class="grid players-grid">${state.players.map(playerRuntimeCard).join("")}</div>
        <button class="danger" data-action="reset">Spiel beenden und loeschen</button>
      </section>
    `);
  }

  function helpPanel() {
    return `
      <article class="card hot">
        <h2 class="section-title">Kurzablauf</h2>
        <p>🃏 Karte ziehen · 🎭 Aufgabe machen · 🏆 Ergebnis klicken · 🔁 Naechster Spieler</p>
        <button class="ghost small" data-action="toggle-help">Schliessen</button>
      </article>
    `;
  }

  function drawPanel() {
    const types = currentChapter().drawTypes;
    return `
      <article class="card">
        <h2 class="section-title">Aktionen</h2>
        <div class="grid">
          <button data-action="draw-chapter">🃏 Quest ziehen</button>
          <div class="grid two">
            ${types.map((type) => `<button class="secondary small" data-action="draw-type" data-type="${type}">${labelForType(type)}</button>`).join("")}
          </div>
          ${dicePanel()}
          <button class="ghost small" data-action="toggle-help">?</button>
          <button class="ghost small" data-action="minigames">🎲 Minispiele</button>
        </div>
      </article>
    `;
  }

  function bossPanel() {
    const width = state.boss.maxHp ? Math.max(0, (state.boss.hp / state.boss.maxHp) * 100) : 0;
    return `
      <article class="card">
        <h2 class="section-title">${h(story().boss.name)}</h2>
        <div class="bossbar" style="--boss-width:${width}%"><div></div></div>
        <p><strong>${state.boss.hp}/${state.boss.maxHp} LP</strong></p>
        <div class="grid">
          <button class="danger" data-action="boss-attack">💥 Angriff</button>
          <button class="secondary" data-action="finish">🏁 Sieg</button>
          ${dicePanel()}
          <button class="ghost small" data-action="toggle-help">?</button>
          <button class="ghost small" data-action="minigames">🎲 Minispiele</button>
        </div>
      </article>
    `;
  }

  function dicePanel() {
    return `
      <div class="dice-panel">
        <button class="small" data-action="roll-die">🎲 Wuerfeln</button>
        <p>${state.dieResult ? h(dieText(state.dieResult)) : "1-3 knapp · 4-6 gut"}</p>
      </div>
    `;
  }

  function renderDrawnCard(cardData) {
    const game = cardData.minigameId ? minigames.find((entry) => entry.id === cardData.minigameId) : null;
    return `
      <article class="card hot drawn-card type-${h(cardData.type)}">
        <p class="quest-stamp">🃏 Quest</p>
        <p class="eyebrow">${labelForType(cardData.type)}</p>
        <h2>${h(cardData.title)}</h2>
        <p><strong>🎭</strong> ${h(cardData.task)}</p>
        <p><strong>🏆</strong> ${h(cardData.reward)}</p>
        ${game ? `<p><strong>👥</strong> ${h(game.participants)}<br><strong>✅</strong> ${h(game.win)}</p>` : ""}
        <div class="safe-note"><strong>↔️</strong> ${h(cardData.alternative || "Ersatzaufgabe machen.")}</div>
        <div class="card-actions">
          <button data-action="card-success">✅ Erfolg</button>
          <button class="danger" data-action="card-fail">❌ Fail</button>
          <button class="secondary" data-action="card-alternative">↔️ Option</button>
        </div>
      </article>
    `;
  }

  function playerRuntimeCard(player) {
    return `
      <article class="card player-card">
        <div class="player-head">
          <div>
            <h3 class="player-name">${h(player.alias)}</h3>
            <p class="muted">${h(player.name)} / ${h(player.className)}</p>
          </div>
          <button class="${player.abilityReady ? "secondary" : "ghost"} small" data-action="toggle-ability" data-id="${player.id}">${player.abilityReady ? "Faehig" : "Verbraucht"}</button>
        </div>
        <div class="stats">
          <div class="stat"><span>LP<strong>${player.hp}</strong></span></div>
          <div class="stat"><span>Ruhm<strong>${player.glory}</strong></span></div>
          <div class="stat"><span>Skill<strong>${player.abilityReady ? "Ja" : "Nein"}</strong></span></div>
        </div>
        <div class="adjust">
          <button class="small ghost" data-action="hp-minus" data-id="${player.id}">LP-</button>
          <button class="small ghost" data-action="hp-plus" data-id="${player.id}">LP+</button>
          <button class="small ghost" data-action="glory-minus" data-id="${player.id}">R-</button>
          <button class="small ghost" data-action="glory-plus" data-id="${player.id}">R+</button>
        </div>
        ${state.chapter === story().chapters.length - 1 ? bossActionsFor(player) : ""}
      </article>
    `;
  }

  function bossActionsFor(player) {
    return `
      <div class="grid">
        ${story().boss.actions.map((action, index) => `<button class="small ${action.once ? "danger" : "secondary"}" data-action="boss-action" data-index="${index}" data-id="${player.id}" ${action.once && player.bossSpecialUsed ? "disabled" : ""}>${h(action.label)}</button>`).join("")}
      </div>
    `;
  }

  function renderScoreboard() {
    const sorted = [...state.players].sort((a, b) => b.glory - a.glory);
    layout(`
      <section class="stack">
        <div class="card hot">
          <h1 class="section-title">Punkteuebersicht</h1>
        </div>
        ${sorted.map((player, index) => `
          <article class="card player-head">
            <div><strong>${index + 1}. ${h(player.alias)}</strong><p class="muted">${h(player.className)}</p></div>
            <div class="pill-row"><span class="pill">${player.glory} Ruhm</span><span class="pill">${player.hp} LP</span></div>
          </article>
        `).join("")}
        <button data-action="game">Zurueck zum Spiel</button>
      </section>
    `);
  }

  function renderMinigames() {
    layout(`
      <section class="stack">
        <article class="card hot">
          <h1 class="section-title">Minispiele</h1>
        </article>
        <div class="grid players-grid">
          ${minigames.map((game) => `
            <article class="card">
              <h2 class="section-title">${h(game.title)}</h2>
              <p>${h(game.text)}</p>
              <p><strong>Teilnehmer:</strong> ${h(game.participants)}</p>
              <p><strong>Gewinn:</strong> ${h(game.win)}</p>
              <p><strong>Belohnung:</strong> ${h(game.reward)}</p>
              <div class="safe-note"><strong>Option:</strong> ${h(game.alternative)}</div>
            </article>
          `).join("")}
        </div>
        <button data-action="${state.players.length ? "game" : "stories"}">Zurueck</button>
      </section>
    `);
  }

  function renderEnd() {
    const sorted = [...state.players].sort((a, b) => b.glory - a.glory);
    layout(`
      <section class="stack">
        <article class="card hot">
          <p class="eyebrow">${h(story().title)}</p>
          <h1 class="section-title">${h(story().boss.name)} bestanden.</h1>
          <p>${h(story().boss.victoryText || story().finalText)}</p>
        </article>
        ${sorted.map((player, index) => `
          <article class="card player-head">
            <div>
              <strong>${index + 1}. ${h(player.alias)}</strong>
              <p class="muted">${h(titles[index % titles.length])}</p>
            </div>
            <span class="pill">${player.glory} Ruhmpunkte</span>
          </article>
        `).join("")}
        <div class="grid two">
          <button class="secondary" data-action="stories">Neue Story</button>
          <button class="danger" data-action="reset">Reset</button>
        </div>
      </section>
    `);
  }

  function renderRules() {
    layout(`
      <section class="stack">
        <article class="card hot">
          <h1 class="section-title">Regeln</h1>
          <p>Das Ziel ist ein guter Abend mit moeglichst vielen legendaeren Momenten.</p>
        </article>
        <article class="card rules">
          <ul>
            <li>Alle Aufgaben sind Optionen.</li>
            <li>Der Spielleiter kann Aufgaben jederzeit ersetzen.</li>
            <li>Keine Diskussion, wenn jemand aussetzt.</li>
            <li>Der Spielleiter darf Aufgaben ueberspringen.</li>
            <li>Wer nicht mehr spielen moechte, kann jederzeit aussetzen.</li>
            <li>Pausen sind erlaubt und meistens eine gute Idee.</li>
            <li>Keine echten Mutproben mit Risiko.</li>
            <li>Keine echten koerperlichen Auseinandersetzungen.</li>
            <li>Keine Belaestigung von fremden Personen.</li>
            <li>Keine Aufgaben, die andere Gaeste, Personal, Security oder Aussenstehende stoeren.</li>
            <li>In echten Bars oder Clubs nur diskrete, harmlose Aufgaben spielen.</li>
            <li>Kein Spiel beim Autofahren oder vor gefaehrlichen Aktivitaeten.</li>
          </ul>
        </article>
        <button data-action="${state.players.length ? "game" : "home"}">Zurueck</button>
      </section>
    `);
  }

  function labelForType(type) {
    return {
      event: "Ereignis",
      task: "Aufgabe",
      curse: "Fluch",
      toast: "Spruch",
      team: "Team",
      boss: "Boss",
      minigame: "Minispiel"
    }[type] || type;
  }

  function render() {
    if (state.view === "stories") renderStories();
    else if (state.view === "class-preview") renderClassPreview();
    else if (state.view === "intro") renderSetup();
    else if (state.view === "setup") renderSetup();
    else if (state.view === "game") renderGame();
    else if (state.view === "rules") renderRules();
    else if (state.view === "scoreboard") renderScoreboard();
    else if (state.view === "minigames") renderMinigames();
    else if (state.view === "end") renderEnd();
    else renderHome();
  }

  app.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const action = button.dataset.action;
    if (action === "home") setView("home");
    if (action === "stories") setView("stories");
    if (action === "choose-story") chooseStory(button.dataset.id);
    if (action === "setup") setView("setup");
    if (action === "continue") continueGame();
    if (action === "rules") setView("rules");
    if (action === "minigames") setView("minigames");
    if (action === "add-player") addPlayer();
    if (action === "remove-player") removePlayer(button.dataset.id);
    if (action === "random-all-classes") randomizeAllClasses();
    if (action === "choose-class") updatePlayer(button.dataset.id, { className: button.dataset.class });
    if (action === "random-alias") {
      const player = state.players.find((entry) => entry.id === button.dataset.id);
      updatePlayer(button.dataset.id, { alias: generateSaufname(player?.name || "Held") });
    }
    if (action === "random-class") updatePlayer(button.dataset.id, { className: randomOf(classes).name });
    if (action === "start-game") startGame();
    if (action === "chapter") setChapter(Number(button.dataset.index));
    if (action === "draw-chapter") drawChapterCard();
    if (action === "draw-type") drawCard(button.dataset.type);
    if (action === "toggle-help") {
      state.helpOpen = !state.helpOpen;
      saveState();
      render();
    }
    if (action === "roll-die") rollDie();
    if (action === "card-success") resolveCard("success");
    if (action === "card-fail") resolveCard("fail");
    if (action === "card-alternative") resolveCard("alternative");
    if (action === "next-player") nextPlayer();
    if (action === "scoreboard") setView("scoreboard");
    if (action === "game") setView("game");
    if (action === "toggle-ability") {
      const player = state.players.find((entry) => entry.id === button.dataset.id);
      updatePlayer(button.dataset.id, { abilityReady: !player.abilityReady });
    }
    if (action === "hp-minus") adjustPlayer(button.dataset.id, "hp", -1);
    if (action === "hp-plus") adjustPlayer(button.dataset.id, "hp", 1);
    if (action === "glory-minus") adjustPlayer(button.dataset.id, "glory", -1);
    if (action === "glory-plus") adjustPlayer(button.dataset.id, "glory", 1);
    if (action === "boss-action") applyBossAction(story().boss.actions[Number(button.dataset.index)], button.dataset.id);
    if (action === "boss-attack") bossAttack();
    if (action === "finish") finishGame();
    if (action === "reset") resetGame();
  });

  app.addEventListener("input", (event) => {
    const field = event.target.dataset.field;
    const id = event.target.dataset.id;
    if (!field || !id) return;
    const player = state.players.find((entry) => entry.id === id);
    if (!player) return;
    player[field] = event.target.value;
    if (field === "name" && !player.alias.trim()) player.alias = generateSaufname(event.target.value);
    saveState();
    if (field === "className") render();
  });

  app.addEventListener("change", (event) => {
    const field = event.target.dataset.field;
    const id = event.target.dataset.id;
    if (field !== "className" || !id) return;
    updatePlayer(id, { className: event.target.value });
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
  }

  render();
})();
