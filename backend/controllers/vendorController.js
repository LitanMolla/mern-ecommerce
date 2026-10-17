const mongoose = require('mongoose')
const Category = require('../models/categoryModel')
const SubCategory = require('../models/subCategoryModel')
const Product = require('../models/productModel')
const getCategoriesByOwnerPromise = require('../utils/getCategoriesByOwnerPromise')

// category controller start
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
        const subcategory = new SubCategory({ name: subcategoryName, parentCategory: parentCategory })
        await Category.findByIdAndUpdate(parentCategory, { $push: { subCategory: subcategory._id } })
        await subcategory.save()
        return res.status(201).json({ success: true, message: 'Subcategory created successfully', data: subcategory })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internal server error', error })
    }
}

const getAllSubCategoriesByCategory = async (req, res) => {
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

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).populate('owner')
        return res.status(200).json({ success: true, message: `Total: ${categories.length} found`, data: categories })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internal server error' })
    }
}

const getAllCategoriesByOwner = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: 'Invalid Object ID' })
        }
        // const categories = await Category.find({ owner: id }).populate('owner').populate('subCategory')
        // res.status(200).json({ success: true, message: `Total ${categories.length} categories found wise owner`, data: categories })

        const data = await getCategoriesByOwnerPromise(id)
        res.status(200).json({ success: true, message: ` categories found wise owner`, data: data })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internal server error' })
    }
}


// product controller start
const createProductController = async (req, res) => {
    try {
        const {
            title,
            description = '',
            shortDescription = '',
            price,
            discountPrice = 0,
            category,
            subCategory,
            mainImageIndex = 0,
            owner
        } = req.body
        // if (!title || !description || !shortDescription || !price || !images || !discountPrice || !category || !subCategory || !owner
        // ) {
        //     return res.status(400).json({ success: false, message: 'Please fill up all feild' })
        // }
        const slug = title.toLowerCase().trim().split(' ').join('-')
        const isExistbySlug = await Product.findOne({ slug })
        if (isExistbySlug) {
            return res.status(400).json({ success: false, message: 'Product already exist with this slug' })
        }
        const sku = `LM-${Date.now()}`
        const isExistbySku = await Product.findOne({ sku })
        if (isExistbySku) {
            return res.status(400).json({ success: false, message: 'Product already exist with this sku' })
        }
        const images = req.files.map((file, index) => {
            return {
                url: file.path,
                isMain: mainImageIndex == index
            }
        })
        const product = new Product({ title, description, shortDescription, price, discountPrice, category, subCategory, owner, images, slug })
        await product.save()
        return res.status(201).json({ success: true, message: 'Product created successfully', data: product })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internal server error' })
    }
}

const getAllProductsController = async (req, res) => {
    try {
        const products = await Product.find().populate(['owner', 'category', 'subCategory'])
        return res.status(200).json({ success: true, message: 'Products get successfully', data: products })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internal server error' })
    }
}

const getSingleProductsController = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id).populate(['owner', 'category', 'subCategory'])
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' })
        }
        return res.status(200).json({ success: true, message: 'Product get successfully', data: product })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internal server error' })
    }
}

const getProductsByOwnerController = async (req, res) => {
    try {
        const { ownerId } = req.params
        const products = await Product.find({ owner: ownerId }).populate(['owner', 'category', 'subCategory'])
        return res.status(200).json({ success: true, message: 'Products get successfully by owner', data: products })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internal server error' })
    }
}

const getProductsByCategoryController = async (req, res) => {
    try {
        const { categoryId } = req.params
        const products = await Product.find({ category: categoryId }).populate(['owner', 'category', 'subCategory'])
        return res.status(200).json({ success: true, message: 'Products get successfully by category', data: products })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internal server error' })
    }
}

const getProductsBySubCategoryController = async (req, res) => {
    try {
        const { subcategoryId } = req.params
        const products = await Product.find({ subCategory: subcategoryId }).populate(['owner', 'category', 'subCategory'])
        return res.status(200).json({ success: true, message: 'Products get successfully by subcategory', data: products })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internal server error' })
    }
}

const deleteProductsController = async (req, res) => {
    try {
        const { id } = req.params
        const deletedProduct = await Product.findByIdAndDelete(id)
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found or already deleted' })
        }
        return res.status(200).json({ success: true, message: 'Product deleted successfully', data: deletedProduct })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internal server error' })
    }
}

module.exports = {
    createCategory,
    createSubCategory,
    getAllSubCategory,
    getAllSubCategoriesByCategory,
    getAllCategoriesByOwner,
    getAllCategories,
    createProductController,
    getAllProductsController,
    getSingleProductsController,
    getProductsByOwnerController,
    deleteProductsController,
    getProductsByCategoryController,
    getProductsBySubCategoryController
}