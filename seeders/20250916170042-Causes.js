'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('causes', [
       // Motivos Económicos (fkIdCategories = 1)
      {
        cause: 'No cuento con recursos económicos para estudiar en el SENA',
        variable: 'Necesidad del auto sostenimiento del aprendiz',
        fkIdCategories: 1
      },
      {
        cause: 'Tuve que dedicarme a trabajar por no contar con apoyo económico para dedicarme a estudiar',
        variable: 'Necesidad del auto sostenimiento del aprendiz',
        fkIdCategories: 1
      },

      // Motivos Laborales (fkIdCategories = 2)
      {
        cause: 'Mi trabajo no me deja tiempo para estudiar',
        variable: 'Rol laboral',
        fkIdCategories: 2
      },
      {
        cause: 'Se me presentó una oportunidad laboral',
        variable: 'Rol laboral',
        fkIdCategories: 2
      },

      // Motivos Familiares (fkIdCategories = 3)
      {
        cause: 'A mi familia no le agrada que yo estudiara en ese programa, quería que estudiara algo diferente',
        variable: 'Apoyo y relación familiar',
        fkIdCategories: 3
      },
      {
        cause: 'Se me presentaron conflictos, crisis o calamidades familiares que me afectaron',
        variable: 'Apoyo y relación familiar',
        fkIdCategories: 3
      },

      // Motivos de Salud (fkIdCategories = 4)
      {
        cause: 'Tuve enfermedades que me limitaron a seguir estudiando',
        variable: 'Condiciones de salud del aprendiz',
        fkIdCategories: 4
      },
      {
        cause: 'Tuve problemas con el consumo de licor u otras sustancias psicoactivas que me afectaron',
        variable: 'Condiciones de salud del aprendiz',
        fkIdCategories: 4
      },

      // Motivos Sociales (fkIdCategories = 5)
      {
        cause: 'Se me dificulta llegar al centro de formación por temas de distancia',
        variable: 'Entorno social y geográfico',
        fkIdCategories: 5
      },

      // Motivos Académicos del Aprendiz (fkIdCategories = 6)
      {
        cause: 'No me sentí capaz con todo lo que me pedían en la formación',
        variable: 'Autoeficacia y motivación',
        fkIdCategories: 6
      },
      {
        cause: 'No me iba bien en las actividades que hacía',
        variable: 'Rendimiento académico',
        fkIdCategories: 6
      },
      {
        cause: 'No logré manejar plataformas digitales dispuestas para el desarrollo de mi formación',
        variable: 'Competencias digitales',
        fkIdCategories: 6
      },
      {
        cause: 'Dejaban muchas actividades y trabajos',
        variable: 'Carga académica percibida',
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
    await queryInterface.bulkDelete('causes', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
