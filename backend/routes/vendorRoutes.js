const express = require('express')
const {
    createCategory,
    createSubCategory,
    getAllSubCategory,
    getAllSubCategoriesByCategory,
    getAllCategoriesByOwner,
    getAllCategories,
} = require('../controllers/vendorController')
const upload = require('../middlewares/uploadMiddleware')
const { createProductController, getAllProductsController,
    getSingleProductsController,
    getProductsByOwnerController,
    deleteProductsController,
    getProductsBySubCategoryController,
    getProductsByCategoryController, 
    bulkProductsUploadController,
bulkProductsDownloadController,
singleProductUpdateController
} = require('../controllers/productControllers')

const router = express.Router()

// Category routes start
router.post('/create/category', createCategory)
router.post('/create/subcategory', createSubCategory)
router.get('/all/category', getAllCategories)
router.get('/all/subcategory', getAllSubCategory)
router.get('/category/:id/subcategory', getAllSubCategoriesByCategory)
router.get('/user/:id/category', getAllCategoriesByOwner)

// products routes start
router.post('/products/create', upload.array('images'), createProductController)
router.get('/products/all', getAllProductsController)
router.get('/products/:id', getSingleProductsController)
router.get('/products/owner/:ownerId', getProductsByOwnerController)
router.get('/products/category/:categoryId', getProductsByCategoryController)
router.get('/products/subcategory/:subcategoryId', getProductsBySubCategoryController)
router.delete('/products/:id', deleteProductsController)
router.post('/products/bulk', upload.single('file'),bulkProductsUploadController)
router.post('/products/bulk/save', bulkProductsDownloadController)
router.post('/products/update/:id',upload.array('images'), singleProductUpdateController)

module.exports = router