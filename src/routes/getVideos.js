const express = require("express");
const { getVideosController } = require("../controllers/getVideosController");
const { getSliderVideosController } = require("../controllers/getVideosSlideController");
const getVideos = express.Router();


getVideos.get("/", getVideosController);
getVideos.get("/slider", getSliderVideosController)

module.exports = getVideos;