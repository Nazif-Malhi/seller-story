const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        require:true,
    },
    productType:{
        type:String,
        require:true,
    },
    productCode:{
        type:String,
        require:true,
    },
    brand:{
        type:String,
        require:true,
    },
    category:{
        type:String,
        require:true,
    },
    price:{
        type:String,
        require:true,
    },
    tax:{
        type:String,
        require:true,
    },
    method:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
});

const Product = mongoose.model("Product", productSchema)
module.exports = Product