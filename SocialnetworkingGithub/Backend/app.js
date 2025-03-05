let express=require('express');
let cors=require('cors')

let app=express();
app.use(cors());
app.use(express.json())

let mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1/socialnetworkingfinal')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'))

require('./Models/message')
require('./Models/user')
require('./Models/post')
app.use(require('./Router/routes'))
app.get("/",(req,res)=>{
    res.send("hello")
})


let port=process.env.PORT||8080;
app.listen(port,()=>{console.log(`App is running at ${port}`)})