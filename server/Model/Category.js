const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        require:false,
    },
    parentCategory:{
        type:String,
        require:false,
    },
});

const Category = mongoose.model("Category", categorySchema)
module.exports = Category