const express = require('express')
const {signup} = require('../controllers/auth')
const {runValidation} = require('../validators')
const {userSignupValidator} = require('../validators/auth')
const router = express.Router()

// router.get('/signup', signup)
router.post('/signup', userSignupValidator, runValidation, signup)

module.exports = router
