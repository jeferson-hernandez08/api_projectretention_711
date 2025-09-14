const cause_service = require('../services/causeService');   // Importamos el servicio de causas

const testCauseAPI = (req, resp) => {
    console.log("TestCauseAPI");
    resp.status(200).send({
        "status": 200,
        "message": 'API Cause state: avaliable - En funcionamiento causas OK',
    });
};

const getAllCauses  = async(req, resp) => {
    const causes = await cause_service.getAllCauses();   // Llamamos al servicio para obtener todas las causas
    if (causes) 
        resp.status(200).send({
            "status": "Ok", 
            "message": "Causas obtenidas con éxito", 
            "data": causes
        });
    else 
        resp.status(400).send({"status": "FAILED", "message": "Error al obtener las causas"});

}

// Ruta getOneCause 
const getOneCause = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id de la causa desde los parámetros de la solicitud
    const cause = await cause_service.getOneCause(id);   // Llamamos al servicio para obtener una causa por su id
    if (cause) 
        resp.status(200).send({
            "status": "Ok", 
            "message": "Causa traída con éxito", 
            "data": cause
        });
    else 
        resp.status(400).send({"status": "FAILED", "message": "Error al traer la causa"});
}

// Ruta createCause
const createCause = async (req, resp) => { 
    const {body} = req;
    const createCause = await cause_service.createCause(
        body.cause, 
        body.variable, 
        body.fkIdCategories
    );   // Llamamos al servicio para crear una nueva causa
    if (createCause) 
        resp.status(201).send({ status: "Ok",  data: createCause });
    else 
        resp.status(400).send({"status": "FAILED", data: createCause});
};

// Ruta updateCause 
const updateCause  = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id de la causa desde los parámetros de la solicitud
    const {body} = req;
    const updateCause  = await cause_service.updateCause(
        id,
        body.cause, 
        body.variable, 
        body.fkIdCategories
    );   // Llamamos al servicio para actualizar una causa por su id
    if (updateCause) 
        resp.status(200).send({ status: "Ok",  data: updateCause });
    else 
        resp.status(400).send({"status": "FAILED", data: updateCause});
};

// Ruta deleteCause
const deleteCause = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id de la causa desde los parámetros de la solicitud
    const deleteCause = await cause_service.deleteCause(id);   // Llamamos al servicio para eliminar una causa por su id
    if (deleteCause) 
        resp.status(200).send({ status: "Ok",  data: deleteCause });
    else 
        resp.status(400).send({"status": "FAILED", data: deleteCause});
};

module.exports = {
    testCauseAPI, 
    getAllCauses, 
    getOneCause, 
    createCause, 
    updateCause, 
    deleteCause
};   // Exportamos las funciones para que puedan ser utilizadas en otros archivos