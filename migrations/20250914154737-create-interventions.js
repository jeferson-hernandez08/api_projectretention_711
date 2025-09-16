'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('interventions', {
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
        type: Sequelize.TEXT
      },
      fkIdStrategies: {
        type: Sequelize.INTEGER,
        references: {
          model: 'strategies',       // Nombre de la tabla física en la base de datos referenciada.
          key: 'id'                  // Columna id referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'         // No se puede borrar una estrategia si tiene intervenciones
      },
      fkIdReports: {
        type: Sequelize.INTEGER,
        references: {
          model: 'reports',       // Nombre de la tabla física en la base de datos referenciada.
          key: 'id'               // Columna id referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'      // No se puede borrar un reporte si tiene intervenciones
      },
      fkIdUsers: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',       // Nombre de la tabla física en la base de datos referenciada.
          key: 'id'             // Columna id referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'    // No se puede borrar un usuario si tiene intervenciones
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
    await queryInterface.dropTable('interventions');
  }
};