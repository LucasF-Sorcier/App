document.addEventListener("DOMContentLoaded", () => {
  const addQuestionBtn = document.getElementById("add-question");
  const saveQuizBtn = document.getElementById("save-quiz");
  const questionsContainer = document.getElementById("questions-container");
  const generatedLink = document.getElementById("generated-link");
  const quizTitleInput = document.getElementById("quiz-title");

  let questionCount = 0;

  function generateGameId() {
    return Math.random().toString(36).substring(2, 8);
  }

  addQuestionBtn.addEventListener("click", () => {
    questionCount++;

    const div = document.createElement("div");
    div.innerHTML = `
      <label>Question ${questionCount} :</label>
      <input type="text" class="question-input" placeholder="Votre question">
      <button class="remove">X</button>
    `;
    div.querySelector(".remove").addEventListener("click", () => div.remove());
    questionsContainer.appendChild(div);
  });

  saveQuizBtn.addEventListener("click", () => {
    const quizTitle = quizTitleInput.value.trim();
    const questionInputs = document.querySelectorAll(".question-input");

    if (!quizTitle || questionInputs.length === 0) {
      alert("Titre et au moins une question !");
      return;
    }

    const questions = [];
    questionInputs.forEach(input => {
      if (input.value.trim()) questions.push(input.value.trim());
    });

    const gameId = generateGameId();
    localStorage.setItem(`quiz_${gameId}`, JSON.stringify({ title: quizTitle, questions }));

    const link = `repondre.html?partie=${gameId}`;
    generatedLink.innerHTML = `
      <p>Partage ce lien avec tes amis :</p>
      <a href="${link}" target="_blank">${link}</a>
    `;
  });
});
