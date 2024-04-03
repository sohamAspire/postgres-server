const uid = require("uuid");
const { user_model } = require('../models/user_model');
const { user_cars } = require('../models/users_cars');
const { cars_model } = require("../models/cars_model");

const getUsers = async (_, res) => {
    try {
        const fetchUsers = await user_model.findAll({
            attributes: ['id', 'name', 'email', 'phone'],
            include: [{
                model: cars_model,
                attributes: ['model', 'brand' , 'id'],
                as: "cars",
                through : { attributes : []}
            }]
        })
        res.status(200).send({ data: fetchUsers })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong with Get All process" })
    }
}

const getUsersById = async (req, res) => {
    try {
        const id = req.params.id
        const fetchUser = await user_model.findByPk(id)
        res.status(200).send({ data: fetchUser })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong with Get User by Id process" })
    }
}

const postUsers = async (req, res) => {
    try {
        const body = { ...req.body, id: `usr~${uid.v4()}` }
        const user = await user_model.create(body)
        if (!!user) {
            const user_cars_details = user_cars.create({ car_id: body.car_id, user_id: body.id })
            res.status(200).send({ message: "Data Added Successfully", data: { ...user.dataValues, user_cars: user_cars_details } })
        }
        else {
            res.status(200).send({ message: "Data Added Successfully", data: { ...user.dataValues } })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong with add process", error: error.errors })
    }
}

const checkUserExistById = async (id) => {
    const existenceOfUser = await user_model.findOne({ where: { id: id } })
    return existenceOfUser
}

const updateUsers = async (req, res) => {
    try {
        const id = req.params.id
        const checkUserID = await checkUserExistById(id)
        if (!!checkUserID) {
            await user_model.update({ name: req.body.name, email: req.body.email, phone: req.body.phone }, { where: { id: id } })
            res.status(200).send({ message: "Data Updated Successfully" })
        }
        else {
            res.status(404).send({ message: "User Does'nt Exist" })
        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong with update process", error: error.errors })
    }
}

module.exports = { getUsers, postUsers, updateUsers, getUsersById }