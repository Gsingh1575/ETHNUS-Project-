// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const url = "mongodb+srv://gautamsingh212001:jpU4PT60ObjSrqnE@cluster0.dco3ssa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(url)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const app = express();
app.use(cors());
app.use(bodyParser.json());

const TransactionSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    dateOfSale: Date,
    category: String,
    isSold: Boolean
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

app.get('/seed', async(req, res) => {
    try {
        const response = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = await response.json();
        await Transaction.insertMany(data);
        res.send('Database seeded');
    } catch (error) {
        res.status(500).send(error);
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});

app.get('/transactions', async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const skip = (page - 1) * perPage;
        const search = req.query.search || '';

        const data = await Transaction.find().skip(skip).limit(perPage);
        res.send(data);
    } catch (err) {
        console.log(`failed to get transaction - ${err}`)
    }

});

app.get('/statistics', async(req, res) => {
    const month = req.query.month;

    res.json({
        totalSaleAmount: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0
    });
});

app.get('/bar-chart', async(req, res) => {
    const month = req.query.month;


    res.json({

    });
});

app.get('/pie-chart', async(req, res) => {
    const month = req.query.month;

    res.json({

    });
});

app.get('/combined-data', async(req, res) => {
    const month = req.query.month;


    res.json({

    });
});