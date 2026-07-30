/* ============================================================
   WWII CAUSAL ATLAS — SOURCE REGISTRY

   Every event in data.js carries a list of source ids into SOURCES below.
   NOTES holds claim-level citations for the statements in this project that
   are corrections of common errors, or that historians actively dispute.

   Coverage is at the level of the event: the sources listed for an event
   support the claims in that event's caption and detail text. Statements
   flagged in NOTES are cited individually.

   Source `kind`:
     primary       document text, official history, or archival record
     institution   museum / national archive / government body
     scholarship   peer-reviewed or academic working paper
     encyclopedia  tertiary reference (itself footnoted — a starting point)
     journalism    reported article

   Every URL here was checked to resolve at the time of writing.
============================================================ */

const SOURCES = {
  "wp-versailles": {
    "title": "Treaty of Versailles",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Treaty_of_Versailles"
  },
  "wp-depression": {
    "title": "Great Depression",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Great_Depression"
  },
  "wp-depression-de": {
    "title": "Great Depression in Germany",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Great_Depression_in_Germany"
  },
  "wp-manchuria": {
    "title": "Japanese invasion of Manchuria",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Japanese_invasion_of_Manchuria"
  },
  "wp-hitler-power": {
    "title": "Adolf Hitler's rise to power",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Adolf_Hitler's_rise_to_power"
  },
  "wp-rearmament": {
    "title": "Remilitarisation of the Rhineland",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Remilitarisation_of_the_Rhineland"
  },
  "wp-sino-japanese": {
    "title": "Second Sino-Japanese War",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Second_Sino-Japanese_War"
  },
  "wp-anschluss": {
    "title": "Anschluss",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Anschluss"
  },
  "wp-munich": {
    "title": "Munich Agreement",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Munich_Agreement"
  },
  "wp-czech-occupy": {
    "title": "Occupation of Czechoslovakia (1938–1945)",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Occupation_of_Czechoslovakia_(1938%E2%80%931945)"
  },
  "wp-molotov-ribbentrop": {
    "title": "Molotov–Ribbentrop Pact",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Molotov%E2%80%93Ribbentrop_Pact"
  },
  "wp-poland-invasion": {
    "title": "Invasion of Poland",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Invasion_of_Poland"
  },
  "wp-polish-af": {
    "title": "Polish Air Force",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Polish_Air_Force"
  },
  "wp-declaration-war": {
    "title": "Declarations of war during World War II",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Declarations_of_war_during_World_War_II"
  },
  "wp-ussr-poland": {
    "title": "Soviet invasion of Poland",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Soviet_invasion_of_Poland"
  },
  "wp-winter-war": {
    "title": "Winter War",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Winter_War"
  },
  "wp-denmark-norway": {
    "title": "Operation Weserübung",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Operation_Weser%C3%BCbung"
  },
  "wp-netherlands": {
    "title": "German invasion of the Netherlands",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/German_invasion_of_the_Netherlands"
  },
  "wp-france": {
    "title": "Battle of France",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Battle_of_France"
  },
  "wp-france-fall": {
    "title": "Armistice of 22 June 1940",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Armistice_of_22_June_1940"
  },
  "wp-battle-britain": {
    "title": "Battle of Britain",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Battle_of_Britain"
  },
  "wp-italy-africa": {
    "title": "Italian invasion of Egypt",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Italian_invasion_of_Egypt"
  },
  "wp-tripartite": {
    "title": "Tripartite Pact",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Tripartite_Pact"
  },
  "wp-italy-greece": {
    "title": "Greco-Italian War",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Greco-Italian_War"
  },
  "wp-yugoslavia": {
    "title": "Invasion of Yugoslavia",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Invasion_of_Yugoslavia"
  },
  "wp-greece": {
    "title": "German invasion of Greece",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/German_invasion_of_Greece"
  },
  "wp-barbarossa": {
    "title": "Operation Barbarossa",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Operation_Barbarossa"
  },
  "wp-moscow-battle": {
    "title": "Battle of Moscow",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Battle_of_Moscow"
  },
  "wp-oil-embargo": {
    "title": "Prelude to the attack on Pearl Harbor",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Prelude_to_the_attack_on_Pearl_Harbor"
  },
  "wp-pearl-harbor": {
    "title": "Attack on Pearl Harbor",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Attack_on_Pearl_Harbor"
  },
  "wp-us-enters": {
    "title": "United States declaration of war on Japan",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/United_States_declaration_of_war_on_Japan"
  },
  "wp-axis-declare-us": {
    "title": "German declaration of war against the United States",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/German_declaration_of_war_against_the_United_States"
  },
  "wp-japan-expansion": {
    "title": "South-East Asian theatre of World War II",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/South-East_Asian_theatre_of_World_War_II"
  },
  "wp-midway": {
    "title": "Battle of Midway",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Battle_of_Midway"
  },
  "wp-el-alamein": {
    "title": "Second Battle of El Alamein",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Second_Battle_of_El_Alamein"
  },
  "wp-torch": {
    "title": "Operation Torch",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Operation_Torch"
  },
  "wp-stalingrad": {
    "title": "Battle of Stalingrad",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Battle_of_Stalingrad"
  },
  "wp-guadalcanal": {
    "title": "Guadalcanal campaign",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Guadalcanal_campaign"
  },
  "wp-milne-bay": {
    "title": "Battle of Milne Bay",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Battle_of_Milne_Bay"
  },
  "wp-kokoda": {
    "title": "Kokoda Track campaign",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Kokoda_Track_campaign"
  },
  "wp-axis-africa-surrender": {
    "title": "Tunisian campaign",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Tunisian_campaign"
  },
  "wp-sicily": {
    "title": "Allied invasion of Sicily",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Allied_invasion_of_Sicily"
  },
  "wp-grand-council": {
    "title": "Grand Council of Fascism",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Grand_Council_of_Fascism"
  },
  "wp-kursk": {
    "title": "Battle of Kursk",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Battle_of_Kursk"
  },
  "wp-italy-surrender": {
    "title": "Armistice of Cassibile",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Armistice_of_Cassibile"
  },
  "wp-island-hopping": {
    "title": "Leapfrogging (strategy)",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Leapfrogging_(strategy)"
  },
  "wp-dday": {
    "title": "Normandy landings",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Normandy_landings"
  },
  "wp-fortitude": {
    "title": "Operation Fortitude",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Operation_Fortitude"
  },
  "wp-bagration": {
    "title": "Operation Bagration",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Operation_Bagration"
  },
  "wp-paris-liberated": {
    "title": "Liberation of Paris",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Liberation_of_Paris"
  },
  "wp-leyte-gulf": {
    "title": "Battle of Leyte Gulf",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Battle_of_Leyte_Gulf"
  },
  "wp-bulge": {
    "title": "Battle of the Bulge",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Battle_of_the_Bulge"
  },
  "wp-yalta": {
    "title": "Yalta Conference",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Yalta_Conference"
  },
  "wp-iwo-jima": {
    "title": "Battle of Iwo Jima",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Battle_of_Iwo_Jima"
  },
  "wp-okinawa": {
    "title": "Battle of Okinawa",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Battle_of_Okinawa"
  },
  "wp-berlin-fall": {
    "title": "Battle of Berlin",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Battle_of_Berlin"
  },
  "wp-ve-day": {
    "title": "Victory in Europe Day",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Victory_in_Europe_Day"
  },
  "wp-atomic": {
    "title": "Atomic bombings of Hiroshima and Nagasaki",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Atomic_bombings_of_Hiroshima_and_Nagasaki"
  },
  "wp-ussr-japan": {
    "title": "Soviet invasion of Manchuria",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Soviet_invasion_of_Manchuria"
  },
  "wp-japan-surrender": {
    "title": "Surrender of Japan",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Surrender_of_Japan"
  },
  "wp-vj-day": {
    "title": "Japanese Instrument of Surrender",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/Japanese_Instrument_of_Surrender"
  },
  "wp-casualties": {
    "title": "World War II casualties",
    "pub": "Wikipedia",
    "kind": "encyclopedia",
    "url": "https://en.wikipedia.org/wiki/World_War_II_casualties"
  },
  "av-versailles": {
    "title": "The Versailles Treaty, June 28, 1919 (full text)",
    "pub": "Avalon Project, Yale Law School",
    "kind": "primary",
    "url": "https://avalon.law.yale.edu/subject_menus/versailles_menu.asp"
  },
  "av-imt-partiii": {
    "title": "Nazi Conspiracy and Aggression — Aggression against Austria, Czechoslovakia, Poland",
    "pub": "Avalon Project, Yale Law School",
    "kind": "primary",
    "url": "https://avalon.law.yale.edu/imt/partiii.asp"
  },
  "av-frgearm": {
    "title": "Franco-German Armistice, June 25, 1940 (full text)",
    "pub": "Avalon Project, Yale Law School",
    "kind": "primary",
    "url": "https://avalon.law.yale.edu/wwii/frgearm.asp"
  },
  "av-tripartite": {
    "title": "Three-Power Pact Between Germany, Italy and Japan, September 27, 1940 (full text)",
    "pub": "Avalon Project, Yale Law School",
    "kind": "primary",
    "url": "https://avalon.law.yale.edu/wwii/triparti.asp"
  },
  "av-gerdec41": {
    "title": "German Declaration of War with the United States, December 11, 1941 (full text)",
    "pub": "Avalon Project, Yale Law School",
    "kind": "primary",
    "url": "https://avalon.law.yale.edu/wwii/gerdec41.asp"
  },
  "av-yalta": {
    "title": "The Yalta Conference, February 1945 (protocol of proceedings)",
    "pub": "Avalon Project, Yale Law School",
    "kind": "primary",
    "url": "https://avalon.law.yale.edu/wwii/yalta.asp"
  },
  "av-blbk18": {
    "title": "British Blue Book: documents on the outbreak of war, 1939",
    "pub": "Avalon Project, Yale Law School",
    "kind": "primary",
    "url": "https://avalon.law.yale.edu/wwii/blbk18.asp"
  },
  "nww2m-barbarossa": {
    "title": "Operation Barbarossa",
    "pub": "The National WWII Museum, New Orleans",
    "kind": "institution",
    "url": "https://www.nationalww2museum.org/war/articles/operation-barbarossa"
  },
  "nww2m-midway": {
    "title": "The Battle of Midway",
    "pub": "The National WWII Museum, New Orleans",
    "kind": "institution",
    "url": "https://www.nationalww2museum.org/war/articles/battle-midway"
  },
  "awm-milne": {
    "title": "Battle of Milne Bay, 1942 (collection record)",
    "pub": "Australian War Memorial",
    "kind": "institution",
    "url": "https://www.awm.gov.au/collection/E84334"
  },
  "hyperwar": {
    "title": "HyperWar: a hypertext history of the Second World War (official histories & primary documents)",
    "pub": "ibiblio",
    "kind": "primary",
    "url": "https://www.ibiblio.org/hyperwar/"
  },
  "dimsdale": {
    "title": "Dimsdale, Horsewood & van Riel, 'Unemployment in Weimar Germany' (working paper)",
    "pub": "Nuffield College, Oxford",
    "kind": "scholarship",
    "url": "https://www.nuffield.ox.ac.uk/economics/history/Paper56/56dimsdale.pdf"
  },
  "ni-polish-af": {
    "title": "'Not True: Germany Wiped Out the Polish Air Force in Three Days in 1939'",
    "pub": "The National Interest",
    "kind": "journalism",
    "url": "https://nationalinterest.org/blog/buzz/not-true-germany-wiped-out-polish-air-force-three-days-1939-55742"
  },
  "cmh-balkans": {
    "title": "DA Pam 20-260, 'The German Campaigns in the Balkans (Spring 1941)' — Part Five covers the relationship between the Balkan campaign and Barbarossa",
    "pub": "US Army Center of Military History (scanned copy, Internet Archive)",
    "kind": "scholarship",
    "url": "https://archive.org/details/PAM20-260-nsia"
  },
  "osti-manhattan": {
    "title": "Manhattan Project history and declassified records",
    "pub": "US Dept. of Energy, OSTI OpenNet",
    "kind": "primary",
    "url": "https://www.osti.gov/opennet/manhattan-project-history"
  }
};

const eventSources = {
  "versailles": [
    "av-versailles",
    "wp-versailles"
  ],
  "depression": [
    "wp-depression",
    "wp-depression-de",
    "dimsdale"
  ],
  "manchuria": [
    "wp-manchuria"
  ],
  "hitler-power": [
    "wp-hitler-power"
  ],
  "rearmament": [
    "wp-rearmament"
  ],
  "sino-japanese": [
    "wp-sino-japanese"
  ],
  "anschluss": [
    "wp-anschluss",
    "av-imt-partiii"
  ],
  "munich": [
    "wp-munich",
    "av-imt-partiii"
  ],
  "czech-occupy": [
    "wp-czech-occupy",
    "av-imt-partiii"
  ],
  "molotov-ribbentrop": [
    "wp-molotov-ribbentrop",
    "av-imt-partiii"
  ],
  "poland-invasion": [
    "wp-poland-invasion",
    "wp-polish-af",
    "ni-polish-af"
  ],
  "declaration-war": [
    "wp-declaration-war",
    "av-blbk18"
  ],
  "ussr-poland": [
    "wp-ussr-poland"
  ],
  "winter-war": [
    "wp-winter-war"
  ],
  "denmark-norway": [
    "wp-denmark-norway"
  ],
  "low-countries": [
    "wp-netherlands",
    "wp-france"
  ],
  "france-fall": [
    "av-frgearm",
    "wp-france-fall"
  ],
  "battle-britain": [
    "wp-battle-britain"
  ],
  "italy-africa": [
    "wp-italy-africa"
  ],
  "tripartite": [
    "av-tripartite",
    "wp-tripartite"
  ],
  "italy-greece": [
    "wp-italy-greece"
  ],
  "yugoslavia-greece": [
    "wp-yugoslavia",
    "wp-greece",
    "cmh-balkans"
  ],
  "barbarossa": [
    "wp-barbarossa",
    "nww2m-barbarossa",
    "cmh-balkans"
  ],
  "moscow-battle": [
    "wp-moscow-battle"
  ],
  "oil-embargo": [
    "wp-oil-embargo"
  ],
  "pearl-harbor": [
    "wp-pearl-harbor",
    "hyperwar"
  ],
  "us-enters": [
    "wp-us-enters"
  ],
  "axis-declare-us": [
    "av-gerdec41",
    "wp-axis-declare-us"
  ],
  "japan-expansion": [
    "wp-japan-expansion"
  ],
  "midway": [
    "wp-midway",
    "nww2m-midway",
    "hyperwar"
  ],
  "el-alamein": [
    "wp-el-alamein"
  ],
  "torch": [
    "wp-torch"
  ],
  "stalingrad": [
    "wp-stalingrad"
  ],
  "guadalcanal": [
    "wp-guadalcanal",
    "wp-milne-bay",
    "awm-milne",
    "wp-kokoda"
  ],
  "axis-africa-surrender": [
    "wp-axis-africa-surrender"
  ],
  "sicily": [
    "wp-sicily",
    "wp-grand-council"
  ],
  "kursk": [
    "wp-kursk"
  ],
  "italy-surrender": [
    "wp-italy-surrender"
  ],
  "island-hopping": [
    "wp-island-hopping"
  ],
  "dday": [
    "wp-dday",
    "wp-fortitude"
  ],
  "bagration": [
    "wp-bagration"
  ],
  "paris-liberated": [
    "wp-paris-liberated"
  ],
  "leyte-gulf": [
    "wp-leyte-gulf"
  ],
  "bulge": [
    "wp-bulge"
  ],
  "yalta": [
    "av-yalta",
    "wp-yalta"
  ],
  "iwo-jima": [
    "wp-iwo-jima"
  ],
  "okinawa": [
    "wp-okinawa"
  ],
  "berlin-fall": [
    "wp-berlin-fall"
  ],
  "ve-day": [
    "wp-ve-day"
  ],
  "hiroshima": [
    "wp-atomic",
    "osti-manhattan"
  ],
  "ussr-japan": [
    "wp-ussr-japan",
    "av-yalta"
  ],
  "nagasaki": [
    "wp-atomic",
    "osti-manhattan"
  ],
  "japan-surrender": [
    "wp-japan-surrender"
  ],
  "vj-day": [
    "wp-vj-day",
    "wp-casualties"
  ]
};

const claimNotes = {
  "depression": [
    {
      "claim": "close to a third of the workforce",
      "note": "German unemployment peaked near 6 million in early 1932, about 30% of the labour force. An earlier draft of this project said \"roughly a quarter\", which understates it.",
      "sources": [
        "wp-depression-de",
        "dimsdale"
      ]
    }
  ],
  "manchuria": [
    {
      "claim": "eight years before war broke out in Europe",
      "note": "September 1931 to September 1939 is eight years. An earlier draft said \"over a decade\".",
      "sources": [
        "wp-manchuria"
      ]
    }
  ],
  "versailles": [
    {
      "claim": "Article 231 assigned responsibility to Germany and its allies",
      "note": "Article 231 names \"Germany and her allies\", not Germany alone. The reading of it as a confession of sole guilt is how it was received in Germany, not what the clause says.",
      "sources": [
        "av-versailles",
        "wp-versailles"
      ]
    }
  ],
  "anschluss": [
    {
      "claim": "a rigged plebiscite the following month",
      "note": "German troops entered Austria on 12 March 1938; the plebiscite was held on 10 April 1938 — about four weeks later, not days.",
      "sources": [
        "wp-anschluss"
      ]
    }
  ],
  "poland-invasion": [
    {
      "claim": "the Polish air force was not destroyed on the ground",
      "note": "A persistent myth holds that the Luftwaffe destroyed the Polish air force at its bases in the first days. Polish squadrons had dispersed to camouflaged reserve airfields before 1 September and none remained at their pre-war bases that morning; they stayed in action for roughly two weeks.",
      "sources": [
        "wp-polish-af",
        "ni-polish-af"
      ]
    }
  ],
  "yugoslavia-greece": [
    {
      "claim": "how much of that delay the Balkans actually caused is disputed",
      "note": "The traditional account has the Balkan campaign delaying Barbarossa by about five weeks. Later work questions how much is attributable to the Balkans, pointing to an unusually late spring thaw, flooded rivers and incomplete logistics. Treat the causal weight as contested.",
      "sources": [
        "cmh-balkans",
        "wp-barbarossa"
      ]
    }
  ],
  "guadalcanal": [
    {
      "claim": "the first sustained Allied ground offensive against Japan",
      "note": "Guadalcanal is often called the first Allied land victory over Japan. The first land defeat inflicted on Japanese forces was actually at Milne Bay, New Guinea, in August–September 1942, where Australian troops repelled a landing.",
      "sources": [
        "wp-milne-bay",
        "awm-milne",
        "wp-kokoda"
      ]
    }
  ],
  "sicily": [
    {
      "claim": "brought down Mussolini within about two weeks",
      "note": "The landings began 9–10 July 1943; the Grand Council voted against Mussolini on 24–25 July and the king dismissed him on 25 July — 15 days. An earlier draft said \"days later\".",
      "sources": [
        "wp-sicily",
        "wp-grand-council"
      ]
    }
  ],
  "paris-liberated": [
    {
      "claim": "how much destructive capacity the garrison still had is debated",
      "note": "The account of Dietrich von Choltitz sparing Paris rests substantially on his own postwar testimony; historians question how much demolition capability the garrison actually retained.",
      "sources": [
        "wp-paris-liberated"
      ]
    }
  ]
};
