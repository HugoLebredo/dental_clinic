const { Schema } = require('mongoose')

const CodingSchema = Schema({
  system: { type: String },
  version: { type: String },
  code: { type: String },
  display: [{ type: Boolean }]
}, { _id: false })

CodingSchema.methods.toJSON = function () {
  const { __v, _id, status, ...coding } = this.toObject()
  coding.iid = _id
  return coding
}

module.exports = CodingSchema
