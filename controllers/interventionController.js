const intervention_service = require('../services/interventionService');   // Importamos el servicio de intervenciones

const testInterventionAPI = (req, resp) => {
    console.log("TestInterventionAPI");
    resp.status(200).send({
        "status": 200,
        "message": 'API Intervention state: avaliable - En funcionamiento intervenciones OK',
    });
};

const getAllInterventions  = async(req, resp) => {
    const interventions = await intervention_service.getAllInterventions();   // Llamamos al servicio para obtener todas las intervenciones
    if (interventions) 
        resp.status(200).send({
            "status": "Ok", 
            "message": "Intervenciones obtenidas con éxito", 
            "data": interventions
        });
    else 
        resp.status(400).send({"status": "FAILED", "message": "Error al obtener las intervenciones"});

}

// Ruta getOneIntervention 
const getOneIntervention = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id de la intervención desde los parámetros de la solicitud
    const intervention = await intervention_service.getOneIntervention(id);   // Llamamos al servicio para obtener una intervención por su id
    if (intervention) 
        resp.status(200).send({
            "status": "Ok", 
            "message": "Intervención traída con éxito", 
            "data": intervention
        });
    else 
        resp.status(400).send({"status": "FAILED", "message": "Error al traer la intervención"});
}

// Ruta createIntervention
const createIntervention = async (req, resp) => { 
    const {body} = req;
    const createIntervention = await intervention_service.createIntervention(
        body.creationDate, 
        body.description, 
        body.fkIdStrategies, 
        body.fkIdReports, 
        body.fkIdUsers
    );   // Llamamos al servicio para crear una nueva intervención
    if (createIntervention) 
        resp.status(201).send({ status: "Ok",  data: createIntervention });
    else 
        resp.status(400).send({"status": "FAILED", data: createIntervention});
};

// Ruta updateIntervention 
const updateIntervention  = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id de la intervención desde los parámetros de la solicitud
    const {body} = req;
    const updateIntervention  = await intervention_service.updateIntervention(
        id,
        body.creationDate, 
        body.description, 
        body.fkIdStrategies, 
        body.fkIdReports, 
        body.fkIdUsers
    );   // Llamamos al servicio para actualizar una intervención por su id
    if (updateIntervention) 
        resp.status(200).send({ status: "Ok",  data: updateIntervention });
    else 
        resp.status(400).send({"status": "FAILED", data: updateIntervention});
};

// Ruta deleteIntervention
const deleteIntervention = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id de la intervención desde los parámetros de la solicitud
    const deleteIntervention = await intervention_service.deleteIntervention(id);   // Llamamos al servicio para eliminar una intervención por su id
    if (deleteIntervention) 
        resp.status(200).send({ status: "Ok",  data: deleteIntervention });
    else 
        resp.status(400).send({"status": "FAILED", data: deleteIntervention});
};

module.exports = {
    testInterventionAPI, 
    getAllInterventions, 
    getOneIntervention, 
    createIntervention, 
    updateIntervention, 
    deleteIntervention
};   // Exportamos las funciones para que puedan ser utilizadas en otros archivos