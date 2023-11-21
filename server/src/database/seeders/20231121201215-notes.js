'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('notes', [
      {
        titulo: 'Uma nota pequena!',
        texto: 'Lembrar de tirar o lixo.',
        created_at: new Date(),
        updated_at: new Date()
      }, {
        titulo: 'Uma nota grande!',
        texto: 'Etiam sagittis nulla a ullamcorper pharetra. Phasellus vulputate, mi non lobortis tristique, purus est bibendum velit, et accumsan elit risus nec tortor. Curabitur tempor malesuada mi ut dictum. Donec orci nisl, pellentesque et semper et, ultricies nec massa. Mauris pulvinar orci sed lacus accumsan, non ultrices ligula fringilla. Nunc eu tristique nulla, eu venenatis urna. Curabitur et ante id mi venenatis sagittis consequat quis libero. In feugiat eros eu tincidunt venenatis. Mauris ut purus eros.',
        created_at: new Date(),
        updated_at: new Date()
      }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('notes', null, {})
  }
};
