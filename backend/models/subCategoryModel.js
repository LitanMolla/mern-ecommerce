const mongoose = require('mongoose')
const { Schema } = mongoose

const subCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    status: {
        type: String,
        enum: ['active', 'pending', 'reject'],
        default: 'pending'
    },
    parentCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('SubCategory', subCategorySchema)