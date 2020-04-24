const mongoose=require('mongoose');
const LoginDetails=mongoose.Schema({
    username:{type:String},
    password:{type:String},
    lat:{type:String},
    longitude:{type:String},
    state:{type:String},
    city:{type:String},
    pincode:{type:String},
    locality:{type:String},
    district:{type:String},
    imeiNumber:{type:String}
});
module.exports =mongoose.model("LoginDetails",LoginDetails);
