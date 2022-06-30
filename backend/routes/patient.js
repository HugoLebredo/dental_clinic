const { Router } = require('express')

const { validateJWT } = require('../middlewares/validate-jwt')
// const { check } = require('express-validator')

// const { validateFields } = require('../middlewares/validate-fields')

const {
  patientsGet,
  patientGet,
  patientPut,
  patientCreate,
  patientDelete
} = require('../controllers/patient')

// const { isEmailOk } = require('../helpers/db-validators')

const router = Router()

router.get('/', [validateJWT], patientsGet)

router.get('/:id', [validateJWT], patientGet)

router.put('/:id', [validateJWT], patientPut)

router.post('/', [validateJWT], patientCreate)

router.delete('/:id', [validateJWT], patientDelete)

module.exports = router
