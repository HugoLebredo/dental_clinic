const { Router } = require('express')
// const { check } = require('express-validator')
const { validateJWT } = require('../middlewares/validate-jwt')
// const { validateFields } = require('../middlewares/validate-fields')

const {
  conditionsGet,
  conditionCreate,
  MedicalHistoryPatient
} = require('../controllers/condition')

// const { isEmailOk } = require('../helpers/db-validators')

const router = Router()

router.get('/', [validateJWT], conditionsGet)

router.post('/', [validateJWT], conditionCreate)

router.get('/history/:id', [validateJWT], MedicalHistoryPatient)

module.exports = router
