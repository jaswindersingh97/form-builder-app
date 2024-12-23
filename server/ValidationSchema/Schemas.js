const Joi = require('joi');

const schemas ={
    register: {
        body: Joi.object({
            name: Joi.string().min(3).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            }),
        },
    login: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(), 
            }),
        },
    settings:{
        body: Joi.object({
            name:Joi.string().min(3).optional(),
            email: Joi.string().email().optional(),
            oldpassword: Joi.string().min(6).optional(),
            newpassword: Joi.string().min(6).optional()
        }),
    },    
};
module.exports = schemas;