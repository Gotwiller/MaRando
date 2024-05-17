document.addEventListener('DOMContentLoaded', () => {
    fetch('/get-user')
        .then(response => response.json())
        .then(data => {
            if (!data.username) {
                window.location.href = '/connexion.html';
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            window.location.href = '/connexion.html';
        });
});

document.getElementById('contribution-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    formData.append('newRando', true);

    try {
        const response = await fetch('/ajouter-randonnee', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        
        if (response.ok) {
            alert('Randonnée ajoutée avec succès');
            window.location.href = `/randonnee.html?nom=${encodeURIComponent(result.nom)}`;
        } else {
            alert(result.message || 'Une erreur est survenue');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue');
    }
});
