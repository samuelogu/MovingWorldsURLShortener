const mongoose = require("mongoose")

const schema = mongoose.Schema({
    shortcode: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    entry: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    collation: { locale: 'en', strength: 2 },
    versionKey: false
})

module.exports = mongoose.model("Url", schema)
