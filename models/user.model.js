const mongoose = require("mongoose");

const userschema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        minLength:[3,"name should be at least 3 characters"],
        maxLength:[20,"name should be at most 20 characters"]
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        
        },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:[5,"password should be at least 5 characters"],
       
    }
})

const user= mongoose.model("user",userschema)

module.exports=user