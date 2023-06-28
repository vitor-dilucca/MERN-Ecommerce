const User = require('../Models/user');
const jwt = require('jsonwebtoken')//to generate signed token
const expressJwt = require('express-jwt')
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.signup = async (req, res) => {
  console.log('req.body', req.body);
  try {
    const user = await User.create(req.body);
    user.salt = undefined
    user.hashed_password = undefined
    res.json({
      user: user
    });
  } catch (err) {
    res.status(400).json({
      error: errorHandler(err)
    });
  }
};

exports.signin = async (req, res) => {
  /* //find the user based on email
  const { email, password } = req.body
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: 'User with that email does not exist'
      })
    }
    //if user is found make sure the email and password match
    //create authentication methd in user model
    if(!user.authenticate(password)){
      return res.status(401).json({
        error:'Email and password dont match'
      })
    }

    //generate a signed token with user id and secret
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
    // persist the token as 't' in cookie with expiration date
    res.cookie('t',token,{expire:new Date()+9999})
    // return response with user and token to frontend client
    const {_id,name,email,role}=user
    return res.json({token, user:{_id,email,name,role}}) 
  }) */
///////////////////////////////////////////////////////////////
  const {email,password}=req.body
  if(!email || !password){
    return res.status(400).json({
      err: 'Please provide email and password'
    })
  }
  //senha zyzzelxulo9

  const user = await User.findOne({email})
  if(!user){
    return res.status(401).json({
      err: 'Please provide valid email'
    })
  }

  //codigo do prof deprecado do crypto
  /*const isPasswordCorrect = await user.comparePassword(password)
   if(!isPasswordCorrect){
    console.log(await user.comparePassword(password))
    return res.status(401).json({
      err: 'Please provide valid password'
    })
  } */
  //generate a signed token with user id and secret
  const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
  // persist the token as 't' in cookie with expiration date
  res.cookie('t',token,{expire:new Date()+9999})
  // return response with user and token to frontend client
  const {_id,name,role}=user
  return res.json({token, user:{_id,email,name,role}}) 
}