document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/get-user');
      const data = await response.json();
  
      const navbar = document.querySelector('.navbar');
      if (data.username) {
        const userSpan = document.createElement('span');
        userSpan.className = 'user-identifier';
        userSpan.textContent = data.username;
        navbar.appendChild(userSpan);
      } else {
        const loginLink = document.createElement('a');
        loginLink.href = 'connexion.html';
        loginLink.textContent = 'Connexion';
        navbar.appendChild(loginLink);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    }
  });
  