const MAP_ORDER = ["eg", "og1", "og2", "cluster"];

function openMap(mapId) {
    const map = EuleData.maps[mapId];
    if (!map) return;
    showView("mapsView");
    showMap(mapId);
}

function findRoom(query) {
    const normalized = query.toLowerCase().trim().replace(/\s+/g, " ");
    for (const entry of EuleData.roomIndex) {
        if (entry.terms.some(term => normalized.includes(term.toLowerCase()))) {
            return entry;
        }
    }
    return null;
}

function focusMapForQuery(query) {
    const room = findRoom(query);
    if (room) {
        openMap(room.map);
        return room.answer;
    }

    const lower = query.toLowerCase();
    if (lower.includes("mensa") || lower.includes("bücherei") || lower.includes("bibliothek") || lower.includes("verwaltung") || lower.includes("pc raum")) {
        openMap("eg");
        return "Ich habe das Erdgeschoss geöffnet.";
    }
    if (lower.includes("1.") || lower.includes("og1") || lower.includes("lehrerzimmer")) {
        openMap("og1");
        return "Ich habe das 1. Obergeschoss geöffnet.";
    }
    if (lower.includes("2.") || lower.includes("og2") || lower.includes("technikraum") || lower.includes("nw")) {
        openMap("og2");
        return "Ich habe das 2. Obergeschoss geöffnet.";
    }
    if (lower.includes("cluster") || lower.includes("pausenhalle")) {
        openMap("cluster");
        return "Ich habe den Realschul-Cluster geöffnet.";
    }
    return null;
}

window.openMap = openMap;
window.findRoom = findRoom;
window.focusMapForQuery = focusMapForQuery;
