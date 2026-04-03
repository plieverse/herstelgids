const router = require('express').Router();
const verifyToken = require('../middleware/auth');
const { list, unreadCount, send, markRead } = require('../controllers/messagesController');

router.use(verifyToken);
router.get('/', list);
router.get('/unread-count', unreadCount);
router.post('/', send);
router.put('/:id/read', markRead);

module.exports = router;
