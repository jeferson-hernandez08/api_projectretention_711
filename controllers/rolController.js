const rol_service = require('../services/rolService');   // Importamos el servicio de roles

const testRolAPI = (req, resp) => {
    console.log("TestRolAPI");
    resp.status(200).send({
        "status": 200,
        "message": 'API Rol state: avaliable - En funcionamiento roles OK',
    });
};

const getAllRols  = async(req, resp) => {
    const rols = await rol_service.getAllRols();   // Llamamos al servicio para obtener todos los roles
    if (rols) 
        resp.status(200).send({
            "status": "Ok", 
            "message": "Roles obtenidos con éxito", 
            "data": rols
        });
    else 
        resp.status(400).send({"status": "FAILED", "message": "Error al obtener los roles"});

}

// Ruta getOneRol 
const getOneRol = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id del rol desde los parámetros de la solicitud
    const rol = await rol_service.getOneRol(id);   // Llamamos al servicio para obtener un rol por su id
    if (rol) 
        resp.status(200).send({
            "status": "Ok", 
            "message": "Rol traído con éxito", 
            "data": rol
        });
    else 
        resp.status(400).send({"status": "FAILED", "message": "Error al traer el rol"});
}

// Ruta createRol
const createRol = async (req, resp) => { 
    const {body} = req;
    const createRol = await rol_service.createRol(body.name);   // Llamamos al servicio para crear un nuevo rol
    if (createRol) 
        resp.status(201).send({ status: "Ok",  data: createRol });
    else 
        resp.status(400).send({"status": "FAILED", data: createRol});
};

// Ruta updateRol 
const updateRol  = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id del rol desde los parámetros de la solicitud
    const {body} = req;
    const updateRol  = await rol_service.updateRol(id, body.name);   // Llamamos al servicio para actualizar un rol por su id
    if (updateRol) 
        resp.status(200).send({ status: "Ok",  data: updateRol });
    else 
        resp.status(400).send({"status": "FAILED", data: updateRol});
};

// Ruta deleteRol
const deleteRol = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id del rol desde los parámetros de la solicitud
    const deleteRol = await rol_service.deleteRol(id);   // Llamamos al servicio para eliminar un rol por su id
    if (deleteRol) 
        resp.status(200).send({ status: "Ok",  data: deleteRol });
    else 
        resp.status(400).send({"status": "FAILED", data: deleteRol});
};

module.exports = {
    testRolAPI, 
    getAllRols, 
    getOneRol, 
    createRol, 
    updateRol, 
    deleteRol
};   // Exportamos las funciones para que puedan ser utilizadas en otros archivos