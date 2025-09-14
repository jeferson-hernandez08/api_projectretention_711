'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Causes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // 👇 Una causa pertenece a una categoria
      Causes.belongsTo(models.Categories, {
        foreignKey: 'fkIdCategories',    // Llave foránea en la tabla causas
        as: 'category'                // Alias para acceder a la categoria desde una causa | Capturamos categoria desde una causa 
      });

    }
  }
  Causes.init({
    cause: DataTypes.STRING,
    variable: DataTypes.STRING,
    fkIdCategories: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Causes',      // Nombre del modelo JavaScript
    tableName: 'causes'       // Nombre de la tabla física en BD

  });
  return Causes;
};