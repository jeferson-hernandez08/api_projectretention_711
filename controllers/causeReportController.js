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

module.exports = {
    testCauseReportAPI, 
    getAllCausesReports, 
    getOneCauseReport, 
    createCauseReport, 
    updateCauseReport, 
    deleteCauseReport
};   // Exportamos las funciones para que puedan ser utilizadas en otros archivos