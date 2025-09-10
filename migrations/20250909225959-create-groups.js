'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      file: {
        type: Sequelize.STRING
      },
      trainingStart: {
        type: Sequelize.DATEONLY
      },
      trainingEnd: {
        type: Sequelize.DATEONLY
      },
      practiceStart: {
        type: Sequelize.DATEONLY
      },
      practiceEnd: {
        type: Sequelize.DATEONLY
      },
      managerName: {
        type: Sequelize.STRING
      },
      shift: {
        type: Sequelize.STRING
      },
      modality: {
        type: Sequelize.STRING
      },
      fkIdTrainingPrograms: {
        type: Sequelize.INTEGER,
        references: {
          model: 'training_programs',   // Nombre de la tabla física en la base de datos referenciada.
          key: 'idTrainingProgram'      // Columna id referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'    // No se puede borrar una grupo si tienen programas de formacion
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
    await queryInterface.dropTable('groups');
  }
};