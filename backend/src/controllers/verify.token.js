const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if(!token) {
        return res.status(401).json({auth: false,message: 'No access, no token provided'});
    }
    const decoded = jwt.verify(token, 'secret');
    req.idUsuario = decoded.id;
    next();
}

module.exports = verifyToken;