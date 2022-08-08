'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Reserves', {
      fields: ['restId', 'tableId','day','from'],
      type: 'unique',
      name: 'restaurant_from_unique'
    }),
    await queryInterface.addConstraint('Reserves', {
      fields: ['restId', 'tableId','day','to'],
      type: 'unique',
      name: 'restaurant_to_unique'
    });
  },
  async down (queryInterface, Sequelize) {
    
  }
};
