const express = require( 'express');

const validationMiddleware = require('/../middleware/ValidationMiddleware');

const { 
    settings, 
    getFolders,
    createFolder,
    deleteFolder,
    updateform,
    createform,
    deleteform,
    shareDashboard,
    createLink,
    verifyLink
} = require('../controllers/secureController');

const router = express.Router();

//settings
router.post("/settings",validationMiddleware("settings"),settings)

//folders
router.get("/folders",validationMiddleware("getFolders"),getFolders);
router.post("/folders",validationMiddleware("createFolder"),createFolder);
router.delete("/folders/:folderId",validationMiddleware("deleteFolder"),deleteFolder);

//forms
router.patch("/forms/:formId",validationMiddleware("updateform"),updateform);
router.post("/forms",validationMiddleware("createform",createform));
router.delete("/forms/:formId",validationMiddleware("deleteform"), deleteform);

//dashboard
router.post("/dashboard/share", validationMiddleware("shareDashboard"),shareDashboard);
router.post("/dashboard/createLink",validationMiddleware("createLink"),createLink); 
router.get("/dashboard/verifyLink", validationMiddleware("verifyLink"),verifyLink); //GET /api/dashboards/verify-sharelink?token=<encryptedToken>

module.exports= router;