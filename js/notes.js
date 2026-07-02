const NOTES_KEY = "eule.notes.v1";

let notes = loadNotes();

function loadNotes() {
    try {
        const raw = localStorage.getItem(NOTES_KEY);
        if (raw) return JSON.parse(raw);
    } catch {}
    return [
        { id: crypto.randomUUID(), text: "Beispielnotiz: Mathe Aufgabe 5", pinned: true },
        { id: crypto.randomUUID(), text: "Beispielnotiz: Deutsch Vokabeln wiederholen", pinned: false }
    ];
}

function saveNotes() {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

function renderNotes() {
    const list = document.getElementById("notesList");
    if (!list) return;

    const sorted = [...notes].sort((a, b) => Number(b.pinned) - Number(a.pinned));
    list.innerHTML = sorted.map(note => `
        <div class="entry-card" data-id="${note.id}">
            <textarea oninput="notesUpdate('${note.id}', this.value)">${escapeHtml(note.text)}</textarea>
            <div class="entry-actions">
                <div class="left">
                    <button class="icon-btn" type="button" onclick="notesCopy('${note.id}')">📋 Kopieren</button>
                    <button class="icon-btn" type="button" onclick="notesDuplicate('${note.id}')">📄 Duplizieren</button>
                    <button class="icon-btn" type="button" onclick="notesTogglePin('${note.id}')">${note.pinned ? "📌 Gelöst" : "📌 Anpinnen"}</button>
                </div>
                <div class="right">
                    <button class="icon-btn danger" type="button" onclick="notesDelete('${note.id}')">🗑️ Löschen</button>
                </div>
            </div>
        </div>
    `).join("");

    saveNotes();
}

function notesAdd(text = "") {
    notes.unshift({
        id: crypto.randomUUID(),
        text,
        pinned: false
    });
    renderNotes();
}

function notesUpdate(id, text) {
    const item = notes.find(n => n.id === id);
    if (!item) return;
    item.text = text;
    saveNotes();
}

async function notesCopy(id) {
    const item = notes.find(n => n.id === id);
    if (!item) return;
    await navigator.clipboard.writeText(item.text);
}

async function notesCopyAll() {
    const all = notes.map(n => n.text).join("\n\n");
    await navigator.clipboard.writeText(all);
}

function notesDuplicate(id) {
    const item = notes.find(n => n.id === id);
    if (!item) return;
    notes.unshift({ id: crypto.randomUUID(), text: item.text, pinned: false });
    renderNotes();
}

function notesTogglePin(id) {
    const item = notes.find(n => n.id === id);
    if (!item) return;
    item.pinned = !item.pinned;
    renderNotes();
}

function notesDelete(id) {
    notes = notes.filter(n => n.id !== id);
    renderNotes();
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

window.notesAdd = notesAdd;
window.notesCopyAll = notesCopyAll;
window.notesCopy = notesCopy;
window.notesDuplicate = notesDuplicate;
window.notesTogglePin = notesTogglePin;
window.notesDelete = notesDelete;
window.notesUpdate = notesUpdate;
window.addEventListener("load", renderNotes);
