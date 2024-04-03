require('dotenv').config()
const express = require("express");
const session = require('express-session');
const users = require('./src/users/routes')
const cors = require('cors')
const cars = require('./src/cars/routes')
const server = express();
const db = require('./db');
const { isAuthenticated } = require('./src/middlewares/auth');
const port = process.env.PORT || 3100


server.use(express.json())
server.use(cors())

server.use('/api/users', users)
server.use('/api/cars', cars)

server.use(
    session({
        name: 'sessionID',
        secret: 'rock',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: (60 * 60 * 10)
        }
    })
);

server.get('/', isAuthenticated, (req, res) => {
    res.send("Welcome to the node")
})

const user_credentials = {
    id: 'usr~2342342',
    username: 'rock',
    password: 'Rock1812002'
}

server.post('/auth/login', (req, res) => {
    const body = req.body

    try {
        if (!!body && body.username === user_credentials.username && body.password === user_credentials.password) {
            req.session.user = user_credentials
            req.session.save();
            res.status(200).send({ message: 'Login Successfull' })
        }
        else {
            res.status(200).send({ message: 'Incorrect Username or Password' })
        }
    } catch (error) {
        res.status(500).send({ message: 'Something Went Wrong' })
    }
})


server.post('/auth/logout', (req, res) => {
    try {
        req.session.destroy((error) => {
            if (error) {
                console.log(error);
            }
            else {
                res.clearCookie("sessionId");
                res.status(200).send({ message: 'Logout Successfully' })
            }
        })
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong' })
    }
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