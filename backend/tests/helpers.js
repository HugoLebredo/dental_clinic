require('dotenv').config()

const supertest = require('supertest')
const { app } = require('../app')

const Patient = require('../models/patient')
const api = supertest(app)

const getAllContentFromUsers = async () => {
  const response = await api.get('/api/users')

  const { users } = response.body

  return { users }
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

const getAllContentFromPractitioners = async () => {
  const response = await api.get('/api/practitioners')

  const { practitioners } = response.body

  return {
    ids: response.body.practitioners.map(practitioner => practitioner.iid),
    practitioners
  }
}
module.exports = {
  api,
  getAllContentFromUsers,
  existsPatientById,
  getAllContentFromPatients,
  getAllContentFromPractitioners
}
