const { Router } = require('express')
const login = require('../controllers/auth')

const router = Router()

router.get('/', login)

module.exports = router
