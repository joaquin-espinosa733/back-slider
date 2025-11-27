const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./routes')

const server = express();

// Middlewares
server.use(morgan('dev'));

server.use(cors({
    origin: [
        "https://novedades-three.vercel.app",
        "https://panel-slider.vercel.app",
        "http://localhost:3000",
        "http://127.0.0.1:5500",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

// server.options("*", cors()); // <- va DESPUÉS del cors principal

server.use(express.json());

server.use(router)

module.exports = server
