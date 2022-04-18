const { Schema } = require('mongoose')

const CodeableConceptSchema = require('./codeableConcept')
const PeriodSchema = require('./period')

const useValues = ['usual', 'official', 'temp', 'secondary', 'old']

const IdentifierSchema = Schema({
  use: { type: String, enum: useValues, require: true },
  type: CodeableConceptSchema,
  system: { type: String },
  value: [{ type: String }],
  period: PeriodSchema
}, { _id: false })

IdentifierSchema.methods.toJSON = function () {
  const { __v, _id, status, ...identifier } = this.toObject()
  identifier.iid = _id
  return identifier
}

module.exports = IdentifierSchema
