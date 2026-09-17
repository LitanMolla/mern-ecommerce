const express = require('express')
const {
    userUpdateController,
    getAllUsersController,
    getUserController,
    getAllActiveUsersController,
    getAllDeactiveUsersController,
    deleteUserController,
    updateCategory,
    categoryDeleteController,
    getAllCategories
} = require('../controllers/adminControllers')

const router = express.Router()

/**
 * @swagger
 * /api/v1/user/all-users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: All users fetched successfully
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
 *                   example: Total 10 user found
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *
 *       500:
 *         description: Internal server error
 */
router.get('/all-users', getAllUsersController)

/**
 * @swagger
 * /api/v1/user/user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *         example: 65a1b2c3d4e5f67890123456
 *
 *     responses:
 *       200:
 *         description: User found successfully
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
 *                   example: User find successfully
 *                 data:
 *                   type: object
 *
 *       400:
 *         description: User ID required or User not found
 *
 *       500:
 *         description: Internal server error
 */
router.get('/user/:id', getUserController)

/**
 * @swagger
 * /api/v1/user/active-users:
 *   get:
 *     summary: Get all active users
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Active users fetched successfully
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
 *                   example: Total 5 user found
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *
 *       500:
 *         description: Internal server error
 */
router.get('/active-users', getAllActiveUsersController)

/**
 * @swagger
 * /api/v1/user/update/{id}:
 *   post:
 *     summary: Update user
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *         example: 65a1b2c3d4e5f67890123456
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Litan Molla
 *               email:
 *                 type: string
 *                 format: email
 *                 example: litan@gmail.com
 *               status:
 *                 type: string
 *                 example: active
 *
 *     responses:
 *       200:
 *         description: User updated successfully
 *
 *       400:
 *         description: User ID required or User not found
 *
 *       500:
 *         description: Internal server error
 */
router.post('/update/:id', userUpdateController)

/**
 * @swagger
 * /api/v1/user/deactive-users:
 *   get:
 *     summary: Get all deactivated users
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Deactivated users fetched successfully
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
 *                   example: Total 3 user found
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *
 *       500:
 *         description: Internal server error
 */
router.get('/deactive-users', getAllDeactiveUsersController)

/**
 * @swagger
 * /api/v1/user/delete/{id}:
 *   delete:
 *     summary: Delete user
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *         example: 65a1b2c3d4e5f67890123456
 *
 *     responses:
 *       200:
 *         description: User deleted successfully
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
 *                   example: User deleted successfully
 *
 *       400:
 *         description: User ID required or User not found
 *
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', deleteUserController)

/**
 * @swagger
 * /api/v1/user/categories:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Category
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
 *                   example: Total: 5 found
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 65a1b2c3d4e5f67890123456
 *                       name:
 *                         type: string
 *                         example: Electronics
 *
 *       500:
 *         description: Internal server error
 */
router.get('/categories', getAllCategories)

/**
 * @swagger
 * /api/v1/user/update-category/{id}:
 *   post:
 *     summary: Update category
 *     tags:
 *       - Category
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *         example: 65a1b2c3d4e5f67890123456
 *
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
 *                 example: Electronics
 *
 *     responses:
 *       200:
 *         description: Category updated successfully
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
 *                   example: Category updated
 *                 data:
 *                   type: object
 *
 *       400:
 *         description: Category ID or name is required
 *
 *       404:
 *         description: Category not found
 *
 *       500:
 *         description: Internal server error
 */
router.post('/update-category/:id', updateCategory)

/**
 * @swagger
 * /api/v1/user/delete-category/{id}:
 *   post:
 *     summary: Delete category
 *     tags:
 *       - Category
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *         example: 65a1b2c3d4e5f67890123456
 *
 *     responses:
 *       200:
 *         description: Category deleted successfully
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
 *                   example: Category deleted
 *                 data:
 *                   type: object
 *
 *       400:
 *         description: Category ID not found
 *
 *       404:
 *         description: Category not found
 *
 *       500:
 *         description: Internal server error
 */
router.post('/delete-category/:id', categoryDeleteController)

module.exports = router