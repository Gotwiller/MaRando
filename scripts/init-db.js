import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function initialiserBDD() {
    try {
        const db = await open({
            filename: "database.sqlite",
            driver: sqlite3.Database
        });

        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                username TEXT PRIMARY KEY,
                password TEXT NOT NULL
            );
        `);

        await db.exec(`
            CREATE TABLE IF NOT EXISTS randonnees (
                nom TEXT PRIMARY KEY,
                description TEXT NOT NULL,
                score REAL NOT NULL,
                adresse TEXT NOT NULL,
                photo TEXT
            );
        `);

        await db.exec(`
            INSERT INTO randonnees (nom, description, score, adresse, photo)
            VALUES 
                ('Chamechaude depuis le Col de Porte', 'Point culminant du massif de la Chartreuse, à 2082 mètres avec en prime, un passage avec un câble pour accéder à la plateforme du sommet. Magnifique panorama sur la Chartreuse, vue sur le Mont Blanc, le Mont Aiguille et le Vercors.', 4, '50 Route du Charmant Som, 38700 Sarcenas', './public/styles/images/chamechaude.jpg'),
                ('Mont Rachais depuis Grenoble en boucle', 'xxx', 3.8, '2 Place Aristide Briand, 38000 Grenoble', './public/styles/images/chamechaude.jpg'),
                ('Dent de Crolles','xxx',4.5,'Route du Col du Coq, 38660 Plateau-des-Petites-Roches','./public/styles/images/chamechaude.jpg'),
                ('Lac Achard', 'xxx', 4, '623 Route de la Croisette, 38410 Chamrousse', './public/styles/images/chamechaude.jpg'),
                ('Lac Blanc au départ de Pairis','xxx',4.2,'312 Noirrupt, 68370 Orbey','./public/styles/images/chamechaude.jpg'),
                ('Lacs Robert depuis le Recoin','xxx',4.6,'38 Place de Belledonne, 38410 Chamrousse','./public/styles/images/chamechaude.jpg'),
                ('Moucherotte','xxx',4.4,'203 Impasse des Massues, 38250 Saint-Nizier-du-Moucherotte','./public/styles/images/chamechaude.jpg'),
                ('Dent du loup','xxx',4,'1581 Route du Fournel, 38360 Engins, France','./public/styles/images/chamechaude.jpg'),
                ('Pic Saint-Michel','xxx',4,'Sentier justin et via cordata de la bourgeoise, 38760 Varces-Allières-et-Risset, France','./public/styles/images/chamechaude.jpg');
        `);

        console.log("BDD initialisée");
    } catch (error) {
        console.error("Erreur d'initialisation de la BDD", error);
        // Handle errors as per your application requirements
    }
}

// Call the function to initialize the database
initialiserBDD();
