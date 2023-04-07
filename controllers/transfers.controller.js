const User = require('../models/users.model');
const Transfer = require('../models/transfer.model');
const catchAsync = require('../utils/catchasync');

exports.sendTransfer = catchAsync(async (req, res) => {
  const { amount, senderAccount, receiverAccount } = req.body;

  const userSender = await User.findOne({
    where: {
      accountNumber: senderAccount,
    },
  });

  const userReceiver = await User.findOne({
    where: {
      accountNumber: receiverAccount,
    },
  });

  if (!userSender) {
    return res.status(400).json({
      status: 'Error',
      message: 'Account number does not exist',
    });
  }

  if (!userReceiver) {
    return res.status(400).json({
      status: 'Error',
      message: 'Destination account number not found',
    });
  }

  if (userSender.accountNumber === userReceiver.accountNumber) {
    return res.status(400).json({
      status: 'Error',
      message:
        'The output account cannot be the same as the destination account',
    });
  }

  if (userSender.amount < amount) {
    return res.status(400).json({
      status: 'error',
      message: 'Insufficient balance',
    });
  }

  await Promise.all([
    userSender.update({ amount: userSender.amount - amount }),
    userReceiver.update({ amount: userReceiver.amount + amount }),
  ]);

  await Transfer.create({
    amount,
    senderUserId: userSender.id,
    receiverUserId: userReceiver.id,
  });

  res.status(201).json({
    status: 'Success',
    message: 'Successful transfer',
  });
});
