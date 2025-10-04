'use strict';
const bcrypt = require('bcryptjs'); // 👈 Se agrega esta importacion para login 
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

      // 👇 Un usuario tiene muchos reportes
      Users.hasMany(models.Reports, {
        foreignKey: 'fkIdUsers',        // Llave foránea en la tabla usuarios
        as: 'reports'                   // Alias para acceder a los reportes desde un usuario | Capturamos los reportes desde un usuario (Opcional)
      });

      // 👇 Un usuario tiene muchas intervenciones
      Users.hasMany(models.Interventions, {
        foreignKey: 'fkIdUsers',            // Llave foránea en la tabla intervenciones
        as: 'interventions'                 // Alias para acceder a las intervenciones desde un usuario | Capturamos las intervenciones desde un usuario (Opcional)
      });
    }

    // 🔐 MÉTODO DE INSTANCIA: Verificar contraseña
    async authenticatePassword(password) {
      try {
        // Verificar si la contraseña está en texto plano o encriptada
        if (this.password && (this.password.startsWith('$2a$') || this.password.startsWith('$2b$'))) {
          // Contraseña encriptada con bcrypt
          return await bcrypt.compare(password, this.password);
        } else {
          // Contraseña en texto plano (para migración)
          return this.password === password;
        }
      } catch (error) {
        console.error('Error autenticando contraseña:', error);
        return false;
      }
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

  // 🔐 MÉTODO ESTÁTICO: Login
  Users.login = async function (email, password) {
    try {
      let user = await Users.findOne({
        where: {
          email: email,
        },
        include: [
          {
            model: sequelize.models.Rols,
            as: "rol",
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        ],
      });
      
      if (!user) {
        return { 
          status: 404, 
          message: "Usuario no encontrado" 
        };
      }
      
      let valid = await user.authenticatePassword(password);
      
      return valid
        ? {
            status: 200,
            user,
          }
        : { 
            status: 401, 
            message: "Usuario y/o contraseña inválidos" 
          };
    } catch (error) {
      console.error('Error en Users.login:', error);
      return { 
        status: 500, 
        message: "Error interno del servidor" 
      };
    }
  };

  // 🔄 HOOK: Encriptar contraseña al crear usuario
  Users.beforeCreate(async (user, options) => {
    if (user.password) {
      try {
        user.password = await bcrypt.hash(user.password, 10);
        console.log('✅ Contraseña encriptada para nuevo usuario:', user.email);
      } catch (error) {
        console.error('Error encriptando contraseña:', error);
        throw error;
      }
    }
  });

  // 🔄 HOOK: Encriptar contraseña al actualizar (solo si cambió)
  Users.beforeUpdate(async (user, options) => {
    if (user.changed('password') && user.password) {
      try {
        user.password = await bcrypt.hash(user.password, 10);
        console.log('✅ Contraseña actualizada y encriptada para:', user.email);
      } catch (error) {
        console.error('Error encriptando contraseña en actualización:', error);
        throw error;
      }
    }
  });

  // 🔄 MÉTODO ESTÁTICO: Actualizar contraseña
  Users.updatePassword = async function (id, password) {
    try {
      let user = await Users.findByPk(id);
      if (!user) {
        return { 
          status: 404, 
          message: "Usuario no encontrado" 
        };
      }
      
      user.password = await bcrypt.hash(password, 10);
      await user.save();
      
      return { 
        status: 200, 
        message: "Contraseña actualizada correctamente" 
      };
    } catch (error) {
      console.error('Error en Users.updatePassword:', error);
      return { 
        status: 500, 
        message: "Error al actualizar la contraseña" 
      };
    }
  };

  
  return Users;
};