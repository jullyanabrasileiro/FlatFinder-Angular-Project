const express = require('express');
const { getAllMessages, getUserMessages, addMessage } = require('../controllers/messageController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/:id/messages', authMiddleware, getAllMessages);
router.get('/:id/messages/:senderId', authMiddleware, getUserMessages);
router.post('/:id/messages', authMiddleware, addMessage);

module.exports = router;
