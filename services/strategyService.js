const db = require('../models');

const getAllStrategies = async () => {
    try {
        const allStrategies = await db.Strategies.findAll({
            include: [
                {
                    // Aquí permitimos mostrar las categorías con la informacion de la estrategia
                    model: db.Categories,
                    //required: true,         // Requerido para que solo muestre las estrategias con categoría
                    as: "category",           // Alias del modelo
                    attributes: ['id', 'name', 'description', 'addressing'],
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']  // Excluir campos de fecha de creación y actualización
            },
        });
        return allStrategies;
    } catch (error) {
        throw new Error(`Error al traer las estrategias ${error.message}`); 
    }    
};

// Ruta getOneStrategy
const getOneStrategy = async (id) => {
    try {
        const strategy = await db.Strategies.findByPk(id, {
            include: [
                {
                    model: db.Categories,
                    as: "category",
                    attributes: ['id', 'name', 'description', 'addressing'],
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        });
        return strategy;
    } catch (error) {
        throw new Error(`Error al traer la estrategia ${error.message}`); 
    }    
}

// Ruta createStrategy
const createStrategy = async (strategy, fkIdCategories) => { 
    try {
        const newStrategy = await db.Strategies.create({ 
            strategy, 
            fkIdCategories 
        });
        return newStrategy;
    } catch (error) {
        throw new Error(`Error al crear la estrategia ${error.message}`);
    }
}

// Ruta updateStrategy
const updateStrategy = async (id, strategy, fkIdCategories) => { 
    try {
        const strategyObj = await db.Strategies.findByPk(id);
        if (!strategyObj) {
            throw new Error('Estrategia no encontrada');
        }
        strategyObj.strategy = strategy;
        strategyObj.fkIdCategories = fkIdCategories;
        await strategyObj.save();
        return strategyObj;
    } catch (error) {
        throw new Error(`Error al actualizar la estrategia ${error.message}`);
    }
}

// Ruta deleteStrategy
const deleteStrategy = async (id) => { 
    try {
        const strategy = await db.Strategies.findByPk(id);
        if (!strategy) {
            throw new Error('Estrategia no encontrada');
        }
        await strategy.destroy();
        return strategy;
    } catch (error) {
        throw new Error(`Error al eliminar la estrategia ${error.message}`);
    }
}

module.exports = { getAllStrategies, getOneStrategy, createStrategy, updateStrategy, deleteStrategy };   // Exportamos las funciones para que puedan ser utilizadas en otros archivos