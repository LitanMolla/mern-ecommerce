const Category = require('../models/categoryModel')
const SubCategory = require('../models/subCategoryModel')
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
        const category = new Category({ name: categoryName, owner: req.user._id })
        await category.save()
        return res.status(201).json({ success: true, message: 'Category created successfully', data: category })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internel server error' })
    }
}
const createSubCategory = async (req, res) => {
    try {
        const { name , parentCategory} = req.body
        if (!name || !parentCategory) {
            return res.status(400).json({ success: false, message: 'Name and parentCategory id is required' })
        }
        const categoryName = name.trim().toLowerCase()
        const existingCategory = await SubCategory.findOne({ name: categoryName })
        if (existingCategory) {
            return res.status(400).json({ success: false, message: 'Category already exist' })
        }
        const category = new SubCategory({ name: categoryName, parentCategory })
        await category.save()
        return res.status(201).json({ success: true, message: 'Category created successfully', data: category })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internel server error' , error})
    }
}

module.exports = { createCategory , createSubCategory}