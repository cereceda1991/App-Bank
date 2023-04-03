const { DataTypes } = require('sequelize'); // importamos DataTypes de sequelize
const { db } = require('../database/config'); // importamos la configuración de la base de datos

// Definición del modelo de la tabla 'transfers' en la base de datos
const Transfer = db.define('transfers', {
  id: {
    primaryKey: true, // Clave primaria
    type: DataTypes.INTEGER, // Tipo de dato: número entero
    autoIncrement: true, // Se incrementa automáticamente con cada nuevo registro
    allowNull: false, // No se permite el valor nulo
  },
  amount: {
    type: DataTypes.INTEGER, // Tipo de dato: número entero
    allowNull: false, // No se permite el valor nulo
  },
  senderUserId: {
    type: DataTypes.INTEGER, // Tipo de dato: número entero
    allowNull: false, // No se permite el valor nulo
  },
  receiverUserId: {
    type: DataTypes.INTEGER, // Tipo de dato: número entero
    allowNull: false, // No se permite el valor nulo
  },
});

module.exports = Transfer; // Exportar el modelo para su uso en otras partes de la aplicación
