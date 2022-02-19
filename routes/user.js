const express = require('express')
const {requireSignin, adminMiddleware} = require('../controllers/auth')
const {findOneById, update} = require('../controllers/user')

const router = express.Router()

router.get('/user/:id', requireSignin, findOneById)
router.put('/user/update', requireSignin, update)
router.put('/admin/update', requireSignin, adminMiddleware, update)

module.exports = router
