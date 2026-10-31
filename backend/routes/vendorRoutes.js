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
/**
 * @swagger
 * /api/v1/vendor/create/category:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Vendor Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: electronics
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Name is required or category already exists
 *       500:
 *         description: Internal server error
 */
router.post('/create/category', createCategory)

/**
 * @swagger
 * /api/v1/vendor/create/subcategory:
 *   post:
 *     summary: Create a new subcategory
 *     tags:
 *       - Vendor Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - parentCategory
 *             properties:
 *               name:
 *                 type: string
 *                 example: smartphones
 *               parentCategory:
 *                 type: string
 *                 example: 65a1b2c3d4e5f67890123456
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 *       400:
 *         description: Name and parentCategory ID are required or subcategory already exists
 *       500:
 *         description: Internal server error
 */
router.post('/create/subcategory', createSubCategory)

/**
 * @swagger
 * /api/v1/vendor/all/category:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Vendor Category
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Total 5 found
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal server error
 */
router.get('/all/category', getAllCategories)

/**
 * @swagger
 * /api/v1/vendor/all/subcategory:
 *   get:
 *     summary: Get all subcategories
 *     tags:
 *       - Vendor Category
 *     responses:
 *       200:
 *         description: Subcategories fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Total 10 sub categories found
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal server error
 */
router.get('/all/subcategory', getAllSubCategory)

/**
 * @swagger
 * /api/v1/vendor/category/{id}/subcategory:
 *   get:
 *     summary: Get all subcategories by category ID
 *     tags:
 *       - Vendor Category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Parent category MongoDB ObjectId
 *         example: 65a1b2c3d4e5f67890123456
 *     responses:
 *       200:
 *         description: Subcategories fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Total 5 sub categories found on this categories
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Invalid Object ID
 *       500:
 *         description: Internal server error
 */
router.get('/category/:id/subcategory', getAllSubCategoriesByCategory)

/**
 * @swagger
 * /api/v1/vendor/user/{id}/category:
 *   get:
 *     summary: Get all categories by owner ID
 *     tags:
 *       - Vendor Category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Owner user MongoDB ObjectId
 *         example: 65a1b2c3d4e5f67890123456
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: categories found wise owner
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                         example: electronics
 *                       owner:
 *                         type: object
 *                       subCategory:
 *                         type: array
 *                         items:
 *                           type: object
 *       400:
 *         description: Invalid Object ID
 *       500:
 *         description: Internal server error
 */
router.get('/user/:id/category', getAllCategoriesByOwner)

// products routes start
/**
 * @swagger
 * /api/v1/vendor/products/create:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Vendor Products
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *               - category
 *               - subCategory
 *               - owner
 *               - stock
 *               - images
 *             properties:
 *               title:
 *                 type: string
 *                 example: Samsung Galaxy S24
 *               description:
 *                 type: string
 *                 example: Latest Samsung flagship smartphone
 *               shortDescription:
 *                 type: string
 *                 example: Samsung Galaxy S24 256GB
 *               price:
 *                 type: number
 *                 example: 85000
 *               discountPrice:
 *                 type: number
 *                 example: 80000
 *               category:
 *                 type: string
 *                 example: 65a1b2c3d4e5f67890123456
 *               subCategory:
 *                 type: string
 *                 example: 65a1b2c3d4e5f67890123457
 *               owner:
 *                 type: string
 *                 example: 65a1b2c3d4e5f67890123458
 *               stock:
 *                 type: integer
 *                 example: 50
 *               isMain:
 *                 type: integer
 *                 example: 0
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Product already exists with this slug or SKU
 *       500:
 *         description: Internal server error
 */
router.post('/products/create', upload.array('images'), createProductController)

/**
 * @swagger
 * /api/v1/vendor/products/all:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Vendor Products
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Products get successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal server error
 */
router.get('/products/all', getAllProductsController)

/**
 * @swagger
 * /api/v1/vendor/products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags:
 *       - Vendor Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Product get successfully
 *                 data:
 *                   type: object
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get('/products/:id', getSingleProductsController)

/**
 * @swagger
 * /api/v1/vendor/products/owner/{ownerId}:
 *   get:
 *     summary: Get products by owner ID
 *     tags:
 *       - Vendor Products
 *     parameters:
 *       - in: path
 *         name: ownerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Owner ID
 *     responses:
 *       200:
 *         description: Products fetched successfully by owner
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Products get successfully by owner
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal server error
 */
router.get('/products/owner/:ownerId', getProductsByOwnerController)

/**
 * @swagger
 * /api/v1/vendor/products/category/{categoryId}:
 *   get:
 *     summary: Get products by category ID
 *     tags:
 *       - Vendor Products
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Products fetched successfully by category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Products get successfully by category
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal server error
 */
router.get('/products/category/:categoryId', getProductsByCategoryController)

/**
 * @swagger
 * /api/v1/vendor/products/subcategory/{subcategoryId}:
 *   get:
 *     summary: Get products by subcategory ID
 *     tags:
 *       - Vendor Products
 *     parameters:
 *       - in: path
 *         name: subcategoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Subcategory ID
 *     responses:
 *       200:
 *         description: Products fetched successfully by subcategory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Products get successfully by subcategory
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal server error
 */
router.get('/products/subcategory/:subcategoryId', getProductsBySubCategoryController)

/**
 * @swagger
 * /api/v1/vendor/products/subcategory/{subcategoryId}:
 *   get:
 *     summary: Get products by subcategory ID
 *     tags:
 *       - Vendor Products
 *     parameters:
 *       - in: path
 *         name: subcategoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Subcategory ID
 *     responses:
 *       200:
 *         description: Products fetched successfully by subcategory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Products get successfully by subcategory
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal server error
 */
router.get('/products/subcategory/:subcategoryId', getProductsBySubCategoryController)

/**
 * @swagger
 * /api/v1/vendor/products/bulk:
 *   post:
 *     summary: Bulk upload products using Excel file
 *     tags:
 *       - Vendor Products
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Excel file containing product information
 *     responses:
 *       201:
 *         description: Products uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Products uplloaded successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     errors:
 *                       type: array
 *                       items:
 *                         type: object
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *       400:
 *         description: Please select product file
 *       500:
 *         description: Internal server error
 */
router.post('/products/bulk', upload.single('file'), bulkProductsUploadController)

/**
 * @swagger
 * /api/v1/vendor/products/bulk/save:
 *   post:
 *     summary: Download all products as an Excel file
 *     tags:
 *       - Vendor Products
 *     responses:
 *       200:
 *         description: Product download request completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Product download successfully
 *       500:
 *         description: Internal server error
 */
router.post('/products/bulk/save', bulkProductsDownloadController)

/**
 * @swagger
 * /api/v1/vendor/products/update/{id}:
 *   post:
 *     summary: Update a product by ID
 *     tags:
 *       - Vendor Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               price:
 *                 type: number
 *               discountPrice:
 *                 type: number
 *               stock:
 *                 type: integer
 *               category:
 *                 type: string
 *               subCategory:
 *                 type: string
 *               owner:
 *                 type: string
 *               status:
 *                 type: string
 *               isMain:
 *                 type: integer
 *                 description: Index of the image to set as the main image
 *               deleteIndex:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Indexes of existing images to delete
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: New product images
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Product updated
 *                 data:
 *                   type: object
 *       400:
 *         description: Slug or SKU update is not allowed
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.post('/products/update/:id', upload.array('images'), singleProductUpdateController)


module.exports = router