'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Restaurants',
      'address',
      {
        type: Sequelize.STRING,
      },
    );
   await queryInterface.removeColumn(
     'Restaurants',
     'phone',
      {
        type: Sequelize.STRING,
      },
);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Restaurants',
      'address'
    );
  }
};
