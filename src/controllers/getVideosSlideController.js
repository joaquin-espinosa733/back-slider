const getSliderVideosController = async (req, res) => {
  try {
    const videos = await Videos
      .find({ slider: { $ne: null } }) // solo los que tienen slider
      .sort({ slider: 1 }); // ordenados por posición

    res.json(videos);
  } catch (error) {
    console.error("❌ Error obteniendo slider:", error);
    res.status(500).json({ error: "Error obteniendo slider" });
  }
};

module.exports = { getSliderVideosController };