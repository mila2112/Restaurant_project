'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.createTable('Users',{
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      role:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updateAt:{
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
      }
    } );
     
  },

  async down (queryInterface, DataTypes) {

    await queryInterface.dropTable('Users');
     
  }
};
