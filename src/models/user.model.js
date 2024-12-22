const mongoose = require("mongoose");


//Schema for user
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    passWord:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:"CUSTOMER"
    },
    mobile:{
        type:String,
    },
    address:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"addresses",
    }],
    paymentInfomation:[
       {
        type:mongoose.Schema.Types.ObjectId,
        ref:"payment_information"
       }
    ],
    ratings:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"ratings",
        }
    ],
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"reviews",
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }

});

//Creating table for user schema
const User = mongoose.model("users",userSchema);
module.exports=User;