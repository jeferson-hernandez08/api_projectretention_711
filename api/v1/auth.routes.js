const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');  // Importamos el controlador de auth autenticación

// Ruta para login
router.post('/login', authController.login);

// Para verificar token
router.get('/verify', authController.verifyToken);

module.exports = router;