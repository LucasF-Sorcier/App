document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const gameId = params.get("partie");
  document.getElementById("partie-id").textContent = gameId || "inconnu";

  const questions = JSON.parse(localStorage.getItem(`questions_${gameId}`)) || [];

  if (questions.length === 0) {
    document.getElementById("jeu-container").textContent = "Aucune question disponible dans cette partie.";
    document.getElementById("submit-answers").style.display = "none";
    return;
  }

  const jeuContainer = document.getElementById("jeu-container");

  // Crée le formulaire de questions/réponses
  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.style.marginBottom = "1em";

    const questionText = document.createElement("p");
    questionText.textContent = `${i + 1}. ${q.texte} (proposée par ${q.auteur})`;
    div.appendChild(questionText);

    const input = document.createElement("input");
    input.type = "text";
    input.name = `reponse_${i}`;
    input.placeholder = "Ta réponse";
    div.appendChild(input);

    jeuContainer.appendChild(div);
  });

  document.getElementById("submit-answers").addEventListener("click", () => {
    // Récupérer les réponses
    const reponses = [];
    for(let i=0; i<questions.length; i++) {
      const val = document.querySelector(`input[name="reponse_${i}"]`).value.trim();
      reponses.push(val);
    }
    // Stocker les réponses dans localStorage
    localStorage.setItem(`reponses_${gameId}`, JSON.stringify(reponses));

    // Aller à la page résultat
    window.location.href = `resultat.html?partie=${gameId}`;
  });
});
