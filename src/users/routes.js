const { Router } = require("express");
const controller = require("./controller")

const routes = Router()

routes.get('/get-users', controller.getUsers)
routes.post('/post-users', controller.postUsers)
routes.patch('/update-user/:id', controller.updateUsers)

module.exports = routes