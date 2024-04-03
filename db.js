const { Sequelize } = require('sequelize');

// const db = new Sequelize(process.env.POOL_URL + '?sslmode=require' , {
//     logging: false,
//     dialect: 'postgres'
// });

const db = new Sequelize('demo', 'postgres', 'spatel@012023', {
  host: 'localhost',
  logging: false,
  dialect: 'postgres'
});

// const db = new Sequelize('CRUD', 'postgres', '8980', {
//   host: 'localhost',
//   logging: false,
//   dialect: 'postgres'
// });

module.exports = db

