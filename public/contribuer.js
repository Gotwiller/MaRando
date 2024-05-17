document.getElementById('contribution-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  formData.append('newRando', true);

  try {
      const response = await fetch('/contribuer', {
          method: 'POST',
          body: formData,
      });

      const result = await response.json();
      
      if (response.ok) {
          alert('Randonnée ajoutée avec succès');
      } else {
          alert(result.message || 'Une erreur est survenue');
      }
  } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue');
  }
});
