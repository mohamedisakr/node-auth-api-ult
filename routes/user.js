const express = require('express')
const {findOneById} = require('../controllers/user')
const {runValidation} = require('../validators')
const {userSignupValidator, userSigninValidator} = require('../validators/auth')
const router = express.Router()

router.get('/user/:id', findOneById)

module.exports = router
