'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      document: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      coordinadorType: {
        type: Sequelize.STRING
      },
      manager: {
        type: Sequelize.BOOLEAN
      },
      fkIdRols: {
        type: Sequelize.INTEGER,
        references: {
          model: 'rols',       // Nombre de la tabla física en la base de datos referenciada.
          key: 'id'            // Columna id referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'    // No se puede borrar un rol si tiene usuarios
      },
      passwordResetToken: {
        type: Sequelize.STRING

      },
      passwordResetExpires: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};