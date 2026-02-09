const express = require("express");
const uploadRouter = express.Router();
const { uploadVideo, confirmUpload } = require("../controllers/uploadController");
const upload = require("../middlewares/upload");

uploadRouter.post("/upload", uploadVideo);
uploadRouter.post("/confirm", confirmUpload);


module.exports = uploadRouter;