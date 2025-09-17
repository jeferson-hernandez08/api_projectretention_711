'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('training_programs', [
      {
        name: 'Técnico en Sistemas',
        level: 'Técnico',
        version: '102'
      },
      {
        name: 'Tecnólogo en Análisis y Desarrollo de Software',
        level: 'Tecnólogo',
        version: '228'
      },
      {
        name: 'Técnico en Mantenimiento de Equipos de Cómputo',
        level: 'Técnico',
        version: '115'
      },
      {
        name: 'Tecnólogo en Gestión de Redes de Datos',
        level: 'Tecnólogo',
        version: '210'
      },
      {
        name: 'Técnico en Programación de Software',
        level: 'Técnico',
        version: '134'
      },
      {
        name: 'Tecnólogo en Gestión de Proyectos de Desarrollo de Software',
        level: 'Tecnólogo',
        version: '301'
      },
      {
        name: 'Técnico en Asistencia Administrativa',
        level: 'Técnico',
        version: '120'
      },
      {
        name: 'Tecnólogo en Logística',
        level: 'Tecnólogo',
        version: '180'
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
