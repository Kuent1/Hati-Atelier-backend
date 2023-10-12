const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || "VegaMissyl";
const expiry = process.env.JWT_EXPIRY || "3d";

//Fonction permettant de générer un token d'authentification JWT
let getToken = (user) => {
    return jwt.sign({
        _id: user.id,
        username: user.username
    }, secret, {
        expiresIn: expiry
    });
}

let checkToken = (req, res, next) => {
    //On récupère le token dans le header de la requête. Celui ci est sous la forme `Bearer ${monToken}`
    let token = req.headers.authorization;

    if (token) {
        token = token.replace("Bearer ", ""); //On vient ici enlever le "Bearer " afin de ne conserver uniquement que le token
    } else {
        res.status(403).json({
            message: "No token"
        })
        throw new Error("No token provided");
    }
}

module.exports = {
    getToken,
    checkToken
}