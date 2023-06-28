const express = require('express')
const router = express.Router()

const {signup} = require('../controllers/User')
const {signin} = require('../controllers/User')
const {userSignupValidator}=require('../validator/index')

router.post('/signup', userSignupValidator, signup)
router.post('/signin', signin)

module.exports = router