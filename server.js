import express from 'express';
import session from 'express-session';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';

import * as indexRoute from './routes/index.js';
import * as connexionRoute from './routes/connexion.js';
import * as contribuerRoute from './routes/contribuer.js';

dotenv.config();

const port = process.env.PORT || 8080;
const databaseFile = process.env.DATABASE_FILE || 'database.sqlite';

// Configuration de multer pour le téléchargement des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/styles/images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

function start(database) {
  const app = express();

  // Middleware to parse JSON and urlencoded data
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Configurer les sessions
  app.use(session({
    secret: 'ton-code',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  }));

  app.use((req, res, next) => {
    req.context = { database };
    next();
  });

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });

  // Routes
  app.get('/', indexRoute.get);
  app.post('/connexion', connexionRoute.post);
  app.post('/contribuer', upload.single('photo'), contribuerRoute.post);

  app.get('/randonnees', async (req, res) => {
    try {
      const db = req.context.database;
      const randonnees = await db.all('SELECT nom, adresse FROM randonnees ORDER BY nom');
      res.json(randonnees);
    } catch (error) {
      console.error(error);
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
      console.error(error);
      res.status(500).send({ message: 'Erreur serveur' });
    }
  });

  app.post('/ajouter-randonnee', upload.single('photo'), async (req, res) => {
    try {
      const db = req.context.database;
      const { nom, description, score, adresse } = req.body;
      const photo = req.file ? `/styles/images/${req.file.filename}` : null;

      if (!nom || !description || !score || !adresse || !photo) {
        return res.status(400).json({ message: 'Tous les champs doivent être remplis.' });
      }

      await db.run('INSERT INTO randonnees (nom, description, score, adresse, photo) VALUES (?, ?, ?, ?, ?)', [nom, description, score, adresse, photo]);
      res.status(200).json({ nom });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Erreur serveur' });
    }
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
