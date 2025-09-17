'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('causes_reports', [
       // Reporte 1 - Salud
      {
        fkIdReports: 1,
        fkIdCauses: 9, // Enfermedades
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fkIdReports: 1,
        fkIdCauses: 10, // Sustancias psicoactivas
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Reporte 2 - Económicos
      {
        fkIdReports: 2,
        fkIdCauses: 1, // Sin recursos económicos
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fkIdReports: 2,
        fkIdCauses: 2, // Debe trabajar
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Reporte 3 - Académico
      {
        fkIdReports: 3,
        fkIdCauses: 11, // No se sentía capaz
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fkIdReports: 3,
        fkIdCauses: 12, // Bajo rendimiento
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fkIdReports: 3,
        fkIdCauses: 13, // Problemas con plataformas digitales
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fkIdReports: 3,
        fkIdCauses: 14, // Carga académica
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Reporte 4 - Abandono personal
      {
        fkIdReports: 4,
        fkIdCauses: 5, // Familia no apoyó
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fkIdReports: 4,
        fkIdCauses: 6, // Conflictos familiares
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Reporte 5 - Inasistencias
      {
        fkIdReports: 5,
        fkIdCauses: 7, // Distancia al centro
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fkIdReports: 5,
        fkIdCauses: 3, // Trabajo no da tiempo
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
    await queryInterface.bulkDelete('causes_reports', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
