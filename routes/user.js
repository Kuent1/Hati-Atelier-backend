//Imports des dépendances du projet
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const asyncErrorHandler = require('../tools/asyncErrorHandler');
const { getToken } = require('../security/jwt');
const logger = require('../tools/logger');
const userModel = mongoose.model('User');

//Initialisation de notre router Express
const router = express.Router();

//`POST /register` permet de créer un utilisateur
router.post('/register', asyncErrorHandler(async (req, res) => {
    const { username, password, role } = req.body;

    //Pour des question de sécuritées, le mot de passe est hashé, puis réattribué à l'utilisateur avec le reste de ses infos
    let hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        username,
        password: hashPassword,
        role
    });
    //On informe l'utilisateur du status de sa requête, et on lance éventuellement une erreur en cas de problème
    if (user) {
        logger.warn('User created' + user);
        res.status(201).json(user);
    } else {
        res.status(500).json("Couldn't create new user");
        throw new Error("Couldn't create new user");
    }
}));

//`POST /login` permet de se connecter et de reçevoir un jeton JWT
router.post('/login', asyncErrorHandler(async (req, res) => {
    //On vient récupérer le combo user/password, puis on va aller chercher les infos de l'user dans la base de données
    const { username, password } = req.body
    const user = await userModel.findOne({ username });
    if (!user) {
        //On informe l'utilisateur qu'il s'est trompé d'utilisateur ou de mot de passe, puis on log la tentative
        res.status(401).json('Username or Password does not match');
        logger.warn('Invalid username' + username);
    } else {
        const validPassword = await bcrypt.compare(password, user.password); //On effectue ici la vérification du mot de passe fourni avec le hash de la base de données
        if (!validPassword) {
            //On informe l'utilisateur qu'il s'est trompé d'utilisateur ou de mot de passe, puis on log la tentative
            res.status(401).json('Username or Password does not match');
            logger.warn('Invalid password' + username)
        } else {
            //Si l'user a donné la bonne combinaison, on lui renvoie son token et on log sa connexion
            const token = getToken(user);
            res.status(201).json({ "token": token });
            logger.info(`${username} logged in.`)
        }
    }
}));

router.delete('/:id', asyncErrorHandler(async(req, res) => {
    const {id} = req.params;

    const user = await userModel.findByIdAndDelete(id);

    if (!user) return res.status(404).json({message: "user not found"})

    res.json({message: "User deleted successfully"});
    logger.warn(`${id} deleted successfully`);
}))

module.exports = router;