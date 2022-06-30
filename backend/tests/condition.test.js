const mongoose = require('mongoose')
const { api, getAllContentFromConditions, createMockUser } = require('./helpers')

const { server } = require('../app')
const Condition = require('../models/condition')
const User = require('../models/user')

const initialConditions = require('./mockdata/conditions.json')

let token = ''

beforeAll(async () => {
  token = await createMockUser()
})

beforeEach(async () => {
  await Condition.deleteMany({})

  for (const condition of initialConditions) {
    const conditionObject = new Condition(condition)
    await conditionObject.save()
  }
})

afterAll(async () => {
  await User.deleteMany({})
  mongoose.connection.close()
  server.close()
})

describe('Get conditions 🩻', () => {
  test('Conditios are returned as JSON', async () => {
    await api
      .get('/api/conditions')
      .set('x-token', token)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test(`There are ${initialConditions.length} profiles`, async () => {
    const { conditions } = await getAllContentFromConditions(token)

    expect(conditions).toHaveLength(initialConditions.length)
  })
})

describe('Medical History 🗂', () => {
  test('Medical History is returned as JSON', async () => {
    await api
      .get('/api/conditions/history/AAAAAA')
      .set('x-token', token)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test(`There is ${initialConditions.length} records`, async () => {
    const { ids } = await getAllContentFromConditions(token)

    expect(ids).toHaveLength(initialConditions.length)
  })
})
