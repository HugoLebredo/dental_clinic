const { Router } = require('express')
// const { check } = require('express-validator')

// const { validateFields } = require('../middlewares/validate-fields')

const {
  conditionsGet,
  conditionCreate,
  MedicalHistoryPatient
} = require('../controllers/condition')

// const { isEmailOk } = require('../helpers/db-validators')

const router = Router()

router.get('/', conditionsGet)

router.post('/', conditionCreate)

router.get('/history/:id', MedicalHistoryPatient)

module.exports = router
