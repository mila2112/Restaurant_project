'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {

     await queryInterface.createTable('Reserves',{
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId:{
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
      restId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName:"Restaurants",
              schema: 'public'
            },
            key: 'id'
          }
      },
      tableId:{
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName:"RTables",
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

     await queryInterface.dropTable('Reserves');
     
  }
};
