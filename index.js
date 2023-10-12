//Imports des dépendances du projet:
require('dotenv').config();
const express = require('express');
const logger = require('./tools/logger');
const mongoose = require('mongoose');
const asyncErrorHandler = require('./tools/asyncErrorHandler');
const PORT = process.env.PORT || 666;
require('./models/book');
require('./models/user');

//Connection à la base de données MongoDB, ne pas oublier de paramétrer le fichier .env !
mongoose.connect(process.env.MONGODB_URL);
mongoose.connection.on('connected', () => {
    logger.info({ message: "Library Server is connected to MongoDB" })
});

//On initialise notre application Express et lui permet de parser du JSON
const app = express();
app.use(express.json());

//Nos différents routers et leurs routes associées:
const userRouter = require('./routes/user');
app.use('/users', userRouter);

// Si aucune route mais pas d'autres d'erreurs, un code 404 est envoyé
app.use((req, res) => {
    res.status(404).json({
        message: 'Ressource not found'
    });
    logger.warn({ message: 'Ressource not found' })
})

// Si une erreur a été détectée, un code 500 est envoyé
app.use((err, req, res, next) => {
    res.status(500).json({
        message: 'Server error'
    });
    logger.error({ message: err.stack })
})

//On demande ici à notre serveur d'écouter sur le port séléctionné dans le fichier .env, ou le port 3000 par défaut
app.listen(PORT, () => {
    logger.info({ message: `Library Server is listening on port ${PORT}` })
});