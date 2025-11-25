const Videos = require("../models/Videos");
const AWS = require("aws-sdk");

const BUCKET_NAME = "videos";

const s3 = new AWS.S3({
    endpoint: new AWS.Endpoint(process.env.R2_ENDPOINT),
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    signatureVersion: "v4",
});

exports.deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;

        const video = await Videos.findById(id);
        if (!video) {
            return res.status(404).json({ error: "Video no encontrado" });
        }

        // borrar de Cloudflare R2
        await s3.deleteObject({
            Bucket: BUCKET_NAME,
            Key: video.key,
        }).promise();

        // borrar de la base
        await Videos.findByIdAndDelete(id);

        return res.json({ message: "🧹 Video eliminado correctamente" });

    } catch (error) {
        console.error("❌ Error al borrar video:", error);
        return res.status(500).json({ error: "Error al borrar el video" });
    }
};

