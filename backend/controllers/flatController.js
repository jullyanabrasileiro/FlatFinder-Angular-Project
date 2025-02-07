const Flat = require('../models/Flat.js');
const User = require('../models/User.js');

const getAllFlats = async (req, res) => {
  try {
    const flats = await Flat.find();
    res.status(200).json(flats);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch flats', error: error.message });
  }
};

const getFlatById = async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);
    if (!flat) return res.status(404).json({ message: 'Flat not found' });
    res.status(200).json(flat);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch flat', error: error.message });
  }
};

const addFlat = async (req, res) => {
  try {
      const { city, streetName, streetNumber, areaSize, hasAC, yearBuilt, rentPrice, dateAvailable } = req.body;

      const newFlat = new Flat({
          city,
          streetName,
          streetNumber,
          areaSize,
          hasAC,
          yearBuilt,
          rentPrice,
          dateAvailable,
          ownerId: req.user.id // automatically defines the flat owner
      });

      await newFlat.save();
      res.status(201).json(newFlat);
  } catch (error) {
      console.error("Error creating flat:", error);
      res.status(500).json({ error: 'Error creating flat' });
  }
};

const updateFlat = async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);
    if (!flat) return res.status(404).json({ message: 'Flat not found' });

    if (!flat.ownerId || flat.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    const updatedFlat = await Flat.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedFlat);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update flat', error: error.message });
  }
};

const deleteFlat = async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);
    if (!flat) return res.status(404).json({ message: 'Flat not found' });

    if (!flat.ownerId || flat.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    await Flat.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Flat deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete flat', error: error.message });
  }
};

module.exports = {
  getAllFlats,
  getFlatById,
  addFlat,
  updateFlat,
  deleteFlat
};
