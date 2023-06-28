const express = require('express')
const router = express.Router()

const {signup,signin,logout,requireSignIn} = require('../controllers/auth')
const {userSignupValidator}=require('../validator/index')

router.post('/signup', userSignupValidator, signup)
router.post('/signin', signin)
router.get('/logout', logout)

router.get('/hello', requireSignIn, (req,res)=>{
  res.send('hello there')
})

module.exports = router