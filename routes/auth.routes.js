const express = require('express');

//Controllers
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

module.exports = router;
