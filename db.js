const { Sequelize } = require('sequelize');

const db = new Sequelize('demo', 'postgres', 'spatel@012023', {
    host: 'localhost',
    logging : false,
    dialect: 'postgres'
});


module.exports = db


// const Pool = require('pg').Pool

// const Coonection_Configuration = new Pool({
//     user : 'postgres',
//     host : 'localhost',
//     database : 'demo',
//     password : 'spatel@012023',
//     port : 5432
// })

// module.exports = Coonection_Configuration