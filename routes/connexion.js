import bcrypt from 'bcrypt';

export async function post(request, response) {
  const { username, password, newUser } = request.body;
  const db = request.context.database;

  try {
    const user = await db.get('SELECT * FROM users WHERE username = ?', username);

    if (newUser) {
      if (user) {
        return response.status(409).json({ message: 'Identifiant existe déjà' });
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        await db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        request.session.user = { username }; // Stocker l'utilisateur dans la session
        return response.status(201).json({ message: 'Inscription réussie' });
      }
    } else {
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          request.session.user = { username }; // Stocker l'utilisateur dans la session
          return response.status(200).json({ message: 'Connexion réussie' });
        } else {
          return response.status(401).json({ message: 'Mot de passe incorrect' });
        }
      } else {
        return response.status(404).json({ message: "Identifiant n'existe pas" });
      }
    }
  } catch (error) {
    return response.status(500).json({ message: 'Erreur serveur' });
  }
}
