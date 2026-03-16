const Videos = require("../models/Videos");

// actualizar posicion slider
const updateSliderController = async (req, res) => {
    try {
        const { id } = req.params;
        let { slider } = req.body;

        // convertir a numero o null
        slider = slider ? Number(slider) : null;

        if (slider !== null) {
            // liberar la posicion si ya la ocupa otro video
            await Videos.updateMany(
                { slider: slider, _id: { $ne: id } },
                { $set: { slider: null } }
            );
        }

        const video = await Videos.findByIdAndUpdate(
            id,
            { slider },
            { new: true }
        );

        res.json(video);

    } catch (error) {
        console.error("❌ Error actualizando slider:", error);
        res.status(500).json({ error: "Error actualizando slider" });
    }
};

module.exports = { updateSliderController };