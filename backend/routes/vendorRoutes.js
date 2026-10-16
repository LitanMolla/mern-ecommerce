const express = require('express')
const {
    createCategory,
    createSubCategory,
    getAllSubCategory,
    getAllSubCategoriesByCategory,
    getAllCategoriesByOwner,
    getAllCategories,
    createProductController } = require('../controllers/vendorController')
const upload = require('../middlewares/uploadMiddleware')

const router = express.Router()

// Category routes start
router.post('/create/category', createCategory)
router.post('/create/subcategory', createSubCategory)
router.get('/all/category', getAllCategories)
router.get('/all/subcategory', getAllSubCategory)
router.get('/category/:id/subcategory', getAllSubCategoriesByCategory)
router.get('/user/:id/category', getAllCategoriesByOwner)

// products routes start
router.post('/products/create',upload.array('images'), createProductController)

module.exports = router