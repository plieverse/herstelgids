const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const { register, login, refresh, logout } = require('../controllers/authController');
const verifyToken = require('../middleware/auth');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Te veel pogingen. Probeer het over 15 minuten opnieuw.' },
});

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/refresh', refresh);
router.post('/logout', verifyToken, logout);

module.exports = router;
