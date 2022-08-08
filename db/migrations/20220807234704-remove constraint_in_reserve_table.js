'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
      
     await queryInterface.removeConstraint('Reserves', 'reserve_tableId_unique');
  },

  async down (queryInterface, Sequelize) {
  }
};