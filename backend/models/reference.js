const { Schema } = require('mongoose')

const identifier = require('./identifier')

const ReferenceSchema = Schema({
  reference: { type: String },
  type: { type: String },
  indentifier: identifier,
  display: { type: String } // Specify preferred order of use (1 = highest)
}, { _id: false })

ReferenceSchema.methods.toJSON = function () {
  const { __v, _id, status, ...reference } = this.toObject()
  reference.iid = _id
  return reference
}

module.exports = ReferenceSchema
