const routes = require('express').Router();
const url = require('../controllers/url.controller')

const validator = require('../middlewares/validator')
const schemas = require('../validators/url.validator')

routes.get('/:shortcode', url.shortcode)
routes.get('/:shortcode/stat', url.stat)
routes.post('/submit', validator(schemas.submit), url.submit)

module.exports = routes;