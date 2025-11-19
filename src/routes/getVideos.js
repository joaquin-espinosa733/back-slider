const express = require("express");
const { getVideosController } = require("../controllers/getVideosController");
const getVideos = express.Router();


getVideos.get("/", getVideosController);

module.exports = getVideos;