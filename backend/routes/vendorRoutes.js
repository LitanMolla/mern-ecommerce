const express = require('express')
const { createCategory, createSubCategory, getAllSubCategory, getAllSubCategoryWiseCategory, getAllCategoryWiseOwner, getAllCategories } = require('../controllers/vendorController')

const router = express.Router()

router.post('/create/category', createCategory)
router.post('/create/subcategory', createSubCategory)
router.get('/all/subcategory', getAllSubCategory)
router.get('/all/category', getAllCategories)
router.get('/category/:id/subcategory', getAllSubCategoryWiseCategory)
router.get('/user/:id/category', getAllCategoryWiseOwner)
module.exports = router