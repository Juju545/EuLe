const timerOverlay = document.getElementById("timerOverlay");
const timerStatus = document.getElementById("timerStatus");
const timerPhaseTitle = document.getElementById("phaseTitle");
const timerDisplay = document.getElementById("timerDisplay");
const timerAdjust = document.getElementById("timerAdjust");
const timerProgressBar = document.getElementById("timerProgressBar");
const timerFinish = document.getElementById("timerFinish");

const phases = [
    { name: "Vorbereitung", duration: 10 * 60 },
    { name: "Arbeitsphase 1", duration: 30 * 60 },
    { name: "Wechselphase", duration: 5 * 60 },
    { name: "Arbeitsphase 2", duration: 30 * 60 },
    { name: "Abschluss", duration: 15 * 60 }
];

let phaseIndex = 0;
let remainingSeconds = phases[0].duration;
let timerInterval = null;
let isRunning = false;
let hasStartedOnce = false;
let isTransitioning = false;
let isFullscreen = false;

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateTimerView() {
    const phase = phases[phaseIndex];
    timerStatus.textContent = `Phase ${phaseIndex + 1} / ${phases.length}`;
    timerPhaseTitle.textContent = phase.name;
    timerDisplay.textContent = formatTime(remainingSeconds);

    const progress = ((phase.duration - remainingSeconds) / phase.duration) * 100;
    timerProgressBar.style.width = `${Math.max(0, Math.min(100, progress))}%`;

    const showAdjust = !hasStartedOnce && phaseIndex === 0 && !isTransitioning;
    timerAdjust.style.display = showAdjust ? "flex" : "none";

    timerFinish.hidden = !(phaseIndex === phases.length - 1 && remainingSeconds === 0 && !isRunning);
}

function openTimer() {
    timerOverlay.classList.add("is-visible");
    timerOverlay.setAttribute("aria-hidden", "false");
    updateTimerView();
}

function closeTimer() {
    pauseTimer();
    timerOverlay.classList.remove("is-visible", "flash");
    timerOverlay.setAttribute("aria-hidden", "true");
    if (isFullscreen && document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
        isFullscreen = false;
    }
}

function toggleTimerFullscreen() {
    const card = timerOverlay.querySelector(".timer-card");
    if (!document.fullscreenElement) {
        card.requestFullscreen?.().catch(() => {});
        isFullscreen = true;
    } else {
        document.exitFullscreen?.().catch(() => {});
        isFullscreen = false;
    }
}

function adjustTime(deltaSeconds) {
    if (hasStartedOnce || isRunning || isTransitioning || phaseIndex !== 0) return;
    remainingSeconds = Math.max(60, remainingSeconds + deltaSeconds);
    phases[0].duration = remainingSeconds;
    updateTimerView();
}

function startTimer() {
    if (isRunning || isTransitioning) return;

    hasStartedOnce = true;
    isRunning = true;
    updateTimerView();

    timerInterval = setInterval(() => {
        if (remainingSeconds > 0) {
            remainingSeconds -= 1;
            updateTimerView();
        }

        if (remainingSeconds <= 0) {
            handlePhaseEnd();
        }
    }, 1000);

    updateTimerView();
}

function pauseTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    isRunning = false;
    updateTimerView();
}

function resetTimer() {
    pauseTimer();
    isTransitioning = false;
    phaseIndex = 0;
    remainingSeconds = phases[0].duration;
    hasStartedOnce = false;
    timerOverlay.classList.remove("flash");
    timerFinish.hidden = true;
    updateTimerView();
}

async function handlePhaseEnd() {
    if (isTransitioning) return;

    isTransitioning = true;
    pauseTimer();
    timerOverlay.classList.add("flash");

    await flashScreen(3);

    timerOverlay.classList.remove("flash");

    if (phaseIndex < phases.length - 1) {
        phaseIndex += 1;
        remainingSeconds = phases[phaseIndex].duration;
        isTransitioning = false;
        updateTimerView();
        startTimer();
    } else {
        isRunning = false;
        isTransitioning = false;
        timerFinish.hidden = false;
        timerFinish.textContent = "🎉 Timer beendet.";
        updateTimerView();
    }
}

function flashScreen(times) {
    return new Promise((resolve) => {
        let count = 0;
        const interval = setInterval(() => {
            timerOverlay.classList.toggle("flash");
            count += 1;

            if (count >= times * 2) {
                clearInterval(interval);
                timerOverlay.classList.remove("flash");
                resolve();
            }
        }, 160);
    });
}

updateTimerView();
window.addEventListener("load", updateTimerView);
