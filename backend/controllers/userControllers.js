const User = require('../models/userModel')
const userUpdateController = async (req, res) => {
    try {
        const {id} = req.params
        if (!id) {
            return req.status(400).json({ status: false, message: 'User id required' })
        }
        const updatedUser = await User.findById(id, req.body, { new: true }).select('-password')
        if (!updatedUser) {
            return res.status(400).json({ status: false, message: 'User not found' })
        }
        return res.status(200).json({success: true, message: 'Updated successfully', data: updatedUser})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, message: 'Internel server error' })
    }
}

module.exports = { userUpdateController }