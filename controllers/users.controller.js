const { Op } = require('sequelize'); //Importamos el Operador "OR" de Sequelize

const User = require('../models/users.model'); // Importación del modelo de usuarios

const Transfer = require('../models/transfer.model'); // Importación del modelo de transferencias

// Creamos una función para registrar un nuevo usuario
exports.register = async (req, res, next) => {
  const { name, password } = req.body;

  // Crea un nuevo usuario en la base de datos
  const user = await User.create({
    name,
    password,
  });

  // Responde con un mensaje de éxito
  res.status(201).json({
    status: 'success',
    message: 'The user has been created succesfully!',
  });
};

// Creamos un función para autenticar un usuario y permitirle iniciar sesión
exports.login = async (req, res, next) => {
  const { accountNumber, password } = req.body;

  // Busca el usuario en la base de datos por su número de cuenta y contraseña
  const user = await User.findOne({
    where: {
      accountNumber,
      password,
      status: 'active',
    },
  });

  // Si el usuario no existe o su contraseña es incorrecta, responde con un error
  if (!user)
    return res.status(404).json({
      status: 'error',
      message: `Invalid password or account number`,
    });

  // Si el usuario existe y la contraseña es correcta, responde con un mensaje de éxito y el usuario autenticado
  res.status(201).json({
    status: 'success',
    message: `Login successfully 🤞`,
    user,
  });
};

//Creamos una función para buscar un usuario y su historial de transferencias por su id
exports.findById = async (req, res) => {
  const { id } = req.params;

  // Busca el usuario en la base de datos por su Id
  const user = await User.findOne({
    where: {
      id,
    },
  });

  // Si el usuario no existe, responde con un error 404
  if (!user) {
    return res.status(404).json({
      status: 'Error',
      message: 'User not found',
    });
  }

  // Busca todas las transferencias donde el usuario es el remitente o el destinatario, usando el Op.or de Sequelize
  const historyTransfer = await Transfer.findAll({
    where: {
      [Op.or]: [{ senderUserId: id }, { receiverUserId: id }],
    },
  });

  // Si el usuario no tiene historial, responde con un mensaje
  if (historyTransfer.length === 0) {
    return res.status(400).json({
      status: 'Error',
      message: `User with id ${id} has no transfer history`,
    });
  }

  // Si el usuario existe y tiene historial, responde con un mensaje de éxito y el historial de transferencias
  res.status(200).json({
    status: 'Succces',
    message: 'Successful request',
    results: historyTransfer.length,
    historyTransfer,
  });
};

// Creamos una función que deshabilita a un usuario por su id
exports.delete = async (req, res) => {
  // Obtenemos el id del usuario a desactivar desde los parámetros de la solicitud (endpoint)
  const { id } = req.params;

  // Buscamos al usuario en la base de datos por su id
  const user = await User.findOne({
    where: { id },
  });

  // Si el usuario no existe, respondemos con un error 404
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }

  // Desactivamos al usuario actualizando su estado a "disabled"
  await user.update({
    status: 'disabled',
  });

  // Respondemos con un mensaje de éxito
  return res.status(200).json({
    status: 'success',
    message: 'User has been disabled',
  });
};
