//Imports des dépendances du projet
const express = require('express');
const mongoose = require('mongoose');
const logger = require('../tools/logger');
const asyncErrorHandler = require('../tools/asyncErrorHandler');
const { checkToken } = require('../security/jwt');
const bookModel = mongoose.model('Book');

//Initialisation de notre router Express;
const router = express.Router();

//Utilisation de notre middleware afin de vérifier le token d'authorisation
router.use(checkToken);

// `POST /` permet de rajouter un livre à la collection (admin seulement)
router.post('/', checkToken, asyncErrorHandler(async (req, res) => {
    if (req.decoded) {
        //On s'assure ici que l'utilisateur est bien un administrateur pour rajouter un livre
        if (req.decoded.role === 'admin') {
            const body = req.body;
            try {
                const book = await bookModel.create(body);
                res.status(201).json({ "New book": book });
            } catch (err) {
                res.status(500).json({ message: 'Internal server error' });
                logger.error('Error creating book: ' + err);
                throw new Errror('Server error creating new book: ' + err);
            }
        } else { //Sinon, on notifie l'utilisateur et log la tentative
            logger.error('User does not have the admin role');
            res.status(401).json({ message: "You need to be an admin to register a new book." })
            throw new Error('User does not have the admin role')
        }
    }
}));

// `GET /` permet de récupérer la liste de tous les livres (utilisateur authentifié)

router.get('/', checkToken, asyncErrorHandler(async (req, res) => {
    //On s'assure que l'utilisateur est connecté avant de lui transmettre la liste complète de livres
    if (req.decoded) {
        try {
            res.json(await bookModel.find({}));
        } catch (err) {
            //On notifie l'utilisateur en cas d'erreur
            res.status(500).json({ message: "Internal server error" });
            logger.error('Error fetching books: ' + err);
            throw new Errror('Server error fetching all books: ' + err);
        }
    }
}))

// `GET /:id` permet de récupérer un livre grâce à son id (utilisateur authentifié)
router.get('/:id', checkToken, asyncErrorHandler(async (req, res) => {
    //On s'assure que l'utilisateur est connecté avant de lui transmettre les infos
    if (req.decoded) {
        const { id } = req.params;
        try {
            const book = await bookModel.findById(id);
            if (!book) { // On notifie l'utilisateur que l'id n'existe pas
                res.status(404).json({ message: "Couldn't find specified book" });
                logger.warn(`Couldn't find book ${id}`);
                throw new Error("Couldn't find book");
            }
            res.json({ book });
        } catch (err) {
            //On notifie l'utilisateur en cas d'erreur
            res.status(500).json({ message: "Internal server error" });
            logger.error('Error fetching book: ' + err);
            throw new Errror('Server error fetching book: ' + err);
        }
    }
}));
// `DELETE /:id` permet de supprimer un livre (admin uniquement)

router.delete('/:id', checkToken, asyncErrorHandler(async (req, res) => {
    //On s'assure que l'utilisateur est connecté et admin
    if (req.decoded) {
        const { id } = req.params;
        if (req.decoded.role === "admin") {
            try {
                const book = await bookModel.findByIdAndDelete(id);
                logger.warn(`Book ${id} deleted`);
                res.json({message: `Book ${id} deleted`})
                if (!book) { // On notifie l'utilisateur que l'id n'existe pas
                    res.status(404).json({ message: "Couldn't find specified book" });
                    logger.warn(`Couldn't find book ${id}`);
                    throw new Error("Couldn't find book");
                }
            } catch (err) {
                //On notifie l'utilisateur en cas d'erreur
                res.status(500).json({ message: "Internal server error" });
                logger.error('Error deleting book: ' + err);
                throw new Errror('Server error deleting book: ' + err);
            }
        } else { //Sinon, on notifie l'utilisateur et log la tentative
            logger.error('User does not have the admin role');
            res.status(401).json({ message: "You need to be an admin to register a new book." })
            throw new Error('User does not have the admin role')
        }
    }
}));


module.exports = router;