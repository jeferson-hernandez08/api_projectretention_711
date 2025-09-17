'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('training_programs', [
      {
        name: 'Técnico en Sistemas',
        level: 'Técnico',
        version: '102',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tecnólogo en Análisis y Desarrollo de Software',
        level: 'Tecnólogo',
        version: '228',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Técnico en Mantenimiento de Equipos de Cómputo',
        level: 'Técnico',
        version: '115',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tecnólogo en Gestión de Redes de Datos',
        level: 'Tecnólogo',
        version: '210',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Técnico en Programación de Software',
        level: 'Técnico',
        version: '134',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tecnólogo en Gestión de Proyectos de Desarrollo de Software',
        level: 'Tecnólogo',
        version: '301',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Técnico en Asistencia Administrativa',
        level: 'Técnico',
        version: '120',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tecnólogo en Logística',
        level: 'Tecnólogo',
        version: '180',
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
    await queryInterface.bulkDelete('training_programs', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
