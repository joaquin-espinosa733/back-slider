const express = require("express");
const uploadRouter = express.Router();
const { uploadVideo, confirmUpload } = require("../controllers/uploadController");
const upload = require("../middlewares/upload");

uploadRouter.post("/", uploadVideo);
uploadRouter.post("/", confirmUpload);


module.exports = uploadRouter;