const { DataTypes } = require('sequelize'); // importamos DataTypes de sequelize
const { db } = require('../database/config'); // importamos la configuración de la base de datos
const generateAccount = require('../utils/generateAccount'); // importamos la función para generar el número de cuenta

const User = db.define('users', {
  // definimos el modelo "users" en la base de datos "db"
  id: {
    // definimos el campo "id"
    primaryKey: true, // lo definimos como clave primaria
    type: DataTypes.INTEGER, // lo definimos como un número entero
    autoIncrement: true, // lo definimos como autoincremental
    allowNull: false, // no permitimos que sea nulo
  },
  name: {
    // definimos el campo "name"
    type: DataTypes.STRING, // lo definimos como una cadena de texto
    allowNull: false, // no permitimos que sea nulo
  },
  accountNumber: {
    // definimos el campo "accountNumber"
    type: DataTypes.STRING, // lo definimos como una cadena de texto
    allowNull: false, // no permitimos que sea nulo
    unique: true, // lo definimos como único
    defaultValue: generateAccount, // le asignamos el valor generado por la función generateAccount
  },
  password: {
    // definimos el campo "password"
    type: DataTypes.STRING, // lo definimos como una cadena de texto
    allowNull: false, // no permitimos que sea nulo
  },
  amount: {
    // definimos el campo "amount"
    type: DataTypes.INTEGER, // lo definimos como un número entero
    allowNull: false, // no permitimos que sea nulo
    defaultValue: 1000, // le asignamos un valor por defecto de 1000
  },
  status: {
    // definimos el campo "status"
    type: DataTypes.ENUM('active', 'disabled'), // lo definimos como un tipo enumerado con los valores 'active' o 'disabled'
    defaultValue: 'active', // le asignamos el valor por defecto de 'active'
    allowNull: false, // no permitimos que sea nulo
  },
});

module.exports = User; // exportamos el modelo "User"
