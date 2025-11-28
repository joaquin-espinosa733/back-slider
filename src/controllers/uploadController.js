// uploadVideo.js (migrado a AWS SDK v3)

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const Videos = require("../models/Videos");

// Import v3
const {
  S3Client,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");

dotenv.config();

// Endpoint R2
const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  }
});

const BUCKET_NAME = "videos";
const publicBase = process.env.R2_ENDPOINT_PUBLICA;

exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "No se envió ningún archivo" });

    // Archivo temporal
    const filePath = req.file.path;
    const fileContent = fs.readFileSync(filePath);

    const fileName = `${Date.now()}-${req.file.originalname}`;

    // Parámetros para subir
    const params = {
      Bucket: BUCKET_NAME,
      Key: `videos/${fileName}`,
      Body: fileContent,
      ContentType: "video/mp4",
    };

    // Subir a R2
    await s3.send(new PutObjectCommand(params));

    // Guardar en MongoDB
    const newVideo = new Videos({
      title: req.body.title || req.file.originalname,
      url: `${publicBase}/${params.Key}`,
      key: params.Key,
      slider: req.body.slider || null,
    });

    await newVideo.save();

    // Borrar archivo temporal
    fs.unlinkSync(filePath);

    res.json({
      message: "✅ Video subido correctamente a R2 (SDK v3)",
      video: newVideo,
    });
  } catch (error) {
    console.error("❌ Error al subir el video:", error);
    res.status(500).json({ error: "Error al subir el video" });
  }
};
