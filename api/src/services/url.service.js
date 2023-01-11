const Url = require("../models/Url")
const createError = require("http-errors");
require('dotenv').config()
const baseUrl = process.env.BASE_URL

class urlService {

    static async submitUrl(req) {

        let data = await this.checkIfUrlExistWithShortcode(req.url, req.shortcode)

        if (data) return data;

        req.shortUrl = `${baseUrl}/${req.shortcode}`;

        data = new Url(req)
        await data.save()
        return data

    }

    static async getUrlStat(shortcode) {

        let url = await Url.findOne({ shortcode });
        url.lastAccessed = url.updatedAt
        delete url.updatedAt;

        console.log(url);

        return url;
    }

    static async getUrl(shortcode) {

        const data = await this.checkIfShortcodeExist(shortcode)

        if (!data) throw createError.NotFound('Url not found')

        await this.updateEntry(shortcode)

        return data.url;
    }

    static async checkIfShortcodeExist(shortcode) {
        return Url.findOne({ shortcode })
    }

    static async updateEntry(shortcode) {
        await Url.findOneAndUpdate({ shortcode }, { $inc: { "entry" : 1 } })
    }

    static async checkIfUrlExistWithShortcode(url, shortcode) {
        return Url.findOne({ url, shortcode })
    }

}

module.exports = urlService;
