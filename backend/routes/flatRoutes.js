const express = require('express');
const router = express.Router();
const Flat = require('../models/Flat.js');
const { verifyToken, isFlatOwner } = require('../middleware/auth.js');

router.get('/', verifyToken, async (req, res) => {
    const flats = await Flat.find();
    res.json(flats);
});

router.get('/:id', verifyToken, async (req, res) => {
    const flat = await Flat.findById(req.params.id);
    if (!flat) return res.status(404).json({ error: 'Flat não encontrado' });
    res.json(flat);
});

router.post('/', verifyToken, async (req, res) => {
    try {
        const flat = new Flat({ ...req.body, ownerId: req.user.id });
        await flat.save();
        res.status(201).json(flat);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar flat' });
    }
});

router.patch('/:id', verifyToken, isFlatOwner, async (req, res) => {
    try {
        const flat = await Flat.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(flat);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar flat' });
    }
});

router.delete('/:id', verifyToken, isFlatOwner, async (req, res) => {
    try {
        await Flat.findByIdAndDelete(req.params.id);
        res.json({ message: 'Flat deletado' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar flat' });
    }
});

module.exports = router;
