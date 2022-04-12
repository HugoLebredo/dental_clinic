const Patient = require('../models/patient')

const isEmailOk = async (email = '') => {
  // check if email exists
  const emailExists = await Patient.findOne({ email })

  // emailExists = false
  if (emailExists) {
    throw new Error(`email ${email} already exists`)
  }
}

const existsPatientById = async (id) => {
  const profileExists = await Patient.findById(id)

  if (!profileExists) {
    throw new Error(`User Id ${id} doesnt exist`)
  }
}

module.exports = {
  isEmailOk,
  existsPatientById
}
