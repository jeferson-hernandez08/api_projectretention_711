const apprentice_service = require('../services/apprenticeService');   // Importamos el servicio de aprendices

const testApprenticeAPI = (req, resp) => {
    console.log("TestApprenticeAPI");
    resp.status(200).send({
        "status": 200,
        "message": 'API Apprentice state: avaliable - En funcionamiento aprendices OK',
    });
};

const getAllApprentices  = async(req, resp) => {
    const apprentices = await apprentice_service.getAllApprentices();   // Llamamos al servicio para obtener todos los aprendices
    if (apprentices) 
        resp.status(200).send({
            "status": "Ok", 
            "message": "Aprendices obtenidos con éxito", 
            "data": apprentices
        });
    else 
        resp.status(400).send({"status": "FAILED", "message": "Error al obtener los aprendices"});

}

// Ruta getOneApprentice 
const getOneApprentice = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id del aprendiz desde los parámetros de la solicitud
    const apprentice = await apprentice_service.getOneApprentice(id);   // Llamamos al servicio para obtener un aprendiz por su id
    if (apprentice) 
        resp.status(200).send({
            "status": "Ok", 
            "message": "Aprendiz traído con éxito", 
            "data": apprentice
        });
    else 
        resp.status(400).send({"status": "FAILED", "message": "Error al traer el aprendiz"});
}

// Ruta createApprentice
const createApprentice = async (req, resp) => { 
    const {body} = req;
    const createApprentice = await apprentice_service.createApprentice(
        body.documentType, 
        body.document, 
        body.firtsName, 
        body.lastName, 
        body.phone, 
        body.email, 
        body.status, 
        body.quarter, 
        body.fkIdGroups
    );   // Llamamos al servicio para crear un nuevo aprendiz
    if (createApprentice) 
        resp.status(201).send({ status: "Ok",  data: createApprentice });
    else 
        resp.status(400).send({"status": "FAILED", data: createApprentice});
};

// Ruta updateApprentice 
const updateApprentice  = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id del aprendiz desde los parámetros de la solicitud
    const {body} = req;
    const updateApprentice  = await apprentice_service.updateApprentice(
        id,
        body.documentType, 
        body.document, 
        body.firtsName, 
        body.lastName, 
        body.phone, 
        body.email, 
        body.status, 
        body.quarter, 
        body.fkIdGroups
    );   // Llamamos al servicio para actualizar un aprendiz por su id
    if (updateApprentice) 
        resp.status(200).send({ status: "Ok",  data: updateApprentice });
    else 
        resp.status(400).send({"status": "FAILED", data: updateApprentice});
};

// Ruta deleteApprentice
const deleteApprentice = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id del aprendiz desde los parámetros de la solicitud
    const deleteApprentice = await apprentice_service.deleteApprentice(id);   // Llamamos al servicio para eliminar un aprendiz por su id
    if (deleteApprentice) 
        resp.status(200).send({ status: "Ok",  data: deleteApprentice });
    else 
        resp.status(400).send({"status": "FAILED", data: deleteApprentice});
};

module.exports = {
    testApprenticeAPI, 
    getAllApprentices, 
    getOneApprentice, 
    createApprentice, 
    updateApprentice, 
    deleteApprentice
};   // Exportamos las funciones para que puedan ser utilizadas en otros archivos