const chatButton = document.querySelector(".chat-button");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");
const sendButton = document.getElementById("sendButton");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");
const homeSearch = document.getElementById("homeSearch");
const mapSearch = document.getElementById("mapSearch");
const planFrame = document.getElementById("planFrame");
const mapResult = document.getElementById("mapResult");

const VIEWS = ["mapsView", "euleView", "notesView", "todoView", "calculatorView"];

const CHAT_KEY = "eule.chat.history.v1";

function showView(viewId) {
    // Home stays visible; only target view stays open in addition.
    document.getElementById("homeView").hidden = false;
    VIEWS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.hidden = id !== viewId;
    });
}

function navigateTo(viewId) {
    showView(viewId);
    requestAnimationFrame(() => {
        const el = document.getElementById(viewId);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
}

function showHome() {
    VIEWS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.hidden = true;
    });
    document.getElementById("homeView").hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function openChat() {
    chatWindow.style.display = "flex";
    setTimeout(() => userInput?.focus(), 50);
}

function closeChatWindow() {
    chatWindow.style.display = "none";
}

function renderMap(mapId) {
    const map = EuleData.maps[mapId];
    if (!map) return;
    planFrame.src = map.src;
    mapResult.textContent = map.hint;
    document.querySelectorAll(".map-tab").forEach((btn) => btn.classList.remove("active"));
    const idx = { eg: 0, og1: 1, og2: 2, cluster: 3 }[mapId];
    const buttons = document.querySelectorAll(".map-tab");
    if (buttons[idx]) buttons[idx].classList.add("active");
}

function showMap(mapId) {
    renderMap(mapId);
}

function normalizeText(value) {
    return String(value)
        .toLowerCase()
        .replace(/[?!.:,]/g, " ")
        .replace(/-/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function addChatMessage(text, sender) {
    const bubble = document.createElement("div");
    bubble.className = sender === "user" ? "user-message" : "bot-message";
    bubble.innerHTML = text;
    const quick = chatMessages.querySelector(".quick-buttons");
    if (quick) {
        chatMessages.insertBefore(bubble, quick);
    } else {
        chatMessages.appendChild(bubble);
    }
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function loadChatHistory() {
    try {
        const raw = localStorage.getItem(CHAT_KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

function saveChatHistory(history) {
    localStorage.setItem(CHAT_KEY, JSON.stringify(history.slice(-40)));
}

function appendChatHistory(text, sender) {
    const history = loadChatHistory();
    history.push({ text, sender });
    saveChatHistory(history);
}

function renderChatHistory() {
    const quick = chatMessages.querySelector(".quick-buttons");
    const existing = chatMessages.querySelectorAll(".user-message, .bot-message");
    existing.forEach((node) => node.remove());
    const history = loadChatHistory();
    history.forEach(({ text, sender }) => addChatMessage(text, sender));
}

function findRoom(query) {
    if (typeof window.findRoom === "function") return window.findRoom(query);
    return null;
}

function focusMapForQuery(query) {
    if (typeof window.focusMapForQuery === "function") return window.focusMapForQuery(query);
    const room = findRoom(query);
    if (room) {
        openMap(room.mapId);
        return `${room.name} liegt im ${room.area}.`;
    }
    return null;
}

function searchMap() {
    const q = (mapSearch?.value || "").trim();
    if (!q) {
        mapResult.textContent = "Bitte einen Raum oder Ort eingeben.";
        return;
    }
    const found = focusMapForQuery(q);
    if (found) {
        mapResult.textContent = found;
        return;
    }
    mapResult.textContent = "Diesen Raum kenne ich noch nicht. Manuelle Suche im Plan bleibt möglich.";
}

function getBotAnswer(message) {
    const msg = normalizeText(message);

    if (["hallo", "hi", "guten morgen", "guten tag", "moin"].some((x) => msg.includes(x))) {
        return "👋 Hallo! Wie kann ich dir helfen?";
    }

    if (msg.includes("timer")) {
        openTimer();
        return "⏱️ Ich habe den Timer geöffnet.";
    }

    if (msg.includes("rechner") || msg.includes("rechnen")) {
        openCalculator();
        return "🧮 Ich habe den Rechner geöffnet.";
    }

    if (msg.includes("notiz") || msg.includes("notizen")) {
        navigateTo("notesView");
        return "📝 Ich habe die Notizen geöffnet.";
    }

    if (msg.includes("todo") || msg.includes("to-do") || msg.includes("aufgabe")) {
        navigateTo("todoView");
        return "✅ Ich habe die To-do-Liste geöffnet.";
    }

    if (msg.includes("eule") && (msg.includes("grün") || msg.includes("gelb") || msg.includes("rot") || msg.includes("mini"))) {
        navigateTo("euleView");
        if (msg.includes("gelb")) selectEuleLevel("gelb");
        else if (msg.includes("rot")) selectEuleLevel("rot");
        else if (msg.includes("mini")) selectEuleLevel("mini");
        else selectEuleLevel("gruen");
        return "📚 Ich habe das Eule-System geöffnet.";
    }

    const mapAnswer = focusMapForQuery(msg);
    if (mapAnswer) {
        navigateTo("mapsView");
        return mapAnswer;
    }

    if (msg.includes("hilfe")) {
        return "🦉 Ich kann dir bei Gebäuden, dem Eule-System, dem Timer, Notizen, To-dos und dem Rechner helfen.";
    }

    if (/^[0-9+\-*/().\s]+$/.test(msg)) {
        navigateTo("calculatorView");
        return "🧮 Das sieht nach einer Rechnung aus. Ich habe den Rechner geöffnet.";
    }

    return "🦉 Ich habe das noch nicht gelernt. Frag mich gern nach Gebäuden, Timer, Notizen, To-dos oder dem Rechner.";
}

function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;
    addChatMessage(text, "user");
    appendChatHistory(text, "user");
    userInput.value = "";
    const typing = document.createElement("div");
    typing.className = "bot-message";
    typing.id = "euleTyping";
    typing.textContent = "EuLe schreibt...";
    const quick = chatMessages.querySelector(".quick-buttons");
    if (quick) chatMessages.insertBefore(typing, quick);
    setTimeout(() => {
        document.getElementById("euleTyping")?.remove();
        const answer = getBotAnswer(text);
        addChatMessage(answer, "bot");
        appendChatHistory(answer, "bot");
    }, 500);
}

chatButton?.addEventListener("click", openChat);
closeChat?.addEventListener("click", closeChatWindow);
sendButton?.addEventListener("click", sendMessage);
userInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") sendMessage();
});

homeSearch?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const q = homeSearch.value.trim();
    if (!q) return;
    const lower = q.toLowerCase();
    if (lower.includes("timer")) {
        openTimer();
        return;
    }
    if (lower.includes("rechner") || lower.includes("rechnen")) {
        navigateTo("calculatorView");
        return;
    }
    if (lower.includes("notiz")) {
        navigateTo("notesView");
        return;
    }
    if (lower.includes("todo") || lower.includes("aufgabe")) {
        navigateTo("todoView");
        return;
    }
    if (lower.includes("eule")) {
        navigateTo("euleView");
        return;
    }
    const result = focusMapForQuery(q);
    if (result) {
        navigateTo("mapsView");
        mapResult.textContent = result;
    }
});

document.querySelectorAll(".quick-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;
        if (action === "openTimer") {
            openTimer();
            return;
        }
        if (action === "open") {
            const target = button.dataset.target;
            navigateTo(target);
            if (target === "mapsView") renderMap("eg");
            if (target === "euleView") selectEuleLevel("gruen");
            return;
        }
        const value = button.dataset.value || button.textContent.trim();
        if (userInput) {
            userInput.value = value;
            userInput.focus();
        }
    });
});

// expose functions to inline handlers
window.showView = showView;
window.navigateTo = navigateTo;
window.showHome = showHome;
window.openChat = openChat;
window.closeChatWindow = closeChatWindow;
window.renderMap = renderMap;
window.showMap = showMap;
window.searchMap = searchMap;
window.openCalculator = window.openCalculator || function(){ navigateTo("calculatorView"); };

// initial state
showHome();
renderMap("eg");
selectEuleLevel("gruen");
renderChatHistory();
