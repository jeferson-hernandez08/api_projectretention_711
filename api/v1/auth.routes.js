const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

// Ruta para login
router.post('/login', authController.login);

// Para verificar token
router.get('/verify', authController.verifyToken);

// Para obtener usuario autenticado
router.get('/authenticated', authController.getUserAuthenticated);

// Ruta para recuperar contraseña
router.post('/forgotPassword', authController.forgotPassword);

// Ruta para restablecer contraseña
router.post('/resetPassword', authController.resetPassword);

// Ruta temporal para verificar contraseña
router.post('/verifyPassword', authController.verifyPassword);

module.exports = router;