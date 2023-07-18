const express= require('express');
const { getAllUsers,loginuser,create_user,logout} = require('../controller/controller');
const route=express.Router();


route.get('/',getAllUsers);
route.post('/login',loginuser);
route.post('/register_user',create_user);
route.get('/logout',logout)
module.exports=route;