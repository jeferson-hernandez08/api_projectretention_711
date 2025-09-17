'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('rols', [
      {
        name: 'Administrador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Instructor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Coordinador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Profesional de Bienestar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Aprendiz Vocero',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rols', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
