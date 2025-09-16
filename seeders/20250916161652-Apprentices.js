'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('apprentices', [
      {
        id: 1,
        documentType: 'CC',
        document: '1002456789',
        firtsName: 'Juan',
        lastName: 'Pérez',
        phone: '3104567890',
        email: 'juan.perez@sena.edu.co',
        status: 'En formación',
        quarter: 'I',
        fkIdGroups: 1, // Técnico en Sistemas
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        documentType: 'CC',
        document: '1003456781',
        firtsName: 'María',
        lastName: 'Rodríguez',
        phone: '3129876543',
        email: 'maria.rodriguez@sena.edu.co',
        status: 'En formación',
        quarter: 'II',
        fkIdGroups: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        documentType: 'TI',
        document: '1045879632',
        firtsName: 'Carlos',
        lastName: 'Gómez',
        phone: '3012345678',
        email: 'carlos.gomez@sena.edu.co',
        status: 'En práctica',
        quarter: 'III',
        fkIdGroups: 2, // Técnico en Mantenimiento de Equipos de Cómputo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        documentType: 'CC',
        document: '1098765432',
        firtsName: 'Laura',
        lastName: 'Martínez',
        phone: '3204567890',
        email: 'laura.martinez@sena.edu.co',
        status: 'Desertado',
        quarter: 'II',
        fkIdGroups: 3, // Técnico en Programación de Software
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        documentType: 'CC',
        document: '1076543210',
        firtsName: 'Andrés',
        lastName: 'Salazar',
        phone: '3156789012',
        email: 'andres.salazar@sena.edu.co',
        status: 'En práctica',
        quarter: 'IV',
        fkIdGroups: 4, // Tecnólogo en ADSO
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        documentType: 'CC',
        document: '1001234567',
        firtsName: 'Diana',
        lastName: 'Morales',
        phone: '3167890123',
        email: 'diana.morales@sena.edu.co',
        status: 'Certificado',
        quarter: 'IV',
        fkIdGroups: 5, // Tecnólogo en Redes de Datos
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        documentType: 'TI',
        document: '1023456789',
        firtsName: 'Felipe',
        lastName: 'Castaño',
        phone: '3114567890',
        email: 'felipe.castano@sena.edu.co',
        status: 'En formación',
        quarter: 'I',
        fkIdGroups: 6, // Tecnólogo en Gestión de Proyectos de Software
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
    await queryInterface.bulkDelete('apprentices', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
