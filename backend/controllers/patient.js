const { response, request } = require('express')

const Patient = require('../models/patient')

const patientsGet = async (req = request, res = response) => {
  const queryStatements = { status: true }

  const [total, patients] = await Promise.all([
    Patient.countDocuments(queryStatements),
    Patient.find(queryStatements)
  ])

  res.json({
    total,
    patients
  })
}

const patientGet = async (req, res = response) => {
  const { id } = req.params

  const patient = await Patient.findById(id)

  res.status(200).json({
    patient
  })
}

const patientPut = async (req = request, res = response) => {
  try {
    const { id } = req.params

    const { _id, ...other } = req.body

    const patientDB = await Patient.findByIdAndUpdate(id, other)

    res.status(200).json({
      message: 'resource updated successfully',
      patientDB
    })
  } catch (err) {
    res.json({ msg: err })
  }
}

const patientCreate = async (req, res = response) => {
  console.log('dentro patientCreate')
  try {
    const { ...body } = req.body
    const patient = new Patient(body)

    patient.creationDate = new Date()

    // save user
    await patient.save()

    res.status(201).json({
      message: 'post API - controller',
      patient
    })
  } catch (err) {
    res.status(400).json({ msg: err })
  }
}

const patientDelete = async (req, res = response) => {
  const { id } = req.params

  const updatedFields = {
    status: false
  }

  await Patient.findByIdAndUpdate(id, updatedFields)

  res.status(204).json({})
}

module.exports = {
  patientsGet,
  patientGet,
  patientPut,
  patientCreate,
  patientDelete

}
