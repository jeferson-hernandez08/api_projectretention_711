const { Router } = require('express');
const router = Router(); // Creamos una instancia del Router

const causeReport_controller = require('../../controllers/causeReportController');   // Importamos el controlador de causas reportes

router.get('/testCauseReportApi', causeReport_controller.testCauseReportAPI); // Ruta para probar la API de causas reportes
router.get('/', causeReport_controller.getAllCausesReports); 
router.get('/:id', causeReport_controller.getOneCauseReport); 
router.post('/', causeReport_controller.createCauseReport); 
router.put('/:id', causeReport_controller.updateCauseReport); 
router.delete('/:id', causeReport_controller.deleteCauseReport); 
router.get('/by-report', causeReport_controller.getCausesReportsByReportId); // Ruta endpoint que permite filtrar causes_reports por fkIdReports

// Exportar el módulo
module.exports = router;    // Exportamos el router para que pueda ser utilizado en otros archivos