const { Router } = require('express');
const router = Router(); // Creamos una instancia del Router

const category_controller = require('../../controllers/categoryController');   // Importamos el controlador de categorias

router.get('/testCategoryApi', category_controller.testCategoryAPI); // Ruta para probar la API de categorias
router.get('/', category_controller.getAllCategories); 
router.get('/:id', category_controller.getOneCategory); 
router.post('/', category_controller.createCategory); 
router.put('/:id', category_controller.updateCategory); 
router.delete('/:id', category_controller.deleteCategory); 

// Exportar el módulo
module.exports = router;    // Exportamos el router para que pueda ser utilizado en otros archivos