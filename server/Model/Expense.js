
// Expense 

const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    date:{
        type:String,
        require:true,
    },
    expenseCategory:{
        type:String,
        require:true,
    },
    amount:{
        type:String,
        require:true,
    },
    des:{
        type:String,
        require:true,
    }
});

const Expense = mongoose.model("expense", expenseSchema)
module.exports = Expense