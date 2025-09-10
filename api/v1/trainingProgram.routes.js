const { Router } = require('express');
const router = Router(); // Creamos una instancia del Router

const trainingProgram_controller = require('../../controllers/trainingProgramController');   // Importamos el controlador de categorias

router.get('/testTrainingProgramApi', trainingProgram_controller.testTrainingProgramApi);   // Ruta para probar la API de categorias
router.get('/', trainingProgram_controller.getAllTrainingPrograms); 
router.get('/:id', trainingProgram_controller.getOneTrainingProgram); 
router.post('/', trainingProgram_controller.createTrainingProgram); 
router.put('/:id', trainingProgram_controller.updateTrainingProgram); 
router.delete('/:id', trainingProgram_controller.deleteTrainingProgram); 

// Exportar el módulo
module.exports = router;    // Exportamos el router para que pueda ser utilizado en otros archivos