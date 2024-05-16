document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const newUserCheckbox = document.getElementById('new-user');
    const errorMessageDiv = document.getElementById('error-message');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const isNewUser = newUserCheckbox.checked;
  
      const response = await fetch('/connexion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, newUser: isNewUser }),
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
  