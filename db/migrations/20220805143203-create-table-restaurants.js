'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
     await queryInterface.createTable('Restaurants', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      ownerId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName:"Users",
            schema: 'public'
          },
          key: 'id'
        }
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updateAt:{
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
      }
    });
     
  },

  async down (queryInterface, DataTypes) {
  
    await queryInterface.dropTable('Restaurants');
     
  }
};
