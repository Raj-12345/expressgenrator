const mongoose=require('mongoose');

const userschema=mongoose.Schema({

  
   user_name:
   {
  type:String,
  required: true

  },
   user_email:
   {
   type:String,
   required: true
   },
   user_password:
   {
     type:String,
     required: true
    }

});
module.exports=mongoose.model('users',userschema);