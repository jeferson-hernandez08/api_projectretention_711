'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('causes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cause: {
        type: Sequelize.STRING
      },
      variable: {
        type: Sequelize.STRING
      },
      fkIdCategories: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',       // Nombre de la tabla física en la base de datos referenciada.
          key: 'id'                  // Columna id referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'    // No se puede borrar una categoria si tiene causas
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
    await queryInterface.dropTable('causes');
  }
};