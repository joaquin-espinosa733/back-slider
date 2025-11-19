const mongoose = require("mongoose");

const VideosSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    fechaSubida: {
        type: Date,
        default: Date.now,
    },
    slider: {
        type: Number,
        default: null,
    },
});

const Videos = mongoose.model("videos", VideosSchema);

module.exports = Videos;