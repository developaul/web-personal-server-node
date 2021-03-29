const { Router } = require('express');
const { check } = require('express-validator');

const { emailExists, isValidRole } = require('../helpers');
const { validateFields } = require('../middlewares');
const { signUp } = require('../controllers');

const router = Router();

router.post(
  '/sign-up',
  [
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('lastname', 'El nombre es obligatorio').notEmpty(),
    check('role', 'El role es obligatorio').notEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña debe de tener como minimo 6 caracteres').isLength({ min: 6 }),
    check('email').custom(emailExists),
    check('role').custom(isValidRole),
    validateFields
  ],
  signUp
);

module.exports = router;