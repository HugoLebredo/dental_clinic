const { Router } = require('express')
// const { check } = require('express-validator')
const { validateJWT } = require('../middlewares/validate-jwt')
// const { validateFields } = require('../middlewares/validate-fields')

const {
  practitionersGet,
  practitionerGet,
  practitionerPut,
  practitionerCreate,
  practitionerDelete
} = require('../controllers/practitioner')

// const { isEmailOk } = require('../helpers/db-validators')

const router = Router()

router.get('/', [validateJWT], practitionersGet)

router.get('/:id', practitionerGet)

router.put('/:id', practitionerPut)

router.post('/', practitionerCreate)

router.delete('/:id', practitionerDelete)

module.exports = router
