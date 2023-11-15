'use strict';

/* @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
    {
      email: 'carlos@email.com',
      nome: 'carlos',
      senha_hash: '1234',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'giovane@email.com',
      nome: 'giovane',
      senha_hash: '123',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
};
