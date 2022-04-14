const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  active: { type: Boolean, required: true },
  name: { type: String, required: true },
  email: { type: String },
  password: { type: String, required: true },
  role: { type: String, required: true, default: true },
  creationDate: { type: Date, required: true, default: new Date() }
})

UserSchema.methods.toJSON = function () {
  const { __v, _id, status, ...user } = this.toObject()
  user.iid = _id
  return user
}

module.exports = model('User', UserSchema)
