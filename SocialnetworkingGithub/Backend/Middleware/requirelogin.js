let mongoose=require('mongoose')
let USER=mongoose.model('USER')
let JWT=require('jsonwebtoken')
let {JWT_secret}=require('../key')


module.exports=(req,res,next)=>{
    let {authorization}=req.headers
    if(!authorization){
        return res.status(404).send('auth error 1')
    }
    let token=authorization.replace("Bearer ","")
    JWT.verify(token,JWT_secret,(err,payload)=>{
        if(err){
            return res.status(404).send('auth error 2')
        }
        let {_id}=payload;
        USER.findById({_id}).then((userData)=>{
            console.log(userData);
            req.user=userData
            next()
        })
    })
}