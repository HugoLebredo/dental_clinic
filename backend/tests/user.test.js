const mongoose = require('mongoose')

const User = require('../models/user')

const { api, getAllContentFromUsers } = require('./helpers')
const { hashPassword } = require('../helpers/password')
const { server } = require('../app')

const initialUsers = require('./mockdata/users.json')

let token = ''

beforeEach(async () => {
  await User.deleteMany({})

  for (const user of initialUsers) {
    const userObject = new User(user)

    userObject.name = user.name.toUpperCase()
    userObject.email = user.email.toUpperCase()

    userObject.password = hashPassword(userObject.password)

    await userObject.save()
  }

  const response = await api.get('/api/login').send({ name: 'MOCK_ADMIN', password: 'ABCDEF' })

  token = response.body.token
})

afterAll(async () => {
  await User.deleteMany({})
  mongoose.connection.close()
  server.close()
})

describe('Get users', () => {
  test('Users returned as JSON', async () => {
    await api
      .get('/api/users')
      .set('x-token', token)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test(`There are ${initialUsers.length} users`, async () => {
    const { users } = await getAllContentFromUsers(token)

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
      name: 'Bob'
    }

    const response = await api.post('/api/users')
      .set('x-token', token)
      .send(newUser)
      .expect('Content-Type', /application\/json/)
      .expect(201)

    const { user } = response.body

    const { users } = await getAllContentFromUsers(token)

    expect(user.name).toEqual('BOB')
    expect(typeof (user.creationDate)).toEqual(typeof (Date()))

    expect(users.length).toEqual(initialUsers.length + 1)
  })

  test('User exists in DB', async () => {
    const newUser = {
      active: true,
      email: 'alice@test.com',
      password: 'ABCDEF',
      role: 'ADMIN_ROLE',
      name: 'Alice'
    }

    await api.post('/api/users')
      .set('x-token', token)
      .send(newUser)
      .expect('Content-Type', /application\/json/)
      .expect(482)
  })
})
