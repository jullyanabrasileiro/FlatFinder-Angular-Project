const express = require('express');
const { getAllUsers, getUserById, register, login, updateUser, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', protect, admin, getAllUsers);
router.get('/:id', protect, getUserById);
router.patch('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

module.exports = router;
