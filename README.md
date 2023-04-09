# App-Bank

Este es el backend de la aplicación App-Bank. Esta aplicación fue desarrollada como parte de un proyecto en Academlo.

## Documentación de Postman

La documentación completa de la API se encuentra disponible en este [enlace](https://documenter.getpostman.com/view/26338219/2s93XsX5jF).

## Instalación y configuración

1. Clona el repositorio desde GitHub.
2. Instala las dependencias ejecutando el comando `npm install`.
3. Configura las variables de entorno creando un archivo `.env` en la raíz del proyecto y definiendo los valores necesarios. Ejemplo:

#### `DB_DATABASE=bankdata`
#### `DB_USERNAME=postgres`
#### `DB_PASSWORD=1234`
#### `DB_PORT=5432`
#### `DB_DIALECT=postgres`
#### `DB_HOST=localhost`

#### `NODE_ENV=development`

#### `PORT=3000`

4. Ejecuta el servidor con el comando `npm run start:dev`.

## Estructura del proyecto

- `/controllers`: contiene los controladores de cada ruta de la API.
- `/middlewares`: contiene los middlewares utilizados en la API.
- `/models`: contiene los modelos de la base de datos.
- `/routes`: contiene las rutas de la API.
- `/utils`: contiene utilidades para el proyecto, como funciones de autenticación.

## Tecnologías utilizadas

- ![Node.js icon](https://img.icons8.com/color/48/000000/nodejs.png) Node.js
- ![Express.js icon](https://img.icons8.com/color/48/000000/express.png) Express.js
- ![MySQL icon](https://img.icons8.com/color/48/000000/mysql.png) MySQL
- ![JavaScript icon](https://img.icons8.com/color/48/000000/javascript.png) JavaScript
- ![dotenv icon](https://img.icons8.com/color/48/000000/dotenv.png) dotenv
- ![cors icon](https://img.icons8.com/color/48/000000/cors.png) cors
- ![morgan icon](https://img.icons8.com/color/48/000000/console.png) morgan
- ![nodemon icon](https://img.icons8.com/color/48/000000/nodemon.png) nodemon
- ![pg icon](https://img.icons8.com/color/48/000000/postgreesql.png) pg
- ![pg-hstore icon](https://img.icons8.com/color/48/000000/database-storage.png) pg-hstore
- ![sequelize icon](https://img.icons8.com/color/48/000000/sequelize.png) sequelize
- ![express-validator icon](https://img.icons8.com/color/48/000000/validate.png) express-validator


## Contribuciones

Las contribuciones son bienvenidas. Siéntete libre de hacer cualquier comentario o recomendación a traves de mis perfiles de redes sociales .
