const schema=require('../database/schema');
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt=require('jsonwebtoken');
const cookies_parse=require('cookie-parser')

// give the list of all users 
const getAllUsers = async (req,res)=>
{
    try{
        // fetching all the data in the collection 
        let res_back=await schema.find();
        res.send(res_back);
    }
    catch(err)
    {
       console.log(err);
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


                // set the jwt token into cookies 

                res.cookie("Jwt",Jwt_Token.Token,{
                    expires:new Date(Date.now()+80000),
                });

                // ----------------- 

                // console.log()


                  res.send({
                    status:'success',
                    msg:`welcome ${res_back.Name}`,
                    Token:Jwt_Token.Token,
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

// this function will generate a jwt token anf return to the called function 
const createToken= async(user_data)=>
{
    try
    {
        let secretKey="thisismytestsecretkeywhichhelpstogeneratejwttokenthiskeyisencrypted";
        let Token=await jwt.sign({user_data},secretKey);
        return {Token,secretKey};
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
           res.status(400).send("User already exist");
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

// this function wull store the generated token on cookies storage 
module.exports={getAllUsers,loginuser,create_user};