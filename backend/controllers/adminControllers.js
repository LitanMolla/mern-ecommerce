const User = require('../models/userModel')
const Category = require('../models/categoryModel')
const userUpdateController = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ status: false, message: 'User id required' })
        }
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true }).select('-password')
        if (!updatedUser) {
            return res.status(400).json({ status: false, message: 'User not found' })
        }
        return res.status(200).json({ success: true, message: 'Updated successfully', data: updatedUser })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internel server error' })
    }
}

const getAllUsersController = async (req, res) => {
    try {
        const users = await User.find({}).select('-password')
        return res.status(200).json({
            success: true,
            message: `Total ${users.length} user found`,
            data: users
        })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internel server error' })
    }
}
const getAllActiveUsersController = async (req, res) => {
    try {
        const users = await User.find({ status: 'active' }).select('-password')
        return res.status(200).json({
            success: true,
            message: `Total ${users.length} user found`,
            data: users
        })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internel server error' })
    }
}
const getAllDeactiveUsersController = async (req, res) => {
    try {
        const users = await User.find({ status: 'suspended' }).select('-password')
        return res.status(200).json({
            success: true,
            message: `Total ${users.length} user found`,
            data: users
        })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internel server error' })
    }
}

const getUserController = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ status: false, message: 'User id required' })
        }
        const user = await User.findById(id).select('-password')
        if (!user) {
            return res.status(400).json({ status: false, message: 'User not found' })
        }
        return res.status(200).json({ success: true, message: 'User find successfully', data: user })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internel server error' })
    }
}
const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return req.status(400).json({ status: false, message: 'User id required' })
        }
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(400).json({ status: false, message: 'User not found' })
        }
        return res.status(200).json({ success: true, message: 'User deleted successfully' })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internel server error' })
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body
        if (!id) {
            return res.status(400).json({ success: false, message: 'Category required' })
        }
        const updateName = name.trim().toLowerCase()
        if (!updateName) {
            return res.status(400).json({ success: false, message: 'Name required' })
        }
        const existingCategory = await Category.findById(id)
        if (!existingCategory) {
            return res.status(404).json({ success: false, message: 'Category not found' })
        }
        const updatedCategory = await Category.findByIdAndUpdate(id, { name: updateName }, { new: true })
        return res.status(200).json({ success: true, message: 'Category updated', data: updatedCategory })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internel server error' })
    }
}

const categoryDeleteController = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ success: false, message: 'Category id not found' })
        }
        const deletedCategory = await Category.findByIdAndDelete(id)
        if (!deletedCategory) {
            return res.status(404).json({ success: false, message: 'Category not found', data: deletedCategory })
        }
        return res.status(200).json({ success: true, message: 'Category deleted', data: deletedCategory })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internel server error' })
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
        return res.status(200).json({ success: true, message: `Total: ${categories.length} found`, data: categories })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internel server error' })
    }
}

module.exports = {
    userUpdateController,
    getAllUsersController,
    getUserController,
    getAllActiveUsersController,
    getAllDeactiveUsersController,
    deleteUserController,
    updateCategory,
    categoryDeleteController,
    getAllCategories
}