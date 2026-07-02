const EuleData = {
    levels: {
        gruen: {
            title: "Grüne Eule",
            colorClass: "gruen",
            summary: "Die grüne Eule bietet die meisten Freiheiten.",
            privileges: [
                "Musik hören mit Kopfhörern",
                "Lernpartner frei wählen",
                "Freier Lernort",
                "Freie Themenwahl",
                "Bonus-Eulen"
            ],
            duties: [
                "AV mind. B",
                "SV mind. B",
                "Andere unterstützen",
                "Alle Materialien dabei",
                "Pünktlichkeit",
                "Angemessene Lautstärke",
                "Selbstständige Organisation",
                "Arbeitsort verlässlich angeben",
                "Termingerechte Abgabe von Aufgaben",
                "Arbeitsplatz ordentlich halten"
            ]
        },
        gelb: {
            title: "Gelbe Eule",
            colorClass: "gelb",
            summary: "Die gelbe Eule arbeitet mit etwas mehr Struktur.",
            privileges: [
                "Arbeiten auf dem Flur",
                "Lernpartner des gleichen Levels",
                "Freie Themenwahl"
            ],
            duties: [
                "AV mind. C",
                "SV mind. C",
                "Alle Materialien dabei",
                "Pünktlichkeit",
                "Angemessene Lautstärke",
                "Termingerechte Abgabe von Aufgaben",
                "Selbstständige Organisation",
                "Arbeitsplatz ordentlich halten"
            ]
        },
        rot: {
            title: "Rote Eule",
            colorClass: "rot",
            summary: "Die rote Eule arbeitet mit engerer Begleitung.",
            privileges: [
                "Freie Klassenraumwahl",
                "Lernpartner wird zugewiesen"
            ],
            duties: [
                "AV mind. C",
                "SV mind. C",
                "Arbeitsplatz ordentlich halten",
                "Mit Unterstützung Ziele setzen und daran arbeiten"
            ]
        },
        mini: {
            title: "Mini-Eule Blau",
            colorClass: "mini",
            summary: "Die Mini-Eule ist die Joker-Eule in der Testphase.",
            privileges: [
                "Joker-Eule (Testphase auf dem Flur)",
                "Am eigenen Arbeitsplatz lernen"
            ],
            duties: [
                "Mit Unterstützung von der Lehrkraft gesetzte Ziele bearbeiten",
                "An Regeln und Vereinbarungen mit der Lehrperson halten",
                "Arbeitsplatz ordentlich halten",
                "Eulelernplan besprechen und Themen den Tagen zuordnen"
            ]
        }
    },
    maps: {
        eg: {
            title: "Erdgeschoss",
            src: "assets/maps/eg.pdf",
            label: "EG",
            hint: "Bücherei, Mensa, PC-Raum, Innenhof, Verwaltung und Lehrerzimmer liegen im Erdgeschoss."
        },
        og1: {
            title: "1. Obergeschoss",
            src: "assets/maps/og1.pdf",
            label: "OG1",
            hint: "Räume 1.01 bis 1.16 liegen im 1. Obergeschoss."
        },
        og2: {
            title: "2. Obergeschoss",
            src: "assets/maps/og2.pdf",
            label: "OG2",
            hint: "Räume 2.01 bis 2.07 sowie der Laptop-Raum und die NW-Räume liegen im 2. Obergeschoss."
        },
        cluster: {
            title: "Realschul-Cluster",
            src: "assets/maps/cluster.pdf",
            label: "Cluster",
            hint: "Der Realschul-Cluster enthält Lehrerzimmer und Pausenhalle."
        }
    },
    rooms: [
        { id: "mensa", name: "Mensa", mapId: "eg", area: "Erdgeschoss", short: "Erdgeschoss", description: "Essbereich für Pausen und Mittagspause.", aliases: ["mensa", "essen", "kantine"] },
        { id: "buecherei", name: "Bücherei", mapId: "eg", area: "Erdgeschoss", short: "Erdgeschoss", description: "Ausleihe und ruhiger Lernort.", aliases: ["bücherei", "buecherei", "bibliothek", "bücher", "buecher"] },
        { id: "pc-raum", name: "PC-Raum", mapId: "eg", area: "Erdgeschoss", short: "Erdgeschoss", description: "Computerraum im Erdgeschoss.", aliases: ["pc raum", "pc-raum", "computerraum"] },
        { id: "verwaltung", name: "Verwaltung", mapId: "eg", area: "Erdgeschoss", short: "Erdgeschoss", description: "Verwaltungsbereich der Schule.", aliases: ["verwaltung", "sekretariat"] },
        { id: "lehrerzimmer-eg", name: "Lehrerzimmer", mapId: "eg", area: "Erdgeschoss", short: "Erdgeschoss", description: "Lehrerzimmer im Erdgeschoss-Bereich.", aliases: ["lehrerzimmer", "lehrer zimmer"] },
        { id: "schulsozialarbeit", name: "Schulsozialarbeit", mapId: "eg", area: "Erdgeschoss", short: "Erdgeschoss", description: "Anlaufstelle für Schulsozialarbeit.", aliases: ["schulsozialarbeit", "sozialarbeit"] },
        { id: "innenhof", name: "Innenhof", mapId: "eg", area: "Erdgeschoss", short: "Erdgeschoss", description: "Hofbereich im Zentrum des Erdgeschosses.", aliases: ["innenhof", "hof"] },
        { id: "toiletten-eg", name: "Toiletten", mapId: "eg", area: "Erdgeschoss", short: "Erdgeschoss", description: "Toiletten im Erdgeschoss.", aliases: ["toiletten", "toilette", "wc"] },

        { id: "1.01", name: "Raum 1.01", mapId: "og1", area: "1. Obergeschoss", short: "OG1", description: "Klassen- oder Fachraum im 1. Obergeschoss.", aliases: ["101", "1 01", "raum 1.01"] },
        { id: "1.02", name: "Raum 1.02", mapId: "og1", area: "1. Obergeschoss", short: "OG1", description: "Klassen- oder Fachraum im 1. Obergeschoss.", aliases: ["102", "1 02", "raum 1.02"] },
        { id: "1.03", name: "Raum 1.03", mapId: "og1", area: "1. Obergeschoss", short: "OG1", description: "Klassen- oder Fachraum im 1. Obergeschoss.", aliases: ["103", "1 03", "raum 1.03"] },
        { id: "1.04", name: "Raum 1.04", mapId: "og1", area: "1. Obergeschoss", short: "OG1", description: "Klassen- oder Fachraum im 1. Obergeschoss.", aliases: ["104", "1 04", "raum 1.04"] },
        { id: "1.05", name: "Raum 1.05", mapId: "og1", area: "1. Obergeschoss", short: "OG1", description: "Klassen- oder Fachraum im 1. Obergeschoss.", aliases: ["105", "1 05", "raum 1.05"] },
        { id: "1.06", name: "Raum 1.06", mapId: "og1", area: "1. Obergeschoss", short: "OG1", description: "Klassen- oder Fachraum im 1. Obergeschoss.", aliases: ["106", "1 06", "raum 1.06"] },
        { id: "1.07", name: "Raum 1.07", mapId: "og1", area: "1. Obergeschoss", short: "OG1", description: "Klassen- oder Fachraum im 1. Obergeschoss.", aliases: ["107", "1 07", "raum 1.07"] },
        { id: "1.08", name: "Raum 1.08", mapId: "og1", area: "1. Obergeschoss", short: "OG1", description: "Klassen- oder Fachraum im 1. Obergeschoss.", aliases: ["108", "1 08", "raum 1.08"] },
        { id: "1.09", name: "Raum 1.09", mapId: "og1", area: "1. Obergeschoss", short: "OG1", description: "Klassen- oder Fachraum im 1. Obergeschoss.", aliases: ["109", "1 09", "raum 1.09"] },
        { id: "1.10", name: "Raum 1.10", mapId: "og1", area: "1. Obergeschoss", short: "OG1", description: "Klassen- oder Fachraum im 1. Obergeschoss.", aliases: ["110", "1 10", "raum 1.10"] },
        { id: "1.11", name: "Raum 1.11", mapId: "og1", area: "1. Obergeschoss", short: "OG1", description: "Klassen- oder Fachraum im 1. Obergeschoss.", aliases: ["111", "1 11", "raum 1.11"] },
        { id: "1.12", name: "Raum 1.12", mapId: "og1", area: "1. Obergeschoss", short: "OG1", description: "Klassen- oder Fachraum im 1. Obergeschoss.", aliases: ["112", "1 12", "raum 1.12"] },
        { id: "1.13", name: "Raum 1.13", mapId: "og1", area: "1. Obergeschoss", short: "OG1", description: "Klassen- oder Fachraum im 1. Obergeschoss.", aliases: ["113", "1 13", "raum 1.13"] },
        { id: "1.14", name: "Raum 1.14", mapId: "og1", area: "1. Obergeschoss", short: "OG1", description: "Klassen- oder Fachraum im 1. Obergeschoss.", aliases: ["114", "1 14", "raum 1.14"] },
        { id: "1.15", name: "Raum 1.15", mapId: "og1", area: "1. Obergeschoss", short: "OG1", description: "Klassen- oder Fachraum im 1. Obergeschoss.", aliases: ["115", "1 15", "raum 1.15"] },
        { id: "1.16", name: "Raum 1.16", mapId: "og1", area: "1. Obergeschoss", short: "OG1", description: "Klassen- oder Fachraum im 1. Obergeschoss.", aliases: ["116", "1 16", "raum 1.16"] },
        { id: "elektrik", name: "Elektrik", mapId: "og1", area: "1. Obergeschoss", short: "OG1", description: "Bereich Elektrik im 1. Obergeschoss.", aliases: ["elektrik"] },
        { id: "aufzug", name: "Aufzug", mapId: "og1", area: "1. Obergeschoss", short: "OG1", description: "Aufzug im 1. Obergeschoss-Bereich.", aliases: ["aufzug", "lift"] },

        { id: "2.01", name: "Raum 2.01", mapId: "og2", area: "2. Obergeschoss", short: "OG2", description: "Klassen- oder Fachraum im 2. Obergeschoss.", aliases: ["201", "2 01", "raum 2.01"] },
        { id: "2.02", name: "Raum 2.02", mapId: "og2", area: "2. Obergeschoss", short: "OG2", description: "Klassen- oder Fachraum im 2. Obergeschoss.", aliases: ["202", "2 02", "raum 2.02"] },
        { id: "2.03", name: "Raum 2.03", mapId: "og2", area: "2. Obergeschoss", short: "OG2", description: "Klassen- oder Fachraum im 2. Obergeschoss.", aliases: ["203", "2 03", "raum 2.03"] },
        { id: "2.04", name: "Raum 2.04", mapId: "og2", area: "2. Obergeschoss", short: "OG2", description: "Klassen- oder Fachraum im 2. Obergeschoss.", aliases: ["204", "2 04", "raum 2.04"] },
        { id: "2.05", name: "Raum 2.05", mapId: "og2", area: "2. Obergeschoss", short: "OG2", description: "Klassen- oder Fachraum im 2. Obergeschoss.", aliases: ["205", "2 05", "raum 2.05"] },
        { id: "2.06", name: "Raum 2.06", mapId: "og2", area: "2. Obergeschoss", short: "OG2", description: "Klassen- oder Fachraum im 2. Obergeschoss.", aliases: ["206", "2 06", "raum 2.06"] },
        { id: "2.07", name: "Raum 2.07", mapId: "og2", area: "2. Obergeschoss", short: "OG2", description: "Klassen- oder Fachraum im 2. Obergeschoss.", aliases: ["207", "2 07", "raum 2.07"] },
        { id: "laptop-raum", name: "Laptop-Raum", mapId: "og2", area: "2. Obergeschoss", short: "OG2", description: "Laptop-Raum im 2. Obergeschoss.", aliases: ["laptop raum", "laptop-raum", "laptopraum"] },
        { id: "nw-1", name: "NW-1", mapId: "og2", area: "2. Obergeschoss", short: "OG2", description: "Naturwissenschaftlicher Raum NW-1.", aliases: ["nw1", "nw-1"] },
        { id: "nw-2", name: "NW-2", mapId: "og2", area: "2. Obergeschoss", short: "OG2", description: "Naturwissenschaftlicher Raum NW-2.", aliases: ["nw2", "nw-2"] },
        { id: "nw-3", name: "NW-3", mapId: "og2", area: "2. Obergeschoss", short: "OG2", description: "Naturwissenschaftlicher Raum NW-3.", aliases: ["nw3", "nw-3"] },
        { id: "nw-4", name: "NW-4", mapId: "og2", area: "2. Obergeschoss", short: "OG2", description: "Naturwissenschaftlicher Raum NW-4.", aliases: ["nw4", "nw-4"] },
        { id: "nw-sammlung", name: "NW-Sammlung", mapId: "og2", area: "2. Obergeschoss", short: "OG2", description: "NW-Sammlung im 2. Obergeschoss.", aliases: ["nw sammlung", "nw-sammlung"] },
        { id: "technikraum", name: "Technikraum", mapId: "og2", area: "2. Obergeschoss", short: "OG2", description: "Technikraum im 2. Obergeschoss.", aliases: ["technikraum"] },

        { id: "cluster", name: "Realschul-Cluster", mapId: "cluster", area: "Cluster", short: "Cluster", description: "Realschul-Cluster mit Lehrerzimmer und Pausenhalle.", aliases: ["cluster", "realschul-cluster"] },
        { id: "pausenhalle", name: "Pausenhalle", mapId: "cluster", area: "Cluster", short: "Cluster", description: "Pausenhalle im Realschul-Cluster.", aliases: ["pausenhalle"] },
        { id: "lehrerzimmer-cluster", name: "Lehrerzimmer", mapId: "cluster", area: "Cluster", short: "Cluster", description: "Lehrerzimmer im Realschul-Cluster.", aliases: ["lehrerzimmer", "lehrer zimmer"] }
    ]
};
