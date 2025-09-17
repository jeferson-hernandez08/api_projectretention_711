'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('interventions', [
       {
        creationDate: new Date('2025-03-06'),
        description: 'Se habló con el aprendiz para aplicar al apoyo económico institucional.',
        fkIdStrategies: 1, // Estrategia: Orientar sobre apoyos socioeconómicos
        fkIdReports: 2,    // Reporte: Dificultades económicas
        fkIdUsers: 4      // Usuario: Laura Martínez - Bienestar
      },
      {
        creationDate: new Date('2025-03-07'),
        description: 'Se brindó información al aprendiz sobre el programa Jóvenes en Acción.',
        fkIdStrategies: 2, // Estrategia: Conocer apoyos del gobierno
        fkIdReports: 2,    // Reporte: Dificultades económicas
        fkIdUsers: 2      // Usuario: María Gómez - Instructor
      },
      {
        creationDate: new Date('2025-03-11'),
        description: 'Se realizó reunión con el aprendiz y su familia para mejorar el apoyo en casa.',
        fkIdStrategies: 4, // Estrategia: Grupos focales socioemocionales
        fkIdReports: 1,    // Reporte: Problemas de salud
        fkIdUsers: 3      // Usuario: Andrés López - Coordinador Académico
      },
      {
        creationDate: new Date('2025-03-16'),
        description: 'Se realizó orientación sobre cambio de jornada para facilitar asistencia.',
        fkIdStrategies: 7, // Estrategia: Apoyo en cambios de jornada/lugar
        fkIdReports: 4,    // Reporte: Abandono oficial
        fkIdUsers: 1      // Usuario: Carlos Ramírez - Administrador
      },
      {
        creationDate: new Date('2025-03-21'),
        description: 'Se desarrolló grupo focal sobre habilidades sociales y sana convivencia.',
        fkIdStrategies: 5, // Estrategia: Grupos focales con aprendices
        fkIdReports: 5,    // Reporte: Reiteradas inasistencias
        fkIdUsers: 2      // Usuario: María Gómez - Instructor
      },
      {
        creationDate: new Date('2025-03-22'),
        description: 'Se orientó al aprendiz en hábitos de estudio y técnicas de aprendizaje.',
        fkIdStrategies: 8, // Estrategia: Mejoramiento de hábitos de estudio
        fkIdReports: 3,    // Reporte: Bajo rendimiento académico
        fkIdUsers: 3      // Usuario: Andrés López - Coordinador Académico
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
    await queryInterface.bulkDelete('interventions', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
