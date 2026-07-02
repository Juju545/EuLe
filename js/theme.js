const THEME_KEY = "eule.theme.mode.v1";
const themeLabel = document.getElementById("themeLabel");
const themeMq = window.matchMedia("(prefers-color-scheme: dark)");

let themeMode = localStorage.getItem(THEME_KEY) || "system";

function getResolvedTheme() {
    if (themeMode === "dark") return "dark";
    if (themeMode === "light") return "light";
    return themeMq.matches ? "dark" : "light";
}

function updateTheme() {
    const resolved = getResolvedTheme();
    document.documentElement.setAttribute("data-theme", resolved);
    if (themeLabel) {
        themeLabel.textContent = themeMode === "system"
            ? "System"
            : themeMode === "dark"
                ? "Dunkel"
                : "Hell";
    }
    localStorage.setItem(THEME_KEY, themeMode);
}

function setTheme(next) {
    themeMode = next;
    updateTheme();
}

function cycleTheme() {
    if (themeMode === "system") setTheme("light");
    else if (themeMode === "light") setTheme("dark");
    else setTheme("system");
}

themeMq.addEventListener?.("change", () => {
    if (themeMode === "system") updateTheme();
});

window.cycleTheme = cycleTheme;
window.setTheme = setTheme;
window.addEventListener("load", updateTheme);
