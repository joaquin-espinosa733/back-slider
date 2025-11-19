//*importamos "Router" del modulo de express:
const { Router } = require("express");
const uploadRouter = require("./uploadRoutes");
const getVideos = require("./getVideos");

//* creamos una varible para guardar la instancia de Router():
const router = Router();

router.use("/cargar", uploadRouter);
router.use("/traer", getVideos);


module.exports = router;