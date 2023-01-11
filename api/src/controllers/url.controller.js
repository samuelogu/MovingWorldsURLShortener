const urlService = require('../services/url.service')
const createError = require('http-errors')

class urlController {

    static submit = async (req, res, next) => {

        try {
            const data = await urlService.submitUrl(req.body)
            res.status(200).json({
                status: true,
                message: "Url successfully shorten",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static shortcode = async (req, res, next) => {

        const { shortcode } = req.params;

        try {

            const url = await urlService.getUrl(shortcode);

            res.redirect(url)

        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static stat = async (req, res, next) => {

        const { shortcode } = req.params;

        try {

            const data = await urlService.getUrlStat(shortcode);

            res.status(200).json({
                status: true,
                message: "Url stats",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

}

module.exports = urlController;
