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
            oldPassword: Joi.string().min(6).optional(),
            newPassword: Joi.string().min(6).optional()
            }),
        },
    getFolders:{

    },
    createFolder:{
        body: Joi.object({
            name:Joi.string().min(3).required(),
        }),
    },
    deleteFolder:{
        params: Joi.object({
            folderId:Joi.string().length(24).hex().required(),
        }),
    }        
};
module.exports = schemas;