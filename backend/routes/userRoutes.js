const express = require('express')
const { userUpdateController, createCategory } = require('../controllers/userControllers')
const router = express.Router()

router.post('/update/:id',userUpdateController)
router.post('/create-category',createCategory)

module.exports = router