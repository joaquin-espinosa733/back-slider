const express = require("express");
const uploadRouter = express.Router();
const { uploadVideo } = require("../controllers/uploadController");
const upload = require("../middlewares/upload");

uploadRouter.post("/", upload.single("video"), uploadVideo);

module.exports = uploadRouter;