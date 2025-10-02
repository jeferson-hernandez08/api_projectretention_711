const causeReport_service = require('../services/causeReportService');   // Importamos el servicio de causas_reports

const testCauseReportAPI = (req, resp) => {
    console.log("TestCauseReportAPI");
    resp.status(200).send({
        "status": 200,
        "message": 'API CauseReport state: avaliable - En funcionamiento causas_reports OK',
    });
};

const getAllCausesReports  = async(req, resp) => {
    const causesReports = await causeReport_service.getAllCausesReports();   // Llamamos al servicio para obtener todos los causes_reports
    if (causesReports) 
        resp.status(200).send({
            "status": "Ok", 
            "message": "CausesReports obtenidos con éxito", 
            "data": causesReports
        });
    else 
        resp.status(400).send({"status": "FAILED", "message": "Error al obtener los causes_reports"});

}

// Ruta getOneCauseReport 
const getOneCauseReport = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id del cause_report desde los parámetros de la solicitud
    const causeReport = await causeReport_service.getOneCauseReport(id);   // Llamamos al servicio para obtener un cause_report por su id
    if (causeReport) 
        resp.status(200).send({
            "status": "Ok", 
            "message": "CauseReport traído con éxito", 
            "data": causeReport
        });
    else 
        resp.status(400).send({"status": "FAILED", "message": "Error al traer el cause_report"});
}

// Ruta createCauseReport
const createCauseReport = async (req, resp) => { 
    const {body} = req;
    const createCauseReport = await causeReport_service.createCauseReport(
        body.fkIdReports, 
        body.fkIdCauses
    );   // Llamamos al servicio para crear un nuevo cause_report
    if (createCauseReport) 
        resp.status(201).send({ status: "Ok",  data: createCauseReport });
    else 
        resp.status(400).send({"status": "FAILED", data: createCauseReport});
};

// Ruta updateCauseReport 
const updateCauseReport  = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id del cause_report desde los parámetros de la solicitud
    const {body} = req;
    const updateCauseReport  = await causeReport_service.updateCauseReport(
        id,
        body.fkIdReports, 
        body.fkIdCauses
    );   // Llamamos al servicio para actualizar un cause_report por su id
    if (updateCauseReport) 
        resp.status(200).send({ status: "Ok",  data: updateCauseReport });
    else 
        resp.status(400).send({"status": "FAILED", data: updateCauseReport});
};

// Ruta deleteCauseReport
const deleteCauseReport = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id del cause_report desde los parámetros de la solicitud
    const deleteCauseReport = await causeReport_service.deleteCauseReport(id);   // Llamamos al servicio para eliminar un cause_report por su id
    if (deleteCauseReport) 
        resp.status(200).send({ status: "Ok",  data: deleteCauseReport });
    else 
        resp.status(400).send({"status": "FAILED", data: deleteCauseReport});
};

// Funcion para Obtener causes_reports por fkIdReports |  endpoint que permite filtrar causes_reports por fkIdReports
const getCausesReportsByReportId = async (req, resp) => { 
    const { fkIdReports } = req.query;   // Obtenemos el fkIdReports desde los parámetros de consulta
    
    if (!fkIdReports) {
        return resp.status(400).send({
            "status": "FAILED", 
            "message": "El parámetro fkIdReports es requerido"
        });
    }

    try {
        const causesReports = await causeReport_service.getCausesReportsByReportId(fkIdReports);
        
        if (causesReports && causesReports.length > 0) {
            resp.status(200).send({
                "status": "Ok", 
                "message": "CausesReports obtenidos con éxito", 
                "data": causesReports
            });
        } else {
            resp.status(200).send({
                "status": "Ok", 
                "message": "No se encontraron relaciones para este reporte", 
                "data": []
            });
        }
    } catch (error) {
        resp.status(400).send({
            "status": "FAILED", 
            "message": "Error al obtener los causes_reports por reporte"
        });
    }

    // Por ejemplo:
    // Cuando eliminemos un reporte con ID = 3: }
    // Solo se eliminarán las relaciones causes_reports donde fkIdReports = 3 con todas las fkIdCauses de ese report: fkIdReports = 3
    // Las relaciones de otros reportes (fkIdReports = 2, 4, 5, etc.) permanecerán intactas
    // Este endpoint nos permite buscar relaciones por fkIdReports
}

module.exports = {
    testCauseReportAPI, 
    getAllCausesReports, 
    getOneCauseReport, 
    createCauseReport, 
    updateCauseReport, 
    deleteCauseReport,
    getCausesReportsByReportId  
};   // Exportamos las funciones para que puedan ser utilizadas en otros archivos