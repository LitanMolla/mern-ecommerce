const mongoose = require('mongoose')
const { Schema } = mongoose

const cartSchema = new Schema({
    quantity: {
        type: Number,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    }
}, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)