const User = require('../models/user')

const isEmailOk = async (email = '') => {
  // check if email exists
  const emailExists = await User.findOne({ email })

  // emailExists = false
  if (emailExists) {
    throw new Error(`email ${email} already exists`)
  }
}

module.exports = { isEmailOk }
