'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CausesReports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      // 👇 Una causa_reporte pertenece a un reporte
      CausesReports.belongsTo(models.Reports, {
        foreignKey: 'fkIdReports',     // Llave foránea en la tabla causas_reportes
        as: 'report'                 // Alias para acceder a un reporte desde una causa_reporte | Capturamos el reporte desde una causa_reporte  
      });

      // 👇 Una causa_reporte pertenece a una causa
      CausesReports.belongsTo(models.Causes, {
        foreignKey: 'fkIdCauses',      // Llave foránea en la tabla causas_reportes
        as: 'cause'                    // Alias para acceder a la causa desde una causa_reporte | Capturamos la causa desde una causa_reporte 
      });

    }
  }
  CausesReports.init({
    fkIdReports: DataTypes.INTEGER,
    fkIdCauses: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CausesReports',     // Nombre del modelo JavaScript
    tableName: 'causes_reports'     // Nombre de la tabla física en BD
  });
  return CausesReports;
};