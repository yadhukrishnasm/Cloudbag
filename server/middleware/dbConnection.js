// middleware/dbConnection.js
const mongoose = require('mongoose');


const dbConnectionMiddleware = async (req, res) => {
    try {
        await mongoose.connect();
        console.log('Connected to MongoDB');
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

module.exports = dbConnectionMiddleware;
