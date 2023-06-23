const express = require('express')
const router = express.Router()

const {sayHi} = require('../controllers/User')

router.get('/', sayHi)

module.exports = router