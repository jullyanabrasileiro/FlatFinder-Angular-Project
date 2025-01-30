const express = require('express');
const { getMessages, createMessage, getAllMessages, getMessages, getUserMessages } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getMessages);
router.post('/', protect, createMessage);
router.get('/:id/messages', protect, getAllMessages);
router.get('/:id/messages/:senderId', protect, getUserMessages);
router.post('/:id/messages', protect, addMessage);

module.exports = router;
