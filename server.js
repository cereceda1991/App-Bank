// Importamos la librería dotenv para cargar las variables de entorno del archivo .env
require('dotenv').config();

// Importamos el archivo app.js que contiene nuestra aplicación
const app = require('./app');

// Importamos la configuración de nuestra base de datos desde el archivo config.js en la carpeta database
const { db } = require('./database/config');

// Autenticamos nuestra base de datos y mostramos un mensaje si la autenticación ha sido exitosa o si ha habido un error
db.authenticate()
  .then(() => console.log('Database Authenticated!'))
  .catch((error) => console.log(error));

// Sincronizamos nuestra base de datos y mostramos un mensaje si la sincronización ha sido exitosa o si ha habido un error
db.sync()
  .then(() => console.log('Database Synced!'))
  .catch((error) => console.log(error));

// Definimos el puerto de escucha de nuestra aplicación, que se obtiene del archivo .env o es 3200 si no se especifica en el archivo
const port = +process.env.PORT || 3200;

// Iniciamos la escucha de nuestra aplicación en el puerto especificado y mostramos un mensaje en la consola indicando el puerto en el que se está ejecutando la aplicación
app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
