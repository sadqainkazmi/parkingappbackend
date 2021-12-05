'use strict';

const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const basename = path.basename(__filename);
const config = require(__dirname + '/../config/config.js');
const Sequelize = require('sequelize');
const chalk = require('chalk');
const Op = Sequelize.Op;
const db = {};
let sequelize;

if (env == "production") {
  console.log(chalk.green.bgBlackBright.bold('production ❤️.'));

  // sequelize = new Sequelize(process.env[config.use_env_variable]);
  sequelize = new Sequelize(config.production.database, config.production.username, config.production.password,{
   // logging: false,
  //  operatorsAliases: false,
   host: config.production.host,port: config.production.port, dialect: config.production.dialect,
  pool: { max: 5, min: 1, acquire: 30000, idle: 10000 },
  dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    },
});

} else {
  console.log(chalk.green.bgBlackBright.bold('developementBySadqainLive ❤️.'));
  sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
     // logging: false,
     host: config.development.host,port: config.development.port, dialect: config.development.dialect,
    pool: { max: 5, min: 1, acquire: 30000, idle: 10000 }
  });

}

try {
    sequelize.authenticate();

    console.log(chalk.green.bgBlackBright.bold('Connection has been established successfully ❤️.'));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  fs
  .readdirSync(__dirname)
  .filter(file => {
    console.log(file);
    // uncomment this when create new model. it will disalbe permission model that create error
    // return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(0,-3) !== '.js') && (file !== 'permissionModel.js') ;
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(0,-3) !== '.js') ;
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes) 
       db[model.name] = model;
      //  console.log(model);
  });

  Object.keys(db).forEach(modelName => {
       console.log('---',modelName);
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
sequelize.sync({alter:true});
// sequelize.sync({force:true}); // all tables will be truncated
db.sequelize = sequelize;
db.Sequelize = Sequelize;
// db.User = require("./userModel.js")(sequelize, Sequelize);
// db.sequelize.sync({force: true,logging: console.log});
module.exports = db;