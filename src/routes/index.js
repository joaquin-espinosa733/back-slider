//*importamos "Router" del modulo de express:
const { Router } = require("express");
const uploadRouter = require("./uploadRoutes");
const getVideos = require("./getVideos");
const videoDeleteRouter = require("./deleteVideosRoutes");

//* creamos una varible para guardar la instancia de Router():
const router = Router();

router.use("/cargar", uploadRouter);
router.use("/traer", getVideos);
router.use("/borrar", videoDeleteRouter);


module.exports = router;