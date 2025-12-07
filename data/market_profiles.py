"""Curated data about popular European Christmas markets."""

from __future__ import annotations

MARKET_PROFILES = {
    "Nuremberg": {
        "country": "Germany",
        "region": "bavaria",
        "dates": "29 Nov – 24 Dec, 2025",
        "summary": "Story-book lanes lit by lanterns, one of Europe's oldest Christkindlesmarkt celebrations.",
        "themes": ["tradition", "history"],
        "best_for": ["food", "history", "crafts"],
        "price_level": "mid",
        "ideal_pace": "moderate",
        "signature_market": "Christkindlesmarkt on the Hauptmarkt",
        "highlights": [
            "Opening speech from the Christkind on the Frauenkirche balcony",
            "Zwetschgenmännle (prune people) stalls and Franconian crafts",
            "Lantern-lit walk to the Imperial Castle walls",
        ],
        "foods": ["Nürnberger Rostbratwurst", "Elisenlebkuchen", "Feuerzangenbowle"],
        "experiences": [
            "Ride the vintage stagecoach around the Altstadt",
            "Day trip to Rothenburg ob der Tauber's Reiterlesmarkt",
            "Climb the castle ramparts for sunset views of red roofs",
        ],
        "accommodations": [
            {
                "name": "Hotel Drei Raben",
                "type": "Boutique design hotel",
                "price": "€€€",
                "note": "Story-themed rooms, 8 minutes to Hauptmarkt.",
            },
            {
                "name": "Melter Hotel & Apartments",
                "type": "Mid-range suites",
                "price": "€€",
                "note": "Kitchenettes in the pedestrian zone near Lorenzkirche.",
            },
        ],
        "transport": {
            "arrival": "Fly into NUE (20 min by U2) or take ICE from Munich (1h) / Frankfurt (2h30).",
            "local": "Altstadt is walkable; trams 4/5 and U1 reach every gate.",
            "connections": [
                "Nuremberg → Munich: ICE 1h05",
                "Munich → Salzburg: Railjet 1h30",
                "Salzburg → Vienna: Railjet 2h30",
            ],
        },
        "culture": {
            "customs": [
                "The Christkind opens the season every Friday at 17:30.",
                "Most huts remain cash-only; keep €1 coins for snacks.",
            ],
            "tips": [
                "Collect the annual mug (ca. €3 deposit) as a souvenir.",
                "Crowds thin after 20:30 making it easier to browse.",
            ],
            "phrases": ["Frohe Weihnachten! (Merry Christmas)"],
        },
        "side_trip": "Half-day detour to Bamberg or Rothenburg for medieval squares.",
    },
    "Munich": {
        "country": "Germany",
        "region": "bavaria",
        "dates": "27 Nov – 24 Dec, 2025",
        "summary": "Big-city sparkle with multiple themed markets across Munich.",
        "themes": ["food", "crafts"],
        "best_for": ["food", "shopping", "music"],
        "price_level": "mid",
        "ideal_pace": "active",
        "signature_market": "Marienplatz Christkindlmarkt & Medieval market at Wittelsbacher Platz",
        "highlights": [
            "25 m spruce tree lit in front of the Neues Rathaus",
            "Medieval market with blacksmiths, archers, and mead",
            "Pink LGBTQ-friendly market on Stephansplatz",
        ],
        "foods": ["Käsespätzle", "Schupfnudeln", "Heisse Maroni"],
        "experiences": [
            "Visit the Residenz courtyard village for artisan huts",
            "Skate at Karlsplatz then warm up with Eierpunsch",
            "Climb St. Peter's tower for skyline views",
        ],
        "accommodations": [
            {
                "name": "Platzl Hotel",
                "type": "Classic Bavarian",
                "price": "€€€",
                "note": "Two minutes from Marienplatz and Viktualienmarkt.",
            },
            {
                "name": "25hours Hotel The Royal Bavarian",
                "type": "Design hotel",
                "price": "€€",
                "note": "Across from Hauptbahnhof; direct airport train.",
            },
        ],
        "transport": {
            "arrival": "MUC airport with direct S1/S8 (45 min) or Lufthansa Express bus (30 min).",
            "local": "Extensive U-Bahn and tram network; day tickets cost ~€8.80.",
            "connections": [
                "Munich → Salzburg: Railjet 1h30",
                "Munich → Innsbruck: EC 1h50",
                "Munich → Nuremberg: ICE 1h05",
            ],
        },
        "culture": {
            "customs": [
                "Locals meet at Glühwein pyramids after work around 18:00.",
                "Reusable Pfand cups reduce waste—return them or keep as souvenirs.",
            ],
            "tips": [
                "Medieval market huts only accept cash.",
                "Book beer hall tables (Augustiner, Hofbräu) in advance in December.",
            ],
            "phrases": ["Servus! (Bavarian hello)", "Prost! (Cheers)"],
        },
        "side_trip": "Neuschwanstein Castle or Lake Tegernsee for alpine scenery.",
    },
    "Dresden": {
        "country": "Germany",
        "region": "saxony",
        "dates": "27 Nov – 24 Dec, 2025",
        "summary": "Germany's oldest market (1434) with baroque flair along the Elbe.",
        "themes": ["tradition", "crafts"],
        "best_for": ["history", "crafts", "photo"],
        "price_level": "budget",
        "ideal_pace": "relaxed",
        "signature_market": "Striezelmarkt & the Neumarkt Advent quarter",
        "highlights": [
            "14 m wooden Christmas pyramid that slowly turns",
            "Massive Stollen fruitcake festival on second Advent weekend",
            "Hand-painted Herrnhuter stars glowing above every lane",
        ],
        "foods": ["Dresdner Christstollen", "Quarkkeulchen", "Saxon potato soup"],
        "experiences": [
            "Workshop on carving wooden angels from the Erzgebirge",
            "River cruise with mulled wine to Pillnitz Palace",
            "Sunset viewpoint from Brühl's Terrace",
        ],
        "accommodations": [
            {
                "name": "Hyperion Hotel Dresden am Schloss",
                "type": "Modern luxury",
                "price": "€€€",
                "note": "Spa in the vaults beneath the Royal Palace.",
            },
            {
                "name": "Motel One Dresden am Zwinger",
                "type": "Budget design",
                "price": "€€",
                "note": "Opposite the Zwinger and 5 min to Striezelmarkt.",
            },
        ],
        "transport": {
            "arrival": "DRS airport (20 min S2) or ICE via Leipzig/Berlin.",
            "local": "Trams 4, 8, and 11 stitch together every market square.",
            "connections": [
                "Dresden → Prague: Railjet 2h20 along the Elbe",
                "Dresden → Berlin: ICE 2h",
            ],
        },
        "culture": {
            "customs": [
                "Stollen is served with powdered sugar 'snow'; never eat without brushing excess off first.",
                "Advent Sundays feature choir performances in the Frauenkirche.",
            ],
            "tips": [
                "Arrive before 11:00 to watch bakers coat the giant Stollen.",
                "Warm up in the Pfunds Molkerei dairy for ornate tiles.",
            ],
            "phrases": ["Schöne Adventszeit! (Have a lovely Advent season)"],
        },
        "side_trip": "Steam train to the Ore Mountains workshops in Seiffen.",
    },
    "Vienna": {
        "country": "Austria",
        "region": "alps",
        "dates": "16 Nov – 26 Dec, 2025",
        "summary": "Imperial backdrops, classical concerts, and more than a dozen markets.",
        "themes": ["music", "romance"],
        "best_for": ["music", "food", "history"],
        "price_level": "premium",
        "ideal_pace": "moderate",
        "signature_market": "Vienna Christmas World at Rathausplatz",
        "highlights": [
            "Ice dream skating trails around Rathauspark trees",
            "Romantic lights at Schönbrunn and Belvedere Palace markets",
            "Christmas concerts inside St. Stephen's Cathedral",
        ],
        "foods": ["Kaiserschmarrn", "Punch with apricot brandy", "Sachertorte"],
        "experiences": [
            "Attend an Advent concert in the Minoritenkirche",
            "Coffeehouse hopping between Demel, Café Central, and Hawelka",
            "Ride the Ring Tram for illuminated boulevard views",
        ],
        "accommodations": [
            {
                "name": "Hotel Sacher Wien",
                "type": "Legendary luxury",
                "price": "€€€€",
                "note": "Opposite the Opera, private access to the café.",
            },
            {
                "name": "Motel One Staatsoper",
                "type": "Design budget",
                "price": "€€",
                "note": "Affordable rooms 5 min from Karlsplatz Art Advent.",
            },
        ],
        "transport": {
            "arrival": "Vienna Airport (VIE) → City Airport Train 16 min or ÖBB Railjet 18 min.",
            "local": "U-Bahn network and tram D circle the palace markets efficiently.",
            "connections": [
                "Vienna → Salzburg: Railjet 2h30",
                "Vienna → Budapest: Railjet 2h40",
            ],
        },
        "culture": {
            "customs": [
                "Locals mix rum punch with orange juice for warmth.",
                "Schönbrunn stalls close earlier (21:00) than Rathausplatz (22:00).",
            ],
            "tips": [
                "Reserve tickets for Christmas oratorios well ahead.",
                "Use the Advent lighting map from WienTourismus for self-guided walks.",
            ],
            "phrases": ["Schönen Advent! (Happy Advent)"],
        },
        "side_trip": "Train to the Wachau Valley for mulled wine among terraced vineyards.",
    },
    "Salzburg": {
        "country": "Austria",
        "region": "alps",
        "dates": "21 Nov – 1 Jan, 2026",
        "summary": "Alpine scenery with choir music echoing off the cathedral domes.",
        "themes": ["music", "mountains"],
        "best_for": ["music", "photo", "relaxed"],
        "price_level": "mid",
        "ideal_pace": "relaxed",
        "signature_market": "Salzburger Christkindlmarkt around Domplatz & Residenzplatz",
        "highlights": [
            "Singing choirs from cathedral balconies each evening",
            "Advent brass concerts at Hohensalzburg Fortress",
            "Hellbrunn 'Silent Night' trick-fountain market with live reindeer",
        ],
        "foods": ["Bosna sausages", "Mozartkugel pralines", "Hot elderflower punch"],
        "experiences": [
            "Funicular to the fortress for panoramic glühwein",
            "Horse-drawn sleigh ride across the Salzach",
            "Sound of Music locations sprinkled with fairy lights",
        ],
        "accommodations": [
            {
                "name": "Hotel Goldener Hirsch",
                "type": "Historic luxury",
                "price": "€€€",
                "note": "On Getreidegasse, perfect for evening strolls.",
            },
            {
                "name": "Hotel & Villa Auersperg",
                "type": "Boutique eco hotel",
                "price": "€€",
                "note": "Rooftop sauna, free bikes for riverside rides.",
            },
        ],
        "transport": {
            "arrival": "SZG airport (15 min bus) or Railjet from Munich (1h30).",
            "local": "Everything in the Old Town is walkable; trolleybus 25 reaches Hellbrunn.",
            "connections": [
                "Salzburg → Hallstatt: Bus + train 2h15",
                "Salzburg → Vienna: Railjet 2h30",
            ],
        },
        "culture": {
            "customs": [
                "The Christkind and angels parade every Saturday at 15:30.",
                "Smoke incense cones (Räucherkerzen) to bless homes before Christmas.",
            ],
            "tips": [
                "Book fortress concert+dinner packages for snowy evenings.",
                "Hellbrunn market is magical after dusk when lanterns reflect in the pools.",
            ],
            "phrases": ["Griaß di! (Austrian dialect greeting)"],
        },
        "side_trip": "Bus to St. Gilgen and St. Wolfgang lake markets on the Salzkammergut.",
    },
    "Strasbourg": {
        "country": "France",
        "region": "alsace",
        "dates": "22 Nov – 29 Dec, 2025",
        "summary": "The 'Capital of Christmas' with half-timbered lanes and Franco-German flavors.",
        "themes": ["romance", "crafts"],
        "best_for": ["romance", "shopping", "food"],
        "price_level": "mid",
        "ideal_pace": "moderate",
        "signature_market": "Christkindelsmärik at Place Broglie & Cathedral square",
        "highlights": [
            "Netflix-famous 30 m Christmas tree on Place Kléber",
            "Guest-country market showcasing a different nation each year",
            "Boat cruises under twinkling Petite France bridges",
        ],
        "foods": ["Tarte flambée", "Bredele biscuits", "Vin chaud with Alsatian spices"],
        "experiences": [
            "Cycle along the Ill river to admire illuminated covered bridges",
            "Wine tasting of Gewürztraminer at Cave Historique des Hospices",
            "Cross to German Kehl for a bi-national market hop",
        ],
        "accommodations": [
            {
                "name": "Hotel Cour du Corbeau",
                "type": "Timbered luxury",
                "price": "€€€",
                "note": "16th-century courtyard minutes from the cathedral.",
            },
            {
                "name": "Hôtel Tandem",
                "type": "Eco boutique",
                "price": "€€",
                "note": "Opposite the train station, bike rentals included.",
            },
        ],
        "transport": {
            "arrival": "SXB airport (tram+train 20 min) or TGV from Paris in 1h50.",
            "local": "Trams A/D whisk you from station to cathedral; Petite France is walkable.",
            "connections": [
                "Strasbourg → Colmar: TER 35 min",
                "Strasbourg → Stuttgart: TGV/ICE 1h20",
            ],
        },
        "culture": {
            "customs": [
                "Switch between French and German greetings—both are common.",
                "Eco-friendly mindset: bring tote bags for artisan purchases.",
            ],
            "tips": [
                "Reserve a table inside Maison Kammerzell for Gothic murals.",
                "Sunset boat cruise best shows the cathedral illumination.",
            ],
            "phrases": ["Joyeux Noël! (Merry Christmas)"],
        },
        "side_trip": "Colmar's gingerbread-colored squares and Eguisheim wine villages.",
    },
    "Prague": {
        "country": "Czech Republic",
        "region": "central_europe",
        "dates": "30 Nov – 6 Jan, 2026",
        "summary": "Gothic spires, Astronomical Clock carols, and extended markets into January.",
        "themes": ["history", "nightlife"],
        "best_for": ["history", "photo", "food"],
        "price_level": "budget",
        "ideal_pace": "moderate",
        "signature_market": "Old Town Square & Wenceslas Square markets",
        "highlights": [
            "Live nativity scene with farm animals near Týn Church",
            "View from the Old Town Hall tower over thousands of lights",
            "Trdelník chimney cakes baked over open coals",
        ],
        "foods": ["Trdelník", "Old Prague ham", "Medovina (honey wine)"],
        "experiences": [
            "Evening jazz cruise on the Vltava with mulled wine",
            "Walk across Charles Bridge at dawn before crowds",
            "Climb Petřín Hill funicular for city panoramas",
        ],
        "accommodations": [
            {
                "name": "Hotel Josef",
                "type": "Minimalist design",
                "price": "€€",
                "note": "Hidden courtyard, 4 min to Old Town Square.",
            },
            {
                "name": "NYX Hotel Prague",
                "type": "Pop-art hotel",
                "price": "€€",
                "note": "Next to Wenceslas Square for nightlife lovers.",
            },
        ],
        "transport": {
            "arrival": "PRG airport → Airport Express bus 35 min to hlavní nádraží.",
            "local": "Metro (A/B/C) + trams; buy 24-hour pass for 120 CZK.",
            "connections": [
                "Prague → Dresden: Railjet 2h20",
                "Prague → Vienna: Railjet 4h",
            ],
        },
        "culture": {
            "customs": [
                "Czech carp soup tradition appears everywhere—try it in local taverns.",
                "Markets stay open through Three Kings Day (6 Jan).",
            ],
            "tips": [
                "Keep small crowns for trdelník stalls; many don't accept cards.",
                "Watch hourly chimes of the Astronomical Clock from the square center.",
            ],
            "phrases": ["Veselé Vánoce! (Merry Christmas)"],
        },
        "side_trip": "Kutná Hora's bone church or Karlštejn Castle for castle markets.",
    },
    "Zurich": {
        "country": "Switzerland",
        "region": "switzerland",
        "dates": "21 Nov – 24 Dec, 2025",
        "summary": "Lakeside sparkle with crystal Christmas tree inside the main station.",
        "themes": ["luxury", "design"],
        "best_for": ["luxury", "shopping", "photo"],
        "price_level": "premium",
        "ideal_pace": "relaxed",
        "signature_market": "Christkindlimarkt at Hauptbahnhof & Wienachtsdorf at Sechseläutenplatz",
        "highlights": [
            "49-foot Swarovski tree with 7000 crystals in the station hall",
            "Fondue chalets overlooking Lake Zurich",
            "Lichterschwimmen floating candles on the Limmat (19 December)",
        ],
        "foods": ["Swiss raclette", "Luxemburgerli macarons", "Glühmost (spiced cider)"],
        "experiences": [
            "Ride the Polybahn funicular for skyline photos",
            "Visit the singing Christmas tree choir on Werdmühleplatz",
            "Day trip on the Gotthard Panorama Express for snowy peaks",
        ],
        "accommodations": [
            {
                "name": "Baur au Lac",
                "type": "Grand hotel",
                "price": "€€€€",
                "note": "Private park by the lake, discreet service.",
            },
            {
                "name": "25hours Hotel Langstrasse",
                "type": "Creative lifestyle",
                "price": "€€",
                "note": "Next to Hardbrücke for quick S-Bahn hops.",
            },
        ],
        "transport": {
            "arrival": "ZRH airport → S-Bahn S2/S16 in 12 min to Hauptbahnhof.",
            "local": "Trams 2, 4, 8 cover markets; Zurich Card bundles transport + museum entry.",
            "connections": [
                "Zurich → Lucerne: IR 45 min",
                "Zurich → Basel: IC 1h",
            ],
        },
        "culture": {
            "customs": [
                "Swiss markets close punctually at 21:00—plan dinner earlier.",
                "Order 'heissi Maroni' (roasted chestnuts) for hand warmers.",
            ],
            "tips": [
                "Reserve fondue stübli seats online; they sell out on weekends.",
                "Bundle up—lake breezes make evenings feel colder than forecast.",
            ],
            "phrases": ["Schöni Wienacht! (Swiss German for Merry Christmas)"],
        },
        "side_trip": "Lucerne's KKL market or the illuminated Rhine Falls at night.",
    },
}


