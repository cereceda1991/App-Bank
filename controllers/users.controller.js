const User = require('../models/users.model');
const Transfer = require('../models/transfer.model');

const catchAsync = require('../utils/catchasync');

exports.register = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  const user = await User.create({
    name,
    password,
  });

  res.status(201).json({
    status: 'success',
    message: 'The user has been created succesfully!',
  });
});

exports.login = catchAsync(async (req, res, next) => {
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
    message: `Login successfully 🤞`,
    user,
  });
});

exports.findById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  const userTransfer = await Transfer.findAll({
    where: {
      senderUserId: id,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  res.status(200).json({
    message: 'Successful request',
    userTransfer,
  });
});
exports.delete = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }

  await user.update({
    status: 'disabled',
  });

  return res.status(200).json({
    status: 'success',
    message: 'User has been disabled',
  });
});
