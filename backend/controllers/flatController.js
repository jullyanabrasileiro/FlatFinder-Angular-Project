const Flat = require('../models/Flat');
const User = require('../models/User');

// Get all flats
const getAllFlats = async (req, res) => {
  try {
    const flats = await Flat.find();
    res.status(200).json(flats);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch flats' });
  }
};

// Get flat by ID
const getFlatById = async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);
    if (!flat) return res.status(404).json({ message: 'Flat not found' });
    res.status(200).json(flat);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch flat' });
  }
};

// Add new flat
const addFlat = async (req, res) => {
  try {
    const newFlat = new Flat({ ...req.body, ownerId: req.user.id });
    const savedFlat = await newFlat.save();

    // Increment the flats counter for the user
    await User.findByIdAndUpdate(req.user.id, { $inc: { flatsCounter: 1 } });

    res.status(201).json(savedFlat);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add flat' });
  }
};

// Update flat
const updateFlat = async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);

    if (!flat) return res.status(404).json({ message: 'Flat not found' });

    // Check if the logged-in user is the flat owner
    if (flat.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    const updatedFlat = await Flat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedFlat);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update flat' });
  }
};

// Delete flat
const deleteFlat = async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);

    if (!flat) return res.status(404).json({ message: 'Flat not found' });

    // Check if the logged-in user is the flat owner
    if (flat.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    await Flat.findByIdAndDelete(req.params.id);

    // Decrement the flats counter for the user
    await User.findByIdAndUpdate(req.user.id, { $inc: { flatsCounter: -1 } });

    res.status(200).json({ message: 'Flat deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete flat' });
  }
};

module.exports = { getAllFlats, getFlatById, addFlat, updateFlat, deleteFlat };
