const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const { User } = require('../models');

const signUp = async (req = request, res = response) => {

  const { name, lastname, email, password, role } = req.body;

  try {

    const user = new User({ name, lastname, email, password, role });

    // Encriptar Password
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(user.password, salt);

    await user.save();

    res.status(201).json({
      ok: true,
      user
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });

  }

}

module.exports = {
  signUp
}