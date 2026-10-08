const mongoose = require('mongoose')
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
        return res.status(500).json({ status: false, message: 'Internal server error' })
    }
}

const createSubCategory = async (req, res) => {
    try {
        const { name, parentCategory } = req.body
        if (!name || !parentCategory) {
            return res.status(400).json({ success: false, message: 'Name and parentCategory id is required' })
        }
        const subcategoryName = name.trim().toLowerCase()
        const existingCategory = await SubCategory.findOne({ name: subcategoryName })
        if (existingCategory) {
            return res.status(400).json({ success: false, message: 'Subcategory already exist' })
        }
        const subcategory = new SubCategory({ name: subcategoryName })
        await Category.findByIdAndUpdate(parentCategory, { $push: { subCategory: subcategory._id } })
        await subcategory.save()
        return res.status(201).json({ success: true, message: 'Subcategory created successfully', data: subcategory })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internal server error', error })
    }
}

const getAllSubCategoryWiseCategory = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: 'Invalid Object ID' })
        }
        const data = await SubCategory.find({ parentCategory: id })
        res.status(200).json({ success: true, message: `Total ${data.length} sub categories found on this categories`, data })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internal server error' })
    }
}

const getAllSubCategory = async (req, res) => {
    try {
        const subcategories = await SubCategory.find().populate('parentCategory')
        res.status(200).json({ success: true, message: `Total ${subcategories.length} sub categories found`, data: subcategories })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internal server error' })
    }
}

const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find().populate('owner', '-password')
        res.status(200).json({ success: true, message: `Total ${categories.length} categories found`, data: categories })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internal server error' })
    }
}

const getAllCategoryWiseOwner = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: 'Invalid Object ID' })
        }
        const categories = await Category.find({ owner: id }).populate('owner')
        res.status(200).json({ success: true, message: `Total ${categories.length} categories found wise owner`, data: categories })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internal server error' })
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).populate('owner')
        return res.status(200).json({ success: true, message: `Total: ${categories.length} found`, data: categories })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internal server error' })
    }
}
module.exports = {
    createCategory,
    createSubCategory,
    getAllSubCategory,
    getAllCategory,
    getAllSubCategoryWiseCategory,
    getAllCategoryWiseOwner,
    getAllCategories
}