const express = require('express');
const router = express.Router();
const { verifyToken, isFlatOwner } = require('../middleware/auth.js');
const MessageController = require('../controllers/messageController.js');

router.get('/:id/messages', verifyToken, isFlatOwner, MessageController.getAllMessages);
router.get('/:id/messages/:senderId', verifyToken, MessageController.getUserMessages);
router.post('/:id/messages', verifyToken, MessageController.addMessage);

module.exports = router;
