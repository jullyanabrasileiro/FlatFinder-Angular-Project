const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin, isAccountOwner } = require('../middleware/auth.js');
const UserController = require('../controllers/UserController.js');

router.get('/', verifyToken, isAdmin, UserController.getAllUsers);
router.get('/:id', verifyToken, UserController.getUserById);
router.patch('/:id', verifyToken, isAdmin || isAccountOwner, UserController.updateUser);
router.delete('/:id', verifyToken, isAdmin || isAccountOwner, UserController.deleteUser);
router.post('/login', UserController.login);
router.post('/register', UserController.register);

module.exports = router;
