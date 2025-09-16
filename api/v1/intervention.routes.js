const { Router } = require('express');
const router = Router(); // Creamos una instancia del Router

const intervention_controller = require('../../controllers/interventionController');   // Importamos el controlador de intervenciones

router.get('/testInterventionApi', intervention_controller.testInterventionAPI); // Ruta para probar la API de intervenciones
router.get('/', intervention_controller.getAllInterventions); 
router.get('/:id', intervention_controller.getOneIntervention); 
router.post('/', intervention_controller.createIntervention); 
router.put('/:id', intervention_controller.updateIntervention); 
router.delete('/:id', intervention_controller.deleteIntervention); 

// Exportar el módulo
module.exports = router;    // Exportamos el router para que pueda ser utilizado en otros archivos