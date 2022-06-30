const mongoose = require('mongoose')
const { api, getAllContentFromPatients, createMockUser } = require('./helpers')

const { server } = require('../app')
const Patient = require('../models/patient')
const User = require('../models/user')

const initialPatients = require('./mockdata/patients.json')

let token = ''

beforeAll(async () => {
  token = await createMockUser()
})

beforeEach(async () => {
  await Patient.deleteMany({})

  for (const patient of initialPatients) {
    const patientObject = new Patient(patient)
    await patientObject.save()
  }
})

afterAll(async () => {
  await User.deleteMany({})
  mongoose.connection.close()
  server.close()
})

describe('Get patients', () => {
  test('Patients are returned as JSON', async () => {
    await api
      .get('/api/patients')
      .set('x-token', token)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test(`There are ${initialPatients.length} profiles`, async () => {
    const { patients } = await getAllContentFromPatients(token)

    expect(patients).toHaveLength(initialPatients.length)
  })
})

describe('Get one patient', () => {
  test(`Pick up a patient with given name: ${initialPatients[0].name[0].family}`, async () => {
    const { ids } = await getAllContentFromPatients(token)

    const response = await api.get(`/api/patients/${ids[0]}`).set('x-token', token)

    const { patient } = response.body

    expect(patient.name[0].family).toEqual(initialPatients[0].name[0].family)
  })
})
