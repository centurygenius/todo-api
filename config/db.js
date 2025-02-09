const mongoose = require('mongoose');

// Connect to MongoDB
async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB