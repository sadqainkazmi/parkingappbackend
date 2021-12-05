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
