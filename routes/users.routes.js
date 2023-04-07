const express = require('express');

const usersController = require('../controllers/users.controller');

const router = express.Router();

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/:id/history', usersController.findById);
router.delete('/:id', usersController.delete);

module.exports = router;
