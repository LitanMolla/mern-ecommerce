const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['active', 'pending', 'reject'],
        default: 'pending'
    }
})

module.exports = mongoose.model('Category', categorySchema)