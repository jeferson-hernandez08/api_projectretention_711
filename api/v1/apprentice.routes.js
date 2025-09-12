const { Router } = require('express');
const router = Router(); // Creamos una instancia del Router

const apprentice_controller = require('../../controllers/apprenticeController');   // Importamos el controlador de aprendices

router.get('/testApprenticeApi', apprentice_controller.testApprenticeAPI); // Ruta para probar la API de aprendices
router.get('/', apprentice_controller.getAllApprentices); 
router.get('/:id', apprentice_controller.getOneApprentice); 
router.post('/', apprentice_controller.createApprentice); 
router.put('/:id', apprentice_controller.updateApprentice); 
router.delete('/:id', apprentice_controller.deleteApprentice); 

// Exportar el módulo
module.exports = router;    // Exportamos el router para que pueda ser utilizado en otros archivos