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

  const parseAmount = parseInt(amount);

  await userSender.update({ amount: userSender.amount - parseAmount });
  await userReceiver.update({ amount: userReceiver.amount + parseAmount });

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
