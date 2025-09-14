'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // 👇 Un reporte pertenece a un aprendiz
      Reports.belongsTo(models.Apprentices, {
        foreignKey: 'fkIdApprentices',   // Llave foránea en la tabla reportes
        as: 'apprentice'                 // Alias para acceder al aprendiz desde un reporte | Capturamos el aprendiz desde un reporte 
      });

      // 👇 Un reporte pertenece a un usuario
      Reports.belongsTo(models.Users, {
        foreignKey: 'fkIdUsers',   // Llave foránea en la tabla usuarios
        as: 'user'                 // Alias para acceder al usuario desde un reporte | Capturamos el usuario desde un reporte 
      });

    }
  }
  Reports.init({
    creationDate: DataTypes.DATE,
    description: DataTypes.STRING,
    addressing: DataTypes.STRING,
    state: DataTypes.STRING,
    fkIdApprentices: DataTypes.INTEGER,
    fkIdUsers: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reports',     // Nombre del modelo JavaScript
    tableName: 'reports'        // Nombre de la tabla física en BD

  });
  return Reports;
};