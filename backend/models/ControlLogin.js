const mongoose=require('mongoose');
const ControlLogin=mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String}
});
module.exports =mongoose.model("ControlLogin",ControlLogin);
