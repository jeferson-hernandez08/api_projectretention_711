const category_service = require('../services/trainingProgramService');   // Importamos el servicio de categorias

const testTrainingProgramApi = (req, resp) => {
    console.log("TestTrainingProgramAPI");
    resp.status(200).send({
        "status": 200,
        "message": 'API User state: avaliable - En funcionamiento training programs OK',
    });
};

const getAllTrainingPrograms  = async(req, resp) => {
    const trainingPrograms = await category_service.getAllTrainingPrograms();   // Llamamos al servicio para obtener todos los programas de formacion
    if (trainingPrograms) 
        resp.status(200).send({
            "status": "Ok", 
            "message": "Programas de formación obtenidos con éxito", 
            "data": trainingPrograms
        });
    else 
        resp.status(400).send({"status": "FAILED", "message": "Error al obtener los Programas de formación"});

}

// Ruta getOneTrainingProgram 
const getOneTrainingProgram = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id del programa de foemacion desde los parámetros de la solicitud
    const trainingProgram = await category_service.getOneTrainingProgram(id);   // Llamamos al servicio para obtener un programa de formacion por su id
    if (trainingProgram) 
        resp.status(200).send({
            "status": "Ok", 
            "message": "Programa de formación traido con éxito", 
            "data": trainingProgram
        });
    else 
        resp.status(400).send({"status": "FAILED", "message": "Error al traer el programa de formación"});
}

// Ruta createTrainingProgram
const createTrainingProgram = async (req, resp) => { 
    const {body} = req;
    const createTrainingProgram = await category_service.createTrainingProgram(body.name, body.level, body.version);   // Llamamos al servicio para crear un nuevo programa
    if (createTrainingProgram) 
        resp.status(201).send({ status: "Ok",  data: createTrainingProgram });
    else 
        resp.status(400).send({"status": "FAILED", data: createTrainingProgram});
};

// Ruta updateTrainingProgram 
const updateTrainingProgram  = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id del programa de formacion desde los parámetros de la solicitud
    const {body} = req;
    const updateTrainingProgram  = await category_service.updateTrainingProgram (id, body.name, body.level, body.version);   // Llamamos al servicio para actualizar un programa de formacion por su id
    if (updateTrainingProgram ) 
        resp.status(200).send({ status: "Ok",  data: updateTrainingProgram  });
    else 
        resp.status(400).send({"status": "FAILED", data: updateTrainingProgram });
};

// Ruta deleteTrainingProgram
const deleteTrainingProgram = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id del programa de formacion desde los parámetros de la solicitud
    const deleteTrainingProgram = await category_service.deleteTrainingProgram(id);   // Llamamos al servicio para eliminar un programa de formacion por su id
    if (deleteTrainingProgram) 
        resp.status(200).send({ status: "Ok",  data: deleteTrainingProgram });
    else 
        resp.status(400).send({"status": "FAILED", data: deleteTrainingProgram});
};


module.exports = {testTrainingProgramApi, getAllTrainingPrograms, getOneTrainingProgram, createTrainingProgram, updateTrainingProgram, deleteTrainingProgram };   // Exportamos las funciones para que puedan ser utilizadas en otros archivos