const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Reservation = sequelize.define('Reservation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    numSeats: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Reservation;
};
