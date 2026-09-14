const express = require('express')
const { registerController, loginController, verifyAccountController, forgotPasswordController } = require('../controllers/authControllers')
const router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/verify/:token', verifyAccountController)
router.post('/forgot-password', forgotPasswordController)

module.exports = router