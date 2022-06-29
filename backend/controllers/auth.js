const { response, request } = require('express')
const { generateJWT } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/password')

const User = require('../models/user')

const login = async (req = request, res = response) => {
  let { name, password } = req.body

  name = name.toUpperCase()

  const queryStatements = { name, active: true }

  const user = await User.findOne(queryStatements)

  if (!user) {
    return (res.status(400).json({ msg: 'no existe el usuario' }))
  }

  const validPassword = checkPassword(password, user.password)

  const token = await generateJWT(user.id)

  if (!validPassword) {
    return (res.status(400).json({ msg: 'mal contraseña' }))
  }

  res.json({ user, token })
}

module.exports = login
