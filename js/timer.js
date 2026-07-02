const timerOverlay = document.getElementById("timerOverlay");
const timerStatus = document.getElementById("timerStatus");
const timerPhaseTitle = document.getElementById("phaseTitle");
const timerDisplay = document.getElementById("timerDisplay");
const timerAdjust = document.getElementById("timerAdjust");
const timerProgressBar = document.getElementById("timerProgressBar");
const timerFinish = document.getElementById("timerFinish");

const timerSettingsOverlay = document.getElementById("timerSettingsOverlay");
const setPrep = document.getElementById("setPrep");
const setWork1 = document.getElementById("setWork1");
const setSwitch = document.getElementById("setSwitch");
const setWork2 = document.getElementById("setWork2");
const setEnd = document.getElementById("setEnd");

const TIMER_KEY = "eule.timer.settings.v1";

function defaultTimerPhases() {
    return [
        { name: "Vorbereitung", duration: 10 * 60 },
        { name: "Arbeitsphase 1", duration: 30 * 60 },
        { name: "Wechselphase", duration: 5 * 60 },
        { name: "Arbeitsphase 2", duration: 30 * 60 },
        { name: "Abschluss", duration: 15 * 60 }
    ];
}

let timerPhases = loadTimerPhases();
let phaseIndex = 0;
let remainingSeconds = timerPhases[0].duration;
let timerInterval = null;
let running = false;
let started = false;
let inTransition = false;
let fullscreenMode = false;
let manualPrepSeconds = timerPhases[0].duration;

function loadTimerPhases() {
    try {
        const raw = localStorage.getItem(TIMER_KEY);
        if (raw) {
            const saved = JSON.parse(raw);
            return [
                { name: "Vorbereitung", duration: Math.max(60, Number(saved.prep || 600)) },
                { name: "Arbeitsphase 1", duration: Math.max(60, Number(saved.work1 || 1800)) },
                { name: "Wechselphase", duration: Math.max(60, Number(saved.switch || 300)) },
                { name: "Arbeitsphase 2", duration: Math.max(60, Number(saved.work2 || 1800)) },
                { name: "Abschluss", duration: Math.max(60, Number(saved.end || 900)) }
            ];
        }
    } catch {}
    return defaultTimerPhases();
}

function saveTimerPhases() {
    localStorage.setItem(TIMER_KEY, JSON.stringify({
        prep: timerPhases[0].duration,
        work1: timerPhases[1].duration,
        switch: timerPhases[2].duration,
        work2: timerPhases[3].duration,
        end: timerPhases[4].duration
    }));
}

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateTimerView() {
    const phase = timerPhases[phaseIndex];
    timerStatus.textContent = `Phase ${phaseIndex + 1} / ${timerPhases.length}`;
    timerPhaseTitle.textContent = phase.name;
    timerDisplay.textContent = formatTime(remainingSeconds);

    const elapsed = phase.duration - remainingSeconds;
    const progress = Math.max(0, Math.min(100, (elapsed / phase.duration) * 100));
    timerProgressBar.style.width = `${progress}%`;

    timerAdjust.style.display = (!started && phaseIndex === 0 && !inTransition) ? "flex" : "none";
    timerFinish.hidden = !(phaseIndex === timerPhases.length - 1 && remainingSeconds === 0 && !running);
    saveTimerPhases();
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
    if (fullscreenMode && document.fullscreenElement) {
        document.exitFullscreen?.().catch(() => {});
        fullscreenMode = false;
    }
}

function openTimerSettings() {
    const values = {
        prep: Math.round(timerPhases[0].duration / 60),
        work1: Math.round(timerPhases[1].duration / 60),
        switch: Math.round(timerPhases[2].duration / 60),
        work2: Math.round(timerPhases[3].duration / 60),
        end: Math.round(timerPhases[4].duration / 60)
    };
    setPrep.value = values.prep;
    setWork1.value = values.work1;
    setSwitch.value = values.switch;
    setWork2.value = values.work2;
    setEnd.value = values.end;
    timerSettingsOverlay.classList.add("is-visible");
    timerSettingsOverlay.setAttribute("aria-hidden", "false");
}

function closeTimerSettings() {
    timerSettingsOverlay.classList.remove("is-visible");
    timerSettingsOverlay.setAttribute("aria-hidden", "true");
}

function saveTimerSettings() {
    const next = [
        { name: "Vorbereitung", duration: Math.max(60, Number(setPrep.value || 10) * 60) },
        { name: "Arbeitsphase 1", duration: Math.max(60, Number(setWork1.value || 30) * 60) },
        { name: "Wechselphase", duration: Math.max(60, Number(setSwitch.value || 5) * 60) },
        { name: "Arbeitsphase 2", duration: Math.max(60, Number(setWork2.value || 30) * 60) },
        { name: "Abschluss", duration: Math.max(60, Number(setEnd.value || 15) * 60) }
    ];
    timerPhases = next;
    phaseIndex = 0;
    remainingSeconds = timerPhases[0].duration;
    manualPrepSeconds = timerPhases[0].duration;
    started = false;
    inTransition = false;
    closeTimerSettings();
    updateTimerView();
}

function toggleTimerFullscreen() {
    const card = timerOverlay.querySelector(".timer-card");
    if (!document.fullscreenElement) {
        card.requestFullscreen?.().catch(() => {});
        fullscreenMode = true;
    } else {
        document.exitFullscreen?.().catch(() => {});
        fullscreenMode = false;
    }
}

function adjustTime(deltaSeconds) {
    if (started || running || inTransition || phaseIndex !== 0) return;
    remainingSeconds = Math.max(60, remainingSeconds + deltaSeconds);
    timerPhases[0].duration = remainingSeconds;
    manualPrepSeconds = remainingSeconds;
    updateTimerView();
}

function startTimer() {
    if (running || inTransition) return;
    started = true;
    running = true;
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
}

function pauseTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    running = false;
    updateTimerView();
}

function resetTimer() {
    pauseTimer();
    phaseIndex = 0;
    remainingSeconds = timerPhases[0].duration = manualPrepSeconds;
    started = false;
    inTransition = false;
    timerOverlay.classList.remove("flash");
    timerFinish.hidden = true;
    updateTimerView();
}

async function handlePhaseEnd() {
    if (inTransition) return;
    inTransition = true;
    pauseTimer();

    timerOverlay.classList.add("flash");
    await flashScreen(3);
    timerOverlay.classList.remove("flash");
    timerOverlay.offsetHeight;

    if (phaseIndex < timerPhases.length - 1) {
        phaseIndex += 1;
        remainingSeconds = timerPhases[phaseIndex].duration;
        inTransition = false;
        updateTimerView();
        startTimer();
    } else {
        running = false;
        inTransition = false;
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

window.openTimer = openTimer;
window.closeTimer = closeTimer;
window.openTimerSettings = openTimerSettings;
window.closeTimerSettings = closeTimerSettings;
window.saveTimerSettings = saveTimerSettings;
window.toggleTimerFullscreen = toggleTimerFullscreen;
window.adjustTime = adjustTime;
window.startTimer = startTimer;
window.pauseTimer = pauseTimer;
window.resetTimer = resetTimer;
