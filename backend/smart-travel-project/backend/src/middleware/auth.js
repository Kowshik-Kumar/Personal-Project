const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'change_this_secret';

function authMiddleware(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'missing token' });
    const token = auth.slice(7);
    try {
        const payload = jwt.verify(token, SECRET);
        req.user = { id: payload.id, username: payload.username };
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'invalid token' });
    }
}

module.exports = authMiddleware;
