const { Sequelize } = require('sequelize');

// const db = new Sequelize(process.env.POOL_URL + '?sslmode=require' , {
//     logging: false,
//     dialect: 'postgres'
// });

const db = new Sequelize('CRUD', 'postgres', '8980', {
    host: 'localhost',
    logging: false,
    dialect:  'postgres' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

module.exports = db

