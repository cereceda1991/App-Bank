const express = require('express');

//Importamos el controlador que manejará las rutas
const usersController = require('../controllers/users.controller');

// Creamos un nuevo objeto Router de express
const router = express.Router();

// Definimos las rutas y las asociamos a los métodos correspondientes del controlador
router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/:id/history', usersController.findById);
router.delete('/:id', usersController.delete);

// Exportamos el objeto router para que pueda ser utilizado en otras partes de la aplicación
module.exports = router;
