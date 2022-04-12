const mongoose = require('mongoose')

const Patient = require('../models/patient')

const { app, api, getAllContentFromProfiles } = require('./helpers')

const initialPatients = require('./mockdata/patients.json')

beforeEach(async () => {
  await Patient.deleteMany({})

  for (const patient of initialPatients) {
    const patientObject = new Patient(patient)
    await patientObject.save()
  }
})

afterAll(() => {
  mongoose.connection.close()
  app.listen().close()
})

describe('Get profiles', () => {
  test('Profiles are returned as JSON', async () => {
    await api
      .get('/api/people')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test(`There are ${initialPatients.length} profiles`, async () => {
    const { profiles } = await getAllContentFromProfiles()

    expect(profiles).toHaveLength(initialPatients.length)
  })
})

describe('Get one profile', () => {
  test(`Pick up profile with name: ${initialPatients[0].name}`, async () => {
    const { ids } = await getAllContentFromProfiles()

    const response = await api.get(`/api/people/${ids[0]}`)

    const { profile } = response.body

    expect(profile.name).toEqual(initialPatients[0].name)
  })
})

describe('Delete one record', () => {
  test(`Change rec.status = false in record ${initialPatients[0].name}`, async () => {
    const { ids } = await getAllContentFromProfiles()

    await api.delete(`/api/people/${ids[0]}`)
      .expect(204)
  })
})

describe('Create profile', () => {
  test('Create fine', async () => {
    const newProfile = {
      name: 'Hugo Lebredo',
      affiliation: 'Member',
      role: 'Researcher',
      education: 'PhD Student',
      img: 'images/people/HugoLebredo.png',
      social: {
        email: 'lebredohugo@uniovi.es',
        linkedin: 'https://www.linkedin.com/in/hugolebredo',
        github: 'https://github.com/hugolebredo'
      }
    }

    const response = await api.post('/api/people')
      .send(newProfile)
      .expect(201)

    const { profile } = response.body

    const { profiles } = await getAllContentFromProfiles()

    expect(profile.name).toEqual('Hugo Lebredo')
    expect(typeof (profile.creationDate)).toEqual(typeof (Date()))

    expect(profiles.length).toEqual(initialPatients.length + 1)
  })

  test('Try to create a project without name 🚨', async () => {
    const newProfile = {
      affiliation: 'Member',
      role: 'Researcher',
      education: 'PhD Student',
      img: 'images/people/HugoLebredo.png',
      social: {
        email: 'lebredohugo@uniovi.es',
        linkedin: 'https://www.linkedin.com/in/hugolebredo',
        github: 'https://github.com/hugolebredo'
      }
    }

    const response = await api.post('/api/people')
      .send(newProfile)
      .expect(400)

    const { errors } = response.body

    const { profiles } = await getAllContentFromProfiles()

    expect(errors.length).toEqual(1)

    expect(profiles.length).toEqual(initialPatients.length)
  })
})

describe('Update patient', () => {
  test(`Update correctly patient ${initialPatients[0].name}`, async () => {
    const newValues = {
      name: 'John',
      familyname: 'Doe'

    }

    const { ids } = await getAllContentFromProfiles()

    const response = await api.put(`/api/patients/${ids[0]}`)
      .send(newValues)
      .expect(200)

    const { patients } = await getAllContentFromProfiles()

    const { message } = response.body

    expect(patients[0].name).toEqual(newValues.name)
    expect(message).toEqual('resource updated successfully')
  })
})
