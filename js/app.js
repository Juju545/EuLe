const chatButton = document.querySelector(".chat-button");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");

const sendButton = document.getElementById("sendButton");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");

// Chat öffnen
chatButton.addEventListener("click", () => {
    chatWindow.style.display = "flex";
});

// Chat schließen
closeChat.addEventListener("click", () => {
    chatWindow.style.display = "none";
});

// Nachricht senden
sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {

    const text = userInput.value.trim();

    if(text === "") return;

    addMessage(text, "user");

    userInput.value = "";

    setTimeout(() => {

        addMessage(getBotAnswer(text), "bot");

    },600);

}

function addMessage(text, sender){

    const bubble = document.createElement("div");

    bubble.className = sender === "user"
        ? "user-message"
        : "bot-message";

    bubble.innerHTML = text;

    chatMessages.appendChild(bubble);

    chatMessages.scrollTop = chatMessages.scrollHeight;

}

function getBotAnswer(message){

    const msg = message.toLowerCase();

    if(msg.includes("hallo") || msg.includes("hi")){
        return "👋 Hallo! Schön, dass du da bist.";
    }

    if(msg.includes("mensa")){
        return "🍽️ Die Mensa befindet sich im Erdgeschoss.";
    }

    if(msg.includes("timer")){
        return "⏱️ Die Timerfunktion kommt in Alpha 2.";
    }

    if(msg.includes("grüne eule") || msg.includes("gruene eule")){
        return "🦉 Die grüne Eule bietet die meisten Freiheiten, z. B. Musik hören, freien Lernort und freie Themenwahl. ";
    }

    return "🦉 Das habe ich noch nicht gelernt. Diese Funktion kommt bald!";
}