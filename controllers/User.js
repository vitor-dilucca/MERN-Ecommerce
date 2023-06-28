const User = require('../Models/user');
const jwt = require('jsonwebtoken')//to generate signed token
const {expressjwt} = require('express-jwt')
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
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      err: 'Please provide email and password'
    })
  }
  //senha zyzzelxulo9
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(401).json({
      err: 'Please provide valid email'
    })
  }
  //generate a signed token with user id and secret
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
  // persist the token as 't' in cookie with expiration date
  res.cookie('t', token, { expire: new Date() + 9999 })
  // return response with user and token to frontend client
  const { _id, name, role } = user
  return res.json({ token, user: { _id, email, name, role } })
}

exports.logout = async (req, res) => {
  res.clearCookie('t')
  res.json({message:"Signout success"})
}

exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth'
});