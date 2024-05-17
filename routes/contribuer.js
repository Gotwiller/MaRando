export async function post(req, res) {
  const { nom, description, score, adresse } = req.body;
  const db = req.context.database;

  try {
    const photo = req.file ? req.file.filename : null;

    if (!nom || !description || !score || !adresse || !photo) {
      return res.status(400).json({ message: 'Tous les champs doivent être remplis.' });
    }

    await db.run('INSERT INTO randonnees (nom, description, score, adresse, photo) VALUES (?, ?, ?, ?, ?)', [
      nom,
      description,
      score,
      adresse,
      `/styles/images/${photo}`
    ]);

    return res.status(201).json({ message: 'Ajout de la randonnée réussi' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}