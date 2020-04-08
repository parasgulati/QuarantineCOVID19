const mongoose=require('mongoose');
const LoginDetails=mongoose.Schema({
    username:{type:String},
    password:{type:String},
    lat:{type:String},
    longitude:{type:String},
    imagePath:{type:String}
});
module.exports =mongoose.model("LoginDetails",LoginDetails);
