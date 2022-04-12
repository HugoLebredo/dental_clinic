const { Schema, model } = require('mongoose')

const genderValues = ['male' | 'female' | 'other' | 'unknown']

const PatientSchema = Schema({
  active: { type: Boolean },
  name: [{ type: Schema.Types.ObjectId, ref: 'Human Name' }],
  telecom: [{ type: Schema.Types.ObjectId, ref: 'Contact Point' }],
  gender: { type: String, enum: genderValues },
  birthDate: { type: Date }
})

PatientSchema.methods.toJSON = function () {
  const { __v, _id, status, ...patient } = this.toObject()
  patient.iid = _id
  return patient
}

module.exports = model('Patient', PatientSchema)
