const { Schema, model } = require('mongoose')

const AddressSchema = require('./address')
const ContactPointSchema = require('./contactPoint')
const humanNameSchema = require('./humanName')
const IdentifierSchema = require('./identifier')

const genderValues = ['male', 'female', 'other', 'unknown']

const PatientSchema = Schema({
  identifier: [IdentifierSchema],
  active: { type: Boolean },
  name: [humanNameSchema],
  telecom: [ContactPointSchema],
  gender: { type: String, enum: genderValues },
  birthDate: { type: Date },
  address: [AddressSchema]
})

PatientSchema.methods.toJSON = function () {
  const { __v, _id, status, ...patient } = this.toObject()
  patient.iid = _id
  return patient
}

module.exports = model('Patient', PatientSchema)
