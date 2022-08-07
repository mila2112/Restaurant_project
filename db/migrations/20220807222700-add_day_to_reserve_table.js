'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn( 
      'Reserves',
      'day',
      {
        type: Sequelize.DATEONLY,
      },
      )
    },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Reserves',
      'day'
    );
  }
};
