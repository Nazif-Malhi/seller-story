const mongoose = require('mongoose');

const qoutationSchema = new mongoose.Schema({
    customer:{
        type:String,
        require:true,
    },
    supplier:{
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

const Qoutation = mongoose.model("qoutation", qoutationSchema)
module.exports = Qoutation