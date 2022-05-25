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

module.exports = {
  conditionsGet,
  conditionCreate
}
