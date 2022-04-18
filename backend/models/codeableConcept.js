const { Schema } = require('mongoose')

const CodingSchema = require('./coding')

const CodeableConceptSchema = Schema({
  coding: [CodingSchema],
  text: { type: String }
}, { _id: false })

CodeableConceptSchema.methods.toJSON = function () {
  const { __v, _id, status, ...coding } = this.toObject()
  coding.iid = _id
  return coding
}

module.exports = CodeableConceptSchema
