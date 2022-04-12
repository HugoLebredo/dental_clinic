const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')

const { isEmailOk, existsUserById } = require('../helpers/db-validators')

const {
  usersGet,
  usersPut,
  usersPost,
  usersPatch,
  usersDelete
} = require('../controllers/user')

const router = Router()

router.get('/', usersGet)

router.put('/:id', [
  check('id', 'id is not a valid MongoId value').isMongoId(),
  check('id').custom(existsUserById),
  validateFields
], usersPut)

router.post('/', [
  check('name', 'Name is mandatory').not().isEmpty(),
  check('password', 'Password is mandatory and length >= 6').isLength({ min: 6 }),
  // check('email', 'email is not ok').isEmail(),
  check('email').custom(isEmailOk),
  check('role', 'Role must one of this values ADMIN_ROLE, USER_ROLE').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  // check('role').custom( isRoleOk ),
  validateFields
], usersPost)

router.patch('/', usersPatch)

router.delete('/:id', [
  validateJWT,
  check('id', 'id is not a valid MongoId value').isMongoId(),
  check('id').custom(existsUserById),
  validateFields
], usersDelete)

module.exports = router
