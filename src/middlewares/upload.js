const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // carpeta donde se guardan temporalmente
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

// límites opcionales
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 1024 } // 1GB si querés
});

module.exports = upload;

