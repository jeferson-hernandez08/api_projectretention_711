'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interventions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // 👇 Una intervencion pertenece a una estrategia
      Interventions.belongsTo(models.Strategies, {
        foreignKey: 'fkIdStrategies',   // Llave foránea en la tabla intervenciones
        as: 'strategy'                 // Alias para acceder a la estrategia desde una intervencion | Capturamos la estrategia desde una intervencion 
      });
      
      // 👇 Una intervencion pertenece a un reporte
      Interventions.belongsTo(models.Reports, {
        foreignKey: 'fkIdReports',   // Llave foránea en la tabla intervenciones
        as: 'report'                 // Alias para acceder al reporte desde una intervencion | Capturamos el reporte desde una intervencion
      });
      
      
      // 👇 Una intervencion pertenece a un usuario
      Interventions.belongsTo(models.Users, {
        foreignKey: 'fkIdUsers',   // Llave foránea en la tabla intervenciones
        as: 'user'                 // Alias para acceder al usuario desde una intervencion | Capturamos el usuario desde una intervencion 
      });

    }
  }
  Interventions.init({
    creationDate: DataTypes.DATE,
    description: DataTypes.TEXT,
    fkIdStrategies: DataTypes.INTEGER,
    fkIdReports: DataTypes.INTEGER,
    fkIdUsers: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Interventions',      // Nombre del modelo JavaScript
    tableName: 'interventions'      // Nombre de la tabla física en BD

  });
  return Interventions;
};