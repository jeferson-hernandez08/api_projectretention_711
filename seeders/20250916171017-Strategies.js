'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('strategies', [
      // Motivos Económicos (fkIdCategories = 1)
      {
        strategy: 'Orientar al aprendiz sobre las oportunidades a aplicar a apoyos socioeconómicos',
        fkIdCategories: 1
      },
      {
        strategy: 'Tener conocimiento de las oportunidades de apoyos económicos que ofrece el gobierno nacional (Jóvenes en acción, ingreso solidario, etc.) para orientar a los aprendices',
        fkIdCategories: 1
      },
      {
        strategy: 'Articular acciones con el responsable de contrato para orientar a los aprendices en oportunidades de contrato de patrocinio',
        fkIdCategories: 1
      },

      // Motivos Familiares (fkIdCategories = 3)
      {
        strategy: 'Organización de grupos focales con aprendices para orientación de herramientas socioemocionales que les ayuden a superar las dificultades familiares',
        fkIdCategories: 3
      },

      // Motivos Sociales (fkIdCategories = 5)
      {
        strategy: 'Organización de grupos focales o campañas con aprendices para orientación de herramientas o habilidades sociales y sana convivencia entre pares',
        fkIdCategories: 5
      },
      {
        strategy: 'Organización de grupos focales o campañas con instructores para promover la sana convivencia y el buen trato hacia los aprendices',
        fkIdCategories: 5
      },

      // Motivos Laborales (fkIdCategories = 2)
      {
        strategy: 'Apoyo al aprendiz en la gestión para solicitar cambios de jornada o lugar de formación',
        fkIdCategories: 2
      },

      // Motivos Académicos del Aprendiz (fkIdCategories = 6)
      {
        strategy: 'Apoyo de estrategias para el mejoramiento de hábitos de estudio y actitudes positivas sobre el proceso formativo',
        fkIdCategories: 6
      },
      {
        strategy: 'Formular estrategias para adelantar transferencia de conocimiento al aprendiz mediante la gestión de monitorías',
        fkIdCategories: 6
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
    await queryInterface.bulkDelete('strategies', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
