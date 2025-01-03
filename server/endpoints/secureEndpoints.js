const express = require( 'express');

const validationMiddleware = require('./../middleware/validationMiddleware');

const { 
    settings, 
    getFolders,
    createFolder,
    deleteFolder,
    updateForm,
    createForm,
    deleteForm,
    shareDashboard,
    createLink,
    verifyLink,
    getUser,
    searchUser,
    getFoldersUserBased,
    analytics
} = require('../controllers/secureController');

const router = express.Router();

//settings
router.post("/settings",validationMiddleware("settings"),settings)

//folders
router.get("/folders",validationMiddleware("getFolders"),getFolders);   // Not implemented for other user access 
router.get("/folders/:targetId",validationMiddleware("getFolders"),getFoldersUserBased);   // Not implemented for other user access 
router.post("/folders/:userId",validationMiddleware("createFolder"),createFolder);  // implemented for other Users access but not tested
router.delete("/folders/:folderId",validationMiddleware("deleteFolder"),deleteFolder);  // implemented for other Users access but not tested

//forms
router.post("/forms",validationMiddleware("createForm"),createForm);    //implemented for other Users access but not tested
router.patch("/forms/:formId",validationMiddleware("updateForm"),updateForm);
router.delete("/forms/:formId",validationMiddleware("deleteForm"), deleteForm);

//dashboard
router.post("/dashboard/share", validationMiddleware("shareDashboard"),shareDashboard);
router.post("/dashboard/createLink",validationMiddleware("createLink"),createLink); 
router.get("/dashboard/verifyLink/:data", validationMiddleware("verifyLink"),verifyLink); //GET /api/dashboards/verify-sharelink?token=<encryptedToken>

//user
router.get("/users",validationMiddleware("getUser"), getUser);
router.get("/users/search",validationMiddleware("searchUser"),searchUser);

//analytics section
router.get("/analytics/:formId", analytics);

module.exports= router;