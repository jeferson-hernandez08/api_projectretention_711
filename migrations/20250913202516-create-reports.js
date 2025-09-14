'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      creationDate: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.STRING
      },
      addressing: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      fkIdApprentices: {
        type: Sequelize.INTEGER,
         references: {
          model: 'apprentices',       // Nombre de la tabla física en la base de datos referenciada.
          key: 'id'                   // Columna id referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'    // No se puede borrar un aprendiz si tiene reportes
      },
      fkIdUsers: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',       // Nombre de la tabla física en la base de datos referenciada.
          key: 'id'             // Columna id referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'    // No se puede borrar un usuario si tiene reportes
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
    await queryInterface.dropTable('reports');
  }
};