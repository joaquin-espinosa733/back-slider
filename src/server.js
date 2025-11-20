const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./routes')

const server = express()

//* Middlewares */
server.use(morgan('dev'));
app.use(cors({
    origin: ["https://novedades-three.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
server.use(express.json());

server.use(router)

module.exports = server