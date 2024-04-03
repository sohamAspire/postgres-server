const { DataTypes } = require("sequelize");
const db = require("../../db")

const cars_model = db.define('cars', {
    id: {
        type: DataTypes.STRING,
        unique : true,
        primaryKey: true,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true
    }
}, { timestamps: true, freezeTableName: 'cars' })

cars_model.sync({ alter: false }).then(() => {
    console.log("Cars Table Synced");
})


module.exports = { cars_model }