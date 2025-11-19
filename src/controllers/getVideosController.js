const Videos = require("../models/Videos");



// Obtener todos los videos
const getVideosController = async (req, res) => {
    try {
        const videos = await Videos.find().sort({ fechaSubida: -1 });
        res.json(videos);
    } catch (error) {
        console.error("❌ Error al obtener los videos:", error);
        res.status(500).json({ error: "Error al obtener los videos" });
    }
};

module.exports = { getVideosController };
