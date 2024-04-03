const { Router } = require("express");
const controller = require("./controller")

const routes = Router()

routes.get('/get-cars', controller.getCars)
routes.post('/add-cars', controller.postCars)

module.exports = routes