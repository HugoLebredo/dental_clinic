const { Schema, model } = require('mongoose')

const AddressSchema = require('./address')
const CodeableConceptSchema = require('./codeableConcept')
const ContactPointSchema = require('./contactPoint')
const humanNameSchema = require('./humanName')
const IdentifierSchema = require('./identifier')
const PeriodSchema = require('./period')

const genderValues = ['male', 'female', 'other', 'unknown']

const PractitionerSchema = Schema({
  identifier: [IdentifierSchema],
  active: { type: Boolean },
  name: [humanNameSchema],
  telecom: [ContactPointSchema],
  gender: { type: String, enum: genderValues },
  birthDate: { type: Date },
  address: [AddressSchema],
  qualification: {
    identifier: [IdentifierSchema],
    code: CodeableConceptSchema,
    period: PeriodSchema
  },
  communication: CodeableConceptSchema
})

PractitionerSchema.methods.toJSON = function () {
  const { __v, _id, status, ...practitioner } = this.toObject()
  practitioner.iid = _id
  return practitioner
}

module.exports = model('Practitioner', PractitionerSchema)
