export async function get(request, response) {
  try {
    const db = request.context.database;
    const randonnees = await db.all('SELECT nom, adresse FROM randonnees ORDER BY nom');

    const user = request.session.user;

    const randonneesHtml = randonnees.map(randonnee => `
      <div class="randonnee">
        <a href="randonnee.html?nom=${encodeURIComponent(randonnee.nom)}">${randonnee.nom}</a>
        <p>${randonnee.adresse}</p>
      </div>
    `).join('');

    response.send(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Accueil - Parcours de randonnées</title>
        <link rel="stylesheet" href="./styles/commun.css">
        <link rel="stylesheet" href="./styles/accueil.css">
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <script src="main.js"></script>
      </head>
      <body>
        <header class="header">
          <label class="logo">
            <i class='bx bx-landscape'></i>
          </label>
          <nav class="navbar">
            <a href="/">Randonner</a>
            <a href="contribuer.html">Contribuer</a>
            ${user ? `<span class="user-identifier">${user.username}</span><a id="logout-link" href="/logout">Déconnexion</a>` : `<a href="connexion.html">Connexion</a>`}
          </nav>
        </header>
        <div class="wrapper">
          ${randonneesHtml}
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    response.status(500).send({ message: 'Erreur serveur' });
  }
}
