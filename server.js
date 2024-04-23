import express from "express";
import * as indexRoute from "./routes/index.js";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import * as connexionRoute from "./routes/connexion.js";

const port = 8080;
const databaseFile = "database.sqlite";

function start(database) {
  const app = express();

  app.use((request, response, next) => {
    // Create a context object for the request if it doesn't exist.
    request.context = request.context ?? {};
    request.context.database = database;
    next();
  });

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });

  //route pour afficher la page d'acceuil
  app.get("/", indexRoute.get);

  app.use((request, response, next) => {
    console.log(`${request.method} ${request.url}`);
    next();
  });

  app.use(express.static("public", { extensions: ["html"] }));

  app.use(express.json());

  app.post("/connexion",connexionRoute.post);



  

}


open({ filename: databaseFile, driver: sqlite3.Database })
  .then(start)
  .catch((error) => {
    console.error("Error opening database", error);
    process.exit(1);
  });