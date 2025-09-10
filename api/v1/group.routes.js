const { Router } = require('express');
const router = Router(); // Creamos una instancia del Router

const group_controller = require('../../controllers/groupController');   // Importamos el controlador de categorias

router.get('/testGroupApi', group_controller.testGroupAPI); // Ruta para probar la API de categorias
router.get('/', group_controller.getAllGroups); 
router.get('/:id', group_controller.getOneGroup); 
router.post('/', group_controller.createGroup); 
router.put('/:id', group_controller.updateGroup); 
router.delete('/:id', group_controller.deleteGroup); 

// Exportar el módulo
module.exports = router;    // Exportamos el router para que pueda ser utilizado en otros archivos