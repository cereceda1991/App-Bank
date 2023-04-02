const { Op } = require('sequelize');

const User = require('../models/users.model');
const Transfer = require('../models/transfer.model');

exports.register = async (req, res, next) => {
  const { name, password } = req.body;

  const user = await User.create({
    name,
    password,
  });

  res.status(201).json({
    status: 'success',
    message: 'The user has been created succesfully!',
  });
};

exports.login = async (req, res, next) => {
  const { accountNumber, password } = req.body;

  const user = await User.findOne({
    where: {
      accountNumber,
      password,
      status: 'active',
    },
  });

  if (!user)
    return res.status(404).json({
      status: 'error',
      message: `Invalid password or account number`,
    });

  res.status(201).json({
    status: 'success',
    message: `login successfully 🤞`,
    user,
  });
};

exports.findById = async (req, res) => {
  const { id } = req.params;

  // Busca el usuario en la base de datos
  const user = await User.findByPk(id);

  if (!user) {
    // Si el usuario no existe, responde con un error 404
    return res.status(404).json({
      status: 'Error',
      message: 'Usuario no encontrado',
    });
  }

  // Busca todas las transferencias donde el usuario es el remitente o el destinatario
  const historyTransfer = await Transfer.findAll({
    where: {
      [Op.or]: [{ senderUserId: id }, { receiverUserId: id }],
    },
  });

  if (historyTransfer.length === 0) {
    // Si el usuario no tiene historial, responde con un mensaje
    return res.status(400).json({
      status: 'Error',
      message: `User with id ${id} has no transfer history`,
    });
  }

  res.json(historyTransfer);
};
