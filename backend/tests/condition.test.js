const mongoose = require('mongoose')
const { api, getAllContentFromConditions } = require('./helpers')

const { server } = require('../app')
const Condition = require('../models/condition')

const initialConditions = require('./mockdata/conditions.json')

beforeEach(async () => {
  await Condition.deleteMany({})

  for (const condition of initialConditions) {
    const conditionObject = new Condition(condition)
    await conditionObject.save()
  }
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})

describe('Get conditions 🩻', () => {
  test('Conditios are returned as JSON', async () => {
    await api
      .get('/api/conditions')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test(`There are ${initialConditions.length} profiles`, async () => {
    const { conditions } = await getAllContentFromConditions()

    expect(conditions).toHaveLength(initialConditions.length)
  })
})

describe('Medical History 🗂', () => {
  test('Medical History is returned as JSON', async () => {
    await api
      .get('/api/conditions/history/AAAAAA')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('There is 1 record', async () => {
    const { medHistory } = await getAllContentFromConditions()
    console.log('HOLA HOLA!!!')
    console.log(medHistory)

    expect(medHistory).toHaveLength(1)
  })
})
