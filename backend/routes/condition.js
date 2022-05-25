const { Router } = require('express')
// const { check } = require('express-validator')

// const { validateFields } = require('../middlewares/validate-fields')

const {
  conditionsGet,
  conditionCreate
} = require('../controllers/condition')

// const { isEmailOk } = require('../helpers/db-validators')

const router = Router()

router.get('/', conditionsGet)

router.post('/', conditionCreate)

module.exports = router
