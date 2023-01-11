const Joi = require('joi')

const schemas = {
    submit: Joi.object().keys({
        url: Joi.string().required(),
        shortcode: Joi.string().max(4).optional()
    })
}
module.exports = schemas;
