const mongoose = require('mongoose');

const user_schema= mongoose.Schema({
    Name:{
        required:true,
        type:String,
    },
    Age:{
        required:true,
        type:Number,

    },
    Gender:{
        required:true,
        type:String,
    },
    email:{
        required:true,
        type:String,
    },
    Password:{
        required:true,
        type:String
    }
})

module.exports=mongoose.model('users',user_schema);