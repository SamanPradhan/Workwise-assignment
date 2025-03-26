const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Seat = sequelize.define('Seat', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    row: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    seatNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reserved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    reservationId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });
  return Seat;
};
