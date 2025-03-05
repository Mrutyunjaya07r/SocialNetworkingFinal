let mongoose=require('mongoose')
let {ObjectId}=mongoose.Schema.Types

let userScheme=new mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    following:[{type:ObjectId,ref:"user"}],
    followers:[{type:ObjectId,ref:"user"}],
})

mongoose.model("USER",userScheme)