'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 🔑 Contraseñas diferentes, seguras y hasheadas para cada usuario
    await queryInterface.bulkInsert('users', [
       {
        firstName: 'Carlos',
        lastName: 'Ramírez',
        email: 'carlos.ramirez@sena.edu.co',
        phone: '3104567890',
        document: '1001234567',
        password: await bcrypt.hash('AdminSecure123!', 12), // 🔐 Contraseña fuerte
        coordinadorType: 'No es coordinador',
        manager: true,
        fkIdRols: 1, // Administrador
        passwordResetToken: null,
        passwordResetExpires: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Julian',
        lastName: 'Salazar',
        email: 'julian.salazar@sena.edu.co',
        phone: '3139876543',
        document: '1009876543',
        password: await bcrypt.hash('Instructor456@', 12), // 🔐 Contraseña fuerte
        coordinadorType: 'No es coordinador',
        manager: true,
        fkIdRols: 2, // Instructor
        passwordResetToken: null,
        passwordResetExpires: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Andrés',
        lastName: 'López',
        email: 'andres.lopez@sena.edu.co',
        phone: '3204567890',
        document: '1012345678',
        password: await bcrypt.hash('Coordinador789#', 12), // 🔐 Contraseña fuerte
        coordinadorType: 'Coordinador Académico',
        manager: true,
        fkIdRols: 3, // Coordinador
        passwordResetToken: null,
        passwordResetExpires: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Laura',
        lastName: 'Martínez',
        email: 'laura.martinez@sena.edu.co',
        phone: '3012345678',
        document: '1023456789',
        password: await bcrypt.hash('Bienestar012$', 12), // 🔐 Contraseña fuerte
        coordinadorType: 'No es coordinador',
        manager: false,
        fkIdRols: 4, // Profesional de Bienestar
        passwordResetToken: null,
        passwordResetExpires: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Juan Jose',
        lastName: 'Posada',
        email: 'juan.posada@sena.edu.co',
        phone: '3112233445',
        document: '1034567890',
        password: await bcrypt.hash('Vocero345%', 12), // 🔐 Contraseña fuerte
        coordinadorType: 'No es coordinador',
        manager: false,
        fkIdRols: 5, // Aprendiz Vocero
        passwordResetToken: null,
        passwordResetExpires: null,
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
    await queryInterface.bulkDelete('users', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
