const express = require('express')
const { registerController, loginController, verifyAccountController } = require('../controllers/authControllers')
const router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/verify/:token',verifyAccountController)

module.exports = router