// Importación del modelo de usuarios
const User = require('../models/users.model');
// Importación del modelo de transferencias
const Transfer = require('../models/transfer.model');

// Creamos la función que realizará la transferencia entre cuentas bancarias
exports.sendTransfer = async (req, res) => {
  // Obtiene el monto, la cuenta del remitente y la cuenta del receptor del cuerpo de la solicitud desde Postman
  const { amount, senderAccount, receiverAccount } = req.body;

  // Encuentra al usuario remitente por su número de cuenta
  const userSender = await User.findOne({
    where: {
      accountNumber: senderAccount,
    },
  });

  // Encuentra al usuario receptor por su número de cuenta
  const userReceiver = await User.findOne({
    where: {
      accountNumber: receiverAccount,
    },
  });

  // Validación de existencia de la cuenta de salida del dinero
  if (!userSender) {
    return res.status(400).json({
      status: 'Error',
      message: 'Account number does not exist',
    });
  }

  // Validación de existencia del destinatario
  if (!userReceiver) {
    return res.status(400).json({
      status: 'Error',
      message: 'Destination account number not found',
    });
  }

  // Validación de que la cuenta de salida no sea igual a la cuenta de destino
  if (userSender.accountNumber === userReceiver.accountNumber) {
    return res.status(400).json({
      status: 'Error',
      message:
        'The output account cannot be the same as the destination account',
    });
  }

  // Validación de que el saldo de la cuenta de salida sea suficiente para realizar la transferencia
  if (userSender.amount < amount) {
    return res.status(400).json({
      status: 'error',
      message: 'Insufficient balance',
    });
  }

  // Actualiza los montos de ambos usuarios en una sola operación atómica con la función Promise de JS
  await Promise.all([
    userSender.update({ amount: userSender.amount - amount }),
    userReceiver.update({ amount: userReceiver.amount + amount }),
  ]);

  // Crea un registro de transferencia con el monto, el ID del remitente y el ID del receptor
  await Transfer.create({
    amount,
    senderUserId: userSender.id,
    receiverUserId: userReceiver.id,
  });

  // Envía una respuesta exitosa
  res.status(200).json({
    status: 'Success',
    message: 'Successful transfer',
  });
};
