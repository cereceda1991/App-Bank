const User = require('../models/users.model');

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
