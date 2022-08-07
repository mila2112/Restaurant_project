'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn( 
    'RTables',
    'tableNumber',
    {
      type: Sequelize.STRING,
    },
    );
    await queryInterface.addConstraint('RTables', {
      fields: ['restId', 'tableNumber'],
      type: 'unique',
      name: 'restaurant_tableNumber_unique'
    });
  },

  async down (queryInterface, Sequelize) {
     
  }
};
