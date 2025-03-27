const express = require('express');
const cors = require("cors");

const app = express();
const { sequelize, Seat } = require('./models');
const authRoutes = require('./routes/auth');
const reservationRoutes = require('./routes/reservation');
const seatRoutes = require('./routes/seats');
const { PORT } = require('./constants')
require('dotenv').config();

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/seats', seatRoutes);

sequelize.sync({ alter: true }).then(async () => {
  const count = await Seat.count();
  if (count === 0) {
    let seats = [];
    for (let row = 1; row <= 11; row++) {
      for (let seatNum = 1; seatNum <= 7; seatNum++) {
        seats.push({ row, seatNumber: seatNum });
      }
    }
    for (let seatNum = 1; seatNum <= 3; seatNum++) {
      seats.push({ row: 12, seatNumber: seatNum });
    }
    await Seat.bulkCreate(seats);
    console.log("Prepopulated seats.");
  }
  
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}).catch(err => console.error("Database sync error:", err));
