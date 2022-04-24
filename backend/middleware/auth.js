const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(req.headers);
        const decodedToken = jwt.verify(token, 'RANDOM_SECRET_TOKEN');
        const userId = decodedToken.userID;
        if (req.body.id && req.body.id !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch (error) {
        console.log(req);

        res.status(403).json({ message: 'unauthorized request' });
    }
}