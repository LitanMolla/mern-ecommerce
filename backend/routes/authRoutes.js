const express = require('express')
const { registerController, loginController, verifyAccountController, forgotPasswordController, resetPasswordController } = require('../controllers/authControllers')
const router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/verify/:token', verifyAccountController)
router.post('/forgot-password', forgotPasswordController)
router.post('/reset-password/:token', resetPasswordController)

module.exports = router