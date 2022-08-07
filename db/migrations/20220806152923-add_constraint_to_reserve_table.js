'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Reserves', {
      fields: ['restId', 'tableId'],
      type: 'unique',
      name: 'reserve_tableId_unique'
    });
  },

  async down (queryInterface, Sequelize) {
    
  }
};
