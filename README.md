# DEPLOIEMENT DE L'API LIBRARY

_L'API Library Machettes repose sur une base de donnée NoSQL MongoDB. Afin de pouvoir travailler avec cet outil, vous devrez [créer un compte](https://cloud.mongodb.com/)._

_[NodeJS](https://nodejs.org/fr) est nécessaire au bon fonctionnement de votre API_

## Initialisation de l'API

Afin de télécharger toutes les dépendances nécessaires au bon fonctionnement de l'API, tapez la commande `npm install`.

## Configuration des variables d'environnement

L'API utilise des variables d'environnement afin de fonctionner correctement et en sécurité. Ces variables seront stockées dans un fichier nommé `.env` que vous devrez créer à la racine du projet.
Ce fichier contiendra, entre autres, l'URL vers votre base de données ainsi que des données nécessaires à l'encryption des mots de passes de vos utilisateurs. **ATTENTION DONC A NE JAMAIS LE PARTAGER**

## Configuration fichier .env

```env
    PORT=numéro de port au choix
    MONGODB_URL=mongodb+srv://<Username>:<password>@<URLbaseDeDonnées>/library
    NODE_ENV=production
    JWT_SECRET=Insérez ici un mot de passe
    JWT_EXPIRY=Entrez ici une durée correspondante à la durée des sessions de vos utilisateurs. Par exemple: 1d = 1 jour
```

## Lancement et utilisation de votre API

Afin de démarrer les services de votre API, ouvrez un terminal à la racine du projet et entrez la commande suivante: `node index.js`

Si vous souhaitez consulter les logs d'erreurs et d'informations, ceux-ci sont disponibles dans le dossier 'logs'.
