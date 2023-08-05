
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
exports.getAllProducts = catchAsyncErrors(async (req,res,next) =>{
   const resultPerPage = 8;
   const productsCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(),req.query)
  .search().
  filter().pagination(resultPerPage); 

  let products = await apiFeature.query;
  
  let filteredProductsCount = products.length;

   // apiFeature.pagination(resultPerPage);
   // console.log(apiFeature.query, "here");
   //   products = await apiFeature.query;
   //   console.log(products, "here");
   res.status(200).json({
      success:true,
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount
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

   const product = await Product.findById(productId)

   const isReviewed = product.reviews.find(
     ( rev) =>  rev.user.toString()===req.user._id.toString() );
   
   if(isReviewed){
      product.reviews.forEach(rev =>  {
         if(rev.user.toString()===req.user._id.toString()){
            rev.rating = rating;
            rev.comment = rev.comment;
         }
      });

   }else {
      product.reviews.push(review); 
      product.numOfReviews = product.reviews.length;
   }
   let avg =0;
   product.ratings = product.reviews.forEach((rev )=>{
                 avg+=rev.ratings;
               });

   product.ratings = avg/product.reviews.length;

   await product.save({validateBeforeSave:false});
   
   res.status(200).json({
      success:true,
   }) 
})

//Get All Reviews of a Product
exports.getAllProductReviews = catchAsyncErrors(async(req,res,next) =>{
   const product  = await Product.findById(req.query.productId);
   console.log(req.query);
   if(!product){
      return next(new ErrorHandler("Product Not Found",404));
   }
   res.status(200).json({
      success:true,
      reviews:product.reviews
   })
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req,res,next) =>{
   const product  = await Product.findById(req.query.productId);
  
   if(!product){
      return next(new ErrorHandler("Product Not Found",404));
   };
     
   const reviews = product.reviews.filter(rev => {
      rev._id.toString() != req.query.id;
   });

   let avg =0;
    reviews.forEach((rev )=>{
                 avg+=rev.ratings;
               });
    const ratings = 0;
    if(reviews.length)
    ratings = avg/reviews.length;
   

   const numOfReviews = reviews.length;

     console.log(reviews);
    await Product.findByIdAndUpdate(req.query.productId,{
      reviews,
      ratings,
      numOfReviews
   },{
      new:true,
      runValidators:true,
      useFindAndModify:false,
   });

   res.status(200).json({
      success:true,
      
   });
}); 
