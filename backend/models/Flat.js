const mongoose = require('mongoose');

const FlatSchema = new mongoose.Schema({
    city: { type: String, required: true },
    streetName: { type: String, required: true },
    streetNumber: { type: Number, required: true },
    areaSize: { type: Number, required: true },
    hasAC: { type: Boolean, default: false },
    yearBuilt: { type: Number, required: true },
    rentPrice: { type: Number, required: true },
    dateAvailable: { type: Date, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Flat', FlatSchema);
