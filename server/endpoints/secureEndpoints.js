const express = require( 'express');

const validationMiddleware = require('../middleware/ValidationMiddleware');

const { 
    settings, 
    getFolders,
    createFolder,
    deleteFolder,
    getFile,
    updateFile,
    createFile,
    deleteFile
} = require('../controllers/secureController');

const router = express.Router();

//settings
router.post("/settings",validationMiddleware("settings"),settings)

//folders
router.get("/folders?folderId=:folderId",validationMiddleware("getFolders"),getFolders);
router.post("/folders",validationMiddleware("createFolder",createFolder));
router.delete("/folders/:folderId",validationMiddleware("deleteFolder"),deleteFolder);

//files
router.get("/files/:fileId",validationMiddleware("getFile"),getFile);
router.patch("/files/:fileId",validationMiddleware("updateFile"),updateFile);
router.post("/files",validationMiddleware("createFile",createFile));
router.delete("/files/:fileId",validationMiddleware("deleteFile"), deleteFile);

//dashbo

module.exports= router;