const { DataTypes} = require('sequelize');

const restaurantsModel = {
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
    address:{
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
  };
  
  const restaurantsOptions = {
    timestamps: false,
    schema: 'public',
    freezeTableName: true,
  };

  const RestauransAssociate = (db) =>{
    db.Restaurants.hasMany(db.RTables, { foreignKey: 'restId', as: 'RestaurantsTable' });

    db.Restaurants.hasMany(db.Reserves, {
      foreignKey: 'restId',
      as: 'RestaurantReserves'
    })
  }
  
  module.exports = (seq) => {
    const model = seq.define('Restaurants', restaurantsModel, restaurantsOptions);
    model.associate = RestauransAssociate;
    return model;
  };