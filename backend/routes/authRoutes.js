const express = require('express')
const { registerController } = require('../controllers/authControllers')
const router = express.Router()

router.post('/register',registerController)

module.exports=router