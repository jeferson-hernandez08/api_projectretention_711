const db = require('../models');

const getAllTrainingPrograms = async () => {
    try {
        const allTrainingPrograms = await db.TrainingPrograms.findAll();
        return allTrainingPrograms;
    } catch (error) {
        //throw new Error(`Error al traer las categorias ${error.meessage}`); 
        const errorMsg = error.message || 'Mensaje de error no disponible';
        throw new Error(`Error al traer los programas de formación: ${errorMsg}`);
    }    
};

// Ruta getOneTrainingProgram
const getOneTrainingProgram = async (id) => {
    try {
        const trainingProgram = await db.TrainingPrograms.findByPk(id);
        return trainingProgram;
    } catch (error) {
        throw new Error(`Error al traer el programa de formación ${error.message}`); 
    }    
}

// Ruta createTrainingProgram
const createTrainingProgram = async (name, level, version) => { 
    try {
        const newTrainingProgram = await db.TrainingPrograms.create({ name, level, version });
        return newTrainingProgram;
    } catch (error) {
        throw new Error(`Error al crear el programa de formación ${error.message}`);
    }
}

// Ruta updateTrainingProgram
const updateTrainingProgram = async (id, name, level, version) => { 
    try {
        const trainingProgram = await db.TrainingPrograms.findByPk(id);
        if (!trainingProgram) {
            throw new Error('Programa de formación no encontrado');
        }
        trainingProgram.name = name;
        trainingProgram.level = level;
        trainingProgram.version = version;
        await trainingProgram.save();
        return trainingProgram;
    } catch (error) {
        throw new Error(`Error al actualizar el programa de formación ${error.message}`);
    }
}

// Ruta deleteTrainingProgram
const deleteTrainingProgram = async (id) => { 
    try {
        const trainingProgram = await db.TrainingPrograms.findByPk(id);
        if (!trainingProgram) {
            throw new Error('rograma de formación no encontrado');
        }
        await trainingProgram.destroy();
        return trainingProgram;
    } catch (error) {
        throw new Error(`Error al eliminar el programa de formación ${error.message}`);
    }
}

module.exports = { getAllTrainingPrograms, getOneTrainingProgram, createTrainingProgram, updateTrainingProgram, deleteTrainingProgram };   // Exportamos las funciones para que puedan ser utilizadas en otros archivos};