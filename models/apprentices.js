'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apprentices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // 👇 Un aprendiz pertenece a un grupo
      Apprentices.belongsTo(models.Groups, {
        foreignKey: 'fkIdGroups',   // Llave foránea en la tabla grupos
        as: 'group'            // Alias para acceder al grupo desde un aprendiz | Capturamos el grupo desde un aprendiz 
      });

    }
  }
  Apprentices.init({
    documentType: DataTypes.STRING,
    document: DataTypes.STRING,
    firtsName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.STRING,
    quarter: DataTypes.STRING,
    fkIdGroups: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Apprentices',     // Nombre del modelo JavaScript
    tableName: 'apprentices'      // Nombre de la tabla física en BD
  });
  return Apprentices;
};