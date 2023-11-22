'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_notes', [
      {
        user_id: 1,
        note_id: 1,
        admin_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        user_id: 2,
        note_id: 2,
        admin_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        user_id: 1,
        note_id: 3,
        admin_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_notes', null, {})
  }
};
