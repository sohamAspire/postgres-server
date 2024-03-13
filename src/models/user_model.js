const { DataTypes } = require("sequelize");
const db = require("../../db")
const uid = require("uuid");
// const { cars_model } = require("./cars_model");

const user_model = db.define('users', {
    id: {
        type: DataTypes.STRING,
        defaultValue: `usr~${uid.v4()}`,
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

user_model.sync({ force: false }).then(() => {
    console.log("Users Table Synced");
})

// user_model.hasMany(cars_model, {
//     as: 'cars',
//     foreignKey: {
//         name: 'user_id',
//         allowNull: false
//     }
// });

// cars_model.belongsTo(user_model , { foreignKey: 'user_id' })

module.exports = { user_model }