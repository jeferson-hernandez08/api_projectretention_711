const group_service = require('../services/groupService');   // Importamos el servicio de gupos

const testGroupAPI = (req, resp) => {
    console.log("TestGroupAPI");
    resp.status(200).send({
        "status": 200,
        "message": 'API User state: avaliable - En funcionamiento grupos OK',
    });
};

const getAllGroups  = async(req, resp) => {
    const groups = await group_service.getAllGroups();   // Llamamos al servicio para obtener todos los grupos
    if (groups) 
        resp.status(200).send({
            "status": "Ok", 
            "message": "Grupos obtenidos con éxito", 
            "data": groups
        });
    else 
        resp.status(400).send({"status": "FAILED", "message": "Error al obtener los grupos"});

}

// Ruta getOneGroup 
const getOneGroup = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id de la categoria desde los parámetros de la solicitud
    const group = await group_service.getOneGroup(id);   // Llamamos al servicio para obtener un grupo por su id
    if (group) 
        resp.status(200).send({
            "status": "Ok", 
            "message": "Grupo traido con éxito", 
            "data": group
        });
    else 
        resp.status(400).send({"status": "FAILED", "message": "Error al traer el grupo"});
}

// Ruta createGroup
const createGroup = async (req, resp) => { 
    const {body} = req;
    const createGroup = await group_service.createGroup(body.file, body.trainingStart, body.trainingEnd, body.practiceStart, body.practiceEnd, body.managerName, body.shift, body.modality, body.fkIdTrainingPrograms);   // Llamamos al servicio para crear una nuevo grupo
    if (createGroup) 
        resp.status(201).send({ status: "Ok",  data: createGroup });
    else 
        resp.status(400).send({"status": "FAILED", data: createGroup});
};

// Ruta updateGroup 
const updateGroup  = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id del grupo desde los parámetros de la solicitud
    const {body} = req;
    const updateGroup  = await group_service.updateGroup (id, body.file, body.trainingStart, body.trainingEnd, body.practiceStart, body.practiceEnd, body.managerName, body.shift, body.modality, body.fkIdTrainingPrograms);   // Llamamos al servicio para actualizar un grupo por su id
    if (updateGroup ) 
        resp.status(200).send({ status: "Ok",  data: updateGroup  });
    else 
        resp.status(400).send({"status": "FAILED", data: updateGroup });
};

// Ruta deleteGroup
const deleteGroup = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id del grupo desde los parámetros de la solicitud
    const deleteGroup = await group_service.deleteGroup(id);   // Llamamos al servicio para eliminar un grupo por su id
    if (deleteGroup) 
        resp.status(200).send({ status: "Ok",  data: deleteGroup });
    else 
        resp.status(400).send({"status": "FAILED", data: deleteGroup});
};



module.exports = {testGroupAPI, getAllGroups, getOneGroup, createGroup, updateGroup, deleteGroup };   // Exportamos las funciones para que puedan ser utilizadas en otros archivos