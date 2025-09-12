const db = require('../models');

const getAllGroups = async () => {
    try {
        const allGroups = await db.Groups.findAll({
            include: [
                {
                    // Aquí permitimos mostrar los programas de formacion con la informacion del grupo
                    model: db.TrainingPrograms,
                    //required: true,         // Requerido para que solo muestre los eventos con categoria
                    as: "trainingProgram",    // Alias del modelo
                    attributes: ['id', 'name', 'level', 'version'],
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']  // Excluir campos de fecha de creación y actualización
            },
        });
        return allGroups;
    } catch (error) {
        throw new Error(`Error al traer los grupos ${error.meessage}`); 
    }    
};

// Ruta getOneGroup
const getOneGroup = async (id) => {
    try {
        const group = await db.Groups.findByPk(id, {
            include: [
                {
                    model: db.TrainingPrograms,
                    as: "trainingProgram",   
                    attributes: ['id', 'name', 'level', 'version'],
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        });
        return group;
    } catch (error) {
        throw new Error(`Error al traer el grupo ${error.message}`); 
    }    
}

// Ruta createGroup
const createGroup = async (file, trainingStart, trainingEnd, practiceStart, practiceEnd, managerName, shift, modality, fkIdTrainingPrograms) => { 
    try {
        const newGroup = await db.Groups.create({ file, trainingStart, trainingEnd, practiceStart, practiceEnd, managerName, shift, modality, fkIdTrainingPrograms });
        return newGroup;
    } catch (error) {
        throw new Error(`Error al crear el grupo ${error.message}`);
    }
}

// Ruta updateGroup
const updateGroup = async (id, file, trainingStart, trainingEnd, practiceStart, practiceEnd, managerName, shift, modality, fkIdTrainingPrograms) => { 
    try {
        const group = await db.Groups.findByPk(id);
        if (!group) {
            throw new Error('grupo no encontrado');
        }
        group.file = file;
        group.trainingStart = trainingStart;
        group.trainingEnd = trainingEnd;
        group.practiceStart = practiceStart;
        group.practiceEnd = practiceEnd;
        group.managerName = managerName;
        group.shift = shift;
        group.modality = modality;
        group.fkIdTrainingPrograms = fkIdTrainingPrograms;
        await group.save();
        return group;
    } catch (error) {
        throw new Error(`Error al actualizar el grupo ${error.message}`);
    }
}

// Ruta deleteGroup
const deleteGroup = async (id) => { 
    try {
        const group = await db.Groups.findByPk(id);
        if (!group) {
            throw new Error('Grupo no encontrado');
        }
        await group.destroy();
        return group;
    } catch (error) {
        throw new Error(`Error al eliminar el grupo ${error.message}`);
    }
}

module.exports = { getAllGroups, getOneGroup, createGroup, updateGroup, deleteGroup };   // Exportamos las funciones para que puedan ser utilizadas en otros archivos};