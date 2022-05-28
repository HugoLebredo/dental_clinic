const { response, request } = require('express')

const Condition = require('../models/condition')

const conditionsGet = async (req = request, res = response) => {
  const queryStatements = { status: true }

  const [total, conditions] = await Promise.all([
    Condition.countDocuments(queryStatements),
    Condition.find(queryStatements)
  ])

  res.json({
    total,
    conditions
  })
}

const conditionCreate = async (req, res = response) => {
  try {
    const { ...body } = req.body
    const condition = new Condition(body)

    condition.recordedDate = new Date()

    // save user
    await condition.save()

    res.status(201).json({
      message: 'post API - controller',
      condition
    })
  } catch (err) {
    res.status(400).json({ msg: err })
  }
}

const MedicalHistoryPatient = async (req, res = response) => {
  // const { id } = req.params
  const medHistory = await Condition.find(
    { id: 'textExample' }
    /* {
      identifier: {
        $elemMatch: {
          system: 'urn:oid:1.2.36.146.595.217.0.1',
          value: 'ID12345'
        }
      }
    } */)
  console.log({ medHistory })
  res.status(200).json({
    medHistory: 'hisrtorial'
  })
}

module.exports = {
  conditionsGet,
  conditionCreate,
  MedicalHistoryPatient
}
