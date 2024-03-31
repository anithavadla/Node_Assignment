

const jwt = require('jsonwebtoken');
const secretKey = 'voosh_secret_key';

const requireAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secretKey, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login-user');
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect('/login-user');
    }
};

module.exports = requireAuth;
