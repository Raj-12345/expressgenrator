const mongoose=require('mongoose');

const reviewsschema=mongoose.Schema({

    product_no:
    {
    type:String,
    required: true
    },

   product_name:
   {
  type:String,
  required: true

  },
   
   product_desc:
   {
     type:String,
     required: true
    }

});
module.exports=mongoose.model('reviews',reviewsschema);