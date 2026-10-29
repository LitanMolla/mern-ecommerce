const { nanoid } = require("nanoid");
const slugify = require("slugify")
const { readSheet } = require('read-excel-file/node')
const writeExcelFile = require('write-excel-file/node')
const Product = require('../models/productModel');
const { schema, columns } = require("../utils/productsUtility");


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
            isMain = 0,
            owner,
            stock
        } = req.body
        // if (!title || !description || !shortDescription || !price || !images || !discountPrice || !category || !subCategory || !owner
        // ) {
        //     return res.status(400).json({ success: false, message: 'Please fill up all feild' })
        // }
        const slug = slugify(title, { lower: true, strict: true, trim: true })
        const isExistbySlug = await Product.findOne({ slug })
        if (isExistbySlug) {
            return res.status(400).json({ success: false, message: 'Product already exist with this slug' })
        }
        const sku = `LM-${nanoid(10)}`
        const isExistbySku = await Product.findOne({ sku })
        if (isExistbySku) {
            return res.status(400).json({ success: false, message: 'Product already exist with this sku' })
        }
        const images = req.files.map((file, index) => {
            return {
                url: file.path,
                isMain: isMain == index
            }
        })
        const product = new Product({ title, stock, description, shortDescription, price, discountPrice, category, subCategory, owner, images, slug, sku })
        await product.save()
        return res.status(201).json({ success: true, message: 'Product created successfully', data: product })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internal server error', error })
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


const bulkProductsUploadController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please select product file' })
        }
        const { objects, errors } = await readSheet(req.file.path, { schema })
        const products = objects.map((product) => (
            {
                ...product,
                images: {
                    url: product.images
                },
                category: product?.category || '6ac778fbf3ff58f47acc815d',
                subCategory: product?.subCategory || '6ac77b31f3ff58f47acc8160',
                owner: product?.owner || '6ac206a8ce41c4c41fea9867',
                sku: product.sku || `LM-${nanoid(10)}`,
                slug: product.slug || slugify(product.title, { lower: true, strict: true, trim: true })
            }
        ))
        const data = await Product.insertMany(products)
        return res.status(201).json({ success: true, message: 'Products uplloaded successfully', data: { errors, data } })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internal server error', error })
    }
}



const bulkProductsDownloadController = async (req, res) => {
    try {
        const data = await Product.find().lean()

        await writeExcelFile(data, { columns }).toFile(`./files/products-${Date.now()}.xlsx`)

        res.status(200).json({ success: true, message: 'Product download successfully' })
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Internal server error' })
    }
}

const singleProductUpdateController = async (req, res) => {
    try {
        if (req.body?.sku || req.body?.slug) {
            return res.status(400).json({ status: false, message: 'Slug or sku update not allowed' })
        }

        const { id } = req.params
        const existingProduct = await Product.findById(id)
        if (!existingProduct) {
            return res.status(404).json({ status: false, message: 'Product not found' })
        }
        if (req.body?.isMain !== undefined) {
            existingProduct.images.map((image, index) => {
                req.body?.isMain == index ? image.isMain = true : image.isMain = false
            })
        }

        if (Array.isArray(req.body?.deleteIndex)) {
            // if (existingProduct.images[req.body?.deleteIndex]?.isMain) {
            //     existingProduct.images[0].isMain = true
            // }
            // existingProduct.images.splice(req.body?.deleteIndex, 1)

            // existingProduct.images.map((product, i) => {
            //     if (existingProduct.images[i]?.isMain) {
            //         existingProduct.images[0].isMain = true
            //     }
            // })
            const remainingImages = []
            existingProduct.images.map((product, i) => {
                if (!req.body?.deleteIndex.includes(i)) {
                    remainingImages.push(product)
                }
            })
            const findIsMain = remainingImages.some(image => image.isMain == true)
            if (!findIsMain) {
                remainingImages[0].isMain = true
            }
            existingProduct.images = remainingImages
        }

        if (req?.files) {
            const images = [...existingProduct.images]
            req.files.map((image) => {
                images.push({ url: image.path, isMain: false })
            })
            existingProduct.images = images
        }
        const data = await Product.findByIdAndUpdate(id, req.body, { returnDocument: 'after' })
        await existingProduct.save()
        return res.status(200).json({ success: true, message: 'Product updated', data })
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
    bulkProductsUploadController,
    bulkProductsDownloadController,
    singleProductUpdateController
}