// src/config/r2.js
const dotenv = require("dotenv");
dotenv.config();

const {
  S3Client,
  ListObjectsV2Command
} = require("@aws-sdk/client-s3");

// Cliente R2 — versión moderna (v3)
const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

async function testConnection() {
  try {
    const result = await s3.send(
      new ListObjectsV2Command({
        Bucket: process.env.R2_BUCKET_NAME,
      })
    );

    console.log("✅ Conexión exitosa con Cloudflare R2");
    console.log("Archivos actuales:", result.Contents?.length || 0);

  } catch (error) {
    console.error("❌ Error al conectar con Cloudflare R2:");
    console.error(error);
    process.exit(1); // detiene servidor si no conecta
  }
}

module.exports = { s3, testConnection };
