const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const User = require("../models/userModel");

//Registering a user
exports.registerUser = catchAsyncErrors( async (req,res,next) =>{
   
    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample url",
            url :"Profilepicurl"
        }
    });
    
const token = user.getJWTToken();

    res.status(201).json({
        status:true,
        token,
    });
});

// login user

exports.loginUser = catchAsyncErrors(async(req,res,next) =>{

    const {email,password} = req.body;
    
    //checking if the user have both email and password
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or Password",401));
    }
    const isPasswordMatched  = user.comparePassword;

    if(!isPasswordMatched){
        return next("Invalid email or password",401);
    }
    const token = user.getJWTToken();

    res.status(200).json({
        status:true,
        token,
    });

})