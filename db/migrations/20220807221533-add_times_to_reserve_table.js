'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn( 
    'Reserves',
    'From',
    {
      type: Sequelize.TIME,
    },
    ),
  

    await queryInterface.addColumn( 
      'Reserves',
      'To',
      {
        type: Sequelize.TIME,
      },
      );
  
    },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Reserves',
      'From'
    );
    await queryInterface.removeColumn(
      'Reserves',
      'To'
    );
  }
  
  
};
