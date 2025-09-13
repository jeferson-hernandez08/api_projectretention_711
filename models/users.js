'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // 👇 Un usuario pertenece a un rol
      Users.belongsTo(models.Rols, {
        foreignKey: 'fkIdRols',   // Llave foránea en la tabla usuarios
        as: 'rol'            // Alias para acceder al rol desde un usuario | Capturamos el rol desde un usuario 
      });

    }
  }
  Users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    document: DataTypes.STRING,
    password: DataTypes.STRING,
    coordinadorType: DataTypes.STRING,
    manager: DataTypes.BOOLEAN,
    fkIdRols: DataTypes.INTEGER,
    passwordResetToken: DataTypes.STRING,
    passwordResetExpires: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Users',     // Nombre del modelo JavaScript
    tableName: 'users'      // Nombre de la tabla física en BD

  });
  return Users;
};