const routes = require('express').Router();
const url = require('../controllers/url.controller')

const validator = require('../middlewares/validator')
const schemas = require('../validators/url.validator')

routes.get('/', () => {

})

module.exports = routes;