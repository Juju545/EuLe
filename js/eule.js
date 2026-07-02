function renderEuleLevel(levelKey){
    const data = EuleData.levels[levelKey];
    const container = document.getElementById("euleDetails");
    if (!data || !container) return;

    container.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.summary}</p>
        <div class="grid-2">
            <div>
                <h4>Privilegien</h4>
                <ul>${data.privileges.map(item => `<li>${item}</li>`).join("")}</ul>
            </div>
            <div>
                <h4>Pflichten</h4>
                <ul>${data.duties.map(item => `<li>${item}</li>`).join("")}</ul>
            </div>
        </div>
        <p class="note">Die Angaben beruhen auf deinem Eule-Dokument und können später noch weiter präzisiert werden.</p>
    `;
    document.querySelectorAll(".eule-card").forEach(btn => btn.classList.remove("active"));
    const activeMap = { gruen: 0, gelb: 1, rot: 2, mini: 3 };
    const activeBtn = document.querySelectorAll(".eule-card")[activeMap[levelKey]];
    if (activeBtn) activeBtn.classList.add("active");
}

window.selectEuleLevel = renderEuleLevel;
window.addEventListener("load", () => renderEuleLevel("gruen"));
