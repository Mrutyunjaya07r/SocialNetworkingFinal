let mongoose=require('mongoose');
let {ObjectId}=mongoose.Schema.Types

let postSchema=new mongoose.Schema({
    caption:{type:String,required:true},
    image:{type:String,required:true},
    postedBy:{type:ObjectId,ref:"USER"},
    savedPost:[{type:ObjectId,ref:"USER"}],
    like:[{type:ObjectId,ref:"USER"}],
    comments:[{
        text:{type:String,required:true},
        postedBy:{type:ObjectId,ref:"USER"}
    }]
})


mongoose.model("POST",postSchema)