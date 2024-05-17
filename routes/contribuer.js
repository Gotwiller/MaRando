export async function post(request, response) {
  const { nom, description, score, adresse, image, newRando } = request.body;
  const db = request.context.database;

  try {
    if (newRando) {
      await db.run('INSERT INTO randonnees (nom, description, score, adresse, image) VALUES (?, ?, ?, ?, ?)', [
        nom,
        description,
        score,
        adresse,
        image.filename 
      ]);
      return response.status(201).json({ message: 'Ajout de la randonnée réussi' });
    }
  } catch (error) {
    return response.status(500).json({ message: 'Erreur serveur' });
  }
}
