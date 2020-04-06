const mongoose=require('mongoose');
const LoginDetails=mongoose.Schema({
    username:{type:String},
    password:{type:String},
    latitude:{type:Number},
    longitude:{type:Number},
    imagePath:{type:String}

});
module.exports =mongoose.model("LoginDetails",LoginDetails);