const { Router } = require('express');
const router = Router(); // Creamos una instancia del Router

const strategy_controller = require('../../controllers/strategyController');   // Importamos el controlador de estrategias

router.get('/testStrategyApi', strategy_controller.testStrategyAPI); // Ruta para probar la API de estrategias
router.get('/', strategy_controller.getAllStrategies); 
router.get('/:id', strategy_controller.getOneStrategy); 
router.post('/', strategy_controller.createStrategy); 
router.put('/:id', strategy_controller.updateStrategy); 
router.delete('/:id', strategy_controller.deleteStrategy); 

// Exportar el módulo
module.exports = router;    // Exportamos el router para que pueda ser utilizado en otros archivos