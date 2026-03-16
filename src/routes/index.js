//*importamos "Router" del modulo de express:
const { Router } = require("express");
const uploadRouter = require("./uploadRoutes");
const getVideos = require("./getVideos");
const videoDeleteRouter = require("./deleteVideosRoutes");
const updateVideos = require("./updateVideosRoutes");

//* creamos una varible para guardar la instancia de Router():
const router = Router();

router.use("/cargar", uploadRouter);
router.use("/traer", getVideos);
router.use("/borrar", videoDeleteRouter);
router.use("/update", updateVideos);



module.exports = router;