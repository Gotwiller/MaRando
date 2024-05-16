import express from 'express';
import session from 'express-session';
import * as indexRoute from './routes/index.js';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import * as connexionRoute from './routes/connexion.js';

const port = 8080;
const databaseFile = 'database.sqlite';

function start(database) {
  const app = express();

  // Configurer les sessions
  app.use(
    session({
      secret: 'your-secret-key', // Changez cette clé par une clé secrète réelle
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false } // Pour HTTPS, mettez `secure: true`
    })
  );

  app.use((request, response, next) => {
    // Create a context object for the request if it doesn't exist.
    request.context = request.context ?? {};
    request.context.database = database;
    next();
  });

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });

  // Route pour afficher la page d'accueil
  app.get('/', indexRoute.get);

  // Route pour obtenir la liste des randonnées
app.get('/randonnees', async (req, res) => {
  try {
    const db = req.context.database;
    const randonnees = await db.all('SELECT nom, adresse FROM randonnees ORDER BY nom');
    res.json(randonnees);
  } catch (error) {
    res.status(500).send({ message: 'Erreur serveur' });
  }
});


  app.use((request, response, next) => {
    console.log(`${request.method} ${request.url}`);
    next();
  });

  app.use(express.static('public', { extensions: ['html'] }));

  app.use(express.json());

  app.post('/connexion', connexionRoute.post);

  // Route pour obtenir l'utilisateur connecté
  app.get('/get-user', (request, response) => {
    if (request.session.user) {
      response.json({ username: request.session.user.username });
    } else {
      response.json({});
    }
  });

  app.get('/randonnee', async (req, res) => {
    try {
      const db = req.context.database;
      const nom = req.query.nom;
      const randonnee = await db.get('SELECT * FROM randonnees WHERE nom = ?', nom);
      if (randonnee) {
        res.json(randonnee);
      } else {
        res.status(404).send({ message: 'Randonnée non trouvée' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Erreur serveur' });
    }
  });
  

  // Route pour déconnexion
  app.get('/logout', (request, response) => {
    request.session.destroy((err) => {
      if (err) {
        return response.status(500).send({ message: 'Erreur de déconnexion' });
      }
      response.clearCookie('connect.sid');
      response.status(200).send({ message: 'Déconnexion réussie' });
    });
  });
}

open({ filename: databaseFile, driver: sqlite3.Database })
  .then(start)
  .catch((error) => {
    console.error('Error opening database', error);
    process.exit(1);
  });
