// Importamos el módulo Sequelize
const { Sequelize } = require('sequelize');

// Creamos una nueva instancia de Sequelize y configuramos la base de datos
const db = new Sequelize({
  dialect: process.env.DB_DIALECT, // Dialecto de la base de datos (mysql, postgres, etc.)
  host: process.env.DB_HOST, // Dirección del servidor de la base de datos
  username: process.env.DB_USERNAME, // Nombre de usuario de la base de datos
  password: process.env.DB_PASSWORD, // Contraseña de la base de datos
  database: process.env.DB_DATABASE, // Nombre de la base de datos
  logging: false, // Desactiva el registro de consultas SQL en la consola
});

module.exports = { db };
// Este módulo exporta un objeto db que contiene una instancia de Sequelize configurada para conectarse a la base de datos. La configuración se realiza a través de variables de entorno, que se leen desde el archivo .env. La opción logging se establece en false para desactivar la impresión de consultas SQL en la consola.
