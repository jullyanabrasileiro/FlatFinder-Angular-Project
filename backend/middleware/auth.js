const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const Flat = require('../models/Flat.js');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ error: 'Access restricted to administrators' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: 'Error verifying permissions' });
    }
};

const isAccountOwner = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ error: 'Access restricted to account owner' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: 'Error verifying account ownership' });
    }
};

const isFlatOwner = async (req, res, next) => {
    try {
        const flat = await Flat.findById(req.params.id);
        console.log("Flat founded:", flat); 

        if (!flat) {
            return res.status(404).json({ error: 'Flat not found' });
        }
        if (flat.ownerId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Access restricted to flat owner' });
        }
        next();

    } catch (error) {
        console.error("Error verifying flat ownership", error);
        res.status(500).json({ error: 'Error verifying flat ownership' });
    }
};

module.exports = { verifyToken, isAdmin, isAccountOwner, isFlatOwner };
