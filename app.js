const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const API=express();
const LoginDetails=require('./backend/models/LoginDetails.js');
const Updates=require('./backend/models/Updates.js');
const Login=require('./backend/models/Login.js');
mongoose.connect('mongodb+srv://COVID19:covidindia19@cluster-jqfui.mongodb.net/test?retryWrites=true&w=majority',{'useUnifiedTopology':true})
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
        name:post.name,
        username:post.username,
        password:post.password,
        lat:post.lat,
        longitude:post.longitude,
        state:post.state,
        city:post.city,
        pincode:post.pincode,
        locality:post.locality,
        district:post.district,
        imeiNumber:post.imeiNumber
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
      var details=new Login({
        username:post.username,
          imeiNumber:post.imeiNumber
    });
    LoginDetails.findOne({'username':post.username,'password':post.password,'imeiNumber':post.imeiNumber},function(err,data){
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
               details.save();
                res.status(200).json({
                    message:'yes',
                    username:data.username,
                    lat:data.lat,
                    longitude:data.longitude,
                    imeiNumber:data.imeiNumber
                });
                res.send();
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
API.post('/LoginCheck',(req,res,next)=>{
    var post=req.body;
    Login.findOne({'imeiNumber':post.imeiNumber},function(err,data){
       if(err)
           console.log('error occured');
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
                    message:'yes'
                });
                res.send();
            }
        }
    });
});
 API.post('/checkDevice',(req,res,next)=>{
    var post=req.body;
    LoginDetails.findOne({'imeiNumber':post.imeiNumber},function(err,data){
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
                    message:'yes'
                });
                res.send();
            }
        }
     });
});


 var port =process.env.PORT;
 API.listen(port)
