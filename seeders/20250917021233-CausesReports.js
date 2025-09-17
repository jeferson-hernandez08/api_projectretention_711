'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('causes_reports', [
       // Reporte 1 - Salud
      {
        fkIdReports: 1,
        fkIdCauses: 9 // Enfermedades
      },
      {
        fkIdReports: 1,
        fkIdCauses: 10, // Sustancias psicoactivas
      },

      // Reporte 2 - Económicos
      {
        fkIdReports: 2,
        fkIdCauses: 1 // Sin recursos económicos
      },
      {
        fkIdReports: 2,
        fkIdCauses: 2 // Debe trabajar
      },

      // Reporte 3 - Académico
      {
        fkIdReports: 3,
        fkIdCauses: 11 // No se sentía capaz
      },
      {
        fkIdReports: 3,
        fkIdCauses: 12 // Bajo rendimiento
      },
      {
        fkIdReports: 3,
        fkIdCauses: 13, // Problemas con plataformas digitales
      },
      {
        fkIdReports: 3,
        fkIdCauses: 13 // Carga académica
      },

      // Reporte 4 - Abandono personal
      {
        fkIdReports: 4,
        fkIdCauses: 5 // Familia no apoyó
      },
      {
        fkIdReports: 4,
        fkIdCauses: 6 // Conflictos familiares
      },

      // Reporte 5 - Inasistencias
      {
        fkIdReports: 5,
        fkIdCauses: 7 // Distancia al centro
      },
      {
        fkIdReports: 5,
        fkIdCauses: 3 // Trabajo no da tiempo
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
