const mongoose = require('mongoose');

const flatSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  city: { type: String, required: true },
  streetName: { type: String, required: true },
  streetNumber: { type: Number, required: true },
  areaSize: { type: Number, required: true },
  hasAC: { type: Boolean, required: true },
  yearBuilt: { type: Number, required: true },
  rentPrice: { type: Number, required: true },
  dateAvailable: { type: Date, required: true }
});

module.exports = mongoose.model('Flat', flatSchema);
