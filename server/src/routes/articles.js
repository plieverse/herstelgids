const router = require('express').Router();
const verifyToken = require('../middleware/auth');
const { list, getOne } = require('../controllers/articlesController');

router.use(verifyToken);
router.get('/', list);
router.get('/:id', getOne);

module.exports = router;
