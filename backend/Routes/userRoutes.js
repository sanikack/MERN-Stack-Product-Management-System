const express= require("express");
const router= express.Router();
const {UserRegister, UserLogin} = require("../Controllers/UserController")


router.post("/register", UserRegister);
router.post("/login", UserLogin);



module.exports= router;