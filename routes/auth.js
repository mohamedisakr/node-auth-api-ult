const express = require('express')
const {signup, activate} = require('../controllers/auth')
const {runValidation} = require('../validators')
const {userSignupValidator} = require('../validators/auth')
const router = express.Router()

// router.get('/signup', signup)
router.post('/signup', userSignupValidator, runValidation, signup)
router.post('/activate', activate)

module.exports = router
