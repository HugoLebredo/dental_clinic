const { response, request } = require('express')
const { hashPassword } = require('../helpers/password')

const User = require('../models/user')

const usersGet = async (req = request, res = response) => {
  // const {id= 1, limit = 10, name = "no name"} = req.query
  const { limite = 5, desde = 0 } = req.query
  const queryStatements = { state: true }

  const [total, users] = await Promise.all([
    User.countDocuments(queryStatements),
    User.find(queryStatements)
      .limit(Number(limite))
      .skip(Number(desde))
  ])

  res.json({
    total,
    users
  })
}

const usersPut = async (req = request, res = response) => {
  const { id } = req.params
  const { _id, password, google, email, ...other } = req.body

  // validate against database
  if (password) {
    other.password = hashPassword(password)
  }

  const user = await User.findByIdAndUpdate(id, other)

  res.json({
    user
  })
}

const usersPost = async (req, res = response) => {
  let { name, password, role, email, active, creationDate } = req.body
  // capital letters
  name = name.toUpperCase()
  email = email.toUpperCase()

  const queryStatements = { name, email }
  // new User({ name, password, role, email, active, creationDate }
  User.find(queryStatements)

  const userDB = await User.findOne(queryStatements)

  if (userDB) {
    return res.status(482).json({
      message: 'Existe usuario'
    })
  }

  const user = new User({ name, password, role, email, active, creationDate })

  // encrypt password
  user.password = hashPassword(password)

  // save user
  await user.save()

  res.status(201).json({
    message: 'post API - controller',
    user
  })
}

const usersPatch = (req, res = response) => {
  res.json({
    message: 'patch API - controller',
    status: 'cool'
  })
}

const usersDelete = async (req, res = response) => {
  const { id } = req.params
  const { authUser } = req

  // Delete from db. Bad idea, you lose the data integrity reference
  // const user = await User.findByIdAndDelete( id )

  const user = await User.findByIdAndUpdate(id, { active: false })

  res.json({
    msg: 'Delete',
    authUser,
    user
  })
}

module.exports = {
  usersGet,
  usersPut,
  usersPost,
  usersPatch,
  usersDelete
}
