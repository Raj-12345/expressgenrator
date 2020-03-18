
const mongoose=require('mongoose');
const express=require('express');
const products=require('../modles/products.models');
const message=require('../message');
module.exports.productsstore=(req,res,_id,next)=>
{

        
            var product=new products(
                {
                  
                    product_name:req.body.product_name,
                    product_desc:req.body.product_desc,
                    user_id:_id
                }
                       );
                       
                 product.save( (error,result)=>{
                     if(!error)
                     {
                        res.status(200).json({status:"success",message:'product store!'});
                     }
                     else
                     {

                        res.status(500).json( {status:"failure", message:error});
                 
                       }
                                      }
                
                      
                              );

        
  
    }
                            
     




module.exports.get=(req,res,next)=>
{
    

    products.find((error,result)=>{
                          if(!error)
                          {
             
           res.status(200).json({status:"success",message:"product found",data:result});         
                         }
                         else
                         {
            res.status(500).json({status:"failure",message:error});              
                         }

                              });


}


module.exports.getById=(req,res,_id,next)=>
{
    
console.log(_id);
    products.find({_id:_id},(error,result)=>{
        
        if(result.length>0)
        {
        res.status(200).json({status:"success",message:'product found',data:result});
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
                      
                             
        products.update({_id:_id}, req.body,(error,result)=>{       
                          if(!error)
                           {
                            res.status(200).json({status:"success",message:'product update'});
                           
                           }
                           else
                           {
                            res.status(500).json({status:"failure",message:"product is not update"});
                           }

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
    

                   products.deleteOne({_id:_id},(error,result)=>{       
                           if(!error)
                           {  
                          
                            res.status(200).json({status:"success",message:"product deleted"});
                
                           }
                           else
                           {
                            res.status(500).json({status:"failure",message:error});
             
                           }

                      });
                
              

                
            }