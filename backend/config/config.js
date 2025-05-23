const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/PSSMS',
  sessionSecret: process.env.SESSION_SECRET || 'your-secret-key',
  frontendURL: process.env.FRONTEND_URL || 'http://localhost:3000',
  port: process.env.PORT || 5000,
};