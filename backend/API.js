const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const API=express();
const LoginDetails=require('./models/LoginDetails');
const Updates=require('./models/Updates');
const db=process.env.MONGODB_URL;
mongoose.connect(db,{'useUnifiedTopology':true})
.then(()=>{
    console.log('database connected');
})
.catch(()=>{
    console.log('database connectivity failed');
});

API.use(cors());
API.use(bodyParser.json());
API.use(bodyParser.urlencoded({extended: false}));

API.post('/signup',(req,res,next)=>{
    var post=req.body;
    var details=new LoginDetails({
        username:post.username,
        password:post.password,
        latitude:post.lattitude,
        longitude:post.longitude,
        imagePath:post.imagePath
    });
    LoginDetails.findOne({'username':post.username},function(err,data){
        if(err)
        {
            console.log("error occured");
        }
        else
        {
            if(data==null)
            {
                details.save();
                res.status(200).json({       
                    message:'created'   
                });
                res.send();
            }
            else
            {
                res.status(200).json({
                    message:'exists'
                });
                res.send();
            }
        }
     });
});

API.post('/login',(req,res,next)=>{
    var post=req.body;
    LoginDetails.findOne({'username':post.username,'password':post.password},function(err,data){
        if(err)
        {
            console.log("error occured");
        }
        else
        {
            if(data==null)
            {
                res.status(200).json({       
                    message:'not'   
                });
                res.send();
            }
            else
            {
                res.status(200).json({
                    message:'ok'
                });
                res.send(data);
            }
        }
     });
});

API.post('/update',(req,res,next)=>{
    var post=req.body;
    var details=new Updates({
        username:post.username,
        date:new Date().toUTCString(),
        status:post.status,
        quarantine:post.quarantine
    });
    details.save();
    res.status(200).json({
        message:'added'
    });
    res.send();
});
module.exports=API;
    

