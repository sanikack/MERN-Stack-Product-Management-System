const express= require("express");
const router= express.Router();
const {UserRegister, UserLogin, Getallproduct} = require("../Controllers/UserController")
const authMiddleware= require("../Middlewares/authMiddleware")


router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.get("/productlist", authMiddleware, Getallproduct);



module.exports= router;