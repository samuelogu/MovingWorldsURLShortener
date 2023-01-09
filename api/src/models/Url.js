const mongoose = require("mongoose")

const schema = mongoose.Schema({
    urlCode: {
        type: String,
        required: true
    },
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Url", schema)
