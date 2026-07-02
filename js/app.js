const chatButton = document.querySelector(".chat-button");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");

const sendButton = document.getElementById("sendButton");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");

function safeShowChat() {
    chatWindow.style.display = "flex";
}

function safeHideChat() {
    chatWindow.style.display = "none";
}

// Chat öffnen / schließen
chatButton?.addEventListener("click", safeShowChat);
closeChat?.addEventListener("click", safeHideChat);

// Nachricht senden
sendButton?.addEventListener("click", sendMessage);
userInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const text = userInput.value.trim();
    if (text === "") return;

    addMessage(text, "user");
    userInput.value = "";

    setTimeout(() => {
        addMessage(getBotAnswer(text), "bot");
    }, 600);
}

function addMessage(text, sender) {
    const bubble = document.createElement("div");
    bubble.className = sender === "user" ? "user-message" : "bot-message";
    bubble.innerHTML = text;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotAnswer(message) {
    const msg = message.toLowerCase();

    if (msg.includes("hallo") || msg.includes("hi")) {
        return "👋 Hallo! Schön, dass du da bist.";
    }

    if (msg.includes("mensa")) {
        return "🍽️ Die Mensa befindet sich im Erdgeschoss.";
    }

    if (msg.includes("timer")) {
        openTimer();
        return "⏱️ Ich habe den Timer geöffnet.";
    }

    if (msg.includes("grüne eule") || msg.includes("gruene eule")) {
        return "🦉 Die grüne Eule bietet die meisten Freiheiten, z. B. Musik hören, freien Lernort und freie Themenwahl.";
    }

    return "🦉 Das habe ich noch nicht gelernt. Diese Funktion kommt bald!";
}

document.querySelectorAll(".quick-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;

        if (action === "openTimer") {
            openTimer();
            return;
        }

        const value = button.dataset.value || button.textContent.trim();
        if (userInput) {
            userInput.value = value;
            userInput.focus();
        }
    });
});

// Startseite soll nicht kaputt gehen, wenn man auf Timer-Kachel klickt
window.openTimer = typeof window.openTimer === "function" ? window.openTimer : () => {};
window.closeTimer = typeof window.closeTimer === "function" ? window.closeTimer : () => {};
window.toggleTimerFullscreen = typeof window.toggleTimerFullscreen === "function" ? window.toggleTimerFullscreen : () => {};
