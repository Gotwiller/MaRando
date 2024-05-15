// Sélectionnez le formulaire
const form = document.getElementById('contribution-form');

// Ajoutez un gestionnaire d'événements pour soumettre le formulaire
form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const nom = document.getElementById('nom').value;
    const description = document.getElementById('description').value;
    const score = document.getElementById('note').value;
    const adresse = document.getElementById('depart').value;
    const photo = document.getElementById('image').files[0]; // Pour récupérer le fichier d'image

    requete = 'INSERT INTO randonnees VALUES ('+nom+ +','+description+','+score+','+adresse+','+photo+')';
    
    console.log(requete);

});
