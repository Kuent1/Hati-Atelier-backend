//Création d'un module middleware permettant de gérer les erreurs de façon asynchrone lors du routage. Si une erreur est détectée lors du routage, celle ci est renvoyée vers l'app principale.
const asyncErrorHandler = fn => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = asyncErrorHandler;