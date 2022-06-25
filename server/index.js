const express = require('express');
const mongoose = require('mongoose');
const app = express();


const AuthenticationModel = require("./Model/Authentication")
app.use(express.json());

mongoose.connect("mongodb+srv://Nazif:Z7P8QDBCJG6Qbra@clusternm.fa3sj.mongodb.net/SellerStory?retryWrites=true&w=majority", {
    useNewUrlParser:true,
});

app.get('/', async (req, res) =>{
    const authentication = new AuthenticationModel({
        name:'Na',
        companyName:'Admin',
        email:'nazifmalhi@gmail.com',
        phone:'03409351491',
        password:'admin'
    });

    try {
        await authentication.save();
        res.send('inserted Data');
    } catch (error) {
        console.log(error);
    }
})
app.listen(8000 , () => {
    console.log("Server running on 8000...")
});