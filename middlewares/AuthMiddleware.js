const jwt = require("jsonwebtoken")

const AuthMidddleware = (req, res, next) => {
    var token = req.headers.authorization;
    if (token) {
        var decoded = jwt.verify(token.split(" ")[1], 'practice');
        if (decoded) {
            req.body.authorId = decoded.userId
            next();
        } else {
            res.status(200).send({ "msg": "Please Login First" })
        }

    } else {
        res.status(200).send({ "msg": "Please Login First" })
    }
}


module.exports = {
    AuthMidddleware
}