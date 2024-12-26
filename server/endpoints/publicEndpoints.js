const express = require("express");
const router = express.Router();

const validationMiddleware = require('./../middleware/validationMiddleware');

const {getform, submitForm} = require('./../controllers/publicController');

router.get("/forms/:formId",validationMiddleware("getform"),getform);
router.post("/forms/submit", validationMiddleware("submitForm"), submitForm)
module.exports = router;