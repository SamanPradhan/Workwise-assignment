const express = require('express');
const { Reservation, Seat } = require('../models');
const { selectSeats } = require('../utils/seatSelector');
const router = express.Router();

// Middleware to verify JWT
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants')
const authenticate = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Token missing.", success: false  });
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token.", success: false  });
    req.user = decoded;
    next();
  });
};

router.post('/reserve', authenticate, async (req, res) => {
  const { numSeats } = req.body;
  if (!numSeats || numSeats < 1 || numSeats > 7) {
    return res.status(400).json({ message: "Invalid number of seats requested (must be 1 to 7).", success: false  });
  }
  
  try {
    const seatsToReserve = await selectSeats(numSeats);
    
    const reservation = await Reservation.create({
      userId: req.user.id,
      numSeats: numSeats
    });
    
    for (const seat of seatsToReserve) {
      seat.reserved = true;
      seat.reservationId = reservation.id;
      await seat.save();
    }
    
    res.status(200).json({ message: "Reservation successful", reservationId: reservation.id, seats: seatsToReserve.map(s => ({ row: s.row, seatNumber: s.seatNumber })), success: true  });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/cancel', authenticate, async (req, res) => {
  const { reservationId } = req.body;
  if (!reservationId) return res.status(400).json({ message: "Reservation ID required.", success: false  });
  
  try {
    const reservation = await Reservation.findOne({ where: { id: reservationId, userId: req.user.id } });
    if (!reservation) return res.status(404).json({ message: "Reservation not found.", success: false  });
    
    await Seat.update({ reserved: false, reservationId: null }, { where: { reservationId: reservation.id } });
    await reservation.destroy();
    
    res.status(200).json({ message: "Reservation cancelled." , success: true });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false  });
  }
});

router.get('/', async (req, res) => {
  try {
    const seats = await Seat.findAll({
      order: [['row', 'ASC'], ['seatNumber', 'ASC']]
    });
    const availableCount = await Seat.count({ where: { reserved: false } });
    res.status(200).json({ seats, availableCount, success: true  });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false  });
  }
});
module.exports = router;
