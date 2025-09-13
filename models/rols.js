'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rols extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // 👇 Un rol tiene tiene muchos usuarios
      Rols.hasMany(models.Users, {
        foreignKey: 'fkIdRols',     // Llave foránea en la tabla usuarios
        as: 'users'                   // Alias para acceder a los usuarios desde un rol | Capturamos los usuarios desde un rol (Opcional)
      });

    }
  }
  Rols.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rols',     // Nombre del modelo JavaScript
    tableName: 'rols'      // Nombre de la tabla física en BD
  });
  return Rols;
};