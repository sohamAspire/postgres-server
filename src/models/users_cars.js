const { DataTypes } = require("sequelize");
const db = require("../../db");
const { user_model } = require("./user_model");
const { cars_model } = require("./cars_model");

const user_cars = db.define('users_cars', {
    user_id: {
        type: DataTypes.STRING,
        references: {
            key: 'user_id',
            model: user_model
        }
    },
    car_id: {
        type: DataTypes.STRING,
        references: {
            key: 'car_id',
            model: cars_model
        }
    }
}, { timestamps: true, freezeTableName: 'cars' })

user_cars.sync({ alter: false }).then(() => {
    console.log("Users Cars Synced");
})


module.exports = { user_cars }