const UserSchema= require("../Models/UserSchema");
const bcrypt= require("bcryptjs");
const jwt= require("jsonwebtoken");
const ProductSchema = require("../Models/ProductSchema");


const UserRegister= async (req,res)=>{
    try{
        const {name,email,password,confirmPassword} = req.body;

        //FOR VALIDATION
        if(!name || !email || !password || !confirmPassword){
            return res.status(400).json({
                success:false,
                message: "All fields are required"
            })
        };


        // Check password match
        if (password !== confirmPassword) {
        return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

        //CHECKING USER ALREADY EXISTS
        const existingUser= await UserSchema.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exist"
            })
        };

        //HASE PASSWORD
        const hassedpassword= await bcrypt.hash(password,10);

        //CREATE USER
        const user= await UserSchema.create({
            name,
            email,
            password: hassedpassword
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully."
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}


const UserLogin= async (req,res)=>{
    try{
        const {email,password}= req.body;

        //VALIDATION
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message: "All fields are required"
            })
        }

        //EXIXST USER
        const user= await UserSchema.findOne({email});

        if(!user){
            return res.status(400).json({
            success: false,
            message: "Invalid credentials",
      });

        }

        //COMPARE PASSWORD
        const isMatch= await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid credentials"
            })
        }

        //JWT GENARATION..
        const token= jwt.sign({
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    );

    res.status(200).json({
        success:true,
        message: "Login successfull",
        token,
        role: user.role
    })
    }

    catch(err){
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}


const Getallproduct= async (req,res)=>{
    try{
        const products= await ProductSchema.find();

        res.status(200).json({
            success: true,
            products
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

module.exports= {UserRegister, UserLogin, Getallproduct}