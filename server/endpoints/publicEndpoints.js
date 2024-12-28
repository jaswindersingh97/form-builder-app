const express = require("express");
const router = express.Router();

const validationMiddleware = require('./../middleware/validationMiddleware');

const {getform, submitForm,view,start,complete} = require('./../controllers/publicController');

router.get("/forms/:formId",validationMiddleware("getform"),getform);
router.post("/forms/submit/:formId",validationMiddleware("submitForm"), submitForm);

router.post('/forms/view/:formId', validationMiddleware("tracking"), view);
router.post('/forms/start/:formId', validationMiddleware("tracking"), start);
router.post('/forms/complete/:formId', validationMiddleware("tracking"),complete);

module.exports = router;

//validationMiddleware("submitForm"),