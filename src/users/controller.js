const db = require('../../db')
const { user_model } = require('../models/user_model')
const { user_cars } = require('../models/users_cars')


const getUsers = async (_, res) => {
    try {
        const fetchUsers = await user_model.findAndCountAll({
            order: [['id', 'ASC']]
        })
        // const fetchUsers = await db.query(`SELECT * FROM users`)
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


const checkUserExist = async (email) => {
    try {
        const existenceOfUser = await user_model.findOne({ where: { email: email } })
        return existenceOfUser
    } catch (error) {
        return false
    }
}

const postUsers = async (req, res) => {
    try {
        const user = await user_model.create(req.body)
        if(user && !!req.body.car_id){
            const car_assigned = await user_cars.create({ 
                car_id : req.body.car_id,
                user_id : user?.dataValues?.id
            })
            res.status(200).send({ message: "Data Added Successfully" , data : {...user.dataValues , user_cars : car_assigned.dataValues}})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong with add process", error: error.errors })
    }
}

// const postUsers = async (req, res) => {
//     try {
//         await checkUserExist(req.body.email)
//         const addUsers = await user_model.create({ name: req.body.name, email: req.body.email, phone: req.body.phone })
//         if (addUsers) {
//             res.status(200).send({ message: "Data Added Successfully" })
//         }
//     } catch (error) {
//         res.status(500).send({ message: "Something went wrong with add process", error: error.errors })
//     }
// }

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