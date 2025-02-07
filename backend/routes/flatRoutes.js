const express = require('express');
const router = express.Router();
const { verifyToken, isFlatOwner } = require('../middleware/auth.js');
const FlatController = require('../controllers/flatController.js');

//new changes - to connect messages
const messageRoutes = require('./messageRoutes.js');
router.use('/:id/messages', messageRoutes);


router.get('/', verifyToken, FlatController.getAllFlats);
router.get('/:id', verifyToken, FlatController.getFlatById);
router.post('/', verifyToken, FlatController.addFlat);
router.patch('/:id', verifyToken, isFlatOwner, FlatController.updateFlat);
router.delete('/:id', verifyToken, isFlatOwner, FlatController.deleteFlat);


module.exports = router;

