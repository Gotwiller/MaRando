document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contribution-form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nom = document.getElementById('nom').value;

    const response = await fetch('/ajouter-randonnee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom,description, score, adresse, image, newRando: isNewRando}),
    });

    const result = await response.json();

    if (response.ok) {
      errorMessageDiv.textContent = '';
      
      window.location.href = '/';
    } else {
      errorMessageDiv.textContent = result.message;
    }
  });
});
  