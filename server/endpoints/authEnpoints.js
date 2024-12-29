const express = require("express");
const router = express.Router();

const {register,login} = require("./../controllers/authControllers");
const validationMiddleware= require("./../middleware/validationMiddleware");

router.post("/register",validationMiddleware("register"), register);
router.post("/login",validationMiddleware("login"), login);

module.exports = router;