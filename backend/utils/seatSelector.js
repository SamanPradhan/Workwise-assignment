const { Seat, sequelize } = require('../config/models');

async function selectSeats(numSeats) {
  if (numSeats < 1 || numSeats > 7) {
    throw new Error("You can reserve between 1 and 7 seats.");
  }

  return await sequelize.transaction(async (t) => {
    const availableSeats = await Seat.findAll({
      where: { reserved: false },
      order: [['row', 'ASC'], ['seatNumber', 'ASC']],
      transaction: t,
      lock: t.LOCK.UPDATE
    });

    const seatsByRow = availableSeats.reduce((acc, seat) => {
      (acc[seat.row] = acc[seat.row] || []).push(seat);
      return acc;
    }, {});

    for (const [row, seats] of Object.entries(seatsByRow)) {
      seats.sort((a, b) => a.seatNumber - b.seatNumber);
      for (let i = 0; i <= seats.length - numSeats; i++) {
        let block = seats.slice(i, i + numSeats);
        let contiguous = true;
        for (let j = 1; j < block.length; j++) {
          if (block[j].seatNumber !== block[j - 1].seatNumber + 1) {
            contiguous = false;
            break;
          }
        }
        if (contiguous) {
          return block;
        }
      }
    }

    let bestBlock = null;
    let bestGap = Infinity;
    for (const [row, seats] of Object.entries(seatsByRow)) {
      if (seats.length >= numSeats) {
        seats.sort((a, b) => a.seatNumber - b.seatNumber);
        for (let i = 0; i <= seats.length - numSeats; i++) {
          let block = seats.slice(i, i + numSeats);
          let gap = block[block.length - 1].seatNumber - block[0].seatNumber;
          if (gap < bestGap) {
            bestGap = gap;
            bestBlock = block;
          }
        }
      }
    }
    if (bestBlock) return bestBlock;

    if (availableSeats.length >= numSeats) {
      let bestGroup = null;
      let bestSpan = Infinity;
      for (let i = 0; i <= availableSeats.length - numSeats; i++) {
        let group = availableSeats.slice(i, i + numSeats);
        let span = (group[group.length - 1].row - group[0].row) * 10 +
                   (group[group.length - 1].seatNumber - group[0].seatNumber);
        if (span < bestSpan) {
          bestSpan = span;
          bestGroup = group;
        }
      }
      if (bestGroup) return bestGroup;
    }
    throw new Error("Not enough seats available.");
  });
}

module.exports = { selectSeats };
