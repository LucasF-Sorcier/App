document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const gameId = params.get("partie");
  const resultsDiv = document.getElementById("results");

  if (!gameId) {
    resultsDiv.innerText = "ID de partie manquant.";
    return;
  }

  const data = JSON.parse(localStorage.getItem(`quiz_${gameId}`));
  if (!data) {
    resultsDiv.innerText = "Questionnaire introuvable.";
    return;
  }

  resultsDiv.innerHTML = `<h2>${data.title}</h2>`;

  const players = Object.keys(localStorage)
    .filter(key => key.startsWith(`reponse_${gameId}_`));

  if (players.length === 0) {
    resultsDiv.innerHTML += "<p>Aucune réponse encore.</p>";
    return;
  }

  players.forEach(key => {
    const name = key.split(`reponse_${gameId}_`)[1];
    const answers = JSON.parse(localStorage.getItem(key));

    const div = document.createElement("div");
    div.innerHTML = `<h3>${name}</h3>`;
    answers.forEach((ans, i) => {
      div.innerHTML += `<p><strong>${data.questions[i]}</strong><br>${ans}</p>`;
    });
    resultsDiv.appendChild(div);
  });
});
