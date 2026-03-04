const express= require("express");
const app= express();
const dotenv= require("dotenv");
dotenv.config();
const ConnectDB= require("./Config/Database");
const userRoutes= require("./Routes/userRoutes");
const productRoutes= require("./Routes/productRoutes");
const cors= require("cors");


//MIDDLEWARE
app.use(express.json());
app.use(cors())


//DATABASE
ConnectDB()


//ROUTES
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);

app.use("/", (req,res)=>{
    res.send("running...")
})

const Port = process.env.PORT || 5000;
app.listen(Port, ()=>{
    console.log(`server running on ${Port}`);
    
})