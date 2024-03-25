const { DataTypes } = require("sequelize");
const db = require("../../db")

const user_cars = db.define('users_cars', {
    user_id : {
        type : DataTypes.STRING,
    },
    car_id : {
        type : DataTypes.STRING,
    }
}, { timestamps: true, freezeTableName: 'cars' })

user_cars.sync({ alter: true }).then(() => {
    console.log("Users Cars Synced");
})


module.exports = { user_cars }