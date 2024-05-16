document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const nom = params.get('nom');
  
    if (!nom) {
      document.body.innerHTML = '<p>Randonnée non trouvée</p>';
      return;
    }
  
    const response = await fetch(`/randonnee?nom=${encodeURIComponent(nom)}`);
    const randonnee = await response.json();
  
    if (response.ok) {
      document.getElementById('nom-randonnee').textContent = randonnee.nom;
      document.getElementById('description-randonnee').textContent = randonnee.description;
      document.getElementById('score-randonnee').textContent = `Score: ${randonnee.score}`;
      document.getElementById('adresse-randonnee').textContent = `Adresse: ${randonnee.adresse}`;
      document.getElementById('photo-randonnee').src = randonnee.photo;
  
      // Check if user is logged in
      const userResponse = await fetch('/get-user');
      const user = await userResponse.json();
      if (user.username) {
        document.getElementById('note-section').style.display = 'block';
      } else {
        window.location.href = '/connexion.html';
      }
    } else {
      document.body.innerHTML = '<p>Erreur lors de la récupération des détails de la randonnée</p>';
    }
  
    // Handle note submission
    document.getElementById('submit-note').addEventListener('click', async () => {
      const note = document.getElementById('note').value;
      const response = await fetch('/submit-note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, note })
      });
  
      if (response.ok) {
        document.getElementById('score-randonnee').textContent = `Score: ${await response.json().newScore}`;
        document.getElementById('error-message').textContent = '';
      } else {
        document.getElementById('error-message').textContent = 'Erreur lors de l\'envoi de la note';
      }
    });
  });
