const fs = require("fs");
const AWS = require("aws-sdk");
const path = require("path");
const dotenv = require("dotenv");
const Videos = require("../models/Videos");

dotenv.config();

const endpoint = new AWS.Endpoint(process.env.R2_ENDPOINT);

const s3 = new AWS.S3({
  endpoint,
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

const BUCKET_NAME = "videos"; // ⚠️ reemplazá con el tuyo real
const publicBase = process.env.R2_ENDPOINT_PUBLICA;

exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No se envió ningún archivo" });

    const fileContent = fs.readFileSync(req.file.path);

    const fileName = `${Date.now()}-${req.file.originalname}`;
    const params = {
      Bucket: BUCKET_NAME,
      Key: `videos/${fileName}`,
      Body: fileContent,
      ContentType: req.file.mimetype,
    };

    const data = await s3.upload(params).promise();
    fs.unlinkSync(req.file.path);

    // 🔹 Guardar en la base de datos
    const newVideo = new Videos({
      title: req.body.title || req.file.originalname,
      url: `${publicBase}/${params.Key}`,
      key: params.Key, // lo guardamos por si después querés borrar el video de R2
      slider: req.body.slider || null,
    });

    await newVideo.save();

    res.json({
      message: "✅ Video subido correctamente",
      video: newVideo,
    });
  } catch (error) {
    console.error("❌ Error al subir el video:", error);
    res.status(500).json({ error: "Error al subir el video" });
  }
};