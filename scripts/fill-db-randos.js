import sqlite3 from "sqlite3";
import { open } from "sqlite";

var Nom='Chamechaude depuis le Col de Porte';
var Description = 'Point culminant du massif de la Chartreuse, à 2082 mètres avec en prime, un passage avec un câble pour accéder à la plateforme du sommet. Magnifique panorama sur la Chartreuse, vue sur le Mont Blanc, le Mont Aiguille et le Vercors.';
var Score = 0;
var AdresseDepart = 'N 45.29067° / E 5.767096°';
var Photo = 'Chamechaude.jpg';

open({ filename: "database.sqlite", driver: sqlite3.Database })
  .then((db) => {
    return db.prepare(`
      INSERT INTO randonnees (nom, description, score, adresse, photo) 
      VALUES (?, ?, ?, ?, ?)
      `, [Nom, Description, Score, AdresseDepart, Photo]
    );  
  })
  .then((statement) => statement.run())
  .catch((error) => {
    console.error("Error creating database", error);
    // Exit with non-zero exit code to indicate failure.
    process.exit(1);
  });



  