const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sku: {
        type: String,
        unique: true
    },

    shortDescription: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number
    },
    stock: {
        type: Number,
        min: 0
    },
    images: [
        {
            url: {
                type: String
            },
            isMain: {
                type: Boolean,
                default: false
            }
        }
    ],
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
}, { timestamps: true, skipVersioning: true })

module.exports = mongoose.model('Product', productSchema)