const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { dbConfig } = require('../../config/config');
console.log('dbConfig', dbConfig)
const baseName = path.basename(__filename);
const db = {};
const sequelize = new Sequelize(dbConfig.name, dbConfig.username, dbConfig.password, {
    dialect: dbConfig.dialect
});
fs.readdirSync(__dirname)
  .filter((file) => !file.startsWith('.') && file !== baseName && file.endsWith('.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
});
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.Sequelize = sequelize;
sequelize
  .authenticate()
  .then(() => console.log('database is connected'))
  .catch((err) => {
    throw err;
  });
module.exports = db;