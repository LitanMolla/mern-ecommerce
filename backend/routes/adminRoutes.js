const express = require('express')
const {
    userUpdateController,
    getAllUsersController,
    getUserController,
    getAllActiveUsersController,
    getAllDeactiveUsersController,
    deleteUserController,
    updateCategory,
    categoryDeleteController,
    getAllCategories
} = require('../controllers/adminControllers')

const router = express.Router()

router.get('/all-users', getAllUsersController)
router.get('/user/:id', getUserController)
router.get('/active-users', getAllActiveUsersController)
router.post('/update/:id', userUpdateController)
router.get('/deactive-users', getAllDeactiveUsersController)
router.delete('/delete/:id', deleteUserController)
router.get('/categories', getAllCategories)
router.post('/update-category/:id', updateCategory)
router.post('/delete-category/:id', categoryDeleteController)

module.exports = router