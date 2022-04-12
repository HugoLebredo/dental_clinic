const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      msg: 'Request has no token'
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETANDPRIVATEKEY)

    const authUser = await User.findById(uid)

    // chaeck if user exists
    if (!authUser) {
      return res.status(401).json({
        msg: 'Invalid Token - User doesn´t exists in DB'
      })
    }

    // check if authUser is active === state = true
    if (!authUser.active) {
      return res.status(401).json({
        msg: 'Invalid Token - User.state = false'
      })
    }

    req.authUser = authUser

    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      msg: 'Invalid Token'
    })
  }
}

module.exports = {
  validateJWT
}
