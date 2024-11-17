require('dotenv').config();

module.exports = {
    port: process.env.PORT || 5500,
    jwtSecret: process.env.JWT_SECRET,
    mongoURI: process.env.MONGO_URI,
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
};
