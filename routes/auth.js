const express = require('express')
const {
  signup,
  activate,
  signin,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth')
const {runValidation} = require('../validators')
const {
  userSignupValidator,
  userSigninValidator,
  resetPasswordValidator,
  forgotPasswordValidator,
} = require('../validators/auth')

const router = express.Router()

router.post('/signup', userSignupValidator, runValidation, signup)
router.post('/signin', userSigninValidator, runValidation, signin)
router.post('/activate', activate)

router.put(
  '/forgot-password',
  forgotPasswordValidator,
  runValidation,
  forgotPassword,
)

router.put(
  '/reset-password',
  resetPasswordValidator,
  runValidation,
  resetPassword,
)

module.exports = router
