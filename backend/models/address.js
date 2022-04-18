const { Schema } = require('mongoose')

const PeriodSchema = require('./period')

const useType = ['postal', 'physical', 'both']
const useValues = ['home', 'work', 'temp', 'old', 'billing']

const AddressSchema = Schema({
  use: { type: String, enum: useValues, require: true },
  type: { type: String, enum: useType, require: true },
  text: { type: String },
  line: [{ type: String }],
  city: { type: String },
  district: { type: String },
  postalCode: { type: String },
  country: { type: String },
  period: PeriodSchema
}, { _id: false })

AddressSchema.methods.toJSON = function () {
  const { __v, _id, status, ...address } = this.toObject()
  address.iid = _id
  return address
}

module.exports = AddressSchema
