const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    fullName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    terms: {
        type: Boolean,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin','vendor'],
        default: 'user'
    },
    status: {
        type: String,
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