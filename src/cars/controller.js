
const { cars_model } = require('../models/cars_model')
const uid = require("uuid");

const getCars = async (_, res) => {
    try {
        const getCars = await cars_model.findAll()
        const response = getCars.filter((data) => data.dataValues)
        res.status(200).send({ data: response, count: getCars.length })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong with add process" })
    }
}


const postCars = async (req, res) => {
    try {
        if (req.body.length > 1) {
            const body = await req.body.filter((value) => {
                value['id'] = `car~${uid.v4()}`
                return value
            });
            await cars_model.bulkCreate(body)
            res.status(200).send({ message: "Data Added Successfully" })
        }
        else {
            const body = { ...req.body, id: `car~${uid.v4()}` }
            await cars_model.create(body)
            res.status(200).send({ message: "Data Added Successfully" })
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

module.exports = { getCars, postCars, updateUsers }