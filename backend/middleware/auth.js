const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Flat = require('../models/Flat');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Acesso negado' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token inválido' });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ error: 'Acesso restrito a administradores' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao verificar permissões' });
    }
};

const isAccountOwner = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ error: 'Acesso restrito ao proprietário da conta' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao verificar propriedade da conta' });
    }
};

const isFlatOwner = async (req, res, next) => {
    try {
        const flat = await Flat.findById(req.params.id);
        if (!flat || flat.ownerId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Acesso restrito ao dono do flat' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao verificar propriedade do flat' });
    }
};

module.exports = { verifyToken, isAdmin, isAccountOwner, isFlatOwner };
