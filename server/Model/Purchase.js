const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    date:{
        type:String,
        require:true,
    },
    supplier:{
        type:String,
        require:true,
    },
    purchaseStatus:{
        type:String,
        require:true,
    },
    note:{
        type:String
    },
    orderTax:{
        type:String,
        require:true,
    },
    orderDiscount:{
        type:String,
        require:true,
    },
    shippingCost:{
        type:String,
        require:true,
    },
    grandTotal:{
        type:String,
        require:true,
    },
    products:{
        type:mongoose.SchemaTypes.Mixed,
        required: true
    }
});

const Purchase = mongoose.model("Purchase", purchaseSchema)
module.exports = Purchase