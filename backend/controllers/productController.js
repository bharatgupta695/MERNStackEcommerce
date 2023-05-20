
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures  = require("../utils/apiFeatures");

// Create Product --Admin
exports.createProduct = catchAsyncErrors(async(req,res,next) => {

   req.body.user = req.user.id;
   
   const product = await Product.create(req.body);
   

   res.status(201).json({
      success:true,
      product
   });
});
  //Get All Products
exports.getAllProducts = catchAsyncErrors(async (req,res) =>{

   const resultsPerPage = 5;
   const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(),req.query)
  .search().
  filter().pagination(resultsPerPage);
 
   const products = await apiFeature.query;

   res.status(200).json({
      success:true,
      products,
      productCount
   }); 

});

//Get Product Details
 
exports.getProductDetails =catchAsyncErrors( async (req,res,next) =>{
 
 // try {
   const product = await Product.findById(req.params.id);
   
   if (product) {
     return  res.status(200).json({
         success:true,
         product,
      }); 
   } else {
      return next(new ErrorHandler("Product Not Found",404));
   }

});

// Update Products  -- Admin

exports.updateProduct = catchAsyncErrors (async(req,res) =>{
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
} );

//Delete Products

exports.deleteProduct = catchAsyncErrors( async(req,res,next) =>{

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
});

//Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async(req,res,next) =>{

   const {rating,comment,productId} = req.body; 

   const review = {
      user:req.user._id,
      name:req.user.name,
      rating : Number(rating),
      comment,
   };

   const product = Product.findById(productId)
   
   if(isReviewed){

   }else {
      product.reviews.push(review); 
   }

})

