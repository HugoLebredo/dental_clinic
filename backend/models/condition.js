const { Schema, model } = require('mongoose')

const CodeableConceptSchema = require('./codeableConcept')
const IdentifierSchema = require('./identifier')
const ReferenceSchema = require('./reference')

// const clinicalStatusValues = ['active', 'recurrence', 'relapse', 'inactive', 'remission', 'resolved']

const ConditionSchema = Schema({
  identifier: [IdentifierSchema],
  clinicalStatus: [CodeableConceptSchema],
  verificationStatus: [CodeableConceptSchema],
  category: [CodeableConceptSchema],
  severity: CodeableConceptSchema,
  code: CodeableConceptSchema,
  bodySite: [CodeableConceptSchema],
  subject: ReferenceSchema,
  onsetDateTime: { type: Date },
  recordedDate: { type: Date }
})

ConditionSchema.methods.toJSON = function () {
  const { __v, _id, status, ...condition } = this.toObject()
  condition.iid = _id
  return condition
}

module.exports = model('Condition', ConditionSchema)
