const { DataTypes} = require('sequelize');

const reservesModel = {
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
    day:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    from:{
        type: DataTypes.TIME,
        allowNull: false,
    },
    to:{
        type: DataTypes.TIME,
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
  };
  
  const reservesOptions = {
    timestamps: false,
    schema: 'public',
    freezeTableName: true,
  };

  const ReserveAssociate = (db) =>{
    db.Reserves.belongsTo(db.Users, {
      foreignKey: 'userId',
      as: 'UsersReserves'
    })

    db.Reserves.belongsTo(db.Restaurants, {
      foreignKey: 'restId',
      as: 'ReserveRestaurants'
    })
    db.Reserves.belongsTo(db.RTables,{
        foreignKey: 'tableId',
        as: 'TableReserves'
    })
  }
  
  module.exports = (seq) => {
    const model = seq.define('Reserves', reservesModel, reservesOptions);
    model.associate = ReserveAssociate;
    return model;
  };