const ProductSchema = require("../Models/ProductSchema");

const CreateProduct= async (req,res)=>{
    try{
        const {name,price,category,description}= req.body;

        if(!name || !description || !price || !category){
            return res.status(400).json({
                success:false,
                message: "All fields are required"
            })
        };

        //create the product
        const product= await ProductSchema.create({
            name,
            price,
            description,
            category
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        }
        )
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}


const GetallProducts= async(req,res)=>{
    try{
        const products= await ProductSchema.find().sort({createdAt: -1});

        res.status(200).json({
            success: true,
            products
        })
    }
    catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}


const UpdatedProducts= async(req,res)=>{
    try{
        const {id}= req.params;

        const updateproduct= await ProductSchema.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        );

        if(!updateproduct){
            res.status(400).json({
                success: false,
                message: "Product not found."
            })
        };

        res.status(200).json({
            success: true,
            message: "product updated successfully.",
            updateproduct
        })
    }
    catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
}
}


const GetSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductSchema.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



const DeleteProducts= async (req,res)=>{
    try{
        const {id}= req.params;

        const deletedproduct= await ProductSchema.findByIdAndDelete(id);
        
        if(!deletedproduct){
            res.status(400).json({
                success: false,
                message: "Product not found."
            })
        }

        res.status(200).json({
            success:true,
            message: "Deleted product successfully."
        })
    }
    catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
}
}


module.exports= {CreateProduct, GetallProducts, UpdatedProducts, DeleteProducts, GetSingleProduct }