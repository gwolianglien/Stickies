const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No JWT, Authorization Denied.' });
    }
    try {
        const decodedjwt = jwt.verify(
            token, 
            config.get('jwtSecret')
        );
        req.user = decodedjwt.user;
        next();
    } catch(err) {
        console.error(err.message);
        res.status(401).json({ msg: 'Token is not valid. '});
    }
}
