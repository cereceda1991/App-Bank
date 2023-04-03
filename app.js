// Importamos el paquete Express, que es un framework web para Node.js.

const express = require('express');

// Importamos el paquete CORS, que es un middleware para Express que permite la comunicación entre distintos dominios.
const cors = require('cors');

// Importamos los módulos que contienen las rutas relacionadas con los usuarios y las transferencias.

const usersRouter = require('./routes/users.routes');
const transferRouter = require('./routes/transfers.routes');

// Inicializamos una nueva aplicación Express.

const app = express();

// Utilizamos el middleware express.json() para parsear las solicitudes HTTP con formato JSON.

app.use(express.json());

// Configuramos el middleware CORS para permitir solicitudes desde http://localhost:5173.
//Con esto podemos usar cualquiera de los endpoint desde el frontend

app.use(cors({ origin: 'http://localhost:5173' }));

// Utilizamos las rutas importadas y les asignamos una URL base.

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/transfers', transferRouter);

// Exportamos la aplicación Express para que pueda ser utilizada en otros módulos.
module.exports = app;
