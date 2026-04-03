const router = require('express').Router();
const verifyToken = require('../middleware/auth');
const { list, create, getOne, update, remove } = require('../controllers/diaryController');

router.use(verifyToken);
router.get('/', list);
router.post('/', create);
router.get('/:id', getOne);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
