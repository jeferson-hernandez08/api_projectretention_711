const db = require('../models');

const getAllInterventions = async () => {
    try {
        const allInterventions = await db.Interventions.findAll({
            include: [
                {
                    // Aquí permitimos mostrar las estrategias con la informacion de la intervención
                    model: db.Strategies,
                    //required: true,         // Requerido para que solo muestre las intervenciones con estrategia
                    as: "strategy",           // Alias del modelo
                    attributes: ['id', 'strategy'],
                    include: [
                        {
                            model: db.Categories,
                            as: "category",
                            attributes: ['id', 'name', 'description']
                        }
                    ]
                },
                {
                    // Aquí permitimos mostrar los reportes con la informacion de la intervención
                    model: db.Reports,
                    //required: true,         // Requerido para que solo muestre las intervenciones con reporte
                    as: "report",             // Alias del modelo
                    attributes: ['id', 'creationDate', 'description', 'addressing', 'state'],
                    include: [
                        {
                            model: db.Apprentices,
                            as: "apprentice",
                            attributes: ['id', 'document', 'firtsName', 'lastName']
                        },
                        {
                            model: db.Users,
                            as: "user",
                            attributes: ['id', 'firstName', 'lastName', 'email']
                        }
                    ]
                },
                {
                    // Aquí permitimos mostrar los usuarios con la informacion de la intervención
                    model: db.Users,
                    //required: true,         // Requerido para que solo muestre las intervenciones con usuario
                    as: "user",               // Alias del modelo
                    attributes: ['id', 'firstName', 'lastName', 'email', 'document'],
                    include: [
                        {
                            model: db.Rols,
                            as: "rol",
                            attributes: ['id', 'name']
                        }
                    ]
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']  // Excluir campos de fecha de creación y actualización
            },
        });
        return allInterventions;
    } catch (error) {
        throw new Error(`Error al traer las intervenciones ${error.message}`); 
    }    
};

// Ruta getOneIntervention
const getOneIntervention = async (id) => {
    try {
        const intervention = await db.Interventions.findByPk(id, {
            include: [
                {
                    model: db.Strategies,
                    as: "strategy",
                    attributes: ['id', 'strategy'],
                    include: [
                        {
                            model: db.Categories,
                            as: "category",
                            attributes: ['id', 'name', 'description']
                        }
                    ]
                },
                {
                    model: db.Reports,
                    as: "report",
                    attributes: ['id', 'creationDate', 'description', 'addressing', 'state'],
                    include: [
                        {
                            model: db.Apprentices,
                            as: "apprentice",
                            attributes: ['id', 'document', 'firtsName', 'lastName']
                        },
                        {
                            model: db.Users,
                            as: "user",
                            attributes: ['id', 'firstName', 'lastName', 'email']
                        }
                    ]
                },
                {
                    model: db.Users,
                    as: "user",
                    attributes: ['id', 'firstName', 'lastName', 'email', 'document'],
                    include: [
                        {
                            model: db.Rols,
                            as: "rol",
                            attributes: ['id', 'name']
                        }
                    ]
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        });
        return intervention;
    } catch (error) {
        throw new Error(`Error al traer la intervención ${error.message}`); 
    }    
}

// Ruta createIntervention
const createIntervention = async (creationDate, description, fkIdStrategies, fkIdReports, fkIdUsers) => { 
    try {
        const newIntervention = await db.Interventions.create({ 
            creationDate, 
            description, 
            fkIdStrategies, 
            fkIdReports, 
            fkIdUsers 
        });
        return newIntervention;
    } catch (error) {
        throw new Error(`Error al crear la intervención ${error.message}`);
    }
}

// Ruta updateIntervention
const updateIntervention = async (id, creationDate, description, fkIdStrategies, fkIdReports, fkIdUsers) => { 
    try {
        const intervention = await db.Interventions.findByPk(id);
        if (!intervention) {
            throw new Error('Intervención no encontrada');
        }
        intervention.creationDate = creationDate;
        intervention.description = description;
        intervention.fkIdStrategies = fkIdStrategies;
        intervention.fkIdReports = fkIdReports;
        intervention.fkIdUsers = fkIdUsers;
        await intervention.save();
        return intervention;
    } catch (error) {
        throw new Error(`Error al actualizar la intervención ${error.message}`);
    }
}

// Ruta deleteIntervention
const deleteIntervention = async (id) => { 
    try {
        const intervention = await db.Interventions.findByPk(id);
        if (!intervention) {
            throw new Error('Intervención no encontrada');
        }
        await intervention.destroy();
        return intervention;
    } catch (error) {
        throw new Error(`Error al eliminar la intervención ${error.message}`);
    }
}

module.exports = { getAllInterventions, getOneIntervention, createIntervention, updateIntervention, deleteIntervention };   // Exportamos las funciones para que puedan ser utilizadas en otros archivos