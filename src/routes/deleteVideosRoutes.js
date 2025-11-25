const express = require("express");
const videoDeleteRouter = express.Router();
const { deleteVideo } = require("../controllers/deleteVideoController");

videoDeleteRouter.delete("/:id", deleteVideo);

module.exports = videoDeleteRouter;