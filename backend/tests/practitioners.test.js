const mongoose = require('mongoose')
const { api, getAllContentFromPractitioners } = require('./helpers')

const { server } = require('../app')
const Practitioner = require('../models/practitioner')

const initialPractitioners = require('./mockdata/practitioners.json')

beforeEach(async () => {
  await Practitioner.deleteMany({})

  for (const practitioner of initialPractitioners) {
    const practitionerObject = new Practitioner(practitioner)
    await practitionerObject.save()
  }
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})

describe('Get practitioners', () => {
  test('practitioners are returned as JSON', async () => {
    await api
      .get('/api/practitioners')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test(`There are ${initialPractitioners.length} profiles`, async () => {
    const { practitioners } = await getAllContentFromPractitioners()

    expect(practitioners).toHaveLength(initialPractitioners.length)
  })
})

describe('Get one practitioner', () => {
  test(`Pick up a practitioner with given name: ${initialPractitioners[0].name[0].family}`, async () => {
    const { ids } = await getAllContentFromPractitioners()

    const response = await api.get(`/api/practitioners/${ids[0]}`)

    const { practitioner } = response.body

    expect(practitioner.name[0].family).toEqual(initialPractitioners[0].name[0].family)
  })
})
