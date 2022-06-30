require('dotenv').config()

const supertest = require('supertest')
const { app } = require('../app')

const Patient = require('../models/patient')
const api = supertest(app)

const getAllContentFromUsers = async (token) => {
  const response = await api.get('/api/users').set('x-token', token)

  const { users } = response.body

  return { users }
}
const existsPatientById = async (id) => {
  const patientExists = await Patient.findById(id)

  if (!patientExists) {
    throw new Error(`Patient Id ${id} doesnt exist`)
  }
}

const getAllContentFromPatients = async (token) => {
  const response = await api.get('/api/patients').set('x-token', token)

  const { patients } = response.body

  return {
    ids: response.body.patients.map(patient => patient.iid),
    patients
  }
}

const getAllContentFromPractitioners = async (token) => {
  const response = await api.get('/api/practitioners').set('x-token', token)

  const { practitioners } = response.body

  return {
    ids: response.body.practitioners.map(practitioner => practitioner.iid),
    practitioners
  }
}

const getAllContentFromConditions = async (token) => {
  const response = await api.get('/api/conditions').set('x-token', token)

  const { conditions } = response.body

  return {
    ids: response.body.conditions.map(condition => condition.iid),
    conditions
  }
}

const getAllContentFromMedicalHistory = async () => {
  const response = await api.get('/api/conditions/history/AAAAAA')

  const { conditions } = response.body

  return {
    ids: response.body.conditions.map(condition => condition.iid),
    conditions
  }
}

const createMockUser = async () => {
  const mockUser = {
    active: true,
    email: 'mockadmin@test.com',
    password: 'ABCDEF',
    role: 'ADMIN_ROLE',
    name: 'MOCK_ADMIN'
  }

  await api.post('/api/users').send(mockUser)

  const response = await api.get('/api/login').send({ name: mockUser.name, password: mockUser.password })

  return response.body.token
}

module.exports = {
  api,
  getAllContentFromUsers,
  existsPatientById,
  getAllContentFromPatients,
  getAllContentFromPractitioners,
  getAllContentFromConditions,
  getAllContentFromMedicalHistory,
  createMockUser
}
