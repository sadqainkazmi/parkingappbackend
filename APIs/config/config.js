var env= require('dotenv').config();
module.exports={
  "production": {
    "username": process.env.username,
    "password": process.env.password,
    "database": process.env.database,
    "host": process.env.host,
    "port": process.env.port,
    "dialect": "postgres",
    "baseUrl":"liverserverapp"
  },

"development": {
  
  "username": "postgres",
  "password": "admin",
  "database": "postgres",
  "host": "localhost",
  "logging": true,
  "port": 5432,
  "dialect": "postgres",
  "baseUrl":"http://localhost:8080"
  }
}
// sequelize = new Sequelize('da4squm39sh4q3', 'avgopgldosgivc', '6ce05b88437101dd3d4db1d6f8b071e7d6ed85f1805408b34032f0292c5622b7',{
   
  //    host: 'ec2-54-161-239-198.compute-1.amazonaws.com', 
  //    port:'5432',
  //    dialect:'postgres',
  //    dialectOptions: {
  //     ssl: {
  //         rejectUnauthorized: false
  //     }
  // },
  //    pool: { max: 5, min: 0, acquire: 34000, idle: 300000 }
  // }
  // );