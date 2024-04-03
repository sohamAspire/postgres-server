const { DataTypes } = require("sequelize");
const db = require("../../db")
const { cars_model } = require("./cars_model");
const { user_cars } = require("./users_cars");

const user_model = db.define('users', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        get() {
            return this.getDataValue('name') ? this.getDataValue('name').toUpperCase() : '';
        },
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, { timestamps: true, freezeTableName: true })

user_model.sync({ alter: false }).then(() => {
    console.log("Users Table Synced");
})

user_model.belongsToMany(cars_model , { through : user_cars , foreignKey : 'user_id'}),
cars_model.belongsToMany(user_model , { through : user_cars , foreignKey : 'car_id'})

module.exports = { user_model }