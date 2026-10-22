const Product = require('../models/productModel')
const { readSheet } = require('read-excel-file/node')
const crypto = require("crypto");

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
            owner,
            stock
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
        const uniqueNumber = crypto.randomInt(1000000000, 10000000000);
        const sku = `LM-${uniqueNumber}`
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
        const product = new Product({ title, stock, description, shortDescription, price, discountPrice, category, subCategory, owner, images, slug, sku })
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


const schema = {
    title: {
        column: "title",
        type: String,
    },
    slug: {
        column: "slug",
        type: String,
    },
    sku: {
        column: "sku",
        type: String,
    },
    shortDescription: {
        column: "shortDescription",
        type: String,
    },
    description: {
        column: "description",
        type: String,
    },
    price: {
        column: "price",
        type: Number,
    },
    discountPrice: {
        column: "discountPrice",
        type: Number,
    },
    stock: {
        column: "stock",
        type: Number,
    },
    images: {
        column: "images",
        type: String,
    },
};

const bulkProductsUploadController = async (req, res) => {
    try {
        const { objects, errors } = await readSheet(req.file.path, { schema })


        const products = objects.map((product) => (
            {
                ...product,
                images: {
                    url: product.images
                },
                category: '6ac778fbf3ff58f47acc815d',
                subCategory: '6ac77b31f3ff58f47acc8160',
                owner: '6ac206a8ce41c4c41fea9867',
                sku: product.sku || `LM-${crypto.randomInt(1000000000, 10000000000)}`,
                slug: product.slug || 
            }
        ))
        const data = await Product.insertMany(products)
        console.log({ products, data })
        return res.status(201).json({ success: true, message: 'Products uplloaded successfully', data: { errors, data } })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internal server error', error })
    }
}

module.exports = {
    createProductController,
    getAllProductsController,
    getSingleProductsController,
    getProductsByOwnerController,
    deleteProductsController,
    getProductsByCategoryController,
    getProductsBySubCategoryController,
    bulkProductsUploadController
    
}