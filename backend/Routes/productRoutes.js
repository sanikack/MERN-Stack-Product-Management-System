const express= require("express");
const { CreateProduct, GetallProducts, UpdatedProducts, DeleteProducts, GetSingleProduct } = require("../Controllers/AdminController");
const router= express.Router();
const adminMiddleware= require("../Middlewares/adminMiddleware");
const authMiddleware = require("../Middlewares/authMiddleware");


router.post("/add", authMiddleware, adminMiddleware, CreateProduct);
router.get("/", authMiddleware, adminMiddleware, GetallProducts);
router.get("/:id", authMiddleware, adminMiddleware, GetSingleProduct);
router.put("/:id", authMiddleware, adminMiddleware, UpdatedProducts);
router.delete("/:id", authMiddleware, adminMiddleware, DeleteProducts);



module.exports= router;