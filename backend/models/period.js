const { Schema } = require('mongoose')

const PeriodSchema = Schema({
  start: { type: Date },
  end: { type: Date }
}, { _id: false })

PeriodSchema.methods.toJSON = function () {
  const { __v, _id, status, ...period } = this.toObject()
  period.iid = _id
  return period
}

module.exports = PeriodSchema
