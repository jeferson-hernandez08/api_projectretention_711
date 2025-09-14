const { Router } = require('express');
const router = Router(); // Creamos una instancia del Router

const cause_controller = require('../../controllers/causeController');   // Importamos el controlador de causas

router.get('/testCauseApi', cause_controller.testCauseAPI); // Ruta para probar la API de causas
router.get('/', cause_controller.getAllCauses); 
router.get('/:id', cause_controller.getOneCause); 
router.post('/', cause_controller.createCause); 
router.put('/:id', cause_controller.updateCause); 
router.delete('/:id', cause_controller.deleteCause); 

// Exportar el módulo
module.exports = router;    // Exportamos el router para que pueda ser utilizado en otros archivos