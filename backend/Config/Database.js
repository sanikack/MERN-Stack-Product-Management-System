const mongoose= require("mongoose");

const ConnectDB= async ()=>{
    try{
        const uri= process.env.MONGO_URL;

        await mongoose.connect(uri);
        console.log("mongodb connected");
        
    }
    catch(err){
        console.log("Database connection failed", err);
        process.exit(1)
    }
}


module.exports= ConnectDB;