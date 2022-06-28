//Librries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();



app.use(cors());
app.use(express.json());

// Connection 
mongoose.connect("mongodb+srv://Nazif:Z7P8QDBCJG6Qbra@clusternm.fa3sj.mongodb.net/SellerStory?retryWrites=true&w=majority", {
    useNewUrlParser:true,
});

// Authentication 
const AuthenticationModel = require("./Model/Authentication");


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


// Category 
const CategoryModel = require("./Model/Category");


app.post('/category/insert', async (req, res) =>{
    const name = req.body.name
    const image = req.body.image
    const parentCategory = req.body.parentCategory

    console.log(name + image + parentCategory);

    const category = new CategoryModel({
        name: name,
        parentCategory: parentCategory

    });

    try {
        await category.save();
        res.send('inserted Data');
    } catch (error) {
        console.log(error);
    }
})


app.get('/category/read', async(req, res) => {
    CategoryModel.find({}, (err, result) => {
        if(err) {
            res.send(err);
        }
        res.send(result);
    })
})



// Product

const ProductModel = require("./Model/Product");


app.post('/product/insert', async (req, res) =>{
    const productType = req.body.productType
    const productName = req.body.productName
    const productCode = req.body.productCode
    const brand = req.body.brand
    const category = req.body.category
    const price = req.body.price
    const tax = req.body.tax
    const taxMethod = req.body.taxMethod
    const description = req.body.description

    const product = new ProductModel({
        productName:productName,
        productType:productType,
        productCode:productCode,
        brand:brand,
        category:category,
        price:price,
        tax:tax,
        method:taxMethod,
        description:description
    });

    try {
        await product.save();
        res.send('inserted Data');
    } catch (error) {
        console.log(error);
    }
})


app.get('/product/read', async(req, res) => {
    ProductModel.find({}, (err, result) => {
        if(err) {
            res.send(err);
        }
        res.send(result);
    })
})



// Customer
const CustomerModel = require("./Model/Customer");


app.post('/customer/insert', async (req, res) =>{
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const address = req.body.address
    const city = req.body.city
    const state = req.body.state

    const customer = new CustomerModel({
        name: name,
        email: email,
        phone:phone,
        address:address,
        city:city,
        state:state

    });

    try {
        await customer.save();
        res.send('inserted Data');
    } catch (error) {
        console.log(error);
    }
})


app.get('/customer/read', async(req, res) => {
    CustomerModel.find({}, (err, result) => {
        if(err) {
            res.send(err);
        }
        res.send(result);
    })
})


// Supplier
const SupplierModal = require("./Model/Supplier");


app.post('/supplier/insert', async (req, res) =>{
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const address = req.body.address
    const city = req.body.city
    const state = req.body.state

    const supplier = new SupplierModal({
        name: name,
        email: email,
        phone:phone,
        address:address,
        city:city,
        state:state

    });

    try {
        await supplier.save();
        res.send('inserted Data');
    } catch (error) {
        console.log(error);
    }
})


app.get('/supplier/read', async(req, res) => {
    SupplierModal.find({}, (err, result) => {
        if(err) {
            res.send(err);
        }
        res.send(result);
    })
})



// Running App
app.listen(8000 , () => {
    console.log("Server running on 8000...")
});