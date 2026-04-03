const router = require('express').Router();
const verifyToken = require('../middleware/auth');
const { getProfile, updateProfile, changePassword } = require('../controllers/profileController');

router.use(verifyToken);
router.get('/', getProfile);
router.put('/', updateProfile);
router.put('/password', changePassword);

module.exports = router;
