require('dotenv').config();

const PORT = process.env.PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DIALECT = process.env.DIALECT;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = { PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT, JWT_SECRET, DIALECT };
