const mongoose=require('mongoose');



require('dotenv').config()
mongoose.connect(process.env.DB_HOST,(error,result)=>
{
console.log('connected');
});