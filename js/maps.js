function openMap(mapId) {
    const map = EuleData.maps[mapId];
    if (!map) return;
    showView("mapsView");
    showMap(mapId);
}

function normalizeQuery(query) {
    return query
        .toLowerCase()
        .replace(/[?!.:,]/g, " ")
        .replace(/-/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function normalizeDigitsToRoomId(raw) {
    const clean = raw.replace(/\s+/g, "").trim();
    if (/^\d{3}$/.test(clean)) {
        return `${clean[0]}.${clean.slice(1)}`;
    }
    if (/^\d{4}$/.test(clean)) {
        return `${clean[0]}.${clean.slice(1)}`;
    }
    return clean;
}

function findRoom(query) {
    const normalized = normalizeQuery(query);
    const cleanedRoom = normalized
        .replace(/^wo ist\s+/, "")
        .replace(/^zeig mir\s+/, "")
        .replace(/^ich suche\s+/, "")
        .trim();

    const numberCandidate = normalizeDigitsToRoomId(cleanedRoom.replace(/[^0-9]/g, ""));
    if (numberCandidate && /^[0-9]+\.[0-9]+$/.test(numberCandidate)) {
        const exact = EuleData.rooms.find(room => room.id === numberCandidate);
        if (exact) return exact;
    }

    for (const room of EuleData.rooms) {
        const aliases = [room.id, room.name, ...(room.aliases || [])];
        for (const term of aliases) {
            const normTerm = normalizeQuery(term);
            if (normTerm && normalized.includes(normTerm)) {
                return room;
            }
        }
    }

    const looseDigits = cleanedRoom.replace(/[^0-9]/g, "");
    if (looseDigits.length >= 3) {
        const normalizedId = normalizeDigitsToRoomId(looseDigits.slice(0, 3));
        const exact = EuleData.rooms.find(room => room.id === normalizedId);
        if (exact) return exact;
    }

    return null;
}

function focusMapForQuery(query) {
    const room = findRoom(query);
    if (room) {
        openMap(room.mapId);
        return `${room.name} liegt im ${room.area}.`;
    }

    const lower = query.toLowerCase();
    if (lower.includes("mensa") || lower.includes("bücherei") || lower.includes("bibliothek") || lower.includes("verwaltung") || lower.includes("pc raum")) {
        openMap("eg");
        return "Die Mensa bzw. der gesuchte Bereich liegt im Erdgeschoss.";
    }
    if (lower.includes("1.") || lower.includes("og1") || lower.includes("lehrerzimmer") || lower.includes("elektrik")) {
        openMap("og1");
        return "Der gesuchte Raum liegt im 1. Obergeschoss.";
    }
    if (lower.includes("2.") || lower.includes("og2") || lower.includes("technikraum") || lower.includes("nw") || lower.includes("laptop")) {
        openMap("og2");
        return "Der gesuchte Raum liegt im 2. Obergeschoss.";
    }
    if (lower.includes("cluster") || lower.includes("pausenhalle")) {
        openMap("cluster");
        return "Der gesuchte Bereich liegt im Realschul-Cluster.";
    }
    return null;
}

window.openMap = openMap;
window.findRoom = findRoom;
window.focusMapForQuery = focusMapForQuery;
