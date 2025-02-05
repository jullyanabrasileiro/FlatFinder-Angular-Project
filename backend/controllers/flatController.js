const Flat = require('../models/Flat.js');
const User = require('../models/User.js');

const updateFlat = async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);
    if (!flat) return res.status(404).json({ message: 'Flat not found' });

    if (!flat.ownerId || flat.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    const updatedFlat = await Flat.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
    res.status(200).json(updatedFlat);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update flat', error: error.message });
  }
};
