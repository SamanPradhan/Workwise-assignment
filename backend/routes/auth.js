const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../config/models');
const { JWT_SECRET } = require('../constants')
const router = express.Router();
require('dotenv').config();

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required.", success: false });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email already registered.", success: false });

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "User created successfully.", success: true });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required.", success: false });
    
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials.", success: false });
    }
    
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, success: true });
  } catch (err) {
    res.status(500).json({ message: err.message , success: false});
  }
});

module.exports = router;
