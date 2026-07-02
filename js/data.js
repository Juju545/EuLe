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
            hint: "Das Cluster enthält Lehrerzimmer und Pausenhalle."
        }
    },
    roomIndex: [
        { terms: ["mensa"], map: "eg", answer: "🍽️ Die Mensa liegt im Erdgeschoss." },
        { terms: ["bücherei", "bibliothek"], map: "eg", answer: "📚 Die Bücherei liegt im Erdgeschoss." },
        { terms: ["pc raum", "pc-raum"], map: "eg", answer: "💻 Der PC-Raum liegt im Erdgeschoss." },
        { terms: ["verwaltung"], map: "eg", answer: "🏢 Die Verwaltung liegt im Erdgeschoss." },
        { terms: ["lehrerzimmer"], map: "eg", answer: "👩‍🏫 Das Lehrerzimmer liegt im Erdgeschoss." },
        { terms: ["schulsozialarbeit"], map: "eg", answer: "🤝 Die Schulsozialarbeit liegt im Erdgeschoss." },
        { terms: ["innenhof"], map: "eg", answer: "🌿 Der Innenhof liegt im Erdgeschoss." },
        { terms: ["toiletten", "toilette"], map: "eg", answer: "🚻 Die Toiletten liegen im Erdgeschoss." },
        { terms: ["0.01", "0.02", "0.04", "0.05", "0.06", "0.07", "0.08", "0.09", "0.10", "0.11", "0.12", "0.13", "0.14"], map: "eg", answer: "📍 Dieser Raum liegt im Erdgeschoss." },
        { terms: ["1.01", "1.02", "1.03", "1.04", "1.05", "1.06", "1.07", "1.08", "1.09", "1.10", "1.11", "1.12", "1.13", "1.14", "1.15", "1.16"], map: "og1", answer: "📍 Dieser Raum liegt im 1. Obergeschoss." },
        { terms: ["aufzug"], map: "og1", answer: "⬆️ Der Aufzug ist im 1. Obergeschoss-Bereich eingetragen." },
        { terms: ["elektrik"], map: "og1", answer: "⚡ Elektrik liegt im 1. Obergeschoss." },
        { terms: ["2.01", "2.02", "2.03", "2.04", "2.05", "2.06", "2.07"], map: "og2", answer: "📍 Dieser Raum liegt im 2. Obergeschoss." },
        { terms: ["laptop raum", "laptop-raum"], map: "og2", answer: "💻 Der Laptop-Raum liegt im 2. Obergeschoss." },
        { terms: ["nw-1", "nw-2", "nw-3", "nw-4", "nw sammlung", "nw-sammlung", "technikraum"], map: "og2", answer: "🔬 Dieser Bereich liegt im 2. Obergeschoss." },
        { terms: ["cluster", "realschul-cluster", "pausenhalle"], map: "cluster", answer: "🏢 Der Realschul-Cluster ist im Cluster-Plan eingetragen." }
    ]
};
