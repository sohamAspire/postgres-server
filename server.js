const express = require("express");
const users = require('./src/users/routes')
const cors = require('cors')
// const {cars_model} = require('./src/models/cars_model')
const cars = require('./src/cars/routes')
const server = express();
const db = require('./db')
const port = 3100

server.use(express.json())
server.use(cors())

server.use('/api/users', users)
server.use('/api/cars', cars)

server.get('/', (req, res) => {
    res.send("Welcome to the node")
})

server.listen(port, async () => {
    console.log(`Server is listening to port ${port}`)
    try {
        await db.authenticate()
        console.log("Coonected With DB");
    } catch (error) {
        console.log("Something went wrong with connection...");
    }
}
)