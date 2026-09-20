const User = require('../models/userModel')
const Category = require('../models/categoryModel')
const { createCategoryEmail } = require('../utils/sendEmail')
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

const createCategory = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(400).json({ success: false, message: 'Name is required' })
        }
        const categoryName = name.trim().toLowerCase()
        const existingCategory = await Category.findOne({ name: categoryName })
        if (existingCategory) {
            return res.status(400).json({ success: false, message: 'Category already exist' })
        }
        const category = new Category({ name: categoryName })
        await category.save()
        await createCategoryEmail(categoryName)
        return res.status(201).json({ success: true, message: 'Category created successfully', data: category })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internel server error' })
    }
}
module.exports = { userUpdateController, createCategory }