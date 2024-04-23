import sqlite3 from "sqlite3";
import { open } from "sqlite";

open({ filename: "database.sqlite", driver: sqlite3.Database })
  .then((db) => {
    return db.prepare(`
       CREATE TABLE IF NOT EXISTS users (
         username TEXT PRIMARY KEY,
         password TEXT NOT NULL
         
       );
     `);
  })
  .then((statement) => statement.run())
  .catch((error) => {
    console.error("Error creating database", error);
    // Exit with non-zero exit code to indicate failure.
    process.exit(1);
  });