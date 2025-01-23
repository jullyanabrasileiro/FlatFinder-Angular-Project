const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  creationTime: { type: Date, default: Date.now },
  senderName: { type: String, required: true },
  senderEmail: { type: String, required: true },
  content: { type: String, required: true }
});

module.exports = mongoose.model('Message', messageSchema);
