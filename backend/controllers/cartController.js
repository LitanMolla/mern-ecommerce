const Cart = require('../models/cartModel')
const Product = require('../models/productModel')

const addtocartController = async (req, res) => {
    try {
        const { userId, productId, quantity = 1 } = req.body
        const existingCart = await Cart.findOne({ owner: userId, product: productId })
        const existingProduct = await Product.findById(productId)
        if (!existingProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' })
        }
        if (quantity <= 0) {
            return res.status(400).json({ success: false, message: 'Quantity must be greater than 0' });
        }
        if (quantity > existingProduct.stock) {
            return res.status(400).json({ success: false, message: 'Insufficient product stock', availableStock: existingProduct.stock })
        }
        if (existingCart) {
            if (existingCart.quantity + quantity > existingProduct.stock) {
                return res.status(400).json({ success: false, message: 'Insufficient product stock', availableStock: existingProduct.stock })
            }
            existingCart.quantity += quantity
            await existingCart.save()
            return res.status(200).json({ success: true, message: 'Quantity updated successfully', data: existingCart })
        }
        const cart = new Cart({ quantity, owner: userId, product: productId })
        await cart.save()
        return res.status(201).json({ success: true, message: 'Added to cart successfully', data: cart })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error', error })
    }
}

const updateCartQuantityController = async (req, res) => {
    try {
        const { cartId } = req.params
        const { type } = req.body
        const existingCart = await Cart.findById(cartId).populate('product')
        if (!existingCart) {
            return res.status(404).json({ success: false, message: 'Cart not found' })
        }

        if (type !== 'inc' && type !== 'dec') {
            return res.status(400).json({success: false,message: 'Invalid type. Use inc or dec'})}

        if (type === 'dec') {
            if (existingCart.quantity <= 1) {
                await Cart.findByIdAndDelete(cartId)
                return res.status(200).json({success: true,message: 'Cart item removed successfully'})
            }
            existingCart.quantity -= 1
        }

        if (type === 'inc') {
            if (existingCart.quantity + 1 > existingCart.product.stock) {
                return res.status(400).json({success: false,message: 'Insufficient product stock', availableStock: existingCart.product.stock})
            }
            existingCart.quantity += 1
        }

        await existingCart.save()

        return res.status(200).json({ success: true, message: 'Cart quantity updated successfully', data: existingCart })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

module.exports = { updateCartQuantityController, addtocartController }