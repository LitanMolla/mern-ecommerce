const express = require('express')
const { createCategory, createSubCategory, getAllSubCategory, getAllSubCategoryWiseCategory } = require('../controllers/vendorController')

const router = express.Router()
router.post('/create/category', createCategory)
router.post('/create/subcategory', createSubCategory)
router.get('/all/subcategory', getAllSubCategory)
router.get('/category/:id/subcategory', getAllSubCategoryWiseCategory)
module.exports = router