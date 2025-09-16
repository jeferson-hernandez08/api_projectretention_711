const db = require('../models');

const getAllCausesReports = async () => {
    try {
        const allCausesReports = await db.CausesReports.findAll({
            include: [
                {
                    // Aquí permitimos mostrar los reportes con la informacion de la causa_reporte
                    model: db.Reports,
                    //required: true,         // Requerido para que solo muestre las causas_reports con reporte
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
                    // Aquí permitimos mostrar las causas con la informacion de la causa_reporte
                    model: db.Causes,
                    //required: true,         // Requerido para que solo muestre las causas_reports con causa
                    as: "cause",              // Alias del modelo
                    attributes: ['id', 'cause', 'variable'],
                    include: [
                        {
                            model: db.Categories,
                            as: "category",
                            attributes: ['id', 'name', 'description']
                        }
                    ]
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']  // Excluir campos de fecha de creación y actualización
            },
        });
        return allCausesReports;
    } catch (error) {
        throw new Error(`Error al traer las causas_reports ${error.message}`); 
    }    
};

// Ruta getOneCauseReport
const getOneCauseReport = async (id) => {
    try {
        const causeReport = await db.CausesReports.findByPk(id, {
            include: [
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
                    model: db.Causes,
                    as: "cause",
                    attributes: ['id', 'cause', 'variable'],
                    include: [
                        {
                            model: db.Categories,
                            as: "category",
                            attributes: ['id', 'name', 'description']
                        }
                    ]
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        });
        return causeReport;
    } catch (error) {
        throw new Error(`Error al traer la causa_report ${error.message}`); 
    }    
}

// Ruta createCauseReport
const createCauseReport = async (fkIdReports, fkIdCauses) => { 
    try {
        const newCauseReport = await db.CausesReports.create({ 
            fkIdReports, 
            fkIdCauses 
        });
        return newCauseReport;
    } catch (error) {
        throw new Error(`Error al crear la causa_report ${error.message}`);
    }
}

// Ruta updateCauseReport
const updateCauseReport = async (id, fkIdReports, fkIdCauses) => { 
    try {
        const causeReport = await db.CausesReports.findByPk(id);
        if (!causeReport) {
            throw new Error('Causa_Report no encontrada');
        }
        causeReport.fkIdReports = fkIdReports;
        causeReport.fkIdCauses = fkIdCauses;
        await causeReport.save();
        return causeReport;
    } catch (error) {
        throw new Error(`Error al actualizar la causa_report ${error.message}`);
    }
}

// Ruta deleteCauseReport
const deleteCauseReport = async (id) => { 
    try {
        const causeReport = await db.CausesReports.findByPk(id);
        if (!causeReport) {
            throw new Error('Causa_Report no encontrada');
        }
        await causeReport.destroy();
        return causeReport;
    } catch (error) {
        throw new Error(`Error al eliminar la causa_report ${error.message}`);
    }
}

module.exports = { getAllCausesReports, getOneCauseReport, createCauseReport, updateCauseReport, deleteCauseReport };   // Exportamos las funciones para que puedan ser utilizadas en otros archivos