const User = require('../Models/user');
const {errorHandler} = require('../helpers/dbErrorHandler')

exports.signup = async (req, res) => {
  console.log('req.body', req.body);
  try {
    const user = await User.create(req.body);
    res.json({
      user: user
    });
  } catch (err) {
    res.status(400).json({
      error: errorHandler(err)
    });
  }
};