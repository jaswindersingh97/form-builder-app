const { query } = require('express');
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
    },
    getUser:{

    },
    getform:{
        params: Joi.object({
            formId:Joi.string().length(24).hex().required(),
        })
    },
    searchUser:{
        query:Joi.object({
            query:Joi.string().required(),
        }),
    },
    shareDashboard:{
        body:Joi.object({
            email: Joi.string().email().required(),
            permission: Joi.string().valid('view', 'edit').required(),
        }),
    },
    createForm:{
        body:Joi.object({
            name:Joi.string().min(2).required(),
            folder:Joi.string().length(24).hex().required(),
            elements:Joi.array().required(),
        }),
    },
    updateForm:{
        params:Joi.object({
            formId:Joi.string().length(24).hex().required(),
        }),
        body:Joi.object({
            _id:Joi.string().optional(),
            userId:Joi.optional(),
            __v:Joi.optional(),
            name:Joi.string().min(2).optional(),
            folder:Joi.string().length(24).hex().optional(),
            elements:Joi.array().optional(),
        }),
    },
    deleteForm:{
        params:Joi.object({
            formId:Joi.string().length(24).hex().required(),
        })
    },
    submitForm:{
        params:Joi.object({
            formId:Joi.string().length(24).hex().required(),
        }),
        body:Joi.object({
            data:Joi.array().required(),
        }),
    },
    tracking:{
        params:Joi.object({
            formId:Joi.string().length(24).hex().required(),
        })
    },
    createLink:{
        body:Joi.object({
            access:Joi.string().required(),
        }),
    },
    verifyLink:{
        params:Joi.object({
            data:Joi.string().required(),
        }),
    },
};
module.exports = schemas;