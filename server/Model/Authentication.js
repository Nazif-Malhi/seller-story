const mongoose = require('mongoose');

const authenticationSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    companyName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
});

const Authentication = mongoose.model("Authentication", authenticationSchema)
module.exports = Authentication