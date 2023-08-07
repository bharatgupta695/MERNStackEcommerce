const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const crypto = require("crypto");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary");

//Registering a user
exports.registerUser = catchAsyncErrors( async (req,res,next) =>{

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale"
    })
   
    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"myCloud.public_id",
            url :"myCloud.secure_url"
        }
    });
    
    sendToken(user,200,res);
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
    const isPasswordMatched  = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }
    // const token = user.getJWTToken();

    // res.status(200).json({
    //     status:true,
    //     token,
    // });
    sendToken(user,200,res);


})

//Logout User

exports.logoutUser = catchAsyncErrors(async (req,res,next) =>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"Logged Out Successfully"
    })
});

//
exports.forgotPassword  = catchAsyncErrors(async(req,res,next) =>{
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found",404));
    }
    //Get resetPasswordToken
    const resetToken  = user.getResetPasswordToken();
    

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`

    try{
        await sendEmail({
            email:user.email,
            subject:"Ecommerce password recovery",
            message,

        });

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,
        })

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500));

    }
});
 //Reset Password
exports.resetPassword = catchAsyncErrors( async(req,res,next) => {
    //create token
    const resetPasswordToken  = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
 
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt : Date.now()},

    });

    if(!user){
        return next(new ErrorHandler("Reset Password token is invalid or has been expired",400));
    }

    if(req.body.password!=req.body.confirmPassword){
        return next(new ErrorHandler("Passwords doesn't match",400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user,200,res);


});

//get user details

exports.getUserDetails  = catchAsyncErrors(async(req,res,next) =>{

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    })
})

//update user password

exports.updatePassword  = catchAsyncErrors(async(req,res,next) =>{

    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched  = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect",400));
    }
    if(req.body.newPassword != req.body.confirmPassword){
        return next(new ErrorHandler("Passwords doesn't match"),400);
    }
   user.password = req.body.newPassword;
   await user.save();


  sendToken(user,200,res);
});

//update user profile

exports.updateProfile  = catchAsyncErrors(async(req,res,next) =>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email,
    };

    //We will add cloudinary later

    const user =await  User.findByIdAndUpdate(req.user.id,newUserData, {
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    

    res.status(200).json({
        success:true
    })
});

   //Get all users (admin)
   exports.getAllUsers = catchAsyncErrors(async ( req,res,next) =>{

    const users = await User.find();
    res.status(200).json({
        success:true,
        users,
    })
   })

   //get single  user details (admin)

exports.getSingleUser  = catchAsyncErrors(async(req,res,next) =>{

    const user = await User.findById(req.user.id);

    if(!user){
        return next(new ErrorHandler(`User doesn't exist with Id ${req.params.id}`));
    }

    res.status(200).json({
        success:true,
        user,
    })
})

//update user Role --Admin

exports.updateUserRole  = catchAsyncErrors(async(req,res,next) =>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    };


    const user =await  User.findByIdAndUpdate(req.user.id,newUserData, {
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    

    res.status(200).json({
        success:true
    })
});

   //Delete  User  --Admin
exports.deleteUser  = catchAsyncErrors(async(req,res,next) =>{

    
    const user =await  User.findById(req.user.id);
    //We will remove cloudinary later
    if(!user){
        return next(new ErrorHandler(`User doesn't exist with ${req.params.id}`));
    }

   
    await user.deleteOne();
       
    res.status(200).json({
        success:true,
        message:"User Deleted Successfully"
    });
});