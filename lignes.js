// Injection robuste des lignes de production
const LIGNES_PRODUCTION = ["Ligne 1", "Ligne 2", "Ligne 3"];

function remplirTousLesDropdownsLigne() {
  const selects = document.querySelectorAll("select");

  selects.forEach((select) => {
    const id = (select.id || "").toLowerCase();
    const name = (select.name || "").toLowerCase();
    const aria = (select.getAttribute("aria-label") || "").toLowerCase();
    const dataField = (select.getAttribute("data-field") || "").toLowerCase();

    const ressembleAUnChampLigne =
      id.includes("ligne") ||
      name.includes("ligne") ||
      aria.includes("ligne") ||
      dataField.includes("ligne");

    if (!ressembleAUnChampLigne) return;

    const valeurActuelle = select.value || "";
    select.innerHTML = '<option value="">— Sélectionner une ligne —</option>';

    LIGNES_PRODUCTION.forEach((ligne) => {
      const option = document.createElement("option");
      option.value = ligne;
      option.textContent = ligne;
      select.appendChild(option);
    });

    if (LIGNES_PRODUCTION.includes(valeurActuelle)) {
      select.value = valeurActuelle;
    }
  });
}

function relancerInjectionLignes() {
  remplirTousLesDropdownsLigne();
  setTimeout(remplirTousLesDropdownsLigne, 150);
  setTimeout(remplirTousLesDropdownsLigne, 500);
}

document.addEventListener("DOMContentLoaded", relancerInjectionLignes);
document.addEventListener("click", () => setTimeout(remplirTousLesDropdownsLigne, 200));
document.addEventListener("change", () => setTimeout(remplirTousLesDropdownsLigne, 200));

let essais = 0;
const interval = setInterval(() => {
  remplirTousLesDropdownsLigne();
  essais += 1;
  if (essais >= 30) clearInterval(interval);
}, 400);
