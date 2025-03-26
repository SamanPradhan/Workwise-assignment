require('dotenv').config();
const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DIALECT } = require('../constants')
module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DIALECT
  }
};
