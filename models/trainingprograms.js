'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrainingPrograms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // 👇 Un programa de formacion tiene muchos grupos
      TrainingPrograms.hasMany(models.Groups, {
        foreignKey: 'fkIdTrainingPrograms',     // Llave foránea en la tabla programa de formacion
        as: 'groups'                   // Alias para acceder a los grupos desde un programa de formacion | Para Capturamos los grupos desde un programa de formacion (Opcional)
      });

    }
  }
  TrainingPrograms.init({
    name: DataTypes.STRING,
    level: DataTypes.STRING,
    version: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TrainingPrograms',     // Nombre del modelo JavaScript
    tableName: 'training_programs'     // Nombre de la tabla física en BD
  });
  return TrainingPrograms;
};