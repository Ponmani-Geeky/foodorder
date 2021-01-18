const mongoose=require('mongoose');

const Order= new mongoose.Schema({
    name:String,
    mailid:String,
    mobileno:String,
    functiontype:String
})

module.exports=mongoose.model('Order',Order);