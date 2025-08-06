document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const gameId = params.get("partie");

  const container = document.getElementById("quiz-container");
  const submitBtn = document.getElementById("submit-answers");
  const confirmation = document.getElementById("confirmation");
  const playerNameInput = document.getElementById("player-name");

  if (!gameId) {
    container.innerHTML = "Aucune partie spécifiée.";
    return;
  }

  const data = JSON.parse(localStorage.getItem(`quiz_${gameId}`));
  if (!data) {
    container.innerHTML = "Partie introuvable.";
    return;
  }

  container.innerHTML = `<h2>${data.title}</h2>`;
  data.questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${q}</p>
      <input type="text" class="answer" data-index="${i}">
    `;
    container.appendChild(div);
  });

  submitBtn.addEventListener("click", () => {
    const name = playerNameInput.value.trim();
    if (!name) {
      alert("Entre ton prénom !");
      return;
    }

    const answers = [];
    document.querySelectorAll(".answer").forEach(input => {
      answers.push(input.value.trim());
    });

    localStorage.setItem(`reponse_${gameId}_${name}`, JSON.stringify(answers));
    confirmation.innerHTML = `Réponses envoyées ! <a href="resultat.html?partie=${gameId}">Voir les réponses</a>`;
  });
});
