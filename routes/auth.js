const express = require('express')
const {signup, activate, signin} = require('../controllers/auth')
const {runValidation} = require('../validators')
const {userSignupValidator, userSigninValidator} = require('../validators/auth')
const router = express.Router()

// router.get('/signup', signup)
router.post('/signup', userSignupValidator, runValidation, signup)
router.post('/signin', userSigninValidator, runValidation, signin)
router.post('/activate', activate)

module.exports = router
