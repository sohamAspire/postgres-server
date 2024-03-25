
const { cars_model } = require('../models/cars_model')
const uid = require("uuid");
const { user_cars } = require('../models/users_cars');

const getCars = async (_, res) => {
    try {
        const getCars = await cars_model.findAll({})
        console.log(getCars);
        res.status(200).send({ data: getCars })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong with add process" })
    }
}


const postCars = async (req, res) => {
    try {
        const body = { ...req.body, id: `car~${uid.v4()}` }
        const car = await cars_model.create(body)
        if(car && !!req.body.user_id){
            const users_assigned = await user_cars.create({
                user_id : req.body.user_id,
                car_id : body.id
            })
            res.status(200).send({ message: "Data Added Successfully" , data : {...car.dataValues , user_cars :  users_assigned.dataValues}  })
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