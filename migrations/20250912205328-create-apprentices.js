'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('apprentices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      documentType: {
        type: Sequelize.STRING
      },
      document: {
        type: Sequelize.STRING
      },
      firtsName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      quarter: {
        type: Sequelize.STRING
      },
      fkIdGroups: {
        type: Sequelize.INTEGER,
        references: {
          model: 'groups',   // Nombre de la tabla física en la base de datos referenciada.
          key: 'id'          // Columna id referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'    // No se puede borrar un grupo si tiene aprendices
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
    await queryInterface.dropTable('apprentices');
  }
};