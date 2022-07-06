const mongoose = require('mongoose');

const expenseCategorySchema = new mongoose.Schema({
    code:{
        type:String,
        require:true,
    },
    name:{
        type:String,
        require:true,
    },
});



const ExpenseCategory = mongoose.model("expenseCategory", expenseCategorySchema)
module.exports = ExpenseCategory

