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
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    subCategory: [
        {
            type: Schema.Types.ObjectId,
            ref: 'SubCategory',
            default: []
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model('Category', categorySchema)