export function get(request, response) {
  response.send(`
  <!DOCTYPE html>

  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Accueil - Parcours de randonnées</title>
  
      <link rel="stylesheet" href="./styles/commun.css"/>
      <link rel="stylesheet" href="./styles/accueil.css"/>

      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
  
  </head>
  <body>
  
    <header class="header">
          <label for="" class="logo">
              <i<i class='bx bx-landscape'></i> 
  
          </label>
  
          <nav class="navbar">
              <a href="/">Randonner</a>
              <a href="contribuer.html" >Contribuer</a>
              <a href="./connexion">Connexion</a>
  
          </nav>
     </header>
  
  
  </body>
  `);
}