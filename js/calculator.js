const calcDisplay = document.getElementById("calcDisplay");
const calculatorKeys = document.getElementById("calculatorKeys");

let calcExpression = "";

function syncCalcDisplay() {
    if (calcDisplay) calcDisplay.value = calcExpression;
}

function calcClear() {
    calcExpression = "";
    syncCalcDisplay();
}

function calcBackspace() {
    calcExpression = calcExpression.slice(0, -1);
    syncCalcDisplay();
}

function sanitizeExpression(expr) {
    return String(expr)
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/[^0-9+\-*/().,%\s]/g, "");
}

function calcEvaluate() {
    const expr = sanitizeExpression(calcExpression);
    if (!expr.trim()) return;
    try {
        // Safe enough for this local-only school app after sanitization.
        const result = Function(`"use strict"; return (${expr});`)();
        calcExpression = Number.isFinite(result) ? String(result) : "Error";
    } catch {
        calcExpression = "Error";
    }
    syncCalcDisplay();
}

function pressCalc(value) {
    if (value === "C" || value === "AC") {
        calcClear();
        return;
    }
    if (value === "⌫") {
        calcBackspace();
        return;
    }
    if (value === "=") {
        calcEvaluate();
        return;
    }
    if (calcExpression === "Error") calcExpression = "";
    calcExpression += value;
    syncCalcDisplay();
}

calculatorKeys?.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-calc]");
    if (!btn) return;
    pressCalc(btn.dataset.calc);
});

window.openCalculator = function openCalculator() {
    navigateTo("calculatorView");
};

window.calcClear = calcClear;
window.addEventListener("load", syncCalcDisplay);
