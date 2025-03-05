let mongoose=require('mongoose')
let {ObjectId} = mongoose.Schema.Types

let messageSchema=new mongoose.Schema({
    text:{type:String},
    senderId:{type:ObjectId,ref:"USER"},
    receiverId:{type:ObjectId,ref:"USER"},
})

mongoose.model("MESSAGE",messageSchema)