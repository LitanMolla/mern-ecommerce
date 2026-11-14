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
            if (existingCart.quantity+quantity >existingProduct.stock) {
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
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

const updateCartQuantityController = async (req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}