const express = require('express')
const { userUpdateController } = require('../controllers/userControllers')
const router = express.Router()

router.post('/update/:id',userUpdateController)

module.exports = router