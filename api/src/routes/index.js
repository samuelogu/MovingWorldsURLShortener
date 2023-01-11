const routes = require('express').Router();
const createError = require('http-errors')
const url = require('../controllers/url.controller')

const check = require('../middlewares/check')
const validator = require('../middlewares/validator')
const schemas = require('../validators/url.validator')

routes.get("/", (req, res)=> {

    res.status(200).json({
        status: true,
        message: "MovingWorlds URL Shortener API v0.1"
    })
})

routes.get('/:shortcode', url.shortcode)
routes.get('/:shortcode/stats', check.shortcodeExist, url.stat)
routes.post('/submit', [validator(schemas.submit), check.isValidUrl, check.shortcode], url.submit)

routes.use( async (req, res, next) => {
    next(createError.NotFound('Route not Found'))
})

routes.use( (err, req, res, next) => {
    res.status(err.status || 500).json({
        status: false,
        message: err.message
    })
})

module.exports = routes;
