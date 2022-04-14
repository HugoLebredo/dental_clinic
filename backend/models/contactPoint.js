const { Schema } = require('mongoose')

const systemValues = ['phone', 'fax', 'email', 'pager', 'url', 'sms', 'other']
const useValues = ['home', 'work', 'temp', 'old', 'mobile']

const ContactPointSchema = Schema({
  system: { type: String, enum: systemValues },
  value: { type: String },
  use: { type: String, enum: useValues },
  rank: { type: Number }, // Specify preferred order of use (1 = highest)
  period: { type: Schema.Types.ObjectId, ref: 'Period' }

})

ContactPointSchema.methods.toJSON = function () {
  const { __v, _id, status, ...contactPoint } = this.toObject()
  contactPoint.iid = _id
  return contactPoint
}

module.exports = ContactPointSchema
