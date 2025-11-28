const express = require('express');
const Users = require('../models/usersModel');
const jwt = require('jsonwebtoken');

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'change_this_secret';

// Register new user and return JWT
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'username and password required' });
        }

        const exists = await Users.findByUsername(username);
        if (exists) return res.status(409).json({ message: 'username already taken' });

        const created = await Users.create({ username, email, password });
        const token = jwt.sign({ id: created.id, username: created.username }, SECRET, { expiresIn: '7d' });
        return res.status(201).json({ token, user: created });
    } catch (err) {
        console.error('Error registering user:', err);
        return res.status(500).json({ message: 'server error' });
    }
});

// Login and return JWT
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ message: 'username and password required' });

        const user = await Users.verifyPassword(username, password);
        if (!user) return res.status(401).json({ message: 'invalid credentials' });

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '7d' });
        return res.json({ token, user });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'server error' });
    }
});

// Get current user by id (no password)
router.get('/:id', async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'not found' });
        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error' });
    }
});

module.exports = router;
