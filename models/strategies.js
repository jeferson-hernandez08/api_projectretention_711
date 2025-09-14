'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Strategies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // 👇 Una estrategia pertenece a una categoria
      Strategies.belongsTo(models.Categories, {
        foreignKey: 'fkIdCategories',   // Llave foránea en la tabla estrategias
        as: 'category'                 // Alias para acceder a la categoria desde una estrategia | Capturamos la categoria desde una estrategia 
      });

    }
  }
  Strategies.init({
    strategy: DataTypes.STRING,
    fkIdCategories: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Strategies',     // Nombre del modelo JavaScript
    tableName: 'strategies'      // Nombre de la tabla física en BD

  });
  return Strategies;
};