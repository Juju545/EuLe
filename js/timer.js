const timerOverlay = document.getElementById("timerOverlay");
const timerStatus = document.getElementById("timerStatus");
const timerPhaseTitle = document.getElementById("phaseTitle");
const timerDisplay = document.getElementById("timerDisplay");
const timerAdjust = document.getElementById("timerAdjust");
const timerProgressBar = document.getElementById("timerProgressBar");
const timerFinish = document.getElementById("timerFinish");

const timerPhases = [
    { name: "Vorbereitung", duration: 10 * 60 },
    { name: "Arbeitsphase 1", duration: 30 * 60 },
    { name: "Wechselphase", duration: 5 * 60 },
    { name: "Arbeitsphase 2", duration: 30 * 60 },
    { name: "Abschluss", duration: 15 * 60 }
];

let phaseIndex = 0;
let remainingSeconds = timerPhases[0].duration;
let timerInterval = null;
let running = false;
let started = false;
let inTransition = false;
let fullscreenMode = false;
let manualBaseSeconds = timerPhases[0].duration;

function formatTime(totalSeconds){
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateTimerView(){
    const phase = timerPhases[phaseIndex];
    timerStatus.textContent = `Phase ${phaseIndex + 1} / ${timerPhases.length}`;
    timerPhaseTitle.textContent = phase.name;
    timerDisplay.textContent = formatTime(remainingSeconds);

    const elapsed = phase.duration - remainingSeconds;
    const progress = Math.max(0, Math.min(100, (elapsed / phase.duration) * 100));
    timerProgressBar.style.width = `${progress}%`;

    timerAdjust.style.display = (!started && phaseIndex === 0 && !inTransition) ? "flex" : "none";
    timerFinish.hidden = !(phaseIndex === timerPhases.length - 1 && remainingSeconds === 0 && !running);
}

function openTimer(){
    timerOverlay.classList.add("is-visible");
    timerOverlay.setAttribute("aria-hidden", "false");
    updateTimerView();
}

function closeTimer(){
    pauseTimer();
    timerOverlay.classList.remove("is-visible", "flash");
    timerOverlay.setAttribute("aria-hidden", "true");
    timerOverlay.classList.remove("flash");
    if (fullscreenMode && document.fullscreenElement){
        document.exitFullscreen?.().catch(() => {});
        fullscreenMode = false;
    }
}

function toggleTimerFullscreen(){
    const card = timerOverlay.querySelector(".timer-card");
    if (!document.fullscreenElement){
        card.requestFullscreen?.().catch(() => {});
        fullscreenMode = true;
    }else{
        document.exitFullscreen?.().catch(() => {});
        fullscreenMode = false;
    }
}

function adjustTime(deltaSeconds){
    if (started || running || inTransition || phaseIndex !== 0) return;
    remainingSeconds = Math.max(60, remainingSeconds + deltaSeconds);
    manualBaseSeconds = remainingSeconds;
    timerPhases[0].duration = manualBaseSeconds;
    updateTimerView();
}

function startTimer(){
    if (running || inTransition) return;
    started = true;
    running = true;
    updateTimerView();

    timerInterval = setInterval(() => {
        if (remainingSeconds > 0){
            remainingSeconds -= 1;
            updateTimerView();
        }

        if (remainingSeconds <= 0){
            handlePhaseEnd();
        }
    }, 1000);
}

function pauseTimer(){
    if (timerInterval){
        clearInterval(timerInterval);
        timerInterval = null;
    }
    running = false;
    updateTimerView();
}

function resetTimer(){
    pauseTimer();
    phaseIndex = 0;
    remainingSeconds = timerPhases[0].duration = manualBaseSeconds;
    started = false;
    inTransition = false;
    timerOverlay.classList.remove("flash");
    timerFinish.hidden = true;
    updateTimerView();
}

async function handlePhaseEnd(){
    if (inTransition) return;
    inTransition = true;
    pauseTimer();

    timerOverlay.classList.add("flash");
    await flashScreen(3);
    timerOverlay.classList.remove("flash");
    timerOverlay.offsetHeight;

    if (phaseIndex < timerPhases.length - 1){
        phaseIndex += 1;
        remainingSeconds = timerPhases[phaseIndex].duration;
        inTransition = false;
        updateTimerView();
        startTimer();
    }else{
        running = false;
        inTransition = false;
        timerFinish.hidden = false;
        timerFinish.textContent = "🎉 Timer beendet.";
        updateTimerView();
    }
}

function flashScreen(times){
    return new Promise((resolve) => {
        let count = 0;
        const interval = setInterval(() => {
            timerOverlay.classList.toggle("flash");
            count += 1;
            if (count >= times * 2){
                clearInterval(interval);
                timerOverlay.classList.remove("flash");
                resolve();
            }
        }, 160);
    });
}

updateTimerView();
window.addEventListener("load", updateTimerView);
