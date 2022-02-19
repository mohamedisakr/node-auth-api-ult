const express = require('express')
const {requireSignin} = require('../controllers/auth')
const {findOneById, update} = require('../controllers/user')
const {runValidation} = require('../validators')
const {userSignupValidator, userSigninValidator} = require('../validators/auth')
const router = express.Router()

router.get('/user/:id', requireSignin, findOneById)
router.put('/user/update', requireSignin, update)

module.exports = router
