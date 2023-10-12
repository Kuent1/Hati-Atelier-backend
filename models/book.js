//Imports des dépendances
const mongoose = require('mongoose');
const { Schema } = mongoose;

//Création du schéma de données pour les livres
const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
    },
    genre: {
        type: String,
    },
    published: {
        type: Boolean,
        required: true
    },
    userId: {
        type: Schema.ObjectId, ref: 'User'
    }
})

module.exports = mongoose.model('Book', bookSchema);