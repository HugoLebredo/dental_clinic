const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields } = require('../middlewares/validate-fields')

const {
  patientsGet,
  patientGet,
  patientPut,
  patientCreate,
  patientDelete
} = require('../controllers/patient')

const { isEmailOk } = require('../helpers/db-validators')

const router = Router()

router.get('/', patientsGet)

router.get('/:id', patientGet)

router.put('/:id', patientPut)

router.post('/', [
  check('name', 'name is mandatory').not().isEmpty(),
  check('social.email').isEmail(),
  check('social.email').custom(isEmailOk),
  validateFields
], patientCreate)

router.delete('/:id', patientDelete)

module.exports = router
