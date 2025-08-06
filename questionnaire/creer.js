document.getElementById("creer").addEventListener("click", () => {
  console.log("Bouton créer cliqué"); // Vérification que le clic est pris en compte

  // Générer un ID unique
  const id = Math.random().toString(36).substring(2, 8);
  console.log("ID généré :", id);

  try {
    localStorage.setItem(`questions_${id}`, JSON.stringify([]));
    console.log("localStorage mis à jour avec une liste vide");
  } catch (e) {
    console.error("Erreur lors de la sauvegarde dans localStorage", e);
    alert("Impossible de sauvegarder la partie dans localStorage.");
    return;
  }

  const link = `ajouter-question.html?partie=${id}`;
  document.getElementById("lien-partie").innerHTML = `
    Partage ce lien avec tes amis pour qu'ils ajoutent des questions :<br>
    <a href="${link}" target="_blank">${link}</a><br><br>
    Quand vous avez fini, rendez-vous ici pour jouer : <br>
    <a href="jouer.html?partie=${id}" target="_blank">Jouer au questionnaire</a>
  `;
});
