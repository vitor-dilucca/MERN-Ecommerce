const User = require('../Models/user');

exports.signup = async (req, res) => {
  console.log('req.body', req.body);
  try {
    const user = await User.create(req.body);
    res.json({
      user: user
    });
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};