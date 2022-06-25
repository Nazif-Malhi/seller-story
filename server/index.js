const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


const AuthenticationModel = require("./Model/Authentication");
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://Nazif:Z7P8QDBCJG6Qbra@clusternm.fa3sj.mongodb.net/SellerStory?retryWrites=true&w=majority", {
    useNewUrlParser:true,
});

app.post('/insert', async (req, res) =>{
    const name = req.body.name
    const companyName = req.body.companyName
    const password = req.body.password
    const email = req.body.email
    const phone = req.body.phone
    console.log(phone);
    const authentication = new AuthenticationModel({
        name: name,
        companyName: companyName,
        email: email,
        phone: phone,
        password: password

    });

    try {
        await authentication.save();
        res.send('inserted Data');
    } catch (error) {
        console.log(error);
    }
})


app.get('/read', async(req, res) => {
    AuthenticationModel.find({}, (err, result) => {
        if(err) {
            res.send(err);
        }
        res.send(result);
    })
})
app.listen(8000 , () => {
    console.log("Server running on 8000...")
});