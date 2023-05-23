const mongoose  = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please enter Product name"],
        trim:true
    },
    description:{
        type: String,
        required:[true,"Please enter product description"]
    },
    price:{
        type: Number,
        required:[true,"Please enter product price"],
        maxLength:[8,"Price cannot exceed 8 digits"]  
    },
    ratings:{
        type: Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:[true]
            },
            url:{
                type:String,
                required:[true]
            }
       }
   ],
   category:{
    type: String,
    required:[true,"Please enter Product category"]
   },
   stock:{
    type: Number,
    required:[true,"Please enter Product stock"],
    maxLength:[4,"Product stock cannot exceed 4 digits"],
    default:1
   },
   reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
               },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
   ],
   user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true
   },
   createdAt:{
    type: Date,
    default:Date.now
   },
   numOfReviews:{
    type:Number,
    default:0
   }

})

 module.exports = mongoose.model("Product",productSchema);