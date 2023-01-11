const urlService = require('../services/url.service')
const validUrl = require('valid-url')
const uuid = require('../utils/uuid');
const createError = require('http-errors')

module.exports = {

    async shortcode (req, res, next) {

        const { url, shortcode } = req.body

        if(!shortcode) {
            req.body.shortcode = uuid(6);
            return next()
        }

        const data = await urlService.checkIfUrlExistWithShortcode(url, shortcode)

        if (data) return res.status(200).json({
            status: true,
            message: "Url successfully shorten",
            data
        })

        const checkShortcode = await urlService.checkIfShortcodeExist(shortcode);

        if (checkShortcode) {
            next(createError.Conflict('Url with shortcode already exist'))
        }

        next()

    },

    async shortcodeExist (req, res, next) {

        const { shortcode } = req.params;

        const url = await urlService.checkIfShortcodeExist(shortcode)

        if (!url) return next(createError.NotFound('Shortcode does not exist'))

        next()

    },

    async isValidUrl (req, res, next) {

        const { url } = req.body;

        if (!validUrl.isUri(url)) return next(createError.BadRequest('Url is not valid'))

        next()

    }

}
