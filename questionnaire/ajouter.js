document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const gameId = params.get("partie");
  document.getElementById("partie-id").textContent = gameId || "inconnu";

  const questionsContainer = document.getElementById("questions-container");
  const addBtn = document.getElementById("add-question");
  const envoyerBtn = document.getElementById("envoyer");
  const message = document.getElementById("message");

  function createQuestionInput() {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Écris ta question";
    input.classList.add("question");
    questionsContainer.appendChild(input);
    questionsContainer.appendChild(document.createElement("br"));
  }

  addBtn.addEventListener("click", createQuestionInput);

  // Ajoute une première question par défaut
  createQuestionInput();

  envoyerBtn.addEventListener("click", () => {
    const player = document.getElementById("player-name").value.trim();
    if (!player) {
      alert("Entre ton prénom");
      return;
    }

    const inputs = document.querySelectorAll(".question");
    const newQuestions = Array.from(inputs)
      .map(input => input.value.trim())
      .filter(q => q.length > 0)
      .map(q => ({ auteur: player, texte: q }));

    if (newQuestions.length === 0) {
      alert("Ajoute au moins une question !");
      return;
    }

    // Récupérer les questions déjà stockées
    const stored = JSON.parse(localStorage.getItem(`questions_${gameId}`)) || [];
    // Ajoute les nouvelles questions
    const updated = [...stored, ...newQuestions];
    localStorage.setItem(`questions_${gameId}`, JSON.stringify(updated));

    message.textContent = "Merci ! Tes questions ont été ajoutées.";
    questionsContainer.innerHTML = "";
    createQuestionInput(); // Remet une zone vide pour ajouter plus
  });
});
