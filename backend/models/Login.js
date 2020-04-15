const mongoose=require('mongoose');
const Login=mongoose.Schema({
    username:{type:String},
    imeiNumber:{type:String}
});
module.exports =mongoose.model("Login",Login);
