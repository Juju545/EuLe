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

const views = ["homeView", "mapsView", "euleView", "notesView", "todoView"];

function showView(viewId) {
    views.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.hidden = id !== viewId;
    });
}

function openChat() {
    chatWindow.style.display = "flex";
}

function closeChatWindow() {
    chatWindow.style.display = "none";
}

function addMessage(text, sender) {
    const bubble = document.createElement("div");
    bubble.className = sender === "user" ? "user-message" : "bot-message";
    bubble.innerHTML = text;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function renderMap(mapId) {
    const map = EuleData.maps[mapId];
    if (!map) return;
    planFrame.src = map.src;
    mapResult.textContent = map.hint;
    document.querySelectorAll(".map-tab").forEach(btn => btn.classList.remove("active"));
    const idx = { eg: 0, og1: 1, og2: 2, cluster: 3 }[mapId];
    const buttons = document.querySelectorAll(".map-tab");
    if (buttons[idx]) buttons[idx].classList.add("active");
}

function showMap(mapId) {
    renderMap(mapId);
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
    mapResult.textContent = "Diesen Raum kenne ich noch nicht. In Version 1.5 kommt die Markierung direkt auf dem Plan.";
}

function getBotAnswer(message) {
    const msg = message.toLowerCase().trim();

    if (["hallo", "hi", "guten morgen", "guten tag"].some(x => msg.includes(x))) {
        return "👋 Hallo! Wie kann ich dir helfen?";
    }

    if (msg.includes("timer")) {
        openTimer();
        return "⏱️ Ich habe den Timer geöffnet.";
    }

    if (msg.includes("notiz") || msg.includes("notizen")) {
        showView("notesView");
        return "📝 Ich habe die Notizen geöffnet.";
    }

    if (msg.includes("todo") || msg.includes("to-do") || msg.includes("aufgabe")) {
        showView("todoView");
        return "✅ Ich habe die To-do-Liste geöffnet.";
    }

    if (msg.includes("eule") && (msg.includes("grün") || msg.includes("gelb") || msg.includes("rot") || msg.includes("mini"))) {
        showView("euleView");
        if (msg.includes("gelb")) selectEuleLevel("gelb");
        else if (msg.includes("rot")) selectEuleLevel("rot");
        else if (msg.includes("mini")) selectEuleLevel("mini");
        else selectEuleLevel("gruen");
        return "📚 Ich habe das Eule-System geöffnet.";
    }

    const mapAnswer = focusMapForQuery(msg);
    if (mapAnswer) {
        showView("mapsView");
        return mapAnswer;
    }

    if (msg.includes("hilfe")) {
        return "🦉 Ich kann dir bei Gebäuden, dem Eule-System, dem Timer, Notizen und To-dos helfen.";
    }

    return "🦉 Ich habe das noch nicht gelernt. Frag mich gern nach Gebäuden, Timer, Notizen oder To-dos.";
}

function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;
    addMessage(text, "user");
    userInput.value = "";
    setTimeout(() => addMessage(getBotAnswer(text), "bot"), 350);
}

chatButton?.addEventListener("click", openChat);
closeChat?.addEventListener("click", closeChatWindow);
sendButton?.addEventListener("click", sendMessage);
userInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") sendMessage();
});

if (homeSearch) {
    homeSearch.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const q = homeSearch.value.trim();
            if (!q) return;
            const timerKeywords = /timer/i;
            const euleKeywords = /(eule|grün|gelb|rot|mini)/i;
            const todoKeywords = /(todo|to-do|aufgabe)/i;
            const noteKeywords = /(notiz|notizen)/i;

            if (timerKeywords.test(q)) {
                openTimer();
                return;
            }
            if (noteKeywords.test(q)) {
                showView("notesView");
                return;
            }
            if (todoKeywords.test(q)) {
                showView("todoView");
                return;
            }
            if (euleKeywords.test(q)) {
                showView("euleView");
                return;
            }

            const result = focusMapForQuery(q);
            if (result) {
                showView("mapsView");
                mapResult.textContent = result;
            }
        }
    });
}

document.querySelectorAll(".quick-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;
        if (action === "openTimer") {
            openTimer();
            return;
        }
        if (action === "open") {
            const target = button.dataset.target;
            showView(target);
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

function showHome() {
    showView("homeView");
}

showView("homeView");
renderMap("eg");
selectEuleLevel("gruen");

// expose helper for inline onclick
window.showView = showView;
window.openChat = openChat;
window.openTimer = window.openTimer || function(){};
window.closeTimer = window.closeTimer || function(){};
window.toggleTimerFullscreen = window.toggleTimerFullscreen || function(){};
window.renderMap = renderMap;
window.showMap = showMap;
window.searchMap = searchMap;
window.showHome = showHome;
