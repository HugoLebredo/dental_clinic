const { Router } = require('express')
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

router.get('/', patientsGet)

router.get('/:id', patientGet)

router.put('/:id', patientPut)

router.post('/', patientCreate)

router.delete('/:id', patientDelete)

module.exports = router
