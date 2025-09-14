const { Router } = require('express');
const router = Router(); // Creamos una instancia del Router

const report_controller = require('../../controllers/reportController');   // Importamos el controlador de reportes

router.get('/testReportApi', report_controller.testReportAPI); // Ruta para probar la API de reportes
router.get('/', report_controller.getAllReports); 
router.get('/:id', report_controller.getOneReport); 
router.post('/', report_controller.createReport); 
router.put('/:id', report_controller.updateReport); 
router.delete('/:id', report_controller.deleteReport); 

// Exportar el módulo
module.exports = router;    // Exportamos el router para que pueda ser utilizado en otros archivos