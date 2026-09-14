const jwt = require('jsonwebtoken')
const generateAccessToken = (user) => {
    return jwt.sign({
        _id: user._id,
        fullName: user.fullName,
        role: user.role
    },
        process.env.JWT_SECRET,
        { expiresIn: '7d' })
}

module.exports = generateAccessToken