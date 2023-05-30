const Order = require("../models/orderModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productModel");
//Create New Order

exports.newOrder = catchAsyncErrors(async (req,res,next) => {
    
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shppingPrice,
        totalPrice,
    } =  req.body;
    
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shppingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,
    });

    res.status(201).json({
        success:true,
        order,
    });
});

//Get single order Details
exports.getSingleOrder = catchAsyncErrors(async (req,res,nextt) =>{

    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new ErrorHandler(`Order not with ProductId : ${rq.params.id}`,404 ));
    }

    res.status(200).json({
        success:true,
        order
    });

})

//Get logged in user order Details
exports.myOrders = catchAsyncErrors(async (req,res,nextt) =>{

    const orders = await Order.find({user:req.user._id});

    
    res.status(200).json({
        success:true,
        orders
    });

})

//Get All Order Details --Admin
exports.getAllOrders = catchAsyncErrors(async (req,res,next) =>{

    const orders = await Order.find();

    let totalAmount =0;

    orders.forEach((order) => {
        totalAmount+=order.totalPrice;
    })


    
    res.status(200).json({
        success:true,
        totalAmount,
        orders
    });

})

//Update Order Status --Admin
exports.updateOrder = catchAsyncErrors(async (req,res,next) =>{

    const order = await Order.findById(req.params.id);
   
    if(!order){
        return next(new ErrorHandler(`Order not found with ProductId : ${req.params.id}`,404 ));
    }

    if(order.orderStatus === "Delievered"){
        return next(new ErrorHandler("you have already delievered this order",404));
    }

   order.orderItems.forEach(async (order) => {
      await updateStock(order.product,order.quantity);
   })

    order.orderStatus = req.body.status;
    if(req.body.status ==="Delievered"){
    order.delieveredAt = Date.now();
   }

   await order.save({validateBeforeSave : false});
    
    res.status(200).json({
        success:true,
    });

});

async function updateStock(id,quantity){
    const product = await Product.findById(id);

    product.stock-=quantity;
    product.save();
    await product.save({validateBeforeSave:false});

}

//Delete Order --Admin
exports.deleteOrder = catchAsyncErrors(async (req,res,next) =>{

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler(`Order not with ProductId : ${req.params.id}`,404 ));
    }

    await order.deleteOne();

    res.status(200).json({
        success:true,
       
    });

})


