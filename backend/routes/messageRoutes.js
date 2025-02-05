const express = require('express');
const router = express.Router();
const Message = require('../models/Message.js');
const { verifyToken, isFlatOwner } = require('../middleware/auth.js');

router.get('/:id/messages', verifyToken, isFlatOwner, async (req, res) => {
    const messages = await Message.find({ flatId: req.params.id });
    res.json(messages);
});

router.get('/:id/messages/:senderId', verifyToken, async (req, res) => {
    const messages = await Message.find({ flatId: req.params.id, senderId: req.params.senderId });
    res.json(messages);
});

router.post('/:id/messages', verifyToken, async (req, res) => {
    try {
        const message = new Message({ ...req.body, flatId: req.params.id, senderId: req.user.id });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao enviar mensagem' });
    }
});

module.exports = router;
