const { Schema, model } = require('mongoose')

const systemValues = ['phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other']
const useValues = ['home' | 'work' | 'temp' | 'old' | 'mobile']

const ContactPointSchema = Schema({
  system: { type: String, enum: systemValues },
  value: { type: String },
  use: { type: String, enum: useValues },
  rank: { type: Number }, // Specify preferred order of use (1 = highest)
  period: { type: Schema.Types.ObjectId, ref: 'Period' }

})

module.exports = model('Contact Point', ContactPointSchema)
