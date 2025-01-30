const express = require('express');
const { getAllUsers, getUserById, register, login, updateUser, deleteUser } = require('../controllers/userController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.post('/register', register);
router.post('/login', login);
router.patch('/update', authMiddleware, updateUser);
router.delete('/delete', authMiddleware, deleteUser);

module.exports = router;