'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {

      await queryInterface.createTable('RTables',{
        id: {
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          type: DataTypes.INTEGER,
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
        tableNumber: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        chairs:{
            type:DataTypes.INTEGER,
            allowNull:false
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
 await queryInterface.dropTable('RTables');
  }
};
