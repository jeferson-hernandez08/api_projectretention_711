const user_service = require('../services/userService');   // Importamos el servicio de usuarios

const testUserAPI = (req, resp) => {
    console.log("TestUserAPI");
    resp.status(200).send({
        "status": 200,
        "message": 'API User state: avaliable - En funcionamiento usuarios OK',
    });
};

const getAllUsers  = async(req, resp) => {
    const users = await user_service.getAllUsers();   // Llamamos al servicio para obtener todos los usuarios
    if (users) 
        resp.status(200).send({
            "status": "Ok", 
            "message": "Usuarios obtenidos con éxito", 
            "data": users
        });
    else 
        resp.status(400).send({"status": "FAILED", "message": "Error al obtener los usuarios"});

}

// Ruta getOneUser 
const getOneUser = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id del usuario desde los parámetros de la solicitud
    const user = await user_service.getOneUser(id);   // Llamamos al servicio para obtener un usuario por su id
    if (user) 
        resp.status(200).send({
            "status": "Ok", 
            "message": "Usuario traído con éxito", 
            "data": user
        });
    else 
        resp.status(400).send({"status": "FAILED", "message": "Error al traer el usuario"});
}

// Ruta createUser
const createUser = async (req, resp) => { 
    const {body} = req;
    const createUser = await user_service.createUser(
        body.firstName, 
        body.lastName, 
        body.email, 
        body.phone, 
        body.document, 
        body.password, 
        body.coordinadorType, 
        body.manager, 
        body.fkIdRols,
        body.passwordResetToken, 
        body.passwordResetExpires
    );   // Llamamos al servicio para crear un nuevo usuario
    if (createUser) 
        resp.status(201).send({ status: "Ok",  data: createUser });
    else 
        resp.status(400).send({"status": "FAILED", data: createUser});
};

// Ruta updateUser 
const updateUser  = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id del usuario desde los parámetros de la solicitud
    const {body} = req;
    const updateUser  = await user_service.updateUser(
        id,
        body.firstName, 
        body.lastName, 
        body.email, 
        body.phone, 
        body.document, 
        body.password, 
        body.coordinadorType, 
        body.manager, 
        body.fkIdRols,
        body.passwordResetToken, 
        body.passwordResetExpires
    );   // Llamamos al servicio para actualizar un usuario por su id
    if (updateUser) 
        resp.status(200).send({ status: "Ok",  data: updateUser });
    else 
        resp.status(400).send({"status": "FAILED", data: updateUser});
};

// Ruta deleteUser
const deleteUser = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id del usuario desde los parámetros de la solicitud
    const deleteUser = await user_service.deleteUser(id);   // Llamamos al servicio para eliminar un usuario por su id
    if (deleteUser) 
        resp.status(200).send({ status: "Ok",  data: deleteUser });
    else 
        resp.status(400).send({"status": "FAILED", data: deleteUser});
};

module.exports = {
    testUserAPI, 
    getAllUsers, 
    getOneUser, 
    createUser, 
    updateUser, 
    deleteUser
};   // Exportamos las funciones para que puedan ser utilizadas en otros archivos