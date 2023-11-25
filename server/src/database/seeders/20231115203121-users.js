'use strict';

const bcrypt = require('bcrypt')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
    {
      email: 'giovane@email.com',
      nome: 'giovane',
      senha_hash: await bcrypt.hash('12345', 10),
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'carlos@email.com',
      nome: 'carlos',
      senha_hash: await bcrypt.hash('12345', 10),
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
};
