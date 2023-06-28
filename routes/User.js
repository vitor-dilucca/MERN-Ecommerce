const express = require('express')
const router = express.Router()

const {signup,signin,logout} = require('../controllers/User')
const {userSignupValidator}=require('../validator/index')

router.post('/signup', userSignupValidator, signup)
router.post('/signin', signin)
router.get('/logout', logout)

router.get('/hello',(req,res)=>{
  res.send('hello there')
})

module.exports = router