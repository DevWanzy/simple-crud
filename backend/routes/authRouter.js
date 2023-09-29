const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.get('/signup', authController.getUsers)
router.get('/login', authController.login_get)
router.post('/signup', authController.signUp)
// User login
router.post('/login', authController.login)

// Logout route
router.get('/logout', authController.logout)

module.exports = router
