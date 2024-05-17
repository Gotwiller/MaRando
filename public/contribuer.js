document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contribution-form');
  
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
  
      const formData = new FormData(form);
  
      const response = await fetch('/ajouter-randonnee', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        window.location.href = `/randonnee?nom=${encodeURIComponent(result.nom)}`;
      } else {
        const result = await response.json();
        alert(result.message);
      }
    });
  });
  