const { Schema } = require('mongoose')

const useValues = ['usual', 'official', 'temp', 'nickname', 'anonymous', 'old', 'maiden']

const HumanNameSchema = Schema({
  use: { type: String, enum: useValues },
  text: { type: String },
  family: { type: String },
  given: [{ type: String }],
  prefix: [{ type: String }],
  suffix: [{ type: String }]
  // period: { type: Schema.Types.ObjectId, ref: 'Period' }
}, { _id: false })

HumanNameSchema.methods.toJSON = function () {
  const { __v, _id, status, ...humanName } = this.toObject()
  humanName.iid = _id
  return humanName
}

module.exports = HumanNameSchema
