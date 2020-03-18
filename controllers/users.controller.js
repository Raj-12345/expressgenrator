
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
                res.status(200).json({status:"failure",message:"user already exists provide onother email"});
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
                            res.status(500).json( {status:"failure", message:error.message});
                             }
                             else
                             {
                          res.status(200).json({status:"success",message:"user data",data:result});
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
        
        if(!error)
         {
        if(result.length>0)
        {
        res.status(200).json({status:"success",message:'Welcome User',data:result});
        }
        else
        {
            res.status(400).json({status:"failure",message:"login failed! Invalid Credentials"});
        }
            }
            else
            {
                res.status(500).json({status:"failure",message:"something went wrong"});  
            }
                              });


}



module.exports.get=(req,res,next)=>
{
    

    users.find((error,result)=>{
        

        if(!error)
        {
        res.status(200).json({status:"success",message:"users data",data:result});
        }
        else
        {
            res.status(500).json({status:"failure",message:"something went wrong"});
        }
                              });


}



module.exports.getById=(req,res,_id,next)=>
{
    

    users.find({_id:_id},(error,result)=>{
        
        if(result.length>0)
        {
        res.status(200).json({status:"success",message:"user data",data:result});
        }
        else
        {
            res.status(500).json({status:"failure",message:"data not found"});
        }
                              });


}





module.exports.usersupdate=(req,res,_id,next)=>
{      

       users.findById({_id:_id},(error,result)=>{
        

        if(!error)
        {

          
                              if(req.body.user_email==result.user_email)
                              {
                              
                 users.update({_id:_id},req.body,(error,result)=>{
                                      
                                     if(!error)
                                     {
                       res.status(200).json({status:"success",message:'user updated'});     
                                     }
                                     else
                                     {
                                        res.status(500).json({status:"failure",message:error});             
                                     }




                             })
         
                
                                }
                              
                                            
                              else
                              {
                                
                               users.findOne({user_email:req.body.user_email},(error,result)=>
                               {
                                   if(!error)
                                   {
                                       if(result)
                                       {
                res.status(400).json({status:"failure",message:'email id already exists'});
                                       }
                                       else 
                                       {
  
   users.update({_id:_id},req.body,(error,result)=>{
                                      
    if(!error)
    {
res.status(200).json({status:"success ",message:'user updated'});     
    }
    else
    {
       res.status(500).json({status:"failure",message:error});             
    }
});




                                       }       
                                   }
                                   else
                                   {
                                    res.status(500).json({status:"failure",message:error});    
                                   }
                               })  ;       



                              }
                        



        }
        else
        {

            res.status(500).json({status:"failure",message:error});

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
             res.status(200).json({status:"success",message:" user deleted",data:result});
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
                     res.status(400).json({ status:"failure",message:error.message});
                    }

                              });
}
 
                            