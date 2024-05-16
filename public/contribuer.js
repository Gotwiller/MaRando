    document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contribution-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
            
        const nom = document.getElementById('nom').value;
        const description = document.getElementById('description').value;
        const score = document.getElementById('note').value;
        const adresse = document.getElementById('adresse').value;
        const photo = document.getElementById('image').files[0]; 
        
        requete = 'INSERT INTO randonnees VALUES ('+nom+ +','+description+','+score+','+adresse+','+photo+')';

         app.post('/ajouter-randonnee', async (req, res) => {
            const randoDB = new sqlite3.Database('./database.sqlite');
            randoDB.run(requete, function(err) {
                if (err) {
                    return console.error('Erreur lors de l\'insertion des données de randonnée:', err.message);
                }
                console.log('Randonnée ajoutée avec succès !');
            });
        });
        
        window.location.href = "randonnee.html";    
    });
});
