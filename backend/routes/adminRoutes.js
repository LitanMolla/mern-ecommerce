const express = require('express')
const { userUpdateController, getAllUsersController } = require('../controllers/adminControllers')
const router = express.Router()

router.post('/update/:id', userUpdateController)
router.get('/all-users', getAllUsersController)

module.exports = router