'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // 👇 Un grupo pertenece a un programa de formacion
      Groups.belongsTo(models.TrainingPrograms, {
        foreignKey: 'fkIdTrainingPrograms',   // Llave foránea en la tabla programa de formacion
        as: 'trainingProgram'            // Alias para acceder al programa de formacion desde un grupo | Capturamos el programa de formacion desde un grupo 
      });

    }
  }
  Groups.init({
    file: DataTypes.STRING,
    trainingStart: DataTypes.DATEONLY,
    trainingEnd: DataTypes.DATEONLY,
    practiceStart: DataTypes.DATEONLY,
    practiceEnd: DataTypes.DATEONLY,
    managerName: DataTypes.STRING,
    shift: DataTypes.STRING,
    modality: DataTypes.STRING,
    fkIdTrainingPrograms: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Groups',     // Nombre del modelo JavaScript
    tableName: 'groups'      // Nombre de la tabla física en BD
  });
  return Groups;
};