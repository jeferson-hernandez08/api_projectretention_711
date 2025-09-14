const db = require('../models');

const getAllReports = async () => {
    try {
        const allReports = await db.Reports.findAll({
            include: [
                {
                    // Aquí permitimos mostrar los aprendices con la informacion del reporte
                    model: db.Apprentices,
                    //required: true,         // Requerido para que solo muestre los reportes con aprendiz
                    as: "apprentice",         // Alias del modelo
                    attributes: ['id', 'document', 'firtsName', 'lastName', 'email'],
                },
                {
                    // Aquí permitimos mostrar los usuarios con la informacion del reporte
                    model: db.Users,
                    //required: true,         // Requerido para que solo muestre los reportes con usuario
                    as: "user",               // Alias del modelo
                    attributes: ['id', 'document', 'firstName', 'lastName', 'email'],
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']  // Excluir campos de fecha de creación y actualización
            },
        });
        return allReports;
    } catch (error) {
        throw new Error(`Error al traer los reportes ${error.message}`); 
    }    
};

// Ruta getOneReport
const getOneReport = async (id) => {
    try {
        const report = await db.Reports.findByPk(id, {
            include: [
                {
                    model: db.Apprentices,
                    as: "apprentice",
                    attributes: ['id', 'document', 'firtsName', 'lastName', 'email'],
                },
                {
                    model: db.Users,
                    as: "user",
                    attributes: ['id', 'document', 'firstName', 'lastName', 'email'],
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        });
        return report;
    } catch (error) {
        throw new Error(`Error al traer el reporte ${error.message}`); 
    }    
}

// Ruta createReport
const createReport = async (creationDate, description, addressing, state, fkIdApprentices, fkIdUsers) => { 
    try {
        const newReport = await db.Reports.create({ 
            creationDate, 
            description, 
            addressing, 
            state, 
            fkIdApprentices, 
            fkIdUsers 
        });
        return newReport;
    } catch (error) {
        throw new Error(`Error al crear el reporte ${error.message}`);
    }
}

// Ruta updateReport
const updateReport = async (id, creationDate, description, addressing, state, fkIdApprentices, fkIdUsers) => { 
    try {
        const report = await db.Reports.findByPk(id);
        if (!report) {
            throw new Error('Reporte no encontrado');
        }
        report.creationDate = creationDate;
        report.description = description;
        report.addressing = addressing;
        report.state = state;
        report.fkIdApprentices = fkIdApprentices;
        report.fkIdUsers = fkIdUsers;
        await report.save();
        return report;
    } catch (error) {
        throw new Error(`Error al actualizar el reporte ${error.message}`);
    }
}

// Ruta deleteReport
const deleteReport = async (id) => { 
    try {
        const report = await db.Reports.findByPk(id);
        if (!report) {
            throw new Error('Reporte no encontrado');
        }
        await report.destroy();
        return report;
    } catch (error) {
        throw new Error(`Error al eliminar el reporte ${error.message}`);
    }
}

module.exports = { getAllReports, getOneReport, createReport, updateReport, deleteReport };   // Exportamos las funciones para que puedan ser utilizadas en otros archivos