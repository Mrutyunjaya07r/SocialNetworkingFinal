let express=require('express');
let router=express.Router();
let mongoose=require('mongoose')
let USER=mongoose.model("USER")
let POST=mongoose.model("POST")
let MESSAGE=mongoose.model("MESSAGE")
let {JWT_secret}=require('../key')
let JWT=require('jsonwebtoken')
let requirelogin=require('../Middleware/requirelogin')

router.get('/',(req,res)=>{
    res.send('Hello World');
})
router.get("/add",requirelogin,(req,res)=>{
    res.send('hello from router')
})
router.post('/signup',(req,res)=>{
    let {name,password,username,email}=req.body;
    if(!name||!password||!username||!email){
        return res.status(400).send({message:'Please fill in all fields'});
    }
    let user=new USER({
        name:name,
        password:password,
        username:username,
        email:email
    })
    let result=user.save();
    console.log(result)
    res.send(result)
})
router.post('/signin',(req,res)=>{
    let {email,password}=req.body
    if(!email||!password){
        return res.status(400).send({message:'Please fill in all fields'});
    }
    USER.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
            return res.status(400).send({message:'No user found'});
        }
        console.log(savedUser)
    })
    USER.findOne({password:password}).then((savedUser)=>{
        if(!savedUser){
            return res.status(400).send({message:'No user found'});
        }
        console.log(savedUser)
        let token=JWT.sign({_id:savedUser._id},JWT_secret);
        console.log(token)
        let userid=savedUser._id
        res.json({token,userid})
    })
})

router.post("/addpost",requirelogin,(req,res)=>{
    let {caption,pic}=req.body
    if(!caption||!pic){
        return res.status(400).send({message:'fill all feilds'});
    }
    let post=new POST({
        caption:caption,
        image:pic,
        postedBy:req.user._id
    })
    let result=post.save()
    console.log(result)
    res.send(result)
})
router.get("/allpost",async(req,res)=>{
    let result=await POST.find().populate('postedBy')
    console.log(result);
    res.send(result)
})
router.get('/userprofile',requirelogin,async(req,res)=>{
    try {
        let myuserdetail=await USER.find({_id:req.user._id})
        console.log(myuserdetail);
        let mypost=await POST.find({postedBy:req.user._id})
        console.log(mypost);
        res.status(200).json({myuserdetail,mypost})

    } catch (error) {
        console.log(error)
    }
})
router.get('/otherprofile/:id',requirelogin,async(req,res)=>{
    try {
        let user=await USER.find({_id:req.params.id});
        console.log(user);
        let post=await POST.find({postedBy:req.params.id}).populate("postedBy")
        console.log(post)
        res.json({user,post})
    } catch (error) {
       console.log(err) 
    }
   
})
router.put('/updatepost/:id',requirelogin,async(req,res)=>{
    let result=await POST.findByIdAndUpdate(req.params.id,
        {caption:req.body.caption}
    )
    if(!result){
        return res.status(404).send("No update")
    }
    res.send(result)
})
router.delete('/deletepost/:id',requirelogin,async(req,res)=>{
    let result=await POST.findByIdAndDelete({_id:req.params.id})
    if(!result){
        return res.status(404).send("No update")
    }
    res.send(result)
})
router.put("/savepost/:postId",requirelogin,async(req,res)=>{
    let result=await POST.findByIdAndUpdate(req.params.postId,{
        $push:{savedPost:req.user._id}
    })
    if(!result){
        return res.status(404).send("No update")
    }
    console.log(result)
    res.json(result)
})
router.get("/savedpostlist",requirelogin,async(req,res)=>{
    let result=await POST.find({savedPost:req.user._id}).populate("postedBy")
    if(!result){
        return res.status(404).send("No update")
    }
    console.log(result)
    res.json(result)
})
router.put('/follow/:followid',requirelogin,async(req,res)=>{
    try {
        let result=await USER.findByIdAndUpdate(req.params.followid,{
            $push:{followers:req.user._id}
        })
        console.log(result)
        let result2=await USER.findByIdAndUpdate(req.user._id,{
            $push:{following:req.params.followid}
        })
        console.log(result2);
        res.json({result,result2})
    } catch (error) {
        console.log(error)
    }
})
router.put("/unfollow/:followid",requirelogin,async(req,res)=>{
    try {
        let result1=await USER.findByIdAndUpdate(req.params.followid,{
            $pull:{followers:req.user._id}
        })
        console.log(result1)
        let result2=await USER.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.params.followid}
        })
        console.log(result2);
        res.json({result1,result2})
    } catch (error) {
        console.log(error)
    }
})
router.put("/like",requirelogin,async(req,res)=>{
    try {
        let like=await POST.findByIdAndUpdate(req.body.postId,{
            $push:{like:req.user._id}
        },{
            new:true
        })
        console.log(like)
        res.send(like)
    } catch (error) {
        console.log(error)
    }
})
router.put("/unlike",requirelogin,async(req,res)=>{
    try {
        let unlike=await POST.findByIdAndUpdate(req.body.postId,{
            $pull:{like:req.user._id}
        },{
            new:true
        })
        console.log(unlike)
        res.send(unlike)
    } catch (error) {
        console.log(error)
    }
})
router.put("/comment",requirelogin,async(req,res)=>{
    let comment={
        text:req.body.text,
        postedBy:req.user._id
    }
    try {
        let result=await POST.findByIdAndUpdate(req.body.postId,{
            $push:{comments:comment}
        },{
            new:true
        })
        console.log(result)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})
router.get('/getallcomment/:postId',requirelogin,async(req,res)=>{
    try {
        let result=await POST.find({_id:req.params.postId}).populate("comments.postedBy")
        console.log(result)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})
router.get("/getalluser",requirelogin,async(req,res)=>{
    try {
        let result=await USER.find({_id:{$ne:req.user._id}}).select("-password")
        console.log(result)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})
router.get("/getallmessages/:id",requirelogin,async(req,res)=>{
    try {
        let chattoroomid=req.params.id;
        let myid=req.user._id;
        let message=await MESSAGE.find({
            $or:[
                {senderId:myid,receiverId:chattoroomid},
                {senderId:chattoroomid,receiverId:myid}
            ]
        })
        console.log(message)
        res.json(message)
    } catch (error) {
        console.log(error)
    }
})
router.post("/sendmessage/:id",requirelogin,(req,res)=>{
    try {
        let text=req.body.text;
        let receiverId=req.params.id;
        let senderId=req.user._id;
        let message=new MESSAGE({
            text,
            senderId,
            receiverId
        })
        let result=message.save();
        console.log(result)
        res.send(result);
    } catch (error) {
       console.log(error) 
    }
})


module.exports=router