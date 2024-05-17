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
                ('Mont Rachais depuis Grenoble en boucle', 'Le mont Rachais constitue l’extrémité sud du massif de la Chartreuse', 3.8, '2 Place Aristide Briand, 38000 Grenoble', './public/styles/images/mont_rachais.jpg'),
                ('Dent de Crolles','Ce sommet emblématique de la Chartreuse, offre un panorama exceptionnel jusqu’à sa cime surplombant la vallée. Au cœur du parc naturel régional de Chartreuse, ce promontoire perché à 2062 mètres d’altitude est une destination privilégiée pour les amoureux de la nature et de la rando.',4.5,'Route du Col du Coq, 38660 Plateau-des-Petites-Roches','./public/styles/images/dent_de_crolles.jpg'),
                ('Lac Achard', 'Une randonnée en plein nature aux portes de Grenoble. Le sentier vous mène à travers bois au Lac Archard où il fait bon de flâner. Puis, dans un milieu plus dégagé, le chemin vous fait monter jusqu’aux Lacs Robert.', 4, '623 Route de la Croisette, 38410 Chamrousse', './public/styles/images/lac_achard.jpg'),
                ('Lac Blanc au départ de Pairis','La randonnée au Lac Blanc est un des grands classiques incontournables de la Vallée de Chamonix qui fera découvrir au randonneur un panorama grandiose sur tout l’univers de la haute montagne.',4.2,'312 Noirrupt, 68370 Orbey','./public/styles/images/lac_blanc.jpg'),
                ('Lacs Robert depuis le Recoin','Les lacs Robert sont trois lacs français alpins du sud de la chaîne de Belledonne, à proximité de la station de sports d’hiver de Chamrousse.',4.6,'38 Place de Belledonne, 38410 Chamrousse','./public/styles/images/lac_robert.jpg'),
                ('Moucherotte','Itinéraire emblématique pour les Grenoblois. La vue du Moucherotte est magnifique. Une des plus belles vues sur Grenoble et ses environs.',4.4,'203 Impasse des Massues, 38250 Saint-Nizier-du-Moucherotte','./public/styles/images/moucherotte.jpg'),
                ('Dent du loup','Cette belle randonnée sur le plateau de Sornin permet de rendre visite au gros pylône qui surplombe la vallée de l’Isère au lieu-dit La Dent du Loup.',4,'1581 Route du Fournel, 38360 Engins, France','./public/styles/images/dent_du_loup.jpg'),
                ('Pic Saint-Michel','Avec tout juste 700m de dénivelée, le Pic Saint-Michel est un sommet très fréquenté en été comme en hiver (raquette, ski de rando).',4,'Sentier justin et via cordata de la bourgeoise, 38760 Varces-Allières-et-Risset, France','./public/styles/images/pic_saint_michel.jpg');
        `);

        console.log("BDD initialisée");
    } catch (error) {
        console.error("Erreur d'initialisation de la BDD", error);
        // Handle errors as per your application requirements
    }
}

// Call the function to initialize the database
initialiserBDD();
