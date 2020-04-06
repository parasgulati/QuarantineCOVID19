const mongoose=require('mongoose');
const Updates=mongoose.Schema({
    username:{type:String},
    date:{type:Date},
    status:{type:String},
    quarantine:{type:String}
});
module.exports =mongoose.model("Updates",Updates);