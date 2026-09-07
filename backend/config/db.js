const mongoose = require('mongoose')
const dbConnection = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI
        await mongoose.connect(MONGO_URI)
        console.log('Database connected successfully')
    } catch (error) {
        console.log('Database connection error:', error.message)
    }
}

module.exports = dbConnection