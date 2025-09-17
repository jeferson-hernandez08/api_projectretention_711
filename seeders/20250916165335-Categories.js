'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Motivos Económicos',
        description: 'El aprendiz posee problemas económicos que dificultan su permanencia en el SENA.',
        addressing: 'Coordinador Académico',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Motivos Laborales',
        description: 'El trabajo del aprendiz no le permite cumplir con los horarios de estudio.',
        addressing: 'Coordinador de Formación',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Motivos Familiares',
        description: 'La familia del aprendiz no lo apoya para continuar con su proceso de formación.',
        addressing: 'Coordinador Académico',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Motivos de Salud',
        description: 'El aprendiz presenta una enfermedad o condición que limita su proceso formativo.',
        addressing: 'Coordinador de Formación',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Motivos Sociales',
        description: 'El aprendiz enfrenta problemas sociales o personales que afectan su rendimiento académico.',
        addressing: 'Coordinador Académico',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Motivos Académicos del Aprendiz',
        description: 'El aprendiz presenta dificultades de aprendizaje, bajo rendimiento o desmotivación.',
        addressing: 'Coordinador de Formación',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Motivos Asociados a la Calidad del Programa de Formación',
        description: 'El aprendiz considera que el programa no cumple con sus expectativas de calidad.',
        addressing: 'Coordinador Académico',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Motivos Asociados a las Condiciones Institucionales',
        description: 'El aprendiz manifiesta inconformidades relacionadas con los recursos o la infraestructura institucional.',
        addressing: 'Coordinador de Formación',
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
    await queryInterface.bulkDelete('categories', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
