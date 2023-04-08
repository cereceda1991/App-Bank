const User = require('../models/users.model');
const Transfer = require('../models/transfer.model');
const catchAsync = require('../utils/catchasync');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  const user = await User.create({
    name,
    password,
  });

  res.status(201).json({
    status: 'success',
    message: 'The user has been created successfully!',
    user,
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

  res.status(201).json({
    status: 'success',
    message: `Login successfully 🤞`,
    user,
  });
});

exports.findById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const userTransfer = await Transfer.findAll({
    where: {
      senderUserId: id,
    },
  });

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

  await user.update({
    status: 'disabled',
  });

  return res.status(200).json({
    status: 'success',
    message: 'User has been disabled',
  });
});
