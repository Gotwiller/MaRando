import express from 'express';
import session from 'express-session';
import * as indexRoute from './routes/index.js';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import * as connexionRoute from './routes/connexion.js';
import * as contribuerRoute from './routes/contribuer.js';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8080;
const databaseFile = process.env.DATABASE_FILE || 'database.sqlite';

// Configuration de multer pour le téléchargement des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/styles/images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renommer le fichier avec la date actuelle
  },
});
const upload = multer({ storage });

function start(database) {
  const app = express();

  // Middleware to parse JSON and urlencoded data
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Configurer les sessions
  app.use(
    session({
      secret:'ton-code', // Utilisez une clé secrète réelle stockée dans les variables d'environnement
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Pour HTTPS, mettez `secure: true` en production
    })
  );

  app.use((req, res, next) => {
    req.context = req.context || {};
    req.context.database = database;
    next();
  });

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });

  // Routes
  app.get('/', indexRoute.get);
  app.post('/connexion', connexionRoute.post);
  app.post('/contribuer', contribuerRoute.post);

  app.get('/randonnees', async (req, res) => {
    try {
      const db = req.context.database;
      const randonnees = await db.all('SELECT nom, adresse FROM randonnees ORDER BY nom');
      res.json(randonnees);
    } catch (error) {
      res.status(500).send({ message: 'Erreur serveur' });
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

  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  app.use(express.static('public', { extensions: ['html'] }));

  app.get('/get-user', (req, res) => {
    if (req.session.user) {
      res.json({ username: req.session.user.username });
    } else {
      res.json({});
    }
  });
}

open({ filename: databaseFile, driver: sqlite3.Database })
  .then(start)
  .catch((error) => {
    console.error('Error opening database', error);
    process.exit(1);
  });
