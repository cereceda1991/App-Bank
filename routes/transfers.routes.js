// Se importa el módulo express
const express = require('express');

// Se crea una instancia del router de express
const routerTransfer = express.Router();

// Se importa el controlador de transferencias desde el archivo correspondiente
const transferController = require('../controllers/transfers.controller');

// Se define una ruta para el envío de transferencias a través del método POST
routerTransfer.post('/', transferController.sendTransfer);

// Se exporta el router para que pueda ser utilizado en otros archivos
module.exports = routerTransfer;
