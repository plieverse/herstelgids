const jwt = require('jsonwebtoken');
const { accessSecret } = require('../config/jwt');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Geen geldig token meegegeven.' });
  }

  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, accessSecret);
    req.user = { id: payload.sub, email: payload.email };
    next();
  } catch {
    return res.status(401).json({ error: 'Token is verlopen of ongeldig.' });
  }
}

module.exports = verifyToken;
