const express= require("express");
const router= express.Router();
const {UserRegister, UserLogin, Getallproduct} = require("../Controllers/UserController")


router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.get("/productlist", Getallproduct);



module.exports= router;