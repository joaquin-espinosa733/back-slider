// deleteVideo.js
const Videos = require("../models/Videos");

const {
    S3Client,
    DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

const BUCKET_NAME = "videos";

exports.deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;

        const video = await Videos.findById(id);
        if (!video) {
            return res.status(404).json({ error: "Video no encontrado" });
        }

        // 🗑️ Borrar archivo de Cloudflare R2
        await s3.send(
            new DeleteObjectCommand({
                Bucket: BUCKET_NAME,
                Key: video.key,
            })
        );

        // 🗑️ Borrar de MongoDB
        await Videos.findByIdAndDelete(id);

        return res.json({ message: "🧹 Video eliminado correctamente" });

    } catch (error) {
        console.error("❌ Error al borrar video:", error);
        return res.status(500).json({ error: "Error al borrar el video" });
    }
};
