const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.POOL_URL || 'postgres://default:6MvXL0cEAtnm@ep-morning-cloud-a1mxm0yw-pooler.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require', {
    logging: false,
    dialect: 'postgres'
});


module.exports = db

