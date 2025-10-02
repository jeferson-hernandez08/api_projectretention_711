const { Router } = require('express');
const router = Router(); // Creamos una instancia del Router

const causeReport_controller = require('../../controllers/causeReportController');   // Importamos el controlador de causas reportes

router.get('/testCauseReportApi', causeReport_controller.testCauseReportAPI); // Ruta para probar la API de causas reportes
router.get('/', causeReport_controller.getAllCausesReports); 
// Rutas específicas ANTES de parámetros dinámicos | El orden de las rutas es muy importante 
router.get('/by-report', causeReport_controller.getCausesReportsByReportId); // Ruta endpoint que permite filtrar causes_reports por fkIdReports
router.get('/:id', causeReport_controller.getOneCauseReport); 
router.post('/', causeReport_controller.createCauseReport); 
router.put('/:id', causeReport_controller.updateCauseReport); 
router.delete('/:id', causeReport_controller.deleteCauseReport); 

// Exportar el módulo
module.exports = router;    // Exportamos el router para que pueda ser utilizado en otros archivos

// Nota:
// En Express, las rutas más específicas deben ir ANTES que las rutas con parámetros dinámicos. 
// De lo contrario, Express intentará matchear by-report como un valor del parámetro :id.