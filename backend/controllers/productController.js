
const Product = require("../models/productModel");

// Create Product --Admin
exports.createProduct = async (req,res) =>{
   
   const product = await Product.create(req.body);
   

   res.status(201).json({
      success:true,
      product
   })
}
  //Get All Products
exports.getAllProducts = async (req,res) =>{
    
   const products = await Product.find();

   res.status(200).json({
      success:true,
      products
   }); 

}

// Update Products  -- Admin

exports.updateProduct = async(req,res) =>{
   let product =  await Product.findById(req.params.id);

   if(!product){
      return res.status(500).json({
         success:false,
         message:"Product Not found"
      })
   }

   product  = await Product.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true,
      useFindAndModify:false
   });
   res.status(200).json({
      success:true,
      product
   })
}

//Delete Products

exports.deleteProduct = async(req,res,next) =>{

   const product = Product.findById(req.params.id);

   if(!product){
      return res.status(200).json({
         success:false,
         message:"Product Not found"
      })
   }
   await product.findOneAndRemove()  ;

   res.status(200).json({
      success:true,
      message:"Product Deleted Successfully"
   })
}

