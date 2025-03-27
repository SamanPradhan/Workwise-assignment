const express = require('express');
const jwt = require('jsonwebtoken');

const { Reservation, Seat } = require('../models');
const { selectSeats } = require('../utils/seatSelector');
const router = express.Router();

const { JWT_SECRET } = require('../constants')

// const authenticate = (req, res, next) => {
//   const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
//   if (!token) return res.status(401).json({ message: "Token missing." });
//   jwt.verify(token, JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(401).json({ message: "Invalid token." });
//     req.user = decoded;
//     next();
//   });
// };

router.get('/', async (req, res) => {
  try {
    const seats = await Seat.findAll({
      order: [['row', 'ASC'], ['seatNumber', 'ASC']]
    });
    const availableCount = await Seat.count({ where: { reserved: false } });
    res.status(200).json({ seats, availableCount, success: true });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
});

module.exports = router;
