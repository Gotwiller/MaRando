document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const nom = params.get('nom');
  
  if (nom) {
    console.log('Nom de la randonnée récupéré:', nom);
    try {
      const response = await fetch(`/randonnee?nom=${encodeURIComponent(nom)}`);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const responseText = await response.text();
      console.log('Texte brut de la réponse:', responseText);

      const randonnee = JSON.parse(responseText);
      console.log('Détails de la randonnée récupérés:', randonnee);

      if (randonnee && randonnee.nom && randonnee.description) {
        afficherDetailsRandonnee(randonnee);
      } else {
        afficherMessageErreur('Détails de la randonnée non disponibles');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de la randonnée:', error);
      afficherMessageErreur('Erreur lors de la récupération des détails de la randonnée');
    }
  } else {
    console.log('Aucun nom de randonnée fourni');
    afficherMessageErreur('Aucun nom de randonnée fourni');
  }
});

function afficherDetailsRandonnee(randonnee) {
  document.getElementById('nom-randonnee').textContent = randonnee.nom;
  document.getElementById('photo-randonnee').src = randonnee.photo ; 
  document.getElementById('description-randonnee').textContent = randonnee.description;
  document.getElementById('adresse-randonnee').textContent = randonnee.adresse || 'Adresse non spécifiée';
  document.getElementById('score-randonnee').textContent = `Score: ${randonnee.score}`;
}

function afficherMessageErreur(message) {
  document.getElementById('nom-randonnee').textContent = message;
}
