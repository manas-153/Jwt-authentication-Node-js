const mongoose = require('mongoose');

const conn=async()=>
{
    await mongoose.connect('mongodb://localhost:27017/demo').then(res=>
    {
        console.log("Databse connected successfully");
    }).catch(err=>
        {
            console.log(err);
            // console.log(err.message);
        })
}
module.exports=conn;