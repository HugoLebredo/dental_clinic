const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

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
    const salt = bcryptjs.genSaltSync()
    other.password = bcryptjs.hashSync(password, salt)
  }

  const user = await User.findByIdAndUpdate(id, other)

  res.json({
    user
  })
}

const usersPost = async (req, res = response) => {
  const { name, password, role, email } = req.body
  const user = new User({ name, password, role, email })

  // encrypt password
  const salt = bcryptjs.genSaltSync()
  user.password = bcryptjs.hashSync(password, salt)

  // save user
  await user.save()

  res.json({
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
