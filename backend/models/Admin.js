const mongoose=require('mongoose');
const Admin=mongoose.Schema({
    password:{type:String}
});
module.exports =mongoose.model("Admin",Admin);
