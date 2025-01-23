const express = require('express');
const { getFlats, getFlatById, createFlat, updateFlat, deleteFlat } = require('../controllers/flatController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getFlats);
router.get('/:id', protect, getFlatById);
router.post('/', protect, createFlat);
router.patch('/:id', protect, updateFlat);
router.delete('/:id', protect, deleteFlat);

module.exports = router;
