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
    searchUser
} = require('../controllers/secureController');

const router = express.Router();

//settings
router.post("/settings",validationMiddleware("settings"),settings)

//folders
router.get("/folders",validationMiddleware("getFolders"),getFolders);
router.post("/folders",validationMiddleware("createFolder"),createFolder);
router.delete("/folders/:folderId",validationMiddleware("deleteFolder"),deleteFolder);

//forms
router.post("/forms",validationMiddleware("createform",createForm));
router.put("/forms/:formId",validationMiddleware("updateform"),updateForm);
router.delete("/forms/:formId",validationMiddleware("deleteform"), deleteForm);

//dashboard
router.post("/dashboard/share", validationMiddleware("shareDashboard"),shareDashboard);
// router.post("/dashboard/createLink",validationMiddleware("createLink"),createLink); 
// router.get("/dashboard/verifyLink", validationMiddleware("verifyLink"),verifyLink); //GET /api/dashboards/verify-sharelink?token=<encryptedToken>

//user
router.get("/users",validationMiddleware("getUser"), getUser);
router.get("/users/search",validationMiddleware("searchUser"),searchUser);

module.exports= router;