const User = require('../models/User')
const { genToken } = require('../helpers/jwt')
const { hashPassword, comparePassword } = require('../helpers/bcryptjs')

class Usercontroller {
  static async register(req, res) {
    try {
      const { name, phone_number, email, password } = req.body
      const input = {
        name,
        phone_number,
        email,
        password: hashPassword(password)
      }

      // validation
      let errors = []
      if (!name || !phone_number || !email || !password) {
        errors.push('name/phone/email/password cant be empty')
      }
      if (password.length < 6) {
        errors.push('password at least 6 character')
      }
      if (errors === []) {
        res.status(400).json({message: errors})
      }

      const user = await User.create(input)

      if (user) res.status(201).json(user.ops[0])
    } catch (err) {
      console.log(err);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body
      console.log(email, 'email');
      const user = await User.findOne({email})
      if (!user || !comparePassword(password, user.password)) res.status(401).json({message: 'email/password invalid'})
      else {
        const payload = {
          id: user._id,
          email: user.email
        }
        
        res.status(200).json({
          who: user.name,
          access_token: genToken(payload)
        })
      }
      
    } catch (err) {
      console.log(err);
    }
  } 

  static async findAll(req, res) {
    try {
      const users = await User.find()

      if (!users) res.status(404).json({message: 'not found'})
      else {
        let userData = []
        users.forEach(e => {
          const {_id, name, phone_number, email} = e
          userData.push({_id, name, phone_number, email})
        })
        res.status(200).json(userData)
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params
      if (id.length !== 24) return res.status(400).json({message: 'bad request'})

      const user = await User.delete(id)
      if (!user.result.n) return res.status(404).json({message: 'not found'})

      return res.status(200).json({message: 'user data successfully deleted'})
      
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Usercontroller