const express = require('express');

const usersController = require('../controllers/users.controller');
const {
  handleLoginErrors,
  handleFindByIdErrors,
  handleDeleteErrors,
} = require('../middlewares/user.middleware');

const router = express.Router();

router.post('/signup', usersController.signup);
router.post('/login', handleLoginErrors, usersController.login);
router.get('/:id/history', handleFindByIdErrors, usersController.findById);
router.delete('/:id', handleDeleteErrors, usersController.delete);

module.exports = router;
