//Imports des dépendances du projet:
const { createLogger, format, transports } = require("winston");

//Création d'un module permettant de logger les erreurs et infos de notre API
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            foramt: 'DD-MM-YYYY HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'library' },
    // Envoi les logs jusqu'au fichier spécifié ( à retrouver dans le dossier 'logs')
    transports: [
        new transports.File({ filename: './logs/library-error.log', level: 'error' }), //On log les erreurs dans un fichier dédié
        new transports.File({ filename: './logs/library.log' }) //L'intégralité des logs est envoyé dans ce fichier
    ]

});
// Si l'on est pas dans un environnement de production, on va venir logger dans la console et rajouter de la couleur
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    }));
};

module.exports = logger