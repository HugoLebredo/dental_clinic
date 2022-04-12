const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  active: { type: Boolean },
  name: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String }
})

UserSchema.methods.toJSON = function () {
  const { __v, _id, status, ...patient } = this.toObject()
  patient.iid = _id
  return patient
}

module.exports = model('User', UserSchema)
