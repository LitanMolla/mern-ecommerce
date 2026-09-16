const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const userMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization) {
            return res.status(400).json({ success: false, message: 'Token required' })
        }
        const token = authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if (decode.role != 'user') {
            return res.status(401).json({ success: false, message: 'Unauthorized request' })
        }
        next()
    } catch (error) {
        return res.status(400).json({ success: false, message: 'Token invalid or expried' })
    }
}

const adminMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization) {
            return res.status(400).json({ success: false, message: 'Token required' })
        }
        const token = authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if (decode.role != 'admin') {
            return res.status(401).json({ success: false, message: 'Unauthorized request' })
        }
        next()
    } catch (error) {
        return res.status(400).json({ success: false, message: 'Token invalid or expried' })
    }
}

module.exports = { userMiddleware, adminMiddleware }