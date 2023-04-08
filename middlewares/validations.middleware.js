const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('El nombre no puede estar vacío'),
  body('password')
    .notEmpty()
    .withMessage('La contraseña no puede estar vacía')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  validFields,
];

exports.loginUserValidation = [
  body('accountNumber')
    .notEmpty()
    .withMessage('El número de cuenta no puede estar vacío')
    .isLength({ min: 6 })
    .withMessage('El número de cuenta debe tener al menos 6 caracteres'),
  body('password')
    .notEmpty()
    .withMessage('La contraseña no puede estar vacía')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  validFields,
];

exports.TransferValidation = [
  body('amount')
    .notEmpty()
    .withMessage('Amount cannot be empty')
    .isNumeric()
    .withMessage('Amount must be a number'),

  body('senderAccount')
    .notEmpty()
    .withMessage('Sender account cannot be empty')
    .isLength({ min: 6 })
    .withMessage('Sender account must be at least 6 characters long'),

  body('receiverAccount')
    .notEmpty()
    .withMessage('Receiver account cannot be empty')
    .isLength({ min: 6 })
    .withMessage('Receiver account must be at least 6 characters long'),

  validFields,
];
