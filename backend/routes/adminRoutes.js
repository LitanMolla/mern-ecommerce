const express = require('express')
const {
    userUpdateController,
    getAllUsersController,
    getUserController,
    getAllActiveUsersController,
    getAllDeactiveUsersController,
    deleteUserController,
    updateCategory,
    categoryDeleteController
} = require('../controllers/adminControllers')

const router = express.Router()

router.post('/update/:id', userUpdateController)
router.post('/update-category/:id', updateCategory)
router.post('/delete-category/:id', categoryDeleteController)
router.delete('/delete/:id', deleteUserController)
router.get('/all-users', getAllUsersController)
router.get('/user/:id', getUserController)
router.get('/active-users', getAllActiveUsersController)
router.get('/deactive-users', getAllDeactiveUsersController)

module.exports = router