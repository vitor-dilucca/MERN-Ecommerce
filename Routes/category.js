const express = require('express')
const router = express.Router()

const {create} = require('../controllers/category')
const {requireSignIn,isAuth,isAdmin} = require('../controllers/auth')
const {userById} = require('../controllers/user')

router.post('/category/create/:userId',requireSignIn,create,isAdmin,isAuth)

router.param('userId',userById)

module.exports = router