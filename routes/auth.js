const express = require("express")

const User = require('../models/user')

const authController = require('../controllers/auth')

const router = express.Router()

router.get('/login', authController.getLogin)

router.get('/signup', authController.getSignUp)

router.post('/signup', authController.postSignup)

module.exports = router
