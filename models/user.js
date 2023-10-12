//Imports des dépendances
const mongoose = require('mongoose');
const { Schema } = mongoose;

//Création du schéma de données pour un utilsateur: on a besoin d'un nom et d'un mot de passe. Le rôle est "user" par défaut
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }
})

module.exports = mongoose.model('User', userSchema);