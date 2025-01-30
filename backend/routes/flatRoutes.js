const express = require('express');
const { getAllFlats, getFlatById, addFlat, updateFlat, deleteFlat } = require('../controllers/flatController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllFlats);
router.get('/:id', getFlatById);
router.post('/', authMiddleware, addFlat);
router.patch('/:id', authMiddleware, updateFlat);
router.delete('/:id', authMiddleware, deleteFlat);

module.exports = router;
