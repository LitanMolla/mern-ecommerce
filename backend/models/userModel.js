const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    terms: {
        type: Boolean,
        required: true
    },
    role: {
        type: [String],
        enum: ['user', 'admin'],
        default: 'user'
    },
    status: {
        type: [String],
        enum: ['active', 'suspended'],
        default: 'active'
    },
    isVerified: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)