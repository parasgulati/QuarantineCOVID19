const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const API=express();
const LoginDetails=require('./backend/models/LoginDetails.js');
const Updates=require('./backend/models/Updates.js');
const Login=require('./backend/models/Login.js');
const Admin=require('./backend/models/Admin.js');
const ControlLogin=require('./backend/models/ControlLogin.js');

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

API.post('/searchPatients',(req,res,next)=>{
    var post=req.body;
    var state,city,pincode,locality,district;
    if(post.state=='')
        state=0;
    else
        state=1;
    
    if(post.city=='')
        city=0;
    else
        city=1;
    
    if(post.pincode=='')
        pincode=0;
    else
        pincode=1;
    
    if(post.locality=='')
        locality=0;
    else
        locality=1;
    
    if(post.district=='')
        district=0;
    else
        district=1;

    
    var json={};
    var j={};
    j['$regex']=post.state;
    j['$options']='i';
    if(state==1)
        json['state']=j;
    j={};
    j['$regex']=post.city;
    j['$options']='i';
    if(city==1)
        json['city']=j;
    j={};
    j['$regex']=post.pincode;
    j['$options']='i';
    if(pincode==1)
        json['pincode']=j;
    j={};
    j['$regex']=post.locality;
    j['$options']='i';
    if(locality==1)
        json['locality']=j;
    j={};
    j['$regex']=post.district;
    j['$options']='i';
    if(district==1)
        json['district']=j;
    
    LoginDetails.find(json,function(err,data){
        if(err)
        {
            console.log("error occured");
        }
        else
        {
            if(data==null)
            {
                res.status(200).json({       
                    message:'Not Found'   
                });
                res.send();
            }
            else
            {
                console.log(data);
                res.send(data);
            }
        }
     });
});

API.post('/PatientUpdates',(req,res,next)=>{
    var post=req.body;
  Updates.find({'username':post.username},function(err,data){
        if(err)
        {
            console.log("error occured");
        }
        else
        {
            if(data==null)
            {
                res.status(200).json({       
                    message:'Not Found'   
                });
                res.send();
            }
            else
            {
                res.send(data);
            }
        }
});
});
API.post('/searchPatients',(req,res,next)=>{
    var post=req.body;
    var state,city,pincode,locality,district;
    if(post.state=='')
        state=0;
    else
        state=1;
    
    if(post.city=='')
        city=0;
    else
        city=1;
    
    if(post.pincode=='')
        pincode=0;
    else
        pincode=1;
    
    if(post.locality=='')
        locality=0;
    else
        locality=1;
    
    if(post.district=='')
        district=0;
    else
        district=1;

    
    var json={};
    var j={};
    j['$regex']=post.state;
    j['$options']='i';
    if(state==1)
        json['state']=j;
    j={};
    j['$regex']=post.city;
    j['$options']='i';
    if(city==1)
        json['city']=j;
    j={};
    j['$regex']=post.pincode;
    j['$options']='i';
    if(pincode==1)
        json['pincode']=j;
    j={};
    j['$regex']=post.locality;
    j['$options']='i';
    if(locality==1)
        json['locality']=j;
    j={};
    j['$regex']=post.district;
    j['$options']='i';
    if(district==1)
        json['district']=j;
    
    LoginDetails.find(json,function(err,data){
        if(err)
        {
            console.log("error occured");
        }
        else
        {
            if(data==null)
            {
                res.status(200).json({       
                    message:'Not Found'   
                });
                res.send();
            }
            else
            {
                res.send(data);
            }
        }
     });
});

API.post('/NotQuarantinePatient',(req,res,next)=>{
    var post=req.body;

  Updates.find({$or:post.array},function(err,data){
        if(err)
        {
            console.log("error occured");
        }
        else
        {
            if(data==null)
            {
                res.status(200).json({       
                    message:'Not Found'   
                });
                res.send();
            }
            else
            {
                
                res.send(data);
            }
        }
});
});

API.post('/changeAdmin',(req,res,next)=>{
    var post=req.body;
    const Ad=new Admin({password:post.newAdminPassword});
    Admin.find({password:post.oldAdminPassword},function(err,data){
        if(err)
            console.log('error occured while logining');
        else
        {
            if(data.length==0)
            {
                res.status(200).json({
                    message:'wrong'
                })
                res.send();
            }
            else
            {
                Admin.deleteMany({password:post.oldAdminPassword},function(er,dat)
                {
                    Ad.save();
                    res.status(200).json({
                        message:'changed'
                    })
                    res.send();    
                });  
            }
        }
    });    
});

API.post('/ControlSignup',(req,res,next)=>{
    var post=req.body;

    Admin.find({'password':post.adminPassword},function(err,d){
        if(d.length!=0)
        {
                console.log('admin verified successfully');
                const post1=new ControlLogin({
                name:post.name,
                email:post.email,
                password:post.password
                }); 
            ControlLogin.findOne({'email':post.email},function(err,data){
            if(err)
            {
                console.log("error occured");
            }
            else
            {
                if(data==null)
                {
                    post1.save();
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
        }
        else
        {
            res.status(200).json({
                message:'wrong'
            });
            res.send();
        }
    });
});

API.post('/ControlLogin',(req,res,next)=>{
    var post=req.body;
            ControlLogin.findOne({'email':post.email,'password':post.password},function(err,data){
            if(err)
            {
                console.log("error occured");
            }
            else
            {
                if(data==null)
                {
                    res.status(200).json({       
                        message:'wrong'   
                    });
                    res.send();
                }
                else
                {
                    res.status(200).json({
                        message:'ok'
                    });
                    res.send();
                }
            }
         });
});
 var port =process.env.PORT;
 API.listen(port);
