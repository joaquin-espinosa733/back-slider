// src/config/r2.js
const AWS = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();

const endpoint = new AWS.Endpoint(process.env.R2_ENDPOINT);

const s3 = new AWS.S3({
  endpoint,
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

async function testConnection() {
  try {
    const result = await s3.listObjectsV2({ Bucket: process.env.R2_BUCKET_NAME }).promise();
    console.log("✅ Conexión exitosa con Cloudflare R2");
    console.log("Archivos actuales:", result.Contents?.length || 0);
  } catch (error) {
    console.error("❌ Error al conectar con Cloudflare R2:");
    console.error(error);
    process.exit(1); // detener el servidor si no conecta
  }
}

module.exports = { s3, testConnection };
