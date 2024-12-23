const express = require("express");
const router = express.Router();

const validationMiddleware = require('./../middleware/validationMiddleware');

const {getform} = require('./../controllers/publicController');

router.get("/forms/:formId",validationMiddleware("getform"),getform);

module.exports = router;