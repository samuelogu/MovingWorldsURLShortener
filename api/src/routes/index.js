const routes = require('express').Router();
const createError = require('http-errors')
const url = require('./url')

routes.all("/", (req, res)=> {

    res.status(200).json({
        status: true,
        message: "MovingWorlds URL Shortener API v0.1"
    })
})

routes.use('/url', url)

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
