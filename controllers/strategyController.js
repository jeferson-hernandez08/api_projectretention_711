const strategy_service = require('../services/strategyService');   // Importamos el servicio de estrategias

const testStrategyAPI = (req, resp) => {
    console.log("TestStrategyAPI");
    resp.status(200).send({
        "status": 200,
        "message": 'API Strategy state: avaliable - En funcionamiento estrategias OK',
    });
};

const getAllStrategies  = async(req, resp) => {
    const strategies = await strategy_service.getAllStrategies();   // Llamamos al servicio para obtener todas las estrategias
    if (strategies) 
        resp.status(200).send({
            "status": "Ok", 
            "message": "Estrategias obtenidas con éxito", 
            "data": strategies
        });
    else 
        resp.status(400).send({"status": "FAILED", "message": "Error al obtener las estrategias"});

}

// Ruta getOneStrategy 
const getOneStrategy = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id de la estrategia desde los parámetros de la solicitud
    const strategy = await strategy_service.getOneStrategy(id);   // Llamamos al servicio para obtener una estrategia por su id
    if (strategy) 
        resp.status(200).send({
            "status": "Ok", 
            "message": "Estrategia traída con éxito", 
            "data": strategy
        });
    else 
        resp.status(400).send({"status": "FAILED", "message": "Error al traer la estrategia"});
}

// Ruta createStrategy
const createStrategy = async (req, resp) => { 
    const {body} = req;
    const createStrategy = await strategy_service.createStrategy(
        body.strategy, 
        body.fkIdCategories
    );   // Llamamos al servicio para crear una nueva estrategia
    if (createStrategy) 
        resp.status(201).send({ status: "Ok",  data: createStrategy });
    else 
        resp.status(400).send({"status": "FAILED", data: createStrategy});
};

// Ruta updateStrategy 
const updateStrategy  = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id de la estrategia desde los parámetros de la solicitud
    const {body} = req;
    const updateStrategy  = await strategy_service.updateStrategy(
        id,
        body.strategy, 
        body.fkIdCategories
    );   // Llamamos al servicio para actualizar una estrategia por su id
    if (updateStrategy) 
        resp.status(200).send({ status: "Ok",  data: updateStrategy });
    else 
        resp.status(400).send({"status": "FAILED", data: updateStrategy});
};

// Ruta deleteStrategy
const deleteStrategy = async (req, resp) => { 
    const id = req.params.id;   // Obtenemos el id de la estrategia desde los parámetros de la solicitud
    const deleteStrategy = await strategy_service.deleteStrategy(id);   // Llamamos al servicio para eliminar una estrategia por su id
    if (deleteStrategy) 
        resp.status(200).send({ status: "Ok",  data: deleteStrategy });
    else 
        resp.status(400).send({"status": "FAILED", data: deleteStrategy});
};

module.exports = {
    testStrategyAPI, 
    getAllStrategies, 
    getOneStrategy, 
    createStrategy, 
    updateStrategy, 
    deleteStrategy
};   // Exportamos las funciones para que puedan ser utilizadas en otros archivos