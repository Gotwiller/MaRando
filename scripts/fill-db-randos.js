import sqlite3 from "sqlite3";
import { open } from "sqlite";

open({ filename: "database.sqlite", driver: sqlite3.Database })
  .then((db) => {
    return db.prepare(`
    INSERT INTO randonnees (nom, description, score, adresse, photo)
    VALUES 
        ('Chamechaude depuis le Col de Porte', 'Point culminant du massif de la Chartreuse, à 2082 mètres avec en prime, un passage avec un câble pour accéder à la plateforme du sommet. Magnifique panorama sur la Chartreuse, vue sur le Mont Blanc, le Mont Aiguille et le Vercors.', NULL, 'N 45.29067° / E 5.767096°', './public/styles/images/chamechaude.jpg'),
        ('Mont Rachais depuis Grenoble en boucle', 'xxx', NULL, 'N 45.193545° / E 5.719999°', './public/styles/images/chamechaude.jpg'),
        ('Dent de Crolles','xxx',NULL,'N 45.296582° / E 5.845023°','./public/styles/images/chamechaude.jpg'),
        ('Lac Achard', 'xxx', NULL, 'N 45.193545° / E 5.719999°', './public/styles/images/chamechaude.jpg'),
        ('Lac Blanc au départ de Pairis','xxx',NULL,'N 48.115866° / E 7.121023°','./public/styles/images/chamechaude.jpg'),
        ('Lacs Robert depuis le Recoin','xxx',NULL,'N 45.12526° / E 5.87888°','./public/styles/images/chamechaude.jpg'),
        ('Moucherotte','xxx',NULL,'N 45.160863° / E 5.618032°','./public/styles/images/chamechaude.jpg'),
        ('Dent du loup','xxx',NULL,'N 45.193189° / E 5.619734°','./public/styles/images/chamechaude.jpg'),
        ('Pic Saint-Michel','xxx',NULL,'N 45.087962° / E 5.641852°','./public/styles/images/chamechaude.jpg');
`   );  
  })
  .then((statement) => statement.run())
  .catch((error) => {
    console.error("Error creating database", error);
    // Exit with non-zero exit code to indicate failure.
    process.exit(1);
  });



  