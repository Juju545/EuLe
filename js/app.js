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

const viewIds = ["homeView", "mapsView", "euleView"];

function showView(viewId){
    viewIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.hidden = id !== viewId;
    });
    if (viewId === "homeView") {
        document.querySelector(".hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
        document.getElementById(viewId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function openChat(){
    chatWindow.style.display = "flex";
}

function closeChatWindow(){
    chatWindow.style.display = "none";
}

chatButton?.addEventListener("click", openChat);
closeChat?.addEventListener("click", closeChatWindow);

sendButton?.addEventListener("click", sendMessage);
userInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") sendMessage();
});

homeSearch?.addEventListener("keydown", (event) => {
    if (event.key === "Enter"){
        routeSearch(homeSearch.value);
    }
});

function routeSearch(query){
    if (!query) return;
    const lower = query.toLowerCase().trim();

    if (lower.includes("timer")){
        openTimer();
        return;
    }
    if (lower.includes("eule") || lower.includes("grün") || lower.includes("gelb") || lower.includes("rot")){
        showView("euleView");
        if (lower.includes("gelb")) selectEuleLevel("gelb");
        else if (lower.includes("rot")) selectEuleLevel("rot");
        else if (lower.includes("mini")) selectEuleLevel("mini");
        else selectEuleLevel("gruen");
        return;
    }
    showView("mapsView");
    mapSearch.value = query;
    searchMap();
}

function addMessage(text, sender){
    const bubble = document.createElement("div");
    bubble.className = sender === "user" ? "user-message" : "bot-message";
    bubble.innerHTML = text;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function matchRoom(query){
    const normalized = query.toLowerCase().replace(/[-]/g, " ").replace(/\s+/g, " ").trim();
    return EuleData.roomIndex.find(entry => entry.terms.some(term => normalized.includes(term.toLowerCase())));
}

function showMap(mapKey){
    const map = EuleData.maps[mapKey];
    if (!map) return;
    planFrame.src = map.src;
    mapResult.textContent = map.hint;
    document.querySelectorAll(".map-tab").forEach(btn => btn.classList.remove("active"));
    const buttons = Array.from(document.querySelectorAll(".map-tab"));
    const index = ["eg", "og1", "og2", "cluster"].indexOf(mapKey);
    if (buttons[index]) buttons[index].classList.add("active");
}

function searchMap(){
    const q = (mapSearch?.value || "").trim();
    if (!q){
        mapResult.textContent = "Bitte einen Raum oder Ort eingeben.";
        return;
    }

    const hit = matchRoom(q);
    if (hit){
        showMap(hit.map);
        mapResult.textContent = hit.answer;
        return;
    }

    const lower = q.toLowerCase();
    if (lower.includes("eg") || lower.includes("mensa") || lower.includes("bücherei") || lower.includes("bibliothek") || lower.includes("verwaltung")){
        showMap("eg");
        mapResult.textContent = "Der passende Plan ist das Erdgeschoss.";
        return;
    }
    if (lower.includes("og1") || lower.includes("1.0") || lower.includes("1.")){
        showMap("og1");
        mapResult.textContent = "Der passende Plan ist das 1. Obergeschoss.";
        return;
    }
    if (lower.includes("og2") || lower.includes("2.0") || lower.includes("2.")){
        showMap("og2");
        mapResult.textContent = "Der passende Plan ist das 2. Obergeschoss.";
        return;
    }
    if (lower.includes("cluster") || lower.includes("pausenhalle")){
        showMap("cluster");
        mapResult.textContent = "Der passende Plan ist der Realschul-Cluster.";
        return;
    }

    mapResult.textContent = "Diesen Raum kenne ich noch nicht. In einer späteren Version markieren wir ihn direkt im Plan.";
}

function getBotAnswer(message){
    const msg = message.toLowerCase();

    if (msg.includes("hallo") || msg.includes("hi") || msg.includes("guten morgen") || msg.includes("guten tag")) {
        return "👋 Hallo! Schön, dass du da bist.";
    }

    if (msg.includes("hilfe")){
        return "🦉 Ich kann dir bei Gebäudeplänen, dem Eule-System und dem Timer helfen.";
    }

    if (msg.includes("timer")){
        openTimer();
        return "⏱️ Ich habe den Timer geöffnet.";
    }

    if (msg.includes("eule-system") || msg.includes("eule system") || msg.includes("grüne eule") || msg.includes("gelbe eule") || msg.includes("rote eule") || msg.includes("mini-eule")){
        showView("euleView");
        if (msg.includes("gelb")) selectEuleLevel("gelb");
        else if (msg.includes("rot")) selectEuleLevel("rot");
        else if (msg.includes("mini")) selectEuleLevel("mini");
        else selectEuleLevel("gruen");
        return "📚 Ich habe das Eule-System geöffnet.";
    }

    const hit = matchRoom(msg);
    if (hit){
        showView("mapsView");
        showMap(hit.map);
        return hit.answer;
    }

    if (msg.includes("plan") || msg.includes("gebäude") || msg.includes("gebäudeplan") || msg.includes("räume") || msg.includes("raum")){
        showView("mapsView");
        return "🗺️ Ich habe die Gebäudepläne geöffnet. Du kannst jetzt einen Raum oder Ort suchen.";
    }

    if (msg.includes("grüne eule") || msg.includes("gruene eule")){
        showView("euleView");
        selectEuleLevel("gruen");
        return "🦉 Die grüne Eule bietet die meisten Freiheiten.";
    }

    return "🦉 Das habe ich noch nicht gelernt. Ich helfe dir aber bei Gebäuden, Eule-System und Timer.";
}

function sendMessage(){
    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    userInput.value = "";

    setTimeout(() => {
        addMessage(getBotAnswer(text), "bot");
    }, 450);
}

document.querySelectorAll(".quick-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;

        if (action === "openTimer"){
            openTimer();
            return;
        }

        if (action === "open"){
            const target = button.dataset.target;
            showView(target);
            if (target === "mapsView") showMap("eg");
            if (target === "euleView") selectEuleLevel("gruen");
            return;
        }

        const value = button.dataset.value || button.textContent.trim();
        if (userInput){
            userInput.value = value;
            userInput.focus();
        }
    });
});

showMap("eg");
selectEuleLevel("gruen");
