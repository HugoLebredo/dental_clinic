const { Schema, model } = require('mongoose')

const useValues = ['usual' | 'official' | 'temp' | 'nickname' | 'anonymous' | 'old' | 'maiden']

const HumanNameSchema = Schema({
  use: { type: String, enum: useValues },
  text: { type: String },
  family: { type: String },
  given: [{ type: String }],
  prefix: [{ type: String }],
  suffix: [{ type: String }],
  period: { type: Schema.Types.ObjectId, ref: 'Period' }

})

HumanNameSchema.methods.toJSON = function () {
  const { __v, _id, status, ...profile } = this.toObject()
  profile.iid = _id
  return profile
}

module.exports = model('Human Name', HumanNameSchema)
