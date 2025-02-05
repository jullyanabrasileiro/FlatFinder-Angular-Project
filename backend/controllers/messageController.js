const Message = require('../models/Message.js');
const Flat = require('../models/Flat.js');

const getAllMessages = async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);
    if (!flat) return res.status(404).json({ message: 'Flat not found' });

    if (!flat.ownerId || flat.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    const messages = await Message.find({ flatId: req.params.id });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
  }
};

const getUserMessages = async (req, res) => {
  if (req.user.id !== req.params.senderId) {
    return res.status(403).json({ message: 'Permission denied' });
  }

  try {
    const messages = await Message.find({ flatId: req.params.id, senderId: req.params.senderId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
  }
};

const addMessage = async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);
    if (!flat) return res.status(404).json({ message: 'Flat not found' });

    const newMessage = new Message({
      content: req.body.content,
      flatId: req.params.id,
      senderId: req.user.id,
      created: new Date()
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add message', error: error.message });
  }
};

module.exports = { getAllMessages, getUserMessages, addMessage };
