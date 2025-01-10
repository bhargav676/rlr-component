const mongoose=require('mongoose');
const componetsschema=new mongoose.Schema({
    url:String,
    name:String,
    quantity:Number,
    price:Number,
    description:String
})

const component=mongoose.model('component',componetsschema);
module.exports=component