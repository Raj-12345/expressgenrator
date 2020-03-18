const mongoose=require('mongoose');



require('dotenv').config()
mongoose.connect("mongodb://localhost:27017/amazon",(error,result)=>
{
console.log('connected');
});