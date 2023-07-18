const express = require('express');
const bodyParser=require('body-parser');
const cors= require('cors');
const app=express();
const route  = require('../routing/routing');
const cookieParser= require('cookie-parser');

// databse connection file import 
const Databse_conn=require('../database/connection');


require('dotenv').config(); 

const PORT= 8000 || process.env.PORT;

// middlewares 
app.use(bodyParser.json());

app.use(cors());

app.use('/users',route);

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


// defining routes 

app.get('/',(req,res)=>
{
    res.send("hello from node js simple routing page");
})

// server connection 
app.listen(PORT,()=>
{
    console.log(`server is listening on ${PORT} port`);
    Databse_conn();
})