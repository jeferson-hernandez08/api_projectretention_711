'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('groups', [
       // === Técnicos ===
      {
        file: '2837465',
        trainingStart: '2024-01-15',
        trainingEnd: '2024-07-15',
        practiceStart: '2024-07-16',
        practiceEnd: '2025-01-15',
        managerName: 'Carlos Gómez',
        shift: 'Diurna',
        modality: 'Presencial',
        fkIdTrainingPrograms: 1, // Técnico en Sistemas
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        file: '2837466',
        trainingStart: '2024-03-01',
        trainingEnd: '2024-09-01',
        practiceStart: '2024-09-02',
        practiceEnd: '2025-03-01',
        managerName: 'Laura Rodríguez',
        shift: 'Nocturna',
        modality: 'Presencial',
        fkIdTrainingPrograms: 3, // Técnico en Mantenimiento de Equipos de Cómputo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        file: '2837467',
        trainingStart: '2024-04-10',
        trainingEnd: '2024-10-10',
        practiceStart: '2024-10-11',
        practiceEnd: '2025-04-10',
        managerName: 'Andrés Pérez',
        shift: 'Mixta',
        modality: 'Virtual',
        fkIdTrainingPrograms: 5, // Técnico en Programación de Software
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // === Tecnólogos ===
      {
        file: '3849201',
        trainingStart: '2023-09-01',
        trainingEnd: '2025-06-01',
        practiceStart: '2025-06-02',
        practiceEnd: '2025-12-01',
        managerName: 'María Fernanda López',
        shift: 'Diurna',
        modality: 'Presencial',
        fkIdTrainingPrograms: 2, // Tecnólogo en Análisis y Desarrollo de Software
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        file: '3849202',
        trainingStart: '2024-02-15',
        trainingEnd: '2025-11-15',
        practiceStart: '2025-11-16',
        practiceEnd: '2026-05-15',
        managerName: 'Ricardo Salazar',
        shift: 'Nocturna',
        modality: 'Presencial',
        fkIdTrainingPrograms: 4, // Tecnólogo en Gestión de Redes de Datos
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        file: '3849203',
        trainingStart: '2024-05-10',
        trainingEnd: '2026-02-10',
        practiceStart: '2026-02-11',
        practiceEnd: '2026-08-10',
        managerName: 'Diana Morales',
        shift: 'Mixta',
        modality: 'Virtual',
        fkIdTrainingPrograms: 6, // Tecnólogo en Gestión de Proyectos de Desarrollo de Software
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
    await queryInterface.bulkDelete('groups', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
