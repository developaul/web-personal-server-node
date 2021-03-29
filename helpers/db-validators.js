const {
  Role,
  User
} = require('../models');

const isValidRole = async (role = '') => {

  const roleExists = await Role.findOne({ role });

  if (!roleExists) {
    throw new Error(`El rol ${role} no esta registrado en la Base de Datos`);
  }

}

const emailExists = async (email = '') => {

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error(`El correo: ${email}, ya está registrado`);
  }

}

module.exports = {
  isValidRole,
  emailExists
}