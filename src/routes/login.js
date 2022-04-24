const express = require('express');
const LoginController = require('../controllers/loginController');

const router = express.Router();

router.get('/login', LoginController.login);
router.post('/login', LoginController.auth);
router.get('/about', LoginController.about);
router.get('/entretenimiento', LoginController.entretenimiento);
router.get('/register', LoginController.register);
router.post('/register', LoginController.storeUser);
router.get('/logout', LoginController.logout);

module.exports = router;