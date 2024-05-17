import express from 'express';
import session from 'express-session';
import * as indexRoute from './routes/index.js';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import * as connexionRoute from './routes/connexion.js';
import * as contribuerRoute from './routes/contribuer.js';
import multer from 'multer';
import path from 'path';

const port = 8080;
const databaseFile = 'database.sqlite';

// Configuration de multer pour le téléchargement des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renommer le fichier avec la date actuelle
  },
});
const upload = multer({ storage });

function start(database) {
  const app = express();

  // Configurer les sessions
  app.use(
    session({
      secret: 'your-secret-key', // Changez cette clé par une clé secrète réelle
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Pour HTTPS, mettez `secure: true`
    })
  );

  app.use((request, response, next) => {
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
  app.use(express.urlencoded({ extended: true }));

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

  // Route pour ajouter une nouvelle randonnée
  app.post('/ajouter-randonnee', upload.single('photo'), async (req, res) => {
    try {
      const db = req.context.database;
      const { nom, description, score, adresse } = req.body;
      const photo = req.file ? `/images/${req.file.filename}` : null;

      if (!nom || !description || !score || !adresse || !photo) {
        res.status(400).json({ message: 'Tous les champs doivent être remplis.' });
        return;
      }

      await db.run(
        'INSERT INTO randonnees (nom, description, score, adresse, photo) VALUES (?, ?, ?, ?, ?)',
        [nom, description, score, adresse, photo]
      );

      res.status(200).json({ nom });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Erreur serveur' });
    }
  });
}

open({ filename: databaseFile, driver: sqlite3.Database })
  .then(start)
  .catch((error) => {
    console.error('Error opening database', error);
    process.exit(1);
  });
