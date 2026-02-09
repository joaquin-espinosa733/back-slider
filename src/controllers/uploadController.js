// uploadVideo.js (TODO EN UNO – R2 + Mongo)

const dotenv = require("dotenv");
const Videos = require("../models/Videos");

const {
  S3Client,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

dotenv.config();

// R2 Client
const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = "videos";
const publicBase = process.env.R2_ENDPOINT_PUBLICA;

/**
 * 1️⃣ Genera URL firmada
 * 2️⃣ Devuelve key + url pública
 */
exports.uploadVideo = async (req, res) => {
  try {
    const { fileName, contentType, title, slider } = req.body;

    if (!fileName || !contentType) {
      return res.status(400).json({ error: "Faltan datos del archivo" });
    }

    const key = `videos/${Date.now()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3, command, {
      expiresIn: 60 * 5, // 5 min
    });

    // ⚠️ NO guardamos aún en Mongo
    // Primero el front sube el archivo

    res.json({
      uploadUrl,
      key,
      publicUrl: `${publicBase}/${key}`,
      title: title || fileName,
      slider: slider ?? null,
    });

  } catch (error) {
    console.error("❌ Error generando upload:", error);
    res.status(500).json({ error: "Error generando upload" });
  }
};

/**
 * 3️⃣ Guarda metadata en Mongo (cuando el upload ya terminó)
 */
exports.confirmUpload = async (req, res) => {
  try {
    const { title, url, key, slider } = req.body;

    if (!url || !key) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    const newVideo = new Videos({
      title,
      url,
      key,
      slider,
    });

    await newVideo.save();

    res.json({
      message: "✅ Video registrado correctamente",
      video: newVideo,
    });

  } catch (error) {
    console.error("❌ Error guardando video:", error);
    res.status(500).json({ error: "Error guardando video" });
  }
};
