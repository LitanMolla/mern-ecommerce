const express = require('express')
const { userUpdateController, createCategory } = require('../controllers/userControllers')
const router = express.Router()

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
 *             example:
 *               fullName: Litan Molla
 *               email: litan@gmail.com
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
 * /api/v1/user/create-category:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Category
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
 *     responses:
 *       201:
 *         description: Category created successfully
 *
 *       400:
 *         description: Name is required or category already exists
 *
 *       500:
 *         description: Internal server error
 */
router.post('/create-category', createCategory)

module.exports = router