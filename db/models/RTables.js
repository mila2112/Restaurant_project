const { DataTypes} = require('sequelize');

const tablesModel = {
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
    tableNumber: { type: DataTypes.STRING, allowNull: false },
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
  };
  
  const tablesOptions = {
    timestamps: false,
    schema: 'public',
    freezeTableName: true,
    indexes: [
        {
          unique: true,
          fields: ["restId", "tableNumber"]
        }
      ]
  };

  const TableAssociate = (db) =>{
    db.RTables.belongsTo(db.Restaurants, {
      foreignKey: 'restId',
      as: 'tablesRestaurant'
    })
    db.RTables.hasMany(db.Reserves,{
        foreignKey: 'tableId',
        as: 'tableReserves'
    })
  }
  
  module.exports = (seq) => {
    const model = seq.define('RTables', tablesModel, tablesOptions);
    model.associate = TableAssociate;
    return model;
  };