import User from '../models/user.js'
import { Unauthorized } from '../lib/errors.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'

async function registerUser(req, res, next) {
  try {
    const createdUser = await User.create(req.body)
    return res.status(201).json({
      message: `Welcome ${createdUser.username}`,
    })
  } catch (err) {
    next(err)
  }
}

async function loginUser(req, res, next) {
  try {
    const userToLogin = await User.findOne({ email: req.body.email })
    if (!userToLogin || !userToLogin.validatePassword(req.body.password)) {
      throw new Unauthorized()
    }

    const token = jwt.sign({ sub: userToLogin._id }, secret, { expiresIn: '7 days' })

    return res.status(202).json({
      message: `Welcome Back ${userToLogin.username}`,
      token,
      _id: userToLogin._id, // test, (actually this is necessary)
      userInfo: userToLogin, // test
    })
  } catch (err) {
    next(err)
  }
}

export default {
  register: registerUser,
  login: loginUser,
}
