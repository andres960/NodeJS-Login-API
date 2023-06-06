const express = require('express');
const LoginController = require('../controllers/LoginController');

const router = express.Router();


//Rutas generales de la aplicacion
//Acceso: IP de la maquina:5000/login
//Acceso: IP de la maquina:5000/register
//Acceso: IP de la maquina:5000/auth

router.get('/login', LoginController.index);
router.post('/register', LoginController.register);
router.post('/auth', LoginController.auth);








//router.get('/logout', LoginController.logout);

module.exports = router;
