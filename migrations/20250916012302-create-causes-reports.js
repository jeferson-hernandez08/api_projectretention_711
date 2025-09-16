'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('causes_reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fkIdReports: {
        type: Sequelize.INTEGER,
        references: {
          model: 'reports',          // Nombre de la tabla física en la base de datos referenciada.
          key: 'id'                  // Columna id referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'         // No se puede borrar un reporte si tiene causas_reportes
      },
      fkIdCauses: {
        type: Sequelize.INTEGER,
         references: {
          model: 'causes',          // Nombre de la tabla física en la base de datos referenciada.
          key: 'id'                  // Columna id referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'         // No se puede borrar una causa si tiene causas_reportes
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
    await queryInterface.dropTable('causes_reports');
  }
};