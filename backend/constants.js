const PORT = process.env.PORT || 3000;
const DB_USER= process.env.DB_USER || "ez_user"
const DB_PASSWORD= process.env.DB_PASSWORD || "12345678"
const DB_NAME= process.env.DB_NAME || "workwise_train_booking_project"
const DB_HOST= process.env.DB_HOST || "127.0.0.1"
const DIALECT= "postgres"
const JWT_SECRET = process.env.JWT_SECRET || 'ticket_booking_secret';

module.exports = { PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, JWT_SECRET, DIALECT }