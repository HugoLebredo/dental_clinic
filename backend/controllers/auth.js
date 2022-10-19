const { response, request } = require('express')
const { generateJWT } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/password')

const User = require('../models/user')

const login = async (req = request, res = response) => {
  let { email, password } = req.body

  email = email.toUpperCase()

  const queryStatements = { email, active: true }

  const user = await User.findOne(queryStatements)

  const isPasswordCorrect = user === null ? false : checkPassword(password, user.password)

  if (!(user && isPasswordCorrect)) {
    return (res.status(400).json({ msg: 'Wrong user or password' }))
  }

  const token = await generateJWT(user.id)

  res.json({ user, token })
}

module.exports = login
