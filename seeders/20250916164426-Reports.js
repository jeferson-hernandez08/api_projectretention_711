'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('reports', [
      {
        creationDate: new Date('2025-03-01'),
        description: 'Aprendiz presenta problemas de salud y desea abandonar el programa.',
        addressing: 'Coordinador Académico',
        state: 'Pendiente',
        fkIdApprentices: 1, // Juan Pérez
        fkIdUsers: 2, // María Gómez - Instructor
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        creationDate: new Date('2025-03-05'),
        description: 'Aprendiz manifiesta dificultades económicas para continuar asistiendo.',
        addressing: 'Coordinador de Formación',
        state: 'En proceso',
        fkIdApprentices: 2, // María Rodríguez
        fkIdUsers: 4, // Laura Martínez - Profesional de Bienestar
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        creationDate: new Date('2025-03-10'),
        description: 'Aprendiz con bajo rendimiento académico, se solicita acompañamiento.',
        addressing: 'Coordinador Académico',
        state: 'En proceso',
        fkIdApprentices: 3, // Carlos Gómez
        fkIdUsers: 3, // Andrés López - Coordinador Académico
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        creationDate: new Date('2025-03-15'),
        description: 'Aprendiz notificó oficialmente que abandona el programa por motivos personales.',
        addressing: 'Coordinador de Formación',
        state: 'Cerrado',
        fkIdApprentices: 4, // Laura Martínez (aprendiz)
        fkIdUsers: 1, // Carlos Ramírez - Administrador
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        creationDate: new Date('2025-03-20'),
        description: 'Aprendiz con reiteradas inasistencias injustificadas.',
        addressing: 'Coordinador Académico',
        state: 'Pendiente',
        fkIdApprentices: 5, // Andrés Salazar
        fkIdUsers: 2, // María Gómez - Instructor
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
    await queryInterface.bulkDelete('reports', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
