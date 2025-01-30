const Message = require('../models/Message');
const Flat = require('../models/Flat');

// Get all messages for a flat
const getAllMessages = async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);

    if (!flat) return res.status(404).json({ message: 'Flat not found' });

    // Check if the logged-in user is the flat owner
    if (flat.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    const messages = await Message.find({ flatId: req.params.id });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};

// Get messages by sender
const getUserMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      flatId: req.params.id,
      senderId: req.params.senderId
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};

// Add a new message
const addMessage = async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);

    if (!flat) return res.status(404).json({ message: 'Flat not found' });

    const newMessage = new Message({
      ...req.body,
      flatId: req.params.id,
      senderId: req.user.id
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add message' });
  }
};

module.exports = { getAllMessages, getUserMessages, addMessage };
