document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const gameId = params.get("partie");
  document.getElementById("partie-id").textContent = gameId || "inconnu";

  const questions = JSON.parse(localStorage.getItem(`questions_${gameId}`)) || [];
  const reponses = JSON.parse(localStorage.getItem(`reponses_${gameId}`)) || [];

  if (questions.length === 0) {
    document.getElementById("resultats-container").textContent = "Aucune question pour cette partie.";
    return;
  }
  if (reponses.length === 0) {
    document.getElementById("resultats-container").textContent = "Aucune réponse trouvée pour cette partie.";
    return;
  }

  const container = document.getElementById("resultats-container");

  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.style.marginBottom = "1em";

    const questionText = document.createElement("p");
    questionText.innerHTML = `<strong>Question ${i + 1}</strong> (proposée par ${q.auteur}) : ${q.texte}`;
    div.appendChild(questionText);

    const reponseText = document.createElement("p");
    reponseText.innerHTML = `<em>Réponse :</em> ${reponses[i] || "(pas de réponse)"}`;
    div.appendChild(reponseText);

    container.appendChild(div);
  });
});
