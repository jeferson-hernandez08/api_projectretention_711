const { Router } = require('express');
const router = Router(); // Creamos una instancia del Router

const rol_controller = require('../../controllers/rolController');   // Importamos el controlador de roles

router.get('/testRolApi', rol_controller.testRolAPI); // Ruta para probar la API de roles
router.get('/', rol_controller.getAllRols); 
router.get('/:id', rol_controller.getOneRol); 
router.post('/', rol_controller.createRol); 
router.put('/:id', rol_controller.updateRol); 
router.delete('/:id', rol_controller.deleteRol); 

// Exportar el módulo
module.exports = router;    // Exportamos el router para que pueda ser utilizado en otros archivos