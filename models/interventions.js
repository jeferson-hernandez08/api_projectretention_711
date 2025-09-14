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