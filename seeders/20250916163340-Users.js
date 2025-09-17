'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('123', 10); // 🔑 Contraseña genérica
    await queryInterface.bulkInsert('users', [
       {
        firstName: 'Carlos',
        lastName: 'Ramírez',
        email: 'carlos.ramirez@sena.edu.co',
        phone: '3104567890',
        document: '1001234567',
        password: hashedPassword,
        coordinadorType: 'No es coordinador',
        manager: true,
        fkIdRols: 1, // Administrador
        passwordResetToken: null,
        passwordResetExpires: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'María',
        lastName: 'Gómez',
        email: 'maria.gomez@sena.edu.co',
        phone: '3139876543',
        document: '1009876543',
        password: hashedPassword,
        coordinadorType: 'No es coordinador',
        manager: false,
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
        password: hashedPassword,
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
        password: hashedPassword,
        coordinadorType: 'No es coordinador',
        manager: false,
        fkIdRols: 4, // Profesional de Bienestar
        passwordResetToken: null,
        passwordResetExpires: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Santiago',
        lastName: 'Hernández',
        email: 'santiago.hernandez@sena.edu.co',
        phone: '3112233445',
        document: '1034567890',
        password: hashedPassword,
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
