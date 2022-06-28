const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:false,
    },
    phone:{
        type:String,
        require:false,
    },
    address:{
        type:String,
        require:false,
    },
    city:{
        type:String,
        require:false,
    },
    state:{
        type:String,
        require:false,
    },

    
});

const Customer = mongoose.model("customer", customerSchema)
module.exports = Customer