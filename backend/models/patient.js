const { Schema, model } = require('mongoose')

const ContactPoint = require('./contactPoint')
const humanNameSchema = require('./humanName')

const genderValues = ['male', 'female', 'other', 'unknown']

const PatientSchema = Schema({
  dni: { type: String, require: true },
  active: { type: Boolean },
  name: [humanNameSchema],
  telecom: [ContactPoint],
  gender: { type: String, enum: genderValues },
  birthDate: { type: Date }
})

PatientSchema.methods.toJSON = function () {
  const { __v, _id, status, ...patient } = this.toObject()
  patient.iid = _id
  return patient
}

module.exports = model('Patient', PatientSchema)
