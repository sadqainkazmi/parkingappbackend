
    const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        try {
            var verifytoken = await jwt.verify(req.token, 'privateKey');
            if (verifytoken) {
                next();
            }
        } catch (error) {
            res.status(403).send({ status: false, message: error })
        }
    } else {
        res.status(404).send({ status: false, message: "Token not found" })
    }
}
module.exports = {verifyToken}