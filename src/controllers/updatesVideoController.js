const Videos = require("../models/Videos");

// actualizar posicion slider
const updateSliderController = async (req, res) => {
    try {
        const { id } = req.params;
        const { slider } = req.body;

        const video = await Videos.findByIdAndUpdate(
            id,
            { slider },
            { new: true }
        );

        res.json(video);
    } catch (error) {
        console.error("❌ Error actualizando slider:", error);
        res.status(500).json({ error: "Error actualizando posición" });
    }
};

module.exports = { updateSliderController };