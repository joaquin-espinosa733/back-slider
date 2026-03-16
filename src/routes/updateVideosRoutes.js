const express = require("express");
const { updateSliderController } = require("../controllers/updatesVideoController");
const updateVideos = express.Router();


updateVideos.put("/:id", updateSliderController);

module.exports = updateVideos;