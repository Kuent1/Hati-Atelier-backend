# Editions Machettes

## Contexte

Editions Machettes souhaite développer une API sécurisée pour gérer une bibliothèque de livres avec des utilisateurs ayant différents rôles (admin et utilisateur standard).

## Spécifications

### 1. **Initialisation:**

- Création d'un projet Node.js.
- Installation des packages nécessaires: `express`, `winston`, `mongoose`, `jsonwebtoken`.

### 2. **Système de Logging avec Winston:**

- Configuration de Winston pour enregistrer les informations, les warnings et les erreurs.
- Les logs doivent être consignés dans un fichier `logs.txt`.

### 3. **Modèles de Données avec Mongoose:**

- Modèle `User` avec les champs `username`, `password` et `role` (admin ou user).
- Modèle `Book` avec les champs `title`, `author`, `pages`, `genre`, `published` (boolean) et `userId` (référence à User).
- Les mots de passe des utilisateurs doivent être hashés.

### 4. **Middleware et Routes avec JWT:**

- Mise en place d'un middleware JWT pour sécuriser les routes.
- Les routes `POST /books` et `DELETE /books/:id` doivent être accessibles uniquement par les administrateurs.
- Les routes `GET /books` et `GET /books/:id` doivent être accessibles par tous les utilisateurs authentifiés.

### 5. **Endpoints Requis:**

- `POST /users/register` pour enregistrer un nouvel utilisateur.
- `POST /users/login` pour connecter un utilisateur et renvoyer un JWT.
- `POST /books` pour ajouter un nouveau livre (admin seulement).
- `GET /books` pour récupérer tous les livres (utilisateurs authentifiés).
- `GET /books/:id` pour récupérer un livre spécifique (utilisateurs authentifiés).
- `DELETE /books/:id` pour supprimer un livre (admin seulement).

### 6. **Gestion d'Erreur:**

- Mise en œuvre d'une gestion d'erreur robuste et cohérente sur tous les endpoints.
- Les erreurs doivent être loggées avec Winston.
- Les réponses d'erreur doivent être claires et structurées.

### 7. **Test de l'API:**

- Tests complets de tous les endpoints avec des outils appropriés.
- Vérification de la sécurité JWT et de la gestion d'erreur.

## Livrables

- Code source documenté et commenté.
- Documentation d'utilisation et un README de déploiement de l'API.

## Bonus

- Réaliser un front-end simple pour exploiter l'API : technos et outils libre

## Conclusion

Ce projet permettra aux Editions Machettes de gérer efficacement leur bibliothèque de livres avec une API sécurisée et robuste, facilitant ainsi les opérations quotidiennes et la gestion des utilisateurs et des livres.
