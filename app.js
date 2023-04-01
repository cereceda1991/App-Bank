const express = require('express');

//Importaciones
const authRouter = require('./routes/auth.routes');

const app = express();
app.use(express.json());
//rutas
app.use('/api/v1/auth', authRouter);

module.exports = app;
