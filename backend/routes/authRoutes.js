const express = require('express')
const { registerController, loginController, verifyAccountController, forgotPasswordController, resetPasswordController } = require('../controllers/authControllers')
const router = express.Router()

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - confrimPassword
 *               - terms
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: litan@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password123
 *               confrimPassword:
 *                 type: string
 *                 format: password
 *                 example: Password123
 *               terms:
 *                 type: boolean
 *                 example: true
 *               fullName:
 *                 type: string
 *                 example: Litan Molla
 *     responses:
 *       201:
 *         description: Register success.
 *
 *       400:
 *         description: Validation error
 *
 *       500:
 *         description: Internal server error
 */
router.post('/register', registerController)
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: litan@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password123
 *
 *     responses:
 *       200:
 *         description: Login success.
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
 *                   example: Login success.
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 65a1b2c3d4e5f67890123456
 *                     fullName:
 *                       type: string
 *                       example: Litan Molla
 *                     email:
 *                       type: string
 *                       example: litan@gmail.com
 *                     role:
 *                       type: string
 *                       example: user
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 *       400:
 *         description: Invalid credentials or required fields missing.
 *
 *       500:
 *         description: Internal server error.
 */
router.post('/login', loginController)
/**
 * @swagger
 * /api/v1/auth/verify/{token}:
 *   get:
 *     summary: Verify user account
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Account verification token
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 *     responses:
 *       200:
 *         description: Account verified successfully
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
 *                   example: Account verify success.
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 65a1b2c3d4e5f67890123456
 *                     fullName:
 *                       type: string
 *                       example: Litan Molla
 *                     isVerifed:
 *                       type: boolean
 *                       example: true
 *                     email:
 *                       type: string
 *                       example: litan@gmail.com
 *
 *       400:
 *         description: Invalid token, token expired, or account already verified.
 *
 *       404:
 *         description: User not found.
 */
router.get('/verify/:token', verifyAccountController)
/**
 * @swagger
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Send password reset email
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: litan@gmail.com
 *
 *     responses:
 *       200:
 *         description: Password reset email sent successfully.
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
 *                   example: Password reset email send successfully, please check your email.
 *
 *       404:
 *         description: User not found.
 *
 *       500:
 *         description: Internal server error.
 */
router.post('/forgot-password', forgotPasswordController)
/**
 * @swagger
 * /api/v1/auth/reset-password/{token}:
 *   post:
 *     summary: Reset user password
 *     tags:
 *       - Auth
 *
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - confrimPassword
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: NewPassword123
 *               confrimPassword:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: NewPassword123
 *
 *     responses:
 *       200:
 *         description: Password reset successfully.
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
 *                   example: Password reset successfully
 *                 data:
 *                   type: object
 *
 *       400:
 *         description: Invalid token, token expired, or validation error.
 *
 *       404:
 *         description: Token not found or user not found.
 */
router.post('/reset-password/:token', resetPasswordController)

module.exports = router