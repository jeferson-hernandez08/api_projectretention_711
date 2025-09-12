const db = require('../models');

const getAllApprentices = async () => {
    try {
        const allApprentices = await db.Apprentices.findAll({
            include: [
                {
                    // Aquí permitimos mostrar los grupos con la informacion del aprendiz
                    model: db.Groups,
                    //required: true,         // Requerido para que solo muestre los aprendices con grupo
                    as: "group",              // Alias del modelo
                    attributes: ['id', 'file', 'managerName', 'shift', 'modality'],
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']  // Excluir campos de fecha de creación y actualización
            },
        });
        return allApprentices;
    } catch (error) {
        throw new Error(`Error al traer los aprendices ${error.message}`); 
    }    
};

// Ruta getOneApprentice
const getOneApprentice = async (id) => {
    try {
        const apprentice = await db.Apprentices.findByPk(id, {
            include: [
                {
                    model: db.Groups,
                    as: "group",
                    attributes: ['id', 'file', 'managerName', 'shift', 'modality'],
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        });
        return apprentice;
    } catch (error) {
        throw new Error(`Error al traer el aprendiz ${error.message}`); 
    }    
}

// Ruta createApprentice
const createApprentice = async (documentType, document, firtsName, lastName, phone, email, status, quarter, fkIdGroups) => { 
    try {
        const newApprentice = await db.Apprentices.create({ 
            documentType, 
            document, 
            firtsName, 
            lastName, 
            phone, 
            email, 
            status, 
            quarter, 
            fkIdGroups 
        });
        return newApprentice;
    } catch (error) {
        throw new Error(`Error al crear el aprendiz ${error.message}`);
    }
}

// Ruta updateApprentice
const updateApprentice = async (id, documentType, document, firtsName, lastName, phone, email, status, quarter, fkIdGroups) => { 
    try {
        const apprentice = await db.Apprentices.findByPk(id);
        if (!apprentice) {
            throw new Error('Aprendiz no encontrado');
        }
        apprentice.documentType = documentType;
        apprentice.document = document;
        apprentice.firtsName = firtsName;
        apprentice.lastName = lastName;
        apprentice.phone = phone;
        apprentice.email = email;
        apprentice.status = status;
        apprentice.quarter = quarter;
        apprentice.fkIdGroups = fkIdGroups;
        await apprentice.save();
        return apprentice;
    } catch (error) {
        throw new Error(`Error al actualizar el aprendiz ${error.message}`);
    }
}

// Ruta deleteApprentice
const deleteApprentice = async (id) => { 
    try {
        const apprentice = await db.Apprentices.findByPk(id);
        if (!apprentice) {
            throw new Error('Aprendiz no encontrado');
        }
        await apprentice.destroy();
        return apprentice;
    } catch (error) {
        throw new Error(`Error al eliminar el aprendiz ${error.message}`);
    }
}

module.exports = { getAllApprentices, getOneApprentice, createApprentice, updateApprentice, deleteApprentice };   // Exportamos las funciones para que puedan ser utilizadas en otros archivos