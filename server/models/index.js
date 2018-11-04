import fs from 'fs'
import path from 'path'
import Sequelize from 'Sequelize'

const sequelize = new Sequelize({
  dialect: 'postgres',
  port: 5432,
  database: 'db',
  username: 'user',
  password: 'pass',
  host: 'host',
  logging: console.log

});

const basename = path.basename(module.filename);
const db = {};

fs
  .readdirSync(__dirname)
  .filter((file) =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


export default db;