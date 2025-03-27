const { Sequelize } = require('sequelize');
const config = require('../config/config').development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    // port: config.port,
    dialect: config.dialect,
    logging: false
  }
);

const User = require('./user')(sequelize);
const Seat = require('./seat')(sequelize);
const Reservation = require('./reservation')(sequelize);
User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });
Reservation.hasMany(Seat, { foreignKey: 'reservationId' });
Seat.belongsTo(Reservation, { foreignKey: 'reservationId' });

module.exports = {
  sequelize,
  User,
  Seat,
  Reservation
};
