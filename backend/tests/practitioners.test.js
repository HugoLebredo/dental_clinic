const mongoose = require('mongoose')
const { api, getAllContentFromPractitioners, createMockUser } = require('./helpers')

const { server } = require('../app')
const Practitioner = require('../models/practitioner')
const User = require('../models/user')

const initialPractitioners = require('./mockdata/practitioners.json')

let token = ''

beforeAll(async () => {
  token = await createMockUser()
})

beforeEach(async () => {
  await Practitioner.deleteMany({})

  for (const practitioner of initialPractitioners) {
    const practitionerObject = new Practitioner(practitioner)
    await practitionerObject.save()
  }
})

afterAll(async () => {
  await User.deleteMany({})
  mongoose.connection.close()
  server.close()
})

describe('Get practitioners', () => {
  test('practitioners are returned as JSON', async () => {
    await api
      .get('/api/practitioners')
      .set('x-token', token)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test(`There are ${initialPractitioners.length} profiles`, async () => {
    const { practitioners } = await getAllContentFromPractitioners(token)

    expect(practitioners).toHaveLength(initialPractitioners.length)
  })
})

describe('Get one practitioner', () => {
  test(`Pick up a practitioner with given name: ${initialPractitioners[0].name[0].family}`, async () => {
    const { ids } = await getAllContentFromPractitioners(token)

    const response = await api.get(`/api/practitioners/${ids[0]}`).set('x-token', token)

    const { practitioner } = response.body

    expect(practitioner.name[0].family).toEqual(initialPractitioners[0].name[0].family)
  })
})
