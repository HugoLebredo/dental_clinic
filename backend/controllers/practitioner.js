const { response, request } = require('express')

const Practitioner = require('../models/practitioner')

const practitionersGet = async (req = request, res = response) => {
  const queryStatements = { status: true }

  const [total, practitioners] = await Promise.all([
    Practitioner.countDocuments(queryStatements),
    Practitioner.find(queryStatements)
  ])
  console.log({ total, practitioners })
  res.json({
    total,
    practitioners
  })
}

const practitionerGet = async (req, res = response) => {
  const { id } = req.params

  const practitioner = await Practitioner.findById(id)

  res.status(200).json({
    practitioner
  })
}

const practitionerPut = async (req = request, res = response) => {
  try {
    const { id } = req.params

    const { _id, ...other } = req.body

    const practitionerDB = await Practitioner.findByIdAndUpdate(id, other)

    res.status(200).json({
      message: 'resource updated successfully',
      practitionerDB
    })
  } catch (err) {
    res.json({ msg: err })
  }
}

const practitionerCreate = async (req, res = response) => {
  console.log('dentro practitionerCreate')
  try {
    const { ...body } = req.body
    const practitioner = new Practitioner(body)

    practitioner.creationDate = new Date()

    // save user
    await practitioner.save()

    res.status(201).json({
      message: 'post API - controller',
      practitioner
    })
  } catch (err) {
    res.status(400).json({ msg: err })
  }
}

const practitionerDelete = async (req, res = response) => {
  const { id } = req.params

  const updatedFields = {
    status: false
  }

  await Practitioner.findByIdAndUpdate(id, updatedFields)

  res.status(204).json({})
}

module.exports = {
  practitionersGet,
  practitionerGet,
  practitionerPut,
  practitionerCreate,
  practitionerDelete

}
