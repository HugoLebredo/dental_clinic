const supertest = require('supertest')
const app = require('../app')
const Patient = require('../models/patient')
const User = require('../models/user')

const api = supertest(app)

const isPatientEmailOk = async (email = '') => {
  // check if email exists
  const emailExists = await Patient.findOne({ email })

  // emailExists = false
  if (emailExists) {
    throw new Error(`email ${email} already exists`)
  }
}

const isEmailOk = async (email = '') => {
  // check if email exists
  const emailExists = await User.findOne({ email })

  // emailExists = false
  if (emailExists) {
    throw new Error(`email ${email} already exists`)
  }
}

const existsPatientById = async (id) => {
  const patientExists = await Patient.findById(id)

  if (!patientExists) {
    throw new Error(`Patient Id ${id} doesnt exist`)
  }
}

const getAllContentFromPatients = async () => {
  const response = await api.get('/api/patients')

  const { patients } = response.body

  return {
    ids: response.body.patients.map(patient => patient.iid),
    patients
  }
}

module.exports = {
  app,
  api,
  isPatientEmailOk,
  isEmailOk,
  existsPatientById,
  getAllContentFromPatients
}
