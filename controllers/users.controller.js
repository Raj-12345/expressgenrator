
const mongoose=require('mongoose');
const express=require('express');
const users=require('../modles/users.models');
const message=require('../message');



module.exports.usersregister=(req,res,next)=>
{

          if(validateEmail(req.body.user_email) )
          {
            users.find({ user_email:req.body.user_email},(error,result)=>{
        
                if(result.length>0)
                {
                res.status(200).json({status:"failure",message:"user already exists"});
                }
                else
                {
                    var user=new users(
                        {
                          
                            user_name:req.body.user_name,
                            user_email:req.body.user_email,
                            user_password:req.body.user_password
                        }
                               );
                               
                         user.save( (error,result)=>{
                             if(error)
                             {
                            res.status(500).json( {status:"failure", message:"error",error:error.message});
                             }
                             else
                             {
                          res.status(200).json({status:"sucess",message:"user data",data:result});
                               }
                                              }
                        
                                      );  
                   }
                                      });




           }
                else
                {
                    res.status(400).json({status:"failure",message:"not valid email"});
                }

  
   

}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports.userslogin=(req,res,next)=>
{
    

    users.find({ user_email:req.body.user_email,user_password:req.body.user_password},(error,result)=>{
        
        if(result.length>0)
        {
        res.status(200).json({status:"sucess",message:message.sucess});
        }
        else
        {
            res.status(500).json({status:"failure",message:message.failure});
        }
                              });


}



module.exports.get=(req,res,next)=>
{
    

    users.find((error,result)=>{
        
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
    

    users.find({_id:_id},(error,result)=>{
        
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





module.exports.usersupdate=(req,res,_id,next)=>
{
    
    users.find({_id:_id},(error,result)=>{
        
        if(result.length>0)
        {

               users.find( {user_email:req.body.user_email},(error,result)=>{

                            if(result.length>0)
                            {
          res.status(400).json({status:"failure",message:"email already exists"});
                            }
                            else
                            {
                users.update({_id:_id},{$set:{user_name:req.body.user_name,user_email:req.body.user_email,user_password:req.body.user_password}},
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
                             }
                
               });
                  
        }
        else
        {
            res.status(500).json({status:"failure",message:"data not found"});
        }
                              });


}



module.exports.usersdelete=(req,res,_id,next)=>
{
    

    users.find({_id:_id},(error,result)=>{
        
        try{

        if(result.length>0)
        {
                   users.remove({_id:_id},(error,result)=>{       
                           if(error)
                           {
                            res.status(500).json({status:"failure",message:"problem in delete"});
                           }
                           else
                           {
             res.status(200).json({status:"sucess",message:"deleted",data:result});
                           }

                      });


        }
        else
        {
            res.status(500).json({status:"failure",message:"data not found"});
        }
                    
                }
                    catch(error)
                    {
                        error.message="please provide valid id"
                     res.status(400).json({ status:"failure",error:error.message});
                    }

                              });
}
 
                            