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
    parentCategory: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    }
}, { timestamps: true })

module.exports = mongoose.model('SubCategory', categorySchema)