const express = require('express');

const routerTransfer = express.Router();

const transferController = require('../controllers/transfers.controller');
const { handleTransferErrors } = require('../middlewares/transfer.middleware');

routerTransfer.post('/', handleTransferErrors, transferController.sendTransfer);

module.exports = routerTransfer;
