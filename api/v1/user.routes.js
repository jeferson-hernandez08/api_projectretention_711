const { Router } = require('express');
const router = Router(); // Creamos una instancia del Router

const user_controller = require('../../controllers/userController');   // Importamos el controlador de usuarios

router.get('/testUserApi', user_controller.testUserAPI); // Ruta para probar la API de usuarios
router.get('/', user_controller.getAllUsers); 
router.get('/:id', user_controller.getOneUser); 
router.post('/', user_controller.createUser); 
router.put('/:id', user_controller.updateUser); 
router.delete('/:id', user_controller.deleteUser); 

// Exportar el módulo
module.exports = router;    // Exportamos el router para que pueda ser utilizado en otros archivos