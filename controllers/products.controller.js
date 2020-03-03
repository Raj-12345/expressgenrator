
const mongoose=require('mongoose');
const express=require('express');
const products=require('../modles/products.models');
const message=require('../message');
module.exports.productsstore=(req,res,next)=>
{

    
    products.find({product_no:req.body.product_no},(error,result)=>{
        
        if(result.length>0)
        {
        res.status(200).json({status:"sucess",message:"already available please provide right product no"});
        }
        else
        {
            var product=new products(
                {
                  
        
                    product_no:req.body.product_no,
                    product_name:req.body.product_name,
                    product_desc:req.body.product_desc
                }
                       );
                       
                 product.save( (error,result)=>{
                     if(error)
                     {
                    res.status(500).json( {status:"failure", error:error.message});
                     }
                     else
                     {
                  res.status(200).json({status:"sucess",message:'product store',data:result});
                       }
                                      }
                
                      
                              );

        
  
        }
                              });
     

}



module.exports.get=(req,res,next)=>
{
    

    products.find((error,result)=>{
        
        if(result.length>0)
        {
        res.status(200).json({status:"sucess",message:message.sucess,data:result});
        }
        else
        {
            res.status(500).json({status:"failure",message:"data not found"});
        }
                              });


}


module.exports.getById=(req,res,_id,next)=>
{
    
console.log(_id);
    products.find({_id:_id},(error,result)=>{
        
        if(result.length>0)
        {
        res.status(200).json({status:"sucess",message:message.sucess,data:result});
        }
        else
        {
            res.status(500).json({status:"failure",message:"product not found"});
        }
                              });


}



module.exports.productsupdate=(req,res,_id,next)=>
{
    
    products.find({_id:_id},(error,result)=>{
        
        if(result.length>0)
        {
                      
                             products.find({product_no:product_no},(erroe,message)=>
                             {
                                 
                   products.update({_id:_id},{$set:{product_no:req.body.product_no,product_name:req.body.product_name,product_desc:req.body.product_desc}},
                    (error,result)=>{       
                           if(error)
                           {
                            res.status(500).json({status:"failure",message:"problem in update"});
                           }
                           else
                           {
             res.status(200).json({status:"sucess",message:message.sucess,data:result});
                           }

                      });
                               });

        }
        else
        {
            res.status(500).json({status:"failure",message:"data not found"});
        }
                              });


}










module.exports.productsdelete=(req,res,_id,next)=>
{
    
    products.find({_id:_id},(error,result)=>{
        
        if(result.length>0)
        {
                   products.remove({_id:_id},(error,result)=>{       
                           if(error)
                           {
                            res.status(500).json({status:"failure",message:"problem in delete"});
                           }
                           else
                           {
             res.status(200).json({status:"sucess",message:message.sucess,data:result});
                           }

                      });


        }
        else
        {
            res.status(500).json({status:"failure",message:"data not found"});
        }
                              });
            }