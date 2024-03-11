const { Router } = require("express");
const controller = require("./controller")

const routes = Router()

routes.get('/get-cars', controller.getCars)
routes.post('/create-cars', controller.postCars)
// routes.patch('/update-user/:id', controller.updateUsers)

module.exports = routes