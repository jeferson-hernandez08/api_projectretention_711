const report_service = require('../services/reportService');   // Importamos el servicio de reportes

const testReportAPI = (req, resp) => {
    console.log("TestReportAPI");
    resp.status(200).send({
        "status": 200,
        "message": 'API Report state: avaliable - En funcionamiento reportes OK',
    });
};

const getAllReports  = async(req, resp) => {
    const reports = await report_service.getAllReports();   // Llamamos al servicio para obtener todos los reportes
    if (reports) 
        resp.status(200).send({
            "status": "Ok", 
            "message": "Reportes obtenidos con éxito", 
            "data": reports
        });
    else 
        resp.status(400).send({"status": "FAILED", "message": "Error al obtener los reportes"});

}

// Ruta getOneReport 
const getOneReport = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id del reporte desde los parámetros de la solicitud
    const report = await report_service.getOneReport(id);   // Llamamos al servicio para obtener un reporte por su id
    if (report) 
        resp.status(200).send({
            "status": "Ok", 
            "message": "Reporte traído con éxito", 
            "data": report
        });
    else 
        resp.status(400).send({"status": "FAILED", "message": "Error al traer el reporte"});
}

// Ruta createReport
const createReport = async (req, resp) => { 
    const {body} = req;
    const createReport = await report_service.createReport(
        body.creationDate, 
        body.description, 
        body.addressing, 
        body.state, 
        body.fkIdApprentices, 
        body.fkIdUsers
    );   // Llamamos al servicio para crear un nuevo reporte
    if (createReport) 
        resp.status(201).send({ status: "Ok",  data: createReport });
    else 
        resp.status(400).send({"status": "FAILED", data: createReport});
};

// Ruta updateReport 
const updateReport  = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id del reporte desde los parámetros de la solicitud
    const {body} = req;
    const updateReport  = await report_service.updateReport(
        id,
        body.creationDate, 
        body.description, 
        body.addressing, 
        body.state, 
        body.fkIdApprentices, 
        body.fkIdUsers
    );   // Llamamos al servicio para actualizar un reporte por su id
    if (updateReport) 
        resp.status(200).send({ status: "Ok",  data: updateReport });
    else 
        resp.status(400).send({"status": "FAILED", data: updateReport});
};

// Ruta deleteReport
const deleteReport = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id del reporte desde los parámetros de la solicitud
    const deleteReport = await report_service.deleteReport(id);   // Llamamos al servicio para eliminar un reporte por su id
    if (deleteReport) 
        resp.status(200).send({ status: "Ok",  data: deleteReport });
    else 
        resp.status(400).send({"status": "FAILED", data: deleteReport});
};

module.exports = {
    testReportAPI, 
    getAllReports, 
    getOneReport, 
    createReport, 
    updateReport, 
    deleteReport
};   // Exportamos las funciones para que puedan ser utilizadas en otros archivos