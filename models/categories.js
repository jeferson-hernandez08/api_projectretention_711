'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // 👇 Una categoria tiene muchas causas
      Categories.hasMany(models.Causes, {
        foreignKey: 'fkIdCategories',       // Llave foránea en la tabla causas
        as: 'causes'                   // Alias para acceder a las causas desde un categoria | Capturamos las causas desde una categoria (Opcional)
      });

    }
  }
  Categories.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    addressing: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categories',     // Nombre del modelo JavaScript
    tableName: 'categories'      // Nombre de la tabla física en BD
  });
  return Categories;
};