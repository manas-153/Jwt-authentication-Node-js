const schema=require('../database/schema');
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt=require('jsonwebtoken');
require('dotenv').config(); 

// give the list of all users 
const getAllUsers = async (req,res)=>
{
    try{
          
        let Finded_Token=(req.headers.cookie).split(';').find(cookie => cookie.startsWith(' Jwt='));

        let Token=(Finded_Token ? Finded_Token.split('=')[1] :null);

        // if we find tokrn in headers 
        if(Token)
        {
            // verify jwt token with secret key 
            if(jwt.verify(Token,process.env.SECRET_KEY))
            {
                 // fetching all the data in the collection 
                   let res_back=await schema.find();

                 res.send({
                status:"Token verified",
                res_back
                     });

            }

            else
            {
                res.send({
                    status:'failed',
                    msg:'Invalid signature'
                })
            }
        }

        else{
            res.status(400).json({
                status:"Unauthorized",
                msg:"Token expired please login again to access this page"
            })
        }
        
    }


    catch(err)
    {
       res.send({
        status:'failed',
        msg:err.message,
       })
    }
    
}


// login the existing user 
const loginuser = async(req,res)=>
{
    let user_email= req.body.email;
    try{
        // finding the user by email 
           let res_back=await schema.findOne({email:user_email});

        // check whether the user exist or not 
           if(res_back)
           {
            // if user exist then compare the hashed password with user input password
             if(await bcrypt.compare(req.body.Password,res_back.Password))
             {
                let user_payload={
                    user_id:res_back._id,
                    user_email:res_back.email
                }
                // calling the function to generate JWT token and passing the payload info

                let Jwt_Token=await createToken(user_payload);
    
                // -------------- 
               
            
                let startdate= new Date(Date.now()).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",});

                let expires_date=new Date(Date.now()+ 180000).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",});;


                // set the jwt token into cookies 
                res.cookie("Jwt",Jwt_Token.Token,{
                    expires:new Date(Date.now()+ 180000),
                });

                // ----------------- 



                  res.send({
                    status:'success',
                    msg:`welcome ${res_back.Name}`,
                    Token:Jwt_Token.Token,
                    Token_Intialize_at:startdate,
                    Token_expiry:expires_date,
                    res_back
                  })
             }

             else{
                // if the Password doesn't match 
                res.status(400).send({
                    status:"failed",
                    msg:"Incorrect password",

                })
             }
          
           }
           
           else{
            res.status(400).send({
                status:"falied",
                msg:"Email not Found",
                Advice:"Please try again with different email or password"
            });
           }
           
    }
    catch(err)
    {
        // sending the error details to user if occur 
        res.status(200).send({
            status:'failed',
            msg:err.message
        });
    }
}

// this function will generate a jwt token and return to the called function 
const createToken= async(user_data)=>
{
    try
    {
        let Token=await jwt.sign({user_data},process.env.SECRET_KEY);
        return {Token};
    }
    catch(err)
    {
        return err;
    }
}


// create the new user 
const create_user = async(req,res)=>
{
    try{

        // check whether user already exist or not 
        if(await schema.findOne({email:req.body.email}))
        {
           res.status(400).send({
            status:"Failed",
            msg:"Failed to Regsiter,It seems like user already exist in our database",
           });
        }
        else
        {
            const user = new schema(req.body);

            // hashing  the password 
            user.Password=await bcrypt.hash(user.Password,saltRounds);

            

              
                // creating the user in database 
            let res_back=await user.save(user);

            // sending the positive response to the user 
            res.send({
                status:true,
                msg:"User Registered successfully",
                res_back
            });
        }
      
    }
    catch(err)
    { 
        // sending the error details to user if occur 
        res.status(400).send({
            status:"failed",
            msg:err.message
        });
    }
}


// Clear the cookies storage 
const logout = async(req,res)=>
{
    try
    {
        res.clearCookie('Jwt').send({
            ststus:'success',
            msg:"cookies cleared"}
            );

    }
    catch(err)
    {
        res.status(400).send({
            status:"failed",
            masg:err.message
        })
    }
   
}

const show_secrets = (req,res)=>
{
    try{

    let Finded_Token=(req.headers.cookie).split(';').find(cookie => cookie.startsWith(' Jwt='));

        let Token=(Finded_Token ? Finded_Token.split('=')[1] :null);

        if(Token)
        {
            res.status(200).json({
                msg:"Decoded json token and secret Key",
                Payload:{
                Decoded_Token: jwt.decode(Token),
                Secret_Key:process.env.SECRET_KEY
                }
              })
        }
        
        else
        {
            res.status(400).json({
                status:'failed',
                msg:'Not an authorized request'
            })
        }
     
}

   catch(err)
   {
      res.status(400).send({
        status:'failed',
        msg:err.message,
      })
   }
}

// this function wull store the generated token on cookies storage 
module.exports={getAllUsers,loginuser,create_user,logout,show_secrets};