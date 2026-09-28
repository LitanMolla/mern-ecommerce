const express = require('express')
const { createCategory, createSubCategory } = require('../controllers/vendorController')

const router = express.Router()
router.post('/create/category', createCategory)
router.post('/create/subcategory', createSubCategory)
module.exports = router