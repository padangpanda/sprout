const { checkToken } = require('../helpers/jwt')
const User  = require('../models/User')

const isLogin = async (req, res, next) => {
  try {
    const { access_token } = req.headers
    if (!access_token) {
      return res.status(401).json({message: 'you must login'})
    }
    const login = checkToken(access_token)
  
    const user = await User.findOne({email: login.email})
    if (!user) return res.status(401).json({message: 'you must login'})
    
    req.user = login
    next()
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  isLogin
}