
const mongoose = require('mongoose')

const User = require('../models/user')

const { app, api, getAllContentFromUsers } = require('../helpers/db-validators')

const initialUsers = require('./mockdata/users.json')

beforeEach(async () => {
  await User.deleteMany({})
  for (const user of initialUsers) {
    const userObject = new User(user)
    await userObject.save()
  }
})

afterAll(async () => {
  mongoose.connection.close()
  app.listen().close()
})

describe('Get users', () => {
  test('Users returned as JSON', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test(`There are ${initialUsers.length} profiles`, async () => {
    const { users } = await getAllContentFromUsers()

    expect(users).toHaveLength(initialUsers.length)
  })
})

describe('POST user', () => {
  test('User created OK', async () => {
    const newUser = {
      active: true,
      email: 'bob@test.com',
      password: 'ABCDEF',
      role: 'ADMIN_ROLE',
      name: 'Bob2'
    }

    const response = await api.post('/api/users')
      .send(newUser)
      .expect('Content-Type', /application\/json/)
      .expect(482)
    console.log(response.body)
    const { user } = response.body

    const { users } = await getAllContentFromUsers()

    expect(user.name).toEqual('Bob2')
    expect(typeof (user.creationDate)).toEqual(typeof (Date()))

    expect(users.length).toEqual(initialUsers.length + 1)
  })

  test('User email exists in DB', async () => {
    const newUser = {
      active: true,
      email: 'alice@test.com',
      password: 'ABCDEF',
      role: 'ADMIN_ROLE',
      name: 'AliceII'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect('Content-Type', /application\/json/)
      .expect(400)
  })
})
