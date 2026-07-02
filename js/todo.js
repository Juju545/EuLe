const TODOS_KEY = "eule.todos.v1";

let todos = loadTodos();

function loadTodos() {
    try {
        const raw = localStorage.getItem(TODOS_KEY);
        if (raw) return JSON.parse(raw);
    } catch {}
    return [
        { id: crypto.randomUUID(), text: "Beispielaufgabe: Timer testen", done: false },
        { id: crypto.randomUUID(), text: "Beispielaufgabe: Raum 1.12 suchen", done: true }
    ];
}

function saveTodos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function renderTodos() {
    const list = document.getElementById("todoList");
    if (!list) return;

    list.innerHTML = todos.map(todo => `
        <div class="entry-card" data-id="${todo.id}">
            <div class="checkbox-row">
                <input type="checkbox" ${todo.done ? "checked" : ""} onchange="todoToggle('${todo.id}', this.checked)">
                <input type="text" value="${escapeHtmlAttr(todo.text)}" oninput="todoUpdate('${todo.id}', this.value)">
            </div>
            <div class="entry-actions">
                <div class="left">
                    <button class="icon-btn" type="button" onclick="todoCopy('${todo.id}')">📋 Kopieren</button>
                    <button class="icon-btn" type="button" onclick="todoDuplicate('${todo.id}')">📄 Duplizieren</button>
                </div>
                <div class="right">
                    <button class="icon-btn danger" type="button" onclick="todoDelete('${todo.id}')">🗑️ Löschen</button>
                </div>
            </div>
        </div>
    `).join("");

    saveTodos();
}

function todoAdd(text = "") {
    todos.unshift({
        id: crypto.randomUUID(),
        text,
        done: false
    });
    renderTodos();
}

function todoUpdate(id, text) {
    const item = todos.find(t => t.id === id);
    if (!item) return;
    item.text = text;
    saveTodos();
}

function todoToggle(id, done) {
    const item = todos.find(t => t.id === id);
    if (!item) return;
    item.done = done;
    saveTodos();
}

async function todoCopy(id) {
    const item = todos.find(t => t.id === id);
    if (!item) return;
    await navigator.clipboard.writeText(item.text);
}

async function todoCopyAll() {
    const all = todos.map(t => `${t.done ? "✔" : "☐"} ${t.text}`).join("\n");
    await navigator.clipboard.writeText(all);
}

function todoDuplicate(id) {
    const item = todos.find(t => t.id === id);
    if (!item) return;
    todos.unshift({ id: crypto.randomUUID(), text: item.text, done: item.done });
    renderTodos();
}

function todoDelete(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
}

function escapeHtmlAttr(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/'/g, "&#39;");
}

window.todoAdd = todoAdd;
window.todoCopyAll = todoCopyAll;
window.todoCopy = todoCopy;
window.todoDuplicate = todoDuplicate;
window.todoDelete = todoDelete;
window.todoUpdate = todoUpdate;
window.todoToggle = todoToggle;
window.addEventListener("load", renderTodos);
