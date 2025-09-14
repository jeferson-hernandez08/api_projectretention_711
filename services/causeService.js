const db = require('../models');

const getAllCauses = async () => {
    try {
        const allCauses = await db.Causes.findAll({
            include: [
                {
                    // Aquí permitimos mostrar las categorías con la información de la causa
                    model: db.Categories,
                    //required: true,         // Requerido para que solo muestre las causas con categoría
                    as: "category",          // Alias del modelo
                    attributes: ['id', 'name', 'description'],
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']  // Excluir campos de fecha de creación y actualización
            },
        });
        return allCauses;
    } catch (error) {
        throw new Error(`Error al traer las causas ${error.message}`); 
    }    
};

// Ruta getOneCause
const getOneCause = async (id) => {
    try {
        const cause = await db.Causes.findByPk(id, {
            include: [
                {
                    model: db.Categories,
                    as: "category",
                    attributes: ['id', 'name', 'description'],
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        });
        return cause;
    } catch (error) {
        throw new Error(`Error al traer la causa ${error.message}`); 
    }    
}

// Ruta createCause
const createCause = async (cause, variable, fkIdCategories) => { 
    try {
        const newCause = await db.Causes.create({ 
            cause, 
            variable, 
            fkIdCategories 
        });
        return newCause;
    } catch (error) {
        throw new Error(`Error al crear la causa ${error.message}`);
    }
}

// Ruta updateCause
const updateCause = async (id, cause, variable, fkIdCategories) => { 
    try {
        const causeObj = await db.Causes.findByPk(id);
        if (!causeObj) {
            throw new Error('Causa no encontrada');
        }
        causeObj.cause = cause;
        causeObj.variable = variable;
        causeObj.fkIdCategories = fkIdCategories;
        await causeObj.save();
        return causeObj;
    } catch (error) {
        throw new Error(`Error al actualizar la causa ${error.message}`);
    }
}

// Ruta deleteCause
const deleteCause = async (id) => { 
    try {
        const cause = await db.Causes.findByPk(id);
        if (!cause) {
            throw new Error('Causa no encontrada');
        }
        await cause.destroy();
        return cause;
    } catch (error) {
        throw new Error(`Error al eliminar la causa ${error.message}`);
    }
}

module.exports = { getAllCauses, getOneCause, createCause, updateCause, deleteCause };   // Exportamos las funciones para que puedan ser utilizadas en otros archivos