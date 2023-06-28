const express = require('express')
const router = express.Router()

const {signup,signin,logout} = require('../controllers/User')
const {userSignupValidator}=require('../validator/index')

router.post('/signup', userSignupValidator, signup)
router.post('/signin', signin)
router.post('/logout', logout)

module.exports = router